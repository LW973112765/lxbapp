<template>
	<view class="indexcontainer" :class="{popupShow:popupShowLeft||popupShowRight}" @touchstart="handleTouchStart"
		@touchmove="handleTouchMove">
		<view class="top">
			<view class="header">
				<image v-if="userinfo.avatar" @longpress="tomy" @click=" topersional" :src="userinfo.avatar" mode="">
				</image>
				<image v-else @click=" topersional" src="../../static/images/other/1.png" mode="">
				</image>
				<view @click="gotosearch" class="u-nav-slot" slot="left">
					<u-icon name="search" size="24" color="black"></u-icon>
					<view class="u-demo-block">
						<view class="u-demo-block__content">
							<u-notice-bar color="#999" bgColor="transparent" :text="text4" direction="column"
								icon=""></u-notice-bar>
						</view>
					</view>
				</view>

				<image @click="toliulan" src="../../static/images/other/liul.png" mode=""></image>
			</view>
		</view>
		<view class="screen-swiper-box">
			<swiper class="lunbo" indicator-dots :autoplay="swiperautoplay" :interval="duration" circular
				indicator-active-color="aqua" indicator-color="#333" @change="change">
				<swiper-item v-for="(item, i) in tabList" :key="i" @longpress="tocoversetting">
					<view class="swiper-item">
						<template v-if="isVideo(item.url, i)">
							<image :src="item.videoImg" class="full-screen"
								style="width: 100vh; height: 300rpx;flex: 1;">
							</image>
						</template>
						<image :src="item.url" class="full-screen" style="background-color: #2C405A;flex: 1;" />
					</view>
				</swiper-item>
			</swiper>
			<cover-view v-if="!autoplay" class="swiper-video" @longpress="tocoversetting">
				<video class="MyVideo" :show-center-play-btn="false" :controls="false" :show-progress="false"
					:enable-progress-gesture="false" :show-fullscreen-btn="false" :show-play-btn="false" autoplay
					id="myVideo" :src="videoUrl" objectFit="cover" @play="playVideo()" @pause="pauseVideo()"
					@ended="closeVideo()" style="width: 100vw; height: 300rpx;">
				</video>
			</cover-view>
		</view>

		<view class="recommendContainer">
			<NavHeader title="热门文章" nav="精心为您推荐"></NavHeader>
			<scroll-view class="recommendScroll" enable-flex scroll-x>
				<view @click="toarticleinfo(item.id)" class="scrollItem" v-for="(item,index) in articlelist"
					:key="index">
					<image :src="item.cover"></image>
					<text>{{item.title}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="recommendContainer">
			<NavHeader title="郎小宝music" nav="为您专属定制"></NavHeader>
			<scroll-view class="recommendScroll" enable-flex scroll-x>
				<view @click="tomusicinfo(item.id)" class="scrollItem" v-for="(item,index) in musiclist" :key="index">
					<image :src="item.pic"></image>
					<text>{{item.title}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="recommendContainer">
			<NavHeader title="最新视频" nav="最新推荐视频"></NavHeader>
			<scroll-view class="recommendScroll" enable-flex scroll-x>
				<view @click="tovideoinfo(item.id)" class="scrollItem" v-for="(item,index) in videolist" :key="index">
					<image :src="item.cover"></image>
					<text>{{item.title}}</text>
				</view>
			</scroll-view>
		</view>
		<!-- 弹出层左边 -->
		<uni-popup @change="changeleft" ref="popupleft" background-color="#fff">
			<view class="popup-content-left" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="main">
					<h3>快捷导航菜单</h3>
					<view class="box">
						<view class="item" v-if="userinfo.id&&userinfo.type==1" @click="toqlkjindex">
							<image src="../../static/images/personal/ql.png" mode=""></image>
							<view>情侣空间</view>
						</view>
						<view class="item" v-if="userinfo.id&&userinfo.type==1" @click="toqlkj">
							<image src="../../static/images/memory/memory.png" mode=""></image>
							<view>情侣空间相册</view>
						</view>
						<view class="item" v-if="userinfo.id" @click="toersoninfo">
							<image src="../../static/images/tools/usercenter.png" mode=""></image>
							<view>用户中心</view>
						</view>
						<view class="item" @click="towangzhe">
							<image src="../../static/images/tools/wzry.png" mode=""></image>
							<view>王者荣耀</view>
						</view>
						<view class="item" @click="tosetting">
							<image src="../../static/images/tools/set.png" mode=""></image>
							<view>设置</view>
						</view>
						<view class="item" @click="tobeiwanglu">
							<image src="../../static/images/personal/bianqian.png" mode=""></image>
							<view>备忘录</view>
						</view>
						<view class="item" @click="tojishiben">
							<image src="../../static/images/personal/note.png" mode=""></image>
							<view>记事本</view>
						</view>
						<view class="item" @click="tochat" v-if="userinfo.id">
							<image src="../../static/images/chat/xx1.png" mode=""></image>
							<view>聊天</view>
						</view>

						<view class="item" @click="toboxs">
							<image src="../../static/images/tools/1111.png" mode=""></image>
							<view>郎小宝百宝箱</view>
						</view>
						<view class="item" @click="tofun">
							<image src="../../static/images/personal/anime.png" mode=""></image>
							<view>MY动漫</view>
						</view>
						<view class="item" @click="toliulanjiku">
							<image src="../../static/images/other/ll.png" mode=""></image>
							<view>浏览记录</view>
						</view>
						<view class="item" @click="tocollect">
							<image src="../../static/images/other/have.png" mode=""></image>
							<view>我的收藏</view>
						</view>
						<view class="item" @click="tokongtiao">
							<image src="../../static/images/kongtiao/kt.png" mode=""></image>
							<view>空调</view>
						</view>
						<view class="item" @click="toquestion">
							<image src="../../static/images/tools/555.png" mode=""></image>
							<view>入站问答</view>
						</view>
						<view class="item" @click="tomessage">
							<image src="../../static/images/tools/yijianfankui.png" mode=""></image>
							<view>意见反馈</view>
						</view>
						<view class="item" @click="tonote(userinfo.id)">
							<image src="../../static/images/tools/tongzhi.png" mode=""></image>
							<view>通知中心</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 弹出层右边 -->
		<uni-popup @change="changeright" ref="popupright" background-color="#fff">
			<view class="popup-content-right" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<h3>当前登录用户</h3>
				<view class="box" @click="tozxl">
					<view class="left">头像</view>
					<view class="right">
						<image style="width: 100rpx;height: 100rpx;border-radius: 10rpx;" :src="userinfo.avatar"
							mode=""></image>
					</view>
				</view>
				<view class="box">
					<view class="left">用户ID</view>
					<view class="right">
						{{userinfo.id}}
					</view>
				</view>
				<view class="box">
					<view class="left">用户名</view>
					<view class="right">
						{{userinfo.username}}
					</view>
				</view>
				<view class="box">
					<view class="left">权限</view>
					<view class="right">
						{{userinfo.type==1?'至尊用户':'普通用户'}}
					</view>
				</view>
				<view class="box">
					<view class="left">性别</view>
					<view class="right">
						{{userinfo.sex}}
					</view>
				</view>
				<view class="box">
					<view class="left">年龄</view>
					<view class="right">
						{{userinfo.age}}
					</view>
				</view>
				<view class="box">
					<view class="left">邮箱</view>
					<view class="right">
						{{userinfo.email}}
					</view>
				</view>
				<view class="box">
					<view class="left">登录地点</view>
					<view class="right">
						{{address.country}}-{{address.prov}}-{{address.city}}
					</view>
				</view>
				<view class="box">
					<view class="left">登录时间</view>
					<view class="right">
						{{address.time}}
					</view>
				</view>
				<view class="box">
					<view class="left">登录IP</view>
					<view class="right">
						{{address.ip}}
					</view>
				</view>
				<view class="box">
					<view class="left">LSP</view>
					<view class="right">
						{{address.lsp}}
					</view>
				</view>
			</view>
		</uni-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import img1 from '@/static/indexcover/image/2.jpg';
	import img2 from '@/static/indexcover/image/1.jpg';
	import {
		mapState
	} from "vuex";
	import moment from 'moment';
	moment.locale('zh-cn');
	let startX = 0; // 手指起始的X坐标
	let moveX = 0; // 手指移动的X坐标
	let startY = 0; // 手指起始的Y坐标
	let moveY = 0; // 手指移动的Y坐标
	let moveDistanceX = 0;
	let moveDistanceY = 0;
	export default {
		data() {
			return {
				info: [],
				currentIdx: 0,
				autoplay: true,
				swiperautoplay: true,
				videoContext: {},
				videoUrl: '',
				videoIndexs: [],
				tabList: [],
				coverlist: [{
						type: 'image',
						url: '/static/indexcover/image/7.jpg',
						id: 7
					},
					{
						type: 'image',
						url: '/static/indexcover/image/8.jpg',
						id: 8
					},
					{
						type: 'image',
						url: '/static/indexcover/image/9.jpg',
						id: 9
					},
					{
						type: 'image',
						url: '/static/indexcover/image/10.jpg',
						id: 10
					},

					{
						type: 'image',
						url: '/static/indexcover/image/13.jpg',
						id: 13
					},
					{
						type: 'image',
						url: '/static/indexcover/image/14.jpg',
						id: 14
					},
					{
						type: 'image',
						url: '/static/indexcover/image/15.jpg',
						id: 15
					},
					{
						type: 'image',
						url: '/static/indexcover/image/16.jpg',
						id: 16
					},
					{
						type: 'image',
						url: '/static/indexcover/image/17.jpg',
						id: 17
					},
					{
						type: 'image',
						url: '/static/indexcover/image/20.jpg',
						id: 20
					},
					{
						type: 'image',
						url: '/static/indexcover/image/21.jpg',
						id: 21
					}
				],
				type: 'center',
				popupShowLeft: false,
				popupShowRight: false,
				articlelist: [],
				musiclist: [],
				videolist: [],
				address: {},
				defaultduration: 3000,
				duration: 8000,
				videoCurrentTime: 0,
				player: '',
				text4: [
					'进击的巨人',
					'火影忍者',
					'鬼灭之刃',
					'夏日重现',
					'夏日幽灵',
					'化物语',
					'你的名字',
					'紫罗兰永恒花园',
				],
			}
		},
		watch: {
			currentIdx: {
				handler(newVal, oldVal) {
					// console.log(newVal, oldVal);
					if (this.videoIndexs.indexOf(this.currentIdx) >= 0) {
						this.autoplay = false;
						this.videoUrl = this.tabList[this.currentIdx].url;
					}
				},
				immediate: true
			}
		},
		computed: {
			...mapState("loginModule", ["userinfo"]),
		},
		onReady() {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		onShow() {
			// 获取视频的下标集合
			this.tabList.forEach((e, i) => {
				if (/\.mp4$/.test(e.url)) {
					this.videoIndexs.push(i)
				}
			})
			this.swiperautoplay = true
			this.videoContext.play();
			this.changeduration()
			// console.log(this.videoIndexs, '获取视频的下标集合')
		},
		onHide() {
			// console.log('页面隐藏')
			this.videoContext.pause();
			this.swiperautoplay = false
		},
		onPullDownRefresh() {
			this.getarticle()
			this.getmusic()
			this.getvideo()
			setTimeout(() => {
				uni.stopPullDownRefresh()
				this.$refs.uToast.show({
					type: 'success',
					message: "刷新成功！",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			}, 1500)
		},
		methods: {
			tocoversetting() {
				uni.navigateTo({
					url: '/pages/lunbotusetting/lunbotusetting',
					animationType: 'zoom-fade-out'
				})
			},
			//判断是视频还是图片，改变duration
			changeduration() {
				if (this.tabList[this.currentIdx].type == 'video') {
					this.duration = this.tabList[this.currentIdx].duration
					this.autoplay = false
					this.videoUrl = this.tabList[this.currentIdx].url

				} else {
					this.duration = 3000
				}
			},
			startPlay(url) {
				this.autoplay = false
				// this.videoUrl = url
			},
			stopPlay() {
				this.autoplay = true
			},
			isVideo(url, i) {
				if (/\.mp4$/.test(url)) {
					return true
				} else {
					return false
				}
			},
			closeVideo() {
				this.videoContext.pause();
				this.autoplay = true;
			},
			showVideo(url) {
				this.autoplay = false;
				this.videoUrl = url
				this.videoContext.play();
			},
			playVideo(e) {
				this.videoContext.play();
			},
			pauseVideo() {
				this.videoContext.pause();
			},

			change(e) {
				// console.log(e)
				this.currentIdx = e.detail.current
				this.changeduration()
			},
			swiperChange(e) {
				// console.log(e, '滑动')
				let current = e.target.current;
				// 如果不是视频类型 暂停视频
				if (this.cover[current].type == 'video') {
					// 播放视频
					this.player.play();
					this.duration = 3000
				} else {
					// 暂停视频
					this.player.pause();
				}
			},

			timeupdateTap(e) {
				// console.log(e.detail.duration, 'swiperChange 事件')
				// this.duration = e.detail.duration
				this.videoCurrentTime = e.detail.currentTime;
				// if(this.videoCurrentTime == e.detail.duration) {
				//   this.videoCurrentTime = '';
				//   this.player.pause();
				// }
			},
			tozxl() {
				uni.getSystemInfo({
					success: (res) => {
						console.log(res)
					}
				})
			},
			//快捷导航
			towangzhe() {
				uni.navigateTo({
					url: '/pages/heros/heros',
					animationType: 'zoom-fade-out'
				})
			},
			tojishiben() {
				uni.navigateTo({
					url: "/pages/jishiben/jishiben",
					animationType: 'zoom-fade-out'
				})
			},
			tobeiwanglu() {
				uni.navigateTo({
					url: "/pages/beiwanglu/beiwanglu",
					animationType: 'zoom-fade-out'
				})
			},
			toersoninfo() {
				uni.navigateTo({
					url: '/pages/personinfo/personinfo',
					animationType: 'zoom-fade-out'
				})
			},
			tofun() {
				uni.navigateTo({
					url: '/pages/anime/anime',
					animationType: 'zoom-fade-out'
				})
			},
			toboxs() {
				uni.navigateTo({
					url: '/pages/huaban/index/index',
					animationType: 'zoom-fade-out'
				})
			},
			tokongtiao() {
				uni.navigateTo({
					url: "/pages/kongtiao/kongtiao",
					animationType: 'zoom-fade-out'
				})
			},
			tocollect() {
				uni.navigateTo({
					url: '/pages/Collectinfo/Collectinfo',
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
			toliulanjiku() {
				uni.navigateTo({
					url: '/pages/Liulanjilu/Liulanjilu',
					animationType: 'zoom-fade-out'
				})
			},
			tochat() {
				uni.navigateTo({
					url: '/pages/chat/home/home',
					animationType: 'zoom-fade-out'
				})
			},
			tosetting() {
				uni.navigateTo({
					url: '/pages/setting/setting',
					animationType: 'zoom-fade-out'
				})
			},
			toqlkj() {
				uni.navigateTo({
					url: '/pages/qinglvkongjian/memory/memory',
					animationType: 'zoom-fade-out'
				})
			},
			toqlkjindex() {
				uni.navigateTo({
					url: '/pages/qinglvkongjian/home/home',
					animationType: 'zoom-fade-out'
				})
			},
			changeleft(e) {
				console.log(e, 'left')
				if (!e.show) {
					this.popupShowLeft = false
					this.isPullDown(true)
				}
			},
			changeright(e) {
				console.log(e, 'right')
				if (!e.show) {
					this.popupShowRight = false
					this.isPullDown(true)
				}
			},
			toggleleft(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupleft.open(type)
			},
			toggleright(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupright.open(type)
			},
			handleTouchStart(event) {
				// 获取手指起始坐标
				startX = event.touches[0].clientX;
				startY = event.touches[0].clientY;
			},
			handleTouchMove(event) {
				moveX = event.touches[0].clientX;
				moveY = event.touches[0].clientY;
				moveDistanceX = moveX - startX;
				moveDistanceY = Math.abs(moveY - startY);
				// console.log('X:', moveDistanceX, 'Y:', moveDistanceY)
				if (moveDistanceX >= 70 && moveDistanceY <= 30 && !this.popupShowRight) {
					this.popupShowLeft = true
					this.$refs.popupright.close()
					this.toggleleft('left')
					this.isPullDown(false);
				}
				if (moveDistanceX <= -70 && moveDistanceY <= 30 && !this.popupShowLeft) {
					this.popupShowRight = true
					this.$refs.popupleft.close()
					this.toggleright('right')
					this.isPullDown(false);
				}

			},
			isPullDown(isPull) {
				//获取当前 Webview 窗口对象
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				//根据状态值来切换禁用/开启下拉刷新
				currentWebview.setStyle({
					pullToRefresh: {
						support: isPull,
						// style: plus.os.name === 'Android' ? 'circle' : 'default',
						style: 'circle'
					}
				});
			},
			async getvideo(page) {
				let res = await this.$zxl('/getvideo', {
					page
				})
				if (res.data.status === 200) {
					this.videolist = res.data.data.splice(0, 30);
				}
			},
			toliulan() {
				uni.navigateTo({
					url: "/pages/Liulanjilu/Liulanjilu",
					animationType: 'zoom-fade-out'
				})
			},
			topersional() {
				uni.reLaunch({
					url: '/pages/personal/personal',
					animationType: 'zoom-fade-out'
				})
			},
			tomy() {
				console.log('长按')
				uni.navigateTo({
					url: "/pages/personinfo/personinfo",
					animationType: 'zoom-fade-out'
				})
			},

			gotosearch() {
				uni.navigateTo({
					url: "/pages/search/search",
					animationType: 'zoom-fade-out'
				})
			},
			toarticleinfo(id) {
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/ArticleInfo/ArticleInfo?id=${id}`

				})
			},
			tomusicinfo(id) {
				console.log(id)
				uni.navigateTo({
					animationType: 'zoom-fade-out',
					url: `/pages/musicintroduction/musicintroduction?musicId=${id}`
				})
			},
			tovideoinfo(id) {
				console.log(id)
				uni.navigateTo({
					// url:`/pages/musicintroduction/musicintroduction?musicId=${id}`
					animationType: 'zoom-fade-out',
					url: `/pages/VideoInfo/VideoInfo?id=${id}`
				})
			},
			async getarticle() {
				let zxl = await this.$zxl('/gethotlist', {
					page: 1
				})
				// console.log(zxl)
				this.articlelist = zxl.data.data
			},
			async getmusic() {
				let zxl = await this.$zxl('/getmusic', {
					page: 1
				})
				// console.log(zxl)
				this.musiclist = zxl.data.data
			}
		},
		onLoad() {
			this.getarticle()
			this.getmusic()
			this.getvideo()
			let data = uni.getStorageSync('lwandzxladdress')
			let address = JSON.parse(data)
			address.time = moment(address.time).format('lll')
			this.address = address
			let cover = uni.getStorageSync('indexluoboto')
			if (cover) {
				this.tabList = JSON.parse(cover)
			} else {
				this.tabList = this.coverlist
			}
			console.log(address, 'address')
		},
		mounted() {
			this.player = uni.createVideoContext('video')
			this.currentIdx = 0
			this.changeduration()
			setTimeout(() => {
				this.getarticle()
				this.getmusic()
				this.getvideo()
			}, 2000)
		}
	}
</script>

<style lang="scss" scoped>
	.popupShow {
		overflow: hidden;
		position: fixed;
	}

	.popup-content-right {
		padding: 15px;
		height: 100%;
		width: 400rpx;
		background: -webkit-linear-gradient(top, #0199fe, yellow);

		h3 {
			margin-top: 30rpx;
			margin-bottom: 10rpx;


		}

		.box {
			width: 400rpx;
			margin: 0 auto;
			margin-bottom: 20rpx;
			background-color: whitesmoke;
			height: auto;
			padding: 10rpx;
			display: flex;
			box-sizing: border-box;
			justify-content: space-around;
			border-radius: 10rpx;
			// border-bottom: solid 1rpx #999;
			align-items: center;

			.left {
				width: 40%;
				height: 50rpx;
				box-sizing: border-box;
				padding: 0 5rpx;
				text-align-last: justify;
			}

			.right {
				width: 60%;
				box-sizing: border-box;
				text-align: center;
				// padding: 5rpx 5rpx;
				// // background-color: red;
				height: auto;
				display: flex;
				justify-content: center;
				align-items: center;
				word-wrap: break-word;
				word-break: break-all;
			}
		}

	}

	.popup-content-left {
		padding: 15px;
		height: 100%;
		width: 400rpx;
		background: -webkit-linear-gradient(top, white, #999999);

		.main {
			height: 90%;
			width: 400rpx;
			overflow: auto;
		}

		.item {
			height: 100rpx;
			width: 400rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				flex: 1;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		image {
			width: 80rpx;
			height: 80rpx;
		}

		h3 {
			margin-top: 30rpx;
			margin-bottom: 10rpx;


		}
	}

	.top {
		// margin-top: -50rpx;
		width: 750rpx;
		height: 200rpx;
		padding-top: 100rpx;
		box-sizing: border-box;

		background: url("../../static/images/bg/10.jpg");
		background-repeat: no-repeat;
		background-position: center;
	}

	.header {
		padding: 50rpx 50rpx;
		box-sizing: border-box;
		// margin-top: 100rpx;
		width: 750rpx;
		height: 100rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: center;
		// background:url("../../static/images/bg/10.jpg");
		// background-repeat: no-repeat;
		// background-position: center;
		// background-attachment: fixed;


		image {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}

		.u-nav-slot {
			flex: 1;
		}
	}

	.u-nav-slot {
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		// margin-top: 200rpx;
		justify-content: space-between;
		border: 1.4px;
		border-color: darkgrey;
		height: 50rpx;
		border-style: solid;
		border-radius: 20px;
		background-color: transprent;
		padding: 3px 3px;
		width: 350rpx
	}

	.u-demo-block__content {
		@include flex(column);

		width: 480rpx;
	}

	.u-demo-block__content1 {
		@include flex(column);
		margin: 0px 12px;
		width: 680rpx;
		bgColor: white;
	}

	/* pages/insex/index.wxss */
	.indexcontainer {
		width: 100%;
		height: auto;
	}

	.banners image,
	video {
		width: 100%;
		position: absolute;
		height: 100%;
	}

	.navcontainer {
		display: flex;

	}

	.navitem {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 20%;
	}

	.navitem .iconfont {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 100rpx;
		background: rgb(240, 19, 19);
		font-size: 50rpx;
		color: #fff;
		margin: 20rpx 20rpx;
	}

	.navitem text {
		font-size: 26rpx;
	}

	.recommendContainer {
		padding: 5rpx 20rpx;
		margin-bottom: 20rpx;
		// background-color: #999;
		background: -webkit-linear-gradient(top, pink, #999999);
	}


	.scrollItem {
		width: 200rpx;
		display: inline-block;
		margin-right: 20rpx;
	}

	.scrollItem image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}

	.recommendScroll {
		display: flex;
		white-space: nowrap;
		// height: 280rpx;
		height: 280rpx;
	}

	.scrollItem text {
		font-size: 26rpx;
		/* 单行文本溢出隐藏 省略号代替 */
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		/* 多行文本溢出隐藏 省略号代替*/
		// overflow: hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-box-orient: vertical; /*设置对其模式*/
		// -webkit-line-clamp: 2; /*设置多行的行数*/
	}

	/* 排行榜 */
	.topList {
		padding: 20rpx;
		margin-top: -15rpx;
	}

	.topListSwiper {
		height: 400rpx;
	}

	.swiperItem {
		width: 96%;
		background: #fbfbfb;
	}

	.swiperItem .title {
		font-size: 30rpx;
		line-height: 80rpx;

	}

	.musicItem {
		/* 当一个元素设置为flex，其子元素会自动成为block元素*/
		display: flex;
		margin-bottom: 20rpx;
	}

	.musicItem image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 6rpx;
	}

	.musicItem .count {
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
	}

	.musicItem .musicName {
		height: 100rpx;
		line-height: 100rpx;
		max-width: 400rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.screen-swiper-box {
		background-color: #f60;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 300rpx;
	}

	.swiper-item {
		flex: 1;
		flex-direction: column;
		height: 300rpx;
	}

	.MyVideo {
		width: 750px;
		height: 300rpx;
		position: fixed;
		z-index: 999;
		left: 0;
		right: 0;
		bottom: 0;
		top: 200rpx;
	}

	.full-screen {
		width: 750rpx;
		height: 300rpx;
	}

	.video-close {
		height: 60rpx;
		width: 60rpx;
		position: absolute;
		right: -1rpx;
		z-index: 99999;
		bottom: 100rpx;
		right: 50rpx;
		opacity: 0.5;
	}

	.lunbo {
		width: 750rpx;
		height: 300rpx;
		background: #19ff4e;
		display: flex;
		flex: 1;
	}

	.chang-class {
		opacity: 0.2;
	}
</style>