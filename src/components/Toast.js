import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fade from './Fade';
import detect from '../utils/detect';
import px2rem from '../styles/px2rem';

let isDesktop = false;

if (process.browser && detect().browser.desktop) {
  isDesktop = true;
}

const ToastWrap = styled.div`
  position: fixed;
  top: 70%;
  left: 50%;
  padding: ${isDesktop ? '16px 25px' : `${px2rem(25)} ${px2rem(35)}`};
  background: rgba(0, 0, 0, 0.7);
  transform: translate(-50%, -50%);
  border-radius: ${isDesktop ? '26px' : px2rem(100)};
  text-align: center;
  z-index: 99999;
`;

const Text = styled.span`
  font-size: ${isDesktop ? '16px' : px2rem(28)};
  line-height: ${isDesktop ? '16px' : px2rem(28)};
  color: #fff;
`;

const Toast = ({ text }) => (
  <Fade in duration="0.2s">
    <ToastWrap>
      <Text>{text}</Text>
    </ToastWrap>
  </Fade>
);

Toast.propTypes = {
  text: PropTypes.string,
};

Toast.defaultProps = {
  text: '',
};

export default Toast;
