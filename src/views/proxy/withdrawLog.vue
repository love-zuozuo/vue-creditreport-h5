<template>
  <section class="list-warp">
    <van-row class="title cell">
      <van-col span="18">提现金额</van-col>
      <van-col span="6">结果</van-col>
    </van-row>
    <van-row class="list">
      <LoadMore :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore" :noData="noData">
        <van-row class="item cell" v-for="(item,index) in list" :key="index">
          <van-col span="18">
            <p class="name">{{item.amount}}</p>
            <p>{{item.created_at}}</p>
          </van-col>
          <van-col span="6" class="status">
            <span v-if="item.status==10" class="sucess">提现成功</span>
            <span v-if="item.status==15" class="fail">提现失败</span>
            <span v-if="item.status==7" class="wait">提现中...</span>
          </van-col>
        </van-row>
      </LoadMore>
    </van-row>
  </section>
</template>
<script>
import LoadMore from "@/components/loadMore.vue";
export default {
  components: {
    LoadMore
  },
  data () {
    return {
      page: 1, //当前页
      size: 10, //分页初始值
      enableLoadMore: true, //加载更多按钮是否展示
      noData: false,
      list: [] //列表数据
    };
  },
  mounted () {
    this.getLoad();
  },
  methods: {
    //数据加载
    getLoad () {
      let params = {
        page: this.page,
        size: this.size
      };
      this.$get("channel/agent/cashList", params, "", this).then(
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
      );
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
<style lang='less'>
@import "../../assets/css/app/proxy/list.less";
</style>