<template>
	<view>
		<u-notice-bar :text="text" mode="closable"></u-notice-bar>
		<h3 style="text-align: center;margin-top: 10rpx;">二维码展示区</h3>
		<view style="margin: 40upx;">
			<ayQrcode ref="qrcode4" qrcode_id="qrcode4" :modal="modal_qr" :urll="urll" @hideQrcode="hideQrcode"
				:height="300" :width="300" :themeColor="themeColor" :is_themeImg="true" :themeImg="logo"
				:h_w_img="40" />
		</view>
		<u--text style="width: 560rpx;margin: 15rpx auto;" type="primary" v-show="type==1" text="文字内容:"></u--text>
		<u--textarea style="width: 560rpx;margin: 15rpx auto;" v-show="type==1" v-model="dataurl" placeholder="请输入内容"
			autoHeight></u--textarea>
		<u--text style="width: 560rpx;margin: 15rpx auto;" type="primary" v-show="type==2" text="图片链接:"></u--text>
		<u--input style="width: 560rpx;margin: 15rpx auto;" v-show="type==2" placeholder="请输入图片链接" border="surround"
			v-model="dataurl"></u--input>
		<u--text style="width: 560rpx;margin: 15rpx auto;" type="primary" v-show="type==3" text="视频链接:"></u--text>
		<u--input style=" width: 560rpx;margin: 15rpx auto;" v-show="type==3" placeholder="请输入视频链接" border="surround"
			v-model="dataurl"></u--input>
		<u--text style="width: 560rpx;margin: 15rpx auto;" type="primary" text="二维码名称:"></u--text>
		<u--input style="width: 560rpx;margin: 15rpx auto;" placeholder="请输入二维码名称" border="surround" v-model="title"
			maxlength="15"></u--input>
		<view style="width: 560rpx;margin: 15rpx auto;display: flex;flex-wrap: nowrap;">
			<u--text type="primary" text="上传云端:"></u--text>
			<u-switch style="width: 100rpx;" v-model="isshow" @change="changeswitch"></u-switch>
		</view>
		<u-button style="width: 600rpx;margin-bottom: 30rpx;"
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" type="default"
			@click="show=true">选择类型<txet v-show="typename" style="margin-left: 10rpx;">当前类型:{{typename}}</txet>
		</u-button>
		<u-button style="width: 600rpx;margin-bottom: 30rpx;"
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" type="default"
			@click="showPickerColor=true">改变颜色</u-button>
		<picker-color :isShow="showPickerColor" :bottom="0" @callback='getPickerColor' />
		<u-button @click="make" style="width: 600rpx;margin-bottom: 30rpx;"
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" type="default">开始制作</u-button>

		<u-popup :show="show" mode="bottom" @close="close">
			<view>
				<u-picker :show="show" :columns="columns" keyName="label" @cancel="close" @confirm="gettype"></u-picker>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		v4 as uuidv4
	} from 'uuid';
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
				show: false,
				logo: '',
				type: null,
				typename: '',
				dataurl: '',
				title: '',
				//二维码相关参数
				themeColor: '#ddd890',
				modal_qr: false,
				urll: {}, // 要生成的二维码值
				isshow: false,
				uuid: '',
				columns: [
					[{
						label: '文字',
						// 其他属性值
						id: 1
						// ...
					}, {
						label: '图片',
						id: 2
					}, {
						label: '视频',
						id: 3
					}, ]
				],

			}
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onLoad() {},
		methods: {
			changeswitch(e) {
				console.log(e)
				this.isshow = e
			},
			close() {
				this.show = false
				// console.log('close');
			},
			gettype(val) {
				this.dataurl = ''
				console.log('close', val.value[0]);
				this.typename = val.value[0].label
				this.type = val.value[0].id
				this.show = false
			},
			make() {
				if (!this.title) {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请输入二维码名称😊",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
				} else if (!this.type) {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请选择类型😊",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})

				} else if (!this.dataurl) {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请输入内容或链接😊",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
				} else {
					this.uuid = uuidv4()
					this.urll = `uuid:${this.uuid}￥zxl￥typename:${this.typename}￥zxl￥type:${this.type}`
					this.showQrcode();
					this.sendcode()
				}
			},
			async sendcode() {
				let res = await this.$zxl('/makecode', {
					uuid: this.uuid,
					type: this.type,
					typename: this.typename,
					url: this.dataurl,
					title: this.title,
					isshow: this.isshow ? 1 : 0
				}, 'POST')
				if (res.data.status == 200) {
					console.log('成功成功成功成功')
				}
			},
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