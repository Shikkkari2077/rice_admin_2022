import axios from "axios";
import Constant from "../../Constant";
import { FETCH_CITY_LIST, FETCH_CITY_ERROR, FETCH_CITY_REQ,FETCH_CITY_ADD,
  FETCH_CITY_UPDATE,
  FETCH_CITY_DETAIL } from "../types";
import Swal from "sweetalert2";

export const getcityReq = () => {
  return {
    type: FETCH_CITY_REQ,
  };
};

export const getcitySucess = (city_list) => {
  return {
    type: FETCH_CITY_LIST,
    payload: city_list,
  };
};

export const addCitySucess = (city_res) => {
  return {
    type: FETCH_CITY_ADD,
    payload: city_res,
  };
};

export const updateCitySucess = (city_upd) => {
  return {
    type: FETCH_CITY_UPDATE,
    payload: city_upd,
  };
};

export const getCityDetails = (city_det) => {
  return {
    type: FETCH_CITY_DETAIL,
    payload: city_det,
  };
};


export const getcityError = (error) => {
  return {
    type: FETCH_CITY_ERROR,
    error: error,
  };
};

export const fetchcityList = () => {
  return (dispatch) => {
    dispatch(getcityReq);
    axios
      .get(Constant.getAPI() + `/city/list`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const city_list = res.data;
          console.log(res.data)
          dispatch(getcitySucess(city_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getcityError(errMsg));
      });
  };
};


export const CityAddOne = (name, stateId,status) => {
  return (dispatch) => {
    dispatch(getcityReq);
    axios
      .post(
        Constant.getAPI() + "/city/add",
        {
          name: name,
          stateId: stateId,
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
        console.log(res)
        dispatch(addCitySucess(state_res));
        if (res.data.success === true) {
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              window.location.href = "#/city";
              //window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getcityError(errMsg));
      });
  };
};

export const getOneCityDetails = (id) => {
  return (dispatch) => {
    dispatch(getcityReq);
    axios
      .get(Constant.getAPI() + "/city/describe/"+id,  {
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          console.log(res)
        const state_det = res.data.data;
        dispatch(getCityDetails(state_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getcityError("Error"));
      });
  };
};

export const CityUpdateOne = (cityId,status,name,stateId) => {
  return (dispatch) => {
    dispatch(getcityReq);
    axios
      .patch(
        Constant.getAPI() + "/city/edit/"+cityId,
        {
          name: name,
          stateId:stateId,
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
      dispatch(updateCitySucess(state_upd));
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
            window.location.href = "#/city";
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
      dispatch(getcityError(errMsg));
    });
  };
};


export const cityStatusUpdateOne = (id,status) => {
  console.log(`/city/edit/${id}`,status)
  let st
  status?st=false:st=true
  console.log(`/city/edit/${id}`,st)

  return (dispatch) => {
    dispatch(getcityReq);
    axios
      .patch(Constant.getAPI() + `/city/edit/${id}`,
        {
          status:st,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          // if (res.status === true) {
      const state_upd = res.data;
      dispatch(updateCitySucess(state_upd));
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
            window.location.href = "#/city";
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
      dispatch(getcityError(errMsg));
    });
  };
};