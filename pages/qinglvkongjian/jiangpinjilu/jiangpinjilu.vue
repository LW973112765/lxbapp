<template>
	<view class="main">
		<view class="other"  v-for="(item,id) in data" :key="id">
			<view class="top">
				<image v-if="item.name=='玫瑰花'"  src="../../../static/images/choujiang/1.jpg" mode=""></image>
				<image v-if="item.name=='棒棒糖'"  src="../../../static/images/choujiang/2.jpg" ode=""></image>
				<image v-if="item.name=='冰淇淋'"  src="../../../static/images/choujiang/3.jpg" mode=""></image>
				<image v-if="item.name=='迈凯伦'"  src="../../../static/images/choujiang/4.jpg" mode=""></image>
				<image v-if="item.name=='老公'"  src="../../../static/images/choujiang/5.jpg" mode=""></image>
				<image v-if="item.name=='草莓'"  src="../../../static/images/choujiang/6.jpg" mode=""></image>
				<image v-if="item.name=='菠萝蜜'"  src="../../../static/images/choujiang/7.jpg" mode=""></image>
				<image v-if="item.name=='老婆'"  src="../../../static/images/choujiang/8.jpg" mode=""></image>
				<image  v-if="item.name=='钻石'"  src="../../../static/images/choujiang/9.jpg" mode=""></image>
				<image  v-if="item.name=='金戒'"  src="../../../static/images/choujiang/10.jpg" mode=""></image>
				<image  v-if="item.name=='海洋之心I'"  src="../../../static/images/choujiang/11.jpg" mode=""></image>
				<image  v-if="item.name=='海洋之心II'"  src="../../../static/images/choujiang/12.jpg" mode=""></image>
			   <view class="title">{{item.name}}&nbsp;X&nbsp;1</view>
			</view>
			
			<view class="buttom">
				<text>{{item.time}}通过</text>
				<!-- <text :style="{color:item.type=='普通抽奖'?'green':'red'}">{{item.type}}</text> -->
				<text :class="{green:item.type=='普通抽奖',red:item.type=='签到抽奖',blue:item.type=='积分兑换'}">{{item.type}}</text>
				<text>获得</text>
			</view>
			
			
		</view>
		<wyb-pagination :total-items="total" :current="currentPage" :page-items="pageSize" @change="changePage"/></view>
	</view>
</template>

<script>
	import moment from "moment";
	import wybPagination from '@/components/wyb-pagination/wyb-pagination.vue'
	export default {
		components: {
		    wybPagination
		},
		data() {
			return {
				data:[],
				total: 0,
				pageSize: 8,
				currentPage: 1,
			};
		},
		
	created() {
		this.getdata(1)
	},
	methods:{
		changePage(num) {
			console.log(num,'收到')
		  this.getdata(num.current);
		},
		async getdata(page){
			let res = await this.$zxl('/getchoujiang',{page})
			 this.currentPage = page;
			if(res.data.status==200){
				res.data.data.forEach((data) => {
				  data.time= moment(data.time).format(
				    "YYYY-MM-DD HH:mm:ss"
				  );
				});
					console.log(res.data.data,'数据')
				this.data=res.data.data;
				this.total = res.data.total;
				this.pageSize = res.data.pageSize;
			}
		}
	}
	}
</script>

<style lang="scss" scoped>
	.green{
		color:green
	}
	.red{
		color:red
	}
	.blue{
		color:blue
	}
	.main{
		width: 100%;
		height: auto;
		padding-top: 30rpx;
	}
	.other{
				margin: 0 auto;
				box-sizing: border-box;
				width: 100%;
				height: 150rpx;
				margin-bottom: 30rpx;
				background-color: whitesmoke;
				padding: 20rpx;
				border-bottom: 1px solid #ebeef5;
				.top{
					width: 400rpx;
					height: 60rpx;
					margin-bottom: 20rpx;
							display: flex;
							flex-wrap: nowrap;
							justify-content: space-between;
							align-items: center;
							view{
								width: 200rpx;
								text-align: left;
								// background-color: red;
							}
							.title{
								width:300rpx;
							}
				}
						image{
							width: 50rpx;
							height: 50rpx;
							border-radius: 50%;
						}
					
	}
// .other{
// 		margin: 0 auto;
// 		box-sizing: border-box;
// 		width: 100%;
// 		height: 200rpx;
// 		margin-bottom: 30rpx;
// 		background-color: whitesmoke;
// 		padding: 20rpx;
// 		display: flex;
// 		flex-wrap: nowrap;
// 		justify-content: space-between;
// 		border-bottom: 1px solid #ebeef5;
// 		align-items: center;
// 		font-size: 35rpx;
// 		color:#999;
// 		background: #fff;
// 		padding: 20rpx 40rpx;
// 		border-radius: 15rpx;
// 		margin-top: 20rpx;
// 		image{
// 			width: 50rpx;
// 			height: 50rpx;
// 			border-radius: 50%;
// 			margin-right: -400rpx;
// 		}
// 	}
	
</style>
