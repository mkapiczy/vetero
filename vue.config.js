var path = require("path");

module.exports = {
  configureWebpack: {
    // ...
    resolve: {
      alias: {
        "../../theme.config$": path.join(
          __dirname,
          "/semantic-ui/theme.config"
        ),
        "../semantic-ui/site": path.join(__dirname, "/semantic-ui/site")
      }
    },
    performance: { hints: false }
  }
};
