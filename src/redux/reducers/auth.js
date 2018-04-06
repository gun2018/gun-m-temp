import { UPDATE_USER_INFO } from '../actionTypes';

const initialState = {
  openId: '',
  headimgurl: '',
  nickname: '',
  sex: 0,
};

const auth = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case UPDATE_USER_INFO:
      return {
        openId: payload.open_id,
        headimgurl: payload.headimgurl,
        nickname: payload.nickname,
        sex: payload.sex,
      };
    default:
      return state;
  }
};

export default auth;
