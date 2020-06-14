import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/index.ts',

  output: [
    {
      file: './dist/litedb.js',
      format: 'iife',
      name: "LiteDB"
    },
    {
      file: './dist/litedb.umd.js',
      format: 'umd',
      name: 'LiteDB'
    },
    {
      file: './dist/litedb.mjs',
      format: 'es'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    terser({
      keep_classnames: true,
      keep_fnames: true
    }) // minifies generated bundles
  ]
}