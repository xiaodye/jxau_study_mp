<template>
	<view>
		<view class="demo"
			:style="'height:' +  140 + 'rpx;' + 'padding-top:' + this.demo.top + 'px;padding-bottom:25rpx;'">
			<!-- 返回的图标: -->
			<image class="demo-image" :src="src" @click="backMainPage"></image>
			<view class="left" :style="'top:' + demo.top + 'px'">
				<view class="iconfont icon-xiaoxi"></view>
			</view>
			<text class="demo-text">{{cumTittle}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://s2.loli.net/2022/04/23/5LJX1vmPdhB8i4w.png',
				demo: {
					currentWidth: 0,
					top: 0,
					height: 0
				},
			}
		},
		props: ['cumTittle'],
		onLoad(option) {

		},
		methods: {
			// 点击返回：
			backMainPage() {
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-left',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.demo {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		// background: #fff;
		background-color: #fff;
		padding: 10rpx;
		.demo-image {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			left: 2%;
			bottom: 10%;
		}

		.demo-text {
			position: absolute;
			font-size: 35rpx;
			bottom: 15%;
		}

		.left {
			float: left;
			position: absolute;
			width: max-content;
			height: max-content;
			top: 0;
			bottom: 0;
			left: 20rpx;
			margin: auto;

			.iconfont {
				color: #3C3C3C;
			}
		}

	}
</style>
