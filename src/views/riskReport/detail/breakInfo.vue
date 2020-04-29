<template>
    <section class="main">
          <van-row class="vt-break">
              <van-row class="tips">
                失信越多则对个人信用影响越大，包括贷款、额度提升、生活各方面。
              </van-row>
							<template v-if="list.length>0">
                   <van-row class="content" v-for="(item,index) in list" :key="index">
											<p>{{item.evidence_court}}</p>
											<p>
													<img src="../../../assets/images/icon/icon5.png" /> <span class="city">{{item.province}}</span>
													<img src="../../../assets/images/icon/icon6.png" /> <span>{{item.case_date}}</span>
											</p>
											<p>
													<span>作出执行依据单位：</span> {{item.evidence_court}}
											</p>
											<p>
													<span>执行依据文号：</span> {{item.case_code}}
											</p>
											<p>
													<span>被执行人的履行性质：</span> {{item.carry_out}}
											</p>
			
											<p>
													<span>失信被执行人行为具体情形：</span><br />
													{{item.specific_circumstances}}
											</p>
											<p>
													<span>生效法律文书确定的义务：</span><br />
													{{item.term_duty}}
											</p>
									</van-row>

							</template>
              <template v-else>
								   <van-row class="nullData" style="margin:50px 0">
											<img src="../../../assets/images/icon/safe.png" />
											<van-row>暂无失信信息！</van-row>
									</van-row>
							</template>
          </van-row>     
    </section>
</template> 
<script>
export default {
 
    data() {
        return {
             list:[]
        };
    },
    props: ["dataInfo"],
    watch: {
        dataInfo: {
            handler: function(news, old) {
                if (news) {
                    this.list = news.dishonest.risk_detail.court_details;
                }
            },
            deep: true
        }
    },
    mounted() {
        this.list = this.dataInfo.dishonest.risk_detail.court_details;
    },
    methods: {
			
    }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
