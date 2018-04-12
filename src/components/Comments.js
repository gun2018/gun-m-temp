import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Warp = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

class Comments extends PureComponent {
  render() {
    return (
      <Warp>
        <p>评论</p>
        <input />
        <div></div>
      </Warp>
    )
  }
}
export default Comments;