// 请求拦截器
uni.addInterceptor("request", {
  invoke(args) {
    // 拼接根路由
    const BASE_URL = "http://127.0.0.1:3007"
    args.url = BASE_URL + args.url

    // 如果有token并且请求有权限,则在请求头添加token
    if (uni.getStorageSync("token") && args.url.indexOf("/api/") === -1) {
      if (args.header) return (args.header.Authorization = uni.getStorageSync("token"))
      args.header = { Authorization: uni.getStorageSync("token") }
    }
  },
})
