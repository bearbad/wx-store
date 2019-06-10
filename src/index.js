import util from './util.js'
import Modello from './modello.js'

let WxModello = new Modello()

const $page = decorator(Page, function (opt) {
  let { modello, data } = opt
  let currState = WxModello.getCurrState(modello)
  util.mixin(data, currState)
  let onLoad = opt.onLoad || function () {}
  opt.onLoad = function (option) {
    opt.setData = function (params) {
      this.setData(params)
      util.mergeObj(data, params)
    }.bind(this)
    onLoad.apply(this, arguments)
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
