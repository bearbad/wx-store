import {mixin, mergeObj} from './util.js'
import M from './modello.js'

let WXM = new M()

const _page = decorator(Page, function (options) {
  let { modello, data } = options
  mixin(data, WXM.getCurrState(modello))
  const _onLoad = options.onLoad
  options.onLoad = function (option) {
    this.$setData = options.$setData = function (params) {
      this.setData(params)
      mergeObj(options.data, params)
    }.bind(this)
    _onLoad.apply(this, arguments)
  }
  WXM.getMethods(options)
})

function decorator (fn, decorators) {
  return function () {
    decorators && decorators.apply(this, arguments)
    return fn && fn.apply(this, arguments)
  }
}

module.exports = {
  WxModello: WXM,
  Page: _page
}
