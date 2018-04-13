import React from 'react';
import styled from 'styled-components';

const Warp = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  text-align: center;
  line-height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 99;
`;


const Loading = (prpps) => (
  <Warp>{prpps.co}</Warp>
)

export default Loading;