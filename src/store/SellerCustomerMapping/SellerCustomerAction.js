import axios from "axios";
import Constant from "../../Constant";
import {
    FETCH_SELLERCUS_REQ,
    FETCH_SELLERCUS_LIST,
    FETCH_SELLERCUS_IMPORT,
    FETCH_BUSINESS_TYPE,
    FETCH_SELLERCUS_ERROR,
    SELLER_CUSTOMER_IMPORT,
    FETCH_INTRESTED_CATEGORIES,
    OTP_REGISTERED,
} from "../types";
import Swal from "sweetalert2";

export const getSellerCustomerReq = () => {
    return {
      type: FETCH_SELLERCUS_REQ
    };
  };

  export const getSellerCusSucess = (list) => {
    return {
      type: FETCH_SELLERCUS_LIST,
      payload: list,
    };
  };

  export const getSellerCusImport = (list) => {
    return {
      type: FETCH_SELLERCUS_IMPORT,
      payload: list,
    };
  };
  export const getBusinessType = (list) => {
    return {
      type: FETCH_BUSINESS_TYPE,
      payload:list
    };
  };
 
  export const getSellerCusError = (error) => {
    return {
      type: FETCH_SELLERCUS_ERROR,
      error: error,
    };
  };

  export const fetchSellerCustomer = (startRange,recordLimit,sellerId,cityId,categoryId,businessLineId,phone) => {
    return (dispatch) => {
      dispatch(getSellerCustomerReq);
      axios
        .post(Constant.getAPI() + `/userseller/list`, {
          startRange,
          recordLimit,
          sellerId,
          cityId,
          categoryId,
          businessLineId,
          phone,
          
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          const list = res.data;
          console.log(res.data)
          dispatch(getSellerCusSucess(list));
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getSellerCusError(errMsg));
        });
    };
  };

  export const OTPRegistered = (startRange,recordLimit,registerType,phone) => {
    return (dispatch) => {
      dispatch(getSellerCustomerReq);
      axios
        .post(Constant.getAPI() + `/user/verification/status/list`, {
          startRange,
          recordLimit,
          phone
         },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          const list = res.data;
          console.log(res.data)
          if(res.data.success == true){
          dispatch({
            type:OTP_REGISTERED,
            payload:res.data.data
          });
        }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getSellerCusError(errMsg));
        });
    };
  };

  export const fetchcustomercategory = (startRange,recordLimit,sellerId,cityId,categoryId,businessLineId,phone) => {
    return (dispatch) => {
      dispatch(getSellerCustomerReq);
      axios
        .post(Constant.getAPI() + `/category/list-interest`, {
          startRange,
          recordLimit,
          sellerId,
          cityId,
          categoryId,
          businessLineId,
          phone,
          
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          const list = res.data;
          console.log(res.data)
          dispatch({
            type: FETCH_INTRESTED_CATEGORIES,
            payload: list,
          });
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getSellerCusError(errMsg));
        });
    };
  };


  export const postImportSellerCustomer = (file) => {
    return (dispatch) => {
      dispatch(getSellerCustomerReq);
      const formData = new FormData();
      formData.append("sheet", file);
      console.log(file);
      axios
        .post(Constant.getAPI() + "/imports/userseller", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          if (res.data.success === true) {
          console.log(res.data)
           dispatch({
             type:SELLER_CUSTOMER_IMPORT,
             payload:res.data
           });
          }
        })
        .catch((err) => {
          const errMsg = err.message;
          console.log(err);
          dispatch(getSellerCusError("Error"));
        });
    };
  };

  export const ImportPhoneNumbers = (file) => {
    return (dispatch) => {
      dispatch(getSellerCustomerReq);
      const formData = new FormData();
      formData.append("sheet", file);
      console.log(file);
      axios
        .post(Constant.getAPI() + "/imports/updateCustomerPhone", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          if (res.data.success === true) {
          console.log(res.data)
           dispatch({
             type:SELLER_CUSTOMER_IMPORT,
             payload:res.data
           });
          }
        })
        .catch((err) => {
          const errMsg = err.message;
          console.log(err);
          dispatch(getSellerCusError("Error"));
        });
    };
  };


  export const sellerCustomerUpdate = (categorySellerArray,userId) => {
    return (dispatch) => {
      dispatch(getSellerCustomerReq);
      axios
        .post(Constant.getAPI() + `/userseller/update`, {
          categorySellerArray,userId
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          const list = res.data;
          console.log(res.data)
          if (res.data.success === true) {
            Swal.fire({
              title: "Saved Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                window.location.href = "#/seller_customer";
                window.location.reload();
              }
            });
          }

          //dispatch(getSellerCusSucess(list));
        })
        .catch((err) => {
          const errMsg = err.message;
          //dispatch(getSellerCusError(errMsg));
        });
    };
  };

  export const fetchBussinessType = () => {
    return (dispatch) => {
      dispatch(getSellerCustomerReq);
      axios
        .post(Constant.getAPI() + `/business/type/list`, {
        
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          const list = res.data;
          console.log(res.data)
          dispatch(getBusinessType(list))
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getSellerCusError(errMsg));
        });
    };
  };

  
  export const UserUpdate = (data) => {
    return (dispatch) => {
      axios
        .patch(Constant.getAPI() + `/user/update`, data,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          const list = res.data;
          console.log(res.data)
          if (res.data.success === true) {
            Swal.fire({
              title: "Updated Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                dispatch(fetchSellerCustomer(0,50))
                window.location.href = "#/seller_customer";
              }
            });
          }
          else{
            
             console.log("Response")
          }

          //dispatch(getSellerCusSucess(list));
        })
        .catch((err) => {
          console.log(err.response.data)
          const errMsg = err.message;
          Swal.fire({
            title: err.response.data.message,
            icon: "warning",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              //window.location.reload()
            }
          });
          dispatch(getSellerCusError(errMsg));
        })
    };
  };