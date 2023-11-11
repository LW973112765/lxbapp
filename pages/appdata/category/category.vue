<template>
  <view class="charts-box">
    <qiun-data-charts 
      type="word"
      :opts="opts"
      :chartData="chartData"
      :canvas2d="true"
      canvasId="TIebqaCAUeASvaHZsLnmwviRXJvZXYMT"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['word'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: undefined,
        enableScroll: false,
        extra: {
          word: {
            type: "normal",
            autoColors: false
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
	  
	// async getgetcategory(){
	// 	 let res =await this.$zxl('/getcategory')
	//  }
  async getServerData() {
      //模拟从服务器获取数据时的延时
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
		   let res =await this.$zxl('/getcategory')
		   let data=res.data.data
		   let arr=[25,20,10,12]
		   data.forEach(item=>{
			 Object.defineProperty(item,'textSize',{
			 	value:arr[Math.floor(Math.random()*arr.length)],
			 	writable:true,
			 	enumerable:true
			 })
		   })
		   
		   console.log(data)
		   let obj={series:data}
		   	// Object.defineProperty(obj,'series',{
		   	// 						value:data,
		   	// 						writable:true,
		   	// 						enumerable:true
		   	// 					})
        setInterval(()=>{
			 this.chartData = JSON.parse(JSON.stringify(obj));
		},500)
    
    },
  }
};
</script>
<style>
/* 	page {
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