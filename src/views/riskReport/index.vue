<template>
  <section :class="['main',stopScroll?'vt-scroll':'']">
    <van-row class="vt-banner">
      <img src="../../assets/images/banner/report_banner.png" />
      <div class="banner-text">
        <p v-for="(item,index) in introList[type].bannerText" :key="index">{{item}}</p>
      </div>
    </van-row>
    <van-row class="vt-form vt-bg">
      <van-row class="title">请输入查询对象的身份信息</van-row>
      <van-row class="list">
        <van-row class="item cell">
          <van-row class="name">
            <span v-show="form.name">姓名</span>
          </van-row>
          <van-col span="14">
            <input class="vt-input" v-model="form.name" maxlength="10" placeholder="请输入本人的姓名" />
          </van-col>
          <van-col span="10">
            <div class="vt-add" @click="handleHistory">
              <img src="../../assets/images/icon/add.png" /> 历史查询人
            </div>
          </van-col>
        </van-row>
        <van-row class="item cell">
          <van-row class="name">
            <span v-show="form.card">身份证</span>
          </van-row>
          <van-col span="24">
            <input class="vt-input" v-model="form.card" maxlength="18" placeholder="请输入本人的身份证号" />
          </van-col>
        </van-row>
        <van-row class="item cell">
          <van-row class="name">
            <span v-show="form.phone">手机号</span>
          </van-row>
          <van-col span="24">
            <input
              class="vt-input"
              v-model="form.phone"
              maxlength="11"
              @input="handleLeave()"
              placeholder="请输入本人的手机号"
            />
          </van-col>
        </van-row>
        <van-row
          class="item cell"
          v-if="type==5||type==6||phoneType=='mobile'||phoneType=='unicom'"
        >
          <van-row class="name">
            <span v-show="form.code">验证码</span>
          </van-row>
          <van-col span="16">
            <input class="vt-input" v-model="form.code" maxlength="6" placeholder="请输入验证码" />
          </van-col>
          <van-col span="8">
            <div class="vt-add" v-if="sendAuthCode" @click="handleReportCode('report')">获取验证码</div>
            <div class="vt-add" v-if="codeGetting">验证码获取中</div>
            <div v-if="!sendAuthCode && !codeGetting" class="vt-add">{{authTime}}s后重发</div>
          </van-col>
        </van-row>
        <van-row class="item cell" v-if="type==3||type==4">
          <van-row class="name">
            <span v-show="form.serviceCode">运营商服务密码</span>
          </van-row>
          <van-col span="16">
            <input
              v-model="form.serviceCode"
              class="vt-input"
              type="password"
              maxlength="10"
              placeholder="请输入运营商服务密码"
            />
          </van-col>
          <van-col span="8">
            <div class="vt-add" @click="forgetCode()">忘记密码</div>
          </van-col>
        </van-row>
      </van-row>
      <van-row class="inquire-li cell" v-if="picShow && phoneType !='telecom'">
        <van-row class="input-div">
          <van-col :span="16">
            <div class="label-div">
              <label v-show="form.picCode">验证码</label>
            </div>
            <input class="vt-input" v-model="form.picCode" placeholder="请输入右侧图形验证码" />
          </van-col>
          <van-col :span="8">
            <div class="code" @click="handleRefresh">
              <div class="change-btn">点击更换</div>
              <img :src="'data:image/png;base64,'+form.picImg" />
            </div>
          </van-col>
        </van-row>
      </van-row>
      <van-row class="vt-agree">
        <div :class="['check',check?'checked':'']" @click="handleCheck"></div>我阅读并同意
        <span @click="handleDataAnalyse()">《小启查用户服务协议及个人信息查询和使用授权》</span>协议
      </van-row>
      <van-row class="btns">
        <van-button type="default" @click="handleSubmit">立即检测</van-button>
      </van-row>
      <van-row class="other">
        <van-col span="12">
          <span @click="handleExample">
            <img src="../../assets/images/icon/icon1.png" /> 样例报告
          </span>
        </van-col>
        <van-col span="12">
          <span @click="handleHistoryReport">
            <img src="../../assets/images/icon/icon2.png" /> 历史报告
          </span>
        </van-col>
      </van-row>
    </van-row>
    <van-row class="vt-explain vt-bg">
      <van-row class="icon">
        <img src="../../assets/images/icon/icon3.png" />
      </van-row>
      <van-row class="content">
        <van-row class="title">{{introList[type].title}}</van-row>
        <van-row class="tips">{{introList[type].content}}</van-row>
      </van-row>
    </van-row>
    <van-row class="vt-about vt-bg">
      <van-row class="title">报告主要内容</van-row>
      <van-row class="content">
        <van-col span="12" v-for="(con,index) in introList[type].reportCon" :key="index">{{con}}</van-col>
      </van-row>
    </van-row>

    <!-- 运营商服务电话 -->
    <Popup :popupShow="popupForget" :showClose="true" popupHeight="750" ref="popup">
      <van-row slot="main" class="vt-forget">
        <div class="title">您可通过拨打相应运营商的电话转人工客服进行密码查询！</div>
        <ul class="forget-ul">
          <li>
            <a class="phone" href="tel:10000">10000</a>
            <p class="name">电信</p>
          </li>
          <li>
            <a class="phone" href="tel:10086">10086</a>
            <p class="name">移动</p>
          </li>
          <li>
            <a class="phone" href="tel:10010">10010</a>
            <p class="name">联通</p>
          </li>
        </ul>
      </van-row>
    </Popup>

    <!-- 历史查询人 -->
    <Popup :popupShow="popupHistory" popupHeight="500" ref="popup">
      <van-row slot="main" class="vt-history">
        <div
          class="item cell"
          v-for="(item,index) in histroyList"
          :key="index"
          @click="handleChangeHistory(index)"
        >
          <van-row class="content">
            <p class="title">
              {{item.name}}
              <span>{{item.phone}}</span>
            </p>
            <p class="card">身份证 {{item.idcard}}</p>
          </van-row>
          <van-row :class="['icon',historyActivity==index?'on':'']"></van-row>
        </div>
      </van-row>
    </Popup>

    <!-- 数据协议弹框 -->
    <Dialog title="“小启查”用户服务协议及个人信息查询和使用授权" :agreeShow="analyseShow">
      <van-row slot="main">
        <van-row class="vt-dialog-agree">
          <Agree />
        </van-row>
        <van-row class="vt-dialog-button" style="display:flex;">
          <van-button @click="analyseShow=false" type="default" style="color:#ccc">取消</van-button>
          <van-button @click="handleConfirmAnalyse" type="default" :disabled="secTime>0">
            确定
            <span v-if="secTime>0">({{secTime}}s)</span>
          </van-button>
        </van-row>
      </van-row>
    </Dialog>

    <!-- 二次验证弹框 -->
    <Dialog
      title="身份验证"
      :agreeShow="secondVerifyShow"
      :showBtn="true"
      @handleConfirm="handleSecondVerify"
      @handleCancel="handleSecondClose"
    >
      <div slot="main" class="second-auth">
        <p class="info">为确保您的信息安全，需要对登录号码进行身份验证</p>
        <div class="second-form">
          <van-row class="item" v-if="noPicCode">
            <van-col :span="16">
              <input
                class="vt-input"
                v-model="form.secondCode"
                maxlength="6"
                placeholder="请输入手机验证码"
                @blur="scrollTo"
              />
            </van-col>
            <van-col class="code" :span="8">
              <div class="setting" v-if="sendSecondCode" @click.stop="getSecondCode()">获取验证码</div>
              <div class="getting" v-else>{{secondTime}}s重新获取</div>
            </van-col>
          </van-row>
          <van-row class="pic-code" v-else>
            <van-col :span="14" class="item">
              <input
                class="vt-input"
                v-model="form.secondCode"
                placeholder="请输入图文验证码"
                @blur="scrollTo"
              />
            </van-col>
            <van-col :span="10">
              <div @click="getSecondPic" class="code-box">
                <img class="code-img" :src="'data:image/png;base64,'+form.secondPicImg" />
                <img class="code-refresh" src="../../assets/images/icon/refresh-code.png" />
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </Dialog>

    <!-- 数据协议弹框 -->
    <Dialog title="提示" :agreeShow="againMsg">
      <van-row slot="main">
        <p class="again-msg">手机验证码校验失败，请重新获取并校验。</p>
        <van-row class="vt-dialog-button" style="display:flex;">
          <van-button @click="closeAgainMsg" type="default" :disabled="secondTime>0">
            确定
            <span v-if="secondTime>0">({{secondTime}}s)</span>
          </van-button>
        </van-row>
      </van-row>
    </Dialog>
  </section>
</template> 
<script>
import { storage, ShowDialog, Statistic } from "@/assets/js/util";
import Popup from "@/components/popup.vue";
import Dialog from "@/components/dialog.vue";
import Agree from "@/components/agree.vue";
import { Rule } from "@/assets/js/rule";
export default {
  components: {
    Popup,
    Dialog,
    Agree
  },
  data () {
    return {
			loading: true,
      check: false, // 阅读协议选中状态
      stopScroll: false, // 阻止滚轮状态
      againMsg: false,
      popupHistory: false, // 是否弹出历史查询人
      popupForget: false, // 是否弹出服务商电话
      sendAuthCode: true, // 是否发送验证码状态
      codeGetting: false, // 是否验证码获取中状态
      picShow: false, // 是否控制显示图片验证码 联通随机出现
      authTime: 60, // 倒计时时间   
      secondTime: 60, // 二次验证倒计时
      secondTmer: null, // 二次验证定时器 
      historyActivity: 0,
      user: {}, // 用户基础信息
      token: "", // 用户token
      phoneType: "", // 运营商类型
      type: this.$route.query.type, // 从url获取报告类型参数
      reqId: "", // 运营商采集id
      flag: true, // 控制拉取报告定时开关
      loadingText: false,
      analyseShow: false, // 数据分析协议状态
      secTime: 6, // 强制阅读协议时长
      timer: null, // 阅读协议倒计时 
      secondVerifyShow: false, // 身份认证弹框状态
      sendSecondCode: true, // 触发二次验证发送验证码状态
      noPicCode: true, // 二次验证弹框的内容控制：true有短信无图片，false有图片无短信，默认true
      form: {
        name: "", // 姓名
        card: "", // 身份证号
        phone: "", // 手机号
        code: "", // 验证码
        serviceCode: "", // 运营商服务密码
        picCode: "", // 图片验证码提交
        picImg: "", // 图片二维码图片
        secondCode: "", // 二次验证短信验证码或图片验证码
        secondPicImg: "", // 二次验证二维码图片
      }, // 查询时可能需要提交的参数
      histroyList: [], // 历史查询人列表
      introList: {
        3: {
          bannerText: [
            "额度低？被拒贷？",
            "覆盖核心信贷数据   专业指引提高信用分"
          ],
          title: "为什么要做贷前报告？",
          content:
            "99%的网贷机构和银行在放贷申请上，都会查询申请人是否命中网贷黑名单，逾期记录，多头借贷信息等，作为风控审核是否放贷。",
          reportCon: [
            "网贷被拒风险",
            "司法风险情况",
            "用户身份风险",
            "个人不良记录",
            "信用优化建议",
            "多头借贷风险",
            "身份冒用分线",
            "金融失信风险"
          ]
        },
        4: {
          bannerText: [
            "组合查询，更全，更准，更优惠",
            "深度排查被拒原因，1秒查清，轻松借款"
          ],
          title: "加强版比标准版的好处？",
          content:
            "99%的网贷机构和银行在放贷申请上，都会查询申请人是否命中网贷黑名单，逾期记录，多头借贷信息等，作为风控审核是否放贷。高级版包括更全更有价值的数据！",
          reportCon: [
            "网贷被拒风险",
            "欺诈风险检测",
            "金融失信记录",
            "个人不良记录",
            "黑名单风险",
            "多头借贷风险",
            "运营商信息",
            "用户身份风险",
            "信用优化建议",
            "司法风险情况"
          ]
        },
        5: {
          bannerText: [
            "贷款通过率低？",
            "深度检测多头借贷，查清原因，更好借！"
          ],
          title: "为什么要查多头借贷？",
          content:
            "99%的网贷机构和银行在放贷申请上，都会查询申请人是否命中网贷黑名单，逾期记录，多头借贷信息等，作为风控审核是否放贷。",
          reportCon: [
            "金融公司平台记录",
            "小额信贷平台记录",
            "银行金融信贷记录",
            "分期消费平台记录"
          ]
        },
        6: {
          bannerText: ["轻松查清拒贷原因", "多维度直击信用风险"],
          title: "为什么查大数据黑名单？",
          content:
            "99%的网贷机构和银行在放贷申请上，都会查询申请人是否命中网贷黑名单，逾期记录，多头借贷信息等，作为风控审核是否放贷。",
          reportCon: [
            "法院失信名单",
            "欺诈风险检测",
            "信贷逾期名单",
            "风险关注名单"
          ]
        }
      } // 页面下方的介绍内容文字
    };
  },
  mounted () {
    let user = storage.getStorage("user");
    this.user = user.user;
    this.token = user.token;
    this._configShare();
    this.BackScrollTop();
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
    window.clearInterval(this.secondTimer)
  },
  methods: {
    // 立即检测login
    handleSubmit () {
      if (!Rule.checkDataNull(this.form.name, "查询对象名字不能为空!")) {
        return false
      }
      if (!Rule.checkCard(this.form.card)) {
        return false
      }
      if (!Rule.checkDataPhone(this.form.phone)) {
        return false
      }
      if (this.phoneType != "telecom") {
        //排除电信手机不需要验证码
        if (!Rule.checkDataCode(this.form.code, 6)) {
          return false
        }
      }
      if (
        (this.type == 3 || this.type == 4) &&
        !this.reqId &&
        this.phoneType != "telecom"
      ) {
        // 处理没有刷新reqId的情况
        this.Toast("请重新获取验证码！");
        return false;
      }
      if (
        (this.type == 3 || this.type == 4) &&
        !Rule.checkDataNull(
          this.form.serviceCode,
          "运营商服务密码不能为空!"
        )
      ) {
        return false
      }
      if (!this.check) {
        this.Toast("请阅读并同意相关协议！");
        return false
      }
      if (this.type == 3 || this.type == 4) { // 综合普通版和加强版报告的登录
        this.comReportLogin()
      } else {  // 黑名单和多头报告登录
        this.blackReportLogin()
			}
			this.setCount()
    },

    // 黑名单多头报告登录处理
    blackReportLogin () {
      let params = {
        name: this.form.name,
        phone: this.form.phone,
        idcard: this.form.card,
        type: this.$route.query.type,
        verifyCode: this.form.code
      }
      this.$post("report/applyTd", params, "", this).then(res => {
        this.$router.push({
          path: "/order/index",
          query: {
            type: this.$route.query.type,
            id: res.data.id
          }
        })
      })
    },
    // 统计数据
    setCount () {
			if (this.type == 3) { // 普通版查询页-立即检测按钮
        Statistic(10)
      }
      if (this.type == 4) { // 加强版查询页-立即检测按钮
        Statistic(9)
      }
      if (this.type == 6) { // 黑名单版查询页-立即检测按钮
        Statistic(11)
      }    
    },

    // 综合报告登录处理
    comReportLogin () {
      let params = {
        name: this.form.name,
        phone: this.form.phone,
        password: this.form.serviceCode,
        phone_type: this.phoneType,
        picCode: this.form.picCode,
        randomPassword: this.form.code,
        idcard: this.form.card,
        type: this.$route.query.type
      }
      if (this.reqId) { // 电信没有reqId
        params.reqId = this.reqId
      }
      this.$post("report/ai/phoneLogin", params, "", this).then(res => {
        if (this.checkSecondSwitch()) { // 判断二次验证开关是否打开
          this.reqId = res.data.reqId // 保证reqId存在
          if (this.phoneType == 'mobile') { // 判断第二次是否为图片验证码
            this.noPicCode = false
            this.getSecondPic()
          } else {
            this.noPicCode = true
          }
          // 登录成功后弹出二次验证框，获取二次验证短信码
          this.secondVerifyShow = true
          this.form.secondCode = ''
        } else {
          this.$router.push({
            path: "/order/index",
            query: {
              type: this.$route.query.type,
              id: res.data.id
            }
          })
        }
      })
    },

    // 判断运营商开关
    checkSecondSwitch () {
      if (this.phoneType == 'mobile' && !window.isMobileSecond) {
        return false
      }
      if (this.phoneType == 'unicom' && !window.isUnicomSecond) {
        return false
      }
      if (this.phoneType == 'telecom' && !window.isTelecomSecond) {
        return false
      }
      return true
    },

    /**
		 * 鼠标离开手机号
		 * 获取手机号类型
		 */
    handleLeave () {
      if (
        (this.type == 3 || this.type == 4) &&
        this.form.phone.length == 11
      ) {
        if (!Rule.checkDataPhone(this.form.phone)) {
          return false;
        }
        let params = {
          phone: this.form.phone
        };

        this.$get("report/ai/phoneType", params, "", this).then(
          response => {
            if (response.data.type) {
              let type = response.data.type
              // 运营商开关关闭时提示错误并清空手机号输入框
              if (this.checkPhoneSwitch(type)) {
                this.phoneType = type
              } else {
                ShowDialog('提示', "手机号系统识别繁忙，请稍后重试或更换本人其它运营商手机号进行查询", () => { this.form.phone = "" })
              }
            } else { // 手机号类型不存在提示识别错误，并清空输入框
              ShowDialog('提示', "手机号识别失败！", () => { this.form.phone = "" })
            }
          }
        );
      }
    },

    // 判断运营商开关
    checkPhoneSwitch (type) {
      if (type == 'mobile' && !window.isMobile) {
        return false
      }
      if (type == 'unicom' && !window.isUnicom) {
        return false
      }
      if (type == 'telecom' && !window.isTelecom) {
        return false
      }
      return true
    },

    //刷新图片验证码
    handleRefresh () {
      let params = {
        phone_type: this.phoneType,
        reqId: this.reqId
      };
      this.$post("report/ai/phoneRefreshPic", params, "", this).then(
        response => {
          this.form.picImg = response.data.data.extra.remark;
        }
      );
    },

    // 忘记运营商密码
    forgetCode () {
      this.stopScroll = true;
      this.popupForget = true;
    },

    //弹出历史查询人
    handleHistory () {
      let params = {
        page: 1,
        size: 30
      };
      this.$post("report/users", params, "", this).then(response => {
        this.histroyList = response.data.detail;
        if (this.histroyList.length > 0) {
          this.stopScroll = true;
          this.popupHistory = true;
        } else {
          ShowDialog('提示', "暂无历史查询人数据！")
        }
      });
    },

    //选择历史查询人
    handleChangeHistory (key) {
      this.historyActivity = key;
      this.form.phone = this.histroyList[key].phone;
      this.form.name = this.histroyList[key].name;
      this.form.card = this.histroyList[key].idcard;
      this.handleLeave();
      this.stopScroll = false;
      this.popupHistory = false;
    },

    //跳转样例报告
    handleExample () {
      if (this.type == 5) {  // 多头
        this.$router.push({
          path: '/ultiloanReport/example'
        });
      } else if (this.type == 6) { // 黑名单
        this.$router.push({
          path: '/blacklistReport/example'
        });
      } else {
        this.$router.push({
          path: `/riskReport/example?type=${this.type}`
        });

      }
    },

    // 点击勾选协议
    handleCheck () {
      if (this.check) {
        this.check = false;
      } else {
        this.handleDataAnalyse();
      }
    },

    // 关闭二次验证弹框
    handleSecondClose () {
      this.secondVerifyShow = false
      this.sendSecondCode = true
      this.noPicCode = true
      window.clearInterval(this.secondTimer)
    },

    //刷新二次验证图片验证码
    getSecondPic () {
      this.form.secondPicImg = ""
      this.$post(
        "report/ai/secondPic",
        {
          phone_type: this.phoneType,
          reqId: this.reqId
        },
        "",
        this
      ).then(res => {
        this.form.secondPicImg = res.data.pic
      })
    },

    //获取二次短信验证码
    getSecondCode () {
      this.$post(
        "report/ai/secondSms",
        {
          phone: this.form.phone,
          phone_type: this.phoneType,
          reqId: this.reqId
        },
        "",
        this
      ).then(res => {
        this.sendSecondCode = false;
        this.Toast("验证码已发送！");
        window.clearInterval(this.secondTimer)
        this.secondTime = 60
        this.secondTimer = setInterval(() => {
          if (this.secondTime == 0) {
            window.clearInterval(this.secondTimer);
            this.sendSecondCode = true;
          } else {
            this.secondTime--;
          }
        }, 1000);
      })
    },

    // 二次验证提交
    handleSecondVerify () {
      if (!Rule.checkDataNull(this.form.secondCode, "请输入验证码")) {
        return false;
      }
      let params = {
        code: this.form.secondCode,
        idcard: this.form.card,
        name: this.form.name,
        password: this.form.serviceCode,
        phone: this.form.phone,
        phone_type: this.phoneType,
        report_type: this.$route.query.type,
        reqId: this.reqId,
        type: this.noPicCode ? 'sms' : 'pic'
      }
      this.$post(
        "report/ai/secondSendCode",
        params,
        "",
        this
      ).then(res => {
        if (res.data.code == 200) {
          let status = res.data.status
          // status的值 1:表示已经结束 2:表示还有一次验证
          if (status == 1) {
            this.handleSecondClose()
            this.Toast("验证成功！");
            // 验证结束后跳转到支付页面
            this.$router.push({
              path: "/order/index",
              query: {
                type: this.$route.query.type,
                id: res.data.id
              }
            })
          } else {
            this.sendSecondCode = true;
            this.form.secondCode = ""
            if (res.data.pic) { // 判断第二次是否为图片验证码
              this.noPicCode = false
              this.form.secondPicImg = res.data.pic
            } else {
              this.noPicCode = true
            }
            ShowDialog('提示', "请再次认证身份！")
          }
        } else {
          if (this.phoneType == 'mobile' && this.noPicCode) { // 移动遇到短信校验错误就重新走二次验证流程
            if (this.sendSecondCode) {
              this.secondTime = 0
            }
            this.againMsg = true
          } else {
            ShowDialog('提示', res.data.msg)
          }
        }
      })
    },

    //获取查询对象验证码
    handleReportCode (key) {
      if (Rule.checkDataPhone(this.form.phone)) {
        this.codeGetting = true;
        this.sendAuthCode = false;
        if (this.type == 3 || this.type == 4) {
          this.$post(
            "report/ai/phoneConfig",
            {
              phone: this.form.phone,
              phone_type: this.phoneType
            },
            "",
            this
          ).then(response => {
            if (response.code == "10000") {
              this.reqId = response.data.reqId;
              let report = {
                url: "report/ai/phoneRefreshSms",
                phone_type: this.phoneType,
                reqId: this.reqId
              };
              this.AuthCode(this.form.phone, key, report);
              if (
                response.data.data.loginForms[0].fields
                  .length == 4
              ) {
                let params = {
                  phone_type: this.phoneType,
                  reqId: this.reqId
                };
                this.$post(
                  "report/ai/phoneRefreshPic",
                  params,
                  "",
                  this
                ).then(response => {
                  this.picShow = true;
                  if (response.code == "10000") {
                    this.form.picImg =
                      response.data.data.extra.remark;
                  }
                });
              } else {
                this.picShow = false;
              }
            } else {
              this.codeGetting = false;
              this.sendAuthCode = true;
            }
          });
        } else {
          this.AuthCode(this.form.phone, key);
        }
      }
    },

    // 移动二次验证短信验证失败重新走流程的提示弹框
    closeAgainMsg () {
      this.noPicCode = false
      this.getSecondPic()
      this.form.secondCode = ""
      this.againMsg = false
    },

    // 历史查询页
    handleHistoryReport () {
      this.$router.push({
        path: `/history/index?type=${this.type}`
      });
    },

    // 数据分析协议展开
    handleDataAnalyse () {
      window.clearInterval(this.timer);
      this.secTime = window.readTime;
      this.analyseShow = true;
      this.timer = setInterval(() => {
        if (this.secTime == 0) {
          window.clearInterval(this.timer);
        } else {
          this.secTime--;
        }
      }, 1000);
    },

    // 数据协议弹框确认按钮
    handleConfirmAnalyse () {
      this.check = true;
      this.analyseShow = false;
    }
  }
};
</script>
 
<style scoped lang='less'>
@import "../../assets/css/app/riskReport/index.less";
</style>
