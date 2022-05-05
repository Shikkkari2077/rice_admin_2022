import axios from "axios";
import Constant from "../../Constant";
import { FETCH_BAG_LIST, 
  FETCH_BAG_ERROR, 
  FETCH_BAG_REQ ,
} from "../types";
import Swal from 'sweetalert2'
export const getBagReq = () => {
  return {
    type: FETCH_BAG_REQ,
  };
};

export const getBagSucess = (Bag_list) => {
  return {
    type: FETCH_BAG_LIST,
    payload: Bag_list,
  };
};

export const getBagError = (error) => {
  return {
    type: FETCH_BAG_ERROR,
    error: error,
  };
};

export const fetchBagList = () => {
  return (dispatch) => {
    dispatch(getBagReq);
    axios
      .get(Constant.getAPI() + "/bag/list", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        }
      })
      .then((res) => {
        // if (res.status === true) {
          const Bag_list = res.data;
          console.log(res.data)
          dispatch(getBagSucess(Bag_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getBagError(errMsg));
      });
  };
};

export const BagAdd = (name, description, MediumId,CategoryId,status,priority) => {
  return (dispatch) => {
    dispatch(getBagReq);
  
        axios
          .post(
            Constant.getAPI() + "/bag/add",
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
                    dispatch(fetchBagList())
                    window.location.href = "#/Bag";
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getBagError(err));
          });
   
  };
};

export const updateBag = (data) => {
  return (dispatch) => {
    dispatch(getBagReq);
        axios
          .post(
            Constant.getAPI() + "/bag/edit",
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
                    dispatch(fetchBagList())
                    window.location.href = "#/Bag/list";
                    //window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getBagError(err));
          });

    
  };
};

