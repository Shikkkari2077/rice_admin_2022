import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import $ from 'jquery';
import {
	fetchCategoryList,
	fetchPincodeList,
	fetchProductList,
	fetchSellerList,
	updateCoupomList,
	addCoupon,
	getDeliveryboyDetails,
} from '../../store/index';
import Swal from 'sweetalert2';

class DeliverySlotsAdd extends React.Component {
	state = {
		status: 'Active',
		pincodes: '',
		coupon_id: '',
		products: '',
		sellers: '',
		description: '',
		categories: '',
		cat: '',
		title: '',
		discountType: '',
		percentValue: '',
		discountAmount: '',
		discountValue: '',
		minAmountOfPurchase: '',
		expireOn: '',
		MediumId: '',
		ProductIds: [],
		CategoryIds: [],
		SellerIds: [],
		PincodeIds: [],
		perUserLimit: '',
		percentType: false,
		productwise: false,
		pincodewise: false,
		display: '',
		AddPincodeIds: '',
		addproducts: '',
		rprod: '',
		aprod: '',
		rpin: '',
		apin: '',
		prod: '',
		pin: '',
		removeproducts: '',
		addPincodes: '',
		removePinCode: '',
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	componentDidMount() {
		console.log('jjee', this.props.coupon_id);
		if (this.props.coupon_id) {
			this.props.getDeliveryboyDetails(this.props.coupon_id);
		}
		// this.props.fetchCategoryList();
		this.props.fetchPincodeList('', 0, 2500, '');
		this.props.fetchProductList();
		// this.props.fetchSellerList();
	}
	componentWillReceiveProps(nextProps) {
		console.log('he', nextProps.pincode_list);

		if (!nextProps.coupon_id) {
			this.setState({
				ProductIds: nextProps.product_list,
				PincodeIds: nextProps.pincode_list,
				AddPincodeIds: nextProps.pincode_list,
			});
		} else {
			this.setState({
				ProductIds: nextProps.coupon_det[0] ? nextProps.coupon_det[0].Products : '',
				PincodeIds: nextProps.coupon_det[0] ? nextProps.coupon_det[0].PinCodes : '',
				coupon_id: nextProps.coupon_det[0] ? nextProps.coupon_det[0].coupon_id : '',
				title: nextProps.coupon_det[0] ? nextProps.coupon_det[0].name : '',
				display: nextProps.coupon_det[0] ? nextProps.coupon_det[0].display : '',
				couponCode: nextProps.coupon_det[0] ? nextProps.coupon_det[0].couponCode : '',
				description: nextProps.coupon_det[0] ? nextProps.coupon_det[0].description : '',
				discountValue: nextProps.coupon_det[0] ? nextProps.coupon_det[0].discountValue : '',
				discountType: nextProps.coupon_det[0] ? nextProps.coupon_det[0].discountType : '',
				minAmountOfPurchase: nextProps.coupon_det[0] ? nextProps.coupon_det[0].minPurchaseAmount : '',
				validFrom: nextProps.coupon_det[0] ? nextProps.coupon_det[0].validFrom : '',
				validTo: nextProps.coupon_det[0] ? nextProps.coupon_det[0].validTo : '',
				MediumId: null,
				maxUsers: nextProps.coupon_det[0] ? nextProps.coupon_det[0].maxUsers : '',
				perUserLimit: nextProps.coupon_det[0] ? nextProps.coupon_det[0].perUserLimit : '',
				status: nextProps.coupon_det[0] ? nextProps.coupon_det[0].status : '',
				typeS: nextProps.coupon_det[0]
					? nextProps.coupon_det[0].Products.length > 0
						? 'productwise'
						: nextProps.coupon_det[0].PinCodes.length > 0
						? 'pincodewise'
						: ''
					: '',
			});
			if (this.state.typeS === 'productwise') {
				this.setState({
					productwise: true,
				});
				// this.props.fetchProductList();
				console.log('trueeeeeeee');
			} else if (this.state.typeS === 'pincodewise') {
				this.setState({
					pincodewise: true,
				});
				// this.props.fetchPincodeList();
			} else {
				this.setState({
					pincodewise: false,
					productwise: false,
				});
			}
			if (this.state.discountType === 'percent') {
				this.setState({
					percentType: true,
				});
			} else if (this.state.discountType === 'amount') {
				this.setState({
					percentType: false,
				});
			}
		}
	}
	handleSelectCat = (data) => {
		this.setState({
			categories: data,
			cat: Array.isArray(data) ? data.map((x) => x.id) : [],
		});
	};
	handleSelectProduct = (data) => {
		this.setState({
			products: data,
			prod: Array.isArray(data) ? data.map((x) => x.id) : [],
		});
	};
	handleRemoveProduct = (data) => {
		this.setState({
			removeproducts: data,
			rprod: Array.isArray(data) ? data.map((x) => x.id) : [],
		});
		console.log('rrrr', this.state.rprod);
	};
	handleAddProduct = (data) => {
		this.setState({
			addproducts: data,
			aprod: Array.isArray(data) ? data.map((x) => x.id) : [],
		});
		console.log('rrrr', this.state.aprod);
	};
	handleRemovePincodes = (data) => {
		this.setState({
			removePinCode: data,
			rpin: Array.isArray(data) ? data.map((x) => x.id) : [],
		});
		console.log('rrrr', this.state.rpin);
	};
	handleaddPincodes = (data) => {
		this.setState({
			addPincodes: data,
			apin: Array.isArray(data) ? data.map((x) => x.id) : [],
		});
		console.log('rrrr', this.state.apin);
	};
	handleSelectPincode = (data) => {
		this.setState({
			pincodes: data,
			pin: Array.isArray(data) ? data.map((x) => x.id) : [],
		});
	};
	handleSelectSeller = (data) => {
		this.setState({
			sellers: data,
			sell: Array.isArray(data) ? data.map((x) => x.id) : [],
		});
	};
	handleChangeType(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
		if (e.target.value === 'percent') {
			this.setState({
				percentType: true,
			});
		} else {
			this.setState({
				percentType: false,
			});
		}
	}
	handleChangeTypes(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
		if (e.target.value === 'productwise') {
			this.setState({
				productwise: true,
				pincodewise: false,
			});
		} else if (e.target.value === 'pincodewise') {
			this.setState({
				pincodewise: true,
				productwise: false,
			});
			this.props.fetchPincodeList();
		} else {
			this.setState({
				pincodewise: false,
				productwise: false,
			});
		}
	}
	onupdate() {
		const dicvountvalue = this.state.discountValue;
		const minAmountOfPurchase = this.state.minAmountOfPurchase;
		if (dicvountvalue >= minAmountOfPurchase) {
			Swal.fire({
				title: 'Minimum Amount of Purchase Should be greater than discout value',
				icon: 'warning',
				text: '',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ok',
			}).then((value) => {
				if (value) {
				}
			});
		} else {
			var validF = new Date(this.state.validFrom);
			var validT = new Date(this.state.validTo);
			const validFrom = validF.getTime();
			const validTo = validT.getTime();

			if (this.state.typeS === 'pincodewise') {
				const data = {
					couponId: this.props.coupon_id,
					name: this.state.title,
					display: this.state.display,
					couponCode: this.state.couponCode,
					description: this.state.description,
					discountValue: this.state.discountValue,
					discountType: this.state.discountType,
					minPurchaseAmount: this.state.minAmountOfPurchase,
					validFrom: validFrom,
					validTo: validTo,
					MediumId: null,
					maxUsers: this.state.maxUsers,
					perUserLimit: this.state.perUserLimit,
					status: this.state.status,
					PincodeIds: this.state.apin,
					removePincodeIds: this.state.rpin,
				};
				console.log(data);
				this.props.updateCoupomList(data);
			} else if (this.state.typeS === 'productwise') {
				const data = {
					couponId: this.props.coupon_id,
					name: this.state.title,
					couponCode: this.state.couponCode,
					display: this.state.display,
					description: this.state.description,
					discountValue: this.state.discountValue,
					discountType: this.state.discountType,
					minPurchaseAmount: this.state.minAmountOfPurchase,
					validFrom: validFrom,
					validTo: validTo,
					MediumId: null,
					maxUsers: this.state.maxUsers,
					perUserLimit: this.state.perUserLimit,
					status: this.state.status,
					removeProductIds: this.state.rprod,
					ProductIds: this.state.aprod,
				};
				console.log(data);
				this.props.updateCoupomList(data);
			} else {
				const data = {
					couponId: this.props.coupon_id,
					name: this.state.title,
					couponCode: this.state.couponCode,
					description: this.state.description,
					display: this.state.display,
					discountValue: this.state.discountValue,
					discountType: this.state.discountType,
					minPurchaseAmount: this.state.minAmountOfPurchase,
					validFrom: validFrom,
					validTo: validTo,
					MediumId: null,
					maxUsers: this.state.maxUsers,
					perUserLimit: this.state.perUserLimit,
					status: this.state.status,
				};
				console.log(data);
				this.props.updateCoupomList(data);
			}
		}
	}
	handledate(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleImageUpload = (event) => {
		document.getElementById('category_image_label').innerHTML = '';
		let element = $('#category_image').get(0);
		// $("#id_image_section").empty();
		this.setState({ accepted: element });
		var proof_img = [];
		let obj = {};
		console.log(element.files);
		const fileToUpload = event.target.files[0];
		console.log(fileToUpload);
		this.setState({ category_image: element.files, fileToUpload: fileToUpload });
		for (var i = 0; i < element.files.length; i++) {
			var file1 = element.files[i];
			var img = document.createElement('img');
			img.className = 'img-100';
			var filePath = URL.createObjectURL(file1);
			img.src = filePath;
			$('#category_image_label').append(img);
		}
	};
	onSaveData = () => {
		const dicvountvalue = this.state.discountValue;
		const minAmountOfPurchase = this.state.minAmountOfPurchase;
		console.log(dicvountvalue, minAmountOfPurchase);
		if (dicvountvalue <= minAmountOfPurchase) {
			Swal.fire({
				title: 'Minimum Amount of Purchase Should be greater than discout value',
				icon: 'warning',
				text: '',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ok',
			}).then((value) => {
				if (value) {
				}
			});
		} else {
			const media = this.state.fileToUpload;
			var validF = new Date(this.state.validFrom);
			var validT = new Date(this.state.validTo);
			const validFrom = validF.getTime();
			const validTo = validT.getTime();
			if (this.state.pincodewise === true) {
				const data = {
					name: this.state.title,
					display: this.state.display,
					couponCode: this.state.couponCode,
					description: this.state.description,
					discountValue: this.state.discountValue,
					discountType: this.state.discountType,
					minPurchaseAmount: this.state.minAmountOfPurchase,
					validFrom: validFrom,
					validTo: validTo,
					MediumId: null,
					maxUsers: this.state.maxUsers,
					perUserLimit: this.state.perUserLimit,
					status: this.state.status,
					PincodeIds: this.state.pin,
				};
				console.log(data);
				this.props.addCoupon(data);
			} else if (this.state.productwise === true) {
				const data = {
					name: this.state.title,
					couponCode: this.state.couponCode,
					display: this.state.display,
					description: this.state.description,
					discountValue: this.state.discountValue,
					discountType: this.state.discountType,
					minPurchaseAmount: this.state.minAmountOfPurchase,
					validFrom: validFrom,
					validTo: validTo,
					MediumId: null,
					maxUsers: this.state.maxUsers,
					perUserLimit: this.state.perUserLimit,
					status: this.state.status,
					ProductIds: this.state.prod,
				};
				console.log(data);
				this.props.addCoupon(data);
			} else {
				const data = {
					name: this.state.title,
					couponCode: this.state.couponCode,
					description: this.state.description,
					display: this.state.display,
					discountValue: this.state.discountValue,
					discountType: this.state.discountType,
					minPurchaseAmount: this.state.minAmountOfPurchase,
					validFrom: validFrom,
					validTo: validTo,
					MediumId: null,
					maxUsers: this.state.maxUsers,
					perUserLimit: this.state.perUserLimit,
					status: this.state.status,
				};
				console.log(data);
				this.props.addCoupon(data);
			}
		}
	};
	render() {
		const {
			pincodes,
			removePinCode,
			removeproducts,
			products,
			addproducts,
			addPincodes,
			productwise,
			pincodewise,
		} = this.state;
		console.log(this.state.validFrom);
		console.log(this.state.validTo);
		const customStyles = {
			option: (provided, state) => ({
				...provided,
				borderBottom: '1px dotted grey',
				color: state.isSelected ? 'red' : 'black',
				padding: 8,
			}),
			input: (provided) => ({
				...provided,
				display: 'flex',
				height: '30px',
			}),
		};
		const { percentType } = this.state;
		return (
			<div className="">
				<div className="card-body">
					<div className="row">
						<div className="col-md-6">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label">Delivery Slot Name</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										name="title"
										placeholder="Delivery Slot Name"
										onChange={this.handleChange}
										value={this.state.title}
										required
									/>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label">Status</label>
								<div className="col-sm-8">
									<select
										required
										name="discountType"
										className="form-control"
										value={this.state.discountType}
										onChange={this.handleChangeType.bind(this)}
									>
										<option value={''}>Select</option>
										{/* <option value="percent" >Percent</option> */}
										<option value="amount">true</option>
                                        <option value="amount">false</option>
									</select>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label">Delivery Slot Start Time</label>
								<div className="col-sm-8">
									<input
										type="time"
										className="form-control"
										name="title"
										placeholder="Delivery Slot Start Time"
										onChange={this.handleChange}
										value={this.state.title}
										required
									/>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label">Delivery Slot End Time</label>
								<div className="col-sm-8">
									<input
										type="time"
										className="form-control"
										name="title"
										placeholder="Delivery Slot End Time"
										onChange={this.handleChange}
										value={this.state.title}
										required
									/>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label">Min. weight Capacity (IN kg)</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										name="title"
										placeholder="Min. weight Capacity (IN kg)"
										onChange={this.handleChange}
										value={this.state.title}
										required
									/>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label">Max. Weight Capacity (IN kg)</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										name="title"
										placeholder="Max. Weight Capacity (IN kg)"
										onChange={this.handleChange}
										value={this.state.title}
										required
									/>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label">Min. no of orders</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										name="title"
										placeholder="Min. no of orders"
										onChange={this.handleChange}
										value={this.state.title}
										required
									/>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group row">
								<label className="col-sm-4 col-form-label">Max. no of orders</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										name="title"
										placeholder="Max. no of orders"
										onChange={this.handleChange}
										value={this.state.title}
										required
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="card-footer">
						<div className="row float-right p-3">
							{!this.props.coupon_id ? (
								<button onClick={this.onSaveData} className="btn btn-grd-disabled mr-2">
									<i className="icofont icofont-save"></i> Save
								</button>
							) : (
								<button onClick={this.onupdate.bind(this)} className="btn btn-grd-disabled mr-2">
									Update
								</button>
							)}
							<Link to={'/coupon-master'} className="btn btn-outline-dark">
								Cancel
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.isLoading,
		isAuthUser: state.isAuthUser,
		error: state.error,
		product_list: state.product.product_list,
		categoryData: state.category.category_list,
		seller_list: state.seller.seller_list,
		pincode_list: state.pincode.pincode_list,
		coupon_det: state.coupon.coupon_det,
	};
};

DeliverySlotsAdd.propTypes = {
	getUsers: PropTypes.func.isRequired,
	login: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	fetchCategoryList: PropTypes.func.isRequired,
	fetchPincodeList: PropTypes.func.isRequired,
	fetchProductList: PropTypes.func.isRequired,
	fetchSellerList: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
	fetchCategoryList,
	fetchPincodeList,
	fetchProductList,
	fetchSellerList,
	addCoupon,
	getDeliveryboyDetails,
	updateCoupomList,
})(DeliverySlotsAdd);
