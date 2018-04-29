import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import px2rem from '../../styles/px2rem';

const Wrap = styled.div`
  box-sizing: border-box;
  padding: 0 ${px2rem(10)};
  display: flex;
  flex-flow: row nowrap;
  .active {
    color: #ed642a;
  }
  .tab-item {
    width: 20%;
    text-align: center;
    box-sizing: border-box;
  }
`;

const tabsContent = [
  {
    key: 'post',
    label: '文章',
  },
  {
    key: 'commit',
    label: '提交',
  },
  {
    key: 'thinking',
    label: '观点',
  },
  {
    key: 'comment',
    label: '评论',
  },
  {
    key: 'follow',
    label: '关注',
  },
];

class ActionTabs extends PureComponent {
  static propTypes = {
    onActionTabClick: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired,
  };
  state = {};
  render() {
    const { onActionTabClick, activeTab } = this.props;
    return (
      <Wrap>
        {tabsContent.map(tab => (
          // eslint-disable-next-line
          <div
            onClick={() => {
              onActionTabClick(tab.key);
            }}
            className={activeTab === tab.key ? 'active tab-item' : 'tab-item'}
          >
            {tab.label}
          </div>
        ))}
      </Wrap>
    );
  }
}

export default ActionTabs;
