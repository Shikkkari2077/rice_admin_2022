import { FETCH_TOPCAT_ERROR, FETCH_TOPCAT_LIST, FETCH_TOPCAT_REQ ,FETCH_TOPCAT_IMPORT} from "../../types";

const initialState = {
  topCat_list: [],
  isLoading: true,
  error: null,
  importcat_list:[]
};

const topCatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPCAT_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TOPCAT_LIST:
      return {
        ...state,
        topCat_list: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_TOPCAT_IMPORT:
        return {
          ...state,
          importcat_list: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
    case FETCH_TOPCAT_ERROR:
      return {
        ...state,
        topCat_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default topCatReducer;
