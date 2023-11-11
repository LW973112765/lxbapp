const language = [{
		name: "中文",
		value: "zh"
	},
	{
		name: "英语",
		value: "en"
	},
	{
		name: "粤语",
		value: "yue"
	},
	{
		name: "文言文",
		value: "wyw"
	},
	{
		name: "日语",
		value: "jp"
	},
	{
		name: "韩语",
		value: "kor"
	},
	{
		name: "法语",
		value: "fra"
	},
	{
		name: "西班牙语",
		value: "spa"
	},
	{
		name: "泰语",
		value: "th"
	},
	{
		name: "阿拉伯语",
		value: "ara"
	},
	{
		name: "俄语",
		value: "ru"
	},
	{
		name: "葡萄牙语",
		value: "pt"
	},
	{
		name: "德语",
		value: "de"
	},
	{
		name: "意大利语",
		value: "it"
	},
	{
		name: "希腊语",
		value: "el"
	},
	{
		name: "荷兰语",
		value: "nl"
	},
	{
		name: "波兰语",
		value: "pl"
	},
	{
		name: "保加利亚语",
		value: "bul"
	},
	{
		name: "爱沙尼亚语",
		value: "est"
	},
	{
		name: "丹麦语",
		value: "dan"
	},
	{
		name: "芬兰语",
		value: "fin"
	},
	{
		name: "捷克语",
		value: "cs"
	},
	{
		name: "罗马尼亚语",
		value: "rom"
	},
	{
		name: "斯洛文尼亚语",
		value: "slo"
	},
	{
		name: "瑞典语",
		value: "swe"
	},
	{
		name: "匈牙利语	",
		value: "hu"
	},
	{
		name: "越南语",
		value: "vie"
	},
];
export function getcountryname(str) {
	const name = language.filter(i => i.value.trim() == str)
	return name[0].name;
}
export function getcountryvalue(str) {
	const name = language.filter(i => i.name.trim() == str)
	return name[0].value;
}