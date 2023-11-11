<template>
  <view>
    <view class="content" >
      <view class="shang">
        <view class="shangz" v-html="item.title"></view>
      </view>
      <view class="xia" @click="goarticleinfo(item.id)">
        <view class="left" v-show="item.cover">
          <image :src="item.cover" alt="" />
		 <!-- <p class="common-label" v-show="item.total > 300">
		    热<text class="triangle" />
		  </p> -->
		  <image class="hot" src="../../static/images/fonts/hot.png" mode="" v-if="item.total > 300"></image>
        </view>
        <view class="right">
          <view class="top">
            <image
              v-if="!item.avatar"
              src="http://rj35h5gq5.hd-bkt.clouddn.com/1664683833313090C442D174AABC7E4B31FB2469474BF.jpg"
              alt=""
            />
            <image v-if="item.avatar" :src="item.avatar" alt="" />
            <view class="pl10"
              ><image src="../../static/images/fonts/zuozhe.png" mode=""></image>&nbsp;
                <text class="baobao" v-html="item.author"></text>
        </view
            >
            <view class="zxxx"
              ><image src="../../static/images/fonts/fenlei.png" mode=""></image>
              <text
                class="foot"
                v-for="(item1, id) in categoryList"
                :key="id"
                >{{ item1.name }}</text
              ></text
            >
			</view>
          </view>
          <view class="center">
            <text class="introduction" style="width: 522rpx;" v-html="item.introduction"></text>
          </view>
          <view class="buttom">
            <view class="zxl1">
              <image
                :src="isLike ? have : no"
                alt=""
                @click.stop="collect(item.id)"
              /><text>{{ isLike ? "已收藏" : "收藏" }}</text>
            </view>
           <!-- <view class="zxl2">
               <image src="../../static/images/fonts/liulan.png" mode="" style="width: 20rpx;height: 20rpx;margin-right: 5rpx;">{{ item.total }}
            </view> -->
           <!-- <view class="timer">
              <i class="el-icon-time" />{{ item.created_at }}
            </view> -->
			<view class="timer" v-html="item.created_at">
			 
			</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      have: require("../../static/images/other/have.png"),
      no: require("../../static/images/other/no.png"),
      isLike: false,
      categoryList: [],
      isinfo: false,
      adminid: "",
    };
  },
  mounted() {
	  console.log(this.item.tag,'sdsd 收到')
  },
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
  methods: {
    //收藏文章
    collect(id) {
      this.isLike = !this.isLike;
      if (this.isLike) {
        this.getCollect(id);
		this.addcollect(id)
      }
      if (!this.isLike) {
        this.deleteCollect(id);
		this.reducecollect(id)
    }
  },
  
  //文章收藏数加1
  async addcollect(id){
  	 let res = await this.$zxl('/addcollect',{id},'POST')
  },
  //文章收藏数减1
  async reducecollect(id){
  	 let res = await this.$zxl('/reducecollect',{id},'POST')
  },
    //页面挂载时，查看当前文章是否已经被收藏
   async isCollect(id, userid) {
	  let res = await this.$zxl('/iscollect',{ article_id: id, userid: userid })
	   this.isLike = res.data.iscollect;
    },
    //收藏文章
   async getCollect(id) {
     let res =await this.$zxl('/getcollect',{ article_id: id, userid: this.userinfo.id },'POST')
          if (res.status === 200) {
            // this.$message({
            //   message: "已收藏！",
            //   type: "success",
            // });
            this.isLike = true;
          }
       
    },
    //取消收藏文章
   async deleteCollect(id) {
 let res =await this.$zxl('/deletecollect',{ article_id: id, userid: this.userinfo.id },'POST')
          if (res.status === 200) {
            this.isLike = res.data.iscollect;
            // this.$message({
            //   message: "已取消收藏！",
            //   type: "success",
            // });
          }
   
    },
    goarticleinfo(id) {
      uni.navigateTo({
		animationType:'zoom-fade-out',
      	url:`/pages/ArticleInfo/ArticleInfo?id=${id}`
      })
    },
   async getCategoryName(tag) {
      let zxl = tag.join(",");
    let res= await  this.$zxl('/getcategoryname',{
          tag: zxl,
        })
          // console.log(res.data);
          if (res.data.status === 200) {
            // console.log("返回数据", res.data.data);
            this.categoryList = res.data.data;
          }
    
    },
  },
  created() {
    this.getCategoryName(this.item.tag);
    this.isCollect(this.item.id, this.userinfo.id);
  },
};
</script>

<style lang="less" scoped>

.icon-shequpinglun {
  position: absolute;
  top: 5rpx;
  right: 70rpx;
  width: 20rpx;
  height: 20rpx;
  font-size: 20rpx;
  color: #999;
}
.content {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 225rpx;
  // background-color: #fff;
  background: -webkit-linear-gradient(top, #b9ff93,pink);
  // margin-left: 10rpx;
  margin-bottom: 30rpx;
  
}
.shang {
  padding-left: 10rpx;
  line-height: 40rpx;
  color: black;
  width: 100%;
  height: 40rpx;
  margin-bottom: 10rpx;
  transition: all 0.5s;
}
.shangz {
  transition: all 0.5s;
  width: 100%;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.shangz:hover {
  color: blue;
  text-decoration: underline;
  transform: translate(30rpx);
}
.xia {
  display: flex;
  position: relative;
  width: 100%;
  height: 170rpx;
}
.left {
	position: relative;
  width: 25%;
  height:170rpx;
  image {
    width: 100%;
    height:178rpx;
  }
  .hot{
	  position:absolute;
     top: 1rpx;
	 left: 1rpx;
	 width: 40rpx;
	 height: 40rpx;
  }
  // background-color: aqua;
}
	
.center text{
	padding-top: 10rpx;
	 line-height: 30rpx;
	 font-size: 28rpx
}
.right {
  box-sizing: border-box;
  padding-left: 20rpx;
  width: 75%;
  height: 200rpx;
  .tpo,
  .buttom {
    position: relative;
    width: 100%;
    text {
      margin-left: 2rpx;
      line-height: 30rpx;
    }
  }
  .top {
    height: 40rpx;
    display: flex;
    image {
      display: inline-block;
      width: 33rpx;
      height: 33rpx;
      border-radius: 50%;
    }
    // .icon-fenlei {
    //   font-size: 20rpx;
    //   color: #999;
    // }
    .pl10,
    .zxxx,
    .foot {
      display: inline-block;
      // margin-top: 4rpx;
      text-align: center;
      font-size: 15rpx;
      height: 33rpx;
      line-height: 33rpx;
      margin-left: 20rpx;
      color: #999;
	  
      i {
        font-size: 20rpx;
      }
    }

    .foot {
      padding-left: 5rpx;
      margin-left: 5rpx !important;
      font-size: 25rpx !important;
    }
    .zxxx {
      padding-left: 0rpx;
    }
    // .p110 {
    //   margin-left: 10rpx;
    // }
    // .zxx {
    //   margin-left: 20rpx;
    // }
    .pl20 {
      margin-top: 10rpx;
      padding-left: 20rpx;
    }
  }
  .center {
    margin-top: 10rpx;
    height: 80rpx;
	padding-bottom: 5rpx;
  }
  .introduction {
	  // height: 75rpx;
    line-height: 25rpx;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
    //文本超出部分以...形式展示
    text-overflow: -o-ellipsis-lastline;
    //整体超出部分隐藏
    overflow: hidden;
    //文本超出部分以...形式展示，同第一行样式代码
    text-overflow: ellipsis;
    //display 块级元素展示
    display: -webkit-box;
    //设置文本行数为2行
    -webkit-line-clamp: 2;
    //设置文本行数为2行
    line-clamp: 2;
    //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
    -webkit-box-orient: vertical;
  }
  .buttom {
    height: 30rpx;
	display: flex;
    // margin-top: 35rpx;
    .timer {
      margin-left: 20rpx;
	  width:300rpx!important;
	  height: 40rpx!important;
    // white-space: nowrap!important; /* 设置文本不换行 */
    //  overflow: hidden!important; /* 隐藏超出容器的部分 */
    //  text-overflow: ellipsis!important; /* 显示省略号 */
    }
    .zxl2 {
      margin-left: 25rpx;
	  // display: flex;
    }
    .zxl1 {
      image {
        margin-top: 5rpx;
        width: 30rpx;
        height: 30rpx;
        vertical-align: bottom;
      }
      text {
        display: inline-block;
        width: auto;
        margin-left: 5rpx;
      }
    }
    .zxl1,
    .zxl2,
    .timer {
      display: inline-block;
	  // display: flex;
      font-size: 30rpx;
      color: #999;
      i {
        font-size: 18rpx;
        padding-right: 5rpx;
      }
    }
  }
}
.baobao {
	font-size: 25rpx!important;
}
</style>
