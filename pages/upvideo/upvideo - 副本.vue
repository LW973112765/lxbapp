<template>
	<view class="tui-container">
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
		<view class="tui-upload-box">
			<view class="tui-Video-item" v-if="backUrl">
				<video  autoplay  :src="backUrl" class="tui-item-video"  mode="aspectFill"></video>
			<!-- <view  class="tui-video-del" @click="delVideo"></view> -->
			
				<!-- <cover-image v-if="backUrl" @click="delImage" class="image" src="../../static/images/fonts/cl2.png" mode=""></cover-image> -->
		
			</view>
			<view  class="tui-upload-add" @click="choosevideo()" v-else>
				<view class="tui-upload-icon tui-icon-plus"></view>
			</view>
			
		</view>
		<view v-show="0" class="" :vsrc="vsrc" :change:vsrc="renderScript.vimghuode">
			
		</view>
		<view class="cover" v-if="backUrl&&cover">
			<image  :src="cover" mode=""></image>
		</view>
		
		<view class="title">
			<text>视频介绍</text> <textarea  v-model="title"  placeholder="请输入视频介绍" auto-height>	
		</textarea>
		</view>
		<button type="primary" style="margin-top: 30rpx;" v-if="backUrl" @click="renderScript.fasong_vimg">获取视频封面</button>
		<button type="primary" style="margin-top: 30rpx;" v-if="backUrl" @click="choosevideo">重新选择视频</button>
		<button type="primary" style="margin-top: 30rpx;" @click="uploadvideo">上传</button>
	</view>
</template>
<script>//获取应用实例
import moment from "moment";
	export default {
		data() {
			return {
				vsrc:null,//用于renderjs通信
				backUrl:'',
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				url:"https://up.qiniup.com",
				qiniu: "http://lwandzxl.top",
				cover:'',
			    title:'',
			 	video:'',
				duration:''
	
				
			}
		},
		methods: {
			jiehsou_vimg(data){
				//data.test为返回的封面图
					console.log(data.test,'返回的封面图')
					this.cover=data.test
			},
			fengmian(cover){
				var that =this
				console.log('视频详细信息')
				uni.getVideoInfo({//视频详细信息
					src:cover,
					success(e) {
						console.log(e,'视频详细信息')
						let jihe={};
						jihe.src=cover;
						let h,w;
						if(e.orientation=="left"||e.orientation=="right"||e.orientation=="left-mirrored"||e.orientation=="right-mirrored"){
							h=e.width;
							w=e.height;
						}else{
							w=e.width;
							h=e.height;
						}
						
						jihe.width=w;
						jihe.height=h;						
						that.vsrc=jihe;//因change调用renderScript.vimghuode方法获取封面
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			messageToggle(type,zxl) {
				this.msgType = type
				this.messageText =zxl
				this.$refs.message.open()
			},
			delImage(){
				this.backUrl=''
			},
			choosevideo() {
				this.backUrl=''
				this.cover=''
				let that=this
			uni.chooseVideo({
			        count: 1, //默认9
					compressed:false,
			        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
			        sourceType: ["album", "camera"], //从相册选择
			        success: function (res) {
						 // uni.showLoading({ title: "上传中...", mask: true });
						console.log(res,'地址')
			         that.backUrl=res.tempFilePath	 
					 that.duration=moment(res.duration * 1000).format("mm:ss");
					 that.fengmian(res.tempFilePath)
			        },
			    });

					},
					//上传数据库
				 postvideo(video){
					 if(this.backUrl==''){
						 uni.showToast({
						 	icon: 'none',
						 	mask: true,
						 	title: '请先上传视频😊',
						 	duration: 1000,
						 });
				 }
				 else if(this.title.trim()=='')
					 {
						 uni.showToast({
						 	icon: 'none',
						 	mask: true,
						 	title: '请填写视频介绍😊😊',
						 	duration: 1000,
						 });
						 }
				   else	if(this.cover==''){
					    uni.showToast({
					   		icon: 'none',
					   				mask: true,
					   				title: '请获取视频封面😊',
					   				duration: 1000,
					   						 });
				 }
				 else{
					 let obj= {
							title:this.title,
							video:video,
							duration:this.duration,
							cover:this.cover
						 }
						 console.log(obj,'数据')
					 uni.request({
					 	url:'http://60.204.219.215/api/api/postvideo',
					 	data:obj,
					 	method:"POST",
					   header: { 'content-type': 'application/x-www-form-urlencoded' },
					 	success: (res) => {
					 		console.log(res)
					 		    uni.hideLoading();
					 		 // this.messageToggle('success','上传成功')
							 uni.showToast({
							 	icon: 'none',
							 			mask: true,
							 			title: '上传成功😊',
							 			duration: 1000,
							 					 });
					 	}
					 })
					  // let res = await this.$zxl('/postvideo',
						 // {
							// title:this.title,
							// video:this.video,
							// duration:this.duration,
							// cover:this.cover
						 // },
						 //  'POST'
						 //  )
						 //  if(res.data.status==200){
							//   console.log('成功')
					  //     uni.hideLoading();
					  //  this.messageToggle('success','上传成功')
						 //  }
				 }
			
					},
					//把视频上传七牛云
					uploadvideo( ){
						var video=this.backUrl
						var that=this
				 	 uni.showLoading({ title: "上传中...", mask: true });
						uni.request({
						    url: "http://60.204.219.215/api/api/get-qiniu-token",//请求七牛云token的接口
						    data: {},
						    method: "GET",
						    success: (suc1) => {
								console.log(suc1,'token')
						            // let video = res.tempFilePaths[0]
									console.log(video)
						            let key = +new Date()+ '.mp4'
						            uni.uploadFile({
						                url: "https://up.qiniup.com",
						                filePath: video,
						                name: 'file',
						                method: "POST",
						                formData: {
											"file": video,
						                    'key': key,
						                    'token': suc1.data.token 
						                },
						                success: uploadFileRes => {
						                        let strToObj=JSON.parse(uploadFileRes.data);
						                       let  videourl= that.qiniu + "/" + strToObj.key;
											   that.video=videourl
						                          console.log(strToObj.key,'key')
						                          console.log( videourl,'视频地址')
											that.postvideo(videourl)
						      
												
						                },
						                fail: fail => {
						                    uni.showToast({ title: "网络错误", icon: "none" });
						            uni.hideLoading();
									
						                }
						            })
						    }, fail: fail => {
						        uni.showToast({ title: "网络错误", icon: "none" });
						          uni.hideLoading();
						    }
						})
					},
					
				}
			}
</script>
<script module="renderScript" lang="renderjs">
	export default {
		data() {
			return {
				test:""
			}
		},
		mounted() {
			
		},
		methods: {
			//通过视频获得缩略图
			vimghuode(newValue, oldValue, ownerVm, vm){
				if(newValue==null)
					return;
				let that=this;
				// 在缓存中创建video标签
				let video = document.createElement("VIDEO")
				// 添加一个静音的属性，否则自动播放会有声音
				// video.setAttribute('muted', true)
				video.muted=true
				// 通过setAttribute给video dom元素添加自动播放的属性，因为视频播放才能获取封面图
				video.autoplay=true;
				//允许跨域访问
				video.crossOrigin='anonymous';
				// 上面我们只是创建了video标签，视频播放需要内部的source的标签，scr为播放源
				video.innerHTML = '<source src=' + newValue.src + ' type="audio/mp4">'
				// 再创建canvas画布标签
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d');
				// video注册canplay自动播放事件
				video.addEventListener('canplay', function() {
					// 创建画布的宽高属性节点，就是图片的大小，单位PX
					let anw = document.createAttribute("width");
					anw.nodeValue = newValue.width;
					let anh = document.createAttribute("height");
					anh.nodeValue = newValue.height;
					canvas.setAttributeNode(anw);
					canvas.setAttributeNode(anh);
					// 画布渲染
					ctx.drawImage(video, 0, 0, newValue.width, newValue.height);
					// 生成图片
					that.test = canvas.toDataURL('image/png') // 这就是封面图片的base64编码
					// 视频结束播放的事件
					video.pause()
				}, false)
			},
			//此方法用户在template中手动操作触发
			fasong_vimg(event, ownerInstance){
				ownerInstance.callMethod('jiehsou_vimg', {
					test: this.test
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	@font-face {
		font-family: 'tuiUpload';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=) format('woff');
		font-weight: normal;
		font-style: normal;
	}
textarea{
	width: 500rpx;
	margin: 0 auto;
	border: #B2B2B2 solid 5rpx;
}
.title{
	margin-bottom: 50rpx;
}
.title text{
	display: block;
	width: 100%;
	text-align: center;
}
	.tui-upload-icon {
		font-family: "tuiUpload" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 10rpx;
	}

	.tui-icon-delete:before {
		content: "\e601";
	}

	.tui-icon-plus:before {
		content: "\e609";
	}
.image{
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			width: 80rpx;
			height: 80rpx;
			z-index: 9999;
		}
	.tui-upload-box {
		position: relative;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		
	}

	.tui-upload-add {
		width: 220rpx;
		height: 220rpx;
		margin: 0 auto;
		font-size: 68rpx;
		font-weight: 100;
		color: #888;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.tui-Video-item {
		width: 700rpx;
		height: 400rpx;
		position: relative;
		margin: 0 auto;
	}
  .cover{
	  // display: block;
	  width: 700rpx;
	  height: 400rpx;
	  margin: 20rpx auto;
	  position: relative;
	  image{
		  width: 700rpx;
		  height: 400rpx;
	  }
	  // margin: 30rpx auto;
  }
	.tui-Video-item:nth-of-type(3n) {
		margin-right: 0;
	}

	.tui-item-video {
		width: 700rpx;
		height: 400rpx;
		display: block;
	}

	.tui-video-del {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		right: -12rpx;
		top: -12rpx;
		background: #EB0909;
		border-radius: 50%;
		color: white;
		font-size: 34rpx;
		z-index: 999;
	}

	.tui-video-del::before {
		content: '';
		width: 16rpx;
		height: 1px;
		position: absolute;
		left: 10rpx;
		top: 18rpx;
		background: #fff;
	}

	.tui-upload-mask {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		padding: 40rpx 0;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.6);
	}

	.tui-upload-loading {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		border: 2px solid;
		border-color: #B2B2B2 #B2B2B2 #B2B2B2 #fff;
		animation: tui-rotate 0.7s linear infinite;
	}

	@keyframes tui-rotate {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.tui-tips {
		font-size: 26rpx;
		color: #fff;
	}

	.tui-mask-btn {
		padding: 6rpx 16rpx;
		border-radius: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		border: 1rpx solid #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-hover {
		opacity: 0.5;
	}
</style>