import { UPDATE_USER_INFO } from '../actionTypes';

const initialState = {
  id: 0,
  openId: '',
  avatarUrl: '',
  nickname: '',
  sex: 0,
  signText: '',
  followers: [],
  fans: [],
};

const auth = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case UPDATE_USER_INFO:
      return {
        id: payload.id,
        openId: payload.open_id,
        avatarUrl: payload.avatar_url,
        nickname: payload.nickname,
        sex: payload.sex,
        signText: payload.sign_text,
        followers: payload.followers,
        fans: payload.fans,
      };
    default:
      return state;
  }
};

export default auth;
