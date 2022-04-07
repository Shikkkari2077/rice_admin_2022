import axios from "axios";
import Constant from "../../Constant";
import {fetchOrderList} from "../../store/index"
import {
  FETCH_DELIVERYBOY_LIST,
  FETCH_DELIVERYBOY_ERROR,
  FETCH_DELIVERYBOY_REQ,
  FETCH_DELIVERYBOY_ADD,
  FETCH_DELIVERYBOY_DET,
} from "../types";
import qs from "qs";
import Swal from "sweetalert2";
import { locale } from "moment";


export const getdeliveryBoyReq = () => {
  return {
    type: FETCH_DELIVERYBOY_REQ,
  };
};

export const getdeliveryBoySucess = (delivery_list) => {
  return {
    type: FETCH_DELIVERYBOY_LIST,
    payload: delivery_list,
  };
};

export const adddeliveryBoySucess = (delivery_add) => {
  return {
    type: FETCH_DELIVERYBOY_ADD,
    payload: delivery_add,
  };
};
export const getDetails = (delivery_det) => {
  return {
    type: FETCH_DELIVERYBOY_DET,
    payload: delivery_det,
  };
};
export const getdeliveryBoyError = (error) => {
  return {
    type: FETCH_DELIVERYBOY_ERROR,
    error: error,
  };
};

export const fetchdeliveryboyList = (range,length) => {
  console.log(localStorage.getItem('superadmin_auth'))
  var token
  if(localStorage.getItem('role')=='seller'){
    token=localStorage.getItem('seller_auth')
  }
  else{
    token=localStorage.getItem('superadmin_auth')
  }
  return (dispatch) => {
    dispatch(getdeliveryBoyReq);
    axios
      .post(Constant.getAPI() + "/deliveryUser/list", {
        startRange: range,
        recordLimit: length,
      },{
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
        const delivery_list = res.data;
        console.log(res.data)
        dispatch(getdeliveryBoySucess(delivery_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getdeliveryBoyError(errMsg));
      });
  };
};

export const addDeliveryBoyList = (email,firstName,lastName,phone,type,cityId) => {
  var token 
  if(localStorage.getItem('role')=='seller'){
    token=localStorage.getItem('seller_auth')
  }
  else{
    token=localStorage.getItem('superadmin_auth')
  }
  return (dispatch) => {
    dispatch(getdeliveryBoyReq);
    axios
      .post(
        Constant.getAPI() + "/deliveryUser/add",
        {
            email:email,
            firstName:firstName,
            lastName:lastName,
            phone:phone,
            type,
            cityId
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          const delivery_add = res.data;
          // dispatch(adddeliveryBoySucess(delivery_add));
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              window.location.href = "#/delivery-boy-list";
              // window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getdeliveryBoyError(errMsg));
      });
  };
};

export const updateDeliveryListA = (deliveryUserId,email,firstName,lastName,phone,type,cityId) => {
  var token 
  if(localStorage.getItem('role')=='seller'){
    token=localStorage.getItem('seller_auth')
  }
  else{
    token=localStorage.getItem('superadmin_auth')
  }

  return (dispatch) => {
    dispatch(getdeliveryBoyReq);
    axios
      .post( Constant.getAPI() + "/deliveryUser/edit", 
        { 
           deliveryUserId,
            email,firstName,lastName,phone,type,cityId
            
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          const delivery_add = res.data;
          dispatch(adddeliveryBoySucess(delivery_add));
          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              window.location.href = "#/delivery-boy-list";
              // window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getdeliveryBoyError(errMsg));
      });
  };
};

export const getDeliveryboyDetailsA = (id) => {
  return (dispatch) => {
    // dispatch(getcouponReq);
    
    axios
      .post(
        Constant.getAPI() + "/deliveryUser/list",
        {
          deliveryUserId:id
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
        dispatch(getDetails(delivery_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getdeliveryBoyError(err));
      });
  };
};


export const assignDeleveryBoy = (orderId,deliveryUserId) => {
  return (dispatch) => {
    console.log(localStorage.getItem("seller_auth"))
    var token 
    if(localStorage.getItem('role')=='seller'){
      token=localStorage.getItem('seller_auth')
    }
    else{
      token=localStorage.getItem('superadmin_auth')
    }
  
    axios
      .post(
        Constant.getAPI() + "/deliveryUser/assignOrder",
        {
          orderId,
          deliveryUserId
      },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        if (res.data.success === true) {
        console.log(res);
       
        }  
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getdeliveryBoyError(err));
      });
  };
};
