<template>
	<view class="home">
		测试
		<button @click="upimg">图片上传</button>
		<image :src="backUrl"></image>
	</view>
</template>

<script>//获取应用实例
import axios from "axios";
	export default {
		data() {
			return {
				backUrl:'',
				url:"https://up.qiniup.com",
				qiniu: "http://lwandzxl.top"
			}
		},
		methods: {
			uploadImage(content){
			     console.log(content, "图片地址content");
			     // 重命名要上传的文件
			     const fileName = +new Date() + content.name
			     axios("http://60.204.219.215/api/api/get-qiniu-token")
			       .then((res) => {
			         // 从后端获取上传凭证token
			         const formData = new FormData();
			         formData.append("file", content);
			         formData.append("token", res.data.token);
			         formData.append("key", fileName);
			         return axios({
			           url: this.url,
			           method: "POST",
			           data: formData,
			         });
			       })
			       .then((res) => {
			         const imageUrl = this.qiniu + "/" + res.data.key;
			         this.backUrl = imageUrl;
			         console.log("更新头像成功", imageUrl);
			         // this.ruleForm.url = this.imageUrl;
			       });
			   },
			upimg() {
				
				let that=this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success:(res)=> {
						console.log(res,'上传')
	                  let content= res.tempFiles[0];
					   this.uploadImage(content)//拿到里面的	
							},
						
						})

					},
				}
			}
</script>

<style>
	.home {}
</style>