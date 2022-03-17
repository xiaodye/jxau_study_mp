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

// 在 Vue 2 项目中， 使用 Vue 3 项目 API Promise 化 返回格式
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function"
}

uni.addInterceptor({
  returnValue(res) {
    if (!isPromise(res)) {
      return res
    }
    return new Promise((resolve, reject) => {
      res.then(res => {
        if (res[0]) {
          reject(res[0])
        } else {
          resolve(res[1])
        }
      })
    })
  },
})
