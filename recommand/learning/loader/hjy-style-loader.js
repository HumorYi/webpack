// 动态生成 style 标签，插入 css 内容
module.exports = function (source) {
  const result = `
    const style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
  `

  return result
}
