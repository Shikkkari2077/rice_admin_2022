import axios from "axios";
import Constant from "../../Constant";
import { FETCH_CANCELLATION_LIST, FETCH_CANCELLATION_ERROR, FETCH_CANCELLATION_REQ ,FETCH_CANCELLATION_ADD,FETCH_CANCELLATION_DET} from "../types";
import qs from 'qs';
import Swal from "sweetalert2";

export const getCanreasonReq = () => {
  return {
    type: FETCH_CANCELLATION_REQ,
  };
};

export const getCanreasonSucess = (reasons_list) => {
  return {
    type: FETCH_CANCELLATION_LIST,
    payload: reasons_list,
  };
};

export const addCanreasonSucess = (reasons_add) => {
  return {
    type: FETCH_CANCELLATION_ADD,
    payload: reasons_add,
  };
};
export const getReasonDetails = (reasons_det) => {
  return {
    type: FETCH_CANCELLATION_DET,
    payload: reasons_det,
  };
};
export const getCanreasonError = (error) => {
  return {
    type: FETCH_CANCELLATION_ERROR,
    error: error,
  };
};

export const fetchreasonsList = () => {
  return (dispatch) => {
    dispatch(getCanreasonReq);
    axios
      .post(Constant.getAPI() + "/setting/reasonofcancellation/list", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const reasons_list = res.data.data;
          dispatch(getCanreasonSucess(reasons_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getCanreasonError(errMsg));
      });
  };
};

export const addReasonsList = (reason,priority) => {
  return (dispatch) => {
    dispatch(getCanreasonReq);
    axios
      .post(Constant.getAPI() + "/setting/reasonofcancellation/add", qs.stringify({
        reason:reason,
        priority:priority
      }),{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
          console.log(res)
          if (res.data.success === true) {
            const reasons_add = res.data;
            // dispatch(addCanreasonSucess(reasons_add));
            Swal.fire({
              title: "Added Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                window.location.href = "#/cancellation-resaon";
                window.location.reload();
              }
            });
          
          }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getCanreasonError(errMsg));
      });
  };
};

export const updateReasonsList = (id,reason,priority) => {
  return (dispatch) => {
    dispatch(getCanreasonReq);
    axios
      .patch(Constant.getAPI() + "/setting/reasonofcancellation/edit/"+id, qs.stringify({
        reason:reason,
        priority:priority
      }),{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
          console.log(res)
          if (res.data.success === true) {
            const reasons_add = res.data;
            dispatch(addCanreasonSucess(reasons_add));
            Swal.fire({
              title: "Updated Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                window.location.href = "#/cancellation-resaon";
                window.location.reload();
              }
            });
          }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getCanreasonError(errMsg));
      });
  };
};


export const updateStatusReasonsList = (id,status) => {
  return (dispatch) => {
    dispatch(getCanreasonReq);
    axios
      .patch(Constant.getAPI() + "/setting/reasonofcancellation/edit/"+id, qs.stringify({
        status:status
      }),{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
          console.log(res)
          if (res.data.success === true) {
            const reasons_add = res.data;
            dispatch(addCanreasonSucess(reasons_add));
            Swal.fire({
              title: "Updated Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                // window.location.href = "#/cancellation-resaon";
                window.location.reload();
              }
            });
          }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getCanreasonError(errMsg));
      });
  };
};

export const getCancReasonDetails = (id) => {
  return (dispatch) => {
    dispatch(getCanreasonReq);
    const reasonId={reasonId:id}
    axios
      .post(
        Constant.getAPI() + "/setting/reasonofcancellation/list",qs.stringify(reasonId),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        // if (res.status === true) {
        console.log(res);
        const reasons_det = res.data.data;
        dispatch(getReasonDetails(reasons_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getCanreasonError(err));
      });
  };
};