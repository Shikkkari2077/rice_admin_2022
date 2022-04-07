import axios from "axios";
import Constant from "../../Constant";
import { FETCH_SUBCATG_LIST, FETCH_SUBCATG_ERROR, FETCH_SUBCATG_REQ } from "../types";
import Swal from 'sweetalert2'
export const getSubCategoryReq = () => {
  return {
    type: FETCH_SUBCATG_REQ,
  };
};

export const getSubCategorySucess = (subcategory_list) => {
  return {
    type: FETCH_SUBCATG_LIST,
    payload: subcategory_list,
  };
};

export const getSubCategoryError = (error) => {
  return {
    type: FETCH_SUBCATG_ERROR,
    error: error,
  };
};

export const fetchSubCategoryList = (categoryId,SubCategoryId) => {
  return (dispatch) => {
    dispatch(getSubCategoryReq);
    axios
      .post(Constant.getAPI() + "/subcategory/list",{
        categoryId,
        SubCategoryId
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        }
      })
      .then((res) => {
        // if (res.status === true) {
          const subcategory_list = res.data;
          console.log(res.data)
          dispatch(getSubCategorySucess(subcategory_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getSubCategoryError(errMsg));
      });
  };
};

export const subCategoryAdd = (name, description, MediumId,CategoryId,status,priority) => {
  return (dispatch) => {
    dispatch(getSubCategoryReq);
  
        axios
          .post(
            Constant.getAPI() + "/subcategory/add",
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
                    dispatch(fetchSubCategoryList())
                    window.location.href = "#/subcategory";
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getSubCategoryError(err));
          });
   
  };
};

export const updateSubCategory = (SubCategoryId,name,description,status,CategoryId,Mediaadd,MediumId) => {
 console.log(Mediaadd)
  return (dispatch) => {
    dispatch(getSubCategoryReq);
     if(Mediaadd == true){
 
        axios
          .post(
            Constant.getAPI() + "/subcategory/edit",
            {
              SubCategoryId,
              name,
              description,
              status,
              MediumId,
              CategoryId
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
                    dispatch(fetchSubCategoryList())
                    window.location.href = "#/subcategory/list";
                    //window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getSubCategoryError(err));
          });
   
    }
    else{
      axios
      .post(
        Constant.getAPI() + "/subcategory/edit",
        {
          SubCategoryId,
          name,
          description,
          status,
          CategoryId
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
                dispatch(fetchSubCategoryList())
                window.location.href = "#/subcategory/list";
                //window.location.reload();
              }
            });
          }
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getSubCategoryError(err));
      });

    }
  };
};

