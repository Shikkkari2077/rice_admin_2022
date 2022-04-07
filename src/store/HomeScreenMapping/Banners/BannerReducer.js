import { FETCH_BANNER_ERROR, FETCH_BANNER_LIST, FETCH_BANNER_REQ,FETCH_BANNER_ADD,FETCH_BANNER_IMPORT } from "../../types";

const initialState = {
  banner_list: [],
  isLoading: true,
  error: null,
  banner_res:[],
  importBanner_list:[]
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANNER_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_BANNER_LIST:
      return {
        ...state,
        banner_list: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_BANNER_ADD:
      return {
        ...state,
        banner_res: action.payload,
        isAdding: false,
        error: action.payload.status,
      };
      case FETCH_BANNER_IMPORT:
        return {
          ...state,
          importBanner_list: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
    case FETCH_BANNER_ERROR:
      return {
        ...state,
        banner_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default bannerReducer;
