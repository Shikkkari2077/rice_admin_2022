import axios from "axios";
import Constant from "../../Constant";
import {
    FETCH_NOT_REQ,
    FETCH_TEMPLATE_LIST,
    FETCH_NOT_ERROR,
    FETCH_TEMPLATE_DETAIL,
    FETCH_LOGS,
    CUSTOMER_LOGS,
    FETCH_TEMPLATE_TYPE_LIST,
} from "../types";
import Swal from "sweetalert2";


export const getCustomerLogs = (list) => {
  return {
    type: CUSTOMER_LOGS,
    payload:list
  };
};
export const getLogs = (list) => {
  return {
    type: FETCH_LOGS,
    payload:list
  };
};
export const getNotificationReq = () => {
    return {
      type: FETCH_NOT_REQ,
    };
  };
  export const getNotificationError = (error) => {
    return {
      type: FETCH_NOT_ERROR,
      error: error,
    };
  };
  export const getTemplateList = (template_list) => {
    return {
      type: FETCH_TEMPLATE_LIST,
      payload: template_list,
    };
  };
  export const getTemplateDetail = (template_list) => {
    return {
      type: FETCH_TEMPLATE_DETAIL,
      payload: template_list,
    };
  };
  
  export const getTypeList = (template_list) => {
    return {
      type: FETCH_TEMPLATE_TYPE_LIST,
      payload: template_list,
    };
  };


  export const deleteTemplate = (templateId) => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/notification/template/delete",{templateId} ,{
          headers: {
            "Content-Type": "application/json",

             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
          // if (res.status === true) {
          //const template_list = res.data;
       
          // dispatch(getTemplateList(template_list));
          // }
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then(function(isConfirm){
              console.log(isConfirm)
              if (isConfirm) {
                dispatch(fetchTemplates());
                 window.location.href = "#/notification/list";}  })
         
         }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };

  export const fetchTemplates = () => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/notification/template/list",{} ,{
          headers: {
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
          // if (res.status === true) {
          const template_list = res.data;
       
          dispatch(getTemplateList(template_list));
          // }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };

  export const fetchNotificationType = () => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/notification/type/list",{} ,{
          headers: {
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
          // if (res.status === true) {
          const template_list = res.data;
       
          dispatch(getTypeList(template_list));
          // }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };


  export const fetchTemplatesdetails = (id) => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/notification/template/list",{templateId:id} ,{
          headers: {
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
          // if (res.status === true) {
          const template_list = res.data;
       
          dispatch(getTemplateDetail(template_list));
          // }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };


  export const AssignTemplate = (templateId,sellerArray) => {
    console.log("called",sellerArray,templateId)
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/notification/custom/add",{
          templateId,
          sellerArray,
          text:"",
          title:"",
         
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
              title: "Sent Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((value) => {
              if (value) {
                window.location.href = "#/notification/list";
                window.location.reload();
              }
          })
           }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };

  export const fetchNotificationLogs = (id) => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/notification/custom/list",{templateId:id} ,{
          headers: {
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
          // if (res.status === true) {
          const logs_list = res.data;
       
          dispatch(getLogs(logs_list));
          // }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };
  export const customerNotificationLogs = (id) => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      axios
        .post(Constant.getAPI() + "/notification/custom/customerlist",{customId:id} ,{
          headers: {
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        })
        .then((res) => {
          console.log(res)
          // if (res.status === true) {
          const logs_list = res.data;
       
          dispatch(getCustomerLogs(logs_list));
          // }
        })
        .catch((err) => {
          console.log(err)
          const errMsg = err.message;
          dispatch(getNotificationError(errMsg));
        });
    };
  };


export const notificatonAdd = ( MediumId,title,message,typeId) => {
    return (dispatch) => {
      dispatch(getNotificationReq);
     
      // const formData = new FormData();
      // formData.append("files", Medium);
      // axios
      //   .post(Constant.getAPI() + "/media/add/gallery", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
      //     },
      //   })
      //   .then((res) => {
      //     const notification = res.data;
      //     console.log(notification);
      //     const MediumId = res.data.data[0].id;
      //     console.log(MediumId);
          axios
            .post(
              Constant.getAPI() + "/notification/template/add",
              {
                title,
                text:message,
                MediumId,
                typeId
              
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
                const notification = res.data;
                // dispatch(addCategorySucess(category_res));
                // }
                if (notification.success === true) {
                  Swal.fire({
                    title: "Added Successfully",
                    icon: "success",
                    text: "",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ok",
                  }).then((value) => {
                    if (value) {
                      dispatch(fetchTemplates());

                      window.location.href = "#/notification/list";
                    }
                  });
                }
              }
            })
            .catch((err) => {
              const errMsg = err.message;
              console.log(err);
              dispatch(getNotificationError(err));
            });
        // })
        // .catch((err) => {
        //   const errMsg = err.message;
        //   console.log(err);
        //   dispatch(getNotificationError(err));
        // });
    };
  };



  export const notificationUpdate = (templateId,title,text,mediaFlag,MediumId,typeId) => {
    return (dispatch) => {
      dispatch(getNotificationReq);
      if(mediaFlag){
     
          axios
            .post(
              Constant.getAPI() + "/notification/template/edit",
              {
                templateId,
                title,
                text,
                MediumId,
                typeId
              
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
                //  dispatch(addCategorySucess(category_res));
                  Swal.fire({
                    title: "Updated Successfully",
                    icon: "success",
                    text: "",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ok",
                  }).then((value) => {
                    if (value) {
                      dispatch(fetchTemplates());

                      window.location.href = "#/notification/list";
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
                      dispatch(fetchTemplates());

                      window.location.href = "#/notification/list";
                    }
                  });
                }
            })
            .catch((err) => {
              const errMsg = err.message;
              console.log(err);
              dispatch(getNotificationError(err));
            });
    
      }
      else{
    
          axios
            .post(
              Constant.getAPI() + "/notification/template/edit",
              {
                templateId,
                title,
                text,
                typeId,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem(
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
                      window.location.href = "#/notification/list";
                      window.location.reload();
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
                      window.location.href = "#/notification/list";
                      window.location.reload();
                    }
                  });
                }
              }
            })
            .catch((err) => {
              const errMsg = err.message;
              console.log(err);
              dispatch(getNotificationError(err));
            });
      }
    };
  };
  