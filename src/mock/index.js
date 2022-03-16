const Mock = require("mockjs")

module.exports = function (app) {
  if (process.env.MOCK == "true") {
    // node中的express框架
    // 参数1： 接口地址；参数2：服务器处理函数
    app.use("/api/userinfo", (req, res) => {
      // 随机生成一个对象
      let data = Mock.mock({
        id: "@id()",
        username: "@cname()",
        date: "@date(yyyy-MM-dd)",
        description: "@paragraph()",
        email: "@email()",
        "age|18-40": 0,
      })
      // console.log(data)
      // 将模拟的数据转成json格式返回给浏览器
      res.json(data)
    })
  }
}
