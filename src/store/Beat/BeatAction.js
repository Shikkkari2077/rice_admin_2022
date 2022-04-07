import axios from "axios";
import Constant from "../../Constant";
import { 
    FETCH_BEAT_REQ,
    FETCH_BEAT_LIST,
    FETCH_BEAT_ERROR,
    FETCH_IMPORT_ERROR
} from "../types";
import Swal from "sweetalert2";

export const getReq = () => {
    return {
      type: FETCH_BEAT_REQ,
    };
  };
  
  export const getSuccess = (salesman) => {
    return {
      type: FETCH_BEAT_LIST,
      payload: salesman,
    };
  };
  export const getImportError = (salesman) => {
    return {
      type: FETCH_IMPORT_ERROR,
      payload: salesman,
    };
  };
  export const getError = (error) => {
    return {
      type: FETCH_BEAT_ERROR,
      error: error,
    };
  };
  
  export const fetchBeatList = (startRange,recordLimit,sellerId,cityId) => {
    return (dispatch) => {
      dispatch(getReq);
      axios
        .post(Constant.getAPI() + `/beat/list`,{
          startRange,
          recordLimit,
          sellerId,
          cityId
        }, 
          {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
          },
        })
        .then((res) => {
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

  export const importBeat = (file) => {
    return (dispatch) => {
      dispatch(getReq);
    
      const formData = new FormData();
        formData.append("sheet", file);
      console.log(file)
      axios
        .post(Constant.getAPI() + "/imports/beat", formData, {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
          },
        })
        .then((res) => {
          // if (res.status === true) {
            const list = res.data;
            console.log(res.data)
           // dispatch(getSuccess(list));
            dispatch(getImportError(list))
            //window.location.href = "#/beat_list";
            //window.location.reload();
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          console.log(err)
          dispatch(getError('Error'));
        });
    };
  };