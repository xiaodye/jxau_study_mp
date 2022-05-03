<template>
	<view>
		<!-- 头部模块： -->
		<view class="header">
			<text class="header-perInfo" @click="goPersonInfo('././settingInfo/personInfo',0,{})">个人信息</text>
			<!-- 设置： -->
			<image :src="setIcon" class="header-setIcon"
				@click="goSetting('././settingInfo/setting',0,{})"></image>
			<!-- 头部容器 -->
			<view class="header-container">
				<!-- 头像容器 -->
				<view class="header-image-container">
					<image :src="headerImage" class="header-image"></image>
				</view>
				<!-- 用户名： -->
				<text class="header-userName">{{ userName }}</text>
				<!-- 昵称，签名，性别图标 -->
				<image :src="isMan ? manIcon : womanIcon" class="header-icon"></image>
				<!-- 用户签名： -->
				<text class="header-signature">{{ signature }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		goDetail
	} from '../../utils/utils.js';
	export default {
		data() {
			return {
				headerImage: `../../static/person/myHeaderPicture.jpg`,
				userName: `Simon`,
				// 设置图标：
				setIcon: `../../static/person/setting.png`,
				manIcon: `../../static/person/man.png`,
				womanIcon: `../../static/person/woman.png`,
				// 注册时接收性别信息，切换昵称后的图标：
				isMan: true,
				signature: `这家伙很懒，什么都没留下`,
			};
		},
		onLoad() {},
		methods: {
			goSetting(path, num,params) {
				goDetail(path,num,params)
			},
			goPersonInfo(path,num,params){
				goDetail(path,num,params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 头部模块
	.header {
		$size: 60rpx;
		position: relative;

		// 个人信息指示标签：
		.header-perInfo {
			// width: 200rpx;
			font-size: 25rpx;
			line-height: 45rpx;
			text-indent: 15rpx;
			margin-top: 15rpx;
			float: right;
			border: 1rpx solid silver;
			background-color: white;
			text-align: center;
			margin-right: 70rpx;
			border-radius: 30rpx;
		}

		.header-perInfo:active {
			background-color: #f2f2f8;
		}

		// 个人信息指示标签图标：
		.header-perInfo::after {
			width: 20rpx;
			height: 20rpx;
			content: "";
			display: block;
			float: right;
			margin-top: 10rpx;
			margin-right: 15rpx;
			background: url(../../static/person/right.png) no-repeat 0 0;
			background-size: 100% 100%;
		}

		// 设置图标:
		.header-setIcon {
			width: $size;
			height: $size;
			float: right;
			width: 40rpx;
			height: 40rpx;
			margin-top: 18rpx;
			margin-right: 20rpx;
		}

		// 头部容器
		.header-container {
			width: 100%;

			// 图片容器：
			.header-image-container {
				$width: 128rpx;
				$hun: 100%;
				width: $width;
				height: $width;
				border-radius: 50%;
				background-color: blue;
				overflow: hidden;
				margin: 25rpx;

				// 图片占满容器：
				.header-image {
					width: $hun;
					height: $hun;
				}
			}

			// 用户名：
			.header-userName {
				position: absolute;
				left: 180rpx;
				top: 10rpx;
				font-size: 40rpx;
			}

			// 用户性别图标
			.header-icon {
				position: absolute;
				top: 20rpx;
				left: 310rpx;
				width: 40rpx;
				height: 40rpx;
			}

			// 设置用户签名:
			.header-signature {
				font-size: 30rpx;
				position: absolute;
				top: 70rpx;
				left: 180rpx;
			}
		}
	}
</style>
