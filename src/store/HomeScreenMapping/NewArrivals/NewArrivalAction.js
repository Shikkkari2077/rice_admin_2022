import axios from "axios";
import Constant from "../../../Constant";
import {
  FETCH_NEWARRIVAL_LIST,
  FETCH_NEWARRIVAL_ERROR,
  FETCH_NEWARRIVAL_REQ,
  FETCH_NEWARRIVAL_IMPORT,
  FETCH_NEWARRIVAL_ADD
} from "../../types";
import Swal from "sweetalert2";

export const getnewArrivalReq = () => {
  return {
    type: FETCH_NEWARRIVAL_REQ,
  };
};

export const getnewArrivalSucess = (newArrival_list) => {
  return {
    type: FETCH_NEWARRIVAL_LIST,
    payload: newArrival_list,
  };
};


export const addarrivalSucess = (newarrival_res) => {
  return {
    type: FETCH_NEWARRIVAL_ADD,
    payload: newarrival_res,
  };
};


export const getarrivalImportSucess = (importArrivals_list) => {
  return {
    type: FETCH_NEWARRIVAL_IMPORT,
    payload: importArrivals_list,
  };
};
export const getnewArrivalError = (error) => {
  return {
    type: FETCH_NEWARRIVAL_ERROR,
    error: error,
  };
};

export const fetchNewArrivalList = (startRange,recordLimit,sellerId) => {
  return (dispatch) => {
    dispatch(getnewArrivalReq);
    var data={
      startRange,
      recordLimit,
    }
    if(sellerId !== ""){
      data={...data,sellerId}
    }
    axios
      .post(Constant.getAPI() + `/homepage/new-arrival`,  data ,{
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        const newArrival_list = res.data;
        console.log(res.data)
        dispatch(getnewArrivalSucess(newArrival_list));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getnewArrivalError(errMsg));
      });
  };
};

export const postImportNewArrivals = (file) => {
  return (dispatch) => {
    dispatch(getnewArrivalReq);
    const formData = new FormData();
    formData.append("sheet", file);
    console.log(file);
    axios
      .post(Constant.getAPI() + "/imports/home?upload=new-arrival", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
        const importArrivals_list = res.data;
        // dispatch(getarrivalImportSucess(importArrivals_list));
        window.location.href = "/new-arrivals";
        window.location.reload();
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getnewArrivalError("Error"));
      });
  };
};

export const newArrivalsAddOne =(pincode,title,description,productId,categoryId,Medium) => {
  return (dispatch) => {
    dispatch(getnewArrivalReq);
    const formData = new FormData();
      formData.append("files", Medium);
    axios
      .post(
        Constant.getAPI() + "/media/add/gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
      .then((res) => {
        const data_res = res.data;
        console.log(data_res)
        const MediumId=res.data.data[0].id
        console.log(MediumId)
          // dispatch(addCategorySucess(data_res));
        axios
        .post(
          Constant.getAPI() + "/homepage/banner/add",
          {
            "pincode": pincode,
            "title":title,
            "description": description,
            "ProductId": productId,
            "CategoryId" :categoryId,
            "MediumId":MediumId
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
            },
          }
        )
        .then((res) => {
          console.log(res)
          console.log(res.succes)
          if (res.succes === true) {
            const data_res = res.data;
          dispatch(addarrivalSucess(data_res));
          // }
          if (data_res.sucess === true) {
            Swal.fire({
              title: "Added Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                window.location.href = "#/banner";
                window.location.reload();
              }
            });
          }
          }
        
        })
        .catch((err) => {
          const errMsg = err.message;
          console.log(err);
          dispatch(getnewArrivalError(err));
        });
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getnewArrivalError(err));

      });
   
  };
};
