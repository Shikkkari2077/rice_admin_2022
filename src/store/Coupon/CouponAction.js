import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_COUPON_LIST,
  FETCH_COUPON_ERROR,
  FETCH_COUPON_REQ,
  FETCH_COUPON_ADD,
  FETCH_COUPON_UPDATE,
  FETCH_COUPON_DET,
} from "../types";
import Swal from "sweetalert2";
export const getcouponReq = () => {
  return {
    type: FETCH_COUPON_REQ,
  };
};

export const getcouponSucess = (coupon_list) => {
  return {
    type: FETCH_COUPON_LIST,
    payload: coupon_list,
  };
};

export const addcouponSucess = (coupon_add) => {
  return {
    type: FETCH_COUPON_ADD,
    payload: coupon_add,
  };
};

export const detcouponSucess = (coupon_det) => {
  return {
    type: FETCH_COUPON_DET,
    payload: coupon_det,
  };
};

export const updatecouponSucess = (coupon_add) => {
  return {
    type: FETCH_COUPON_UPDATE,
    payload: coupon_add,
  };
};

export const getcouponError = (error) => {
  return {
    type: FETCH_COUPON_ERROR,
    error: error,
  };
};

export const fetchCouponList = (range,length) => {
  return (dispatch) => {
    dispatch(getcouponReq);
    axios
      .post(Constant.getAPI() + "/coupon/get", {
        startRange:range,
        recordLimit:length
      },{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
        const coupon_list = res.data;
        // console.log(res.data)
        dispatch(getcouponSucess(coupon_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getcouponError("Error"));
      });
  };
};

export const addCoupon = (data) => {
  return (dispatch) => {
    dispatch(getcouponReq);
    
      axios
      .post(
        Constant.getAPI() + "/coupon/add",
      data,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          const coupon_add = res.data;
          // dispatch(addcouponSucess(delivery_add));
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              window.location.href = "#/coupon-master";
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getcouponError(errMsg));
      });
  };
};

export const getDeliveryboyDetails = (id) => {
  return (dispatch) => {
    dispatch(getcouponReq);
    
    axios
      .post(
        Constant.getAPI() + "/coupon/get",
        {
          "couponId":id
      },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        // if (res.status === true) {
        console.log(res);
        const delivery_det = res.data.data;
        dispatch(detcouponSucess(delivery_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getcouponError(err));
      });
  };
};

export const updateCoupomList = (data) => {
  return (dispatch) => {
    dispatch(getcouponReq);
    axios
      .post(
        Constant.getAPI() + "/coupon/edit",
           data,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          const delivery_add = res.data;
          dispatch(addcouponSucess(delivery_add));
          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              window.location.href = "#/coupon-master";
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getcouponError(errMsg));
      });
  };
};

