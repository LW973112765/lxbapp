<template>
	<view>
		<view class='box-turn-pg' :style="style">
			<view @click="log" class='box_item-turn-pg' v-for="(item,index) in list_dyc" :key="index" @touchstart='touchstart' @touchend="touchend"
			 :animation="index === 0 ? animationData : ''">

				<view class="txt-box-turn-pg">
					<view ref="zxl" class="zxl" :style="style_box">{{item.txt}}</view>
					<!-- <image v-if="item.img" :style="style_img" lazy-load="true" @error="onImageError(item)" :src="item.img" /> -->
				</view>

				<view class="btm-box-turn-pg">
					<view class="btm-box2">

						<view class="btn-bk-l">{{item.size}}</view>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: String,
				default () {
					return ''
				}
			},

			height: {
				type: Number,
				default: 0
			},
			width: {
				type: Number,
				default: 0
			},

			themeColor: {
				type: String,
				default: '#FFFFFF',
			},
			txtColor1: {
				type: String,
				default: '#3498db', 
			},
			txtColor2: {
				type: String,
				default: '#f47920', 
			},
			txtColor3: {
				type: String,
				default: '#d71345', 
			},
			txtColor4: {
				type: String,
				default: '#f7acbc', 
			},
			txtColor5: {
				type: String,
				default: '#ffd400', 
			},
			
			txtColor6: {
				type: String,
				default: '#3498db', 
			},
			txtColor7: {
				type: String,
				default: '#f47920', 
			},
			txtColor8: {
				type: String,
				default: '#d71345', 
			},
			txtColor9: {
				type: String,
				default: '#f7acbc', 
			},
			txtColor10: {
				type: String,
				default: '#ffd400', 
			},
			txtColor11: {
				type: String,
				default: '#3498db', 
			},
		},
		computed: {
			style_box() {
				let that = this;
				var style = '';
				style += `background-image: -webkit-linear-gradient(left, ${that.txtColor1}, ${that.txtColor2} 10%, ${that.txtColor3} 20%, ${that.txtColor4} 30%, ${that.txtColor5} 40%, ${that.txtColor6} 50%, ${that.txtColor7} 60%, ${that.txtColor8}  70%, ${that.txtColor9} 80%, ${that.txtColor10} 90%, ${that.txtColor11});`;
				return style;
			},
			style() {
				let that = this;
				var height = parseInt(that.height);
				var width = parseInt(that.width);
				var style = '';
				if (height > 0) {
					style = `height:${height}rpx;`;
				}
				if (width > 0) {
					style += `width:${width}rpx;`;
				}

				return style;
			},
			style_img() {
				let that = this;
				var width = parseInt(that.width);
				var style = '';
				if (width > 0) {
					let width_img = width / 3;
					style += `height:${width_img}rpx;width:${width_img}rpx;`;
				}

				return style;
			},
		},

		watch: {
			list(e) {
				let that = this;
				that.list_dyc = e;
			},
		},
		data() {
			return {
				nowPgae: 1,
				startX: 0,
				slider: false,
				animationData: {},
				list_dyc: [],
			};
		},
		created: function() {
			// this.list_dyc = this.list;
			let num = Math.ceil(this.list.length/48)
			for(var i=1;i<=num;i++){
				let lw=i
				let zxl={}
				zxl.txt=this.list.substring((i-1)*48,(i-1)*48+48)
				zxl.size=i
				this.list_dyc.push(zxl)
			}
			// console.log(this.list_dyc)
		},
		methods: {
			
			log(){
				// console.log(this.$refs.zxl,'郎伟')
			},
			onImageError(item, index) {
				//虽触发，但不会显示默认的图片				
				this.error = null; //这个暂没有发现作用

				let obj = {
					index: index,
					list: this.list
				};
				this.$emit('Error', obj);
			},
			touchstart(e) {
				this.startX = e.changedTouches[0].clientX
			},
			touchend(e) {
				let that = this;
				let startX = this.startX;
				let endX = e.changedTouches[0].clientX;
				if (this.slider) return;
				// 下一页(左滑距离大于30)
				if (startX - endX > 30) {
					this.slider = true
					//尾页(当前页 等于 总页数)
					if (this.nowPgae == this.list_dyc.length) {
						this.slider = false
						uni.showToast({
							title: '已经是最后一张了',
							icon: 'none'
						});
						return;
					};
					//创建动画   5s将位置移动到-150%,-150%
					let animation = uni.createAnimation({
						duration: 500,
					});
					animation.translateX('-150%').translateY('-150%').rotate(60).step();
					this.animationData = animation.export()
					// 移动完成后
					setTimeout(function() {
						var list_dyc = that.list_dyc;
						var slidethis = that.list_dyc.shift(); //删除数组第一项
						that.list_dyc.push(slidethis); //将第一项放到末尾
						//创建动画   将位置归位
						let animation = uni.createAnimation({
							duration: 0,
						});
						animation.translateX('-53%').translateY('-50%').rotate(0).step();
						that.list_dyc = that.list_dyc;
						that.animationData = animation.export();
						that.slider = false;
						that.nowPgae = that.nowPgae + 1;

					}, 500)
				}
				// 上一页
				if (endX - startX > 30) {
					this.slider = true
					//首页
					if (this.nowPgae == 1) {
						this.slider = false
						uni.showToast({
							title: '已经到第一张了',
							icon: 'none'
						})
						return;
					};
					//创建动画  移动到-150%,-150%
					let animation = uni.createAnimation({
						duration: 0,
					});
					animation.translateX('-150%').translateY('-150%').rotate(100).step();
					var list_dyc = that.list_dyc;
					var slidethis = that.list_dyc.pop(); //删除数组末尾项
					that.list_dyc.unshift(slidethis); //将删除的末尾项放到第一项
					that.animationData = animation.export()
					that.list_dyc = that.list_dyc
					setTimeout(function() {
						//创建动画   5s将位置移动到原位
						let animation2 = uni.createAnimation({
							duration: 500,
							// timingFunction: 'cubic-bezier(.8,.1,.2,0.8)',
						});
						animation2.translateX('-53%').translateY('-50%').rotate(0).step();
						that.animationData = animation2.export()
						that.slider = false
						that.nowPgae = that.nowPgae - 1

					}, 50)
				}
			},

		}
	}
</script>

<style lang="scss">
	.zxl{
		color: transparent;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		-webkit-animation: slide1 2s infinite linear;
		animation: slide1 5s infinite linear;
	}
	@keyframes slide1 {
		0% {
			background-position: 0 0;
		}
	
		100% {
			background-position: -100% 0;
		}
	}
	.txt-box-turn-pg {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 82%;
	overflow: hidden;
    word-break: break-all;
	line-break: anywhere;

		.tit {
			font-size: 40upx;
			font-weight: bold;
			padding-bottom: 20upx;
		}
	}

	.btm-box-turn-pg {
		position: fixed;
		left: 0;
		bottom: 10upx;
		width: 100%;

		.btm-box2 {
			padding: 30upx 40upx;
			text-align: center;
		}

		.btm-bk-l {
			width: 100%;
			margin: 20upx auto;
			padding: 20upx;
			font-size: 40upx;
		}
	}

	.txt-box-turn-pg image {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}

	.box-turn-pg {
		position: relative;
		width: 400upx;
		height: 700upx;
	}

	.box-turn-pg .box_item-turn-pg {
		position: absolute;
		width: 70%;
		height: 60%;
		top: 40%;
		left: 45%;
		// transform: translateX(-50%) translateY(-50%);
		padding: 20rpx;
		background: #fff;
		border: 1rpx solid #eee;
		border-radius: 20rpx;
		box-shadow: 1px 1px 0px 0px rgba(0, 0, 5, 1);
	}

	.box_item-turn-pg:nth-child(1) {
		z-index: 4;
		transform: translateX(-53%) translateY(-50%);
	}

	.box_item-turn-pg:nth-child(2) {
		z-index: 3;
		transform: translateX(-53%) translateY(-50%);
	}

	.box_item-turn-pg:nth-child(3) {
		z-index: 2;
		transform: translateX(-50%) translateY(-51%);
	}

	.card_item-turn-pg:nth-child(4) {
		z-index: 1;
		transform: translateX(-47%) translateY(-52%);
	}

	// .box_item:last-child {
	// 	z-index: 1;
	// 	transform: translateX(-53%) translateY(-50%);
	// }

	// .box_item:nth-last-child(2) {
	// 	z-index: 2;
	// 	transform: translateX(-53%) translateY(-50%);
	// }
</style>
