<template>
    <view class="content">
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="删除" title="警告" content="确认要删除吗" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<view class="total">
			
			<text>已下载  {{videolist.length}}个视频</text>
			<text v-if="sizetotal" style="margin-left: 20rpx;">共计{{sizetotal}}</text>
		</view>
<scroll-view class="main"  scroll-y="true"  enable-flex
	 refresher-default-style="black"
 v-if="videolist.length>0">
	<view class="main">
		<downvideoitem
		       class="item"
		         :videolist="videolist"
		          v-for="(item, id) in videolist"
		          :key="id"
		          :item="item"
				  :del="del"
				  :selectarr="selectarr"
				  @longpress.native="isdel"
		        />
	</view>
</scroll-view>
<view class="footer" v-if="del">
	 <view class="left">
	 <!-- 	 <checkbox class="yuan"  v-if="del" @change="isall(e)"/>全选 -->
	 <checkbox-group @change="isalls">
	 	<label>
	 		<checkbox :checked="isall"/>全选
	 	</label>
	 </checkbox-group>
	 </view>
	 <view class="ccenter" @click="close">
	 	取消
	 </view>
	 <view class="right" @click="deletefile">
	 	删除（{{arr.length}}）
	 </view>
</view>
 <view class="nodata" v-if="videolist.length==0">
 	<view class="">
 		<image src="../../static/images/personal/nodata.png" mode=""></image>
 	</view>
	 <view>暂无下载数据</view>
 </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				videolist:[],
               del:false,
			   select:[],
			   selectarr:[],//选择的id数组
			   isall:false,
			   arr:[],//子组件选中的id
			   sizetotal:0,
			   type: 'center',
			   msgType: 'success',
			   messageText: '这是一条成功提示',
			};
		},
		onLoad() {
			uni.$on('true',(id)=>{
				this.arr.push(id)
				// console.log('添加'+id)
				console.log('已经选择的数据'+this.arr)
				if(this.arr.length==this.select.length) this.isall=true
			})
			uni.$on('false',(id)=>{
				this.arr=this.arr.filter(item=>item!=id)
				console.log('移除'+id)
				// console.log('已经选择的数据'+this.arr)
				this.isall=false
			})
		
			plus.downloader.enumerate( function ( tasks ) {
					// alert( "Unfinished task count: " + tasks.length );
					console.log(tasks,'下载任务')
		})
		
		},
		onBackPress() {
			uni.reLaunch({
				url:"/pages/personal/personal",
				animationType:'zoom-fade-out'
			})
			return true
		},
		methods:{
			//删除文件
			deletefile(){
			 if(this.arr.length==0){
				 this.messageToggle('warn','请至少选择一条数据😊')
			 }else{
				 this.dialogToggle('warn')
			
			 }
			},
			onNavigationBarButtonTap(e){
				console.log(e)
			   if(e.index==0) {
				   uni.reLaunch({
				   	url:"/pages/personal/personal",
					animationType:'zoom-fade-out'
				   })
			   }
			},
			messageToggle(type,zxl) {
				this.msgType = type
				this.messageText =zxl
				this.$refs.message.open()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				this.videolist.forEach(item=>{
								 if(this.arr.indexOf(item.id)!=-1)
								 {
									 uni.removeSavedFile({
								     filePath: item.filePath,
									 success: (res)=>{
								    this.messageToggle('success','已删除😊')
									
									         }
									       });
								 }
				})
				
				this.close()
				this.getfile()
				var pages = getCurrentPages(); //获取所有页面的数组对象
								var currPage = pages[pages.length - 1]; //当前页面
								uni.redirectTo({
									url: currPage.$page.fullPath,
									animationType:'none'
								})
			
			},
		
			dialogClose() {
			
			},
	//取消
  close(){
	console.log('长按')  
	this.del=!this.del
	this.arr=[]
	this.selectarr=[]
	this.select=[]
	this.isall=false
  },
  //长按打开
  isdel(){
	 console.log('长按')
	 this.del=!this.del
  },
  //全选
  isalls(e){
	  uni.$emit('selectall',this.selectarr)
  	console.log(e)
	this.isall=!this.isall
	if(e.target.value.length){
		this.arr=this.select
		this.selectarr=this.select
	}
	else{
		this.arr=[]
		this.selectarr=[]
	}
	console.log(this.selectarr,'选择的数组id')
	
  },
			getfile(){
				var that=this
				uni.getSavedFileList({
					success: function (res) {
				    console.log(res.fileList,'文件55');
					let regtitle = /(?<=title).*?(?=\.mp4)/;
					let regid=/(?<=id).*?(?=title)/
					let regduration=/(?<=duration).*?(?=id)/
					that.videolist=res.fileList.reverse()
					that.sizetotal=0
					that.videolist.forEach((item,index)=>{
						that.sizetotal+=item.size
						Object.defineProperty(item,'name',{
							value:item.filePath.match(regtitle).join(),
							writable:true,
							enumerable:true
						})
						Object.defineProperty(item,'duration',{
							value:item.filePath.match(regduration).join(),
							writable:true,
							enumerable:true
						})
						Object.defineProperty(item,'id',{
							value:item.filePath.match(regid).join(),
							writable:true,
							enumerable:true
						})
					})
					that.videolist.forEach(item=>{
						that.select.push(item.id)
					})
					that.sizetotal=that.$filesize(that.sizetotal)
					console.log(that.select,'文件55');
				  }
				});
			}
		},
		created() {
		  this.getfile()
		},
	
	}
</script>

<style>
	page{
		background:pink;
	}
</style>
<style scoped lang="scss">
page{
  	width: 100%;
  	height: 100%;
}
.footer{
	position: fixed;
	box-sizing: border-box;
	padding: 30rpx;
	bottom: 0rpx;
	background-color: white;
	width:100%;
	height:130rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: nowrap;
	transition: all 0.5s;
	.right{
		color: red;
	}
}
.content{
	padding-bottom: 120rpx;
}
	.main{
     display: flex;
	 
	justify-content: space-between;
	 flex-wrap: wrap;
	.item{
		flex:1
	}

	}
		
	.total{
		margin-left:40rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		color:#999
		
	}
	.nodata{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		image{
			width: 200rpx;
			height: 200rpx;
		}
		view{
			margin: 0 auto;
			text-align: center;
			color:#999;
			font-size: 30rpx;
		}
	}
</style>
