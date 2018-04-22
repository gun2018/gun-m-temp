import React, { Component, Fragment } from 'react';
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
import { post } from '../../gqls/post';
import PostAndThinkingHeader from '../../components/PostAndThinkingHeader';
import { parseQuery } from '../../utils/tools';

function escape(str) {
  return str.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

class Post extends Component {
  static propTypes = {
    postRes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };
  state = {
    isShowPopUp: false,
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
  render() {
    const { post, loading } = this.props.postRes;
    const { isShowPopUp } = this.state;
    if (loading) return <Loading />;
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
            onClick={this.togglePopUp}
            // onTouchStart={this.aaa(1)}
            // onTouchEnd={this.longPress(2)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: escape(post.detail.map(item => item.content).join('')),
              }}
            />
          </PostDetail>
        </PostWrap>
        <PopUp isShowPopUp={isShowPopUp} togglePopUp={this.togglePopUp} />
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
  })
);

export default wrapper(Post);
