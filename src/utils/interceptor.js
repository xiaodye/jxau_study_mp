// 请求拦截器
uni.addInterceptor("request", {
  invoke(args) {
    // 设置默认请求方式
    if (args.method === undefined) args.method = "POST"

    // 拼接根路由
    const BASE_URL = "http://192.168.196.215:8081" // chen
    // const BASE_URL = "http://192.168.196.213:8084" // dai
    // const BASE_URL = "http://192.168.196.213:8085" // dai
    args.url = BASE_URL + args.url

    // 如果有token,则在请求头添加token
    if (uni.getStorageSync("token")) {
      if (args.header) return (args.header.authorization = uni.getStorageSync("token"))
      args.header = { authorization: uni.getStorageSync("token") }
    }
  },
})

// 在 Vue 2 项目中， 使用 Vue 3 项目 API Promise 化 返回格式
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function"
}

uni.addInterceptor({
  returnValue(res) {
    if (!isPromise(res)) return res

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
