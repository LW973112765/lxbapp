<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view>
                <video vslide-gesture="true" :title="title" autoplay id="myVideo" style="width: 100%;height: 400rpx;" :src="video"
                 :danmu-list="danmu" @timeupdate="time" loop="true" enable-danmu danmu-btn controls></video>
            </view>
            <!-- #ifndef MP-ALIPAY -->
            <view class="danmu">
                <view class="uni-list-cell">
                    <view>
                        <view class="uni-label">弹幕内容</view>
                    </view>
                    <view class="uni-list-cell-db">
                        <input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
                    </view>
                </view>
            </view>
            <view class="uni-btn-v">
                <button @click="sendDanmu" class="page-body-button">发送弹幕</button>
            </view>
            <!-- #endif -->
        </view>
		
			<l-barrage :minTop="minTop" :maxTop="maxTop" class="danmuzujian" ref="lBarrage" @end="onEnd"></l-barrage>
	
		<view>
	
		</view>
    </view>
</template>
<script>
import { mapState } from "vuex";
export default {
	// components:{lBarrage},
    data() {
        return {
             id:'',
			 title:'',
			 video:'',
			 total:'',
			 videoinfo:'',
            danmu:[],
            danmuValue: '',
			currenttime:'',
				list: [],
				minTop:5,
				maxTop:90,
				newlist:[],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				downloaddownload:'',
				zxl:0,
				current:'',
				totaltime:'',
				word:'',
				aFileList:'555',
				durationname:'duration',
				covername:'cover',
				titlename:'title',
				idname:"id",
				videolist:[],
				restart:true
        }
    },
	onLoad(e) {
		console.log(e)
		this.id=e.id
		this.video=e.filePath
		this.title=e.name
		uni.setNavigationBarTitle({
		      title: e.name
		    })
        this.danmu=JSON.parse(uni.getStorageSync('danmu'))
		this.danmumove()
	
	},
	
    onReady: function(res) {
        this.videoContext = uni.createVideoContext('myVideo')
		
    },
	computed: {
	  ...mapState("loginModule", ["userinfo"]),
	},
    methods: {
		danmumove(){
			// var newlist=[]
			var that=this
			this.danmu.forEach((item,index)=>{
						  that.newlist.unshift(item.text)
			})
			this.list =this.newlist
			setTimeout(() => {
				this.$refs.lBarrage.start(this.list);
			}, 1000);
		},
		onEnd() {
			console.log("一轮结束");
			this.$refs.lBarrage.start(this.list);
		},
		time(e){
			this.currenttime=parseInt(e.target.currentTime)
		},
		async send(params){
		   let res = await this.$zxl('/senddanmu',params,'POST')
		    if(res.data.status==200){
				uni.showToast({
					title:"发送成功",
					position:"top",
					duration:1000,
					icon:"success"
				})
			}
		},
       sendDanmu() {
		    if(!this.userinfo.username){
				uni.showToast({
							title:"请先登录！",
							position:"top",
				icon:"error"
							 })
			}else{
				if(this.danmuValue.trim()==''){
			uni.showToast({
			title:"输入为空！",
			position:"top",
		   icon:"error"
			 })
				}
				else{
					 var pbgjz = ['草','智障', '垃圾', '影视', '黄色', '杂种', 'qq', '操', '妈', '逼', '滚', '网址', '网站', '支付宝', '加我', '微信', '联系',
					 	'号码', 'weinxin', '企', 'www', 'com',
					 	'fun', 'net', 'top', 'xyz', 'fun', 'wang', 'xin', 'cn', 'shop', '@', '傻', 'wx', 'tv', '欢迎',
					 	'下载', '链接', 'q', 'n', 'o', 'c', 'm', 'e', '脑瘫', 'TMD', 'TM', 'tm', 'tama', 'nima', 'sb', '2b', '死',
					 	'狗'
					 ];
					
							   let danmu= {
							   	text: this.danmuValue,
							   	color: this.getRandomColor(),
							   	time:this.currenttime,
							   	videoid:this.id
							   }
							   for (var i = 0; i <= pbgjz.length; i++) {
							   	if (danmu.text.indexOf(pbgjz[i]) !== -1) {
							   		uni.showToast({
							   			icon: 'none',
							   			title: "违规内容封号警告",
							   			duration: 2000
							   		});
							   	this.danmuValue=''
							   		return
							   	}
							   }
							   console.log(danmu,'弹幕')
							   this.videoContext.sendDanmu(danmu);
							   this.newlist.push(danmu.text)
							   this.danmumove()
							   this.send(danmu);
							   this.danmuValue = '';
				}
			}
			
        },
  
        getRandomColor: function() {
            const rgb = []
            for (let i = 0; i < 3; ++i) {
                let color = Math.floor(Math.random() * 256).toString(16)
                color = color.length == 1 ? '0' + color : color
                rgb.push(color)
            }
            return '#' + rgb.join('')
        }
    }
}
</script>
<style scoped lang="scss">
	.danmuzujian{
		width: 100%;
		height: 400rpx;
		margin-top: 30rpx;
		/* background-color: red; */
	}
	.danmu{
		margin-top: 20rpx;
	}
button{
	width: 300rpx;
	margin-top: 30rpx;
	height: 100rpx;
}
	text{
	width: 700rpx;
		
	}
	progress{
				width: 700rpx;
			}
	.popup-content {
		display:  flex;
		// flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
		width: 750rpx;
		height: 700rpx;
		padding-top: 100rpx;
		// background-color: #fff;
		background: -webkit-linear-gradient(top, pink, #999999)
		
		
	}
</style>
