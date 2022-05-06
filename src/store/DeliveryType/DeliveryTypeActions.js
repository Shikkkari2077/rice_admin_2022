import axios from "axios";
import Constant from "../../Constant";
import { FETCH_DELIVERY_TYPE_LIST, 
  FETCH_DELIVERY_TYPE_ERROR, 
  FETCH_DELIVERY_TYPE_REQ ,
} from "../types";
import Swal from 'sweetalert2'
export const getDeliveryTypeReq = () => {
  return {
    type: FETCH_DELIVERY_TYPE_REQ,
  };
};

export const getDeliveryTypeSucess = (DeliveryType_list) => {
  return {
    type: FETCH_DELIVERY_TYPE_LIST,
    payload: DeliveryType_list,
  };
};

export const getDeliveryTypeError = (error) => {
  return {
    type: FETCH_DELIVERY_TYPE_ERROR,
    error: error,
  };
};

export const fetchDeliveryTypeList = () => {
  return (dispatch) => {
    dispatch(getDeliveryTypeReq);
    axios
      .get(Constant.getAPI() + "/deliveryType/list", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        }
      })
      .then((res) => {
        // if (res.status === true) {
          const DeliveryType_list = res.data;
          console.log(res.data)
          dispatch(getDeliveryTypeSucess(DeliveryType_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getDeliveryTypeError(errMsg));
      });
  };
};

export const DeliveryTypeAdd = (data) => {
  return (dispatch) => {
    dispatch(getDeliveryTypeReq);
  
        axios
          .post(
            Constant.getAPI() + "/deliveryType/add",
            data,
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
            console.log(res);
            console.log(res.status);
            if (res.status === 200) {
              const category_res = res.data;
              // dispatch(addCategorySucess(category_res));
              // }
              if (category_res.success === true) {
                Swal.fire({
                  title: "Added Successfully",
                  icon: "success",
                  text: "",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                }).then((value) => {
                  if (value) {
                    dispatch(fetchDeliveryTypeList())
                    window.location.href = "#/delivery-type";
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getDeliveryTypeError(err));
          });
   
  };
};

export const updateDeliveryType = (data) => {
  return (dispatch) => {
    dispatch(getDeliveryTypeReq);
        axios
          .put(
            Constant.getAPI() + "/deliveryType/edit",
            data,
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
            console.log(res);
            console.log(res.status);
            if (res.status === 200) {
              const category_res = res.data;
         
              if (category_res.success === true) {
                Swal.fire({
                  title: "Updated Successfully",
                  icon: "success",
                  text: "",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                }).then((value) => {
                  if (value) {
                    dispatch(fetchDeliveryTypeList())
                    window.location.href = "#/delivery-type";
                    //window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getDeliveryTypeError(err));
          });

    
  };
};

