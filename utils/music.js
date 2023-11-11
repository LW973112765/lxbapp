//utils.js
var music = {
	//因为这个音效听起来是de的声音，所以我取这个函数名，方便记忆音效，找的合适的场景就能想起来。
	// success:"http://lwandzxl.top/success.mp3"
	// fail:"http://lwandzxl.top/fail.mp3"
	// click:"http://lwandzxl.top/click.mp3"
	zxl_success: function() {
		const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.autoplay = true;
		innerAudioContext.src = 'http://lwandzxl.top/success.mp3';
		innerAudioContext.onPlay(() => {
			// console.log('开始播放');
		});
		innerAudioContext.onError((res) => {
			// console.log(res.errMsg);
			// console.log(res.errCode);
		});
	},
	zxl_fail: function() {
		const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.autoplay = true;
		innerAudioContext.src = 'http://lwandzxl.top/fail.mp3';
		innerAudioContext.onPlay(() => {
			// console.log('开始播放');
		});
		innerAudioContext.onError((res) => {
			// console.log(res.errMsg);
			// console.log(res.errCode);
		});
	},
	zxl_click: function() {
		const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.autoplay = true;
		innerAudioContext.src = 'http://lwandzxl.top/click2.mp3';
		innerAudioContext.onPlay(() => {
			// console.log('开始播放');
		});
		innerAudioContext.onError((res) => {
			// console.log(res.errMsg);
			// console.log(res.errCode);
		});
	},
	zxl_clock: function() {
		const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.autoplay = true;
		innerAudioContext.src = 'http://lwandzxl.top/clock.mp3';
		innerAudioContext.onPlay(() => {
			// console.log('开始播放');
		});
		innerAudioContext.onError((res) => {
			// console.log(res.errMsg);
			// console.log(res.errCode);
		});
	},
	zxl_saoma: function() {
		const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.autoplay = true;
		innerAudioContext.src = 'http://lwandzxl.top/saoma.mp3';
		innerAudioContext.onPlay(() => {
			// console.log('开始播放');
		});
		innerAudioContext.onError((res) => {
			// console.log(res.errMsg);
			// console.log(res.errCode);
		});
	},
	zxl_ktstart: function() {
		const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.autoplay = true;
		innerAudioContext.src = 'http://lwandzxl.top/changekongtiao.mp3';
		innerAudioContext.onPlay(() => {});
		innerAudioContext.onError((res) => {

		});
	},
	zxl_ktchange: function() {
		const innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext.autoplay = true;
		innerAudioContext.src = 'http://lwandzxl.top/startkongtiao.mp3';
		innerAudioContext.onPlay(() => {});
		innerAudioContext.onError((res) => {

		});
	},
}

module.exports = music;