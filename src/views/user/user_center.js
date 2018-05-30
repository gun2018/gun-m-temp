import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import Avatar from '../../components/Avatar';
import px2rem from '../../styles/px2rem';
import ActionTabs from './ActionTabs';
import MyPost from './MyPost';
import MyCommit from './MyCommit';
import MyThinking from './MyThinking';

const Wrap = styled.div`
  padding: ${px2rem(20)} ${px2rem(20)};
`;
const UserInfo = styled.div`
  > .avatar {
    margin: ${px2rem(20)} auto;
  }
  > .nickname {
    text-align: center;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    line-height: 26px;
  }
  > .sign-text {
    text-align: center;
    font-size: 12px;
    color: #666;
  }
  > .social {
    margin: ${px2rem(5)} auto ${px2rem(10)};
    font-size: 12px;
    text-align: center;
    > a {
      color: #333;
      margin: 0 ${px2rem(5)};
    }
  }
`;

class UserCenter extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  state = {
    activeTab: 'post',
  };
  onActionTabClick = activeTab => {
    this.setState({
      activeTab,
    });
  };
  render() {
    const { auth } = this.props;
    const { activeTab } = this.state;
    return (
      <Wrap>
        <UserInfo>
          <Avatar
            className="avatar"
            src={auth.avatarUrl}
            width={px2rem(100)}
            height={px2rem(100)}
          />
          <p className="nickname">{auth.nickname}</p>
          <p className="sign-text">{auth.signText}</p>
          <div className="social">
            <NavLink to="/fans">粉丝: {auth.fanCount}</NavLink> | 
            <NavLink to="/followers">关注: {auth.followerCount}</NavLink>
          </div>
        </UserInfo>
        <div>
          <ActionTabs
            onActionTabClick={this.onActionTabClick}
            activeTab={activeTab}
          />
          {activeTab === 'post' && <MyPost />}
          {activeTab === 'commit' && <MyCommit />}
          {activeTab === 'thinking' && <MyThinking />}
          {activeTab === 'comment' && <div />}
          {activeTab === 'follow' && <div />}
        </div>
      </Wrap>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}

const wrapper = compose(connect(select));
export default wrapper(UserCenter);
