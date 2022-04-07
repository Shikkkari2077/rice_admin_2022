import axios from 'axios'
import Constant from '../../Constant'
import {
    FETCH_PAY_ERROR,
    FETCH_SELLERPAY_REQ,
    SELLER_PAYTM_LIST,
    SELLER_PAYTM_DETAIL

} from '../types'
import Swal from 'sweetalert2'

export const getNotificationError = (error) => {
    return {
      type: FETCH_PAY_ERROR,
      error: error,
    };
  };
  export const getSellerPaymentList = (seller) => {
    return {
      type: SELLER_PAYTM_LIST,
      payload: seller,
    };
  };
  

  export const getNotificationReq = () => {
    return {
      type: FETCH_SELLERPAY_REQ,
    };
  };
  
  export const getSellerPaymentDetails = (seller) => {
    return {
      type: SELLER_PAYTM_DETAIL,
      payload: seller,
    };
  };

  export const fetchSellerPaytm = () => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/seller/cred/list",{} ,{
          headers: {
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status == 200) {
         const seller=res.data
       
          dispatch(getSellerPaymentList(seller));

         }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };

  export const fetchSellerPaytmDetail = (sellerId) => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/seller/cred/list",{sellerId} ,{
          headers: {
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status === 200) {
               const seller=res.data
        //   dispatch({
        //     type: SELLER_PAYTM_DETAIL,
        //     payload: res.data,
        //   });
       
          dispatch(getSellerPaymentDetails(seller));

         }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };
  export const addSellerPaytm = (seller_uniqueId,seller_mid,seller_mkey) => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/seller/cred/add",{
            seller_uniqueId,
            seller_mid,
            seller_mkey,
         
      } ,{
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status === 200) {
            Swal.fire({
              title: "Added Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
             window.location.href = "#/SellerPaytmControl/list";
                // window.location.reload();
              }
          })
           }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };

  export const updateSellerPaytm = (sellerId,seller_uniqueId,seller_mid,seller_mkey) => {
   var data
   if(seller_mid!=='')
    data={
      sellerId,
      seller_uniqueId,
      seller_mid,
      seller_mkey,

    }
    else{
      data={
        sellerId,
        seller_uniqueId,
        seller_mkey,

      }
    }
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/seller/cred/update",data
      ,{
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status === 200) {
            Swal.fire({
              title: "Updated Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                dispatch(fetchSellerPaytm())

             window.location.href =  "#/SellerPaytmControl/list";
                // window.location.reload();
              }
          })
           }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };
  export const updateSellerPaytmstatus = (sellerId,status) => {
      console.log(sellerId,status)
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/seller/cred/update",{
            sellerId,
            status
         
      } ,{
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status === 200) {
            Swal.fire({
              title: "status Updated",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                dispatch(fetchSellerPaytm())
            // window.location.href =  "#/SellerPaytmControl/list";
                // window.location.reload();
              }
          })
           }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };
