// import {
//     FETCH_MEDIA_ADD,
//     FETCH_MEDIA_ERROR,
//     FETCH_MEDIA_REQ,
//   } from "../types";
  
//   const initialState = {
//     media_res: [],
//     isLoading: true,
//     error: null,
//   };
  
//   const mediaReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case FETCH_MEDIA_REQ:
//         return {
//           ...state,
//           isLoading: true,
//         };
//       case FETCH_MEDIA_ADD:
//         return {
//           ...state,
//           media_res: action.payload,
//           isLoading: false,
//           error: action.payload.status,
//         };
      
//       case FETCH_MEDIA_ERROR:
//         return {
//           ...state,
//           media_res: [],
//           isLoading: false,
//           error: action.error,
//         };
  
//       default:
//         return state;
//     }
//   };
//   export default mediaReducer;