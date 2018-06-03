import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import px2rem from '../styles/px2rem';

const Wrap = styled.div`
  padding: ${px2rem(40)} 0 ${px2rem(30)};
  border-bottom: 1px solid #e1e1e1;
  font-size: ${px2rem(36)};
  display: flex;
  .label {
    display: inline-block;
    color: #444444;
    margin-right: ${px2rem(30)};
    ::after {
      display: inline-block;
      content: '';
      background-color: ${props =>
        props.hasLeftBorder ? '#979797' : 'transparent'};
      height: ${px2rem(30)};
      width: 1px;
      margin-left: ${px2rem(30)};
    }
  }
  .input-wrap {
    flex: 1;
  }
  input {
    color: #444444;
    font-size: ${px2rem(36)};
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: transparent;
    width: 100%;
  }
`;

function Input({ label, hasLeftBorder, ...otherProps }) {
  return (
    <Wrap hasLeftBorder={hasLeftBorder}>
      {label && <div className="label">{label}</div>}
      <div className="input-wrap">
        <input {...otherProps} />
      </div>
    </Wrap>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  hasLeftBorder: PropTypes.bool,
};

Input.defaultProps = {
  label: '',
  hasLeftBorder: false,
};

export default Input;
