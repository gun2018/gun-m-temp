import { TEST_ADD_COUNT, TEST_SUB_COUNT } from "../actionTypes";

export function addCount(payload) {
  return { type: TEST_ADD_COUNT, payload };
}
export function subCount(payload) {
  return { type: TEST_SUB_COUNT, payload };
}
