import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { followers, deleteFollower } from '../../gqls/user';
import Loading from '../../components/Loading';
import UserList from './UserList';

const Wrap = styled.div``;

class FollowerList extends Component {
  static propTypes = {
    // eslint-disable-next-line
    auth: PropTypes.object.isRequired,
    followersRes: PropTypes.object,
    deleteFollower: PropTypes.func.isRequired,
  };
  static defaultProps = {
    followersRes: [],
  };
  state = {
    listsType: 'follower'
  };

  cancelFollow = async id => {
    await this.props.deleteFollower({
      variables: {
        input: {
          id,
        },
      },
    });
  };
  render() {
    const { followersRes } = this.props;
    const { followers = [], loading } = followersRes;
    if (loading) return <Loading />;
    if (!followers || followers.length === 0)
      return <div>你还没有关注任何人哦</div>;
    return (
      <Fragment>
        <div>关注列表</div>
        <Wrap>
          <UserList lists={followers} listsType={this.state.listsType} />
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

const wrapper = compose(
  graphql(followers, {
    name: 'followersRes',
    options: props => {
      const userId = props.auth.id;
      return {
        variables: { userId },
      };
    },
  }),
  graphql(deleteFollower, {
    name: 'deleteFollower',
    options: {
      refetchQueries: ['followers'],
    },
  })
);

// 这样才能方便的拿到 auth
export default connect(select)(wrapper(FollowerList));
