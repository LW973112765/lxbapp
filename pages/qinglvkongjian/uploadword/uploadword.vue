<template>
	<view>
		<u--textarea v-model="content" count auto-height :maxlength="maxlength" placeholder="这一刻的想法..."
			border="bottom"></u--textarea>
		<view class="weizhi" @click="choose" v-show="isshow">
			<view class="left">
				<image src="../../../static/images/choujiang/dw.png" mode=""></image>
				<view class="">
					所在位置
				</view>
			</view>
			<view class="right">
				<view class="">
					{{weizhi}}
				</view>
				<image src="../../../static/images/choujiang/jt.png" mode=""></image>
			</view>
		</view>
		<view class=""
			style="width: 250rpx;display: flex;justify-content: space-around;align-items: center;padding-left:30rpx;font-size: 40rpx;">
			定位<zero-switch @change="change" style="margin-left: 25rpx;" class='inline_item' v-model="switchBtn"
				:showText="true" backgroundColorOff="#999" backgroundColorOn="#ABDCFF" activeColor='#0396FF'
				inactiveColor='#ffffff'>
			</zero-switch>
		</view>
		<view class="send" @click="send">发表</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import moment from 'moment'
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				maxlength: 2000,
				weizhi: '',
				content: '',
				switchBtn: false,
				isshow: false
			};
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		methods: {
			getroute() {
				let page = getCurrentPages()
				let lastpage = page[page.length - 2].route
				if (lastpage == 'pages/qinglvkongjian/shuoshuo/shuoshuo') {
					uni.navigateTo({
						url: "/pages/qinglvkongjian/shuoshuo/shuoshuo",
						animationType: 'zoom-fade-out'
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			},
			async diandiandiditixing() {
				await this.$zxl('/diandiandiditixing', {
					content: this.$emojione(this.content),
					username: this.userinfo.username,
					position: this.weizhi || '',
				})
			},
			change(e) {
				console.log(e)
				this.isshow = e
				this.weizhi = ''
			},
			async send() {
				// uni.vibrateLong()
				if (this.content.trim() == '') {
					this.music.zxl_fail()
					uni.showToast({
						icon: "none",
						title: '请填写正文内容😊'
					})
				} else if (this.weizhi == '' && this.isshow) {
					this.music.zxl_fail()
					uni.showToast({
						icon: "none",
						title: '请选择所在位置😊'
					})
				} else {
					let res = await this.$zxl('/adddiandiandidi', {
						content: this.$emojione(this.content),
						type: 0,
						position: this.weizhi,
						time: moment().format("YYYY-MM-DD HH:mm:ss")
					}, 'POST')
					if (res.data.status == 200) {
						this.music.zxl_success()
						this.$refs.uToast.show({
							type: 'success',
							message: "发表成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						this.diandiandiditixing()
						setTimeout(() => {
							this.getroute()
						}, 1000)
					}
				}
			},
			choose() {
				uni.chooseLocation({
					success: ((res) => {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						this.weizhi = res.address
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					})
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.send {
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background-color: indianred;
		// border-bottom: solid 2rpx whitesmoke;
		// border-top: solid 2rpx whitesmoke;
		margin: 20rpx auto;
	}

	page {
		width: 100%;
		height: 100%;

	}

	/deep/ .u-textarea {
		width: 650rpx;
		border-bottom: solid 2rpx #999999;
		margin: 20rpx auto;

	}

	.weizhi {
		width: 650rpx;
		height: 50rpx;
		border-bottom: solid 2rpx whitesmoke;
		border-top: solid 2rpx whitesmoke;
		margin: 20rpx auto;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		// justify-items: center;
		padding: 20rpx;

		.left {
			height: 50rpx;
			// background-color: red;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.right {
			width: auto;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			view {
				width: 300rpx;
				text-align: right;
				display: block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

	}
</style>