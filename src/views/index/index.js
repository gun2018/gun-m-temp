import React, { Component, Fragment } from 'react';
import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import PostList from './PostList';
import { addCount, subCount } from '../../redux/actions/test';
import { posts } from '../../gqls/post';

class Index extends Component {
  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  async componentWillMount() {}
  render() {
    const { auth } = this.props;
    const { posts = [] } = this.props.posts;
    // const { test, dispatch } = this.props;
    return (
      <Fragment>
        <div>
          <img src={auth.headimgurl} alt="avator" />
        </div>
        {/* <Header>Index</Header> */}
        <PostList posts={posts} />
        <Button
          style={{ postion: 'fixed', left: 0, top: 0 }}
          // onClick={() => dispatch(subCount())}
        >
          -
        </Button>
        {/* <div>{test.count}</div> */}
        <Button
          style={{ postion: 'fixed', left: 0, top: 0 }}
          // onClick={() => dispatch(addCount())}
        >
          +
        </Button>
      </Fragment>
    );
  }
}

const wrapper = compose(
  graphql(posts, {
    name: 'posts',
  })
);
function select(state) {
  return {
    auth: state.auth,
  };
}

export default connect(select)(wrapper(Index));
