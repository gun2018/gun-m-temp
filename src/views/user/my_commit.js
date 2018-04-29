import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { postPartCommits } from '../../gqls/post';
import Loading from '../../components/Loading';
import { COMMIT_STATUS } from '../../config/constant';

const Wrap = styled.div``;

class MyCommit extends Component {
  static propTypes = {
    postPartCommitsRes: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { postPartCommits, loading } = this.props.postPartCommitsRes;
    if (loading) return <Loading />;
    console.log('postPartCommits', postPartCommits);
    return (
      <Wrap>
        {postPartCommits.map(postPartCommit => (
          <div key={postPartCommit.id}>
            <span>{postPartCommit.commitName}</span>
            <span>{COMMIT_STATUS[postPartCommit.status]}</span>
          </div>
        ))}
      </Wrap>
    );
  }
}
function select(state) {
  return {
    auth: state.auth,
  };
}
const wrapper = compose(
  graphql(postPartCommits, {
    name: 'postPartCommitsRes',
    options: props => {
      const userId = props.auth.id;
      return {
        variables: { userId },
      };
    },
  })
);

// 这样才能方便的拿到 auth
export default connect(select)(wrapper(MyCommit));
