import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import styled, { keyframes } from 'styled-components';
import px2rem from '../../styles/px2rem';
import PostEdit from './PostEdit';
import CommitList from './CommitList';
import CommitItem from './CommitItem';
import { postPartCommits } from '../../gqls/post';
import { parseQuery } from '../../utils/tools';
import Loading from '../../components/Loading';

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
  color: #fff;
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
const componentObj = {
  COMMIT_LIST: 1,
  POST_EDIT: 2,
  COMMIT_ITEM: 3,
};

class PopUp extends PureComponent {
  static propTypes = {
    togglePopUp: PropTypes.func.isRequired,
    selectPostPart: PropTypes.string,
    onPostPartCommitSubmit: PropTypes.func.isRequired,
    postPartCommitsRes: PropTypes.object.isRequired,
  };
  static defaultProps = {
    selectPostPart: '',
  };
  state = {
    activeComponent: componentObj.COMMIT_LIST,
    selectCommit: null,
  };
  onCommitItemClick = commitItem => {
    this.setState({
      selectCommit: commitItem,
    });
    this.onSelectComponent(componentObj.COMMIT_ITEM);
  };
  onSelectComponent = value => {
    this.setState({
      activeComponent: value,
    });
  };
  render() {
    const { togglePopUp, selectPostPart, onPostPartCommitSubmit } = this.props;
    const { activeComponent, selectCommit } = this.state;
    const { postPartCommits, loading } = this.props.postPartCommitsRes;
    if (loading)
      return (
        <Wrap>
          <Loading />
        </Wrap>
      );
    return (
      <Wrap>
        {activeComponent === componentObj.POST_EDIT && (
          <PostEdit
            togglePopUp={togglePopUp}
            selectComponent={this.selectComponent}
            selectPostPart={selectPostPart}
            onPostPartCommitSubmit={onPostPartCommitSubmit}
          />
        )}
        {activeComponent === componentObj.COMMIT_LIST && (
          <CommitList
            togglePopUp={togglePopUp}
            postPartCommits={postPartCommits}
            onSelectComponent={this.onSelectComponent}
            onCommitItemClick={this.onCommitItemClick}
          />
        )}
        {activeComponent === componentObj.COMMIT_ITEM && (
          <CommitItem
            selectCommit={selectCommit}
            onSelectComponent={this.onSelectComponent}
            postPartCommits={postPartCommits}
          />
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
