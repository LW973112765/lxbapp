<template>
	<view class="main">
		<!-- //登录界面 -->
		<view class="login" v-if="islogin">
			<text class="title" style="font-size: 40rpx;color: red;">登录界面</text>
			<form @submit="submit">
				<view label="" prop="username">
					<text class="other">用户名</text>
					<input placeholder="请输入您的用户名" type="text" v-model="loginForm.username" autocomplete="off" />
				</view>
				<view label="" prop="password">
					<text class="other">密码</text>
					<input type="password" placeholder="请输入您的密码" v-model="loginForm.password" autocomplete="off" />
				</view>
				<view>
					<u-button color="linear-gradient(to right, rgb(213, 51, 186), aqua)" size="default" type="primary"
						form-type="submit">密码登录</u-button>
					<u-button color="linear-gradient(to right, rgb(66, 83, 216), aqua)" size="default" type="primary"
						@click="saoma">扫码登录</u-button>
					<u-button color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" type="default"
						form-type="reset">重置信息</u-button>
				</view>
			</form>
			<footer>
				<span class="zhuce" @click="register">没有账户？去注册</span>
				<span class="youke" @click="zhuye">我是游客</span>
				<span class="zhaohui" @click="zhaohui">忘记密码</span>
			</footer>
		</view>
		<!-- //找回密码 -->
		<view class="zhaohuipwd" v-if="!islogin">
			<text class="title" style="font-size: 40rpx;color: red;">找回密码</text>
			<form @submit="submit1">
				<view prop="username">
					<text class="other">用户名</text>
					<input type="text" v-model="loginForm.username" autocomplete="off" placeholder="请输入您要找回的账户名" />
				</view>
				<view prop="email">
					<text class="other">邮箱</text>
					<input type="email" v-model="loginForm.email" autocomplete="off" placeholder="请输入您要找回账户的邮箱" />
				</view>
				<view>
					<u-button color="linear-gradient(to right, rgb(213, 51, 186), aqua)" type="primary"
						form-type="submit">找回密码</u-button>
					<u-button color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" type="default"
						form-type="reset">重置信息</u-button>
				</view>
			</form>
			<footer>
				<span class="zhuce" @click="register">没有账户？去注册</span>
				<span class="youke" @click="zhuye">我是游客</span>
				<span class="zhaohui1" @click="tologin">返回登录</span>
			</footer>
		</view>
	</view>
</template>

<script>
	import jwt from "jwt-decode";
	import {
		mapMutations
	} from "vuex";
	import moment from 'moment'
	export default {
		name: "Login",
		data() {
			var validateLname = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入账户😊"));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码😊"));
				} else {
					callback();
				}
			};
			return {
				islogin: true,
				// bodyImg: "url(http://lwandzxl.top/2.jpg)",
				loginForm: {
					username: "",
					password: "",
					email: "",
				},

			};
		},

		//设置背景图片
		mounted() {

		},
		onNavigationBarButtonTap(e) {
			this.saoma()
		},
		methods: {
			saoma() {
				uni.scanCode({
					onlyFromCamera: false,
					success: (res) => {
						this.music.zxl_saoma()
						let startdata = res.result.split('￥zxl￥')
						let data = this.$datachange(startdata)
						// console.log(data.username, data.type, data);
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/login/saoma/saoma?data=${JSON.stringify(data)}`,
								animationType: 'zoom-fade-out'
							})
						}, 1000)
						// if (data.type == 'login') {
						// 	console.log('该二维码不能用于登录！');
						// 	this.$refs.uToast.show({
						// 		type: 'warning',
						// 		message: "该二维码不能用于登录！",
						// 		iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						// 	})
						// }
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
			...mapMutations("loginModule", ["setUser"]),
			tologin() {
				this.islogin = !this.islogin;
			},
			zhaohui() {
				this.islogin = !this.islogin;
			},
			//游客身份跳转主页
			zhuye() {
				uni.reLaunch({
					url: "/pages/index/index",
					animationType: 'zoom-fade-out'
				})
			},
			register() {
				uni.reLaunch({
					url: "/pages/register/register",
					animationType: 'zoom-fade-out'
				})
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
			//登录
			async submit() {
				let {
					username,
					password
				} = this.loginForm;
				let res = await this.$zxl('/login', {
					username,
					password
				}, 'POST')
				console.log(res)
				if (res.data.status == 200) {
					uni.request({
						url: 'https://api.vvhan.com/api/getIpInfo',
						success: (res) => {
							let data = res.data.info
							console.log(data.country, data.prov, data.city, res.data)
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
					uni.showToast({
						title: '恭喜您，登录成功😊',
						duration: 1000,
						position: 'top',
						icon: "success"
					});
					this.account(obj)
					uni.reLaunch({
						url: '/pages/personal/personal',
						animationType: 'zoom-fade-out'
					})

				} else {
					uni.showToast({
						title: '警告哦，账户或密码错误😊',
						duration: 1000,
						position: 'top',
						icon: "error"
					});
				}
			},
			//找回
			async submit1() {
				let {
					username,
					email
				} = this.loginForm;
				let res = await this.$zxl('/getfindpass', {
					username,
					email
				}, 'POST')
				console.log(res, username, email)
				if (res.data.status == 200) {
					uni.showToast({
						title: '密码已发送到您的邮箱😊',
						duration: 1000,
						position: 'top',
						icon: "success"
					});
					this.$zxl('/sendfindpass', {
						username,
						email
					})
				} else {
					uni.showToast({
						title: '警告哦，账户或邮箱错误😊',
						duration: 1000,
						position: 'top',
						icon: "error"
					});
				}
			}


		},
	};
</script>
<style>
	page {
		background: url("../../static/images/bg/registerbg.jpg");
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
<style lang="less" scoped>
	page {
		width: 100%;
		height: 100%;

	}

	.u-button {
		margin-top: 40rpx;
	}

	input {
		margin: 10rpx;
		border: 2rpx solid #999;
		border-radius: 5rpx;
		background-color: #eee;
		height: 60rpx;
	}

	.other {
		padding-left: 10rpx;
		color: yellow;
	}

	.login {
		width: 90%;
		height: 800rpx;
		padding-left: 40rpx;
		padding-right: 50rpx;
		margin: 0 auto;
		margin-top: 180rpx;
		padding-top: 20rpx;
		border-radius: 10rpx;
		// border: 1rpx solid #eee;
		// background: -webkit-linear-gradient(top, pink, #999999);
		position: relative;
		opacity: .9;
	}

	.zhaohuipwd {
		width: 90%;
		height: 800rpx;
		padding-top: 20rpx;
		padding-left: 40rpx;
		padding-right: 50rpx;
		margin: 0 auto;
		margin-top: 180rpx;
		border-radius: 10rpx;
		// border: 1rpx solid #eee;
		position: relative;
		// background: -webkit-linear-gradient(top, aqua, #999999);
		opacity: .9;

	}

	.title {
		width: 100%;
		display: inline-block;
		margin-bottom: 30rpx;
		text-align: center;
		color: #666;
	}

	.zhuce {
		// margin-left: 15rpx;
		font-size: 35rpx;
		color: aqua;
		cursor: pointer;
	}

	.zhuce:hover {
		text-decoration: underline;
		color: red;
	}

	.youke {
		// position: absolute;
		// bottom: 1rpx;
		// right: 6rpx;
		font-size: 35rpx;
		// margin-left: 10rpx;
		cursor: pointer;
		color: yellow;
	}

	.youke:hover {
		text-decoration: underline;
		color: blue;
	}

	.zhaohui {
		// margin-left: 15rpx;
		font-size: 35rpx;
		color: blueviolet;
		cursor: pointer;
	}

	.zhaohui:hover {
		text-decoration: underline;
	}

	.zhaohui1 {
		// margin-left: 15rpx;
		font-size: 35rpx;
		color: deeppink;
		cursor: pointer;
	}

	.zhaohui1:hover {
		text-decoration: underline;
	}

	footer {
		margin-top: 20rpx;
		// margin-left: 10rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
</style>