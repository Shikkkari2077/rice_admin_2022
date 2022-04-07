import axios from "axios";
import Constant from "../../Constant";
import {

  FETCH_GROUPS,
    FETCH_USERM_REQ,
    FETCH_USERM_ERROR,
    FETCH_ADMIN_LIST,
    FETCH_POLICY,
    FETCH_ASSIGNED_POLICY,
    FETCH_ASSIGNED_PINCODES
 
} from "../types";
import Swal from "sweetalert2";

export const getGroupList = (list) => {
  console.log(list)
    return {
      type: FETCH_GROUPS,
      payload: list,
    };
  };
  export const getPolicyList = (list) => {
    console.log(list)
      return {
        type: FETCH_POLICY,
        payload: list,
      };
    };
    export const getAssignedPolicyList = (list) => {
      console.log(list)
        return {
          type: FETCH_ASSIGNED_POLICY,
          payload: list,
        };
      };
  export const getAdminList = (list) => {
    return {
      type: FETCH_ADMIN_LIST,
      payload: list,
    };
  };
  export const getUserReq = () => {
    return {
      type: FETCH_USERM_REQ,
    };
  };
  export const getUserError = (error) => {
    return {
      type: FETCH_USERM_ERROR,
      error: error,
    };
  };
  export const pincodelist = (list) => {
    console.log(list)
    return {
      type: FETCH_ASSIGNED_PINCODES,
      payload: list,
    };
    };
  //GROUP

  export const fetchGroups = (UMAdminGroupId) => {
    return (dispatch) => {
      dispatch(getUserReq);
      axios
        .post(Constant.getAPI() + "/admin/group/list" ,{UMAdminGroupId},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          }
        })
        .then((res) => {
          console.log(res)
           if (res.status == 200) {
          const list = res.data;
       
          dispatch(getGroupList(list));
           }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getUserError(errMsg));
        });
    };
  };

  export const groupAdd = (name,level) => {
    return (dispatch) => {
      dispatch(getUserReq);
      axios
        .post(Constant.getAPI() + "/admin/group/add",{
         name,
        
         
      } ,{
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status === 200) {
            Swal.fire({
              title: "Added Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                window.location.href = "#/group/list";
                //window.location.reload();
              }
          })
           }
           else {
            Swal.fire({
              title: "Something Went wrong",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                dispatch(fetchGroups());

                window.location.href = "#/group/list";
                //window.location.reload();
              }
            });
          }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getUserError(errMsg));
        });
    };
  };

  export const groupupdate = (UMAdminGroupId,name) => {
    return (dispatch) => {
      dispatch(getUserReq);
      axios
        .patch(Constant.getAPI() + "/admin/group/update",{
          UMAdminGroupId,
          name
         
      } ,{
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status === 200) {
            Swal.fire({
              title: "updated Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                window.location.href = "#/group/list";
                //window.location.reload();
              }
          })
           }
           else {
            Swal.fire({
              title: "Something Went wrong",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                dispatch(fetchGroups());

                window.location.href = "#/group/list";
                //window.location.reload();
              }
            });
          }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getUserError(errMsg));
        });
    };
  };

  //USERS

  export const fetchAdmins = (adminId,startRange,recordLimit) => {
    return (dispatch) => {
      dispatch(getUserReq);
      axios
        .post(Constant.getAPI() + "/admin/list" ,{adminId,startRange,recordLimit},{
          headers: {
            

             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status == 200) {
          const list = res.data;
          dispatch(getAdminList(list));
           }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getUserError(errMsg));
        });
    };
  };

  export const adminAdd = (
    name,
    openOrderMail,
    email,
    password,
    phone,
    cityArray,
    UMAdminGroupId,
    sellerArray,
    categoryArray,
    businessLineArray

    ) => {
    return (dispatch) => {
      console.log(businessLineArray)
      dispatch(getUserReq);
      axios
        .post(Constant.getAPI() + "/admin/add",{
         name,
         openOrderMail,
         email,
         password,
         phone,
         cityArray,
         UMAdminGroupId,
         sellerArray,
         categoryArray,
         businessLineArray
         
      } ,{
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status === 200) {
            Swal.fire({
              title: "Added Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                window.location.href = "#/user/list";
                //window.location.reload();
              }
          })
           }
           else {
            Swal.fire({
              title: "Something Went wrong",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                dispatch(fetchAdmins());

                window.location.href = "#/user/list";
                //window.location.reload();
              }
            });
          }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getUserError(errMsg));
        });
    };
  };

  export const adminUpdate = (
    name,
    openOrderMail,
    email,
    phone,
    UMAdminGroupId,
    adminId,
    addCityArray,
    removeCityArray,
    addSellerArray,
    removeSellerArray,
    // categoryArray,
    password
     
    ) => {
    return (dispatch) => {
      dispatch(getUserReq);
      axios
        .patch(Constant.getAPI() + "/admin/update",{
          name,
          openOrderMail,
          email,
          phone,
          UMAdminGroupId,
          adminId,
          addCityArray,
          removeCityArray,
          addSellerArray,
          removeSellerArray,
          // categoryArray,
          password
         
      } ,{
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
           if (res.status === 200) {
            Swal.fire({
              title: "Updated Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                dispatch(fetchAdmins());

               window.location.href = "#/user/list";
                //window.location.reload();
              }
          })
           }
           else {
            Swal.fire({
              title: "Something Went wrong",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                dispatch(fetchAdmins());

                window.location.href = "#/user/list";
                //window.location.reload();
              }
            });
          }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getUserError(errMsg));
        });
    };
  };

//POLICIES

export const fetchPolicies = () => {
  return (dispatch) => {
    dispatch(getUserReq);
    axios
      .post(Constant.getAPI() + "/module_permission/list" ,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        }
      })
      .then((res) => {
        console.log(res)
         if (res.status == 200) {
        const list = res.data;
     
        dispatch(getPolicyList(list));
         }
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.message;
        dispatch(getUserError(errMsg));
      });
  };
};
//ASSIGNED GROUP POLICY
export const fetchAssignedGroupPolicies=(UMAdminGroupId)=>{
  return (dispatch) => {
    dispatch(getUserReq);
    axios
      .post(Constant.getAPI() + "/module_permission_admin/group/list" ,{UMAdminGroupId},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        }
      })
      .then((res) => {
        console.log(res)
         if (res.status == 200) {
        const list = res.data;
     
        dispatch(getAssignedPolicyList(list));
         }
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.message;
        dispatch(getUserError(errMsg));
      });
  };
}
//ASSIGNED ADMIN POLICIES
export const fetchAssignedAdminPolicies=(AdminId)=>{
  return (dispatch) => {
    dispatch(getUserReq);
    axios
      .post(Constant.getAPI() + "/module_permission_admin/list" ,{AdminId},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        }
      })
      .then((res) => {
        console.log(res)
         if (res.status == 200) {
        const list = res.data;
     
        dispatch(getAssignedPolicyList(list));
         }
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.message;
        dispatch(getUserError(errMsg));
      });
  };
}

//ASSIGN POLICY TO ADMIN
export const assignPolicies = (UMModulePermissionId,
  AdminId,
  UMAdminGroupId,
  ) => {
  return (dispatch) => {
    dispatch(getUserReq);
    axios
      .post(Constant.getAPI() + "/module_permission_admin/add",{
        UMModulePermissionId,AdminId,UMAdminGroupId
    } ,{
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        console.log(res)
         if (res.status === 200) {
          Swal.fire({
            title: "Assigned Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              dispatch(fetchAdmins());

              window.location.href = "#/user/list";
              //window.location.reload();
            }
        })
         }
         else {
          Swal.fire({
            title: "Something Went wrong",
            icon: "error",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              //dispatch(fetchAdmins());

              //window.location.href = "#/group/list";
              //window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.message;
        dispatch(getUserError(errMsg));
      });
  };
};

//UPDATE ASSIGNED ADMIN POLICY
export const updateAssignedAdminpolicy = (
  UM_Module_Permission_AdminId,
  UMModulePermissionId
  ) => {
  return (dispatch) => {
    dispatch(getUserReq);
    axios
      .post(Constant.getAPI() + "/module_permission_admin/update" ,{ 
        UM_Module_Permission_AdminId,
        UMModulePermissionId},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        }
      })
      .then((res) => {
        console.log(res)
         if (res.status == 200) {
      
            console.log("updated")
             window.location.href="#/user/assign/list"
         }
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.message;
        dispatch(getUserError(errMsg));
      });
  };
};

// ASSIGN GROUP POLICIES
export const assignGroupPolicies = (
  UMAdminGroupId,
  UMModulePermissionId
  ) => {
  return (dispatch) => {
    dispatch(getUserReq);
    axios
      .post(Constant.getAPI() + "/module_permission_admin/group/add",{
        UMAdminGroupId,
        UMModulePermissionId
    } ,{
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        console.log(res)
         if (res.status === 200) {
          Swal.fire({
            title: "Assigned Successfully",
            icon: "success",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              dispatch(fetchAdmins());

                window.location.href = "#/group/list";
              //window.location.reload();
            }
        })
         }
         else {
          Swal.fire({
            title: "Something Went wrong",
            icon: "error",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((value) => {
            if (value) {
              //dispatch(fetchAdmins());

              //window.location.href = "#/group/list";
              //window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.message;
        dispatch(getUserError(errMsg));
      });
  };
};
 //UPDATE GROUP POLICY
export const updateAssignedGrouppolicy = (
  UMAdminGroupId,
  UMModulePermissionId
  ) => {
  return (dispatch) => {
    dispatch(getUserReq);
    axios
      .post(Constant.getAPI() + "/module_permission_admin/group/update" ,{ 
        UMAdminGroupId,
        UMModulePermissionId},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        }
      })
      .then((res) => {
        console.log(res)
         if (res.status == 200) {
      
            console.log("updated")
             window.location.href="#/group/assign/list"
         }
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.message;
        dispatch(getUserError(errMsg));
      });
  };
};
//PINCODES ASSIGNED TO ADMIN LISTING
export const fetchAssignedPincodes = (adminId) => {
  return (dispatch) => {
    dispatch(getUserReq);
    axios
      .post(Constant.getAPI() + "/admin/pincodeListing" ,{adminId},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        }
      })
      .then((res) => {
        console.log(res)
         if (res.status == 200) {
         dispatch(pincodelist(res.data))
        
         }
      })
      .catch((err) => {
        console.log(err)
        const errMsg = err.message;
        dispatch(getUserError(errMsg));
      });
  };
};