import {
    BUSSINESS_LIST,
  FETCH_BUSSINESS_ERROR,
  FETCH_BUSSINESS_REQ
  } from "../types";
  
  const initialState = {
    kyc_list:[],
    error: null,
    isAdding: false,
    countFilterWise:0,
  };
  
  const KYCReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUSSINESS_REQ:
            return {
              ...state,
              isLoading: true,
            };
    
      case BUSSINESS_LIST:
        return {
          ...state,
          countFilterWise:action.payload.countFilterWise,
          kyc_list:action.payload.data,
          error: action.error,
        };
        case FETCH_BUSSINESS_ERROR:
            return {
              ...state,
              kyc_list: [],
              error: action.error,
            };
      default:
        return state;
    }
  };
  export default KYCReducer;
  