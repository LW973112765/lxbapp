export default function computedtime(computedtime) {
	const sDate = Date.parse(new Date());
	const eDate = Date.parse(computedtime);
	const zxl = Math.abs(eDate - sDate);
	const s = zxl / 1000;
	const m = s / 60;
	const h = m / 60;
	const d = h / 24;
	if (s >= 0 && s < 60) {
		return "刚刚";
	}
	if (m >= 1 && m < 60) {
		return Math.floor(m) + "分钟前";
	}
	if (h >= 1 && h < 24) {
		return Math.floor(h) + "小时前";
	}
	if (d >= 1 && d <= 30) {
		return Math.floor(d) + "天前";
	}
	if (d > 30 && d < 365) {
		return Math.floor(d / 30) + "个月前";
	}
	if (d > 365) {
		return Math.floor(d / 365) + "年前";
	}
}