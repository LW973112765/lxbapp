<template>
	<view>
		<view class="main">
			<view class="box">
				<image src="../../static/codelogin/1.png" mode=""></image>
				<text>二维码集合</text>
			</view>
			<view class="box" @click="tologin">
				<image src="../../static/codelogin/1.png" mode=""></image>
				<text>登录二维码</text>
			</view>
			<view class="box">
				<image src="../../static/codelogin/1.png" mode=""></image>
				<text>狼小宝</text>
			</view>
			<view class="box">
				<image src="../../static/codelogin/1.png" mode=""></image>
				<text>猪小宝</text>
			</view>
			<view class="box" @click="tovideo">
				<image src="../../static/codelogin/1.png" mode=""></image>
				<text>二维码制作</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {

			};
		},
		onNavigationBarButtonTap(e) {
			if (this.userinfo.username) {
				this.codelogin()
			} else {
				this.$refs.uToast.show({
					type: 'warning',
					message: "请先登录",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			}

		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		methods: {
			codelogin() {
				uni.scanCode({
					onlyFromCamera: false,
					success: (res) => {
						this.music.zxl_saoma()
						let startdata = res.result.split('￥zxl￥')
						let data = this.$datachange(startdata)
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/erweima/codeinfo/codeinfo?data=${JSON.stringify(data)}`,
								animationType: 'zoom-fade-out'
							})
						}, 1000)
						console.log(data, '扫码结果');
					},
					fail: (res) => {
						this.$refs.uToast.show({
							type: 'warning',
							message: "扫码失败",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					}
				});
			},
			tologin() {
				uni.navigateTo({
					url: '/pages/erweima/login/login',
					animationType: 'zoom-fade-out'
				})
			},
			tovideo() {
				uni.navigateTo({
					url: '/pages/erweima/makecode/makecode',
					animationType: 'zoom-fade-out'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		height: 200rpx;
		// background-color: red;
		display: flex;
		flex-wrap: wrap;
		justify-content: start;

		.box {
			width: 180rpx;
			height: 180rpx;
			// background-color: red;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		image {
			border-radius: 5rpx;
		}
	}
</style>