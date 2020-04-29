// 引入界面组件

import RiskReport from '../views/riskReport/index.vue' //综合风险报告首页
import RiskReportExample from '../views/riskReport/example/index.vue' //综合风险报告示例首页
import RiskReportDetail from '../views/riskReport/detail/index.vue' //综合风险报告详情页
import OrderIndex from '../views/order/index.vue' //淘宝订单
import reportIndex from '../views/report/index.vue' //淘宝/京东报告查询页
import reportLoading from '../views/report/loading.vue' //淘宝/京东报告查询页
import reportTaobao from '../views/report/reportTaobao.vue' //淘宝报告
import reportJingdong from '../views/report/reportJingdong.vue' //京东报告
import reportBlacklist from '../views/blacklistReport/detail.vue' //黑名单报告详情
import reportUltiloan from '../views/ultiloanReport/detail.vue' //多头借贷详情
import verifySuccess from '../views/callback/verify.vue' //验证成功
import paySuccess from '../views/callback/alipay.vue' //支付成功
import newsIndex from '../views/news/index.vue' //资讯首页
import newsDetail from '../views/news/detail.vue' //资讯详情页
import historyIndex from '../views/history/index.vue' //历史检测报告
import reportBlackExample from '../views/blacklistReport/example.vue' //黑名单样例报告
import reportUltiloanExample from '../views/ultiloanReport/example.vue' // 多头借贷样例报告
import proxyIndex from '../views/proxy/index.vue' // 代理申请入口
import proxyApply from '../views/proxy/apply.vue' // 代理申请表单提交
import proxyFail from '../views/proxy/fail.vue' // 申请拒绝
import proxyFreeze from '../views/proxy/freeze.vue' // 账号冻结
import proxyReviewing from '../views/proxy/reviewing.vue' // 申请受理中
import proxyDetail from '../views/proxy/detail.vue' // 代理详情
import proxyWithdraw from '../views/proxy/withdrawLog.vue' // 提现记录
import proxyInvite from '../views/proxy/inviteLog.vue' // 邀请记录
import start from '../views/start/index.vue' // 开屏页
import spread from '../views/start/spread.vue' // 推广大长页

let routes = [
  {
    path: '/riskReport', //综合风险报告查询
    component: RiskReport
  },
  {
    path: '/riskReport/example', //综合风险报告示例
    component: RiskReportExample
  },
  {
    path: '/riskReport/detail', //综合风险报告详情
    component: RiskReportDetail
  },
  {
    path: '/order/index', //订单确认
    component: OrderIndex
  },
  {
    path: '/report/index', //淘宝/京东报告查询页
    component: reportIndex
	},
	{
    path: '/report/loading', //淘宝/京东报告loading页面
    component: reportLoading
  },
  {
    path: '/report/reportTaobao', //淘宝报告
    component: reportTaobao
  },
  {
    path: '/report/reportJingdong', //京东报告
    component: reportJingdong
  },
  {
    path: '/blacklistReport/detail', //黑名单报告详情
    component: reportBlacklist
  },
  {
    path: '/blacklistReport/example', //黑名单报告样例
    component: reportBlackExample
  },
  {
    path: '/ultiloanReport/detail', //多头借贷报告详情
    component: reportUltiloan
  },
  {
    path: '/ultiloanReport/example', //多头借贷报告样例
    component: reportUltiloanExample
  },
  {
    path: '/callback/verify', //验证成功
    component: verifySuccess
  },
  {
    path: '/callback/alipay', //支付成功
    component: paySuccess
  },
  {
    path: '/news/index', //资讯首页
    component: newsIndex
  },
  {
    path: '/news/detail', //资讯详情
    component: newsDetail
  },
  {
    path: '/history/index', // 历史检测报告
    component: historyIndex
  },
  {
    path: '/proxy/index', // 代理申请入口
    component: proxyIndex
  },
  {
    path: '/proxy/apply', // 代理申请表单提交
    component: proxyApply
  },
  {
    path: '/proxy/fail', // 审核拒绝
    component: proxyFail
  },
  {
    path: '/proxy/reviewing', // 审核中
    component: proxyReviewing
  },
  {
    path: '/proxy/freeze', // 账号冻结
    component: proxyFreeze
  },
  {
    path: '/proxy/detail', // 代理详情
    component: proxyDetail
  },
  {
    path: '/proxy/withdraw', // 提现记录
    component: proxyWithdraw
  },
  {
    path: '/proxy/invite', // 邀请记录
    component: proxyInvite
  },
  {
    path: '/start', // 开屏页
    component: start
  },
  {
    path: '/spread', // 推广大长页
    component: spread
  }
]

export default {
  routes
}
