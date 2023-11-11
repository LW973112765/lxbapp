<template>
	<view>
		<qinglvkongjianbar @add="toggle('bottom')" @navbarBtnTap="navbarBtnTapHandler"
			img="../../../static/images/choujiang/ax1.png" imgs="../../../static/images/choujiang/tj.png" :isadd="true"
			:title="'甜蜜时光'"></qinglvkongjianbar>
		<scroll-view scroll-y="true" class="data" refresher-default-style="black" v-if="data.length>0">
			<shuoshuoitem :data="data" v-for="(item, id) in data" :key="item.id" :item="item" />
		</scroll-view>
		<footerbar @toIndex="toIndex"></footerbar>
		<u-toast ref="uToast"></u-toast>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="提示" content="确定要删除吗？"
					@confirm="dialogConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-contentzxl" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="zxlzxl" @click="uploadword">
						纯文字
					</view>
					<view class="zxlzxl" @click="uploadphoto">
						图片文字
					</view>
					<view class="zxlzxl" @click="uploadvideo">
						视频文字
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="load2"><zero-loading class="load2" position="absolute" v-if="isload"></zero-loading></view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				data: [],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				delid: 0,
				isload: false,
				total: 0,
				n: 1
			};
		},
		onReachBottom() {
			// console.log(this.data.length,'this.data.length')
			// console.log(this.total,'this.total')
			if (this.data.length >= this.total) {
				uni.showToast({
					title: "已经到底啦😊😊～",
					position: "top",
					icon: "error",
					duration: 1000,
				})
				this.type = ''
			} else {
				this.isload = true
				setTimeout(() => {
					this.loadmore()
					this.isload = false
				}, 1500)
			}


		},
		onBackPress() {
			uni.navigateTo({
				url: "/pages/qinglvkongjian/home/home",
				animationType: 'zoom-fade-out'
			})
			return true
		},
		created() {
			this.http(1)
		},
		onLoad() {
			uni.$on('delitem', (id) => {
				// console.log(id,'收到')
				this.delid = id
				this.dialogToggle('warn')
				// this.del(id)
			})
		},
		methods: {
			uploadword() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/uploadword/uploadword",
					animationType: 'zoom-fade-out'
				})
				this.$refs.popup.close()
			},
			uploadphoto() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/uploadphoto/uploadphoto",
					animationType: 'zoom-fade-out'
				})
				this.$refs.popup.close()
			},
			uploadvideo() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/uploadvideo/uploadvideo",
					animationType: 'zoom-fade-out'
				})
				this.$refs.popup.close()
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			loadmore() {
				this.n++;
				// console.log(this.n);

				this.http(this.n);
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				this.del(this.delid)
			},
			async del(id) {
				let res = await this.$zxl('/deldiandiandidi', {
					id
				})
				if (res.data.status == 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: "删除成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					// this.data=[]
					this.http(1)
					this.n = 1
				}
			},
			async http(page) {
				let res = await this.$zxl('/getdiandiandidi', {
					page,
				})
				if (res.data.status === 200) {
					res.data.data.forEach((data) => {
						data.time = moment(data.time).format(
							"YYYY-MM-DD HH:mm:ss"
						);
						data.content = this.$emojitwo(data.content)
					});
					// console.log(res.data.data);
					if (this.n == 1) {
						this.data = res.data.data;
					} else {
						this.data = this.data.concat(res.data.data);
					}
					this.total = res.data.total;
				} else {
					this.total = 0
					this.data = []
				}

			},
			navbarBtnTapHandler() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/home/home",
					animationType: 'zoom-fade-out'
				})
			},
			toIndex(index) {
				if (index == 2) {
					// console.log(index)
				} else if (index == 0) {
					// console.log(index)
					uni.navigateTo({
						url: "/pages/qinglvkongjian/home/home",
						animationType: 'zoom-fade-out'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: "/pages/qinglvkongjian/jinianri/jinianri",
						animationType: 'zoom-fade-out'
					})
				} else {
					uni.navigateTo({
						url: "/pages/qinglvkongjian/my/my",
						animationType: 'zoom-fade-out'
					})
				}
			}
		}
	}
</script>
<style>
	page {
		background: -webkit-linear-gradient(top, pink, #999999);
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}
</style>
<style lang="scss" scoped>
	.popup-contentzxl {
		z-index: 100;
		// display:  flex;
		// align-items: center;
		// flex-wrap: wrap;
		// flex-direction: column;
		// justify-content: center;
		// padding: 15px;
		width: 750rpx;
		box-sizing: border-box;
		// border-top-left-radius:30rpx;
		// border-top-right-radius:30rpx;
		height: 400rpx;
		// background-color: #fff;
		background: -webkit-linear-gradient(top, pink, #999999);

		.zxlzxl {
			width: 750rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-bottom: solid 2rpx #999;
		}
	}

	page {
		width: 100%;
		height: 100%;
		padding-bottom: 200rpx;
	}

	.load2 {
		margin-top: -80rpx;
		position: relative;
		bottom: 10rpx;
	}

	.data {
		// background-color: red;
		width: 100%;
		height: auto;
		margin-bottom: 100rpx;
		padding-bottom: 100rpx;
	}

	.no {
		width: 200rpx;
		position: relative;
		margin: 0 auto;
		z-index: 100;
		margin-top: -50rpx;
		height: 50rpx;
		text-align: center;
		margin-bottom: 100rpx;
	}
</style>