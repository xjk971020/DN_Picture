<template>
	<view class="home_tab">
		<view class="home_tab_title">
			<view class="home_tab_inner">
				<uni-segmented-control
					:current="current"
					:values="items.map(v => v.title)"
					@clickItem="onClickItem"
					style-type="text"
					active-color="#d4237a"
				></uni-segmented-control>
			</view>
		</view>
		<view class="home_tab_content">
			<view v-if="current === 0"><home-recommend></home-recommend></view>
			<view v-if="current === 1"><home-category></home-category></view>
			<view v-if="current === 2"><home-album></home-album></view>
		</view>
	</view>
</template>

<script>
import homeAlbum from './home-album';
import homeRecommend from './home-recommend';
import homeCategory from './home-category';
import { uniSegmentedControl } from '@dcloudio/uni-ui';
export default {
	components: {
		homeRecommend,
		homeCategory,
		homeAlbum,
		uniSegmentedControl
	},
	data() {
		return {
			items: [
				{
					title: '推荐'
				},
				{
					title: '分类'
				},
				{
					title: '专辑'
				}
			],
			current: 0
		};
	},
	onLoad() {},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.home_tab {
	.home_tab_title {
		position: relative;
		.home_tab_inner {
			width: 60%;
			margin: 0 auto;
			font-size: 10rpx;
		}
	}
	.home_tab_content {
	}
}
</style>
