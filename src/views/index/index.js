import React, { Component, Fragment } from 'react';

class Index extends Component {
  state = {
    test: 1
  };
  render() {
    console.log(this.state.test);
    return (
      <Fragment>
        <h1>Index</h1>
      </Fragment>
    )
  }
};
export default Index;
