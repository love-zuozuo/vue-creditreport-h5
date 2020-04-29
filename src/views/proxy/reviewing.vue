<template>
  <section class="proxy-result">
    <img
      class="result-bg"
      src="../../assets/images/icon/proxy_accept.png"
      style="margin-top: 68px;"
    />
    <p class="info">申请已受理！</p>
    <p class="remark">【您可以添加微信客服号，领取代理资料】</p>
    <div class="qrcode">
      <p>
        客服微信号：
        <span>xqc_kf</span>
      </p>
      <img src="../../assets/images/reviewing.png" />
    </div>
    <button class="btn" @click="handleClick">去看看小启查产品</button>
  </section>
</template>
<script>
export default {
  methods: {
    handleClick () {
      this.$router.push('/index')
    }
  }
}
</script>
<style scoped lang="less">
@import "../../assets/css/app/proxy/result.less";
</style>