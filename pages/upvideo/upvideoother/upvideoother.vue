<template>
	<view class="tui-container">
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
		<view class="tui-upload-box">
			<view class="tui-Video-item" v-if="video">
				<video  autoplay  :src="video" class="tui-item-video"  mode="aspectFill"></video>
			</view>
			
		</view>
		
		<view class="cover" v-if="cover">
			<image  :src="cover" mode=""></image>
		</view>
		<view class="title">
			<view class="box">
				<text>视频链接</text> <textarea maxlength="-1" v-model="video"  placeholder="请输入视频链接" auto-height>
				</textarea>
			</view>
			<view class="box">
				<text>视频介绍</text> <textarea  v-model="title"  placeholder="请输入视频介绍" auto-height>
				</textarea>
			</view>
			<view class="box">
				<text>视频封面</text> <textarea  v-model="cover"  placeholder="请输入视频封面链接" auto-height>
				</textarea>
			</view>
			<view class="box">
				<text>视频时长</text> <textarea  v-model="duration"  placeholder="请输入视频时长" auto-height>
				</textarea>
			</view>
		</view>
		<button type="primary" style="margin-top: 30rpx;" @click="uploadvideo">上传</button>
	</view>
</template>
<script>//获取应用实例
import moment from "moment";
	export default {
		data() {
			return {
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				url:"https://up.qiniup.com",
				qiniu: "http://lwandzxl.top",
				cover:'',
			    title:'',
			 	video:'',
				duration:'',
				
			}
		},
		methods: {
		
			messageToggle(type,zxl) {
				this.msgType = type
				this.messageText =zxl
				this.$refs.message.open()
			},
		//把视频上传七牛云和数据库
					uploadvideo( ){
					if(this.video==''){
						uni.showToast({
					    icon: 'none',
					    mask: true,
					    title: '请输入视频链接😊',
					    duration: 1000,
						 });
					}
					else if(this.title.trim()=='') {
						 uni.showToast({
						icon: 'none',
						mask: true,
						title: '请填写视频介绍😊😊',
						duration: 1000,
						 });
					 }
					  else if(this.cover==''){
							 uni.showToast({
						 	icon: 'none',
							mask: true,
						title: '请输入视频封面链接😊',
						duration: 1000,
					 });
					}
					else if(this.duration==''){
							 uni.showToast({
						 	icon: 'none',
							mask: true,
						title: '请输入视频时长😊',
						duration: 1000,
					 });
					}
					else{
					var that=this
					uni.showLoading({ title: "上传中...", mask: true });
					let obj= {
					title:that.title,
					video:that.video,
					duration:that.duration,
					cover:that.cover
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
								that.video=''
							 // this.messageToggle('success','上传成功')
												 uni.showToast({
												 	icon: 'none',
												 			mask: true,
												 			title: '上传成功😊',
												 			duration: 1000,
												 					 });
						}
					})
					
					
						
					}
					
					
				}}
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