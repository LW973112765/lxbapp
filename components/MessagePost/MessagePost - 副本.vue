<template>
	<view class="msg">
		<view class="msg_head">
			<text class="h3mes" style="font-size: 25rpx">请留下你的留言吧</text>
		</view>
		<view class="form-content">
			<view class="avatar-info">
				<image class="avatar" v-if="userinfo.avatar" :src="userinfo.avatar" />
				<image class="avatar pointer" v-if="!userinfo.avatar" src="./avatar.png" @click="login" />
				<view class="nickname">
					{{ userinfo.username || "快来留个言～" }}
				</view>
				<view class="tips" v-if="!userinfo.username">(点击头像登录)</view>
			</view>
			<view class="form">
				<view style="width: 400rpx" class="text" :class="isShow ? 'active' : ''">
					<textarea @blur="getBlur" @focus="getFocus" v-model.trim="content" class="textarea" rows="5"
						style="font-size: 25rpx;width: 300rpx"></textarea>
				</view>
				<view style="margin-left: 100rpx;" class="submit" @click="$noMultipleClicks(submit)"
					:class="!content ? 'disabled' : ''">
					发布
				</view>
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
		components: {},
		data() {
			return {
				content: "",
				isShow: false,
				noClick: true
			};
		},
		mounted() {
			// console.log("Commentarticleid", this.articleid);
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		methods: {
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
						title: '您还未登录',
						content: '是否跳转登录',
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
						icon: "error",
						title: '请填写留言信息哦😊😊～',
						duration: 1000,
						position: 'top'
					})
					return;
				}
				if (!this.userinfo.username) {
					uni.showModal({
						title: '您还未登录',
						content: '是否跳转登录',
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
					return;
				}
				let params = {
					pid: 0,
					created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
					content: this.content,
					senderid: this.userinfo.id,
				};
				let res = await this.$zxl('/postmessage', params, 'POST')
				if (res.data.status === 200) {
					this.content = "";
					uni.showToast({
						icon: "success",
						title: '留言成功😊😊～',
						duration: 1000,
						position: 'top'
					})
					this.$emit("updatemessage", "宝宝");
				}

			},
		},
	};
</script>

<style lang="less" scoped>
	.msg {
		margin: 20rpx auto;
		padding: 15rpx;
		box-sizing: border-box;
		min-height: 120rpx;
		width: 100%;
		background-color: #fff;
		box-shadow: 0rpx 4rpx 0rpx 0rpx #999;

		.msg_head {
			width: 100%;
			text-align: center;

			.h3mes {
				color: rgb(81, 82, 80);
				font-size: 20rpx;
				font-weight: 700;
				margin-bottom: 10rpx;
			}
		}

		.form-content {
			box-sizing: border-box;
			display: flex;

			.avatar-info {
				margin-right: 20rpx;
				padding-top: 10rpx;
				width: 80rpx;

				.avatar {
					margin: 0 auto;
					width: 60rpx;
					height: 60rpx;
				}

				.nickname {
					color: #4ebbaa;
					text-align: center;
					font-size: 12rpx;
					margin-top: 10rpx;
					margin-right: 18rpx;
				}

				.tips {
					color: #999;
					font-size: 11rpx;
				}
			}

			.form {
				position: relative;
				width: 60%;
				flex: 1;
				margin-top: 8rpx;
				display: flex;
			}

			.text {
				position: relative;
				width: 60%;
				overflow: hidden;
			}

			.textarea {
				resize: none;
				padding: 10rpx;
				min-height: 140rpx;
				max-height: 200rpx;
				width: 87%;
				font-size: 14rpx;
				border: 1rpx solid;
			}

			.submit {
				cursor: pointer;
				position: absolute;
				top: 30%;
				right: -20rpx;
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
		}
	}

	.disabled {
		opacity: 0.5;
	}

	.active {
		outline: none;
		// border: 1rpx solid #6bc30d;
	}

	.form {
		margin-left: 30rpx;
	}
</style>