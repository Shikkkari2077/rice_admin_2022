import {
  FETCH_CATG_ERROR,
  FETCH_CATG_LIST,
  FETCH_CATG_REQ,
  FETCH_CATG_ADD,
  FETCH_CATG_DETAIL,
  FETCH_CATG_UPDATE,
} from "../types";

const initialState = {
  category_list: [],
  isLoading: true,
  category_det: null,
  category_upd: [],
  error: null,
  category_res: [],
  isAdding: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATG_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CATG_LIST:
      return {
        ...state,
        category_list: action.payload.data,
        countFilterWise:action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_CATG_ADD:
      return {
        ...state,
        category_res: action.payload,
        isAdding: false,
        error: action.payload.status,
      };
      case FETCH_CATG_DETAIL:
      return {
        ...state,
        category_det: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_CATG_UPDATE:
      return {
        ...state,
        category_upd: action.payload,
        isAdding: false,
        error: action.payload.status,
      };
    case FETCH_CATG_ERROR:
      return {
        ...state,
        category_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default categoryReducer;
