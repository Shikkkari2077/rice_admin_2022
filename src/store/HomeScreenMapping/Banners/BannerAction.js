import axios from "axios";
import Constant from "../../../Constant";
import { FETCH_BANNER_LIST, FETCH_BANNER_ERROR, FETCH_BANNER_REQ ,FETCH_BANNER_ADD,FETCH_BANNER_IMPORT} from "../../types";
import Swal from "sweetalert2";

export const getBannerReq = () => {
  return {
    type: FETCH_BANNER_REQ,
  };
};

export const getBannerSucess = (banner_list) => {
  return {
    type: FETCH_BANNER_LIST,
    payload: banner_list,
  };
};


export const getbannerImportSucess=(importbanner_list)=>{
  return {
    type: FETCH_BANNER_IMPORT,
    payload: importbanner_list,
  };
}
export const addBannerSucess = (banner_res) => {
  return {
    type: FETCH_BANNER_ADD,
    payload: banner_res,
  };
};

export const getBannerError = (error) => {
  return {
    type: FETCH_BANNER_ERROR,
    error: error,
  };
};

export const fetchBannerList = () => {
  return (dispatch) => {
    dispatch(getBannerReq);
    axios
      .post(Constant.getAPI() + "/homepage/banner/get",{
        "web":true
      } , {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const banner_list = res.data.data;
          dispatch(getBannerSucess(banner_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getBannerError(errMsg));
      });
  };
};


export const bannerAddOne =(pincode,productId,categoryId,Medium) => {
  return (dispatch) => {
    dispatch(getBannerReq);
    // console.log(name, description,Medium)
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
          dispatch(addBannerSucess(data_res));
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
          dispatch(getBannerError(err));
        });
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getBannerError(err));

      });
   
  };
};

export const postImportBanner = (file) => {
  return (dispatch) => {
    dispatch(getBannerReq);
    
    const formData = new FormData();
      formData.append("file", file);
    console.log(file)
    axios
      .post(Constant.getAPI() + "/homepage/banner/upload/sheet", formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const importbanner_list = res.data;
          dispatch(getbannerImportSucess(importbanner_list));
          // window.location.href = "/banner";
          // window.location.reload();
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err)
        dispatch(getBannerError('Error'));
      });
  };
};
