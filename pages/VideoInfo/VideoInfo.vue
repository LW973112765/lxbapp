<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<video vslide-gesture enable-play-gesture show-mute-btn vslide-gesture="true" :title="title" autoplay
					id="myVideo" style="width: 100%;height: 400rpx;" :src="video" :danmu-list="danmu"
					vslide-gesture-in-fullscreen @timeupdate="time" @ended="timeover" enable-danmu danmu-btn controls>
				</video>

			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="danmu">
				<view class="uni-list-cell">
					<view>
						<view class="uni-label">弹幕内容</view>
					</view>
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
			</view>
			<!-- #endif -->
		</view>

		<l-barrage :minTop="minTop" :maxTop="maxTop" class="danmuzujian" ref="lBarrage" @end="onEnd"></l-barrage>

		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<progress :percent="zxl" activeColor="#10AEFF" stroke-width="3" show-info="" />
					<text>{{current}}/{{totaltime}}</text>
					<view class="">
						{{word}}
					</view>
					<button :disabled="!restart" type="default" @click="restartdown">重新下载</button>
					<button :disabled="!restart" type="default" @click="zt">暂停下载</button>
					<button :disabled="!restart" type="default" @click="jx">继续下载</button>
					<button :disabled="!restart" type="default" @click="qx">取消下载</button>
					<button type="primary" @click="close">关闭页面</button>
				</view>
			</uni-popup>
		</view>
		<view>
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="好的" confirmText="收到" title="温馨提示😊" content="您已下载该视频!"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from "vuex";
	import moment from "moment";
	var timer = null
	export default {
		// components:{lBarrage},
		data() {
			return {
				id: '',
				title: '',
				video: '',
				total: '',
				videoinfo: '',
				danmu: [],
				danmuValue: '',
				currenttime: '',
				list: [],
				minTop: 5,
				maxTop: 90,
				newlist: [],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				downloaddownload: '',
				zxl: 0,
				current: '',
				totaltime: '',
				word: '',
				aFileList: '555',
				durationname: 'duration',
				covername: 'cover',
				titlename: 'title',
				idname: "id",
				videolist: [],
				restart: true,
				tasks: [], //下载任务
				videocurrenttime: '00:00',
				istimeover: false, //视频是否播放完毕
				viewtime: 0, //观看时长
				jifen: 0
			}
		},
		onLoad(e) {
			this.id = e.id
			console.log(e.id, 'idid')
			//通过本地存储获取弹幕
			// this.danmu=JSON.parse(uni.getStorageSync('danmu'))
			this.danmumove()
			this.getfile()
			//监听下载任务
			this.watchdown()
			//直接获取弹幕
			this.getdanmu(this.id)
			this.getjifen()
			timer = setInterval(() => {
				this.getviewtime()
			}, 1000)
		},
		created() {
			this.getvideo(this.id)

		},
		mounted() {
			this.danmumove()
		},
		onShow() {
			this.danmumove()
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')

		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onUnload() {
			console.log(this.viewtime, 'onUnload')
			clearInterval(timer)
			this.jifen += this.viewtime * 50
			this.fresh()
			this.addjifenjilu(this.viewtime * 50)
			let liulan = uni.getStorageSync("liulanjilu");
			if (liulan) {
				liulan = JSON.parse(liulan);
			} else {
				liulan = []
			}
			var liulandata = {
				id: this.videoinfo.id,
				cover: this.videoinfo.cover ||
					'',
				title: this.videoinfo.title,
				istimeover: this.istimeover,
				duration: this.videoinfo.duration,
				videocurrenttime: this.videocurrenttime,
				time: moment().format("YYYY-MM-DD HH:mm:ss"),
				type: 'video'
			}
			// let result =  liulan.filter((item)=>{
			//            return item.id != liulandata.id 
			//   })

			let result = []
			liulan.forEach((item, index) => {
				if (item.type != liulandata.type) {
					result.push(item)
				} else {
					if (item.type == liulandata.type && item.id != liulandata.id) {
						result.push(item)
					}
				}
			})
			// console.log(result)
			result.unshift(liulandata)
			uni.setStorageSync('liulanjilu', JSON.stringify(result))
		},
		methods: {
			async getjifen() {
				let res = await this.$zxl('/getjifen')
				this.jifen = res.data.data[0].total
			},
			async addjifenjilu(total) {
				await this.$zxl('/addjifenjilu', {
					total,
					name: '观看视频',
					time: moment().format("YYYY-MM-DD HH:mm:ss"),
					type: 1
				}, 'POST')
			},

			async fresh() {
				await this.$zxl('/editjifen', {
					total: this.jifen
				}, 'POST')
			},
			getviewtime() {
				this.viewtime += 1
				this.viewtime = this.viewtime > 60 ? 60 : this.viewtime
				// console.log(this.viewtime)
			},
			getdanmu(id) {
				// console.log('更新弹幕')
				uni.request({
					url: 'http://60.204.219.215/api/api/getdanmu',
					data: {
						id
					},
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						console.log('请求成功: ', res);
						if (res.data.status == 200) {
							this.danmu = res.data.data
						}
					},
					fail: (err) => {

					}
				})
			},
			//监听任务下载
			watchdown() {
				plus.downloader.enumerate((tasks) => {
					// console.log(tasks,'下载任务')
					this.tasks = tasks
				})
			},
			close() {
				this.$refs.popup.close()
			},
			getfile() {
				var that = this
				uni.getSavedFileList({
					success: function(res) {
						let regid = /(?<=id).*?(?=title)/
						that.videolist = res.fileList
						that.videolist.forEach((item, index) => {
							Object.defineProperty(item, 'id', {
								value: item.filePath.match(regid).join(),
								writable: true,
								enumerable: true
							})
						})
						// console.log(that.videolist,'文件55');
					}
				})

			},
			onNavigationBarButtonTap(e) {
				var webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(0, {
					width: '0'
				});
				this.watchdown()
				this.$nextTick(() => {
					let isdown = this.tasks.some(item => {
						return item.url == this.video
					})
					// console.log(isdown,'是否正在下载')
					let res = this.videolist.some(item => {
						return item.id == this.id
					})
					// if(isdown){
					// 	return false
					// }
					// console.log(res,'是否下载过')
					if (res) {
						this.dialogToggle('warn')
					} else {
						this.toggle('center')
						this.down()
					}
				})
			},
			//暂停下载
			zt() {
				this.downloaddownload.pause()
			},
			//继续下载
			jx() {
				this.downloaddownload.resume()
			},
			//取消下载
			qx() {
				this.downloaddownload.abort()
				this.$nextTick(() => {
					this.zxl = 0
					this.current = 0
				})
			},
			//重新下载
			restartdown() {
				this.downloaddownload.abort()
				this.down()
			},
			down() {
				this.watchdown()
				var url = this.video
				this.downloaddownload = plus.downloader.createDownload(url, {
					filename: "_doc/uniapp_save/" + this.durationname + this.videoinfo.duration + this.idname +
						this.videoinfo.id + this.titlename + this.title + '.mp4' //利用保存路径，实现下载文件的重命名
				}, (d, status) => {
					//d为下载的文件对象
					if (status == 200) {
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '已保存到文件夹：/storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/doc/uniapp_save/' +
								this.title + '.mp4', //保存路径
							duration: 3000,
						});
						this.getfile()
						this.restart = false
						//下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
						let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
					} else {
						plus.downloader.clear();
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '下载失败，请稍后重试',
						});
					}
				})
				this.downloaddownload.start()
				var that = this
				this.downloaddownload.addEventListener('statechanged', function(download, status) {
					switch (download.state) {
						case 1:
							that.word = "正在下载"
							break;
						case 2:
							that.word = "已连接到服务器";
							break;
						case 3:

							that.word = "正在下载";
							break;
						case 4:
							that.word = "下载完成"
							break;
					}
					// console.log(download,'download')
					// console.log(status,'status')
					that.current = that.$filesize(download.downloadedSize)
					that.totaltime = that.$filesize(download.totalSize)
					that.zxl = parseInt(parseFloat(download.downloadedSize) / parseFloat(download.totalSize) * 100)
				})
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				// this.$refs.message.open()
			},
			dialogClose() {

			},
			danmumove() {
				// var newlist=[]
				var that = this
				this.danmu.forEach((item, index) => {
					that.newlist.unshift(item.text)
				})
				this.list = this.newlist
				setTimeout(() => {
					this.$refs.lBarrage.start(this.list);
				}, 1000);
			},
			onEnd() {

				this.$refs.lBarrage.start(this.list);
			},
			time(e) {
				this.currenttime = parseInt(e.target.currentTime)
				let m = parseInt(e.target.currentTime / 60)
				let s = parseInt(e.target.currentTime % 60)
				s = s < 10 ? '0' + s : s
				this.videocurrenttime = m + ':' + s
				// console.log(this.videocurrenttime+'60:00')
				// console.log(m)
				// console.log(s)

			},
			timeover() {
				console.log('播放完了')
				this.istimeover = true
			},
			async send(params) {
				let res = await this.$zxl('/senddanmu', params, 'POST')
				if (res.data.status == 200) {
					uni.showToast({
						title: "发送成功",
						position: "top",
						duration: 1000,
						icon: "success"
					})
				}
			},
			async addLiulanliang(total, id) {

				let res = await this.$zxl('/addvideoview', {
					total,
					id
				}, 'POST');
			},
			async getvideo(id) {
				let res = await this.$zxl('/idgetvideo', {
					id
				})

				this.title = res.data.data[0].title
				this.video = res.data.data[0].video
				this.total = res.data.data[0].total
				this.videoinfo = res.data.data[0]
				console.log(this.videoinfo)
				this.total++
				uni.setNavigationBarTitle({
					title: this.title
				})
				this.addLiulanliang(this.total, this.id)

			},
			sendDanmu() {
				if (!this.userinfo.username) {
					uni.showToast({
						title: "请先登录！",
						position: "top",
						icon: "error"
					})
				} else {
					if (this.danmuValue.trim() == '') {
						uni.showToast({
							title: "输入为空！",
							position: "top",
							icon: "error"
						})
					} else {
						var pbgjz = ['草', '智障', '垃圾', '影视', '黄色', '杂种', 'qq', '操', '妈', '逼', '滚', '网址', '网站', '支付宝', '加我',
							'微信', '联系',
							'号码', 'weinxin', '企', 'www', 'com',
							'fun', 'net', 'top', 'xyz', 'fun', 'wang', 'xin', 'cn', 'shop', '@', '傻', 'wx', 'tv', '欢迎',
							'下载', '链接', 'q', 'n', 'o', 'c', 'm', 'e', '脑瘫', 'TMD', 'TM', 'tm', 'tama', 'nima', 'sb',
							'2b', '死',
							'狗'
						];
						let danmu = {
							text: this.danmuValue,
							color: this.getRandomColor(),
							time: this.currenttime,
							videoid: this.id
						}
						for (var i = 0; i <= pbgjz.length; i++) {
							if (danmu.text.indexOf(pbgjz[i]) !== -1) {
								uni.showToast({
									icon: 'none',
									title: "违规内容封号警告",
									duration: 2000
								});
								this.danmuValue = ''
								return
							}
						}
						this.videoContext.sendDanmu(danmu);
						this.newlist.push(danmu.text)
						this.danmumove()
						this.send(danmu);
						this.danmuValue = '';

					}
				}

			},

			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>
<style scoped lang="scss" scoped>
	.danmuzujian {
		width: 100%;
		height: 400rpx;
		margin-top: 30rpx;
		/* background-color: red; */
	}

	.danmu {
		margin-top: 20rpx;
	}

	button {
		width: 300rpx;
		margin-top: 30rpx;
		height: 100rpx;
	}

	text {
		width: 700rpx;

	}

	progress {
		width: 700rpx;
	}

	.popup-content {
		display: flex;
		// flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
		width: 750rpx;
		height: 700rpx;
		padding-top: 100rpx;
		// background-color: #fff;
		background: -webkit-linear-gradient(top, pink, #999999)
	}
</style>