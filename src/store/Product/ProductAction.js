/* eslint-disable no-unused-vars */
import axios from "axios";
import Constant from "../../Constant";
import { FETCH_PRODUCT_LIST, FETCH_PRODUCT_DEPARTMENT,  FETCH_PRODUCT_ERROR, FETCH_PRODUCT_REQ,FETCH_PRODUCTIMPORT_LIST,FETCH_PRODUCT_SELLER_LIST } from "../types";
import qs from 'qs';
import Swal from "sweetalert2";

export const getproductReq = () => {
  return {
    type: FETCH_PRODUCT_REQ,
  };
};

export const getproductSucess = (product_list) => {
  return {
    type: FETCH_PRODUCT_LIST,
    payload: product_list,
  };
};

export const getproductDepartment = (department_list) => {
  return {
    type: FETCH_PRODUCT_DEPARTMENT,
    payload: department_list,
  };
};


export const getSellerproductSucess = (product_seller) => {
  return {
    type: FETCH_PRODUCT_SELLER_LIST,
    payload: product_seller,
  };
};

export const getproductimportSucess = (importproduct_list) => {
  return {
    type: FETCH_PRODUCTIMPORT_LIST,
    payload: importproduct_list,
  };
};

export const getproductError = (error) => {
  return {
    type: FETCH_PRODUCT_ERROR,
    error: error,
  };
};

export const fetchProductList = (range,recordLimit,productSKU,productName) => {
  console.log(range,recordLimit)
  return (dispatch) => {
    dispatch(getproductReq);
    axios
      .post(Constant.getAPI() + "/product/list", 
      {
        startRange: range,
        recordLimit,
        productSKU,
        productName
    },
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('role')=='admin'?localStorage.getItem('superadmin_auth'):localStorage.getItem('seller_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const product_list = res.data;
          console.log(res.data)
          dispatch(getproductSucess(product_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getproductError(errMsg));
      });
  };
};

export const fetchProductDepartmentList = () => {
  
  return (dispatch) => {
    dispatch(getproductReq);
    axios
      .post(Constant.getAPI() + "/productdepartment/list", 
      {
       
      },
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const Department_list = res.data;
          console.log(res.data)
          dispatch(getproductDepartment(Department_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getproductError(errMsg));
      });
  };
};

export const uploadProductList = (status,id,redirect) => {
  return (dispatch) => {
    dispatch(getproductReq);
    axios
      .patch(Constant.getAPI() + "/product/edit/"+ id,qs.stringify({
       available:status
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        //console.log(res);
        if (res.data.success === true) {
          //const delivery_add = res.data;
          dispatch(fetchProductList(redirect.range,redirect.length,redirect.sku,redirect.name))

          // dispatch(addcouponSucess(delivery_add));
          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          })
        
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getproductError(errMsg));
      });
  };
};

export const ProductADD = (data) => {
  return (dispatch) => {
    dispatch(getproductReq);
    axios
      .post(Constant.getAPI() + "/product/add",data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        //console.log(res);
        if (res.data.success === true) {
         
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          })
        
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getproductError(errMsg));
      });
  };
};


export const postImportProduct = (file) => {
  return (dispatch) => {
    dispatch(getproductReq);
    // const payload = {
    //   sheet:file
    // }
    const formData = new FormData();
      formData.append("sheet", file);
    console.log(file)
    axios
      .post(Constant.getAPI() + "/imports/product", formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const importproduct_list = res.data;
          console.log(res)
          dispatch(getproductimportSucess(importproduct_list));
          //window.location.href = "/product";
          //window.location.reload();
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err)
        dispatch(getproductError('Error'));
      });
  };
};
