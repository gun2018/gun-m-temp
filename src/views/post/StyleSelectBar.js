import React, { PureComponent, Fragment } from 'react';
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
  { key: 1, label: 'B', styleName: 'Bold', title: '加粗' },
  { key: 2, label: 'I', styleName: 'Italic', title: '斜体' },
];

class StyleSelectBar extends PureComponent {
  static propTypes = {
    onInlineTypeSelect: PropTypes.func.isRequired,
  };
  state = {};
  render() {
    return (
      <BarWrap>
        {INLINE_TYPE.map(item => (
          <Button
            key={item.key}
            onMouseDown={e => {
              e.preventDefault();
              this.props.onInlineTypeSelect(item.styleName);
            }}
          >
            {item.title}
          </Button>
        ))}
        {}
      </BarWrap>
    );
  }
}
export default StyleSelectBar;
