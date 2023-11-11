<template>
	<view class="main">
		<view class="box" v-for="(item,index) in tabList" :key="index">
			<view class="yuan" v-if="isdel" @click="selectitem(item)" :class="{'tick':select.includes(item.id)}"></view>
			<image v-if="item.type=='image'" :src="item.url" mode=""></image>
			<video v-else :src="item.url" :data-id="item.id" :key="item.id" :id="'video'+item.id" @play="playing"
				poster="http://i1.hdslb.com/bfs/archive/670b1de64c4eb43c018d4777e1336ba523ae9254.jpg"
				:controls="true"></video>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				select: [],
				selectdownload: [],
				isdel: false,
				maxlength: 10,
				minlength: 3,
				videoContext: {},
				tabList: [{
						type: 'image',
						url: '/static/indexcover/image/1.jpg',
						id: 1
					},
					{
						type: 'image',
						url: '/static/indexcover/image/2.jpg',
						id: 2
					},
					{
						type: 'image',
						url: '/static/indexcover/image/3.jpg',
						id: 3
					},
					{
						type: 'image',
						url: '/static/indexcover/image/4.jpg',
						id: 4
					},
					{
						type: 'image',
						url: '/static/indexcover/image/5.jpg',
						id: 5
					},
					{
						type: 'image',
						url: '/static/indexcover/image/6.jpg',
						id: 6
					},
					{
						type: 'image',
						url: '/static/indexcover/image/7.jpg',
						id: 7
					},
					{
						type: 'image',
						url: '/static/indexcover/image/8.jpg',
						id: 8
					},
					{
						type: 'image',
						url: '/static/indexcover/image/9.jpg',
						id: 9
					},
					{
						type: 'image',
						url: '/static/indexcover/image/10.jpg',
						id: 10
					},
					{
						type: 'image',
						url: '/static/indexcover/image/11.jpg',
						id: 11
					},
					{
						type: 'image',
						url: '/static/indexcover/image/12.jpg',
						id: 12
					},
					{
						type: 'image',
						url: '/static/indexcover/image/13.jpg',
						id: 13
					},
					{
						type: 'image',
						url: '/static/indexcover/image/14.jpg',
						id: 14
					},
					{
						type: 'image',
						url: '/static/indexcover/image/15.jpg',
						id: 15
					},
					{
						type: 'image',
						url: '/static/indexcover/image/16.jpg',
						id: 16
					},
					{
						type: 'image',
						url: '/static/indexcover/image/17.jpg',
						id: 17
					},
					{
						type: 'image',
						url: '/static/indexcover/image/18.jpg',
						id: 18
					},
					{
						type: 'image',
						url: '/static/indexcover/image/19.jpg',
						id: 19
					},
					{
						type: 'image',
						url: '/static/indexcover/image/20.jpg',
						id: 20
					},
					{
						type: 'image',
						url: '/static/indexcover/image/21.jpg',
						id: 21
					},
					{
						type: 'image',
						url: '/static/indexcover/image/22.jpg',
						id: 22
					},
					{
						type: 'image',
						url: '/static/indexcover/image/23.jpg',
						id: 23
					},
					{
						type: 'image',
						url: '/static/indexcover/image/24.jpg',
						id: 24
					},
					{
						type: 'image',
						url: '/static/indexcover/image/25.jpg',
						id: 25
					},
					{
						type: 'image',
						url: '/static/indexcover/image/26.jpg',
						id: 26
					},
					{
						type: 'image',
						url: '/static/indexcover/image/27.jpg',
						id: 27
					},
					{
						type: 'image',
						url: '/static/indexcover/image/28.jpg',
						id: 28
					},
					{
						type: 'image',
						url: '/static/indexcover/image/29.jpg',
						id: 29
					}
				],
			};
		},
		onLoad() {
			let cover = uni.getStorageSync('indexluoboto')
			if (cover) {
				this.selectdownload = JSON.parse(cover)
				this.selectdownload.forEach(i => {
					this.select.push(i.id)
				})
			}
		},
		methods: {
			playing(e) {
				let currentId = 'video' + e.currentTarget.dataset.id; // 获取当前视频id 
				this.videoContent = uni.createVideoContext(currentId);
				let trailer = this.tabList;
				trailer.forEach(function(item, index) { // 获取json对象并遍历, 停止非当前视频
					if (item.url != null && item.url != "") {
						let temp = 'video' + item.id;
						if (temp != currentId) {
							uni.createVideoContext(temp).pause(); //暂停视频播放事件
						}
					}

				})
			},
			onNavigationBarButtonTap(e) {
				console.log(e, '点击')
				if (this.isdel == true) {
					this.save()
				}
				this.isdel = !this.isdel
				var webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(0, {
					text: this.isdel ? '完成' : '编辑'
				});
			},
			selectitem(item) {
				if (this.select.includes(item.id)) {
					if (this.select.length <= this.minlength) {
						this.$refs.uToast.show({
							type: 'warning',
							message: `最少选择${this.minlength}个哦😊`,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							position: 'top'
						})
					} else {
						this.select = this.select.filter(i => i != item.id)
						this.selectdownload = this.selectdownload.filter(i => i.id != item.id)
					}

				} else {
					if (this.select.length >= this.maxlength) {
						this.$refs.uToast.show({
							type: 'warning',
							message: `最多选择${this.maxlength}个哦😊`,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							position: 'top'
						})
					} else {
						this.select.push(item.id)
						this.selectdownload.push(item)
					}

				}


				console.log(this.select, '选择的数组')
				console.log(this.selectdownload, '选择的数组用于下载')
			},
			save() {
				uni.setStorageSync('indexluoboto', JSON.stringify(this.selectdownload))
			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		position: relative;
		width: 750rpx;
		height: auto;
		padding: 10rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		align-items: center;

		image,
		video {
			width: 630rpx;
			height: 300rpx;
		}
	}

	.yuan {
		width: 20px;
		position: relative;
		height: 20px;
		border: 1px solid #999 !important;
		z-index: 0;
	}

	.tick::after {
		content: " ";
		position: absolute;
		display: inline-block;
		width: 12px;
		height: 6px;
		border-width: 0 0 2px 2px;
		overflow: hidden;
		border-color: limegreen;
		border-style: solid;
		-webkit-transform: rotate(-50deg);
		transform: rotate(-50deg);
		left: 3px;
		top: 4px;
		z-index: 0;
	}
</style>