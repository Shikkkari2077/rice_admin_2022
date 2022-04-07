import { FETCH_TOPDEAL_ERROR, FETCH_TOPDEAL_LIST, FETCH_TOPDEAL_REQ,FETCH_TOPDEALIMPORT_LIST } from "../../types";

const initialState = {
  topDeals_list: [],
  topDeals_import_list:[],
  isLoading: true,
  error: null,
};

const topDealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPDEAL_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TOPDEAL_LIST:
      return {
        ...state,
        topDeals_list: action.payload.data,
        countFilterWise: action.payload.countFilterWise,

        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_TOPDEALIMPORT_LIST:
        return {
          ...state,
          topDeals_import_list: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
    case FETCH_TOPDEAL_ERROR:
      return {
        ...state,
        topDeals_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default topDealsReducer;
