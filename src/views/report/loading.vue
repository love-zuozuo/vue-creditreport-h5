<template>
  <section class="check-loading">
    <div class="load-icon">
      <Lottie :options="defaultOptions" :height="26" :width="26"  />
    </div>
    <div class="title">数据加载中，请稍后</div>
  </section>
</template>
<script>
import { ShowDialog } from "@/assets/js/util";
import * as animationData from '@/assets/images/dataloading.json'
import Lottie from 'vue-lottie/src/lottie.vue'
export default {
  data () {
    return {
      checkStatus: '',
      oldUrl: '',
      defaultOptions: {
        animationData: animationData.default
      }
    }
	},
	components: {
		Lottie
	},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.oldUrl = from.path
    })
  },
  mounted () {
    this.$nextTick(() => {
      if (this.oldUrl != '/riskReport/detail') {
        this.getStatus()
      }
    })
  },
  methods: {
    // 获取报告检测状态
    getStatus () {
      let params = {
        id: this.$route.query.id
      };
      this.$post("report/detail", params, "", this, false).then(res => {
        if (this.$route.query.type == 1) {
          this.checkStatus = res.data.taobao.data_status
        } else {
          this.checkStatus = res.data.jingdong.data_status
        }
        this.handleStatus();
      })
    },
    // 根据状态处理流程
    handleStatus () {
      switch (this.checkStatus) {
        case 5:  // 报告拉取中
          setTimeout(() => {
            if (this.$route.path == '/report/loading') {
              this.getStatus()
            }
          }, window.reportLogin)
          break;
        case 10:  // 报告获取成功,跳转报告详情页
        case 15: // 报告获取失败,跳转报告详情页
          this.$router.push({
            path: '/riskReport/detail',
            query: {
              type: 4,
              id: this.$route.query.id
            }
          })
          break;
        default: break;
      }
    }
  }
}
</script>
<style  lang='less' scoped>
@import "../../assets/css/app/report/index.less";
</style>