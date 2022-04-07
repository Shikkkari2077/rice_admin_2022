import { FETCH_CITY_LIST, FETCH_CITY_ERROR, FETCH_CITY_REQ ,FETCH_CITY_ADD,
  FETCH_CITY_UPDATE,
  FETCH_CITY_DETAIL} from "../types";


const initialState = {
  city_list:[],
  isLoading: true, 
  city_det:[],
  error: null,
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CITY_LIST:
      return {
        ...state,
        city_list:action.payload.data,
        countFilterWise:action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_CITY_ADD:
        return {
          ...state,
          city_res: action.payload,
          isAdding: false,
          error: action.payload.status,
        };
        case FETCH_CITY_UPDATE:
          return {
            ...state,
            city_res: action.payload,
            isAdding: false,
            error: action.payload.status,
          };
      case FETCH_CITY_DETAIL:
        return {
          ...state,
          city_det: action.payload,
          error: action.payload.status,
        };
    case FETCH_CITY_ERROR:
      return {
        ...state,
        city_list:[],
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default cityReducer;
