<template>
	<view class="tui-container">
		<view class="header">
			<view class="headerson">
				<view class="left" @click="toggle('bottom')">
					<image src="../../../../static/images/memory/return.png"></image>
				</view>
				<view class="title">
					上传照片
				</view>
				<view class="right" @click="upphoto">上传</view>
			</view>
		</view>
		<view class="photobox" @click="select">
			<view class="left">
				<image src="../../../../static/images/memory/upload.png" mode=""></image>
				<text>上传到</text>
			</view>
			<view class="right">
				<text>{{name}}</text>
				<image class="cover" :src="cover" mode=""></image>
				<image class="jiantou" src="../../../../static/images/memory/right.png" mode=""></image>
			</view>
		</view>
		<view class="tui-upload-box">
			<view class="tui-image-item" v-for="(item,index) in imageList" :key="index">
				<image v-if="item.type=='image'" :src="item.url" class="tui-item-img" mode="aspectFill"
					@click="yulan(item,index)"></image>
				<video :autoplay="false" :show-center-play-btn="false" :controls="false" :show-progress="false"
					:enable-progress-gesture="false" :show-fullscreen-btn="false" :show-play-btn="false"
					:poster="item.url+'?x-oss-process=video/snapshot,t_0,f_jpg'" v-else :src="item.url"
					class="tui-item-img">
					<cover-view
						style="width: 100px;height: 100px;background-color: transparent;position: absolute;left: 0;"></cover-view>
					<cover-view
						style="width: 40px;height: 20px;position: absolute;right: 0;bottom: 0;text-align: center;color: white;">{{item.duration}}</cover-view>
					<cover-image @click="yulan(item,index)" class="one" src="../../../../static/images/memory/bf1.png">
					</cover-image>
					<cover-image @tap.stop=" delImage(index)" class="two"
						src="../../../../static/images/memory/gb3.png"></cover-image>
				</video>
				<view v-if="!forbidDel&&item.type=='image'" class="tui-img-del" @tap.stop="delImage(index)">
				</view>
				<view v-if="statusArr[index]!=1" class="tui-upload-mask">
					<view class="tui-upload-loading" v-if="statusArr[index]==2"></view>
					<text class="tui-tips">{{statusArr[index]==2?'上传中...':'上传失败'}}</text>
					<view class="tui-mask-btn" v-if="statusArr[index]==3" @tap.stop="reUpLoad(index)"
						hover-class="tui-hover" :hover-stay-time="150">重新上传</view>
				</view>
			</view>
			<view v-if="isShowAdd" class="tui-upload-add" @click="toggletype('bottom')">
				<!-- <view class="tui-upload-icon tui-icon-plus"></view> -->
				<image src="../../../../static/images/memory/photo.png" mode=""></image>
				<text>照片/视频</text>
			</view>
		</view>
		<button type="default" style="margin-top: 30rpx;" @click="showdata">打印数据</button>
		<!-- <button type="default" style="margin-top: 30rpx;" >上传</button> -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="shang" @click="back">
					放弃上传
				</view>
				<view class="xia" @click="close">
					取消
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popuptype" background-color="#fff">
			<view class="popuptype" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="left" @click="chooseImage">
					<view class="photo">
						<image src="../../../../static/images/memory/uploadimage.png" mode=""></image>
					</view>
					<text>传图片</text>
				</view>
				<view class="right" @click="chooseVideo">
					<view class="video">
						<image src="../../../../static/images/memory/uploadvideo.png" mode=""></image>
					</view>
					<text>传视频</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		name: 'tuiUpload',
		props: {
			//初始化图片路径
			value: {
				type: Array,
				default () {
					return []
				}
			},
			//禁用删除
			forbidDel: {
				type: Boolean,
				default: false
			},
			//禁用添加
			forbidAdd: {
				type: Boolean,
				default: false
			},
			//服务器地址
			serverUrl: {
				type: String,
				// default: "https://up.qiniup.com"
				default: ''
			},
			//限制数
			limit: {
				type: Number,
				default: 9
			},
			//项目名，默认为 file
			fileKeyName: {
				type: String,
				default: "file"
			}
		},
		data() {
			return {
				// imageList: [],
				imageList: [],
				dataList: [],
				//上传状态：1-上传成功 2-上传中 3-上传失败
				statusArr: [],
				backUrl: '',
				// qiniuurl: "https://up.qiniup.com",
				qiniu: "http://lwandzxl.top",
				introduction: '',
				currentindex: 0,
				id: '',
				name: '',
				cover: '',
				count: 0,
				type: 'center',
			}
		},
		onLoad(e) {
			console.log(e)
			this.id = e.id
			this.name = e.name
			this.cover = e.cover != 'null' ? e.cover : '../../../../static/images/memory/kuqii.png'
		},
		mounted() {
			uni.$on('returnoploaddata', (id, cover, name) => {
				console.log(id, cover, name, '上传照片')
				this.id = id
				this.name = name
				this.cover = cover ? cover : '../../../../static/images/memory/kuqii.png'
			})
			uni.$on('uploadimagedelede', (index) => {
				console.log(index, '收到')
				this.delImage(index)
			})
		},
		created() {
			this.imageList = [...this.value];
			this.dataList = [...this.value];
			for (let item of this.imageList) {
				this.statusArr.push("1")
			}
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
		methods: {
			yulan(item, index) {
				this.$refs.popup.close()
				this.$refs.popuptype.close()
				uni.navigateTo({
					url: `/pages/qinglvkongjian/memory/uploadyulan/uploadyulan?imgs=${JSON.stringify(item)}&index=${index}`
				})
			},
			showdata() {
				console.log(this.imageList, 'imageList')
				console.log(this.dataList, 'dataList')
			},
			back() {
				uni.navigateBack()
			},
			close() {
				this.$refs.popup.close()
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			toggletype(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popuptype.open(type)
			},
			select() {
				uni.navigateTo({
					url: `/pages/qinglvkongjian/memory/selectphoto/selectphoto?id=${this.id}&type=upload`,
					animationType: 'zoom-fade-out'
				})
			},
			//上传图片
			upphoto() {
				var that = this
				this.count = 0
				var total = this.dataList.length
				var time = moment().format("YYYY/MM/DD")
				this.dataList.forEach((item, index) => {
					this.count++
					uni.request({
						url: 'http://60.204.219.215/api/api/addmemoryphoto',
						data: {
							url: item.url,
							photoid: this.id,
							type: 'image',
							time
						},
						method: "POST",
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							console.log(res.data.status)
							// console.log(`第${index+1}张图片上传成功`)
							if (res.data.status) {
								// uni.showToast({
								// 	icon: 'none',
								// 	mask: true,
								// 	title: `${total}张图片上传成功`,
								// 	duration: 2000,
								// });
								if (this.count == this.dataList.length) {
									that.imageList = []
									that.dataList = []
									uni.$emit('deleteimgs')
									uni.$emit('getremoveid', `${total}张图片上传`)
									uni.navigateBack()
								}
							}
						}
					})
				})
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			// 重新上传
			reUpLoad(index) {
				this.$set(this.statusArr, index, "2")
				this.change()
				this.uploadImage(index, this.imageList[index].url).then(() => {
					this.change()
				}).catch(() => {
					this.change()
				})
			},
			change() {
				let status = ~this.statusArr.indexOf("2") ? 2 : 1
				if (status != 2 && ~this.statusArr.indexOf("3")) {
					// 上传失败
					status = 3
				}
				this.$emit('complete', {
					status: status,
					imgArr: this.imageList
				})
			},
			chooseVideo: function() {
				// console.log(this.imageList, '全部图片')
				let _this = this;
				uni.chooseVideo({
					compressed: false,
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都
					sourceType: ["album", "camera"], //从相册选择
					success: function(e) {
						_this.$refs.popuptype.close()
						console.log(e, '视频地址')
						let imageArr = [];
						let path = {
							url: e.tempFilePath,
							type: 'video',
							duration: moment(e.duration * 1000).format("mm:ss")
						}
						imageArr.push(path)
						_this.imageList.push(path)
						_this.dataList.push(path)
						_this.statusArr.push("2")
						_this.change()
						let start = _this.dataList.length - imageArr.length
						for (let j = 0; j < imageArr.length; j++) {
							let index = start + j
							//服务器地址
							if (_this.serverUrl) {
								_this.uploadImage(index, imageArr[j].url).then(() => {
									_this.change()
								}).catch(() => {
									_this.change()
								})
							} else {
								//无服务器地址则直接返回成功
								_this.$set(_this.statusArr, index, "1")
								_this.change()
							}
						}
					}
				});
			},
			chooseImage: function() {

				console.log(this.imageList, '全部图片')
				let _this = this;
				uni.chooseImage({
					count: _this.limit - _this.imageList.length,
					success: function(e) {
						_this.$refs.popuptype.close()
						console.log(e, '图片地址')
						let imageArr = [];
						for (let i = 0; i < e.tempFilePaths.length; i++) {
							let len = _this.imageList.length;
							if (len >= _this.limit) {
								uni.showToast({
									title: `最多可上传${_this.limit}张图片`,
									icon: "none"
								});
								break;
							}
							let path = {
								url: e.tempFilePaths[i],
								type: 'image'
							}
							imageArr.push(path)
							_this.imageList.push(path)
							_this.dataList.push(path)
							_this.statusArr.push("2")
						}
						_this.change()

						let start = _this.dataList.length - imageArr.length
						for (let j = 0; j < imageArr.length; j++) {
							let index = start + j
							//服务器地址
							if (_this.serverUrl) {
								_this.uploadImage(index, imageArr[j].url).then(() => {
									_this.change()
								}).catch(() => {
									_this.change()
								})
							} else {
								//无服务器地址则直接返回成功
								_this.$set(_this.statusArr, index, "1")
								_this.change()
							}
						}
					}
				})
			},
			uploadImage: function(index, url) {
				let _this = this;
				return new Promise((resolve, reject) => {
					uni.request({
						url: "http://60.204.219.215/api/api/get-qiniu-token", //请求七牛云token的接口
						data: {},
						/* 请求传参 */
						//请求七牛云token的接口需要的token
						/* 请求头 */
						method: "GET",
						success: (suc1) => {
							console.log(suc1, 'token')
							// let img = res.tempFilePaths[0];//拿到里面的
							// console.log(img)
							//下面的key是自己拿时间戳和随机数组成的key值
							// console.log(_this.imageList[index].type, '上传类型')
							let uploadtype = _this.dataList[index].type
							let key;
							if (uploadtype == 'image') {
								key = +new Date() + '.jpg'
							} else {
								key = +new Date() + '.mp4'
							}
							uni.uploadFile({
								url: "https://up.qiniup.com", //华东地区上传
								filePath: url,
								name: 'file',
								method: "POST",
								formData: {
									"file": url,
									'key': key, //key值
									'token': suc1.data.token //七牛云token值
								},
								success: uploadFileRes => {
									let strToObj = JSON.parse(uploadFileRes.data);
									let backUrl = _this.qiniu + "/" + strToObj.key;
									// console.log(backUrl, '图片地址', this.imageList)
									// 可以改回来
									// backUrl && (_this.dataList[index].url = backUrl)

									_this.dataList[index] = JSON.parse(JSON.stringify(
										_this
										.imageList[index]))
									_this.dataList[index].url = backUrl
									_this.$set(_this.statusArr, index, backUrl ? "1" :
										"3")

								},
								fail: fail => {
									uni.showToast({
										title: "网络错误",
										icon: "none"
									});
									// uni.hideLoading();
								}
							})
						},
						fail: fail => {
							uni.showToast({
								title: "网络错误",
								icon: "none"
							});
							// uni.hideLoading();
						}
					})
				})
			},
			delImage: function(index) {
				this.$refs.popup.close()
				this.$refs.popuptype.close()
				this.imageList.splice(index, 1)
				this.dataList.splice(index, 1)
				this.statusArr.splice(index, 1)
				this.$emit("remove", {
					index: index
				})
				this.change()
			},
			// previewImage: function(index) {
			// 	if (!this.imageList.length) return;
			// 	uni.previewImage({
			// 		current: this.imageList[index],
			// 		loop: true,
			// 		urls: this.imageList
			// 	})
			// }
		}
	}
</script>
<style>
	page {
		background-color: lightgrey;
	}
</style>
<style scoped lang="scss">
	@font-face {
		font-family: 'tuiUpload';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	.tui-container {
		// padding: 20rpx;
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

	.photobox {
		margin: 0 auto;
		// margin-bottom: 10rpx;
		margin-top: 10rpx;
		width: 700rpx;
		height: 100rpx;
		display: flex;
		box-sizing: border-box;
		padding: 10rpx;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		border-radius: 10rpx;

		.left {
			padding: 20rpx;
			width: 180rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.right {
			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				text-align: right;
				display: block;
				color: #999;
				width: 300rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 10rpx;
			}

			.cover {
				width: 60rpx;
				height: 60rpx;
				border-radius: 5rpx;
				margin-right: 10rpx;
			}

			.jiantou {
				width: 45rpx;
				height: 45rpx;
			}
		}
	}

	.tui-upload-box {
		margin: 10rpx auto;
		width: 700rpx;
		height: auto;
		display: flex;
		box-sizing: border-box;
		padding: 10rpx;
		flex-wrap: wrap;
		// justify-content: space-between;
		align-items: center;
		background-color: white;
		border-radius: 10rpx;
	}

	.tui-upload-add {
		width: 210rpx;
		height: 210rpx;
		// font-size: 68rpx;
		// font-weight: 100;
		border-radius: 10rpx;
		color: #888;
		background-color: #F7F7F7;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0;

		image {
			width: 60rpx;
			height: 60rpx;
		}

		text {
			color: #B2B2B2;
		}
	}

	.tui-image-item {
		width: 210rpx;
		height: 210rpx;
		position: relative;
		margin-right: 22rpx;
		margin-left: 5rpx;
		margin-bottom: 10rpx;
	}

	.tui-image-item:nth-of-type(3n) {
		margin-right: 0;
	}

	.tui-item-img {
		width: 210rpx;
		height: 210rpx;
		display: block;

		.one {
			width: 80rpx;
			height: 80rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.two {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 5rpx;
			right: 5rpx;
		}
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

	.header {
		width: 750rpx;
		height: 150rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		border-bottom: 1px solid lightgrey;
		// position: fixed;
		// background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));
		background-color: whitesmoke;
		z-index: 50;

		.headerson {
			width: 750rpx;
			height: 100rpx;
			position: relative;
			box-sizing: border-box;
			padding-left: 10rpx;
			padding-right: 10rpx;
			z-index: 50;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.left {
			width: 50rpx;
			height: 50rpx;
			// position: fixed;
			// left: 10rpx;
			// top: 80rpx;
			z-index: 10;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.right {
			background-color: #0199fe;
			width: 100rpx;
			height: 50rpx;
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
		}

		.title {
			position: absolute;
			width: auto;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.popuptype {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 15px;
		height: 150rpx;
		background-color: white;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;

		image {
			width: 50rpx;
			height: 50rpx;
		}

		.left,
		.right {
			width: 200rpx;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.photo,
			.video {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #B2B2B2;
				background-color: red;
			}

			.photo {
				background: linear-gradient(#e66465, #9198e5);
			}

			.video {
				background: linear-gradient(#7a748a, #ad5a87);
			}

		}
	}

	.popup-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 15px;
		height: 150rpx;
		background-color: white;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;

		.shang {
			color: red;
			border-bottom: lightgrey 2rpx solid;
		}

		.shang,
		.xia {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.uni-popup {
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
</style>