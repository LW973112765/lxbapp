<template>
	<view class="main" style="height: 2000rpx;">
		<view class="photo" v-for="(datetype,index) in date" :key="index+'datetype'">
			<h3>{{datetype.time}} <text>（{{datetype.total}}张）</text></h3>
			<view class="photoson">
				<view @click="getimg(item.url)" class="img" v-for="(item,index) in obj[datetype.time]"
					:key="index+'item'">
					<image lazy-load :src="item.url" mode=""></image>
				</view>
				<view style="width: 220rpx;height: 0;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photodata: [],
				date: [],
				obj: {},
				id: null,
				total: 0,
				name: "",
			}
		},

		onLoad(e) {
			this.id = e.id
			// console.log('进来啦')
			this.getmemorydate()

		},
		mounted() {
			setTimeout(() => {
				this.getmemory()
			}, 500)
		},
		onShow() {
			console.log('onshow')
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			getimg(url) {
				uni.$emit('getcover', url)
				this.back()
			},

			async getmemory() {
				let res = await this.$zxl('/getmemory', {
					photoid: this.id
				})
				if (res.data.status === 200) {
					this.total = res.data.total
					for (var k in this.obj) {
						res.data.data.forEach(item => {
							if (item.time == k)
								this.obj[k].unshift(item)
						})
					}
					console.log(this.obj, '最终数据')
				} else {
					this.photodata = []
				}
			},
			async getmemorydate() {
				let res = await this.$zxl('/getmemorydate', {
					photoid: this.id
				})
				if (res.data.status === 200) {
					console.log(res.data.data)
					res.data.data.forEach(item => {
						this.date.unshift(item)
					})
					this.date.forEach(item => {
						this.obj[item.time] = []
					})
					console.log(this.obj, '对象')
					console.log(this.date, 'date')
				} else {
					this.date = []
				}
			},
		}

	}
</script>

<style lang="less" scoped>
	.photo {
		width: 700rpx;
		margin: 0 auto;
		margin-top: 20rpx;

		// .photoson::after {
		// 	content: '';
		// 	flex: auto;
		// 	margin-left: 10rpx;
		// }

		.photoson {
			width: 700rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			z-index: -1;
			padding: 5rpx;

			.img {
				width: 220rpx;
				height: auto;

				image {
					width: 220rpx;
					height: 220rpx;
					z-index: -1;
				}

			}
		}
	}

	h3 {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #333;

		text {
			color: #999;
			font-size: 20rpx
		}
	}
</style>