import axios from "axios";
import Constant from "../../Constant";
import {
    PROMOTIONS_LIST,
    FETCH_PTOMOTIONS_ERROR
} from "../types";
import Swal from "sweetalert2";

export const getPromotionsList = (list) => {
    return {
      type: PROMOTIONS_LIST,
      payload: list,
    };
  };
  export const getError = (error) => {
    return {
      type: FETCH_PTOMOTIONS_ERROR,
      error: error,
    };
  };
  export const getPromotionReq=()=>{
      return{
          type:FETCH_PROMOTION_REQ
      }
  }

  export const fetchPromotionsList = () => {
    return (dispatch) => {
      dispatch(getPromotionReq);
      axios
        .post(Constant.getAPI() + "/promotion/list",{
          
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem( "superadmin_auth" )}`,
            },
        })
        .then((res) => {
          //console.log(res)
          if (res.data.success === true) {
             const list = res.data;
             //console.log(res.data.data)
            dispatch(getPromotionsList(list));
           }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getError(errMsg));
        });
    };
  };