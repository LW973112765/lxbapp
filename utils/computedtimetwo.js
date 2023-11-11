const moment = require("moment");
export default function computedtime(computedtime) {
	const year = moment(computedtime).format("YYYY");
	const month = moment(computedtime).format("MM-DD");
	const currentyear = new Date().getFullYear();
	console.log(year, month, currentyear);
	const sDate = Date.parse(new Date());
	console.log(sDate);
	const eDate = Date.parse(computedtime);
	const zxl = Math.abs(eDate - sDate);
	const s = zxl / 1000;
	const m = s / 60;
	const h = m / 60;
	const d = h / 24;
	// 同一年
	if (year == currentyear) {
		if (d >= 7) {
			return moment(computedtime).format("MM-DD");
		} else {
			if (s >= 0 && s < 60) {
				return "刚刚";
			}
			if (m >= 1 && m < 60) {
				return Math.floor(m) + "分钟前";
			}
			if (h >= 1 && h < 24) {
				return Math.floor(h) + "小时前";
			}
			if (d >= 1 && d < 7) {
				return Math.floor(d) + "天前";
			}
		}
	}
	// 不同年
	else {
		return moment(computedtime).format("YYYY-MM-DD");
	}
}