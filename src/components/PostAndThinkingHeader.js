import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// import { parseQuery } from '../utils/tools';
import px2rem from '../styles/px2rem';

const Wrap = styled.div`
  padding: ${px2rem(40)} 0;
  text-align: center;
  .item {
    padding: ${px2rem(10)} ${px2rem(40)};
    border: 1px soid #000;
    color: #000;
  }
  .active {
    color: #ed642a;
  }
`;

class PostAndThinkingHeader extends PureComponent {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
  };
  state = {};
  // get query() {
  //   return parseQuery(this.props.location.search);
  // }
  render() {
    const { postId, activeTab } = this.props;
    return (
      <Wrap>
        <NavLink
          className={activeTab === 'post' ? 'active item' : 'item'}
          to={`/post?post_id=${postId}`}
        >
          文章
        </NavLink>
        <NavLink
          className={activeTab === 'thinking' ? 'active item' : 'item'}
          to={`/thinkings?post_id=${postId}`}
        >
          观点
        </NavLink>
      </Wrap>
    );
  }
}
export default PostAndThinkingHeader;
