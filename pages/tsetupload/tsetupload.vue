<template>
  <view>
    <view>
      <img src="http://lwandzxl.top/1684754068802mmexport1624941994116.jpg" mode="widthFix">
      <view class="btn-box">
        <!-- <button type="success" @click="save">保存图片</button> -->
        <button type="success" @click="down">开始下载</button>
        <button type="success" @click="restart">重新下载</button>
        <button type="success" @click="zt">暂停下载</button>
        <button type="success" @click="jx">继续下载</button>
        <button type="success" @click="qx">取消下载</button>
        <!-- <button type="success" @click="fGetSavedFileList">获取目录</button> -->

        <!-- <button type="primary" @click="zt">停止下载</button> -->
      </view>
	  <progress :percent="zxl" show-info></progress>
	   <text>{{current}}/{{total}}</text>
	   <view class="">
	   	{{word}}
	   </view>
    </view>
	<video src="_downloads/郎小宝.mp4"></video>
	<view class="">
		{{aFileList}}
	</view>
  </view>
</template>
<script>
	
export default {
  data (){
    return{
      image:'http://lwandzxl.top/1684754068802mmexport1624941994116.jpg',
	  downloaddownload:'',
	  zxl:0,
	  current:'',
	  total:'',
	  downFileName:'郎小宝.mp4',
	  word:'',
	  aFileList:'555'
    }
  },
  onLoad() {
  	uni.getSavedFileList({
		success: function (res) {
  	    console.log(res.fileList,'文件55');
  	  }
  	});
  // this.fGetSavedFileList()
	plus.downloader.enumerate( function ( tasks ) {
			// alert( "Unfinished task count: " + tasks.length );
			console.log(tasks,'下载任务')
  })

  },
  methods:{
	  zt(){
		  this.downloaddownload.pause()
	  },
	  jx(){
		  this.downloaddownload.resume()
	  },
	  qx(){
		  this.downloaddownload.abort()
	  },
	  restart(){
		  this.downloaddownload.abort()
		  this.down()
	  },
     down(){
		var url = "http://lwandzxl.top/168477759468783143912-1-208.mp4"
		this.downloaddownload = plus.downloader.createDownload(url, {
			filename: "_doc/uniapp_save/郎小宝/" + this.downFileName //利用保存路径，实现下载文件的重命名
		},(d, status)=> {
			//d为下载的文件对象
			if (status == 200) {
				uni.showToast({
					icon: 'none',
					mask: true,
					title: '已保存到文件夹：/storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/doc/uniapp_save/郎小宝' + this.downFileName, //保存路径
					duration: 3000,
				});
				//下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
				let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
			} else {
				plus.downloader.clear(); 
				uni.showToast({
					icon:'none',
					mask:true,
					title: '下载失败，请稍后重试',
				});
			}
		})
		this.downloaddownload.start()
		var that=this
		this.downloaddownload.addEventListener('statechanged', function(download,status){
			switch (download.state) {
				case 1:
				that.word="正在下载"
			  break;
		case 2:
			that.word="已连接到服务器";
			break;
		case 3:
		
			that.word="正在下载";
			break;
		case 4:
			that.word="下载完成"
			break;
													}
			console.log(download,'download')
			console.log(status,'status')
			that.current=download.downloadedSize
			that.total=download.totalSize
			that.zxl=parseInt(parseFloat(download.downloadedSize) / parseFloat(download.totalSize) * 100)
		})
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