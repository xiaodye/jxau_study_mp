<template>
	<view>
		<view class="container">
			<!-- 容器上方的标题 -->
			<!-- 为学习时长添加一个伪类用于顶部的添加修饰 -->
			<text class="container-tittle">学习时间</text>
			<!-- 容器中即为当天的学习时间和一周的学习总时长 -->
			<view class="container-learningTime">
				<view class="container-daylea">
					<text class="container-todTime">{{todayLearningTime}}</text>
				</view>
				<view class="container-weklea">
					<text class="container-weekTime">{{oneWeekLearningTime}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				todayLearningTime: 20 + `分钟`,
				oneWeekLearningTime: 20 + `小时`,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		margin: 25rpx;
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		// align-items: center;
		background-image: linear-gradient(to right, #D4E0F7, #D9EDF7, #EAF2FF, #D4E0F7);
		// background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);

		.container-tittle {
			padding-left: 20rpx;
			padding-bottom: 10rpx;
			margin-top: 20rpx;
			// text-indent: 20rpx;
			// width: 100%;
			// padding: 10rpx;
			font-size: 35rpx;
			float: left;
			border-bottom: 1rpx solid white;
		}

		.container-learningTime {
			display: flex;
			flex-direction: row;

			// justify-content: center;
			// align-items: center;{}
			.container-daylea,
			.container-weklea {
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				flex: 1;
				font-size: 40rpx;
				text-align: center;
				// border: 0.1rpx solid silver;
				// border-radius: 15rpx;
			}

			.container-daylea {
				padding-right: 5rpx;

				.container-todTime::after {
					content: '今日学习时长';
					font-size: 35rpx;
					display: block;
					color: grey;
				}
			}

			.container-weklea {
				padding-left: 5rpx;

				.container-weekTime::after {
					content: '本周学习时长';
					font-size: 35rpx;
					display: block;
					color: grey;
				}
			}
		}
	}
</style>
