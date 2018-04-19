import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import Avatar from '../../components/Avatar';
import px2rem from '../../styles/px2rem';
// import { NavLink } from 'react-router-dom';

const Wrap = styled.div``;

// 关注列表 及 粉丝列表
class UserList extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  state = {};
  get isFans() {
    return this.props.history.location.pathname.includes('fans');
  }
  render() {
    const { auth } = this.props;
    const { isFans } = this;
    const renderData = isFans ? auth.fans : auth.followers;
    return (
      <Fragment>
        <div>{isFans ? '粉丝列表' : '关注列表'}</div>
        <Wrap>
          {renderData.map(user => (
            <div key={user.id}>
              <span>{user.nickname}</span>
              <p>{user.signText}</p>
              <Avatar
                src={user.avatarUrl}
                width={px2rem(106)}
                height={px2rem(106)}
              />
            </div>
          ))}
        </Wrap>
      </Fragment>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}

const wrapper = compose(connect(select));
export default wrapper(UserList);
