<template>
	<view>
		<div class="main" v-if="status==0">
			<h3 style="text-align: center;color:red;">二维码已过期或失效</h3>
			<image class="errorimg" src="../../static/codelogin/error.png" mode=""></image>
			<u-button style="width: 300rpx;" @click="returnpage" text="渐变色按钮"
				color="linear-gradient(to right, rgb(213, 51, 186), aqua)">返回</u-button>
		</div>
		<div class="main" v-if="status==1">
			<h3 style="text-align: center;color: greenyellow;">扫码成功，是否要登录狼小宝网站</h3>
			<image class="errorimg" src="../../static/codelogin/success.png" mode=""></image>
			<u-button :disabled="time" style="width: 300rpx;" @click="login" text="渐变色按钮"
				color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">
				确认登录<text v-show="time!=0" style="margin-left: 10rpx;">{{time}}s</text>
			</u-button>
		</div>
		<div class="main" v-if="status==2">
			<h3 style="text-align: center;color: greenyellow;">您已成功登录狼小宝网站</h3>
			<image class="errorimg" src="../../static/png/pikaqiu.png" mode=""></image>
			<u-button style="width: 300rpx;" @click="returnpage" text="渐变色按钮"
				color="linear-gradient(to right, rgb(66, 83, 216), aqua)">返回</u-button>
		</div>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import moment from 'moment'
	export default {
		data() {
			return {
				uuid: '',
				status: 0,
				time: 5
			};
		},
		onLoad(e) {
			// console.log(e.uuid, '收到参数')
			this.uuid = e.uuid
			this.getcode(this.uuid)
		},
		created() {
			// this.getcode(this.uuid)
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		methods: {
			//返回
			returnpage() {
				uni.reLaunch({
					url: '/pages/personal/personal',
					animationType: 'zoom-fade-out'
				})
			},
			//点击授权登录
			login() {
				this.status = 2
				this.updatestatus(this.uuid, this.status)
			},
			//更改二维码状态为扫码成功、确认登录
			async updatestatus(uuid, status) {
				await this.$zxl('/updatecodestatus', {
					status,
					uuid,
					userid: this.userinfo.id
				}, 'POST')
			},
			//获取二维码状态
			async getcode(uuid) {
				// console.log(uuid)
				let res = await this.$zxl('/getcodelogin', {
					uuid
				})
				let status = res.data.data[0].status
				console.log(status, '二维码状态')
				let createtime = res.data.data[0].creattime;
				let codetime = moment(createtime).valueOf();
				let currenttime = moment().valueOf();
				let time = currenttime - codetime;
				if (time >= 300000) {
					this.status = 0
					this.$refs.uToast.show({
						type: 'error',
						message: "二维码已过期或失效",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					this.status = 1
					this.$refs.uToast.show({
						type: 'success',
						message: "扫码成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					let timer = setInterval(() => {
						this.time--
						if (this.time == 0)
							clearInterval(timer)
					}, 1000)
					this.updatestatus(this.uuid, this.status)
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