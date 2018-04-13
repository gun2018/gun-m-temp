import React, { Component, Fragment } from 'react';
import { Button } from 'antd-mobile';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import PostList from './PostList';
import { addCount, subCount } from '../../redux/actions/test';
import { posts } from '../../gqls/post';
import { Warp } from './index.style';
import Comments from '../../components/Comments'

class Index extends Component {
  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  
  async componentWillMount() {
    // const postData = await axios.get("/posts");
  };
  // componentDidMount() {
  //   // 触发
  //   window.addEventListener('scroll', this.onPulling);
  // };
  onPulling = (e) => {
    console.log('e', e)
    const documentHeight = document.documentElement.clientHeight;
    const bodyHeight = document.body.clientHeight;
    const scrollToper = document.documentElement.scrollTop;
    console.log('触发', documentHeight, bodyHeight, scrollToper, this);
  }; 
  render() {
    const { auth } = this.props;
    const { posts = [] } = this.props.posts;
    // const { test, dispatch } = this.props;
    return (
      <Fragment>
        <div>
          <Avatar src={auth.headimgurl} icon="user" />
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
          {/* <Header>Index</Header> */}
          <PostList 
          posts={posts}
          />
          {/* <div className="load">松开加载</div> */}
        </Warp>
        <Comments />
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
