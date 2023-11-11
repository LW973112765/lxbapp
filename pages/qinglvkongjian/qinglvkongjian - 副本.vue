<template>
	<view>
		<view class="header">
			<image :src="avatar1" mode=""></image>
			<view class="" :style="style_box" >
				我们相恋了&nbsp;{{total}}&nbsp;天
			</view>
			<image :src="avatar2" mode=""></image>
		</view>
		<view class="heart" @click="qiandao" :style="{backgroundColor:isqiandao?'red':'grey'}">
			<view class="after" :style="{backgroundColor:isqiandao?'red':'grey'}">
			</view>
			<view class="before" :style="{backgroundColor:isqiandao?'red':'grey'}">
			</view>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" >
				<view class="popup-content" style="z-index: 100;">
					<text>恭喜您抽中了{{title}}</text>
					<image :src="img" mode=""></image>
				</view>
			</uni-popup>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="zxl" background-color="#fff" >
				<aylottery  v-if="show" :list="lottery_list" themeColor="#33CCCC"
				bgColor="#1E90FF" 
				bg_sd_Color="#F4A460" 
				@result="resultFun"
				 theme_img_bg="https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg" 
				 :is_img_bg="true" 
				 box_shadow_Color="#F0F8FF" 
				 bg_img="https://cdn.pixabay.com/photo/2018/05/12/03/18/love-3392348__340.jpg"
				 :stay_index="stay_index_m"></aylottery>
			</uni-popup>
		</view>
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
				txtColor1:  '#3498db',
				txtColor2:  '#f47920', 
				txtColor3:  '#d71345', 
				txtColor4:  '#f7acbc', 
				txtColor5:  '#ffd400', 
				txtColor6:  '#3498db', 
				txtColor7:  '#f47920', 
				txtColor8:  '#d71345', 
				txtColor9:  '#f7acbc', 
				txtColor10:  '#ffd400', 
				txtColor11:  '#3498db', 
				total:0,
				avatar1:'',
				avatar2:'',
				isqiandao:false,
				time:'',
				//抽奖
				stay_index_m : 1 ,//跑马灯
				lottery_list: [],
				list_r: [],
				show:true,
				type: 'center',
				title:"",
				img:''
			};
		},
		computed:{
			style_box() {
				let that = this;
				var style = '';
				style += `background-image: -webkit-linear-gradient(left, ${that.txtColor1}, ${that.txtColor2} 10%, ${that.txtColor3} 20%, ${that.txtColor4} 30%, ${that.txtColor5} 40%, ${that.txtColor6} 50%, ${that.txtColor7} 60%, ${that.txtColor8}  70%, ${that.txtColor9} 80%, ${that.txtColor10} 90%, ${that.txtColor11});`;
				return style;
			},
		},
		onLoad() {
			this.avatar1="https://api.vvhan.com/api/qt?qq=973112765"
			this.avatar2="https://api.vvhan.com/api/qt?qq=1197062381"
			let time = moment().format("YYYY-MM-DD");
			this.getdata(time)
				this.loadData();
		},
		created() {
			this.getDate()
		},
		methods:{
			toggle(type) {
				this.type = type
				this.$refs.popup.open(type)
			},
			togglezxl(type) {
				this.type = type
				this.$refs.zxl.open(type)
			},
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
				this.title=item.des;
				this.img=item.img
				// this.$api.msg_modal("抽中了" + item.name, '恭喜您')
				// uni.showToast({
				// 	icon:"none",
				// 	title:"抽中了" + item.des,
				// })
				this.toggle('center')
				//定义下一次转的位置
				that.stay_index_m = Math.round(Math.random() * (list.length - 1)); //随机数
			},
			async loadData() {
				let that = this;
				let res_home = await menu.res_home;
				let data = res_home.data;
				that.lottery_list = data.lottery_list.data;
				that.list_r = data.lottery_r_list.data;	
			},
			async getdata(time){
			let res= await this.$zxl('/getqiandao',{time})
			// console.log(res.data.isqiandao,"签到记录")
			this.isqiandao=res.data.isqiandao
			},
			async qiandao(){
				let time = moment().format("YYYY-MM-DD");
			    if(this.isqiandao){
					uni.showToast({
						icon:"none",
						title:"您今天已签到！"
					})
				}
				else{
					this.isqiandao=true
					let res=await this.$zxl('/addqiandao',{time},'POST')
					if(res.data.status==200){
						uni.showToast({
							icon:"none",
							title:"签到成功！"
						})
						this.togglezxl('center')
						
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
						 month = month< 10 ? '0' + month : month;
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
			            this.total= d
						this.time=year+'-'+month+'-'+dates
						console.log(this.time)
			        }
		}
	}
</script>
<style>
	page {
		background:url("../../static/images/bg/15.jpg");
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
<style lang="scss" scoped>
	  .heart {
	    // background-color: pink;
		margin: 0 auto;
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
	page{
		width: 100%;
		height: 100%;
		
	}
.header{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	padding: 50rpx 50rpx;
	image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	view{
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
	.popup-content {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		padding: 15px;
		width: 400rpx;
		height: 250px;
		
		background-color: #fff;
		text{
			color:red;
			font-size: 35rpx
		}
		image{
			width: 200rpx;
			height: 200px;
		}
	}
</style>
