<template>
  <section class="main">
    <van-row class="vt-operator">
      <van-row class="title">基本信息</van-row>
      <van-row class="list">
        <van-col span="12" class="item">
          <p class="name">运营商标识</p>
          <p class="info">177****1122</p>
        </van-col>
        <van-col span="12" class="item">
          <p class="name">归属地</p>
          <p class="info">湖南-长沙</p>
        </van-col>
        <van-col span="12" class="item">
          <p class="name">入网时间</p>
          <p class="info">2011-10-10</p>
        </van-col>
        <van-col span="12" class="item">
          <p class="name">用户星级</p>
          <p class="info">二级</p>
        </van-col>
        <van-col span="12" class="item">
          <p class="name">套餐名称</p>
          <p class="info">流量多多套餐</p>
        </van-col>
        <van-col span="12" class="item">
          <p class="name">实名状态</p>
          <p class="info">已实名</p>
        </van-col>
        <van-col span="12" class="item">
          <p class="name">机主地址</p>
          <p class="info">上海浦东新区</p>
        </van-col>
      </van-row>
      <template v-if="type==4">
        <van-row class="title">账单信息</van-row>
        <van-row class="list">
          <van-col span="12" class="item">
            <p class="name">账单月</p>
            <p class="info">2011-11</p>
          </van-col>
          <van-col span="12" class="item">
            <p class="name">账单起始日期</p>
            <p class="info">2011-10-20</p>
          </van-col>
          <van-col span="12" class="item">
            <p class="name">账单结束日期</p>
            <p class="info">2011-11-30</p>
          </van-col>
          <van-col span="12" class="item">
            <p class="name">语音费</p>
            <p class="info">0.00</p>
          </van-col>
          <van-col span="12" class="item">
            <p class="name">本机号码套餐及固定费</p>
            <p class="info">0.00</p>
          </van-col>
          <van-col span="12" class="item">
            <p class="name">网络流量费</p>
            <p class="info">0.00</p>
          </van-col>
          <van-col span="12" class="item">
            <p class="name">增值业务费</p>
            <p class="info">0.00</p>
          </van-col>
          <van-col span="12" class="item">
            <p class="name">本月总费用</p>
            <p class="info">0.00</p>
          </van-col>
          <van-col span="12" class="item">
            <p class="name">彩信费</p>
            <p class="info">0.00</p>
          </van-col>

          <van-col span="12" class="item">
            <p class="name">其他费用</p>
            <p class="info">0.00</p>
          </van-col>
        </van-row>
      </template>
    </van-row>
  </section>
</template> 
<script>
export default {
  data () {
    return {
      type: 3,
    }
  },
  mounted () {
    this.type = this.$route.query.type
  },
  methods: {

  }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
