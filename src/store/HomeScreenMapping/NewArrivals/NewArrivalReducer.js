import { FETCH_NEWARRIVAL_ERROR, FETCH_NEWARRIVAL_LIST, FETCH_NEWARRIVAL_REQ ,FETCH_NEWARRIVAL_IMPORT,FETCH_NEWARRIVAL_ADD} from "../../types";

const initialState = {
  newArrival_list: [],
  isLoading: true,
  arrival_res:[],
  error: null,
  importarrivals_list:[]
};

const newArrivalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWARRIVAL_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_NEWARRIVAL_LIST:
      return {
        ...state,
        newArrival_list: action.payload.data,
        countFilterWise: action.payload.countFilterWise,

        isLoading: false,
        error: action.payload.status,
      };
      case FETCH_NEWARRIVAL_ADD:
        return {
          ...state,
          arrival_res: action.payload,
          isAdding: false,
          error: action.payload.status,
        };
      case FETCH_NEWARRIVAL_IMPORT:
        return {
          ...state,
          importarrivals_list: action.payload,
          isLoading: false,
          error: action.payload.status,
        };
    case FETCH_NEWARRIVAL_ERROR:
      return {
        ...state,
        newArrival_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default newArrivalReducer;
