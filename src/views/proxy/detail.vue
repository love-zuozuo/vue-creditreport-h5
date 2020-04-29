<template>
  <section class="proxy" v-if="baseInfo">
    <van-row class="py-user">
      <van-col span="14" class="name">{{baseInfo.name}}</van-col>
      <van-col span="10" class="rank">
        <img
          :src="baseInfo.level==10?require('../../assets/images/icon/proxy-a.png'):require('../../assets/images/icon/proxy-b.png')"
        />
        {{baseInfo.level==10?'钻石代理商':'铂金代理商'}}
      </van-col>
    </van-row>
    <van-row class="py-panel">
      <van-row class="level">
        <van-row class="title">
          我的收益
          <img @click="agreeShow=true" src="../../assets/images/icon/help.png" />
        </van-row>
        <van-row class="content">
          <van-col class="money" span="18">{{baseInfo.cash_able}}</van-col>
          <van-col class="operate" span="6">
            <van-button v-if="baseInfo.status==7" class="n">提现中...</van-button>
            <div v-else>
              <van-button v-if="canCash()" class="n">去提现</van-button>
              <van-button v-else class="y" @click="handleCash">去提现</van-button>
            </div>
          </van-col>
        </van-row>
        <van-row class="py-other">
          <van-col span="8" class="item">
            <div @click="goCash">
              <p class="num">{{baseInfo.cash_amount}}</p>
              <P class="name">已提现金额</P>
            </div>
          </van-col>
          <van-col span="8" class="item">
            <div @click="goInvite">
              <p class="num">{{baseInfo.invited_num}}</p>
              <P class="name">已邀请人数</P>
            </div>
          </van-col>
          <van-col span="8" class="item">
            <p class="num">{{baseInfo.invited_number}}</p>
            <P class="name">我的邀请码</P>
          </van-col>
        </van-row>
      </van-row>
    </van-row>
    <van-row class="py-tab">
      <van-tabs
        color="#3C60E4"
        :animated="true"
        title-active-color="#2C2E44"
        :line-width="26"
        @click="handleTabClick"
        v-model="active"
      >
        <van-tab
          :title="item.title"
          class="tab-content"
          nav-right
          v-for="(item,key) in tabs"
          :key="key"
          :name="key"
        >
          <van-row class="tab-warp">
            <van-row class="title">
              <van-col span="12">订单详情</van-col>
              <van-col span="12" class="income">
                <img src="../../assets/images/icon/income.png" />收益
              </van-col>
            </van-row>
            <LoadMore :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore" :noData="noData">
              <van-row class="list">
                <van-row class="item" v-for="(item,index) in list" :key="index">
                  <van-col class="info" span="18">
                    <p class="name" v-if="active==0">订单姓名：{{item.name}}</p>
                    <p class="name" v-else>
                      <template v-if="item.type==70">{{item.name}} 新人分单奖</template>
                      <template v-if="item.type==80">平台贡献奖</template>
                      <template v-if="item.type==90">新人激励奖</template>
                      <template v-if="item.type==100">平台激励奖</template>
                    </p>
                    <p>{{item.created_at}}</p>
                  </van-col>
                  <van-col class="price" span="6">+{{item.reward}}</van-col>
                </van-row>
              </van-row>
            </LoadMore>
          </van-row>
        </van-tab>
      </van-tabs>
    </van-row>
    <!-- 协议内容 -->
    <Dialog title="收益说明" :agreeShow="agreeShow">
      <van-row slot="main">
        <van-row class="py-help">
          <van-row class="info" v-for="(item,index) in help" :key="index">
            <p class="title">{{item.title}}</p>
            <p>{{item.info}}</p>
          </van-row>
          <van-row class="button">
            <van-button @click="agreeShow=false" type="default">知道了</van-button>
          </van-row>
        </van-row>
      </van-row>
    </Dialog>
  </section>
</template>
<script>
import LoadMore from "@/components/loadMore.vue";
import Dialog from "@/components/dialog.vue";
export default {
  components: {
    LoadMore,
    Dialog
  },
  data () {
    return {
      baseInfo: null,
      active: 0, //tab切换状态初始值
      page: 1, //分页初始值
      size: 5, //每页条数
      enableLoadMore: true, // 加载更多按钮是否展示
      noData: false,
      agreeShow: false, //收益弹框状态
      tabs: [
        //tab切换title值
        {
          title: "提成详情"
        },
        {
          title: "平台奖励金"
        }
      ],
      list: [], //列表数据
      help: [
        //收益说明
        {
          title: "收益分为两类：",
          info:
            "一类是邀请的订单提成，另一种是平台奖励金，包括邀请新人的奖励。"
        },
        {
          title: "关于提现：",
          info:
            "当收益金额≥20元可申请提现，申请受理后会通过微信转账的方式完成提现"
        }
      ]
    };
  },
  mounted () {
    this.getLoad();
    this.getList();
  },
  methods: {
    //得到初始化数据
    getLoad () {
      this.$get("channel/agent/agentBasic", {}, "", this, false).then(
        response => {
          this.baseInfo = response.data;
        }
      );
    },
    //列表数据加载 分页单独使用
    getList () {
      let params = {
        page: this.page,
        size: this.size
      };
      let type = this.active == 0 ? "orderList" : "rewardList";
      this.$get(`channel/agent/${type}`, params, "", this).then(
        res => {
          if (res.data.total == 0) {
            this.noData = true
          } else {
            this.list = [...this.list, ...res.data.list];
            if (this.page == res.data.last_page) {
              this.enableLoadMore = false;
            }
          }
        }
      )
    },
    //tab切换
    handleTabClick (key) {
      this.active = key;
      this.getInit();
    },

    // 是否能提现
    canCash () {
      let amount = this.baseInfo.cash_able.replace(/,/g, ""),
        limit = this.baseInfo.cash_limit.replace(/,/g, "")
      if (Number(amount) < Number(limit)) {
        return true
      } else {
        return false
      }
    },
    //提现操作
    handleCash () {
      this.Dialog(
        "提示",
        "是否确认全部提现（提现审核过程中产生的收益会累加，审核通过后会更新当前收益金额）",
        () => {
          this.$post("channel/agent/cashApply", {}, "", this).then(
            response => {
              this.active = 0;
              this.getInit();
              this.getLoad();
            }
          );
        }
      );
    },
    //上拉加载更多
    onLoadMore (done) {
      this.page++;
      if (this.enableLoadMore) {
        this.getList();
        done();
      }
    },
    //跳转提现记录
    goCash () {
      this.$router.push("/proxy/withdraw");
    },
    //跳转邀请记录
    goInvite () {
      this.$router.push("/proxy/invite");
    },
    //初始化状态
    getInit () {
      this.page = 1;
			this.enableLoadMore = true;
			this.noData = false
      this.list = [];
      this.getList();
    }
  }
};
</script>
<style lang='less'>
@import "../../assets/css/app/proxy/detail.less";
</style>
