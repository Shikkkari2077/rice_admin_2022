import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import $ from 'jquery';
import {UserUpdate} from '../../store/index';
import Swal from 'sweetalert2';

class UserEdit extends React.Component {
	state = {
		status: 'Active',
        phoneNumber:"",
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	componentDidMount() {
        console.log(this.props.match.params.user_id,this.props.match.params.phoneNumber)
        this.setState({
            phoneNumber:this.props.match.params.phoneNumber,
            userId:this.props.match.params.user_id
        })
    }
	
	componentWillReceiveProps=(nextprops)=>{
        console.log(nextprops)
    }
	onSaveData = () => {
        var data={
            userId: this.state.userId,
            phone: this.state.phoneNumber
        }
        this.props.UserUpdate(data)
    };
	render() {
		
		return (
			<div className="main-body">
				<div className="page-wrapper">
					<div className="page-header">
						<div className="row align-items-end">
							<div className="col-lg-8">
								<div className="page-header-title">
									<div className="d-inline">
										<h4>
											Phone Number Edit
										</h4>
									</div>
								</div>
							</div>
							{/* <div className="col-lg-4">
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
											Media Add
										</li>
									</ul>
								</div>
							</div> */}
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
																Phone Number
															</label>
															<div className="col-sm-9">
																<input
																	type="text"
																	className="form-control"
																	name="phoneNumber"
																	placeholder="Phone Number"
																	onChange={this.handleChange}
																	value={this.state.phoneNumber}
																	required
																/>
															</div>
														</div>
													</div>
				

												
											
													
												</div>
												<div className="card-footer">
													<div className="row float-right p-3">
														<div className="card-footer">
															<div className="row float-right p-1">
                                                                   <button
																		onClick={this.onSaveData}
																		className="btn btn-grd-disabled mr-2"
																	>
																		<i className="icofont icofont-save"></i> Update
																	</button>
																{/* {this.props.category_id ? (
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
																)} */}
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

UserEdit.propTypes = {
	UserUpdate: PropTypes.func.isRequired,
	login: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {UserUpdate})(UserEdit);
