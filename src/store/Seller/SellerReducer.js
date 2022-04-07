import { FETCH_SELLER_LIST, FETCH_SELLER_ERROR, FETCH_SELLER_REQ,FETCH_SELLERIMPORT_LIST,FETCH_SELLER_DETAIL } from "../types";


const initialState = {
  seller_list: [],
  importseller_list:[],
  isLoading: true,
  seller_det:[],
  error: null,
};

const sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELLER_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SELLER_LIST:
      return {
        ...state,
        seller_list: action.payload.data,
        countFilterWise:action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.status,
      };
      
    case FETCH_SELLER_DETAIL:
      return {
        ...state,
        seller_det: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_SELLERIMPORT_LIST:
      return {
        ...state,
        importseller_list: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_SELLER_ERROR:
      return {
        ...state,
        seller_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default sellerReducer;
