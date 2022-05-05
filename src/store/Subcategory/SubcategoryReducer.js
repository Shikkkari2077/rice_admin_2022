import { FETCH_SUBCATG_ERROR, FETCH_SUBCATG_LIST, FETCH_SUBCATG_REQ } from "../types";

const initialState = {
  subcategory_list: [],
  isLoading: true,
  error: null,
};

const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBCATG_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUBCATG_LIST:
      return {
        ...state,
        subcategory_list: action.payload.data,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_SUBCATG_ERROR:
      return {
        ...state,
        subcategory_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default subcategoryReducer;
