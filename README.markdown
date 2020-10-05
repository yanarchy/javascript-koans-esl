# javascript-koans-esl

This is [mrdavidlaing's JavaScript Koans](https://github.com/mrdavidlaing/javascript-koans), but with simple English. The vague Buddhist language in the original has been replaced with simple English. Setup instructions are also added for complete beginners.

Javascript koans are to teach you JavaScript programming through testing. When you first run the koans, you will be given a 'runtime error' and a 'stack trace' indicating where the error occurred.

Your goal is to find and fix the error.

Through exploring the code and fixing the errors, you will learn new things about the JavaScript language and functional programming.

## Koans

> A koan is a riddle or puzzle that Zen Buddhists use during meditation to help them unravel greater truths about the world and about themselves.

[source](http://www.huffingtonpost.com/entry/zen-buddhism-koan_us_563251dce4b0631799115f3c)

## Setting Up

### Download Using Git

If you know git:

```sh
git clone https://github.com/yanarchy/javascript-koans-esl.git
```

### Download Without Git

If you do not know git, please download the zip and unzip on your computer.
![download zip image](readme-images/downloadzip.png)

### Open in Text Editor

If you do not have a code editor for JavaScript, we highly recommend downloading and installing [Visual Studio Code](https://code.visualstudio.com/).

Open this `javascript-koans-esl project` folder in your code editor.

## How to Start

1. Open the `KoansRunner.html` file in your web browser.
2. The first error will be in `koans/AboutExpects.js`.
   ![first error in html file](readme-images/firsterror.png)

3. Fix the first test in the `koans/AboutExpects.js` file and save it.

4. Refresh the `KoansRunner.html` page you have open in the browser.

5. Repeat! Fix a test, save the file, refresh the browser. Tests will turn green when they are correct.

## Tips

- Do not think too much about each problem - they are simple, especially in the beginning.
- Are you really stuck on something? You can disable a test by adding an `x` to the beginning of `it(...)`. If you do this, the KoansRunner will skip this particular test and go on to the next. Remember to come back to the tests that you disable!

  ```js
  xit("should be disabled", function () {
    // This is an example
  });
  ```

- Don't be afraid to Google
- Don't be afraid to make mistakes

## Other Information

Is there anything that needs to be explained in simpler English? Let me know.

The test runner used is [Jasmine](http://jasmine.github.io/) with a customized report viewer. Understanding Jasmine is not important for completing these.
