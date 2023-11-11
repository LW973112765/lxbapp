<template>
	<view class="board-container">
		<Navbar @navbarBtnTap="navbarBtnTapHandler" @download="download" @save="save" :Strokes="Strokes" :title="'白板画'" :showBack="true"></Navbar>
		<Toolbar :penColor="currentColor" @penWidthChange="penWidthChangeHandler" @toolItemTap="toolItemTapHandler" :toolArr="toolArr"></Toolbar>
		<view class="board" :class="{'board-out': colorPanelShow}">
			<canvas class="board-canvas" canvas-id="drawCanvas" disable-scroll="true"
			 @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
		</view>
		<ColorPanel @colorPickTap="colorPickTapHandler" :colorPanelShow="colorPanelShow"></ColorPanel>
	</view>
</template>

<script>
	import Navbar from '../../../components/navbar/navbar.vue'
	import Toolbar from '../../../components/toolbar/toolbar.vue'
	import ColorPanel from '../../../components/colorPanel/color-panel.vue'
	import BgColorPanel from '../../../components/bgcolorPanel/bgcolor-panel.vue'
	import {
		customPrint
	} from '../../../common/util/util.js'
	export default {
		components: {
			Navbar,
			Toolbar,
			ColorPanel,
			BgColorPanel
		},
		onShareAppMessage(res) {
			return {
				title: '你绝对看不出我画的是什么？',
				path: '/pages/index/index'
			}
		},
		data() {
			return {
				Strokes: [],
				colorPanelShow: false,
				drawInfos: [],
				curDrawArr: [],
				startX: 0,
				startY: 0,
				drawContext: {},
				currentColor: '#E0DFED',
				begin: false,
				bgColor: 'white',
				toolArr: [{
					title: '清空',
					icon: '../../../static/png/tool_clear.png',
					selectIcon: '../../../static/png/tool_clear_s.png',
					select: false,
					url: 'clear'
				}, {
					title: '撤销',
					icon: '../../../static/png/cx115.png',
					selectIcon: '../../../static/png/cx11.png',
					select: false,
					url: 'pre'
				},{
					title: '橡皮',
					icon: '../../../static/png/tool_eraser.png',
					selectIcon: '../../../static/png/tool_eraser_s.png',
					select: false,
					url: 'eraser'
				}, {
					title: '画笔',
					icon: '../../../static/png/tool_pen.png',
					selectIcon: '../../../static/png/tool_pen_s.png',
					select: true,
					url: 'pen'
				}, {
					title: '颜色',
					icon: '../../../static/png/tool_color.png',
					selectIcon: '../../../static/png/tool_color_s.png',
					select: false,
					url: 'color'
				},  {
					title: '矩形',
					icon: '../../../static/png/tool_rect.png',
					selectIcon: '../../../static/png/tool_rect_s.png',
					select: false,
					url: 'hollowRect'
				}, {
					title: '圆形',
					icon: '../../../static/png/tool_circle.png',
					selectIcon: '../../../static/png/tool_circle_s.png',
					select: false,
					url: 'hollowCircle'
				}, {
					title: '矩形',
					icon: '../../../static/png/tool_rect_solid.png',
					selectIcon: '../../../static/png/tool_rect_solid_s.png',
					select: false,
					url: 'rect'
				}, {
					title: '圆形',
					icon: '../../../static/png/tool_circle_solid.png',
					selectIcon: '../../../static/png/tool_circle_solid_s.png',
					select: false,
					url: 'circle'
				},
				{
					title: '保存',
					icon: '../../../static/png/save.png',
					selectIcon: '../../../static/png/save1.png',
					select: false,
					url: 'save'
				}
				],
				lineWidth: 6,
				penMode: true,
				rectMode: false,
				hollowRectMode: false,
				circleMode: false,
				hollowCircleMode: false,
				lastHollowRect: {},
				lastHollowCircle: {}
			}
		},
		onLoad() {
			let huaban= uni.getStorageSync("huabanjilu");
			if (huaban) {
			  huaban = JSON.parse(huaban);
			  console.log(huaban,'huaban')
			}else{
				huaban=[]
			}
			this.Strokes=huaban;
		},
		mounted() {
				
					this.drawContext = uni.createCanvasContext('drawCanvas');
					this.initBoard();
					this.fillBackground(this.drawContext);
					setTimeout(()=>{
						this.drawCanves();
					},100)
				
		},
		methods: {
			save(){
			uni.setStorageSync('huabanjilu', JSON.stringify(this.Strokes));
			uni.showToast({
				icon:"none",
				title:"保存成功"
			})
			},
			download(){
				const that = this;
					uni.canvasToTempFilePath({
											canvasId: 'drawCanvas',
											success: function(res) {
												customPrint('回调参数:' + JSON.stringify(res));
	
												uni.saveImageToPhotosAlbum({
													filePath: res.tempFilePath,
													success: function(res) {
														customPrint('成功回调参数:' + JSON.stringify(res));
														that.$api.msgSuccess('下载成功');
													},
													fail: function(res) {
														customPrint('失败回调参数:' + JSON.stringify(res));
														// that.$api.msgSuccess('保存成功');
													}
												});
											}
										})
			},
			//撤销
			back(){
				var delItem = this.Strokes.pop();
				this.drawCanves();
				this.initBoard();
			// console.log(this.Strokes,'shuju画板')
			
			},
			fresh(){
				this.drawCanves();
				this.initBoard();
			},
	navbarBtnTapHandler () {
		uni.navigateBack({
			delta: 1
		})
	},
	bgcolorPickTapHandler(obj) {
		customPrint('我点击的颜色:' + JSON.stringify(obj));
	  console.log(obj.color)
	  this.colorPanelShow = false;
	  
	  this.bgColor = obj.color;
	  this.initBoard();
	  this.fillBackground(this.drawContext);
	},
			colorPickTapHandler(obj) {
				customPrint('我点击的颜色:' + JSON.stringify(obj));
				this.colorPanelShow = false;
				
				this.toolArr.forEach(item => {
					item.select = false;
					if (item.title === '画笔') {
						item.select = true;
					}
				})
				this.rectMode = false;
				this.hollowRectMode = false;
				this.circleMode = false;
				this.hollowCircleMode = false;
				this.penMode = true;
				this.currentColor = obj.color;
				this.drawContext.strokeStyle = obj.color;
			},
			penWidthChangeHandler(width) {
				this.lineWidth = width;
				customPrint('画笔宽度:' + width);
				this.drawContext.setLineWidth(width);
			},
			toolItemTapHandler(index) {
				const that = this;
				let url = this.toolArr[index]['url'];
				switch (url) {
					case 'clear':
						this.clearDrawBoard();
						this.colorPanelShow = false;
						
						this.Strokes=[]
						break;
					case 'eraser':
						this.drawContext.strokeStyle = this.bgColor;
						this.colorPanelShow = false;
						
						break;
					case 'pen':
						this.drawContext.strokeStyle = this.currentColor;
						this.colorPanelShow = false;
						
						this.rectMode = false;
						this.hollowRectMode = false;
						this.circleMode = false;
						this.hollowCircleMode = false;
						this.penMode = true;
						break;
					case 'color':
						this.colorPanelShow = !this.colorPanelShow;
						
						break;
						case 'save':
							this.colorPanelShow = false;
							this.save()
							break;
					case 'pre':
					this.colorPanelShow = false;
					
					this.back();
						break;
					case 'hollowRect':
						this.hollowRectMode = true;
						this.rectMode = false;
						this.circleMode = false;
						this.hollowCircleMode = false;
						this.penMode = false;
						this.colorPanelShow = false;
						
						this.drawContext.strokeStyle = this.currentColor;
						// this.drawContext.restore();
						break;
					case 'hollowCircle':
						this.hollowRectMode = false;
						this.rectMode = false;
						this.circleMode = false;
						this.hollowCircleMode = true;
						this.penMode = false;
						this.colorPanelShow = false;
						
						this.drawContext.strokeStyle = this.currentColor;
						break;
					case 'rect':
						this.hollowRectMode = false;
						this.rectMode = true;
						this.circleMode = false;
						this.hollowCircleMode = false;
						this.penMode = false;
						this.colorPanelShow = false;
						
						this.drawContext.strokeStyle = this.currentColor;
						break;
					case 'circle':
						this.hollowRectMode = false;
						this.rectMode = false;
						this.circleMode = true;
						this.hollowCircleMode = false;
						this.penMode = false;
						this.colorPanelShow = false;
						
						this.drawContext.strokeStyle = this.currentColor;
						break;
					default:
						break;
				}
				if (url === 'clear' || url === 'save' || url === 'share') {
					return;
				}
				this.toolArr.forEach((item, indexPath) => {
					item.select = false;
					if (indexPath === index) {
						item.select = true;
					}
				})
			},
			drawCanves() {
				//this.drawContext.draw();
				this.Strokes.forEach((item, index) => {
					let StrokesItem = item
					// console.log(item.points[0])
					let res=item.points[0]
					if(item.type=='line'){
						this.drawContext.beginPath();
						this.drawContext.setLineCap('round');
						this.drawContext.setStrokeStyle(item.style.color);
						this.drawContext.setLineWidth(item.style.lineWidth);
						StrokesItem.points.forEach((sitem, sindex) => {
						this.drawContext.lineTo(sitem.x, sitem.y)
						this.drawContext.stroke();
						})
					}
					//实体矩形
					else if(item.type == "drawRect"){
						this.drawContext.beginPath();
						this.drawContext.setLineCap('round');
					    this.drawContext.rect(res.x, res.y, res.width, res.height);
					    this.drawContext.setFillStyle(item.style.color);
					    this.drawContext.fill();
					}
					//空心矩形
					else if(item.type == "drawHollowRect"){
						 console.log("drawHollowRect")
						 this.drawContext.beginPath();
						 this.drawContext.setLineCap('round');
						 this.drawContext.rect(res.x, res.y, res.width, res.height);
						 this.drawContext.setStrokeStyle(item.style.color);
						 this.drawContext.stroke();
					}
					//实体圆形
					else if(item.type == "drawCircle"){
						this.drawContext.beginPath();
						this.drawContext.setLineCap('round');
						this.drawContext.arc(res.x, res.y, res.r,res.four, res.five);
						this.drawContext.setFillStyle(item.style.color);
						this.drawContext.fill();
					}
					//空心圆形
					else if(item.type == "drawHollowCircle"){
						this.drawContext.beginPath();
						this.drawContext.setLineCap('round');
						this.drawContext.arc(res.x, res.y, res.r,res.four, res.five);
						this.drawContext.setStrokeStyle(item.style.color);
						this.drawContext.stroke();
					}
			
				})
				this.drawContext.draw();
			},
			clearDrawBoard() {
				this.initBoard();
				this.fillBackground(this.drawContext);
			},
			initBoard() {
				this.drawContext.setLineCap('round') // 让线条圆润
				this.drawContext.strokeStyle = this.currentColor;
				this.drawContext.setLineWidth(this.lineWidth);
			},
			touchStart(e) {
				console.log(e.type)
				if (this.penMode) {
					//线条
					this.Strokes.push({
						imageData: null,
						type: 'line',
						style: {
							color: this.currentColor,
							lineWidth: this.lineWidth,
						},
						points: [{
							x: e.touches[0].x,
							y: e.touches[0].y,
							
						}]
					})
					this.lineBegin(e.touches[0].x, e.touches[0].y)
				} else if (this.rectMode) {
					this.rectBegin(e.touches[0].x, e.touches[0].y)
				} else if (this.hollowRectMode) {
					this.hollowRectBegin(e.touches[0].x, e.touches[0].y)
				} else if (this.hollowCircleMode) {
					this.hollowCircleBegin(e.touches[0].x, e.touches[0].y)
				} else if (this.circleMode) {
					this.circleBegin(e.touches[0].x, e.touches[0].y)
				}
				this.curDrawArr.push({
					x: e.touches[0].x,
					y: e.touches[0].y
				});
			},
			touchMove(e) {
				
				console.log(e.type)
				if (this.begin) {
					if (this.penMode) {
						this.Strokes[this.Strokes.length - 1].points.push({
							x: e.touches[0].x,
							y: e.touches[0].y,
							type: 'line',
						})
						this.lineAddPoint(e.touches[0].x, e.touches[0].y);
						this.draw(true);
					} else if (this.rectMode) {
						this.drawRect(e.touches[0].x, e.touches[0].y, false);
					} else if (this.hollowRectMode) {
						this.drawHollowRect(e.touches[0].x, e.touches[0].y, false);
					} else if (this.hollowCircleMode) {
						this.drawHollowCircle(e.touches[0].x, e.touches[0].y, false);
					} else if (this.circleMode) {
						this.drawCircle(e.touches[0].x, e.touches[0].y, false);
					}
					
				}
			},
			touchEnd(e) {
				console.log(e.type)
				
				this.curDrawArr.push({
					x:  e.changedTouches[0].x ,
					y:  e.changedTouches[0].y
				});
				// console.log('结束的坐标x:' + e.changedTouches[0].x + '结束的坐标y:' + e.changedTouches[0].y );
				if (this.penMode) {
		
					if(this.Strokes[this.Strokes.length - 1].points.length<2){//当此路径只有一个点的时候
						this.Strokes.pop();
					}
					this.lineEnd();
				} else if (this.rectMode) {
					this.drawRect(e.changedTouches[0].x, e.changedTouches[0].y, true, e.type);
					this.fresh();
					this.drawContext.setFillStyle(this.bgColor);
				} else if (this.hollowRectMode) {
					this.drawHollowRect(e.changedTouches[0].x, e.changedTouches[0].y, true, e.type);
				this.fresh();
				this.drawContext.setFillStyle(this.bgColor);
				} else if (this.hollowCircleMode) {
					this.drawHollowCircle(e.changedTouches[0].x, e.changedTouches[0].y, true, e.type);
				this.fresh();
				this.drawContext.setFillStyle(this.bgColor);
				} else if (this.circleMode) {
					this.drawCircle(e.changedTouches[0].x, e.changedTouches[0].y, true, e.type);
				this.fresh();
				this.drawContext.setFillStyle(this.bgColor);
				}
			},
			hollowRectBegin(x, y) {
				this.begin = true;
				this.drawContext.beginPath()
				this.startX = x;
				this.startY = y;
			},
			rectBegin(x, y) {
				this.begin = true;
				this.drawContext.beginPath()
				this.startX = x;
				this.startY = y;
			},
			hollowCircleBegin(x, y) {
				this.begin = true;
				this.drawContext.beginPath()
				this.startX = x;
				this.startY = y;
			},
			circleBegin(x, y) {
				this.begin = true;
				this.drawContext.beginPath()
				this.startX = x;
				this.startY = y;
			},
			/**
			 * 这里是画实体矩形
			 */
			drawRect(x, y, isReverse,type) {
				let width = (x - this.startX) ? (x - this.startX) : (this.startX - x);
				let height = (y - this.startY) ? (y - this.startY) : (this.startY - y);
				this.drawContext.rect(this.startX, this.startY, width, height);
				this.drawContext.setFillStyle(this.currentColor);
				this.drawContext.fill();
				this.draw(isReverse);
			  if(type=='touchend'){
				  	this.Strokes.push({
				  					imageData: null,
				  					type: 'drawRect',
				  					style: {
				  						color: this.currentColor,
				  						lineWidth: this.lineWidth,
				  					},
				  					points: [{
				  						x: this.startX,
				  						y: this.startY,
				  						width,
				  						height,
				  						
				  					}]
				  				})
			  }
			},
			/**
			 * 这里是画空心矩形
			 * 方法是根据四个坐标点画
			 * 四条线进行连接
			 */
			drawHollowRect(x, y, isReverse,type) {
				let pointLT = {};
				let pointRB = {};
				let pointRT = {};
				let pointLB = {};
				let center = {};

				pointLT.X = (this.startX <= x) ? this.startX : x;
				pointLT.Y = (this.startY <= y) ? this.startY : y;

				pointRB.X = (this.startX >= x) ? this.startX : x;
				pointRB.Y = (this.startY >= y) ? this.startY : y;

				pointRT.X = pointRB.X;
				pointRT.Y = pointLT.Y;


				pointLB.X = pointLT.X;
				pointLB.Y = pointRB.Y;

				let width = (x - this.startX) ? (x - this.startX) : (this.startX - x);
				let height = (y - this.startY) ? (y - this.startY) : (this.startY - y);
				this.drawContext.rect(this.startX, this.startY, width, height);
				this.drawContext.setStrokeStyle(this.currentColor);
				this.drawContext.stroke();
				this.draw(isReverse);

				this.lastHollowRect = {
					x: this.startX,
					y: this.startY,
					width: Math.abs(width),
					height: Math.abs(height),
					pointLT: pointLT
				}
					if(type=='touchend'){
						this.Strokes.push({
										imageData: null,
										type: 'drawHollowRect',
										style: {
											color: this.currentColor,
											lineWidth: this.lineWidth,
										},
										points: [{
											x: this.startX,
											y: this.startY,
											width,
											height,
											
										}]
									})
					}
			},
			/**
			 * 这里是画
			 * 实心圆
			 */
			drawCircle(x, y, isReverse,type) {
				let pointLT = {};
				let pointRB = {};
				let pointRT = {};
				let pointLB = {};
				let center = {};

				pointLT.X = (this.startX <= x) ? this.startX : x;
				pointLT.Y = (this.startY <= y) ? this.startY : y;

				pointRB.X = (this.startX >= x) ? this.startX : x;
				pointRB.Y = (this.startY >= y) ? this.startY : y;

				pointRT.X = pointRB.X;
				pointRT.Y = pointLT.Y;


				pointLB.X = pointLT.X;
				pointLB.Y = pointRB.Y;

				center.X = (pointRB.X + pointLT.X) / 2;
				center.Y = (pointRB.Y + pointLT.Y) / 2;

				let dx = pointRB.X - pointLT.X;
				let dy = pointRB.Y - pointLT.Y;
				let r = Math.sqrt(dx * dx + dy * dy) / 2;

				// console.log('圆心坐标:' + JSON.stringify(center));
				// console.log('半径:' + JSON.stringify(r));
				this.drawContext.arc(center.X, center.Y, r, 0, 2 * Math.PI);
				this.drawContext.setFillStyle(this.currentColor);
				this.drawContext.fill();
				// this.drawContext.stroke();
				this.draw(isReverse);
					if(type=='touchend'){
						this.Strokes.push({
										imageData: null,
										type: 'drawCircle',
										style: {
											color: this.currentColor,
											lineWidth: this.lineWidth,
										},
										points: [{
											x: center.X,
											y: center.Y,
											r,
											four:0,
											five:2 * Math.PI,
											
										}]
									})
					}
			},
			/**
			 * 这里是画
			 * 空心圆
			 */
			drawHollowCircle(x, y, isReverse,type) {
				let pointLT = {};
				let pointRB = {};
				let center = {};

				pointLT.X = (this.startX <= x) ? this.startX : x;
				pointLT.Y = (this.startY <= y) ? this.startY : y;

				pointRB.X = (this.startX >= x) ? this.startX : x;
				pointRB.Y = (this.startY >= y) ? this.startY : y;

				center.X = (pointRB.X + pointLT.X) / 2;
				center.Y = (pointRB.Y + pointLT.Y) / 2;

				let dx = pointRB.X - pointLT.X;
				let dy = pointRB.Y - pointLT.Y;
				let r = Math.sqrt(dx * dx + dy * dy) / 2;
				// this.drawContext.arc(center.X, center.Y, r, 0, 2 * Math.PI);
				// this.drawContext.beginPath();
				this.drawContext.arc(center.X, center.Y, r - this.lineWidth / 2, 0, 2 * Math.PI);
				this.drawContext.setStrokeStyle(this.currentColor);
				this.drawContext.stroke();
				
				this.draw(isReverse);
	            if(type=='touchend'){
					this.Strokes.push({
						        		imageData: null,
										type: 'drawHollowCircle',
						        		style: {
						        			color: this.currentColor,
						        			lineWidth: this.lineWidth,
						        		},
						        		points: [{
						        			x: center.X,
						        			y: center.Y,
						        			r:r - this.lineWidth / 2,
						        			four:0,
															five:2 * Math.PI,
															
														}]
													})
				}
			},
			// 开始绘制线条
			lineBegin: function(x, y) {
				this.begin = true;
				this.drawContext.beginPath()
				this.startX = x;
				this.startY = y;
				this.drawContext.moveTo(this.startX, this.startY)
				this.lineAddPoint(x, y);
			},
			// 绘制线条中间添加点
			lineAddPoint: function(x, y) {
				this.drawContext.moveTo(this.startX, this.startY)
				this.drawContext.lineTo(x, y);
				this.drawContext.stroke();
				this.startX = x;
				this.startY = y;
			},
			// 绘制线条结束
			lineEnd: function() {
				this.drawContext.closePath();
				this.begin = false;
			},
			// canvas上下文设置背景为白色
			fillBackground: function(context) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.board').boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					context.setFillStyle(this.bgColor);
					console.log('当前颜色:' + this.bgColor);
					context.fillRect(0, 0, data.width, data.height); //TODO context的宽和高待定
					context.fill();
					context.draw();
				}).exec();
			},
			// 绘制canvas
			// isReverse: 是否保留之前的像素
			// draw: function(isReverse = false) {
			// 	this.drawContext.draw(isReverse);
			// }
			draw: function(isReverse = false, cb) {
				this.drawContext.draw(isReverse, () => {
					if (cb && typeof(cb) == "function") {
						cb();
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.board-container {
		height: 100%;
		width: 100%;
		// position: relative;
		// display: flex;
		// flex-direction: column;

		.board {
			position: fixed;
			top: 145px;
			left: 0;
			bottom: 0;
			right: 0;
			transform: translateY(0);
			display: block;
		
			.board-canvas {
				width: 100%;
				height: 100%;
				z-index: 100;
			}
		
		}
		
		.board-out {
			transform: translateY(100%);
			display: none;
		}
	}
</style>
