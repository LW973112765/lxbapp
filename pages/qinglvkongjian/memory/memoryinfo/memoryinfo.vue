<template>
	<view class="main" style="height:auto;padding-bottom: 30rpx;">
		<view class="left" @click="back">
			<image src="../../../../static/images/memory/return.png"></image>
		</view>
		<view class="header" :style="{opacity:bg}">
			<view class="headerson">

				<text class=" title" v-show="isshow">{{name}}</text>
			</view>
		</view>
		<view class="maintitle">
			<view class="one">{{name}}</view>
			<view class="two">{{total}}照片/视频</view>
			<view class="three">
				{{dsc}}
			</view>
		</view>
		<view class="nophoto" v-if="!total">
			<image src="../../../../static/images/memory/nophoto.jpg" mode=""></image>
		</view>
		<view class="photo" v-else v-for="(datetype,index) in date" :key="index+'datetype'">
			<h3>{{datetype.time}} <text>（{{datetype.total}}张）</text></h3>
			<view class="photoson">
				<view class="img" :style="{'width':width}" v-for="(item,index) in obj[datetype.time]"
					:key="index+'item'">
					<view class="imgbox" :style="{'width':width,'height':height}">
						<u--image :lazy-load="true" @click="yulan(item)" :height="height" :width="width" lazy-load
							:src="item.url" mode="" v-if="item.type=='image'">
							<template v-slot:loading>
								<u-loading-icon color="red"></u-loading-icon>
							</template>
							<view slot="error" style="font-size: 24rpx;">加载失败</view>
						</u--image>
						<view class="videozxl" @click="yulan(item)" :style="{'width':width,'height':height}"
							v-if="item.type=='video'">
							点击查看视频
							<image src="../../../../static/images/memory/start11.png" mode=""></image>
							<view class="duration">
								{{item.duration}}
							</view>
						</view>
						<!-- <video v-if="item.type=='video'" :src="item.url" :enable-progress-gesture="false"
							:show-fullscreen-btn="false" :poster="item.url+'?x-oss-process=video/snapshot,t_0,f_jpg'"
							:style="{'width':width,'height':height}">
							<cover-view style="z-index: 2;"></cover-view></video> -->
						<view @click="selectimg(item)" class="yuan" v-show="type==2"
							:class="{'tick':select.includes(item.id)}">
						</view>
					</view>

				</view>
				<view :style="{'width':width,'height':h}">
				</view>
			</view>
		</view>
		<footer :class="{'active':top>150&&type==1}" v-show="type==1">
			<!-- 图片样式选择 -->
			<view class="imgtype" v-show="ischange">
				<!-- 超大图 -->
				<view class="item" @click="change('large')">
					<view class="">
						<image style="width: 100rpx;height: 100rpx;" src="../../../../static/images/memory/yulan.png"
							mode=""></image>
					</view>
					<text>large</text>
				</view>
				<!-- 大图 -->
				<view class="item" @click="change('big')">
					<view class="">
						<image style="width: 75rpx;height: 75rpx;" src="../../../../static/images/memory/yulan.png"
							mode=""></image>
					</view>
					<text>big</text>
				</view>
				<!-- 正常 -->
				<view class="item" @click="change('normal')">

					<view class="">
						<image style="width:50rpx;height: 50rpx;" src="../../../../static/images/memory/yulan.png"
							mode=""></image>
					</view>
					<text>normal</text>
				</view>

				<!-- 小图 -->
				<view class="item" @click="change('small')">
					<view class="">
						<image style="width: 25rpx;height: 25rpx;" src="../../../../static/images/memory/yulan.png"
							mode=""></image>
					</view>
					<text>small</text>
				</view>
				<!-- //关闭 -->
				<image class="close" @click="changeopen" src="../../../../static/images/memory/close.png" mode="">
				</image>
			</view>
			<view class="item" @click="toedit">
				<i class="iconfont icon-tianxie"></i>
				<text>编辑相册</text>
			</view>
			<view class="item" @click="changeopen">
				<i class="iconfont icon-tupian3" :class="{'disabled':total==0}"></i>
				<text>图片样式</text>
			</view>
			<view class="item" @click="guanli">
				<i class="iconfont icon-shezhi2" :class="{'disabled':total==0}"></i>
				<text>批量管理</text>
			</view>
		</footer>
		<footer v-show="type==2">
			<view class="item" @click="saveimg">
				<i class="iconfont icon-xiazai6" :class="{'disabled':select.length==0}"></i>
				<text>下载</text>
			</view>
			<view class="item" @click="delimg">
				<i class="iconfont icon-icon" :class="{'disabled':select.length==0}"></i>
				<text>删除</text>
			</view>
			<view class="item" @click="remove">
				<i class="iconfont icon-zhuanyi03" :class="{'disabled':select.length==0}"></i>
				<text>转移</text>
			</view>
			<view class="item" @click="all">
				<i class="iconfont icon-quanxuan" :class="{'disabled':select.length==total}"></i>
				<text>全选</text>
			</view>
			<view class="item" @click="noall" :class="{'disabled':select.length==0}">
				<i class="iconfont icon-checkbox"></i>
				<text>取消</text>
			</view>
			<view class="item" @click="fanxuan">
				<i class="iconfont icon-fanxuan"></i>
				<text>反选</text>
			</view>
			<view class="item" @click="type=1">
				<i class="iconfont icon-guanbi2"></i>
				<text>关闭</text>
			</view>
		</footer>
		<view class="add" @click="uploadphoto" v-show="type==1">
			<view class="">
				<image src="../../../../static/images/choujiang/jnr33.png" mode=""></image>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ischange: false,
				h: '0',
				width: '220rpx',
				height: '220rpx',
				top: '',
				photodata: [],
				date: [],
				obj: {},
				id: null,
				cover: '',
				total: 'zxl',
				name: "",
				dsc: '',
				type: 1,
				select: [], //删除用
				selectdownload: [] //下载用

			}
		},
		onPageScroll(e) {
			// console.log(e)
			this.top = e.scrollTop
		},
		onLoad(e) {
			console.log(e)
			this.id = e.id
			this.name = e.name
			this.dsc = e.dsc
			this.cover = e.cover
		},
		computed: {
			bg() {
				return this.top / 90
			},
			isshow() {
				if (this.top > 90) {
					return true
				} else {
					return false
				}
			},
		},
		mounted() {
			this.getmemorydate()
			setTimeout(() => {
				this.getmemory()
			}, 500)
			uni.$on('getremoveid', (msg) => {
				this.$refs.uToast.show({
					type: 'success',
					message: `${msg}成功😊`,
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
					position: 'top'
				})
				this.date = []
				this.obj = {}
				this.getmemorydate()
				setTimeout(() => {
					this.getmemory()

				}, 500)
				this.select = []
				this.selectdownload = []

			})
		},
		methods: {
			uploadphoto() {
				uni.navigateTo({
					url: `/pages/qinglvkongjian/memory/uploadphoto/uploadphoto?id=${this.id}&name=${this.name}&cover=${this.cover}`,
					animationType: 'zoom-fade-out'
				})
			},
			remove() {
				if (this.select.length > 0) {
					uni.navigateTo({
						url: `/pages/qinglvkongjian/memory/selectphoto/selectphoto?id=${this.id}&type=remove&select=${JSON.stringify(this.select)}`,
						animationType: 'zoom-fade-out'
					})
				}
			},
			//预览图片
			yulan(item) {
				console.log(item)
				let lw = this.photodata.indexOf(item)
				if (item.type == 'image') {
					uni.navigateTo({
						url: `/pages/qinglvkongjian/memory/imageyulan/imageyulan?imgs=${JSON.stringify(this.photodata)}&current=${lw}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/qinglvkongjian/memory/memoryinfoyulan/memoryinfoyulan?imgs=${JSON.stringify(item)}`
					})
				}

			},
			//改变图片宽高
			change(type) {
				//超大图
				if (type == 'large') {
					this.width = '700rpx'
					this.height = '500rpx'
				}
				//正常
				else if (type == 'normal') {
					this.width = '340rpx'
					this.height = '340rpx'
				}
				//小图
				else if (type == 'small') {
					this.width = '220rpx'
					this.height = '220rpx'
				}
				//大图
				else {
					this.width = '700rpx'
					this.height = '300rpx'
				}



			},
			changeopen() {
				if (this.total > 0) {
					this.ischange = !this.ischange
				}
			},
			//选择
			selectimg(item) {
				if (this.select.includes(item.id)) {
					this.select = this.select.filter(i => i != item.id)
					this.selectdownload = this.selectdownload.filter(i => i.id != item.id)
				} else {
					this.select.push(item.id)
					this.selectdownload.push(item)
				}
				console.log(this.select, '选择的数组')
				console.log(this.selectdownload, '选择的数组用于下载')
			},
			//全选
			all() {
				this.select = []
				this.selectdownload = []
				for (let k in this.obj) {
					this.obj[k].forEach(i => {
						this.select.push(i.id)
						this.selectdownload.push(i)
					})
				}
				console.log(this.select, '选择的数组')
				console.log(this.selectdownload, '选择的数组用于下载')
			},
			//取消全选
			noall() {
				this.select = []
				this.selectdownload = []
			},
			//反选
			fanxuan() {
				// if (this.select.length == 0 && this.selectdownload.length == 0)
				if (this.select.length == 0) {
					this.all()
				} else {
					let arr1 = []
					let arr2 = []
					for (let k in this.obj) {
						this.obj[k].forEach(i => {
							arr1.push(i.id)
							arr2.push(i)
						})
					}
					let arr3 = []
					let arr4 = []
					arr1.forEach(i => {
						if (!this.select.includes(i)) {
							arr3.push(i)
						}
					})
					arr2.forEach(i => {
						if (!this.select.includes(i.id)) {
							arr4.push(i)
						}
						console.log(arr4, 'arr4')
					})
					// console.log(arr2, 'arr2')
					this.select = arr3
					this.selectdownload = arr4

				}

				// console.log(this.select, '选择的数组')
				// console.log(this.selectdownload, '选择的数组用于下载')
			},
			async delimg() {
				if (this.select.length > 0) {
					let tag = this.select.join(',')
					let res = await this.$zxl('/deleteimgs', {
						tag
					})
					if (res.data.status == 200) {
						uni.$emit('deleteimgs')
						console.log('删除成功')
						this.$refs.uToast.show({
							type: 'success',
							message: `删除成功😊`,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							position: 'top'
						})

						this.date = []
						this.obj = {}
						this.getmemorydate()
						setTimeout(() => {
							this.getmemory()

						}, 500)
						this.select = []
						this.selectdownload = []
					}
				}
			},
			saveimg() {
				console.log('下载')
				if (this.selectdownload.length > 0) {
					this.selectdownload.forEach(item => {
						uni.downloadFile({
							url: item.url,
							success: res => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: () => {
											this.$refs.uToast.show({
												type: 'success',
												message: `保存成功😊`,
												iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
												position: 'top'
											})
											this.select = []
											this.selectdownload = []
										},
										fail: function() {}
									});
								} else {}
							}
						});
					})
				}
			},
			guanli() {
				if (this.total > 0) this.type = 2
			},
			back() {
				uni.navigateBack()
			},
			toedit() {
				uni.navigateTo({
					url: `/pages/qinglvkongjian/memory/updatephoto/updatephoto?id=${this.id}`,
					animationType: 'zoom-fade-out'
				})
			},

			async getmemory() {
				let res = await this.$zxl('/getmemory', {
					photoid: this.id
				})
				// console.log(res.data, '获取照片');
				if (res.data.status === 200) {
					this.photodata = res.data.data
					this.total = res.data.total
					for (var k in this.obj) {
						res.data.data.forEach(item => {
							if (item.time == k)
								this.obj[k].push(item)
						})
					}
					// console.log(this.obj, '最终数据')
				} else {
					this.photodata = []
					this.total = 0
				}
			},
			async getmemorydate() {
				let res = await this.$zxl('/getmemorydate', {
					photoid: this.id
				})
				if (res.data.status === 200) {
					console.log(res.data.data)
					this.total = true
					res.data.data.forEach(item => {
						this.date.unshift(item)
					})
					this.date.forEach(item => {
						this.obj[item.time] = []
					})
					// console.log(this.obj, '对象')
					// console.log(this.date, 'date')
				} else {
					this.date = []
					this.total = 0
				}
			},
		}

	}
</script>

<style lang="less" scoped>
	.left {
		width: 50rpx;
		height: 50rpx;
		position: fixed;
		left: 10rpx;
		top: 80rpx;
		z-index: 10;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.header {
		width: 750rpx;
		height: 150rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		position: fixed;
		background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));
		z-index: 5;

		.headerson {
			width: 750rpx;
			height: 100rpx;
			position: relative;
		}



		.title {
			position: absolute;
			width: auto;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.maintitle {
		width: 750rpx;
		height: 350rpx;
		box-sizing: border-box;
		padding-top: 150rpx;
		border-bottom: 2rpx lightgrey solid;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;

		// background-color: #999;
		.one {
			font-size: 40rpx;
			font-weight: 700;
		}

		.two {
			color: #333;
			font-size: 20rpx;
		}

		.three {
			width: 500rpx;
			text-align: center;
			font-style: italic;
			color: #999;
		}

	}

	.nophoto {
		width: 750rpx;
		margin: 0 auto;
		height: 500rpx;
		padding-top: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 750rpx;
		}
	}

	.photo {
		width: 700rpx;
		margin: 0 auto;
		margin-top: 20rpx;

		// .photoson::after {
		// 	content: '';
		// 	flex: auto;
		// 	margin-left: 10rpx;
		// }

		.photoson {
			width: 700rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			z-index: -1;
			// padding: 5rpx;

			.img {
				position: relative;
				// width: 220rpx;
				height: auto;

				image {
					// width: 220rpx;
					// height: 220rpx;
					z-index: 0;
				}

			}
		}
	}

	h3 {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #333;

		text {
			color: #999;
			font-size: 20rpx
		}
	}

	.imgtype {
		position: absolute;
		top: -200rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 500rpx;
		height: 180rpx;
		background-color: aliceblue;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		border-radius: 10rpx;

		.close {
			position: absolute;
			width: 50rpx;
			height: 50rpx;
			top: 5rpx;
			right: 5rpx;
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				width: 100rpx;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

	}

	footer {
		position: fixed;
		background-color: azure;
		bottom: 0;
		width: 750rpx;
		box-sizing: border-box;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		transition: all 1s;
		// animation-duration: 0.5s;

		.item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			font-size: 20rpx;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

	.active {
		transform: translateY(100rpx);
		// background-color: red;
	}

	.yuan {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 5rpx;
		right: 5rpx;
		border: 1px solid #999 !important;
		z-index: 0;
	}

	.tick::after {
		content: " ";
		position: absolute;
		display: inline-block;
		width: 12px;
		height: 6px;
		border-width: 0 0 2px 2px;
		overflow: hidden;
		border-color: limegreen;
		border-style: solid;
		-webkit-transform: rotate(-50deg);
		transform: rotate(-50deg);
		left: 3px;
		top: 4px;
		z-index: 0;
	}

	i {
		font-size: 60rpx;
	}

	.disabled {
		color: lightgrey
	}

	.add {
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right: 20rpx;
		bottom: 350rpx;
		background-color: white;
		border-radius: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		// z-index: 10;
		view {
			border-radius: 15rpx;
			width: 90rpx;
			z-index: 10;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
		}

		image {
			border-radius: 15rpx;
			width: 50rpx;
			z-index: 10;
			height: 50rpx;
		}
	}


	.add::before {
		content: '';
		position: absolute;
		background: red;
		z-index: -2;
		animation: rotate 3s linear infinite;
		border-top: 200px solid lightcoral;
		border-bottom: 200px solid #05c160;
		border-left: 200px solid orange;
		border-right: 200px solid cornflowerblue;

	}


	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	::v-deep.u--image {
		margin-bottom: 60rpx !important;
	}

	.imgbox {
		margin-bottom: 30rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.videozxl {
		background-color: darkgray;
		opacity: 0.5;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		.duration {
			position: absolute;
			right: 3rpx;
			bottom: 3rpx;
			border-radius: 5rpx;
			border: 1rpx solid antiquewhite;
			background-color: antiquewhite;
		}

		image {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>