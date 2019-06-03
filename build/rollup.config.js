// import babel from 'rollup-plugin-babel'
// import babelrc from 'babelrc-rollup'

let pkg = require('../package.json')

export default {
  input: 'src/index.js',
  // plugins: [
  //   babel(babelrc())
  // ],
  output: [{
    file: pkg.main,
    format: 'umd',
    name: 'wxModello',
    sourceMap: true
  },
  {
    file: pkg.module,
    format: 'es',
    sourceMap: true
  }]
}
