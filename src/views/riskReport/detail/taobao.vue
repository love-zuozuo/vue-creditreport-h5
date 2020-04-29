<template>
    <section class="main">
        <van-row class="vt-operator" v-if="taobaoData">
            <van-row class="title">基本信息</van-row>
            <van-row class="list">
                <van-col span="12" class="item">
                    <p class="name">用户名</p>
                    <p class="info">{{taobaoData.taobao.username}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">邮箱</p>
                    <p class="info">{{taobaoData.taobao.email}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">手机号</p>
                    <p class="info">{{taobaoData.taobao.mobile}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">淘气值</p>
                    <p class="info">{{taobaoData.taobao.taoScore}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">支付宝账号</p>
                    <p class="info">{{taobaoData.taobao.alipayAccount}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">是否实名认证</p>
                    <p class="info">{{taobaoData.taobao.trueName}}</p>
                </van-col>
								<van-col span="12" class="item">
                    <p class="name">花呗授信额度</p>
                    <p class="info">{{taobaoData.taobao.hbTotal}}</p>
                </van-col>
								<van-col span="12" class="item">
                    <p class="name">花呗使用额度</p>
                    <p class="info">{{taobaoData.taobao.hbUsed}}</p>
                </van-col>
								<van-col span="12" class="item">
                    <p class="name">近半年消费次数</p>
                    <p class="info">{{taobaoData.taobao.buyTimesSix}}</p>
                </van-col>
								<van-col span="12" class="item">
                    <p class="name">近半年消费总额</p>
                    <p class="info">{{taobaoData.taobao.buyAmountSix}}</p>
                </van-col>
								<van-col span="12" class="item">
                    <p class="name">常用收货城市</p>
                    <p class="info">{{taobaoData.taobao.useCitySixMouth}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">第一笔交易时间</p>
                    <p class="info">{{taobaoData.taobao.first}}</p>
                </van-col>
            </van-row>
        </van-row>
    </section>
</template> 
<script>
export default {
    data() {
        return {
            taobaoData: null
        };
    },
    props: ["dataInfo"],
    watch: {
        dataInfo: {
            handler: function(news, old) {
                if (news) {
                    this.taobaoData = news.taobao.data;
                }
            },
            deep: true
        }
    },
    mounted() {
        this.taobaoData = this.dataInfo.taobao.data;
    },
    methods: {}
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
