<template>
	<view>
		<view class="box1" v-if="show">
			<view class="popup-content" >
				<text>恭喜您抽中了{{title}}</text>
				<image :src="img" mode=""></image>
				<button @click="close" size="mini">放入背包</button>
				</view>
		</view>
		<view class="box2" >
			<view class="zxl">
				<aylottery  :list="lottery_list" themeColor="#33CCCC"
				bgColor="#1E90FF" 
				bg_sd_Color="#F4A460" 
				@result="resultFun"
				 theme_img_bg="https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg" 
				 :is_img_bg="true" 
				 box_shadow_Color="#F0F8FF" 
				 bg_img="https://cdn.pixabay.com/photo/2018/05/12/03/18/love-3392348__340.jpg"
				 :stay_index="stay_index_m"></aylottery>
			</view>
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
				time:'',
				//抽奖
				stay_index_m : 1 ,//跑马灯
				lottery_list: [],
				list_r: [],
				show:false,
				type: 'center',
				title:"",
				img:'',
				name:'',
				level:""
			};
		},

		onLoad() {
				this.loadData();
		},
		created() {
		
		},
	
		methods:{
	
			async close(){
				await this.$zxl('/addchoujiang',{
					name:this.name,
					time:moment().format("YYYY-MM-DD HH:mm:ss"),
					type:'普通抽奖',
					level:this.level
				},'POST')
				this.show=false

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
				this.title=item.des;
				this.img=item.img;
				this.name=item.name;
				this.level=item.level;
				this.show=true
				that.stay_index_m = Math.round(Math.random() * (list.length - 1)); //随机数
			},
			async loadData() {
				let that = this;
				let res_home = await menu.res_home;
				let data = res_home.data;
				that.lottery_list = data.lottery_list.data;
				that.list_r = data.lottery_r_list.data;	
			},

		}
	}
</script>
<style>
	page {
		background:url("../../../static/images/bg/15.jpg");
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
<style lang="scss" scoped>
	
	page{
		width: 100%;
		height: 100%;
		
	}

	.box1{
		position: absolute;
		z-index: 100;
		top:0;
		left:0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.5);
	}
	.box2{
		position: absolute;
		z-index: 10;
		top:0;
		left:0;
		right: 0;
		bottom: 0;
	}
	.zxl{
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		text{
			color:yellow;
			font-size: 35rpx;
		}
	}
	.popup-content {
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px;
		width: 400rpx;
		height: 300px;
		
		background-color: #fff;
		text{
			color:red;
			font-size: 35rpx
		}
		image{
			width: 300rpx;
			height: 200px;
		}
		button{
			margin-top: 30rpx;
		}
	}
</style>
