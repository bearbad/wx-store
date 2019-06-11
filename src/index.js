import {mixin, mergeObj} from './util.js'
import M from './modello.js'

let WXM = new M()

const $page = decorator(Page, function (opt) {
  let { modello, data } = opt
  mixin(data, WXM.getCurrState(modello))
  let onLoad = opt.onLoad || function () {}
  opt.onLoad = function (option) {
    this.$setData = opt.$setData = function (params) {
      this.setData(params)
      mergeObj(opt.data, params)
    }.bind(this)
    onLoad.apply(this, arguments)
  }
  WXM.getMethods(opt)
})

function decorator (fn, decorators) {
  return function () {
    decorators && decorators.apply(this, arguments)
    return fn && fn.apply(this, arguments)
  }
}

module.exports = {
  WxModello: WXM,
  Page: $page
}
