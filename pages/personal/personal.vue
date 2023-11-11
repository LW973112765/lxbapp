<template>
	<view class="personalContainer">
		<view>
			<!-- 分享示例 -->
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share></uni-popup-share>
			</uni-popup>

		</view>
		<view class="user-section">
			<image class="bg" src="/static/images/personal/12.jpg"></image>
			<view class="user-info-box" v-if="userinfo.username">
				<view class="portrait-box" @click="tomyinfo">
					<image class="portrait" :src="user.avatar"></image>
				</view>
				<view class="info-box">
					<text class="username">{{userinfo.username}}</text>
				</view>
			</view>

			<view class="user-info-box" @click="toLogin" v-else>
				<view class="portrait-box">
					<image class="portrait" src="/static/images/personal/1.png"></image>
				</view>
				<view class="info-box">
					<text class="username">游客</text>
				</view>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/images/personal/vip-card-bg.png" mode=""></image>
				<view class="tit">
					欢迎来到郎小宝APP
				</view>
				<text class="e-m" style="text-align: center;">今天也要加油哦</text>
				<text class="e-b" style="text-align: center;">今日も頑張らないと</text>
			</view>
		</view>


		<view class="cover-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
			@touchend="handleTouchEnd" :style="{transform:`${coverTransform}`,transition: `${coveTransition}`}">
			<image class="arc" src="/static/images/personal/arc.png"></image>
			<!-- 个人中心导航 -->
			<view class="nav-section">
				<view class="nav-item" hover-class="common-hover" hover-stay-time="50" @click="toquestion">
					<image src="../../static/images/personal/wenjuan.png" mode=""></image>
					<text>入站问答</text>
				</view>
				<view class="nav-item" hover-class="common-hover" hover-stay-time="50" @click="toshare">
					<image src="../../static/images/personal/fenxiang.png" mode=""></image>
					<text>分享好友</text>
				</view>
				<view class="nav-item" hover-class="common-hover" hover-stay-time="50" @click="tomessage">
					<image src="../../static/images/personal/liuyan.png" mode=""></image>
					<text>意见反馈</text>
				</view>
				<view class="nav-item" hover-class="common-hover" hover-stay-time="50" @click="tonote(userinfo.id)">
					<image src="../../static/images/personal/tongzhi.png" mode=""></image>
					<text>通知中心</text>
				</view>
			</view>
			<!-- 浏览记录 -->
			<view class="liulanjilu" v-if="jilu.length>0">
				<view class="title" @click="gotoliulaninfo">
					<image src="../../static/images/other/ll.png" mode=""></image>
					<text>浏览记录</text>
					<text class="more"> > </text>
				</view>
				<scroll-view scroll-x class="recentScroll" enable-flex>
					<view class="recentItem" v-for="(item,id) in jilu" :key="item.id"
						@click="goinfo(item.id,item.type)">
						<image class="image" :src="item.cover" v-if="item.cover" alt="888"></image>
						<image class="image" src="../../static/images/bg/18.jpg" v-else></image>
						<text>{{item.title || '郎小宝'}}</text>
						<image class="tag" v-if="item.type=='video'" src="../../static/images/fonts/sp3.png" mode="">
						</image>
						<image class="tag" v-if="item.type=='article'" src="../../static/images/fonts/wz.png" mode="">
						</image>
					</view>
				</scroll-view>
			</view>
			<!-- 收藏 -->
			<view class="liulanjilu" v-if="userinfo.username && collectlist.length>0">
				<view class="title" @click="gotocollectinfo">
					<image src="../../static/images/other/have.png" mode=""></image>
					<text>我的收藏</text>
					<text class="more"> > </text>
				</view>
				<scroll-view scroll-x class="recentScroll" enable-flex>
					<view class="recentItem" v-for="(item,id) in collectlist" :key="item.id"
						@click="goarticleinfo(item.id)">
						<image class="image" :src="item.cover" v-if="item.cover"></image>
						<image class="image" src="../../static/images/bg/18.jpg" v-else></image>
						<text>{{item.title}}</text>

					</view>
				</scroll-view>
			</view>
			<view class="other" @click="liaotian" v-if="userinfo.id">
				<view class="">
					<image src="../../static/images/chat/xx1.png" mode=""></image>
					<text class="title">聊天</text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="totranslate">
				<view class="">
					<image src="../../static/images/translate/robot.png" mode=""></image>
					<text class="title">郎小宝の机器人</text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="tokongtiao">
				<view class="">
					<image src="../../static/images/kongtiao/kt.png" mode=""></image>
					<text class="title">空调 </text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="beiwanglu" v-if="userinfo.id">
				<view class="">
					<image src="../../static/images/personal/bianqian.png" mode=""></image>
					<text class="title">备忘录</text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="jishiben" v-if="userinfo.id">
				<view class="">
					<image src="../../static/images/personal/note.png" mode=""></image>
					<text class="title">记事本</text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="suixinji">
				<view class="">
					<image src="../../static/images/other/jz.png" mode=""></image>
					<text class="title">随心记</text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="toanime">
				<view class="">
					<image src="../../static/images/personal/anime.png" mode=""></image>
					<text class="title">MY动漫 </text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="towangzhe">
				<view class="">
					<image src="../../static/images/tools/wzry.png" mode=""></image>
					<text class="title">王者荣耀 </text>
				</view>
				<text class="more"> > </text>
			</view>
			<!-- <view class="other" @click="beiwanglu">
		      <image src="../../static/my/bwl2.png" mode=""></image>
		   	  <text class="title">JS常用方法</text>
		   	  <text class="more"> > </text>
		   </view> -->
			<view class="other" @click="huaban">
				<view class="">
					<image src="../../static/images/tools/1111.png" mode=""></image>
					<text class="title">郎小宝百宝箱</text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="download">
				<view class="">
					<image src="../../static/images/other/dl1.png" mode=""></image>
					<text class="title">下载管理</text>
				</view>
				<text class="more"> > </text>
			</view>
			<view class="other" @click="exit">
				<image src="../../static/images/other/exit1.png" mode=""></image>
				<text class="title" style="color: red;">离开狼小宝</text>
			</view>
			<view class="other" @click="loginout">
				<image src="../../static/images/other/lg2.png" mode=""></image>
				<text class="title" style="color: red;" v-if="userinfo.id">退出登录</text>
				<text class="title" style="color: red;" v-if="!userinfo.id">登录</text>
			</view>

		</view>
		<u-toast ref="uToast"></u-toast>
	</view>



</template>

<script>
	import {
		mapState
	} from "vuex";
	import {
		mapMutations
	} from "vuex";
	import moment from 'moment'
	let startY = 0; // 手指起始的坐标
	let moveY = 0; // 手指移动的坐标
	let moveDistance = 0;
	export default {
		data() {
			return {
				coverTransform: 'translateY(0)',
				coveTransition: '',
				jilu: [],
				collectlist: [],
				user: ''
			};
		},
		created() {
			this.getliulanjilu()
			this.getcollectarticle(this.userinfo.id)
		},
		onShow() {
			this.getliulanjilu()
			this.getcollectarticle(this.userinfo.id)
			this.user = JSON.parse(uni.getStorageSync('username'))
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateTo({
					url: "/pages/setting/setting",
					animationType: 'zoom-fade-out'
				})
			} else {
				if (this.userinfo.username) {
					this.codelogin()
				} else {
					this.$refs.uToast.show({
						type: 'warning',
						message: "请先登录",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				}
			}
		},
		methods: {
			exit() {
				if (uni.getSystemInfoSync().platform == 'ios') {
					plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
				} else if (uni.getSystemInfoSync().platform == 'android') {
					plus.runtime.quit();
				}
			},
			codelogin() {
				uni.scanCode({
					onlyFromCamera: false,
					success: (res) => {
						this.music.zxl_saoma()
						let uuid = JSON.parse(res.result).uuid || ''
						let type = JSON.parse(res.result).type || ''
						let datalist = JSON.parse(res.result)
						// this.getcode(uuid)
						if (type == 'pclogin') {
							setTimeout(() => {
								uni.navigateTo({
									url: `/pages/codelogin/codelogin?uuid=${uuid}`,
									animationType: 'zoom-fade-out'
								})
							}, 1000)
						}
						if (type == 'friend') {
							if (datalist.id == this.userinfo.id) {
								this.$refs.uToast.show({
									type: 'warning',
									message: "不可以扫描自己的名片哦",
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
								})
							} else {
								uni.navigateTo({
									url: `/pages/zhuye/zhuye?id=${datalist.id}`,
									animationType: 'zoom-fade-out'
								})
								// uni.request({
								// 	url: 'http://60.204.219.215/api/api/getapplystatus',
								// 	data: {
								// 		myid: this.userinfo.id,
								// 		friendid: datalist.id
								// 	},
								// 	method: "GET",
								// 	header: {
								// 		'content-type': 'application/x-www-form-urlencoded'
								// 	},
								// 	success: (res) => {
								// 		console.log(res)
								// 	}
								// })
								// console.log("id不同")
							}
						}

						console.log('条码内容：' + datalist.id, datalist.name, datalist.type);
						// console.log('条码内容：' + res.result, typeof res.result, uuid);
					},
					fail: (res) => {
						this.$refs.uToast.show({
							type: 'warning',
							message: "扫码失败",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					}
				});
			},
			tokongtiao() {
				uni.navigateTo({
					url: "/pages/kongtiao/kongtiao",
					animationType: 'zoom-fade-out'
				})
			},
			totranslate() {
				uni.navigateTo({
					url: "/pages/translate/translate",
					animationType: 'zoom-fade-out'
				})
			},
			towangzhe() {
				uni.navigateTo({
					url: '/pages/heros/heros',
					animationType: 'zoom-fade-out'
				})
			},
			tomyinfo() {
				uni.navigateTo({
					url: "/pages/personinfo/personinfo",
					animationType: 'zoom-fade-out'
				})
			},
			jishiben() {
				uni.navigateTo({
					url: '/pages/jishiben/jishiben',
					animationType: 'zoom-fade-out'
				})
			},
			huaban() {
				uni.navigateTo({
					url: "/pages/huaban/index/index",
					animationType: 'zoom-fade-out'
				})
			},
			toanime() {
				uni.navigateTo({
					url: '/pages/anime/anime',
					animationType: 'zoom-fade-out'
				})
			},
			beiwanglu() {
				if (!this.userinfo.username) {
					uni.showToast({
						icon: "none",
						title: '请先登录'
					})
				} else {
					uni.navigateTo({
						url: "/pages/beiwanglu/beiwanglu",
						animationType: 'zoom-fade-out'
					})
				}
			},
			toshare() {
				this.$refs.share.open()
			},
			suixinji() {
				uni.navigateTo({
					url: "/pages/suixinji/accounts/home/home",
					animationType: 'zoom-fade-out'
				})
			},
			liaotian() {
				uni.navigateTo({
					url: "/pages/chat/home/home",
					animationType: 'zoom-fade-out'
				})
			},
			goinfo(id, type) {
				if (type == 'article') {
					uni.navigateTo({
						animationType: 'zoom-fade-out',
						url: `/pages/ArticleInfo/ArticleInfo?id=${id}`
					})
				} else {
					uni.navigateTo({
						animationType: 'zoom-fade-out',
						url: `/pages/VideoInfo/VideoInfo?id=${id}`
					})
				}
			},
			totest() {
				uni.navigateTo({
					url: ""
				})
			},
			download() {
				uni.redirectTo({
					url: '/pages/download/download',
					animationType: 'zoom-fade-out'
				})
			},
			tonote(userid) {
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/note/note?userid=${userid}`


				})
			},
			tomessage() {
				uni.navigateTo({
					url: "/pages/message/message",
					animationType: 'zoom-fade-out'
				})
			},
			toquestion() {
				uni.navigateTo({
					url: "/pages/question/question",
					animationType: 'zoom-fade-out'
				})
			},
			async getcollectarticle(userid) {
				let res = await this.$zxl('/getcollectarticle', {
					userid
				})
				if (res.data.status == 200) {
					this.collectlist = res.data.data
				} else {
					this.collectlist = []
				}
			},
			gotoliulaninfo() {
				uni.navigateTo({
					url: '/pages/Liulanjilu/Liulanjilu',
					animationType: 'zoom-fade-out'
				})
			},
			gotocollectinfo() {
				uni.navigateTo({
					url: '/pages/Collectinfo/Collectinfo',
					animationType: 'zoom-fade-out'
				})
			},
			goarticleinfo(id) {
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/ArticleInfo/ArticleInfo?id=${id}`
				})
			},
			getliulanjilu() {
				let liulan = uni.getStorageSync("liulanjilu");
				if (liulan) {
					liulan = JSON.parse(liulan);
				} else {
					liulan = []
				}
				this.jilu = liulan
			},
			handleTouchStart(event) {
				this.coveTransition = '';
				// 获取手指起始坐标
				startY = event.touches[0].clientY;
			},
			handleTouchMove(event) {
				moveY = event.touches[0].clientY;
				moveDistance = moveY - startY;
				console.log(moveDistance)
				if (moveDistance <= 0) {
					return;
				}
				if (moveDistance >= 150) {
					moveDistance = 150;
				}
				// 动态更新coverTransform的状态值
				this.coverTransform = `translateY(${moveDistance}rpx)`

			},
			handleTouchEnd() {
				console.log('end')
				this.coverTransform = `translateY(0rpx)`,
					this.coveTransition = 'transform 1s linear'

			},


			...mapMutations("loginModule", ["clearUser"]),
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/login",
					animationType: 'zoom-fade-out'
				})
			},
			loginout() {
				// console.log(this.goEasy.getConnectionStatus())
				if (this.goEasy.getConnectionStatus() === 'connected') {
					this.goEasy.disconnect()
				}
				//清空vuex数据
				this.clearUser();
				//清空本地数据
				uni.removeStorageSync("username")
				uni.removeStorageSync("loginStatus")
				//返回登录
				uni.reLaunch({
					url: "/pages/login/login",
					animationType: 'zoom-fade-out'
				})
			},
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onLoad() {
			this.user = JSON.parse(uni.getStorageSync('username'))
		},
	}
</script>

<style lang="scss" scoped>
	/* pages/personal/personal.wxss */
	page {
		background: #f5f5f5;
	}

	/* pages/personal/personal.wxss */
	.personalContainer {
		width: 100%;
		height: 100%;

	}

	.other {
		margin: 0 auto;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: whitesmoke;
		padding: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-bottom: 1px solid #ebeef5;
		align-items: center;
		font-size: 35rpx;
		color: #999;
		background: #fff;
		padding: 20rpx 40rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;

		view {
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				margin-left: 20rpx;
			}
		}

		image {
			width: 50rpx;
			height: 50rpx;
			// margin-right: -400rpx;
		}

		.title {
			text-align: left;
		}
	}

	.login {
		padding-left: 10rpx;
	}

	.liulanjilu {
		background: #fff;
		padding: 20rpx 0;
		border-radius: 15rpx;
		margin-top: 20rpx;

		.title {
			color: #999;
			padding-left: 20px;
			padding-right: 20rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;

			image {
				width: 50rpx;
				height: 50rpx;
				margin-right: -400rpx;
			}
		}
	}

	.personalContainer .user-section {
		height: 520rpx;
		position: relative;
		padding: 100rpx 30rpx 0;
	}

	.user-section .bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.7;
		filter: blur(1px);
	}


	.user-info-box {
		height: 180rpx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

	}

	.user-info-box .portrait {
		width: 130rpx;
		height: 130rpx;
		border: 5rpx solid #fff;
		border-radius: 50%;
	}

	.user-info-box .username {
		font-size: 24;
		color: #303133;
		margin-left: 20rpx;
	}

	.recentItem {
		display: inline-block;
		height: 100rpx;
	}

	/* vip-box */
	.vip-card-box {
		position: relative;
		display: flex;
		flex-direction: column;
		// background: linear-gradient(left, red, black);
		background: rgba(0, 0, 0, .7);
		height: 240rpx;
		color: #f7d680;
		border-radius: 16rpx 16rpx 0 0;
		padding: 20rpx 24rpx;
	}


	.vip-card-box .card-bg {
		position: absolute;
		top: 20rpx;
		right: 0;
		width: 380rpx;
		height: 260rpx;
	}

	.vip-card-box .b-btn {
		position: absolute;
		right: 20rpx;
		top: 16rpx;
		width: 132rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 22rpx;
		color: #36343c;
		border-radius: 20px;
		background: #f9e6af;
		z-index: 1;
	}

	.vip-card-box .b-btn {
		position: absolute;
		right: 20rpx;
		top: 16rpx;
		width: 132rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 22rpx;
		color: #36343c;
		border-radius: 20px;
		/*background: linear-gradient(left, #f9e6af, #ffd465);*/
		/*渐变不生效*/
		background: #f9e6af;
		z-index: 1;
	}

	.vip-card-box .tit {
		font-size: 40rpx;
		text-align: center;
		color: #f7d680;
		margin-bottom: 28rpx;
	}





	.vip-card-box .e-m {
		font-size: 34rpx;
		margin-top: 10rpx;
		z-index: 0;
	}

	.vip-card-box .e-b {
		font-size: 34rpx;
		color: #d8cba9;
		margin-top: 10rpx;
		z-index: 0;
	}


	.cover-container {
		margin-top: -250rpx;
		padding: 0 30rpx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20rpx;
	}

	.cover-container .arc {
		position: absolute;
		left: 0;
		top: -34rpx;
		width: 100%;
		height: 36rpx;
	}


	/* 导航部分 */
	.cover-container .nav-section {
		display: flex;
		background: #fff;
		padding: 20rpx 0;
		border-radius: 15rpx;
		margin-top: 20rpx;
	}


	.nav-section .nav-item {
		width: 25%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.nav-section .nav-item image {
		width: 50rpx;
		height: 50rpx;
	}

	.nav-section .nav-item text:last-child {
		font-size: 22rpx;

	}


	/* 个人中心列表 */
	.personalContent {
		background: #fff;
		margin-top: 20rpx;
	}

	/* 最近播放 */
	.personalContent .scrollView {
		display: flex;
		height: 160rpx;
	}

	.personalContent .recentPlay {
		display: flex;
	}

	.card-item {
		border-top: 1rpx solid #eee;
		height: 80rpx;
		line-height: 80rpx;
		padding: 10rpx;
		font-size: 26rpx;
		color: #333;
	}

	.card-item .more {
		float: right;
	}

	/* 最近播放记录 */
	.recentScroll {
		display: flex;
		height: 250rpx;
		white-space: nowrap;
	}

	.recentItem {
		position: relative;
		margin-right: 20rpx;
		margin-left: 20rpx;
	}

	.recentItem .tag {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: 5rpx;
		right: 5rpx;
	}

	.recentItem text {
		font-size: 27rpx;
		color: #999;
		display: block;
		width: 200rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.recentItem .image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}

	.nolist {
		font-size: 26rpx;
		color: #333;
		padding-left: 20rpx;
	}
</style>