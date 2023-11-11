<template>
	<view>
		<view class="header" v-if="alltotal">
			<view class="">
				使用率：<text style="color:limegreen;">{{usedtotal}}</text>/
				<text style="margin-right: 10rpx;font-size: 35rpx;">{{alltotal}}</text>
				(<text style="color:limegreen;">{{percentage }}</text>)
			</view>
			<view class="reset" @click="dialogToggle('warn')">
				重置数据
			</view>
		</view>
		<view class="main">
			<cover-list :list="data" :threshold="threshold" @del="deletecover" @edit="edit">
				<template slot-scope="{item ,index}">
					<view class="recentItem">
						<p class="common-label" v-show="item.isused">
							使用中<span class="triangle" />
						</p>
						<image :src="item.url" mode=""></image>
					</view>
				</template>
			</cover-list>
		</view>
		<view class="nodata" v-if="!alltotal">
			暂无云端轮播图数据
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" title="重置数据" content="确认要重置云端数据吗？"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import moment from 'moment'
	export default {
		data() {
			return {
				threshold: 50,
				userid: null,
				data: [],
				alltotal: 1,
				usedtotal: null,
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
			};
		},
		onLoad() {
			this.userid = this.userinfo.id
			this.getcover()
		},
		mounted() {
			uni.$on('getremoveid', (msg) => {
				this.getcover()
			})
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
			percentage() {
				const result = Math.round((this.usedtotal / this.alltotal) * 10000) / 100 + '%'
				return result;
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: `/pages/lunbotuupload/lunbotuupload?id=${this.userinfo.id}`,
				animationType: 'zoom-fade-out'
			})
		},
		methods: {
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				console.log('点击确认l')
				uni.showLoading({
					title: '数据重置中...'
				})
				setTimeout(() => {
					uni.hideLoading()
					this.resetcover()
				}, 2000)
			},
			async resetcover() {
				let res = await this.$zxl('/resetcover', {
					isused: 0,
					userid: this.userid
				}, 'POST')
				if (res.data.status == 200) {
					this.getcover()
					this.$refs.uToast.show({
						type: 'success',
						message: "云端数据已重置！",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				}
			},
			async edit(id, isused) {
				let status
				if (isused) {
					status = 0
				} else {
					status = 1
				}
				console.log(status)
				let res = await this.$zxl('/updatecover', {
					isused: status,
					time: moment().valueOf(),
					id
				}, 'POST')
				if (res.data.status == 200) {
					this.getcover()
				}
			},
			async deletecover(id, isused) {
				if (isused) {
					return;
				} else {
					await this.$zxl('/deletecover', {
						id
					})
					this.getcover(this.userid)
				}

			},
			async getcover() {
				let res = await this.$zxl('/getcover', {
					userid: this.userid
				})
				if (res.data.status == 200) {
					console.log(res.data, '封面')
					this.data = res.data.data
					this.alltotal = res.data.data.length
					this.usedtotal = res.data.data.filter(i => i.isused).length
				} else {
					this.data = []
					this.alltotal = 0
					this.usedtotal = 0
				}
			},
		}

	}
</script>

<style lang="less" scoped>
	.reset {
		width: 150rpx;
		height: 70rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999999;
		font-style: italic;
		border: #999999 solid 2rpx;
	}

	.header {
		// position: relative;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
		width: 700rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.common-label {
		position: absolute;
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		color: #fff;
		// background-color: limegreen;
		background-color: limegreen;
		top: 20rpx;
		left: -12rpx;
		z-index: 9;

		.triangle {
			position: absolute;
			top: 60rpx;
			left: -30rpx;
			width: 0;
			height: 0;
			z-index: 33;
			border-left: 30rpx solid transparent;
			border-right: 30rpx solid limegreen;
			border-bottom: 30rpx solid transparent;
		}
	}

	.recentItem {
		position: relative;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
		display: flex;
		width: 700rpx;
		flex-wrap: wrap;
		box-sizing: border-box;
		height: auto;
		background: -webkit-linear-gradient(top, pink, #999999);
		padding: 20rpx;

		image {
			width: 700rpx;
			height: 300rpx;
			border-radius: 10rpx;
		}

		.delete {
			position: absolute;
			border-radius: 20rpx;
			top: 0;
			right: -130rpx;
			width: 100rpx;
			height: 100%;
			text-align: center;
			color: #333;
			font-size: 35rpx;
			background-color: red;

			view {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}

	}

	.nodata {
		width: 700rpx;
		height: 500rpx;
		border-radius: 10rpx;
		// background: url("../../static/images/bg/16.jpg");
		background: url("../../static/images/bg/16.jpg");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		text-align: center;
		line-height: 500rpx;
		font-size: 50rpx;
		margin: 0 auto;
	}
</style>