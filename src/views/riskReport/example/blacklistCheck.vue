<template>
  <section class="main">
    <van-row class="vt-blackList">
      <van-row class="vt-tab">
        <div
          :class="['item', tabActive==index?'on':'']"
          v-for="(item,index) in tabs"
          :key="index"
          @click="handleTabClick(index)"
        >{{item.name}}</div>
      </van-row>
      <van-row class="content">
        <van-row class="item cell" v-for="(item,index) in list" :key="index">
          <van-col span="20">
            <p class="title">{{item.title}}</p>
            <p :class="['tips',item.status==1?'on':'']">你{{item.status==1?"":"未"}}命中本项</p>
            <p :class="['info',item.status==1?'on':'']">{{item.info}}</p>
          </van-col>
          <van-col span="4" :class="['status',item.status==1?'on':'']">{{item.status==1?'命中':'未命中'}}</van-col>
        </van-row>
      </van-row>
    </van-row>
  </section>
</template> 
<script>
import { storage } from "@/assets/js/util";
export default {
  data () {
    return {
      tabActive: 0,
      tabs: [
        {
          name: "身份证"
        },
        {
          name: "手机号"
        }
      ],
      list: [],
      cardList: [
        {
          title: '高风险集中地区',
          info: '个别高风险省份城市可能被列入本名单',
          status: 0
        },
        {
          title: '法院失信名单',
          info: '刑事、民事纠纷等情况可能被列入本名单',
          status: 0
        },
        {
          title: '犯罪通缉名单',
          info: '存在犯罪记录情况可能被列入本名单',
          status: 0
        },
        {
          title: '法院执行名单',
          info: '不良行为会影响个人信用',
          status: 0
        },
        {
          title: '助学贷款逾期历史',
          info: '存在助学贷款逾期的情况可能被列入本名单',
          status: 0
        },
        {
          title: '信贷逾期名单',
          info: '欺诈、逾期、展期等不良贷款行为可能被列入本名单',
          status: 0
        },
        {
          title: '信贷逾期还款名单',
          info: '存在逾期还款行为可能被列入本名单',
          status: 0
        },
        {
          title: '车辆租赁违约名单',
          info: '车辆租赁违约操作行为可能被列入本名单',
          status: 0
        },
        {
          title: '风险关注名单',
          info: '身份证或手机号涉嫌违法或冒用可能被列入本名单',
          status: 0
        },
        {
          title: '法院结案名单',
          info: '有法院裁决记录可能被列入本名单',
          status: 0
        }
      ],
      phoneList: [
        {
          title: '虚假号码库',
          info: '使用虚假号码可能被列入本名单',
          status: 0
        },
        {
          title: '风险关注名单',
          info: '身份证或手机号涉嫌违法或冒用可能被列入本名单',
          status: 0
        },
        {
          title: '车辆租赁违约名单',
          info: '存在犯罪记录情况可能被列入本名单',
          status: 0
        },
        {
          title: '欠款公司法人代表名单',
          info: '被标记为欠款公司法人可能被列入本名单',
          status: 0
        },
        {
          title: '信贷逾期名单',
          info: '欺诈、逾期、展期等不良贷款行为可能被列入本名单',
          status: 0
        },
        {
          title: '信贷逾期还款名单',
          info: '存在逾期还款行为可能被列入本名单',
          status: 0
        }
      ]
    };
  },
  mounted () {
    this.list = this.cardList;
  },
  methods: {
    //tab 切换
    handleTabClick (key) {
      this.tabActive = key;
      if (key == 0) {
        this.list = this.cardList;
      } else {
        this.list = this.phoneList;
      }
    }
  }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
