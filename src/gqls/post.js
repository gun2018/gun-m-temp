import gql from 'graphql-tag';

export const posts = gql`
  query posts($authorId: Int, $wd: String) {
    posts(authorId: $authorId, wd: $wd, status: 1) {
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

export const thinkingPost = gql`
  query post($id: Int!) {
    post(id: $id) {
      id
      title
      authorId
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
      post {
        id
        title
      }
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

export const createPostLike = gql`
  mutation createPostLike($input: AddPostLikeInput!) {
    createPostLike(input: $input) {
      id
    }
  }
`;

export const deletePostLike = gql`
  mutation($input: DeletePostLikeInput!) {
    deletePostLike(input: $input) {
      id
    }
  }
`;
