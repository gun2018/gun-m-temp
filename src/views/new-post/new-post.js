import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../components/Input';

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #fff;
  padding: 10px 20px;
`;

class NewPost extends Component {
  static propTypes = {};
  state = {};
  render() {
    return (
      <Wrap>
        <Input label="文章标题" />
        <Input label="文章简介" />
      </Wrap>
    );
  }
}

export default NewPost;
