<template>
  <section class="main unselect">
    <div class="score-box">
      <p class="title">你的小启信用分</p>
      <div class="scoreChart" id="scoreChart"></div>
      <p class="sub-title">{{subTitle}}</p>
    </div>
    <div class="report-con">
      <OwnerInfo :dataInfo="dataInfo" :types="type" />
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
            <component :is="item.component" :dataInfo="dataInfo" :types="type"></component>
          </keep-alive>
        </div>
      </div>
      <div class="ds-enter" v-if="showTaobao||showJingdong">
        <div class="btn-group">
          <div @click="enterCheck(1)" v-if="showTaobao">认证淘宝</div>
          <div @click="enterCheck(2)" v-if="showJingdong">认证京东</div>
        </div>
      </div>
      <div class="report-card assess-box" v-if="showAssess">
        <div class="assess">
          <div class="good" @click="assessForm.comment_status=1">
            <img
              src="../../../assets/images/report/good-active.png"
              v-if="assessForm.comment_status==1"
            />
            <img src="../../../assets/images/report/good-normal.png" v-else />
          </div>
          <div class="bad" @click="assessForm.comment_status=2">
            <img
              src="../../../assets/images/report/bad-active.png"
              v-if="assessForm.comment_status==2"
            />
            <img src="../../../assets/images/report/bad-normal.png" v-else />
          </div>
        </div>
        <div class="con">
          <textarea
            rows="5"
            maxlength="50"
            placeholder="来说两句呗"
            v-model="assessForm.comment_content"
          />
        </div>
        <p class="max">{{assessForm.comment_content.length}}/50</p>
        <div class="btn" @click="submitAssess">提交</div>
      </div>
    </div>
    <Home />
    <img src="../../../assets/images/report/statement-img.png" class="statement-img" />
  </section>
</template> 
<script>
import { storage, ShowDialog } from "@/assets/js/util";
import OwnerInfo from "@/views/riskReport/detail/ownerInfo.vue";
import OperatorInfo from "@/views/riskReport/detail/operatorInfo.vue";
import RiskLoan from "@/views/riskReport/detail/riskLoan.vue";
import IcheckInfo from "@/views/riskReport/detail/icheckInfo.vue";
import BlacklistCheck from "@/views/riskReport/detail/blacklistCheck.vue";
import ContactsCheck from "@/views/riskReport/detail/contactsCheck.vue";
import BreakInfo from "@/views/riskReport/detail/breakInfo.vue";
import Home from "@/components/home.vue";
import Statement from "@/components/statement.vue";
import BorrowInfo from './borrowInfo'
import Taobao from './taobao'
import Jingdong from './jingdong'
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
    BorrowInfo,
    Taobao
  },
  data () {
    return {
      showAssess: true,
      assessForm: {
        comment_content: '',
        comment_status: null
      },
      showTaobao: false, // 是否显示淘宝认证按钮
      showJingdong: false, // 是否显示京东认证按钮
      subTitle: '',
      scoreChart: null,
      type: 3, //type类型默认值 4为加强版，3为普通版
      dataInfo: {}, //数据源
      menus: [], //导航切换数据
      score: '--', //初始值默认分数
      grades: [ //分数值分类
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
      ],
      tabs: [  //导航切换数据
        {
          id: "",
          name: "运营商信息",
          en: 'YUN YING SHANG XIN XI',
          component: OperatorInfo
        },
        {
          id: [989322, 989324],
          name: "多头借贷风险",
          en: 'DUO TOU JIE DAI FENG XIAN',
          component: RiskLoan
        },
        {
          id: [989290, 989292],
          name: "个人信息核查",
          en: 'GE REN XIN XI HE CHA',
          component: IcheckInfo
        },
        {
          id: "",
          name: "黑名单检测",
          en: 'HEI MING DAN JIAN CE',
          component: BlacklistCheck
        },
        // {
        //     id: "",
        //     name: "联系人风险",
        //     en: 'lian xi ren feng xian',
        //     component: ContactsCheck
        // },
        {
          id: "989196",
          name: "失信信息",
          en: 'SHI XIN XIN XI',
          component: BreakInfo
        }
      ],
      loading: true //loading状态
    };
  },
  mounted () {
    this.getData();
    this._configShare();
  },
  methods: {
    //得到请求数据
    getData () {
      let params = {
        id: this.$route.query.id
      };
      this.$post("report/detail", params, "", this).then(response => {
        this.dataInfo = response.data
        this.showAssess = response.data.commentStatus
				this.getTabs(response.data);
				this.getScore();
        if (this.type == 4) {
          let tb = response.data.taobao
          let jd = response.data.jingdong
          if (tb.taobao_status) {
            if (tb.data_status == 15) {
              if (tb.is_notice) {
                this.giveTip('淘宝', tb.rId)
              }
              this.showTaobao = true
            }
          } else {
            this.showTaobao = true
          }
          if (jd.jingdong_status) {
            if (jd.data_status == 15) {
              if (jd.is_notice) {
                this.giveTip('京东', jd.rId)
              }
              this.showJingdong = true
            }
          } else {
            this.showJingdong = true
          }
        }
      });
    },
    // 提示电商报告失败
    giveTip (item, id) {
      ShowDialog('提示', `${item}数据加载失败，请重新认证！`, () => {
        this.$post('report/updateIsNotice', { report_id: id }, "", this, false).then(res => {
        })
      })
    },
    //处理分数显示
    getScore () {
      let params = {
        id: this.$route.query.id
      };
      this.$post("report/ai/getReportScore", params, "", this, false).then(
        response => {
          this.score = response.data.score;
          this.initScoreChart()
          this.subTitle = this.initSubTitile()
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
        }
      );
    },
    //判断处理具体是加强版还是普通版
    getTabs (data) {
      this.type = this.$route.query.type;
      if (this.type == 3) {
        this.tabs.map((item, key) => {
          if (item.name != "黑名单检测") {
            this.menus.push(item);
          }
        });
      } else {
				this.menus = this.tabs;
        if (data.taobao.data_status && data.taobao.data_status == 10) {
          this.menus.push({
            id: "",
            name: "淘宝信息",
            en: 'TAO BAO XIN XI',
            component: Taobao
          })
        }
        if (data.jingdong.data_status && data.jingdong.data_status == 10) {
          this.menus.push({
            id: "",
            name: "京东信息",
            en: 'JING DONG XIN XI',
            component: Jingdong
          })
        }
      }
    },
    // 初始化分数
    initScoreChart () {
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
            axisLine: {
              lineStyle: {       // 属性lineStyle控制线条样式
                width: 15,
                color: [[(this.score / 1000), this.getColor()], [1, '#efefef']]
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
              color: this.getColor(),
              offsetCenter: [0, '15%'],       // x, y，单位px
            },
            type: 'gauge',
            detail: { color: '#333333', offsetCenter: [0, '-40%'] },
            data: [{ value: this.score, name: this.getScoreName() }]
          }
        ]
      };
      // 为echarts对象加载数据
      this.scoreChart.setOption(option);
    },
    // 分数转化文字处理
    getScoreName () {
      let num = this.score
      if (num > 620) {
        return '优秀'
      }
      else if (num > 420) {
        return '良好'
      }
      else if (num > 300) {
        return '合格'
      }
      else {
        return '较低'
      }
    },
    // 分数对应说明处理
    initSubTitile () {
      let num = this.score
      if (num > 620) {
        return '信用评分优秀，网贷通过率较高，请继续保持'
      }
      else if (num > 420) {
        return '信用评分良好，网贷通过率不错，请继续保持'
      }
      else if (num > 300) {
        return '信用评分较好，请保持良好的守信习惯'
      }
      else {
        return '信用评分较低，请养成良好的守信习惯'
      }
    },
    // 分数对应颜色处理
    getColor () {
      let num = this.score
      if (num > 620) {
        return '#6cd972'
      }
      else if (num > 420) {
        return '#46dfbd'
      }
      else if (num > 300) {
        return '#ffc63f'
      }
      else {
        return '#fc662e'
      }
    },
    // 提交评论
    submitAssess () {
      if (this.assessForm.comment_status) {
        this.assessForm.report_id = this.$route.query.id
        this.$post("report/insertReportComment", this.assessForm, "", this, false).then(res => {
          ShowDialog('提示', "提交成功！", () => { this.showAssess = false })
        });
      } else {
        this.Toast("请选择您的宝贵意见");
      }
    },
    // 进入电商检测
    enterCheck (value) {
      this.$router.push({
        path: '/report/index',
        query: {
          type: value,
          id: this.$route.query.id
        }
      })
    }
  }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
