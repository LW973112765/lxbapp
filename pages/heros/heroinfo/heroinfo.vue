<template>
	<view>
		<view class="main">
			<image class="bg"
				:src="`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}-bigskin-${index+1}.jpg`"
				mode="">
			</image>
			<view class="item">
				<scroll-view class="scroll" enable-flex scroll-x>
					<view class="img" v-for="(item,index) in skins" :key="index" @click="change(index)">
						<image
							:src="`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}-smallskin-${index+1}.jpg`"
							mode=""></image>
						<text>{{item}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="music">
			<view class="musicitem" v-for="(item,index) in heroinfo" :key="index" @click="start(item.yyyp_9a)">
				<!-- <audio :poster="`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}-smallskin-1.jpg`"
					:src="item.yyyp_9a" controls></audio>

				<text>{{item.yywa1_f2}}</text> -->
				{{index+1}}.{{item.yywa1_f2}}
			</view>
		</view>
		<button style="margin-top: 20rpx;" @click="search">更多</button>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				data: {},
				skins: [],
				index: 0,
				ename: 0,
				heroinfo: [],

			};
		},
		onLoad(e) {
			// console.log(e)
			this.data = JSON.parse(e.data)
			this.skins = this.data.skin_name.split("|")
			this.ename = this.data.ename
			console.log(this.skins)
			uni.setNavigationBarTitle({
				title: this.data.cname
			})
			this.getinfo()
		},
		methods: {
			start(src) {
				console.log(src)
				innerAudioContext.src = src
			},
			getinfo() {
				uni.request({
					url: `https://pvp.qq.com/zlkdatasys/storyhero/index${this.ename}.json`,
					data: {},
					method: "GET",
					success: (res) => {
						console.log(res.data)
						this.heroinfo = res.data.yy_4e
					}
				})
			},
			change(index) {
				this.index = index
			},
			search() {
				void plus.runtime.openWeb(`https://pvp.qq.com/web201605/herodetail/${this.ename}.shtml`);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.music {
		width: 100%;
		height: auto;
		padding: 10rpx 20rpx;
		box-sizing: border-box;

		// background-color: red;
		.musicitem {
			width: 100%;
			box-sizing: border-box;
			word-wrap: break-word;
			word-break: break-all;
			padding: 10rpx 20rpx;
		}
	}

	.scroll {
		display: flex;
		white-space: nowrap;

		text {
			display: block;
			width: 100rpx;
		}
	}

	.item {
		position: absolute;
		width: 100%;
		height: 150rpx;
		bottom: 0rpx;
		left: 0;
		padding: 20rpx;

		.img {
			width: 200rpx;
			height: 150rpx;
			display: flex;
			display: inline-block;
			flex-direction: column;
			justify-content: center;
			align-items: center !important;
			align-content: center !important;
			color: whitesmoke;
		}

		image {
			display: block;
			width: 100rpx;
			height: 100rpx;
		}
	}

	.main {
		position: relative;
		width: 100%;
		height: 400rpx;
		// background-color: red;

		.bg {
			position: absolute;
			width: 100%;
			height: 400rpx;
		}
	}
</style>