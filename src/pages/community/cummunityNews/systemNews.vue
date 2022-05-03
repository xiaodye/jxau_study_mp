<template>
	<!-- 系统通知消息: -->
	<!-- 包含头像与文字 -->
	<!-- 使用封装的组件 -->
	<!-- 外部容器，左右布局，主要为头像和消息部分 -->
	<view class="container">
		<view class="container-wrap" v-for="(item,index) in list" :key="index">
			<view class="imgContainer">
				<image class="container-headerImg" :src="src" mode=""></image>
			</view>
			<view class="container-systemNews">
				<!-- 消息部分包括系统消息的标题和内容 -->
				<view class="container-tittle">
					{{item.tittle}}
				</view>
				<view class="container-text">
					{{item.text}}
				</view>
				<view class="container-time">
					{{item.time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: `https://s2.loli.net/2022/04/23/j5nmRFBOvrxgJNo.png`,
				list: [{
						tittle: `快回来学习!`,
						text: `Hi,小码农，最新的算法刷题打卡活动开始啦！
						打满30天有惊喜哦，快约上小伙伴一起来打卡吧！
						详情请点击https://www.csdn.net/`,
						time: `2022-3-10`
					},
					{
						tittle: `您的会员即将到期`,
						text: `Hello!亲爱的小码农，您的会员将于2022年5月13日到期，若需要可续费。充值会员可享受题库开放所有试题，面经等诸多优惠哦，详情请点击链接:
						https://www.csdn.net`,
						time: `2022-4-1`
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		&-wrap {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid rgb(226, 225, 228);

			.imgContainer {
				// width: 10%;

				.container-headerImg {
					width: 100rpx;
					height: 100rpx;
					margin: 20rpx 10rpx 0 14rpx;
					border-radius: 50%;
				}

			}

			.container-systemNews {
				width: 75%;
				display: flex;
				flex-direction: column;
				padding: 10rpx 10rpx 10rpx 0;

				.container-tittle {
					padding-bottom: 10rpx;
					font-size: 40rpx;
					font-weight: bold;
				}

				.container-text {
					font-size: 35rpx;
				}
				.container-time{
					margin-top: 15rpx;
					font-size: 30rpx;
					color: #7a7374;
				}
			}
		}
	}
</style>
