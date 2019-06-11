import {arrToObj, mixin, mergeObj} from '../src/util.js'

describe('test arrToObj', function() {
  it('[a, b, c]', () => {
    let arr = ['a', 'b', 'c']
    let ret = arrToObj(arr, 1)
    expect(ret).toEqual({a: {b: {c: 1}}})
  })
})

describe('test mergeObj', function () {
  it('util.mergeObj 平铺对象', () => {
    let ret = {a: {b: {c: 1}}}
    let source = {'a.b.c': 2}
    let o = mergeObj(ret, source)
    expect(o).toEqual({a: {b: {c: 2}}})
  })
})

describe('test util.mixin', function () {
  it('util.mixin 基本对象', () => {
    let ret = {a: 1, b: 2, c: 3}
    let source = {a: 11, d: 4}
    let o = mixin(ret, source)
    expect(o).toEqual({a:1, b:2, c:3, d:4})
  })
  it('util.mixin 嵌套对象', () => {
    let ret = {a: 1, b: {c: 3}}
    let source = {c: 3, b: {c: 4}}
    let o = mixin(ret, source)
    expect(o).toEqual({a:1, b:{c: 3}, c:3})
  })
})
