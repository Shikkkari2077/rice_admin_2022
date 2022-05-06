import { FETCH_DELIVERY_TYPE_ERROR, FETCH_DELIVERY_TYPE_LIST, FETCH_DELIVERY_TYPE_REQ } from "../types";

const initialState = {
  DeliveryTypesList: [],
  isLoading: true,
  error: null,
};

const DeliveryTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELIVERY_TYPE_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_DELIVERY_TYPE_LIST:
      return {
        ...state,
        DeliveryTypesList: action.payload.data,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_DELIVERY_TYPE_ERROR:
      return {
        ...state,
        DeliveryTypesList: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default DeliveryTypeReducer;
