<template>
  <view class="charts-box">
    <qiun-data-charts 
      type="pie"
      :opts="opts"
      :chartData="chartData"
	  :canvas2d="true"
	  canvasId="LFZxcNRehFFHBSBJxOIokMEmbnyHYVHg"
    />
	
  </view>
</template>

<script>
export default {
  data() {
    return {
		 xiaohai: [],
		 shaonian: [],
		 qingnian: [],
		 zhongnian: [],
		 laonian: [],
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [5,5,5,5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            linearType: "custom"
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  created() {
  	this.getuser()
  },
  methods: {
	async getuser(){
		let res=await this.$zxl('/usertotal')
		  if (res.data.status === 200) {
		        this.xiaohai = res.data.data.filter((user) => {
		          return user.age > 0 && user.age <= 12;
		        });
		        this.shaonian = res.data.data.filter((user) => {
		          return user.age > 12 && user.age <= 20;
		        });
		        this.qingnian = res.data.data.filter((user) => {
		          return user.age > 20 && user.age <= 30;
		        });
		        this.zhongnian = res.data.data.filter((user) => {
		          return user.age > 30 && user.age <= 50;
		        });
		        this.laonian = res.data.data.filter((user) => {
		          return user.age > 50;
		        });
		      }
	},
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            series: [
              {
                 data: [
                              { value: this.xiaohai.length, name: "小孩" },
                              { value: this.shaonian.length, name: "少年" },
                              { value: this.qingnian.length, name: "青年" },
                              { value: this.zhongnian.length, name: "中年" },
                              { value: this.laonian.length, name: "老年" },
                            ]
              }
            ]
          };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  }
};
</script>
<style>
	page {
		background:url("../../../static/images/bg/17.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
		
	}
</style>
<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
  }
  .header{
	  text-align: center;
  }
</style>