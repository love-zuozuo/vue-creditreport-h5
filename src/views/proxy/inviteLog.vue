<template>
  <section class="list-warp">
    <van-row class="title cell">
      <van-col span="14">邀请详情</van-col>
      <van-col span="10">已邀请人级别</van-col>
    </van-row>
    <van-row class="list">
      <LoadMore :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore" :noData="noData">
        <van-row class="item cell" v-for="(item,index) in list" :key="index">
          <van-col span="14">
            <p class="name">{{item.name}}</p>
            <p>{{item.created_at}}</p>
          </van-col>
          <van-col span="10" class="status">
            <!-- 本版本只处理4个状态  5 B级 , 10 A级,50审核中,100审核通过,150已拒绝,200已冻结 -->
            <span v-if="item.level==50" class="examing">审核中</span>
            <span v-if="item.level==150" class="fail">审核失败</span>
						<span v-if="item.level==200" class="fail">冻结</span>
            <span v-if="item.level==5">
              <img src="../../assets/images/icon/proxy-b.png" /> 铂金代理商
            </span>
            <span v-if="item.level==10">
              <img src="../../assets/images/icon/proxy-a.png" /> 钻石代理商
            </span>
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
      this.$get("channel/agent/inventList", params, "", this).then(
        res => {
          if (res.data.total == 0) {
            this.noData = true
            return
          }
          this.list = [...this.list, ...res.data.list];
          if (this.page == res.data.last_page) {
            this.enableLoadMore = false;
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