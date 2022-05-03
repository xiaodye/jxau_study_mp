<template>
	<view class="inpContent">
		<input v-model="iptValues" class="myipt" type="text" placeholder="请输入内容">
		<text v-if="isLike" :style="{marginLeft: 10+ 'rpx',marginTop: 10+'rpx'}"
			class="icon iconfont icon-good myGood">{{like}}</text>
		<button class="mybtn" @click="send(index)">{{action}}</button>
	</view>
</template>

<script>
	export default {
		props: ['index', 'like', 'isLike', 'action'],
		data() {
			return {
				iptValues: '',
				emojiData: []
			}
		},
		onLoad() {

		},
		methods: {
			// 发送输入的内容:0表示私信，1表示评论
			send(index) {
				if (index === 0 && this.iptValues !== '') {
					// 消息:
					let content = this.iptValues;
					let chatNew = {
						id: 0,
						userName: 'Voitto',
						userImg: 'https://i2.hdslb.com/bfs/face/762ae6f1a5988fbfe0f61cb02bfe151f2aff534e.jpg@240w_240h_1c_1s.webp',
						content
					}
					this.$emit('sendMyNew', chatNew)
					this.iptValues = '';
					chatNew = null;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.inpContent {
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: white;
		display: flex;
		// justify-content: space-around;
		padding: 20rpx 10rpx 20rpx 10rpx;
		z-index: 1;
		border-top: 1rpx solid #b598a1;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;

		.myipt {
			width: 70%;
			border-radius: 20rpx;
			border: 1rpx solid silver;
		}

		.mybtn {
			// width: 15%;
			display: flex;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
		}

		.myGood {
			display: flex;
			// width: 200rpx;
			font-size: 30rpx;
		}
	}
</style>
