<template>
  <view>
    <view>
      <img src="http://lwandzxl.top/1684754068802mmexport1624941994116.jpg" mode="widthFix">
      <view class="btn-box">
        <!-- <button type="success" @click="save">保存图片</button> -->
        <button type="success" @click="down">开始下载</button>
        <button type="success" @click="zt">暂停下载</button>
        <button type="success" @click="jx">继续下载</button>
        <button type="success" @click="fGetSavedFileList">获取目录</button>

        <!-- <button type="primary" @click="zt">停止下载</button> -->
      </view>
	  <progress :percent="zxl" show-info></progress>
	   <text>{{current}}/{{total}}</text>
	   <view class="">
	   	{{word}}
	   </view>
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
	  luj:'',
	  downFileName:'555.mp4',
	  word:'',
	  aFileList:''
    }
  },
  onLoad() {
  	uni.getSavedFileList({
		 filePath:"file://storage/emulated/0/郎小宝/",
		success: function (res) {
  	    console.log(res.fileList,'文件');
  	  }
  	});
  // this.fGetSavedFileList()
	plus.downloader.enumerate( function ( tasks ) {
			// alert( "Unfinished task count: " + tasks.length );
			console.log(tasks,'下载任务')
  })
  },
  methods:{
	  // 获取本地的已下载文件列表
	  			fGetSavedFileList() {
	  				this.aFileList = [];
	  				plus.io.resolveLocalFileSystemURL(
	  						"_doc/uniapp_save/", //指定的目录
	  						(entry) => {
	  							var directoryReader = entry.createReader(); //获取读取目录对象
	  							directoryReader.readEntries(
	  								(entries) => { //返回的是指定文件夹下的文件列表和                                    uni.getSavedFileList(OBJECT)效果一样
	  									console.log(entries,'文件')
	  									this.aFileList = entries
	  								},
	  								(err) => {
	  									console.log("访问目录失败");
	  								});
	  						},
	  						(err) => {
	  							console.log("访问指定目录失败:" + err.message);
	  						});
	   
	   
	   
	  			},
	
	  zt(){
		  this.downloaddownload.pause()
	  },
	  jx(){
		  this.downloaddownload.resume()
	  },
     down(){
		// var url = "http://lwandzxl.top/168477759468783143912-1-208.mp4"
		var url = "http://lwandzxl.top/%E5%8D%88%E5%A4%9C0%E6%97%B6%E7%9A%84%E5%90%BB.mp4"
		this.downloaddownload = plus.downloader.createDownload(url, {
			filename: "file://storage/emulated/0/郎小宝/" + this.downFileName //利用保存路径，实现下载文件的重命名
		},(d, status)=> {
			//d为下载的文件对象
			if (status == 200) {
				uni.showToast({
					icon: 'none',
					mask: true,
					title: '已保存到文件夹：/郎小宝/' + this.downFileName, //保存路径
					duration: 3000,
				});
				//下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
				let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
				//选择软件打开文件
				// setTimeout(()=>{
				// 	plus.runtime.openFile(d.filename); 
				// },1500)
			} else {
				//下载失败
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
			// 给下载任务设置一个监听 并根据状态  做操作
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