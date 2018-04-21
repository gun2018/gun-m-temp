import gql from 'graphql-tag';

export const fans = gql`
  query fans($userId: Int!) {
    fans(userId: $userId, status: 1) {
      id
      info {
        id
        nickname
        sex
        signText
        avatarUrl
      }
    }
  }
`;

// export const thinkings = gql`
//   query thinkings($postId: Int!) {
//     thinkings(postId: $postId, status: 1) {
//       id
//       postId
//       content
//       createTime
//       updateTime
//       status
//       owner {
//         id
//         nickname
//         avatarUrl
//         sex
//       }
//     }
//   }
// `;
