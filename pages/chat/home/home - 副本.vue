<template>
	<view>
		<scroll-view class="conversations" scroll-y="true">
			<view v-if="conversations.length > 0">
				<view class="scroll-item"  v-for="(conversation, key) in conversations" :key="key" :class="{zhiding:conversation.top}">
					<view class="item-head">
						<image :src="conversation.data.avatar" class="head-icon"></image>
						<view class="item-head_unread" v-if="conversation.unread">{{conversation.unread}}</view>
					</view>
					<view class="scroll-item_info" @click="navigateToChat(conversation)">
						<view class="item-info-top">
							<text class="item-info-top_name">{{conversation.data.name}}</text>
							<view class="item-info-top_time">{{formatDate(conversation.lastMessage.timestamp)}}</view>
						</view>
						<view class="item-info-bottom">
							<view class="item-info-bottom-item">
								<view class="item-info-top_content" v-if="!conversation.lastMessage.recalled">
									<text class="unread-text">{{conversation.lastMessage.read === false && conversation.lastMessage.senderId === currentUser.id?'[未读]':''}}</text>
									<text v-if="conversation.type === 'private'">{{conversation.lastMessage.senderId === currentUser.id? '我': conversation.data.name}}:</text>
									<text v-else>{{conversation.lastMessage.senderId === currentUser.id? '我': conversation.lastMessage.senderData.name}}:</text>
									<text v-if="conversation.lastMessage.type === 'text'">{{conversation.lastMessage.payload.text}}</text>
									<text v-else-if="conversation.lastMessage.type === 'video'">[视频消息]</text>
									<text v-else-if="conversation.lastMessage.type === 'audio'">[语音消息]</text>
									<text v-else-if="conversation.lastMessage.type === 'image'">[图片消息]</text>
									<text v-else-if="conversation.lastMessage.type === 'file'">[文件消息]</text>
									<text v-else-if="conversation.lastMessage.type === 'order'">[自定义消息:订单]</text>
									<text v-else>[[未识别内容]]</text>
								</view>
								<view class="item-info-top_content" v-else>
									<text v-if="conversation.type === 'private'">{{conversation.lastMessage.senderId === currentUser.id? '你': `"${conversation.data.name}"`}}撤回了一条消息</text>
									<text v-if="conversation.type === 'group'">{{conversation.lastMessage.senderId === currentUser.id? '你': `"${conversation.lastMessage.senderData.name}"`}}撤回了一条消息</text>
								</view>
								<view class="item-info-bottom_action" @click.stop="showAction(conversation)"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="no-conversation" v-else>
				当前没有会话
			</view>
			<view class="action-container" v-if="actionPopup.visible">
				<view class="layer" @click="actionPopup.visible = false"></view>
				<view class="action-box">
					<view class="action-item" @click="topConversation">{{actionPopup.conversation.top ? '取消置顶' : '置顶聊天'}}</view>
					<view class="action-item" @click="deleteConversation">删除聊天</view>
				</view>
			</view>
		</scroll-view>
		<chatbar @toIndex="toIndex"></chatbar>
	</view>
</template>

<script>
	import restApi from '../../../lib/restapi';
	export default {
		data() {
			return {
				unreadTotal : 0,
				conversations : [],
				
				actionPopup : {
					conversation : null,
					visible : false
				},
				currentUser: null
			}
		},
		onShow () {
			this.currentUser = JSON.parse(uni.getStorageSync('username'))
		
			if(this.goEasy.getConnectionStatus() === 'disconnected') {
				this.connectGoEasy();  //连接goeasy
			}
			this.subscribeGroup(); //建立连接后，就应该订阅群聊消息，避免漏掉
			this.listenConversationUpdate(); //监听会话列表变化
			this.loadConversations(); //加载会话列表
		},
		onLoad() {
			this.currentUser = JSON.parse(uni.getStorageSync('username'))
		},
		onBackPress() {
			uni.reLaunch({
				url:"/pages/personal/personal",
				animationType:'zoom-fade-out'
			})
			return true
		},
		methods: {
			connectGoEasy() {
				uni.showLoading();
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
						console.log('Failed to connect GoEasy, code:'+error.code+ ',error:'+error.content);
					},
					onProgress: (attempts) => {
						console.log('GoEasy is connecting', attempts);
					}
				});
			},
			
			// 加载最新的会话列表
			loadConversations() {
				this.goEasy.im.latestConversations({
					onSuccess: (result) => {
						let content = result.content;
						this.renderConversations(content);
						uni.hideLoading();
					},
					onFailed: (error) => {
						uni.hideLoading();
						console.log('获取最新会话列表失败, error:',error);
					}
				});
			},
			listenConversationUpdate() {
				// 监听会话列表变化
				this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (content) => {
					this.renderConversations(content);
				});
			},
			subscribeGroup() {
				let groups = restApi.findGroups(this.currentUser);
				let groupIds = groups.map(item => item.id);
				this.goEasy.im.subscribeGroup({
					groupIds: groupIds,
					onSuccess: function () {
						console.log('订阅群消息成功');
					},
					onFailed: function (error) {
						console.log('订阅群消息失败:', error);
					}
				});
			},
			topConversation() {  //会话置顶
				uni.showLoading({
					title:'加载中...',
					mask: true
				});
				let actionPopup = this.actionPopup;
				actionPopup.visible = false;
			
				let conversation = actionPopup.conversation;
				let failedDescription = conversation.top ? '取消置顶失败' : '置顶失败';
			
				if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
					this.goEasy.im.topPrivateConversation({
						userId: conversation.userId,
						top: !conversation.top,
						onSuccess: function () {
							uni.hideLoading();
						},
						onFailed: function (error) {
							uni.hideLoading();
							uni.showToast({
								title: failedDescription,
								icon: 'none'
							});
							console.log(error);
						}
					});
				}else {
					this.goEasy.im.topGroupConversation({
						groupId: conversation.groupId,
						top: !conversation.top,
						onSuccess: function () {
							uni.hideLoading();
						},
						onFailed: function (error) {
							uni.hideLoading();
							uni.showToast({
								title: failedDescription,
								icon: 'none'
							});
							console.log(error);
						}
					});
				}
			},
			deleteConversation() {
				uni.showLoading({
					title:'加载中...',
					mask: true
				});
				let failedDescription = '删除失败';
				let conversation = this.actionPopup.conversation;
				this.actionPopup.visible = false;
			
				if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
					this.goEasy.im.removePrivateConversation({
						userId: conversation.userId,
						onSuccess: function () {
							uni.hideLoading();
						},
						onFailed: function (error) {
							uni.hideLoading();
							uni.showToast({
								title: failedDescription,
								icon: 'none'
							});
							console.log(error);
						}
					});
				}else {
					this.goEasy.im.removeGroupConversation({
						groupId: conversation.groupId,
						onSuccess: function () {
							uni.hideLoading()
						},
						onFailed: function (error) {
							uni.hideLoading();
							uni.showToast({
								title: failedDescription,
								icon: 'none'
							});
							console.log(error);
						}
					});
				}
			},
			renderConversations(content){
				this.conversations = content.conversations;
				console.log('聊天',content.conversations)
				let unreadTotal = content.unreadTotal;
				this.setUnreadAmount(unreadTotal);
			},
			setUnreadAmount (unreadTotal) {
				this.unreadTotal = unreadTotal;
				if(this.unreadTotal > 0) {
					uni.setTabBarBadge({
						index: 0,
						text: this.unreadTotal.toString()
					});
				}else{
					uni.removeTabBarBadge({
						index: 0
					});
				}
			},
			navigateToChat (conversation) {
				// let path = conversation.type === this.GoEasy.IM_SCENE.PRIVATE
				// 		? '/pages/chat/privateChat/privateChat?to=' + conversation.userId
				// 		: '/pages/chat/groupChat/groupChat?to=' + conversation.groupId;
				// uni.navigateTo({
				// 	url: path,
				// 	animationType:'zoom-fade-out'
				// });
				if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
					uni.navigateTo({
						url: `/pages/chat/privateChat/privateChat?id=${conversation.userId}`,
						animationType:'zoom-fade-out'
					});
				}
				else{
					
				}
			},
			showAction (conversation) {
				this.actionPopup.conversation = conversation;
				this.actionPopup.visible = true;
			},
			toIndex(index) {
				if (index == 1) {
					console.log(index)
				} 
				else{
					uni.navigateTo({
						url:"/pages/chat/contacts/contacts",
						animationType:'zoom-fade-out'
					})
				}
			},
		}
	}
</script>

<style scoped>
	.zhiding{
		background-color: #EFEFEF;
	}
	page{ height: 100%; }
	.conversations{
		width: 750rpx;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		height: 100%;
	}
	.conversations .scroll-item{
		height: 152rpx;
		display: flex;
		align-items: center;
		padding-left: 32rpx;
	}
	.conversations .scroll-item .head-icon{
		width:100rpx;
		height: 100rpx;
		margin-right: 28rpx;
	}
	.conversations .scroll-item_info{
		height: 151rpx;
		width: 590rpx;
		padding-right: 32rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #EFEFEF;
	}
	.conversations .scroll-item_info .item-info-top{
		padding-top: 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	
	}
	.conversations .item-info-top_name{
		font-size: 34rpx;
		color: #262628;
	}
	.conversations .item-info-top_time{
		font-size: 26rpx;
		color: rgba(179, 179, 179, 0.8);
		font-family: Source Han Sans CN;
	}
	.conversations .item-info-bottom{
		height: 40rpx;
		line-height: 40rpx;
		overflow: hidden;
	}
	.conversations .item-info-bottom-item{
		display: flex;
		justify-content: space-between;
	}
	.item-info-bottom .item-info-top_content{
		font-size: 30rpx;
		color: #b3b3b3;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	
	}
	
	.item-info-bottom .item-info-bottom_action{
		width:50rpx;
		height: 50rpx;
		font-size: 20rpx;
		background: url("../../../static/images/chat/action.png") no-repeat center;
		background-size: 28rpx 30rpx;
	}
	.no-conversation{
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #9D9D9D;
	}
	.item-head{
		position: relative;
	}
	.item-head .item-head_unread{
		padding: 6rpx;
		background-color: #EE593C;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 28rpx;
		border-radius: 24rpx;
		min-width: 24rpx;
		min-height: 24rpx;
		text-align: center;
		position: absolute;
		top:0;
		right: 15rpx;
	}
	.action-container{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.action-container .layer{
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(51, 51, 51, 0.5);
		width: 100%;
		height: 100%;
		z-index: 99;
	}
	.action-box{
		width: 400rpx;
		height: 240rpx;
		background: #ffffff;
		position: relative;
		z-index: 100;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.action-item{
		text-align: center;
		line-height: 120rpx;
		font-size: 34rpx;
		color: #262628;
		border-bottom: 1px solid #EFEFEF;
	}
	
	.unread-text {
		color: #618DFF;
	}
</style>
