import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import Avatar from '../../components/Avatar';

// import { NavLink } from 'react-router-dom';

class UserCenter extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { auth } = this.props;
    console.log('auth', auth);
    return (
      <div>
        <Avatar src={auth.headimgurl} />
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
