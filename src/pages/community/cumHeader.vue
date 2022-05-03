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
				<input class="cummunity-input" placeholder="请输入需要查找的社区" placeholder-style="text-align: left" type="text" />
			</view>
			<!-- 列表导航栏： -->
			<view class="cummunity-container">
				<view class="cummunity-icons" v-for="(item,index) in list" :key="index">
					<image @click="skipUrl(item.assignUrl)" class="cummunity-image" :src="item.src"  mode=""></image>
					<text :style="{fontSize: fs+'rpx'}">{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 字体大小:
				fs: '35',
				// 关于定位：
				pos: 'fixed',
				textPosition: 'center',
				bacColor: '#F4F4F5',
				list: [{
						text: `通知消息`,
						assignUrl: `./cummunityNews/systemNews`,
						src: `https://s2.loli.net/2022/04/23/aZHdXeSKsNoJbfA.png`
					},
					{
						text: `赞`,
						assignUrl: `./cummunityNews/receiveLike`,
						src: `https://s2.loli.net/2022/04/23/4LyclIE9TOhfdGA.png`
					},
					{
						text: `回复`,
						assignUrl: `./cummunityNews/replay`,
						src: `https://s2.loli.net/2022/04/23/FMhLoXgYlxcwRUG.png`
					},
					{
						text: `私信`,
						assignUrl: `./cummunityNews/privateLetter`,
						src: `https://s2.loli.net/2022/04/23/KaZ6Nj7g3b2vIXL.png`
					}
				]
			}
		},
		methods:{
			skipUrl(assignUrl){
				uni.navigateTo({
					url: assignUrl
				})
			}
		}
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
				position: relative;
				justify-content: space-around;
				align-items: center;
				text-align: center;
				border-radius: 40rpx;
				background-color: #F4F4F5;
			}
			// 对输入框中提示文字的样式：
			
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
