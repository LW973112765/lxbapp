# lxm-special-search
# # lxm-special-search是一个全平台前端页面模板，一般用来做首页页面模板，也可以做其他页面模板。全平台前端页面模板，首页框架：圆角矩形特型搜索框自定义导航栏+滚动字幕提示搜索关键字+搜索框内左一右二三图标+可滑动选项卡导航左插槽
> **组件名：lxm-special-search**

### 说明
基于UviewUI2.0工具和技术，支持nvue文件。
Navbar 自定义导航栏
该组件，此组件一般用于在特殊情况下，需要自定义导航栏的时候用到。

#平台差异说明
App（vue）	App（nvue）	H5	小程序
√	             √	    √	 √
说明

```
自定义导航栏内容
通过自定义slot传入的内容

<template>
	<view>
        <u-navbar
            leftText="返回"
            title="个人中心"
            :safeAreaInsetTop="false"
        >
            <view
                class="u-nav-slot"
                slot="left"
            >
                <u-icon
                    name="arrow-left"
                    size="19"
                ></u-icon>
                <u-line
                    direction="column"
                    :hairline="false"
                    length="16"
                    margin="0 8px"
                ></u-line>
                <u-icon
                    name="home"
                    size="20"
                ></u-icon>
            </view>
        </u-navbar>
	</view>
</template>
#自定义导航栏背景颜色
uView提供了一个bgColor参数，可以自定义导航栏的背景颜色：

<template>
	<view>
		<u-navbar title="" :bgColor="bgColor">
			
		</u-navbar>
		<view class="content">
			<!-- 正文内容 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: '#001f3f',
			}
		}
	}
</script>
API
#Props
参数	说明	类型	默认值	可选值
safeAreaInsetTop	是否开启顶部安全区适配	Boolean	true	false
placeholder	固定在顶部时，是否生成一个等高元素，以防止塌陷	Boolean	false	true
fixed	导航栏是否固定在顶部	Boolean	true	false
border	导航栏底部是否显示下边框	Boolean	false	true
leftIcon	左边返回图标的名称，只能为uView自带的图标	String	arrow-left	-
leftText	左边的提示文字	String	-	-
rightText	右边的提示文字	String	-	-
rightIcon	右边返回图标的名称，只能为uView自带的图标	String	-	-
title	导航栏标题，如设置为空字符，将会隐藏标题占位区域	String	-	-
bgColor	导航栏背景设置	String	#ffffff	-
titleWidth	导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx	String | Number	400rpx	-
height	导航栏高度(不包括状态栏高度在内，内部自动加上)，单位px	String | Number	44px	-
leftIconSize	左侧返回图标的大小	String | Number	20px	-
leftIconColor	左侧返回图标的颜色	String	#303133	-
autoBack 2.0.19	点击左侧区域(返回图标)，是否自动返回上一页	Boolean	false	true
#Event
名称	说明	类型
leftClick	点击左侧区域	Handler
rightClick	点击右侧区域	Handler
#Slot
名称	说明
left	自定义左侧部分内容
right	自定义右侧部分内容
center 2.0.17	自定义中部内容
```


传奇开心果模板，名称：lxm-special-searchV1.0.0,传奇开心果出品，2022.1.20