import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_STATE_LIST,
  FETCH_STATE_ERROR,
  FETCH_STATE_REQ,
  FETCH_STATE_ADD,
  FETCH_STATE_UPDATE,
  FETCH_STATE_DETAIL
} from "../types";
import Swal from "sweetalert2";

export const getstateReq = () => {
  return {
    type: FETCH_STATE_REQ,
  };
};

export const getstateSucess = (state_list) => {
  return {
    type: FETCH_STATE_LIST,
    payload: state_list,
  };
};

export const addstateSucess = (state_res) => {
  return {
    type: FETCH_STATE_ADD,
    payload: state_res,
  };
};

export const updatestateSucess = (state_upd) => {
  return {
    type: FETCH_STATE_UPDATE,
    payload: state_upd,
  };
};

export const getstateDetails = (state_det) => {
  return {
    type: FETCH_STATE_DETAIL,
    payload: state_det,
  };
};

export const getstateError = (error) => {
  return {
    type: FETCH_STATE_ERROR,
    error: error,
  };
};

export const fetchstateList = (startRange,recordLimit) => {
  return (dispatch) => {
    dispatch(getstateReq);
    axios
      .post(Constant.getAPI() + "/state/list",{
        startRange,
        recordLimit

      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
        const state_list = res.data;
        dispatch(getstateSucess(state_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getstateError(errMsg));
      });
  };
};

export const StateAddOne = (name, countryId,status) => {
  return (dispatch) => {
    dispatch(getstateReq);
    axios
      .post(
        Constant.getAPI() + "/state/addOne",
        {
          name: name,
          countryId: countryId,
          status:status
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        const state_res = res.data.data;
        dispatch(addstateSucess(state_res));
        if (state_res.status === true) {
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              window.location.href = "#/State";
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getstateError(errMsg));
      });
  };
};

export const getOneStateDetails = (id) => {
  return (dispatch) => {
    dispatch(getstateReq);
    axios
      .get(Constant.getAPI() + "/state/describe/"+id,  {
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          console.log(res)
        const state_det = res.data.data;
        dispatch(getstateDetails(state_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getstateError("Error"));
      });
  };
};

export const StateUpdateOne = (countryId,name,stateId,status) => {
  return (dispatch) => {
    dispatch(getstateReq);
    axios
      .patch(
        Constant.getAPI() + "/state/edit/"+stateId,
        {
          name: name,
          countryId: countryId,
          status:status
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // if (res.status === true) {
      const state_upd = res.data;
      dispatch(updatestateSucess(state_upd));
      // }
      if (state_upd.status === true) {
        Swal.fire({
          title: "Updated Successfully",
          icon: "success",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        }).then((value) => {
          if(value){
            window.location.href = "#/state";
            window.location.reload();
          }
        });
      }
      else{
        Swal.fire({
          title: "Something went wrong. Try again after some Time.!",
          icon: 'error',
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok"
        });
    } 
      }
     
    })
    .catch((err) => {
      const errMsg = err.message;
      console.log(err);
      if(err){
        Swal.fire({
          title: "Something Wrong",
          icon: "wrong",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        })
      }
      dispatch(getstateError(errMsg));
    });
  };
};


export const StateStatusUpdateOne = (id,Status) => {
  return (dispatch) => {
    dispatch(getstateReq);
    axios
      .patch(
        Constant.getAPI() + "/state/edit/"+id,
        {
          Status:Status
          },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // if (res.status === true) {
      const state_upd = res.data;
      dispatch(updatestateSucess(state_upd));
      // }
      if (state_upd.status === true) {
        Swal.fire({
          title: "Updated Successfully",
          icon: "success",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        }).then((value) => {
          if(value){
            window.location.href = "#/state";
            window.location.reload();
          }
        });
      }
      else{
        Swal.fire({
          title: "Something went wrong. Try again after some Time.!",
          icon: 'error',
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok"
        });
    } 
      }
     
    })
    .catch((err) => {
      const errMsg = err.message;
      console.log(err);
      if(err){
        Swal.fire({
          title: "Something Wrong",
          icon: "wrong",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        })
      }
      dispatch(getstateError(errMsg));
    });
  };
};