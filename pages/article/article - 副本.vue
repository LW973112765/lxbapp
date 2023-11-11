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
	      <view  @click="changeNav(item.id)" :class="item.id==navId ? 'active' : 'root'">
	       {{item.name}}
	      </view>
	    </view>
	  </scroll-view>

	<scroll-view scroll-y="true" class="article" refresher-enabled
		 :refresher-triggered="triggered"  refresher-default-style="black"
		 @refresherrefresh='fresh' v-if="article.length>0">
			<ArticleItem
			  :article="article"
			  v-for="(item, id) in article"
			  :key="item.id"
			  :item="item"
			/>
		</scroll-view>
		<scroll-view scroll-y="true" v-else refresher-enabled
		 :refresher-triggered="triggered"  refresher-default-style="black"
		 @refresherrefresh='fresh'>
			<view class="nocontent" >
				无内容
			</view>
		</scroll-view>
     </view>

</template>
<script>

import moment from "moment";
export default {
  name: "Article",
  data() {
    return {
      articletotal: [],
      article: [],
      total: 0,
      pageSize: 8,
	  navId:'',
      CategoryList: "",
	  triggered:false
    };
  },
 //  onShow() {
 //  	this.http(1)
	// this.getcategory()
 //  },
  methods: {
	  //下拉刷新
	  fresh(){
		  console.log('下拉')
		  this.triggered=true
		  setTimeout(()=>{
			this.http(1) 
			uni.showToast({
				title:'刷新成功',
				position:"top",
				icon:"success"
			})
		  },1500)
	  },
	  //切换导航
	  changeNav(id){
		  this.navId=id
		  // this.http(1);
		  // console.log(id)
		let newarr=  this.articletotal.filter((item)=>{
			return  item.tag.includes(id)==true 
		  })
		  this.article = newarr
		
	  },
	  //获取文章分类
	async getcategory(){
		  let res = await this.$zxl('/getcategory')
		    console.log("//获取文章分类", res); 
	      this.CategoryList=res.data.data
		  this.navId=res.data.data[0].id
			
	  },
    changePage(num) {
      this.http(num);
    },
    // 获取文章列表
   async http(page) {
      // console.log("收到了", page);
   let res = await  this.$zxl('/getarticlehave',{
          page,
        })
          console.log(res.data);
          if (res.data.status === 200) {
            // console.log(res.data.data);
            res.data.data.forEach((data) => {
              data.tag = data.tag.split(",").map((item) => item * 1);
              data.created_at = moment(data.created_at).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            });
            this.articletotal = res.data.data;
			// this.article=this.articletotal
			this.article = this.articletotal.filter((item)=>{
			   return  item.tag.includes(this.navId)==true 
		     })
			 this.triggered=false
            // console.log(" this.article", this.article);
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }

    },
  },
  created() {
    this.http(1);
	this.getcategory()
  },
};
</script>
<style>
	page {
		background:url("../../static/images/bg/4.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
		
	}
</style>
<style lang="less" scoped>
 page{
		 // background: -webkit-linear-gradient(top,  #999999,pink);
	}
* {
  margin: 0;
  padding: 0;
}
.nocontent{
	width: 700rpx;
	height: 500rpx;
	border-radius: 10rpx;
	background-color: #999;
	text-align: center;
	line-height: 500rpx;
	font-size: 50rpx;
	margin: 0 auto;
}
// .main {
//   box-sizing: border-box;
//   position: relative;
//   font-size: 16rpx;
//   padding-top: 10rpx;
//   padding-left: 20rpx;
//   padding-bottom: 10rpx;
//   width: 600rpx;
//   height: auto;
//   margin: 50rpx auto;
//   // background-color: rgba(0, 0, 0, 0.5);
//   // background-color: #999999;
// }
.article {
  width: 100%;
  height: auto;
}
.pagination-wrapper {
  width: 95%;
  background-color: #fff;
}
.navScroll {
  display: flex;
  white-space: nowrap;
  height: 60rpx;
  margin-bottom: 20rpx
}


.navScroll .navItem {
  padding: 0 30rpx;
  font-size: 35rpx;
  height: 60rpx;
  line-height: 60rpx;
  display: inline-block;
  transition: all 0.5s;
}
.navScroll view {
  height: 60rpx;
  box-sizing: border-box;
  transition: all 0.5s;
    font-size: 30rpx;
}


.navItem .active {
  border-bottom: 1rpx solid #d43c33;
    font-size: 50rpx;
  color: #d43c33;
  font-style: italic;
}
.root{
	color:aqua;
	font-size: 30rpx;
}
</style>
