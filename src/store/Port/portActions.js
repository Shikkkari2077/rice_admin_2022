import axios from "axios";
import Constant from "../../Constant";
import { FETCH_PORT_LIST, 
  FETCH_PORT_ERROR, 
  FETCH_PORT_REQ ,
} from "../types";
import Swal from 'sweetalert2'
export const getPortReq = () => {
  return {
    type: FETCH_PORT_REQ,
  };
};

export const getPortSucess = (Port_list) => {
  return {
    type: FETCH_PORT_LIST,
    payload: Port_list,
  };
};

export const getPortError = (error) => {
  return {
    type: FETCH_PORT_ERROR,
    error: error,
  };
};

export const fetchPortList = (data) => {
  return (dispatch) => {
    dispatch(getPortReq);
    axios
      .post(Constant.getAPI() + "/portmaster/list",data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('superadmin_auth')}`,
        }
      })
      .then((res) => {
        // if (res.status === true) {
          const Port_list = res.data;
          console.log(res.data)
          dispatch(getPortSucess(Port_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getPortError(errMsg));
      });
  };
};

export const PortAdd = (name, description, MediumId,CategoryId,status,priority) => {
  return (dispatch) => {
    dispatch(getPortReq);
  
        axios
          .post(
            Constant.getAPI() + "/portmaster/add",
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
                    dispatch(fetchPortList())
                    window.location.href = "#/Port";
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getPortError(err));
          });
   
  };
};

export const updatePort = (data) => {
 console.log(Mediaadd)
  return (dispatch) => {
    dispatch(getPortReq);
        axios
          .post(
            Constant.getAPI() + "/Port/edit",
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
                    dispatch(fetchPortList())
                    window.location.href = "#/Port/list";
                    //window.location.reload();
                  }
                });
              }
            }
          })
          .catch((err) => {
            const errMsg = err.message;
            console.log(err);
            dispatch(getPortError(err));
          });

    
  };
};

