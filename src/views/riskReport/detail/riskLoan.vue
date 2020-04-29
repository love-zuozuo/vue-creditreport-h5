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
              :class="['item',phoneTab==index?'on':'']"
              v-for="(item,index) in tabs"
              :key="index"
              @click="handlePhoneTab(index)"
            >{{item.name}}</div>
          </van-row>
          <van-row class="vt-chart">
            <van-row class="nullData topNull" v-if="phoneData[phoneTab].length==0">
              <img src="../../../assets/images/icon/safe.png" />
              <van-row>最近{{phoneTab==0?'1':'3'}}个月暂无手机号多头借贷风险哦</van-row>
              <van-row>请继续保持良好的还款习惯！</van-row>
            </van-row>
            <template v-else>
              <van-row id="phoneChart" class="chart"></van-row>
              <van-row class="header">
                <van-row class="item" v-for="(item,index) in phoneData[phoneTab]" :key="index">
                  <van-col span="16" class="info">
                    <span :style="{background:colors[index]}"></span>
                    {{item.name}}
                  </van-col>
                  <van-col span="8" class="num">{{item.value}}家</van-col>
                </van-row>
              </van-row>
            </template>
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
              @click="handleCardTab(index)"
            >{{item.name}}</div>
          </van-row>
          <van-row class="vt-chart">
            <van-row class="nullData topNull" v-if="cardData[cardTab].length==0">
              <img src="../../../assets/images/icon/safe.png" />
              <van-row>最近{{cardTab==0?'1':'3'}}个月暂无身份证多头借贷风险哦</van-row>
              <van-row>请继续保持良好的还款习惯！</van-row>
            </van-row>
            <template v-else>
              <van-row id="cardChart" class="chart"></van-row>
              <van-row class="header">
                <van-row class="item" v-for="(item,index) in cardData[cardTab]" :key="index">
                  <van-col span="16" class="info">
                    <span :style="{background:colors[index]}"></span>
                    {{item.name}}
                  </van-col>
                  <van-col span="8" class="num">{{item.value}}家</van-col>
                </van-row>
              </van-row>
            </template>
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
      tabs: [  //月份切换
        {
          name: "近1个月"
        },
        {
          name: "近3个月"
        }
      ],
      colors: window.pieColors, //匹配颜色值
      phoneTab: 0, // 选中的手机号tab
      phoneChart: null, // 手机号图表对象
      phoneData: [[], []], // 手机号图表数据
      cardTab: 0, // 选中的身份证号tab
      cardChart: null, // 身份证图表对象
      cardData: [[], []] // 身份证图表数据
    };
  },
  props: ["dataInfo"],
  watch: {
    dataInfo: {
      handler: function (news, old) {
        if (news) {
          setTimeout(() => { this.initData(news.duotou) }, 0)
        }
      },
      deep: true
    }
  },
  methods: {
    //获取数据
    initData (data) {
      let one = data.risk_one_month.risk_detail.platform_detail_dimension
      let three = data.risk_three_month.risk_detail.platform_detail_dimension
      this.phoneData = [one.loan_phone.list, three.loan_phone.list]
      this.cardData = [one.loan_id.list, three.loan_id.list]
      this.$nextTick(() => { this.handlePhoneTab(0); this.handleCardTab(0) })
    },

    //点击手机号的tab
    handlePhoneTab (key) {
      this.phoneTab = key
      if (this.phoneData[key].length > 0)
        this.initPhoneChart(this.phoneData[key])
    },

    //点击身份证号的tab
    handleCardTab (key) {
      this.cardTab = key
      if (this.cardData[key].length > 0)
        this.initCardChart(this.cardData[key])
    },

    //更新图表数据
    updateChars () {
      let option = this.myChart.getOption();
      option.series[0].data = this.chartsData;
      this.myChart.setOption(option);
    },

    // 初始化手机图表
    initPhoneChart (chartData) {
      this.phoneChart = this.$echarts.init(
        document.getElementById("phoneChart")
      );
      // 绘制图表
      let option = {
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
            data: chartData
          }
        ]
      };
      // 为echarts对象加载数据
      this.phoneChart.setOption(option);
    },

    // 初始化身份证图表
    initCardChart (chartData) {
      this.cardChart = this.$echarts.init(
        document.getElementById("cardChart")
      );
      // 绘制图表
      let option = {
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
            data: chartData
          }
        ]
      };
      // 为echarts对象加载数据
      this.cardChart.setOption(option);
    }
  }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
