var path = require("path");
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack: {
    // ...
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
        "../../theme.config$": path.join(
          __dirname,
          "/semantic-ui/theme.config"
        ),
        "../semantic-ui/site": path.join(__dirname, "/semantic-ui/site")
      }
    },
    performance: { hints: false },
    devtool: 'cheap-module-source-map',
    plugins: [
      new CompressionPlugin()
    ]
  }
  // pluginOptions: {
  //   webpackBundleAnalyzer: {
  //     openAnalyzer: true
  //   }
  // }
};
