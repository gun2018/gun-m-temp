import gql from 'graphql-tag';

export const posts = gql`
  query posts($authorId: Int) {
    posts(authorId: $authorId, status: 1) {
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
export const userPosts = gql`
  query posts($authorId: Int) {
    posts(authorId: $authorId, status: 1) {
      id
      title
      brief
      cover
      category
      isLike
      likeCount
      thinkingCount
      titleCommitCount
      contentCommitCount
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
        mergeCount
        happenTime
        postId
      }
    }
  }
`;

export const postPartCommits = gql`
  query postPartCommits($userId: Int, $postPartId: Int, $postId: Int) {
    postPartCommits(userId: $userId, postPartId: $postPartId, postId: $postId) {
      id
      postId
      userId
      postPartId
      commitName
      content
      source
      seq
      happenTime
      createTime
      updateTime
      status
      user {
        id
        nickname
        avatarUrl
        signText
      }
    }
  }
`;

export const crearePostPartCommit = gql`
  mutation createPostPartCommit($input: AddPostPartCommitInput!) {
    crearePostPartCommit(input: $input) {
      id
    }
  }
`;

export const mergePostPartCommit = gql`
  mutation mergePostPartCommit($input: MergePostPartCommit!) {
    mergePostPartCommit(input: $input) {
      id
    }
  }
`;

export const updatePostPartCommit = gql`
  mutation($input: UpdatePostPartCommitInput!) {
    updatePostPartCommit(input: $input) {
      id
    }
  }
`;
