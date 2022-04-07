import {
  FETCH_PINCODE_LIST,
  FETCH_PINCODE_ERROR,
  FETCH_PINCODE_REQ,
  FETCH_PINCODEIMPORT_LIST,
} from "../types";

const initialState = {
  invalidata:[],

  pincode_list: [],
  pincodeImport_list: [],
  isLoading: true,
  error: null,
};

const pincodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PINCODE_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PINCODE_LIST:
      return {
        ...state,
        pincode_list: action.payload.data,
        countFilterWise:action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.data.status,
      };
    case FETCH_PINCODEIMPORT_LIST:
      return {
        ...state,
        pincodeImport_list: action.payload,
        isLoading: false,
        error: action.payload.status,
        //invalidata:action.payload.invalidData,

      };
    case FETCH_PINCODE_ERROR:
      return {
        ...state,
        pincode_list: [],
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default pincodeReducer;
