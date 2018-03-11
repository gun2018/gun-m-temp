/* eslint-disable no-console */
import axios from 'axios';

function handleResponse(response) {
  if (response.data.code === 0) {
    return response.data;
  }
  throw new Error(response.data.msg);
}
function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(get|head|options|trace)$/.test(method));
}
function getToken() {
  // temporarily! need to be modified.
  return document.cookie.split('=')[1];
}

Object.keys(axios.defaults.headers).forEach((method) => {
  if (!csrfSafeMethod(method) && method !== 'common') {
    axios.defaults.headers[method]['x-csrf-token'] = getToken();
  }  
});

axios.defaults.baseURL = 'http://api.gun.yefun.top';
axios.defaults.withCredentials = true;

export default {
  async get(url, options) {
    const resp = await axios.get(url, options);
    return handleResponse(resp);
  },
  async post(url, params, options) {
    const resp = await axios.post(url, params, options);
    return handleResponse(resp);
  },
};
