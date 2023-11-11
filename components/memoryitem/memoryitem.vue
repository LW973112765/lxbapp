<template>
	<view class="main">
		<view v-if="cover" class="top" @click="toinfo(item.id,item.name,item.dsc)">
			<image :src="cover" mode=""></image>
		</view>
		<view v-cloak v-else class="topt" @click="toinfo(item.id,item.name,item.dsc)">
			<image src="../../static/images/memory/kuqii.png" mode=""></image>
			<text>无封面</text>
		</view>
		<view class="buttom">
			<view class="shang">
				<text>{{item.name}}</text>
				<view class="type">{{item.type}}</view>
			</view>
			<text class="count">{{total}}张</text>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		props: ['item'],
		name: "memoryitem",
		data() {
			return {
				photodata: [],
				cover: 'ZXL',
				total: 0
			}

		},
		created() {
			this.getinfo()
		},
		onLoad() {
			this.getinfo()
		},
		mounted() {
			uni.$on('updatecover', () => {
				this.getinfo()
			})
			uni.$on('deleteimgs', () => {
				this.getinfo()
			})
		},

		methods: {
			async getinfo() {
				let res = await this.$zxl('/getxiangceinfo', {
					id: this.item.id
				})
				// console.log(res.data, '获取相册详情');
				if (res.data.status === 200) {
					this.photodata = res.data.data[0];
					this.total = res.data.data[0].total
					this.cover = res.data.data[0].cover ? res.data.data[0].cover : res.data.data[0].url
				} else {
					this.photodata = []
					this.total = 0
				}
			},
			toinfo(id, name, dsc) {
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/qinglvkongjian/memory/memoryinfo/memoryinfo?id=${id}&name=${name}&dsc=${dsc}&cover=${this.cover}`
				})
			},
		}

	}
</script>

<style lang="less" scoped>
	page {
		background-color: #FFFAE8;
	}

	.main {
		width: 340rpx;
		height: 400rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin-left: 17rpx;
		margin-right: 17rpx;
		// background-color: #FFFAE8;
	}

	.topt {
		position: relative;
		width: 100%;
		height: 250rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 80rpx;
			height: 80rpx;
			border: 10rpx;
		}
	}

	.top {
		position: relative;
		width: 100%;
		height: 250rpx;
		border-radius: 10rpx;

		image {
			width: 100%;
			height: 250rpx;
			border: 10rpx;
		}
	}

	.buttom {
		display: flex;
		flex-direction: column;

		.shang {
			display: flex;
			align-items: center;

			.type {
				background-color: lightgrey;
				border-radius: 3rpx;
				font-size: 10rpx;
				width: 60rpx;
				margin-left: 30rpx;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
			}
		}

		.count {
			color: #333;
			font-size: 25rpx;
		}
	}

	[v-cloak] {
		display: none;
	}
</style>