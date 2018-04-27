import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../components/Button';
import { getDiffHTML } from '../../utils/tools';

const Wrap = styled.div`
  ins {
    background: #5b7918;
    * {
      background: #5b7918;
    }
  }
  del {
    background: #ac1414;
    * {
      background: #ac1414;
    }
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
    console.log('selectCommit', selectCommit);
    const previousCommit = postPartCommits.find(
      commit => commit.seq === selectCommit.seq - 1
    );

    console.log('previousCommit', previousCommit);

    return (
      <Wrap>
        <div
          dangerouslySetInnerHTML={{
            __html: getDiffHTML(
              previousCommit ? previousCommit.content : '',
              selectCommit.content
            ),
          }}
        />
        <Button
          onClick={() => {
            onSelectComponent(1);
          }}
        >
          返回commit历史
        </Button>
      </Wrap>
    );
  }
}

export default CommitItem;
