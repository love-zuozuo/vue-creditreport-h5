<template>
    <div class="main news-detail">
        <div class="detail">
            <div class="title">{{detail.title}}</div>
            <div class="from">
                小启查
                <span>{{FmtDate(detail.publishDate)}}</span>
            </div>
            <div v-html="detail.fuText" class="content"></div>
            <div class="videos" v-if="detail.videoUrl">
                <video :src="detail.videoUrl" controls="controls"></video>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            detail: {}
        };
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            this.$get(
                "news/info",
                { articleInfoUuid: this.$route.query.newsid },
                "",
                this
            ).then(res => {
                this.detail = res.data;
            });
        }
    }
};
</script>
<style scoped lang='less'>
@import "../../assets/css/app/news/index.less";
</style>
