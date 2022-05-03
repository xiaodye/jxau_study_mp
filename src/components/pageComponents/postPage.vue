<template>
	<!-- 贴子组件: -->
	<view>
		<view class="historyRecord-single" v-for="(item,index) in records" :key="index" @click="goOther(index)">
			<!-- 时间记录和标题 -->
			<text class="time"><text class="icon iconfont icon-lishijilu_o"></text>{{item.createTime}}</text>
			<view class="tittle">
				<text class="tiezi">贴子</text>
				<text class="_tittle">{{item.title}}</text>
			</view>
			<!-- 部分文章内容 -->
			<view class="content">
				<text class="myContent">{{item.content}}</text>
				<image class="content-img" :src="item.contentImg" mode=""></image>
			</view>
			<!-- 阅读点赞评论记录 -->
			<view class="read_like_comment">
				<text class="author">{{item.author}}</text>
				<text class="_yueduliang"><text
						class="icon iconfont icon-yueduliang myyueduliang"></text>{{item.readNum}}</text>
				<text class="_good"><text class="icon iconfont icon-good mygood"></text>{{item.like}}</text>
				<text class="_pinglun"><text class="icon iconfont icon-pinglun mypinglun"></text>{{item.comment}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	import {
		goDetail
	} from '@/utils/utils.js';
	export default {
		data() {
			return {
				flag: 2,
				favData: [],
				records: [{
					postId: 0,
					time: '2022-04-23',
					tittle: 'URL 的链接中 井号#、问号?、连接符& 分别有什么作用？',
					content: `#，井号：表示网页中的一个位置，被称之为锚点，常用于某个网
						页间不同位置的跳转，简单的说就是在一个网页中，URL 不变的情况下，通过
						添加“#buy”的字符在 URL 最后可以跳转到当前网页中已经定义好的锚点（id="bu
						y"）位置；同样#的改变也会增加浏览器的历史记录，也就是说我们可以通过“
						后退”按钮回到上一个位置，而熟悉网页开发的朋友们可能也会用于 ajax 的
						一些操作中，以此来实现不同的访问状态和改变页面访问内容，从而也可以实
						现那种无刷新载入的效果。例如：https://zhan.leiue.com/fanly-mip.htm
						l#buy （访问该链接就可以直接跳转到 Fanly MIP 主题页面的购买位置哦）
						?，号：常用于动态网站，实现不同的参数值而生成不同的页面或者返回不同的
						结果，例如 WordPress 的动态链接就是/?p=ID，其中的 p 就表示 post 文章，I
						D 就表示文章的 ID，从而可以通过文章的 ID 来访问不同的文章。当然我们还常
						用的就是通过问号+任意参数来实现页面的刷新，从而获得最新的页面或者缓存的刷
						新。例如：https://i.leiue.com/avatar/?size=100 （访问该链接就可以获得用
						户中心默认的用户头像，并且其 size 就是图像像素大小，所以就会是一个 100px 
						的头像显示）&，连接符：既然被叫做是链接符号，那就是连接的作用，也可以说是不
						同参数的间隔符，一般与问号结合使用，一个动态 URL 链接中以问号开始第一个参数
						，同&连接符来串联多个参数和值。`,
					contentImg: 'https://s2.loli.net/2022/04/23/zZyhDInS3dMu9El.png',
					readNum: '6W',
					like: '6666',
					comment: '666',
					author: '沉默王二'
				}, {
					postId: 1,
					time: '2022-04-23',
					tittle: 'URL 链接中 井号#、问号?、连接符& 分别有什么作用？',
					content: `#，井号：表示网页中的一个位置，被称之为锚点，常用于某个网
						页间不同位置的跳转，简单的说就是在一个网页中，URL 不变的情况下，通过
						添加“#buy”的字符在 URL 最后可以跳转到当前网页中已经定义好的锚点（id="bu
						y"）位置；同样#的改变也会增加浏览器的历史记录，也就是说我们可以通过“
						后退”按钮回到上一个位置，而熟悉网页开发的朋友们可能也会用于 ajax 的
						一些操作中，以此来实现不同的访问状态和改变页面访问内容，从而也可以实
						现那种无刷新载入的效果。例如：https://zhan.leiue.com/fanly-mip.htm
						l#buy （访问该链接就可以直接跳转到 Fanly MIP 主题页面的购买位置哦）
						?，号：常用于动态网站，实现不同的参数值而生成不同的页面或者返回不同的
						结果，例如 WordPress 的动态链接就是/?p=ID，其中的 p 就表示 post 文章，I
						D 就表示文章的 ID，从而可以通过文章的 ID 来访问不同的文章。当然我们还常
						用的就是通过问号+任意参数来实现页面的刷新，从而获得最新的页面或者缓存的刷
						新。例如：https://i.leiue.com/avatar/?size=100 （访问该链接就可以获得用
						户中心默认的用户头像，并且其 size 就是图像像素大小，所以就会是一个 100px 
						的头像显示）&，连接符：既然被叫做是链接符号，那就是连接的作用，也可以说是不
						同参数的间隔符，一般与问号结合使用，一个动态 URL 链接中以问号开始第一个参数
						，同&连接符来串联多个参数和值。`,
					contentImg: 'https://s2.loli.net/2022/04/23/zZyhDInS3dMu9El.png',
					readNum: '6W',
					like: '6666',
					comment: '666',
					author: '沉默王二'
				}]
			}
		},
		// props: {
		// 	records: {
		// 		type: Array
		// 	}
		// },
		created() {
			
		},
		methods: {
			goOther(index) {
				goDetail('/pages/person/personComponents/collect/myCollect',1,this.records[index].postId)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.historyRecord-single {
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		border-radius: 20rpx;
		margin: 10rpx 20rpx 10rpx 20rpx;
		box-shadow: 5rpx 10rpx 10rpx rgba(0, 0, 0, .3);

		.time {
			font-size: 30rpx;
		}

		.tittle {
			display: flex;
			align-items: center;
			flex-direction: row;

			.tiezi {
				width: 10%;
				// height: 10rpx;
				color: blue;
				background-color: rgba(0, 255, 255, 0.2);
				text-align: center;
				display: flex;
				justify-content: center;
				font-size: 20rpx;
			}

			._tittle {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.content {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			.myContent {
				width: 70%;
				// height: 50rpx;
				overflow: hidden;
				/* 超过了就显示省略号 */
				text-overflow: ellipsis;

				/* webkit内核的浏览器 */
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;

				color: silver;
			}

			&-img {
				width: 20%;
				height: 100rpx;
				background-size: 100% 100%;
			}
		}

		.read_like_comment {
			display: flex;
			flex-direction: row;
			justify-content: space-around;

			.author {
				// width: 4%;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			._yueduliang,
			._good,
			._pinglun {
				font-size: 30rpx;
			}

			.myyueduliang,
			.mygood,
			.mypinglun {
				margin-right: 10rpx;
			}
		}
	}
</style>
