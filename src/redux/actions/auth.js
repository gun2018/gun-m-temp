import { UPDATE_USER_INFO } from '../actionTypes';

export function setUserInfo(data) {
  return { type: UPDATE_USER_INFO, payload: data };
}
