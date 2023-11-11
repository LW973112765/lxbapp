// 防止处理多次点击
export default function noMultipleClicks(methods, info) {
	// methods是点击后需要执行的函数， info是函数需要传的参数
	let that = this;
	if (that.noClick) {
		// 第一次点击
		if ((info && info !== '') || info == 0) {
			that.noClick = false;
			// info是执行函数需要传的参数
			if (info == 0) {
				info = false
			}
			methods(info);
		} else {
			that.noClick = false;
			methods();
		}
		setTimeout(() => {
			that.noClick = true;
		}, 3000)
	} else {
		uni.showToast({
			title: '操作过于频繁,请3秒后稍后重试',
			icon: 'none',
		})
	}
}
// //导出
// export default {
//     noMultipleClicks,      // 禁止多次点击
// }