import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PostDetail, PostHeader, PostMeta, PopUp } from './post.style';
import { fromNow } from '../../utils/date';
import axios from '../../utils/axios';

class Post extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }
  state = {
    post: null,
    isView: false
  };
  async componentWillMount() {
    const { params } = this.props.match;
    const PostData = await axios.get('/post', {
      params: {
        id: params.id
      }
    });
    this.setState({
      post: PostData.data
    });
  };
  checkView = () => {
    this.setState({ isView: true });
  };
  doubleClick = () => {
    console.log('双击事件');
  };
  longPress = () => {
    console.log('长按事件');
  }
  render() {
    const { post } = this.state;
    if(!post) return null;
    console.log(post);
    return (
      <Fragment>
        <PostHeader style={{backgroundImage: `url(${post.title.cover})`}}>
          <div className='title'>
            <h1>{post.title.title}</h1>
            <PostMeta>
              <span className="from-now">{fromNow(post.title.creata_time)}</span>
            </PostMeta>
          </div>
        </PostHeader>
        <PostDetail onClick={this.checkView}>
          <div dangerouslySetInnerHTML={{__html: post.detail.map((item) => (item.content)).join('')}} />
        </PostDetail>
        {this.state.isView && 
          <PopUp />
        }
      </Fragment>
    )
  }
};
export default Post;
