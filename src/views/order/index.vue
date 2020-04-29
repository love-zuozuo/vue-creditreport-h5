<template>
  <section class="main">
    <div class="vt-header">
      <div class="left">
        <img :src="dataList[type].img" alt />
        <div class="right">
          <p class="title">{{dataList[type].title}}</p>
          <p class="info">{{dataList[type].subTitle}}</p>
        </div>
      </div>
      <div class="tips">
        <span v-if="type==1||type==2">
          <font>免费</font>
        </span>
        <span v-else>
          <font>￥</font>
          {{priceData[type-1].price}}
        </span>
      </div>
    </div>
    <van-row class="vt-view">
      <van-row class="tips">
        <van-col class="icon">
          <img src="../../assets/images/icon/icon7.png" />
        </van-col>
        <van-col class="info">
          <p class="title" v-if="type==1||type==2">
            <label>免费</label>为您收集分析全方位的电商消费数据
          </p>
          <template v-else>
            <p class="title">
              已为您扫描
              <label>{{dataList[type].sum}}+项信贷风险数据</label>
            </p>
            <p>支付后可查看</p>
          </template>
        </van-col>
      </van-row>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <van-row class="list">
            <van-row
              class="item ani"
              swiper-animate-effect="slideInLeft"
              :swiper-animate-duration="2+index+'s'"
              v-for="(item,index) in dataList[type].list"
              :key="index"
            >
              <img src="../../assets/images/icon/icon8.png" />
              {{item}}
            </van-row>
          </van-row>
        </swiper-slide>
      </swiper>
    </van-row>
    <van-row class="vt-footer">
      <van-row class="content">
        <van-col class="price">
          ￥
          <span>{{priceData[type-1].price}}</span>
        </van-col>
        <van-col class="other">
          <p>
            <img src="../../assets/images/icon/icon10.png" />
          </p>
          <p class="break">原价￥{{priceData[type-1].price_pre}}</p>
        </van-col>
      </van-row>
      <van-row class="btns">
        <van-button @click="handlePay">立即支付</van-button>
      </van-row>
    </van-row>
  </section>
</template> 
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import * as swiperAni from "../../../static/js/swiper.animate.js";
import { storage, Statistic } from "@/assets/js/util";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      loading: true,
      priceData: [], // 获取价格数据
      swiperOption: {
        // loop: true,
        effect: "fade",
        // 变手势
        grabCursor: true,
        initialSlide: 0,
        // 滑动方向，水平horizontal，垂直vertical
        direction: "vertical",
        on: {
          init: function () {
            swiperAni.swiperAnimateCache(this);
            swiperAni.swiperAnimate(this);
          },
          slideChange: function () {
            swiperAni.swiperAnimate(this);
          }
        }
      },
      type: 1, //报告类型
      dataList: {
        1: {
          img: require("../../assets/images/icon/taobao.png"),
          title: "淘宝数据查询",
          subTitle: "安全准确获取淘宝消费数据",
          list: [
            "你的淘宝个人认证信息",
            "你的淘宝资产信息",
            "你消费行为分析",
            "特殊品消费分析"
          ]
        },
        2: {
          img: require("../../assets/images/icon/jingdong.png"),
          title: "京东数据查询",
          subTitle: "安全准确获取京东消费数据",
          list: [
            "你的京东个人认证信息",
            "你的京东资产信息",
            "你消费行为分析",
            "特殊品消费分析"
          ]
        },
        3: {
          img: require("../../assets/images/icon/r2.png"),
          title: "综合风险核查",
          subTitle: "综合信贷风险筛查",
          sum: 70,
          list: [
            "你的网贷被拒风险",
            "你的不良信息、行为风险",
            "你失信记录",
            "你多头借贷的注册分析",
            "你的信用优化方案"
          ]
        },
        4: {
          img: require("../../assets/images/icon/r1.png"),
          title: "综合风险核查-加强版",
          subTitle: "全方位信贷风险筛查",
          sum: 100,
          list: [
            "你的网贷被拒风险",
            "你的不良信息、行为风险",
            "你是否命中行业黑名单",
            "你多头借贷的注册分析",
            "你的信用优化方案",
            "你的失信记录",
            "你的运营商数据"
          ]
        },
        5: {
          img: require("../../assets/images/icon/r3.png"),
          title: "多头借贷核查",
          subTitle: "多头借贷风险筛查",
          sum: 20,
          list: [
            "金融公司平台记录",
            "小额信贷平台记录",
            "分期消费平台记录",
            "银行金融信贷记录"
          ]
        },
        6: {
          img: require("../../assets/images/icon/r4.png"),
          title: "黑名单核查",
          subTitle: "黑名单风险筛查",
          sum: 20,
          list: [
            "法院失信名单",
            "信贷逾期名单",
            "欺诈风险检测",
            "风险关注名单"
          ]
        }
      }
    };
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper;
    }
  },
  created () {
		if (!storage.getStorage("ocode")) {
      this.GetToken(this, value => { });
    }
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    this.getPrice()
  },
  mounted () {
    this._configShare();
  },
  methods: {
    // 获取报告价格
    getPrice () {
      this.$get("common/report/price", {}, "", this, false).then(res => {
        this.priceData = res.data;
        storage.setStorage("priceData", res.data);
      });
    },
    //立即支付
    handlePay () {
      this.setCount()
      if (this.priceData[this.type - 1].price == 0) {
        this.$router.push({
          path: "/callback/alipay"
        });
      } else {
        let params = {
          id: this.$route.query.id,
          isFirst: this.$route.query.isFirst ? this.$route.query.isFirst : ''
        };
        this.$post("report/pay/getParam", params, "", this).then(
          response => {
            this.GoPay(response.data, "wexin", this);
          }
        );
      }
    },
    // 统计数据
    setCount () {
      if (this.type == 3) { // 普通版-支付页面-支付按钮
        Statistic(13)
      }
      if (this.type == 4) { // 加强版-支付页面-支付按钮
        Statistic(12)
      }
      if (this.type == 6) { // 黑名单-支付页面-支付按钮
        Statistic(14)
      }
    }
  }
};
</script>
 
<style scoped lang='less'>
@import "../../assets/css/app/order/index.less";
@import "../../../static/css/animate.css";
</style>
