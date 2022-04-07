import { USER_LOGIN, USERS_ERROR, USERS_LOGOUT, USER_LOADING,FORGET_SELLER,RESET_PASSWORD_SELLER } from "../types";

const initialState = {
  // isAuthUser: !!localStorage.getItem("user"),
  isAuthUser:false,
  user: {},
  isLoading: true,
  sellerToken:[],
  error: null,
  role:null
};


const userReducer= (state = initialState, action)=> {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };
    case USER_LOGIN:
      // localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthUser: true,
        isLoading: false,
        role:'admin'
      };
      case FORGET_SELLER:
        // localStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          token: action.payload,
          role:'seller'
        };
        case RESET_PASSWORD_SELLER:
        // localStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          success: action.payload,
          role:'seller'
        };
    case USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case USERS_LOGOUT:
      return { ...state, isAuthUser: false, user: {} };
    default:
      return state;
  }
}
export default userReducer

