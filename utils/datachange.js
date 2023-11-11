// 以下是使用 JavaScript 实现将 ["﻿username:郎小宝","password:123456"] 
// 转换为 {username:'郎小宝',password:'123456'} 的代码
export default function convertToDict(data) {
	var result = {};
	for (var i = 0; i < data.length; i++) {
		var keyValue = data[i].split(":");
		var key = keyValue[0].trim();
		var value = keyValue[1].trim();
		result[key] = value;
	}
	return result;
}