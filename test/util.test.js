import util from '../src/util.js'

describe('test util.mixin', function () {
  it('util.mixin 基本对象', () => {
    let ret = {a: 1, b: 2, c: 3}
    let source = {a: 11, d: 4}
    let o = util.mixin(ret, source)
    expect(o).toEqual({a:1, b:2, c:3, d:4})
  })
  it('util.mixin 嵌套对象', () => {
    let ret = {a: 1, b: {c: 3}}
    let source = {c: 3, b: {c: 4}}
    let o = util.mixin(ret, source)
    expect(o).toEqual({a:1, b:{c: 3}, c:3})
  })
})
