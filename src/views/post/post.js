import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import {
  PageWrap,
  PostWrap,
  PostDetail,
  PostHeader,
  PostMeta,
} from './post.style';
import { fromNow } from '../../utils/date';
import PopUp from './PopUp';
import Loading from '../../components/Loading';
import { post, crearePostPartCommit } from '../../gqls/post';
import PostAndThinkingHeader from '../../components/PostAndThinkingHeader';
import { parseQuery } from '../../utils/tools';

function escape(str) {
  return str.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

class Post extends Component {
  static propTypes = {
    postRes: PropTypes.object.isRequired,
    crearePostPartCommit: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  state = {
    isShowPopUp: false,
    selectPostPart: '',
  };
  // 似乎是无意义的阻止
  // componentWillReceiveProps(nextProps) {
  //   const nextQuery = parseQuery(nextProps.location.search);
  //   if (this.query.post_id === nextQuery.post_id) {
  //     return false;
  //   }
  //   return true;
  // }
  onPostPartCommitSubmit = async ({ content }) => {
    console.log('content', content);
    // await this.props.crearePostPartCommit({
    //   variables: {
    //     input: {},
    //   },
    // });
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
      selectPostPart: postPart.content,
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
    console.log('render');

    return (
      <PageWrap>
        <PostWrap>
          <PostAndThinkingHeader postId={this.query.post_id} />
          <PostHeader style={{ backgroundImage: `url(${post.title.cover})` }}>
            <div className="title">
              <h1>{post.title}</h1>
              <PostMeta>
                <span className="from-now">{fromNow(post.updateTime)}</span>
              </PostMeta>
            </div>
          </PostHeader>
          <PostDetail

          // onTouchStart={this.aaa(1)}
          // onTouchEnd={this.longPress(2)}
          >
            {post.detail.map(item => (
              <div key={item.id}>
                <span>{item.happenTime}</span>
                <div
                  onClick={() => {
                    this.postPartClick(item);
                  }}
                  dangerouslySetInnerHTML={{
                    __html: escape(item.content),
                  }}
                />
              </div>
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

const wrapper = compose(
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
  })
);

export default wrapper(Post);
