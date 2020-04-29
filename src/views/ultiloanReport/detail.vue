<template>
  <section class="main unselect">
    <van-row class="report-top" v-if="userInfo">
      <van-row class="content">
        <van-row class="user">
          <van-col class="icon">
            <img src="../../assets/images/icon/male.png" />
          </van-col>
          <van-col class="name">{{userInfo.userInfo.name}}</van-col>
          <van-col class="other">
            <span>{{userInfo.userInfo.gender}}</span>
            <span>{{userInfo.userInfo.age}}岁</span>
          </van-col>
        </van-row>
        <van-row class="info-content">
          <van-col span="12">
            <label>报告编号</label>
            <div>{{userInfo.reportNo}}</div>
          </van-col>
          <van-col span="12">
            <label>手机号</label>
            <div>{{userInfo.userInfo.mobile}}</div>
          </van-col>
        </van-row>
        <van-row class="info-content">
          <van-col span="12">
            <label>身份证</label>
            <div>{{userInfo.userInfo.idcard}}</div>
          </van-col>
          <van-col span="12">
            <label>身份证归属地</label>
            <div>{{userInfo.userInfo.cardCity}}</div>
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
              <template v-if="phoneData.length==0">
                <van-row class="nullData topNull">
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
              <van-row id="idCardChart" class="chart"></van-row>
              <van-row class="header">
                <van-row class="item" v-for="(item,index) in idCardData" :key="index">
                  <van-col span="16" class="info">
                    <span :style="{background:colors[index]}"></span>
                    {{item.name}}
                  </van-col>
                  <van-col span="8" class="num">{{item.value}}家</van-col>
                </van-row>
              </van-row>
              <template v-if="idCardData.length==0">
                <van-row class="nullData topNull">
                  <img src="../../assets/images/icon/safe.png" />
                  <van-row>最近{{idCardActive==0?'1':'3'}}个月暂无身份证多头借贷风险哦</van-row>
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
      phoneActive: 0, //手机号tab初始值
      idCardActive: 0, //身份证tab初始值
      userInfo: null, //用户信息
      duotou: null, //多头数据信息
      tabs: [
        {
          name: "近1个月"
        },
        {
          name: "近3个月"
        }
      ],
      colors: window.pieColors, //匹配颜色值
      phoneData: [], //手机数据
      idCardData: [], //身份证数据
      phoneChart: null, //手机图表id
      idCardChart: null, //身份证图标你id
      loading: true //loading状态
    };
  },
  mounted () {
    this.getData();
    this._configShare();
  },
  methods: {
    //得到数据
    getData () {
      let params = {
        id: this.$route.query.id
      };
      this.$post("report/detail", params, "", this).then(response => {
        this.userInfo = response.data.userInfo;
        this.duotou = response.data.duotou;
        this.getPhoneData();
        this.getIdCardData();
      });
    },
    //初始化得到手机号数据
    getPhoneData () {
      this.phoneData = this.duotou.risk_one_month.risk_detail.platform_detail_dimension.loan_phone.list;
      this.getCharts("phoneChart", this.phoneData);
    },
    //初始化得到身份证数据
    getIdCardData () {
      this.idCardData = this.duotou.risk_one_month.risk_detail.platform_detail_dimension.loan_id.list;
      this.getCharts("idCardChart", this.idCardData);
    },
    //切换手机号月份
    handlePhoneClick (key) {
      this.phoneActive = key;
      if (key == 0) {
        this.phoneData = this.duotou.risk_one_month.risk_detail.platform_detail_dimension.loan_phone.list;
      } else {
        this.phoneData = this.duotou.risk_three_month.risk_detail.platform_detail_dimension.loan_phone.list;
      }
      this.updateChars(this.phoneChart, this.phoneData);
    },
    //切换身份证月份
    handleidCardClick (key) {
      this.idCardActive = key;
      if (key == 0) {
        this.idCardData = this.duotou.risk_one_month.risk_detail.platform_detail_dimension.loan_id.list;
      } else {
        this.idCardData = this.duotou.risk_three_month.risk_detail.platform_detail_dimension.loan_id.list;
      }
      this.updateChars(this.idCardChart, this.idCardData);
    },
    //更新图表数据
    updateChars (key, value) {
      let option = key.getOption();
      option.series[0].data = value;
      key.setOption(option);
    },
    //加载图表
    getCharts (id, data) {
      this[id] = this.$echarts.init(document.getElementById(id));
      //绘制图表
      var option = {
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
            data: data
          }
        ]
      };
      // 为echarts对象加载数据
      this[id].setOption(option);
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
