const path = require('path')
//生成及压缩html
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtraWebpackPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
//压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const proConfig = {
  //entry的值 "" [] {}
  //字符串和数组时候SPA单页应用，对象时候多页应用MPA
  // entry: {
  //   main: './src/index.js',
  //   a: './src/add.js'
  // },
  entry: './src/index.js',
  //出口文件
  output: {
    // publicPath: 'http://cdn.static/', 
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  }, // 打包出口文件目录
  mode: 'production', //development,production,打包环境，分开发环境和线上环境
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src/css'),
        use: [MiniCssExtraWebpackPlugin.loader, 'css-loader']
        // use: [MiniCssExtraWebpackPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src/css'),
        use: [MiniCssExtraWebpackPlugin.loader, 'css-loader', 'less-loader', "postcss-loader"]
      }
    ]
  },
  plugins: [
    //自动生成html插件
    new htmlWebpackPlugin({
      title: 'aha',
      filename: 'index.html',
      template: "./src/index.html",
      minify: {
        removeComments: true,//移除注释
        collapseWhitespace: true, //移除空白符合换行符
        minifyCSS: true//压缩内敛css
      }

    }),
    //抽离css代码到单独的文件
    new MiniCssExtraWebpackPlugin({
      filename: 'css/[name]-[chunkhash:6].css',
    }),
    //压缩css
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"), //引⼊入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }
    })
  ]

}
module.exports = merge(baseConfig, proConfig)