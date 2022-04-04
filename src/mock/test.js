const Mock = require("mockjs")

let data = Mock.mock({
  id: "@id()",
  username: "@cname()",
  date: "@date(yyyy-MM-dd)",
  description: "@cparagraph()",
  email: "@email()",
  "age|18-40": 0,
})
console.log(data)
