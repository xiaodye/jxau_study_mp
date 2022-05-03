<template>
	<!-- 关于社区的列表 -->
	<view>
		<!-- 最外层容器 -->
		<view class="cummunityList">
			<!-- 中上部选项列表 -->
			<view ref="myOptions" class="cummunityList-options">
				<view class="cummunityList-optCon" v-for="(item,index) in optionList" :key="index">
					{{item}}
				</view>
			</view>
			<!-- 单个列表内容： -->
			<view :style="{ height: Math.floor(this.WindowHeight*0.8) + 'px' }" class="cummunityList-container">
				<!-- 单个结构 -->
				<!-- 需要包括一个左右布局：左边为一个导航栏，右侧为具体的社区选项 -->
				<!-- 左侧容器： -->
				<scroll-view scroll-y="true" class="cummunityList-leftList">
					<!-- 单个社区左侧的导航栏: -->
					<view class="cummunityList-singleCumm" v-for="(item,index) in leftList" :key="index">
						{{item}}
					</view>
				</scroll-view>
				<!-- 右侧容器: -->
				<scroll-view scroll-y="true" class="cummunityList-rightList">
					<view class="cummunityList-singleCummRight" v-for="(item,index) in rightList" :key="index"
						@click="goCummunity(index)">
						<image ref="cumPic" @click="handClick" :style="{width: imgWidth+'rpx',height: imgHeight+'rpx'}"
							:src="item.src"></image>
						<view class="cummunityList-rightListText">
							<text>{{item.text}}</text>
							<text>{{item.info}}</text>
						</view>
						<button size="mini" class="cummunityList-btn" @click.stop="joinCum">加入</button>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {myRequest} from '@/utils/utils.js';
	import {
		systemInfo
	} from '../../mixin.js'
	export default {
		mixins: [systemInfo],
		data() {
			return {
				imgWidth: '120',
				imgHeight: '120',
				listHeight: 0,
				WindowHeight: 0,
				optionList: ['推荐社区', '我的社区'],
				// 选项栏下方的列表:
				// 左侧列表:
				leftList: [],
				rightList: [{
					src: `https://s2.loli.net/2022/04/23/GuUiC4SITFw5Ael.png`,
					text: `前端学习社区`,
					info: `1W成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/zZyhDInS3dMu9El.png`,
					text: `后端学习社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/UwdFvehO7CK653s.png`,
					text: `大数据交流社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/jbLFQN1BYUVX89n.png`,
					text: `爬虫研究室`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/f9kzSYvKWBdX2jE.png`,
					text: `Java交流社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/nbFzY8j3UBseX4V.png`,
					text: `C++交流社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/T2iWJ4xOGHmjZ9l.png`,
					text: `算法学习社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/GuUiC4SITFw5Ael.png`,
					text: `前端学习社区`,
					info: `1W成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/zZyhDInS3dMu9El.png`,
					text: `后端学习社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/UwdFvehO7CK653s.png`,
					text: `大数据交流社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/jbLFQN1BYUVX89n.png`,
					text: `爬虫研究室`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/f9kzSYvKWBdX2jE.png`,
					text: `Java交流社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/nbFzY8j3UBseX4V.png`,
					text: `C++交流社区`,
					info: `1w成员`
				}, {
					src: `https://s2.loli.net/2022/04/23/T2iWJ4xOGHmjZ9l.png`,
					text: `算法学习社区`,
					info: `1w成员`
				}, ]
			}
		},
		onUnload() {

		},
		created() {
			this.WindowHeight = uni.getSystemInfoSync().windowHeight;
			this.requestCummunity();
			this.allCummunity();
			
		},

		methods: {
			// 跳转社区：
			// 此时需要传递的参数为点击的社区的标题，社区的logo，成员数量；
			goCummunity(index) {
				uni.navigateTo({
					url: './cumTag/cumTag?cummunity=' + JSON.stringify(this.rightList[index]),
				})
			},
			joinCum() {
				let oneCummunity=new Promise((resolve,reject)=>{
					uni.request({
						url: '/discuss/add/one/like/discuss',
						method: 'POST',
						data: {
							discussId: 1
						},
						header: {
							Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VyXCI6e1wiaWRcIjpcImM0NTEyYjY0ZWRkYTRkM2E4Yzg3NGUyMWZhOGFhYjNlXCIsXCJpbWFnZVVybFwiOlwiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9IVXJwWWFQemR5U0RJSHJYcWlhTkVYbGdYMUZjdmliMXZhQ2tka1JacWc2NkxwZ25RaWFhaWFHM1kwNTlnbmtDMmVqRmtlbmFCaWNyUUdGVHFWQUsweG83c29RLzEzMlwiLFwibGFzdFRpbWVcIjoxNjUwNzEyNjk4MDM5LFwibG9naW5BY3RcIjpcIuWwj-afk0p1blwiLFwibmlja05hbWVcIjpcIuWwj-afk0p1blwiLFwib3BlbklkXCI6XCJvQWxjXzRfbDNCOFJiT0ROc3M2Sk5CU0Z0d1dzXCIsXCJwYXNzV29yZFwiOlwiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2VcIixcInN0YXRlXCI6MX19IiwiaWF0IjoxNjUwNzEyNjk4LCJleHAiOjE2NTQzMTI2OTgsImp0aSI6IjU0NDlhNjRiLWIyZTctNDExNC04YzRiLWFkYjA3ZGM2MWFkNiJ9.daWMdZ-H1qOJqXKRVLNP-sXciFp8ThHYldOpMIHOcBmlqYdZfNTDPARQix0lGtKELlHS_cYoiMjVpfuRMk2AFw'
						},
						success: (res) => {
							resolve(res)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
				oneCummunity.then(res=>{
					console.log('加入:',res)
					
				}).catch(err=>{console.log(err)})
			},
			handClick() {
				console.log(this.$refs.cumPic)
			},
			// 获取所有的社区分类的列表:
			getKind() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: '/discuss/get/all/type',
						method: 'POST',
						data: {
							pageSize: 10,
							currentPage: 1
						},
						headers: {
							"content-type": "application/json"
						},
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						}
					})
				})
			},
			async requestCummunity() {
				let result = await this.getKind();
				// 遍历所有的社区分类，获取社区的名称再渲染:
				// 清空所有的假数据:
				this.leftList.splice(0, this.leftList.length);
				for (let i = 0; i < result.data.data.types.length; i++) {
					this.leftList.push(result.data.data.types[i].type);
				}
				console.log('获取修改过后的列表项:', ...this.leftList);
			},
			// 获取所有的社区:
			talkArea(){
				return new Promise((resolve,reject)=>{
					uni.request({
						url: '/discuss/get/all/discuss',
						method: 'POST',
						data:{
							currentPage: 1,
							pageSize: 10
						},
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						}
					})
				})
			},
			async allCummunity(){
				let result=await this.talkArea();
				console.log('所有的社区:',result);
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.cummunityList {
		// font-size: 40rpx;
		display: flex;
		flex-direction: column;

		.cummunityList-options {
			display: flex;
			flex-direction: row;
			padding-left: 10rpx;

			.cummunityList-optCon {
				margin: 20rpx;
				font-size: 35rpx;
			}
		}

		// 包括一个左右布局
		.cummunityList-container {
			display: flex;
			flex-direction: row;
			// height: auto;
			justify-content: space-between;

			// 整个左侧列表:
			.cummunityList-leftList {
				flex: 1;
				display: flex;
				// font-size: 100%;
				font-size: 35rpx;
				overflow: scroll;
				text-align: center;
				flex-direction: column;
				background-color: white;
				justify-content: space-around;

				// 左侧列表的单个容器布局:
				.cummunityList-singleCumm {
					padding: 30rpx 0 30rpx 0;
					margin: 10rpx;
				}

				.cummunityList-singleCumm:active {
					background-color: #F4F4F5;
				}
			}

			.cummunityList-rightList {
				flex: 3;
				background-color: #F4F4F5;
				padding: 0rpx 20rpx 10rpx 20rpx;

				// padding: 20rpx;
				.cummunityList-singleCummRight {
					display: flex;
					flex-direction: row;
					position: relative;
					margin: 0rpx auto 20rpx auto;
					// width: 90%;
					padding: 20rpx;
					align-items: center;
					background-color: white;

					.cummunityList-rightListText {
						display: flex;
						margin-left: 20rpx;
						font-size: 30rpx;
						flex-direction: column;
					}

					.cummunityList-btn {
						// width: 80rpx;
						height: 60rpx;
						font-size: 25rpx;
						position: absolute;
						right: 0;
						margin-right: 20rpx;
						line-height: 60rpx;
					}
				}

				.cummunityList-singleCummRight:active {
					background-color: #F4F4F5;
				}
			}
		}
	}
</style>
