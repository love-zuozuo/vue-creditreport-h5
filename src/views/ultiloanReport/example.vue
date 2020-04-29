<template>
  <section class="main unselect">
    <van-row class="report-top">
      <van-row class="content">
        <van-row class="user">
          <van-col class="icon">
            <img src="../../assets/images/icon/male.png" />
          </van-col>
          <van-col class="name">{{dataInfo.name}}</van-col>
          <van-col class="other">
            <span>{{dataInfo.gender}}</span>
            <span>{{dataInfo.age}}岁</span>
          </van-col>
        </van-row>
        <van-row class="info-content">
          <van-col span="12">
            <label>报告编号</label>
            <div>{{dataInfo.reportNo}}</div>
          </van-col>
          <van-col span="12">
            <label>手机号</label>
            <div>{{dataInfo.mobile}}</div>
          </van-col>
        </van-row>
        <van-row class="info-content">
          <van-col span="12">
            <label>身份证</label>
            <div>{{dataInfo.idCard}}</div>
          </van-col>
          <van-col span="12">
            <label>身份证归属地</label>
            <div>{{dataInfo.address}}</div>
          </van-col>
        </van-row>
      </van-row>
    </van-row>
    <van-row class="report-census">
      <van-row class="tips">短期内多头借贷个数越多，申请借贷被拒绝的风险越高</van-row>
      <van-row class="report-panel">
        <van-row class="title">手机号多头风险统计</van-row>
        <van-row class="content">
          <van-row class="vt-tabbar">
            <van-row class="vt-tab">
              <div
                :class="['item',phoneActive==index?'on':'']"
                v-for="(item,index) in tabs"
                :key="index"
                @click="handlePhoneClick(index)"
              >{{item.name}}</div>
            </van-row>
            <van-row class="vt-chart">
              <template v-if="phoneData.length>0">
                <van-row id="phoneChart" class="chart"></van-row>
                <van-row class="header">
                  <van-row class="item" v-for="(item,index) in phoneData" :key="index">
                    <van-col span="16" class="info">
                      <span :style="{background:colors[index]}"></span>
                      {{item.name}}
                    </van-col>
                    <van-col span="8" class="num">{{item.value}}家</van-col>
                  </van-row>
                </van-row>
              </template>
              <template v-else>
                <van-row class="nullData">
                  <img src="../../assets/images/icon/safe.png" />
                  <van-row>最近{{phoneActive==0?'1':'3'}}个月暂无手机号多头借贷风险哦</van-row>
                  <van-row>请继续保持良好的还款习惯！</van-row>
                </van-row>
              </template>
            </van-row>
          </van-row>
        </van-row>
      </van-row>
      <van-row class="report-panel">
        <van-row class="title">身份证多头风险统计</van-row>
        <van-row class="content">
          <van-row class="vt-tabbar">
            <van-row class="vt-tab">
              <div
                :class="['item',idCardActive==index?'on':'']"
                v-for="(item,index) in tabs"
                :key="index"
                @click="handleidCardClick(index)"
              >{{item.name}}</div>
            </van-row>
            <van-row class="vt-chart">
              <template v-if="phoneData.length>0">
                <van-row id="idCardChart" class="chart"></van-row>
                <van-row class="header">
                  <van-row class="item" v-for="(item,index) in phoneData" :key="index">
                    <van-col span="16" class="info">
                      <span :style="{background:colors[index]}"></span>
                      {{item.name}}
                    </van-col>
                    <van-col span="8" class="num">{{item.value}}家</van-col>
                  </van-row>
                </van-row>
              </template>
              <template v-else>
                <van-row class="nullData">
                  <img src="../../assets/images/icon/safe.png" />
                  <van-row>最近{{idCardActive==0?'1':'3'}}个月暂无手机号多头借贷风险哦</van-row>
                  <van-row>请继续保持良好的还款习惯！</van-row>
                </van-row>
              </template>
            </van-row>
          </van-row>
        </van-row>
      </van-row>
    </van-row>
    <Home />
    <Statement />
  </section>
</template> 
<script>
import Home from "@/components/home.vue";
import Statement from "@/components/statement.vue";
export default {
  components: {
    Home,
    Statement
  },
  data () {
    return {
      dataInfo: {
        name: "苏大强",
        gender: "男",
        age: 20,
        reportNo: "172329483942039202",
        mobile: "177****3311",
        idCard: "511***********4877",
        address: "四川"
      },
      phoneActive: 0, //默认手机号tab初始值
      idCardActive: 0, //默认身份证tab初始值
      tabs: [
        {
          name: "近1个月"
        },
        {
          name: "近3个月"
        }
      ],
      colors: ["#5FD665", "#27AEFD", "#FFC740", "#F8E71C"],
      phoneData: [
        { value: 3, name: "消费分期" },
        { value: 5, name: "P2P网贷" },
        { value: 4, name: "信用卡中心" },
        { value: 2, name: "银行小微贷" }
      ]
    };
  },
  mounted () {
    this.initPhoneChart();
    this.initIdCardChart();
    this._configShare();
  },
  methods: {
    //初始化得到手机号数据
    initPhoneChart () {
      let myChart = this.$echarts.init(
        document.getElementById("phoneChart")
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
            data: this.phoneData
          }
        ]
      });
    },
    //切换手机号月份
    handlePhoneClick (key) {
      this.phoneActive = key;
    },
    //初始化得到身份证数据
    initIdCardChart () {
      let myChart = this.$echarts.init(
        document.getElementById("idCardChart")
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
            data: this.phoneData
          }
        ]
      });
    },
    //切换身份证月份
    handleidCardClick (key) {
      this.idCardActive = key;
    }
  }
};
</script>
<style scoped lang='less'>
@import "../../assets/css/app/report/index.less";
.main {
  background: #fff;
}
</style>
