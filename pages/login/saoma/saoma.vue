<template>
	<view>
		<div class="main" v-if="status==0">
			<h3 style="text-align: center;color:red;">该二维码不能用于登录</h3>
			<image class="errorimg" src="../../../static/codelogin/error.png" mode=""></image>
			<u-button style="width: 300rpx;" @click="returnpage" text="渐变色按钮"
				color="linear-gradient(to right, rgb(213, 51, 186), aqua)">返回</u-button>
		</div>
		<div class="main" v-if="status==2">
			<h3 style="text-align: center;color:red;">该二维码已过期或失效，即将返回登录页面</h3>
			<image class="errorimg" src="../../../static/codelogin/error.png" mode=""></image>

		</div>
		<div class="main" v-if="status==1">
			<h3 style="text-align: center;color: greenyellow;">扫码成功，是否要登录用户{{username}}</h3>
			<image class="errorimg" src="../../../static/codelogin/waoku.jpg"></image>
			<u-button :disabled="time" style="width: 300rpx;" @click="login" text="渐变色按钮"
				color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">
				确认登录<text v-show="time!=0" style="margin-left: 10rpx;">{{time}}s</text>
			</u-button>
		</div>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	import jwt from "jwt-decode";
	import {
		mapMutations
	} from "vuex";
	import moment from 'moment'
	export default {
		data() {
			return {
				username: '',
				password: '',
				status: 0,
				time: 5
			};
		},
		onLoad(e) {
			// console.log(JSON.parse(e.data), '收到参数')
			let data = JSON.parse(e.data)
			if (data.type !== 'login') {
				this.status = 0
			} else {
				this.status = 1
				let timer = setInterval(() => {
					this.time--
					if (this.time == 0)
						clearInterval(timer)
				}, 1000)
			}
			this.username = data.username
			this.password = data.password
		},
		methods: {
			...mapMutations("loginModule", ["setUser"]),
			//返回
			returnpage() {
				uni.navigateBack()
			},
			//账户管理
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
			//点击授权登录
			async login() {
				let res = await this.$zxl('/login', {
					username: this.username,
					password: this.password
				}, 'POST')
				console.log(res)
				if (res.data.status == 200) {
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
					let obj = {
						username: jwt(res.data.data).username,
						token: res.data.data,
						avatar: res.data.avatar,
						email: res.data.email,
						age: res.data.age,
						sex: res.data.sex,
						id: res.data.id,
						type: res.data.type,
						password: res.data.password,

					};
					console.log("obj", obj);
					this.setUser(obj);
					//存储本地
					uni.setStorageSync("loginStatus", true);
					uni.setStorageSync("username", JSON.stringify(obj));
					//跳转
					this.$refs.uToast.show({
						type: 'success',
						message: "检验信息成功😊",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
					uni.showLoading({
						title: '正在登录...'
					});
					this.account(obj)
					setTimeout(() => {
						uni.hideLoading();
						uni.reLaunch({
							url: '/pages/personal/personal',
							animationType: 'zoom-fade-out'
						})
					}, 4000)

				} else {
					this.status = 2
					this.$refs.uToast.show({
						type: 'error',
						message: "检验信息失败😊",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						position: 'top'
					})
					setTimeout(() => {
						this.returnpage()
					}, 3000)
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.main {
		position: relative;
		width: 750rpx;
		margin-top: 100rpx;
		height: 500rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		// background-color: red;

		.errorimg {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
	}

	// .errorimg {
	// 	position: absolute;
	// 	width: 200rpx;
	// 	height: 200rpx;
	// 	top: 50%;
	// 	left: 50%;
	// 	transform: translate(-50%, -50%);
	// }
</style>