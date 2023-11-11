<template>
	<view>
		<view class="main">
			<turnPage
			 txtColor1="#00BFFF" txtColor2="#FF00FF" txtColor3="#d71345" txtColor4="#f7acbc"
			  txtColor5="#ADFF2F" txtColor6="#3498db" txtColor7="#f47920" txtColor8="#d71345" txtColor9="#f7acbc" txtColor10="#DDA0DD"
			  txtColor11="#3498db"
			      class="box"
				  v-for="(item, index) in list_page"
				  :key="item.id"
				  :list="item.title" :height="640" :width="400" ></turnPage>
		</view>
		  <view class="nodata" v-if="list_page.length==0">
			   	<view class="">
			   		<image src="../../static/images/personal/15.png" mode=""></image>
			   	</view>
			   	 <view>暂无数据哦😊</view>
			   </view>
			<!-- <view class="uni-pagination-box">
				<wyb-pagination :total-items="total" :current="currentPage" :page-items="pageSize" @change="changePage"/></view> -->
		<view class="load2"><zero-loading class="load2" position="absolute" v-if="isload"></zero-loading></view>
	</view>
</template>


<script>
import wybPagination from '@/components/wyb-pagination/wyb-pagination.vue'
export default {
  name: "Comments",
      components: {
          wybPagination
      },
  data() {
    return {
      list_page: [],
      total: 0,
	  n:1,
      pageSize: 8,
	   isload: false,
      currentPage: 1,
	
    };
  },
  onReachBottom() {
  	  console.log(this.list_page.length,'this.list_page.length')
  	  console.log(this.total,'this.total')
              if (this.list_page.length >= this.total) {
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
	  loadmore() {
	    this.n++;
	    // console.log(this.n);
	    this.http(this.n);
	  },
    // 分页
    changePage(num) {
		console.log(num,'收到')
      this.http(num.current);
    },
    // 获取评论列表
   async  http(page) {
      // console.log("收到了", page);
     let res=await this.$zxl('/getword',{
          page})       
          this.currentPage = page;
          if (res.data.status === 200) {
			  console.log(res.data.data,'数据')
           this.list_page = this.list_page.concat(res.data.data);
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
   
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang="scss" scoped>
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
.main{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.box{
		width: 340rpx;
		height: 500rpx;
		box-sizing: border-box;
		padding-right: 20rpx;
	}
}
.load2{
		margin-top: 50rpx;
		position: relative;
		bottom: 10rpx;
	}
.uni-group{
	// display:flex;
	// flex-wrap: wrap;
	// flex-direction: column;
}
.uni-group {
	display: flex;
	align-items: center;
}
.uni-td{
	display: flex;
	justify-content: center;
	background-color: red;
}
.uni-pagination-box{
	height: 100rpx;
	margin-top: 80rpx;
	z-index: 100;
}
</style>
