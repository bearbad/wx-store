import UTIL from './util.js'
import Modello from './modello.js'

let WxModello = new Modello()

const $page = decorator(Page, function (opt) {
  UTIL.mixin(opt.data, WxModello.getCurrState(opt.modello))
  const onLoad = opt.onLoad || function () {}
  opt.onLoad = function (option) {
    opt.setData = function (params) {
      this.setData(params)
    }.bind(this)
    onLoad.call(this, option)
  }
  WxModello.getMethods(opt)
})

function decorator (fn, decorators) {
  return function () {
    decorators && decorators.apply(this, arguments)
    return fn && fn.apply(this, arguments)
  }
}

module.exports = {
  WxModello: WxModello,
  Page: $page
}
