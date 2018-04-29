import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { posts } from '../../gqls/post';
import Loading from '../../components/Loading';

const Wrap = styled.div``;

class MyPost extends PureComponent {
  static propTypes = {
    postsRes: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { posts, loading } = this.props.postsRes;
    if (loading) return <Loading />;
    return (
      <Wrap>{posts.map(post => <div key={post.id}>{post.title}</div>)}</Wrap>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}
const wrapper = compose(
  graphql(posts, {
    name: 'postsRes',
    options: props => {
      const authorId = props.auth.id;
      return {
        variables: { authorId },
      };
    },
  })
);

// 这样才能方便的拿到 auth
export default connect(select)(wrapper(MyPost));
