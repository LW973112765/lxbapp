<template>
	<view class="tui-container">
		<uni-popup ref="message" type="message" animation>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<text>图片描述：</text>
		<textarea v-model="title" auto-height maxlength="50" placeholder="请输入图片描述" />
		<view class="tui-upload-box">
			<view class="tui-image-item" v-if="backUrl">
				<image :src="backUrl" class="tui-item-img" mode="aspectFill"></image>
				<view class="tui-img-del" @click="delImage"></view>
			</view>
			<view class="tui-upload-add" @click="upimg()">
				<view class="tui-upload-icon tui-icon-plus"></view>
			</view>
		</view>
		<button type="default" style="margin-top: 30rpx;" @click="upload">上传</button>
	</view>
</template>
<script>
	//获取应用实例 
	import axios from "axios";
	export default {
		data() {
			return {
				backUrl: '',
				title: '',
				url: "https://up.qiniup.com",
				qiniu: "http://lwandzxl.top",
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
			}
		},
		methods: {
			async upload() {
				if (!this.title) {
					this.messageToggle('warn', '请输入图片描述！')
					return
				}
				if (!this.backUrl) {
					this.messageToggle('warn', '请上传图片！')
					return
				}
				let res = await this.$zxl('/addphoto', {
					title: this.title,
					url: this.backUrl
				}, 'POST')
				if (res.data.status == 200) {
					this.messageToggle('success', '上传成功！')
					this.title = ''
					this.backUrl = ''
				}

			},
			messageToggle(type, content) {
				this.msgType = type
				this.messageText = content
				this.$refs.message.open()
			},
			delImage() {
				this.backUrl = ''
			},
			upimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: function(res) {
						uni.showLoading({
							title: "上传中...",
							mask: true
						});
						console.log(res, '地址')
						uni.request({
							url: "http://60.204.219.215/api/api/get-qiniu-token", //请求七牛云token的接口
							data: {},
							/* 请求传参 */
							//请求七牛云token的接口需要的token
							/* 请求头 */
							method: "GET",
							success: (suc1) => {
								console.log(suc1, 'token')
								let img = res.tempFilePaths[0]; //拿到里面的
								// console.log(img)
								//下面的key是自己拿时间戳和随机数组成的key值
								let key = +new Date() + '.jpg'
								uni.uploadFile({
									url: "https://up.qiniup.com", //华东地区上传
									filePath: img,
									name: 'file',
									method: "POST",
									formData: {
										"file": img,
										'key': key, //key值
										'token': suc1.data.token //七牛云token值
									},
									success: uploadFileRes => {
										let strToObj = JSON.parse(uploadFileRes.data);
										that.backUrl = that.qiniu + "/" + strToObj.key;
										console.log(strToObj.key, 'key')
										console.log(that.backUrl, '图片地址')
										uni.hideLoading();
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

					},
				});

			},
		}
	}
</script>
<style>
	@font-face {
		font-family: 'tuiUpload';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=) format('woff');
		font-weight: normal;
		font-style: normal;
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
		margin-top: 20rpx;
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
		margin-bottom: 20rpx;
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