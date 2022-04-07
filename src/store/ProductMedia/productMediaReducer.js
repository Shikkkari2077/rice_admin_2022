import {
	FETCH_PRODUCT_MEDIA_ERROR,
	FETCH_PRODUCT_MEDIA_REQ,
	FETCH_PRODUCT_MEDIA_LIST,
	FETCH_PRODUCT_MEDIA_DETAILS,
	FETCH_PRODUCT_SKU
} from '../types';

const initialState = {
	media_res: [],
	isLoading: true,
	error: null,
	sku_list:[]
};

const productMediaReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCT_MEDIA_REQ:
			return {
				...state,
				isLoading: true,
			};

		case FETCH_PRODUCT_MEDIA_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		case FETCH_PRODUCT_MEDIA_LIST:
			return {
				...state,
				mediaList: action.payload,
				isLoading: false,
				error: action.payload.status,
			};

		case FETCH_PRODUCT_MEDIA_DETAILS:
			return {
				...state,
				mediaDetails: action.payload,
				isLoading: false,
				error: action.error,
			};
			case FETCH_PRODUCT_SKU:
				return {
					...state,
					sku_list: action.payload.data,
					isLoading: false,
					error: action.error,
				};
		default:
			return state;
	}
};
export default productMediaReducer;
