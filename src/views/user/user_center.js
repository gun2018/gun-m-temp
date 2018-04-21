import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import Avatar from '../../components/Avatar';
import px2rem from '../../styles/px2rem';
import { NavLink } from 'react-router-dom';

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
            <NavLink to="/fans">
              <span>粉丝: {auth.fanCount}</span>
            </NavLink>
            <NavLink to="/followers">
              <span>关注: {auth.followerCount}</span>
            </NavLink>
          </div>
        </UserInfo>
        <h3>个人中心</h3>
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
