<template>
  <section class="main">
    <van-row class="vt-icheck" v-if="userCheck">
      <van-row class="tips">短期内个人信息关联申请信息越多，申贷被拒风险越高</van-row>
      <van-row class="list">
        <van-row class="item" v-for="(item,index) in menus" :key="index">
          <van-row class="title">
            <img src="../../../assets/images/icon/icon4.png" />
            <div class="content">{{item.title}}{{userCheck[item.key].risk_detail.count}}</div>
          </van-row>
          <van-row class="subList" v-if="userCheck[item.key].risk_detail.count!=0">
            <div
              class="list-li"
              v-for="(subItem,subIndex) in userCheck[item.key].risk_detail.data_list"
              :key="subIndex"
            >
              <i></i>
              {{subItem}}
            </div>
          </van-row>
        </van-row>
      </van-row>
      <!-- <van-row class="nullData" style="margin:50px 0">
                <img src="../../../assets/images/icon/safe.png" />
                <van-row>暂无个人信息核查数据！</van-row>
      </van-row>-->
    </van-row>
  </section>
</template> 
<script>
export default {
  data () {
    return {
      userCheck: null,
      menus: [
        {
          title: '3个月内身份证关联多个申请信息，个数：',
          key: 'id_loan_90'
        },
        {
          title: '3个月内申请信息关联多个身份证，个数：',
          key: 'phone_loan_90'
        },
        {
          title: '3个月内银行卡_姓名关联多个身份证，个数：',
          key: 'bank_name_id_90'
        }
      ]
    };
  },
  props: ["dataInfo"],
  watch: {
    dataInfo: {
      handler: function (news, old) {
        if (news) {
          this.userCheck = news.userCheck;
        }
      },
      deep: true
    }
  },
  mounted () {
    this.userCheck = this.dataInfo.userCheck;
  },
  methods: {

  }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
