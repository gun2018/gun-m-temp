import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import styled, { keyframes, css } from 'styled-components';
import Button from '../../components/Button';
import px2rem from '../../styles/px2rem';
import PostEdit from './PostEdit';
import { postPartCommits } from '../../gqls/post';
import { parseQuery } from '../../utils/tools';
import Loading from '../../components/Loading';
import Avatar from '../../components/Avatar';

const FadeIn = keyframes`
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: 0.2s ${FadeIn} ease-in;
  background: rgba(0, 0, 0, 0.5);
  .close {
    position: absolute;
    left: ${px2rem(30)};
    bottom: ${px2rem(200)};
  }
  .edit {
    position: absolute;
    right: ${px2rem(30)};
    bottom: ${px2rem(200)};
  }
`;

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

class PopUp extends PureComponent {
  static propTypes = {
    togglePopUp: PropTypes.func,
    selectPostPart: PropTypes.string,
    onPostPartCommitSubmit: PropTypes.func.isRequired,
    postPartCommitsRes: PropTypes.object.isRequired,
  };
  static defaultProps = {
    togglePopUp: () => {},
    selectPostPart: '',
  };
  state = {
    activeTab: 1,
    isEdit: false,
  };
  selectTab = itemValue => {
    this.setState({
      activeTab: itemValue,
    });
  };
  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };
  render() {
    const { togglePopUp, selectPostPart, onPostPartCommitSubmit } = this.props;
    const { activeTab, isEdit } = this.state;
    const { postPartCommits, loading } = this.props.postPartCommitsRes;
    if (loading)
      return (
        <Wrap>
          <Loading />
        </Wrap>
      );
    const activePostPartCommits = postPartCommits.filter(
      postPartCommit => postPartCommit.status === activeTab
    );
    return (
      <Wrap>
        {isEdit ? (
          <PostEdit
            toggleEdit={this.toggleEdit}
            selectPostPart={selectPostPart}
            onPostPartCommitSubmit={onPostPartCommitSubmit}
          />
        ) : (
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
            <Button className="edit" onClick={this.toggleEdit}>
              编辑
            </Button>
          </div>
        )}
      </Wrap>
    );
  }
}

const wrapper = compose(
  graphql(postPartCommits, {
    name: 'postPartCommitsRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { postPartId: query.post_part_id },
      };
    },
  })
);

export default wrapper(PopUp);
