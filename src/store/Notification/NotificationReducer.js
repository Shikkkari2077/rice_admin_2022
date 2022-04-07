import {
  FETCH_NOT_REQ,
  FETCH_TEMPLATE_LIST,
  FETCH_NOT_ERROR,
  FETCH_TEMPLATE_DETAIL,
  FETCH_LOGS,
  CUSTOMER_LOGS,
  FETCH_TEMPLATE_TYPE_LIST

  } from "../types";
  
  const initialState = {
    templates_list: [],
    template_detail: [],
    logs_list:[],
    customer_logs:[],
    isLoading: true,
    error: null,
  };


  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NOT_REQ:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_TEMPLATE_LIST:
        return {
          ...state,
          templates_list:action.payload.data,
          isLoading: false,
          error: action.payload.status,
        };
        case FETCH_TEMPLATE_TYPE_LIST:
          return {
            ...state,
            type_list:action.payload.data,
            isLoading: false,
            error: action.payload.status,
          };
        case  FETCH_TEMPLATE_DETAIL:
          return {
            ...state,
            template_detail:action.payload.data,
            isLoading: false,
            error: action.payload.status,
          };
          case FETCH_LOGS:
            return {
              ...state,
              logs_list:action.payload.data,
              isLoading: false,
              error: action.payload.status,
            };
            case CUSTOMER_LOGS:
              return {
                ...state,
                customer_logs:action.payload.data,
                isLoading: false,
                error: action.payload.status,
              };
            case FETCH_NOT_ERROR:
              return {
                ...state,
               
                isLoading: false,
                error: action.error,
              };
        
     
  
      default:
        return state;
    }
  };
  export default notificationReducer;