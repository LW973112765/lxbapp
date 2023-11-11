<template>
	<view class="box" :style="style">
		<view class="main">
			<view class="top">
				<image :src="avatar" mode=""></image>
				<view class="">
					<text>{{userinfo.username}}</text>
					<text>{{userinfo.email}}</text>
				</view>
			</view>
			<view class="center">
				<uv-qrcode areaColor="#F95F6B" , ref="qrcode" size="500rpx" :value="datas"
					:options="options"></uv-qrcode>
			</view>
			<view class="buttom">
				扫一扫上面的二维码图案，加我为朋友。
			</view>
		</view>
		<view class="zxl">
			<text class="title" @click="selectcolorone">调试颜色一</text>
			<text class="lw">|</text>
			<text class="title" @click="selectcolortwo">调试颜色二</text>
			<text class="lw">|</text>
			<text class="title" @click="save">保存名片</text>
		</view>
		<picker-color :isShow="showPickerColor" :bottom="0" @callback='getPickerColor' />
	</view>
</template>

<script>
	import pickerColor from "@/components/helang-pickerColor/helang-pickerColor.vue"
	import {
		mapState
	} from "vuex";
	import col from "../../uni_modules/uview-ui/libs/config/props/col";
	export default {
		components: {
			"picker-color": pickerColor,
		},
		data() {
			return {
				showPickerColor: false,
				colorone: '#0099FF',
				colortwo: '#999',
				selecttype: 0,
				buttonColor: "#0099FF",
				themeColor: "#0099FF",
				avatar: 'http://m.qpic.cn/psc?/V520E5q83NOw0H4BUh6r4ESuU33wVKCD/bqQfVz5yrrGYSXMvKr.cqU3L2pU1fdDh0Nt7of.Ry0.tlmo79sW8PtRDNUa*sX3FaDo*QP63*1roT3TpX0powE6H5sxl1uz91LugqrJDd.E!/mnull&bo=gAc4BAAAAAABB5s!&rf=photolist&t=5',
				datas: '',
				options: {
					size: 300,
					// useDynamicSize: false,
					// errorCorrectLevel: 'Q',
					// margin: 10,
					areaColor: "transparent",
					// backgroundColor: "#3c9cff",
					// 指定二维码前景，一般可在中间放logo
					foregroundImageSrc: 'https://www.uvui.cn/common/logo.png',
				}
			};
		},
		onLoad() {
			this.options.foregroundImageSrc = this.avatar
			let obj = {
				id: this.userinfo.id,
				name: this.userinfo.username,
				type: 'friend'
			}
			this.datas = JSON.stringify(obj)
		},

		methods: {
			selectcolorone() {
				this.showPickerColor = true
				this.selecttype = 1
			},
			selectcolortwo() {
				this.showPickerColor = true
				this.selecttype = 2
			},
			/* 显示获取颜色选择弹窗 */
			showPickerColorPop() {
				this.showPickerColor = true;
			},
			/* 获取颜色选择回调 */
			getPickerColor(color) {
				console.log('关闭');
				/* 判断颜色值是否有效 */
				if (color) {
					console.log('选择的颜色值是：' + color);
					this.buttonColor = color;
					this.themeColor = color
					if (this.selecttype == 1) {
						this.colorone = color
					} else {
						this.colortwo = color
					}
				}
				/* 隐藏弹窗 */
				this.showPickerColor = false;
			},
			save() {
				// console.log(this.colorone, '颜色一')
				// console.log(this.colortwo, '颜色二')
				// console.log(this.selectone, '颜色一')
				// console.log(this.selecttwo, '颜色二')
				this.$refs.qrcode.save({
					success: (res) => {
						uni.showToast({
							title: '图片已保存',
							icon: 'none',
							mask: false,
							duration: 1500
						});
					}
				});
			},
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
			style() {
				// let background = `linear-gradient(to right, ${this.colorone},${this.colortwo})`
				let style = `background :linear-gradient(to right, ${this.colorone},${this.colortwo})`
				return style;

			}
		},
	}
</script>
<style lang="less" scoped>
	button {
		margin-top: 20rpx;
	}

	.box {
		width: 100%;
		height: 100vh;
	}

	.zxl {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 200rpx;
		width: 500rpx;
		height: 200rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title {
			color: skyblue;
		}

		.lw {
			color: #999;
		}

	}

	.main {
		position: relative;
		margin: 0 auto;
		transform: translateY(200rpx);
		width: 500rpx;
		height: 600rpx;

		.top {
			width: 500rpx;
			height: 150rpx;
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-bottom: 50rpx;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
			}

			view {
				margin-left: 40rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				// align-items: center;
				width: 200rpx;
				height: 100rpx;

				txet {
					text-align: left !important;
				}
			}
		}

		.center {
			width: 500rpx;
			height: 500rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.buttom {
			width: 500rpx;
			height: 200rpx;
			font-size: 25rpx;
			color: #999;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>