import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
// import { Button } from 'antd-mobile';
import Button from '../../components/Button';
import px2rem from '../../styles/px2rem';
import Textarea from '../../components/Textarea';

const toTop = keyframes`
  0% {
    top: 100vh;
  }
  100% {
    top: 0;
  }
`;

const Wrap = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: ${px2rem(100)};
  background-color: rgba(0, 0, 0, 0.4);
  animation: 0.2s ${toTop} ease-in;
  .submit {
    position: absolute;
    right: ${px2rem(50)};
    top: ${px2rem(500)};
  }
`;

class EditModal extends PureComponent {
  static propTypes = {
    toggleEditModal: PropTypes.func.isRequired,
    onThinkingSubmit: PropTypes.func.isRequired,
  };
  state = {
    thinkingValue: '',
  };
  setThinkingValue = e => {
    this.setState({
      thinkingValue: e.target.innerHTML,
    });
  };
  handleClick = () => {
    const { onThinkingSubmit } = this.props;
    const { thinkingValue } = this.state;
    onThinkingSubmit(thinkingValue);
  };
  render() {
    const { thinkingValue } = this.state;
    const { toggleEditModal } = this.props;
    const isCanSubmit = thinkingValue.length === 0;
    return (
      <Wrap>
        <Textarea
          textareaWidth="90%"
          textareaHeight={px2rem(300)}
          placeholder="输入你的观点"
          setValue={this.setThinkingValue}
        />
        <Button
          className="submit"
          disabled={isCanSubmit}
          onClick={this.handleClick}
          style={{
            fontSize: '16px',
          }}
        >
          提交观点
        </Button>
        <Button onClick={toggleEditModal} shape="circle" type="close" />
      </Wrap>
    );
  }
}
export default EditModal;
