<template>
	<view class="msg">
		<!-- 上面 -->
		<view class="msg_head">
			<text class="h3mes">请留下你的评论吧</text>
		</view>
		<!-- 下面 -->
		<view class="form-content">
			<!-- 左 -->
			<view class="avatar-info">
				<image class="avatar" v-if="userinfo.avatar" :src="userinfo.avatar" />
				<image class="avatar pointer" v-if="!userinfo.avatar" src="./avatar.png" @click="login" />
				<view class="nickname">
					{{ userinfo.username || "快来评个论～" }}
				</view>
				<view class="tips" v-if="!userinfo.username">(点击头像登录)</view>
			</view>
			<!-- 中 -->
			<view class="form">
				<!-- <view class="text" :class="isShow ? 'active' : ''"> -->
				<textarea @blur="getBlur" @focus="getFocus" v-model.trim="content" class="textarea" rows="5"></textarea>
				<!-- </view> -->

			</view>
			<!-- 右 -->
			<view class="submit" @click="$noMultipleClicks(submit)" :class="!content ? 'disabled' : ''">
				发布
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import moment from "moment";
	export default {
		name: "Comment",
		props: ["articleid"],
		data() {
			return {
				content: "",
				isShow: false,
				noClick: true,
				address: ''
			};
		},
		mounted() {
			// console.log("Commentarticleid", this.articleid);
		},
		created() {
			this.getaddress()
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		methods: {
			getaddress() {
				uni.request({
					url: 'https://restapi.amap.com/v3/ip?parameters',
					data: {
						output: 'json',
						key: '51298497ee224349eb6d30072afd61a4'
					},
					success: (res) => {
						if (res.data.status == 1) {
							console.log(res.data.province, res.data.city)
							let pro = res.data.province.replace('省', '')
							this.address = `${pro}${res.data.city}`
							console.log(this.address)
						} else {
							this.address = "未知IP"
						}
					}
				})
			},
			getAvatar(avatar) {
				this.avatar = avatar;
			},
			getBlur() {
				this.isShow = false;
			},
			getFocus() {
				this.isShow = true;
			},
			login() {
				if (!this.userinfo.username) {
					uni.showModal({
						title: '是否跳转登录',
						cancelColor: 'red',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/login/login",
									animationType: 'zoom-fade-out'
								})
							} else if (res.cancel) {

							}
						}
					});
				}
			},
			async submit() {
				if (!this.content) {
					uni.showToast({
						title: "请填写评论信息哦😊😊～",
						position: "top",
						icon: "error",
						duration: 1000,
					})
					return;
				}
				// const { avatar, email, username } = this.userinfo;
				if (!this.userinfo.username) {
					uni.showToast({
						title: "请先登录再评论哦😊😊～",
						position: "top",
						icon: "error",
						duration: 1000,
					})
					return;
				}
				// let created_at = moment().format("YYYY-MM-DD HH:mm:ss");
				let params = {
					articleid: this.articleid,
					come: 0,
					created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
					content: this.$emojione(this.content),
					senderid: this.userinfo.id,
					address: this.address
				};
				let res = await this.$zxl('/postcomment', params, 'POST')
				if (res.data.status === 200) {
					this.content = "";
					uni.showToast({
						title: "评论成功😊",
						position: "top",
						icon: "success",
						duration: 1000,
					})
					this.$emit("etitcomment", "宝宝");
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	.submit {
		cursor: pointer;
		width: 120rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 4rpx;
		color: aqua;
		font-size: 14rpx;
		border: 2rpx solid #4ebbaa;
		background: -webkit-linear-gradient(left, blue, #999999);
	}

	.msg {
		margin: 20rpx auto;
		padding: 30rpx 30rpx;
		box-sizing: border-box;
		min-height: 150rpx;
		width: 100%;
		background-color: #fff;
		// background-color: red;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// box-shadow: 0rpx 4rpx 0rpx 0rpx #999;
		border-bottom: #999999 2rpx solid;
		// margin-bottom: 200rpx;

		.msg_head {
			width: 100%;
			text-align: center;
			height: 50rpx;

			.h3mes {
				color: rgb(81, 82, 80);
				font-size: 20rpx;
				font-weight: 700;
				margin-bottom: 10rpx;
			}
		}

		.form-content {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.avatar-info {
				// margin-right: 20rpx;
				padding-top: 10rpx;
				width: 120rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.avatar {
					margin: 0 auto;
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx;

				}

				.nickname {
					width: 100%;
					color: #4ebbaa;
					text-align: center;
					font-size: 12rpx;
					// margin-top: 10rpx;
					// margin-right: 18rpx;
				}

				.tips {
					width: 100%;
					color: #999;
					font-size: 11rpx;
				}
			}

			.form {
				position: relative;
				width: 400rpx;
				margin-top: 8rpx;
				display: flex;
			}

			.text {
				position: relative;
				width: 100%;
				overflow: hidden;
			}

			.textarea {
				resize: none;
				padding: 10rpx;
				height: 140rpx;
				// max-height: 200rpx;
				width: 100%;
				font-size: 25rpx;
				border: 1rpx solid;
			}


		}
	}

	.disabled {
		opacity: 0.5;
	}

	.active {
		outline: none;
		// border: 1rpx solid #6bc30d;
	}
</style>