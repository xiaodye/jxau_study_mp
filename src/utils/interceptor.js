// 根路由
// const BASE_URL = "http://192.168.196.215:8081" // chen
// const BASE_URL = "http://192.168.196.237:8089" // chen
// const BASE_URL = "http://192.168.100.82:8089" // chen
// const BASE_URL = "http://192.168.196.237:8081" // chen
// const BASE_URL = "http://192.168.43.134:8081" // chen
// const BASE_URL = "http://192.168.196.213:8084" // dai
// const BASE_URL = "http://192.168.196.213:8085" // dai
const BASE_URL = "http://192.168.196.213:8089" // dai

// add token
function addToken(args) {
  if (uni.getStorageSync("token")) {
    if (args.header) return (args.header.authorization = uni.getStorageSync("token"))
    args.header = { authorization: uni.getStorageSync("token") }
  }
}

// 请求拦截器
uni.addInterceptor("request", {
  invoke(args) {
    // 设置默认请求方式
    if (args.method === undefined) args.method = "POST"
    // 拼接根路由
    args.url = BASE_URL + args.url
    // 如果有token,则在请求头添加token
    addToken(args)
  },

  // 响应拦截
  success({ data: res }) {
    // 无token、token无效、token过期
    if (res.status === "511") {
      uni.reLaunch({ url: "/pages/login/login" })
    }
  },
})

// 上传文件拦截器
uni.addInterceptor("uploadFile", {
  invoke(args) {
    args.url = BASE_URL + args.url
    addToken(args)
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
      res.then((res) => {
        if (res[0]) {
          reject(res[0])
        } else {
          resolve(res[1])
        }
      })
    })
  },
})
