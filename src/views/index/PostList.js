import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon, Layout } from 'antd';

import { fromNow } from "../../utils/date";
import px2rem from '../../styles/px2rem';

const Post = styled(Link)`
  color: #444444;
  display: inline-block;
  border-bottom: 1px solid #ebebeb;
  height: ${px2rem(640)};
  width: 100%;
  border-bottom: 1px #EFEFF5 solid;
  margin-bottom: ${px2rem(70)};
`;
const Content = styled(Layout)`
  background-color: #FFF;
  width: ${px2rem(620)};
  height: 100%;
`
const Sider = styled(Layout)`
  width: ${px2rem(130)};
  height: 100%;
  padding: ${px2rem(40)};
  box-sizing: border-box;
  font-size: ${px2rem(28)};
  color: #C7C7D3;
  background-color: #FFF;
  > .icon {
    font-size: ${px2rem(32)};
    margin-bottom: ${px2rem(40)};
  }
  > span {
    margin-bottom: ${px2rem(36)};
  }
  > .icon-more {
    font-size: ${px2rem(32)};
    margin-top: ${px2rem(180)};
    transform: rotate(90deg);
  }
`
const CoverWrap = styled.div`
  width: 100%;
  height: ${px2rem(400)};
  position: relative;
  overflow: hidden;
  > img {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  > .title {
    width: 100%;
    height: ${px2rem(100)};
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    bottom: 0;
    color: #575656;
    padding-left: ${px2rem(188)};
    font-size: ${px2rem(28)};
  }
`;

class PostList extends PureComponent {
  static propTypes = {
    posts: PropTypes.array.isRequired
  };
  state = {
    test: 1
  };
  render() {
    console.log(this.state.test);
    const { posts } = this.props;
    return (
      <Fragment>
        {posts.map(post => (
          <Post key={post.id} to={`/post?post_id=${post.id}`}>
            <Layout hasSider="true" className="post-item">
              <Content className="content">
                <div>
                  <CoverWrap>
                    <img src={post.cover} alt="cover" />
                    <div className="title">
                      <h3>{post.title}</h3>
                    </div>
                  </CoverWrap>
                  <p className="breaf">{post.brief}</p>
                  <span>{fromNow(post.create_time)}</span>
                </div>
              </Content>
              <Sider className="sider" breakpoint="sm">
                <Icon type="heart" className="icon" />
                <span>285</span>
                <Icon type="message" className="icon" />
                <span>35</span>
                <Icon type="ellipsis" className="icon-more" />
              </Sider>
            </Layout>
          </Post>
        ))}
      </Fragment>
    );
  }
}
export default PostList;
