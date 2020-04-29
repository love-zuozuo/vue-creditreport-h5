<template>
    <section class="main">
        <!-- 用户基本信息 -->
        <img class="back-img" src="../../assets/images/report/bg.png" alt>
        <section class="report">
            <!-- 个人信息 -->
            <section class="card userInfo">
                <van-row type="flex" class="userInfo-title">
                    <img class="avatar" src="../../assets/images/report/usericon.png" alt>
                    <div class="name">{{dataInfo.name}}</div>
                </van-row>
                <van-row type="flex" class="info-content">
                    <van-col span="12">
                        <label>报告编号</label>
                        <div>{{dataInfo.reportNo}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>手机号</label>
                        <div>{{dataInfo.mobile}}</div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info">
                    <van-col span="12">
                        <label>身份证</label>
                        <div>{{dataInfo.IDcard}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>身份证归属地</label>
                        <div>{{dataInfo.attribution}}</div>
                    </van-col>
                </van-row>
            </section>
            <div class="title" v-if="isJD">京东信息</div>
            <div class="title" v-else>淘宝信息</div>
            <!-- 基础信息 -->
            <section class="card baseInfo">
                <div class="info-title">
                    <div class="title-name">
                        <div class="left-line"></div>基础信息
                    </div>
                </div>
                <van-row type="flex" class="info-content">
                    <van-col span="12">
                        <div>
                            <label class="fr5">姓名：</label>
                            {{dataInfo.hideName}}
                            <img
                                v-if="dataInfo.isRealName"
                                src="../../assets/images/report/realname.png"
                                alt
                                class="realname-img"
                            >
                            <img
                                v-else
                                src="../../assets/images/report/unrealname.png"
                                alt
                                class="realname-img"
                            >
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div>
                            <label class="fr5">性别：</label>
                            {{dataInfo.gender}}
                        </div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info-content" v-if="isJD">
                    <van-col span="24">
                        <div>
                            <label class="fr5">小白信用分：</label>
                            {{dataInfo.creditScore}}
                        </div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info-content" v-if="!isJD">
                    <van-col span="12">
                        <label>生日</label>
                        <div>{{dataInfo.birth}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>邮箱</label>
                        <div>{{dataInfo.email}}</div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info-content" v-if="!isJD">
                    <van-col span="12">
                        <label>手机号</label>
                        <div>{{dataInfo.mobile}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>支付宝账号</label>
                        <div>{{dataInfo.alipay}}</div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info-content" v-if="!isJD">
                    <van-col span="12">
                        <label>淘宝等级</label>
                        <div>{{dataInfo.tbRank}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>淘宝VIP值</label>
                        <div>{{dataInfo.tbVip}}</div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info-content" v-if="!isJD">
                    <van-col span="12">
                        <label>第一笔交易时间</label>
                        <div>{{dataInfo.firstTime}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>淘气值</label>
                        <div>{{dataInfo.naughty}}</div>
                    </van-col>
                </van-row>
            </section>
            <!-- 资产信息（仅京东有） -->
            <section class="card assetsInfo" v-if="isJD">
                <div class="info-title">
                    <div class="title-name">
                        <div class="left-line"></div>资产信息
                    </div>
                </div>

                <van-row type="flex" class="info-content">
                    <van-col span="12">
                        <label>总资产余额</label>
                        <div>{{dataInfo.totalAssets}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>钱包余额</label>
                        <div>{{dataInfo.wallet}}</div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info-content">
                    <van-col span="12">
                        <label>“小金库”金额</label>
                        <div>{{dataInfo.smallVault}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>白条总额度</label>
                        <div>{{dataInfo.whiteTotal}}</div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info-content">
                    <van-col span="12">
                        <label>理财金额</label>
                        <div>{{dataInfo.financeManage}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>白条欠款金额</label>
                        <div>{{dataInfo.whiteArrears}}</div>
                    </van-col>
                </van-row>
                <van-row type="flex" class="info-content">
                    <van-col span="12">
                        <label>白条可用额度</label>
                        <div>{{dataInfo.whiteAvailable}}</div>
                    </van-col>
                    <van-col span="12">
                        <label>白条预期金额</label>
                        <div>{{dataInfo.whiteExpected}}</div>
                    </van-col>
                </van-row>
            </section>
            <!-- 消费信息 -->
            <section class="card consumeInfo">
                <div class="info-title">
                    <div class="title-name">
                        <div class="left-line"></div>消费信息
                    </div>
                    <van-cell-group class="datePicker">
                        <van-field
                            placeholder="选择日期"
                            :right-icon="calendarImg"
                            v-model="selectedDate"
                            @click-right-icon="popupShow=true"
                            readonly
                        />
                    </van-cell-group>
                </div>
                <van-tabs
                    class="info-tabs"
                    color="#DFB06D"
                    :animated="true"
                    :line-height="2"
                    title-inactive-color="#666"
                    title-active-color="#333"
                >
                    <van-tab title="总体消费" class="tab-content">
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5">“已完成”订单总额：</label>
                                    {{dataInfo.orderAmount}}
                                </div>
                            </van-col>
                        </van-row>
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5">“已完成”订单数量：</label>
                                    {{dataInfo.orderSum}}
                                </div>
                            </van-col>
                        </van-row>
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5">“已完成”消费品种数量：</label>
                                    {{dataInfo.orderKind}}
                                </div>
                            </van-col>
                        </van-row>
                    </van-tab>
                    <van-tab title="本人收货消费" class="tab-content">
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5">“已完成”&本人收货订单总额：</label>
                                    {{dataInfo.orderAmountSelf}}
                                </div>
                            </van-col>
                        </van-row>
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5">“已完成”&本人收货订单数量：</label>
                                    {{dataInfo.orderSumSelf}}
                                </div>
                            </van-col>
                        </van-row>
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5">“已完成”&本人收货消费品种数量：</label>
                                    {{dataInfo.orderKindSelf}}
                                </div>
                            </van-col>
                        </van-row>
                    </van-tab>
                    <van-tab title="特殊商品消费" class="tab-content">
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5">“已完成”&特殊品订单总额：</label>
                                    {{dataInfo.orderAmountSpecial}}
                                </div>
                            </van-col>
                        </van-row>
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5 fl2">虚拟物品消费百分比：</label>
                                    {{dataInfo.specialPercent}}
                                </div>
                            </van-col>
                        </van-row>
                        <van-row type="flex" class="info-content">
                            <van-col span="24">
                                <div>
                                    <label class="fr5 fl2">彩票订单总金额：</label>
                                    {{dataInfo.lottery}}
                                </div>
                            </van-col>
                        </van-row>
                    </van-tab>
                </van-tabs>
            </section>
        </section>
        <Popup :popupShow="popupShow" popupHeight="320" :showClose="false">
            <van-datetime-picker
                v-model="currentDate"
                slot="main"
                type="date"
                @cancel="popupShow=false"
                @confirm="confirmDate"
            />
        </Popup>
    </section>
</template> 
<script>
import { storage } from "@/assets/js/util";
import Popup from "@/components/popup.vue";
export default {
    data() {
        return {
            selectedDate: "",
            currentDate: new Date(),
            isJD: false,
            isSample: false,
            popupShow: false,
            calendarImg: require("../../assets/images/report/calendar.png"),
            dataInfo: {
                name: "苏大强",
                hideName: "**强",
                isRealName: true,
                creditScore: 97,
                birth: "2000-12-12",
                email: "lsxiaod@icloud.com",
                alipay: "lsxiaod@icloud.com",
                tbVip: "1947",
                tbRank: "12",
                firstTime: "2009-07-07",
                naughty: "871",
                gender: "男",
                age: 20,
                reportNo: "172329483942039202",
                mobile: "177****3311",
                IDcard: "511***********4877",
                attribution: "湖南",
                totalAssets: "160000.01",
                wallet: "257115.77",
                smallVault: "177.21",
                whiteTotal: "28000.00",
                financeManage: "21794.21",
                whiteArrears: "747",
                whiteAvailable: "80000.00",
                whiteExpected: "1111.88",
                orderAmount: "160000.01",
                orderSum: "2571",
                orderKind: "177",
                orderAmountSelf: "12000.21",
                orderSumSelf: "322",
                orderKindSelf: "15",
                orderAmountSpecial: "1200",
                specialPercent: "34%",
                lottery: "1880.22"
            }
        };
    },
    watch: {
        $route: {
            handler: function(val, oldVal) {
                this.initState();
            },
            // 深度观察监听
            deep: true
        }
    },
    mounted() {
        this.initState();
    },
    components: {
        Popup
    },
    methods: {
        // 初始化状态
        initState() {
            let data = this.$route.query;
            if (String(data.isJD)) {
                this.isJD = Boolean(data.isJD);
            }
            
        },
        getData() {
            this.dataInfo=storage.getStorage('report');
        },
        confirmDate(value) {
            this.popupShow = false;
            this.selectedDate = this.FmtDate(value, "date");
        }
    }
};
</script>
 
<style scoped lang='less'>
.main {
    background: #2c2e44;
    .back-img {
        width: 100%;
    }
    .report {
        padding: 0 15px 25px 15px;
        margin-top: -45px;
    }
    .card {
        background: #fff;
        border-radius: 6px;
        opacity: 0.98;
        color: #333333;
        font-size: 13px;
        padding: 15px;
        margin-top: 10px;
        .info-content {
            margin: 8px 0;
            label {
                color: #999999;
            }
            div {
                margin-top: 5px;
            }
        }
        .info-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            .title-name {
                display: flex;
                align-items: center;
                font-weight: bold;
                .left-line {
                    margin-right: 8px;
                    width: 2px;
                    height: 12px;
                    background: #dfb06d;
                }
            }
        }
    }
    .userInfo {
        .userInfo-title {
            align-items: center;
            margin: 10px 0;
            .avatar {
                width: 21px;
                height: 21px;
            }
            .name {
                font-size: 17px;
                font-weight: bold;
                margin: 0 10px;
            }
            .gender {
                margin: 0 10px 0 5px;
            }
        }
    }
    .title {
        color: #efcb93;
        font-size: 17px;
        margin: 20px 0 15px;
        font-weight: bold;
    }
    .fr5 {
        margin-right: 5px;
    }
    .fl2 {
        margin-left: 2px;
    }
    .realname-img {
        display: inline-block;
        width: 41px;
        height: 17px;
        margin-left: 5px;
    }
    .info-tabs {
        margin: 8px;
    }
    .datePicker {
        .van-cell {
            padding: 8px 10px;
            font-size: 13px;
            color: #2c2e44;
        }
        .van-field__control {
            font-size: 13px !important;
        }
    }
    .dateBottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    
}

</style>

<style lang='less'>
.van-picker__columns{
    margin: 20px 0;
}
.report {
    .van-tab {
        font-size: 13px;
    }
    .van-tab--active {
        font-weight: bold;
    }
    .van-hairline--top-bottom::after {
        border-width: 0 0 1px;
    }
    .van-tab {
        &:first-of-type {
            text-align: left;
        }
    }
    .datePicker {
        width: 120px;
        height: 29px;
				color: #2c2e44;
				border: 1px solid rgba(44,46,68,0.2);
				.van-cell {
					padding: 0 10px !important;
				}
        input {
            font-size: 13px;
        }
    }
}

</style>