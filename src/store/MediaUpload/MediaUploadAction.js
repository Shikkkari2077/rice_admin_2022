// import axios from "axios";
// import Constant from "../../Constant";
// import { FETCH_MEDIA_ADD, FETCH_MEDIA_ERROR, FETCH_MEDIA_REQ } from "../types";

// export const getmediaReq = () => {
//   return {
//     type: FETCH_MEDIA_REQ,
//   };
// };

// export const getmediaSucess = (media_res) => {
//   return {
//     type: FETCH_MEDIA_ADD,
//     payload: media_res,
//   };
// };

// export const getmediaError = (error) => {
//   return {
//     type: FETCH_MEDIA_ERROR,
//     error: error,
//   };
// };

// export const postMedia = (file) => {
//   return (dispatch) => {
//     dispatch(getmediaReq);
//     const formData = new FormData();
//       formData.append("files", file);
//     axios
//       .post(
//         Constant.getAPI() + "/media/add/gallery",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
//           },
//         }
//       )
//       .then((res) => {
//         // if (res.status === true) {
//         const media_res = res.data;
//         dispatch(getmediaSucess(media_res));
//         // }
//       })
//       .catch((err) => {
//         const errMsg = err.message;
//         console.log(err);
//         dispatch(getmediaError("Error"));
//       });
//   };
// };
