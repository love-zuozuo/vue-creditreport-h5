<template>
  <div class="main history">
    <van-tabs
      color="#DFB06D"
      title-inactive-color="#999"
      :animated="true"
      title-active-color="#333"
      :sticky="true"
      @click="handleTabClick"
      :line-height="0"
      v-model="activeName"
    >
      <van-tab
        :title="item.title"
        class="tab-content"
        nav-right
        v-for="(item,key) in tabs"
        :key="key"
        :name="key"
      >
        <div slot="title" v-if="key==0">
          风险核查
          <img src="../../assets/images/icon/super.png" class="super-img" />
        </div>
        <LoadMore :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore" :noData="noData">
          <section
            class="history-li"
            v-for="(item, index) in list"
            :key="index"
            @click="goDetail(item)"
          >
            <van-row type="flex" class="li-top">
              <van-col span="24">
                <p>
                  <label>获取时间：{{item.created_at}}</label>
                </p>
                <p style="margin-top: 5px;">
                  <label>编号：{{item.no}}</label>
                </p>
              </van-col>
            </van-row>
            <van-row type="flex" class="li-content">
              <van-col span="7" class="name">{{item.name}}</van-col>
              <van-col span="17" class="content">
                <div class="con-li">
                  <label>报告状态</label>
                  {{reportState[item.status]}}
                </div>
                <div class="con-li">
                  <label>支付状态</label>
                  {{orderState[item.orderStatus]}}
                </div>
                <div class="con-li">
                  <label>支付价格</label>
                  {{item.amount.toFixed(2)}}
                </div>
                <div class="con-li">
                  <label>手机号码</label>
                  {{item.phone}}
                </div>
                <div class="con-li">
                  <label>身份证号</label>
                  {{item.idcard}}
                </div>
                <div class="to-pay" v-if="item.orderStatus==5">
                  <label>去支付</label>
                </div>
              </van-col>
            </van-row>
          </section>
        </LoadMore>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { storage } from "@/assets/js/util";
import LoadMore from "@/components/loadMore.vue";
export default {
  components: {
    LoadMore
  },
  data () {
    return {
      tabs: [
        {
          title: "风险核查",
          key: [4]
        },
        {
          title: "风险核查",
          key: [3]
        },
        {
          title: "电商",
          key: [1, 2]
        },
        {
          title: "黑名单核查",
          key: [6]
        },
        {
          title: "多头借贷核查",
          key: [5]
        }
      ], // tab项列表
      activeName: "", // 选中的tab页
      types: [4], // 获取报告列表数据需要的报告类型
      enableLoadMore: true, // 加载更多按钮是否展示
      noData: false,
      page: 1, // 当前页码
      size: 5, // 每页展示条数
      list: [], // 每个tab页下的列表数据
      loading: true,
      reload: true,
      reportState: {
        5: '生成中',
        10: '已生成',
        15: '失败'
      }, // 报告状态
      orderState: {
        1: '订单已关闭',
        5: '待支付',
        10: '已付款',
        12: '付款失败',
        14: '退款中',
        15: '已退款',
        17: '退款异常',
        20: '退款关闭'
      } // 订单状态
    };
  },
  watch: {},
  mounted () {
    this.getLocation();
    this._configShare();
  },
  methods: {
    //初始化加载
    getLoad (page) {
      let params = {
        page: this.page,
        size: this.size,
        types: this.types
      };
      this.$post("report/list", params, "", this).then(res => {
        if (res.data.total == 0) {
          this.noData = true
        } else {
          this.list = [
            ...this.list,
            ...res.data.detail
          ];
          if (this.page == res.data.last_page) {
            this.enableLoadMore = false;
          }
        }
      });
    },
    //获取到最新定位
    getLocation () {
      let type = this.$route.query.type;
      //type值对应：淘宝：1，京东：2，综合风险：3，综合风险-加强版：4，多头借贷:5，黑名单:6
      //types值对应：风险核查-加强：[4]，风险核查:[3]，电商[1, 2]，黑名单[6]，多头借贷[5]
      //activeName值对应：风险核查-加强：0，风险核查：1，电商：2，黑名单：3，多头借贷：4
      switch (type) {
        case "1":
          this.activeName = 2;
          this.types = [1, 2];
          this.getLoad();
          break;
        case "2":
          this.activeName = 2;
          this.types = [1, 2];
          this.getLoad();
          break;
        case "3":
          this.activeName = 1;
          this.types = [3];
          this.getLoad();
          break;
        case "4":
          this.activeName = 0;
          this.types = [4];
          this.getLoad();
          break;
        case "5":
          this.activeName = 4;
          this.types = [5];
          this.getLoad();
          break;
        case "6":
          this.activeName = 3;
          this.types = [6];
          this.getLoad();
          break;
        default:
          this.activeName = 0;
          this.types = [4];
          this.getLoad();
          break;
      }
    },
    //tab切换
    handleTabClick (key) {
      this.enableLoadMore = true;
      this.noData = false
      this.list = [];
      this.page = 1;
      this.types = this.tabs[key].key;
      this.activeName = key;
      this.getLoad();
    },

    toPayOrder (item) {
      this.$router.push({
        path: "/order/index",
        query: {
          type: item.type,
          id: item.id,
          isFirst: 2
        }
      })
    },

    //跳转报告详情
    goDetail (item) {
      if (item.orderStatus == 5) {
        this.toPayOrder(item)
        return
      }
      if (item.status == "5") {
        this.Toast("报告获取中，请等待！");
      } else if (item.status == "10") {
        switch (item.type) {
          case 1:
            this.$router.push({
              path: "/report/reportTaobao",
              query: {
                id: item.id
              }
            });
            break;
          case 2:
            this.$router.push({
              path: "/report/reportJingdong",
              query: {
                id: item.id
              }
            });
            break;
          case 3:
            this.$router.push({
              path: "/riskReport/detail",
              query: {
                id: item.id,
                type: item.type
              }
            });
            break;
          case 4:
            this.handleRiskDetail(item)
            break;
          case 5:
            this.$router.push({
              path: "/ultiloanReport/detail",
              query: {
                id: item.id
              }
            });
            break;
          case 6:
            this.$router.push({
              path: "/blacklistReport/detail",
              query: {
                id: item.id
              }
            });
            break;
        }
      } else {
        this.Toast("报告获取失败！");
      }
    },
    handleRiskDetail (item) {
      this.$post("report/detail", { id: item.id }, "", this).then(res => {
        let tb = res.data.taobao
        let jd = res.data.jingdong
        if (tb.data_status && tb.data_status == 5) {
          this.$router.push({
            path: "/report/loading",
            query: {
              id: item.id,
              type: 1
            }
          })
        } else if (jd.data_status && jd.data_status == 5) {
          this.$router.push({
            path: "/report/loading",
            query: {
              id: item.id,
              type: 2
            }
          })
        } else {
          this.$router.push({
            path: "/riskReport/detail",
            query: {
              id: item.id,
              type: item.type
            }
          })
        }
      })
    },
    //上拉加载更多
    onLoadMore (done) {
      this.page++;
      if (this.enableLoadMore) {
        this.getLoad();
        done();
      }
    }
  }
};
</script>
<style scoped lang='less'>
.history {
  background: #f7f7f7;
  .super-img {
    width: 30px;
    height: 16px;
    margin-top: 5px;
  }
  .history-li {
    margin-top: 10px;
    background: #fff;
    padding: 15px;
    .li-top {
      color: #939393;
      font-size: 11px;
      padding-bottom: 10px;
      border-bottom: 1px solid #d8d8d8;
      .van-col {
        label {
          margin-right: 5px;
        }
      }
    }
    .li-content {
      margin-top: 20px;
      position: relative;
      .name {
        color: #333333;
        font-size: 15px;
        border-right: 1px solid #eeeeee;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        padding-left: 25px;
        .to-pay {
          padding: 10px 0;
          text-align: center;
          label {
            padding: 10px 40px;
            color: #7bb2f5;
            border: 1px solid #7bb2f5;
            border-radius: 100px;
          }
        }
        .con-li {
          color: #333333;
          font-size: 13px;
          margin-bottom: 15px;
          label {
            color: #999999;
            margin-right: 15px;
          }
          &:last-of-type {
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.history {
  .van-tab {
    font-size: 17px;
    flex-basis: 35% !important;
  }
  .van-tab:nth-child(2) {
    &.van-tab--active {
      &::after {
        left: 10%;
      }
    }
  }

  .van-tab--active {
    font-weight: bold !important;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 21%;
      height: 2px;
      background: #dfb06d;
      width: 58%;
    }
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
  }
}
</style>

