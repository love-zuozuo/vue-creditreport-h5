<template>
  <section class="main">
    <van-row class="vt-icheck">
      <van-row class="tips">短期内个人信息关联申请信息越多，申贷被拒风险越高</van-row>
    </van-row>
    <ul class="borrow-ul">
      <li v-for="(item,index) in menus" :key="index">
        <p class="title">{{item.title}}</p>
        <p class="data">
          {{item.unit}}
          <span>{{item.value}}</span>
        </p>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data () {
    return {
      borrowInfo: null,
      menus: [
        {
          title: '1天内身份证使用过多设备进行申请',
          unit: '设备数：',
          value: '3'
        },
        {
          title: '7天内身份证使用过多设备进行申请',
          unit: '设备数：',
          value: '14'
        },
        {
          title: '一个月内身份证使用过多设备进行申请',
          unit: '设备数：',
          value: '3'
        },
        {
          title: '7天内设备或身份证或手机号申请次数过多',
          unit: '次数：',
          value: '14'
        },
        {
          title: '一个月内设备或身份证或手机号申请次数过多',
          unit: '次数：',
          value: '4'
        },
        {
          title: '7天内申请人在多个平台申请借款',
          unit: '平台数：',
          value: '14'
        }
      ]
    }
  },
  props: ["dataInfo"],
  watch: {
    dataInfo: {
      handler: function (news, old) {
        if (news) {
          this.borrowInfo = news.userCheck;
        }
      },
      deep: true
    }
  },
  mounted () {
    this.borrowInfo = this.dataInfo.userCheck;
  },
}
</script>
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
