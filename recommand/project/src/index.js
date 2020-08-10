// base use
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

// @babel/preset-env
// import '@babel/polyfill'
const arr = [new Promise(() => {}), new Promise(() => {})]
arr.map(item => {
  console.log(item)
})

// js tree shaking
import { add } from './expo.js'
add(1, 2)
