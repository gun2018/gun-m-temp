import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import router from './router.js';
import { checkAuth, wxLogin } from '../src/config/api';
import axios from '../src/utils/axios';
import { parseQuery } from '../src/utils/tools';
import { WX_APP_ID } from '../src/config/constant';

const history = createBrowserHistory();
const query = parseQuery(history.location.search);

const toWechatLoginPage = () => {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APP_ID}&redirect_uri=${encodeURIComponent(
    window.location.href
  )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
};

class App extends Component {
  static propTypes = {};
  state = {};
  async componentWillMount() {
    try {
      const checkAuthRes = await axios.get(checkAuth);
      // dispatch
      // return;
      if (checkAuthRes.data.access_token) return; // 登录成功
    } catch (error) {
      console.log(error);
    }
    const isWechat = /micromessenger/.test(
      window.navigator.userAgent.toLowerCase()
    );
    if (!isWechat) return; // 非微信环境
    const { code } = query;
    if (code) {
      // 给后台发送 code
      try {
        const wxLoginRes = await axios.post(wxLogin, {
          code,
        });
        console.log('wxLoginRes', wxLoginRes);
        return;
      } catch (error) {
        console.log('登录失败', error);
        alert('登录失败，刷新后重试');
        return;
      }
    }
    toWechatLoginPage();
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          {router.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
function select(state) {
  return {
    state,
  };
}

export default connect(select)(App);
