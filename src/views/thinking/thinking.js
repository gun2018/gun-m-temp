import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { thinkings } from '../../gqls/thinking';
// import { NavLink } from 'react-router-dom';
import { parseQuery } from '../../utils/tools';
import Loading from '../../components/Loading';
import Avatar from '../../components/Avatar';
import { fromNow } from '../../utils/date';
import PostAndThinkingHeader from '../../components/PostAndThinkingHeader';

class Thingking extends Component {
  static propTypes = {
    thinkingsRes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    // match: PropTypes.object.isRequired
  };
  state = {};
  get query() {
    return parseQuery(this.props.location.search);
  }
  render() {
    const { thinkings, loading } = this.props.thinkingsRes;
    console.log('query', this.query);
    console.log('thinkings', thinkings);
    if (loading) return <Loading />;
    if (!thinkings) return <div>没有找到您需要的内容</div>;
    return (
      <div>
        <PostAndThinkingHeader postId={this.query.post_id} />
        {thinkings.map(thinking => (
          <div key={thinking.id}>
            <p>{thinking.content}</p>
            <span>{fromNow(thinking.updateTime)}</span>
            <Avatar src={thinking.owner.avatarUrl} />
          </div>
        ))}
      </div>
    );
  }
}

const wrapper = compose(
  graphql(thinkings, {
    name: 'thinkingsRes',
    options: props => {
      const query = parseQuery(props.location.search);
      return {
        variables: { postId: query.post_id },
      };
    },
  })
);

export default wrapper(Thingking);
