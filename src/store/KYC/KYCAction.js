import axios from "axios";
import Constant from "../../Constant";
import {
  BUSSINESS_LIST,
  FETCH_BUSSINESS_ERROR,
  FETCH_BUSSINESS_REQ,
} from "../types";
import Swal from "sweetalert2";

export const getbussinesslist = (list) => {
  return {
    type: BUSSINESS_LIST,
    payload: list,
  };
};

export const getError = (error) => {
  return {
    type: FETCH_BUSSINESS_ERROR,
    error: error,
  };
};
export const getBussinessReq = () => {
  return {
    type: FETCH_BUSSINESS_REQ,
  };
};
export const fetchCustomerKyc = (status,startRange,count,userStatus,phoneNumber) => {
    return (dispatch) => {
      var data={
        status,
        startRange,
        count,
      }
     
        if(userStatus !== " "){
          data={ ...data,'userStatus':userStatus}
        }
        if(phoneNumber !== " "){
          data={ ...data,'phoneNumber':phoneNumber}
        }
         
      
    
      dispatch(getBussinessReq);
      axios
        .post(Constant.getAPI() + "/business/list",data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem( "superadmin_auth" )}`,
            },
        })
        .then((res) => {
          console.log(res)
          if (res.data.success === true) {
             const list = res.data;
             console.log(res.data.data)
            dispatch(getbussinesslist(list));
           }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getError(errMsg));
        });
    };
  };
  export const fetchCustomerKyc2 = (userId) => {
    return (dispatch) => {
      dispatch(getBussinessReq);
      axios
        .post(Constant.getAPI() + "/business/list",{
          userId
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem( "superadmin_auth" )}`,
            },
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.success === true) {
             const list = res.data;
             //console.log(res.data.data)
            dispatch(getbussinesslist(list));
           }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getError(errMsg));
        });
    };
  };

  export const updateDocumentStatus = (userId,type,verified,note,status,kycStatusfilter,startRange,count,userStatus) => {
    return (dispatch) => {
      dispatch(getBussinessReq);
      axios
        .post(Constant.getAPI() + "/business/makeVerified",{
          userId,
          type,
          verified,
          note,
          status
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem( "superadmin_auth" )}`,
            },
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.success === true) {
            dispatch(fetchCustomerKyc(kycStatusfilter,startRange,count,userStatus))
            console.log("called api")

           }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getError(errMsg));
        });
    };
  };

  export const updateKycStatus = (userId,status,startRange,count,userStatus)=> {
    return (dispatch) => {
      dispatch(getBussinessReq);
      axios
        .post(Constant.getAPI() + "/business/changeKycStatus",{
          userId,
          status,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem( "superadmin_auth" )}`,
            },
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.success === true) {
            dispatch(fetchCustomerKyc("notVerified",startRange,count,userStatus))
            Swal.fire({
              title:"Status updated",
              icon:"success"
            })

           }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getError(errMsg));
        });
    };
  };
  export const updateKycStatusfinal = (userId,verified,status)=> {
    return (dispatch) => {
      dispatch(getBussinessReq);
      axios
        .post(Constant.getAPI() + "/business/makeVerified",{
          userId,
          verified,
          status,
          type:"kyc"
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem( "superadmin_auth" )}`,
            },
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.success === true) {
            if(status == 'rejected')
            {
              dispatch(fetchCustomerKyc())
           
            Swal.fire({
              title:"Status updated",
              icon:"success"
            })
            }

           }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getError(errMsg));
        });
    };
  };