const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  //entry的值 "" [] {}
  //字符串和数组时候SPA单页应用，对象时候多页应用MPA
  // entry: {
  //   main: './src/index.js',
  //   a: './src/add.js'
  // },
  entry: './src/index.js',
  resolve: {
    //配置modules的路径，减少查找modules时间
    modules: [path.resolve(__dirname, './node_modules')],
    //为路径配置别名
    alias: {
      "@": path.join(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
    },
  },
  module: {
    //loader模块处理
    rules: [
      {
        test: /\.(png|jp?eg|gif|webp)$/,
        include: path.resolve(__dirname, './src/img'),
        //use值需要配置可使用对象形式
        use: {
          loader: 'file-loader',
          options: {
            //contentHash是根据内容生成的hash，ext是文件的后缀名,
            name: '[name]-[contentHash:6].[ext]',
            outputPath: 'img/'
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        include: path.resolve(__dirname, './src/font'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'font/'
          }
        }
      }, {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader',
          options: {

          }
        }
      }
    ]
  },
  // devtool: 'source-map',
  plugins: [
    //每次打包前，清空dist目录
    new CleanWebpackPlugin(),
  ]
}