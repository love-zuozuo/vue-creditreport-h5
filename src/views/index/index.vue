<template>
  <section :class="['main',stopScroll?'vt-scroll':'']">
    <van-row class="vt-admin">
      <div class="content" v-if="token">
        <img :src="user.avatar" class="avatar" v-if="user.avatar" />
        <img src="../../assets/images/user.png" class="avatar" v-else />
        <div class="user-info">
          <p class="title">{{user.nickname?user.nickname:'未知用户'}}</p>
          <div class="btns">
            <button @click="handleOpenPhone">更换手机号</button>
            <button @click="handleHistory">历史报告</button>
          </div>
        </div>
      </div>
      <div class="content" @click="handleOpenLogin" v-else>
        <img src="../../assets/images/user.png" class="avatar" />
        <div class="user-info">
          <p class="title">注册/登录</p>
          <p class="sub-title">安全保障你的个人信息</p>
        </div>
        <img class="enter" src="../../assets/images/enter.png" />
      </div>
    </van-row>
    <van-row class="vt-banner">
      <img src="../../assets/images/banner.png" />
    </van-row>
    <div class="vt-order" @click="toPay" v-if="JSON.stringify(payOrder)!='{}'">
      <div class="top">
        <img src="../../assets/images/tobepay.png" />
        <p>
          原价
          <span>￥{{priceData.length?priceData[payOrder.type-1].price_pre:''}}</span>
        </p>
      </div>
      <div class="mid">
        <div class="item">
          <label>姓名</label>
          <p>{{payOrder.name}}</p>
        </div>
        <div class="item">
          <label>身份证</label>
          <p>{{payOrder.idcard}}</p>
        </div>
        <div class="item">
          <label>手机号</label>
          <p>{{payOrder.phone}}</p>
        </div>
      </div>
      <div class="btm">
        <img src="../../assets/images/tobepay-img.png" />
        <p>
          ￥
          <span>{{priceData.length?priceData[payOrder.type-1].price:''}}</span>立即支付
        </p>
      </div>
    </div>
    <van-row class="vt-recommend">
      <van-row class="vt-title">
        <span>为你推荐</span>
      </van-row>
      <van-row class="vt-list">
        <div class="item" @click="toReportInquire(4)">
          <!-- <van-row class="vt-buy">{{buys[3]}}人已购</van-row> -->
          <van-col class="icon">
            <img src="../../assets/images/icon/r1.png" />
          </van-col>
          <van-col class="content">
            <van-row class="title">综合风险核查-加强版</van-row>
            <van-row class="tips">
              深度信用检测
              <div>全方位查询</div>更全更准
            </van-row>
            <div class="check-btn">
              <div class="origin-price">￥{{priceData.length?priceData[3].price_pre:''}}</div>
              <div class="now-price">
                ￥
                <span>{{priceData.length?priceData[3].price:''}}</span>立即检测
              </div>
            </div>
          </van-col>
        </div>
        <div class="item" @click="toReportInquire(3)">
          <van-col class="icon">
            <img src="../../assets/images/icon/r2.png" />
          </van-col>
          <van-col class="content">
            <van-row class="title">综合风险核查</van-row>
            <van-row class="tips">
              风险扫描
              <div>被拒分析</div>贷前必查
            </van-row>
            <div class="check-btn">
              <div class="origin-price">￥{{priceData.length?priceData[2].price_pre:''}}</div>
              <div class="now-price">
                ￥
                <span>{{priceData.length?priceData[2].price:''}}</span>立即检测
              </div>
            </div>
          </van-col>
        </div>
        <van-row v-if="isMultipleloan">
          <van-col span="12">
            <div class="loan-item" @click="toReportInquire(5)">
              <div class="price-box">
                <div class="now-price">￥{{priceData.length?priceData[4].price:''}}</div>
                <span class="origin-price">￥{{priceData.length?priceData[4].price_pre:''}}</span>
              </div>
              <img src="../../assets/images/icon/r3.png" />
              <p>多头借贷检测</p>
            </div>
          </van-col>
          <van-col span="12">
            <div class="loan-item" @click="toReportInquire(6)" style="float:right">
              <div class="price-box">
                <div class="now-price">￥{{priceData.length?priceData[5].price:''}}</div>
                <span class="origin-price">￥{{priceData.length?priceData[5].price_pre:''}}</span>
              </div>
              <img src="../../assets/images/icon/r4.png" />
              <p>黑名单检测</p>
            </div>
          </van-col>
        </van-row>
        <div class="item" @click="toReportInquire(6)" v-else>
          <van-col class="icon">
            <img src="../../assets/images/icon/r4.png" />
          </van-col>
          <van-col class="content">
            <van-row class="title">黑名单检测</van-row>
            <van-row class="tips">
              被拒分析
              <div>安全准确</div>网贷名单扫描
            </van-row>
            <div class="check-btn">
              <div class="origin-price">￥{{priceData.length?priceData[5].price_pre:''}}</div>
              <div class="now-price">
                ￥
                <span>{{priceData.length?priceData[5].price:''}}</span>立即检测
              </div>
            </div>
          </van-col>
        </div>
      </van-row>
    </van-row>
    <van-row class="vt-service" v-if="isTaobao||isJingdong">
      <van-row class="vt-title">
        <span>特色服务</span>
      </van-row>
      <van-row class="vt-list">
        <van-col span="12" v-if="isTaobao">
          <div class="item taobao" @click="toReportInquire(1)">
            <div class="title">淘宝借贷信息</div>
            <div class="btns">免费检测</div>
          </div>
        </van-col>
        <van-col span="12" v-if="isJingdong">
          <div class="item jingdong" @click="toReportInquire(2)">
            <div class="title">京东借贷信息</div>
            <div class="btns">免费检测</div>
          </div>
        </van-col>
      </van-row>
    </van-row>
    <van-row class="vt-news">
      <van-row class="vt-title m15">
        <span>小启资讯</span>
        <div class="more" @click="handleNewsMore">
          更多
          <van-icon name="arrow" />
        </div>
      </van-row>
      <van-row class="vt-list">
        <div
          class="item cell"
          v-for="(item,index) in newsData"
          :key="index"
          @click="toArticle(item)"
        >
          <van-row class="content">
            <van-row class="title">{{item.title}}</van-row>
            <van-row class="tips">{{FmtDate(item.publishDate)}}</van-row>
          </van-row>
          <van-row class="icon">
            <img :src="item.bannerUrl" />
          </van-row>
        </div>
      </van-row>
      <div class="vt-more" @click="handleNewsMore">查看更多资讯</div>
    </van-row>
    <!-- 登录 -->
    <Popup :popupShow="popupShow" :showClose="true" popupHeight="380">
      <van-row slot="main" class="vt-login">
        <Login
          :isLogin="1"
          :popupShow="popupShow"
          @handleLogin="handleLoginSubmit"
          @handleAgree="handleAgree"
        />
      </van-row>
    </Popup>
    <!-- 更换手机号 -->
    <Popup :popupShow="popupHistory" :showClose="true" popupHeight="350" v-if="popupHistory">
      <van-row slot="main" class="vt-login">
        <UpdataPhone :popupShow="popupHistory" :user="user" @handlePhoneSubmit="handlePhoneSubmit" />
      </van-row>
    </Popup>
    <!-- 协议内容 -->
    <Dialog title="“小启查”用户服务协议及个人信息查询和使用授权" :agreeShow="agreeShow">
      <van-row slot="main">
        <van-row class="vt-dialog-agree">
          <Agree />
        </van-row>
        <van-row class="vt-dialog-button">
          <van-button @click="handleConfirm" type="default">确定</van-button>
        </van-row>
      </van-row>
    </Dialog>
  </section>
</template> 
<script>
import { storage, Statistic } from "@/assets/js/util";
import Popup from "@/components/popup.vue";
import Login from "@/components/login.vue";
import UpdataPhone from "@/components/updataPhone.vue";
import Dialog from "@/components/dialog.vue";
import Agree from "@/components/agree.vue";
export default {
  components: {
    Popup,
    Login,
    Dialog,
    Agree,
    UpdataPhone
  },
  data () {
    return {
      loading: true,
      animate: false,
      popupShow: false, // 登录弹框显示
      popupHistory: false, // 更换手机号弹框显示
      isJingdong: true, // 京东入口显示开关
      isTaobao: true, // 淘宝入口显示开关
      isMultipleloan: true, // 多头借贷入口
      stopScroll: false, //阻止滚轮状态
      token: "", //用户token
      user: {}, //用户信息
      notices: [], //购买公告(暂不使用)
      buys: "", //购买数量(暂不使用)
      type: 0, // 淘宝或京东
      agreeShow: false, //控制协议状态
      newsData: [], //新闻公告信息
      priceData: [], // 价格数据
      payOrder: {}
    };
  },
  watch: {
    user: {
      handler (newValue, oldValue) {
        this.user = newValue;
      },
      deep: true
    },
    token (newValue, oldValue) {
      if (newValue) {
        this.getPayOrder()
      }
    }
  },
  mounted () {
    if (this.$route.query.uuid) {
      storage.setStorage("shareUuid", this.$route.query.uuid);
    } else {
      storage.setStorage("shareUuid", "");
    }
    if (this.$route.query.time) {
      storage.setStorage("shareTime", this.$route.query.time);
    } else {
      storage.setStorage("shareTime", "");
    }
    this.isJingdong = window.isJingdong;
    this.isTaobao = window.isTaobao;
    this.isMultipleloan = window.isMultipleloan;
    this.getAuth();
    this.getNews();
  },
  methods: {
    // 界面加载&&界面授权
    getAuth () {
      let params = {
        uuid: this.$route.query.uuid ? this.$route.query.uuid : "",
        time: this.$route.query.time ? this.$route.query.time : "",
        code: this.$route.query.code ? this.$route.query.code : "",
        ocode: storage.getStorage("ocode")
          ? storage.getStorage("ocode")
          : ""
      };
      this.$get("user/info", params, "", this).then(res => {
        let str = res.data.ocode;
        let openId = str.substr(0, 6) + str.substr(12, str.length);
        let ocode =
          openId.substr(0, 8) +
          this.RandomRange(6, 6) +
          openId.substr(8, openId.length);
        storage.setStorage("ocode", ocode);
				storage.setStorage("user", res.data);
				Statistic(3) //小启查首页
        this.token = res.data.token;
				this.user = res.data.user;
				this.getPrice();
        this._configShare();
        if (
          !res.data.token &&
          this.$route.query.isLogin &&
          this.$route.query.isLogin == 1
        ) {
          this.handleOpenLogin()
        }
      });
    },

    // 获取报告价格
    getPrice () {
      this.$get("common/report/price", {}, "", this, false).then(res => {
        this.priceData = res.data;
        storage.setStorage("priceData", res.data);
      });
    },

    // 获取小启资讯
    getNews () {
      let params = {
        currentPage: 1,
        pageSize: 3,
        type: "xqtt"
      };
      this.$get("news/list", params, "", this, false).then(res => {
        this.newsData = res.data.dataList
      });
    },

    // 获取最近一条待付款订单信息
    getPayOrder () {
      this.$get("/report/getWaitPaymentReport", {}, "", this, false).then(res => {
        this.payOrder = res.data
      });
    },

    // 待支付订单点击进入支付页面
    toPay () {
      this.$router.push({
        path: "/order/index",
        query: {
          type: this.payOrder.type,
          id: this.payOrder.id,
          isFirst: 2
        }
      })
    },

    //综合风险核查 跳转
    handleReportCheck (value) {
      let url = '/riskReport'
      if (value == 1 || value == 2) {
        url = '/report/index'
      }
      this.$router.push({
        path: url,
        query: {
          type: value
        }
      });
      this.setCount(value);
    },

    // 统计数据
    setCount (value) {
      let code = ''
      switch (value) {
        case 1: //淘宝报告按钮
          code = 8
          break
        case 2: //京东报告按钮
          code = 7
          break
        case 3: // 普通版报告按钮
          code = 5
          break
        case 4: // 加强版报告按钮
          code = 4
          break
        case 6: // 黑名单报告按钮
          code = 6
          break
        default: break
      }
      Statistic(code)
    },

    // 报告查询入口
    toReportInquire (type) {
      if (storage.getStorage("user").token) {
        this.GetToken(this, value => {
          this.token = value.token;
          this.handleReportCheck(type);
        });
      } else {
        this.type = type;
        this.handleOpenLogin();
      }
    },

    //查看更多资讯
    handleNewsMore () {
      this.$router.push({
        path: "/news/index"
      });
    },

    //点击进入资讯详情页
    toArticle (item) {
      if (item.sourceType == 1) {
        this.$router.push({
          path: "/news/detail",
          query: {
            newsid: item.articleInfoUuid
          }
        });
      } else {
        window.location.href = item.reprintUrl;
      }
    },

    //点击进入历史报告页
    handleHistory () {
      this.$router.push({
        path: "/history/index"
      });
    },

    //唤起更换手机弹窗
    handleOpenPhone () {
      this.stopScroll = true;
      this.popupHistory = true;
    },

    // 唤起登录弹框
    handleOpenLogin () {
      this.stopScroll = true;
      this.popupShow = true;
    },

    //确定更换手机
    handlePhoneSubmit (value) {
      let params = {
        newPhone: value.phone,
        code: value.code
      };
      this.$post("user/changePhone", params, "", this).then(response => {
        this.stopScroll = false;
        this.popupHistory = false;
        this.user = response.data.user
        this.token = response.data.token;
        storage.setStorage("user", response.data);
        this.Toast("修改成功");
      });
    },

    //获取登录验证码
    handleCode () {
      this.AuthCode();
    },

    //登录提交
    handleLoginSubmit (value) {
      let params = {
        phone: value.phone,
        verifyCode: value.code,
        id: this.user.id,
        shareUuid: storage.getStorage("shareUuid")
          ? storage.getStorage("shareUuid")
          : "",
        shareTime: storage.getStorage("shareTime")
          ? storage.getStorage("shareTime")
          : ""
      };
      this.$post("user/login", params, "", this).then(response => {
        this.stopScroll = false;
        this.popupShow = false;
        storage.setStorage("user", response.data);
        this.user = response.data.user;
        this.token = response.data.token;
        this.Toast("登录成功");
        if (this.type == 0) {
          return;
        }
        this.handleTaobaoCheck(type);
      });
    },

    //协议展示展开
    handleAgree () {
      this.agreeShow = true;
    },

    //协议展示关闭
    handleConfirm () {
      this.agreeShow = false;
    },

    // banner点击跳转
    handleBanner () {
      this.$router.push('/spread')
    }
  }
};
</script>
 
<style scoped lang='less'>
@import "../../assets/css/app/index/index.less";
</style>

