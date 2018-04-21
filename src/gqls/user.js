import gql from 'graphql-tag';

export const fans = gql`
  query fans($userId: Int!) {
    fans(userId: $userId, status: 1) {
      id
      status
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
export const followers = gql`
  query followers($userId: Int!) {
    followers(userId: $userId, status: 1) {
      id
      status
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

export const deleteFollower = gql`
  mutation($input: DeleteFollowerInput!) {
    deleteFollower(input: $input) {
      id
    }
  }
`;

export const updateFollower = gql`
  mutation($input: UpdateFollowerInput!) {
    updateFollower(input: $input) {
      id
    }
  }
`;
export const createFollower = gql`
  mutation createFollower($input: AddFollowerInput!) {
    createFollower(input: $input) {
      id
    }
  }
`;
