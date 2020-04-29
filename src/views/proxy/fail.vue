<template>
  <section class="proxy-result">
    <img class="result-bg" src="../../assets/images/icon/proxy_fail.png" />
    <p class="info">您的申请尚未通过！</p>
    <button class="btn" @click="handleClick">重新申请</button>
  </section>
</template>
<script>
export default {
  mounted () {
    this.changeStatus()
  },
  methods: {
    // 已读状态更改
    changeStatus () {
      this.$get("channel/agent/getStatus", {}, "", this).then(res => {
      })
    },
    handleClick () {
      this.$router.push('/proxy/index')
    }
  }
}
</script>
<style scoped lang="less">
@import "../../assets/css/app/proxy/result.less";
</style>