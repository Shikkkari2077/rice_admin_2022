import {   FETCH_SELLERPRODUCT_LIST,
  FETCH_SELLERPRODUCT_ERROR,
  FETCH_SELLERPRODUCTIMPORT_LIST,
  FETCH_SELLERPRODUCTADMIN_LIST,
  FETCH_SELLERPRODUCT_REQ, FETCH_SELLERPRODUCT_DET,FETCH_SELLERPRODUCT_ADD} from "../types";


const initialState = {
  sellerProduct_list: [],
  sellerProductImport_list:[],
  sellerProduct:[],
  inventory_det:[],
  isLoading: true,
  error: null,
  invalidata:[],
  isSucess:true,
};

const sellerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELLERPRODUCT_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SELLERPRODUCT_LIST:
      return {
        ...state,
        sellerProduct_list: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_SELLERPRODUCT_ADD:
        return {
          ...state,
          sellerProduct: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
      case FETCH_SELLERPRODUCT_DET:
      return {
        ...state,
        inventory_det: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_SELLERPRODUCTADMIN_LIST:
      return {
        ...state,
        sellerProduct: action.payload.data,
        isLoading: false,
        count:action.payload.countFilterWise,
        error: action.payload.status,
      };
      case FETCH_SELLERPRODUCTIMPORT_LIST:
      return {
        ...state,
        sellerProductimported: action.payload,
        isLoading: false,
        isSucess:true,
        invalidata:action.payload.invalidData,
        error: action.payload.status,
      };
    case FETCH_SELLERPRODUCT_ERROR:
      return {
        ...state,
        sellerProduct_list: [],
        error: action.error,
      };
    default:
      return state;
  }
};
export default sellerProductReducer;