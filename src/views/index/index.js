import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import PostList from './PostList';

const Header = styled.div`
  border-bottom: 1px solid #ccc;
`;

class Index extends Component {
  state = {
    posts: [
      {
        id: 1,
        title: '乐视网：贾跃亭所有股票质押式回购交易均已违约',
        brief: '乐视网发布晚间公告，在公告中称：截止目前，贾跃亭所有股票质押式回购交易已经远低于计算出的警戒线、平仓线数值，且贾跃亭所有股票质押式回购交易均已违约。',
        create_time: 'Thu Mar 01 2018 00:00:00 GMT+0800 (CST)',
        type: '',
        category: '新闻', // 新闻 八卦 追踪
        cover: 'http://cdn.pingwest.com/wp-content/uploads/2018/03/OPPO-R15-hero.png-222x0',
        status: 1,
      },
      {
        id: 2,
        title: '乐视网：贾跃亭所有股票质押式回购交易均已违约',
        brief: '乐视网发布晚间公告，在公告中称：截止目前，贾跃亭所有股票质押式回购交易已经远低于计算出的警戒线、平仓线数值，且贾跃亭所有股票质押式回购交易均已违约。',
        create_time: 'Tue Mar 06 2018 23:17:57 GMT+0800 (CST)',
        type: '',
        category: '新闻', // 新闻 八卦 追踪
        cover: 'http://cdn.pingwest.com/wp-content/uploads/2018/03/OPPO-R15-hero.png-222x0',
        status: 1,
      }
    ],
  };
  render() {
    console.log(this.state.posts);
    const { posts } = this.state;
    return (
      <Fragment>
        <Header>Index</Header>
        <PostList posts={posts} />
      </Fragment>
    )
  }
};
export default Index;
