import { FETCH_ORDER_LIST, FETCH_ORDER_ERROR, FETCH_ORDER_DOWN,FETCH_ORDER_REQ,FETCH_ORDER_UPDATE ,FETCH_ORDER_DET,FETCH_PREORDER_LIST} from "../types";


const initialState = {
  order_list: [],
  isLoading: true,
  order_det:[],
  dataIs:true,
  error: null,
  order_down:[],
  preorder_list:[]
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQ:
      return {
        ...state,
        isLoading: true,
        dataIs:true
      };
    case FETCH_ORDER_LIST:
      return {
        ...state,
        countFilterWise:action.payload.countFilterWise,
        order_list: action.payload.data,
        isLoading: false,
        error: action.payload.status,
      };
      
    case FETCH_ORDER_DOWN:
      return {
        ...state,
        order_down: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_ORDER_UPDATE:
      return {
        ...state,
        order_det: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_PREORDER_LIST:
      return {
        ...state,
        preorder_list: action.payload.data,
        isLoading: false,
        countFilterWise:action.payload.countFilterWise,
        error: action.payload.status,
      };
    
      case FETCH_ORDER_DET:
        return {
          ...state,
          dataIs:false,
          order_det: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
       
    case FETCH_ORDER_ERROR:
      return {
        ...state,
        order_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};

export default orderReducer;
