import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';
import { graphql, compose } from 'react-apollo';
// import { fromNow } from '../../utils/date';
import px2rem from '../../styles/px2rem';
import { deletePostLike, createPostLike } from '../../gqls/post';
import toast from '../../utils/toast';

const Post = styled(Link)`
  color: #444444;
  display: inline-block;
  border-bottom: 1px solid #ebebeb;
  height: ${px2rem(460)};
  width: 100%;
`;
const Content = styled(Layout)`
  background-color: #fff;
  width: ${px2rem(620)};
  > .info {
    width: 100%;
    height: ${px2rem(108)};
    position: relative;
    padding: ${px2rem(32)} 0 0 ${px2rem(164)};
    > .avatar {
      position: absolute;
      top: 0;
      left: ${px2rem(44)};
      transform: translateY(-50%);
      width: ${px2rem(80)};
      height: ${px2rem(80)};
      border-radius: 50%;
    }
    > .name {
      font-size: ${px2rem(28)};
      color: #212128;
    }
    > .time {
      font-size: ${px2rem(24)};
      color: #b2b2b2;
    }
  }
`;
const Sider = styled(Layout)`
  width: ${px2rem(130)};
  height: 100%;
  padding: ${px2rem(40)};
  box-sizing: border-box;
  font-size: ${px2rem(28)};
  color: #c7c7d3;
  background-color: #fff;
  text-align: center;
  > .icon {
    font-size: ${px2rem(32)};
    margin-bottom: ${px2rem(40)};
  }
  > span {
    margin-bottom: ${px2rem(36)};
  }
  > .icon-more {
    font-size: ${px2rem(32)};
    margin-top: ${px2rem(60)};
    transform: rotate(90deg);
  }
`;
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
    padding: ${px2rem(12)} ${px2rem(40)} 0 ${px2rem(188)};
    > h3 {
      color: #575656;
      font-size: ${px2rem(28)};
      height: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
`;

class PostList extends PureComponent {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    deletePostLike: PropTypes.func.isRequired,
    createPostLike: PropTypes.func.isRequired,
  };
  state = {};
  toggleLike = async (event, { id, isLike }) => {
    event.preventDefault();
    const { auth } = this.props;
    if (isLike) {
      // delete
      await this.props.deletePostLike({
        variables: {
          input: {
            postId: id,
          },
        },
      });
      toast('取消点赞成功');
    } else {
      // create
      await this.props.createPostLike({
        variables: {
          input: {
            userId: auth.id,
            postId: id,
            status: 1,
          },
        },
      });
      toast('点赞成功');
    }
  };
  render() {
    const { posts } = this.props;
    console.log('posts', posts);
    return (
      <Fragment>
        {posts.map(post => (
          <Post key={post.id} to={`/post?post_id=${post.id}`}>
            <Layout hasSider="true" className="post-item">
              <Content>
                <CoverWrap>
                  <img src={post.cover} alt="cover" />
                  <div className="title">
                    <h3>{post.title}</h3>
                  </div>
                </CoverWrap>
              </Content>
              <Sider className="sider" breakpoint="sm">
                <Icon
                  type="heart"
                  className="icon"
                  onClick={e => {
                    this.toggleLike(e, {
                      id: post.id,
                      isLike: post.isLike,
                    });
                  }}
                  style={{ color: post.isLike ? '#ed642a' : '' }}
                />
                <span>{post.likeCount}</span>
                <Icon type="message" className="icon" />
                <span>{post.thinkingCount}</span>
                <Icon type="ellipsis" className="icon-more" />
              </Sider>
            </Layout>
          </Post>
        ))}
      </Fragment>
    );
  }
}

const wrapper = compose(
  graphql(deletePostLike, {
    name: 'deletePostLike',
    options: {
      refetchQueries: ['posts'],
    },
  }),
  graphql(createPostLike, {
    name: 'createPostLike',
    options: {
      refetchQueries: ['posts'],
    },
  }),
  connect(select)
);

function select(state) {
  return {
    auth: state.auth,
  };
}

export default wrapper(PostList);
