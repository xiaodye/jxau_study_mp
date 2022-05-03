<template>
	<!-- 主要为收到的赞 -->
	<view class="receiveLike">
		<!-- 单个列表元素 -->
		<view class="receiveLike-single" v-for="(item,index) in people" :key="index">
			<!-- 头像和消息部分: -->
			<image class="headerImg" :src="item.headerImg" mode=""></image>
			<view class="nameAndTime">
				<!-- 显示昵称 -->
				<view class="nickName">
					{{item.name}}
				</view>
				<!-- 显示时间: -->
				<view class="time">{{item.time}}</view>
			</view>
			<!-- 后面的详情: -->
			<view class="details">
				详情
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				people: [{
						name: 'Simon',
						headerImg: '../../../static/person/myRecruit.png',
						time: '2022-3-18 10:10'
					},
					{
						name: 'Lucy',
						headerImg: '../../../static/person/myBlog.png',
						time: '2022-4-1 12:40'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.receiveLike {
		display: flex;
		flex-direction: column;

		&-single {
			display: flex;
			flex-direction: row;
			position: relative;
			width: 100%;
			padding: 20rpx 20rpx 25rpx 20rpx;
			border-bottom: 1rpx solid rgba(204, 204, 214, .5);

			.headerImg {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.nameAndTime {
				display: flex;
				margin-left: 15rpx;
				flex-direction: column;

				.nickName {
					margin-bottom: 5rpx;
					font-weight: bold;
					// margin-left: 15rpx;
				}

				.nickName:after {
					content: '赞了我';
					font-weight: normal;
					display: inline-block;
					margin-left: 15rpx;
				}

				.time {
					display: block;
					color: #a7a8bd;
				}
			}
		}

		.details {
			position: absolute;
			right: 10%;
			top: 50%;
			padding: 10rpx;
			color: #a7a8bd;
			font-size: 30rpx;
			transform: translateY(-50%);
		}

		.details:active {
			color: grey;
		}
	}
</style>
