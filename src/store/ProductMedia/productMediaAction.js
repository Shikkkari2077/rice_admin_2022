import axios from 'axios';
import Constant from '../../Constant';
import {
	FETCH_PRODUCT_MEDIA_ADD,
	FETCH_PRODUCT_MEDIA_DETAILS,
	FETCH_PRODUCT_MEDIA_ERROR,
	FETCH_PRODUCT_MEDIA_LIST,
	FETCH_PRODUCT_MEDIA_REQ,
	FETCH_PRODUCT_SKU,
} from '../types';

export const productMediaRequest = () => {
	return {
		type: FETCH_PRODUCT_MEDIA_REQ,
	};
};

export const productMediaError = (error) => {
	return {
		type: FETCH_PRODUCT_MEDIA_ERROR,
		error: error,
	};
};

export const getProductMediaList = (data) => (dispatch) => {
	axios
		.post(Constant.getAPI() + '/productmedia/list', data, {
			headers: {
				// 'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('superadmin_auth')}`,
			},
		})
		.then((res) => {
			dispatch({
				type: FETCH_PRODUCT_MEDIA_LIST,
				payload: res.data.data,
			});
		})
		.catch((err) => {
			const errMsg = err.message;
			console.log(err);
			dispatch(productMediaError('Error'));
		});
};

export const getProductMediaDetails = (data) => (dispatch) => {
	console.log(data)
	axios
		.post(Constant.getAPI() + '/productmedia/list', data, {
			headers: {
				// 'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('superadmin_auth')}`,
			},
		})
		.then((res) => {
			dispatch({
				type: FETCH_PRODUCT_MEDIA_DETAILS,
				payload: res.data.data,
			});
		})
		.catch((err) => {
			const errMsg = err.message;
			console.log(err);
			dispatch(productMediaError('Error'));
		});
};

export const getProductSkuList = (sku) => (dispatch) => {
	axios
		.post(Constant.getAPI() + '/product/sku',{
			recordLimit:50,
			startRange:0,
			sku
		},
		   {
			headers: {
				// 'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('superadmin_auth')}`,
			},
		})
		.then((res) => {
			console.log(res.data)
			dispatch({
				type: FETCH_PRODUCT_SKU,
				payload: res.data,
			});
		})
		.catch((err) => {
			const errMsg = err.message;
			console.log(err);
			dispatch(productMediaError('Error'));
		});
};


// export const addProductMedia = (file) => {
// 	return (dispatch) => {
// 		dispatch(getmediaReq);
// 		const formData = new FormData();
// 		formData.append('files', file);
// 		axios
// 			.post(Constant.getAPI() + '/media/add/gallery', formData, {
// 				headers: {
// 					'Content-Type': 'multipart/form-data',
// 					Authorization: `Bearer ${localStorage.getItem('superadmin_auth')}`,
// 				},
// 			})
// 			.then((res) => {
// 				console.log(res.data);
// 				// if (res.status === true) {
// 				// const media_res = res.data;
// 				// dispatch(getmediaSucess(media_res));
// 				// }
// 			})
// 			.catch((err) => {
// 				const errMsg = err.message;
// 				console.log(err);
// 				dispatch(getmediaError('Error'));
// 			});
// 	};
// };
