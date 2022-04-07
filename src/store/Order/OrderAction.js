/* eslint-disable no-unused-vars */
import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_ORDER_LIST,
  FETCH_ORDER_ERROR,
  FETCH_ORDER_DOWN,
  FETCH_ORDER_REQ,
  FETCH_ORDER_UPDATE,
  FETCH_ORDER_DET,
  FETCH_PREORDER_LIST,
} from "../types";
import Swal from "sweetalert2";
import qs from "qs";

export const getorderReq = () => {
  return {
    type: FETCH_ORDER_REQ,
  };
};

export const getorderSucess = (order_list) => {
  return {
    type: FETCH_ORDER_LIST,
    payload: order_list,
  };
};

export const downorderSucess = (order_down) => {
  return {
    type: FETCH_ORDER_DOWN,
    payload: order_down,
  };
};
export const updateorderSucess = (order_det) => {
  return {
    type: FETCH_ORDER_UPDATE,
    payload: order_det,
  };
};

export const getorderdetSucess = (order_det) => {
  return {
    type: FETCH_ORDER_DET,
    payload: order_det,
  };
};

export const getorderPaymentSucess = (preorder_list) => {
  return {
    type: FETCH_PREORDER_LIST,
    payload: preorder_list,
  };
};

export const getorderError = (error) => {
  return {
    type: FETCH_ORDER_ERROR,
    error: error,
  };
};

export const fetchOrderList = (
  data,
  seller,
  pincode,
  city,
  date,
  range,
  length,
  openOrders,
  invoiceID,
  customerId,
  inProcessOrders
) => {
  return (dispatch) => {
    dispatch(getorderReq);
    console.log(data, seller, pincode, city, date, range, length, openOrders);
    if (localStorage.getItem("role") === "seller") {
      var data1 = {
        statusType: data,
        startRange: range,
        recordLimit: length,
        start_date: date,
        sellerId: localStorage.getItem('seller_id'),
        pinCode: pincode,
        city: city,
        openOrders: openOrders,
        invoice_number:invoiceID,
        customerId,
        inProcessOrders
      };
       
      axios
        .post(Constant.getAPI() + "/order/list",data1, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("seller_auth")}`,
          },
        })
        .then((res) => {
          // if (res.status === true) {
          const order_list = res.data;
          
          dispatch(getorderSucess(order_list));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    } else if (
      localStorage.getItem("role") === "admin" ||
      localStorage.getItem("role") === "other"
    ) {
      const data1 = {
        statusType: data,
        start_date: date,
        sellerId: seller,
        pinCode: pincode,
        city: city,
        startRange: range,
        recordLimit: length,
        openOrders: openOrders,
        invoice_number:invoiceID,
        customerId,   
        inProcessOrders

      };
   console.log(data1)
      axios
        .post(
          Constant.getAPI() + "/order/list", data1,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_list = res.data;
          console.log(res.data)
          dispatch(getorderSucess(order_list));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    }
  };
};

export const fetchOrderListre = (
  data,
  seller,
  pincode,
  city,
  paymentType,
  date,
  range,
  length,
  invoice_number,
  customerId
) => {
  return (dispatch) => {
    dispatch(getorderReq);
    console.log(data, seller, pincode, city, date, range, length);
    if (localStorage.getItem("role") === "seller") {
      axios
        .post(
          Constant.getAPI() + "/order/listr",
          qs.stringify({
            statusType: data,
            startRange: range,
            recordLimit: length,
            start_date: date,
            paymentType: paymentType,
            sellerId: localStorage.getItem('seller_id'),
            pinCode: pincode,
            city: city,
            invoice_number,
            customerId
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem("seller_auth")}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_list = res.data;
          console.log("data",res.data)
          dispatch(getorderSucess(order_list));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    } else if (
      localStorage.getItem("role") === "admin" ||
      localStorage.getItem("role") === "other"
    ) {
      axios
        .post(
          Constant.getAPI() + "/order/list",
          qs.stringify({
            statusType: data,
            start_date: date,
            sellerId: seller,
            pinCode: pincode,
            city: city,
            paymentType: paymentType,
            startRange: range,
            recordLimit: length,
            invoice_number,
            customerId
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem(
                "superadmin_auth"
              )}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_list = res.data;
          dispatch(getorderSucess(order_list));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    }
  };
};
export const downloadOrderList = (
  data,
  seller,
  pincode,
  city,
  date,
  length
) => {
  return (dispatch) => {
    dispatch(getorderReq);
    console.log(data, seller, pincode, city, date);
    if (localStorage.getItem("role") === "seller") {
      axios
        .post(
          Constant.getAPI() + "/order/list",
          qs.stringify({
            statusType: data,
            start_date: date,
            sellerId: localStorage.getItem('seller_id'),
            pinCode: pincode,
            city: city,
            startRange: 0,
            recordLimit: length,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem("seller_auth")}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_down = res.data.data;
          dispatch(downorderSucess(order_down));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    } else if (
      localStorage.getItem("role") === "admin" ||
      localStorage.getItem("role") === "other"
    ) {
      axios
        .post(
          Constant.getAPI() + "/order/list",
          qs.stringify({
            statusType: data,
            start_date: date,
            sellerId: seller,
            pinCode: pincode,
            city: city,
            startRange: 0,
            recordLimit: length,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem(
                "superadmin_auth"
              )}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_list = res.data.data;
          dispatch(downorderSucess(order_list));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    }
  };
};
export const downloadprepaidOrderList = (data, range, length) => {
  return (dispatch) => {
    dispatch(getorderReq);
    if (localStorage.getItem("role") === "seller") {
      axios
        .post(
          Constant.getAPI() + "/order/list",
          qs.stringify({
            statusType: data,
            startRange: 0,
            recordLimit: length,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem("seller_auth")}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_down = res.data.data;
          dispatch(downorderSucess(order_down));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    } else if (
      localStorage.getItem("role") === "admin" ||
      localStorage.getItem("role") === "other"
    ) {
      axios
        .post(
          Constant.getAPI() + "/order/list",
          qs.stringify({
            paymentType: data,
            startRange: 0,
            recordLimit: length,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem(
                "superadmin_auth"
              )}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_list = res.data.data;
          dispatch(downorderSucess(order_list));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    }
  };
};
export const fetchPaymentOrderList = (data, date, range, length,invoice,customer) => {
  return (dispatch) => {
    dispatch(getorderReq);
    if (localStorage.getItem("role") === "seller") {
      axios
        .post(
          Constant.getAPI() + "/order/listr",
          qs.stringify({
            paymentType: data,
            startRange: range,
            start_date: date,
            recordLimit: length,
            invoice_number:invoice,
            customerId:customer,
            seller:localStorage.getItem('seller_id')
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem("seller_auth")}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const preorder_list = res.data.data;
          dispatch(getorderPaymentSucess(preorder_list));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    } else {
      axios
        .post(
          Constant.getAPI() + "/order/list",
          qs.stringify({
            paymentType: data,
            startRange: range,
            start_date: date,
            recordLimit: length,
            invoice_number:invoice,
            customerId:customer
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem(
                "superadmin_auth"
              )}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const preorder_list = res.data;
          console.log(res);
          dispatch(getorderPaymentSucess(preorder_list));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    }
  };
};

export const fetchOrderListinovie = (data , flag) => {
  return (dispatch) => {
    dispatch(getorderReq);
    if (localStorage.getItem("seller_auth")) {
      axios
     
        .post(
          flag ?
          Constant.getAPI() +"/order/dmsInvoice"
          :
          Constant.getAPI() +"/order/list",
          qs.stringify({
            orderId: data,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem("seller_auth")}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_det = res.data;
          dispatch(getorderdetSucess(order_det));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    } else if (localStorage.getItem("superadmin_auth")) {
      axios
        .post(
          flag ?
          Constant.getAPI() +"/order/dmsInvoice"
          :
          Constant.getAPI() +"/order/list",
          qs.stringify({
            orderId: data,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem(
                "superadmin_auth"
              )}`,
            },
          }
        )
        .then((res) => {
          // if (res.status === true) {
          const order_det = res.data;
          dispatch(getorderdetSucess(order_det));
          // }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    }
  };
};

export const updateStatusOrder = (orderId, reason, status, redirect,
  data,
  seller,
  pincode,
  city,
  start_date,
  range,
  length,
  openOrders

  ) => {
  return (dispatch) => {
    dispatch(getorderReq);
    if (localStorage.getItem("seller_auth")) {
      axios
        .post(
          Constant.getAPI() + "/order/updateStatus",
          {
            orderId: orderId,
            orderStatus: status,
            reasonOfDelayed: reason,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("seller_auth")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const state_upd = res.data;
            dispatch(updateorderSucess(state_upd));
            if (state_upd.success === true) {
              Swal.fire({
                customClass: {
                  container: "my-swal",
                },
                title: "Updated Successfully",
                icon: "success",
                text: "",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok",
              }).then((value) => {
                if (value.isConfirmed) {
                  if (redirect) {
                    window.location.href = `#/orders-pending`;
                    
                  } else {
                    window.location.href = "#/orders";
                  }

                }
              });
            }
          }
        })
        .catch((err) => {
          const errMsg = err.message;
          console.log(err);
          if (err) {
            Swal.fire({
              title: "Something went wrong. Try again after some Time.!",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            });
          }
          // dispatch(getorderError(errMsg));
        });
    } else if (localStorage.getItem("superadmin_auth")) {
      axios
        .post(
          Constant.getAPI() + "/order/updateStatus",
          {
            orderId: orderId,
            orderStatus: status,
            reasonOfDelayed: reason,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(
                "superadmin_auth"
              )}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            // if (res.status === true) {
            const state_upd = res.data;
            dispatch(updateorderSucess(state_upd));
            // }
            if (state_upd.success === true) {
              // Swal.fire({
              //   customClass: {
              //     container: "my-swal",
              //   },
              //   title: "Updated Successfully",
              //   icon: "success",
              //   text: "",
              //   confirmButtonColor: "#3085d6",
              //   cancelButtonColor: "#d33",
              //   confirmButtonText: "Ok",
              // }).then((value) => {
              //   if (value.isConfirmed) {
                  
                    dispatch(fetchOrderList(
                      data,
                      seller,
                      pincode,
                      city,
                      start_date,
                      range,
                      length,
                      openOrders))
                   
               //}
              //});
            }
          }
        })
        .catch((err) => {
          const errMsg = err.message;
          console.log(err);
          if (err) {
            Swal.fire({
              title: "Something went wrong. Try again after some Time.!",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            });
          }
          dispatch(fetchOrderList(
            data,
            seller,
            pincode,
            city,
            start_date,
            range,
            length,
            openOrders))
          // dispatch(getorderError(errMsg));
        });
    }
  };
};

// export const updateStatusOrder = (orderId,reason,status) => {
//     return (dispatch) => {
//       dispatch(getorderReq);
//       // if(localStorage.getItem('seller_auth')){

//         axios
//         .post(
//           Constant.getAPI() + "/order/updateStatus",
//           {
//             "orderId":orderId,
//             "orderStatus":status,
//             // reasonOfDelayed:reason
//         },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${localStorage.getItem('seller_auth')}`,
//             },
//           }
//         )
//         .then((res) => {
//           // if (res.status === 200) {
//             // if (res.status === true) {
//         const state_upd = res.data;
//         dispatch(updateorderSucess(state_upd));
//         // }
//         if (state_upd.success === true) {
//           Swal.fire({
//             customClass: {
//               container: 'my-swal'
//             },
//             title: "Updated Successfully",
//             icon: "success",
//             text: "",
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Ok",
//           }).then((value) => {
//             if(value){
//               window.location.href = "#/orders";
//               window.location.reload();
//             }
//           });
//         }
//       // }
//       })
//       .catch((err) => {
//         const errMsg = err.message;
//         console.log(err);
//         if(err){
//           Swal.fire({
//             title: "Something went wrong. Try again after some Time.!",
//             icon: 'error',
//             text: "",
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Ok"
//           })
//         // }
//         // dispatch(getorderError(errMsg));
//       })
//       // else if(localStorage.getItem('superadmin_auth')) {
//       //   axios
//       //   .post(
//       //     Constant.getAPI() + "/order/updateStatus",
//       //     {
//       //       "orderId":orderId,
//       //       "orderStatus":status,
//       //       "reasonOfDelayed":reason
//       //   },
//       //     {
//       //       headers: {
//       //         "Content-Type": "application/json",
//       //         "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
//       //       },
//       //     }
//       //   )
//       //   .then((res) => {
//       //     if (res.status === 200) {
//       //       // if (res.status === true) {
//       //   const state_upd = res.data;
//       //   dispatch(updateorderSucess(state_upd));
//       //   // }
//       //   if (state_upd.success === true) {
//       //     Swal.fire({
//       //       customClass: {
//       //         container: 'my-swal'
//       //       },
//       //       title: "Updated Successfully",
//       //       icon: "success",
//       //       text: "",
//       //       confirmButtonColor: "#3085d6",
//       //       cancelButtonColor: "#d33",
//       //       confirmButtonText: "Ok",
//       //     }).then((value) => {
//       //       if(value){
//       //         window.location.href = "#/orders";
//       //         window.location.reload();
//       //       }
//       //     });
//       //   }
//       // }
//       // })
//       // .catch((err) => {
//       //   const errMsg = err.message;
//       //   console.log(err);
//       //   if(err){
//       //     Swal.fire({
//       //       title: "Something went wrong. Try again after some Time.!",
//       //       icon: 'error',
//       //       text: "",
//       //       confirmButtonColor: "#3085d6",
//       //       cancelButtonColor: "#d33",
//       //       confirmButtonText: "Ok"
//       //     })
//       //   }
//       //   // dispatch(getorderError(errMsg));
//       // });
//       // }
//     // };
//   };
// }


export const generateInvoice = (orderId,sellerId) => {
  return (dispatch) => {
    dispatch(getorderReq);
       let token
       if(localStorage.getItem('role')=='seller'){
         token=localStorage.getItem('seller_auth')
       }
       else if(localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='other' ){
         token=localStorage.getItem("superadmin_auth")
       }
      axios
        .post(Constant.getAPI() + "/seller/updateSellerInvoiceId",{
          sellerId,orderId
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
          console.log(res.data.data)
          //dispatch(getorderSucess(order_list));
          window.location.href=`#/invoice/${orderId}`
          }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getorderError(errMsg));
        });
    
      }}
