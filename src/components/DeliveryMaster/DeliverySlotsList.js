import React from 'react';
import { Link } from 'react-router-dom';
// import $ from "jquery";
import Swal from 'sweetalert2';
import Constant from '../../Constant';
import MUIDataTable from 'mui-datatables';
// import Toggle from "react-toggle";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import AlertDialog from '../../common/DownloadOption';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { FormGroup, FormLabel, Tooltip, TextField, Button, Select, FormControl, InputLabel } from '@material-ui/core';
import {
	fetchOrderList,
	// fetchSellerList,
	// fetchOrderListinovie,
	// updateStatusOrder,
	// fetchcityList,
	// downloadOrderList,
	// fetchPincodeList,
} from '../../store/index';

class Checkbox extends React.Component {
	static defaultProps = {
		checked: false,
	};

	render() {
		return (
			<input
				type={this.props.type}
				name={this.props.name}
				checked={this.props.checked}
				onChange={this.props.onChange}
			/>
		);
	}
}

class DeliverySlotsList extends React.Component {
	state = {
		open: false,
		hidedownload: false,
		hideOld: false,
		isLoading: false,
		checkedItems: new Map(),
		check: false,
		downdata: [],
		checked: false,
		assignDateofDeliveryFilter: false,
		dateOfOrderFilter: false,
		totalPriceFilter: false,
		setDateWise: null,
		setDateWiseC: null,
		dataLength: 50,
		datarange: 0,
	};
	getDate = (date) => {
		const dateODorder = moment(date).format('YYYY-MM-DD HH:mm:ss');
		return dateODorder;
	};
	componentWillMount() {
		// this.getOrdersList();
	}
	onChangePa(e) {
		e.preventDefault();
		this.getOrdersList();
		this.setState({
			datarange: this.state.datarange - 25,
			dataLength: this.state.dataLength,
		});
	}
	onChangePas(e) {
		e.preventDefault();
		this.setState({
			datarange: this.state.datarange + 25,
			dataLength: this.state.dataLength,
		});
		this.getOrdersList();
	}
	handlePageChange(pageNumber) {
		console.log('active page is', pageNumber);
		console.log(pageNumber * 50 - 50);
		const range = pageNumber * 50 - 50;
		const dataLength = this.state.dataLength;
		// var start_date = this.state.start_date;
		// var data = "";
		// var invoiceID=this.state.invoiceID
		// var customerID=this.state.customerID
		// var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
		// var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
		// var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
		this.getOrdersList('', '', '', '', '', range, dataLength, '', '', '', true);
		this.setState({
			datarange: range,
			dataLength: dataLength,
		});
		this.setState({ activePage: pageNumber });
		console.log(range, dataLength);
	}
	getOrdersList = (data, seller, pincode, city, date, range, length, openOrders, invoiceID, customerID) => {
		console.log('data', range, length);
		this.props.fetchOrderList('', '', '', '', '', range, length, '', '', '', true);
	};
	getMuiTheme = () =>
		createMuiTheme({
			overrides: {
				MUIDataTable: {
					responsiveStacked: {
						maxHeight: '35vh',
						overflowX: 'none',
					},
				},
				MUIDataTableHeadCell: {
					root: {
						width: '40px',
						fontWeight: 'bold',
						padding: '1px',
						lineHeight: '10px',
						whiteSpace: 'normal',
						overflow: 'hidden',
						wordWrap: 'break-word',
						fontSize: '10px',
					},
				},
				MUIDataTableBodyCell: {
					root: {
						width: '80px',
						fontSize: '9px',
						// border:'1px solid black',
						padding: '1px',
						whiteSpace: 'normal',
						wordWrap: 'break-word',
					},
				},
			},
		});
	openModel = () => {
		this.setState({
			open: true,
		});
	};
	handleClose = () => {
		this.setState({
			open: false,
		});
	};
	selectall = (e) => {
		this.setState({
			hidedownload: !this.state.hidedownload,
			checkedItems: new Map(),
			hideOld: !this.state.hideOld,
		});
	};
	selctSingle = (e, id) => {
		// this.setState({
		//   hidedownload:!this.state.hidedownload,
		//   check:id,
		//   // [e.trget.id]: e.target.value
		// })
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState((prevState) => ({
			hidedownload: !this.state.hidedownload,
			checkedItems: prevState.checkedItems.set(item, isChecked),
		}));
		// this.props.categoryData.data.forEach(d => {
		//   this.setState({
		//   check : !this.state.check
		// })
		// })
	};

	handleChange = (e, id) => {
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState((prevState) => ({
			hidedownload: !this.state.hidedownload,
			checkedItems: prevState.checkedItems.set(item, isChecked),
		}));
		console.log(this.state.checkedItems);
		let newArray = this.props.categoryData.data.filter((d) => {
			// console.log(d)
			let searchValue = d.id;
			return searchValue.indexOf(item) !== -1;
		});
		console.log(newArray);
		this.setState({
			downdata: [...this.state.downdata, newArray],
		});
		console.log(this.state.downdata);
	};
	handleFilterSubmit = (applyFilters) => {
		let filterList = applyFilters;
		console.log('applied');
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 2000);
	};
	render() {
		const columns = [
			// {
			// 	name: 'id',
			// 	label: 'Delivery Slot Name',
			// 	options: {
			// 		display: false,
			// 		filter: false,
			// 		sort: false,
			// 		customBodyRender: (id, tableMeta) => {
			// 			return !this.state.hideOld ? (
			// 				<Checkbox
			// 					name={id}
			// 					checked={this.state.checkedItems.get(id) || false}
			// 					onChange={this.handleChange}
			// 					type="checkbox"
			// 				/>
			// 			) : (
			// 				<Checkbox
			// 					color="primary"
			// 					checked={true}
			// 					type="checkbox"
			// 					onChange={this.selectall}
			// 					inputProps={{ 'aria-label': 'secondary checkbox' }}
			// 				/>
			// 			);
			// 		},
			// 	},
			// },
			{
				name: 'User',
				label: 'Delivery Slot Name',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (User, tableMeta) => {
						return User ? User.customer_id_number : '';
					},
				},
			},
			{
				name: 'Address',
				label: 'Delivery Slot Start Time',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address ? Address.name : '';
					},
				},
			},
			{
				name: 'id',
				label: 'Delivery Slot End Time',
				options: {
					filter: true,
					sort: true,
				},
			},

			{
				name: 'Min. weight Capacity (IN kg)',
				label: 'Order Date',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (createdAt, tableMeta) => {
						return this.getDate(createdAt);
					},
				},
			},
			{
				name: 'OrderProducts',
				label: 'Max. Weight Capacity (IN kg)',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (OrderProducts, tabelMeta) => {
						return OrderProducts.map((d, i) => {
							return <li map={i}>{d.Product_sku}</li>;
						});
					},
				},
			},

			{
				name: 'OrderStatusDates',
				label: 'Min. no of orders',
				options: {
					filter: false,
					sort: true,
					customBodyRender: (OrderStatusDates, tabelMeta) => {
						return OrderStatusDates !== undefined && OrderStatusDates[0] !== undefined
							? OrderStatusDates.map((e) =>
									e.status == 'Dispatched' ? moment(e.date).format('YYYY-MM-DD') : null
							  )
							: null;
					},
				},
			},
			{
				name: 'DeliveryUser',
				label: 'Max. no of orders',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (DeliveryUser, tableMeta) => {
						return DeliveryUser ? DeliveryUser.uniqueId : '';
					},
				},
			},
			{
				name: 'Address',
				label: 'Status',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address ? Address.pinCode : '';
					},
				},
			},
			{
				name: 'Address',
				label: 'Visibility',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address.address_line_1 ? Address.address_line_1 : '';
					},
				},
			},

			// {
			// 	name: 'grandTotal',
			// 	label: 'Order Total Price',
			// 	options: {
			// 		filter: true,
			// 		sort: true,
			// 	},
			// },
			// {
			// 	name: 'transaction',
			// 	label: 'Mode of Payment',
			// 	options: {
			// 		filter: false,
			// 		sort: false,
			// 		customBodyRender: (transaction, tableMeta) => {
			// 			return transaction
			// 				? transaction.PAYMENTMODE === 'NB'
			// 					? 'Net Banking'
			// 					: transaction.PAYMENTMODE === 'PPI'
			// 					? 'Wallet'
			// 					: transaction.PAYMENTMODE === 'CC'
			// 					? 'Card'
			// 					: transaction.PAYMENTMODE === 'DC'
			// 					? 'Card'
			// 					: transaction.PAYMENTMODE === 'EMI'
			// 					? 'EMI'
			// 					: transaction.PAYMENTMODE === 'UPI'
			// 					? 'UPI '
			// 					: transaction.PAYMENTMODE === 'BANK_TRANSFER'
			// 					? 'BANK_TRANSFER'
			// 					: 'COD'
			// 				: 'COD';
			// 		},
			// 	},
			// },
			// {
			// 	name: 'paymentStatus',
			// 	label: 'Status Of Payment',
			// 	options: {
			// 		filter: true,
			// 		sort: true,
			// 	},
			// },
			// {
			// 	name: 'status',
			// 	label: 'Order Status',
			// 	options: {
			// 		filter: true,
			// 		sort: true,
			// 		customBodyRender: (status, tableMeta) => {
			// 			return (
			// 				<span
			// 					style={{
			// 						color: 'white',
			// 						background: 'blue',
			// 						borderRadius: '5px',
			// 						// padding: "1px",
			// 						// fontSize:'10px',
			// 						// whiteSpace: "nowrap",
			// 					}}
			// 				>
			// 					{status}
			// 				</span>
			// 			);
			// 		},
			// 	},
			// },
		];
		const options = {
			filter: false,
			viewColumns: false,
			responsive: 'scrollMaxHeight',
			search: false,
			print: false,
			pagination: false,
			download: false,
			pagination: false,
			confirmFilters: this.state.isLoading,
			customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
				return (
					<div style={{ marginTop: '40px' }}>
						<Button variant="contained" onClick={() => alert('Filter Applied !')}>
							Apply Filters
						</Button>
					</div>
				);
			},
			// callback that gets executed when filters are confirmed

			selectableRows: 'none',
			textLabels: {
				body: {
					noMatch: this.props.isLoading ? (
						<div
							style={{
								textAlign: 'center',
								display: 'flex',
								color: 'red',
								width: '1024px',
								justifyContent: 'center',
							}}
						>
							Loading data..!
						</div>
					) : (
						<div
							style={{
								textAlign: 'center',
								display: 'flex',
								color: 'red',
								width: '1024px',
								justifyContent: 'center',
							}}
						>
							<p style={{ textAlign: 'center' }}>Sorry, No Data Found</p>
						</div>
					),
					toolTip: 'Sort',
					columnHeaderTooltip: (column) => `Sort for ${column.label}`,
				},
			},
		};
		return (
			<div className="pcoded-inner-content">
				<div className="main-body">
					<div className="page-wrapper">
						<div className="page-header">
							<div className="row align-items-end">
								<div className="col-lg-8">
									<div className="page-header-title">
										<div className="d-inline">
											<h4>Delivery Slots List</h4>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<Link to="/delivery_slots/add" className="btn btn-dark btn-sm float-right">
										Add delivery slot
									</Link>
								</div>
							</div>
						</div>
						<div className="page-body">
							<div className="row">
								<div className="col-sm-12">
									<div className="card">
										<div className="card-block">
											<div className="row">
												<div className="col-sm-9"></div>
												<div className="col-sm-3"></div>
											</div>

											<div className="dt-responsive table-responsive">
												<MuiThemeProvider theme={this.getMuiTheme()}>
													<MUIDataTable
														className="table-responsive"
														data={this.props.order}
														columns={columns}
														options={options}
													/>
												</MuiThemeProvider>
												<nav
													aria-label="Page navigation example "
													className="display-flex float-right"
												>
													<ul class="pagination">
														<li class="page-item mx-2 py-2">
															Count : {this.state.datarange} - {this.state.dataLength}
														</li>

														<Pagination
															itemClass="page-item"
															linkClass="page-link"
															activePage={this.state.activePage}
															itemsCountPerPage={50}
															totalItemsCount={this.props.countFilterWise}
															pageRangeDisplayed={22}
															onChange={this.handlePageChange.bind(this)}
														/>
													</ul>
												</nav>

												<AlertDialog open={this.state.open} func={this.handleClose} />
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
		order: state.order.order_list,

		isAuthUser: state.isAuthUser,
		countFilterWise: state.order.countFilterWise,

		error: state.error,
	};
};

DeliverySlotsList.propTypes = {
	getUsers: PropTypes.func.isRequired,
	fetchOrderList: PropTypes.func.isRequired,

	login: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchOrderList })(DeliverySlotsList);
