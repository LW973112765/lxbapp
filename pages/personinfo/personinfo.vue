<template>
	<view class="main">
		<!-- 提示信息弹窗 -->
		<u-toast ref="uToast"></u-toast>
		<uni-popup ref="message" type="message" animation>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<view class="header">
			<image :src="backUrl || user.avatar" mode="" @click="upimg()"></image>
			<text>{{userinfo.username}}</text>
			<text>{{userinfo.email}}</text>
		</view>
		<view class="other" @click="mingpian">
			<image src="../../static/images/other/mingpian.png" mode=""></image>
			<text class="title">二维码名片</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="toedit">
			<image src="../../static/images/personal/bj.png" mode=""></image>
			<text class="title">编辑资料</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="toggle('bottom')">
			<image src="../../static/images/personal/mm.png" mode=""></image>
			<text class="title">修改密码</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="toqlkj" v-if="userinfo.type">
			<image src="../../static/images/personal/ql.png" mode=""></image>
			<text class="title">情侣空间</text>
			<text class="more"> > </text>
		</view>
		<view class="other" @click="toloveyou" v-if="userinfo.type">
			<image src="../../static/images/choujiang/wode.png" mode=""></image>
			<text class="title">I LOVE YOU EVERYDAY</text>
			<text class="more"> > </text>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="login">
						<form @submit="submit">
							<view label="" prop="pass">
								<text class="other1">旧密码</text>
								<input placeholder="请输入您的旧密码" type="password" v-model="pass" autocomplete="off" />
							</view>
							<view label="" prop="password">
								<text class="other1">新密码</text>
								<input type="password" placeholder="请输入您的新密码" v-model="password" autocomplete="off" />
							</view>
							<view label="" prop="checkpass">
								<text class="other1">确认密码</text>
								<input type="password" placeholder="请确认您的新密码" v-model="checkpass" autocomplete="off" />
							</view>
							<view>
								<button size="mini" type="primary" form-type="submit">保存</button>
								<button size="mini" type="default" form-type="reset">重置</button>
							</view>
						</form>

					</view>
				</view>
			</uni-popup>
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
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				pass: "",
				password: "",
				checkpass: "",
				backUrl: '',
				url: "https://up.qiniup.com",
				qiniu: "http://lwandzxl.top",
				user: ''
			};
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onLoad() {
			this.user = JSON.parse(uni.getStorageSync('username'))
		},
		onShow() {
			this.user = JSON.parse(uni.getStorageSync('username'))
		},
		onBackPress() {
			uni.navigateTo({
				url: "/pages/setting/setting",
				animationType: 'zoom-fade-out'
			})
			return true
		},
		methods: {
			mingpian() {
				uni.navigateTo({
					url: '/pages/mingpian/mingpian',
					animationType: 'zoom-fade-out'
				})
			},
			toqlkj() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/home/home",
					animationType: 'zoom-fade-out'
				})
			},
			toloveyou() {
				uni.navigateTo({
					url: '/pages/loveyoueveryday/loveyoueveryday',
					animationType: 'zoom-fade-out'
				})
			},
			async submit() {
				if (!(this.pass && this.password && this.checkpass)) {
					// this.messageToggle('error','提交失败😊')
					this.$refs.uToast.show({
						type: 'error',
						message: '提交失败😊',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					if (this.checkpass != this.password) {
						// this.messageToggle('warn','两次密码不一样😊')
						this.$refs.uToast.show({
							type: 'warning',
							message: "两次密码不一样😊",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					} else {
						let res = await this.$zxl('/edituserpass', {
							id: this.userinfo.id,
							pass: this.pass,
							password: this.password
						}, 'POST')
						console.log(res.data.status, '状态码')
						if (res.data.status === 200) {
							// this.messageToggle('success','恭喜您，修改成功😊')
							this.$refs.uToast.show({
								type: 'success',
								message: "恭喜您，修改成功😊",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
							})
							setTimeout(() => {
								// this.messageToggle('error','密码错误,请重新登录😊')
								this.$refs.uToast.show({
									type: 'warning',
									message: "密码错误,请重新登录😊",
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
								})

							}, 1500)
							setTimeout(() => {
								uni.reLaunch({
									url: "/pages/login/login",
									animationType: 'zoom-fade-out'
								})
							}, 2500);
						} else if (res.data.status === 304) {
							// this.messageToggle('warn','警告哦，原密码错误😊')
							this.$refs.uToast.show({
								type: 'warning',
								message: "警告哦，原密码错误😊",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
							})
						} else if (res.data.status === 305) {
							// this.messageToggle('warn','新密码不能和原密码一样哦😊')
							this.$refs.uToast.show({
								type: 'warning',
								message: "新密码不能和原密码一样哦😊",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
							})
						}
					}
				}

			},
			toedit() {
				uni.navigateTo({
					url: `/pages/updateinfo/updateinfo?id=${this.userinfo.id}`,
					animationType: 'zoom-fade-out'
				})
			},
			messageToggle(type, content) {
				this.msgType = type
				this.messageText = content
				this.$refs.message.open()
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			totest() {
				uni.navigateTo({
					url: "/pages/personinfo/personinfo",
					animationType: 'zoom-fade-out'
				})
			},
			async upavatar() {
				let res = this.$zxl('/edituseravatar', {
					id: this.userinfo.id,
					avatar: this.backUrl
				}, 'POST')
				let user = JSON.parse(uni.getStorageSync('username'))
				console.log(user)
				this.$set(user, 'avatar', this.backUrl)
				uni.setStorageSync('username', JSON.stringify(user))
			},
			upimg() {
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album", "camera"],
					success: function(res) {
						console.log(res, '地址')
						uni.showLoading({
							title: "上传中...",
							mask: true
						});
						uni.request({
							url: "http://60.204.219.215/api/api/get-qiniu-token", //请求七牛云token的接口
							data: {},
							method: "GET",
							success: (suc1) => {
								console.log(suc1, 'token')
								let img = res.tempFilePaths[0];
								let key = +new Date() + '.jpg'
								uni.uploadFile({
									url: "https://up.qiniup.com", //华东地区上传
									filePath: img,
									name: 'file',
									method: "POST",
									formData: {
										"file": img,
										'key': key, //key值
										'token': suc1.data.token //七牛云token值
									},
									success: uploadFileRes => {
										let strToObj = JSON.parse(uploadFileRes.data);
										that.backUrl = that.qiniu + "/" + strToObj.key;
										console.log(strToObj.key, 'key')
										console.log(that.backUrl, '图片地址')
										uni.hideLoading();
										that.upavatar()
									},
									fail: fail => {
										uni.showToast({
											title: "网络错误",
											icon: "none"
										});
										uni.hideLoading();
									}
								})
							},
							fail: fail => {
								uni.showToast({
									title: "网络错误",
									icon: "none"
								});
								uni.hideLoading();
							}
						})

					},
				});

			},
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 300rpx;
		height: 300rpx;
		// background-color: red;
		margin: 0 auto;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.other {
		margin: 0 auto;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-bottom: 1px solid #ebeef5;
		align-items: center;
		font-size: 35rpx;
		color: #999;
		background: #fff;
		padding: 20rpx 40rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;

		.title {
			width: 400rpx;
			// background-color: red;
		}

		.more {
			width: 50rpx;
			// background-color: blueviolet;
		}

		image {
			width: 50rpx;
			height: 50rpx;
			margin-right: -100rpx;
		}
	}

	.login {
		padding-left: 100rpx;

		button {
			margin-top: 20rpx;
			margin-right: 30rpx;
		}
	}

	.popup-content {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 400rpx;
		// background-color: #fff;
		background: -webkit-linear-gradient(top, pink, #999999)
	}

	.main {
		width: 100%;
		height: auto;
		padding-top: 30rpx;
	}

	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 15px;
	}

	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}

	.button {
		// margin-top: 10px;
		margin: 10px;
		margin-bottom: 0;
	}

	.recentScroll {
		display: flex;
		height: 250rpx;
		white-space: nowrap;
	}

	.recentItem {
		margin-right: 20rpx;
		margin-left: 20rpx;
		display: inline-block;
	}

	.recentItem text {
		font-size: 27rpx;
		color: #999;
		display: block;
		width: 200rpx;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.recentItem image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}

	.img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
</style>