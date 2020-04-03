<template>
	<view>
		<!-- 专辑背景 开始 -->
		<view class="album_detail_head_wrap">
			<image mode="widthFix" :src="album.cover" />
			<view class="album_info">
				<view class="album_name">{{ album.name }}</view>
			</view>
		</view>
		<!-- 专辑背景 结束 -->

		<!-- 专辑作者 开始 -->
		<view class="album_author">
			<view class="album_author_info">
				<image mode="widthFix" :src="album.user.avatar"></image>
				<view class="album_author_name">{{ album.user.name }}</view>
			</view>
			<view class="album_author_detail">
				<text>{{ album.desc }}</text>
			</view>
		</view>
		<!-- 专辑作者 结束 -->

		<!-- 列表 开始 -->
		<view class="album_list">
			<view class="album_pic" v-for="(pic, index) in wallpaper" :key="pic.id">
				<go-detail :list="wallpaper" :index="index"><image mode="aspectFill" :src="pic.thumb + pic.rule.replace('$<Height>', 360)"></image></go-detail>
			</view>
		</view>
		<!-- 列表 结束 -->
	</view>
</template>

<script>
import { getAlbumDetail } from '@/api/homeApi';
import goDetail from '@/components/goDetail';
export default {
	components: {
		goDetail
	},
	data() {
		return {
			params: {
				limit: 30,
				order: 'new',
				skip: 0,
				first: 1
			},
			id: -1,
			wallpaper: [],
			album: {},
			hasMore: true
		};
	},
	onLoad({ id }) {
		this.id = id;
		this.getAlbumData(id);
	},
	methods: {
		getAlbumData(id) {
			console.log(id);
			getAlbumDetail({ ...this.params, id }).then(res => {
				let data = res.data.res;
				console.log(data);
				if (Object.keys(this.album).length === 0) {
					this.album = data.album;
					console.log(this.album.name);
					uni.setNavigationBarTitle({
						title: this.album.name
					});
				}
				if (data.wallpaper.length === 0) {
					this.hasMore = false;
					uni.showToast({
						title: '没有更多数据了',
						icon: none
					});
					return;
				}
				this.wallpaper = [...this.wallpaper, ...data.wallpaper];
			});
		}
	},
	// 页面触底 上拉加载下一页事件
	onReachBottom() {
		// console.log("我也是有底线的");
		if (this.hasMore) {
			this.params.first = 0;
			this.params.skip += this.params.limit;
			this.getAlbumData(this.id);
		} else {
			uni.showToast({
				title: '没有更多数据了',
				icon: 'none'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.album_detail_head_wrap {
	position: relative;
	.album_info {
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 10rpx;
		.album_name {
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}

.album_author {
	padding: 10rpx;
	.album_author_info {
		padding: 10rpx 0;
		display: flex;
		.album_author_name {
			color: #000;
			margin-left: 15rpx;
		}
		image {
			width: 50rpx;
		}
	}
	.album_author_detail {
		font-size: 20rpx;
		color: #000000;
	}
}

.album_list {
	display: flex;
	flex-wrap: wrap;
	.album_pic {
		width: 33.3%;
		border: 3rpx solid #fff;
		image {
			width: 100%;
			height: 20vw;
		}
	}
}
</style>
