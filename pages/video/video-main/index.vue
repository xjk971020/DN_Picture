<template>
    <scroll-view
            scroll-y
            enable-flex
            class="video_main"
            @scrolltolower="handleScrolltolower"
    >
        <view
                class="video_item"
                v-for="item in videowp"
                :key="item.id"
                @click="handleGoVideo(item)"
        >
            <image mode="widthFix" :src="item.img"/>
        </view>
    </scroll-view>
</template>

<script>
    import {getVideo} from '@/api/videoAPI';

    export default {
        props: {
            urlobj: Object
        },
        data() {
            return {
                videowp: [],
                hasMore: true
            };
        },
        watch: {
            urlobj() {
                this.videowp = [];
                this.getList();
            }
        },
        mounted() {
            // console.log(this.urlobj);
            this.getList();
        },
        methods: {
            async getList() {
              let res = await getVideo({
                    url: this.urlobj.url,
                    data: this.urlobj.params
                });
				let videowp = res.data.res.videowp;
                if (videowp.length === 0) {
                    this.hasMore = false;
                    uni.showToast({
                        title: "没有更多数据了",
                        icon: "none"
                    });
                    return;
                }
                this.videowp = [...this.videowp, ...videowp];
            },
            // 分页事件
            handleScrolltolower() {
                if (this.hasMore) {
                    this.urlobj.params.skip += this.urlobj.params.limit;
                    this.getList();
                } else {
                    uni.showToast({
                        title: "没有更多数据了",
                        icon: "none"
                    });
                }
            },
            // 图片点击事件
            handleGoVideo(item) {
                // 1 将数据存到全局共享中
                getApp().globalData.video = item;
                // 2 页面跳转
                uni.navigateTo({
                    url: "/pages/videoPlay/index"
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .video_main {
        display: flex;
        flex-wrap: wrap;
        height: calc(100vh - 36px);

        .video_item {
            width: 33.33%;
            border: 5rpx solid #fff;
        }
    }
</style>