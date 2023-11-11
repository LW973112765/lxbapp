<template>
	<view>
		<view class="header" v-show="isload">
			<image src="../../static/images/kongtiao/deng.png" mode=""></image>
			<text> Tip: 为你的{{tipone}}带去{{tiptwo}}！</text>
		</view>
		<view class="kt" v-show="isload">
			<!-- 图标 -->
			<view class="muibox">
				<view class="muiBox-root">
					<view class="bmbyv"></view>
					<view class="bmbyv"></view>
					<view class="bmbyv"></view>
					<view class="bmbyv"></view>
					<view class="bmbyv"></view>
					<view class="bmbyv"></view>
				</view>
				<view class="bslt">
					<view class="muigrid">
						<view class="lgreen"></view>
						<view class="sgreen"></view>
					</view>
					<view class="lightgreen"></view>
					<view class="blue"></view>
					<view class="red"></view>
				</view>
				<view class="cxjp">
					<view class="zr6tlc">
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
						<view class="romlnn"></view>
					</view>
					<view class="solid"></view>
					<view class="zr6tlc">
						<view class="pnhetw"></view>
						<view class="pnhetw"></view>
						<view class="pnhetw"></view>
						<view class="pnhetw"></view>
						<view class="pnhetw"></view>
						<view class="pnhetw"></view>
						<view class="pnhetw"></view>
						<view class="pnhetw"></view>
						<view class="pnhetw"></view>
					</view>
					<view class="zr6tlc">
						<view class="eex56h"></view>
						<view class="eex56h"></view>
						<view class="eex56h"></view>
						<view class="eex56h"></view>
						<view class="eex56h"></view>
						<view class="eex56h"></view>
						<view class="eex56h"></view>
						<view class="eex56h"></view>
						<view class="eex56h"></view>
						<view class="eex56h"></view>
					</view>
				</view>
				<view class="zr6tlc">
					<view class="pxzb"></view>
					<view class="pxzb"></view>
					<view class="pxzb"></view>
					<view class="pxzb"></view>
					<view class="pxzb"></view>
					<view class="pxzb"></view>
					<view class="pxzb"></view>
					<view class="pxzb"></view>
				</view>
			</view>
			<view class="top">
				<view class="temperature" v-show="temperature!=null">
					<!-- 晴 -->
					<image v-if="status==1" src="../../static/images/kongtiao/qing.png" mode=""></image>
					<!-- 雾 -->
					<image v-if="status==2" src="../../static/images/kongtiao/wu.png" mode=""></image>
					<!-- 云-3； -->
					<image v-if="status==3" src="../../static/images/kongtiao/yun.png" mode=""></image>
					<!-- 雨-4； -->
					<image v-if="status==4" src="../../static/images/kongtiao/yu.png" mode=""></image>
					<!-- 雪-5； -->
					<image v-if="status==5" src="../../static/images/kongtiao/xue.png" mode=""></image>
					<!-- 霾-6； -->
					<image v-if="status==6" src="../../static/images/kongtiao/mai.png" mode=""></image>
					<!-- 阴-7； -->
					<image v-if="status==7" src="../../static/images/kongtiao/yin.png" mode=""></image>
					<!-- 未知-8 -->
					<image v-if="status==8" src="../../static/images/kongtiao/weizhi.png" mode=""></image>
					<text>{{temperature}}℃</text>
				</view>
				<view class="title">
					LWANDZXL
				</view>
				<view class="weather" v-show="temperature!=null">
					{{weather}}
				</view>
				<view class="city" :style="style_box">
					{{address}}
				</view>
			</view>
			<view class="buttom">
				<view class="deng">
					<view :class="{'changered':changeing,'changegreen':changeover,}"></view>
					<view :class="{'changered':changeing,'changegreen':changeover,}"></view>
					<view :class="{'changered':changeing,'changegreen':changeover,}"></view>
				</view>
			</view>
		</view>
		<view class="zxl" v-show="isload">
			<view class="one" :class="{'active':isopen,'cold':iscold,'hot':ishot,'normal':isnormal}">

			</view>
			<view class="two" :class="{'active':isopen,'cold':iscold,'hot':ishot,'normal':isnormal}">

			</view>
			<view class="three" :class="{'active':isopen,'cold':iscold,'hot':ishot,'normal':isnormal}">

			</view>
		</view>
		<view class="tools" v-show="isload">
			<view class="box">
				<view class="two" :class="{'green':isopen}">
					<image @click="start" src="../../static/images/kongtiao/start.png" mode=""></image>
				</view>
				<text v-if="!isopen">启动</text>
				<text v-else>关闭</text>
			</view>
			<view class="box">
				<view class="one" :class="{'close':!isopen}">
					<image @click="changecold" src="../../static/images/kongtiao/cold.png" mode=""></image>
				</view>
				<text>冷风</text>
			</view>
			<view class="box">
				<view class="four" :class="{'close':!isopen}">
					<image @click="changenormal" src="../../static/images/kongtiao/normal.png" mode=""></image>
				</view>
				<text>正常</text>
			</view>
			<view class="box">
				<view class="three" :class="{'close':!isopen}">
					<image @click="changehot" src="../../static/images/kongtiao/hot.png" mode=""></image>
				</view>
				<text>热风</text>
			</view>
		</view>
		<view class="control" v-show="isload" :class="{'active':isopen}">
			<image @click="add" src="../../static/images/kongtiao/top.png" mode=""></image>
			<image @click="increase" src="../../static/images/kongtiao/bottom.png" mode=""></image>
		</view>
		<view class="load2" v-if="!isload">
			<zero-loading class="loadson" position="absolute" v-if="!isload"></zero-loading>
		</view>
		<view class="box2" v-if="show1">
			<view class="zxl">
				<view class="top">
					<image v-show="temperature<0" src="../../static/images/kongtiao/toocold.gif" mode=""></image>
					<image v-show="temperature>0" src="../../static/images/kongtiao/toohot.gif" mode=""></image>
				</view>
				<view class="bottom">
					<uv-button type="error" @click="brave" text="不服就干"></uv-button>
					<uv-button type="warning" @click="afraid" text="怕了怕了"></uv-button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	var timer;
	export default {
		data() {
			return {
				isopen: false,
				iscold: false,
				ishot: false,
				isnormal: false,
				isload: false,
				show1: false,
				currenttemperature: null,
				temperature: null,
				address: '武威市',
				weather: null,
				status: null, //晴-1；雾-2；多云-3；雨-4；雪-5；霾-6；阴-7；未知-8
				tipone: null,
				tiptwo: null,
				txtColor1: '#3498db',
				txtColor2: '#f47920',
				txtColor3: '#d71345',
				txtColor4: '#f7acbc',
				txtColor5: '#ffd400',
				txtColor6: '#3498db',
				txtColor7: '#f47920',
				txtColor8: '#d71345',
				txtColor9: '#f7acbc',
				txtColor10: '#ffd400',
				txtColor11: '#3498db',
				changeing: false,
				changeover: false,
			};
		},
		computed: {
			style_box() {
				let that = this;
				var style = '';
				style +=
					`background-image: -webkit-linear-gradient(left, ${that.txtColor1}, ${that.txtColor2} 10%, ${that.txtColor3} 20%, ${that.txtColor4} 30%, ${that.txtColor5} 40%, ${that.txtColor6} 50%, ${that.txtColor7} 60%, ${that.txtColor8}  70%, ${that.txtColor9} 80%, ${that.txtColor10} 90%, ${that.txtColor11});`;
				return style;
			},
		},
		onLoad() {
			this.getaddress()
			setTimeout(() => {
				this.gettemperature()
			}, 1000)
			let M = new Date().getMonth() + 1
			if (M >= 3 && M <= 5) {
				this.tipone = '春日'
				this.tiptwo = "温暖"
			} else if (M >= 6 && M <= 8) {
				this.tipone = '夏日'
				this.tiptwo = "凉爽"
			} else if (M >= 9 && M <= 10) {
				this.tipone = '秋日'
				this.tiptwo = "凉爽"
			} else {
				this.tipone = '冬日'
				this.tiptwo = "温暖"
			}

		},
		watch: {
			temperature(newval, oldval) {
				console.log(newval, oldval)
				if (newval >= 40) {
					this.temperature = 40
					this.$refs.uToast.show({
						type: 'warning',
						message: `你被热死了😊`,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1200)
				}
				if (newval <= -15) {
					this.temperature = -15
					this.$refs.uToast.show({
						type: 'warning',
						message: `你被冻死了😊`,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1200)
				}
				if (newval == -10) {
					this.show1 = true
				}
				if (newval == 35) {
					this.show1 = true
				}
			}
		},
		methods: {
			increase() {
				if (!this.isopen) return;
				timer && clearTimeout(timer)
				timer = setTimeout(() => {
					this.music.zxl_ktchange()
					this.temperature--
				}, 500)

			},
			add() {
				if (!this.isopen) return;
				timer && clearTimeout(timer)
				timer = setTimeout(() => {
					this.music.zxl_ktchange()
					this.temperature++
				}, 500)

			},
			afraid() {
				this.show1 = false
				this.temperature = this.currenttemperature
			},
			brave() {
				this.show1 = false
			},
			getaddress() {
				uni.request({
					url: 'https://restapi.amap.com/v3/ip?parameters',
					data: {
						output: 'json',
						key: '51298497ee224349eb6d30072afd61a4'
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 1) {
							this.address = res.data.city
						}
					}
				})
			},
			gettemperature() {
				console.log(this.address, '地址')
				uni.request({
					url: 'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
					data: {
						city: this.address,
						key: '51298497ee224349eb6d30072afd61a4'
					},
					method: 'GET',
					success: (res) => {
						console.log(res, res.data.lives[0].weather)
						this.weather = res.data.lives[0].weather
						this.temperature = res.data.lives[0].temperature
						this.currenttemperature = res.data.lives[0].temperature
						this.isload = true
						if (this.weather.indexOf('晴') !== -1 && this.weather.length == 1) {
							this.status = 1;
						} else if (this.weather.indexOf('雾') !== -1) {
							this.status = 2
						} else if (this.weather.indexOf('云') !== -1) {
							this.status = 3
						} else if (this.weather.indexOf('雨') !== -1) {
							this.status = 4
						} else if (this.weather.indexOf('雪') !== -1) {
							this.status = 5
						} else if (this.weather.indexOf('霾') !== -1) {
							this.status = 6
						} else if (this.weather.indexOf('阴') !== -1) {
							this.status = 7
						} else {
							this.status = 8
						}

					}
				})
			},
			start() {
				if (this.isopen) {
					this.changeing = true
					this.changeover = false
					this.isopen = false
					this.music.zxl_ktchange()
					uni.showLoading({
						mask: true,
						title: '正在关闭空调',
					})
					setTimeout(() => {
						uni.hideLoading()
						this.changeing = false
						this.changeover = false
						this.$refs.uToast.show({
							type: 'success',
							message: `空调已关闭😊`,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							position: 'top'
						})
					}, 3000)
				} else {
					this.isopen = true
					// this.music.zxl_ktstart()
					this.changeing = true
					uni.showLoading({
						mask: true,
						title: '正在启动空调',

					})
					setTimeout(() => {
						uni.hideLoading()
						this.changeing = false
						this.changeover = true
						this.$refs.uToast.show({
							type: 'success',
							message: `空调已启动😊`,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							position: 'top'
						})
					}, 5000)
				}
			},
			changecold() {
				if (!this.isopen) return;
				this.music.zxl_ktchange()
				this.iscold = true
				this.ishot = false
				this.isnormal = false
				this.$refs.uToast.show({
					type: 'success',
					message: `冷风模式😊`,
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
					position: 'top'
				})
			},
			changehot() {
				if (!this.isopen) return;
				this.music.zxl_ktchange()
				this.ishot = true
				this.iscold = false
				this.isnormal = false
				this.$refs.uToast.show({
					type: 'success',
					message: `热风模式😊`,
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
					position: 'top'
				})
			},
			changenormal() {
				if (!this.isopen) return;
				this.music.zxl_ktchange()
				this.isnormal = true
				this.iscold = false
				this.ishot = false
				this.$refs.uToast.show({
					type: 'success',
					message: `正常模式😊`,
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
					position: 'top'
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.active {
		opacity: 1 !important;

	}

	.close {
		opacity: 0.3;
	}

	.cold {
		background-color: rgb(63, 81, 181) !important;
	}

	.hot {
		background-color: orange !important;
	}

	.normal {
		background-color: #B7B7B7 !important;
	}

	.green {
		background-color: rgb(76, 175, 80) !important;
	}

	.header {
		margin: 10rpx auto;
		width: 500rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		image {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.tools {
		margin: 0 auto;
		margin-top: 20rpx;
		width: 650rpx;
		height: 250rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;

		.box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.one {
			background-color: rgb(63, 81, 181);
		}

		.two {
			background-color: red;
		}

		.three {
			background-color: orange;
		}

		.four {
			background-color: #B7B7B7;
		}

		.one,
		.two,
		.three,
		.four {
			border-radius: 10rpx;
			width: 100rpx;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}

		}


	}



	.kt {
		position: relative;
		margin: 0 auto;
		margin-top: 20rpx;
		width: 650rpx;
		height: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: whitesmoke;
		box-shadow: 0px 5px 10px #999;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;

		.top {
			position: relative;
			flex: 1;
			width: 100%;
			border-bottom: #999 2rpx solid;

			.weather {
				color: black;
				font-size: 35rpx;
				font-weight: 500;
				position: absolute;
				top: 10rpx;
				left: 50%;
				transform: translateX(-50%);
			}

			.city {
				width: 60rpx;
				height: 50rpx;
				position: absolute;
				right: 20rpx;
				font-size: 20rpx;
				top: 10rpx;
				font-style: italic;
				color: transparent;
				-webkit-background-clip: text;
				background-size: 200% 100%;
				-webkit-animation: slide1 2s infinite linear;
				animation: slide1 5s infinite linear;
			}

			.title {
				color: #B7B7B7;
				font-size: 20rpx;
				position: absolute;
				bottom: 10rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.buttom .deng .changered {
			background-color: red;
		}

		.buttom .deng .changegreen {
			background-color: rgb(76, 175, 80);
		}

		.buttom {
			position: relative;
			width: 100%;
			height: 50rpx;

			.deng {
				position: absolute;
				top: 50%;
				left: 30rpx;
				transform: translateY(-50%);
				width: 100rpx;
				height: 50rpx;
				// background-color: wheat;
				display: flex;
				justify-content: space-between;
				align-items: center;

				view {
					width: 15rpx;
					height: 15rpx;
					border-radius: 50%;
					background-color: #999999;
				}
			}
		}
	}

	@keyframes slide1 {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}
	}

	.zxl {
		margin: 20rpx auto;
		width: 300rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;


		.one,
		.two,
		.three {
			height: 90rpx;
			width: 10rpx;
			background-color: #B7B7B7;
			transition: opacity 3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			opacity: 0;
			// display: none;

		}

		.one {
			transform: rotate(15deg)
		}

		.three {
			transform: rotate(-15deg)
		}
	}

	.temperature {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 20rpx;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #999999;

		image {
			width: 50rpx;
			height: 50rpx;
		}

	}

	.control {
		margin: 0 auto;
		width: 300rpx;
		height: 200rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: opacity 3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		opacity: 0;

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.muibox {
		content: "";
		position: absolute;
		top: 10px;
		left: 10px;
		height: 70px;
		width: 50px;
		border-radius: 8px;
		padding: 4px;
		background-color: #4ea5f5;
	}

	.muibox .muiBox-root {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.muiBox-root .bmbyv {
		margin: 0px 2px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: white;
	}

	.haier {
		margin-top: 96px;
		text-align: center;
	}

	.muibox .bslt {
		width: 100%;
		height: 28px;
		margin: 4px 0;
		padding: 2px 8px;
		box-sizing: border-box;
		background-color: #fff;
	}

	.muibox .bslt .muigrid {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 2px;
	}

	.muibox .bslt .muigrid .lgreen {
		background-color: green;
		height: 3px;
		width: 40%;
	}

	.muibox .bslt .muigrid .sgreen {
		background-color: green;
		height: 3px;
		width: 20%;
		border-radius: 100% 0 0 100%;
	}

	.muibox .bslt .lightgreen {
		margin-top: 3px;
		background-color: lightgreen;
		height: 3px;
		width: 50%;
	}

	.muibox .bslt .blue {
		margin-top: 3px;
		background-color: blue;
		height: 3px;
		width: 60%;
	}

	.muibox .bslt .red {
		margin-top: 4px;
		background-color: red;
		height: 3px;
		width: 80%;
	}

	.muibox .cxjp {
		margin-bottom: 2px;
		padding-top: 0.8px;
		height: 20px;
		width: 100%;
		background-color: #fff;
	}

	.muibox .zr6tlc {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.muibox .cxjp .solid {
		margin-top: 0.8px;
		margin-bottom: 0.8px;
		border-top: 1px solid;
		height: 0%;
		width: 100%;
	}

	.muibox .cxjp .zr6tlc .romlnn {
		margin: 2px 0.8px;
		width: 2px;
		height: 2px;
		border-radius: 50%;
		background-color: black;
	}

	.muibox .cxjp .zr6tlc .pnhetw {
		margin: 2px 0.8px;
		width: 1.5px;
		height: 1.5px;
		border-radius: 50%;
		background-color: black;
	}

	.muibox .cxjp .zr6tlc .eex56h {
		margin: 0px 0.8px;
		width: 1.2px;
		height: 1.2px;
		border-radius: 50%;
		background-color: black;
	}

	.muibox .zr6tlc .pxzb {
		margin: 0px 0.8px;
		width: 2px;
		height: 2px;
		border-radius: 50%;
		background-color: white;
	}

	.mraimo {
		margin-top: 8px;
		border: 1px solid rgb(224, 224, 224);
	}

	.load2 {
		width: 750rpx;
		height: 100rpx;
		margin: 300rpx auto;
	}

	.box2 {
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);

		.zxl {
			position: absolute;
			width: 650rpx;
			height: 400rpx;
			left: 50%;
			top: 80%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			// background-color: red;

			image {
				width: 300rpx;
				height: 300rpx;
			}

			.bottom {
				width: 400rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>