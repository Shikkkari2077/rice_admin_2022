import {
  FETCH_COUNTRY_LIST,
  FETCH_COUNTRY_ERROR,
  FETCH_COUNTRY_REQ,
  FETCH_COUNTRY_ADD ,
  FETCH_COUNTRY_DETAIL,
  FETCH_COUNTRY_UPDATE
} from "../types";

const initialState = {
  country_list: [],
  country_det:[],
  isLoading: true,
  isAdding:false,
  error: null,
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRY_REQ:
      return {
        ...state,
        isLoading: true,
         isAdding:true,
      };
    case FETCH_COUNTRY_LIST:
      return {
        ...state,
        country_list: action.payload.data,
        countFilterWise:action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.status,
      };
     
      case FETCH_COUNTRY_ADD:
        return {
          ...state,
          country_res: action.payload,
          isAdding: false,
          error: action.payload.status,
        };
        case FETCH_COUNTRY_UPDATE:
          return {
            ...state,
            country_update: action.payload,
            isAdding: false,
            error: action.payload.status,
          };
      case FETCH_COUNTRY_DETAIL:
        return {
          ...state,
          country_det: action.payload,
          error: action.payload.status,
        };
    case FETCH_COUNTRY_ERROR:
      return {
        ...state,
        country_list: [],
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default countryReducer;
