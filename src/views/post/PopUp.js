import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Warp = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

class PopUp extends PureComponent {
  render() {
    return (
      <Warp>

      </Warp>
    )
  } 
}
export default PopUp;