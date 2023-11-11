<template>
	<view class="tui-container">
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
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
			style="width: 250rpx;display: flex;justify-content: space-around;align-items: center;padding-left:25rpx;font-size: 40rpx;margin-bottom: 10rpx;">
			定位<zero-switch @change="changebtn" style="margin-left: 25rpx;" class='inline_item' v-model="switchBtn"
				:showText="true" backgroundColorOff="#999" backgroundColorOn="#ABDCFF" activeColor='#0396FF'
				inactiveColor='#ffffff'>
			</zero-switch>
		</view>
		<u-toast ref="uToast"></u-toast>
		<view class="tui-upload-box">

			<view class="tui-Video-item" v-if="backUrl">
				<video autoplay :src="backUrl" class="tui-item-video" mode="aspectFill"></video>
				<!-- <view  class="tui-video-del" @click="delVideo"></view> -->

				<!-- <cover-image v-if="backUrl" @click="delImage" class="image" src="../../static/images/fonts/cl2.png" mode=""></cover-image> -->

			</view>
			<view class="tui-upload-add" @click="choosevideo()" v-else>
				<view class="tui-upload-icon tui-icon-plus"></view>
			</view>

		</view>
		<view class="send" style="margin-top: 30rpx;" v-if="backUrl" @click="choosevideo">重新选择视频</view>
		<view class="send" style="margin-top: 30rpx;" @click="uploadvideo">上传</view>
	</view>
</template>
<script>
	//获取应用实例
	import moment from "moment";
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				backUrl: '',
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				url: "https://up.qiniup.com",
				qiniu: "http://lwandzxl.top",
				video: '',
				maxlength: 2000,
				weizhi: '',
				content: '',
				switchBtn: false,
				isshow: false
			}
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
			changebtn(e) {
				console.log(e)
				this.isshow = e
				this.weizhi = ''
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
			},
			messageToggle(type, zxl) {
				this.msgType = type
				this.messageText = zxl
				this.$refs.message.open()
			},
			delImage() {
				this.backUrl = ''
			},
			choosevideo() {
				this.backUrl = ''
				let that = this
				uni.chooseVideo({
					count: 1, //默认9
					compressed: false,
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: function(res) {
						// uni.showLoading({ title: "上传中...", mask: true });
						console.log(res, '地址')
						that.backUrl = res.tempFilePath
						that.duration = moment(res.duration * 1000).format("mm:ss");
					},
				});

			},

			//把视频上传七牛云和数据库
			uploadvideo() {
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
				} else if (this.backUrl == '') {
					this.music.zxl_fail()
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '请先上传视频😊',
						duration: 1000,
					});
				} else {
					var video = this.backUrl
					var that = this
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
							// let video = res.tempFilePaths[0]
							console.log(video)
							let key = +new Date() + '.mp4'
							uni.uploadFile({
								url: "https://up.qiniup.com",
								filePath: video,
								name: 'file',
								method: "POST",
								formData: {
									"file": video,
									'key': key,
									'token': suc1.data.token
								},
								success: uploadFileRes => {
									let strToObj = JSON.parse(uploadFileRes.data);
									let videourl = that.qiniu + "/" + strToObj.key;
									that.video = videourl
									console.log(strToObj.key, 'key')
									console.log(videourl, '视频地址')
									// that.postvideo(videourl)
									let obj = {
										videourl,
										content: this.$emojione(this.content),
										type: 2,
										position: this.weizhi,
										time: moment().format("YYYY-MM-DD HH:mm:ss")
									}
									console.log(obj, '数据')
									uni.request({
										url: 'http://60.204.219.215/api/api/adddiandiandidi',
										data: obj,
										method: "POST",
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										success: (res) => {
											console.log(res)
											uni.hideLoading();
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
						fail: fail => {
							uni.showToast({
								title: "网络错误",
								icon: "none"
							});
							uni.hideLoading();
						}
					})



				}


			}
		}
	}
</script>
<style scoped lang="scss">
	@font-face {
		font-family: 'tuiUpload';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	textarea {
		width: 500rpx;
		margin: 0 auto;
		border: #B2B2B2 solid 5rpx;
	}

	.title {
		margin-bottom: 50rpx;
	}

	.title text {
		display: block;
		width: 100%;
		text-align: center;
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

	.image {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		width: 80rpx;
		height: 80rpx;
		z-index: 9999;
	}

	.tui-upload-box {
		position: relative;
		width: 100%;
		display: flex;
		flex-wrap: wrap;

	}

	.tui-upload-add {
		width: 220rpx;
		height: 220rpx;
		// margin: 0 auto;
		margin-left: 30rpx;
		font-size: 68rpx;
		font-weight: 100;
		color: #888;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.tui-Video-item {
		width: 700rpx;
		height: 400rpx;
		position: relative;
		margin: 0 auto;
	}

	.cover {
		// display: block;
		width: 700rpx;
		height: 400rpx;
		margin: 20rpx auto;
		position: relative;

		image {
			width: 700rpx;
			height: 400rpx;
		}

		// margin: 30rpx auto;
	}

	.tui-Video-item:nth-of-type(3n) {
		margin-right: 0;
	}

	.tui-item-video {
		width: 700rpx;
		height: 400rpx;
		display: block;
	}

	.tui-video-del {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		right: -12rpx;
		top: -12rpx;
		background: #EB0909;
		border-radius: 50%;
		color: white;
		font-size: 34rpx;
		z-index: 999;
	}

	.tui-video-del::before {
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