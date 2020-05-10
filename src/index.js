// // webpack默认可以解析js json
// const json = require('./js/index.json')
// import { add } from './js/add.js'
// console.log(json, add(1, 2))

// // css文件需要css - loader
import './css/style.css'
import './css/index.less'

//img图片需要file-loader
// import imgSrc from './img/check.png'
// var img = new Image()
// img.src = imgSrc
// img.classList.add('border')
// var node = document.getElementById('node')
// node.append(img)
// //代理接口
// import axios from 'axios'
// console.log(11)
// axios.get('/api/info').then(res => {
//   console.log(res)
// })
// //css热模块更新
// var btn = document.createElement('button')
// btn.innerHTML = "新增"
// document.body.appendChild(btn)

// btn.onclick = function () {
//   var div = document.createElement('div')
//   div.innerHTML = "item"
//   document.body.appendChild(div)
// }
// //js热模块更新,需要监听
// import counter from './js/counter'
// import number from './js/number'
// counter()
// number()
// if (module.hot) {
//   module.hot.accept('./js/number.js', function () {
//     document.body.removeChild(document.getElementById('number'))
//     number();
//   })
// }

// //babel-loader es6转es5
// import "@babel/polyfill"; //包含ecma的库，包含所有特性

// const arr = [new Promise(() => { }), new Promise(() => { })]
// arr.map(item => {
//   console.log(item)
// })

// //react
import React, { Component } from 'react'
import ReactDom from 'react-dom'
class App extends Component {
  render () {
    return <div>haha</div>
  }
}
ReactDom.render(<App />, document.getElementById('node'))
