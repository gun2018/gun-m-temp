import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Button } from 'antd-mobile';
import px2rem from '../../styles/px2rem';
import Input from '../../components/Input';

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
  background-color: rgba(0, 0, 0, 0.4);
  animation: 0.2s ${toTop} ease-in;
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
    return (
      <Wrap>
        <Input
          textareaWidth="90%"
          textareaHeight={px2rem(300)}
          placeholder="输入你的观点"
          setValue={this.setThinkingValue}
        />
        <Button onClick={this.handleClick}>提交观点</Button>
      </Wrap>
    );
  }
}
export default EditModal;
