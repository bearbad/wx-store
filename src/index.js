// const UTIL = require('./util.js')

const $page = decorator(Page)

function decorator (fn) {
  return function () {
    // arguments  小程序Page参数
    // 合并参数
    return fn.apply(this, arguments)
  }
}

module.exports = {
  Page: $page
}
