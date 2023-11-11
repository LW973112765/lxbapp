<template>
	<view class="main">
		<view class="header">
			<image style="position: absolute;top:0;left:0;width: 100%;height: 300rpx;" :src="avatar" mode=""></image>
			<image :src="avatar" mode=""></image>
		</view>
		<view class="box">
			<view class="left">用户名</view>
			<u--textarea v-model="username" count auto-height :maxlength="usernamrelength"
				border="bottom"></u--textarea>
		</view>
		<view class="box">
			<view class="left">昵称</view>
			<u--textarea v-model="nickname" count auto-height :maxlength="nicknamelength" border="bottom"></u--textarea>
		</view>
		<view class="box">
			<view class="left">介绍</view>
			<u--textarea v-model="introduction" count auto-height :maxlength="maxlength" border="bottom"></u--textarea>
		</view>
		<view class="zxl">
			<button style="width: 200rpx;margin-top: 30rpx;" @click="save">保存</button>
			<button style="width: 200rpx;margin-top: 30rpx;" @click="reset">重置</button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				avatar: '',
				username: '',
				age: '',
				sex: '',
				introduction: '',
				nickname: '',
				maxlength: 100,
				nicknamelength: 20,
				usernamrelength: 10

			};
		},

		onLoad(e) {
			console.log(e)
			this.id = e.id
			this.getinfo(e.id)
		},

		methods: {
			async save() {
				if (this.username.trim() == '') {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请输入用户名",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else if (this.nickname.trim() == '') {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请输入昵称",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else if (this.introduction.trim() == '') {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请输入介绍",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					let res = await this.$zxl('/edituser', {
						username: this.username,
						introduction: this.introduction,
						nickname: this.nickname,
						id: this.id
					}, 'POST')
					if (res.data.status === 200) {
						this.$refs.uToast.show({
							type: 'success',
							message: "更改信息成功😊",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					} else if (res.data.status === 304) {
						this.$refs.uToast.show({
							type: 'warning',
							message: "警告哦，该账号已存在😊",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					} else if (res.data.status === 520) {
						this.$refs.uToast.show({
							type: 'warning',
							message: "您未进行任意更新操作😊",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})

					}
				}
			},
			reset() {
				this.username = ''
				this.introduction = ''
				this.nickname = ''
			},
			async getinfo(id) {
				let res = await this.$zxl('/getuserinfo', {
					id
				})
				console.log(res.data.data, '用户信息')
				this.userinfo = res.data.data
				this.avatar = res.data.data.avatar
				this.username = res.data.data.username
				this.age = res.data.data.age
				this.sex = res.data.data.sex
				this.introduction = res.data.data.introduction
				this.nickname = res.data.data.nickname

			}
		}
	}
</script>

<style lang="scss" scoped>
	input {
		background-color: white;
	}

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

	.zxl {
		width: 650rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		// border-bottom: solid 1rpx #999;
		align-items: center;
	}

	.box {
		width: 650rpx;
		margin: 0 auto;
		background-color: whitesmoke;
		height: auto;
		padding: 10rpx;
		display: flex;
		justify-content: space-around;
		// border-bottom: solid 1rpx #999;
		align-items: center;

		.left {
			width: 30%;
			padding: 0 20rpx;
			// text-align: center;
			text-align-last: justify;
		}

		.right {
			width: 50%;
			text-align: center;
		}
	}

	.main {
		width: 100%;
		height: auto;
		padding-top: 30rpx;
	}
</style>