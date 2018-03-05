import React, { Component, Fragment } from 'react';

class Post extends Component {
  state = {
    test: 1
  };
  render() {
    console.log(this.state.test);
    return (
      <Fragment>
        <h1>post</h1>
      </Fragment>
    )
  }
};
export default Post;
