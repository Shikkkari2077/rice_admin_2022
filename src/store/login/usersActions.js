import { USER_LOGIN, USERS_ERROR, USERS_LOGOUT, USER_LOADING,FORGET_SELLER,RESET_PASSWORD_SELLER } from "../types";
import axios from "axios";
import Constant from "../../Constant";
import Swal from "sweetalert2";
export const getLoginReq = () => {
  return {
    type: USER_LOADING,
  };
};

export const getloginData = (user) => {
  return {
    type: USER_LOGIN,
    payload: user,
  };
};


export const forgetSeller = (user) => {
  return {
    type: FORGET_SELLER,
    payload: user,
  };
};
export const passwordSet=(user)=>{
  return {
    type:RESET_PASSWORD_SELLER,
    payload:user
  }
}
export const getLoginError = (error) => {
  return {
    type: USERS_ERROR,
    payload: error,
  };
};
export const getUsers = (username, password, role) => {
  var role1
    if(role === "admin"){
      role1="superadmin"
    }
    if(role === "other")
    {role1="other"}
    if(role === "zonal")
    {role1="other"}
  return (dispatch) => {
     console.log(role1)
    dispatch(getLoginReq);
if (role === "admin" || role==="other" || role==="zonal") {
      axios
        .post(
          Constant.getAPI() + "/admin/login",
          { email: username, password: password,role:role1 }
        )
        .then((data) => {
          const res = data.data;
          if(res.data.role === "superadmin")
                    {localStorage.setItem("role", "admin");
                    }
           if(res.data.role === "other")
                    {localStorage.setItem("role", "other");
                    }

          // localStorage.setItem("role",role1);
          localStorage.setItem("superadmin_auth", res.data.token);
          localStorage.setItem("superadmin_name", res.data.name);
          localStorage.setItem("superadmin_email", res.data.email);
          localStorage.setItem("superadmin_id", res.data.id);

          const user = data.data;
          dispatch(getloginData(user));
          if(!localStorage.getItem("superadmin_auth")){
            window.location.href = "#/";
            console.log('Something Went Wrong')
            window.location.reload();
          }
          else{
            Swal.fire({
              title: "Login Successfully",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "#/";

                window.location.reload();
              }
            })
            
          }
         
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Invalid Credentials",
            icon: "error",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then(value =>{
        window.location.href = "#/";
        window.location.reload();
          })
          dispatch(getLoginError("Invalid Email or Password"));
        });

      }
     else if (role === "seller") {
        axios
          .post(
            Constant.getAPI() + "/seller/login",
            { email:username, password:password } 
          )
          .then((data) => {
            console.log(data)
            const res = data.data;
            console.log(res.success === false)
            debugger;
            if(res.success === true ){
              localStorage.setItem("role", "seller");
              localStorage.setItem("seller_auth", res.data.token);
              localStorage.setItem("seller_id", res.data.id);
              localStorage.setItem("sellerName", res.data.contact_person);
              localStorage.setItem("seller_email", res.data.email);
              const user = data.data;
              console.log('data',res)
              dispatch(getloginData(user))
              Swal.fire({
                title: "Login Successfully",
                icon: "success",
                text: "",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok",
              }).then(value=>{
                if(value){
                window.location.href = "#/";
                window.location.reload();
                
                }
               })
            }
            else{
            localStorage.setItem("role", "");
              Swal.fire({
                title: "Invalid Credentials",
                icon: "error",
                text: "",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok",
              });
            window.location.href = "#/";
            window.location.reload();
          }
        })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Invalid Credentials",
              icon: "error",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then(value =>{
          window.location.href = "#/";
          window.location.reload();
            })
          dispatch(getLoginError("Invalid Email or Password"));
          });
        
        }
  };
};
export const getforgetSeller = (username) => {
  return (dispatch) => {
    dispatch(getLoginReq);
      axios
        .post(
          Constant.getAPI() + "/seller/forgetPassword",
          { "email": username}
       
        )
        .then((data) => {
          const res = data.data;
          localStorage.setItem("seller_token", res.token);
          const user = data;
          console.log(user)
          dispatch(forgetSeller(res));
          // window.location.href = "#/";
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          dispatch(getLoginError("Server Failed"));
        });
      }
  }

export const getpasswordSetSeller =(password) =>{
  return (dispatch) => {
    dispatch(getLoginReq);
      axios
        .post(
          Constant.getAPI() + "/seller/resetPassword",
          { "token":localStorage.getItem('seller_token'),"password": password}
        )
        .then((data) => {
          const res = data;
          // localStorage.setItem("seller_token", res.token);
          const user = data;
          console.log(user)
          dispatch(passwordSet(res));
          window.location.href = "#/";
          window.location.reload();
  localStorage.clear();
        
        })
        .catch((err) => {
          console.log(err);
          dispatch(getLoginError("Server Failed"));
        });
      }
}


export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  return {
    type: USERS_LOGOUT,
    payload: dispatch,
  };
  // setAuthToken(false);
 };

// import { USER_LOGIN, USERS_ERROR, USERS_LOGOUT, USER_LOADING,FORGET_SELLER,RESET_PASSWORD_SELLER } from "../types";
// import axios from "axios";
// import Constant from "../../Constant";
// import Swal from "sweetalert2";

// export const getLoginReq = () => {
//   return {
//     type: USER_LOADING,
//   };
// };

// export const getloginData = (user) => {
//   return {
//     type: USER_LOGIN,
//     payload: user,
//   };
// };


// export const forgetSeller = (user) => {
//   return {
//     type: FORGET_SELLER,
//     payload: user,
//   };
// };
// export const passwordSet=(user)=>{
//   return {
//     type:RESET_PASSWORD_SELLER,
//     payload:user
//   }
// }
// export const getLoginError = (error) => {
//   return {
//     type: USERS_ERROR,
//     payload: error,
//   };
// };
// export const getUsers = (username, password, role) => {
//   return (dispatch) => {
//     dispatch(getLoginReq);
//     if (role === "admin") {
//       axios
//         .post(
//           Constant.getAPI() + "/admin/login",
//           { email: username, password: password }
//         )
//         .then((data) => {
//           const res = data.data;
//           localStorage.setItem("role", "admin");
//           localStorage.setItem("superadmin_auth", res.data.token);
//           localStorage.setItem("superadmin_email", "admin@admin.com");
//           const user = data.data;
//           dispatch(getloginData(user));
//           if(!localStorage.getItem("superadmin_auth")){
//             window.location.href = "#/";
//             console.log('Something Went Wrong')
//             window.location.reload();
//           }
//           else{
//             Swal.fire({
//               title: "Login Successfully",
//               icon: "success",
//               text: "",
//               confirmButtonColor: "#3085d6",
//               cancelButtonColor: "#d33",
//               confirmButtonText: "Ok",
//             });
//             window.location.href = "#/";
//             window.location.reload();
//           }
         
//         })
//         .catch((err) => {
//           console.log(err);
//           Swal.fire({
//             title: "Invalid Credentials",
//             icon: "error",
//             text: "",
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Ok",
//           }).then(value =>{
//         window.location.href = "#/";
//         window.location.reload();
//           })
//           dispatch(getLoginError("Invalid Email or Password"));
//         });
//       }
//      else if (role === "seller") {
//         axios
//           .post(
//             Constant.getAPI() + "/seller/login",
//             { email: username, password: password }
//           )
//           .then((data) => {
//             const res = data.data;
//             console.log(res.status,)
//             if(res.status===true){
//               localStorage.setItem("role", "seller");
//               localStorage.setItem("seller_auth", res.data.token);
//               localStorage.setItem("seller_id", res.data.id);
//               localStorage.setItem("unique_identifier", res.data.unique_identifier);
//               localStorage.setItem("sellerName", res.data.contact_person);
//               localStorage.setItem("sellerPincode", res.data.pincode);
//               localStorage.setItem("seller_email", "admin@seller.com");
//               const user = data.data;
//               console.log('data',res)
              
//               dispatch(getloginData(user))
//               Swal.fire({
//                 title: "Login Successfully",
//                 icon: "success",
//                 text: "",
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Ok",
//               }).then(value=>{
//                 if(value){
//                 window.location.href = "#/";
//                 window.location.reload();
//                 }
//                })
//             }
//             else{
//             localStorage.setItem("role", "");
//               Swal.fire({
//                 title: "Invalid Credentials",
//                 icon: "error",
//                 text: "",
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Ok",
//               });
//             window.location.href = "#/";
//             window.location.reload();
//           }
//         })
//           .catch((err) => {
//             console.log(err);
//             Swal.fire({
//               title: "Invalid Credentials",
//               icon: "error",
//               text: "",
//               confirmButtonColor: "#3085d6",
//               cancelButtonColor: "#d33",
//               confirmButtonText: "Ok",
//             }).then(value =>{
//           window.location.href = "#/";
//           window.location.reload();
//             })
//           dispatch(getLoginError("Invalid Email or Password"));
//           });
        
//         }
//   };
// };
// export const getforgetSeller = (username) => {
//   return (dispatch) => {
//     dispatch(getLoginReq);
//       axios
//         .post(
//           Constant.getAPI() + "/seller/forgetPassword",
//           { "email": username}
       
//         )
//         .then((data) => {
//           const res = data.data;
//           localStorage.setItem("seller_token", res.token);
//           const user = data;
//           console.log(user)
//           dispatch(forgetSeller(res));
//           // window.location.href = "#/";
//           // window.location.reload();
//         })
//         .catch((err) => {
//           console.log(err);
//           dispatch(getLoginError("Server Failed"));
//         });
//       }
//   }

// export const getpasswordSetSeller =(password) =>{
//   return (dispatch) => {
//     dispatch(getLoginReq);
//       axios
//         .post(
//           Constant.getAPI() + "/seller/resetPassword",
//           { "token":localStorage.getItem('seller_token'),"password": password}
//         )
//         .then((data) => {
//           const res = data;
//           // localStorage.setItem("seller_token", res.token);
//           const user = data;
//           console.log(user)
//           dispatch(passwordSet(res));
//           window.location.href = "#/";
//           window.location.reload();
//   localStorage.clear();
        
//         })
//         .catch((err) => {
//           console.log(err);
//           dispatch(getLoginError("Server Failed"));
//         });
//       }
// }


// export const logoutUser = () => (dispatch) => {
//   localStorage.clear();
//   return {
//     type: USERS_LOGOUT,
//     payload: dispatch,
//   };
//   // setAuthToken(false);
// };