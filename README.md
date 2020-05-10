## webpack-demo

### 安装
安装 webpack4.XX 版本时候，需要额外安装命令行工具 webpack-cli

_建议在项目中安装，便于不同项目可能使用的版本不一样_

```
npm install webpack webpack-cli
```

### 检查版本

全局环境中查找 webpack 的版本

```
webpack -v
```

项目路径中查找 webpack 的版本

```
npx webpack -v
```

###loader  处理webpack不支持的文件
```
module:{
rules:[
{}//各种loader配置
]}
```
 webpack 默认只能打包 js 文件，打包其他文件需要使用对应的 loader

loader 是模块解决，模块解析器，用于把模块原内容按照需求转换成新内容
常见的 loader，一个 loader 只做一种事情，处理一件事，自上往下，自右向左执行

```
style-loader css-loader less-loader sass-loader ts-loader babel-loader file-loader eslint-loader
```

file-loader 的使用场景：当我们需要模块，仅仅是从源代码到打包目录，就可以使⽤ file-loader 来处理，txt，svg，csv，excel，图⽚片资源等等

package.json
script:{
dev:'webpack'
}
predev 前置钩子
postpost 后置钩子
npm run dev,执行之前会先执行前置钩子，执行之后会执行后置钩子，钩子名字必须保持一致，

### plugins 作用于打包整个过程
打包过程是有生命周期概念的钩子

使用方法：npm install 安装插件，引入插件，然后new实例
##### htmlwebpackplugin

```
npm i html-webpack-plugin
```

```
const htmlWebpackPlugin=repuire('html-webpack-plugin')

plugins:[
new htmlWebpackPlugin({
	title: 'aha',
   filename: 'app.html', //打包后的文件名
   template: "./src/app.html"  //模板文件名
})
]
```
##### htmlwebpackplugin ,打包前先删除dist目录

```
npm i clean-webpack-plugin
```

```
const {CleanWebpackPlugin}=repuire('clean-webpack-plugin')
plugins:[
	new CleanWebpackPlugin()
]
```
##### mini-css-extract-plugin
```
npm i mini-css-extract-plugin
```
```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

{
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"]
}
plugins:[
 new MiniCssExtraWebpackPlugin({
      filename: '[name][chunkhash:6].css'
    })
    ]
```
##### hotModuleReplacement
天生不支持抽离成单个文件的css，还有不不⽀支持contenthash，chunkhash
```
const webpack = require('webpack')
// 热模块更新
  plugins:[
    new webpack.HotModuleReplacementPlugin()
    ]
```

### sourceMap
源代码与打包后的代码的映射关系，通过sourceMap定位到源代码

```
devtool:'source-map' //线上配置none
```
### devServe

```
 devServer: {
    contentBase: "./dist",
    open: true,
    port: 8090,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
```

### babel处理es6
babel是在执行编译的过程中，从项目根目录下.babelrc文件中读取配置，没有的改文件会从loader的options地方读取配置

```npm i babel-loader @babel/core @babel/preset-env -D
```
babel-loader是webpack和babel的桥梁，@babel/preset-env负责吧es6，7，8转化为es5

###### babel-preset 
```
npm i babel-preset
```

.babelrc,babel配置的单独文件
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "corejs": 2, //指定核心版本库
        "useBuiltIns": "usage" //按需加载
      }
    ],
    "@babel/preset-react"
  ]
}
```



