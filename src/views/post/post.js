import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fromNow, formateDate } from '../../utils/date';
import PopUp from './PopUp';
import Loading from '../../components/Loading';
import { post, crearePostPartCommit } from '../../gqls/post';
import { createMessage } from '../../gqls/message';
import PostAndThinkingHeader from '../../components/PostAndThinkingHeader';
import { parseQuery } from '../../utils/tools';
import px2rem from '../../styles/px2rem';
import { MESSAGE_TYPE } from '../../config/constant';

const PageWrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PostWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const PostHeader = styled.h1`
  font-size: ${px2rem(30)};
  padding: 0 ${px2rem(80)};
  margin-bottom: ${px2rem(50)};
`;

const PostDetail = styled.div`
  padding: ${px2rem(30)} ${px2rem(20)} 0;
`;
const PostDetailItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  .date {
    color: #ed642a;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    line-height: ${px2rem(50)};
    font-size: ${px2rem(16)};
    &::before {
      content: '';
      display: inline-block;
      width: ${px2rem(22)};
      height: ${px2rem(22)};
      border-radius: 50%;
      background-color: #ed642a;
      order: 1;
    }
    &::after {
      margin-bottom: ${px2rem(10)};
      flex: 1;
      order: 2;
      content: '';
      display: inline-block;
      width: 1px;
      /* height: 100%; */
      background-color: #e7e7f0;
    }
  }
  .content {
    font-size: ${px2rem(24)};
    font-weight: 600;
    margin: ${px2rem(-30)} 0 ${px2rem(60)} ${px2rem(20)};
    p {
      margin-bottom: ${px2rem(14)};
    }
    img {
      width: 100%;
    }
  }
`;
function escape(str) {
  return str.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

class Post extends Component {
  static propTypes = {
    postRes: PropTypes.object.isRequired,
    crearePostPartCommit: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    createMessage: PropTypes.func.isRequired,
  };
  state = {
    isShowPopUp: false,
    selectPostPart: null,
  };
  // 似乎是无意义的阻止
  // componentWillReceiveProps(nextProps) {
  //   const nextQuery = parseQuery(nextProps.location.search);
  //   if (this.query.post_id === nextQuery.post_id) {
  //     return false;
  //   }
  //   return true;
  // }
  onPostPartCommitSubmit = async ({ content, source, commitName }) => {
    const { selectPostPart } = this.state;
    const { auth } = this.props;
    await this.props.crearePostPartCommit({
      variables: {
        input: {
          content,
          source,
          commitName,
          postId: this.query.post_id,
          userId: auth.id,
          postPartId: selectPostPart.id,
          seq: selectPostPart.mergeCount + 1,
          status: 0,
        },
      },
    });
    // await this.props.createMessage({
    //   variables: {
    //     input: {
    //       giverId: auth.id,
    //       receiverId: post.authorId,
    //       content: `您的文章《${
    //         post.title
    //       }》收到了新的合并请求，点击进入我的文章页`,
    //       type: MESSAGE_TYPE.GET_THINKING,
    //       url: ``,
    //       status: 1,
    //     }
    //   }
    // })
  };
  get query() {
    return parseQuery(this.props.location.search);
  }
  togglePopUp = () => {
    this.setState({
      isShowPopUp: !this.state.isShowPopUp,
    });
  };
  // longPress = id => {
  //   console.log('长按事件end');
  // };
  // aaa = a => {
  //   console.log('长按事件start');
  // };
  postPartClick = postPart => {
    const { pathname } = this.props.history.location;

    this.setState({
      selectPostPart: postPart,
    });
    this.props.history.push(
      `${pathname}?post_id=${this.query.post_id}&post_part_id=${postPart.id}`
    );
    this.togglePopUp();
  };
  render() {
    const { post, loading } = this.props.postRes;
    const { isShowPopUp, selectPostPart } = this.state;
    const { location } = this.props;
    if (loading) return <Loading />;

    return (
      <PageWrap>
        <PostWrap>
          <PostAndThinkingHeader activeTab="post" postId={this.query.post_id} />
          <PostHeader>{post.title}</PostHeader>
          <PostDetail

          // onTouchStart={this.aaa(1)}
          // onTouchEnd={this.longPress(2)}
          >
            {post.detail.map(item => (
              <PostDetailItem key={item.id}>
                <div className="date">
                  {formateDate(item.happenTime, 'YYYY/MM/DD')}
                </div>
                <div
                  className="content"
                  onClick={() => {
                    this.postPartClick(item);
                  }}
                  dangerouslySetInnerHTML={{
                    __html: escape(item.content),
                  }}
                />
              </PostDetailItem>
            ))}
          </PostDetail>
        </PostWrap>
        {isShowPopUp && (
          <PopUp
            isShowPopUp={isShowPopUp}
            togglePopUp={this.togglePopUp}
            selectPostPart={selectPostPart}
            onPostPartCommitSubmit={this.onPostPartCommitSubmit}
            location={location}
          />
        )}
      </PageWrap>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}

const wrapper = compose(
  connect(select),
  graphql(post, {
    name: 'postRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { id: query.post_id },
      };
    },
  }),
  graphql(crearePostPartCommit, {
    name: 'crearePostPartCommit',
    options: {
      refetchQueries: ['postPartCommits'],
    },
  }),
  graphql(createMessage, {
    name: 'createMessage',
  })
);

export default wrapper(Post);
