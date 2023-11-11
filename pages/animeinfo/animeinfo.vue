<template>
	<view>
		<image :src="animeinfo.cover" mode=""></image>
		<view class="main search">
			<!-- <a :href="animeurl">{{title}} </a> -->
			<view>
				<view>
					百度百科：
				</view>
				<view class="title" @click="searchbaidu">{{title}} </view>
			</view>
			<view>
				<view>
					搜狗百科：
				</view>
				<view class="title" @click="searchsougou">{{title}} </view>
			</view>
		</view>
		<view class="main">
			年份：{{animeinfo.created_at}}
		</view>
		<view class="main">
			介绍：{{animeinfo.introduction}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animeinfo: [],
				id: null,
				title: null,
				animeurl: ''
			};
		},
		onLoad(e) {
			console.log(e, '收到')
			this.id = e.id
			this.title = e.name
			this.animeurl = `https://baike.baidu.com/item/${this.title}`
			uni.setNavigationBarTitle({
				title: e.name
			})
			this.getinfo(this.id)
		},
		methods: {
			searchbaidu() {
				void plus.runtime.openWeb(this.animeurl);
			},
			searchsougou() {
				void plus.runtime.openWeb('https://baike.sogou.com');
			},
			async getinfo(id) {
				let res = await this.$zxl('/getanimeid', {
					id
				})
				if (res.data.status === 200) {
					console.log("返回数据", res.data.data);
					this.animeinfo = res.data.data[0];
				}

			},
		}
	}
</script>

<style lang="less" scoped>
	image {
		width: 750rpx;
		height: 300rpx;
	}

	.main {
		position: relative;
		margin-top: 20rpx;
		font-size: 40rpx;
		padding: 20rpx;
		// color: transparent;
		// -webkit-background-clip: text;
		// background-size: 200% 100%;
		// -webkit-animation: slide1 2s infinite linear;
		// animation: slide1 5s infinite linear;
	}

	@keyframes slide1 {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}
	}

	.search {
		.title {
			color: blue;
			text-decoration: underline;
		}
	}
</style>