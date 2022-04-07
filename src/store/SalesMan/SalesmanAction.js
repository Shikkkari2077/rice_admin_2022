import axios from "axios";
import Constant from "../../Constant";
import { 
    FETCH_SALES_REQ,
    FETCH_SALES_LIST,
    FETCH_SALES_ERROR,
    IMPORT_ERROR_SALESMAN,
} from "../types";
import Swal from "sweetalert2";
export const getImportError = (salesman) => {
  return {
    type: IMPORT_ERROR_SALESMAN,
    payload: salesman,
  };
};
export const getReq = () => {
    return {
      type: FETCH_SALES_REQ,
    };
  };
  
  export const getSuccess = (list) => {
    return {
      type: FETCH_SALES_LIST,
      payload: list,
    };
  };
  export const getError = (error) => {
    return {
      type: FETCH_SALES_ERROR,
      error: error,
    };
  };
  
  export const fetchsalesman = (startRange,recordLimit,sellerId,cityId) => {
    return (dispatch) => {
      dispatch(getReq);
      axios
        .post(Constant.getAPI() + `/salesman/list`,{startRange,recordLimit,sellerId,cityId},
         {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data.success == true) {
            const list = res.data;
            console.log(res.data)
            dispatch(getSuccess(list));
          }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getError(errMsg));
        });
    };
  };

  export const importSalesman = (file) => {
    return (dispatch) => {
      dispatch(getReq);
    
      const formData = new FormData();
        formData.append("sheet", file);
      console.log(file)
      axios
        .post(Constant.getAPI() + "/imports/salesman", formData, {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
          },
        })
        .then((res) => {
            const list = res.data;
            dispatch(getImportError(list))
           
        })
        .catch((err) => {
          const errMsg = err.message;
          console.log(err)
          dispatch(getError('Error'));
        });
    };
  };