import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { thinkings } from '../../gqls/thinking';
import Loading from '../../components/Loading';
import px2rem from '../../styles/px2rem';

const Wrap = styled.div`
  > .item {
    padding: ${px2rem(10)} 0;
    border-bottom: 1px #eee solid;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    > .nickname {
      font-weight: bold;
      color: #ed642a;
    }
    > .time {
      float: right;
      font-size: 12px;
      color: #666;
    }
    > .like {
      color: #666;
      float: left;
      > .icon {
        margin-right: ${px2rem(20)};
      }
    }
  }
`;

class MyThinking extends PureComponent {
  static propTypes = {
    thinkingsRes: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { thinkings, loading } = this.props.thinkingsRes;
    console.log('thinkings', thinkings);
    if (loading) return <Loading />;
    return (
      <Wrap>
        {thinkings.map(thinking => (
          <div key={thinking.id} className="item">
            <div className="nickname">{thinking.owner.nickname}</div>
            <div className="content">{thinking.content}</div>
            <div className="like">
              <Icon type="heart" className="icon" />
              <span>{thinking.likeCount}</span>
            </div>
            <span className="time">{thinking.createTime}</span>
          </div>
        ))}
      </Wrap>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}
const wrapper = compose(
  graphql(thinkings, {
    name: 'thinkingsRes',
    options: props => {
      const userId = props.auth.id;
      return {
        variables: { userId },
      };
    },
  })
);

// 这样才能方便的拿到 auth
export default connect(select)(wrapper(MyThinking));
