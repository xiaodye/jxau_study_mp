<template>
  <!-- 封装我创作的贴子: -->
  <view>
    <u-navbar :title="tittle" :autoBack="true"></u-navbar>
    <view class="myCreated">
      <PostPage></PostPage>
    </view>
  </view>
</template>

<script>
import PostPage from "../../../components/pageComponents/postPage.vue"
export default {
  data() {
    return {
      tittle: "",
      records: [
        {
          time: "2022-04-23",
          tittle: "URL 链接中 井号#、问号?、连接符& 分别有什么作用？",
          content: `#，井号：表示网页中的一个位置，被称之为锚点，常用于某个网
						页间不同位置的跳转，简单的说就是在一个网页中，URL 不变的情况下，通过
						添加“#buy”的字符在 URL 最后可以跳转到当前网页中已经定义好的锚点（id="bu
						y"）位置；同样#的改变也会增加浏览器的历史记录，也就是说我们可以通过“
						后退”按钮回到上一个位置，而熟悉网页开发的朋友们可能也会用于 ajax 的
						一些操作中，以此来实现不同的访问状态和改变页面访问内容，从而也可以实
						现那种无刷新载入的效果。例如：https://zhan.leiue.com/fanly-mip.htm
						l#buy （访问该链接就可以直接跳转到 Fanly MIP 主题页面的购买位置哦）
						?，号：常用于动态网站，实现不同的参数值而生成不同的页面或者返回不同的
						结果，例如 WordPress 的动态链接就是/?p=ID，其中的 p 就表示 post 文章，I
						D 就表示文章的 ID，从而可以通过文章的 ID 来访问不同的文章。当然我们还常
						用的就是通过问号+任意参数来实现页面的刷新，从而获得最新的页面或者缓存的刷
						新。例如：https://i.leiue.com/avatar/?size=100 （访问该链接就可以获得用
						户中心默认的用户头像，并且其 size 就是图像像素大小，所以就会是一个 100px 
						的头像显示）&，连接符：既然被叫做是链接符号，那就是连接的作用，也可以说是不
						同参数的间隔符，一般与问号结合使用，一个动态 URL 链接中以问号开始第一个参数
						，同&连接符来串联多个参数和值。`,
          contentImg: "https://s2.loli.net/2022/04/23/zZyhDInS3dMu9El.png",
          readNum: "6W",
          like: "6666",
          comment: "666",
          author: "沉默王二",
        },
        {
          time: "2022-04-23",
          tittle: "URL 链接中 井号#、问号?、连接符& 分别有什么作用？",
          content: `#，井号：表示网页中的一个位置，被称之为锚点，常用于某个网
						页间不同位置的跳转，简单的说就是在一个网页中，URL 不变的情况下，通过
						添加“#buy”的字符在 URL 最后可以跳转到当前网页中已经定义好的锚点（id="bu
						y"）位置；同样#的改变也会增加浏览器的历史记录，也就是说我们可以通过“
						后退”按钮回到上一个位置，而熟悉网页开发的朋友们可能也会用于 ajax 的
						一些操作中，以此来实现不同的访问状态和改变页面访问内容，从而也可以实
						现那种无刷新载入的效果。例如：https://zhan.leiue.com/fanly-mip.htm
						l#buy （访问该链接就可以直接跳转到 Fanly MIP 主题页面的购买位置哦）
						?，号：常用于动态网站，实现不同的参数值而生成不同的页面或者返回不同的
						结果，例如 WordPress 的动态链接就是/?p=ID，其中的 p 就表示 post 文章，I
						D 就表示文章的 ID，从而可以通过文章的 ID 来访问不同的文章。当然我们还常
						用的就是通过问号+任意参数来实现页面的刷新，从而获得最新的页面或者缓存的刷
						新。例如：https://i.leiue.com/avatar/?size=100 （访问该链接就可以获得用
						户中心默认的用户头像，并且其 size 就是图像像素大小，所以就会是一个 100px 
						的头像显示）&，连接符：既然被叫做是链接符号，那就是连接的作用，也可以说是不
						同参数的间隔符，一般与问号结合使用，一个动态 URL 链接中以问号开始第一个参数
						，同&连接符来串联多个参数和值。`,
          contentImg: "https://s2.loli.net/2022/04/23/zZyhDInS3dMu9El.png",
          readNum: "6W",
          like: "6666",
          comment: "666",
          author: "沉默王二",
        },
      ],
    }
  },
  onLoad(option) {
    let res = JSON.parse(option.Obj)
    console.log("post的res", res)
    this.tittle = res.text
    // console.log(res);
    this.myRequest()
  },
  components: {
    PostPage,
  },
  methods: {
    myRequest() {
      let myreq = new Promise((resolve, reject) => {
        uni.request({
          url: "/user/get/Invitation",
          method: "GET",
          header: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcImM0NTEyYjY0ZWRkYTRkM2E4Yzg3NGUyMWZhOGFhYjNlXCIsXCJpbWFnZVVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IVXJwWWFQemR5U0RJSHJYcWlhTkVYbGdYMUZjdmliMXZhQ2tka1JacWc2NkxwZ25RaWFhaWFHM1kwNTlnbmtDMmVqRmtlbmFCaWNyUUdGVHFWQUsweG83c29RLzEzMlwiLFwibGFzdFRpbWVcIjoxNjUwNzEyNjk4MDM5LFwibG9naW5BY3RcIjpcIuWwj-afk0p1blwiLFwibmlja05hbWVcIjpcIuWwj-afk0p1blwiLFwib3BlbklkXCI6XCJvQWxjXzRfbDNCOFJiT0ROc3M2Sk5CU0Z0d1dzXCIsXCJwYXNzV29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInN0YXRlXCI6MX19IiwiaWF0IjoxNjUwNzEyNjk4LCJleHAiOjE2NTQzMTI2OTgsImp0aSI6IjU0NDlhNjRiLWIyZTctNDExNC04YzRiLWFkYjA3ZGM2MWFkNiJ9.daWMdZ-H1qOJqXKRVLNP-sXciFp8ThHYldOpMIHOcBmlqYdZfNTDPARQix0lGtKELlHS_cYoiMjVpfuRMk2AFw",
          },
          success: res => {
            resolve(res)
          },
          fail: err => {
            reject(err)
          },
        })
      })
      myreq
        .then(res => {
          let result = res.data.data
          // for(let i=0;i<result.length;i++){
          // 	this.myrecords[i].
          // }
          this.records = result
          console.log(result)
        })
        .catch(err => {
          console.log("返回错误:", err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.myCreated {
  margin-top: 150rpx;
  display: flex;
  flex-direction: column;
}
</style>
