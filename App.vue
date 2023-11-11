<script>
	import silenceUpdate from '@/uni_modules/rt-uni-update/js_sdk/silence-update.js'
	import moment from "moment";
	export default {
		data() {
			return {
				viewtime: 0, //在线时长
				jifen: 0
			};
		},
		globalData: {
			isMusicPlay: false, // 是否有音乐在播放
			musicId: '', // 音乐id
			songstyle: '', //音乐播放模式
			musicLink: ''
		},
		methods: {
			async getjifen() {
				let res = await this.$zxl('/getjifen')
				this.jifen = res.data.data[0].total
			},
			async addjifenjilu() {
				console.log('addjifenjil')
				await this.$zxl('/addjifenjilu', {
					total: this.viewtime * 50,
					name: '在线活跃',
					time: moment().format("YYYY-MM-DD HH:mm:ss"),
					type: 1
				}, 'POST')

			},

			async fresh() {
				this.jifen += this.viewtime * 50
				await this.$zxl('/editjifen', {
					total: this.jifen
				}, 'POST')
			},
			getviewtime() {
				this.viewtime += 1
				if (this.viewtime >= 200) {
					this.addjifenjilu()
					this.fresh()
					this.viewtime = 0
				}
				// console.log(this.viewtime,'在线时长')
			},
			async forceUpdate() {
				let res = await this.$zxl('/getversion')
				console.log(res.data.data[0].version, '版本号')

				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					if (inf.version !== res.data.data[0].version) {
						uni.navigateTo({
							url: '/uni_modules/rt-uni-update/components/rt-uni-update/rt-uni-update?obj=' +
								JSON.stringify(res.data.data[0])
						});
					}
				})
			}
		},
		onLaunch: function() {
			// console.log('App Launch')
			this.forceUpdate();
			this.getjifen()
			setInterval(() => {
				this.getviewtime()
			}, 1000)
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},

	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import url("static/fonts/iconfont.css");
</style>