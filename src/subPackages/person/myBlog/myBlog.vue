<template>
	<view class="myBlog">
		<!-- 封装我的博客页面: -->
		<ArticleList :articleList="articleList"></ArticleList>
	</view>
</template>

<script>
	// 导入请求方法:
	import {
		myRequest
	} from '@/utils/utils.js';
	// 导入文章组件:
	import ArticleList from '@/components/article-list/article-list.vue';
	// 导入mock的文章数据:
	import {
		articleList
	} from '@/mock/articleList.js'
	export default {
		data() {
			return {
				articleList: []
			}
		},
		created() {
			this.articleList = articleList;
			this.requestArticle()
		},
		components: {
			ArticleList
		},
		methods: {
			requestArticle() {
				let myArticle = new Promise((resolve, reject) => {
					uni.request({
						url: '/user/get/Invitation',
						method: 'GET',
						header: {
							Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcImM0NTEyYjY0ZWRkYTRkM2E4Yzg3NGUyMWZhOGFhYjNlXCIsXCJpbWFnZVVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IVXJwWWFQemR5U0RJSHJYcWlhTkVYbGdYMUZjdmliMXZhQ2tka1JacWc2NkxwZ25RaWFhaWFHM1kwNTlnbmtDMmVqRmtlbmFCaWNyUUdGVHFWQUsweG83c29RLzEzMlwiLFwibGFzdFRpbWVcIjoxNjUwNjQzMjAwMDAwLFwibG9naW5BY3RcIjpcIuWwj-afk0p1blwiLFwibmlja05hbWVcIjpcIuWwj-afk0p1blwiLFwib3BlbklkXCI6XCJvQWxjXzRfbDNCOFJiT0ROc3M2Sk5CU0Z0d1dzXCIsXCJwYXNzV29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInBob25lXCI6XCIxODA3MDU5Nzc2M1wiLFwic3RhdGVcIjoxfX0iLCJpYXQiOjE2NTIwMTM5MDgsImV4cCI6MTY1NTYxMzkwOCwianRpIjoiNDM0ZWFiZmQtZmJlNS00ZmVhLTk1YmItYzg2MDNjMDJlOTJjIn0.56v7aQXrstlhTh189TZKRJz8qO0cMgNGV2N4JHSEqpDV9MqtgJ_Cc0xDxRVPEIdH0vFWzyAu261M594RDYCOjA'
						},
						success: (res) => {
							resolve(res)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
				myArticle.then(({
					data: res
				}) => {
					let myArray = res.data;
					console.log('文章数据:', myArray)
					// console.log(this.articleList)
					this.articleList = myArray;
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
