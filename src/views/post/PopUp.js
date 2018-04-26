import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import styled, { keyframes } from 'styled-components';
import px2rem from '../../styles/px2rem';
import PostEdit from './PostEdit';
import CommitList from './CommitList';
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
    isEdit: false,
  };
  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };
  render() {
    const { togglePopUp, selectPostPart, onPostPartCommitSubmit } = this.props;
    const { isEdit } = this.state;
    const { postPartCommits, loading } = this.props.postPartCommitsRes;
    if (loading)
      return (
        <Wrap>
          <Loading />
        </Wrap>
      );
    return (
      <Wrap>
        {isEdit ? (
          <PostEdit
            togglePopUp={togglePopUp}
            toggleEdit={this.toggleEdit}
            selectPostPart={selectPostPart}
            onPostPartCommitSubmit={onPostPartCommitSubmit}
          />
        ) : (
          <CommitList
            togglePopUp={togglePopUp}
            postPartCommits={postPartCommits}
            toggleEdit={this.toggleEdit}
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
