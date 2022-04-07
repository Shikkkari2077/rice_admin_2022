import axios from "axios";
import Constant from "../../../Constant";
import { FETCH_TOPDEAL_LIST, FETCH_TOPDEAL_ERROR, FETCH_TOPDEAL_REQ ,FETCH_TOPDEALIMPORT_LIST} from "../../types";
import Swal from 'sweetalert2'
export const getTopDealsReq = () => {
  return {
    type: FETCH_TOPDEAL_REQ,
  };
};

export const getTopDealsSucess = (topDeals_list) => {
  return {
    type: FETCH_TOPDEAL_LIST,
    payload: topDeals_list,
  };
};


export const gettopdealsimportSucess = (importproduct_list) => {
  return {
    type: FETCH_TOPDEALIMPORT_LIST,
    payload: importproduct_list,
  };
};

export const getTopDealsError = (error) => {
  return {
    type: FETCH_TOPDEAL_ERROR,
    error: error,
  };
};

export const fetchTopDealsList = (sellerId,startRange,recordLimit) => {
  return (dispatch) => {
    var data={
      startRange,
      recordLimit,
    }
    if(sellerId !== ""){
      data={...data,sellerId}
    }
    dispatch(getTopDealsReq);
    axios
      .post(Constant.getAPI()+`/homepage/top-deal`, data,{
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const topDeals_list = res.data;
          console.log(res.data)
          console.log(topDeals_list)
          dispatch(getTopDealsSucess(topDeals_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getTopDealsError(errMsg));
      });
  };
};

export const postImportTopdeals = (file) => {
  return (dispatch) => {
    dispatch(getTopDealsReq);
    // const payload = {
    //   sheet:file
    // }
    const formData = new FormData();
      formData.append("sheet", file);
    console.log(file)
    axios
      .post(Constant.getAPI() + "/imports/home?upload=top-deal", formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        },
      })
      .then((res) => {
        console.log(res)
        if (res.data.success === 200) {
          // const importproduct_list = res.data;
          // dispatch(gettopdealsimportSucess(importproduct_list));
          window.location.href = "/best-deals";
          //window.location.reload();
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err)
        dispatch(getTopDealsError('Error'));
      });
  };
};


export const TopDealStatusUpdate = (id,status) => {
  

  return (dispatch) => {
    dispatch(getTopDealsReq);
    axios
      .post(Constant.getAPI() + `/api/homepage/status`,
        {
          model:'top-deal',
          status,
          id
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
        if (res.status === 200) {
          // if (res.status === true) {
      const state_upd = res.data;
      // dispatch(updateCitySucess(state_upd));
      // }
      if (state_upd.status === true) {
        Swal.fire({
          title: "Updated Successfully",
          icon: "success",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        }).then((value) => {
          if(value){
            dispatch(fetchTopDealsList());

            // window.location.href = "#/city";
            // window.location.reload();
          }
        });
      }
      else{
        Swal.fire({
          title: "Something went wrong. Try again after some Time.!",
          icon: 'error',
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok"
        });
    } 
      }
     
    })
    .catch((err) => {
      const errMsg = err.message;
      console.log(err);
      if(err){
        Swal.fire({
          title: "Something Wrong",
          icon: "wrong",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        })
      }
      dispatch(getTopDealsError('Error'));
    });
  };
};