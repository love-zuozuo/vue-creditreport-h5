<template>
    <section class="statement">
        <div class="title">关注“小启查”公众号</div>
        <p class="sub-title">预知数据风险，了解信用知识</p>
        <img src="../assets/images/icon/qrcode.png" class="qrcode" />
        <p class="sub-title">[长按上图，识别二维码，一键关注]</p>
        <div class="subject">平台申明</div>
        <section class="con">
            <div class="item">
                <p>1、</p>
                <p>小启查风险分析报告仅由本人授权查询，本平台只对数据做出整理分析和展示，不对数据的准确性和真实性做任何承诺和担保，报告展示评估结果仅供参考。</p>
            </div>
            <div class="item">
                <p>2、</p>
                <p>小启查并未授权任何第三方公司以及公司名义从事借贷相关业务，请谨慎堤防诈骗及套路贷风险，保护好个人信息。</p>
            </div>
            <div class="item">
                <p>3、</p>
                <p>小启查风险分析报告仅为用户本人提供技术分析及评估服务，仅供本人查阅，请您勿将本报告内容提供给任何第三方；若因为您本人行为造成的报告信息泄露或者提供报告信息从第三方获取某种服务，后续给您带来的一切后果均有您自行承担。</p>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style scoped lang='less'>
.statement {
    width: 100%;
    height: 100%;
    background: url("../assets/images/stateBg.png");
    background-size: 100% 100%;
    color: #efcb93;
    text-align: center;
    padding: 40px 35px;
    .title {
        font-size: 17px;
    }
    .sub-title {
        font-size: 13px;
        margin-top: 10px;
    }
    .qrcode {
        width: 140px;
        height: 140px;
        margin-top: 25px;
    }
    .subject {
        margin-top: 65px;
        padding: 7px 87px;
        background: #efcb93;
        color: #8b570c;
        font-size: 17px;
    }
    .con {
				font-size: 14px;
				margin-top: 20px;
        .item {
						display: flex;
						margin-bottom: 25px;
						p {
							text-align: left;
						}
        }
    }
}
</style>



