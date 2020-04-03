<template>
	<view @click="handleData">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				value: []
			},
			index: {
				type: Number,
				value: 0
			}
		},
		methods: {
			handleData() {
				getApp().globalData.imgList = this.list;
				getApp().globalData.imgIndex = this.index;
				 
				uni.navigateTo({
					url: "/pages/imgDetail/index"
				})
			}
		}
	}
</script>

<style>
</style>
