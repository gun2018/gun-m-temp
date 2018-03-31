import gql from 'graphql-tag';

export const posts = gql`
  query posts {
    posts {
      id
      title
    }
  }
`;
export const post = gql`
  query post($id: Int!) {
    post(id: $id) {
      id
      title
    }
  }
`;
