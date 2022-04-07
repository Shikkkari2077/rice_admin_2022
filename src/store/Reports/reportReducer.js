import {
  FETCH_REPORT_LIST,
  FETCH_REPORT_ERROR,
  FETCH_REPORT_REQ,
  FETCH_CONSUMER_FEEDBACK_LIST,
} from "../types";

const initialState = {
  report_data: [],
  isLoading: true,
  error: null,
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_REPORT_LIST:
      return {
        ...state,
        report_data: action.payload.data,
        isLoading: false,
        error: action.payload.status,
        countFilterWise:action.payload.countFilterWise,
      };
    case FETCH_REPORT_ERROR:
      return {
        ...state,
        report_data: [],
        isLoading: false,
        error: action.error,
      };
    case FETCH_CONSUMER_FEEDBACK_LIST:
      return {
        ...state,
        report_data: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
export default reportReducer;
