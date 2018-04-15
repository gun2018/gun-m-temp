import gql from 'graphql-tag';

export const thinkings = gql`
  query thinkings($postId: Int!) {
    thinkings(postId: $postId, status: 1) {
      id
      postId
      content
      createTime
      updateTime
      status
      owner {
        id
        nickname
        avatarUrl
        sex
      }
    }
  }
`;
export const thinking = gql`
  query thinking($id: Int!) {
    thinking(id: $id, status: 1) {
      id
      postId
      content
      createTime
      updateTime
      status
    }
  }
`;

export const createThinking = gql`
  mutation createThinking($input: AddThinkingInput!) {
    createThinking(input: $input) {
      id
    }
  }
`;
