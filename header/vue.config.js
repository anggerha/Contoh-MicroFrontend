const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // devServer: {
  //   proxy: "https://app.fti.ukdw.ac.id/*",
  // },
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: "system",
      filename: "js/[name].js",
    }
  }
})
