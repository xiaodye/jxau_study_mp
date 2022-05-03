<template>
	<!-- 封装的组件，用于展示与某个用户的私信: -->
	<!-- 自定义导航头: -->
	<view class="chat">
		<u-navbar :title="chatTittle" @rightClick="rightClick" :autoBack="true">
		</u-navbar>
		<!-- 下方显示的即为聊天区域: -->
		<!-- 需要获得时间戳: -->
		<view :style="{height: WindowHeight+'px'}" class="chatArea">
			<!-- 单个聊天消息: -->
			<view v-for="(item,index) in messageList" :key="index"
				:class="{'reverse': item.id===id,'singleNews':item.id!==id}">
				<!-- 其中包括用户头像，用户发送的消息内容,获取时间: -->
				<image class="userImg" :src="item.userImg"></image>
				<!-- 放置聊天内容的部分: -->
				<text class="myContent">{{item.content}}</text>
			</view>
		</view>
		<view class="inpContent">
			<input v-model="iptValues" class="myipt" type="text" placeholder="请输入内容">
			<text :style="{marginLeft: 10+ 'rpx',marginTop: 10+'rpx'}" class="icon iconfont icon-good myGood">666</text>
			<button class="mybtn" @click="sendNews">发送</button>
		</view>
		<!-- <MyIpt :index="active" :isLike="isLike" :like="0" :action="action" @sendMyNew="receiveNews"></MyIpt> -->
	</view>
</template>

<script>
	// 导入输入框组件:
	import MyIpt from '@/components/pageComponents/myIpt/myIpt.vue';
	const {
		log
	} = console;
	export default {
		// 页面加载即收集参数:
		onLoad(option) {
			// 先缓存自己的用户名:
			// this.messageList.push(JSON.parse(option.chatObj))
			uni.setStorageSync('myId', 0)
			uni.setStorageSync('myName', 'Voitto');
			this.id = uni.getStorageSync('myId');
			let optionPlus = JSON.parse(option.chatObj);
			// 获取整体聊天区域的宽度:
			this.WindowHeight = uni.getSystemInfoSync().windowHeight;
			this.chatTittle = optionPlus.userName;
			this.messageList.unshift(optionPlus);
			// 测试websocket:
			// 进行websocket连接
			uni.connectSocket({
				url: `ws://192.168.196.215:8088/websocket/${uni.getStorageSync('myName')}`,
				success: (res) => {
					console.log(res);
				},
				fail: (res) => {
					console.log(res);
				}
			});
			// 监听websocket是否成功打开
			uni.onSocketOpen((res) => {
				console.log('WebSocket连接已打开！');
				this.socketSign = true;
			});
			// 监听websocket是否错误
			uni.onSocketError((res) => {
				console.log('WebSocket连接打开失败，请检查网络！');
			});
			// 监听websocket是否关闭
			uni.onSocketClose((res) => {
				console.log('WebSocket 已关闭！');
				this.socketSign = false;
			});
			// 监听从服务器发来的数据
			uni.onSocketMessage((res) => {
				let result = JSON.parse(res.data);
				console.log(result);
				let item = {
					message: result.message,
					reciverId: result.reciverId
				};
				console.log('服务端发送回来的数据:',item);
				// this.messageList.push(item);
				// console.log('消息列表:',this.messageList)
				// this.scrollTop = 99999;
				// setTimeout(() => {
				// 	// this.scrollTop = 9999;
				// }, 100)
				console.log('收到服务器内容');
			});
		},
		watch:{
			messageList(oldValue,newValue){
				console.log('shujv:',newValue);
			}
		},
		data() {
			return {
				// 输入框绑定的值:
				iptValues: '',
				isLike: false,
				action: '发送',
				active: 0,
				id: '',
				// 包括用户的昵称，头像，发送的内容，获取时间戳:
				// 自定义导航头的标题即为发起私信的用户的标题:
				chatTittle: '',
				headerImg: '',
				content: '',
				WindowHeight: 0,
				sendTime: '',
				messageList: [{
					id: 0,
					userName: 'Voitto',
					userImg: 'https://i2.hdslb.com/bfs/face/762ae6f1a5988fbfe0f61cb02bfe151f2aff534e.jpg@240w_240h_1c_1s.webp',
					content: '请您详细说说'
				}]
			}
		},
		components: {
			MyIpt
		},
		computed: {
			// 获取时间戳:
			getTime() {
				this.sendTime = new Date();
				return this.sendTime;
			}
		},
		methods: {
			rightClick() {
				console.log('rightClick');
			},
			leftClick() {
				console.log('leftClick');
			},
			receiveNews(val) {
				// console.log('接收参数:',val);
				this.messageList.push(val)
			},
			// 使用websocket发送消息:
			sendNews() {
				if (this.iptValues.replace(/(^\s*)|(\s*$)/g, '') != '') {
					if (this.socketSign) {
						let message = {
							from: uni.getStorageSync('myName'),
							to: 'superAdmin',
							text: this.iptValues
						}

						// this.messageList.push(message);
						let msg = JSON.stringify(message); // 要发送的数据
						// 使用websocket发送数据
						uni.sendSocketMessage({
							data: msg,
							success: (res) => {
								console.log(res);
								let content = this.iptValues;
								let chatNew = {
									id: 0,
									userName: 'Voitto',
									userImg: 'https://i2.hdslb.com/bfs/face/762ae6f1a5988fbfe0f61cb02bfe151f2aff534e.jpg@240w_240h_1c_1s.webp',
									content
								}
								// this.$emit('sendMyNew', chatNew)
								this.messageList.push(chatNew);
								this.iptValues = '';
								chatNew = null;
								if (res.errMsg != 'sendSocketMessage:ok') {
									this.$toast('发送失败', 1000, 'none', true);
								}
							}
						});
						this.iptValues = '';
						// this.scrollTop = 99999;
						// setTimeout(() => {
						// 	// this.scrollTop = 9999;
						// }, 100)
					} else {
						this.$toast('连接错误', 1000, 'none', true);
					}
				} else {
					this.$toast('消息不能为空', 1000, 'none', true);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chat {
		display: flex;
		position: relative;
		flex-direction: column;

		.chatArea {
			background-color: #F4F4F4;
			display: flex;
			flex-direction: column;
			margin-top: 150rpx;
			// align-items: center;

			.reverse {
				display: flex;
				// width: 100vw;
				flex-direction: row-reverse;
				margin: 20rpx;

				.userImg {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.myContent {
					padding: 15rpx;
					// width: 70%;
					margin-right: 25rpx;
					display: flex;
					flex-direction: row;
					font-size: 30rpx;
					// align-items: center;
					background-color: aquamarine;
					border-radius: 15rpx;
				}
			}

			.singleNews {
				// width: 90%;
				display: flex;
				// width: 100vw;
				flex-direction: row;
				margin: 20rpx;

				.userImg {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.myContent {
					padding: 15rpx;
					width: 70%;
					margin-left: 25rpx;
					display: flex;
					flex-direction: row;
					font-size: 30rpx;
					align-items: center;
					background-color: aquamarine;
					border-radius: 15rpx;
				}
			}
		}

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
	}
</style>
