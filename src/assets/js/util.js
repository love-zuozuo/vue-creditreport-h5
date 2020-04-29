import { Dialog, Toast } from 'vant';
import wx from 'weixin-js-sdk';
import axios from 'axios';

/**
 * setStorage 存储
 * getStorage 取到
 * removeStorage 移除
 */
export const storage = {
  setStorage: (name, val) => {
    if (typeof val == 'object') {
      val = JSON.stringify(val);
    }
    sessionStorage.setItem(name, val);
  },

  getStorage: val => {
    let value = sessionStorage.getItem(val);
    if (value) {
      if (value.indexOf('{') != -1) {
        return JSON.parse(value);
      } else {
        return value;
      }
    } else {
      return null;
    }
  },
  removeStorage: val => {
    sessionStorage.removeItem(val);
  }
};

/**
 * vue 挂载
 * this...
 */

export default {
  install: function(Vue, options) {
    /**
     * 弹出窗
     * callback 返回函数
     *
     */

    Vue.prototype.Dialog = function(title, message, callback) {
      Dialog.confirm({
        title: title ? title : '提示',
        message: message
      }).then(() => {
        if (callback) {
          callback();
        }
      });
    };

    /**
     * 时间戳转成时间格式
     * xxxx-xx-xx
     *
     */

    Vue.prototype.FmtDate = function(obj, type) {
      if (obj) {
        var date = new Date(obj);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? '0' + d : d;
        var h = date.getHours();
        h = h < 10 ? '0' + h : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        if (type == 'year') {
          return y;
        } else if (type == 'month') {
          return y + '-' + m;
        } else if (type == 'date') {
          return y + '-' + m + '-' + d;
        }
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      }
    };

    /**
     * Toast
     * 居中展示数据
     *
     */
    Vue.prototype.Toast = function(message, duration = 3000, callback) {
      Toast({
        message: message,
        duration: duration,
        onClose: () => {
          if (callback) {
            callback();
          }
        }
      });
    };

    /**
     * 展示loading
     * showLoading
     */
    Vue.prototype.ShowLoading = function(message) {
      Toast.loading({
        mask: true,
        message: message,
        duration: 0
      });
    };

    /**
     * 隐藏loading
     * hideLoading
     */
    Vue.prototype.HideLoading = function() {
      Toast.clear();
    };

    /**
     * 返回上一页
     * -1,-2,-3
     *
     */
    Vue.prototype.Back = function() {
      this.$router.back(-1);
    };

    /**
     * 返回滚轮顶部
     *
     *
     */
    Vue.prototype.BackScrollTop = function() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 600);
    };

    /**
     * 获取当前时间
     *
     */

    Vue.prototype.GetCurrentDate = function() {
      let date = new Date();
      let seperator1 = '-';
      let seperator2 = ':';
      let month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    };

    /**
     * 存储cookie
     * name 存储key
     * value 存储值
     * time 过期时间戳
     *
     */
    Vue.prototype.SetCookie = function(name, value, time) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    };

    /**
     * 微信设置config
     */
    Vue.prototype._wxconfig = function() {
      this.$post(
        'common/getShareConf',
        { url: location.href },
        '',
        this,
        false
      ).then(response => {
        let data = response.data;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: data.jsApiList // 必填，需要使用的JS接口列表
        });
      });
    };

    Vue.prototype._configShare = function() {
      this._wxconfig();
      setTimeout(() => {
        this._wxshare();
      }, 1500);
    };

    /**
     * 微信分享朋友配置
     */
    Vue.prototype._wxshare = function() {
      let url = location.href.split('.com/')[0] + '.com/';
      let ocode = sessionStorage.getItem('ocode')
        ? sessionStorage.getItem('ocode')
        : '';
      wx.updateAppMessageShareData({
        title: '综合检测拒贷原因，我的网贷通过率翻了两倍！', // 分享标题
        desc: '网贷又被拒？快来看看究竟是什么原因！', // 分享描述
        link: `${url}index?uuid=${ocode}&time=${Math.round(
          new Date() / 1000
        )}&isLogin=1`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${url}static/images/shareImg.png`, // 分享图标
        success: function() {
          // 设置成功
        }
      });
      wx.updateTimelineShareData({
        title: '综合检测拒贷原因，我的网贷通过率翻了两倍！', // 分享标题
        desc: '网贷又被拒？快来看看究竟是什么原因！', // 分享描述
        link: `${url}index?uuid=${ocode}&time=${Math.round(
          new Date() / 1000
        )}&isLogin=1`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${url}static/images/shareImg.png`, // 分享图标
        success: function() {
          // 设置成功
        }
      });
    };

    /**
     * 调用起支付
     * type 支付类型，微信，支付宝
     */
    Vue.prototype.GoPay = function(data, types, that) {
      if (types == 'wexin') {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            appId: data.appId, //公众号名称，由商户传入
            timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: data.nonceStr, //随机串
            package: data.package,
            signType: data.signType, //微信签名方式:
            paySign: data.paySign //微信签名
          },
          function(res) {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              that.$router.push({
                path: '/callback/alipay'
              });
            } else {
              Toast('支付失败！');
            }
          }
        );
      }
    };
    /**
     *  兼容ios触发键盘后，元素错位
     *
     */
    Vue.prototype.scrollTo = function() {
      setTimeout(() => {
        let ua = navigator.userAgent.toLowerCase(),
          u = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (ua.match(/MicroMessenger/i) == 'micromessenger' && !!u) {
          //在iphone 微信中
          var currentPosition, timer;
          var speed = 1; //页面滚动距离
          timer = setInterval(function() {
            currentPosition =
              document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition -= speed;
            window.scrollTo(0, 0); //页面向上滚动
            clearInterval(timer);
          }, 1);
        }
      }, 200);
    };

    /**
     * 处理新闻数据
     *
     */
    Vue.prototype.GetNews = function(that) {
      let temp = [];
      window.news.forEach((item, index) => {
        item.icon = require(`../../../static/images/img_0${index + 1}.jpg`);
        temp.push(item);
      });
      that.news = temp;
    };

    /**
     *  AuthCode 短信倒计时
     *  sendAuthCode 发送状态
     *  authTime 倒计时时间
     *  value 验证手机号是否存在
     */
    Vue.prototype.AuthCode = function(value, key, other) {
      console.log(1);
      if (value) {
        if (!other) {
          var params = {
            phone: value,
            type: key
          };
        } else {
          var params = {
            phone: value,
            phone_type: other.phone_type,
            reqId: other.reqId
          };
        }
        this.$post(
          other ? other.url : 'common/getVerifyCode',
          params,
          '',
          this
        ).then(response => {
          this.codeGetting = false;
          if (response.code == '10000') {
            this.sendAuthCode = false;
            this.Toast('验证码发送成功！');
            let authTimetimer = setInterval(() => {
              this.authTime--;
              if (this.authTime <= 0) {
                this.sendAuthCode = true;
                this.authTime = 60;
                this.authTime = this.authTime;
                clearInterval(authTimetimer);
              }
            }, 1000);
          } else {
            this.sendAuthCode = true;
          }
        });
      } else {
        Toast('请输入手机号才能发送！');
      }
    };

    /**
     *  生成随机文字图片
     *  identifyCode 值
     *
     */
    Vue.prototype.MakeCode = function(o, l, that) {
      for (let i = 0; i < l; i++) {
        that.identifyCode +=
          that.identifyCodes[that.RandomNum(0, that.identifyCodes.length)];
      }
    };
    Vue.prototype.RandomNum = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    };

    /**
     *  获取用户token
     *  callback 回调
     *
     */
    Vue.prototype.GetToken = function(that, callback) {
      that
        .$get(
          'user/info',
          {
            code: this.$route.query.code ? this.$route.query.code : '',
            ocode: storage.getStorage('ocode')
              ? storage.getStorage('ocode')
              : ''
          },
          '',
          that,
          false
        )
        .then(response => {
          let str = response.data.ocode;
          let openId = str.substr(0, 6) + str.substr(12, str.length);
          let ocode =
            openId.substr(0, 8) +
            this.RandomRange(6, 6) +
            openId.substr(8, openId.length);
          storage.setStorage('ocode', ocode);
          storage.setStorage('user', response.data);
          if (!response.data.token) {
            window.location.href = `http://${window.location.host}`;
            return;
          }
          if (callback) {
            callback(response.data);
          }
        });
    };

    /**
     * 生成数字字母组合随机数
     */
    Vue.prototype.RandomRange = function(min, max) {
      var returnStr = '',
        range = max ? Math.round(Math.random() * (max - min)) + min : min,
        arr = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ];
      for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (arr.length - 1));
        returnStr += arr[index];
      }
      return returnStr;
    };
  }
};

export function ShowDialog(title, message, callback) {
  Dialog.alert({
    title: title ? title : '提示',
    message: message
  }).then(() => {
    if (callback) {
      callback();
    }
  });
}

/**
 * 展示loading
 * showLoading
 */
export function ShowLoading(message) {
  Toast.loading({
    mask: true,
    message: message,
    duration: 0
  });
}

/**
 * 隐藏loading
 * hideLoading
 */
export function HideLoading() {
  Toast.clear();
}

/**
 * 埋点统计
 * spetag 埋点字典
 * 3  小启查首页
 * 4  小启查首页-加强版按钮
 * 5  小启查首页-普通版按钮
 * 6  小启查首页-黑名单按钮
 * 7  小启查首页-京东报告按钮
 * 8  小启查首页-淘宝报告按钮
 * 9  加强版查询页-立即检测按钮
 * 10  普通版查询页-立即检测按钮
 * 11  黑名单查询页-立即检测按钮
 * 12  加强版-支付页面-支付按钮
 * 13  普通版-支付页面-支付按钮
 * 14  黑名单-支付页面-支付按钮
 * remark 备注信息
 */
export function Statistic(spetag, remark) {
  let params = {
    protag: 1,
    spetag: spetag,
    uniontag: storage.getStorage('ocode'),
    remark: remark
  };
  return new Promise((resolve, reject) => {
    axios.post(window.StatisticUrl + 'behavior_bi/read-in', params).then();
  });
}
