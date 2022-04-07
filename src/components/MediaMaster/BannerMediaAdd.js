import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import $ from 'jquery';
import {} from '../../store/index';
import Swal from 'sweetalert2';

class CouponAdd extends React.Component {
	state = {
		status: 'Active',
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	componentDidMount() {}
	componentWillReceiveProps(nextProps) {}

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
		} else {
			this.setState({
				pincodewise: false,
				productwise: false,
			});
		}
	}
	onupdate() {}
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
	onSaveData = () => {};
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
			<div className="main-body">
				<div className="page-wrapper">
					<div className="page-header">
						<div className="row align-items-end">
							<div className="col-lg-8">
								<div className="page-header-title">
									<div className="d-inline">
										<h4>
											{/* {this.props.match.params.category_id ? "Edit" : "Add"}{" "} */}
											Add Media
										</h4>
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="page-header-breadcrumb">
									<ul className="breadcrumb-title">
										<li className="breadcrumb-item">
											<Link to="/">
												<i className="feather icon-home"></i>{' '}
											</Link>
										</li>
										<li className="breadcrumb-item">
											<Link to="/">Media List</Link>
										</li>
										<li className="breadcrumb-item active">
											{/* {this.props.match.params.category_id ? "Edit" : "Add"}{" "} */}
											Media Add
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="page-body">
						<div className="row">
							<div className="col-sm-12">
								<div className="card card-border-default">
									<div className="card-block">
										<div className="tab-content tabs">
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">
																Media Title
															</label>
															<div className="col-sm-9">
																<input
																	type="text"
																	className="form-control"
																	name="title"
																	placeholder="Media title"
																	onChange={this.handleChange}
																	value={this.state.title}
																	required
																/>
															</div>
														</div>
													</div>
													{/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Description</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      // cols={}
                      className="form-control"
                      onChange={this.handleChange}
                      name="description"
                      id="description"
                      required
                      placeholder="Description"
                      value={this.state.description}
                    />
                  </div>
                </div>
              </div> */}

													<div className="col-md-6">
														<div className="form-group row">
															<label className="col-sm-3 col-form-label">Status</label>
															<div className="col-sm-9">
																<select
																	name="status"
																	className="form-control"
																	value={this.state.status}
																	onChange={this.handleChange}
																>
																	<option>Select</option>
																	<option value={true}>Active</option>
																	<option value={false}>InActive</option>
																</select>
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="row">
															<div className="col-sm-3">Display Image</div>
															<div className="col-sm-9">
																<form
																	id="categoryImage"
																	name="categoryImage"
																	encType="multipart/form-data"
																	className="text-capitalize"
																>
																	<div className="form-group">
																		<input
																			accept="image/*"
																			onChange={this.handleImageUpload}
																			id="category_image"
																			type="file"
																			className="form-control"
																			autoComplete="off"
																			name="files"
																		/>
																		{/* <span className="mt-1">( 500 x 500 )</span> */}
																	</div>
																</form>
															</div>
														</div>
													</div>
													<div sclassName="col-md-6">
														<div id="category_image_label" className="pt-2">
															{this.state.image ? (
																this.state.image !== null ||
																this.state.image !== undefined ||
																this.state.image !== {} ? (
																	<img
																		src={this.state.image}
																		alt=""
																		className="img-100"
																		onError={(e) => {
																			e.target.src = '';
																		}}
																	/>
																) : (
																	''
																)
															) : (
																''
															)}
														</div>
													</div>
												</div>
												<div className="card-footer">
													<div className="row float-right p-3">
														<div className="card-footer">
															<div className="row float-right p-1">
																{this.props.category_id ? (
																	this.state.isLoading ? (
																		<button
																			className="btn btn-grd-disabled mr-2"
																			disabled
																		>
																			Saving...!
																		</button>
																	) : (
																		<button
																			onClick={this.updateCategoryData}
																			className="btn btn-grd-disabled mr-2 "
																		>
																			Update
																		</button>
																	)
																) : this.props.isLoading ? (
																	<button
																		className="btn btn-grd-disabled mr-2"
																		disabled
																	>
																		Saving...!
																	</button>
																) : (
																	<button
																		onClick={this.onSaveData}
																		className="btn btn-grd-disabled mr-2"
																	>
																		<i className="icofont icofont-save"></i> Save
																	</button>
																)}
																<Link to={'/banner_media'} className="btn btn-outline-dark">
																	Cancel
																</Link>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
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
	};
};

CouponAdd.propTypes = {
	getUsers: PropTypes.func.isRequired,
	login: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(CouponAdd);
