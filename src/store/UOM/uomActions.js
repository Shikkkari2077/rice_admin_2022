import axios from "axios";
import Constant from "../../Constant";
import { FETCH_UOM_LIST, 
  FETCH_UOM_ERROR, 
  FETCH_UOM_REQ ,
} from "../types";
import Swal from 'sweetalert2'
export const getUOMReq = () => {
  return {
    type: FETCH_UOM_REQ,
  };
};

export const getUOMSucess = (UOM_list) => {
  return {
    type: FETCH_UOM_LIST,
    payload: UOM_list,
  };
};

export const getUOMError = (error) => {
  return {
    type: FETCH_UOM_ERROR,
    error: error,
  };
};

export const fetchUOMList = (data) => {
  return (dispatch) => {
    dispatch(getUOMReq);
    axios
      .post(Constant.getAPI() + "/uom/list",data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        }
      })
      .then((res) => {
        // if (res.status === true) {
          const UOM_list = res.data;
          console.log(res.data)
          dispatch(getUOMSucess(UOM_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getUOMError(errMsg));
      });
  };
};

export const UOMAdd = (name, description, MediumId,CategoryId,status,priority) => {
  return (dispatch) => {
    dispatch(getUOMReq);
  
        axios
          .post(
            Constant.getAPI() + "/uom/add",
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
                    dispatch(fetchUOMList())
                    window.location.href = "#/UOM";
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getUOMError(err));
          });
   
  };
};

export const updateUOM = (data) => {
//  console.log(Mediaadd)
  return (dispatch) => {
    dispatch(getUOMReq);
        axios
          .post(
            Constant.getAPI() + "/uom/edit",
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
                    dispatch(fetchUOMList())
                    window.location.href = "#/UOM/list";
                    //window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getUOMError(err));
          });

    
  };
};

