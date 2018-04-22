import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import user from '../static/icon/user-circle.svg';
import px2rem from '../styles/px2rem';

const Wrap = styled.div`
  width: ${prop => prop.width};
  height: ${prop => prop.height};
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const Avatar = ({ src, width, height, className }) => (
  <Wrap width={width} height={height} className={className}>
    <img src={src || user} alt="avatar" />
  </Wrap>
);
Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};
Avatar.defaultProps = {
  width: px2rem(100),
  height: px2rem(100),
  className: '',
};
export default Avatar;
