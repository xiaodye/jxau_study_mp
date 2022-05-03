<template>
	<!-- 浏览记录，时间，贴子 -->
	<view class="historyRecord">
		<!-- 历史记录的列表: -->
		<PostPage :records="records"></PostPage>
	</view>
</template>

<script>
	
	import PostPage from '../../../components/pageComponents/postPage.vue'
	export default {
		created() {
			this.myRequest();
		},
		data() {
			return {
				records: [{
						commentNumber: null,
						createTime: 1649677265000,
						id: "10f656d518fe42c1be7dbc8ac36a80a1",
						imgUrl: "https://jxau7124.oss-cn-shenzhen.aliyuncs.com/20211113/25062eca757b41e9a209e53d0b381424.jpg",
						label: "java,python",
						likeNumber: null,
						title: "修改后1",
						userImgUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/HUrpYaPzdySDIHrXqiaNEXlgX1Fcvib1vaCkdkRZqg66LpgnQiaaiaG3Y059gnkC2ejFkenaBicrQGFTqVAK0xo7soQ/132",
						userName: "小染Jun",
						visitNumber: null,
						// 内容:
						content: `#，井号：表示网页中的一个位置，被称之为锚点，常用于某个网
							页间不同位置的跳转，简单的说就是在一个网页中，URL 不变的情况下，通过
							添加“#buy”的字符在 URL 最后可以跳转到当前网页中已经定义好的锚点（id=bu
							y）位置；同样#的改变也会增加浏览器的历史记录，也就是说我们可以通过“
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
					},
					{
						commentNumber: null,
						createTime: 1649677265000,
						id: "10f656d518fe42c1be7dbc8ac36a80a1",
						imgUrl: "https://jxau7124.oss-cn-shenzhen.aliyuncs.com/20211113/25062eca757b41e9a209e53d0b381424.jpg",
						label: "java,python",
						likeNumber: null,
						title: "修改后1",
						userImgUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/HUrpYaPzdySDIHrXqiaNEXlgX1Fcvib1vaCkdkRZqg66LpgnQiaaiaG3Y059gnkC2ejFkenaBicrQGFTqVAK0xo7soQ/132",
						userName: "小染Jun",
						visitNumber: null,
						// 内容:
						content: `#，井号：表示网页中的一个位置，被称之为锚点，常用于某个网
								页间不同位置的跳转，简单的说就是在一个网页中，URL 不变的情况下，通过
								添加“#buy”的字符在 URL 最后可以跳转到当前网页中已经定义好的锚点（id=bu
								y）位置；同样#的改变也会增加浏览器的历史记录，也就是说我们可以通过“
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
					},
				]
			}
		},
		components: {
			PostPage
		},
		methods: {
			// 请求历史记录和收藏文章:
			myRequest() {
				let myreq = new Promise((resolve, reject) => {
					uni.request({
						url: '/user/get/history/view',
						header: {
							Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcImM0NTEyYjY0ZWRkYTRkM2E4Yzg3NGUyMWZhOGFhYjNlXCIsXCJpbWFnZVVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IVXJwWWFQemR5U0RJSHJYcWlhTkVYbGdYMUZjdmliMXZhQ2tka1JacWc2NkxwZ25RaWFhaWFHM1kwNTlnbmtDMmVqRmtlbmFCaWNyUUdGVHFWQUsweG83c29RLzEzMlwiLFwibGFzdFRpbWVcIjoxNjUwNzEyNjk4MDM5LFwibG9naW5BY3RcIjpcIuWwj-afk0p1blwiLFwibmlja05hbWVcIjpcIuWwj-afk0p1blwiLFwib3BlbklkXCI6XCJvQWxjXzRfbDNCOFJiT0ROc3M2Sk5CU0Z0d1dzXCIsXCJwYXNzV29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInN0YXRlXCI6MX19IiwiaWF0IjoxNjUwNzEyNjk4LCJleHAiOjE2NTQzMTI2OTgsImp0aSI6IjU0NDlhNjRiLWIyZTctNDExNC04YzRiLWFkYjA3ZGM2MWFkNiJ9.daWMdZ-H1qOJqXKRVLNP-sXciFp8ThHYldOpMIHOcBmlqYdZfNTDPARQix0lGtKELlHS_cYoiMjVpfuRMk2AFw'
						},
						method: 'GET',
						success: (res) => {
							resolve(res);
						},
						fail(err) {
							reject(err);
						}
					})
				});
				myreq.then(res => {
					console.log('返回历史记录:',res.data.data);
					// for (let i = 0; i < res.data.data.length; i++) {
					// 	this.records[i].createTime = res.data.data[i].createTime;
					// 	this.records[i].title = res.data.data[i].title;
					// 	this.records[i].imgUrl = res.data.data[i].imgUrl;
					// 	this.records[i].userImgUrl = res.data.data[i].userImgUrl;
					// 	this.records[i].userName = res.data.data[i].userName;
					// }
					this.records = res.data.data;
				}).catch(err => {
					console.log(err);
				})
			},
			// async reqHisArt(){
			// 	let result=await this.myRequest();
			// 	console.log('返回请求结果:',result);
			// 	return result;
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.historyRecord {
		display: flex;
		flex-direction: column;
	}
</style>
