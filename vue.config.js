module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        static: "@/static",
      },
    },
  },
  transpileDependencies: ["uview-ui"],
}
