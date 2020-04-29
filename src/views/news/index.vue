<template>
  <div class="main news">
    <section class="news-header">
      <div class="title-big">小启资讯</div>
      <div class="title-sm">
        <div class="circle"></div>小启信用
      </div>
      <div class="news-bg">
        <van-swipe :autoplay="bannerTime" :show-indicators="false">
          <van-swipe-item v-for="(item,index) in bannerData" :key="index" @click="toArticle(item)">
            <img :src="item.bannerUrl" alt />
            <div class="img-title">{{item.title}}</div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </section>
    <section class="news-content">
      <van-tabs
        :line-height="4"
        :line-width="21"
        title-active-color="#DFB06D"
        :animated="true"
        title-inactive-color="#666"
        color="#DFB06D"
        @click="clickTab"
      >
        <van-tab :title="tab.title" v-for="(tab,idx) in tabList" :key="idx">
          <LoadMore :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore" :noData="noData">
            <van-row class="vt-news">
              <van-row class="vt-list">
                <div
                  class="item cell"
                  v-for="(item,index) in newsData"
                  :key="index"
                  @click="toArticle(item)"
                >
                  <van-row class="content">
                    <van-row class="title">{{item.title}}</van-row>
                    <van-row class="tips">{{FmtDate(item.publishDate)}}</van-row>
                  </van-row>
                  <van-row class="icon">
                    <img :src="item.bannerUrl" />
                  </van-row>
                </div>
              </van-row>
            </van-row>
          </LoadMore>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>
<script>
import LoadMore from "@/components/loadMore.vue";
export default {
  data () {
    return {
      bannerTime: window.newsBannerTime, // 设置banner滚动时间
      bannerData: [], // banner数据
      newsData: [],
      currentPage: 1,
      noData: false,
      pageSize: 10,
      loading: true,
      newsType: "xqtt",
      tabList: [
        {
          newsType: "xqtt",
          title: "小启头条"
        },
        {
          newsType: "wdzx",
          title: "网贷资讯"
        },
        {
          newsType: "ssrd",
          title: "实事热点"
        }
      ],
      enableLoadMore: true,
      reload: true
    };
  },
  components: {
    LoadMore
  },
  mounted () {
    this.getNews("lb", 1, 5, true); // 获取轮播
    this.getNews(); // 获取头条
    this._configShare();
  },
  methods: {
    //跳转到详情
    toArticle (item) {
      if (item.sourceType == 1) {
        this.$router.push({
          path: "/news/detail",
          query: {
            newsid: item.articleInfoUuid
          }
        });
      } else {
        window.location.href = item.reprintUrl;
      }
    },
    // 获取资讯
    getNews (newsType, currentPage, pageSize, loading) {
      let params = {
        currentPage: currentPage ? currentPage : this.currentPage,
        pageSize: pageSize ? pageSize : this.pageSize,
        type: newsType ? newsType : this.newsType
      };
      this.$get("news/list", params, "", this, loading && false).then(
        res => {
          if (newsType) {
            this.bannerData = res.data.dataList;
          } else {
            if (res.data.totalCount == 0) {
              this.noData = true
            } else {
              this.newsData = [
                ...this.newsData,
                ...res.data.dataList
              ];
              if (this.currentPage == res.data.totalPage) {
                this.enableLoadMore = false;
              }
            }
          }
        }
      );
    },
    // tab点击事件
    clickTab (name, title) {
      this.noData = false
      this.enableLoadMore = true;
      this.currentPage = 1;
      this.pageSize = 10;
      this.newsData = [];
      this.newsType = this.tabList[name].newsType;
      this.getNews();
    },
    //上拉加载更多
    onLoadMore (done) {
      this.currentPage++;
      if (this.enableLoadMore) {
        this.getNews();
        done();
      }
    }
  }
};
</script>
<style scoped lang='less'>
@import "../../assets/css/app/news/index.less";
@import "../../assets/css/app/index/index.less";
.load-more-wrapper {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition-duration: 300ms;
  .load-more,
  .load-end {
    color: #aea699;
    font-size: 0.26rem;
    margin: 0.3rem 0;
    text-align: center;
  }
}
</style>