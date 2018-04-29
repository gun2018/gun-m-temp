import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { user } from '../../gqls/user';
import Loading from '../../components/Loading';
import { parseQuery } from '../../utils/tools';

const Wrap = styled.div``;

class UserinfoCard extends Component {
  static propTypes = {
    userRes: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { user, loading } = this.props.userRes;
    if (loading) return <Loading />;
    console.log('user', user);
    return <Wrap />;
  }
}
function select(state) {
  return {
    auth: state.auth,
  };
}
const wrapper = compose(
  graphql(user, {
    name: 'userRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { id: query.user_id },
      };
    },
  })
);

// 这样才能方便的拿到 auth
export default connect(select)(wrapper(UserinfoCard));
