function mixin(o, ...params) {
  params.forEach(item => {
    for (const key in item) {
      if (isObject(o[key]) && isObject(item[key])) {
        mixin(o[key], item[key])
      } else {
        o[key] = o[key] || item[key]
      }
    }
  })
  return o
}

function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]"
}

module.exports = {
  mixin: mixin
}
