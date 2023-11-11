<template>
  <view class="messageList">
    <ul class="ul">
      <li class="li">
        <view class="li-item">
          <image class="image" :src="item.avatar" />
          <view class="top">
            <view class="lw">
             <image src="./4.png" mode=""  v-show="item.senderid == userinfo.id"
                @click="deleteMessage(item.id)"></image>
            </view>
            <view class="fw username">
              <text>{{ item.username }}</text
              ><text class="email">{{ item.email }}</text>
            </view>
            <view class="content">{{ item.content }}</view>
            <view class="value">
              {{ item.created_at | dateFormat }}
            </view>
            <ul class="soncomment">
              <li v-for="code in commentList" :key="code.id">
                <view class="li-item">
                  <image class="image" :src="code.avatar" alt="" />
                  <view class="top">
                    <view class="nickanme">
                      <text class="fw">管理员{{ code.answername }}</text>
                      <text> 回复 {{ code.username }}: </text>
                      <view class="replycontent">{{ code.content }}</view>
                    </view>
                    <view class="value">
                      {{ code.created_at | dateFormat }}
                    </view>
                  </view>
                </view>
              </li>
            </ul>
          </view>
        </view>
      </li>
    </ul>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["item"],
  data() {
    return {
      textarea1: "",

      commentList: [],
    };
  },
  created() {
    this.getcomment(1, this.item.id);
  },
  mounted() {
    console.log("留言收到的id", this.item, this.item.id);
  },
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
  methods: {
    async  getcomment(page, id) {
      let res = await  this.$zxl('/getmessageanswer',{ page, id })
        if (res.data.status === 200) {
          console.log("数据", res.data);
          this.commentList = res.data.data;
          this.total = res.data.total;
        }
    },
   async deleteMessage(id) {
     let res =await	this.$zxl('/deletemessage',{ id })
     		        if (res.data.status === 200) {
									uni.showToast({
										icon:"success",
									title:'已删除😊',
									duration:1000,
								position:'top'
											})
     		         this.$emit("updatalist", "宝宝");
     		             		  }

    },
  },
};
</script>

<style lang="less" scoped>
.messageList {
  width: 100%;
  height: auto;
}
.callback {
  color: #337ab7;
  font-size: 14rpx;
}

li::marker {
  content: '';
}
.ul {
  padding: 0 30rpx;
  list-style: none;
}
image{
	width: 50rpx;
	height: 50rpx;
}
.fw {
  font-weight: 900;
}
.replycontent {
  margin: 4rpx 0;
}
.username {
  font-size: 12rpx;
  margin-bottom: 4rpx;
}
.content {
  margin-bottom: 4rpx;
  color: #555;
}
.email {
  margin-left: 10rpx;
}
ul {
  color: #333;
  font-size: 14rpx;
  li {
    margin-bottom: 10rpx;
    .li-item {
      display: flex;
    }
    .image {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
    }
    .top {
      position: relative;
      flex: 1;
      padding-left: 15rpx;
    }
    .value {
      margin-bottom: 10rpx;
    }
  }
}
.lw {
  position: absolute;
  top: 5rpx;
  right: 30rpx;
  i {
    font-size: 20rpx;
    color: #999;
  }
  text {
    margin-left: 5rpx;
    padding-left: 5rpx;
    margin-left: 5rpx;
    cursor: pointer;
  }
}
.fatherinput {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fatherinput .zxl {
  background: -webkit-linear-gradient(left, blue, #999999);
  color: red;
  display: inline-block;
  text-align: center;
  margin-left: 10rpx;
  border-radius: 50%;
  width: 60rpx;
  height: 40rpx;
  line-height: 40rpx;
  cursor: pointer;
}
.fatherinput .el-icon-close {
  font-size: 18rpx;
  cursor: pointer;
  margin-left: 15rpx;
}
.soncomment{
	margin-left: -100rpx;
}
</style>
