<template>
  <div class="main success">
    <img class="success-img" src="../../assets/images/success-img.png" alt="">
		<section class="success-verify">
			<div class="title">你已验证通过，信息提交成功!</div>
			<div class="remark">
				<p>正在整理生成数据，报告将在3-5分钟后生成。</p>
				<p>稍后请点击“历史报告”进行查询！</p>
			</div>
			<button class="back-button" @click="handleBlack">返回信息查询页</button>
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
	   handleBlack(){
			 this.$router.push({
						path: "/history/index"
				});
		 }	
	}
}
</script>
<style scoped lang='less'>
.main {
	text-align: center;
}
</style>