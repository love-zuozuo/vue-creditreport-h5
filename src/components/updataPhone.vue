<template>
  <section>
    <div class="title">更换绑定手机号</div>
		<div class="tips" v-if="tips">{{tips}}</div>
    <div class="tips" v-if="status">获取当前账号验证码，以保证个人信息安全</div>
    <van-row class="form">
      <van-row class="item cell">
        <van-col span="7" class="name" v-if="!status">当前手机号</van-col>
        <van-col span="7" class="name" v-else>新手机号</van-col>
        <van-col span="17">
          <input type="number" v-if="!status" v-model="form.oldPhone" readonly placeholder="输入手机号码" />
          <input
            v-show="status"
            type="number"
            v-model="form.phone"
            maxlength="11"
            placeholder="输入手机号码"
            @blur="onBlur"
          />
        </van-col>
      </van-row>
      <van-row class="item cell" v-if="status">
        <van-col span="7" class="name">验证码</van-col>
        <van-col span="12">
          <input type="number" v-model="form.code" maxlength="6" placeholder="短信验证码" @blur="onBlur" />
        </van-col>
        <van-col span="5">
          <van-button
            :class="['btns',!sendAuthCode?'on':'']"
            @click="handlePhoneCode"
          >{{sendAuthCode?'马上获取':authTime+'s后重发'}}</van-button>
        </van-col>
      </van-row>
    </van-row>
    <van-row class="login">
      <template v-if="!status">
        <div class="btns on" @click="handleStep">下一步</div>
      </template>
      <template v-else>
        <div :class="['btns',login?'on':'']" @click="handleSubmit">确定绑定</div>
      </template>
    </van-row>
  </section>
</template>
<script>
import { Rule } from "@/assets/js/rule";
import { storage } from "@/assets/js/util";
export default {
  data () {
    return {
      sendAuthCode: true,
      authTime: 60,
      status: false,
      form: {
        oldPhone: storage.getStorage("user").user.phone,
        phone: "",
        code: ""
      }
    };
  },
  props: ["popupShow", 'tips'],
  mounted () { },
  watch: {
    "form.phone": {
      handler: function (news, old) {
        if (news == this.form.oldPhone) {
          this.Toast('更改的手机号与旧手机号重复！')
        }
      },
      deep: true
    }
  },
  computed: {
    login () {
      return (this.form.phone.length > 0) & (this.form.code.length > 0);
    }
  },
  methods: {
    //获取验证手机号验证码
    handlePhoneCode () {
      if (this.sendAuthCode) {
        this.AuthCode(this.form.phone, "bind");
      }
    },
    //解決ios12表單輸入
    onBlur () {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      }
    },

    //下一步
    handleStep () {
      this.status = true;
    },
    //登录
    handleSubmit () {
      if (this.login) {
        if (!Rule.checkDataPhone(this.form.phone)) {
          return false;
        }
        if (!Rule.checkDataCode(this.form.code, 6)) {
          return false;
        }
        this.$emit("handlePhoneSubmit", this.form);
      }
    }
  }
};
</script>



