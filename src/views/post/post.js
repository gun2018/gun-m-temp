import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { PostDetail, PostHeader, PostMeta } from './post.style';
import { fromNow } from '../../utils/date';
import PopUp from './PopUp';
import Loading from '../../components/Loading';
import { post } from '../../gqls/post';

let CLICK_COUNT = 0;
class Post extends Component {
  static propTypes = {
    postRes: PropTypes.object.isRequired,
    // match: PropTypes.object.isRequired
  };
  state = {
    post: null,
    isView: false,
  };
  checkView = () => {
    CLICK_COUNT++;
    setTimeout(() => {
      if (CLICK_COUNT > 1) {
        console.log('双击事件');
        CLICK_COUNT = 0;
      } else if (CLICK_COUNT === 1) {
        this.setState({ isView: true });
        CLICK_COUNT = 0;
      }
    }, 300);
  };
  longPress = id => {
    console.log('长按事件end');
  };
  aaa = a => {
    console.log('长按事件start');
  };
  render() {
    const { post, loading } = this.props.postRes;
    if (loading) return <Loading />;
    console.log(post);
    return (
      <Fragment>
        <PostHeader style={{ backgroundImage: `url(${post.title.cover})` }}>
          <div className="title">
            <h1>{post.title}</h1>
            <PostMeta>
              <span className="from-now">{fromNow(post.creatTime)}</span>
            </PostMeta>
          </div>
        </PostHeader>
        <PostDetail
          onClick={this.checkView}
          // onTouchStart={this.aaa(1)}
          // onTouchEnd={this.longPress(2)}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: post.detail.map(item => item.content).join(''),
            }}
          />
        </PostDetail>
        {this.state.isView && <PopUp />}
      </Fragment>
    );
  }
}

const wrapper = compose(
  graphql(post, {
    name: 'postRes',
    options: props => ({
      variables: { id: props.match.params.id },
    }),
  })
);

export default wrapper(Post);
