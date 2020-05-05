
export default {
  input: "./lib/index.js",

  output: [
    {
      format: 'iife',
      name: "LiteDB",
      file: "./dist/litedb.js"
    },
    {
      format: 'umd',
      name: "LiteDB",
      file: "./dist/litedb.umd.js"
    },
    {
      format: 'cjs',
      name: "LiteDB",
      file: "./dist/litedb.cjs.js"
    },
    {
      format: 'es',
      name: "LiteDB",
      file: "./dist/litedb.mjs"
    }
  ]
}