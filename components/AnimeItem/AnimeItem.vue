<template>
	<view class="main" @click="toinfo(item.id,item.name)">
		<view class="top">
			<image :src="item.cover" mode=""></image>
			<button>{{item.created_at}}</button>
		</view>
		<view class="buttom">
			<view class="type">
				<button v-for="(type,index) in categoryList" :key="index">{{type.name}}</button>
			</view>
			<view class="name">
				{{item.name}}
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			item: Object | Array,
		},
		data() {
			return {
				categoryList: [],
				animeid: "",
			};
		},
		mounted() {
			// console.log(this.item.tag, 'sdsd 收到')
			this.getCategoryName(this.item.tag);
		},
		methods: {
			toinfo(id, name) {
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					// url: `/pages/animeInfo/animeInfo?id=${id}`
					url: `/pages/animeinfo/animeinfo?id=${id}&name=${name}`
				})
			},
			async getCategoryName(tag) {
				let zxl = tag.join(",");
				let res = await this.$zxl('/getanimecategoryname', {
					tag: zxl,
				})
				if (res.data.status === 200) {
					console.log("返回数据", res.data.data);
					this.categoryList = res.data.data;
				}

			},
		},
		created() {
			this.getCategoryName(this.item.tag);
		},
	};
</script>

<style lang="less" scoped>
	page {
		background-color: #FFFAE8;
	}

	.popup-content {
		z-index: 999999;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {

		width: 200px;
	}

	.sharemain {
		z-index: 999999;
		width: 100%;
		height: 200rpx;
		background: -webkit-linear-gradient(top, pink, yellow);
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;

		// margin-top: 30rpx;
		.share {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			align-items: center;

			image {
				margin-top: 30rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.main {
		width: 340rpx;
		height: 300rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin-left: 17rpx;
		margin-right: 17rpx;
		background-color: #FFFAE8;
		// padding-bottom: 30rpx;
	}

	.top {
		position: relative;
		width: 100%;
		height: 200rpx;

		image {
			width: 100%;
			height: 200rpx;
		}

		button {
			position: absolute;
			top: 0;
			right: 0;
			opacity: 0.8;
			width: 80rpx;
			font-size: 20rpx;
			height: 40rpx;
			padding: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to right, rgb(213, 51, 186), aqua)
		}
	}

	.buttom {
		position: relative;
		width: 100%;
		// padding: 10rpx 10rpx;
		padding-top: 10rpx;
		background-color: white;
		height: 100rpx;

		.name {
			width: 100%;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.type {
			display: flex;
			justify-content: flex-start;
			align-items: center;

		}

		button {
			width: 80rpx;
			height: 40rpx;
			// line-height: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20rpx;
			padding: 5rpx 5rpx;
			box-sizing: border-box;
		}
	}

	.detail {
		width: 100%;
		height: 25px;
		position: absolute;
		bottom: 0;
		left: 0;

		image {
			height: 20px;
			width: 40rpx;
			vertical-align: middle;
		}

		.left {
			width: 200rpx;
			display: flex;
			height: 30px;
			float: left;
			color: white;
			font-size: 15rpx;

			.zxl {
				margin-right: 10rpx;
			}
		}

		.right {
			min-width: 50rpx;
			color: white;
			font-size: 15rpx;
			line-height: 30rpx;
			padding-top: 10rpx;
			padding-right: 10rpx;
			height: 30px;
			float: right;
		}
	}
</style>