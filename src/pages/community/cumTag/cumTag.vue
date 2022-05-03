<template>
	<view class="prohibition">
		<!-- 使用封装的组件 -->
		<PageHead class="pagehead" :cumTittle="cumTittle"></PageHead>
		<view ref="tittle" class="prohibition-head">
			<view class="prohibition-tittle">
				{{cumTittle}}
				<!-- 显示加入或是已加入，点击之后分别取反： -->
				<view class="prohibition-isJoin" @click="handClick">
					已加入
				</view>
			</view>
			<!-- 包含社区logo，人数等信息的版块 -->
			<view class="prohibition-info">
				<!-- 信息描述: -->
				<view class="prohibition-desc">
					<!-- 社区logo: -->
					<image class="prohibition-logo" :src="logo" mode=""></image>
					<view class="prohibition-desctext">
						<text>{{peopleNumber}}</text>
						<text>{{contentContribution}}贡献值</text>
					</view>
				</view>
				<!-- 收藏本社区: -->
				<image class="prohibition-collect" src="https://s2.loli.net/2022/04/23/dpiK16JAkOECheH.png" mode="">
				</image>
			</view>
		</view>
		<!-- 设置文章选项栏: -->
		<!-- 看情况是否封装组件 -->
		<view class="prohibition-tab">
			<text v-for="(item,index) in artTittles" :key="index">{{item}}</text>
		</view>
		<CummunityPost></CummunityPost>
	</view>
</template>

<script>
	import PageHead from '../../../components/pageComponents/pageHead.vue';
	import CummunityPost from './cummunityPost.vue';
	export default {
		data() {
			return {
				cumTittle: '',
				logo: '',
				peopleNumber: 0,
				contentContribution: 1000,
				artTittles: ['最新发布', '最新回复', '精选', '与我相关']
			}
		},
		components: {
			PageHead,
			CummunityPost
		},
		onLoad(option) {
			// 将参数接收:
			let {
				src,
				info,
				text
			} = JSON.parse(option.cummunity);
			this.cumTittle = text;
			// 使当前的logo获得完成的路径；
			this.logo = src;
			this.peopleNumber = info;
		},
		methods: {
			// 点击对按钮显示的进行取反操作：
			handClick() {
				uni.showModal({
					title: '提示',
					content: '确定要退出此社区吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.prohibition {
		font-size: 35rpx;
		overflow: hidden;

		&-head {
			display: flex;
			position: fixed;
			flex-direction: column;
			width: 100%;
			background-color: rgb(244, 244, 244);

			// 标题与是否加入的部分:
			.prohibition-tittle {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				padding: 10rpx 0 10rpx 0;
				border-bottom: 0.01rpx solid silver;

				.prohibition-isJoin {
					padding: 10rpx;
					border: 1rpx solid silver;
					border-radius: 20rpx;
				}
			}

			// 以下模块为包含社区logo，社区其他信息的模块：
			.prohibition-info {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				padding: 10rpx 0 5rpx 0;
				background-color: white;
				// justify-content: space-around;
				float: left;
				// 社区logo：


				.prohibition-desc {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 35rpx;

					// border-bottom: 0.1rpx solid silver;
					.prohibition-logo {
						width: 80rpx;
						height: 80rpx;
						margin: 0 20rpx 0 0;
					}

					.prohibition-desctext {
						display: flex;
						flex-direction: column;
					}
				}

				.prohibition-collect {
					width: 40rpx;
					height: 40rpx;
					margin-right: 60rpx;
				}
			}
		}

		.prohibition-tab {
			z-index: 1;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin-top: 28%;
			background-color: #F4F4F4;
			border-bottom: 1rpx solid white;
			position: fixed;
			width: 100%;

			text {
				margin: 10rpx 0 5rpx 0;
				padding-right: 20rpx;
			}
		}


	}
</style>
