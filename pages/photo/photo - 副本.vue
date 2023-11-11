<template>
    <view class="content">
      <zero-waterfall :list="photoList">
                 <!--  #ifdef  MP-WEIXIN -->
                 <view v-for="(item, id) of photoList" :key="id" slot="slot{{item.id}}">
                     <view class="cnt">
                         <view class="text">{{ item.title}}</view>
                     </view>
                 </view>
                 <!--  #endif -->
                 <!-- #ifndef  MP-WEIXIN -->
                 <template v-slot:default="item">
                     <view class="cnt">
                         <view class="text">{{ item.extra }}</view>
                     </view>
                 </template>
                 <!-- #endif -->
             </zero-waterfall>
		    <Loading class="Loading" :show="loading" />
			<view class="load2"><zero-loading class="load2" position="absolute" v-if="isload"></zero-loading></view>
        <!-- <uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></uni-load-more> -->
    </view>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      isLoading1: false,
      total: 0,
	   isload: false,
      n: 1,
      photoList: [],
    };
  },
  computed: {
   
  },
  onReachBottom() {
	  console.log('到底了')
              if (this.photoList.length >= this.total) {
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
  methods: {
   
    scroll(scrollData) {
      console.log(scrollData);
    },
   async http(page) {
    let res =await  this.$zxl('/photo',{ page })
        if (res.data.status === 200) {
          this.loading = false;
          console.log(res.data);
          this.photoList = this.photoList.concat(res.data.data);
          this.total = res.data.total;
          setTimeout(() => {
            this.isLoading1 = true;
          }, 1000);
        }

    },
    //点击加载更多，再次向服务器发送请求
    loadmore() {
      this.n++;
      console.log(this.n);
      this.http(this.n);
    },
  },
  created() {
    this.n = 1;
	
    this.http(1);
  },
};
</script>
<style>
	page{
		background:#999999;
	}
</style>
<style scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.loading {
	  cursor: pointer;
	  position: absolute;
	  bottom: 2px;
	  left: 40%;
	  transform: translate(-50%);
	  color: red;
	}
	.load2{
		position: relative;
		bottom: 10rpx;
		margin-top: 20rpx;
	}
</style>