<template>
	<view class="main">
		<view class="box" v-for="(item,id) in jilu" :key="id" @click="login(item)">
			<view class="left" v-if="isdel && userinfo.id!=item.id" @click.stop="delaccount(item.id)">
				<image src="../../static/images/fonts/sc55.png" mode=""></image>
			</view>
			<view class="center">
				<image :src="item.avatar" mode=""></image>
			</view>
			<view class="right">
				<text class="name">{{item.username}}</text>
				<text class="email">{{item.email}}</text>
			</view>
			<view class="right2" v-if="userinfo.id==item.id">
				<image src="../../static/images/fonts/dui.png" mode=""></image>
			</view>
		</view>
		<view class="zzz" v-if="!isdel" @click="tologin">
			<image src="../../static/images/fonts/tj1.png" mode=""></image><text>添加或注册新账号</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import {
		mapMutations
	} from "vuex";
	import moment from 'moment'
	export default {
		data() {
			return {
				jilu: [],
				isdel: false
			};
		},
		created() {
			this.getaccountjilu()
		},
		onShow() {
			this.getaccountjilu()
		},
		methods: {
			delaccount(id) {
				console.log(id)
				let result = this.jilu.filter(item => {
					return item.id != id
				})
				uni.setStorageSync('accountjilu', JSON.stringify(result))
				this.getaccountjilu()
			},
			...mapMutations("loginModule", ["clearUser"]),
			...mapMutations("loginModule", ["setUser"]),
			tologin() {
				uni.navigateTo({
					url: "/pages/login/login",
					animationType: 'zoom-fade-out'
				})
			},
			account(obj) {
				console.log('隐藏')
				let account = uni.getStorageSync("accountjilu");
				if (account) {
					account = JSON.parse(account);
				} else {
					account = []
				}

				let result = account.filter((item) => {
					return item.id != obj.id
				})

				console.log(result)
				result.unshift(obj)
				uni.setStorageSync('accountjilu', JSON.stringify(result))
			},
			login(obj) {
				if (!this.isdel) {
					if (this.goEasy.getConnectionStatus() === 'connected') {
						this.goEasy.disconnect()
					}
					if (obj.id == this.userinfo.id) {
						return;
					} else {
						uni.showLoading({
							title: "正在切换账号...",
							mask: true
						});
						console.log('重新登录')
						this.clearUser();
						uni.removeStorageSync("username")
						uni.removeStorageSync("loginStatus")
						this.setUser(obj);
						uni.setStorageSync("loginStatus", true);
						uni.setStorageSync("username", JSON.stringify(obj));
						this.account(obj)
						uni.removeStorageSync('lwandzxladdress')
						uni.request({
							url: 'https://api.vvhan.com/api/getIpInfo',
							success: (res) => {
								let data = res.data.info
								console.log(data.country, data.prov, data.city)
								let zxl = {
									country: res.data.info.country,
									prov: res.data.info.prov,
									city: res.data.info.city,
									lsp: res.data.info.lsp,
									ip: res.data.ip,
									time: moment().format("YYYY-MM-DD HH:mm:ss"),
								};
								uni.setStorageSync('lwandzxladdress', JSON.stringify(zxl))
							}
						})
						setTimeout(() => {
							uni.hideLoading();
						}, 1000)
					}



				}
			},
			onNavigationBarButtonTap(e) {
				this.isdel = !this.isdel
				var webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(0, {
					text: this.isdel ? '完成' : '编辑'
				});
			},
			getaccountjilu() {
				let account = uni.getStorageSync("accountjilu");
				if (account) {
					account = JSON.parse(account);
				} else {
					account = []
				}
				this.jilu = account
				console.log(this.jilu)
			},
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
	}
</script>

<style lang="less" scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 650rpx;
		height: 150rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		border-bottom: 2rpx solid gray;

		.left {
			width: 50rpx;
			height: 50rpx;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.center {
			margin-left: 30rpx;
			width: 120rpx;
			height: 120rpx;

			image {

				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}

		.right {
			width: 120rpx;
			height: 120rpx;
			margin-left: 30rpx;
			display: flex;
			flex-wrap: wrap;
		}

		.right2 {
			margin-left: 250rpx;
			width: 70rpx;
			height: 70rpx;

			image {
				width: 70rpx;
				height: 70rpx;

			}
		}

		// background-color: red;

	}

	.zzz {
		width: 650rpx;
		height: 150rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.main {
		width: 700rpx;
		height: auto;
		margin: 0 auto;
		border-radius: 20rpx;
		background-color: azure;
	}
</style>