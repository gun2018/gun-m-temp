import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import {
  convertToRaw,
  // convertFromRaw,
  // CompositeDecorator,
  Editor,
  EditorState,
  // Modifier,
  RichUtils,
} from 'draft-js';
import styled from 'styled-components';
import px2rem from '../../styles/px2rem';
import StyleSelectBar from './StyleSelectBar';

const EditWrap = styled.div`
  min-height: ${px2rem(700)};
  border: 1px solid #fff;
  color: #fff;
  margin: ${px2rem(20)};
  padding: ${px2rem(14)};
  font-size: ${px2rem(50)};
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
    default:
      return null;
  }
}
class PostEdit extends PureComponent {
  state = {
    editorState: EditorState.createEmpty(),
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
    console.log('onChange', convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  };
  focus = () => this.editor.focus();
  render() {
    const { editorState } = this.state;
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
      </Fragment>
    );
  }
}
export default PostEdit;
