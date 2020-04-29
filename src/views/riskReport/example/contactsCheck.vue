<template>
    <section class="main">
          <van-row class="vt-contacts">
               <van-row class="tips">
                   申请贷款时，机构会对申请人的紧急联系人进行信用评估，为了不影响贷款通过率，建议不要选择命中风险项的联系人作为您的紧急联系人。
                </van-row>
                <van-row class="title cell">
                    <van-col span="10">扫描项目</van-col>
                    <van-col span="8">扫描对象</van-col>
                    <van-col span="6">扫描结果</van-col>
                </van-row> 
                <van-row class="list">
                     <van-row class="item cell" v-for="(item,index) in list" :key="index">
                         <van-col span="10">{{item.title}}</van-col> 
                         <van-col span="14">
                              <van-row class="subList">
                                   <van-row class="subItem" v-for="(subItem,subIndex) in item.subItem" :key="subIndex">
                                       <van-col span="16">
                                           <p>{{subItem.name}}</p>
                                           <p>{{subItem.phone}}</p>
                                       </van-col>
                                       <van-col span="8" :class="[subItem.status==1?'on':'']">
                                           {{subItem.status==1?'命中':'未命中'}}
                                       </van-col>
                                   </van-row>
                              </van-row>
                         </van-col>
                     </van-row>
                </van-row>


          </van-row>
    </section>
</template> 
<script>
export default {
 
    data() {
        return {
             list:[
                 {
                     title:'信贷逾期名单',
                     subItem:[
                         {
                           name:'第一联系人',
                           phone:'177****8888',
                           status:0  
                         },
                         {
                           name:'第二联系人',
                           phone:'189****7777',
                           status:1  
                         },
                         {
                           name:'第三联系人',
                           phone:'151****6666',
                           status:0 
                         }
                     ]
                 },
                 {
                     title:'贷款黑中介',
                     subItem:[
                         {
                           name:'第一联系人',
                           phone:'177****8888',
                           status:0  
                         },
                         {
                           name:'第二联系人',
                           phone:'189****7777',
                           status:1  
                         },
                         {
                           name:'第三联系人',
                           phone:'151****6666',
                           status:0 
                         }
                     ]
                 },
                 {
                     title:'失联名单',
                     subItem:[
                         {
                           name:'第一联系人',
                           phone:'177****8888',
                           status:0  
                         },
                         {
                           name:'第二联系人',
                           phone:'189****7777',
                           status:1  
                         },
                         {
                           name:'第三联系人',
                           phone:'151****6666',
                           status:0 
                         }
                     ]
                 }
             ]
        };
    },
    mounted() {

    },
    methods: {
        
    }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
