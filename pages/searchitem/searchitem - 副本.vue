<template>
	<view class="main">
 <scroll-view
	      scroll-x
	      class="navScroll"
	      enable-flex
	      scroll-into-view="navId"
	      scroll-with-animation
	  >
	    <view  class="navItem" v-for="(item,id) in CategoryList" :key="id">
	      <view  @click="changeNav(item.id)" :class="item.id==navId ? 'active' : ''">
	       {{item.name}}
	      </view>
	    </view>
	  </scroll-view>
	  <!-- 文章 -->
	  <scroll-view scroll-y="true" class="article" 
	    refresher-default-style="black"
	  	 v-if="navId==1&&articledata.length>0">
	  		<ArticleItem
	  		  :article="articledata"
	  		  v-for="(item, id) in articledata"
	  		  :key="item.id"
	  		  :item="item"
	  		/>
	  	</scroll-view>
	<!-- 视频 -->
	<scroll-view class="main"  scroll-y="true"  enable-flex
		 refresher-default-style="black"
	 v-if="navId==2&&videodata.length>0">
		<view class="main">
			<VideoItem
			         :videolist="videodata"
			          v-for="(item, index) in videodata"
			          :key="item.id"
			          :item="item"
					  :searchval="searchval"
			        />
		</view>
	</scroll-view>
		<!-- 暂无数据-->
		<view class="nodata" v-if="navId==1&&articledata.length==0">
		 	<view class="">
		 		<image src="../../static/images/personal/15.png" mode=""></image>
		 	</view>
		 	 <view>暂无匹配的文章数据😊</view>
		 </view>
		 <view class="nodata" v-if="navId==2&&videodata.length==0">
		  	<view class="">
		  		<image src="../../static/images/personal/15.png" mode=""></image>
		  	</view>
		  	 <view>暂无匹配的视频数据😊</view>
		  </view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message" animation>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				searchval:'',
				 articledata: [],
				articledata1: [],
				videodata: [],
				videodata1: [],
			   articlepageSize: 8,
			   videopageSize: 8,
			   articletotal:'',
			   videototal:'',
			   navId:"",
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				CategoryList:[{
						  id:1,
						  name:'文章'
				},{
						  id:2,
						  name:'视频'
				}
				]
				
			};
		},
		onLoad(e) {
			// console.log(e.searchval)
			this.searchval=e.searchval
			this.setNavSearchInput(e.searchval)
			this.getarticle(1, this.searchval);
		},
		created() {
			  this.navId=1
		  this.getarticle(1,this.searchval);
		},
		onShow() {
			console.log('onshow')
		 this.getarticle(1, this.searchval);
		 this.getvideo(1,this.searchval);
		 	uni.$emit('freshdanmu')
	
		},
		methods:{
			//切换导航
			 changeNav(id){
					  this.navId=id
					  // console.log(this.navId,'导航id')
					  if(this.navId==1){
						  this.getarticle(1,this.searchval)
					  }
					  if(this.navId==2){
					  this.getvideo(1,this.searchval)
					  }
		            
			 },
			 async getarticle(page, content) {
			 let res = await this.$zxl('/getsearch',{ search: content, page: page })
			        // console.log(res.data,'搜索wz文章');
			        if (res.data.status === 200) {
			          res.data.data.forEach((data) => {
			            data.tag = data.tag.split(",").map((item) => item * 1);
			            data.created_at = moment(data.created_at).format(
			              "YYYY-MM-DD HH:mm:ss"
			            );
			          });
			          this.articledata1 = res.data.data;
			          this.articletotal = res.data.total;
			          this.articlepageSize = res.data.pageSize;
			          this.changeColor(this.articledata1);
			        }
					else{
						this.articledata=[]
					}
			    },
				async getvideo(page, content) {
				let res = await this.$zxl('/searchvideo',{ search: content, page: page })
				       console.log(res.data,'搜索video');
				       if (res.data.status === 200) {
				         this.videodata1 = res.data.data;
				         this.videototal = res.data.total;
				         this.videopageSize = res.data.pageSize;
				         this.changeColor1(this.videodata1);
				       }
					   else{
					   	this.videodata=[]
					   }
				   },
				   changeColor1(videodata1) {
				        videodata1.map((item, index) => {
				          if (this.searchval) {
				            let replaceReg = new RegExp(this.searchval, "ig");
				            let replaceString = `<span style="color: #ed4014">${this.searchval}</span>`;
				            videodata1[index].title = item.title.replace(
				              replaceReg,
				              replaceString
				            );
				          }
				        });
				        this.videodata = videodata1;
				      },
				 changeColor(articledata1) {
				      articledata1.map((item, index) => {
				        if (this.searchval) {
				          let replaceReg = new RegExp(this.searchval, "ig");
				          let replaceString = `<span style="color: #ed4014">${this.searchval}</span>`;
				          articledata1[index].title = item.title.replace(
				            replaceReg,
				            replaceString
				          );
				          articledata1[index].introduction = item.introduction.replace(
				            replaceReg,
				            replaceString
				          );
				          articledata1[index].author = item.author.replace(
				            replaceReg,
				            replaceString
				          );
				        }
				      });
				      this.articledata = articledata1;
				    },
			// 动态设置导航栏搜索框内容
			setNavSearchInput(searchval){
			 // #ifdef APP-PLUS
			 let webView = this.$mp.page.$getAppWebview();
			 webView.setTitleNViewSearchInputText(searchval);
			 // #endif
			 // #ifdef H5
			 let inputSearch=document.querySelector('.uni-input-input[type=search]');
			 var evt = new InputEvent('input', {
			  inputType: 'insertText',
			  data: searchval,
			  dataTransfer: null,
			  isComposing: false
			 });
			 if(inputSearch){
			  inputSearch.value = searchval;
			  inputSearch.dispatchEvent(evt);
			 }
			 // #endif
			},
			messageToggle(type,content) {
				this.msgType = type
				this.messageText = content
				this.$refs.message.open()
			},
			onNavigationBarSearchInputChanged(e){
				  console.log(e.text)
				  this.searchval=e.text
				
				   // console.log(this.searchval,'searchval')
			},
	onNavigationBarButtonTap(e){
	if(e.index==0){
		if(this.searchval.trim()==''){
		this.messageToggle('warn','关键字不能为空！')
		}
		else{
			  if(this.navId==1){
				  this.getarticle(1, this.searchval);
			  }
			  else{
				  this.getvideo(1, this.searchval);
			  }
			let search= uni.getStorageSync("searchjilu");
			if (search) {
			  search = JSON.parse(search);
			}else{
				search=[]
			}
			var searchdata=this.searchval
			let result =  search.filter((item)=>{
							   return item != searchdata
			  })
			  // console.log(result)
			result.unshift(searchdata)
			uni.setStorageSync('searchjilu',JSON.stringify(result))
			
		}
	}
		},
		}
	}
</script>

<style lang="scss" scoped>
	.article {
	  width: 100%;
	  height: auto;
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
.navScroll .navItem {
  padding: 0 30rpx;
  font-size: 40rpx;
  height: 80rpx;
  line-height: 80rpx;
  display: inline-block;
  transition: all 0.5s;
}
.navScroll view {
  height: 60rpx;
  box-sizing: border-box;
  font-size: 30rpx;
  transition: all 0.5s;
}


.navItem .active {
  border-bottom: 1rpx solid #d43c33;
  color: #d43c33;
   font-size: 40rpx;
  
}
.main{
     display: flex;
	justify-content: space-between;
	 flex-wrap: wrap;
	
	       /* align-items:baseline; */
	       /* justify-items: flex-start; */

	}
</style>
