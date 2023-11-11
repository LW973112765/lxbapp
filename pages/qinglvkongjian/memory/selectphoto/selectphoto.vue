<template>
	<view class="mainx">
		<view class="mainbox">
			<!-- <view class="box">
				<view class="left">
					<view class="one">
						<image mode=""></image>
					</view>
					<view class="two" style="display: flex;justify-content: center;align-items: center;">
						新建相册
					</view>
				</view>
				<view class="right" style="color: #999;">

				</view>
			</view> -->
			<selectphoto :photoid="id" :type="type" @getuploadphoto="upload" @getremoveid="removephoto"
				:videolist="photodata" v-for="(item, index) in photodata" :key="item.id" :item="item" />
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photodata: [],
				id: '',
				type: '',
				select: []
			};
		},
		onLoad(e) {
			console.log(e)
			this.id = e.id
			this.type = e.type
			if (e.select) {
				this.select = JSON.parse(e.select)
			}
			if (e.type === 'remove') {
				uni.setNavigationBarTitle({
					title: '移动到'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '上传到'
				})
			}
		},
		created() {
			this.http();
		},
		mounted() {
			setTimeout(() => {
				uni.$emit('updatecover')
			}, 200)
		},
		methods: {
			upload(id, cover, name) {

				this.id = id
				uni.$emit('returnoploaddata', id, cover, name)
			},
			removephoto(id) {
				console.log(id)
				this.remove(id)
			},
			async remove(photoid) {
				let tag = this.select.join(',')
				let res = await this.$zxl('/removephoto', {
					tag,
					photoid
				}, 'POST')
				if (res.data.status == 200) {
					uni.$emit('deleteimgs')
					uni.$emit('getremoveid', '转移')
				}
			},
			toadd() {
				uni.navigateTo({
					url: '/pages/qinglvkongjian/memory/addphoto/addphoto',
					animationType: 'zoom-fade-out'
				})
			},
			async http() {
				let res = await this.$zxl('/getxiangce')
				// console.log(res.data, '获取相册');
				if (res.data.status === 200) {
					if (this.type === 'remove') {
						this.photodata = res.data.data.filter(i => i.id != this.id);
					} else {
						this.photodata = res.data.data
					}
				} else {
					this.photodata = []
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.mainbox {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.mainbox {
		margin-top: 10rpx;
	}

	.mainx {
		padding-bottom: 10rpx;

	}

	.main {
		width: 750rpx;
		height: 200rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		// margin-left: 17rpx;
		// margin-right: 17rpx;

	}

	.box {
		width: 750rpx;
		height: 100rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;

		.left {
			display: flex;
			// justify-content: space-between;
			align-items: center;

			.one {
				width: 80rpx;
				height: 80rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx;
				}
			}

			.two {
				height: 100rpx;
				margin-left: 50rpx;
				width: auto;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// align-items: center;

				.shang {
					padding-top: 10rpx;
					display: flex;
					justify-content: space-between;
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
			}
		}

		.right {
			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>