<template>
	<view class="main">
		<view class="box" @click="getid">
			<view class="left">
				<view class="one" v-if="cover">
					<image :src="cover" mode=""></image>
				</view>
				<view class="one" v-else>
					<image src="../../static/images/memory/photo.png" mode=""></image>
				</view>
				<view class="two">
					<view class="shang">
						<view>{{item.name}}</view>
						<view class="type">{{item.type}}</view>
					</view>
					<text class="count">{{total}}张</text>
				</view>
			</view>
			<view class="right" style="color: #999;" v-show="type=='remove'">
				<image src="../../static/images/memory/right.png" mode=""></image>
			</view>
			<view class="right" style="color: #999;" v-show="type=='upload'&&item.id==photoid">
				<image src="../../static/images/memory/zhengque.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		props: ['item', 'type', 'photoid'],
		name: "memoryitem",
		data() {
			return {
				photodata: [],
				cover: '',
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
			getid() {
				if (this.type == 'remove') {
					this.$emit('getremoveid', this.item.id)
				} else {
					this.$emit('getuploadphoto', this.item.id, this.cover, this.item.name)
				}
				uni.navigateBack()
			},
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
					url: `/pages/qinglvkongjian/memory/memoryinfo/memoryinfo?id=${id}&name=${name}&dsc=${dsc}`
				})
			},
		}

	}
</script>

<style lang="less" scoped>
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