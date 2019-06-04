import UTIL from './util.js'
import Modello from './modello.js'

let WxModello = new Modello()

const $page = decorator(Page, function (opt) {
  UTIL.mixin(opt.data, WxModello.getCurrState(opt.modello))
  const onLoad = opt.onLoad || function () { }
  opt.onLoad = function () {
    opt.setData = function (params) {
      this.setData(params)
    }.bind(this)
    onLoad.call(this)
  }
  WxModello.getMethods(opt)
})

function decorator (fn, decorators) {
  return function () {
    // arguments  小程序Page参数
    // 合并参数
    decorators && decorators.apply(this, arguments)
    // UTIL.mixin(arguments, {name: 1})
    return fn.apply(this, arguments)
  }
}

module.exports = {
  WxModello: WxModello,
  Page: $page
}
