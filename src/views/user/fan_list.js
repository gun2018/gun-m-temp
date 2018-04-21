import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { fans } from '../../gqls/user';
import Loading from '../../components/Loading';
import Avatar from '../../components/Avatar';
import px2rem from '../../styles/px2rem';
import Button from '../../components/Button';

const Wrap = styled.div``;

class FanList extends Component {
  static propTypes = {
    // eslint-disable-next-line
    auth: PropTypes.object.isRequired,
    fansRes: PropTypes.object,
  };
  static defaultProps = {
    fansRes: [],
  };
  state = {};
  render() {
    const { fansRes } = this.props;
    const { fans, loading } = fansRes;
    if (loading) return <Loading />;
    if (!fans || fans.length === 0) return <div>还没有人关注你哦</div>;
    return (
      <Fragment>
        <div>粉丝列表</div>
        <Wrap>
          {fans.map(user => (
            <div key={user.info.id}>
              <span>{user.info.nickname}</span>
              <Avatar
                src={user.info.avatarUrl}
                width={px2rem(106)}
                height={px2rem(106)}
              />
              <p>{user.info.signText}</p>
              {/* {
                <Button
                  onClick={() => {
                    this.cancelFollow(user.id);
                  }}
                >
                  取消关注
                </Button>
              } */}
            </div>
          ))}
        </Wrap>
      </Fragment>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}

const wrapper = compose(
  connect(select), // 下面的 fans 才能拿到 auth
  graphql(fans, {
    name: 'fansRes',
    options: props => {
      const userId = props.auth.id;
      return {
        variables: { userId },
      };
    },
  })
);

export default wrapper(FanList);
