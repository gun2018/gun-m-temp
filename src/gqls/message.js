import gql from 'graphql-tag';

export const messages = gql`
  query messages($giverId: Int) {
    messages(giverId: $giverId) {
      id
      giverId
      receiverId
      content
      url
      type
      status
      createTime
      updateTime
      giver {
        id
        nickname
        signText
        avatarUrl
      }
      receiver {
        id
        nickname
        signText
        avatarUrl
      }
    }
  }
`;

export const updateMessage = gql`
  mutation($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
      id
    }
  }
`;

export const createMessage = gql`
  mutation($input: AddMessageInput!) {
    createMessage(input: $input) {
      id
    }
  }
`;
