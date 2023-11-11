<template>
	<view>
		<qinglvkongjianbar @navbarBtnTap="navbarBtnTapHandler" img="../../../static/images/choujiang/ax1.png" :title="'纪念日'"></qinglvkongjianbar>
		 <option-list 
		 class="main"
		        :itemHeight="itemHeight"
		        :list="list"
		        :threshold="threshold"
		        @edit="edit"
				@del="del"
				:options="options"
		        >
		            <template slot-scope="{item ,index}">
		                <!-- <view class="item" :style="{ backgroundColor: buttons[index].color }"> -->
		                <view class="item" >
							<image v-show="item.isyear" class="tixin" src="../../../static/images/choujiang/tx2.png" mode=""></image>
							<view class="bj">
								<view class="left"  :style="{ backgroundColor: item.color}">
									
								</view>
								<view class="right" :style="{ backgroundColor: item.color }">
									
								</view>
							</view>
		                   <view class="leftzxl" :style="{ color: item.color}">
		                   	{{item.title}}
		                   </view>
						   <view class="rightzxl"  :style="{ color: item.color }">
						   	<text style="font-size: 30rpx;">{{gettime(item)}}</text>
						   	<text v-show="item.islunar" style="font-size: 30rpx;">{{gettimetwo(item)}}</text>
							<text>{{getword(item)}}</text>
						   </view>
		                </view>
		            </template>
		    </option-list>
		<footerbar  style="z-index: 0;"   @toIndex="toIndex"></footerbar>
		<view class="add" @click="toggle('bottom')">
			<view class="">
				<image src="../../../static/images/choujiang/jnr33.png" mode=""></image>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		
		<view  style="z-index: 20;" >
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" style="z-index: 20;"  background-color="#fff" >
				<view class="popup-contentzxl" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				  <view class="top">
				  	<text style="color: red;"></text>
					<image @click="close" style="width: 50rpx;height: 50rpx;" src="../../../static/images/choujiang/gb.png" mode=""></image>
				  </view>
				  <view class="center">
				  	<view class="item">
				  		<text>纪念描述</text>
						<input placeholder="一个特别的日子◕‿◕" maxlength="15" :cursorSpacing="cursorSpacing" class="des" :class="{focus:focus==true}" @focus="focus=true" @blur="focus=false" type="text" v-model="title">
				  	     <zero-switch v-show="0"  style="margin-left: 25rpx;" class='inline_item' :showText="true" backgroundColorOff="#999" backgroundColorOn="#ABDCFF" activeColor='#0396FF' inactiveColor='#ffffff'>
				  	     </zero-switch>
					</view>
					<view class="item" >
						<text>纪念日期</text>
						<text class="des"><leeDatetime @change="bindLeeDateTimeChange" placeholder="请选择日期时间" :value="time"></leeDatetime></text>
						<image style="width: 50rpx;height: 50rpx;" src="../../../static/images/choujiang/jt.png" mode=""></image>
					</view>
					<view class="item">
						<text>每年提醒</text>
						<text class="des" v-show="!isyear">关闭</text>
						<text class="des" v-show="isyear">开启</text>
						<zero-switch @change="changeyear" style="margin-left: 25rpx;" class='inline_item' v-model="switchyear" :showText="true" backgroundColorOff="#999" backgroundColorOn="#ABDCFF" activeColor='#0396FF' inactiveColor='#ffffff'>
						</zero-switch>
					</view>
					<view class="item">
						<text>是否农历</text>
						<text class="des" v-show="!islunar">阳历日期</text>
						<text class="des" v-show="islunar">农历日期</text>
						<zero-switch @change="changelunar" style="margin-left: 25rpx;" class='inline_item' v-model="switchlunar" :showText="true" backgroundColorOff="#999" backgroundColorOn="#ABDCFF" activeColor='#0396FF' inactiveColor='#ffffff'>
						</zero-switch>
					</view>
				  </view>
				  <view class="buttom">
				  	<button style="border: #ff7593 solid 1rpx; color: #ff7593;" @click="close">取消</button>
				  	<button v-if="!isedit" style="background-color: #ff7593; color:white" @click="send">添加</button>
				  	<button v-else style="background-color: #ff7593; color:white" @click="saveedit">保存</button>
				  </view>
				</view>
			</uni-popup>
		</view>
		<view class="load2"><zero-loading class="load2" position="absolute" v-if="isload"></zero-loading></view>
	</view>
</template>

<script>
	import moment from 'moment';
	import lunar from 'lunar';
	moment.locale('zh-cn'); 
	export default {
		data() {
			return {
				type: 'center',
				focus:false,
				title:'',
				switchyear: false,
				switchlunar: false,
				isyear:0,
				islunar:0,
				cursorSpacing:20,
				time:"",
				list: [],
				buttons:[],
				width:'',
				n:1,
				editid:0,
				isedit:false,
				 isload: false,
				colors: [
				                        '#84C1FF', 'darkgrey', 'grey', '#28FF28', '#4F9D9D',
				                        '#C07AB8', '#AFAF61', '#B9B9FF', '#F1E1FF', '#02C874',
				                        '#5B5B00', '#AD5A5A', '#D1E9E9', '#336666', '#EBD3E8',
				                    ],
				itemHeight: 180, //默认高度120rpx
				threshold: 50,
				total:0,
				options: [//左滑的操作列表
				                    {
				                        color: '#ffffff',
				                        bgColor: '#409EFF',
				                        text: '编辑',
				                        width: 120,
				                    },
				                    {
				                        color: '#ffffff', //字体颜色，非必须，默认 #ffffff
				                        bgColor: '#FF4058', //背景颜色，非必须，默认 #409EFF
				                        text: '删除', //展示文字
				                        width: 120, //按钮宽度 默认120rpx 适合两个字的宽度 这个宽度按需调整
				                    }
				                ],
			};
		},
		onBackPress() {
			uni.navigateTo({
				url:"/pages/qinglvkongjian/home/home",
				animationType:'zoom-fade-out'
			})
			return true
		},
		onReachBottom() {
		            if (this.list.length >= this.total) {
		            uni.showToast({
		                 			title:"已经到底啦😊😊～",
		                 			position:"top",
		                 			icon:"error",
		                 			duration: 1000,
		                 		})
		            } else {
						   this.isload=true
		            setTimeout(()=>{
						  this.loadmore()
						  this.isload=false
					  },1500)
		            }
					 
		
		        },
		onLoad() {
			this.getjinian(1)
			
		},
	
		methods:{
		
			loadmore() {
			  this.n++;
			  this.getjinian(this.n);
			},
			getwidth(){
				return '50%';
			},
			getword(item){
				
				let result = this.$compare(moment().format('YYYY-MM-DD hh:mm:ss'),moment(item.time).format('YYYY-MM-DD hh:mm:ss'))
				 console.log(result,'时间比较')
				let y=moment(item.time).format('YYYY-MM-DD')
				if(moment(item.time).format("MM-DD")==moment().format("MM-DD")){
					return '就在今天';
				}
				else{
					if(item.isyear){
						//同一年，日期不同
						  if(moment(item.time).format("YYYY")==moment().format("YYYY")){
							  //日期小于当前
							  if(result){
								  console.log('同一年，日期小于当前')
								 	let z=moment(item.time).add(1, 'years').calendar()
								    return moment(z).startOf('hour').fromNow(); 
							  }
							    //日期大于当前
							  else{
								    console.log('同一年，日期大于于当前')
								 let z=this.$time(moment().format('YYYY-MM-DD hh:mm:ss'),moment(item.time).format('YYYY-MM-DD hh:mm:ss'))
								 if(result){
								 	return z+'前'
								 }
								 else{
								 	return z+'后'
								 }
							  }
						  }
						    //年份大于当前
						  else if(moment(item.time).format("YYYY")>moment().format("YYYY")){
							  console.log('年份大于当前')
							  // let z=moment(item.time).startOf('hour').fromNow()
							  // return z;
							  let z=this.$time(moment().format('YYYY-MM-DD hh:mm:ss'),moment(item.time).format('YYYY-MM-DD hh:mm:ss'))
							  return z+'后'
						  }
						   //年份小于当前
						   else{
							   	//日期小于当前
								// let zxl=moment().format("YYYY")-moment(item.time).format("YYYY")+1
								// let lw=moment(item.time).add(zxl, 'years').calendar()
								// let resultzxl = this.$compare(moment().format('YYYY-MM-DD hh:mm:ss'),moment(lw).format('YYYY-MM-DD hh:mm:ss'))
								//日期大于当前
								// let x=moment().format("YYYY")-moment(item.time).format("YYYY")
								// let y=moment(item.time).add(x, 'years').calendar()
								// let resultlw = this.$compare(moment().format('YYYY-MM-DD hh:mm:ss'),moment().format('YYYY-MM-DD hh:mm:ss'))
								let m=moment(item.time).format('M')
								let d=moment(item.time).format('D')
								let M=moment().format('M')
								let D=moment().format('D')
								let YYYY=moment(item.time).format('YYYY')//计算时间的年份
								let MM=moment(item.time).format('MM')//计算时间的月份
								let DD=moment(item.time).format('DD')//计算时间的天数
								let yyyy=moment().format('YYYY')//当前时间的年份
								let cha=yyyy*1-YYYY*1
								// console.log(cha,'相差')
								
								if((m*1000+d*1)<(M*1000+D*1)){
									 console.log('年份小于当前，日期小于当前')
									 let zxlyear=YYYY*1+cha+1
									 let year=zxlyear+'-'+MM+'-'+DD
									 console.log(year,'520')
									let z=this.$time(moment().format('YYYY-MM-DD hh:mm:ss'),moment(year).format('YYYY-MM-DD hh:mm:ss'))
									return z+'后'
								}
									//日期大于当前
								else{
									console.log('年份小于当前，日期大于当前')
									let lwyear=YYYY*1+cha
									let Year=lwyear+'-'+MM+'-'+DD
									let m=this.$time(moment().format('YYYY-MM-DD hh:mm:ss'),moment(Year).format('YYYY-MM-DD hh:mm:ss'))
									return m+'后'
								}
								
						   }
					}
					if(!item.isyear){
						let z=this.$time(moment().format('YYYY-MM-DD hh:mm:ss'),moment(item.time).format('YYYY-MM-DD hh:mm:ss'))
					  	if(result){
							return z+'前'
						}
						else{
							return z+'后'
						}
					}
				}
			},
			gettime(item){
				if(item.islunar){
					let m=moment(item.time).format('M')
					let y=moment(item.time).format('YYYY')
					let d=moment(item.time).format('D')
					var date = lunar(new Date(y, m-1, d));
				   return	date.toString()
				}
				else{
					return moment(item.time).format("YYYY年MM月DD日 HH:mm");
				}
			},
			gettimetwo(item){
				
					return moment(item.time).format("YYYY年MM月DD日 HH:mm");
				
			},
			async getjinian(page){
				let res=await this.$zxl('/getjinianri',{page})
				if(res.data.status==200){
					// console.log(res.data.data);
					if(this.n==1){
						this.list= res.data.data;
					}else{
						this.list = this.list.concat(res.data.data);
					}
					  this.total = res.data.total;
				}
				else{
					this.list=[]
					this.total=0
				}
			},
			edit(e){
				console.log(e,'编辑')
				this.editid=e.id
				this.isedit=!this.isedit
				this.title=e.title
				this.time=moment(e.time).format("YYYY-MM-DD hh:mm:ss")
				this.isyear=e.isyear
				this.islunar=e.islunar
				this.switchyear=e.isyear?true:false
				this.switchlunar=e.islunar?true:false
				this.toggle('bottom')
			},
			async saveedit(){
				if(this.title.trim()==''){
								 this.$refs.uToast.show({
									type: 'warning',
									message: "请填写纪念描述",
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
								 			})	
				}
				else if(this.time==''){
								 this.$refs.uToast.show({
									type: 'warning',
									message: "请选择纪念日期",
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
												})	
				}
				else{
								 let res=await this.$zxl('/editjinianri',{
								 			title: this.title,
								 			 isyear:this.isyear,
											 islunar:this.islunar,
								 			time: this.time,
											id:this.editid
								 		},'POST')
								 		if (res.data.status==200) {
								 			this.music.zxl_success()
								 			this.$refs.uToast.show({
								 				type: 'success',
								 				message: "纪念日更改成功",
								 				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
								 							})	
										this.n=1					
										this.getjinian(1)
										 this.close()
								 		}
				}
			},
			del(e){
				console.log(e,'删除')
				uni.showModal({
					title:"确定要删除该纪念日吗？",
					content:e.title,
					 success: (res)=>{
					       if (res.confirm) {
					           console.log('用户点击确定');
				           this.deljinianri(e.id)
					       } else if (res.cancel) {
					           console.log('用户点击取消');
					       }
					   }
				})
				
			},
			async deljinianri(id){
				let res=await this.$zxl('/deljinianri',{id})
				if(res.data.status==200){
					this.$refs.uToast.show({
						type: 'success',
						message: "删除成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
									})	
									this.n=1
				this.getjinian(1)
				}
			},
			async send(){
			 if(this.title.trim()==''){
				 this.$refs.uToast.show({
					type: 'warning',
					message: "请填写纪念描述",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				 			})	
			 }
			 else if(this.time==''){
				 this.$refs.uToast.show({
					type: 'warning',
					message: "请选择纪念日期",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
								})	
			 }
			 else{
				 let res=await this.$zxl('/addjinianri',{
				 			title: this.title,
				 			 isyear:this.isyear,
							 islunar:this.islunar,
				 			time: this.time,
							color:this.colors[Math.floor(Math.random() * this.colors.length)]
				 		},'POST')
				 		if (res.data.status==200) {
				 			this.music.zxl_success()
				 			this.$refs.uToast.show({
				 				type: 'success',
				 				message: "纪念日添加成功",
				 				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				 							})	
											this.n=1
											this.getjinian(1)
						 this.close()
				 		}
			 }
			},
			
			 bindLeeDateTimeChange(e) {
			        // console.log("查看时间组件返回值",e.value,e.text)
					this.time=e.value
			    },
				changeyear(e){
				 console.log(e,'每年提醒')
				 this.isyear=e?1:0
						},
				changelunar(e){
				 console.log(e,'是否农历')
				 this.islunar=e?1:0
					},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			close(){
				this.title=''
				this.time=''
				this.switchyear=false,
				this.switchlunar=false,
				this.isyear=0,
				this.islunar=0,
				this.isedit=false,
				this.$refs.popup.close()
			},
		
			navbarBtnTapHandler(){
				uni.navigateTo({
					url:"/pages/qinglvkongjian/home/home",
					animationType:'zoom-fade-out'
				})
			},
			toIndex(index) {
				if (index == 3) {
					console.log(index)
				} else if (index == 1) {
					console.log(index)
					uni.navigateTo({
						url: "/pages/qinglvkongjian/my/my",
						animationType:'zoom-fade-out'
					})
				} 
				else if(index==0){
					uni.navigateTo({
						url:"/pages/qinglvkongjian/home/home",
						animationType:'zoom-fade-out'
					})
				}
				else{
					console.log('zxlandlw')
					uni.navigateTo({
						url:'/pages/qinglvkongjian/shuoshuo/shuoshuo',
						animationType:'zoom-fade-out'
					})
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
	    .item{
	        // width: 100%;
	        // padding: 0 20px;
			border-radius: 15rpx;
	        height: 100%;
	        display: flex;
			justify-content: space-between;
	        align-items: center;
			.tixin{
				position: absolute;
				// border-radius: 15rpx;
				width: 40rpx;
				height: 40rpx;
				top:10rpx;
				left:10rpx;
			}
			.bj{
				position: absolute;
				border-radius: 15rpx;
				width: 100%;
				height: 100%;
				top:0;
				left:0;
				buttom:0;
				right:0;
				display: flex;
				.left{
						width: 50%;
						height: 100%;
						opacity: 0.3;
						border-top-left-radius: 15rpx;
						border-bottom-left-radius: 15rpx;
				}
				.right{
						width: 50%;
						height: 100%;
						box-sizing: border-box;
						border-top-right-radius: 15rpx;
						border-bottom-right-radius: 15rpx;
						opacity: 0.1;
				}
			}
			.leftzxl{
				border-top-left-radius: 15rpx;
				border-bottom-left-radius: 15rpx;
				width:50%;
				padding: 20rpx;
				box-sizing: border-box;
			}
			.rightzxl{
				width:50%;
				padding: 20rpx;
				border-top-right-radius: 15rpx;
				border-bottom-right-radius: 15rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}
	       
	    }
	.focus{
		color:#05c160!important;
		font-weight: 150!important;
		font-size: 25rpx
		// background-color: red;
	}
	.unfocus{
		
	}
	.popup-contentzxl {
		z-index: 100;
		width: 750rpx;
		box-sizing: border-box;
		height: 700rpx;
		padding: 20rpx;
		border-radius: 15rpx;
		// background: -webkit-linear-gradient(top, pink, #999999);
		background-color: #F0F0F0;
	   .top{
		   width: 650prx;
		   margin: 0 auto;
		   display: flex;
		   justify-content: space-between;
		   align-items: center;
	   }
	   .buttom{
		   width: 650prx;
		   margin: 20rpx auto;
		   display: flex;
		   justify-content: space-between;
		   align-items: center;
		   button{
			   width: 300rpx;
		   }
	   }
	   .center{
		   border-radius: 15rpx;
		   width: 650prx;
		   margin: 20rpx auto;
		   height: auto;
		   background-color: white;
		   box-sizing: border-box;
		   padding: 20rpx;
		   .item{
			   width: 600prx;
			   height: 100rpx;
			   margin: 0 auto;
			   border-bottom: 1rpx solid #999;
			   display: flex;
			   justify-content: space-between;
			   align-items: center;
			   .des{
				   flex: 1;
				   margin-left: 25rpx;
				   color:#999
			   }
		   }
	   }
	}
	page{
			width: 100%;
			height: 100%;
			padding-bottom: 200rpx;
		}
	.add{
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right:20rpx;
		bottom: 350rpx;
		background-color: white;
		border-radius: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
			// z-index: 10;
			view{
				border-radius: 15rpx;
				width: 90rpx;
				z-index: 10;
				height: 90rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: white;
			}
		image{
			border-radius: 15rpx;
			width: 50rpx;
			z-index: 10;
			height: 50rpx;
		}
	}

	
	.add::before {
	    content: '';
	    position: absolute;
	    // width: 200%;
	    // height: 200%;
	    background: red;
	    z-index: -2;
	    animation: rotate 3s linear infinite;
	    // left: 50%;
	    // top: 50%;
	    // transform-origin: 0 0;
		
		
		border-top: 200px solid lightcoral;
		border-bottom: 200px solid #05c160;
		border-left: 200px solid orange;
		border-right: 200px solid cornflowerblue;
		
	}
	
	
	@keyframes rotate {
	    100% {
	        transform: rotate(360deg);
	    }
	}
.main{
	margin-bottom: 300rpx;
}
.load2{
		margin-top: -90rpx;
		position: relative;
		bottom: 20rpx;
	}
</style>
