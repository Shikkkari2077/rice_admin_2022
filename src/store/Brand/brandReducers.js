import { FETCH_BRAND_ERROR, FETCH_BRAND_LIST, FETCH_BRAND_REQ } from "../types";

const initialState = {
  brand_list: [],
  isLoading: true,
  error: null,
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRAND_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_BRAND_LIST:
      return {
        ...state,
        brand_list: action.payload.data,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_BRAND_ERROR:
      return {
        ...state,
        brand_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default brandReducer;
