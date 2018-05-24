import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 100%;
`;

class Search extends PureComponent {
  state = {};
  render() {
    return <Wrap />;
  }
}
export default Search;
