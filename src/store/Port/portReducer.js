import { FETCH_PORT_ERROR, FETCH_PORT_LIST, FETCH_PORT_REQ } from "../types";

const initialState = {
  port_list: [],
  isLoading: true,
  error: null,
};

const portReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PORT_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PORT_LIST:
      return {
        ...state,
        port_list: action.payload.data,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_PORT_ERROR:
      return {
        ...state,
        port_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default portReducer;
