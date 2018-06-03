import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { thinkings, createThinking } from '../../gqls/thinking';
import { thinkingPost } from '../../gqls/post';
import { createMessage } from '../../gqls/message';
import Button from '../../components/Button';
// import { NavLink } from 'react-router-dom';
import { parseQuery } from '../../utils/tools';
import Loading from '../../components/Loading';
import PostAndThinkingHeader from '../../components/PostAndThinkingHeader';
import EditModal from './EditModal';
import ThingkingList from './ThinkingList';
import { MESSAGE_TYPE } from '../../config/constant';

class Thingking extends Component {
  static propTypes = {
    thinkingsRes: PropTypes.object.isRequired,
    thinkingPostRes: PropTypes.object.isRequired,
    createThinking: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    createMessage: PropTypes.func.isRequired,
    // match: PropTypes.object.isRequired
  };
  state = {
    isShowEditModal: false,
  };
  onThinkingSubmit = async thinkingValue => {
    const { auth, thinkingPostRes } = this.props;
    const { post_id: postId } = this.query;
    const { title, authorId } = thinkingPostRes.post;
    try {
      await this.props.createThinking({
        variables: {
          input: {
            content: thinkingValue,
            userId: auth.id,
            postId,
            status: 1,
          },
        },
      });
      await this.props.createMessage({
        variables: {
          input: {
            giverId: auth.id,
            receiverId: authorId,
            content: `您的文章《${title}》收到了新的观点，点击进入该文章观点页`,
            type: MESSAGE_TYPE.GET_THINKING,
            url: `/thinkings?post_id=${postId}`,
            status: 1,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return;
    }
    this.toggleEditModal();
  };
  get query() {
    return parseQuery(this.props.location.search);
  }
  toggleEditModal = () => {
    this.setState({
      isShowEditModal: !this.state.isShowEditModal,
    });
  };
  render() {
    const { thinkings, loading } = this.props.thinkingsRes;
    const { isShowEditModal } = this.state;
    if (loading) return <Loading />;
    if (!thinkings) return <div>没有找到您需要的内容</div>;
    return (
      <div>
        <PostAndThinkingHeader
          activeTab="thinking"
          postId={this.query.post_id}
        />
        <ThingkingList thinkings={thinkings} />
        <Button
          onClick={this.toggleEditModal}
          // style={{ backgroundColor: '#ED642A', color: '#fff' }}
        >
          添加
        </Button>
        {isShowEditModal && (
          <EditModal
            toggleEditModal={this.toggleEditModal}
            onThinkingSubmit={this.onThinkingSubmit}
          />
        )}
      </div>
    );
  }
}

const wrapper = compose(
  graphql(thinkings, {
    name: 'thinkingsRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { postId: +query.post_id },
      };
    },
  }),
  graphql(thinkingPost, {
    name: 'thinkingPostRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { id: +query.post_id },
      };
    },
  }),
  graphql(createThinking, {
    name: 'createThinking',
    options: {
      refetchQueries: ['thinkings'],
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

export default wrapper(Thingking);
