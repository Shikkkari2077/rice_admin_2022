
import {   FETCH_SELLERPINCODE_LIST,
  FETCH_SELLERPINCODE_ERROR,
  FETCH_SELLERPINCODE_REQ,
  FETCH_SELLERPINCODEIMPORT_LIST
 } from "../types";


const initialState = {
  sellerPincode_list: [],
  isLoading: true,
  error: null,
};

const sellerPincodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELLERPINCODE_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SELLERPINCODE_LIST:
      return {
        ...state,
        sellerPincode_list: action.payload.data,
        countFilterWise: action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.data.status,
      };
      case FETCH_SELLERPINCODE_LIST:
      return {
        ...state,
        sellerPincode_list: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_SELLERPINCODE_ERROR:
      return {
        ...state,
        sellerPincode_list: [],
        error: action.error,
      };
    default:
      return state;
  }
};
export default sellerPincodeReducer;
