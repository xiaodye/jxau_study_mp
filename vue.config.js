module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
    },
  },
  lintOnSave: false,
  devServer: {
    // devServer在发送请求时，会先走到before指定的函数中进行处理，如果before中没有对应的接口路由，才会请求外网等
    before: require("../jxau_study_mp_vscode/src/mock/index.js"),
  },
  configureWebpack: {
    resolve: {
      alias: {
        static: "@/static",
        components: "@/components",
        pages: "@/pages",
        subPackages: "@/subPackages",
        utils: "@/utils",
      },
    },
  },
  transpileDependencies: ["uview-ui"],
}
