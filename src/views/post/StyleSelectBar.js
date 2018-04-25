import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import px2rem from '../../styles/px2rem';
import Button from '../../components/Button';

const BarWrap = styled.div`
  button {
    margin-right: ${px2rem(20)};
  }
`;

const INLINE_TYPE = [
  { key: 1, label: 'B', style: 'Bold', title: '加粗' },
  { key: 2, label: 'I', style: 'Italic', title: '斜体' },
];
const BLOCK_TYPES = [
  { label: 'H2', style: 'header-two' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
];

class StyleSelectBar extends PureComponent {
  static propTypes = {
    onInlineTypeSelect: PropTypes.func.isRequired,
    onBlockTypeSelect: PropTypes.func.isRequired,
  };
  state = {};
  render() {
    return (
      <BarWrap>
        <div>
          {INLINE_TYPE.map(item => (
            <Button
              key={item.key}
              onMouseDown={e => {
                e.preventDefault();
                this.props.onInlineTypeSelect(item.style);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div>
          {BLOCK_TYPES.map(item => (
            <Button
              key={item.label}
              onMouseDown={e => {
                e.preventDefault();
                this.props.onBlockTypeSelect(item.style);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </BarWrap>
    );
  }
}
export default StyleSelectBar;
