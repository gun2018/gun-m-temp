// import request from "../../util/request";
// import { logout } from "../../config/api";
import { UPDATE_USER_INFO } from '../actionTypes';

export function setUserInfo(data) {
  return { type: UPDATE_USER_INFO, payload: data };
}
export function a() {}

// export function doLogout() {
//   return async dispatch => {
//     try {
//       await request.post(logout, {});
//     } catch (e) {
//       return;
//     }
//     window.location.replace(window.location.href);
//     dispatch({ type: LOGOUT }); // logout 客户端只需要发送请求，本身不需要做什么
//   };
// }
