<template>
  <section class="main">
    <van-row class="vt-owner" v-if="userInfo">
      <van-row class="title">
        <img
          class="sex-img"
          src="../../../assets/images/report/female-img.png"
          v-if="userInfo.userInfo.sex=='女'"
        />
        <img class="sex-img" src="../../../assets/images/report/male-img.png" v-else />
        <label class="name">{{userInfo.userInfo.name}}</label>
        <img
          class="sex-icon"
          src="../../../assets/images/report/female-icon.png"
          v-if="userInfo.userInfo.sex=='女'"
        />
        <img class="sex-icon" src="../../../assets/images/report/male-icon.png" v-else />
        <label class="other">{{userInfo.userInfo.sex}}</label>
        <label class="other">{{userInfo.userInfo.age}}岁</label>
      </van-row>
      <van-list class="list">
        <van-col span="14" class="item">
          <p class="name">报告编号</p>
          <p class="content">{{userInfo.reportNo}}</p>
        </van-col>
        <van-col span="10" class="item">
          <p class="name">手机号</p>
          <p class="content">{{userInfo.userInfo.mobile}}</p>
        </van-col>
        <van-col span="14" class="item">
          <p class="name">身份证</p>
          <p class="content">{{userInfo.userInfo.idcard}}</p>
        </van-col>
        <van-col span="10" class="item">
          <p class="name">身份证归属地</p>
          <p class="content">{{userInfo.userInfo.cardCity}}</p>
        </van-col>
      </van-list>
    </van-row>
  </section>
</template> 
<script>
export default {
  data () {
    return {
      userInfo: null
    };
  },
  props: ['dataInfo'],
  watch: {
    "dataInfo": {
      handler: function (news, old) {
        if (news) {
          this.userInfo = news;
        }
      },
      deep: true
    }
  },
  mounted () {

  },
  methods: {

  }
};
</script>
 
<style scoped lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
