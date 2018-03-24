import { UPDATE_USER_INFO } from "../actionTypes";

const initialState = {
  isLoggedIn: false,
  error: "",
  user: {},
  im: {}
};

const auth = (state = initialState, { type, payload }) => {
  console.log(type);

  switch (type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        bindId: payload.bindId,
        isLoggedIn: true,
        im: payload.im,
        user: payload.user
      };
    default:
      return state;
  }
};

export default auth;
