<template>
  <section>
    <img src="../../assets/images/start.jpg" class="back-img" />
    <div @click="toIndex" class="pass">
      <p>跳过</p>
      <p>{{time}}s</p>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      time: 3,
      timer: Function
    }
  },
  beforeDestroy () {
    window.clearInterval(this.timer);
  },
  mounted () {
    if (window.startTime) {
      this.time = window.startTime
    }
    this.timer = setInterval(() => {
      this.time--;
      if (this.time < 0) {
        this.toIndex()
        window.clearInterval(this.timer);
      }
    }, 1000);
  },
  methods: {
    toIndex () {
      this.$router.push('/index')
    }
  }
}
</script>
<style scoped lang="less">
.back-img {
  width: 100vw;
}
.pass {
  background: #8e1215;
  width: 54px;
  height: 54px;
  border-radius: 100px;
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 15px;
  color: #fff;
  text-align: center;
	padding: 7px;
}
</style>