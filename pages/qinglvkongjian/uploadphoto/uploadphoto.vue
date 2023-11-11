<template>
	<view class="tui-container">
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
			style="width: 250rpx;display: flex;justify-content: space-around;align-items: center;padding-left:10rpx;font-size: 40rpx;margin-bottom: 10rpx;">
			定位<zero-switch @change="changebtn" style="margin-left: 25rpx;" class='inline_item' v-model="switchBtn"
				:showText="true" backgroundColorOff="#999" backgroundColorOn="#ABDCFF" activeColor='#0396FF'
				inactiveColor='#ffffff'>
			</zero-switch>
		</view>
		<u-toast ref="uToast"></u-toast>
		<view class="tui-upload-box">
			<view class="tui-image-item" v-for="(item,index) in imageList" :key="index">
				<image :src="item.url" class="tui-item-img" @tap.stop="previewImage(index)" mode="aspectFill"></image>
				<view v-if="!forbidDel" class="tui-img-del" @tap.stop="delImage(index)"></view>
				<view v-if="statusArr[index]!=1" class="tui-upload-mask">
					<view class="tui-upload-loading" v-if="statusArr[index]==2"></view>
					<text class="tui-tips">{{statusArr[index]==2?'上传中...':'上传失败'}}</text>
					<view class="tui-mask-btn" v-if="statusArr[index]==3" @tap.stop="reUpLoad(index)"
						hover-class="tui-hover" :hover-stay-time="150">重新上传</view>
				</view>
				<view class="phototitle" v-show="item.title">
					{{item.title}}
				</view>
			</view>
			<view v-if="isShowAdd" class="tui-upload-add" @tap="chooseImage">
				<view class="tui-upload-icon tui-icon-plus"></view>
			</view>
		</view>
		<view class="send" style="margin-top: 30rpx;" @click="upphoto">上传</view>
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" :title="introduction" v-model="title"
					placeholder="请输入图片描述" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	import moment from 'moment'
	import {
		mapState
	} from "vuex";
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
				default: "https://up.qiniup.com"
				// default:''
			},
			//限制数
			limit: {
				type: Number,
				default: 50
			},
			//项目名，默认为 file
			fileKeyName: {
				type: String,
				default: "file"
			}
		},
		data() {
			return {
				//图片地址
				imageList: [],
				//上传状态：1-上传成功 2-上传中 3-上传失败
				statusArr: [],
				backUrl: '',
				url: "https://up.qiniup.com",
				qiniu: "http://lwandzxl.top",
				introduction: '',
				title: '你似微风温柔',
				currentindex: 0,
				maxlength: 2000,
				weizhi: '',
				content: '',
				switchBtn: false,
				isshow: false
			}
		},
		created() {
			this.imageList = [...this.value];
			for (let item of this.imageList) {
				this.statusArr.push("1")
			}
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
			isShowAdd() {
				let isShow = true;
				if (this.forbidAdd || (this.limit && this.imageList.length >= this.limit)) {
					isShow = false;
				}
				return isShow
			}


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
			//上传图片
			async upphoto() {
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
				} else if (this.imageList.length == 0) {
					this.music.zxl_fail()
					uni.showToast({
						icon: "none",
						title: '请上传图片😊'
					})
				} else {
					console.log(this.imageList, '图片列表')
					let arr = []
					this.imageList.forEach(item => {
						arr.push(item.url)
					})

					let url = arr.join()
					console.log(url, 'url')
					let res = await this.$zxl('/adddiandiandidi', {
						content: this.$emojione(this.content),
						url,
						type: 1,
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
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '添加中'
				})
				console.log(this.title, '图片描述')
				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.title = val
					this.$set(this.imageList[this.currentindex], 'title', this.title)
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 1000)
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
			chooseImage: function() {
				console.log(this.imageList, '全部图片')
				let _this = this;
				uni.chooseImage({
					count: _this.limit - _this.imageList.length,
					success: function(e) {
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
								title: ''
							}

							imageArr.push(path)
							_this.imageList.push(path)
							_this.statusArr.push("2")
						}
						_this.change()

						let start = _this.imageList.length - imageArr.length
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
							let key = +new Date() + '.jpg'
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
									console.log(backUrl, '图片地址')
									backUrl && (_this.imageList[index].url = backUrl)
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
				this.imageList.splice(index, 1)
				this.statusArr.splice(index, 1)
				this.$emit("remove", {
					index: index
				})
				this.change()
			},
			previewImage: function(index) {
				if (!this.imageList.length) return;
				uni.previewImage({
					current: this.imageList[index],
					loop: true,
					urls: this.imageList
				})
			}
		}
	}
</script>

<style scoped lang="scss" scoped>
	@font-face {
		font-family: 'tuiUpload';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=) format('woff');
		font-weight: normal;
		font-style: normal;
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

	.tui-container {
		padding: 20rpx;
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

	.tui-upload-box {
		margin-left: 10rpx;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.tui-upload-add {
		width: 220rpx;
		height: 220rpx;
		font-size: 68rpx;
		font-weight: 100;
		color: #888;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.tui-image-item {
		width: 220rpx;
		height: 220rpx;
		position: relative;
		margin-right: 20rpx;
		margin-left: 5rpx;
		margin-bottom: 20rpx;

		.phototitle {
			position: absolute;
			width: 220rpx;
			height: 40rpx;
			line-height: 40rpx;
			background-color: #B2B2B2;
			text-align: center;
			left: 0;
			bottom: 0rpx;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.tui-image-item:nth-of-type(3n) {
		margin-right: 0;
	}

	.tui-item-img {
		width: 220rpx;
		height: 220rpx;
		display: block;
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
</style>