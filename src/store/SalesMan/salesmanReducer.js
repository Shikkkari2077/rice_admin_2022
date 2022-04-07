import { CallToActionOutlined } from "@material-ui/icons";
import { 
    FETCH_SALES_REQ,
    FETCH_SALES_LIST,
    FETCH_SALES_ERROR,
    IMPORT_ERROR_SALESMAN

} from "../types";
  
  
  const initialState = {
    sales_man:[],
    isLoading: true, 
    invalid_data:[],
    error: null,
  };

  const salesmanReducer = ( state=initialState,action )=>{
      switch(action.type){
          case FETCH_SALES_REQ:
          return{
           ...state,
           isLoading:true,
          };

          case IMPORT_ERROR_SALESMAN:
            return{
              ...state,
              invalid_data:action.payload,
              
            };
          case FETCH_SALES_ERROR:
           return {
            ...state,
            sales_man:[],
           isLoading: false,
           error: action.error,
         };
         case FETCH_SALES_LIST:
            return {
              ...state,
              sales_man:action.payload.data,
              countFilterWise:action.payload.countFilterWise,
              isLoading: false,
              error: action.payload.status,
            };
         default:
             return state;
      }
  }

  export default salesmanReducer