<template>
  <view>
    <view>
      <img src="http://lwandzxl.top/1684754068802mmexport1624941994116.jpg" mode="widthFix">
      <view class="btn-box">
        <button type="success" @click="save">保存图片</button>
        <button type="success" @click="down">开始下载</button>

        <button type="primary" @click="zt">停止下载</button>
      </view>
	  <progress :percent="zxl" show-info></progress>
	   <text>{{current}}/{{total}}</text>
    </view>
  </view>
</template>
<script>
	
export default {
  data (){
    return{
      image:'http://lwandzxl.top/1684754068802mmexport1624941994116.jpg',
	  downloadTask:'',
	  zxl:0,
	  current:'',
	  total:'',
	  luj:''
    }
  },
  onLoad() {
  	uni.getSavedFileList({
  	  success: function (res) {
  	    console.log(res.fileList,'文件');
  	  }
  	});
  },
  methods:{

	  save(){
		  uni.downloadFile({//下载
		  	url: this.image, //图片下载地址网络地址
		  		success: res => {
		  			if (res.statusCode === 200) {
		  			  uni.saveFile({
		  			      tempFilePath: res.tempFilePath,
		  			      success: function (res) {
		  			        var savedFilePath = res.savedFilePath;
							console.log(res,'保存')
		  			      }
		  			    });
		  						}
		  					}
		  				});
	  },
     down(){
		this.downloadTask = uni.downloadFile({
		 	url: 'http://lwandzxl.top/168477759468783143912-1-208.mp4', //仅为示例，并非真实的资源
		 	success: (res) => {
		 		if (res.statusCode === 200) {
		 			console.log('下载成功');
		 		}
				  let that = this;
				                uni.saveFile({
				                    tempFilePath: res.tempFilePath,
				                        success: function(red) {
				                            that.luj = red.savedFilePath
				                            console.log(red,'路径')
				                        }
				                    });
		 	}
		 });
		 
		 this.downloadTask.onProgressUpdate((res) => {
		 	console.log('下载进度' + res.progress);
			this.zxl=res.progress
			this.current=res.totalBytesWritten
			this.total=res.totalBytesExpectedToWrite
		 	console.log('已经下载的数据长度' + res.totalBytesWritten);
		 	console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
		 
		 	// 满足测试条件，取消下载任务。
		 	// if (res.progress > 50) {
		 	// 	downloadTask.abort();
		 	// }
		 });
	 },
	 zt(){
		 this.downloadTask.abort();
	 },
  }
}
</script>
<style scoped>
	img{
		width: 300rpx;
		height: 300rpx;
	}

</style>