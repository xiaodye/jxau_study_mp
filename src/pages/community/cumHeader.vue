<template>
	<!-- 关于社区模块的设计 -->
	<view :style="{backgroundColor: bacColor}">
		<!-- 最外层容器， -->
		<view class="cummunity">
			<!-- 设计为一个搜索框加一个图标导航栏 -->
			<!-- 搜索框容器 -->
			<view class="cummunity-inpCon">
				<!-- 搜索框需要一个图标 -->
				<image class="cummunity-searchIcon" src="../../static/cummunity/mySearch.png" mode=""></image>
				<input class="cummunity-input" type="text" placeholder="请输入问题或贴子" />
			</view>
			<!-- 列表导航栏： -->
			<view class="cummunity-container">
				<view class="cummunity-icons" v-for="(item,index) in list" :key="index">
					<image class="cummunity-image" :src="item.src" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bacColor: 'white',
				list: [{
						text: `通知消息`,
						src: `../../static/cummunity/inform.png`
					},
					{
						text: `赞`,
						src: `../../static/cummunity/myLike.png`
					},
					{
						text: `回复`,
						src: `../../static/cummunity/myReplay.png`
					},
					{
						text: `私信`,
						src: `../../static/cummunity/privateLetter.png`
					}
				]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.cummunity {
		display: flex;
		flex-direction: column;
		background-color: white;

		.cummunity-inpCon {
			width: 100%;
			margin-top: 20rpx;
			position: relative;

			.cummunity-searchIcon {
				width: 5%;
				height: 50%;
				top: 50%;
				position: absolute;
				transform: translateY(-50%);
				left: 7%;
				z-index: 1;
			}

			// height: ;
			.cummunity-input {
				width: 90%;
				display: flex;
				height: 80rpx;
				margin: 0 auto;
				text-indent: 60rpx;
				align-items: center;
				border-radius: 40rpx;
				background-color: #F4F4F5;
			}
		}

		.cummunity-container {
			display: flex;
			margin-top: 20rpx;
			flex-direction: row;
			border-radius: 25rpx;
			background-color: white;

			.cummunity-icons {
				width: 100%;
				margin: 20rpx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: space-around;

				.cummunity-image {
					width: 80rpx;
					height: 80rpx;

				}
			}
		}
	}
</style>
