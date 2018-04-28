import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../components/Button';
import px2rem from '../../styles/px2rem';
// import { formateDate } from '../../utils/date';

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
  .commit-name {
    margin: ${px2rem(60)} 0 ${px2rem(20)};
  }
  .source {
    margin-top: ${px2rem(40)};
    box-sizing: border-box;
  }
`;

const CommitContent = styled.div`
  box-sizing: border-box;
  color: #000;
  background-color: #fff;
  border-radius: ${px2rem(8)};
  padding: ${px2rem(40)} ${px2rem(30)};
`;

class CommitDiff extends PureComponent {
  static propTypes = {
    editDiffObj: PropTypes.object,
    onCommitDiffConfirm: PropTypes.func.isRequired,
  };
  static defaultProps = {
    editDiffObj: {},
  };
  state = {};
  render() {
    const { editDiffObj, onCommitDiffConfirm } = this.props;
    console.log('editDiffObj', editDiffObj);
    return (
      <Wrap>
        <p className="commit-name">提交简介：{editDiffObj.commitName}</p>
        <CommitContent>
          <div dangerouslySetInnerHTML={{ __html: editDiffObj.diffHTML }} />
        </CommitContent>
        <p className="source">信息来源：{editDiffObj.source}</p>
        <Button onClick={onCommitDiffConfirm}>确认提交</Button>
      </Wrap>
    );
  }
}

export default CommitDiff;
