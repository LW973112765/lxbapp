<template>
	<view class="contacts">
	        <view class="contacts-container">
				<view class="contacts-title"  @click="tohaoyou" style="margin-bottom: 20rpx;position: relative;">
					好友申请
					<view v-if="total" class="total" style="position: absolute; top: 0; right: 30rpx;color:red;font-size: 30rpx;">
						{{total}}
					</view>
					</view>
				<view class="contacts-title" v-if="groups && groups.length !==0">群聊</view>
				<view class="user-list">
					<view class="user-list-item" v-for="(group, uuid) in groups" :key="uuid" @click="enterChat(group.uuid, 'group')">
						<view class="user-item-avatar">
							<image src="../../../static/we/2.jpg">
						</view>
						<view class="user-item-info">
							<span class="user-item-info__name">{{group.name}}</span>
						</view>
					</view>
				</view>
				<view class="contacts-title" v-if="friends && friends.length !==0">联系人</view>
	            <view class="user-list">
	                <view class="user-list-item" v-for="(friend, index) in friends" :key="friend.id"  @click="tozhuye(friend.userid)">
	                    <view class="user-item-avatar">
							<image :src="friend.avatar"></image>
	                    </view>
	                    <view class="user-item-info">
	                        <span class="user-item-info__name">{{friend.beizhu||friend.username}}</span>
	                    </view>
	                </view>
	            </view>
	        </view>
			<chatbar @toIndex="toIndex"></chatbar>
	    </view>
</template>
<script>
	import { mapState } from "vuex";
	import restApi from '../../../lib/restapi';
	export default {
		data() {
			return {
				friends : [],
				groups : [],
				total:0
			}
		},
		onShow () {
			let currentUser = uni.getStorageSync('currentUser');
			// this.friends = restApi.findFriends(currentUser);
			this.getfriend()
			this.gettotal()
			this.groups = restApi.findGroups(currentUser);
		},
		onLoad() {
			this.getfriend()
			this.gettotal()
		},
		onNavigationBarButtonTap(e){
		   uni.navigateTo({
		   	url:"/pages/chat/addfriend/addfriend",
			animationType:'zoom-fade-out'
		   })
		},
		onBackPress() {
			uni.reLaunch({
				url:"/pages/chat/home/home",
				animationType:'zoom-fade-out'
			})
			return true
		},
		computed: {
						  ...mapState("loginModule", ["userinfo"]),
						},
		methods: {
			async gettotal(){
						let res=await this.$zxl('/getfriendapply',{id:this.userinfo.id})
						if (res.data.status==200){
							this.total=res.data.data.length
							console.log(res.data,'好友申请') 
					}else{
						this.total=0

					}
								
								},
		 async getfriend(){
				let res =await this.$zxl('/getfriend',{id:this.userinfo.id})
				if(res.data.status==200){
					this.friends=res.data.data
					console.log(res.data.data,'好友')
				}
				else{
					this.friends=[]
				}
			},
			tohaoyou(){
				uni.navigateTo({
					url:"/pages/chat/friendapply/friendapply",
					animationType:'zoom-fade-out'
				})
			},
			enterChat (uuid, type) {//进入聊天页面
				if(type === this.GoEasy.IM_SCENE.PRIVATE){
					uni.navigateTo({
						url: `/pages/chat/privateChat/privateChat?id=${uuid}`,
						animationType:'zoom-fade-out'
					});
				}
				else{
					
				}
			},
			tozhuye(id){
				uni.navigateTo({
					url:`/pages/zhuye/zhuye?id=${id}`,
					animationType:'zoom-fade-out'
				})
			},
			toIndex(index) {
				if (index == 2) {
					console.log(index)
				} 
				else{
					uni.navigateTo({
						url:"/pages/chat/home/home",
						animationType:'zoom-fade-out'
					})
				}
			},
		}
	}
</script>

<style scoped>
	.contacts{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.contacts .contacts-container{
		width: 100%;
		overflow: auto;
	}
	
	.contacts .user-list-item{
	  height: 132rpx;
	  padding-left: 32rpx;
		display: flex;
		align-items: center;
	}
	.contacts .contacts-title{
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #666666;
		background: #F3F4F7;
		text-indent: 44rpx;
	}
	
	.contacts .user-list{
		flex-grow: 1;
		background: #ffffff;
		display: flex;
		flex-direction: column;
	}
	.contacts .user-item-avatar{
	  width: 96rpx;
	  height: 96rpx;
	  margin-right: 32rpx;
		overflow: hidden;
		position: relative;
	}
	.contacts .user-item-avatar image{
		width: 100%;
		height: 100%;
		display: block;
	}
	.contacts .user-item-info{
	  	height: 130rpx;
	  	padding-right: 32rpx;
	  	line-height: 88rpx;
		flex-grow: 1;
		border-bottom: 1px solid #EFEFEF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.contacts .user-item-info__name{
	  	font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-style: normal;
		font-weight: bold;
		color: #262628;
	}
	.contacts .user-item-info__tips{
	  height: 44rpx;
	  width: 64rpx;
	  border-radius: 24rpx;
	  font-size: 26rpx;
	  line-height: 44rpx;
		background: #D02129;
		color: #ffffff;
		font-family: Cabin;
		text-align: center;
	}
	.contacts .online-dot{
	  position: absolute;
	  width: 32rpx!important;
	  height: 32rpx!important;
	  right: 0;
	  bottom: 0;
	}
</style>
