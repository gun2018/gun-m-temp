import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { getDiffHTML } from '../../utils/tools';
import px2rem from '../../styles/px2rem';
import { formateDate } from '../../utils/date';

const Wrap = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 0 ${px2rem(80)};
  ins {
    background: #b9e850;
    * {
      background: #b9e850;
    }
  }
  del {
    background: #e09090;
    * {
      background: #e09090;
    }
  }
  .back {
    position: absolute;
    left: ${px2rem(40)};
    top: ${px2rem(30)};
    font-size: ${px2rem(40)};
  }
  .commit-name {
    margin: ${px2rem(60)} 0 ${px2rem(20)};
  }
  .source {
    margin-top: ${px2rem(40)};
    box-sizing: border-box;
  }
`;

const UserWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: ${px2rem(120)};
  .user-info {
    margin-left: ${px2rem(40)};
  }
`;

const CommitContent = styled.div`
  box-sizing: border-box;
  color: #000;
  background-color: #fff;
  border-radius: ${px2rem(8)};
  padding: ${px2rem(40)} ${px2rem(30)};
  .commit-time {
    margin-top: ${px2rem(80)};
    font-size: ${px2rem(20)};
    color: #9f9fab;
  }
`;
class CommitItem extends PureComponent {
  static propTypes = {
    selectCommit: PropTypes.object,
    onSelectComponent: PropTypes.func.isRequired,
    postPartCommits: PropTypes.array,
  };
  static defaultProps = {
    selectCommit: {},
    postPartCommits: [],
  };
  state = {};
  render() {
    const { selectCommit, onSelectComponent, postPartCommits } = this.props;
    const previousCommit = postPartCommits.find(
      commit => commit.seq === selectCommit.seq - 1
    );
    return (
      <Wrap>
        <span
          className="back"
          onClick={() => {
            onSelectComponent(1);
          }}
        >
          &lt;
        </span>
        <UserWrap>
          <Avatar src={selectCommit.user.avatarUrl} />
          <div className="user-info">
            <span>{selectCommit.user.nickname}</span>
            <p>{selectCommit.user.signText}</p>
          </div>
        </UserWrap>
        <p className="commit-name">{selectCommit.commitName}: </p>
        <CommitContent>
          <div
            dangerouslySetInnerHTML={{
              __html: getDiffHTML(
                previousCommit ? previousCommit.content : '',
                selectCommit.content
              ),
            }}
          />
          <div className="commit-time">
            <p>
              提交于:{' '}
              {formateDate(selectCommit.createTime, 'YYYY/MM/DD HH:mm:ss')}
            </p>
            <p>
              合并于:{' '}
              {formateDate(selectCommit.updateTime, 'YYYY/MM/DD HH:mm:ss')}
            </p>
          </div>
        </CommitContent>
        <p className="source">信息来源: {selectCommit.source}</p>
      </Wrap>
    );
  }
}

export default CommitItem;
