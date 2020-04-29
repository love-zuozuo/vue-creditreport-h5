<template>
  <section :class="['proxy',stopScroll?'vt-scroll':'']">
    <p class="title">做小启查线上推广代理</p>
    <p class="subtitle">邀 你 当 新 时 代 斜 杠 青 年</p>
    <img class="poster" src="../../assets/images/proxy.png" />
    <div class="btn-group">
      <div class="btn-left btn" @click="handleAlready">我已是代理</div>
      <div class="btn-right btn" @click="handleApply">申请成为代理</div>
    </div>
    <div class="statement">
      <div class="head-title">代理说明</div>
      <div class="content">
        <p class="point">1、如何成为代理？</p>
        <p class="con">点击申请成为代理，登录并填写个人姓名和微信号即可申请成为代理；</p>
        <p class="point">2、成为代理后如何推广？</p>
        <p class="con has-no">每天跑业务时，在各个实体店摆放上您的宣传二维码（如咖啡厅、贷款网点等），在邀请客户检测个人信用的同时，获得丰厚奖励金；</p>
        <p class="con has-no">在朋友圈以及贷款或查询网站发您的宣传二维码,并配上产品优势介绍等等；</p>
        <p class="point">3、收益如何提现？</p>
        <p class="con">成为代理后，即可看到个人的推广数据，申请提现后，即可提现至所申请的微信账户中；</p>
      </div>
    </div>
    <!-- 登录 -->
    <Popup :popupShow="popupShow" :showClose="true" popupHeight="380">
      <van-row slot="main" class="vt-login">
        <Login
          :isLogin="1"
          :popupShow="popupShow"
          @handleLogin="handleLoginSubmit"
          @handleAgree="handleAgree"
          tips="完成注册登录即可申请推广代理"
        />
      </van-row>
    </Popup>
    <!-- 更换手机号 -->
    <Popup :popupShow="popupHistory" :showClose="true" popupHeight="350" v-if="popupHistory">
      <van-row slot="main" class="vt-login">
        <UpdataPhone
          :popupShow="popupHistory"
          :user="user"
          @handlePhoneSubmit="handlePhoneSubmit"
          tips="请更换你的代理账号"
        />
      </van-row>
    </Popup>
    <!-- 协议内容 -->
    <Dialog title="“小启查”用户服务协议及个人信息查询和使用授权" :agreeShow="agreeShow">
      <van-row slot="main">
        <van-row class="vt-dialog-agree">
          <Agree />
        </van-row>
        <van-row class="vt-dialog-button">
          <van-button @click="handleConfirm" type="default">确定</van-button>
        </van-row>
      </van-row>
    </Dialog>
  </section>
</template>
<script>
import Popup from "@/components/popup.vue";
import Login from "@/components/login.vue";
import UpdataPhone from "@/components/updataPhone.vue";
import Dialog from "@/components/dialog.vue";
import Agree from "@/components/agree.vue";
import { storage, ShowDialog } from "@/assets/js/util";
export default {
  components: {
    Popup,
    Login,
    Dialog,
    Agree,
    UpdataPhone
  },
  data () {
    return {
      popupShow: false, // 登录弹框
      popupHistory: false, // 更换手机号弹框
      agreeShow: false, // 协议弹框
      stopScroll: false, // 阻止滚轮状态
      user: {},
      agentStatus: 0, // 代理状态
    }
  },
  watch: {
    user: {
      handler (newValue, oldValue) {
        this.user = newValue;
      },
      deep: true
    }
  },
  mounted () {
    this.getAuth();
  },
  methods: {
    // 界面加载&&界面授权
    getAuth () {
      let params = {
        code: this.$route.query.code ? this.$route.query.code : "",
        ocode: storage.getStorage("ocode")
          ? storage.getStorage("ocode")
          : ""
      };
      this.$get("user/info", params, "", this).then(res => {
        let str = res.data.ocode;
        let openId = str.substr(0, 6) + str.substr(12, str.length);
        let ocode =
          openId.substr(0, 8) +
          this.RandomRange(6, 6) +
          openId.substr(8, openId.length);
        storage.setStorage("ocode", ocode);
        storage.setStorage("user", res.data);
        this.user = res.data.user;
        this.agentStatus = res.data.agentStatus
        if (res.data.agentStatus) {
          this.changepage(res.data.agentStatus)
        }
      });
    },

    // 根据代理状态来判断页面跳转
    changepage (status) {
      let url = ''
      switch (status) {
        case 5: url = '/proxy/reviewing' // 申请受理中
          break
        case 10: url = '/proxy/detail'  // 已经有代理直接跳转代理详情
          break
        case 15: url = '/proxy/fail' // 审核拒绝
          break
        case 20: url = '/proxy/freeze' // 账号冻结
          break
        default: break
      }
      if (url)
        this.$router.push(url)
    },

    // 我已是代理按钮点击
    handleAlready () {
      if (storage.getStorage("user").token) { // 已登录状态，弹出更换手机号框
        this.handleOpenPhone()
      } else { // 未登录状态，弹出登录框
        this.handleOpenLogin()
      }
    },

    // 申请成为代理按钮点击
    handleApply () {
      if (storage.getStorage("user").token) { // 已登录状态，跳转到申请表单提交页
        this.$router.push('/proxy/apply')
      } else { // 未登录状态，弹出登录框
        this.handleOpenLogin()
      }
    },

    //登录提交
    handleLoginSubmit (value) {
      let params = {
        phone: value.phone,
        verifyCode: value.code,
        id: this.user.id
      };
      this.$post("user/login", params, "", this).then(res => {
        this.stopScroll = false;
        this.popupShow = false;
        storage.setStorage("user", res.data);
        this.user = res.data.user;
        this.Toast("登录成功");
        this.agentStatus = res.data.agentStatus
        if (res.data.agentStatus == 0) { // 该用户未申请代理，跳转到申请表单提交页
          this.$router.push('/proxy/apply')
        } else {
          this.changepage(res.data.agentStatus)
        }
      });
    },

    //唤起更换手机弹窗
    handleOpenPhone () {
      this.stopScroll = true;
      this.popupHistory = true;
    },

    // 唤起登录弹框
    handleOpenLogin () {
      this.stopScroll = true;
      this.popupShow = true;
    },

    //确定更换手机
    handlePhoneSubmit (value) {
      let params = {
        newPhone: value.phone,
        code: value.code
      };
      this.$post("user/changePhone", params, "", this).then(res => {
        this.stopScroll = false;
        this.popupHistory = false;
        storage.setStorage("user", res.data);
        this.agentStatus = res.data.agentStatus
        if (res.data.agentStatus == 0) { // 该用户未申请代理
          ShowDialog('提示', '该账户尚未成为代理，请点击申请成为代理')
        } else {
          this.changepage(res.data.agentStatus)
        }
      });
    },
    //协议展示展开
    handleAgree () {
      this.agreeShow = true;
    },

    //协议展示关闭
    handleConfirm () {
      this.agreeShow = false;
    }
  }
}
</script>
<style scoped lang='less'>
@import "../../assets/css/app/proxy/index.less";
</style>