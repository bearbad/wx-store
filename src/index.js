import {mixin, mergeObj} from './util.js'
import Modello from './modello.js'

let M = new Modello()

const _page = decorator(Page, function (options) {
  let { modello, data } = options

  // mixin state to data
  mixin(data, M.getCurrState(modello))

  // override onLoad for override setData
  // set page global $setData
  const _onLoad = options.onLoad
  options.onLoad = function (option) {
    this.$setData = options.$setData = function (params) {
      this.setData(params)
      
      // data consistency
      mergeObj(data, params)
    }.bind(this)
    _onLoad.call(this, option)
  }

  // mixin methods
  M.getMethods(options)
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
