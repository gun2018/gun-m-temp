import gql from 'graphql-tag';

export const posts = gql`
  query posts {
    posts(status: 1) {
      id
      title
      brief
      cover
      category
      isLike
      likeCount
      thinkingCount
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
      updateTime
      likeCount
      thinkingCount
      isLike
      detail {
        id
        content
        happenTime
        postId
      }
    }
  }
`;

export const postPartCommits = gql`
  query postPartCommits($postPartId: Int!) {
    postPartCommits(postPartId: $postPartId) {
      id
      postId
      postPartId
      commitName
      content
      source
      seq
      happenTime
      updateTime
      status
      user {
        id
        nickname
        avatarUrl
      }
    }
  }
`;

export const crearePostPartCommit = gql`
  mutation crearePostPartCommit($input: AddPostPartCommitInput!) {
    crearePostPartCommit(input: $input) {
      id
    }
  }
`;
