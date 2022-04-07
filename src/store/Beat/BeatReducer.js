import { 
    FETCH_BEAT_REQ,
    FETCH_BEAT_LIST,
    FETCH_BEAT_ERROR,
    FETCH_IMPORT_ERROR
} from "../types";
  
  
  const initialState = {
    beat_list:[],
    isLoading: true, 
    invalid_data:[],
    error: null,
  };

  const beatReducer = ( state = initialState , action )=>{
      switch(action.type){
          case FETCH_BEAT_REQ:
          return{
           ...state,
           isLoading:true,
          };

          case FETCH_BEAT_ERROR:
           return {
            ...state,
            beat_list:[],
           isLoading: false,
           error: action.error,
         };
         case FETCH_BEAT_LIST:
            return {
              ...state,
              countFilterWise:action.payload.countFilterWise,
              beat_list:action.payload.data,
              isLoading: false,
              error: action.payload.status,
            };
            case FETCH_IMPORT_ERROR:
              return{
                ...state,
                invalid_data:action.payload
              }
         default:
             return state;
      }
  }

  export default beatReducer