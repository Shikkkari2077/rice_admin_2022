import { FETCH_UOM_ERROR, FETCH_UOM_LIST, FETCH_UOM_REQ } from "../types";

const initialState = {
  uom_list: [],
  isLoading: true,
  error: null,
};

const UOMReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UOM_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_UOM_LIST:
      return {
        ...state,
        uom_list: action.payload.data,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_UOM_ERROR:
      return {
        ...state,
        uom_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default UOMReducer;
