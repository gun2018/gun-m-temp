import { TEST_ADD_COUNT, TEST_SUB_COUNT } from "../actionTypes";

const initialState = {
  count: 1
};

const countTest = (state = initialState, action) => {
  const { count } = state;
  switch (action.type) {
    case TEST_ADD_COUNT:
      return {
        count: count + 1
      };
    case TEST_SUB_COUNT:
      return {
        count: count - 1
      };
    default:
      return state;
  }
};

export default countTest;
