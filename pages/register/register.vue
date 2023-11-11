<template>
	<div class="form">
		<view class="title" style="font-size: 40rpx;color: red;">注册界面</view>
		<form @submit="submit">
			<view prop="username">
				<text class="other">用户名</text>
				<input type="text" v-model="registerForm.username" autocomplete="off" />
			</view>
			<view prop="password">
				<text class="other">密码</text>
				<input type="password" v-model="registerForm.password" autocomplete="off" />
			</view>
			<view prop="email">
				<text class="other">邮箱</text>
				<input type="email" v-model="registerForm.email" autocomplete="off" />
			</view>
			<view label="验证码">
				<div class="code_input">
					<input v-model="registerForm.code" :disabled="disabled"></input>
					<u-button size="mini" @click="send" :disabled="!disabled">{{
            sendmsg
          }}</u-button>
				</div>
			</view>
			<view class="tui-upload-box">
				<view class="tui-image-item" v-if="backUrl">
					<image :src="backUrl" class="tui-item-img" mode="aspectFill"></image>
					<view class="tui-img-del" @click="delImage"></view>
				</view>
				<view class="tui-upload-add" @click="upimg()">
					<view class="tui-upload-icon tui-icon-plus"></view>
				</view>
			</view>

			<view>
				<u-button color="linear-gradient(to right, rgb(213, 51, 186), aqua)" type="primary"
					form-type="submit">注册账号</u-button>
				<u-button color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
					form-type="reset">重置信息</u-button>

				<footer><span class="zhuce" @click="register">已有账户？去登录</span>
					<span class="youke" @click="zhuye">我是游客</span>
				</footer>
			</view>
		</form>
	</div>
</template>

<script>
	import axios from "axios";
	import moment from "moment";
	import base from "../../api/base.js";
	export default {
		name: "Register",
		data() {
			var validateLname = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("账户不能为空😊"));
				} else if (value.length > 20) {
					callback(new Error("用户名不能太长😊"));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("密码不能为空😊"));
				} else {
					callback();
				}
			};
			return {
				backUrl: '',
				url: "https://up.qiniup.com",
				qiniu: "http://lwandzxl.top",
				sendmsg: "发送验证码",
				disabled: true,
				code: "",
				// bodyImg: "url(" + require("../../../assets/img/loginbg.jpg") + ")",
				url: base.uploadUrl,
				qiniu: base.qiniu,
				baseurl: "",
				imageUrl: "",
				registerForm: {
					username: "",
					password: "",
					email: "",
					avatar: "/static/images/personal/1.png",
					code: "",
				},

			};
		},
		computed: {
			isShowAdd() {
				let isShow = true;
				if (this.forbidAdd || (this.limit && this.imageList.length >= this.limit)) {
					isShow = false;
				}
				return isShow
			}
		},
		//设置背景图片
		mounted() {
			// document.body.style.backgroundImage = this.bodyImg;
			// document.body.style.backgroundSize = "100%";
			this.baseurl = base.host;
		},
		methods: {
			delImage() {
				this.backUrl = ''
			},
			upimg() {
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album", "camera"],
					success: function(res) {
						console.log(res, '地址')
						uni.request({
							url: "http://60.204.219.215/api/api/get-qiniu-token", //请求七牛云token的接口
							data: {},

							method: "GET",
							success: (suc1) => {
								console.log(suc1, 'token')
								let img = res.tempFilePaths[0];
								let key = +new Date() + '.jpg'
								uni.uploadFile({
									url: "https://up.qiniup.com",
									filePath: img,
									name: 'file',
									method: "POST",
									formData: {
										"file": img,
										'key': key,
										'token': suc1.data.token
									},
									success: (uploadFileRes) => {
										let strToObj = JSON.parse(uploadFileRes.data);
										console.log(strToObj, 'key')
										// that.backUrl=''
										that.backUrl = that.qiniu + "/" + strToObj.key;
										that.registerForm.avatar = that.qiniu + "/" +
											strToObj.key;

									},
									fail: fail => {
										uni.showToast({
											title: "网络错误",
											icon: "none"
										});

									}
								})
							},
							fail: fail => {
								uni.showToast({
									title: "网络错误",
									icon: "none"
								});

							}
						})

					}
				})

			},
			//获取邮箱验证码
			async send() {
				if (!this.registerForm.email) {
					uni.showToast({
						title: '请填写邮箱后获取验证码',
						duration: 1000,
						position: 'top',
						icon: "error"
					});
				} else if (
					/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
						this.registerForm.email
					) == false
				) {

					uni.showToast({
						title: '请填写正确的邮箱后获取验证码！',
						duration: 1000,
						position: 'top',
						icon: "error"
					});

				} else {

					uni.showToast({
						title: '验证码已发送，请注意接收！',
						duration: 1000,
						position: 'top',
						icon: "success"
					});

					let res = await this.$zxl('/getcode', {
						email: this.registerForm.email
					})
					console.log(res)
					if (res.data.status == 200) {
						// console.log(res.data.data, "验证码");
						this.code = res.data.data;
						this.disabled = false;
						this.disabledsend = true;
						let timer = 60;
						this.sendmsg = timer + "s";
						this.timeFun = setInterval(() => {
							--timer;
							this.sendmsg = timer + "s";
							if (timer == 0) {
								this.disabled = true;
								this.disabledsend = false;
								this.sendmsg = "重新发送";
								clearInterval(this.timeFun);
							}
						}, 1000);
					}
				}
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
					url: "/pages/login/login",
					animationType: 'zoom-fade-out'
				})
			},
			async submit() {
				let {
					username,
					password,
					email,
					avatar,
					code
				} = this.registerForm;
				if (!(username && password && email && code)) {
					uni.showToast({
						title: '请填写完整资料！',
						duration: 1000,
						position: 'top',
						icon: "error"
					})
				} else {
					let created_at = moment().format("YYYY-MM-DD HH:mm:ss");
					// 请求登录接口

					if (this.registerForm.code != this.code) {
						uni.showToast({
							title: '验证码错误！',
							duration: 1000,
							position: 'top',
							icon: "error"
						})
					} else {
						let res = await this.$zxl('/register', {
							username,
							password,
							email,
							created_at,
							avatar,
						}, 'POST')
						if (res.data.status === 200) {
							uni.showToast({
								title: '恭喜您，注册成功，请登录😊',
								duration: 1000,
								position: 'top',
								icon: "success"
							});

							setTimeout(() => {
								uni.reLaunch({
									url: "/pages/login/login",
									animationType: 'zoom-fade-out'
								})
							}, 1500)

							//把注册成功的账户和密码存在localStorage里，方便传到登录界面去
							// let obj = {
							//   username: this.registerForm.username,
							//   password: this.registerForm.password,
							// };
							// localStorage.setItem("register", JSON.stringify(obj));
						} else if (res.data.status === 304) {
							uni.showToast({
								title: '警告哦，该账户已经存在,换一个名字吧😊',
								duration: 1000,
								position: 'top',
								icon: "error"
							});
							this.username = "";
						}

					}
				}

			},
		},
	};
</script>
<style>
	page {
		background: url("../../static/images/bg/1.jpg");
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
<style lang="less" scoped>
	page {
		width: 100%;
		height: 100%;

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

	.title {
		width: 100%;
		display: inline-block;
		margin-bottom: 30rpx;
		text-align: center;
		color: #666;
	}

	.youke {
		// position: absolute;
		// bottom: 1rpx;
		right: 6rpx;
		font-size: 35rpx;
		cursor: pointer;
		color: red;
	}

	.youke:hover {
		text-decoration: underline;
		color: aqua;
	}

	.form {
		width: 90%;
		height: 900rpx;
		padding-left: 40rpx;
		padding-right: 50rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		padding-top: 20rpx;
		border-radius: 10rpx;
		// border: 1rpx solid #eee;
		// background: -webkit-linear-gradient(top, pink, #999999);
		position: relative;
		opacity: .9;
	}

	.title {
		margin-bottom: 30rpx;
		text-align: center;
		color: #666;
	}

	.zhuce {
		// margin-left: 15rpx;
		font-size: 35rpx;
		color: blueviolet;
		cursor: pointer;
	}

	.zhuce:hover {
		text-decoration: underline;
		color: brown;
	}

	.avatar-uploader .upload {
		margin-left: 5rpx;
		border: 1rpx dashed #d9d9d9;
		border-radius: 6rpx;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .upload:hover {
		border-color: #409eff !important;
	}

	.avatar-uploader-icon {
		font-size: 28rpx;
		color: #8c939d;
		width: 178rpx;
		height: 178rpx;
		line-height: 178rpx;
		text-align: center;
		background-color: white;
	}

	.avatar {
		width: 178rpx;
		height: 178rpx;
		display: block;
	}

	footer {
		margin-top: 20rpx;
		// margin-left: 10rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}

	.code_input {
		display: flex;
		justify-content: space-between;
	}

	.code_input input {
		width: 300rpx;
	}

	.code_input .u-button {
		height: 60rpx;
		margin: 10rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.u-button {
		margin-top: 40rpx;
	}

	@font-face {
		font-family: 'tuiUpload';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	.tui-upload-icon {
		font-family: "tuiUpload" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 10rpx;
	}

	.tui-icon-delete:before {
		content: "\e601";
	}

	.tui-icon-plus:before {
		content: "\e609";
	}

	.tui-upload-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.tui-upload-add {
		width: 220rpx;
		height: 220rpx;
		margin: 10rpx;
		font-size: 68rpx;
		font-weight: 100;
		color: #888;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.tui-image-item {
		width: 220rpx;
		height: 220rpx;
		position: relative;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}

	.tui-image-item:nth-of-type(3n) {
		margin-right: 0;
	}

	.tui-item-img {
		margin-top: 10rpx;
		margin-left: 10rpx;
		width: 220rpx;
		height: 220rpx;
		display: block;
	}

	.tui-img-del {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		right: -12rpx;
		top: -12rpx;
		background: #EB0909;
		border-radius: 50%;
		color: white;
		font-size: 34rpx;
		z-index: 999;
	}

	.tui-img-del::before {
		content: '';
		width: 16rpx;
		height: 1px;
		position: absolute;
		left: 10rpx;
		top: 18rpx;
		background: #fff;
	}

	.tui-upload-mask {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		padding: 40rpx 0;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.6);
	}

	.tui-upload-loading {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		border: 2px solid;
		border-color: #B2B2B2 #B2B2B2 #B2B2B2 #fff;
		animation: tui-rotate 0.7s linear infinite;
	}

	@keyframes tui-rotate {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.tui-tips {
		font-size: 26rpx;
		color: #fff;
	}

	.tui-mask-btn {
		padding: 6rpx 16rpx;
		border-radius: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		border: 1rpx solid #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-hover {
		opacity: 0.5;
	}
</style>