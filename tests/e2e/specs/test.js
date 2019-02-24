// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  "Main view is shown": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#app", 5000)
      .assert.elementPresent("#main")
      .end();
  }
};
