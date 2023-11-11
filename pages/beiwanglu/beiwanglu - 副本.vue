<template>
    <view>
		<view class="header">
			<view class="top" v-if="!isquanxuan && !issearch">
				<text style="font-size: 30rpx; font-weight: bold;">备忘录</text>
				<image @click="changeModel" src="../../static/images/other/quanxuan.png" mode=""></image>
			</view>
			<view class="top2" v-if="isquanxuan && !issearch">
				<text>已选择{{length+'个'}}项目</text>
				<text style="color: royalblue;" @click="changeModel">取消</text>
			</view>
			<view class="bottom">
				<input @focus="focus" :disabled="isquanxuan" type="text" placeholder="搜索备忘录"> <text  v-if="issearch">取消</text>
			</view>
		</view>
         <view class="content" v-if="dataList.length>0&& !issearch">
         	<me-select
         	ref="meSelect" 
         	@change="change" 
         	@finish="finish" 
         	@itemClick="itemClick" 
         	:datalist="dataList"
         	:options="options"
         	>
         	    <view slot-scope="slot" class="item">
         	       <!-- 这里可以写自己的模板 -->
				   <view class="main">
				   	<view class="shang">
				   		{{slot.slotScope.item.title}}
				   	</view>
					<view class="zhong">
					{{slot.slotScope.item.content}}
					</view>
					<view class="xia">
						{{slot.slotScope.item.date}}
						
					</view>
				   </view>
         	       <!-- <view>{{slot.slotScope.item.id}}</view> -->
         	    </view>
         	</me-select>
         </view>
    </view>
</template>

<script>
	import { mapState } from "vuex";
	import moment from "moment";
	import meSelect from '@/components/me-select/me-select.vue'
	export default {
		 components: {
		            meSelect
		        },
		data() {
			return {
				isquanxuan:false,
				issearch:false,
				width:'0rpx',
				length:"",
				options: {
				 flags: ["id"], //设置需要返回的参数这个参数必须在 dataList 中的item中存在（不配置默认全部返回）
				 itemCanSelect: true //是否开启点击列表页选择配置
				                },
			  dataList: []
			};
		},
		computed: {
				  ...mapState("loginModule", ["userinfo"]),
				},
		     onLoad() {
		     	this.getmemo()
		     },
		        methods: {
					focus(){
						this.issearch=!this.issearch
					
					},
					async getmemo(){
						let res=await this.$zxl('/getmemo',{id:this.userinfo.id})
					
						  res.data.data.forEach((data) => {
						            data.date = moment(data.date).format(
						              "YYYY-MM-DD HH:mm:ss"
						            );
									Object.defineProperty(data,'select',{
										value:false,
										writable:true,
										enumerable:true
									})
						          });
								
						this.dataList=res.data.data
									console.log(res.data.data)  
					},
		            changeModel() {
		                this.$refs.meSelect.changeModel()
						this.isquanxuan=!this.isquanxuan
		            },
		            // getSelectAll() {
		            //     var result = this.$refs.meSelect.getSelectAll()
		            //     console.log('当前全选：', result)
		            // },
		            itemClick(e) {
		                console.log('列表点击了：', e)
		            },
		            finish(e) {
		                console.log('所有的选择：', e)
		            },
		            change(e) {
		                console.log('发生改变了：', e)
				this.length=e.length
		            }
		        },
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:"/pages/addbeiwanglu/addbeiwanglu",
				animationType:'zoom-fade-out'
			})
		},
	}
</script>

<style lang="scss">
	.main{
		// width: 700rpx;
		border-radius: 10rpx;
		height: auto;
		padding: 30rpx;
		background: -webkit-linear-gradient(top,  #999999,pink);
		.shang{
			font-size: 40rpx;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.zhong,.xia{
			color:#999
		}
		.zhong{
			// line-height: 25rpx;
			padding: 10rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		
		
	}
 
	.header{
		width: 750rpx;
		// height: 100rpx;
		box-sizing: border-box;
		position: fixed;
		padding: 10rpx 17rpx;
		z-index: 55;
		top:0; 
		left: 0;
		background-color: whitesmoke;
		input{
			margin-top: 20rpx;
			flex:1;
			height: 80rpx;
			border-radius: 5rpx;
			background-color: darkgrey;
		}
		.top ,.top2{
			z-index: 55;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			image{
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	.content{
		position: relative;
		top:150rpx;
	}
	.bottom{
		transition: all 0.5s;
		display: flex;
		flex-wrap: nowrap;
		text{
			margin-top: 20rpx;
			line-height: 80rpx;
			height: 80rpx;
		}
	}
</style>
