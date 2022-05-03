<template>
	<view class="privateLetter">
		<!-- 私信部分需要一个列表，显示哪些用户与“我”发过消息 -->
		<!-- 同时私信页面还需要添加消息提醒，即badge -->
		<view class="userList">
			<!-- <view class="userList-tabs"> -->
			<text class="userList-tabs">聊天列表</text>
			<!-- </view> -->
			<!-- 单个用户: -->
			<!-- 分两个部分：左边为用户头像，中间为用户昵称和部分内容和时间 -->
			<view class="userList-single" v-for="(item,index) in userList" :key="index" @click="showDetails(index)">
				<image class="userImg" :src="item.userImg"></image>
				<!-- 右侧部分: -->
				<view class="userInfo">
					<text class="userName">{{item.userName}}</text>
					<text class="userContent">{{item.content}}</text>
				</view>
				<text class="userTime">{{item.time}}</text>
				<!-- 用于作消息提醒的红点: -->
				<view v-if="item.value!==0" class="mesRemind">
					{{item.value}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const {
		log
	} = console;
	export default {
		data() {
			return {
				//userList:用户列表，显示哪些用户与“我”进行私信:
				userList: [{
						id: 1,
						userImg: 'https://i0.hdslb.com/bfs/face/3ed6cfcaf4a2088430293d652ac728bc840d127e.jpg@240w_240h_1c_1s.webp',
						userName: 'Simon',
						time: '2022/04/10 10:08:56', //时间显示多少号;
						value: 1, //显示消息的数量;
						content: '您好，看了您的博客之后我有个问题想问问您，就是关于……' //部分内容
					},
					{
						id: 2,
						userImg: 'https://i2.hdslb.com/bfs/face/f5d996322f0e960b50a95d1c20e7824bfa64887d.jpg@240w_240h_1c_1s.webp',
						userName: 'Lucy',
						time: '2022/04/10 10:08:56', //时间显示多少号;
						value: 2,
						content: '您好，请问能分享一下您的面经吗，感激不尽' //部分内容
					},
					{
						id: 3,
						userImg: 'https://i2.hdslb.com/bfs/face/1bcb8694c484750d99a6ec4e50bf7a71ff2d7e82.jpg@240w_240h_1c_1s.webp',
						userName: 'Judy',
						time: '2022/04/10 10:08:56', //时间显示多少号;
						value: 3,
						content: '您好，看了您的博客之后我有个问题想问问您，就是关于……' //部分内容
					},
					{
						id: 4,
						userImg: 'https://i0.hdslb.com/bfs/face/4e4b647405d5c4a2bf7d10402cedf55ad9a0e544.jpg@240w_240h_1c_1s.webp',
						userName: 'Mike',
						time: '2022/04/10 10:08:56', //时间显示多少号;
						value: 4,
						content: 'Hello,大佬我想加您好友一下，方便给个微信吗' //部分内容
					},
					{
						id: 5,
						userImg: 'https://i0.hdslb.com/bfs/face/4e4b647405d5c4a2bf7d10402cedf55ad9a0e544.jpg@240w_240h_1c_1s.webp',
						userName: 'Mike',
						time: '2022/04/10 10:08:56', //时间显示多少号;
						value: 0,
						content: 'Hello,大佬我想加您好友一下，方便给个微信吗' //部分内容
					}
				]
			}
		},
		methods: {
			// 使用路由传参，把用户名，用户回复内容作为参数传入被封装的组件:
			showDetails(index) {
				uni.navigateTo({
					url: '../cumTag/chat?chatObj=' + JSON.stringify(this.userList[index])
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.privateLetter {
		display: flex;
		flex-direction: column;

		// align-items: center;
		.userList {
			position: relative;
			display: flex;
			flex-direction: column;

			// justify-content: space-around;
			.userList-tabs {
				margin-left: 10rpx;
				margin-bottom: 20rpx;
				font-size: 35rpx;
				padding: 10rpx 0 10rpx 0;
				border-bottom: 1rpx solid #e9ccd3;
				box-shadow: 10rpx 10rpx 10rpx rgba(0, 0, 0, .1);
			}

			// 单个用户部分:左右布局
			.userList-single {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				padding: 15rpx 0 10rpx 0;
				font-size: 35rpx;
				border-bottom: 1rpx solid #e9d7df;
				position: relative;

				.userImg {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				.userInfo {
					display: flex;
					width: 60%;
					padding: 0 0 15rpx 15rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					position: relative;
					flex-direction: column;

					.userName {
						// padding-bottom: 10rpx;
					}

					.userContent {
						width: 90%;
						margin-top: 5rpx;
						font-size: 35rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.userTime {
					// margin-right: 8%;
					width: 30%;
					margin-top: 15rpx;
					margin-right: 10rpx;
					color: #b598a1;
					font-size: 30rpx;
				}

				.mesRemind {
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					bottom: 20%;
					right: 2%;
					color: white;
					font-size: 30rpx;
					border-radius: 50%;
					line-height: 50rpx;
					background-color: #d2357d;
					text-align: center;
				}

				// 动态绑定的样式，在列表元素被点击之后
				.mesActive {}
			}

			.userList-single:active {
				background-color: #d1c2d3;
			}
		}
	}
</style>
