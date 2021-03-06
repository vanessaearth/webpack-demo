const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtraWebpackPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
module.exports = {
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
    path: path.resolve(__dirname, './dist')
  }, // 打包出口文件目录
  mode: 'production', //development,production,打包环境，分开发环境和线上环境
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
  watchOptions: {
    //不不监听的 node_modules ⽬目录下的⽂文件
    ignored: /node_modules/,
  },
  module: {
    //loader模块处理
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src/css'),
        use: ['style-loader', 'css-loader']
        // use: [MiniCssExtraWebpackPlugin.loader, 'css-loader']
      },
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
      }, {
        test: /\.less$/,
        include: path.resolve(__dirname, './src/css'),
        use: ['style-loader', 'css-loader', 'less-loader', "postcss-loader"]
      }
    ]
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
  // devtool: 'source-map',
  devtool: 'none',
  plugins: [
    //自动生成html插件
    new htmlWebpackPlugin({
      title: 'aha',
      filename: 'index.html',
      template: "./src/index.html"
    }),
    //每次打包前，清空dist目录
    new CleanWebpackPlugin(),
    //抽离css代码到单独的文件
    new MiniCssExtraWebpackPlugin({
      filename: 'css/[name]-[chunkhash:6].css',
    }),
    // 热模块更新
    new webpack.HotModuleReplacementPlugin()
  ]

}