import axios from "axios";
import Constant from "../../Constant";
import { FETCH_BRAND_LIST, 
  FETCH_BRAND_ERROR, 
  FETCH_BRAND_REQ ,
} from "../types";
import Swal from 'sweetalert2'
export const getBrandReq = () => {
  return {
    type: FETCH_BRAND_REQ,
  };
};

export const getBrandSucess = (Brand_list) => {
  return {
    type: FETCH_BRAND_LIST,
    payload: Brand_list,
  };
};

export const getBrandError = (error) => {
  return {
    type: FETCH_BRAND_ERROR,
    error: error,
  };
};

export const fetchBrandList = () => {
  return (dispatch) => {
    dispatch(getBrandReq);
    axios
      .get(Constant.getAPI() + "/brand/list", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        }
      })
      .then((res) => {
        // if (res.status === true) {
          const Brand_list = res.data;
          console.log(res.data)
          dispatch(getBrandSucess(Brand_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getBrandError(errMsg));
      });
  };
};

export const BrandAdd = (name, description, MediumId,CategoryId,status,priority) => {
  return (dispatch) => {
    dispatch(getBrandReq);
  
        axios
          .post(
            Constant.getAPI() + "/brand/add",
            {
              name,
              description,
              //priority:priority,
              MediumId,
              CategoryId,
              //status
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
                    dispatch(fetchBrandList())
                    window.location.href = "#/brand";
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getBrandError(err));
          });
   
  };
};

export const updateBrand = (data) => {
  return (dispatch) => {
    dispatch(getBrandReq);
        axios
          .post(
            Constant.getAPI() + "/brand/edit",
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
                    dispatch(fetchBrandList())
                    window.location.href = "#/Brand/list";
                    //window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getBrandError(err));
          });

    
  };
};

