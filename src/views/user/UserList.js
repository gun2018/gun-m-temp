import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import px2rem from '../../styles/px2rem';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';


const List = styled.div`
  width: 100%;
  height: ${px2rem(120)};
  padding: ${px2rem(20)};
  box-sizing: border-box;
  > .avatar {
    float: left;
  }
  > .info {
    float: left;
    margin-left: ${px2rem(20)};
    line-height: ${px2rem(40)};
  }
  > .button {
    float: right;
    margin-top: ${px2rem(40)};
    transform: translateY(-50%);
  }
`;

class UserList extends PureComponent {
  static propTypes = {
    followers: PropTypes.array.isRequired,
  };
  state = {};
  render() {
    const { followers } = this.props;
    console.log('followers', this.followers);
    return (
      <Fragment>
        {/* {followers.map(user => (
          <List key={user.info.id}>
            <Avatar className="avatar"
              src={user.info.avatarUrl}
              width={px2rem(80)}
              height={px2rem(80)}
              />
            <div className="info">
              <span>{user.info.nickname}</span>
              <p>{user.info.signText}</p>
            </div>
            {
              <Button className="button"
                onClick={async () => {
                  await this.cancelFollow(user.id);
                }}
              >
                取消关注
              </Button>
            }
          </List>
        ))} */}
      </Fragment>
    )
  }
}

export default UserList;