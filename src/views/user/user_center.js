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

const UserInfo = styled.div``;

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
      <div>
        <UserInfo>
          <Avatar
            src={auth.avatarUrl}
            width={px2rem(212)}
            height={px2rem(212)}
          />
          <p>{auth.nickname}</p>
          <p>{auth.signText}</p>
          <div>
            <NavLink to="/fans">粉丝: {auth.fanCount}</NavLink>
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
      </div>
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
