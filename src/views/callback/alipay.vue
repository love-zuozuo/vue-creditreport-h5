<template>
  <div class="main success">
    <img class="success-img" src="../../assets/images/success-img.png" alt="">
		<section class="success-alipay">
			<div class="title">你已支付成功，信息已提交!</div>
			<div class="remark">
				<p>报告数据正在生成中，请在3-5分钟后进入“历史”报告”页进行查看！</p>
			</div>
			<button class="back-button" @click="goBack">返回首页</button>
			<footer class="page-footer">
				<p class="yellow-footer">启用银行级数据加密，杜绝隐私泄漏风险</p>
				<p class="verify-footer">&#169本服务由小启科技有限公司提供</p>
			</footer>
		</section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
	},
	mounted() {
		this._configShare();
	},
	methods: {
		goBack() {
			this.$router.push('/index')
		}
	}
}
</script>
<style scoped lang='less'>
.main {
	text-align: center;
}
</style>