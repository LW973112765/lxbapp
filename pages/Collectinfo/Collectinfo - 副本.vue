<template>
    <view class="main">
	<scroll-view scroll-y="true" class="article" refresher-enabled
		 :refresher-triggered="triggered"  refresher-default-style="black"
		 v-if="article.length>0">
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
	import { mapState } from "vuex";
export default {
  name: "Article",
  data() {
    return {
      article: [],
      total: 0,
      pageSize: 8,
	  triggered:false
    };
  },
  methods: {
	  //下拉刷新
	  fresh(){
		  console.log('下拉')
		  this.triggered=true
		  setTimeout(()=>{
			this.http(this.userinfo.id) 
			uni.showToast({
				title:'刷新成功',
				position:"top",
				icon:"success"
			})
		  },1500)
	  },
    // 获取文章列表
   async http(userid) {
      // console.log("收到了", page);
   let res = await  this.$zxl('/getcollectarticle',{
         userid
        })
          console.log(res.data);
          if (res.data.status === 200) {
            // console.log(res.data.data);
            res.data.data.forEach((data) => {
              // data.avatar = data.avatar.slice(7);
              data.tag = data.tag.split(",").map((item) => item * 1);
              data.created_at = moment(data.created_at).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            });
            this.article = res.data.data;
			 this.triggered=false
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }

    },
  },
  created() {
    this.http(this.userinfo.id);
  },
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
};
</script>

<style lang="less" scoped>
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
 .main {padding-top: 30rpx;}

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
}


.navItem .active {
  border-bottom: 1rpx solid #d43c33;
  color: #d43c33;
}
</style>
