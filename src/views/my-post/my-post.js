import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import px2rem from '../../styles/px2rem';
import { postPartCommits } from '../../gqls/post';
import { parseQuery } from '../../utils/tools';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

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

const TabContent = styled.div``;

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
  };
  state = {
    activeTab: 0,
  };
  selectTab = itemValue => {
    this.setState({
      activeTab: itemValue,
    });
  };
  mergePostPartCommit = async postPartCommit => {
    console.log('postPartCommit', postPartCommit);
  };
  render() {
    const { postPartCommits, loading } = this.props.postPartCommitsRes;
    const { activeTab } = this.state;
    if (loading) return <Loading />;
    const activePostPartCommits = postPartCommits.filter(
      postPartCommit => postPartCommit.status === activeTab
    );
    console.log('activePostPartCommits', activePostPartCommits);
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
          {activePostPartCommits.map(activePostPartCommit => (
            <div key={activePostPartCommit.id}>
              <h3>{activePostPartCommit.commitName}</h3>
              {activeTab === 0 && (
                <Button
                  onClick={() => {
                    this.mergePostPartCommit(activePostPartCommit);
                  }}
                >
                  合并
                </Button>
              )}
            </div>
          ))}
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
  })
);

export default Wrapper(MyPost);
