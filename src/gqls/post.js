import gql from 'graphql-tag';

export const posts = gql`
  query posts {
    posts(status: 1) {
      id
      title
      brief
      cover
      category
    }
  }
`;
export const post = gql`
  query post($id: Int!) {
    post(id: $id) {
      id
      title
      brief
      cover
      category
      status
      detail {
        order
        type
        content
        happenTime
        postId
      }
    }
  }
`;
