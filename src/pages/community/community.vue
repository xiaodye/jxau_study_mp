<template>
	<view :style="{backgroundColor: bacColor}">
		<!-- 导入头部组件 -->
		<CumHeader></CumHeader>
		<List></List>
	</view>
</template>

<script>
	import CumHeader from './cumHeader.vue';
	import List from './list.vue'
	export default {
		data() {
			return {
				bacColor: `#F4F4F5`,
			}
		},
		components: {
			CumHeader,
			List
		},
		onLoad() {},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
