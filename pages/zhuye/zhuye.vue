<template>
	<view class="main">
		<u-toast ref="uToast"></u-toast>
		<view class="header">
			<image style="position: absolute;top:0;left:0;width: 100%;height: 300rpx;" :src="userinfozxl.avatar"
				mode=""></image>
			<image :src="userinfozxl.avatar" mode=""></image>
		</view>
		<view class="box">
			<view class="left">用户名</view>
			<view class="right">{{userinfozxl.username}}</view>
		</view>
		<view class="box">
			<view class="left">昵称</view>
			<view class="right">{{userinfozxl.nickname}}</view>
		</view>
		<view class="box">
			<view class="left">性别</view>
			<view class="right">{{userinfozxl.sex}}</view>
		</view>
		<view class="box">
			<view class="left">年龄</view>
			<view class="right">{{userinfozxl.age}}</view>
		</view>
		<view class="box">
			<view class="left">邮箱</view>
			<view class="right">{{userinfozxl.email}}</view>
		</view>
		<view class="box">
			<view class="left">介绍</view>
			<view class="right">{{userinfozxl.introduction}}</view>
		</view>
		<view v-if="isapply && status" class="zxl" @click="sendmessage">
			<image src="../../static/images/other/xx.png" mode=""></image>
			发消息
		</view>
		<view v-if="id!=userinfo.id && !isapply" class="zxl" @click="add" style="color: #ff875d;">
			<image src="../../static/images/other/tjyh.png" mode=""></image>
			加好友
		</view>
		<view v-if="isapply && !status" class="zxl" style="color: #d4237a;">
			<image src="../../static/images/other/dd.png" mode=""></image>
			等待通过
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
				id: 0,
				userinfozxl: [],
				click: false,
				isapply: null,
				status: null,
				beizhu: null,
				zhuyename: ''
			};
		},

		onLoad(e) {
			console.log(e)
			this.id = e.id
			this.getinfo(e.id)
			this.getstatus()
		},
		mounted() {
			uni.$on('deletefriend', () => {
				this.deletefriendover()
			})
		},
		onShow() {
			this.getstatus()
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		created() {
			this.getstatus()
		},
		onNavigationBarButtonTap(e) {
			if (this.id != this.userinfo.id) {
				uni.navigateTo({
					url: `/pages/chat/setting/setting?friendid=${this.id}&myid=${this.userinfo.id}&name=${this.userinfozxl.username}`,
					animationType: 'zoom-fade-out'
				})
			} else {
				uni.navigateTo({
					url: "/pages/personinfo/personinfo",
					animationType: 'zoom-fade-out'
				})
			}
		},
		methods: {
			deletefriendover() {
				this.isapply = false
				uni.setNavigationBarTitle({
					title: this.zhuyename + '的主页'
				})
			},
			async getstatus() {
				let res = await this.$zxl('/getapplystatus', {
					myid: this.userinfo.id,
					friendid: this.id
				})
				console.log(res.data, '申请状态')
				if (res.data.status == 200) {
					this.status = res.data.data[0].status
					this.isapply = res.data.isapply
					this.beizhu = res.data.data[0].beizhu
					let zxl = this.beizhu || this.userinfozxl.username
					uni.setNavigationBarTitle({
						title: zxl + '的主页'
					})
				} else {
					this.isapply = res.data.isapply
					this.beizhu = null
				}
			},
			async add() {
				this.click = !this.click
				let res = await this.$zxl('/addfriend', {
					myid: this.userinfo.id,
					friendid: this.id
				}, 'POST')
				if (res.data.status == 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: "已添加，等待对方同意",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					this.getstatus()
				}
			},
			sendmessage() {
				let name = this.userinfozxl.username
				let id = this.id
				let avatar = this.userinfozxl.avatar
				uni.navigateTo({
					url: `/pages/chat/privateChat/privateChat?id=${id}`,
					animationType: 'zoom-fade-out'
				})
			},
			async getinfo(id) {
				let res = await this.$zxl('/getuserinfo', {
					id
				})
				console.log(res.data.data, '用户信息')
				this.userinfozxl = res.data.data
				this.zhuyename = res.data.data.username
				uni.setNavigationBarTitle({
					title: res.data.data.username + '的主页'
				})
			}
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
			width: 50%;
			text-align: center;
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

	.zxl {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		width: 100%;
		height: 70rpx;
		color: #1296db;
		background-color: #999;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>