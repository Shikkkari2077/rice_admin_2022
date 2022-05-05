import { FETCH_BAG_ERROR, FETCH_BAG_LIST, FETCH_BAG_REQ } from "../types";

const initialState = {
  bags_list: [],
  isLoading: true,
  error: null,
};

const BagReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BAG_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_BAG_LIST:
      return {
        ...state,
        bags_list: action.payload.data,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_BAG_ERROR:
      return {
        ...state,
        bags_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default BagReducer;
