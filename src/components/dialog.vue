<template>
  <section>
    <van-dialog
      v-model="show"
      :title="title"
      :show-confirm-button="showBtnGroup"
      :show-cancel-button="showBtnGroup"
      :close-on-click-overlay="overlay"
      :beforeClose="beforeClose"
    >
      <slot name="main"></slot>
    </van-dialog>
  </section>
</template>
<script>
export default {
  data () {
    return {
      show: this.agreeShow,
      showBtnGroup: this.showBtn ? true : false
    };
  },
  props: ["title", "agreeShow", "showBtn", 'overlay'],
  watch: {
    agreeShow (news, old) {
      this.show = news;
    }
  },
  mounted () { },
  methods: {
    beforeClose (action, done) {
      if (action === "confirm") {
        this.$emit("handleConfirm");
        done(false);
      } else {
        this.$emit("handleCancel");
        done();
      }

    }
  }
};
</script>
<style scoped lang='less'>
.close {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  .van-icon {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.3);
  }
}
</style>
<style lang='less'>
.van-dialog {
  width: 92% !important;
  .van-dialog__header {
    font-weight: bold;
    color: #444444;
    font-size: 17px;
  }
}
</style>



