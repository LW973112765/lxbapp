<template>
	<view>
		<qinglvkongjianbar @edit="edit" @navbarBtnTap="navbarBtnTapHandler"
			img="../../../static/images/choujiang/ax1.png" :title="'甜蜜时光'" :select="select" :isedit="true">
		</qinglvkongjianbar>
		<u-notice-bar v-if="isclose" text="点击开关可开启或关闭炫彩模式!!!" speed="100"
			url="/pages/componentsB/tag/tag"></u-notice-bar>
		<view v-if="videourl">
			<video vslide-gesture autoplay enable-play-gesture show-mute-btn vslide-gesture="true" id="myVideo"
				style="width: 100%;height: 400rpx;" :src="videourl" vslide-gesture-in-fullscreen controls>
			</video>

		</view>
		<swiper class="banners" indicator-dots autoplay interval="2000" circular indicator-active-color="aqua"
			indicator-color="#333" v-if="imglist.length>0">
			<swiper-item v-for="(item,index) in imglist" :key="index">
				<image :src="item" @click="yulan(index)"></image>
			</swiper-item>
		</swiper>
		<view class="author">
			<view class="left">
				<image src="http://lwandzxl.top/1687512911496.jpg" mode=""></image>
				<view class="">
					{{data.author}}
				</view>
			</view>
			<view class="right">
				{{data.time}}
			</view>
		</view>
		<view class="content" :style="style_box" :class="{'active':isshow}" v-if="!isedit">
			{{data.content}}
		</view>
		<view class="textarea_from" v-if="isedit">
			<u--form ref="uLoginForm">
				<u-form-item prop="content">
					<u--textarea v-model="content" height=160 count :maxlength="maxlength" placeholder="请输入内容"
						border="bottom"></u--textarea>
				</u-form-item>
				<view class="btn_Box">
					<button type="primary" class="submitBtn" @click="save">保存</button>
					<button type="warn" class="resetBtn" @click="cancel">取消</button>
				</view>
			</u--form>
		</view>
		<view class="total" style="position: relative;">
			<view class="totalleft">
				<text style="color:red;font-size: 40rpx;margin-right: 10rpx;">{{total}}</text>
				<text style="margin-right: 10rpx;">条评论</text>
				<text style="color:blue;font-size: 40rpx;margin-right: 10rpx;">{{dianzantotal}}</text>
				<text>个点赞</text>
			</view>
			<view class="menu" :class="{show:ismenu==true,close:ismenu==false}">
				<view class="" @click="dianzan">
					<image style="width: 50rpx;
			height:50rpx;" v-show="!isdianzan" src="../../../static/images/choujiang/zan2.png" mode=""></image>
					<image style="	width: 50rpx;
			height:50rpx;" v-show="isdianzan" src="../../../static/images/choujiang/zan44.png" mode=""></image>
					<text v-show="!isdianzan">赞</text>
					<text v-show="isdianzan">取消</text>
				</view>
				<view class="" @click="tocomment">
					<image style="	width: 40rpx;
			height:40rpx;" src="../../../static/images/choujiang/pl55.png" mode=""></image>
					<text>评论</text>
				</view>
			</view>
			<view class="totalright" @click="ismenu=!ismenu">
				<image src="../../../static/images/choujiang/cd.png" mode=""></image>
				<!-- <text>评论</text> -->
			</view>
		</view>
		<view class="">
			<view class="dianzan" v-if="dianzanlist.length>0">
				<view class="dianzanson" v-for="(item,index) in dianzanlist" :key="item.id">
					<image :src="item.avatar" mode="" @click="tozhuye(item.userid)"></image>
				</view>
			</view>
			<view class="comment" v-if="commentlist.length>0">
				<view @click="answer(item)" class="item" v-for="(item,index) in commentlist" :key="item.id">
					<view class="left">
						<image :src="item.avatar" mode=""></image>
					</view>
					<view class="right">
						<view class="shang">
							<view style="color: #747E9B;font-size: 35rpx;">{{item.sendername}}</view>
							<view style="font-size: 20rpx;color:#999999;">
								<text>{{item.time}}</text>•
								<text>{{item.address}}</text>
							</view>
						</view>
						<view class="xia">
							<text style="font-size: 30rpx;margin-right: 15rpx;" v-show="item.type">回复</text>
							<text style="color: #747E9B;font-size: 38rpx;margin-right: 15rpx;font-weight: 600;"
								v-show="item.type">{{item.answername}}</text>
							<text style="font-size: 30rpx;">{{item.content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<view style="z-index: 20;">
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" style="z-index: 20;" background-color="#fff">
				<view class="popup-contentzxl" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="center">
						<view class="item" @click="copy">
							复制
						</view>
						<view class="item" @click="delcomment">
							删除
						</view>
					</view>
					<view class="bottom" @click="close">
						取消
					</view>

				</view>
			</uni-popup>
		</view>
		<image class="bj" src="../../../static/images/choujiang/bg1.png" mode=""></image>
		<view class="footer">
			<!-- <input :focus="Focus" v-model="comment" type="text" :placeholder="placeholder" style="flex: 1;height:80rpx;border-radius: 10rpx;background-color: #ffffff;margin-right: 30rpx;"> -->
			<view class="" style="width: 540rpx;">
				<u--textarea v-model="comment" @focus="focus" :cursorSpacing="cursorSpacing" @blur="blur" :focus="Focus"
					auto-height :maxlength="maxlength" :placeholder="placeholder" border="bottom"></u--textarea>
			</view>
			<button @click="sendcomment" :class="{one:comment.trim().length>0,two:comment.trim().length==0,}"
				style="width: 150rpx;height:80rpx;text-align: center;line-height: 80rpx;">发送</button>
		</view>
		<view class="switch">
			<zero-switch @change="changebtn" style="margin-left: 25rpx;" class='inline_item' v-model="switchBtn"
				:showText="true" backgroundColorOff="#999" backgroundColorOn="#ABDCFF" activeColor='#0396FF'
				inactiveColor='#ffffff'>
			</zero-switch>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				data: [],
				id: 0,
				imglist: [],
				videourl: '',
				select: '编辑',
				isedit: false,
				maxlength: 2000,
				content: '',
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
				switchBtn: true,
				isshow: true,
				isclose: true,
				comment: '',
				answerid: null,
				typeone: 0,
				total: 0,
				dianzantotal: 0,
				commentlist: [],
				Focus: false,
				placeholder: '评论',
				isjujiao: false,
				cursorSpacing: 20,
				type: 'center',
				copycontent: '',
				delid: 0,
				ismenu: false,
				isdianzan: false,
				dianzanlist: [],
				issend: false,
				address: ''

			};
		},
		mounted() {
			setTimeout(() => {
				this.isclose = false
			}, 5000)
		},
		computed: {
			style_box() {
				let that = this;
				var style = '';
				style +=
					`background-image: -webkit-linear-gradient(left, ${that.txtColor1}, ${that.txtColor2} 10%, ${that.txtColor3} 20%, ${that.txtColor4} 30%, ${that.txtColor5} 40%, ${that.txtColor6} 50%, ${that.txtColor7} 60%, ${that.txtColor8}  70%, ${that.txtColor9} 80%, ${that.txtColor10} 90%, ${that.txtColor11});`;
				if (this.isshow) {
					return style;
				} else {
					return '';
				}
			},
			...mapState("loginModule", ["userinfo"]),

		},
		onLoad(e) {
			console.log(e.id)
			this.id = e.id
			this.getdata(e.id)
			this.getcomment(e.id)
			this.getdianzanlist(e.id)
			let result = uni.getStorageSync("shuoshuoinfoswitch");
			if (result) {
				this.switchBtn = JSON.parse(result);
				this.isshow = JSON.parse(result);

			}
		},
		created() {
			this.getisdianzan()
			this.getaddress()
		},
		watch: {
			issend() {
				console.log('发送变化')
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 2000000, //滚动到页面的目标位置（单位px）
						duration: 0 //滚动动画的时长，默认300ms，单位 ms
					});
				}, 300)
			}
		},
		methods: {

			getaddress() {
				uni.request({
					url: 'https://api.vvhan.com/api/getIpInfo',
					success: (res) => {
						let data = res.data.info
						this.address = data.prov + data.city
					}
				})
			},
			changebtn(e) {
				console.log(e)
				this.isshow = e
				uni.setStorageSync('shuoshuoinfoswitch', JSON.stringify(e))
			},
			tozhuye(id) {
				uni.navigateTo({
					url: `/pages/zhuye/zhuye?id=${id}`,
					animationType: 'zoom-fade-out'
				})
			},
			async getdianzanlist(id) {
				let res = await this.$zxl('/getdianzan', {
					shuoshuoid: this.id
				})
				console.log(res.data.total, '点赞列表')
				if (res.data.status == 200) {
					this.dianzanlist = res.data.data
					this.dianzantotal = res.data.data.length
				} else {
					this.dianzanlist = []
					this.dianzantotal = 0
				}

			},
			async getisdianzan() {
				let res = await this.$zxl('/isdianzan', {
					shuoshuoid: this.id,
					dianzanid: this.userinfo.id
				})
				// console.log(res.data.isdianzan,'点赞')	
				this.isdianzan = res.data.isdianzan
			},
			async deldianzan() {
				await this.$zxl('/deldianzan', {
					shuoshuoid: this.id,
					dianzanid: this.userinfo.id
				}, 'POST')
				this.getdianzanlist(this.id)
			},
			dianzan() {
				this.isdianzan = !this.isdianzan
				console.log(this.isdianzan)
				if (this.isdianzan) {
					this.postdianzan()
				}
				if (!this.isdianzan) {
					this.deldianzan()
				}
			},
			async postdianzan() {
				await this.$zxl('/postdianzan', {
					shuoshuoid: this.id,
					dianzanid: this.userinfo.id
				}, 'POST')
				this.getdianzanlist(this.id)
			},
			copy() {
				this.$refs.popup.close()
				uni.setClipboardData({
					data: this.copycontent,
					showToast: false,
					success: () => {
						this.$refs.uToast.show({
							type: 'success',
							message: "已复制",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
					}
				});
			},
			async delcomment() {
				this.$refs.popup.close()
				let res = await this.$zxl('/deldiandiandidicomment', {
					id: this.delid
				})
				if (res.data.status == 200) {
					this.comment = ''
					this.$refs.uToast.show({
						type: 'success',
						message: "已删除",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
					this.getcomment(this.id)
				}
			},
			close() {
				this.$refs.popup.close()
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			focus() {
				// console.log('聚焦')
				this.isjujiao = !this.isjujiao
				// this.typeone = 0
			},
			blur() {
				// console.log('失去焦点')
				this.isjujiao = !this.isjujiao
			},
			tocomment() {
				this.Focus = !this.Focus;
				uni.onKeyboardHeightChange((res) => {
					if (res.height === 0) {
						this.Focus = !this.Focus;;
					}
				})
				this.placeholder = '评论'
				this.answerid = null
				this.typeone = 0
			},
			answer(item) {
				if (item.senderid == this.userinfo.id) {
					this.toggle('bottom')
					this.copycontent = item.content
					this.delid = item.id
				} else {
					this.Focus = !this.Focus;
					uni.onKeyboardHeightChange((res) => {
						if (res.height === 0) {
							this.Focus = !this.Focus;;
						}
					})
					this.placeholder = '回复' + item.sendername
					this.answerid = item.senderid
					this.typeone = 1
				}
			},
			async getcomment(id) {
				let res = await this.$zxl('/getdiandiandidicomment', {
					articleid: id
				})
				if (res.data.status == 200) {
					console.log(res.data.data)
					res.data.data.forEach(item => {
						item.time = moment(item.time).format("YYYY年MM月DD日 HH:mm");
						item.content = this.$emojitwo(item.content)
					})
					this.commentlist = res.data.data
					this.total = res.data.total
				} else {
					this.total = 0
					this.commentlist = []
				}
			},
			async sendcomment() {
				console.log(this.comment)
				console.log('z')
				if (this.comment.trim().length > 0) {
					let res = await this.$zxl('/postdiandiandidicomment', {
						content: this.$emojione(this.comment),
						time: moment().format("YYYY-MM-DD HH:mm:ss"),
						senderid: this.userinfo.id,
						answerid: this.answerid,
						articleid: this.data.id,
						type: this.typeone,
						address: this.address
					}, 'POST')
					if (res.data.status == 200) {
						this.comment = ''
						this.$refs.uToast.show({
							type: 'success',
							message: "发表成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						this.issend = !this.issend
						this.isjujiao = !this.isjujiao
						this.getcomment(this.id)
						// this.$nextTick(()=>{
						//  uni.pageScrollTo({
						//             scrollTop: 2000000,    //滚动到页面的目标位置（单位px）
						//             duration: 0    //滚动动画的时长，默认300ms，单位 ms
						//         });
						// })
						// setTimeout(() => {
						// 	uni.pageScrollTo({
						// 		scrollTop: 2000000, //滚动到页面的目标位置（单位px）
						// 		duration: 0 //滚动动画的时长，默认300ms，单位 ms
						// 	});
						// }, 100)
					}
				}
			},
			edit() {
				console.log('保存')
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '目前只支持修改文本内容，暂不支持修改图片和视频！',
					success: (res) => {
						if (res.confirm) {
							this.select = '编辑中...'
							this.isedit = !this.isedit
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			async save() {
				console.log('编辑')
				if (this.content == this.data.content) {
					this.$refs.uToast.show({
						type: 'warning',
						message: "内容未做更改",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
				} else {
					let res = await this.$zxl('/editdiandiandidi', {
						content: this.$emojione(this.content),
						id: this.id
					}, 'POST')
					if (res.data.status == 200) {
						this.music.zxl_success()
						this.select = '编辑'
						this.isedit = !this.isedit
						this.$refs.uToast.show({
							type: 'success',
							message: "修改成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						this.getdata(this.id)
					}
				}
			},
			cancel() {
				this.select = '编辑'
				this.isedit = !this.isedit
				this.content = this.data.content
			},
			yulan(index) {
				console.log('yulan')
				uni.navigateTo({
					url: '/pages/showimgtwo/showimgtwo?imgs=' + JSON.stringify(this.imglist) + '&current=' + index,
					animationType: "fade-in",
				})
			},
			navbarBtnTapHandler() {
				uni.navigateBack({
					delta: 1
				})
			},
			async getdata(id) {
				let res = await this.$zxl('/getdiandiandidiid', {
					id,
				})
				if (res.data.status === 200) {
					res.data.data[0].time = moment(res.data.data[0].time).format(
						"YYYY-MM-DD HH:mm:ss"
					);
					res.data.data[0].content = this.$emojitwo(res.data.data[0].content)
					this.data = res.data.data[0]
					this.content = this.$emojitwo(res.data.data[0].content)
					if (res.data.data[0].url) {
						this.imglist = res.data.data[0].url.split(',')
						console.log(this.imglist, 'this.imglist')
					}
					if (res.data.data[0].videourl) {
						this.videourl = res.data.data[0].videourl
					}
				}

			},
		}
	}
</script>
<style>
	page {
		background: -webkit-linear-gradient(top, pink, #999999);
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}
</style>
<style lang="scss" scoped>
	.move {
		margin-bottom: 20rpx;
	}

	.total {
		width: 680rpx;
		margin: 40rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.totalright {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.dianzan {
		width: 680rpx;
		height: auto;
		box-sizing: border-box;
		margin: 20rpx auto;

		border-radius: 10rpx;
		background-color: #EEEEEE;
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx;
		justify-content: start;
		padding-left: 24rpx;

		.dianzanson {
			height: 75rpx;
			width: 75rpx;
			display: flex;
			padding: 10rpx;
			justify-content: start;
		}

		image {
			width: 70rpx;
			height: 70rpx;
			border-radius: 10rpx;
		}
	}

	.comment {
		width: 680rpx;
		margin: 20rpx auto;
		margin-bottom: 150rpx;
		border-radius: 10rpx;
		background-color: #EEEEEE;
		height: 500rpx;
		padding: 5rpx;
		height: auto;

		.item {
			display: flex;

		}

		.right {
			// background-color: red;
			width: 600rpx;
			height: auto;
			box-sizing: border-box;

			.shang {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
			}

			.xia {
				padding: 0 20rpx;

			}
		}

		.left {
			width: 90rpx;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 5rpx;
			}
		}
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

	.btn_Box {
		text-align: center;
	}

	.submitBtn,
	.resetBtn {

		display: inline-block;
		margin: 5px;
	}

	.textarea_from {
		margin: 15px 10px 0 10px;
		// margin: 20rpx auto;
		// width: 680rpx;
		background: #007AFF;
		border-radius: 10px;
		background-color: #EEEEEE;
		box-shadow: 0 2px 10px #9B9B9B;
		padding: 20px;

	}

	.bj {
		width: 100%;
		height: 500rpx;
		position: fixed;
		top: 50%;
		left: 0;
		z-index: -20;
	}

	.content {
		width: 680rpx;
		height: auto;
		border-radius: 15rpx;
		margin: 20rpx auto;
		background-color: white;
		padding: 20rpx;

	}

	.switch {
		position: fixed;
		right: 30rpx;
		bottom: 200rpx;
	}

	.active {
		color: transparent;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		-webkit-animation: slide1 2s infinite linear;
		animation: slide1 5s infinite linear;
	}

	@keyframes slide1 {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}
	}

	.author {
		width: 680rpx;
		height: 150rpx;
		border-radius: 15rpx;
		margin: 20rpx auto;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;

		.left {
			width: 350rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: nowrap;
			font-weight: 700;
		}

		.right {
			font-size: 30rpx;
			color: #999;
		}

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
		}
	}

	page {
		width: 100%;
		height: 100%;
		padding-bottom: 200rpx;
	}

	.banners image {
		width: 100%;
		height: 100%;
	}

	.popup-contentzxl {
		z-index: 100;
		width: 750rpx;
		box-sizing: border-box;
		height: 400rpx;
		padding: 20rpx;
		border-radius: 15rpx;
		// background: -webkit-linear-gradient(top, pink, #999999);
		background-color: #F0F0F0;

		.bottom {
			width: 650prx;
			height: 100rpx;
			line-height: 100rpx;
			margin: 20rpx auto;
			text-align: center;
			background-color: white;
		}

		.center {
			border-radius: 15rpx;
			width: 650prx;
			margin: 20rpx auto;
			height: auto;
			background-color: white;
			box-sizing: border-box;

			.item {
				width: 600prx;
				height: 100rpx;
				line-height: 100rpx;
				margin: 0 auto;
				border-bottom: 1rpx solid #999;
				text-align: center;

				.des {
					flex: 1;
					margin-left: 25rpx;
					color: #999
				}
			}
		}
	}

	.menu {
		position: absolute;
		bottom: -15rpx;
		border-radius: 10rpx;
		width: 300rpx;
		height: 100rpx;
		right: 60rpx;
		overflow: hidden;
		background: -webkit-linear-gradient(top, pink, aqua);
		display: flex;
		justify-content: space-around;
		align-items: center;

		view {
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: white
		}

	}

	.show {
		width: 300rpx;
		transition: all 0.5s;
	}

	.close {
		width: 0;
		transition: all 0.5s;
	}
</style>