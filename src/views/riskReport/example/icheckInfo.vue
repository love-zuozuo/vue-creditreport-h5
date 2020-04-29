<template>
  <section class="main">
    <van-row class="vt-icheck">
      <van-row class="tips">短期内个人信息关联申请信息越多，申贷被拒风险越高</van-row>
      <van-row class="list">
        <van-row class="item" v-for="(item,index) in list" :key="index">
          <van-row class="title">
            <van-col class="icon">
              <img src="../../../assets/images/icon/icon4.png" />
            </van-col>
            <van-col class="content">{{item.info}}(数量：{{item.num}})</van-col>
          </van-row>
          <!-- <van-row class="subList">
            <div class="list-li" v-for="(subItem,subIndex) in item.list" :key="subIndex">
              <i></i>
              {{subItem}}
            </div>
          </van-row>-->
        </van-row>
      </van-row>
    </van-row>
  </section>
</template> 
<script>
export default {
  data () {
    return {
      list: [
        {
          info: '3个月内身份证关联多个申请信息',
          num: 2,
          list: ['189****1932', '189****1932']
        },
        {
          info: '3个月内申请信息关联多个身份证',
          num: 0,
          list: ['5115**********1932', '6101**********1931']
        },
        {
          info: '3个月内银行卡_姓名关联多个身份证',
          num: 3,
          list: ['5115**********1921']
        }
      ]
    };
  },
  mounted () {

  },
  methods: {

  }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
