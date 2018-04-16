import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Button } from 'antd-mobile';
import px2rem from '../styles/px2rem';

const Warp = styled.div`
  width: ${props => props.width};
  min-height: ${props => props.height};
  max-height: ${px2rem(700)};
  background-color: rgba(0, 0, 0, 0.7);
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  /* text-align: center; */
  .fakeInput {
    width: 100%;
    min-height: ${props => props.height};
    overflow: auto;
    /* height: 100; */
    outline: none;
    border: none;
    padding: 18px;
    font-size: 20px;
    color: #fff;
  }
`;

class Input extends PureComponent {
  render() {
    const { textareaWidth, textareaHeight, setValue, ...others } = this.props;
    return (
      <Warp width={textareaWidth} height={textareaHeight}>
        <div
          className="fakeInput"
          onInput={setValue}
          contentEditable
          type="text"
          {...others}
        />
        {/* <Button onClick={this.addImgTest}>插张图片</Button> */}
      </Warp>
    );
  }
}

Input.propTypes = {
  textareaWidth: PropTypes.string,
  textareaHeight: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};
Input.defaultProps = {
  textareaWidth: '100%',
  textareaHeight: '4rem',
};

export default Input;
