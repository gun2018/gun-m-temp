import gql from 'graphql-tag';

export const thinkings = gql`
  query thinkings($postId: Int, $userId: Int) {
    thinkings(postId: $postId, userId: $userId, status: 1) {
      id
      userId
      postId
      content
      createTime
      updateTime
      status
      likeCount
      isLike
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
