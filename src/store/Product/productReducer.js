import { FETCH_PRODUCT_LIST, FETCH_PRODUCT_ERROR, FETCH_PRODUCT_REQ,FETCH_PRODUCTIMPORT_LIST ,FETCH_PRODUCT_SELLER_LIST} from "../types";


const initialState = {
  product_list: [],
  importproduct_list:[],
  product_seller:[],
  isLoading: true,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PRODUCT_LIST:
      return {
        ...state,
        product_list: action.payload.data,
        countFilterWise:action.payload.countFilterWise,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_PRODUCT_SELLER_LIST:
      return {
        ...state,
        product_seller: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_PRODUCTIMPORT_LIST:
        return {
          ...state,
          importproduct_list:action.payload,
          isLoading:false,
          error:action.payload.status
        }
    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        product_list: [],
        error: action.error,
      };
  
    default:
      return state;
  }
};
export default productReducer;
