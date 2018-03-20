import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PostDetail, PostHeader, PostMeta } from './post.style';
import { fromNow } from '../../utils/date';
import axios from '../../utils/axios';
import PopUp from './PopUp';

let CLICK_COUNT = 0;
class Post extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }
  state = {
    post: null,
    isView: false,
    clickCount: 0,
    clickTimer: null
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
    console.log('00000')
    CLICK_COUNT ++;
    setTimeout(() => {
      if (CLICK_COUNT > 1) {
        console.log('双击事件');
        CLICK_COUNT = 0;
      } else if (CLICK_COUNT === 1) {
        this.setState({ isView: true });
        CLICK_COUNT = 0;          
      }
    }, 300)
  };
  longPress = (id) => {
    console.log('长按事件', id);
  };
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
        <PostDetail 
        onClick={this.checkView}
        onTouchStart={this.longPress(1)}
        onTouchEnd={this.longPress(2)}
        >
          <div dangerouslySetInnerHTML={{__html: post.detail.map((item) => (item.content)).join('')}} />
        </PostDetail>
        {this.state.isView && 
          <PopUp />
        }
      </Fragment>
    )
  };
};
export default Post;
