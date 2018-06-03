import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import { connect } from 'react-redux';
import px2rem from '../../styles/px2rem';
import {
  postPartCommits,
  mergePostPartCommit,
  updatePostPartCommit,
} from '../../gqls/post';
import { createMessage } from '../../gqls/message';
import { MESSAGE_TYPE } from '../../config/constant';
import { parseQuery } from '../../utils/tools';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';

const Tabs = styled.div`
  margin-top: ${px2rem(80)};
  margin-bottom: ${px2rem(120)};
  color: #000;
  font-size: ${px2rem(28)};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .active-tab {
    color: #ed642a;
  }
`;

const TabContent = styled.div`
  padding: ${px2rem(38)};
  .content {
    height: ${px2rem(70)};
    overflow: hidden;
    /* &::after {
      display: inline-block;
      content: '...';
      color: #000;
      width: ${px2rem(30)};
    } */
  }
`;

const UserInfo = styled.div``;

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

class MyPost extends Component {
  static propTypes = {
    postPartCommitsRes: PropTypes.object.isRequired,
    mergePostPartCommit: PropTypes.func.isRequired,
    updatePostPartCommit: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
  };
  state = {
    activeTab: 1,
  };
  onMergePostPartCommit = async postPartCommit => {
    const { id, postPartId, seq, content, userId, post } = postPartCommit;
    const { auth } = this.props;
    await this.props.mergePostPartCommit({
      variables: {
        input: {
          postPartId,
          postPartCommitId: id,
          seq,
          content,
        },
      },
    });
    await this.props.createMessage({
      variables: {
        input: {
          giverId: auth.id,
          receiverId: userId,
          content: `您在《${
            post.title
          }》下的合并请求被同意合并了，点击查看文章详情`,
          type: MESSAGE_TYPE.COMMIT_RES,
          url: `/post?post_id=${post.id}`,
          status: 1,
        },
      },
    });
  };
  onRejectPostPartCommit = async postPartCommit => {
    const { auth } = this.props;
    const { userId, post } = postPartCommit;
    await this.props.updatePostPartCommit({
      variables: {
        input: {
          id: postPartCommit.id,
          status: -1,
        },
      },
    });
    await this.props.createMessage({
      variables: {
        input: {
          giverId: auth.id,
          receiverId: userId,
          content: `您在《${
            post.title
          }》下的合并请求被拒绝合并了，点击查看文章详情`,
          type: MESSAGE_TYPE.COMMIT_RES,
          url: `/post?post_id=${post.id}`,
          status: 1,
        },
      },
    });
  };
  selectTab = itemValue => {
    this.setState({
      activeTab: itemValue,
    });
  };
  render() {
    const { postPartCommits, loading } = this.props.postPartCommitsRes;
    const { activeTab } = this.state;
    if (loading) return <Loading />;
    const activePostPartCommits = postPartCommits.filter(
      postPartCommit => postPartCommit.status === activeTab
    );
    console.log(postPartCommits);
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
          {activePostPartCommits.length > 0
            ? activePostPartCommits.map(activePostPartCommit => (
                // eslint-disable-next-line
                <div key={activePostPartCommit.id}>
                  <UserInfo>
                    <Avatar src={activePostPartCommit.user.avatarUrl} />
                    <span>{activePostPartCommit.user.nickname}</span>
                  </UserInfo>
                  <h3>{activePostPartCommit.commitName}</h3>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: activePostPartCommit.content,
                    }}
                  />
                  {activeTab === 0 && (
                    <Fragment>
                      <Button
                        onClick={() => {
                          this.onMergePostPartCommit(activePostPartCommit);
                        }}
                      >
                        合并
                      </Button>
                      <Button
                        onClick={() => {
                          this.onRejectPostPartCommit(activePostPartCommit);
                        }}
                      >
                        拒绝
                      </Button>
                    </Fragment>
                  )}
                </div>
              ))
            : '无'}
        </TabContent>
      </div>
    );
  }
}

const Wrapper = compose(
  graphql(postPartCommits, {
    name: 'postPartCommitsRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { postId: query.id },
      };
    },
  }),
  graphql(mergePostPartCommit, {
    name: 'mergePostPartCommit',
    options: {
      refetchQueries: ['postPartCommits'],
    },
  }),
  graphql(updatePostPartCommit, {
    name: 'updatePostPartCommit',
    options: {
      refetchQueries: ['postPartCommits'],
    },
  }),
  graphql(createMessage, {
    name: 'createMessage',
  }),
  connect(select)
);

function select(state) {
  return {
    auth: state.auth,
  };
}

export default Wrapper(MyPost);
