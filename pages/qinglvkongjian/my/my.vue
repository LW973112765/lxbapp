<template>
	<view class="main">
		<qinglvkongjianbar @navbarBtnTap="navbarBtnTapHandler" img="../../../static/images/choujiang/ax1.png"
			:title="'我的'"></qinglvkongjianbar>
		<view class="other" @click="tolist">
			<image src="../../../static/images/choujiang/jp2.png" mode=""></image>
			<text class="title">我的奖品</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="todetail">
			<image src="../../../static/images/choujiang/jilu.png" mode=""></image>
			<text class="title">奖品记录</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="toduihuan">
			<image src="../../../static/images/choujiang/dh1.png" mode=""></image>
			<text class="title">积分兑换</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="tojifenjilu">
			<image src="../../../static/images/choujiang/jf44.png" mode=""></image>
			<text class="title">积分记录</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="tojifensy">
			<image src="../../../static/images/choujiang/jf55.png" mode=""></image>
			<text class="title">积分获得说明</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="tofresh" v-if="ishave&&reset&&!times">
			<image src="../../../static/images/choujiang/reset.png" mode=""></image>
			<text class="title">刷新兑换次数</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="tochoujiang">
			<image src="../../../static/images/choujiang/cj.png" mode=""></image>
			<text class="title">抽奖</text>
			<text class="more"> > </text>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-contentzxl" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<imgCodeInput ref="verCodes" @input="getcode" v-model="visitForm.verCode"
						@error="canvasIdErrorCallback"></imgCodeInput>
					<button @click="postcode" style="width: 300rpx;margin-top: 30rpx;" type="mini">确定</button>
				</view>
			</uni-popup>
		</view>
		<u-toast ref="uToast"></u-toast>
		<footerbar @toIndex="toIndex"></footerbar>
	</view>
</template>

<script>
	import imgCodeInput from "@/components/img-code-input/img-code-input.vue"
	import moment from 'moment'
	export default {
		components: {
			imgCodeInput
		},
		data() {
			return {
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				visitForm: {
					verCode: ""
				},
				verCode: '',
				code: '',
				ishave: false,
				reset: 0,
				times: 0
			};
		},
		onBackPress() {
			uni.navigateTo({
				url: "/pages/qinglvkongjian/home/home",
				animationType: 'zoom-fade-out'
			})
			return true
		},
		onLoad() {
			this.getchoujiangcishu()
		},
		onShow() {
			this.getchoujiangcishu()
		},
		methods: {
			navbarBtnTapHandler() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/home/home",
					animationType: 'zoom-fade-out'
				})
			},
			async changecount() {
				let time = moment().format("YYYY-MM-DD");
				let res = await this.$zxl('/editchoujiangcishu', {
					time,
					reset: 0,
					times: 50
				}, 'POST')
				if (res.data.status == 200) {
					uni.showToast({
						icon: "loading",
						title: "刷新中...",
						duration: 1500
					})

					setTimeout(() => {
						this.$refs.uToast.show({
							type: 'success',
							message: "刷新成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						this.$refs.popup.close()
						this.getchoujiangcishu()
					}, 2000)

				}
			},
			async getchoujiangcishu() {
				let time = moment().format("YYYY-MM-DD");
				let res = await this.$zxl('/getchoujiangcishu', {
					time
				})
				console.log(res.data, '获取每日抽奖次数')
				this.ishave = res.data.ishave
				if (res.data.ishave) {
					this.reset = res.data.data[0].reset
					this.times = res.data.data[0].times
				}

			},
			getcode(e) {

				this.code = e.code
				this.verCode = e.verCode
			},
			postcode() {
				if (this.verCode == '') {
					this.$refs.uToast.show({
						type: 'error',
						message: "请输入验证码",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else if (this.code == this.verCode) {
					this.changecount()
				} else {
					this.$refs.uToast.show({
						type: 'error',
						message: "验证码错误",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				}
			},
			canvasIdErrorCallback(e) {
				console.error(e.detail.errMsg)
			},
			tofresh() {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '抽奖次数每天只可刷新一次！',
					success: (res) => {
						if (res.confirm) {
							this.toggle('center')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			tojifensy() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/jifenhuode/jifenhuode",
					animationType: 'zoom-fade-out'
				})
			},
			tojifenjilu() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/jifenjilu/jifenjilu",
					animationType: 'zoom-fade-out'
				})
			},
			toduihuan() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/duihuan/duihuan",
					animationType: 'zoom-fade-out'
				})
			},
			tochoujiang() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/choujiang/choujiang",
					animationType: 'zoom-fade-out'
				})
			},
			todetail() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/jiangpinjilu/jiangpinjilu",
					animationType: 'zoom-fade-out'
				})
			},
			tolist() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/jiangpinlist/jiangpinlist",
					animationType: 'zoom-fade-out'
				})
			},
			toIndex(index) {
				if (index == 1) {
					console.log(index)
				} else if (index == 0) {
					console.log(index)
					uni.navigateTo({
						url: "/pages/qinglvkongjian/home/home",
						animationType: 'zoom-fade-out'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: "/pages/qinglvkongjian/jinianri/jinianri",
						animationType: 'zoom-fade-out'
					})
				} else {
					uni.navigateTo({
						url: '/pages/qinglvkongjian/shuoshuo/shuoshuo',
						animationType: 'zoom-fade-out'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.popup-contentzxl {
		z-index: 100;
		padding-top: 100rpx;
		width: 700rpx;
		box-sizing: border-box;
		height: 400rpx;

		// background: -webkit-linear-gradient(top, pink, #999999);

	}

	.main {
		width: 100%;
		height: auto;

		// padding-top: 30rpx;
		.box {
			margin: 0 auto;
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;
			margin-bottom: 30rpx;
			background-color: whitesmoke;
			padding: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			border-bottom: 1px solid #ebeef5;
			align-items: center;
			font-size: 35rpx;
			color: #999;

			.title {
				height: 100rpx;
				line-height: 100rpx;
			}

			.more {
				height: 100rpx;
				line-height: 100rpx;
			}
		}
	}

	.other {
		margin: 0 auto;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-bottom: 1px solid #ebeef5;
		align-items: center;
		font-size: 35rpx;
		color: #999;
		background: #fff;
		padding: 20rpx 40rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;

		image {
			width: 50rpx;
			height: 50rpx;
			margin-right: -400rpx;
		}

		.title {
			display: block;
			width: 200rpx;
			margin-left: 20rpx;
			// background-color: red;
		}
	}
</style>