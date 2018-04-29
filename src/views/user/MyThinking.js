import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { thinkings } from '../../gqls/thinking';
import Loading from '../../components/Loading';

const Wrap = styled.div``;

class MyThinking extends PureComponent {
  static propTypes = {
    thinkingsRes: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { thinkings, loading } = this.props.thinkingsRes;
    if (loading) return <Loading />;
    return (
      <Wrap>
        {thinkings.map(thinking => (
          <div key={thinking.id}>{thinking.content}</div>
        ))}
      </Wrap>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}
const wrapper = compose(
  graphql(thinkings, {
    name: 'thinkingsRes',
    options: props => {
      const userId = props.auth.id;
      return {
        variables: { userId },
      };
    },
  })
);

// 这样才能方便的拿到 auth
export default connect(select)(wrapper(MyThinking));
