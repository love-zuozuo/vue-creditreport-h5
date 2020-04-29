import axios from 'axios';
import {
  storage,
  ShowLoading,
  HideLoading,
  ShowDialog
} from './assets/js/util.js';

axios.defaults.timeout = 50000;

//http request 拦截器

axios.interceptors.request.use(
  config => {
    const user = storage.getStorage('user');
    if (user) {
      config.headers = {
        Authorization: 'Bearer ' + user.token
      };
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//统一处理返回结果
export function callbackData(response, that, callback) {
  let code = response.data.code;
  switch (code) {
    case 10000: //成功回调
      return '10000';
      break;
    case 20004:
      ShowDialog('提示', response.data.msg);
      return '20004';
      break;
    case 30002:
      ShowDialog('提示', response.data.msg, () => {
        window.location.href = `http://${window.location.host}`;
      });
      break;
    case 10005: //token过期
      that.GetToken(that, value => {
        window.location.reload();
      });
      break;
    case 10006: //微信用户授权失败，跳转去授权
      let hrefUrl = location.href;
      let item = `uuid=${
        that.$route.query.uuid ? that.$route.query.uuid : ''
      }&time=${that.$route.query.time ? that.$route.query.time : ''}&isLogin=${
        that.$route.query.isLogin ? that.$route.query.isLogin : 0
      }`;
      let url = `${hrefUrl}${hrefUrl.indexOf('?') != -1 ? '&' : '?'}${item}`;
      let redirect_uri = encodeURIComponent(url);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${response.data.data.aid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`;
      break;
    default:
      setTimeout(() => {
        that.Toast(response.data.msg, 4000);
      }, 1000);
      break;
  }
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}, callback, that, loading = true) {
  return new Promise((resolve, reject) => {
    if (loading) {
      ShowLoading('加载中');
    }
    axios
      .get(window.base + url, {
        params: params
      })
      .then(response => {
        HideLoading();
        let code = callbackData(response, that, callback);
        if (code == '10000' || code == '20004') {
          resolve(response.data);
        }
      })
      .catch(err => {
        ShowDialog('提示', '请求失败，请稍候再试！');
      })
      .finally(err => {
        HideLoading();
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, callback, that, loading = true) {
  return new Promise((resolve, reject) => {
    if (loading) {
      ShowLoading('加载中');
    }
    axios
      .post(window.base + url, data)
      .then(response => {
        HideLoading();
        let code = callbackData(response, that, callback);
        if (code == '10000' || code == '20004') {
          resolve(response.data);
        }
      })
      .catch(err => {
        ShowDialog('提示', '请求失败，请稍候再试！');
      })
      .finally(err => {
        HideLoading();
      });
  });
}
