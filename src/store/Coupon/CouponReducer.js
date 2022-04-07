import {
  FETCH_COUPON_LIST,
  FETCH_COUPON_ERROR,
  FETCH_COUPON_REQ,
  FETCH_COUPON_ADD,
  FETCH_COUPON_UPDATE,
  FETCH_COUPON_DET,

} from "../types";

const initialState = {
  coupon_list: [],
  isLoading: true,
  coupon_add:[],
  coupon_det:[],
  error: null,
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUPON_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_COUPON_LIST:
      return {
        ...state,
        coupon_list: action.payload.data,
        countFilterWise:action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_COUPON_ADD:
      return {
        ...state,
        coupon_add: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      
      case FETCH_COUPON_UPDATE:
      return {
        ...state,
        coupon_add: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      
      case FETCH_COUPON_DET:
      return {
        ...state,
        coupon_det: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_COUPON_ERROR:
      return {
        ...state,
        coupon_list: [],
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default couponReducer;
