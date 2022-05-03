<template>
	<!-- 单个收藏夹： -->
	<view class="singleFavorite">
		<text class="icon iconfont icon-fanhui myfanhui" @click="back"></text>
		<!-- 主要为两部分:1,上方较大的显示了标题和收藏数量的模块，2，下方列表显示收藏内容 -->
		<view class="singleFavorite-tittle_num">
			<view class="container">
				<text class="name">{{target.name}}</text>
				<text class="contents">{{target.contents}}个收藏内容</text>
			</view>
		</view>
		<view class="singleFavorite-contentList">
			<!-- 单个收藏内容: -->
			<view class="single" v-for="(item,index) in collects" :key="index" @click="goMyCollect(index)">
				<text class="tittle">{{item.title}}</text>
				<view class="content">
					{{item.content}}
				</view>
				<text>作者: <text class="author">{{item.userName}}</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		goDetail
	} from '@/utils/utils.js';
	export default {
		data() {
			return {
				flag: 1,
				thisId: '',
				target: {
					name: '',
					contents: ''
				},
				collects: [{
						id: 4,
						title: '前后端分离是什么',
						content: `大家往往会陷入一个误区，试图用具体的技术来描述什么,
						是前后端分离这个一个概念，这是答非所问的。一提到前后端分离就是
						SpringBoot + Vue，这并不是正确的理解！我们问的是：你为什么采用这
						种方式解决问题回答却是：你是如何去具体做这件事前后端分离是：软件技
						术和业务发展到一定程度，在项目管理工作上必须进行的一种升级，他是
						一个必然而不是一个偶然！说白了，就是公司部门架构的一种调整。`,
						userName: 'Coder Xu',
						contentImg: 'https://s2.loli.net/2022/04/28/vUC8RlNHDkxwSX4.jpg',
						visitNumber: 666,
						commentNumber: 10,
						likeNumber: 666
					},
					{
						id: 5,
						title: '前后端学习路线',
						content: `正在光顾 CSDN 的你，好呀，我是沉默王二。上周在欣赏阮一峰
						老师的《科技周刊》时，发现了一个牛逼的学习路线，在 GitHub 上已经标星 
						144k 了，简直火爆。里面不仅涵盖了前端和后端的学习路线，还有运维的学习
						路线。作为一名程序员，如果你还不知道这个学习路线的话，那可就亏大发了。
						这个学习路线原本是作者为他的大学教授绘制的，给学生们看的，后来就开源到了
						 GitHub，希望能够借助社区的力量帮助到更多的编程爱好者。这个学习路线还有
						 配套的视频课程，包含 TCP/UDP、TCP/IP、HTTP 缓存、CDN、DNS 等等，虽然是
						 英文版的，但制作精良，观影体验还是非常不错的。地址如下所示：`,
						userName: '沉默王二',
						contentImg: 'https://s2.loli.net/2022/04/28/vUC8RlNHDkxwSX4.jpg',
						visitNumber: 666,
						commentNumber: 10,
						likeNumber: 666
					}
				]
			}
		},
		onLoad(option) {
			// console.log('传来的参数:',option)
			let res = JSON.parse(option.Obj);
			console.log('单个收藏夹的内容:',res.id);
			this.thisId=res.id;
			this.target.name = res.name;
			this.target.contents = res.num;
			// 根据收藏夹的ID获取其所有内容:
			this.getAllConent();
		},
		methods: {
			goMyCollect(index) {
				goDetail('./myCollect', 1, this.collects[index].id);
			},
			back() {
				goDetail('', 2, {})
			},
			// 根据传来的收藏夹ID获取当前收藏夹下的有内容:
			getAllConent(){
				let myReq=new Promise((resolve,reject)=>{
					uni.request({
						url: '/user/get/favorites/essay',
						method: 'POST',
						data: {
							favoritesId: this.thisId
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
				myReq.then(res=>{
					console.log('当前收藏夹下的所有内容:',res)
					// 赋值给本地的数据:
					this.collects=res.data.data;
				}).catch(err=>{
					console.log('返回错误:',err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.singleFavorite {
		position: relative;

		.myfanhui {
			position: absolute;
			top: 10%;
			left: 5%;
		}

		&-tittle_num {
			display: flex;
			height: 400rpx;
			background-color: #e9ccd3;
			flex-direction: column;

			.container {
				display: flex;
				flex-direction: column;
				margin-top: 32%;
				margin-left: 20rpx;

				.name {
					font-size: 50rpx;
					font-weight: bold;
					margin-bottom: 15rpx;
					color: #eef7f2;
				}

				.contents {
					font-size: 35rpx;
				}
			}
		}

		&-contentList {
			display: flex;
			flex-direction: column;
			background-color: #F4F4F4;
			justify-content: space-around;

			.single {
				display: flex;
				flex-direction: column;
				background-color: white;
				margin-bottom: 20rpx;
				padding: 10rpx;
				justify-content: space-around;

				.tittle {
					// font-weight: bold;
					font-size: 45rpx;
				}

				.content {
					// width: 70%;
					color: silver;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.author {
					font-weight: bold;
				}
			}
		}
	}
</style>
