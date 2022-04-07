import {
  FETCH_CANCELLATION_LIST,
  FETCH_CANCELLATION_ERROR,
  FETCH_CANCELLATION_REQ,
  FETCH_CANCELLATION_ADD,
  FETCH_CANCELLATION_DET,
} from "../types";

const initialState = {
  reasons_list: [],
  reasons_add: [],
  reasons_det: [],
  isLoading: true,
  error: null,
};

const canReasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CANCELLATION_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CANCELLATION_LIST:
      return {
        ...state,
        reasons_list: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_CANCELLATION_ADD:
      return {
        ...state,
        reasons_add: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_CANCELLATION_DET:
      return {
        ...state,
        reasons_det: action.payload,
        isLoading: false,
        error: action.payload.status,
      };

    case FETCH_CANCELLATION_ERROR:
      return {
        ...state,
        reasons_list: [],
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default canReasonReducer;
