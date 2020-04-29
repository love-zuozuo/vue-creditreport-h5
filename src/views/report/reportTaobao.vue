<template>
  <section class="main unselect">
    <!-- 用户基本信息 -->
    <img class="back-img" src="../../assets/images/report/bg.png" alt />
    <p class="header-title">我的淘宝报告详情</p>
    <section class="report" v-if="dataInfo">
      <!-- 个人信息 -->
      <section class="card userInfo">
        <van-row type="flex" class="userInfo-title">
          <img class="avatar" src="../../assets/images/report/usericon.png" alt />
          <div class="name">{{dataInfo.basic.name}}</div>
          <!-- <div class="gender">{{dataInfo.gender}}</div>
          <div class="age">{{dataInfo.age}}岁</div>-->
        </van-row>
        <van-row type="flex" class="info-content">
          <van-col span="12">
            <label>报告编号</label>
            <div>{{dataInfo.basic.reportNo}}</div>
          </van-col>
          <van-col span="12">
            <label>手机号</label>
            <div>{{dataInfo.basic.mobile}}</div>
          </van-col>
        </van-row>
        <van-row type="flex" class="info">
          <van-col span="12">
            <label>身份证</label>
            <div>{{dataInfo.basic.idcard}}</div>
          </van-col>
        </van-row>
      </section>
      <div class="title">淘宝信息</div>
      <!-- 基础信息 -->
      <section class="card baseInfo">
        <div class="info-title">
          <div class="title-name">
            <div class="left-line"></div>基础信息
          </div>
        </div>
        <van-row type="flex" class="info-content">
          <van-col span="24">
            <div>
              <label class="fr5">用户名：</label>
              {{dataInfo.taobao.username}}
              <img
                v-if="dataInfo.taobao.isTrueName==1"
                src="../../assets/images/report/realname.png"
                alt
                class="realname-img"
              />
              <img v-else src="../../assets/images/report/unrealname.png" alt class="realname-img" />
            </div>
          </van-col>
        </van-row>
        <van-row type="flex" class="info-content">
          <van-col span="24">
            <div>
              <label class="fr5">邮箱：</label>
              {{dataInfo.taobao.email}}
            </div>
          </van-col>
        </van-row>
        <van-row type="flex" class="info-content">
          <van-col span="12">
            <label>手机号</label>
            <div>{{dataInfo.taobao.mobile}}</div>
          </van-col>
          <van-col span="12">
            <label>淘气值</label>
            <div>{{dataInfo.taobao.taoScore}}</div>
          </van-col>
        </van-row>
        <van-row type="flex" class="info-content">
          <van-col span="12">
            <label>支付宝账号</label>
            <div>{{dataInfo.taobao.alipayAccount}}</div>
          </van-col>
          <van-col span="12">
            <label>是否实名认证</label>
            <div>{{dataInfo.taobao.trueName}}</div>
          </van-col>
        </van-row>
        <van-row type="flex" class="info-content">
          <van-col span="12">
            <label>花呗授信额度</label>
            <div>{{dataInfo.taobao.hbTotal}}</div>
          </van-col>
          <van-col span="12">
            <label>花呗使用额度</label>
            <div>{{dataInfo.taobao.hbUsed}}</div>
          </van-col>
        </van-row>
        <van-row type="flex" class="info-content">
          <van-col span="12">
            <label>近半年消费次数</label>
            <div>{{dataInfo.taobao.buyTimesSix}}</div>
          </van-col>
          <van-col span="12">
            <label>近半年消费总额</label>
            <div>{{dataInfo.taobao.buyAmountSix}}</div>
          </van-col>
        </van-row>
        <van-row type="flex" class="info-content">
          <van-col span="12">
            <label>常用收货城市</label>
            <div>{{dataInfo.taobao.useCitySixMouth}}</div>
          </van-col>
          <van-col span="12">
            <label>第一笔交易时间</label>
            <div>{{dataInfo.taobao.first}}</div>
          </van-col>
        </van-row>
      </section>
      <!-- 常用收货地址 -->
      <section class="card addressInfo">
        <div class="info-title">
          <div class="title-name">
            <div class="left-line"></div>收货地址
          </div>
        </div>
        <ul class="address-ul" v-if="dataInfo.address.length>0">
          <li v-for="(item,index) in dataInfo.address" :key="index">
            <div class="info">
              <label>{{item.name}}</label>
              <label>{{item.phone}}</label>
            </div>
            <p class="address">{{item.address}}</p>
          </li>
        </ul>
				<div v-else>无</div>
      </section>
      <!-- 消费信息 -->
      <section class="card consumeInfo">
        <div class="info-title">
          <div class="title-name">
            <div class="left-line"></div>消费信息
          </div>
          <van-cell-group class="datePicker" @click="popupShow=true">
            <van-field :right-icon="calendarImg" v-model="fieldDate" readonly />
          </van-cell-group>
        </div>
        <van-tabs
          class="info-tabs"
          color="#DFB06D"
          :animated="true"
          :line-height="2"
          title-inactive-color="#666"
          title-active-color="#333"
        >
          <van-tab title="总体消费" class="tab-content">
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5">“已完成”订单总额：</label>
                  {{dataInfo.order[fieldDate].all.amount}}
                </div>
              </van-col>
            </van-row>
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5">“已完成”订单数量：</label>
                  {{dataInfo.order[fieldDate].all.count}}
                </div>
              </van-col>
            </van-row>
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5">“已完成”消费品种数量：</label>
                  {{dataInfo.order[fieldDate].all.type}}
                </div>
              </van-col>
            </van-row>
          </van-tab>
          <van-tab title="本人收货消费" class="tab-content">
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5">“已完成”&本人收货订单总额：</label>
                  {{dataInfo.order[fieldDate].self.amount}}
                </div>
              </van-col>
            </van-row>
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5">“已完成”&本人收货订单数量：</label>
                  {{dataInfo.order[fieldDate].self.count}}
                </div>
              </van-col>
            </van-row>
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5">“已完成”&本人收货消费品种数量：</label>
                  {{dataInfo.order[fieldDate].self.type}}
                </div>
              </van-col>
            </van-row>
          </van-tab>
          <van-tab title="虚拟物品消费" class="tab-content">
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5">虚拟物品订单总额：</label>
                  {{dataInfo.order[fieldDate].virtual.amount}}
                </div>
              </van-col>
            </van-row>
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5 fl2">虚拟物品订单数量：</label>
                  {{dataInfo.order[fieldDate].virtual.orderCount}}
                </div>
              </van-col>
            </van-row>
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5 fl2">虚拟物品订单商品数量：</label>
                  {{dataInfo.order[fieldDate].virtual.goodsCount}}
                </div>
              </van-col>
            </van-row>
            <van-row type="flex" class="info-content">
              <van-col span="24">
                <div>
                  <label class="fr5 fl2">虚拟物品订单总额占比：</label>
                  {{dataInfo.order[fieldDate].virtual.proportion}}
                </div>
              </van-col>
            </van-row>
          </van-tab>
        </van-tabs>
      </section>
    </section>
    <Popup :popupShow="popupShow" popupHeight="320" :showClose="false">
      <van-picker
        slot="main"
        show-toolbar
        :columns="monthList"
        @cancel="onCancel"
        @confirm="confirmDate"
      />
    </Popup>
    <Home />
    <Statement />
  </section>
</template> 
<script>
import Popup from "@/components/popup.vue";
import Home from "@/components/home.vue";
import Statement from "@/components/statement.vue";
export default {
  components: {
    Popup,
    Home,
    Statement
  },
  data () {
    return {
      popupShow: false, //月份选择弹出框状态
      fieldDate: "", //当前月份
      calendarImg: require("../../assets/images/report/calendar.png"), //月份图标
      dataInfo: null, //数据源
      monthList: [], //月份列表
      loading: true //loading状态
    };
  },
  mounted () {
    this.getData();
    this._configShare();
  },
  methods: {
    //获取数据
    getData () {
      let params = {
        id: this.$route.query.id
      };
      this.$post("report/detail", params, "", this).then(response => {
        this.dataInfo = response.data;
        this.getMonth();
      });
    },
    //获取得到月份
    getMonth () {
      let temp = []
      for (let key in this.dataInfo.order) {
        temp.push(key)
      }
      this.monthList = temp.reverse();
      this.fieldDate = this.monthList[0];
    },
    //弹框日期选择后确认
    confirmDate (value) {
      this.popupShow = false;
      this.fieldDate = value;
    },
    //弹框日期选择后取消
    onCancel () {
      this.popupShow = false;
    }
  }
};
</script>
<style scoped lang='less'>
@import "../../assets/css/app/report/index.less";
</style>