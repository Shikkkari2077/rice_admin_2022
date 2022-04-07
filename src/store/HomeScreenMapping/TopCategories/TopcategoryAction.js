import axios from "axios";
import Constant from "../../../Constant";
import { FETCH_TOPCAT_LIST, FETCH_TOPCAT_ERROR, FETCH_TOPCAT_REQ,FETCH_TOPCAT_IMPORT } from "../../types";

export const getTopCatReq = () => {
  return {
    type: FETCH_TOPCAT_REQ,
  };
};

export const getTopCatSucess = (topCat_list) => {
  return {
    type: FETCH_TOPCAT_LIST,
    payload: topCat_list,
  };
};

export const getCatImportSucess=(importTopCat_list)=>{
  return {
    type: FETCH_TOPCAT_IMPORT,
    payload: importTopCat_list,
  };
}
export const getTopCatError = (error) => {
  return {
    type: FETCH_TOPCAT_ERROR,
    error: error,
  };
};

export const fetchTopCatList = () => {
  return (dispatch) => {
    dispatch(getTopCatReq);
    axios
      .get(Constant.getAPI() + "/homepage/top-category/get", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const topCat_list = res.data.data;
          dispatch(getTopCatSucess(topCat_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getTopCatError('errMsg'));
      });
  };
};


// export const postImportNewArrivals = (file) => {
//   return (dispatch) => {
//     dispatch(getTopCatReq);
    
//     const formData = new FormData();
//       formData.append("sheet", file);
//     console.log(file)
//     axios
//       .post(Constant.getAPI() + "/homepage/top-category/import", formData, {
//         headers: {
//           "Content-Type": 'multipart/form-data',
//           "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
//         },
//       })
//       .then((res) => {
//         // if (res.status === true) {
//           const importTopCat_list = res.data;
//           // dispatch(getCatImportSucess(importTopCat_list));
//           window.location.href = "/banner";
//           window.location.reload();
//         // }
//       })
//       .catch((err) => {
//         const errMsg = err.message;
//         console.log(err)
//         dispatch(getTopCatError('Error'));
//       });
//   };
// };
