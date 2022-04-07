import {
    FETCH_SELLERCUS_REQ,
    FETCH_SELLERCUS_LIST,
    FETCH_SELLERCUS_IMPORT,
    FETCH_BUSINESS_TYPE,
    FETCH_INTRESTED_CATEGORIES,
    FETCH_SELLERCUS_ERROR,
    SELLER_CUSTOMER_IMPORT,
    OTP_REGISTERED,
    } from "../types";

const initialState = {
  isLoading: true,
  error: null,
  seller_customer_list:[],
  importSellerCuslist:[],
  businessType_list:[],
  intrested_Categories:[],
  countFilterWise:0,
  invalid_data:[],
};

const SellerCustomerReducer = (state = initialState, action) => {

  console.log(action.payload)
  switch (action.type) {
    case FETCH_SELLERCUS_REQ:
      return {
        ...state,
        isLoading: true,
      };
      case SELLER_CUSTOMER_IMPORT:
        return{
          ...state,
          invalid_data:action.payload
        
      };
    case FETCH_SELLERCUS_LIST:
      return {
        ...state,
        seller_customer_list: action.payload.data,
        countFilterWise:action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_INTRESTED_CATEGORIES:
        return {
          ...state,
          intrested_Categories: action.payload.data,
          countFilterWise:action.payload.countFilterWise,
          isLoading: false,
          error: action.payload.status,
        };
      case FETCH_BUSINESS_TYPE:
        return {
          ...state,
          businessType_list:action.payload.data,
          isLoading: false,
          error: action.payload.status,
        };
    
      case FETCH_SELLERCUS_IMPORT:
        return {
          ...state,
          importSellerCuslist: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
    case FETCH_SELLERCUS_ERROR:
      return {
        ...state,
        seller_customer_list: [],
        error: action.error,
      };
    case OTP_REGISTERED:
      return{
        ...state,
        otp_registered:action.payload,
        
      }

    default:
      return state;
  }
};
export default SellerCustomerReducer;
