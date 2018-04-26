import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import px2rem from '../../styles/px2rem';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';

const Tabs = styled.div`
  margin-top: ${px2rem(80)};
  color: #fff;
  font-size: ${px2rem(28)};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .active-tab {
    color: #ed642a;
  }
`;

const TabContent = styled.div`
  color: #fff;
`;

const tabList = [
  {
    key: 0,
    value: '待合并',
  },
  {
    key: 1,
    value: '已合并',
  },
  {
    key: -1,
    value: '已拒绝',
  },
];

class CommitList extends PureComponent {
  static propTypes = {
    togglePopUp: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    postPartCommits: PropTypes.array,
  };
  static defaultProps = {
    postPartCommits: [],
  };
  state = {
    activeTab: 1,
  };
  selectTab = itemValue => {
    this.setState({
      activeTab: itemValue,
    });
  };
  render() {
    const { togglePopUp, postPartCommits, toggleEdit } = this.props;
    const { activeTab } = this.state;
    const activePostPartCommits = postPartCommits.filter(
      postPartCommit => postPartCommit.status === activeTab
    );
    return (
      <div>
        <Tabs>
          {tabList.map(tab => (
            // eslint-disable-next-line
            <span
              onClick={() => {
                this.selectTab(tab.key);
              }}
              className={tab.key === activeTab ? 'active-tab' : ''}
              key={tab.key}
            >
              {tab.value}
            </span>
          ))}
        </Tabs>
        <TabContent>
          {activePostPartCommits.length === 0
            ? '无'
            : activePostPartCommits.map(postPartCommit => (
                // eslint-disable-next-line
                <div key={postPartCommit.id}>
                  <div>
                    <span>{postPartCommit.user.nickname}</span>
                    <Avatar src={postPartCommit.user.avatarUrl} />
                  </div>
                  {postPartCommit.commitName}
                </div>
              ))}
        </TabContent>
        <Button className="close" onClick={togglePopUp}>
          关闭
        </Button>
        <Button className="edit" onClick={toggleEdit}>
          编辑
        </Button>
      </div>
    );
  }
}

export default CommitList;
