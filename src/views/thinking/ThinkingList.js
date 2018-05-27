import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import { fromNow } from '../../utils/date';
import px2rem from '../../styles/px2rem';

const Wrap = styled.div`
  padding: 0 ${px2rem(30)};
`;

const ThinkingItem = styled.div`
  padding-bottom: ${px2rem(20)};
  border-bottom: 1px solid #ed642a;
  margin-bottom: ${px2rem(20)};
  .user-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  .user-info-name {
    margin-left: ${px2rem(20)};
  }
  .content {
    padding: ${px2rem(20)};
  }
`;

const OtherInfo = styled.div`
  color: #ccc;
`;

class ThinkingList extends PureComponent {
  static propTypes = {
    thinkings: PropTypes.array,
  };
  static defaultProps = {
    thinkings: [],
  };
  state = {};
  render() {
    const { thinkings } = this.props;
    return (
      <Wrap>
        {thinkings.map(thinking => (
          <ThinkingItem key={thinking.id}>
            <div className="user-info">
              <Avatar
                width={px2rem(50)}
                height={px2rem(50)}
                src={thinking.owner.avatarUrl}
              />
              <span className="user-info-name">{thinking.owner.nickname}</span>
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: thinking.content }}
            />
            <OtherInfo>
              <span>{thinking.isLike ? '1' : '0'}</span>
              <span>{thinking.likeCount}</span>
              <span>{fromNow(thinking.updateTime)}</span>
            </OtherInfo>
          </ThinkingItem>
        ))}
      </Wrap>
    );
  }
}
export default ThinkingList;
