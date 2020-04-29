<template>
  <section class="main unselect">
    <van-row class="report-top">
      <van-row class="content">
        <van-row class="user">
          <van-col class="icon">
            <img src="../../assets/images/icon/male.png" />
          </van-col>
          <van-col class="name">{{dataInfo.name}}</van-col>
          <van-col class="other">
            <span>{{dataInfo.gender}}</span>
            <span>{{dataInfo.age}}岁</span>
          </van-col>
        </van-row>
        <van-row class="info-content">
          <van-col span="12">
            <label>报告编号</label>
            <div>{{dataInfo.reportNo}}</div>
          </van-col>
          <van-col span="12">
            <label>手机号</label>
            <div>{{dataInfo.mobile}}</div>
          </van-col>
        </van-row>
        <van-row class="info-content">
          <van-col span="12">
            <label>身份证</label>
            <div>{{dataInfo.idCard}}</div>
          </van-col>
          <van-col span="12">
            <label>身份证归属地</label>
            <div>{{dataInfo.address}}</div>
          </van-col>
        </van-row>
      </van-row>
    </van-row>
    <van-row class="vt-blackList report-list">
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
    <Home />
    <Statement />
  </section>
</template> 
<script>
import Home from "@/components/home.vue";
import Statement from "@/components/statement.vue";

export default {
  components: {
    Home,
    Statement
  },
  data () {
    return {
      dataInfo: {
        name: "苏大强",
        gender: "男",
        age: 20,
        reportNo: "172329483942039202",
        mobile: "177****3311",
        idCard: "511***********4877",
        address: "四川"
      },
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
          info: '个别高风险省份城市可能被列入本名单',
          status: 0
        },
        {
          title: '风险关注名单',
          info: '身份证或手机号涉嫌违法或冒用可能被列入本名单',
          status: 0
        },
        {
          title: '车辆租赁违约名单',
          info: '车辆租赁违约操作行为可能被列入本名单',
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
    this.getData();
    this._configShare();
  },
  methods: {
    //初始化得到数据
    getData () {
      this.list = this.cardList;
    },
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
<style scoped lang='less'>
@import "../../assets/css/app/report/index.less";
@import "../../assets/css/app/detail/index.less";
.main {
  background: #fff;
}
</style>
