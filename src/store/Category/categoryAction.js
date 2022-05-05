import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_CATG_LIST,
  FETCH_CATG_ERROR,
  FETCH_CATG_REQ,
  FETCH_CATG_ADD,
  FETCH_CATG_DETAIL,
  FETCH_CATG_UPDATE,
} from "../types";
import Swal from "sweetalert2";

export const getCategoryReq = () => {
  return {
    type: FETCH_CATG_REQ,
  };
};

export const getCategorySucess = (category_list) => {
  return {
    type: FETCH_CATG_LIST,
    payload: category_list,
  };
};

export const addCategorySucess = (category_res) => {
  return {
    type: FETCH_CATG_ADD,
    payload: category_res,
  };
};

export const getcategoryUpdate = (country_updated) => {
  return {
    type: FETCH_CATG_UPDATE,
    payload: country_updated,
  };
};

export const getcategoryDetails = (country_deatils) => {
  return {
    type: FETCH_CATG_DETAIL,
    payload: country_deatils,
  };
};

export const getCategoryError = (error) => {
  return {
    type: FETCH_CATG_ERROR,
    error: error,
  };
};


export const fetchCategoryList = () => {
  return (dispatch) => {
    dispatch(getCategoryReq);
    axios
      .post(Constant.getAPI() + "/category/list",{}, {
        headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem( "superadmin_auth" )}`,
          },
      })
      .then((res) => {
        // if (res.status === true) {
        const category_list = res.data;
        console.log(res.data)
        dispatch(getCategorySucess(category_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getCategoryError(errMsg));
      });
  };
};

// export const postMedia = (file) => {
//   return (dispatch) => {
//     dispatch(getmediaReq);
//     const formData = new FormData();
//       formData.append("files", file);
//     axios
//       .post(
//         Constant.getAPI() + "/media/add/gallery",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
//           },
//         }
//       )
//       .then((res) => {
//         // if (res.status === true) {
//         const media_res = res.data;
//         dispatch(getmediaSucess(media_res));
//         // }
//       })
//       .catch((err) => {
//         const errMsg = err.message;
//         console.log(err);
//         dispatch(getmediaError("Error"));
//       });
//   };
// };
export const CategoryAddOne = (name, description,priority,productDepartmentID,status, visibility) => {
  return (dispatch) => {
    dispatch(getCategoryReq);
 
        axios
          .post(
            Constant.getAPI() + "/category/add",
            {
              name: name,
              description: description,
              priority:priority,
              productDepartmentID:productDepartmentID,
              visibility: visibility,
              status:status
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
                    window.location.href = "#/category";
                    window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getCategoryError(err));
          });
     
     
  };
};

export const CategoryDelete = (data) => {
  return (dispatch) => {
    dispatch(getCategoryReq);
 
        axios
          .delete(
            Constant.getAPI() + "/category/delete",
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
                  title: "Deleted Successfully",
                  icon: "success",
                  text: "",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                }).then((value) => {
                  if (value) {
                    window.location.href = "#/category";
                    window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getCategoryError(err));
          });
     
     
  };
};

export const getCategoryDetails = (id) => {
  return (dispatch) => {
    dispatch(getCategoryReq);
    axios
      .post(
        Constant.getAPI() + "/category/list",
        {
          CategoryId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        // if (res.status === true) {
        console.log(res);
        const country_det = res.data.data;
        dispatch(getcategoryDetails(country_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getCategoryError(err));
      });
  };
};

export const updateCategory = (
    CategoryId,
    name,
    priority,
    productDepartmentID,
    description,
    status,
    visibility,) => {
  return (dispatch) => {
    dispatch(getCategoryReq);

        axios
          .post(
            Constant.getAPI() + "/category/update",
            {
              CategoryId: CategoryId,
              name: name,
              description: description,
              priority:priority,
              productDepartmentID: productDepartmentID,
              visibility: visibility,
              status:status
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            console.log(res.status);            
              const category_res = res.data;
              if (category_res.success === true) {
               dispatch(addCategorySucess(category_res));
                Swal.fire({
                  title: "Updated Successfully",
                  icon: "success",
                  text: "",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                }).then((value) => {
                  if (value) {
                    dispatch(fetchCategoryList)

                    window.location.href = "#/category";
                    //window.location.reload();
                  }
                });
              } else {
                Swal.fire({
                  title: "Something Went wrong",
                  icon: "error",
                  text: "",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                }).then((value) => {
                  if (value) {
                    dispatch(fetchCategoryList)

                    window.location.href = "#/category";
                   // window.location.reload();
                  }
                });
              }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getCategoryError(err));
          });
  
  };
};


export const updateStatusCategory = (data) => {
  return (dispatch) => {
    dispatch(getCategoryReq);
      axios
          .post(
            Constant.getAPI() + "/category/edit",
             data,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
              },
            }
          )
          .then((res) => {
            
            console.log(res);
            console.log(res.status);
            if (res.status === 200) {
              const category_res = res.data;
              dispatch(addCategorySucess(category_res));
              // }
              if (category_res.success === true) {
                Swal.fire({
                  title: "Updated Successfully",
                  icon: "success",
                  text: "",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                }).then((value) => {
                  if (value.isConfirmed) {
                    console.log("here")
                    dispatch(fetchCategoryList())

                    //window.location.href = "#/category";
                    //window.location.reload();
                  }
                });
              } else {
                Swal.fire({
                  title: "Something Went wrong",
                  icon: "error",
                  text: "",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                }).then((value) => {
                  if (value.isConfirmed) {
                    dispatch(fetchCategoryList)

                    //window.location.href = "#/category";
                    //window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getCategoryError(err));
          });
        }
};