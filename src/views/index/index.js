import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import { posts } from '../../gqls/post';
import PostList from './PostList';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import px2rem from '../../styles/px2rem';
import { parseQuery } from '../../utils/tools';

const Container = styled.div`
  overflow: scroll;
  position: relative;
  margin-bottom: ${px2rem(100)};
  > .load {
    bottom: 0;
    height: 60px;
    width: 100%;
    background-color: red;
  }
  .add-post-btn {
    position: fixed;
    right: ${px2rem(30)};
    bottom: ${px2rem(200)};
  }
`;

const Topbar = styled.div`
  height: ${px2rem(140)};
  width: 100%;
  padding: ${px2rem(40)};
  > .icon {
    height: ${px2rem(60)};
    font-size: ${px2rem(34)};
    line-height: ${px2rem(60)};
    position: absolute;
    left: ${px2rem(46)};
    top: ${px2rem(30)};
    color: #c7c7d3;
  }
  > .avatar {
    position: absolute;
    right: ${px2rem(30)};
    top: ${px2rem(30)};
    width: ${px2rem(60)};
    height: ${px2rem(60)};
  }
  > .logo {
    display: block;
    margin: 0 auto;
    float: left;
  }
`;

const Search = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #000;
  height: ${px2rem(60)};
  width: ${px2rem(580)};
  text-indent: ${px2rem(44)};
  font-size: ${px2rem(30)};
`;

class Index extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
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

  state = {
    wd: this.query.wd || '',
    // isShowSearch: false,
  };
  onWdChange = e => {
    this.setState({
      wd: e.target.value,
    });
  };
  onWdSubmit = e => {
    const { wd } = this.state;
    e.preventDefault();
    this.props.history.push(`/?wd=${wd}`);
  };
  get query() {
    return parseQuery(this.props.location.search);
  }
  // showSearch = () => {
  //   this.setState({
  //     isShowSearch: !this.state.isShowSearch,
  //   });
  //   // this.props.history.push('/search');
  // };
  toNewPost = () => {
    this.props.history.push('/new-post');
  };

  render() {
    const { wd } = this.state;
    const { auth } = this.props;
    const { posts = [] } = this.props.postsRes;
    return (
      <Container>
        <Topbar>
          <Icon type="search" onClick={this.showSearch} className="icon" />
          <form action="" onSubmit={this.onWdSubmit}>
            <Search value={decodeURI(wd)} onChange={this.onWdChange} />
          </form>
          <Avatar src={auth.avatarUrl} className="avatar" />
        </Topbar>
        <PostList posts={posts} />
        {/* <Button className="add-post-btn" onClick={this.toNewPost}>
          增加文章
        </Button> */}
        {/* {isShowSearch && <Search />} */}
      </Container>
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
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { wd: query.wd ? decodeURI(query.wd) : '' },
      };
    },
  }),
  connect(select)
);

export default wrapper(Index);
