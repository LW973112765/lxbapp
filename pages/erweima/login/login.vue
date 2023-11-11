<template>
	<view>
		<u-notice-bar :text="text" mode="closable"></u-notice-bar>
		<h3 style="text-align: center;margin-top: 10rpx;">二维码展示区</h3>
		<view style="margin: 40upx;">
			<ayQrcode ref="qrcode4" qrcode_id="qrcode4" :modal="modal_qr" :urll="urll" @hideQrcode="hideQrcode"
				:height="300" :width="300" :themeColor="themeColor" :is_themeImg="true" :themeImg="userinfo.avatar"
				:h_w_img="40" />
		</view>
		<u-button style="width: 600rpx;margin-bottom: 30rpx;"
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" type="default"
			@click="showPickerColor=true">改变颜色</u-button>
		<picker-color :isShow="showPickerColor" :bottom="0" @callback='getPickerColor' />
		<!-- <u-button @click="save" style="width: 600rpx;margin-bottom: 30rpx;"
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" type="default">如何保存二维码？</u-button> -->

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import pickerColor from "@/components/helang-pickerColor/helang-pickerColor.vue"
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	export default {
		components: {
			ayQrcode,
			"picker-color": pickerColor,
		},
		data() {
			return {
				text: '本APP不提供所有二维码的保存方式，请自行截屏！',
				buttonColor: "#0099FF",
				showPickerColor: false,
				bottomPickerColor: 0,
				//二维码相关参数
				themeColor: '#ddd890',
				modal_qr: false,
				urll: [], // 要生成的二维码值

			}
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onLoad() {
			let that = this;
			that.showQrcode(); //一加载生成二维码
			this.urll = `username:${this.userinfo.username}￥zxl￥password:${this.userinfo.password}￥zxl￥type:login`
		},
		methods: {
			// save() {

			// },
			/* 显示获取颜色选择弹窗 */
			showPickerColorPop() {
				this.showPickerColor = true;
			},
			/* 获取颜色选择回调 */
			getPickerColor(color) {
				/* 隐藏弹窗 */
				this.showPickerColor = false;
				/* 判断颜色值是否有效 */
				if (color) {
					this.buttonColor = color;
					this.themeColor = color
					console.log('选择的颜色值是：' + color);
					uni.$emit('updata', this.themeColor)
				}
			},
			// 展示二维码
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				// uni.showLoading()
				setTimeout(function() {
					// uni.hideLoading()
					_this.$refs.qrcode4.crtQrCode()
				}, 100)
			},

			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
		}

	}
</script>

<style lang="scss">
</style>