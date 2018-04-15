import { UPDATE_USER_INFO } from '../actionTypes';

const initialState = {
  openId: 'o0-zO0meBBqLalUgpYzG06XO7wAg',
  headimgurl:
    'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKiboeh23vhCNjJTxlXbs9mLiagiczy8Wd6gIxviaV4vpUyOso741Qz53XDdKyAkTH4Iic7SPkkax8xO0g/132',
  nickname: '好像叫陆文',
  sex: 1,
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
