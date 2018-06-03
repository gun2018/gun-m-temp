import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { userPosts } from '../../gqls/post';
import Loading from '../../components/Loading';
import px2rem from '../../styles/px2rem';

const Wrap = styled.div``;

const PostItem = styled.div`
  padding: ${px2rem(10)} ${px2rem(20)};
  height: ${px2rem(200)};
  position: relative;
  .meta {
    color: #ed642a;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: ${px2rem(20)};
    > span {
      margin-left: ${px2rem(20)};
    }
  }
  > img {
    width: ${px2rem(240)};
    height: ${px2rem(180)};
    float: left;
    margin-right: ${px2rem(15)};
  }
`;

class MyPost extends PureComponent {
  static propTypes = {
    postsRes: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { posts, loading } = this.props.postsRes;
    if (loading) return <Loading />;
    return (
      <Wrap>
        {posts.map(post => (
          // eslint-disable-next-line
          <Link
            style={{ display: 'inlineBlock' }}
            key={post.id}
            to={`/user/post?post_id=${post.id}`}
          >
            <PostItem>
              <img src={post.cover} alt="cover" />
              <h3>{post.title}</h3>
              <div className="meta">
                <span>
                  提交数量: {post.titleCommitCount + post.contentCommitCount}
                </span>
                <span>观点数量：{post.thinkingCount}</span>
              </div>
            </PostItem>
          </Link>
        ))}
      </Wrap>
    ); 
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}
const wrapper = compose(
  graphql(userPosts, {
    name: 'postsRes',
    options: props => {
      const authorId = props.auth.id;
      return {
        variables: { authorId },
      };
    },
  })
);

// 这样才能方便的拿到 auth
export default connect(select)(wrapper(MyPost));
