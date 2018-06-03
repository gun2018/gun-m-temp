import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import px2rem from '../../styles/px2rem';
import Avatar from '../../components/Avatar';
import { messages, updateMessage } from '../../gqls/message';
import { fromNow } from '../../utils/date';
import Loading from '../../components/Loading';
// import { NavLink } from 'react-router-dom';

const Title = styled.h3`
  margin-top: 0.5em;
  text-align: center;
`;

const Item = styled.div`
  border-top: 1px #ccc solid;
  width: 100%;
  padding: ${px2rem(15)} ${px2rem(40)};
  position: relative;
  > .avatar {
    float: left;
    margin-right: ${px2rem(30)};
  }
  > .content {
    color: #333;
    > .user {
      font-size: 14px;
      line-height: 24px;
      color: #555;
      margin-right: ${px2rem(5)};
    }
    > .action {
      font-size: 14px;
      line-height: 24px;
      font-weight: bold;
      color: #333;
    }
    > .time {
      color: #aaa;
      line-height: 16px;
    }
  }
`;

const Unread = styled.div`
  width: ${px2rem(14)};
  height: ${px2rem(14)};
  border-radius: 50%;
  background-color: red;
  position: absolute;
  right: ${px2rem(30)};
  top: ${px2rem(70)};
`;

class Message extends Component {
  static propTypes = {
    messagesRes: PropTypes.object.isRequired,
    updateMessage: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };
  state = {};
  onMessageClick = async message => {
    if (message.status === 1) {
      await this.props.updateMessage({
        variables: {
          input: {
            id: message.id,
            status: 0,
          },
        },
      });
    }
    this.props.history.push(message.url);
  };
  render() {
    const { messages, loading } = this.props.messagesRes;
    if (loading) return <Loading />;
    console.log('messagesRes', messages);
    return (
      <div>
        <Title>消息列表</Title>
        <div>
          {messages.map(message => (
            <Item
              key={message.id}
              onClick={() => {
                this.onMessageClick(message);
              }}
            >
              <Avatar
                className="avatar"
                width={px2rem(80)}
                height={px2rem(80)}
                src={message.giver.avatarUrl}
              />
              {message.status === 1 && <Unread />}
              {/* <NavLink to="/user" className="content"> */}
              <span className="user">{message.giver.nickname}</span>
              <span className="action">{message.content}</span>
              <div className="time">{fromNow(message.createTime)}</div>
              {/* </NavLink> */}
            </Item>
          ))}
        </div>
      </div>
    );
  }
}

const Wrapper = compose(
  graphql(messages, {
    name: 'messagesRes',
    options: props => {
      const receiverId = props.auth.id;
      return {
        variables: { receiverId },
      };
    },
  }),
  graphql(updateMessage, {
    name: 'updateMessage',
  })
);

function select(state) {
  return {
    auth: state.auth,
  };
}
export default connect(select)(Wrapper(Message));
