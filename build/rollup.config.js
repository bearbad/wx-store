// import babel from 'rollup-plugin-babel'
// import babelrc from 'babelrc-rollup'
const replace = require('rollup-plugin-replace')

let pkg = require('../package.json')

export default {
  input: 'src/index.js',
  plugins: [
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify('development')
    })
    // babel(babelrc())
  ],
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
