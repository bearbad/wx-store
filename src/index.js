const $page = decorator(App)
// Page:小程序的Page是一个函数
function decorator (fn) {
  return function () {
    return fn.apply(this, arguments)
  }
}

module.exports = {
  Page: $page
}
