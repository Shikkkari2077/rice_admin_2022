/* eslint-disable no-unused-vars */
import axios from "axios";
import Constant from "../../Constant";
import { FETCH_SELLER_LIST, FETCH_SELLER_ERROR, FETCH_SELLER_REQ,FETCH_SELLERIMPORT_LIST ,FETCH_SELLER_DETAIL} from "../types";
import Swal from 'sweetalert2'
export const getsellerReq = () => {
  return {
    type: FETCH_SELLER_REQ,
  };
};

export const getsellerSucess = (seller_list) => {
  return {
    type: FETCH_SELLER_LIST,
    payload: seller_list,
  };
};
export const getDeatilsellerSucess=(seller_det)=>{
  return {
    type: FETCH_SELLER_DETAIL,
    payload: seller_det,   
  }
}
export const getsellerImportSucess = (sellerImport_list) => {
  return {
    type: FETCH_SELLERIMPORT_LIST,
    payload: sellerImport_list,
  };
};

export const getsellerError = (error) => {
  return {
    type: FETCH_SELLER_ERROR,
    error: error,
  };
};

export const fetchSellerList = (range,limit,city,category) => {
  console.log("called")
 
  return (dispatch) => {
    dispatch(getsellerReq);
    axios
      .get(Constant.getAPI() + `/seller/list?startRange=${range}&recordLimit=${limit}&cityId=${city}&adminId=${localStorage.getItem('superadmin_id')}&categoryId=${category?category:''}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const seller_list = res.data;
          console.log(res.data)
          dispatch(getsellerSucess(seller_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getsellerError(errMsg));
      });
  };
};

export const fetchDeatilsSellerList = (id) => {
  return (dispatch) => {
    dispatch(getsellerReq);
    axios
      .get(Constant.getAPI() + "/seller/describe/"+id, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('seller_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const seller_det = res.data.data;
          dispatch(getDeatilsellerSucess(seller_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getsellerError(errMsg));
      });
  };
};


export const postImportSeller = (file) => {
  return (dispatch) => {
    dispatch(getsellerReq);
    
    const formData = new FormData();
      formData.append("sheet", file);
    console.log(file)
    axios
      .post(Constant.getAPI() + "/imports/seller", formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const importseller_list = res.data;
          dispatch(getsellerImportSucess(importseller_list));
          // window.location.href = "/seller";
          // window.location.reload();
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err)
        dispatch(getsellerError('Error'));
      });
  };
};


export const resetinvoice = (
  reset,
  sellerId,
  transaction_series_name,
  transaction_series_code,
  reset_cycle_frequency
  ) => {
  return (dispatch) => {
    dispatch(getsellerReq);
    axios
      .post(Constant.getAPI() + "/seller/update",
      {
         reset,
         sellerId,
         transaction_series_name,
         transaction_series_code,
         reset_cycle_frequency
      },
       {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
               title:"Updated!",
               icon:'success',
               
           }).then()
           dispatch(fetchSellerList(0,50000,''))
           window.location.href="#/seller/invoice"
        }
        if(res.success == 'true')
        {  
           window.location.href="#/seller/invoice"
           dispatch(fetchSellerList(0,50000,''))
          }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getsellerError(errMsg));
        
      });
  };
};