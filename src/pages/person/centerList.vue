<template>
	<!-- 此组件用于设置中部列表，包括浏览记录，收藏等等 -->
	<view>
		<view class="centerList">
			<view class="centerList-container" @click="goOtherPage(index)" v-for="(item,index) in list" :key="index">
				<image class="centerList-img" :src="item.src"></image>
				<text class="centerList-text">{{item.tittle}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {goDetail} from '@/utils/utils.js'
	export default {
		data() {
			return {
				// '浏览历史','我的收藏','我的资料','打卡记录'
				list: [{
						tittle: '浏览记录',
						src: '../../static/person/myBrowsingHistory.png'
					},
					{
						tittle: '我的资料',
						src: '../../static/person/myDatum.png'
					},
					{
						tittle: '打卡记录',
						src: '../../static/person/myPunchingCardRecord.png'
					},
					{
						tittle: '我的收藏',
						src: '../../static/person/myCollect.png'
					}
				]
			}
		},

		methods: {

			goOtherPage(index) {
				if (index === 3) {
					goDetail('./personComponents/collect/myComponent',1,this.list[index].tittle)
				} else if (index === 0) {
					goDetail('././personComponents/skipHistory',index,{})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.centerList {
		display: flex;
		flex-direction: row;
		margin: 25rpx;
		// height: 300rpx;
		background-color: #F4F4F5;
		border-radius: 25rpx;

		.centerList-container {
			display: flex;
			width: 25%;
			height: 80%;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.centerList-img {
				width: 70rpx;
				height: 70rpx;
				margin: 20rpx 20rpx 10rpx 20rpx;
				border-radius: 50%;
			}

			.centerList-text {
				font-size: 35rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
