<template>
  <div class="inquire">
    <div class="inquire-title">{{type==1?'淘宝数据授权':'京东数据授权'}}</div>
    <div class="inquire-box">
      <div class="change-img">
        <img v-if="isAccount" class="code-img" src="../../assets/images/icon/arcodeicon.png" />
        <img v-else class="user-img" src="../../assets/images/icon/userpwd.png" />
      </div>
      <div class="right-icon-out"></div>
      <div class="right-icon" @click="handleChange()"></div>
      <div class="box-title">{{isAccount?'账号密码登录':'扫码登录'}}</div>
      <div class="login-form" v-if="isAccount">
        <input placeholder="请输入本人的手机号/会员名" @blur="resetDiv()" v-model="name" />
        <input placeholder="请输入密码" @blur="resetDiv()" v-model="password" type="password" />
        <van-row class="vt-agree">
          <img
            class="check"
            @click="check=!check"
            src="../../assets/images/icon/tbchecked.png"
            v-if="check"
          />
          <img
            class="check"
            @click="check=!check"
            src="../../assets/images/icon/tbcheck.png"
            v-else
          />我阅读并同意
          <span @click="analyseShow=true">《小启查用户服务协议及个人信息查询和使用授权》</span>协议
        </van-row>
        <button @click="handleLogin">登 录</button>
      </div>
      <div class="login-code" v-else>
        <div class="code-box">
          <img :src="'data:image/png;base64,'+codeUrl" height="160" />
          <div class="cover" v-if="showCover" @click="queryCode()">
            <img src="../../assets/images/icon/refresh.png" />
            <p>请点击重新获取二维码</p>
          </div>
        </div>
        <div class="code-title">请使用手机{{type==1?'淘宝':'京东'}}扫码</div>
        <van-row class="vt-agree" style="margin: 10px 20px;">
          我阅读并同意
          <span @click="analyseShow=true">《小启查用户服务协议及个人信息查询和使用授权》</span>协议
        </van-row>
      </div>
    </div>
    <Dialog title="“小启查”用户服务协议及个人信息查询和使用授权" :agreeShow="analyseShow">
      <van-row slot="main">
        <van-row class="vt-dialog-agree">
          <Agree />
        </van-row>
        <van-row class="vt-dialog-button">
          <van-button @click="analyseShow=false" type="default">确定</van-button>
        </van-row>
      </van-row>
    </Dialog>
    <Dialog
      title="验证码"
      :agreeShow="agreeShow"
      :showBtn="true"
      @handleConfirm="checkMsg()"
      @handleCancel="agreeShow=false"
    >
      <van-row slot="main">
        <van-row class="vt-dialog-code">
          <p class="code-time" v-if="sendCode">验证码已发送至账号绑定手机号，{{codeTime}}s后重新发送</p>
          <p class="code-again" @click="getMsg()" v-else>
            <img src="../../assets/images/icon/reset.png" />重新发送验证码
          </p>
          <div class="code-input">
            <input
              @blur="scrollTo"
              type="number"
              class="vt-input"
              v-model="msgCode"
              maxlength="6"
              :autofocus="true"
            />
          </div>
        </van-row>
      </van-row>
    </Dialog>
  </div>
</template>
<script>
import { ShowDialog } from "@/assets/js/util";
import Dialog from "@/components/dialog.vue";
import Agree from "@/components/agree.vue";
import { Rule } from "@/assets/js/rule";
export default {
  data () {
    return {
      check: true, // 勾选协议
      type: 1, // 报告类型：1淘宝2京东
      isAccount: true, // 是否为账号密码登录
      codeUrl: "",  // 二维码base64图片
      reqId: "",  // reqId
      name: "",  // 账号登录用户名
      password: "", // 账号登录密码
      codeTimer: Function, // 验证码获取倒计时器
      loading: true, // 加载cover
      msgCode: "",  // 短信验证码
      analyseShow: false,  // 协议弹框是否展示
      agreeShow: false,  // 验证码弹框是否展示
      codeTime: 120, // 验证码倒计时时间设置
      sendCode: true, // 是否发送验证码
      showCover: true  // 二维码覆盖的重新加载按钮的cover
    };
  },
  components: {
    Dialog,
    Agree
  },
  mounted () {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    this.BackScrollTop();
    this._configShare();
  },
  beforeDestroy () {
    window.clearInterval(this.codeTimer);
  },
  methods: {
    //input失去焦点后界面上移不恢复的问题
    resetDiv () {
      setTimeout(() => {
        let scrollHeight =
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    // 切换登录方式
    handleChange () {
      this.isAccount = !this.isAccount;
      if (!this.isAccount) {
        this.queryCode();
      }
    },
    // 二维码获取
    queryCode () {
      let url = "report/business/tgetqrcode";
      if (this.type == 2) {
        url = "report/business/jgetqrcode";
      }
      this.$get(url, {}, "", this).then(res => {
        if (res.data.code == 200) {
          this.codeUrl = res.data.pic;
          this.reqId = res.data.reqId;
          this.showCover = false;
          this.checkCode();
        } else {
          this.showCover = true;
          this.Toast(res.msg);
        }
      });
    },
    // 验证二维码是否已扫描
    checkCode () {
      let url = "report/business/tverifyqrcode";
      if (this.type == 2) {
        url = "report/business/jverifyqrcode";
      }
      let params = {
        reqId: this.reqId
      }
      if (this.$route.query.id) {
        params.parent_id = this.$route.query.id
      }
      this.$get(url, params, "", this, false).then(res => {
        switch (res.data.code) {
          case 200: // 授权成功，结束循环，跳转到订单确认页面
            this.Toast("授权成功！");
            if (this.$route.query.id) {
              this.$router.push({
                path: "/report/loading",
                query: {
                  type: this.type,
                  id: this.$route.query.id
                }
              })
            } else {
              this.$router.push({
                path: "/order/index",
                query: {
                  type: this.type
                }
              })
            }
            break;
          case 301: // 二维码失效
            ShowDialog('提示', res.msg)
            this.showCover = true;
            break;
          case 302: //需要短信验证
            window.clearInterval(this.codeTimer);
            this.showCover = true;
            this.agreeShow = true;
            this.getMsg();
            break;
          case 201:
          case 300:
          case 303:
            if (!this.isAccount || this.showCover) {
              setTimeout(() => { this.checkCode() }, window.reportLogin)
            }
        }
      });
    },
    // 获取短信验证码
    getMsg () {
      window.clearInterval(this.codeTimer);
      let url = "report/business/tgetcode";
      if (this.type == 2) {
        url = "report/business/jgetcode";
      }
      let params = {
        reqId: this.reqId,
        type: this.isAccount ? "ac" : "qr"
      };
      this.$get(url, params, '', this).then(res => {
        if (res.data.code == 200) {
          this.sendCode = true;
          this.codeTime = 120;
          setTimeout(() => {
            this.Toast("验证码发送成功！");
          }, 1000);
          this.codeTimer = setInterval(() => {
            this.codeTime--;
            if (this.codeTime <= 0) {
              this.sendCode = false;
              window.clearInterval(this.codeTimer);
            }
          }, 1000);
        } else {
          this.sendCode = false;
          setTimeout(() => {
            this.Toast(res.msg);
          }, 1000);
        }
      });
    },
    // 验证短信验证码
    checkMsg () {
      if (!Rule.checkDataNull(this.msgCode, "验证码不能为空!")) {
        return false;
      }
      let url = "report/business/tverifycode";
      if (this.type == 2) {
        url = "report/business/jverifycode";
      }

      let params = {
        code: this.msgCode,
        reqId: this.reqId,
        type: this.isAccount ? "ac" : "qr",
        name: this.isAccount ? this.name : "",
        password: this.isAccount ? this.password : ""
      }
      if (this.$route.query.id) {
        params.parent_id = this.$route.query.id
      }
      this.$get(url, params, "", this).then(res => {
        if (res.data.code == 200) {
          this.Toast("授权成功！");
          this.agreeShow = false;
          if (this.$route.query.id) {
            this.$router.push({
              path: "/report/loading",
              query: {
                type: this.type,
                id: this.$route.query.id
              }
            })
          } else {
            this.$router.push({
              path: "/order/index",
              query: {
                type: this.type
              }
            });
          }
        } else {
          this.Toast(res.msg);
        }
      });
    },
    // 登录
    handleLogin () {
      if (!Rule.checkDataNull(this.name, "用户名不能为空!")) {
        return false;
      }
      if (!Rule.checkDataNull(this.password, "密码不能为空!")) {
        return false;
      }
      if (!this.check) {
        this.Toast("请阅读并同意相关协议！");
        return false;
      }
      let url = "report/business/tlogin";
      if (this.type == 2) {
        url = "report/business/jlogin";
      }
      let params = {
        name: this.name,
        password: this.password
      }
      if (this.$route.query.id) {
        params.parent_id = this.$route.query.id
      }
      this.$post(url, params, "", this).then(res => {
        this.reqId = res.data.reqId;
        switch (res.data.code) {
          case 200: // 授权成功，结束循环，跳转到订单确认页面
            this.Toast("授权成功！");
            if (this.$route.query.id) {
              this.$router.push({
                path: "/report/loading",
                query: {
                  type: this.type,
                  id: this.$route.query.id
                }
              })
            } else {
              this.$router.push({
                path: "/order/index",
                query: {
                  type: this.type
                }
              });
            }
            break;
          case 300: //需要短信验证
            this.agreeShow = true;
            this.getMsg();
            break;
        }
      });
    }
  }
};
</script>
<style scoped lang='less'>
@import "../../assets/css/app/report/index.less";
</style>

