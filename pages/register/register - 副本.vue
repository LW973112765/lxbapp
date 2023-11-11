<template>
  <div class="form">
    <view class="title">注册界面</view>
    <form
      @submit="submit"
    >
      <view  prop="username">
		   <text class="other">用户名</text>
        <input
          type="text"
          v-model="registerForm.username"
          autocomplete="off"
        />
      </view>
      <view  prop="password">
		   <text class="other">密码</text>
        <input
          type="password"
          v-model="registerForm.password"
          autocomplete="off"
        />
      </view>
      <view  prop="email">
		   <text class="other">邮箱</text>
        <input
          type="email"
          v-model="registerForm.email"
          autocomplete="off"
        />
      </view>
      <view label="验证码">
        <div class="code_input">
          <input v-model="registerForm.code" :disabled="disabled"></input>
          <button size="mini" @click="send" :disabled="!disabled">{{
            sendmsg
          }}</button>
        </div>
      </view>
     <!-- <view label="头像" prop="avatar">
        <uni-file-picker 
          class="avatar-uploader"
          :action="url"
          :show-file-list="false"
          :http-request="uploadImage"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="icon-plus avatar-uploader-icon"></i>
        </upload>
      </view> -->
      <view>
        <button type="primary" form-type="submit"
          >注册</button
        >
        <button form-type="reset">重置</button>

        <footer><span class="zhuce" @click="register">已有账户？去登录</span>
        <span class="youke" @click="zhuye">我是游客</span></footer>
      </view>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import base from "../../api/base.js";
export default {
  name: "Register",
  data() {
    var validateLname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账户不能为空😊"));
      } else if (value.length > 20) {
        callback(new Error("用户名不能太长😊"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空😊"));
      } else {
        callback();
      }
    };
    return {
      sendmsg: "发送验证码",
      disabled: true,
      code: "",
      // bodyImg: "url(" + require("../../../assets/img/loginbg.jpg") + ")",
      url: base.uploadUrl,
      qiniu: base.qiniu,
      baseurl: "",
      imageUrl: "",
      registerForm: {
        username: "",
        password: "",
        email: "",
        avatar: "/static/images/personal/1.png",
        code: "",
      },
    
    };
  },
  //设置背景图片
  mounted() {
    // document.body.style.backgroundImage = this.bodyImg;
    // document.body.style.backgroundSize = "100%";
    this.baseurl = base.host;
  },
  beforeMount() {
    document.body.style.backgroundImage = "";
  },
  methods: {
    //获取邮箱验证码
   async send() {
      if (!this.registerForm.email) {
		uni.showToast({
			title: '请填写邮箱后获取验证码',
			duration: 1000,
			position:'top',
			icon:"error"
		});
      } else if (
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
          this.registerForm.email
        ) == false
      ) {
        
		uni.showToast({
			title: '请填写正确的邮箱后获取验证码！',
			duration: 1000,
			position:'top',
			icon:"error"
		});
		
      } else {
        
		uni.showToast({
			title: '验证码已发送，请注意接收！',
			duration: 1000,
			position:'top',
			icon:"success"
		});
		
       let res =await this.$zxl('/getcode',{ email: this.registerForm.email })
	   console.log(res)
		if (res.data.status == 200) {
		  // console.log(res.data.data, "验证码");
		  this.code = res.data.data;
		  this.disabled = false;
		  this.disabledsend = true;
		  let timer = 60;
		  this.sendmsg = timer + "s";
		  this.timeFun = setInterval(() => {
		    --timer;
		    this.sendmsg = timer + "s";
		    if (timer == 0) {
		      this.disabled = true;
		      this.disabledsend = false;
		      this.sendmsg = "重新发送";
		      clearInterval(this.timeFun);
		    }
		  }, 1000);
		}
      }
    },

    //游客身份跳转主页
    zhuye() {
      uni.reLaunch({
      	url:"/pages/index/index",
		animationType:'zoom-fade-out'
      })
    },
    register() {
     uni.reLaunch({
     	url:"/pages/login/login",
		animationType:'zoom-fade-out'
     })
    },
    //qiniu
    uploadImage(content) {
      // 重命名要上传的文件
      const fileName = +new Date() + content.file.name;
      axios("/api/api/get-qiniu-token")
        .then((res) => {
          // 从后端获取上传凭证token
          const formData = new FormData();
          formData.append("file", content.file);
          formData.append("token", res.data.token);
          formData.append("key", fileName);
          /*
           * 另外一种常见的媒体格式是上传文件之时使用的：
           * multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
           * */
          // 获取到凭证之后再将文件上传到七牛云空间

          return axios({
            url: this.url,
            method: "POST",
            data: formData,
          });
        })
        .then((res) => {
          const imageUrl = this.qiniu + "/" + res.data.key;
          this.imageUrl = imageUrl;
          // console.log("更新头像成功", this.imageUrl);
          this.$message.success("上传成功");
          this.registerForm.avatar = this.imageUrl;
        });
    },
   async submit() {
		let { username, password, email, avatar ,code} = this.registerForm;
        if (!(username&&password&&email&&code)) {
         uni.showToast({
         	title: '请填写完整资料！',
         	duration: 1000,
         	position:'top',
			icon:"error"
         })    
        } else {
         let created_at = moment().format("YYYY-MM-DD HH:mm:ss");
         // 请求登录接口
         
         if (this.registerForm.code != this.code) {
           uni.showToast({
           	title: '验证码错误！',
           	duration: 1000,
           	position:'top',
         icon:"error"
           })  
         } else {
       let res=await this.$zxl('/register',{
               username,
               password,
               email,
               created_at,
               avatar,
             },'POST')
               if (res.data.status === 200) {
				 uni.showToast({
				 	title: '恭喜您，注册成功，请登录😊',
				 	duration: 1000,
				 	position:'top',
				 	icon:"success"
				 });
					
				setTimeout(()=>{
					uni.reLaunch({
						url:"/pages/login/login",
						animationType:'zoom-fade-out'
					})
				},1500)
				 
                 //把注册成功的账户和密码存在localStorage里，方便传到登录界面去
                 // let obj = {
                 //   username: this.registerForm.username,
                 //   password: this.registerForm.password,
                 // };
                 // localStorage.setItem("register", JSON.stringify(obj));
               } else if (res.data.status === 304) {
				 uni.showToast({
				 	title: '警告哦，该账户已经存在,换一个名字吧😊',
				 	duration: 1000,
				 	position:'top',
				 	icon:"error"
				 });
                 this.username = "";
               }
             
         }
        }
    
    },
  

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt3M = file.size / 1024 / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!😊");
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!😊");
      }
      return isJPG && isLt3M;
    },
  },
};
</script>

<style lang="less" scoped>
	input{
		 margin: 10rpx;
	border: 2rpx solid #999;
	border-radius: 5rpx;
	background-color: #eee;
	height: 60rpx;
	 }
	 .other{
	 	padding-left: 10rpx;
	 }
	 .title {
	 	width:100%;
	 	display: inline-block;
	   margin-bottom: 30rpx;
	   text-align: center;
	   color: #666;
	 }
.youke {
  // position: absolute;
  // bottom: 1rpx;
  right: 6rpx;
  font-size: 35rpx;
  cursor: pointer;
  color: red;
}
.youke:hover {
  text-decoration: underline;
  color: aqua;
}
.form {
 width: 90%;
 height:900rpx;
 padding-left: 40rpx;
 padding-right: 50rpx;
 margin: 0 auto;
 margin-top: 10rpx;
 padding-top: 20rpx;
 border-radius: 10rpx;
 border: 1rpx solid #eee;
 background: -webkit-linear-gradient(top, pink, #999999);
 position: relative;
 opacity: .9;
}
.title {
  margin-bottom: 30rpx;
  text-align: center;
  color: #666;
}
.zhuce {
  // margin-left: 15rpx;
  font-size: 35rpx;
  color: blueviolet;
  cursor: pointer;
}
.zhuce:hover {
  text-decoration: underline;
  color: brown;
}
.avatar-uploader .upload {
  margin-left: 5rpx;
  border: 1rpx dashed #d9d9d9;
  border-radius: 6rpx;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .upload:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 28rpx;
  color: #8c939d;
  width: 178rpx;
  height: 178rpx;
  line-height: 178rpx;
  text-align: center;
  background-color: white;
}
.avatar {
  width: 178rpx;
  height: 178rpx;
  display: block;
}
footer {
margin-top: 20rpx;
// margin-left: 10rpx;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.code_input{
	display: flex;
	justify-content: space-between;
}
.code_input input{
	width: 300rpx;
}
.code_input button{
	height: 60rpx;
	margin: 10rpx;
	text-align: center;
	line-height: 60rpx;
}
 button{
	 margin-top: 40rpx;
 }
</style>
