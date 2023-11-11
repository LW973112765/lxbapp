<template>
	<view>
		<view class="main">
			<qinglvkongjianbar @navbarBtnTap="navbarBtnTapHandler" img="../../../static/images/choujiang/ax1.png"
				:title="'情侣空间'"></qinglvkongjianbar>
			<view class="header">
				<image :src="avatar1" mode=""></image>
				<view class="" :style="style_box">
					我们相恋了&nbsp;{{total}}&nbsp;天
				</view>
				<image :src="avatar2" mode=""></image>
			</view>
			<image class="img" src="../../../static/images/choujiang/top-bg1.png" mode=""></image>
		</view>
		<view class="heart" @click="qiandao" :style="{backgroundColor:isqiandao?'red':'grey'}">
			<view class="after" :style="{backgroundColor:isqiandao?'red':'grey'}">
			</view>
			<view class="before" :style="{backgroundColor:isqiandao?'red':'grey'}">
			</view>
		</view>
		<view class="nav-section">

			<view class="nav-item" @click="toggle('bottom')" hover-class="common-hover" hover-stay-time="50">
				<image src="../../../static/images/choujiang/sx.png" mode=""></image>
				<text>写回忆</text>
			</view>
			<view class="nav-item" @click="tojinianri" hover-class="common-hover" hover-stay-time="50">
				<image src="../../../static/images/choujiang/jnr1.png" mode=""></image>
				<text>纪念日</text>
			</view>
			<view class="nav-item" @click="tomemory" hover-class="common-hover" hover-stay-time="50">
				<image src="../../../static/images/memory/memory.png" mode=""></image>
				<text>相册</text>
			</view>
			<view class="nav-item" @click="towode" hover-class="common-hover" hover-stay-time="50">
				<image src="../../../static/images/choujiang/wode.png" mode=""></image>
				<text>我的</text>
			</view>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-contentzxl" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="zxlzxl" @click="uploadword">
						纯文字
					</view>
					<view class="zxlzxl" @click="uploadphoto">
						图片文字
					</view>
					<view class="zxlzxl" @click="uploadvideo">
						视频文字
					</view>
				</view>
			</uni-popup>
		</view>



		<view class="box1" v-if="show">
			<view class="popup-content">
				<text>恭喜您抽中了{{title}}</text>
				<image :src="img" mode=""></image>
				<button @click="close" size="mini">放入背包</button>
			</view>
		</view>
		<view class="box2" v-if="show1">
			<view class="zxl">
				<text>今日签到成功，获得一次抽奖机会</text>
				<aylottery :list="lottery_list" themeColor="#33CCCC" bgColor="#1E90FF" bg_sd_Color="#F4A460"
					@result="resultFun"
					theme_img_bg="https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg"
					:is_img_bg="true" box_shadow_Color="#F0F8FF"
					bg_img="https://cdn.pixabay.com/photo/2018/05/12/03/18/love-3392348__340.jpg"
					:stay_index="stay_index_m"></aylottery>
			</view>
		</view>
		<footerbar @toIndex="toIndex"></footerbar>
	</view>
</template>

<script>
	import moment from "moment";
	import aylottery from '@/components/ay-lottery/ay-lottery.vue';
	import menu from '@/common/show.js';
	export default {
		components: {
			aylottery
		},
		data() {
			return {
				txtColor1: '#3498db',
				txtColor2: '#f47920',
				txtColor3: '#d71345',
				txtColor4: '#f7acbc',
				txtColor5: '#ffd400',
				txtColor6: '#3498db',
				txtColor7: '#f47920',
				txtColor8: '#d71345',
				txtColor9: '#f7acbc',
				txtColor10: '#ffd400',
				txtColor11: '#3498db',
				total: 0,
				avatar1: '',
				avatar2: '',
				isqiandao: false,
				time: '',
				//抽奖
				stay_index_m: 1, //跑马灯
				lottery_list: [],
				list_r: [],
				show: false,
				show1: false,
				type: 'center',
				title: "",
				img: '',
				name: '',
				level: '',
				jefen: 0,
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
			};
		},
		computed: {
			style_box() {
				let that = this;
				var style = '';
				style +=
					`background-image: -webkit-linear-gradient(left, ${that.txtColor1}, ${that.txtColor2} 10%, ${that.txtColor3} 20%, ${that.txtColor4} 30%, ${that.txtColor5} 40%, ${that.txtColor6} 50%, ${that.txtColor7} 60%, ${that.txtColor8}  70%, ${that.txtColor9} 80%, ${that.txtColor10} 90%, ${that.txtColor11});`;
				return style;
			},
		},
		onLoad() {
			this.avatar1 = "https://api.vvhan.com/api/qt?qq=973112765"
			this.avatar2 = "https://api.vvhan.com/api/qt?qq=1197062381"
			let time = moment().format("YYYY-MM-DD");
			this.getdata(time)
			this.loadData();
			this.getjifen()
		},
		created() {
			this.getDate()
		},
		onBackPress() {
			uni.navigateTo({
				url: "/pages/personinfo/personinfo",
				animationType: 'zoom-fade-out'
			})
			return true
		},
		methods: {
			tojinianri() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/jinianri/jinianri",
					animationType: 'zoom-fade-out'
				})
			},
			towode() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/my/my",
					animationType: 'zoom-fade-out'
				})
			},
			tomemory() {
				uni.navigateTo({
					url: '/pages/qinglvkongjian/memory/memory',
					animationType: 'zoom-fade-out'
				})
			},
			uploadword() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/uploadword/uploadword",
					animationType: 'zoom-fade-out'
				})
				this.$refs.popup.close()
			},
			uploadphoto() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/uploadphoto/uploadphoto",
					animationType: 'zoom-fade-out'
				})
				this.$refs.popup.close()
			},
			uploadvideo() {
				uni.navigateTo({
					url: "/pages/qinglvkongjian/uploadvideo/uploadvideo",
					animationType: 'zoom-fade-out'
				})
				this.$refs.popup.close()
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			navbarBtnTapHandler() {
				uni.navigateTo({
					url: "/pages/personinfo/personinfo",
					animationType: 'zoom-fade-out'
				})
			},
			async addjifenjilu() {
				await this.$zxl('/addjifenjilu', {
					total: this.total * 15,
					name: '签到奖励',
					time: moment().format("YYYY-MM-DD HH:mm:ss"),
					type: 1
				}, 'POST')
			},

			async fresh() {
				await this.$zxl('/editjifen', {
					total: this.jifen
				}, 'POST')
			},
			async getjifen() {
				let res = await this.$zxl('/getjifen')
				this.jifen = res.data.data[0].total
			},
			toIndex(index) {
				if (index == 0) {
					console.log(index)
				} else if (index == 1) {
					console.log(index)
					uni.navigateTo({
						url: "/pages/qinglvkongjian/my/my",
						animationType: 'zoom-fade-out'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: "/pages/qinglvkongjian/jinianri/jinianri",
						animationType: 'zoom-fade-out'
					})
				} else {
					console.log('zxlandlw')
					uni.navigateTo({
						url: '/pages/qinglvkongjian/shuoshuo/shuoshuo',
						animationType: 'zoom-fade-out'
					})
				}
			},
			async close() {
				await this.$zxl('/addchoujiang', {
					name: this.name,
					time: moment().format("YYYY-MM-DD HH:mm:ss"),
					type: '签到抽奖',
					level: this.level
				}, 'POST')
				this.show = false
				this.show1 = false
			},
			// toggle(type) {
			// 	this.type = type
			// 	this.$refs.popup.open(type)
			// },
			getShowTxt() {
				let that = this;
				//随机获取list的值
				let num = Math.floor(Math.random() * 10); //可均衡获取0到9的随机整数
				let legth = that.lottery_list.length || 0;
				let index = num < legth ? num : (legth - 1);
				return that.lottery_list[index].name || '哈哈'
			},
			resultFun(e) {
				let that = this;
				let item = e.item;
				let list = e.list;
				this.title = item.des;
				this.img = item.img;
				this.name = item.name;
				this.level = item.level;
				// this.$api.msg_modal("抽中了" + item.name, '恭喜您')
				// uni.showToast({
				// 	icon:"none",
				// 	title:"抽中了" + item.des,
				// })
				// this.toggle('center')
				//定义下一次转的位置
				this.show = true
				that.stay_index_m = Math.round(Math.random() * (list.length - 1)); //随机数
			},
			async loadData() {
				let that = this;
				let res_home = await menu.res_home;
				let data = res_home.data;
				that.lottery_list = data.lottery_list.data;
				that.list_r = data.lottery_r_list.data;
			},
			async getdata(time) {
				let res = await this.$zxl('/getqiandao', {
					time
				})
				// console.log(res.data.isqiandao,"签到记录")
				this.isqiandao = res.data.isqiandao
			},
			async qiandao() {
				// this.jifen+=this.total*15
				// this.fresh()
				// this.addjifenjilu()
				let time = moment().format("YYYY-MM-DD");
				if (this.isqiandao) {
					uni.showToast({
						icon: "none",
						title: "您今天已签到！"
					})
				} else {
					this.isqiandao = true
					let res = await this.$zxl('/addqiandao', {
						time
					}, 'POST')
					if (res.data.status == 200) {
						this.jifen += this.total * 15
						this.fresh()
						this.addjifenjilu()
						this.show1 = true
					}
				}
			},
			getDate() {
				var date1 = +new Date();
				var beforedate = +new Date('2021-9-21 00:00:00');
				var time = (date1 - beforedate) / 1000;
				var d = Math.ceil(time / 60 / 60 / 24);
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				month = month < 10 ? '0' + month : month;
				var dates = date.getDate();
				dates = dates < 10 ? '0' + dates : dates;
				var h = date.getHours();
				h = h < 10 ? '0' + h : h;
				var m = date.getMinutes();
				m = m < 10 ? '0' + m : m;
				var s = date.getSeconds();
				s = s < 10 ? '0' + s : s;
				var arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
				var day = date.getDay();
				this.total = d
				this.time = year + '-' + month + '-' + dates
				console.log(this.time)
			}
		}
	}
</script>
<style>
	page {
		background: url("../../../static/images/bg/15.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}
</style>
<style lang="less" scoped>
	.nav-section {
		display: flex;
		justify-content: space-around;
		background: #fff;
		padding: 20rpx 0;
		border-radius: 15rpx;
		margin: 330rpx auto;
		width: 700rpx;
		height: 90rpx;
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

	.main {
		position: relative;
		width: 750rpx;
		height: 500rpx;
		background: url("../../../static/images/choujiang/top-default-image.png");
		background-repeat: no-repeat;
		background-size: contain;
		background-attachment: fixed;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
	}

	.img {
		width: 200rpx;
		height: 30rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.heart {
		background-color: pink;
		// transform: translateY(-200rpx);
		position: relative;
		margin: -200rpx auto;
		height: 50px;
		width: 50px;
		transform: rotate(-45deg);
		animation-name: beat;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}

	.after {
		// background-color: pink;
		content: "";
		border-radius: 50%;
		position: absolute;
		width: 50px;
		height: 50px;
		top: 0px;
		left: 25px;
	}

	.before {
		// background-color: pink;
		content: "";
		border-radius: 50%;
		position: absolute;
		width: 50px;
		height: 50px;
		top: -25px;
		left: 0px;
	}

	@keyframes beat {
		0% {
			transform: scale(1) rotate(-45deg);
		}

		50% {
			transform: scale(0.6) rotate(-45deg);
		}
	}

	page {
		width: 100%;
		height: 100%;

	}

	.header {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		// margin-top: 10rpx;
		padding: 10rpx 50rpx;

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}

		view {
			font-size: 40rpx;
			color: transparent;
			-webkit-background-clip: text;
			background-size: 200% 100%;
			-webkit-animation: slide1 2s infinite linear;
			animation: slide1 5s infinite linear;
		}
	}

	@keyframes slide1 {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}
	}

	.box1 {
		position: absolute;
		z-index: 100;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.box2 {
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.zxl {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;

		text {
			color: yellow;
			font-size: 35rpx;
		}
	}

	.popup-content {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px;
		width: 400rpx;
		height: 300px;

		background-color: #fff;

		text {
			color: red;
			font-size: 35rpx
		}

		image {
			width: 300rpx;
			height: 200px;
		}

		button {
			margin-top: 30rpx;
		}
	}

	.popup-contentzxl {
		z-index: 100;
		// display:  flex;
		// align-items: center;
		// flex-wrap: wrap;
		// flex-direction: column;
		// justify-content: center;
		// padding: 15px;
		width: 750rpx;
		box-sizing: border-box;
		// border-top-left-radius:30rpx;
		// border-top-right-radius:30rpx;
		height: 400rpx;
		// background-color: #fff;
		background: -webkit-linear-gradient(top, pink, #999999);

		.zxlzxl {
			width: 750rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-bottom: solid 2rpx #999;
		}
	}
</style>