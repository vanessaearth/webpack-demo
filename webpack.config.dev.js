const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const devConfig = {
  mode: 'development',
  //出口文件
  output: {
    // publicPath: 'http://cdn.static/', 
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8090,
    hot: true,//热模块更新
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src/css'),
        use: ['style-loader', 'css-loader']
        // use: [MiniCssExtraWebpackPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src/css'),
        use: ['style-loader', 'css-loader', 'less-loader', "postcss-loader"]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    //自动生成html插件
    new htmlWebpackPlugin({
      title: 'aha',
      filename: 'index.html',
      template: "./src/index.html"
    }),
    // 热模块更新
    new webpack.HotModuleReplacementPlugin()
  ]

}
module.exports = merge(baseConfig, devConfig)