import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import $ from "jquery";
// import Constant from "../../Constant";
import Swal from 'sweetalert2';
import MUIDataTable from 'mui-datatables';
import Toggle from 'react-toggle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductMediaDetails } from '../../store/index';
import { Tooltip, Button, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from '../../common/DownloadOption';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ImageUpload from './imageUpload/ImageUpload';

class ProductMediaDetails extends Component {
	state = {
		datarange: 0,
		dataLength: 50,
	};

	componentWillMount() {
		var data = {
			sku: this.props.match.params.sku_id,
		};
		this.props.getProductMediaDetails(data);
	}
	componentWillReceiveProps(nextProps) {
		if( nextProps.productMedia !== undefined && 
			nextProps.productMedia.mediaDetails !== undefined &&
			 nextProps.productMedia.mediaDetails[0] !== undefined )
		this.setState({ mediaDetails: nextProps.productMedia.mediaDetails[0].data });
	}

	onUpload = () => {
		var data = {
			sku: this.props.match.params.sku_id,
		};
		this.props.getProductMediaDetails(data);
	};
	render() {
		return (
			<div className="pcoded-inner-content">
				<div className="main-body">
					<div className="page-wrapper">
						<div className="page-header">
							<div className="row align-items-end">
								<div className="col-lg-8">
									<div className="page-header-title">
										<div className="d-inline d-flex ">
											<Link to="/product_media">
												<h4> PRODUCT MEDIA </h4>{' '}
											</Link>
											<h4 className="mx-3">/</h4> <h4>{this.props.match.params.sku_id}</h4>
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
											<li className="breadcrumb-item active">Product Media</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="page-body">
							<div className="row">
								{console.log(this.state.mediaDetails)}
								{this.state.mediaDetails &&
									this.state.mediaDetails.map((media) => (
										<div className="col-md-2">
											<ImageUpload
												image={media.url}
												name={media.mediakey}
												uploaded={this.onUpload}
											></ImageUpload>
										</div>
									))}
								<div className="col-md-2">
									<ImageUpload uploaded={this.onUpload}></ImageUpload>
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
		productMedia: state.productMedia,
		error: state.category.error,
		isLoading: state.category.isLoading,
	};
};
ProductMediaDetails.propTypes = {
	getProductMediaDetails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getProductMediaDetails })(ProductMediaDetails);
