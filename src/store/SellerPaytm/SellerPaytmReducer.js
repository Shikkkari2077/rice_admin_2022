import {
    FETCH_PAY_ERROR,
    SELLER_PAYTM_LIST,
    FETCH_SELLERPAY_REQ,
    SELLER_PAYTM_DETAIL
  
    } from "../types";
    
    const initialState = {
        countFilterWise:'',
        seller_list:[],
        Seller_detail:[],
      isLoading: true,
      error: null,
    };

    const SellerPaytmReducer = (state = initialState,action)=>{
        switch(action.type){
            case FETCH_SELLERPAY_REQ:
                return {
                  ...state,
                  isLoading: true,
                };
            case SELLER_PAYTM_LIST:
                return{
                    ...state,
                    countFilterWise:action.payload.countFilterWise,
                    seller_list:action.payload.data,
                    isLoading:false,
                };
                case SELLER_PAYTM_DETAIL:
                    return{
                        ...state,
                        countFilterWise:action.payload.countFilterWise,
                        Seller_detail:action.payload.data,
                        isLoading:false,
                    };
            
            case FETCH_PAY_ERROR:
                return {
                  ...state,
                 
                  isLoading: false,
                  error: action.error,
                };
            default:
                return state;
        }
    }
    export default SellerPaytmReducer