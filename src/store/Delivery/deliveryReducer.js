import {
    FETCH_DELIVERYBOY_LIST,
    FETCH_DELIVERYBOY_ERROR,
    FETCH_DELIVERYBOY_REQ,
    FETCH_DELIVERYBOY_ADD,
    FETCH_DELIVERYBOY_DET,
    
  } from "../types";
  
  const initialState = {
    delivery_list: [],
    delivery_add: [],
    delivery_det: [],
    isLoading: true,
    error: null,
  };
  
  const deliveryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DELIVERYBOY_REQ:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_DELIVERYBOY_LIST:
        return {
          ...state,
          delivery_list: action.payload.data,
          isLoading: false,
          countFilterWise:action.payload.countFilterWise
          // error: action.payload.status,
        };
      case FETCH_DELIVERYBOY_ADD:
        return {
          ...state,
          delivery_add: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
      case FETCH_DELIVERYBOY_DET:
        return {
          ...state,
          delivery_det: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
  
      case FETCH_DELIVERYBOY_ERROR:
        return {
          ...state,
          delivery_list: [],
          isLoading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  export default deliveryReducer;
  