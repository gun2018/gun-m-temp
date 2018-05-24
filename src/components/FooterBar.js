import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import px2rem from '../styles/px2rem';

const Wrap = styled.div`
  width: 100%;
  height: ${px2rem(100)};
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  border-top: 2px solid #ccc;
  background-color: #fff;
`;
const Item = styled.div`
  a {
    color: ${props => props.color};
  }
`;

const BAR_DATA = [
  {
    icon: 'exception',
    href: '/',
    name: '首页',
  },
  {
    icon: 'check',
    href: '/message',
    name: '消息',
  },
  {
    icon: 'user',
    href: '/user',
    name: '个人中心',
  },
];

class FooterBar extends PureComponent {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };
  state = {};
  render() {
    const { path } = this.props;
    return (
      <Wrap>
        {BAR_DATA.map(item => (
          <Item key={item.icon} color={path === item.href ? '#ed642a' : '#000'}>
            <NavLink to={item.href}>{item.name}</NavLink>
          </Item>
        ))}
      </Wrap>
    );
  }
}
export default FooterBar;
