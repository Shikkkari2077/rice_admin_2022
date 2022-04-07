import {
  FETCH_STATE_LIST,
  FETCH_STATE_ERROR,
  FETCH_STATE_REQ,
  FETCH_STATE_ADD,
  FETCH_STATE_UPDATE,
  FETCH_STATE_DETAIL,
} from "../types";

const initialState = {
  state_list: [],
  isLoading: true,
  isAdded: false,
  state_det:[],
  state_res: [],
  error: null,
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATE_REQ:
      return {
        ...state,
        isAdded: true,
        isLoading: true,
      };
    case FETCH_STATE_LIST:
      return {
        ...state,
        state_list: action.payload.data,
        countFilterWise: action.payload.countFilterWise,

        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_STATE_DETAIL:
      return {
        ...state,
        state_det: action.payload,
        error: action.payload.status,
      };
    case FETCH_STATE_UPDATE:
      return {
        ...state,
        state_update: action.payload,
        isAdded: false,
        error: action.payload.status,
      };
    case FETCH_STATE_ADD:
      return {
        ...state,
        state_res: action.payload,
        isAdded: false,
        error: action.payload.status,
      };
    case FETCH_STATE_ERROR:
      return {
        ...state,
        state_list: [],
        isLoading: false,
        isAdded: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default stateReducer;
