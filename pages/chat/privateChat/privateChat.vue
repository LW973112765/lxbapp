<template>
	<view class="chatInterface">
		<view class="bjbjbjbj" :style="{backgroundImage: 'url(' + imageURL + ')',
  'background-repeat':'no-repeat', backgroundSize:'100% 100%'}">

		</view>
		<view class="scroll-view">
			<view class="all-history-loaded">
				{{allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息'}}
			</view>
			<checkbox-group @change="selectMessages">
				<!--消息记录-->
				<view v-for="(message,index) in messages" :key="message.messageId">
					<!--时间显示，类似于微信，隔5分钟不发言，才显示时间-->
					<view class="time-lag">
						{{renderMessageDate(message, index)}}
					</view>
					<view class="message-recalled" v-if="message.recalled">
						<view v-if="message.senderId != currentUser.id">{{username}}撤回了一条消息</view>
						<view v-else class="message-recalled-self">
							<view>你撤回了一条消息</view>
							<span v-if="message.type === 'text' && Date.now()-message.timestamp< 60 * 1000 "
								@click="editRecalledMessage(message.payload.text)">重新编辑</span>
						</view>
					</view>
					<view class="message-item" v-else>
						<view class="message-item-checkbox">
							<checkbox v-show="messageSelector.visible && message.status !== 'sending'"
								:value="message.messageId" :checked="messageSelector.messages.includes(message)" />
						</view>
						<view class="message-item-content" :class="{'self' : message.senderId ==  currentUser.id}">
							<view class="avatar">
								<image :src="message.senderId == currentUser.id? currentUser.avatar : avatar"></image>
							</view>
							<view class="content" @longpress="showActionPopup(message)">
								<view class="message-payload">
									<b class="pending" v-if="message.status === 'sending'"></b>
									<b class="send-fail" v-if="message.status === 'fail'"></b>
									<view v-if="message.type === 'text'" v-html="renderTextMessage(message)"></view>
									<image class="image-content" v-if="message.type === 'image'"
										:src="message.payload.url" :data-url="message.payload.url"
										@click="showImageFullScreen" mode="widthFix"></image>
									<view class="video-snapshot" v-if="message.type === 'video'"
										:data-url="message.payload.video.url" @click="playVideo">
										<image :src="message.payload.thumbnail.url" mode="aspectFit"></image>
										<view class="video-play-icon"></view>
									</view>
									<GoEasyAudioPlayer v-if="message.type ==='audio'" :src="message.payload.url"
										:duration="message.payload.duration" />
									<view class="custom-message" v-if="message.type === 'order'">
										<view class="title">
											<image src="../../../static/images/chat/order.png"></image>
											<text>自定义消息</text>
										</view>
										<view class="custom-message-item">编号：{{message.payload.number}}</view>
										<view class="custom-message-item">商品: {{message.payload.goods}}</view>
										<view class="custom-message-item">金额: {{message.payload.price}}</view>
									</view>
								</view>
								<view v-if="message.senderId == currentUser.id"
									:class="message.read ?'message-read':'message-unread'">
									<view v-if="message.status == 'success'">{{message.read?'已读':'未读'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="action-box" v-if="!videoPlayer.visible && !messageSelector.visible">
			<view class="action-top">
				<view :class="[audio.visible ? 'record-icon record-open':'record-icon']" @click="switchAudioKeyboard">
				</view>
				<view class="record-input" @touchstart="onRecordStart" @touchend="onRecordEnd" v-if="audio.visible">
					{{audio.recording ? '松开发送' : '按住录音'}}
				</view>
				<view class="message-input" v-else>
					<!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
					<input type="text" maxlength="700" placeholder="发送消息" v-model="content"
						@focus="messageInputFocusin">
				</view>
				<view class="file-icon emoji-icon" @click="showEmoji"></view>
				<view class="file-icon more-icon" @click="showOtherTypesMessagePanel"></view>
				<span class="send-message-btn" @click="createTextMessage">发送</span>
			</view>
			<!--展示表情列表-->
			<view class="action-bottom action-bottom-emoji" v-if="emoji.visible">
				<image class="emoji-item" v-for="(emojiItem, emojiKey, index) in emoji.map" :key="index"
					:src="emoji.url + emojiItem" @click="chooseEmoji(emojiKey)"></image>
			</view>
			<!--其他类型消息面板-->
			<view class="action-bottom" v-if="otherTypesMessagePanelVisible">
				<view class="more-item" @click="createImageMessage">
					<image src="../../../static/images/chat/tupian.png"></image>
					<text>图片</text>
				</view>
				<view class="more-item" @click="createVideoMessage">
					<image src="../../../static/images/chat/shipin.png"></image>
					<text>视频</text>
				</view>
				<view class="more-item" @click="showCustomMessageForm">
					<image src="../../../static/images/chat/zidingyi.png"></image>
					<text>自定义消息</text>
				</view>
			</view>
		</view>
		<view class="action-popup" @touchmove.stop.prevent v-if="actionPopup.visible">
			<view class="layer"></view>
			<view class="action-box">
				<view class="action-item" @click="deleteSingleMessage">删除</view>
				<view class="action-item" v-if="actionPopup.recallable" @click="recallMessage">撤回</view>
				<view class="action-item" @click="showCheckBox">多选</view>
				<view class="action-item" @click="actionPopup.visible = false">取消</view>
			</view>
		</view>
		<view class="messageSelector-box" v-if="messageSelector.visible">
			<image class="messageSelector-btn" @click="deleteMultipleMessages" src="/static/images/chat/delete.png">
			</image>
		</view>
		<view class="record-loading" v-if="audio.recording"></view>
		<video v-if="videoPlayer.visible" :src="videoPlayer.url" id="videoPlayer"
			@fullscreenchange="onVideoFullScreenChange"></video>
		<CustomMessage v-if="customMessageFormVisible" @createCustomMessage="createCustomMessage"
			@closeCustomMessageForm="closeCustomMessageForm"></CustomMessage>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import GoEasyAudioPlayer from '../../../components/GoEasyAudioPlayer/GoEasyAudioPlayer';
	import CustomMessage from '../../../components/CustomMessage/CustomMessage';
	import EmojiDecoder from '../../../lib/EmojiDecoder';
	import restApi from '../../../lib/restapi';
	const recorderManager = uni.getRecorderManager();
	export default {
		name: 'privateChat',
		components: {
			GoEasyAudioPlayer,
			CustomMessage
		},
		data() {
			const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
			const emojiMap = {
				'[么么哒]': 'emoji_3@2x.png',
				'[乒乓]': 'emoji_4@2x.png',
				'[便便]': 'emoji_5@2x.png',
				'[信封]': 'emoji_6@2x.png',
				'[偷笑]': 'emoji_7@2x.png',
				'[傲慢]': 'emoji_8@2x.png'
			};
			return {
				imageURL: '',
				id: null,
				avatar: '',
				username: '',
				//聊天文本框
				content: '',
				friend: null,
				currentUser: null,
				//消息记录
				messages: [],
				//是否加载完所有历史消息
				allHistoryLoaded: false,

				//定义表情列表
				emoji: {
					url: emojiUrl,
					map: emojiMap,
					visible: false,
					decoder: new EmojiDecoder(emojiUrl, emojiMap),
				},
				//是否展示‘其他消息类型面板’
				otherTypesMessagePanelVisible: false,
				audio: {
					startTime: null,
					//语音录音中
					recording: false,
					//录音按钮展示
					visible: false
				},

				videoPlayer: {
					visible: false,
					url: '',
					context: null
				},
				// 展示自定义消息框
				customMessageFormVisible: false,

				// 展示消息删除弹出框
				actionPopup: {
					visible: false,
					message: null,
					recallable: false,
				},
				// 消息选择
				messageSelector: {
					visible: false,
					messages: []
				}
			}
		},
		onReady() {
			this.videoPlayer.context = uni.createVideoContext('videoPlayer', this);
			this.getstatus()
			// https://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle
			// uni.setNavigationBarTitle({
			// 	title : this.name
			// });
		},
		onBackPress() {
			uni.navigateTo({
				url: "/pages/chat/home/home",
				animationType: 'zoom-fade-out'
			})
			return true
		},
		onShow() {
			this.otherTypesMessagePanelVisible = false;
			this.emoji.visible = false;
			this.getstatus()
			this.getbg()
			if (this.goEasy.getConnectionStatus() === 'disconnected') {
				this.connectGoEasy(); //连接goeasy
				// this.subscribeGroup(); //建立连接后，就应该订阅群聊消息，避免漏掉
			}
		},
		onLoad(options) {
			//聊天对象
			// this.name=options.name
			this.id = options.id
			// let friendId = options.user.id;
			console.log(options, '坎坎坷坷扩')
			this.getinfo(options.id)
			this.getbg()
			// this.currentUser = this.userinfo
			this.currentUser = JSON.parse(uni.getStorageSync('username'))
			//从服务器获取最新的好友信息
			// this.friend = {id:options.id,username:options.name,avatar:options.avatar}

			this.initialGoEasyListeners();
			this.loadHistoryMessage(true);
			// 录音监听器
			this.initRecorderListeners();

		},
		onPullDownRefresh(e) {
			this.loadHistoryMessage(false);
		},
		onUnload() {
			//退出聊天页面之前，清空监听器
			this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, () => {});
			this.goEasy.im.on(this.GoEasy.IM_EVENT.MESSAGE_DELETED, () => {});

		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: `/pages/chat/chatsetting/chatsetting?myid=${this.userinfo.id}&friendid=${this.id}`,
				animationType: 'zoom-fade-out'
			})
		},
		methods: {
			async getbg() {
				let res = await this.$zxl('/getchatbg', {
					myid: this.userinfo.id,
					friendid: this.id
				})
				if (res.data.status == 200) {
					console.log()
					this.imageURL = res.data.data.bgurl
				}
			},
			async getstatus() {
				let res = await this.$zxl('/getapplystatus', {
					myid: this.userinfo.id,
					friendid: this.id
				})
				console.log(res.data.data[0], '申请状态')
				if (res.data.status == 200) {
					let zxl = res.data.data[0].beizhu || this.username
					uni.setNavigationBarTitle({
						title: zxl
					})
				}


			},
			getroute() {
				let page = getCurrentPages()
				let lastpage = page[page.length - 2].route
				console.log(lastpage)

				if (lastpage == 'pages/chat/contacts/contacts') {

					uni.navigateTo({
						url: "/pages/chat/contacts/contacts",
						animationType: 'zoom-fade-out'
					})
				} else {
					uni.navigateTo({
						url: "/pages/chat/home/home",
						animationType: 'zoom-fade-out'
					})
				}
			},
			async getinfo(id) {
				let res = await this.$zxl('/getuserinfo', {
					id
				})
				console.log(res.data.data, '用户信息')
				this.avatar = res.data.data.avatar
				this.username = res.data.data.username
				uni.setNavigationBarTitle({
					title: res.data.data.username
				})
			},
			connectGoEasy() {
				// uni.showLoading();
				this.goEasy.connect({
					id: this.currentUser.id,
					data: {
						name: this.currentUser.username,
						avatar: this.currentUser.avatar
					},
					onSuccess: () => {
						console.log('GoEasy connect successfully.')
					},
					onFailed: (error) => {
						console.log('Failed to connect GoEasy, code:' + error.code + ',error:' + error
							.content);
					},
					onProgress: (attempts) => {
						console.log('GoEasy is connecting', attempts);
					}
				});
			},
			//渲染文本消息，如果包含表情，替换为图片
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderTextMessage(message) {
				return '<span class="text-content">' + this.emoji.decoder.decode(message.payload.text) + '</span>'
			},
			//像微信那样显示时间，如果有几分钟没发消息了，才显示时间
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderMessageDate(message, index) {
				if (index === 0) {
					return this.formatDate(message.timestamp)
				} else {
					if (message.timestamp - this.messages[index - 1].timestamp > 5 * 60 * 1000) {
						return this.formatDate(message.timestamp)
					}
				}
				return '';
			},
			initialGoEasyListeners() {
				// 监听私聊消息
				this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, (message) => {
					console.log('PRIVATE_MESSAGE_RECEIVED:', message);
					let senderId = message.senderId;
					let receiverId = message.receiverId;
					let friendId = this.currentUser.id === senderId ? receiverId : senderId;
					if (friendId === this.id) {
						this.messages.push(message);
						//聊天时，收到消息标记为已读
						this.markPrivateMessageAsRead();
						//收到新消息，是滚动到最底部
						this.scrollToBottom();

					}
				});
				//监听消息删除
				this.goEasy.im.on(this.GoEasy.IM_EVENT.MESSAGE_DELETED, (deletedMessages) => {
					deletedMessages.forEach(message => {
						let senderId = message.senderId;
						let receiverId = message.receiverId;
						let friendId = this.currentUser.id === senderId ? receiverId : senderId;
						if (friendId === this.id) {
							let index = this.messages.indexOf(message);
							if (index > -1) {
								this.messages.splice(index, 1);
							}
						}
					});
				});
			},
			initRecorderListeners() {
				// 监听录音开始
				recorderManager.onStart(() => {
					this.audio.recording = true;
					this.audio.startTime = Date.now();
				});
				//录音结束后，发送
				recorderManager.onStop((res) => {
					let endTime = Date.now();
					this.audio.recording = false;
					let duration = endTime - this.audio.startTime;
					if (duration < 1000) {
						uni.showToast({
							icon: 'error',
							title: '录音时间太短',
							duration: 500
						});
						return;
					}
					res.duration = duration;
					let audioMessage = this.goEasy.im.createAudioMessage({
						to: {
							id: this.id,
							type: this.GoEasy.IM_SCENE.PRIVATE,
							data: {
								name: this.username,
								avatar: this.avatar
							}
						},
						file: res,
						onProgress: function(progress) {
							console.log(progress)
						},
						// notification : {
						// 	title : this.currentUser.username + '发来一段语音',
						// 	body : '[语音消息]'		// 字段最长 50 字符
						// }
					});
					this.sendMessage(audioMessage);
				});
				// 监听录音报错
				recorderManager.onError((res) => {
					this.audio.recording = false;
					recorderManager.stop();
					uni.showToast({
						icon: 'none',
						title: '录音失败,请检查麦克风权限',
						duration: 1000
					});
				})
			},
			sendMessage(message) {
				this.messages.push(message);
				this.scrollToBottom();
				this.goEasy.im.sendMessage({
					message: message,
					onSuccess: function(message) {
						console.log('发送成功.', message);
					},
					onFailed: function(error) {
						if (error.code === 507) {
							console.log(
								'发送语音/图片/视频/文件失败，没有配置OSS存储，详情参考：https://docs.goeasy.io/2.x/im/message/media/alioss'
							);
						} else {
							console.log('发送失败:', error);
						}
					}
				});
			},
			createTextMessage() {
				if (this.content.trim() !== '') {
					let body = this.content;
					if (this.content.length >= 50) {
						body = this.content.substring(0, 30) + '...';
					}
					let textMessage = this.goEasy.im.createTextMessage({
						text: this.content,
						to: {
							id: this.id,
							type: this.GoEasy.IM_SCENE.PRIVATE,
							data: {
								name: this.username,
								avatar: this.avatar
							}
						},
						// notification : {
						// 	title : this.currentUser.username + '发来一条消息',
						// 	body : body
						// }
					});
					this.sendMessage(textMessage);
				}
				this.content = '';
			},
			showActionPopup(message) {
				const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
				this.messageSelector.messages = [message];
				if ((Date.now() - message.timestamp) < MAX_RECALLABLE_TIME && message.senderId === this.currentUser.id &&
					message.status === 'success') {
					this.actionPopup.recallable = true;
				} else {
					this.actionPopup.recallable = false;
				}
				this.actionPopup.visible = true;
			},
			deleteSingleMessage() {
				uni.showModal({
					content: '确认删除？',
					success: (res) => {
						this.actionPopup.visible = false;
						if (res.confirm) {
							this.deleteMessage();
						}
					},
				})
			},
			deleteMultipleMessages() {
				if (this.messageSelector.messages.length > 0) {
					uni.showModal({
						content: '确认删除？',
						success: (res) => {
							this.messageSelector.visible = false;
							if (res.confirm) {
								this.deleteMessage();
							}
						},
					})
				}
			},
			deleteMessage() {
				this.goEasy.im.deleteMessage({
					messages: this.messageSelector.messages,
					onSuccess: (result) => {
						this.messageSelector.messages.forEach(message => {
							let index = this.messages.indexOf(message);
							if (index > -1) {
								this.messages.splice(index, 1);
							}
						});
						this.messageSelector.messages = [];
					},
					onFailed: (error) => {
						console.log('error:', error);
					}
				});
			},
			recallMessage() {
				this.actionPopup.visible = false;
				this.goEasy.im.recallMessage({
					messages: this.messageSelector.messages,
					onSuccess: () => {
						console.log('撤回成功');
					},
					onFailed: (error) => {
						console.log('撤回失败,error:', error);
					}
				});
			},
			editRecalledMessage(content) {
				if (this.audio.visible) {
					this.audio.visible = false;
				}
				this.content = content;
			},
			showCheckBox() {
				this.messageSelector.messages = [];
				this.messageSelector.visible = true;
				this.actionPopup.visible = false;
			},
			selectMessages(e) {
				const selectedMessageIds = e.detail.value;
				let selectedMessages = [];
				this.messages.forEach(message => {
					if (selectedMessageIds.includes(message.messageId)) {
						selectedMessages.push(message);
					}
				})
				this.messageSelector.messages = selectedMessages;
			},
			loadHistoryMessage(scrollToBottom) { //历史消息
				let lastMessageTimeStamp = null;
				let lastMessage = this.messages[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				this.goEasy.im.history({
					userId: this.id,
					lastTimestamp: lastMessageTimeStamp,
					limit: 10,
					onSuccess: (result) => {
						console.log("result:", result);
						uni.stopPullDownRefresh();
						let messages = result.content;
						if (messages.length === 0) {
							this.allHistoryLoaded = true;
						} else {
							this.messages = messages.concat(this.messages);
							if (scrollToBottom) {
								this.scrollToBottom();
								//收到的消息设置为已读
								this.markPrivateMessageAsRead();
							}
						}
					},
					onFailed: (error) => {
						//获取失败
						console.log('获取历史消息失败啦:', error);
						uni.stopPullDownRefresh();
					}
				});
			},
			//语音录制按钮和键盘输入的切换
			switchAudioKeyboard() {
				this.audio.visible = !this.audio.visible;
				if (uni.authorize) {
					uni.authorize({
						scope: 'scope.record',
						fail: () => {
							uni.showModal({
								title: '获取录音权限失败',
								content: '请先授权才能发送语音消息！'
							});
						}
					});
				}
			},
			onRecordStart() {
				try {
					recorderManager.start();
				} catch (e) {
					uni.showModal({
						title: '录音错误',
						content: '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
					});
				}
			},
			onRecordEnd() {
				try {
					recorderManager.stop();
				} catch (e) {
					console.log(e);
				}
			},
			createVideoMessage() {
				uni.chooseVideo({
					success: (res) => {
						let videoMessage = this.goEasy.im.createVideoMessage({
							to: {
								id: this.id,
								type: this.GoEasy.IM_SCENE.PRIVATE,
								data: {
									name: this.username,
									avatar: this.avatar
								}
							},
							file: res,
							onProgress: function(progress) {
								console.log(progress)
							},
							// notification : {
							// 	title : this.currentUser.username + '发来一个视频',
							// 	body : '[视频消息]'		// 字段最长 50 字符
							// }
						});
						this.sendMessage(videoMessage);
					}
				})
			},
			createImageMessage() {
				uni.chooseImage({
					count: 9,
					success: (res) => {
						console.log(res, '上传图片')
						res.tempFiles.forEach(file => {
							let imageMessage = this.goEasy.im.createImageMessage({
								to: {
									id: this.id,
									type: this.GoEasy.IM_SCENE.PRIVATE,
									data: {
										name: this.username,
										avatar: this.avatar
									}
								},
								file: file,
								onProgress: function(progress) {
									console.log(progress)
								},

								// notification : {
								// 	title : this.currentUser.username + '发来一张图片',
								// 	body : '[图片消息]'		// 字段最长 50 字符
								// }
							});
							this.sendMessage(imageMessage);
						})
					}
				});
			},
			showImageFullScreen(e) {
				let imagesUrl = [e.currentTarget.dataset.url];
				uni.previewImage({
					urls: imagesUrl
				});
			},
			playVideo(e) {
				this.videoPlayer.visible = true;
				this.videoPlayer.url = e.currentTarget.dataset.url;
				this.$nextTick(() => {
					this.videoPlayer.context.requestFullScreen({
						direction: 0
					});
					this.videoPlayer.context.play();
				});
			},
			onVideoFullScreenChange(e) {
				//当退出全屏播放时，隐藏播放器
				if (this.videoPlayer.visible && !e.detail.fullScreen) {
					this.videoPlayer.visible = false;
					this.videoPlayer.context.stop();
				}
			},
			messageInputFocusin() {
				this.otherTypesMessagePanelVisible = false;
				this.emoji.visible = false;
			},
			showEmoji() {
				this.emoji.visible = !this.emoji.visible;
				this.otherTypesMessagePanelVisible = false;
			},
			showOtherTypesMessagePanel() {
				this.otherTypesMessagePanelVisible = !this.otherTypesMessagePanelVisible;
				this.emoji.visible = false;
			},
			chooseEmoji(emojiKey) {
				this.content += emojiKey;
			},
			createCustomMessage(data) {
				let customMessage = this.goEasy.im.createCustomMessage({
					type: 'order',
					payload: {
						number: data.number,
						goods: data.goods,
						price: data.price
					},
					to: {
						id: this.id,
						type: this.GoEasy.IM_SCENE.PRIVATE,
						data: {
							name: this.username,
							avatar: this.avatar
						}
					},
					// notification : {
					// 	title : this.currentUser.username + '发来一份订单',
					// 	body : '[订单消息]'     // 字段最长 50 字符
					// }
				});
				this.sendMessage(customMessage);
				this.customMessageFormVisible = false;
			},
			showCustomMessageForm() {
				this.customMessageFormVisible = true;
			},
			closeCustomMessageForm() {
				this.customMessageFormVisible = false;
			},
			scrollToBottom() {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 2000000,
						duration: 0
					})
				}, 500);
			},
			markPrivateMessageAsRead() {
				this.goEasy.im.markPrivateMessageAsRead({
					userId: this.id,
					onSuccess: function() {
						console.log('标记私聊已读成功');
					},
					onFailed: function(error) {
						console.log("标记私聊已读失败", error);
					}
				});
			}
		}
	}
</script>

<style>
	@import url('../../../static/style/chatInterface.css');
</style>