import { UPDATE_USER_INFO } from '../actionTypes';

const initialState = {
  id: 0,
  openId: '',
  headimgurl: '',
  nickname: '',
  sex: 0,
};

const auth = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case UPDATE_USER_INFO:
      return {
        id: payload.id,
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
