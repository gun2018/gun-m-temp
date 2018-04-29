import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { user } from '../../gqls/user';
import Loading from '../../components/Loading';
import { parseQuery } from '../../utils/tools';
import Avatar from '../../components/Avatar';
import px2rem from '../../styles/px2rem';
import Button from '../../components/Button';


const Warp = styled.div`
  width: 100%;
  > .button {
    margin: ${px2rem(38)} auto;
    display: block; 
  }
`
const Info = styled.div`
  padding-top: ${px2rem(38)};
  text-align: center;
  font-size: ${px2rem(10)};
  > .avatar {
    margin: 0 auto ${px2rem(38)};
  }
  > span {
    font-size: ${px2rem(28)};
    line-height: ${px2rem(48)};
  }
`;
const ActionItem = styled.div`
  > div {
    text-align: center;
    > span {
      padding: 0 ${px2rem(20)};
    }
  }
  > ul {
    padding-top: ${px2rem(38)};
  }
`;

class UserinfoCard extends Component {
  static propTypes = {
    userRes: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { user, loading } = this.props.userRes;
    if (loading) return <Loading />;
    console.log('user', user);
    return (
      <Warp>
        <Info>
          <Avatar className="avatar"
            src={user.avatarUrl}
            width={px2rem(106)}
            height={px2rem(106)}
            />
          <span>{user.nickname}</span>
          <p>{user.signText}</p>
        </Info>
        
        <Button className="button">
          关注
        </Button>
        <ActionItem>
          <div>
            <span>关注 {user.followerCount}</span>
            |
            <span>粉丝 {user.fanCount}</span>
          </div>
          <ul>
            <li>他创建的新闻({user.postCount})</li>
            <li>他跟进的新闻({user.commitCount})</li>
          </ul>
        </ActionItem>
      </Warp>
    )
  }
};
function select(state) {
  return {
    auth: state.auth,
  };
}
const wrapper = compose(
  graphql(user, {
    name: 'userRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { id: query.user_id },
      };
    },
  })
);

// 这样才能方便的拿到 auth
export default connect(select)(wrapper(UserinfoCard));
