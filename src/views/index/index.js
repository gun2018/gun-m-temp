import React, { Component, Fragment } from "react";
import { Button } from "antd-mobile";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import { connect } from "react-redux";

import axios from "../../utils/axios";
import PostList from "./PostList";
import { addCount, subCount } from "../../redux/actions/test";

// const Header = styled.div`
//   border-bottom: 1px solid #ccc;
// `;

class Index extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    test: PropTypes.object.isRequired
  };
  static defaultProps = {};
  state = {
    posts: []
  };
  async componentWillMount() {
    const postData = await axios.get("/posts");
    this.setState({
      posts: postData.data
    });
  }
  render() {
    const { posts } = this.state;
    const { test, dispatch } = this.props;
    return (
      <Fragment>
        {/* <Header>Index</Header> */}
        <PostList posts={posts} />
        <Button
          style={{ postion: "fixed", left: 0, top: 0 }}
          onClick={() => dispatch(subCount())}
        >
          -
        </Button>
        <div>{test.count}</div>
        <Button
          style={{ postion: "fixed", left: 0, top: 0 }}
          onClick={() => dispatch(addCount())}
        >
          +
        </Button>
      </Fragment>
    );
  }
}
function select(state) {
  return {
    test: state.test,
    auth: state.auth
  };
}
export default connect(select)(Index);
