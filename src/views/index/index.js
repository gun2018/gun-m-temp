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
  };
  static defaultProps = {};
  async componentWillMount() {
    console.log('index', this.props);
    // toWechatLoginPage();
    // const postData = await axios.get("/posts");
  }
  render() {
    const { posts = [] } = this.props.posts;
    // const { test, dispatch } = this.props;
    return (
      <Fragment>
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
// function select(state) {
//   return {
//     test: state.test,
//     auth: state.auth
//   },
// };

export default wrapper(Index);
