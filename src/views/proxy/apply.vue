<template>
  <section class="proxy-apply">
    <div class="apply-form">
      <van-row class="item">
        <van-col :span="5" class="label">手机号</van-col>
        <van-col :span="18" class="con">
          <input v-model="form.phone" readonly />
        </van-col>
      </van-row>
      <van-row class="item">
        <van-col :span="5" class="label">姓名</van-col>
        <van-col :span="18" class="con">
          <input placeholder="请输入姓名" v-model="form.name" maxlength="15" @blur="scrollTo" />
        </van-col>
      </van-row>
      <van-row class="item">
        <van-col :span="5" class="label">验证码</van-col>
        <van-col :span="11" class="con">
          <input placeholder="请输入验证码" v-model="form.verifyCode" maxlength="6" @blur="scrollTo" />
        </van-col>
        <van-col :span="8" class="btn">
          <p class="gray" v-if="sendCode">{{codeTime}}s重新获取</p>
          <p v-else @click="getCode">获取验证码</p>
        </van-col>
      </van-row>
      <van-row class="item">
        <van-col :span="5" class="label">微信号</van-col>
        <van-col :span="12" class="con">
          <input placeholder="请输入微信号" v-model="form.wechat_number" maxlength="25" @blur="scrollTo" />
        </van-col>
        <van-col :span="6" class="btn">
          <span @click="copyPhone">同手机号</span>
        </van-col>
      </van-row>
      <van-row class="item">
        <van-col :span="5" class="label">邀请码</van-col>
        <van-col :span="18" class="con">
          <input
            placeholder="请输入邀请码(选填)"
            v-model="form.invented_code"
            maxlength="6"
            @blur="scrollTo"
          />
        </van-col>
      </van-row>
    </div>
    <p class="info">提示：微信号用于提现转账</p>
    <div class="btn-box">
      <button class="submit-btn" @click="handleSubmit">立即申请</button>
    </div>
  </section>
</template>
<script>
import { Rule } from "@/assets/js/rule";
import { storage } from "@/assets/js/util";
export default {
  data () {
    return {
      codeTime: 60,
      codeTimer: Function, // 验证码获取倒计时器
      sendCode: false,
      form: {
        name: '',
        invented_code: '',
        phone: '',
        wechat_number: '',
        verifyCode: ''
      }
    }
  },
  mounted () {
    this.form.phone = storage.getStorage("user").user.phone
  },
  destroyed () {
    window.clearInterval(this.codeTimer);
  },
  methods: {
    // 同手机号按钮触发
    copyPhone () {
      this.form.wechat_number = this.form.phone
    },

    // 申请提交
    handleSubmit () {
      if (!Rule.checkDataNull(this.form.name, "姓名不能为空!")) {
        return false
      }
      if (!Rule.checkDataCode(this.form.verifyCode, 6)) {
        return false
      }
      if (!Rule.checkDataNull(this.form.wechat_number, "微信号不能为空!")) {
        return false
      }
      this.$post('channel/agent/apply', this.form, '', this).then(res => {
        this.$router.push('/proxy/reviewing')
      })
    },

    // 获取验证码
    getCode () {
      window.clearInterval(this.codeTimer);
      let params = {
        phone: this.form.phone,
        type: 'agent'
      }
      this.$post('common/getVerifyCode', params, '', this).then(res => {
        this.sendCode = true;
        this.codeTime = 60;
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

      });
    }
  }
}
</script>
<style scoped lang="less">
@import "../../assets/css/app/proxy/apply.less";
</style>