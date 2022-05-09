<template>
	<!-- 封装错题本: -->
	<view class="errorBook">
		<QuestionList :questionList="questionList"></QuestionList>
	</view>
</template>

<script>
	import {myRequest} from '@/utils/utils.js';
	import QuestionList from '../../../components/questionInfo/questionInfo.vue';
	// 导入mock的数据:
	import {questionList} from '@/mock/questionList.js';
	export default{
		data(){
			return{
				questionList: []
			}
		},
		created() {
			
			this.questionList=questionList;
			// console.log(questionList)
			this.getAllErrorExcise()
		},
		methods:{
			getAllErrorExcise(){
				let allErrorExcise=new Promise((resolve,reject)=>{
					uni.request({
						url: '/question/get/user/mistakes',
						method: 'GET',
						header: {
							Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcImM0NTEyYjY0ZWRkYTRkM2E4Yzg3NGUyMWZhOGFhYjNlXCIsXCJpbWFnZVVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IVXJwWWFQemR5U0RJSHJYcWlhTkVYbGdYMUZjdmliMXZhQ2tka1JacWc2NkxwZ25RaWFhaWFHM1kwNTlnbmtDMmVqRmtlbmFCaWNyUUdGVHFWQUsweG83c29RLzEzMlwiLFwibGFzdFRpbWVcIjoxNjUwNjQzMjAwMDAwLFwibG9naW5BY3RcIjpcIuWwj-afk0p1blwiLFwibmlja05hbWVcIjpcIuWwj-afk0p1blwiLFwib3BlbklkXCI6XCJvQWxjXzRfbDNCOFJiT0ROc3M2Sk5CU0Z0d1dzXCIsXCJwYXNzV29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInBob25lXCI6XCIxODA3MDU5Nzc2M1wiLFwic3RhdGVcIjoxfX0iLCJpYXQiOjE2NTIwMTM5MDgsImV4cCI6MTY1NTYxMzkwOCwianRpIjoiNDM0ZWFiZmQtZmJlNS00ZmVhLTk1YmItYzg2MDNjMDJlOTJjIn0.56v7aQXrstlhTh189TZKRJz8qO0cMgNGV2N4JHSEqpDV9MqtgJ_Cc0xDxRVPEIdH0vFWzyAu261M594RDYCOjA'
						},
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
				allErrorExcise.then(({data:res})=>{
					console.log(res.data)
					this.questionList=res.data;
				}).catch(err=>{
					console.log(res)
				})
			}
		},
		components:{
			QuestionList,
		}
	}
</script>

<style lang="scss" scoped>
	
</style>