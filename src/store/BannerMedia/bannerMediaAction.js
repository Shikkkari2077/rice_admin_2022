import axios from 'axios';
import Constant from '../../Constant';
import { FETCH_BANNER_MEDIA_LIST, FETCH_BANNER_MEDIA_REQ, FETCH_BANNER_MEDIA_ERROR,FETCH_BANNER_GALLERY } from '../types';

export const bannerMediaRequest = () => {
	return {
		type: FETCH_BANNER_MEDIA_REQ,
	};
};

export const bannerGallery = (list) => {
	return {
		type: FETCH_BANNER_GALLERY,
		payload:list
	};
};

export const bannerMediaError = (error) => {
	return {
		type: FETCH_BANNER_MEDIA_ERROR,
		error: error,
	};
};

export const getBannerMediaList = (data) => (dispatch) => {
	axios
		.post(Constant.getAPI() + '/banner/list', data, {
			headers: {
				// 'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('superadmin_auth')}`,
			},
		})
		.then((res) => {
			dispatch({
				type: FETCH_BANNER_MEDIA_LIST,
				payload: res.data.data,
			});
		})
		.catch((err) => {
			const errMsg = err.message;
			console.log(err);
			//dispatch(productMediaError('Error'));
		});
};

export const getProductMediaDetails = (data) => (dispatch) => {
	axios
		.post(Constant.getAPI() + '/productmedia/list', data, {
			headers: {
				// 'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('superadmin_auth')}`,
			},
		})
		.then((res) => {
			dispatch({
				//type: FETCH_PRODUCT_MEDIA_DETAILS,
				payload: res.data.data,
			});
		})
		.catch((err) => {
			const errMsg = err.message;
			console.log(err);
			//dispatch(productMediaError('Error'));
		});
};


export const getGallery = (mediaType,startRange,recordLimit,mediaName) => (dispatch) => {
	axios
		.post(Constant.getAPI() + '/media/list', {mediaType,recordLimit,startRange,mediaName}, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('superadmin_auth')}`,
			},
		})
		.then((res) => {
			if(res.data.success == true){
			console.log(res)
			dispatch(bannerGallery(res.data.data));
		}
	})
		.catch((err) => {
			const errMsg = err.message;
			console.log(err);
			dispatch(bannerMediaError('Error'));
		});
};
