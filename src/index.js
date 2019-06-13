import {mixin, mergeObj} from './util.js'
import M from './modello.js'

let WXM = new M()

const _page = decorator(Page, function (options) {
  let { modello, data } = options
  mixin(data, WXM.getCurrState(modello))
  console.log('env', process.env.NODE_ENV)
  // override onLoad for override setData
  const _onLoad = options.onLoad
  options.onLoad = function (option) {
    this.$setData = options.$setData = function (params) {
      this.setData(params)
      // data consistency
      mergeObj(data, params)
    }.bind(this)
    _onLoad.call(this, option)
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
