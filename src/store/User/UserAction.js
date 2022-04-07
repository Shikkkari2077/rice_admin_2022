import axios from "axios";
import Constant from "../../Constant";
import { FETCH_CUSTOMER_LIST, FETCH_CUSTOMER_ERROR, FETCH_CUSTOMER_REQ,FETCH_GUEST_LIST,FETCH_BUSINESS_LINE } from "../types";
import Swal from "sweetalert2";

export const getcustomerReq = () => {
  return {
    type: FETCH_CUSTOMER_REQ,
  };
};

export const getcustomerSucess = (customer_list) => {
  return {
    type: FETCH_CUSTOMER_LIST,
    payload: customer_list,
  };
};
export const getguestcustomerSucess = (customer_list) => {
  return {
    type: FETCH_GUEST_LIST,
    payload: customer_list,
  };
};
export const getbusinessline = (customer_list) => {
  return {
    type: FETCH_BUSINESS_LINE,
    payload: customer_list,
  };
};
export const getcustomerError = (error) => {
  return {
    type: FETCH_CUSTOMER_ERROR,
    error: error,
  };
};

export const fetchuserList = (startRange,recordLimit,phone) => {
  return (dispatch) => {
    var data={
      startRange,
      recordLimit,
      adminId:localStorage.getItem('superadmin_id')

    }
    if(phone !== undefined && phone !==""){
      data={...data,phone}
    }
    dispatch(getcustomerReq);
    axios
      .post(Constant.getAPI() + `/user/list`,data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const customer_list = res.data;
          console.log(res.data)
          dispatch(getcustomerSucess(customer_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getcustomerError(errMsg));
      });
  };
};

export const fetchguestuserList = (range,limit) => {
  return (dispatch) => {
    dispatch(getcustomerReq);
    axios
      .get(Constant.getAPI() + `/guest/userlist?startRange=${range}&recordLimit=${limit}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const customer_list = res.data;
          dispatch(getcustomerSucess(customer_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getcustomerError(errMsg));
      });
  };
};


export const changeUserStatus = (status,userId) => {
  console.log(status,userId,localStorage.getItem('superadmin_auth'))
  return (dispatch) => {
    axios
      .post(Constant.getAPI() +"/user/updateStatus" ,
      {
        userId:userId,
        status:status
      } 
      ,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          const delivery_add = res.data;
          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getcustomerError(errMsg));
      });
    
    
  };
};

export const fetchbusinessline = () => {
  return (dispatch) => {
    dispatch(getcustomerReq);
    axios
      .post(Constant.getAPI() + `/businessLine/list`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
          const list = res.data;
          dispatch(getbusinessline(list));
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getcustomerError(errMsg));
      });
  };
};