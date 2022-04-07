import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_COUNTRY_LIST,
  FETCH_COUNTRY_ERROR,
  FETCH_COUNTRY_REQ,
  FETCH_COUNTRY_ADD,
  FETCH_COUNTRY_DETAIL,
  FETCH_COUNTRY_UPDATE,

} from "../types";
import Swal from "sweetalert2";

export const getcountryReq = () => {
  return {
    type: FETCH_COUNTRY_REQ,
  };
};

export const getcountrySucess = (country_list) => {
  return {
    type: FETCH_COUNTRY_LIST,
    payload: country_list,
  };
};

export const getcountryAdd = (country_res) => {
  return {
    type: FETCH_COUNTRY_ADD,
    payload: country_res,
  };
};

export const getcountryUpdate = (country_updated) => {
  return {
    type: FETCH_COUNTRY_UPDATE,
    payload: country_updated,
  };
};

export const getcountryDetails = (country_deatils) => {
  return {
    type: FETCH_COUNTRY_DETAIL,
    payload: country_deatils,
  };
};

export const getcountryError = (error) => {
  return {
    type: FETCH_COUNTRY_ERROR,
    error: error,
  };
};

export const CountryAddOne = (name ,currency,status) => {
  return (dispatch) => {
    // dispatch(getcountryReq);/api/country/edit/bbe072d3-0b7a-43cb-9614-035be10264b2
    axios
      .post(
        Constant.getAPI() + "/country/addOne",
        { status:status,
          currency: currency,
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        // if (res.status === true) {
        const country_res = res.data;
        dispatch(getcountryAdd(country_res));
        // }
        if (country_res.status === true) {
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if(value){
              window.location.href = "#/country";
              window.location.reload();
            }
          });
        } 
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getcountryError("Error"));
      });
  };
};

export const fetchCountryList = () => {
  return (dispatch) => {
    dispatch(getcountryReq);
    axios
      .get(Constant.getAPI() + "/country/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
        const country_list = res.data;
        dispatch(getcountrySucess(country_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getcountryError("Error"));
      });
  };
};

export const getDetails = (id) => {
  return (dispatch) => {
    dispatch(getcountryReq);
    axios
      .get(Constant.getAPI() + "/country/describe/"+id, {
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          console.log(res)
        const country_det = res.data.data;
        dispatch(getcountryDetails(country_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getcountryError("Error"));
      });
  };
};

export const updateCountry = (countryId,name,currency,status) => {
  return (dispatch) => {
    dispatch(getcountryReq);
    axios
      .patch(
        Constant.getAPI() + "/country/edit/"+countryId,
        {
          currency: currency,
          name: name,
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
        const country_updated = res.data;
        dispatch(getcountryUpdate(country_updated));
        // }
        if (country_updated.status === true) {
          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if(value){
              window.location.href = "#/country";
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
        dispatch(getcountryError(errMsg));
      });
  };
};

export const updateStatusCountry = (countryId,status) => {
  return (dispatch) => {
    dispatch(getcountryReq);
    axios
      .patch(
        Constant.getAPI() + "/country/edit/"+countryId,
        {
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
        const country_updated = res.data;
        dispatch(getcountryUpdate(country_updated));
        // }
        if (country_updated.status === true) {
          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if(value){
               window.location.href = "#/country";
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
        dispatch(getcountryError(errMsg));
      });
  };
};