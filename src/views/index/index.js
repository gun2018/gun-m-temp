import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';

import axios from '../../utils/axios';
import PostList from './PostList';

// const Header = styled.div`
//   border-bottom: 1px solid #ccc;
// `;

class Index extends Component {
  state = {
    posts: [],
  };
  async componentWillMount() {
    const postData = await axios.get('/posts');
    this.setState({
      posts: postData.data
    });
  };
  render() {

    console.log(this.state.posts);
    const { posts } = this.state;
    return (
      <Fragment>
        {/* <Header>Index</Header> */}
        <PostList posts={posts} />
      </Fragment>
    )
  }
};
export default Index;
