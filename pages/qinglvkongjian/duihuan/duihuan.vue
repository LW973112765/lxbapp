<template>
	<view>
		<view class="navbar">
			<view class="nav-left">
				<image @click="navbarAction" class="menu-img" src="../../../static/png/navbar_back.png"
					mode="aspectFill"></image>
			</view>
			<view class="nav-middle">
				<text class="title">积分兑换</text>
			</view>
			<view class="nav-right">
				<image src="../../../static/images/choujiang/jf1.png" mode=""></image>
				<view>
					{{total}}
				</view>
			</view>
		</view>
		<view class="total">
			今日兑换次数还剩：
			<text class="" :style="{color:times>0?'green':'red'}">
				{{times}}
			</text>
		</view>
		<view class="main">
			<view class="box" v-for="(item,index) in list" :key="index">
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" :src="item.img" mode="">
				</image>
				<text class="zxl" :style="style_box">{{item.name}}</text>
				<!-- <text>{{item.price}}</text> -->
				<view class="lw" @click="duihuan(item)">
					<image src="../../../static/images/choujiang/jg1.png" mode=""></image>
					<text>{{item.price}}</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import moment from "moment";
	import menu from '@/common/show.js';
	export default {
		data() {
			return {
				total: 0,
				times: 10,
				list: [],
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
			};
		},
		onLoad() {
			this.getdata()
			this.loadData();
			this.getchoujiangcishu()
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
		methods: {
			async addjifenjilu(price) {
				await this.$zxl('/addjifenjilu', {
					total: price,
					name: '兑换物品',
					time: moment().format("YYYY-MM-DD HH:mm:ss"),
					type: 0
				}, 'POST')
			},
			async getchoujiangcishu() {
				let time = moment().format("YYYY-MM-DD");
				let res = await this.$zxl('/getchoujiangcishu', {
					time
				})
				console.log(res.data, '获取每日抽奖次数')
				if (res.data.ishave) {
					this.times = res.data.data[0].times
				} else {
					this.setchoujiangcishu()
				}
			},
			async setchoujiangcishu() {
				let time = moment().format("YYYY-MM-DD");
				await this.$zxl('/addchoujiangcishu', {
					time
				}, 'POST')
				this.getchoujiangcishu()
			},
			async editchoujiangcishu() {
				let time = moment().format("YYYY-MM-DD");
				let res = await this.$zxl('/editchoujiangcishu', {
					time,
					times: this.times
				}, 'POST')
				console.log(res.data)
			},
			duihuan(item) {
				if (this.times <= 0) {
					this.times = 0
					// uni.showToast({
					// 	icon:"none",
					// 	title:'您的今日兑换次数已用完，请明日再来'
					// })
					this.$refs.uToast.show({
						type: 'warning',
						message: "您的今日兑换次数已用完，请明日再来",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					if (item.price > this.total) {
						// uni.showToast({
						// 	icon:"none",
						// 	title:'您的积分不足！'
						// })
						this.$refs.uToast.show({
							type: 'warning',
							message: "您的积分不足！",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					} else {
						this.duihuansuccess(item.name, item.price, item.level)
					}
				}
			},
			async duihuansuccess(name, price, level) {
				let res = await this.$zxl('/addchoujiang', {
					name,
					time: moment().format("YYYY-MM-DD HH:mm:ss"),
					type: '积分兑换',
					level
				}, 'POST')
				if (res.data.status == 200) {
					this.total = this.total - price
					uni.showToast({
						icon: "none",
						title: '兑换成功！'
					})
					// this.$refs.uToast.show({
					// type: 'success',
					// message: "兑换成功！",
					// iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					// })
					this.fresh()
					this.addjifenjilu(price)
					this.times--
					this.editchoujiangcishu()
				}
			},
			async fresh() {
				await this.$zxl('/editjifen', {
					total: this.total
				}, 'POST')
			},
			async getdata() {
				let res = await this.$zxl('/getjifen')
				this.total = res.data.data[0].total
			},
			navbarAction() {
				uni.navigateBack({
					delta: 1
				})
			},
			async loadData() {
				// let that = this;
				let res_home = await menu.res_home;
				let data = res_home.data;
				let list = data.duihuan_list.data;
				// that.list.sort((a,b)=>{
				// 	return a.level-b.level 
				// })
				let one = list.filter(item => {
					return item.level == 1
				}).sort((b, a) => {
					return a.price - b.price
				})
				let two = list.filter(item => {
					return item.level == 2
				}).sort((b, a) => {
					return a.price - b.price
				})
				let three = list.filter(item => {
					return item.level == 3
				}).sort((b, a) => {
					return a.price - b.price
				})
				this.list = [...three, ...two, ...one]
				console.log(one, 'one')
				console.log(two, 'two')
				console.log(three, 'three')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.green {
		border: #999 8rpx solid;
	}

	.red {
		border: #9932CC 8rpx solid;
	}

	.blue {
		border: #FFD700 8rpx solid;
	}

	.zxl {
		color: transparent;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		-webkit-animation: slide1 2s infinite linear;
		animation: slide1 5s infinite linear;
		white-space: nowrap;
	}

	@keyframes slide1 {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}
	}

	.main {
		width: 750rpx;
		height: 220rpx;
		// background-color: red;
		display: flex;
		flex-wrap: wrap;
		justify-content: start;

		.box {
			width: 180rpx;
			height: 300rpx;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			image {
				border-radius: 10rpx;
				width: 100rpx;
				height: 100rpx;
			}

			.lw {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}

	.navbar {
		width: 750rpx;
		height: 70px;
		background-color: #fff;
		display: flex;
		// border-bottom: 1upx $uni-border-color solid;
		flex-wrap: nowrap;

		.nav-left {
			width: 10%;
			display: flex;
			justify-content: center;
			align-items: center;

			.menu-img {
				width: 40upx;
				height: 40upx;
				margin-top: 15px;
			}
		}

		.nav-middle {
			// background-color: red;
			// margin: 0 30rpx;
			margin-left: 100rpx;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.title {
				color: #ff875d;
				font-size: 34upx;
				margin-top: 15px;
			}
		}

		.nav-right {
			width: auto;
			height: 50rpx;
			margin-top: 10rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			// align-items: center;
			// background-color: red;
			padding: 30rpx;

			image {
				width: 40upx;
				height: 40upx;
				margin-top: 15px;
			}

			view {
				width: 130rpx;

				// background-color: red;
				transform: translateY(30rpx);
				height: 40upx;
				line-height: 40upx;
			}
		}
	}

	.total {
		width: 750rpx;
		text-align: center;
	}
</style>