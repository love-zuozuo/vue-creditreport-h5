<template>
  <section>
      <div class="goBack" @click="goBack">
          <img src="../assets/images/icon/back.png" />
      </div>
  </section>
</template>
<script>
  export default {
    data() {
        return {
        
        };
    },
    mounted() {
        
    },
    methods: {
        goBack(){
           this.$router.push('/index');
        }
    }
}
</script>
<style scoped lang='less'>
  .goBack{
     position: fixed;
     bottom: 60px;
     right: 25px;
     width: 50px;
     height: 50px;
     z-index: 9;
     img{
       width: 100%;
       height: 100%;
     }
  }
</style>



