var path = require("path");
const CompressionPlugin = require('compression-webpack-plugin')
var webpack = require('webpack')

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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new CompressionPlugin()
    ],
    optimization: {
      splitChunks: {
        name: true,
        chunks: 'all',
        minSize: 0
      }
    }
  }
  // pluginOptions: {
  //   webpackBundleAnalyzer: {
  //     openAnalyzer: true
  //   }
  // }
};
