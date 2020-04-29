<template>
  <section>
      <van-popup v-model="show" position="bottom"  @click-overlay="handleClose()" :lock-scroll="true">
           <div class="close" @click="handleClose" v-if="showClose">
              <van-icon name="cross" />
           </div>
           <slot name="main"></slot>   
     </van-popup>   
  </section>
</template>
<script>
  export default {
    data() {
        return {
            popup:'popup', 
            show: this.popupShow
        };
    },
    props: ["popupShow","popupHeight","showClose"],
    watch: {
        popupShow(news, old) {
            this.show = news;
        }
    },
    mounted() {
        
    },
    methods: {
        handleClose(){
					 this.$parent.popupForget = false;
           this.$parent.popupShow = false;
					 this.$parent.popupHistory = false;
					 this.$parent.stopScroll = false;
        }
    }
}
</script>
<style scoped lang='less'>
  .close{
     width: 34px;
     height: 34px;
     display: flex;
     align-items: center;
     justify-content: center;
     .van-icon{
        font-size: 18px;
        color: rgba(0,0,0,0.3)
     }
  }

</style>
