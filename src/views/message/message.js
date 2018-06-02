import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import px2rem from '../../styles/px2rem';
import Avatar from '../../components/Avatar';

// import { NavLink } from 'react-router-dom';

const Item = styled.div`
  border-top: 1px #ccc solid;
  width: 100%;
  height: ${px2rem(120)};
  padding: ${px2rem(15)} ${px2rem(30)};
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


const MESSAGE = [
  {
    users: '单身陆',    // 为了简单直接上名字的假数据
    time: '3小时前',
    content: '向您的文章发表了观点',
    href: '/thinkings?post_id=2',
    id: 0
  },
  {
    users: '美丽小妍妍',
    time: '5小时前',
    content: '向您的文章提交了合并请求',
    id: 1
  },
  {
    users: '美丽小妍妍',
    time: '8小时前',
    content: '您的提交已被合并/拒绝',
    id: 2
  },
  {
    users: '美丽小妍妍',
    time: '8小时前',
    content: '点赞了您的观点',
    href: '/post?post_id=2',
    id: 3
  },
  {
    users: '撸文',
    time: '8小时前',
    content: '您关注的新闻有新的进展',
    id: 4
  },
]

class Message extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3>消息列表</h3>
        <div>
          {MESSAGE.map(item => (
            <Item key={item.id}>
              <Avatar className="avatar"
                width={px2rem(80)}
                height={px2rem(80)}
                />
              <NavLink to="/user" className="content">
                <span className="user">{item.users}</span>
                <span className="action">{item.content}</span>
                <div className="time">{item.time}</div>
              </NavLink>
            </Item>
          ))}
        </div>
        
      </div>
    );
  }
}
export default Message;
