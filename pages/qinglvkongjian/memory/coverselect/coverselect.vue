<template>
	<view class="main" style="height: 2000rpx;">

		<view class="maintitle" v-if="total">
			<view class="one">{{name}}</view>
			<view class="two">{{total}}照片/视频</view>
			<view class="three">
				{{dsc}}
			</view>
		</view>
		<view class="nophoto" v-if="!total">
			<image src="../../../../static/images/memory/nophoto.jpg" mode=""></image>
		</view>
		<view class="photo" v-if="total" v-for="(datetype,index) in date" :key="index+'datetype'">
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
				top: '',
				photodata: [],
				date: [],
				obj: {},
				id: null,
				total: 'zxl',
				name: "",
				dsc: ''
			}
		},
		onPageScroll(e) {
			// console.log(e)
			this.top = e.scrollTop
		},
		onLoad(e) {
			this.id = e.id
			this.name = e.name
			this.dsc = e.dsc
		},
		onShow() {

		},
		computed: {
			bg() {
				return this.top / 90
			},
			isshow() {
				if (this.top > 90) {
					return true
				} else {
					return false
				}
			},
		},
		mounted() {
			this.getmemorydate()
			setTimeout(() => {
				this.getmemory()
			}, 500)
		},
		methods: {
			getimg(url) {
				uni.$emit('getcover', url)
				this.back()
			},
			back() {
				uni.navigateBack()
			},
			toedit() {
				uni.navigateTo({
					url: `/pages/qinglvkongjian/memory/updatephoto/updatephoto?id=${this.id}`,
					animationType: 'zoom-fade-out'
				})
			},

			async getmemory() {
				let res = await this.$zxl('/getmemory', {
					photoid: this.id
				})
				console.log(res.data, '获取照片');
				if (res.data.status === 200) {
					this.total = res.data.total
					for (var k in this.obj) {
						res.data.data.forEach(item => {
							if (item.time == k)
								this.obj[k].push(item)
						})
					}
					console.log(this.obj, '最终数据')
				} else {
					this.photodata = []
					this.total = 0
				}
			},
			async getmemorydate() {
				let res = await this.$zxl('/getmemorydate', {
					photoid: this.id
				})
				if (res.data.status === 200) {
					console.log(res.data.data)
					this.total = true
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
					this.total = 0
				}
			},
		}

	}
</script>

<style lang="less" scoped>
	.left {
		width: 50rpx;
		height: 50rpx;
		position: fixed;
		left: 10rpx;
		top: 80rpx;
		z-index: 10;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.header {
		width: 750rpx;
		height: 150rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		position: fixed;
		background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));

		.headerson {
			width: 750rpx;
			height: 100rpx;
			position: relative;
		}



		.title {
			position: absolute;
			width: auto;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.maintitle {
		width: 750rpx;
		height: 50rpx;
		box-sizing: border-box;
		padding-top: 10rpx;
		border-bottom: 2rpx lightgrey solid;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;

		// background-color: #999;
		.one {
			font-size: 40rpx;
			font-weight: 700;
		}

		.two {
			color: #333;
			font-size: 20rpx;
		}

		.three {
			width: 500rpx;
			text-align: center;
			font-style: italic;
			color: #999;
		}

	}

	.nophoto {
		width: 750rpx;
		margin: 0 auto;
		height: 500rpx;
		padding-top: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 750rpx;
		}
	}

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

	footer {
		position: fixed;
		background-color: azure;
		bottom: 0;
		width: 750rpx;
		box-sizing: border-box;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		transition: all 1s;
		// animation-duration: 0.5s;

		.item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			font-size: 20rpx;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

	.active {
		transform: translateY(100rpx);
		// background-color: red;
	}
</style>