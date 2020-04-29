<template>
    <section class="main">
        <van-row class="vt-operator" v-if="jingdongData">
            <van-row class="title">基本信息</van-row>
            <van-row class="list">
                <van-col span="12" class="item">
                    <p class="name">用户名</p>
                    <p class="info">{{jingdongData.basic.loginName}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">小白信用分</p>
                    <p class="info">{{jingdongData.basic.xiaobai}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">白条总额度</p>
                    <p class="info">{{jingdongData.basic.btCreditLimit}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">白条逾期金额</p>
                    <p class="info">{{jingdongData.basic.btJtDelinquencyBalance}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">近半年消费次数</p>
                    <p class="info">{{jingdongData.basic.buyTimesSix}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">近半年消费总额</p>
                    <p class="info">{{jingdongData.basic.buyAmountSix}}</p>
                </van-col>
								<van-col span="12" class="item">
                    <p class="name">常用收货城市</p>
                    <p class="info">{{jingdongData.basic.useCitySixMouth}}</p>
                </van-col>
								<van-col span="12" class="item">
                    <p class="name">第一笔消费时间</p>
                    <p class="info">{{jingdongData.basic.firstBuyTime}}</p>
                </van-col>
            </van-row>
        </van-row>
    </section>
</template> 
<script>
export default {
    data() {
        return {
            jingdongData: null
        };
    },
    props: ["dataInfo"],
    watch: {
        dataInfo: {
            handler: function(news, old) {
                if (news) {
                    this.jingdongData = news.jingdong.data;
                }
            },
            deep: true
        }
    },
    mounted() {
        this.jingdongData = this.dataInfo.jingdong.data;
    },
    methods: {}
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
