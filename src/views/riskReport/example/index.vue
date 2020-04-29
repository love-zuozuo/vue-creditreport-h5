<template>
  <section class="main unselect">
    <div class="score-box">
      <p class="title">你的小启信用分</p>
      <div class="scoreChart" id="scoreChart"></div>
      <p class="sub-title">信用评分优秀，网贷通过率较高，请继续保持</p>
    </div>
    <div class="report-con">
      <OwnerInfo :types="type" />
      <div class="report-card">
        <div class="head">
          <div class="left">01</div>
          <div class="line"></div>
          <div class="right">
            <p class="cn-name">信用分解读</p>
            <p class="en-name">XIN YONG FEN JIE DU</p>
          </div>
        </div>
        <div class="con">
          <van-row class="vt-score">
            <van-row class="state" v-if="score!='--'">
              <van-col span="6" v-for="(item,index) in grades" :key="index">
                &nbsp;
                <span :class="[item.hidden==false?'on':'']">
                  {{item.name}}
                  <i></i>
                </span>
              </van-col>
            </van-row>
            <van-row class="bar"></van-row>
            <van-row class="score">
              <van-col span="6">
                <span>0</span>
              </van-col>
              <van-col span="6">
                <span>300</span>
              </van-col>
              <van-col span="6">
                <span>420</span>
              </van-col>
              <van-col span="6">
                <span>620</span>
              </van-col>
              <van-col class="bottom">1000</van-col>
            </van-row>
          </van-row>
          <p
            class="desc"
          >小启信用分是根据网络行为综合分析，以分数形式面向社会人群的综合报告，报告包含用户借贷行为、逾期信息、信贷风险等维度，信用检测报告非人行征信报告，评分仅供参考，分数越高，对个人金融服务的信用体验越好！</p>
        </div>
      </div>
      <div class="report-card" v-for="(item,index) in menus" :key="index">
        <div class="head">
          <div class="left">0{{index+2}}</div>
          <div class="line"></div>
          <div class="right">
            <p class="cn-name">{{item.name}}</p>
            <p class="en-name">{{item.en}}</p>
          </div>
        </div>
        <div class="con">
          <keep-alive>
            <component :is="item.component" :types="type"></component>
          </keep-alive>
        </div>
      </div>
    </div>
    <Home />
    <img src="../../../assets/images/report/statement-img.png" class="statement-img" />
  </section>
</template> 
<script>
import OwnerInfo from "@/views/riskReport/example/ownerInfo.vue";
import OperatorInfo from "@/views/riskReport/example/operatorInfo.vue";
import RiskLoan from "@/views/riskReport/example/riskLoan.vue";
import IcheckInfo from "@/views/riskReport/example/icheckInfo.vue";
import BlacklistCheck from "@/views/riskReport/example/blacklistCheck.vue";
import ContactsCheck from "@/views/riskReport/example/contactsCheck.vue";
import BreakInfo from "@/views/riskReport/example/breakInfo.vue";
import Home from "@/components/home.vue";
import Statement from "@/components/statement.vue";
import BorrowInfo from '@/views/riskReport/example/borrowInfo.vue'
export default {
  components: {
    OwnerInfo,
    OperatorInfo,
    RiskLoan,
    IcheckInfo,
    BlacklistCheck,
    ContactsCheck,
    BreakInfo,
    Home,
    Statement,
    BorrowInfo
  },
  data () {
    return {
      type: 3,
      scoreChart: null,
      tabs: [  //导航切换数据
        {
          name: "运营商信息",
          en: 'YUN YING SHANG XIN XI',
          component: OperatorInfo
        },
        {
          name: "多头借贷风险",
          en: 'DUO TOU JIE DAI FENG XIAN',
          component: RiskLoan
        },
        {
          name: "个人信息核查",
          en: 'GE REN XIN XI HE CHA',
          component: IcheckInfo
        },
        {
          name: "借贷频度监控",
          en: 'JIE DAI PIN DU JIAN KONG',
          component: BorrowInfo
        },
        {
          name: "黑名单检测",
          en: 'HEI MING DAN JIAN CE',
          component: BlacklistCheck
        },
        {
          id: "",
          name: "联系人风险",
          en: 'LIAN XI REN FENG XIAN',
          component: ContactsCheck
        },
        {
          name: "失信信息",
          en: 'SHI XIN XIN XI',
          component: BreakInfo
        }
      ],
      menus: [],
      score: 650,
      grades: [
        {
          name: "差",
          score: 300,
          hidden: true
        },
        {
          name: "合格",
          score: 420,
          hidden: true
        },
        {
          name: "良好",
          score: 620,
          hidden: true
        },
        {
          name: "优秀",
          score: 1000,
          hidden: true
        }
      ]
    };
  },
  mounted () {
    this.getScore();
    this.getTabs();
    this._configShare();
    this.initChart()
  },
  methods: {
    //处理分数显示
    getScore () {
      this.grades.forEach((item, key) => {
        if (key == 0) {
          if (this.score >= 0 && this.score <= item.score) {
            item.hidden = false;
          }
        } else {
          if (
            this.score > this.grades[key - 1].score &&
            this.score <= item.score
          ) {
            item.hidden = false;
          }
        }
        return false;
      });
    },
    //判断处理具体是加强版还是普通版
    getTabs () {
      if (this.$route.query.type) {
        this.type = this.$route.query.type;
      }
      if (this.type == 3) {
        this.tabs.map((item, key) => {
          if (item.name != "黑名单检测") {
            this.menus.push(item);
          }
        });
      } else {
        this.menus = this.tabs;
      }
    },
    initChart () {
      this.scoreChart = this.$echarts.init(
        document.getElementById("scoreChart")
      );
      // 绘制图表
      let option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            min: 0,
            max: 1000,
            radius: '100%',
            startAngle: 190,
            endAngle: -10,
            axisLine: {          // 坐标轴线
              lineStyle: {       // 属性lineStyle控制线条样式
                width: 15,
                color: [[0.65, '#6cd972'], [1, '#efefef']]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              lineStyle: {
                color: '#fff',
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              color: '#6cd972',
              offsetCenter: [0, '15%'],       // x, y，单位px
            },
            type: 'gauge',
            detail: { color: '#333333', offsetCenter: [0, '-40%'] },
            data: [{ value: this.score, name: "优秀" }]
          }
        ]
      };
      // 为echarts对象加载数据
      this.scoreChart.setOption(option);
    }
  }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
