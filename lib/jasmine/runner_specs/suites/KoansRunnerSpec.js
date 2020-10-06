describe("KoansRunner", () => {
  let env;
  let reporter;
  let body;
  let fakeDocument;

  beforeEach(() => {
    env = new jasmine.Env();
    env.updateInterval = 0;

    body = document.createElement("body");
    fakeDocument = { body: body, location: { search: "" } };
    reporter = new JsKoansReporter(fakeDocument);
  });

  function fakeSpec(name) {
    return {
      getFullName() {
        return name;
      },
    };
  }

  function fakeSuite(desc) {
    return {
      parentSuite: null,
      description: desc,
    };
  }

  function findElements(divs, withClass) {
    const elements = [];
    for (const div of divs) {
      if (div.className == withClass) elements.push(div);
    }
    return elements;
  }

  function findElement(divs, withClass) {
    const elements = findElements(divs, withClass);
    if (elements.length > 0) return elements[0];
    throw new Error("couldn't find div with class " + withClass);
  }

  it("should run only specs beginning with spec parameter", () => {
    fakeDocument.location.search = "?spec=run%20this";
    expect(reporter.specFilter(fakeSpec("run this"))).toBeTruthy();
    expect(reporter.specFilter(fakeSpec("not the right spec"))).toBeFalsy();
    expect(reporter.specFilter(fakeSpec("not run this"))).toBeFalsy();
  });

  it("should display empty divs for every suite when the runner is starting", () => {
    reporter.reportRunnerStarting({
      env: env,
      suites() {
        return [new jasmine.Suite({}, "suite 1", null, null)];
      },
    });

    const divs = findElements(body.getElementsByTagName("div"), "suite");
    expect(divs.length).toEqual(1);
    expect(divs[0].innerHTML).toContain("suite 1");
  });

  describe("Matcher reporting", () => {
    const getErrorMessageDiv = function (body) {
      const divs = body.getElementsByTagName("div");
      for (const div of divs) {
        if (div.className.match(/errorMessage/)) {
          return div;
        }
      }
    };

    let runner;
    let spec;
    let fakeTimer;
    beforeEach(() => {
      fakeTimer = new jasmine.FakeTimer();
      env.setTimeout = fakeTimer.setTimeout;
      env.clearTimeout = fakeTimer.clearTimeout;
      env.setInterval = fakeTimer.setInterval;
      env.clearInterval = fakeTimer.clearInterval;
      runner = env.currentRunner();
      const suite = new jasmine.Suite(env, "some suite");
      runner.add(suite);
      spec = new jasmine.Spec(env, suite, "some spec");
      suite.add(spec);
      fakeDocument.location.search = "?";
      env.addReporter(reporter);
    });

    describe("toContain", () => {
      it("should show actual and expected", () => {
        spec.runs(function () {
          this.expect("foo").toContain("bar");
        });
        runner.execute();
        fakeTimer.tick(0);

        const resultEl = getErrorMessageDiv(body);
        expect(resultEl.innerHTML).toMatch(/foo/);
        expect(resultEl.innerHTML).toMatch(/bar/);
      });
    });
  });

  describe("failure messages (integration)", () => {
    let spec;
    let results;
    let expectationResult;

    beforeEach(() => {
      results = {
        passed() {
          return false;
        },
        getItems() {},
      };

      const suite1 = new jasmine.Suite(env, "suite 1", null, null);

      spec = {
        suite: suite1,
        getFullName() {
          return "foo";
        },
        results() {
          return results;
        },
      };

      reporter.reportRunnerStarting({
        env: env,
        suites() {
          return [suite1];
        },
      });
    });

    it("should add the failure message to the DOM (non-toEquals matchers)", () => {
      expectationResult = new jasmine.ExpectationResult({
        matcherName: "toBeNull",
        passed: false,
        message: "Expected 'a' to be null, but it was not",
      });

      spyOn(results, "getItems").andReturn([expectationResult]);

      reporter.reportSpecResults(spec);

      const divs = body.getElementsByTagName("div");
      const errorDiv = findElement(divs, "errorMessage");
      expect(errorDiv.innerHTML).toEqual(
        "Expected 'a' to be null, but it was not"
      );
    });

    it("should add the failure message to the DOM (non-toEquals matchers) html escaping", () => {
      expectationResult = new jasmine.ExpectationResult({
        matcherName: "toBeNull",
        passed: false,
        message: "Expected '1 < 2' to <b>e null, & it was not",
      });

      spyOn(results, "getItems").andReturn([expectationResult]);

      reporter.reportSpecResults(spec);

      const divs = body.getElementsByTagName("div");
      const errorDiv = findElement(divs, "errorMessage");
      expect(errorDiv.innerHTML).toEqual(
        "Expected '1 &lt; 2' to &lt;b&gt;e null, &amp; it was not"
      );
    });
  });

  describe("duplicate example names", () => {
    it("should report failures correctly", () => {
      env.describe("suite", () => {
        env.it("will have log messages", function () {
          this.log("this one passes!");
          this.expect(true).toBeTruthy();
        });
      });

      env.describe("suite", () => {
        env.it("will have log messages", function () {
          this.log("this one fails!");
          this.expect(true).toBeFalsy();
        });
      });

      env.addReporter(reporter);
      env.execute();

      const divs = body.getElementsByTagName("div");
      const failedSpecDiv = findElement(divs, "suite failed");
      expect(failedSpecDiv.className).toEqual("suite failed");
      expect(failedSpecDiv.innerHTML).toContain(
        "continue thinking about this koan"
      );
      expect(failedSpecDiv.innerHTML).not.toContain("You understand that");

      const passedSpecDiv = findElement(divs, "suite passed");
      expect(passedSpecDiv.className).toEqual("suite passed");
      expect(passedSpecDiv.innerHTML).toContain("You understand that");
      expect(passedSpecDiv.innerHTML).not.toContain(
        "continue thinking about this koan"
      );
    });
  });

  describe("#reportSpecStarting", () => {
    let spec1;
    beforeEach(() => {
      env.describe("suite 1", () => {
        spec1 = env.it("spec 1", () => {});
      });
    });

    it("should not log running specs by default", () => {
      spyOn(reporter, "log");

      reporter.reportSpecStarting(spec1);

      expect(reporter.log).not.toHaveBeenCalled();
    });
  });

  describe("showing progress", () => {
    beforeEach(() => {
      env.describe("suite 1", () => {
        env.it("spec A");
        env.it("spec B");
      });
      env.describe("suite 2", () => {
        env.it("spec C");
      });
    });

    describe("subjects", () => {
      describe("with no failures", () => {
        beforeEach(() => {
          env.addReporter(reporter);
          env.execute();
        });

        it("should have 2 subjects", () => {
          expect(reporter.noOfSubjects).toBe(2);
        });

        it("should not have any failed subjects", () => {
          expect(reporter.failedSubjects).toBe(0);
        });
      });

      describe("with 1 failure", () => {
        beforeEach(() => {
          env.describe("suite with error", () => {
            env.it("spec X", () => {
              expect(true).toBeFalsey();
            });
            env.it("spec Y", () => {
              expect(true).toBeFalsey();
            });
          });

          env.addReporter(reporter);
          env.execute();
        });

        it("should have 3 subjects", () => {
          expect(reporter.noOfSubjects).toBe(3);
        });

        it("should have a failure", () => {
          expect(reporter.failedSubjects).toBe(1);
        });
      });

      describe("with 2 failures", () => {
        beforeEach(() => {
          env.describe("suite with error", () => {
            env.it("spec X", () => {
              expect(true).toBeFalsey();
            });
          });
          env.describe("suite with error too", () => {
            env.it("spec Y", () => {
              expect(true).toBeFalsey();
            });
          });

          env.addReporter(reporter);
          env.execute();
        });

        it("should have 4 subjects", () => {
          expect(reporter.noOfSubjects).toBe(4);
        });

        it("should have 2 failures", () => {
          expect(reporter.failedSubjects).toBe(2);
        });
      });

      describe("with embedded suites only outer suites count as subjects", () => {
        beforeEach(() => {
          env.describe("outer suite", () => {
            env.it("spec for outer suite", () => {
              expect(true).toBeFalsey();
            });

            env.describe("inner suite", () => {
              env.it("spec for inner suite", () => {
                expect(true).toBeFalsey();
              });
            });
          });

          env.addReporter(reporter);
          env.execute();
        });

        it("should have 3 suites", () => {
          expect(reporter.noOfSubjects).toBe(3);
        });

        it("should have 1 failure", () => {
          expect(reporter.failedSubjects).toBe(1);
        });
      });
    });
  });

  describe("presentation", () => {
    describe("showing the suite description", () => {
      it("should prefix outer suite descriptions with 'Thinking'", () => {
        suite = fakeSuite("About Pies");
        description = reporter.getSuiteDescription(suite);

        expect(description).toEqual("Thinking About Pies");
      });

      it("should prefix inner suite descriptions with 'Thinking'", () => {
        suite = fakeSuite("cherries");
        suite.parentSuite = "Something";
        description = reporter.getSuiteDescription(suite);

        expect(description).toEqual("Considering cherries");
      });
    });
  });
});
