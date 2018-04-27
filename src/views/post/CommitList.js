import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import px2rem from '../../styles/px2rem';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { formateDate } from '../../utils/date';

const Tabs = styled.div`
  margin-top: ${px2rem(80)};
  margin-bottom: ${px2rem(120)};
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

const Item = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: ${px2rem(24)};
  box-sizing: border-box;
  padding: 0 ${px2rem(64)};
  align-items: flex-end;
  .commit-info {
    flex: 1;
    margin-left: ${px2rem(16)};
    padding: ${px2rem(16)} ${px2rem(28)};
    color: #000;
    background-color: #fff;
    border-radius: 8px;
    .user-wrap {
      margin-bottom: ${px2rem(30)};
      .nickname {
        font-size: ${px2rem(26)};
        color: #555567;
      }
      .update-time {
        font-size: ${px2rem(18)};
        margin-left: ${px2rem(6)};
        color: #555567;
      }
    }
    .commit-name {
      margin-bottom: 0;
      font-size: ${px2rem(30)};
    }
  }
`;

class CommitList extends PureComponent {
  static propTypes = {
    togglePopUp: PropTypes.func.isRequired,
    onSelectComponent: PropTypes.func.isRequired,
    onCommitItemClick: PropTypes.func.isRequired,
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
    const {
      togglePopUp,
      postPartCommits,
      onSelectComponent,
      onCommitItemClick,
    } = this.props;
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
                <Item
                  key={postPartCommit.id}
                  onClick={() => {
                    onCommitItemClick(postPartCommit);
                  }}
                >
                  <Avatar src={postPartCommit.user.avatarUrl} />
                  <div className="commit-info">
                    <div className="user-wrap">
                      <span className="nickname">
                        {postPartCommit.user.nickname}
                      </span>
                      <span className="update-time">
                        {formateDate(postPartCommit.updateTime, 'YYYY/MM/DD')}
                      </span>
                    </div>
                    <p className="commit-name">{postPartCommit.commitName}</p>
                  </div>
                </Item>
              ))}
        </TabContent>
        <Button className="close" onClick={togglePopUp}>
          关闭
        </Button>
        <Button
          className="edit"
          onClick={() => {
            onSelectComponent(2);
          }}
        >
          编辑
        </Button>
      </div>
    );
  }
}

export default CommitList;
