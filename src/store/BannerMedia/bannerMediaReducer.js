import {
	FETCH_BANNER_MEDIA_ERROR,
	FETCH_BANNER_MEDIA_REQ,
	FETCH_BANNER_MEDIA_LIST,
	FETCH_BANNER_MEDIA_DETAILS,
	FETCH_BANNER_GALLERY,
} from '../types';

const initialState = {
	media_res: [],
	banner_gallery:[],
	isLoading: true,
	error: null,
};

const productMediaReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_BANNER_MEDIA_REQ:
			return {
				...state,
				isLoading: true,
			};

		case FETCH_BANNER_MEDIA_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		case FETCH_BANNER_MEDIA_LIST:
			return {
				...state,
				bannerMediaList: action.payload,
				isLoading: false,
				error: action.payload.status,
			};
			case FETCH_BANNER_GALLERY:
			return {
				...state,
				banner_gallery: action.payload,
				isLoading: false,
				error: action.payload.status,
			};

		case FETCH_BANNER_MEDIA_DETAILS:
			return {
				...state,
				bannerMediaDetails: action.payload,
				isLoading: false,
				error: action.error,
			};

		default:
			return state;
	}
};
export default productMediaReducer;
