<template>
	<!-- 我的创作 包括用户发布的博客与讨论贴-->
	<view>
		<view class="myCreate">
			<view class="myCreate-tittle">
				{{tittle}}
			</view>
			<!-- 标题下方的容器 -->
			<view class="myCreate-undcon">
				<view class="myCreate-container" v-for="(item,index) in list" :key="index">
					<image class="myCreate-image" :src="item.src" mode=""></image>
					<text class="myCreate-text">{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tittle: `创作中心`,
				list: [{
						text: `我的博客`,
						src: `../../static/person/myBlog.png`
					},
					{
						text: `我的贴子`,
						src: `../../static/person/myInvitation.png`
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 最外层的容器： */
	.myCreate {
		display: flex;
		flex-direction: column;
		margin: 25rpx;
		background-color: #F4F4F5;
		border-radius: 25rpx;

		/* 标题： */
		.myCreate-tittle {
			padding: 15rpx 0rpx 10rpx 25rpx;
			// padding-left: 25rpx;
			// padding-bottom: 10rpx;
			// padding-top: 15rpx;
			float: left;
			font-size: 35rpx;
			border-bottom: 0.1rpx solid white;
		}

		.myCreate-undcon {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.myCreate-container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 1;
				padding: 15rpx;
				font-size: 30rpx;
				color: grey;
				/* 图片 */
				.myCreate-image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}
			}
		}

	}
</style>
