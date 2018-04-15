import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import router from './router.js';
import { checkAuth, wxLogin, simulateLogin } from '../src/config/api';
import axios from '../src/utils/axios';
import { parseQuery } from '../src/utils/tools';
import { WX_APP_ID } from '../src/config/constant';
import { setUserInfo } from '../src/redux/actions/auth';

import FooterBar from './components/FooterBar';

const history = createBrowserHistory();
const query = parseQuery(history.location.search);

const toWechatLoginPage = () => {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APP_ID}&redirect_uri=${encodeURIComponent(
    window.location.href
  )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
};

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  state = {};
  async componentWillMount() {
    try {
      const checkAuthRes = await axios.get(checkAuth);
      if (checkAuthRes.data.open_id) {
        this.props.dispatch(setUserInfo(checkAuthRes.data));
        return; // 登录成功
      }
    } catch (error) {
      console.log(error);
    }

    const isWechat = /micromessenger/.test(
      window.navigator.userAgent.toLowerCase()
    );
    if (!isWechat) {
      // 非微信环境暂时模拟登陆，之后直接return
      try {
        const simulateLoginRes = await axios.get(simulateLogin);
        this.props.dispatch(setUserInfo(simulateLoginRes.data));
      } catch (error) {
        console.log('模拟登陆失败: ', error);
      }
      return;
    }

    const { code } = query;
    if (code) {
      // 给后台发送 code
      try {
        const wxLoginRes = await axios.post(wxLogin, {
          code,
        });
        this.props.dispatch(setUserInfo(wxLoginRes.data));
        return;
      } catch (error) {
        console.log('登录失败', error);
        alert('登录失败，刷新后重试', error);
        return;
      }
    }
    toWechatLoginPage();
  }
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <Switch>
            {router.map(
              ({ path, exact, isShowFooter, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  render={props => (
                    <Fragment>
                      <Component {...props} />
                      {isShowFooter && <FooterBar />}
                    </Fragment>
                  )}
                  exact={exact}
                />
              )
            )}
            <Redirect to="/" />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
function select(state) {
  return {
    state,
  };
}

export default connect(select)(App);
