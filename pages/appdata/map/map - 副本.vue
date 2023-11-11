<template>
  <view class="charts-box">
    <qiun-data-charts 
      type="map"
      :opts="opts"
      :chartData="chartData"
    />
	  <uni-section title="请选择要查询的省" type="line">
	      <uni-data-select
	        v-model="value"
	        :localdata="range"
	        @change="change"
	      ></uni-data-select>
	    </uni-section>
  </view>
</template>

<script>
import gansu from '../json/gansu.json'
import heilongjiang from '../json/heilongjiang.json'
import jilin from '../json/jilin.json'
import liaolin from '../json/liaolin.json'
import hebei from '../json/hebei.json'
import qinhai from '../json/qinhai.json'
import shanxithree from '../json/shanxithree.json'
import henan from '../json/henan.json'
import shandong from '../json/shandong.json'
import shanxi from '../json/shanxi.json'
import anhui from '../json/anhui'
import hubei from '../json/hubei'
import hunan from '../json/hunan.json'
import jiangsu from '../json/jiangsu.json'
import sichuan from '../json/sichuan.json'
import guizhou from '../json/guizhou.json'
import yunnan from '../json/yunnan.json'
import zhejiang from '../json/zhejiang.json'
import jiangxi from '../json/jiangxi.json'
import guangdong from '../json/guangdong.json'
import fujian from '../json/fujian.json'
import taiwan from '../json/taiwan.json'
import hainan from '../json/hainan.json'
import xinjiang from '../json/xinjiang.json'
import neimenggu from '../json/neimenggu.json'
import ningxia from '../json/ningxia.json'
import guangxi from '../json/guangxi.json'
import xizang from '../json/xizang.json'
import beijing from '../json/beijing.json'
import shanghai from '../json/shanghai.json'
import tianjing from '../json/tianjin.json'
import chongqing from '../json/chongqing.json'
import wuwei from '../json/wuwei.json'
import china from '../json/china.json'
import zhaotong from '../json/zhaotong.json'
import kunming from '../json/kunming.json'

export default {
  data() {
    return {
		  value:1,
		  current:null,
		  arr:["甘肃省","黑龙江省","吉林省","辽宁省",
		       "河北省","青海省","陕西省","河南省","山东省",
			   "山西省","安徽省","湖北省","湖南省","江苏省",
			   "四川省","贵州省","云南省","浙江省","江西省",
			   "广东省","福建省","台湾省","海南省","新疆维吾尔自治区",
			   "内蒙古自治区","宁夏回族自治区","广西壮族自治区","西藏自治区",
			   "北京市","上海市","天津市","重庆市","武威市","中国",'昭通市','昆明市'],
		        range: [
				   { value: 34, text: "中国" },
				   { value:1, text: "甘肃省" },
				   { value: 33, text: "武威市" },
				   { value: 17, text: "云南省" },
				   { value: 35, text: "昭通市" },
				   { value: 36, text: "昆明市" },
		           { value:2, text: "黑龙江省" },
		           { value:3, text: "吉林省" },
		           { value:4, text: "辽宁省" },
		           { value:5, text: "河北省" },
		           { value:6, text: "青海省" },
		           { value:7, text: "陕西省" },
		           { value:8, text: "河南省" },
		           { value:9, text: "山东省" },
		           { value:10, text: "山西省" },
		           { value: 11, text: "安徽省" },
		           { value: 12, text: "湖北省" },
		           { value: 13, text: "湖南省" },
		           { value: 14, text: "江苏省" },
		           { value: 15, text: "四川省" },
		           { value: 16, text: "贵州省" },
		           { value: 18, text: "浙江省" },
		           { value: 19, text: "江西省" },
		           { value: 20, text: "广东省" },
		           { value: 21, text: "福建省" },
		           { value: 22, text: "台湾省" },
		           { value: 23, text: "海南省" },
		           { value: 24, text: "新疆维吾尔自治区" },
		           { value: 25, text: "内蒙古自治区" },
		           { value: 26, text: "宁夏回族自治区" },
		           { value: 27, text: "广西壮族自治区" },
		           { value: 28, text: "西藏自治区" },
		           { value: 29, text: "北京市" },
		           { value: 30, text: "上海市" },
		           { value: 31, text: "天津市" },
		           { value: 32, text: "重庆市" },
		           
		        ],
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['map'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [0,0,0,0],
        dataLabel: true,
        enableScroll: false,
        extra: {
          map: {
            border: true,
            borderWidth: 1,
            borderColor: "#666666",
            fillOpacity: 0.6,
            activeBorderColor: "#F04864",
            activeFillColor: "#FACC14",
            activeFillOpacity: 1
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
	uni.setNavigationBarTitle({
			      title: '甘肃省地图'
			    })
  },
  methods: {
	   change(e) {
		   
		uni.setNavigationBarTitle({
				      title: this.arr[e-1]+'地图'
				    })
			this.$nextTick(()=>{
				this.getServerData()
			})
	        },
    getServerData() {
		// console.log(this.value,'当前省')
		  switch(this.value) {
		       case 1:
		           this.current=gansu
		          break;
		       case 2:
		          this.current=heilongjiang
		          break;
			   case 3:
			      this.current=jilin
			      break;
			   case 4:
			      this.current=liaolin
			      break;
		       case 5:
		          this.current=hebei
		          break;
		       case 6:
		          this.current=qinhai
		          break;
		       case 7:
		          this.current=shanxithree
		          break;
		       case 8:
		          this.current=henan
		          break;
			   case 9:
			      this.current=shandong
			      break;
			   case 10:
			      this.current=shanxi
			      break;
			   case 11:
			      this.current=anhui
			      break;
			   case 12:
			      this.current=hubei
			      break;
			   case 13:
			      this.current=hunan
			      break;
			   case 14:
			      this.current=jiangsu
			      break;
			   case 15:
			      this.current=sichuan
			      break;
			   case 16:
			      this.current=guizhou
			      break;
			   case 17:
			      this.current=yunnan
			      break;
			   case 18:
			      this.current=zhejiang
			      break;
			   case 19:
			      this.current=jiangxi
			      break;
			   case 20:
			      this.current=guangdong
			      break;
			   case 21:
			      this.current=fujian
			      break;
			   case 22:
			      this.current=taiwan
			      break;
			   case 23:
			      this.current=hainan
			      break;
			   case 24:
			      this.current=xinjiang
			      break;
			   case 25:
			      this.current=neimenggu
			      break;
			   case 26:
			      this.current=ningxia
			      break;
			   case 27:
			      this.current=guangxi
			      break;
			   case 28:
			      this.current=xizang
			      break;
			   case 29:
			      this.current=beijing
			      break;
			   case 30:
			      this.current=shanghai
			      break;
			   case 31:
			      this.current=tianjing
			      break;
			   case 32:
			      this.current=chongqing
			      break;
			   case 33:
			      this.current=wuwei
			      break;
			   case 34:
			      this.current=china
			      break;
			   case 35:
			      this.current=zhaotong
			      break;
			   case 36:
			      this.current=kunming
			      break;
		       default:
		          this.current=gansu
		  } 
		  console.log(this.current,'当前省')
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {series:this.current.features
           };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  }
};
</script>
<style>
	/* page {
		background:url("../../../static/images/bg/17.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
		
	} */
</style>
<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
  }
</style>