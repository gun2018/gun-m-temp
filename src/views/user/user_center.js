import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import Avatar from '../../components/Avatar';
import px2rem from '../../styles/px2rem';

const UserInfo = styled.div``;

class UserCenter extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { auth } = this.props;
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
          <p>
            <NavLink to="/my-post">我发起的文章</NavLink>
          </p>
          <p>
            <NavLink to="/my-commit">我提交的合并请求</NavLink>
          </p>
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
