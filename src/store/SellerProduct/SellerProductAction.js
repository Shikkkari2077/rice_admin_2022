import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_SELLERPRODUCT_LIST,
  FETCH_SELLERPRODUCTIMPORT_LIST,
  FETCH_SELLERPRODUCT_ERROR,
  FETCH_SELLERPRODUCT_REQ,
  FETCH_SELLERPRODUCTADMIN_LIST,
  FETCH_SELLERPRODUCT_DET,
  FETCH_SELLERPRODUCT_ADD,
} from "../types";
import Swal from "sweetalert2";
import qs from "qs";

export const getsellerProductReq = () => {
  return {
    type: FETCH_SELLERPRODUCT_REQ,
  };
};

export const getDetails = (inventory_det) => {
  return {
    type: FETCH_SELLERPRODUCT_DET,
    payload: inventory_det,
  };
};
export const getsellerProductSucess = (sellerProduct_list) => {
  return {
    type: FETCH_SELLERPRODUCT_LIST,
    payload: sellerProduct_list,
  };
};

export const getadminSProductSucess = (sellerProduct) => {
  return {
    type: FETCH_SELLERPRODUCTADMIN_LIST,
    payload: sellerProduct,
  };
};

export const addProductSucess = (sellerProduct) => {
  return {
    type: FETCH_SELLERPRODUCT_ADD,
    payload: sellerProduct,
  };
};

export const getsellerProductImportSucess = (sellerProductImport_list) => {
  return {
    type: FETCH_SELLERPRODUCTIMPORT_LIST,
    payload: sellerProductImport_list,
  };
};

export const getsellerProductError = (error) => {
  return {
    type: FETCH_SELLERPRODUCT_ERROR,
    error: error,
  };
};

export const fetchSellerProductList = (datastart, datarange) => {
  return (dispatch) => {
    dispatch(getsellerProductReq);

    axios
      .post(
        Constant.getAPI() + "/sellerproduct/list",{},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('role')=='admin'?localStorage.getItem('superadmin_auth'):localStorage.getItem('seller_auth')}`,
          },
        }
      )
      .then((res) => {
        const sellerProduct_list = res.data.data;
        console.log("ff", sellerProduct_list);
        dispatch(getsellerProductSucess(sellerProduct_list));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getsellerProductError(errMsg));
      });
  };
};

export const AddSellerProduct = (data) => (dispatch) => {
  dispatch(getsellerProductReq);

  axios.post(Constant.getAPI() + '/sellerproduct/add',data,{
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem("seller_auth")}`,
    },
  })
  .then(res=>{
    console.log(res.data);
  }).catch(err=>{
    console.log(err);
  })
}

export const fetchSellerProductAList = (
  range,
  length,
  seller,
  cityId,
  pincode,
  stateId,
  startBatchDate,
  endBatchDate,
  productSKU,
) => {
  return (dispatch) => {
    dispatch(getsellerProductReq);
    if (localStorage.getItem("role") === "seller") {
      console.log("hello");

      
      axios
        .get(
          Constant.getAPI() + "/sellerproduct/get",
          {
            params: {
              startRange: range,
              recordLimit: length,
              sellerId: localStorage.getItem('seller_id'),
              cityId: cityId,
              pincode: pincode,
              startBatchDate,
              endBatchDate,
              stateId: stateId,
              productSKU:productSKU,
            },
          
              headers: {
                'Authorization': `Bearer ${localStorage.getItem("seller_auth")}`,
              },
            
          },
          
        )
        .then((res) => {
          const sellerProduct = res.data;
          console.log("ff", sellerProduct);
          dispatch(getadminSProductSucess(sellerProduct));
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getsellerProductError(errMsg));
        });
    } else if (
      localStorage.getItem("role") == 'admin' ||
      localStorage.getItem("role") == 'other'
    ) {
      console.log(localStorage.getItem("superadmin_auth"));
      console.log('called')
      axios
        .post(
          Constant.getAPI() + "/sellerproduct/get",
          {
            
              startRange: range,
              recordLimit: length,
              sellerId: seller,
              cityId: cityId,
              pincode: pincode,
              startBatchDate,
              endBatchDate,
              stateId: stateId,
              productSKU:productSKU,
              adminId:localStorage.getItem('superadmin_id')
            
            
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          const sellerProduct = res.data;
          //console.log("ff", res.data.countFilterWise);
          //localStorage.setItem('sellerProductCount',res.data.countFilterWise)
          dispatch(getadminSProductSucess(sellerProduct));
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getsellerProductError(errMsg));
        });
    }
  };
};

export const fetchSellerProductAdminList = (
  range,
  length,
  sellerId,
  stateId,
  cityId,
  pincode,
  subCategory,
  productSKU,
  productName
) => {
  return (dispatch) => {
    dispatch(getsellerProductReq);
    if (localStorage.getItem("role") === "seller") {
    
      axios
        .post(
          Constant.getAPI()+"/sellerproduct/get",
          {
            // "/pincodesellerproduct/get",
            // params: {
            //   startRange:range,
            //   recordLimit:length,
            //   sellerId:localStorage.getItem("seller_id"),
            //   stateId:stateId,
            //   cityId:cityId,
            //   pincode:pincode,
            //   subCategoryId:subCategory,
            // },
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localStorage.getItem("seller_auth")}`,
            },
          },
      
        )
        .then((res) => {
          const sellerProduct = res.data;
          console.log("ff", sellerProduct);
          dispatch(getadminSProductSucess(sellerProduct));
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getsellerProductError(errMsg));
        });
    } else if (
      localStorage.getItem("role") === "admin" ||
      localStorage.getItem("role") === "other"
    ) {
      console.log('adminlist')
      const token = localStorage.getItem("superadmin_auth");
      axios
        .post(
          Constant.getAPI() + "/sellerproduct/get",

          // "/pincodesellerproduct/get",
          {
            // params: {
            //   startRange: range,
            //   recordLimit: length,
            //   sellerId: sellerId,
            //   stateId: stateId,
            //   cityId: cityId,
            //   pincode: pincode,
            //   subCategoryId: subCategory,
            //   productSKU:productSKU,
            //   productName:productName,
            //   adminId:localStorage.getItem('superadmin_id')

            // },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
            },
          },
          // {
           
          // }
        )
        .then((res) => {
          console.log(res);
          const sellerProduct = res.data;
          console.log("ff", sellerProduct);
          dispatch(getadminSProductSucess(sellerProduct));
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getsellerProductError(errMsg));
        });
    }
  };
};

export const postImportSellerproductImport = (file) => {
  return (dispatch) => {
    dispatch(getsellerProductReq);
    const formData = new FormData();
    formData.append("sheet", file);
    console.log(file);
    axios
      .post(Constant.getAPI() + "/imports/sellerproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
        const importproduct_list = res.data;
        dispatch(getsellerProductImportSucess(importproduct_list));
        // window.location.href = "#/sellerproduct";
        // window.location.reload();
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getsellerProductError(errMsg));
      });
  };
};

export const fecthDetailsInventory = (productId,sellerId) => {
  console.log(productId,sellerId)
  var token 
  if(localStorage.getItem('role')=='seller'){
    token=localStorage.getItem('seller_auth')
  }
  else{
    token=localStorage.getItem('superadmin_auth')
  }
  return (dispatch) => {
    dispatch(getsellerProductReq);
    axios
      .post(
        Constant.getAPI() + "/sellerproduct/get",
        {
          productId,sellerId
        },
        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // if (res.status === true) {
        console.log(res);
        const inventory_det = res.data.data;
        dispatch(getDetails(inventory_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getsellerProductError(err));
      });
  };
};

export const updateSellerProduct = (data,redirect) => {
  console.log(data)
  var token 
  if(localStorage.getItem('role')=='seller'){
    token=localStorage.getItem('seller_auth')
  }
  else{
    token=localStorage.getItem('superadmin_auth')
  }
  return (dispatch) => {
    dispatch(getsellerProductReq);
    axios
      .post(Constant.getAPI() + "/sellerproduct/edit", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          const sellerProduct_list = res.data;
          
          dispatch(fetchSellerProductList())

            
          Swal.fire({
            title: "Updated Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
               //window.location.href = "#/seller-product-catalogue";
              //  window.location.reload();
            }
          });
        }else{
          Swal.fire({
            title: "Something Went Wrong!",
            icon: "error",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          })
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getsellerProductError(errMsg));
      });
  };
};
