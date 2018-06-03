import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { postPartCommits } from '../../gqls/post';
import Loading from '../../components/Loading';
import { COMMIT_STATUS } from '../../config/constant';
import px2rem from '../../styles/px2rem';

const Wrap = styled.div`
  font-size: 16px;
  > .item {
    padding: ${px2rem(10)} 0;
    border-bottom: 1px #eee solid;
  }
  .commit-name {
    color: #333;
    margin-right: ${px2rem(10)};
  }
  .status {
    font-weight: bold;
    color: #ed642a;
  }
  .time {
    text-align: right;
    font-size: 12px;
    color: #666;
  }
`;

class MyCommit extends Component {
  static propTypes = {
    postPartCommitsRes: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { postPartCommits, loading } = this.props.postPartCommitsRes;
    if (loading) return <Loading />;
    return (
      <Wrap>
        {postPartCommits.map(postPartCommit => (
          <div className="item" key={postPartCommit.id}>
            <span className="commit-name">{postPartCommit.commitName}</span>
            <span className="status">{COMMIT_STATUS[postPartCommit.status]}</span>
            <div className="time">{postPartCommit.createTime}</div>
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
