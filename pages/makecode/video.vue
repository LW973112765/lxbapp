<template>
	<view class="content" style="padding-bottom: 20rpx;">
		<view class="total">
			视频 {{total}}
		</view>
		<scroll-view class="main" scroll-y="true" enable-flex refresher-default-style="black" v-if="videolist.length>0">
			<view class="main">
				<VideoItem :videolist="videolist" v-for="(item, id) in videolist" :key="id" :item="item" />
			</view>
		</scroll-view>
		<Loading class="Loading" :show="loading" />
		<view class="load2"><zero-loading class="load2" position="absolute" v-if="isload"></zero-loading></view>
		<!-- <uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></uni-load-more> -->
	</view>
</template>





<script>
	export default {

		data() {
			return {
				loading: true,
				isLoading1: false,
				isload: false,
				total: 0,
				n: 1,
				videolist: [],
			};
		},
		computed: {

		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.https(1)
				uni.showToast({
					title: '刷新成功',
					position: "top",
					icon: "success"
				})
			}, 1500)
		},
		onReachBottom() {
			console.log(this.videolist.length, 'this.videolist.length')
			console.log(this.total, 'this.total')
			if (this.videolist.length >= this.total) {
				uni.showToast({
					title: "已经到底啦😊😊～",
					position: "top",
					icon: "error",
					duration: 1000,
				})
				this.type = ''
			} else {
				this.isload = true
				setTimeout(() => {
					this.loadmore()
					this.isload = false
				}, 1500)
			}


		},
		methods: {
			//下拉刷新
			async https(page) {
				let res = await this.$zxl('/getvideo', {
					page
				})
				if (res.data.status === 200) {
					this.loading = false;
					// console.log(res.data);
					this.n = 1 //每次刷新之后，初始化n=1
					this.videolist = res.data.data;
					uni.stopPullDownRefresh();
					this.total = res.data.total;
					setTimeout(() => {
						this.isLoading1 = true;
					}, 1000);
				}
			},
			async http(page) {
				let res = await this.$zxl('/getvideo', {
					page
				})
				if (res.data.status === 200) {
					this.loading = false;
					console.log(res.data, '加载数据');
					this.videolist = this.videolist.concat(res.data.data);
					this.total = res.data.total;
					setTimeout(() => {
						this.isLoading1 = true;
					}, 1000);
				}
			},
			//点击加载更多，再次向服务器发送请求
			loadmore() {
				this.n++;
				// console.log(this.n);

				this.http(this.n);
			},
		},
		created() {
			this.n = 1;
			this.https(1);
		},
		onShow() {
			uni.$emit('freshdanmu')
			//  this.n = 1;
			// this.https(1);
			// this.https(this.n)
		},

	};
</script>
<style>
	page {
		/* background: -webkit-linear-gradient(top, pink, #999999); */
		background: pink;

	}
</style>
<style scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.load2 {
		margin-top: 50rpx;
		position: relative;
		bottom: 10rpx;
	}

	.loading {
		cursor: pointer;
		position: absolute;
		bottom: 2px;
		left: 40%;
		transform: translate(-50%);
		color: red;
	}

	.main {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		/* align-items:baseline; */
		/* justify-items: flex-start; */

	}

	.total {
		margin-left: 20rpx;
		margin-top: 20rpx;
		color: #999
	}
</style>