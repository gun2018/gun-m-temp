import React, { Component, Fragment } from 'react';
// import { Button } from 'antd-mobile';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import PostList from './PostList';
import { posts } from '../../gqls/post';
import { Warp } from './index.style';
import Comments from '../../components/Comments';

class Index extends Component {
  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    postsRes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  // onPulling = e => {
  //   console.log('e', e);
  //   const documentHeight = document.documentElement.clientHeight;
  //   const bodyHeight = document.body.clientHeight;
  //   const scrollToper = document.documentElement.scrollTop;
  //   console.log('触发', documentHeight, bodyHeight, scrollToper, this);
  // };
  state = {};
  render() {
    const { auth } = this.props;
    const { posts = [] } = this.props.postsRes;
    return (
      <Fragment>
        <div>
          <Avatar src={auth.headimgurl} icon="user" />
        </div>
        <PostList posts={posts} />
        {/* </Warp> */}
        <Comments />
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
  graphql(posts, {
    name: 'postsRes',
  }),
  connect(select)
);

export default wrapper(Index);
