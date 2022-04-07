import {
  FETCH_CUSTOMER_LIST,
  FETCH_CUSTOMER_ERROR,
  FETCH_CUSTOMER_REQ,
  FETCH_GUEST_LIST,
  FETCH_BUSINESS_LINE,
} from "../types";

const initialState = {
  customer_list: [],
  importcustomer_list: [],
  isLoading: true,
  error: null,
  business_line:[],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CUSTOMER_LIST:
      return {
        ...state,
        customer_list: action.payload.data,
        isLoading: false,
        countFilterWise:action.payload.countFilterWise,
        error: action.payload.data.success,
      };
      case FETCH_BUSINESS_LINE:
        return {
          ...state,
          business_line:action.payload.data,
          isLoading: false,
          error: action.payload.data.success,
        };
      case FETCH_GUEST_LIST:
        return {
          ...state,
          customer_list: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
    case FETCH_CUSTOMER_ERROR:
      return {
        ...state,
        customer_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default customerReducer;
