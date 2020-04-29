<template>
  <section>
    <div class="title">注册/登录</div>
    <div class="tips">{{tips?tips:'如果手机号未注册，验证后将自动注册'}}</div>
    <van-row class="form">
      <van-row class="item cell">
        <van-col span="5" class="name">手机号</van-col>
        <van-col span="19">
          <input
            type="number"
            v-model="form.phone"
            maxlength="11"
            placeholder="输入手机号码"
            @blur="onBlur"
          />
        </van-col>
      </van-row>
      <van-row class="item cell">
        <van-col span="5" class="name">验证码</van-col>
        <van-col span="14">
          <input type="number" maxlength="6" v-model="form.code" placeholder="短信验证码" @blur="onBlur" />
        </van-col>
        <van-col span="5">
          <van-button
            :class="['btns',!sendAuthCode?'on':'']"
            @click="handleLoginCode('login')"
          >{{sendAuthCode?'马上获取':authTime+'s后重发'}}</van-button>
        </van-col>
      </van-row>
    </van-row>
    <van-row class="agree" v-if="isLogin==1">
      <div :class="['check',check?'checked':'']" @click="check=!check"></div>
      <div class="content">
        同意
        <span @click="handleAgree()">《小启查用户服务协议及个人信息查询和使用授权》</span>协议
      </div>
    </van-row>
    <van-row class="login">
      <div :class="['btns',login?'on':'']" @click="handleLogin">登录</div>
    </van-row>
  </section>
</template>
<script>
import { Rule } from "@/assets/js/rule";
export default {
  data () {
    return {
      sendAuthCode: true,
      authTime: 60,
      check: false,
      agree: false,
      form: {
        phone: "",
        code: ""
      }
    };
  },
  props: ["popupShow", "isLogin", 'tips'],
  watch: {
    popupShow (old, news) {
      if (news) {
        this.handleClear();
      }
    }
  },
  computed: {
    login () {
      return (
        (this.form.phone.length > 0) &
        (this.form.code.length > 0) &
        this.check
      );
    }
  },
  mounted () { },
  methods: {
    //情况表单状态
    handleClear () {
      this.form.phone = "";
      this.form.code = "";
      this.form.check = false;
    },
    //获取登录验证码
    handleLoginCode (key) {
      if (this.sendAuthCode) {
        this.AuthCode(this.form.phone, key);
      }
    },
    //注册协议
    handleAgree () {
      this.$emit("handleAgree");
    },
    //解決ios12表單輸入
    onBlur () {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        setTimeout(() => {
          const scrollHeight =
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      }
    },
    //登录
    handleLogin () {
      if (this.login) {
        if (!Rule.checkDataPhone(this.form.phone)) {
          return false;
        }
        if (!Rule.checkDataCode(this.form.code, 6)) {
          return false;
        }
        this.$emit("handleLogin", this.form);
      }
    }
  }
};
</script>
