import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';
import {
  // convertToRaw,
  // convertFromRaw,
  // CompositeDecorator,
  Editor,
  EditorState,
  // Modifier,
  RichUtils,
} from 'draft-js';
import styled from 'styled-components';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import px2rem from '../../styles/px2rem';
import StyleSelectBar from './StyleSelectBar';
import Button from '../../components/Button';

const EditWrap = styled.div`
  min-height: ${px2rem(700)};
  border: 1px solid #fff;
  color: #fff;
  margin: ${px2rem(20)};
  padding: ${px2rem(14)};
  font-size: ${px2rem(30)};
  h2 {
    margin-bottom: 0 !important;
    color: #fff;
  }
  .RichEditor-blockquote {
    background-color: red;
  }
`;

// 行样式映射
const editorStyleMap = {
  // 字体
  Bold: {
    fontWeight: '600',
  },
  Italic: {
    fontStyle: 'italic',
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    // case 'header-two':
    //   return 'tttttttt'; // 通过这样的方式加样式
    default:
      return null;
  }
}
class PostEdit extends PureComponent {
  static propTypes = {
    selectPostPart: PropTypes.object,
    onEditResultSubmit: PropTypes.func.isRequired,
    togglePopUp: PropTypes.func.isRequired,
  };
  static defaultProps = {
    selectPostPart: {},
  };
  state = {
    editorState:
      this.props.selectPostPart && this.props.selectPostPart.content
        ? EditorState.createWithContent(
            convertFromHTML(this.props.selectPostPart.content)
          )
        : EditorState.createEmpty(),
    // editorState: EditorState.createEmpty(),
    commitName: '',
    source: '',
  };
  onInlineTypeSelect = typeName => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, typeName)
    );
  };
  onBlockTypeSelect = typeName => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, typeName));
  };
  onChange = editorState => {
    // console.log('onChange', convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  };
  onSubmit = async () => {
    const { editorState, source, commitName } = this.state;
    if (!source) {
      Toast.info('请填写信息来源');
      return;
    }
    const content = convertToHTML(editorState.getCurrentContent());
    await this.props.onEditResultSubmit({
      content,
      source,
      commitName,
    });
  };
  setSource = e => {
    this.setState({
      source: e.target.value,
    });
  };
  serCommmitName = e => {
    this.setState({
      commitName: e.target.value,
    });
  };
  focus = () => this.editor.focus();
  render() {
    const { togglePopUp } = this.props;
    const { editorState, source, commitName } = this.state;
    // console.log('editorState', editorState);
    return (
      <Fragment>
        <EditWrap onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={editorStyleMap}
            editorState={editorState}
            ref={el => {
              this.editor = el;
            }}
            onChange={this.onChange}
          />
        </EditWrap>
        <StyleSelectBar
          onInlineTypeSelect={this.onInlineTypeSelect}
          onBlockTypeSelect={this.onBlockTypeSelect}
        />
        <div style={{ color: '#fff' }}>
          信息来源：
          <textarea
            value={source}
            onChange={this.setSource}
            placeholder="输入信息来源"
            style={{ color: '#000' }}
          />
        </div>
        <div>
          提交简介：<input
            value={commitName}
            onChange={this.serCommmitName}
            placeholder="为你的提交想一个总结名吧！"
            style={{ color: '#000' }}
          />
        </div>
        <Button onClick={this.onSubmit}>提交</Button>
        <Button onClick={togglePopUp}>关闭</Button>
      </Fragment>
    );
  }
}
export default PostEdit;
