<template>
    <section class="main">
        <van-row class="vt-riskLoan">
            <van-row class="tips">短期内多头借贷个数越多，申请借贷被拒绝的风险越高</van-row>
            <van-row class="vt-change">
                <div
                    :class="['item', changeActive==index?'on':'']"
                    v-for="(item,index) in changes"
                    :key="index"
                    @click="handleChange(index)"
                >{{item.name}}</div>
            </van-row>
            <van-row class="vt-tabbar">
                <van-row class="vt-tab">
                    <div
                        :class="['item',tabActive==index?'on':'']"
                        v-for="(item,index) in tabs"
                        :key="index"
                        @click="handleTabClick(index)"
                    >{{item.name}}</div>
                </van-row>
                <van-row class="vt-chart">
                    <van-row class="header">
                        <van-row class="item" v-for="(item,index) in chartsData" :key="index">
                            <van-col span="16" class="info">
                                <span :style="{background:colors[index]}"></span>
                                {{item.name}}
                            </van-col>
                            <van-col span="8" class="num">{{item.value}}家</van-col>
                        </van-row>
                    </van-row>
                    <van-row id="myChart" class="chart"></van-row>
                </van-row>
            </van-row>
        </van-row>
    </section>
</template> 
<script>
export default {
    props: ["dataInfo", "id"],
    data() {
        return {
            changeActive: 0,
						tabActive: 0,
						list: [],
            changes: [
                {
                    name: "手机号多头风险统计"
                },
                {
                    name: "身份证多头风险统计"
                }
            ],
            tabs: [
                {
                    name: "近1个月"
                },
                {
                    name: "近3个月"
                }
            ],
            colors: ["#5FD665", "#27AEFD", "#FFC740", "#F8E71C"],
            charsPhone: [],
            charsCard: [],
            myChart: null,
            chartsData: []
        };
    },
    mounted() {
        this.getLoad();
    },
    methods: {
				//获取数据
        getLoad() {
            this.id.forEach(el => {
                this.dataInfo.report.td.risk_items.forEach(ele=> {
									if (el == ele.item_id) {
                        this.list.push(ele);
                    }
								}) 
						});
            if ((this.charsPhone = this.list[this.tabActive])) {
                this.charsPhone = this.list[this.tabActive].item_detail.platform_detail_dimension[this.changeActive].detail;
                this.getCharsPhone(true);
                this.getCharts();
            }
            
            
        },
        //得到手机数据
        getCharsPhone(flag) {
           if ((this.charsPhone = this.list[this.tabActive])) {
                this.charsPhone = this.list[this.tabActive].item_detail.platform_detail_dimension[this.changeActive].detail;
            } 
            this.charsPhone.map(item => {
                this.chartsData.push({
                    value: item.split(":")[1],
                    name: item.split(":")[0]
                });
            });
            
            if(!flag){
               this.updateChars();
            }
        },
        //得到身份证数据
        getCharsCard(key) {
            if ((this.charsCard = this.list[this.tabActive])) {
                this.charsCard = this.list[this.tabActive].item_detail.platform_detail_dimension[this.changeActive].detail;
            }
            this.charsCard.map(item => {
                this.chartsData.push({
                    value: item.split(":")[1],
                    name: item.split(":")[0]
                });
            });
            this.updateChars();
            
        },
        //更新图表数据
        updateChars() {
            let option = this.myChart.getOption();
            option.series[0].data = this.chartsData;
            this.myChart.setOption(option);
        },
        //选择分类统计
        handleChange(key) {
            this.changeActive = key;
            this.chartsData = [];
            if (key == 0) {
                this.getCharsPhone();
            }else {
                
                this.getCharsCard();
            }
        },
        //选择月份
        handleTabClick(key) {
            this.tabActive = key;
            this.chartsData = [];
            if(this.changeActive == 0){
               this.getCharsPhone();
            }else {
                this.getCharsCard();
            }
        },
        getCharts() {
            this.myChart = this.$echarts.init(
                document.getElementById("myChart")
            );
            // 绘制图表
            var option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color: this.colors,
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.chartsData
                    }
                ]
            };
            // 为echarts对象加载数据
            this.myChart.setOption(option);
        }
    }
};
</script>
 
<style  lang='less'>
@import "../../../assets/css/app/detail/index.less";
</style>
