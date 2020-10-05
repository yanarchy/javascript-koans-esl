class JsKoansReporter {
  constructor(doc = document) {
    this.document = doc;
    this.suiteDivs = {};
    this.failedSpecs = 0;
    this.noOfSubjects = 0;
    this.failedSubjects = 0;
  }

  createDom(type, attrs, ...children) {
    const element = document.createElement(type);

    for (const child of children) {
      if (typeof child === "string")
        element.appendChild(document.createTextNode(child));
      else if (child) element.appendChild(child);
    }

    for (const attr in attrs) {
      if (attr == "className") {
        element[attr] = attrs[attr];
      } else {
        element.setAttribute(attr, attrs[attr]);
      }
    }

    return element;
  }

  reportRunnerStarting(runner) {
    this.outerDiv = this.createDom(
      "div",
      { className: "jasmine_reporter show-passed" },
      this.createDom("h1", {}, "Javascript Koans"),
      (this.runnerDiv = this.createDom(
        "div",
        { className: "runner running" },
        (this.runnerMessageSpan = this.createDom(
          "span",
          { classname: "running" },
          "Contemplating naval..."
        )),
        (this.finishedAtSpan = this.createDom("span", {
          className: "finished-at",
        }))
      ))
    );

    this.document.body.appendChild(this.outerDiv);

    const suites = runner.suites();
    for (const suite of suites) {
      const suiteDiv = this.createDom(
        "div",
        { className: "suite" },
        this.createDom(
          "a",
          {
            className: "description",
            href: `?spec=${encodeURIComponent(suite.getFullName())}`,
          },
          this.getSuiteDescription(suite)
        )
      );
      this.suiteDivs[suite.id] = suiteDiv;
      const parentDiv = suite.parentChild
        ? this.suiteDivs[suite.parentSuite.id]
        : this.outerDiv;
      parentDiv.appendChild(suiteDiv);
    }

    this.footerDiv = this.createDom(
      "div",
      { className: "banner" },
      this.createDom(
        "div",
        { className: "logo" },
        "Test runner: Jasmine",
        this.createDom(
          "span",
          { className: "version" },
          runner.env.versionString()
        )
      )
    );

    this.outerDiv.appendChild(this.footerDiv);

    this.startedAt = new Date();
  }

  reportRunnerResults(runner) {
    const className = "progress";
    this.runnerDiv.setAttribute("class", className);

    const specs = runner.specs();
    let specCount = 0;
    for (const spec of specs) {
      if (this.specFilter(spec)) specCount++;
    }

    const status = this.failedSpecs === 0 ? "passed" : "failed";
    const resultMessage =
      this.failedSpecs === 0
        ? "Success!"
        : "You have not yet reached success...";

    const specsCount = runner.specs().length;
    let showPassed;
    let showAllFailed;

    const progress = this.createDom(
      "div",
      {},
      this.createDom("div", { className: `success-${status}` }, resultMessage),
      this.createDom(
        "div",
        { className: "completion" },
        this.createDom(
          "div",
          {},
          this.createDom("span", { className: "key" }, "Subjects covered: "),
          this.createDom(
            "span",
            { className: "value" },
            `${this.noOfSubjects - this.failedSubjects}/${this.noOfSubjects}`
          )
        ),
        this.createDom(
          "div",
          {},
          this.createDom("span", { className: "key" }, "Koans learned: "),
          this.createDom(
            "span",
            { className: "value" },
            `${specsCount - this.failedSpecs}/${runner.specs().length}`
          )
        ),
        this.createDom(
          "div",
          { className: "options" },
          this.createDom(
            "label",
            { for: "__jsKoans_showPassed__" },
            " Show passed koans"
          ),
          (showPassed = this.createDom("input", {
            id: "__jsKoans_showPassed__",
            type: "checkbox",
            checked: "",
          })),
          this.createDom(
            "label",
            { for: "__jsKoans_showAllFailed__" },
            " Look ahead"
          ),
          (showAllFailed = this.createDom("input", {
            id: "__jsKoans_showAllFailed__",
            type: "checkbox",
          }))
        )
      )
    );
    this.runnerMessageSpan.replaceChild(
      this.createDom("div", { className: "description", href: "?" }, progress),
      this.runnerMessageSpan.firstChild
    );

    showPassed.onchange = (evt) => {
      if (evt.target.checked) {
        this.outerDiv.className += " show-passed";
      } else {
        this.outerDiv.className = this.outerDiv.className.replace(
          / show-passed/,
          ""
        );
      }
    };
    showAllFailed.onchange = (evt) => {
      if (evt.target.checked) {
        this.outerDiv.className += " show-skipped";
      } else {
        this.outerDiv.className = this.outerDiv.className.replace(
          / show-skipped/,
          ""
        );
      }
    };
  }

  reportSuiteResults(suite) {
    const results = suite.results();
    let status = results.passed() ? "passed" : "failed";
    if (results.totalCount == 0 || this.failedSubjects > 0) {
      status += "-skipped";
    }

    if (suite.parentSuite == null) {
      this.noOfSubjects += 1;
      if (this.failedSpecs > 0) this.failedSubjects += 1;
    }

    this.suiteDivs[suite.id].className += ` ${status}`;
  }

  reportSpecStarting() {}

  reportSpecResults(spec) {
    const results = spec.results();
    const status = results.passed() ? "passed" : "failed";
    let skipStatus = status;

    if (results.skipped || this.failedSpecs > 0) {
      skipStatus += "-skipped";
    }

    const description = results.passed()
      ? `You understand that it ${spec.description}.`
      : `It ${spec.description}. You should continue thinking about this koan.`;
    if (!results.passed()) this.failedSpecs += 1;

    const specDiv = this.createDom(
      "div",
      { className: "spec " + skipStatus },
      this.createDom(
        "a",
        {
          className: "run_spec_" + status,
          href: `?spec=${encodeURIComponent(spec.getFullName())}`,
        },
        "meditate again"
      ),
      this.createDom(
        "a",
        {
          className: "description",
          href: `?spec=${encodeURIComponent(spec.getFullName())}`,
          title: spec.getFullName(),
        },
        description
      )
    );

    const resultItems = results.getItems();
    const messagesDiv = this.createDom("div", { className: "messages" });

    for (const result of resultItems) {
      if (result.type == "expect" && result.passed && !result.passed()) {
        messagesDiv.appendChild(
          this.createDom("div", { className: "errorMessage" }, result.message)
        );
        messagesDiv.appendChild(
          this.createDom(
            "div",
            { className: "description" },
            "Please rethink the following code:"
          )
        );

        if (result.trace.stack) {
          const lines = result.trace.stack.split("\n");
          const stack = [
            lines[0],
            ...lines.slice(1).filter((line) => line.includes("/koans/")),
          ].join("\n");
          messagesDiv.appendChild(
            this.createDom("div", { className: "stackTrace" }, stack.trim())
          );
        }

        break;
      }
    }
    if (messagesDiv.childNodes.length > 0) specDiv.appendChild(messagesDiv);

    this.suiteDivs[spec.suite.id].appendChild(specDiv);
  }

  log() {
    const { console } = jasmine.getGlobal();
    if (console && console.log) console.log.apply(console, arguments);
  }

  getLocation() {
    return this.document.location;
  }

  specFilter(spec) {
    const paramMap = {};
    const params = this.getLocation().search.substring(1).split("&");
    for (const param of params) {
      const [key, value] = param.split("=");
      paramMap[decodeURIComponent(key)] = decodeURIComponent(value);
    }

    return paramMap["spec"]
      ? spec.getFullName().indexOf(paramMap["spec"]) === 0
      : true;
  }

  getSuiteDescription(suite) {
    return `${suite.parentSuite === null ? "Thinking" : "Considering"} ${
      suite.description
    }`;
  }
}
