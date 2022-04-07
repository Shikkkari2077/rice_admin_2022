import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_PINCODE_LIST,
  FETCH_PINCODE_ERROR,
  FETCH_PINCODE_REQ,
  FETCH_PINCODEIMPORT_LIST,
  FETCH_PINCODE_ADD,
  FETCH_PINCODE_UPDATE,
  FETCH_PINCODE_DETAIL,
} from "../types";
import Swal from "sweetalert2";

export const getpincodeReq = () => {
  return {
    type: FETCH_PINCODE_REQ,
  };
};

export const getpincodeSucess = (pincode_list) => {
  return {
    type: FETCH_PINCODE_LIST,
    payload: pincode_list,
  };
};

export const addpincodeSucess = (pincode_res) => {
  return {
    type: FETCH_PINCODE_ADD,
    payload: pincode_res,
  };
};

export const getpincodeDetails = (pincode_det) => {
  return {
    type: FETCH_PINCODE_DETAIL,
    payload: pincode_det,
  };
};

export const UpdatepincodeSucess = (pincode_upd) => {
  return {
    type: FETCH_PINCODE_UPDATE,
    payload: pincode_upd,
  };
};

export const getpincodeimportSucess = (pincodeimport_list) => {
  return {
    type: FETCH_PINCODEIMPORT_LIST,
    payload: pincodeimport_list,
  };
};

export const getpincodeError = (error) => {
  return {
    type: FETCH_PINCODE_ERROR,
    error: error,
  };
};

export const fetchPincodeList = (cityId,range,length,pincode) => {
  return (dispatch) => {
    console.log("range and length",range,length,cityId,pincode)
    dispatch(getpincodeReq);
    axios
      .post(
        Constant.getAPI() + `/pincode/list`,
        { recordLimit:length,
          cityId:cityId,
          startRange:range,
          code:pincode
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
        const pincode_list = res.data;
        console.log(res.data)
        dispatch(getpincodeSucess(pincode_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getpincodeError("Error"));
      });
  };
};

export const postImportPincode = (file) => {
  return (dispatch) => {
    dispatch(getpincodeReq);

    const formData = new FormData();
    formData.append("sheet", file);
    console.log(file, "helloo");
    axios
      .post(Constant.getAPI() + "/imports/location", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          console.log(res)
        const pincodeimport_list = res.data;
        dispatch(getpincodeimportSucess(pincodeimport_list));
       // window.location.href = "/area";
       // window.location.reload();
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getpincodeError(errMsg));
      });
  };
};

export const pincodeAddOne = (name, pincode, stateId, status) => {
  return (dispatch) => {
    dispatch(getpincodeReq);
    axios
      .post(
        Constant.getAPI() + "/pincode/addOne",
        {
          name: name,
          stateId: stateId,
          pinocde: pincode,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        const state_res = res.data.data;
        dispatch(addpincodeSucess(state_res));
        if (state_res.status === true) {
          Swal.fire({
            title: "Added Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              window.location.href = "#/area";
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(getpincodeReq(errMsg));
      });
  };
};

export const getOneCityDetails = (id) => {
  return (dispatch) => {
    dispatch(getpincodeReq);
    axios
      .get(Constant.getAPI() + "/city/describe/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
        console.log(res);
        const state_det = res.data.data;
        dispatch(getpincodeDetails(state_det));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getpincodeReq("Error"));
      });
  };
};

export const CityUpdateOne = (cityId, name, stateId, status) => {
  return (dispatch) => {
    dispatch(getpincodeReq);
    axios
      .patch(
        Constant.getAPI() + "/pincode/edit/" + cityId,
        {
          name: name,
          stateId: stateId,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // if (res.status === true) {
          const state_upd = res.data;
          dispatch(UpdatepincodeSucess(state_upd));
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
              if (value) {
                window.location.href = "#/area";
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: "Something went wrong. Try again after some Time.!",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            });
          }
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        if (err) {
          Swal.fire({
            title: "Something Wrong",
            icon: "wrong",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
        dispatch(getpincodeReq(errMsg));
      });
  };
};

export const cityStatusUpdateOne = (id, Status) => {
  return (dispatch) => {
    dispatch(getpincodeReq);
    axios
      .patch(
        Constant.getAPI() + "/pincode/edit/" + id,
        {
          Status: Status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // if (res.status === true) {
          const state_upd = res.data;
          dispatch(UpdatepincodeSucess(state_upd));
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
              if (value) {
                window.location.href = "#/area";
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: "Something went wrong. Try again after some Time.!",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            });
          }
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        if (err) {
          Swal.fire({
            title: "Something Wrong",
            icon: "wrong",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
        dispatch(getpincodeReq(errMsg));
      });
  };
};
