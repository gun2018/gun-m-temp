import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import Button from '../../components/Button';
import px2rem from '../../styles/px2rem';
import PostEdit from './PostEdit';

const FadeIn = keyframes`
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: 0.2s ${FadeIn} ease-in;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  ${props =>
    props.isShowPopUp &&
    css`
      display: block;
    `};
  .close {
    position: absolute;
    left: ${px2rem(30)};
    bottom: ${px2rem(200)};
  }
  .edit {
    position: absolute;
    right: ${px2rem(30)};
    bottom: ${px2rem(200)};
  }
`;

const Tabs = styled.div`
  margin-top: ${px2rem(80)};
  color: #fff;
  font-size: ${px2rem(28)};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .active-tab {
    color: #ed642a;
  }
`;

const TabContent = styled.div``;

const tabList = [
  {
    key: 0,
    value: '待合并',
  },
  {
    key: 1,
    value: '已合并',
  },
  {
    key: 2,
    value: '已拒绝',
  },
];

class PopUp extends PureComponent {
  static propTypes = {
    isShowPopUp: PropTypes.bool,
    togglePopUp: PropTypes.func,
  };
  static defaultProps = {
    isShowPopUp: false,
    togglePopUp: () => {},
  };
  state = {
    activeTab: 1,
    isEdit: true,
  };
  selectTab = itemValue => {
    this.setState({
      activeTab: itemValue,
    });
  };
  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };
  render() {
    const { isShowPopUp, togglePopUp } = this.props;
    const { activeTab, isEdit } = this.state;
    return (
      <Wrap isShowPopUp={isShowPopUp}>
        {isEdit ? (
          <PostEdit toggleEdit={this.toggleEdit} />
        ) : (
          <div>
            <Tabs>
              {tabList.map(tab => (
                // eslint-disable-next-line
                <span
                  onClick={() => {
                    this.selectTab(tab.key);
                  }}
                  className={tab.key === activeTab ? 'active-tab' : ''}
                  key={tab.key}
                >
                  {tab.value}
                </span>
              ))}
            </Tabs>
            <TabContent>
              {activeTab === 0 && <div>待合并</div>}
              {activeTab === 1 && <div>已合并</div>}
              {activeTab === 2 && <div>已拒绝</div>}
            </TabContent>
            <Button className="close" onClick={togglePopUp}>
              关闭
            </Button>
            <Button className="edit" onClick={this.toggleEdit}>
              编辑
            </Button>
          </div>
        )}
      </Wrap>
    );
  }
}
export default PopUp;
