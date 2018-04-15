import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { parseQuery } from '../utils/tools';
// import px2rem from '../styles/px2rem';

class PostAndThinkingHeader extends PureComponent {
  static propTypes = {
    postId: PropTypes.string.isRequired,
  };
  state = {};
  // get query() {
  //   return parseQuery(this.props.location.search);
  // }
  render() {
    const { postId } = this.props;
    return (
      <div>
        <NavLink to={`/post?post_id=${postId}`}>内容</NavLink>
        <NavLink to={`/thinkings?post_id=${postId}`}>观点</NavLink>
      </div>
    );
  }
}
export default PostAndThinkingHeader;
