<template>
    <section class="main">
        <van-row class="vt-blackList" v-if="blackList">
            <van-row class="vt-tab">
                <div
                    :class="['item', tabActive==index?'on':'']"
                    v-for="(item,index) in tabs"
                    :key="index"
                    @click="handleTabClick(index)"
                >{{item.name}}</div>
            </van-row>
						<template v-if="tabActive===0">
                 <van-row class="content">
										<van-row class="item cell" v-for="(item,key) in blackList.card" :key="key">
												<van-col span="20">
														<p class="title">
																<template v-if="key==='risk_id_address'">高风险集中地区</template>
																<template v-if="key==='risk_id_court_loser'">法院失信名单</template>
																<template v-if="key==='risk_id_crime'">犯罪通缉名单</template>
																<template v-if="key==='risk_id_court_exe'">法院执行名单</template>
																<template v-if="key==='risk_id_schoole_loan'">助学贷款逾期历史</template>
																<template v-if="key==='risk_id_loan_overdue'">信贷逾期名单</template>
																<template v-if="key==='risk_id_loan_payment'">信贷逾期还款名单</template>
																<template v-if="key==='risk_id_car_danger'">车辆租赁违约名单</template>
																<template v-if="key==='risk_id_danger'">风险关注名单</template>
																<template v-if="key==='risk_id_case'">法院结案名单</template>
														</p>
														<p :class="['tips',blackList.card[key]==1?'on':'']">
															您{{blackList.card[key]==1?"命中本项，会影响个人信用":"未命中本项"}}
														</p>
														<p :class="['info',blackList.card[key]==1?'on':'']">
																<template v-if="key==='risk_id_address'">个别高风险省份城市可能被列入本名单</template>
																<template v-if="key==='risk_id_court_loser'">刑事、民事纠纷等情况可能被列入本名单</template>
																<template v-if="key==='risk_id_crime'">存在犯罪记录情况可能被列入本名单</template>
																<template v-if="key==='risk_id_court_exe'">不良行为会影响个人信用</template>
																<template v-if="key==='risk_id_schoole_loan'">存在助学贷款逾期的情况可能被列入本名单</template>
																<template v-if="key==='risk_id_loan_overdue'">欺诈、逾期、展期等不良贷款行为可能被列入本名单</template>
																<template v-if="key==='risk_id_loan_payment'">存在逾期还款行为可能被列入本名单</template>
																<template v-if="key==='risk_id_car_danger'">车辆租赁违约操作行为可能被列入本名单</template>
																<template v-if="key==='risk_id_danger'">身份证或手机号涉嫌违法或冒用可能被列入本名单</template>
																<template v-if="key==='risk_id_case'">有个法院裁决记录可能被列入本名单</template>
														</p>
												</van-col>
												<van-col span="4" :class="['status',blackList.card[key]==1?'on':'']">
													{{blackList.card[key]==1?'命中':'未命中'}}
												</van-col>
										</van-row>
								</van-row>
						</template>
            <template v-if="tabActive===1">
                 <van-row class="content">
										<van-row class="item cell" v-for="(item,key) in blackList.phone" :key="key">
												<van-col span="20">
														<p class="title">
																<template v-if="key==='risk_phone_false_library'">虚假号码库</template>
																<!-- <template v-if="key==='risk_phone_harass'">诈骗骚扰库</template> -->
																<template v-if="key==='risk_phone_risk_list'">风险关注名单</template>
																<template v-if="key==='risk_phone_car_danger'">车辆租赁违约名单</template>
																<template v-if="key==='risk_phone_legal_list'">欠款公司法人代表名单</template>
																<template v-if="key==='risk_phone_loan_overdue'">信贷逾期名单</template>
																<template v-if="key==='risk_phone_loan_payment'">信贷逾期还款名单</template>
														</p>
														<p :class="['tips',blackList.phone[key]==1?'on':'']">
															您{{blackList.phone[key]==1?"命中本项，会影响个人信用":"未命中本项"}}
														</p>
														<p :class="['info',blackList.phone[key]==1?'on':'']">
																<template v-if="key==='risk_phone_false_library'">使用虚假号码可能被列入本名单</template>
																<!-- <template v-if="key==='risk_phone_harass'">被标记为骚扰、诈骗号码可能被列入本名单</template> -->
																<template v-if="key==='risk_phone_risk_list'">身份证或手机号涉嫌违法或冒用可能被列入本名单</template>
																<template v-if="key==='risk_phone_car_danger'">车辆租赁违约操作行为可能被列入本名单</template>
																<template v-if="key==='risk_phone_legal_list'">被标记为欠款公司法人可能被列入本名单</template>
																<template v-if="key==='risk_phone_loan_overdue'">欺诈、逾期、展期等不良贷款行为可能被列入本名单</template>
																<template v-if="key==='risk_phone_loan_payment'">存在逾期还款行为可能被列入本名单</template>
														</p>
												</van-col>
												<van-col span="4" :class="['status',blackList.phone[key]==1?'on':'']">
													{{blackList.phone[key]==1?'命中':'未命中'}}
												</van-col>
										</van-row>
								</van-row>
						</template>
        </van-row>
    </section>
</template> 
<script>
import { storage } from "@/assets/js/util";
export default {
    data() {
        return {
            tabActive: 0,
            tabs: [
                {
                    name: "身份证"
                },
                {
                    name: "手机号"
                }
            ],
            blackList:null
        
        }
    },
    props: ["dataInfo"],
    watch: {
        dataInfo: {
            handler: function(news, old) {
                if (news) {
                    this.blackList = news.blackList;
                }
            },
            deep: true
        }
    },
    mounted() {
        this.blackList = this.dataInfo.blackList;
    },
    methods: {
        //tab 切换
        handleTabClick(key) {
            this.tabActive = key;
        }
    }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
