import { DMS_ORDERS ,DMS_ERROR} from '../types'


const initalState={
    dms_orders:[],
    countFilterWise:0,
}
const DMSReducer =(state = initalState,action)=>{

    switch(action.type){
        case DMS_ORDERS:{
            return{
                ...state,
                dms_orders:action.payload.data,
                countFilterWise:action.payload.countFilterWise,
            }
        }
        case DMS_ERROR:
            return {
              ...state,
              dms_orders: [],
              error: action.error,
            };
        default:
            return state;
    }


}
export default DMSReducer