/* eslint-disable no-unused-vars */
import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_SELLERPINCODE_LIST,
  FETCH_SELLERPINCODE_ERROR,
  FETCH_SELLERPINCODE_REQ,
  FETCH_SELLERPINCODEIMPORT_LIST
} from "../types";

export const getsellerPincodeReq = () => {
  return {
    type: FETCH_SELLERPINCODE_REQ,
  };
};

export const getsellerPincodeSucess = (sellerPinocde_list) => {
  return {
    type: FETCH_SELLERPINCODE_LIST,
    payload: sellerPinocde_list,
  };
};
export const getpincodeimportSucess = (sellerpincode_list) => {
  return {
    type: FETCH_SELLERPINCODEIMPORT_LIST,
    payload: sellerpincode_list,
  };
};
export const getsellerPincodeError = (error) => {
  return {
    type: FETCH_SELLERPINCODE_ERROR,
    error: error,
  };
};

export const fetchSellerPincodeList = (range,limit,pincode,seller) => {
  return (dispatch) => {
    dispatch(getsellerPincodeReq);
    axios
      .get(Constant.getAPI() + `/pincodeseller/list?startRange=${
        range}&recordLimit=${
          limit}&pincode=${pincode}&sellerIds=${seller}&adminId=${localStorage.getItem('superadmin_id')}`, {
        headers: {
          "Content-Type": "application/json",
           "Authorization":`Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        const sellerPinocde_list = res.data;
        console.log(res.data)
        dispatch(getsellerPincodeSucess(sellerPinocde_list));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getsellerPincodeError(errMsg));
      });
  };
};

export const postImportSellerPincode = (file) => {
  return (dispatch) => {
    dispatch(getsellerPincodeReq);
    // const payload = {
    //   sheet:file
    // }
    const formData = new FormData();
      formData.append("sheet", file);
    console.log(file)
    axios
      .post(Constant.getAPI() + "/imports/pincodeseller", formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const importSellerPincode_list = res.data;
          dispatch(getpincodeimportSucess(importSellerPincode_list));
          window.location.href = "/sellerpincode";
          window.location.reload();
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err)
        dispatch(getsellerPincodeError('Error'));
      });
  };
};
