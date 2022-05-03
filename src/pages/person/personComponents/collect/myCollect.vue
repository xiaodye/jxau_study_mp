<template>
	<!-- 单个收藏内容: -->
	<view class="singleCollect">
		<!-- 包括一个返回的图标，标题，作者头像，作者昵称，关注按钮: -->
		<view class="icon iconfont icon-fanhui back" @click="goOther('',2,{})"></view>
		<view class="header">
			<!-- 标题: -->
			<text class="tittle">{{article.title}}</text>
			<!-- 头像，昵称，关注: -->
			<view class="img_name_like">
				<image class="_img" :src="article.src" mode=""></image>
				<view class="name_like">
					<text class="author_name">{{article.author}}</text>
					<text class="original">原创</text>
				</view>
				<button class="attention" type="default">关注</button>
			</view>
		</view>
		<!-- 内容部分: -->
		<view class="myContent">
			<text class="myContent-main">{{article.content}}</text>
			<view v-if="article.contentImg.length!==0" class="myContent-imgGroup">
				<img v-for="(target,index) in article.contentImg" :key="index" class="img" :src="target" alt="">
			</view>
		</view>
		<!-- 评论部分: -->
		<view class="comment">
			<view class="comment-header">
				<text class="comment-num">评论{{comments.length}}</text>
			</view>
			<!-- 评论列表: -->
			<view class="comment-list">
				<!-- 单个评论： -->
				<view class="comment-list-single" v-for="(item,index) in comments" :key="index">
					<!-- 用户头像: -->
					<image class="userimg" :src="item.userImg" mode=""></image>
					<!-- 用户的昵称和发送的时间: -->
					<view class="username_content_time">
						<text class="user_name">{{item.userName}}</text>
						<text class="user_comment">{{item.commentContent}}</text>
						<text class="user_time">{{item.sendTime}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 输入: -->
		<MyIpt :isLike="isLike" :like="article.like" :action="action"></MyIpt>
	</view>
</template>

<script>
	//传入封装的请求方法:

	import {
		goDetail
	} from '@/utils/utils.js';
	import MyIpt from '@/components/pageComponents/myIpt/myIpt.vue';
	export default {
		data() {
			return {
				myReplay: '',
				action: '提交',
				isLike: true,
				// 贴子ID：
				postId: 0,
				comments: [{
						userName: 'Simon',
						userImg: 'https://i1.hdslb.com/bfs/face/cd5f53ba8b4a9186e614b0c4c645fc8fc8c38d3e.jpg@240w_240h_1c_1s.webp',
						sendTime: '2022/04/22',
						commentContent: '很有道理呀，解答了我的一些疑惑'
					},
					{
						userName: 'Voitto',
						userImg: 'https://i2.hdslb.com/bfs/face/762ae6f1a5988fbfe0f61cb02bfe151f2aff534e.jpg@240w_240h_1c_1s.webp',
						sendTime: '2022/04/22',
						commentContent: '加油一起学习吧！'
					}
				],

				article: {
					author: 'Coder Xu',
					collectNum: 0,
					content: `大家往往会陷入一个误区，试图用具体的技术来描述什么,
							是前后端分离这个一个概念，这是答非所问的。一提到前后端分离就是
							SpringBoot + Vue，这并不是正确的理解！我们问的是：你为什么采用这
							种方式解决问题回答却是：你是如何去具体做这件事前后端分离是：软件技
							术和业务发展到一定程度，在项目管理工作上必须进行的一种升级，他是
							一个必然而不是一个偶然！说白了，就是公司部门架构的一种调整。`,
					contentImg: ['https://s2.loli.net/2022/04/28/vUC8RlNHDkxwSX4.jpg'],
					create_time: '',
					id: '',
					likeNum: 666,
					src: 'https://profile.csdnimg.cn/3/6/A/1_czh500',
					title: '前后端分离是什么',
				}
			}
		},
		components: {
			MyIpt
		},
		onLoad(option) {
			// 进入本页面即可存储传递过来的贴子ID：
			this.postId = JSON.parse(option.Obj)
			console.log('查看传入的贴子ID：', this.postId);
			// console.log('显示内容pos:', JSON.parse(option.favorite))
			// let res = JSON.parse(option.favorite);
			// this.article.author = res.author;
			// this.article.tittle = res.tittle;
			// this.article.content = res.content;
			// this.article.contentImg = res.contentImg;
			// this.article.like = res.like;
			// console.log(option.favorite)
			this.getOnePost();
			this.getAllComment();
		},
		methods: {
			goOther(path, num, params) {
				goDetail(path, num, params)
			},
			getOnePost() {
				let onePost = new Promise((resolve, reject) => {
					uni.request({
						url: '/discuss/get/one/discuss/comment',
						method: 'POST',
						data: {
							commentId: 'sdfgewwe'
						},

						success: (res) => {
							resolve(res)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
				onePost.then(res => {
					console.log('测试单个讨论:', res);
					let result = res.data.data.comment;
					this.article = result;
				}).catch(err => {
					console.log('返回错误:', err);
				})
			},
			// 获取所有的评论:
			getAllComment() {
				let onePost = new Promise((resolve, reject) => {
					uni.request({
						url: '/discuss/user/get/all/discuss/re/comment',
						method: 'POST',
						data: {
							parentId: 'sdfgewwe',
							pageSize: 100,
							currentPage: 1
						},

						success: (res) => {
							resolve(res)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
				onePost.then(res => {
					// console.log( res);
					let allComments=res.data.data.reComment;
					console.log('获取评论:',allComments);
					this.comments=allComments;
					// let result = res.data.data.comment;
					// this.article = result;
				}).catch(err => {
					console.log('返回错误:', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.singleCollect {
		display: flex;
		position: relative;
		flex-direction: column;

		.back {
			position: absolute;
			top: 5%;
			left: 5%;
		}

		.header {
			display: flex;
			position: relative;
			flex-direction: column;
			// align-items: center;
			justify-content: space-around;
			margin-top: 150rpx;
			padding-bottom: 10rpx;
			// border-bottom: 0.1rpx solid #eeb8c3;

			.tittle {
				font-size: 50rpx;
				margin-left: 20rpx;
			}

			.img_name_like {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;

				._img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin: 15rpx 15rpx 10rpx 15rpx;
				}

				.name_like {
					display: flex;
					flex-direction: column;

					.author_name {
						font-size: 35rpx;
						font-weight: bold;
					}

					.original {
						// display: flex;
						font-size: 25rpx;
						width: 70rpx;
						color: #ee2c79;
						// padding: 1rpx;
						text-align: center;
						background-color: rgba(240, 161, 168, .2);
					}
				}

				.attention {
					margin-left: 40%;
					// height: 30rpx;
					font-size: 30rpx;
					font-weight: bold;
					height: 70rpx;
					line-height: 70rpx;
					box-shadow: 10rpx 10rpx 10rpx rgba(236, 155, 173, .3);
				}
			}

		}

		.myContent {
			display: flex;
			flex-direction: column;

			&-main {
				font-size: 35rpx;
				font-weight: bold;
				color: #36282b;
				margin: 0 20rpx 0 20rpx;
				font-style: '微软雅黑';
			}

			&-imgGroup {
				display: flex;
				flex-direction: row;
				margin: 10rpx 20rpx 10rpx 20rpx;

				.img {
					width: 50%;
					height: 200rpx;
				}
			}
		}

		.comment {
			display: flex;
			flex-direction: column;
			margin-top: 10rpx;
			border-top-left-radius: 15rpx;
			border-top-right-radius: 15rpx;
			padding-bottom: 65rpx;
			box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, .2);

			&-header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.comment-num {
					margin-left: 20rpx;
					font-weight: bold;
				}
			}

			&-list {
				display: flex;
				flex-direction: column;
				background-color: #F4F4F4;

				&-single {
					display: flex;
					flex-direction: row;
					background-color: white;
					margin-bottom: 10rpx;
					margin-left: 10rpx;

					// justify-content: space-around;
					.userimg {
						border-radius: 50%;
						width: 100rpx;
						height: 100rpx;
						overflow: hidden;
						margin-right: 20rpx;
					}

					.username_content_time {
						display: flex;
						flex-direction: column;

						.user_name {

							font-size: 30rpx;
						}

						.user_comment {
							font-size: 35rpx;
						}

						.user_time {
							font-size: 25rpx;
							color: grey;
						}
					}
				}
			}
		}


	}
</style>
