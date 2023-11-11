<template>
	<view ref="box" class="main">
		<view class="content" v-for="(item, index) in chatlist" :key="index">
			<view v-if="item.user=='user'" class="item item-right">
				<view class="bubble bubble-right" v-html="item.content">
				</view>
				<view class="avatar">
					<image :src="userinfo.avatar" mode=""></image>
				</view>
			</view>

			<view v-else class="item item-left" @click="changeen(item.isclick)">
				<view class="avatar">
					<image src="../../static/images/translate/logo.png" mode=""></image>
				</view>
				<!-- 文本 -->
				<view v-if="item.type=='text'" class="bubble bubble-left" v-html="item.content">
				</view>
				<!-- 图片 -->
				<image class="typeimage" v-if="item.type=='image'" :src="item.url" mode="widthFix"
					@click.stop="showImageFullScreen(item.url)"></image>
				<!-- 视频 -->
				<view class="typevideo" v-if="item.type=='video'" @click="yulanvideo(item.url,item.cover)">
					<text>{{item.title}}</text>
					<view class="son">
						<image class="img" :src="item.cover" mode=""></image>
						<image class="start" src="../../static/images/memory/bf1.png" mode=""></image>
					</view>
				</view>
				<!-- 音乐 -->
				<view v-if="item.type=='audio'" class="bubble bubble-left" v-html="item.content"></view>
				<!-- 加载中 -->
				<!-- <view class="loading" v-if="item.type=='loading'"> -->
				<view class="spinner-box" v-if="item.type=='loading'">
					<view class="pulse-container">
						<view class="pulse-bubble pulse-bubble-1"></view>
						<view class="pulse-bubble pulse-bubble-2"></view>
						<view class="pulse-bubble pulse-bubble-3"></view>
					</view>
				</view>
				<!-- </view> -->
			</view>
		</view>
		<view class="footer">
			<view class="" style="width: 540rpx;">
				<u--textarea v-model="content" :cursorSpacing="20" auto-height :maxlength="2000"
					:placeholder="inputtitle" border="bottom"></u--textarea>
			</view>
			<button @click="sendcontent" :class="{one:content.trim().length>0,two:content.trim().length==0,}"
				style="width: 150rpx;height:80rpx;text-align: center;line-height: 80rpx;">发送</button>
		</view>
	</view>

</template>
<script>
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				content: '',
				issend: false,
				isupdate: false,
				chattype: 1, // 1是聊天 2是翻译
				appid: "20220911001339793",
				key: "43GS_gTwHy82D9D8jSzz",
				musicname: '',
				from: "auto",
				to: "en",
				toname: '',
				chatlist: [{
					content: '<view style="word-wrap: break-word;word-break: break-all;">欢迎使用郎小宝の机器人，使用前请仔细查看使用说明！</view>',
					user: 'ai',
					type: 'text'
				}, ]
			};
		},
		onLoad() {
			this.getname()
			this.getchattype()
			this.settitle()
			const chattype = this.chattype == 1 ? '闲聊模式' : '翻译模式'
			this.chatlist.push({
				content: `<view>当前聊天模式为<text style="color:limegreen;font-size:30prx;margin-left:20rpx">${chattype}</text></view>`,
				user: 'ai',
				type: 'text'
			}, {
				content: `<view>当前翻译语言<text style="color:limegreen;font-size:30prx;margin-left:20rpx">${this.toname}</text></view>`,
				user: 'ai',
				type: 'text'
			}, {
				content: '<text style="color:red;font-style:italic">点我切换语言</text>',
				isclick: true,
				user: 'ai',
				type: 'text'
			}, )
		},
		mounted() {
			uni.$on('updatetranslatelanguage', (update) => {
				console.log('520131', update)
				this.isupdate = update
				this.getname()
				this.chatlist.push({
					content: `<view>当前翻译语言已改为<text style="color:limegreen;font-size:30prx;margin-left:20rpx">${this.toname}</text></view>`,
					user: 'ai',
					type: 'text'
				})
				this.issend = !this.issend

			})
			innerAudioContext.onError(() => {
				console.log('warn', '出错啦,自动切换下一首！')
				this.chatlist.push({
					content: '出错啦,正在为您重新搜索',
					user: 'ai',
					type: 'text'
				})
				this.getmusic()
			});
			innerAudioContext.onEnded(() => {
				console.log('warn', '结束啦自动切换下一首！')
				this.chatlist.push({
					content: '结束啦,正在为您重新搜索',
					user: 'ai',
					type: 'text'
				})
				this.getmusic()
			})
		},
		onShow() {
			if (this.isupdate) this.issend = !this.issend
			setTimeout(() => {
				this.isupdate = false
			}, 1000)
		},
		watch: {
			issend() {
				console.log('发送变化')
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 2000000, //滚动到页面的目标位置（单位px）
						duration: 300 //滚动动画的时长，默认300ms，单位 ms
					});
				}, 300)
			}
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
			inputtitle() {
				const title = this.chattype == 1 ? '请输入聊天内容' : '请输入需要翻译的内容'
				return title;
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/translate/help/help',
				animationType: 'zoom-fade-out'
			})
		},
		onError(err) {
			// 处理错误逻辑
			console.error(err, '错误');
		},
		methods: {
			//切换语言
			changelanguage() {
				this.chatlist.push({
					content: `<view>${this.content}</view>`,
					user: 'user',
					type: 'text'
				})
				setTimeout(() => {
					this.chatlist.push({
						content: '<text style="color:red;font-style:italic">点我切换语言</text>',
						isclick: true,
						user: 'ai',
						type: 'text'
					})
					this.issend = !this.issend
				}, 1000)
				this.content = ''
				this.issend = !this.issend
			},
			//切换模式
			changechattype() {
				var type;
				if (this.content.includes('闲聊')) {
					this.chattype = 1
					uni.setStorageSync('chattype', JSON.stringify(this.chattype))
					this.settitle()
					type = '闲聊'
				}
				if (this.content.includes('翻译')) {
					this.chattype = 2
					uni.setStorageSync('chattype', JSON.stringify(this.chattype))
					this.settitle()
					type = '翻译'
				}
				this.chatlist.push({
					content: this.content,
					user: 'user',
					type: 'text'
				})
				this.content = ''
				this.issend = !this.issend
				setTimeout(() => {
					this.chatlist.push({
						content: `<text style="color:limegreen;font-style:italic">已切换到${type}模式</text>`,
						user: 'ai',
						type: 'text'
					})
					this.issend = !this.issend
				}, 1000)
			},
			//翻译文本
			translatetext() {
				var salt = new Date().getTime();
				var str1 = this.appid + this.content + salt + this.key;
				var sign = this.$MD5(str1);
				var toname = this.$getcountryname(this.to)
				var contentcopy = this.content
				this.chatlist.push({
					content: `<view>请将<text style="color:red">${this.content}</text>翻译为${toname}</view>`,
					user: 'user',
					type: 'text'
				})
				this.loading()
				this.content = ''
				this.issend = !this.issend
				console.log(sign)
				uni.request({
					url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
					method: 'GET',
					data: {
						q: contentcopy,
						appid: this.appid,
						salt: salt,
						from: this.from,
						to: this.to,
						sign: sign,
					},
					success: (res) => {
						console.log(res)
						if (res.data.error_code) {
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: '<text style="color:red">翻译失败</text>',
									user: 'ai',
									type: 'text'
								})
								this.issend = !this.issend
							}, 1000)
						} else {
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: `<view>${contentcopy}的${toname}翻译结果为：</view><view style="color:limegreen">${res.data.trans_result[0].dst}</view>`,
									user: 'ai',
									type: 'text'
								})
								this.issend = !this.issend
							}, 1000)

						}

					},
					fail() {
						console.log('失败了')
						this.resolvefail()
					}
				})
			},
			//获取随机图片
			getrandomimage() {
				this.chatlist.push({
					content: this.content,
					user: 'user',
					type: 'text'
				})
				this.loading()
				this.content = ''
				this.issend = !this.issend
				uni.request({
					url: 'http://60.204.219.215/api/api/getrandomimage',
					method: 'GET',
					success: (res) => {
						console.log(res.data.data.url)
						const contentcopy = this.content
						if (res.data.status == 200) {
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: '',
									user: 'ai',
									type: 'image',
									url: res.data.data.url
								})
								this.issend = !this.issend
							}, 1000)
						} else {
							console.log('失败了')
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: '<text style="color:red">获取失败</text>',
									user: 'ai',
									type: 'text'
								})
								this.issend = !this.issend
							}, 1000)
							this.content = ''
						}

					},
				})
			},
			//获取随机音乐
			getrandommusic() {
				this.chatlist.push({
					content: this.content,
					user: 'user',
					type: 'text'
				})
				this.getmusic()
			},
			getmusic() {
				this.loading()
				this.content = ''
				this.issend = !this.issend
				uni.request({
					url: 'https://api.uomg.com/api/rand.music',
					method: 'GET',
					data: {
						sort: '新歌榜',
						format: "json"
					},
					success: (res) => {
						console.log(res)
						console.log(res.statusCode)
						if (res.statusCode == 200) {
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: `<view>已获取到音乐</view><view style="color:limegreen">${res.data.data.name}</view><view>并为您自动播放</view>`,
									user: 'ai',
									type: 'audio',
									url: res.data.data.url
								})
								this.musicname = res.data.data.name
								innerAudioContext.src = res.data.data.url
								this.issend = !this.issend
							}, 1000)
						} else {
							console.log('失败了')
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: '<text style="color:red">获取失败</text>',
									user: 'ai',
									type: 'text'
								})
								this.issend = !this.issend
							}, 1000)
							this.content = ''
						}

					},
				})
			},
			// 停止音乐
			stopmusic() {
				this.chatlist.push({
					content: this.content,
					user: 'user',
					type: 'text'
				})
				this.content = ''
				this.issend = !this.issend
				setTimeout(() => {
					innerAudioContext.pause()
					this.chatlist.push({
						content: `<view>已停止播放音乐</view><view style="color:limegreen">${this.musicname}</view>`,
						user: 'ai',
						type: 'text',
					})
					this.issend = !this.issend
				}, 1000)
			},
			// 播放音乐
			startmusic() {
				this.chatlist.push({
					content: this.content,
					user: 'user',
					type: 'text'
				})
				this.content = ''
				this.issend = !this.issend
				if (innerAudioContext.src) {
					console.log('存在')
					innerAudioContext.play()
				} else {
					console.log('不存在')
					this.chatlist.push({
						content: '请先获取音乐哦！',
						user: 'ai',
						type: 'text'
					})
				}
			},
			//获取随机视频
			getrandomvideo() {
				this.chatlist.push({
					content: this.content,
					user: 'user',
					type: 'text'
				})
				this.loading()
				this.content = ''
				this.issend = !this.issend
				uni.request({
					url: 'http://60.204.219.215/api/api/getrandomvideo',
					method: 'GET',
					success: (res) => {
						console.log(res.data.data)
						const contentcopy = this.content
						if (res.data.status == 200) {
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: '',
									user: 'ai',
									type: 'video',
									url: res.data.data.video,
									cover: res.data.data.cover,
									title: res.data.data.title
								})
								this.issend = !this.issend
							}, 1000)
						} else {
							console.log('失败了')
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: '<text style="color:red">获取失败</text>',
									user: 'ai',
									type: 'text'
								})
								this.issend = !this.issend
							}, 1000)
							this.content = ''
						}

					},
				})
			},
			//获取随机笑话
			getrandomjok() {
				this.chatlist.push({
					content: this.content,
					user: 'user',
					type: 'text'
				})
				this.loading()
				this.content = ''
				this.issend = !this.issend
				uni.request({
					url: 'https://api.vvhan.com/api/joke?type=json',
					success: (res) => {
						this.value = res.data.joke
						console.log(res)
						setTimeout(() => {
							this.chatlist.splice(-1, 1)
							this.chatlist.push({
								content: res.data.joke,
								user: 'ai',
								type: 'text',
							})
							this.issend = !this.issend
						}, 1000)

					},
					fail: () => {
						this.resolvefail()
					}
				})
			},
			//其它内容
			othertext() {
				var contentcopy = this.content
				this.chatlist.push({
					content: this.content,
					user: 'user',
					type: 'text'
				})
				this.loading()
				this.content = ''
				this.issend = !this.issend
				uni.request({
					url: 'http://api.qingyunke.com/api.php',
					data: {
						key: 'free',
						appid: 0,
						msg: contentcopy
					},
					success: (res) => {
						if (res.statusCode == 200) {
							console.log(res)
							setTimeout(() => {
								this.chatlist.splice(-1, 1)
								this.chatlist.push({
									content: res.data.content,
									user: 'ai',
									type: 'text',
								})
								this.issend = !this.issend
							}, 1000)
						} else {
							this.resolvefail()
						}

					},
					fail: () => {
						this.resolvefail()
					}
				})
			},
			//获取当地天气
			showImageFullScreen(e) {
				console.log(e)
				let imagesUrl = [e];
				uni.previewImage({
					urls: imagesUrl
				});
			},
			//请求失败回调
			resolvefail() {
				setTimeout(() => {
					this.chatlist.push({
						content: '<text style="color:red">请求数据失败</text>',
						user: 'ai',
						type: 'text'
					})
					this.issend = !this.issend
				}, 1000)
				this.content = ''
			},
			//加载中
			loading() {
				this.chatlist.push({
					user: 'ai',
					type: 'loading',
				})
			},
			//使用帮助
			chathelp() {
				this.chatlist.push({
					content: this.content,
					user: 'ai',
					type: 'text'
				})
				this.chatlist.push({
					content: '<view><view class="header">郎小宝の机器人使用帮助：</view><view class="item"><h3>一、聊天模式</h3><view class="">聊天模式分为：<text>闲聊模式</text>、<text>翻译模式。</text></view></view><view class="item"><h3>二、聊天功能</h3><view class="">聊天功能包含：<text>获取随机图片</text>、<text>获取随机视频</text>、<text>获取随机句子</text>、<text>获取当前城市天气</text>、<text>讲笑话</text>、<text>翻译文档</text>、<text>与机器人瞎聊等。</text></view><view class="">(注意：翻译模式下只能处理翻译请求，同样的闲聊模式下不能进行翻译)</view></view><view class="item"><h3>三、聊天命令</h3><view class="">1.切换模式为闲聊：<text>切换闲聊、闲聊切换、切换为闲聊等。</text></view></view></view>',
					user: 'ai',
					type: 'text'
				})
				this.issend = !this.issend
				this.content = ''
			},
			settitle() {
				uni.setNavigationBarTitle({
					title: this.chattype == 1 ? '闲聊模式' : '翻译模式'
				})
			},
			yulanvideo(url, cover) {
				uni.navigateTo({
					url: `/pages/translate/videoyulan/videoyulan?url=${url}&cover=${JSON.stringify(cover)}`,
					animationType: 'zoom-fade-out'
				})
			},
			getname() {
				let countryname = uni.getStorageSync('translatelanguage')
				if (countryname) {
					this.to = JSON.parse(countryname)
				} else {
					this.to = 'en'
				}
				this.toname = this.$getcountryname(this.to)
			},
			getchattype() {
				let chattype = uni.getStorageSync('chattype')
				if (chattype) {
					this.chattype = JSON.parse(chattype)
				} else {
					this.chattype = 1
				}
			},
			changeen(isclick) {
				console.log(isclick)
				if (isclick) {
					uni.navigateTo({
						url: '/pages/translate/changelanguage/changelanguage',
						animationType: 'zoom-fade-out'
					})
				}
			},
			sendcontent() {
				if (!this.content.trim()) {
					return
				}
				//当前模式为闲聊
				if (this.chattype == 1) {
					//获取随机图片
					if (this.content.includes('获取图片')) {
						this.getrandomimage()
					}
					//获取随机视频
					else if (this.content.includes('获取视频')) {
						this.getrandomvideo()
					}
					//获取随机音乐
					else if (this.content.includes('获取音乐')) {
						this.getrandommusic()
					}
					//获取笑话
					else if (this.content.includes('笑话')) {
						this.getrandomjok()
					}
					//停止音乐
					else if (this.content.includes('暂停音乐')) {
						this.stopmusic()
					}
					//播放音乐
					else if (this.content.includes('播放音乐')) {
						this.startmusic()
					}
					//使用帮助
					else if (this.content.includes('使用帮助')) {
						this.chathelp()
					}
					//切换模式为闲聊
					else if (this.content.includes('切换') && this.content.includes('闲聊')) {
						this.changechattype()
					}
					//切换模式为翻译
					else if (this.content.includes('切换') && this.content.includes('翻译')) {
						this.changechattype()
					}
					//其它内容
					else {
						this.othertext()
					}
				}

				//当前模式为翻译
				if (this.chattype == 2) {
					//切换语言
					if (this.content.trim() == '切换语言') {
						this.changelanguage()
					} //切换模式为闲聊
					else if (this.content.includes('切换') && this.content.includes('闲聊')) {
						this.changechattype()
					}
					//切换模式为翻译
					else if (this.content.includes('切换') && this.content.includes('翻译')) {
						this.changechattype()
					} else if (this.content) {
						console.log('翻译')
						this.translatetext()
					}

				}

			}
		}

	};
</script>
<style>
	page {
		width: 100%;
		height: 100%;
		background-color: aliceblue;
	}
</style>
<style lang="less" scoped>
	.item .typeimage {
		margin-left: 30rpx;
		border-radius: 12rpx !important;
		width: 300rpx !important;
		// height: 300rpx !important;
	}

	.typevideo {
		margin-left: 30rpx;
		border-radius: 12rpx;
		width: 480rpx;
		height: 300rpx;
		display: flex;
		flex-direction: column;

		text {
			width: 100%;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.son {
			position: relative;
			flex: 1;
		}

		.img {
			width: 480rpx;
			height: 100%;
		}

		.start {
			position: absolute;
			width: 100rpx;
			height: 100rpx;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.footer {
		width: 750rpx;
		// height: 100rpx;
		height: auto;
		position: fixed;
		box-sizing: border-box;
		bottom: 0;
		background-color: #f6f6f6;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		flex-wrap: nowrap;
		align-items: center;

		button {
			position: fixed;
			bottom: 20rpx;
			right: 20rpx;
		}

	}

	.main {
		overflow: auto;
		box-sizing: border-box;
		position: relative;
		// width: 750rpx;
		// min-height: 500rpx;
		// height: 100%;
		// margin: 0 auto;
		// overflow: auto;
		// // background-color: red;
		// margin-bottom: 150rpx;
		padding: 0 10rpx;
		padding-bottom: 150rpx;

	}

	.content {
		width: 100%;
		box-sizing: border-box;
		// padding-top: 10px;
		// padding-left: 10px;
		// padding-right: 10px;
		display: flex;
	}

	.loading {
		max-width: 130rpx;
		padding: 10px;
		line-height: 30px;
		border-radius: 5px;
		position: relative;
		color: #000;
	}

	.bubble {
		max-width: 430rpx;
		padding: 10px;
		line-height: 30px;
		border-radius: 5px;
		position: relative;
		color: #000;
		word-wrap: break-word;
		word-break: break-all;
	}

	.item-left .bubble {
		margin-left: 15px;
		background-color: #fff;


	}

	.item-left .bubble:before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-top: 10px solid transparent;
		border-right: 10px solid #fff;
		border-bottom: 10px solid transparent;
		left: -20px;
	}

	.item-right .bubble {
		margin-right: 15px;
		background-color: #9eea6a;


	}

	.item-right .bubble:before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		border-left: 10px solid #9eea6a;
		border-top: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 10px solid transparent;
		right: -20px;
	}

	.item {
		margin-top: 15px;
		display: flex;
		width: 100%;
	}

	.item.item-right {
		justify-content: flex-end;
	}

	.avatar image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 5rpx;
	}

	.pagination-wrapper {
		width: 95%;
		background-color: #fff;
	}

	.two {
		border: solid 1rpx #cdcdcd;
		background-color: #f7f7f7;
		color: #cdcdcd;
	}

	.one {
		background-color: #05c160;
		color: white;

	}

	@keyframes pulse {
		from {
			opacity: 1;
			transform: scale(1);
		}

		to {
			opacity: 0.25;
			transform: scale(0.75);
		}
	}

	.spinner-box {
		width: 200rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
	}


	.pulse-container {
		margin-left: 20rpx;
		width: 200rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.pulse-bubble {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-color: #3ff9dc;
	}

	.pulse-bubble-1 {
		animation: pulse 0.4s ease 0s infinite alternate;
	}

	.pulse-bubble-2 {
		animation: pulse 0.4s ease 0.2s infinite alternate;
	}

	.pulse-bubble-3 {
		animation: pulse 0.4s ease 0.4s infinite alternate;
	}
</style>