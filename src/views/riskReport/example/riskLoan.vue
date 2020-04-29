<template>
  <section class="main">
    <van-row class="vt-riskLoan">
      <van-row class="tips">短期内多头借贷个数越多，申贷被拒风险越高</van-row>
      <div class="risk">
        <div class="title">
          <span></span>
          手机号多头风险统计
        </div>
        <van-row class="vt-tabbar">
          <van-row class="vt-tab">
            <div
              :class="['item',tabActive==index?'on':'']"
              v-for="(item,index) in tabs"
              :key="index"
              @click="handleTabClick(index)"
            >{{item.name}}</div>
          </van-row>
          <van-row class="vt-chart">
            <van-row id="myChart" class="chart"></van-row>
            <van-row class="header">
              <van-row class="item" v-for="(item,index) in chartsData" :key="index">
                <van-col span="16" class="info">
                  <span :style="{background:colors[index]}"></span>
                  {{item.name}}
                </van-col>
                <van-col span="8" class="num">{{item.value}}家</van-col>
              </van-row>
            </van-row>
          </van-row>
        </van-row>
      </div>
      <div class="risk">
        <div class="title">
          <span></span>
          身份证多头风险统计
        </div>
        <van-row class="vt-tabbar">
          <van-row class="vt-tab">
            <div
              :class="['item',cardTab==index?'on':'']"
              v-for="(item,index) in tabs"
              :key="index"
              @click="handleCardClick(index)"
            >{{item.name}}</div>
          </van-row>
          <van-row class="vt-chart">
            <van-row class="nullData topNull">
              <img src="../../../assets/images/icon/safe.png" />
              <van-row>最近{{cardTab==0?'1':'3'}}个月暂无身份证多头借贷风险哦</van-row>
              <van-row>请继续保持良好的还款习惯！</van-row>
            </van-row>
          </van-row>
        </van-row>
      </div>
    </van-row>
  </section>
</template> 
<script>
export default {
  data () {
    return {
			tabActive: 0,
			cardTab:0,
      tabs: [
        {
          name: "近1个月"
        },
        {
          name: "近3个月"
        }
      ],
      colors: ["#5FD665", "#27AEFD", "#FFC740", "#F8E71C"],
      chartsData: [
        { value: 3, name: "消费分期" },
        { value: 5, name: "P2P网贷" },
        { value: 4, name: "信用卡中心" },
        { value: 2, name: "银行小微贷" }
      ]
    };
  },
  mounted () {
    this.getCharts();
  },
  methods: {
    //选择月份
    handleTabClick (key) {
      this.tabActive = key;
		},
		handleCardClick (key) {
      this.cardTab = key;
		},
    getCharts () {
      let myChart = this.$echarts.init(
        document.getElementById("myChart")
      );
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: this.colors,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: 20
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.chartsData
          }
        ]
      });
    }
  }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
