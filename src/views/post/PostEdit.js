import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import {
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  Editor,
  EditorState,
  Modifier,
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
  font-size: ${px2rem(100)};
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

class PostEdit extends PureComponent {
  state = {
    editorState: EditorState.createEmpty(),
  };
  onInlineTypeSelect = typeName => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    const nextContentState = Object.keys(editorStyleMap).reduce(
      (contentState, type) =>
        Modifier.removeInlineStyle(contentState, selection, type),
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce(
        (state, color) => RichUtils.toggleInlineStyle(state, color),
        nextEditorState
      );
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(typeName)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, typeName);
    }
    this.onChange(nextEditorState);

    // this.onChange(RichUtils.toggleInlineStyle(editorState, typeName));
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
            customStyleMap={editorStyleMap}
            editorState={editorState}
            ref={el => {
              this.editor = el;
            }}
            onChange={this.onChange}
          />
        </EditWrap>
        <StyleSelectBar onInlineTypeSelect={this.onInlineTypeSelect} />
      </Fragment>
    );
  }
}
export default PostEdit;
