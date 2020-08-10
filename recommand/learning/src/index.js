// base use
import './assets/css/index.css'
/* console.log('hello webpack!!')
import './assets/css/common.css'
import './assets/less/index.less'
import './assets/css/index.css'

import icon from './assets/images/icon.png'
import dolphin from './assets/images/dolphin.jpg'

const imgDolphin = new Image()
const imgIcon = new Image()
const app = document.getElementById('app')

imgIcon.src = icon
imgDolphin.src = dolphin

app.appendChild(imgIcon)
app.appendChild(imgDolphin)

consoel.log('ads') */

// css HMR
/* import './assets/css/index.css'
const btn = document.createElement('button')
btn.innerHTML = '新增'
document.body.appendChild(btn)

btn.onclick = function () {
  const div = document.createElement('div')
  div.innerHTML = 'item'
  document.body.appendChild(div)
}
 */

// js HMR
/* import counter from './counter.js'
import number from './number.js'
counter()
number()

if (module.hot) {
  module.hot.accept('./number', function () {
    document.body.removeChild(document.getElementById('number'))
    number()
  })
} */

// @babel/preset-env
// import '@babel/polyfill'
/* const arr = [new Promise(() => {}), new Promise(() => {})]
arr.map(item => {
  console.log(item)
}) */

// @babel/preset-react
/* import React, { Component } from 'react'
import ReactDom from 'react-dom'
class App extends Component {
  render() {
    return <div>hello world</div>
  }
}
ReactDom.render(<App />, document.getElementById('app')) */

// js tree shaking
import { add } from './expo.js'
add(1, 2)
