import { bindActionCreators } from "redux";
import {
    FETCH_GROUPS,
    FETCH_USERM_REQ,
    FETCH_USERM_ERROR,
    FETCH_ADMIN_LIST,
    FETCH_POLICY,
    FETCH_ASSIGNED_POLICY,
    FETCH_ASSIGNED_PINCODES
    } from "../types";
    
    const initialState={
        group_list:[],
        assigned_list:[],
        assigned_pincodes_list:[],
        admin_list:[],
        policies:[],
        isLoading: true,
        error: null,
    }
    const UserManagmentReducer = (state = initialState, action) => {
        switch(action.type){
          case FETCH_GROUPS:
          return{
              ...state,
              group_list:action.payload.data,
              isLoading: false,
              error: action.payload.status,

          };   
            case FETCH_ASSIGNED_POLICY:
          return{
              ...state,
              assigned_list:action.payload.data,
              isLoading: false,
              error: action.payload.status,

          };   
          case FETCH_ASSIGNED_PINCODES:
            return{
                ...state,
                assigned_pincodes_list:action.payload.data,
                isLoading: false,
                error: action.payload.status,
  
            };   
           case FETCH_POLICY:
          return{
              ...state,
              policies:action.payload.data,
              isLoading: false,
              error: action.payload.status,

          }; 
           case FETCH_ADMIN_LIST:
          return{
              ...state,
              admin_list:action.payload.data,
              countFilterWise:action.payload.countFilterWise,
              isLoading: false,
              error: action.payload.status,

          };
          case FETCH_USERM_REQ:
          return{
            ...state,
            isLoading: true,

          };
          case FETCH_USERM_ERROR:
          return{
            ...state,
               
            isLoading: false,
            error: action.error,
          }

            default:
                return state;
        }
    }
    export default UserManagmentReducer