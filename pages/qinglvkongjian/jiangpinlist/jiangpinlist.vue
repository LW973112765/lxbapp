<template>
	<view>
		<view class="main">
			<view class="box" v-for="(item,id) in data" :key="id">
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='玫瑰花'"  src="../../../static/images/choujiang/1.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='棒棒糖'"  src="../../../static/images/choujiang/2.jpg" ode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='冰淇淋'"  src="../../../static/images/choujiang/3.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='迈凯伦'"  src="../../../static/images/choujiang/4.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='老公'"  src="../../../static/images/choujiang/5.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='草莓'"  src="../../../static/images/choujiang/6.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='菠萝蜜'"  src="../../../static/images/choujiang/7.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='老婆'"  src="../../../static/images/choujiang/8.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='钻石'"  src="../../../static/images/choujiang/9.jpg" mode=""></image>	
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='金戒'"  src="../../../static/images/choujiang/10.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='海洋之心I'"  src="../../../static/images/choujiang/11.jpg" mode=""></image>
				<image :class="{green:item.level==1,red:item.level==2,blue:item.level==3}" v-if="item.name=='海洋之心II'"  src="../../../static/images/choujiang/12.jpg" mode=""></image>
				<text class="zxl" :style="style_box">{{item.name}}</text>
				<text>X{{item.total}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
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
			this.getdata()
		},
		methods:{
			async getdata(){
				let res = await this.$zxl('/getchoujianggroup')
				if(res.data.status==200){
					console.log(res.data.data,'数据')
					this.data=res.data.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.green{
		border: #999 8rpx solid;
	}
	.red{
		border: #9932CC 8rpx solid;
	}
	.blue{
		border: #FFD700 8rpx solid;
	}
	.zxl{
		color: transparent;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		-webkit-animation: slide1 2s infinite linear;
		animation: slide1 5s infinite linear;
		  white-space: nowrap;
	}
	@keyframes slide1 {
		0% {
			background-position: 0 0;
		}
	
		100% {
			background-position: -100% 0;
		}
	}
.main{
	width: 750rpx;
	height: 220rpx;
	// background-color: red;
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
	
	.box{
		width: 180rpx;
		height: 220rpx;
		// background-color: red;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		image{
			border-radius: 10rpx;
			width: 100rpx;
			height: 100rpx;
		}
	}
}
</style>
