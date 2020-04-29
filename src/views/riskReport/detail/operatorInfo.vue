<template>
    <section class="main">
        <van-row class="vt-operator" v-if="operatorInfo">
            <van-row class="title">基本信息</van-row>
            <van-row class="list">
                <van-col span="12" class="item">
                    <p class="name">运营商标识</p>
                    <p class="info">{{operatorInfo.carrier}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">归属地</p>
                    <p class="info">{{operatorInfo.province}} - {{operatorInfo.city}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">入网时间</p>
                    <p class="info">{{operatorInfo.open_time}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">用户星级</p>
                    <p class="info">{{operatorInfo.level}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">套餐名称</p>
                    <p class="info">{{operatorInfo.package_name}}</p>
                </van-col>
                <van-col span="12" class="item">
                    <p class="name">实名状态</p>
                    <p class="info">{{operatorInfo.state}}</p>
                </van-col>
                <van-col span="24" class="item">
                    <p class="name">机主地址</p>
                    <p class="info">{{operatorInfo.address}}</p>
                </van-col>
            </van-row>
            <template v-if="types=='4'">
                <van-row class="title">账单信息</van-row>
                <van-row class="list">
                    <van-col span="12" class="item">
                        <p class="name">账单月</p>
                        <p class="info">{{operatorInfo.bills.bill_month}}</p>
                    </van-col>
                    <van-col span="12" class="item">
                        <p class="name">账单起始日期</p>
                        <p class="info">{{operatorInfo.bills.bill_start_date}}</p>
                    </van-col>
                    <van-col span="12" class="item">
                        <p class="name">账单结束日期</p>
                        <p class="info">{{operatorInfo.bills.bill_end_date}}</p>
                    </van-col>
                    <van-col span="12" class="item">
                        <p class="name">语音费</p>
                        <p class="info">{{operatorInfo.bills.voice_fee}}</p>
                    </van-col>
                    <van-col span="12" class="item">
                        <p class="name">本机号码套餐及固定费</p>
                        <p
                            class="info"
                        >{{operatorInfo.package_name}} {{operatorInfo.bills.base_fee}}</p>
                    </van-col>
                    <van-col span="12" class="item">
                        <p class="name">网络流量费</p>
                        <p class="info">{{operatorInfo.bills.web_fee}}</p>
                    </van-col>
                    <van-col span="12" class="item">
                        <p class="name">增值业务费</p>
                        <p class="info">{{operatorInfo.bills.extra_service_fee}}</p>
                    </van-col>
                    <van-col span="12" class="item">
                        <p class="name">本月总费用</p>
                        <p class="info">{{operatorInfo.bills.total_fee}}</p>
                    </van-col>
                    <van-col span="12" class="item">
                        <p class="name">彩信费</p>
                        <p class="info">{{operatorInfo.bills.sms_fee}}</p>
                    </van-col>

                    <van-col span="12" class="item">
                        <p class="name">其他费用</p>
                        <p class="info">{{operatorInfo.bills.extra_fee}}</p>
                    </van-col>
                </van-row>
            </template>
        </van-row>
    </section>
</template> 
<script>
export default {
    data() {
        return {
            operatorInfo: null
        };
    },
    props: ["dataInfo", "types"],
    watch: {
        dataInfo: {
            handler: function(news, old) {
                if (news) {
                    this.operatorInfo = news.yys;
                }
            },
            deep: true
        },
        types(news, old) {
            if (news) {
                this.type = news;
            }
        }
    },
    mounted() {
        this.operatorInfo = this.dataInfo.yys;
    },
    methods: {}
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
