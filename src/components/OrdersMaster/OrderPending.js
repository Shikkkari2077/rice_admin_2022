/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';
import Constant from '../../Constant';
import MUIDataTable from 'mui-datatables';
import Toggle from 'react-toggle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertDialog from '../../common/DownloadOption';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ModelPopUp from '../../common/ModelPopUp';
import moment from 'moment';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import fileDownload from 'js-file-download';
// React.Bootstrap = require('react-bootstrap');
// React.Bootstrap.Select = require('react-bootstrap-select');
import Pagination from 'react-js-pagination';
import fileSaver, { saveAs } from 'file-saver';
import { makeStyles } from '@material-ui/core/styles';
import { FormGroup, FormLabel, Tooltip,
	 TextField, Button, Select, FormControl, InputLabel } from '@material-ui/core';
import {
	generateInvoice,
	fetchOrderList,
	fetchSellerList,
	downloadOrderList,
	fetchOrderListinovie,
	updateStatusOrder,
	fetchcityList,
	fetchPincodeList,
	assignDeleveryBoy,
	fetchdeliveryboyList,
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
//assign delivery 24

class OrderPending extends React.Component {
	state = {
		openOrders:true,
		activePage:1,
		resetFilter:true,
		HideDispatch:false,
		statusType: '',
		customerID: '',
		invoiceID: '',
		open: false,
		openToedit: false,
		hidedownload: false,
		hideOld: false,
		isLoading: false,
		checkedItems: new Map(),
		check: false,
		downdata: [],
		checked: false,
		dateOfOrderFilter: false,
		totalPriceFilter: false,
		setDateWise: null,
		setDateWiseC: null,
		orderedit_id: '',
		status: null,
		enable: false,
		dataLength: 50,
		datarange: 0,
		newStatus: 'Loading..',
		sellerFilter: '',
		pincodeFilter: '',
		cityFilter: '',
		start_date: '',
		csvReport: {
			data: [],
			headers: [],
			filename: 'Report.csv',
		},
	};
	fuzzySearch(options) {
		const fuse = new Fuse(options, {
			keys: ['name', 'groupName'],
			threshold: 0.3,
		});

		return (value) => {
			if (!value.length) {
				return options;
			}

			return fuse.search(value);
		};
	}
	
	componentWillMount() {
		if(this.props.match.params.reset_id){
           this.setState({resetFilter:false,})
		}
		this.props.fetchdeliveryboyList();
		var start_date = moment().subtract(179, 'days').startOf('day').valueOf();
		var data = '';
		
		this.setState({
			start_date: start_date,
			sellerFilter:localStorage.getItem('OrderPendingSeller') !== null?localStorage.getItem('OrderPendingSeller') :"",
			pincodeFilter:localStorage.getItem('OrderPendingPin') !== null?localStorage.getItem('OrderPendingPin') :"",
			cityFilter:localStorage.getItem('OrderPendingCity') !== null?localStorage.getItem('OrderPendingCity') :"",
		});
		//CONDITIONS FOR INVOICE AND CUSTOMER ID
		// if(this.props.match.params.reset_id &&
		// 	 localStorage.getItem('OrderPendingInvoice')!==null
		// 	  ){
		// 	this.setState({resetFilter:false,cancelButton:true,search:localStorage.getItem('OrderPendingInvoice')})
		//  }
		//  else if(this.props.match.params.reset_id && localStorage.getItem('OrderPendingCustomer')!==null)
		//  {
		// 	this.setState({resetFilter:false,cancelButton:true,search:localStorage.getItem('OrderPendingCustomer')})

		//  }
		if(this.props.match.params.reset_id !== undefined)
		{ 
			//console..log(moment().subtract(localStorage.getItem('OrderPendingDate'), 'days').startOf('day').valueOf(),localStorage.getItem('OrderPendingDate'))
			this.props.fetchOrderList(
			data,
		    localStorage.getItem('OrderPendingSeller') !== null?localStorage.getItem('OrderPendingSeller') :"",
			localStorage.getItem('OrderPendingPin') !== null?localStorage.getItem('OrderPendingPin') :"", 
			localStorage.getItem('OrderPendingCity') !== null?localStorage.getItem('OrderPendingCity') :"", 
			moment().subtract(localStorage.getItem('OrderPendingDate'), 'days').startOf('day').valueOf(),
			this.state.datarange, 
			this.state.dataLength,
			true,
			// localStorage.getItem('OrderPendingInvoice') !== null?localStorage.getItem('OrderPendingInvoice') :'',
			// localStorage.getItem('OrderPendingCustomer') !==null?localStorage.getItem('OrderPendingCustomer'):''
			)}
		else{
			this.props.fetchOrderList(
				data,
				this.state.sellerFilter,
				this.state.pincodeFilter, 
				this.state.cityFilter, 
				start_date,
				this.state.datarange, 
				this.state.dataLength,
				true,
				)
		}	
        if(localStorage.getItem('role')!=='seller'){
		this.props.fetchSellerList(0, 25000,'')}
		this.props.fetchPincodeList('', 0, 2500);
		this.props.fetchcityList(0, 25500);
	}

	//
	getOrdersList = (data, seller, pincode, city, date, range, length, openOrder, invoiceId, customerId) => {
		//console..log('data', range, length);
		this.props.fetchOrderList('', seller, pincode, city, date, range, length, true, invoiceId, customerId);
	};

	componentWillReceiveProps(nextProps) {
		const orderpending = nextProps.order;
		const orderpendi = nextProps.orderdet;
		//console..log(orderpendi, 'data');
		this.setState({
			newstatus: nextProps.orderpendi ? nextProps.orderpendi.data[0].status : '',
		});
	}

	getMuiTheme = () =>
		createMuiTheme({
			overrides: {
				MUIDataTable: {
					responsiveStacked: {
						maxHeight: '40vh',
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
	updateSttaus = () => {
		this.props.updateStatusOrder(
			this.state.orderedit_id,
			 this.state.reasonOfdelayed,
			  this.state.status);
	
	};
	handleChangeStatus = (e) => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
		//console..log(this.state.status);
	};
	openModel = () => {
		this.setState({
			open: true,
		});
	};
	handleClose = () => {
		this.setState({
			open: false,
			openToedit: false,
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
		let newArray = [];
		//console..log(this.state.checkedItems);
		if (this.props.order !== undefined) {
			newArray = this.props.order.filter((d) => {
				// console.log(d)
				let searchValue = d.id;
				return searchValue.indexOf(item) !== -1;
			});
		}
		if (isChecked === true) {
			this.setState({
				downdata: [...this.state.downdata, newArray],
			});
			//console..log([...this.state.downdata, newArray]);
			//console..log(this.state.hidedownload);
		} else {
			var array = this.state.downdata;
			var index;
			for (let i = 0; i < this.state.downdata.length; i++) {
				var temp = this.state.downdata[i];
				for (let j = 0; j < temp.length; j++) {
					if (temp[j].id === newArray[0].id) {
						index = i;
						//console..log(index);
						break;
					}
				}
			}
			if (index !== -1) {
				array.splice(index, 1);
			}
			//console..log(array);
			this.setState({ downdata: array });
		}
	};
	handleFilterSubmit = (applyFilters) => {
		let filterList = applyFilters;
		//console..log('applied');
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 2000);
	};

	getDate = (date) => {
		const dateODorder = moment(date).format('YYYY-MM-DD HH:mm:ss');
		return dateODorder;
	};

	handlePeriodChange = (v) => {
		this.setState({
			dateFilter: v,
		});

		var start_date = moment().subtract(v, 'days').startOf('day').valueOf();
		this.setState({
			start_date: start_date,
		});
		//console..log(start_date,v);
		//localStorage.setItem('OrderPendingDate',v)

	};
	handlepincodeChange = (v) => {
		this.setState({
			pincodeFilter: v,
		});
		//console..log(v);
		//localStorage.setItem('OrderPendingPin',v)

	};
	handlepin(val) {
		//console..log(val);
	}
	handleCityChange = (v) => {
		//console..log(v);
		this.setState({
			cityFilter: v,
		});
     //localStorage.setItem('OrderPendingCity',v)
		// this.props.fetchPincodeList(v,0,2500)
	};
	handleSellerChange = (v) => {
		this.setState({
			sellerFilter: v,
		});
		//localStorage.setItem('OrderPendingSeller',v)

	};
	componentWillReceiveProps(nextProps) {
		//console..log(this.props.delivery);
		this.setState({
			deliveryBoyList: this.props.delivery,
		});
	}
	exportCSV() {
		// axios
		// 	.get(Constant.getAPI() + '/order/report_order/download', {
		// 		params: {
		// 			sellerId:
		// 				this.state.sellerFilter !== 'All' && this.state.sellerFilter !== undefined
		// 					? this.state.sellerFilter
		// 					: '',
		// 			openOrders: 'true',
		// 			city: this.state.cityFilter !== undefined && this.state.cityFilter !== 'All',
		// 			start_date: this.state.start_date !== undefined ? this.state.start_date : '',
		// 			pinCode:
		// 				this.state.pincodeFilter !== 'All' && this.state.pincodeFilter !== undefined
		// 					? this.state.pincodeFilter
		// 					: '',
		// 			invoice_number: this.state.invoiceID !== undefined ? this.state.invoiceID : '',
		// 			customerId: this.state.customerID !== undefined ? this.state.customerID : '',
		// 		},
		// 		responseType: 'arraybuffer',
		// 		headers: {
		// 			Authorization: `Bearer ${localStorage.getItem('superadmin_auth')}`,
        //   'Content-Disposition': "attachment; filename=template.xlsx",
        //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		// 		},
		// 	})
		// 	.then((res) => {
		// 		console.log(res, 'hello');
				
              
        // const url = window.URL.createObjectURL(new Blob([res]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'Orders.xlsx');
        // document.body.appendChild(link);
        // link.click();


		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		 if( localStorage.getItem('role')=='seller'){
		      //console.log(this.state.start_date, this.state.cityId ,this.state.pincode, localStorage.getItem('seller_id') )

		      window.location.href = `${Constant.getAPI()}/order/report_order/download?sellerId=${
		        localStorage.getItem('seller_id')
		      }&city=${
		        this.state.cityFilter !== undefined && this.state.cityFilter !== "All"  ? this.state.cityFilter : ""
		      }&pinCode=${
		        this.state.pincodeFilter !== "All" && this.state.pincodeFilter !== undefined ? this.state.pincodeFilter : ""
		      }&start_date=${
		        this.state.start_date !== undefined ? this.state.start_date : ""
		      }&openOrders=true&invoice_number=${this.state.invoiceID !== undefined ?this.state.invoiceID:''}
		      &customerId=${this.state.customerID !== undefined ?this.state.customerID:''}`;
		    }
		    else{
		      
		      window.location.href = `${Constant.getAPI()}/order/report_order/download?sellerId=${
		        this.state.sellerFilter !== "All" && this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
		      }&city=${
		        this.state.cityFilter !== undefined && this.state.cityFilter !== "All" ? this.state.cityFilter : ""
		      }&pinCode=${
		        this.state.pincodeFilter !== "All" && this.state.pincodeFilter !== undefined ? this.state.pincodeFilter : ""
		      }&start_date=${
		        this.state.start_date !== undefined ? this.state.start_date : ""
		      }&openOrders=true&invoice_number=${this.state.invoiceID !== undefined ?this.state.invoiceID:''
			}&customerId=${this.state.customerID !== undefined ?this.state.customerID:''
		}&adminId=${localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''}`;

		}
	}
	exportCSVS() {
		var csvRow = [];
		var Ad = [
			[ "Customer Id",
			"Customer Name",
			"Customer MobileNo",
			"Customer Alternate MobileNo",
			"Order ID",
			"Application Order Number",
			"Order Date & Time",
			"Payment Type",
	
			"Order Item SKU",
			"Order Item Product Name ",
			"product Order Quantity",
			"Order Status",
			"Order Delivery Address Line 1",
			"Order Delivery Address Line 2",
			"Road",
			"Landmark",
			"Pincode",
			"City",
			"State",
			
			"PTR",
			// "Line Item Amount",
			"MRP",
			"Delivery Charges",
			"Final Amount",
		  
			// "Taransaction ID",
			"Mode of payment",
			"Status of payment",

			"Invoice Id",
			'Seller Invoice Id',
	
			"Seller ID",
			"Company Seller Name",
			"Assigned Delivery Person Name",
			"Salesman Code",
			"Salesman Name"
			],
		];
		var rde = this.state.downdata;
		console.log(rde);
		for (var item = 0; item < rde.length; item++) {
			for (var itemi = 0; itemi < 1; itemi++) {
				// if(re[item].status !== 'Cancelled'){
				for (var j = 0; j < rde[item][itemi].OrderProducts.length; j++) {
					Ad.push([
						rde[item][itemi].User.customer_unique_number,
						rde[item][itemi].Address.name,
						rde[item][itemi].Address.mobile,
						rde[item][itemi].Address.alternate_mobile
						  ? rde[item][itemi].Address.alternate_mobile
						  : "--",
						 rde[item][itemi].id,
						 rde[item][itemi].id,
						 moment(rde[item][itemi].createdAt).format("YYYY-MM-DD HH:mm:ss"),
						 rde[item][itemi].paymentType,
						 rde[item][itemi].OrderProducts[j].SKU,
						 rde[item][itemi].OrderProducts[j].productName,
						rde[item][itemi].OrderProducts[j].qty,
						rde[item][itemi].orderStatus.replace(/,/g, "-"),
						rde[item][itemi].Address.address_line_1
						  ? rde[item][itemi].Address.address_line_1.replace(/,/g, "-")
						  : "-",
						rde[item][itemi].Address.address_line_2
						  ? rde[item][itemi].Address.address_line_2.replace(/,/g, "-")
						  : "-",
						rde[item][itemi].Address.road
						  ? rde[item][itemi].Address.road.replace(/,/g, " -")
						  : "-",
						rde[item][itemi].Address.landmark
						  ? rde[item][itemi].Address.landmark.replace(/,/g, "- ")
						  : "-",
						rde[item][itemi].Address.pinCode,
			
						rde[item][itemi].Address.city
						  ? rde[item][itemi].Address.city.replace(/,/g, "- ")
						  : "-",
						rde[item][itemi].Address.state,
			
						rde[item][itemi].OrderProducts[j].PTR,
			
						// rde[item][itemi].OrderProducts[j]
						//   ? rde[item][itemi].OrderProducts[j].Product_sp
						//   : "--",
						// `${
						//   rde[item][itemi].OrderProducts[j].Product_sp *
						//   rde[item][itemi].OrderProducts[j].qty
						// }`,
						rde[item][itemi].OrderProducts[j].MRP,
			
						rde[item][itemi].deliveryCharge,
					   rde[item][itemi].grandTotal,
						rde[item].transaction
						  ? rde[item].transaction.PAYMENTMODE === "NB"
						    ? "Net Banking"
						    : rde[item].transaction.PAYMENTMODE === "PPI"
						    ? "Wallet"
						    : rde[item].transaction.PAYMENTMODE === "CC"
						    ? "Card"
						    : rde[item].transaction.PAYMENTMODE === "DC"
						    ? "Card"
						    : rde[item].transaction.PAYMENTMODE === "EMI"
						    ? "EMI"
						    : rde[item].transaction.PAYMENTMODE === "UPI"
						    ? "UPI "
						    : rde[item].transaction.PAYMENTMODE === "BANK_TRANSFER"
						    ? "BANK_TRANSFER"
						    : "--"
						  : "COD",
						// rde[item].transaction ? rde[item].transaction.TXNID : "--",
						rde[item].paymentStatus,
						rde[item][itemi].invoice_number,
						rde[item][itemi].seller_invoiceId,
			
						rde[item][itemi].Seller.unique_identifier,
						rde[item][itemi].Seller.name,
						rde[item][itemi].delivery_userName,
						rde[item][itemi].Salesman && rde[item][itemi].Salesman.code ?rde[item][itemi].Salesman.code:"-",

						rde[item][itemi].Salesman && rde[item][itemi].Salesman.name?rde[item][itemi].Salesman.name:"-"
					]);
				}
			}
		}
		console.log('new', Ad);
		let csvContent = 'data:text/csv;charset=utf-8,';
		Ad.forEach(function (rowArray) {
			let row = rowArray.join(',');
			csvContent += row + '\r\n';
		});
		// for(var i=0;i<=rde.length;++i){
		//     csvRow.push(Ad[j].join(','))
		//     var csvString=csvRow.join('%0A');
		// }
		console.log(csvContent);
		// var csvContent=csvContent.join('%0A');
		console.warn(csvContent);
		var a = document.createElement('a');
		a.href = 'data:attachment/csv' + csvContent;
		a.download = 'Orders.csv';
		document.body.appendChild(a);
		a.click();
	}
	

	handleSearchinput(r) {
		this.setState({
			search: r.target.value,
		});
	}
	oncancelButton() {
		var start_date = this.state.start_date;
		var data = '';
		var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
		var pincode = this.state.pincodeFilter !== 'All' ? this.state.pincodeFilter : '';
		var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
		this.getOrdersList(
			data,
			seller,
			pincode,
			city,
			start_date,
			0, //range
			50 //length
		);
		this.setState({
			cancelButton: false,
			search: '',
			invoiceID: '',
			customerID: '',
		});
	}
	onsearchButton = () => {
		var invoiceID = this.state.search;
        //localStorage.setItem('OrderPendingInvoice',invoiceID)
		this.setState({
			cancelButton: true,
			customerID: '',
			invoiceID,
		});
		var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
		var pincode = this.state.pincodeFilter !== 'All' ? this.state.pincodeFilter : '';
		var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
		var customerID = '';
		var start_date = this.state.start_date;
		var data = '';
		var openOrders = true;
		this.getOrdersList(
			data,
			seller,
			pincode,
			city,
			start_date,
			0, //range
			50, //length
			openOrders,
			invoiceID,
			customerID
		);
	};
	onsearchNameButton() {
		var customerID = this.state.search;
        //localStorage.setItem('OrderPendingCustomer',customerID)

		this.setState({
			cancelButton: true,
			customerID,
			invoiceID: '',
		});
		var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
		var pincode = this.state.pincodeFilter !== 'All' ? this.state.pincodeFilter : '';
		var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
		var invoiceID = '';
		var start_date = this.state.start_date;
		var data = '';
		var openOrders = true;
		this.getOrdersList(
			data,
			seller,
			pincode,
			city,
			start_date,
			0, //range
			50, //length
			openOrders,
			invoiceID,
			customerID
		);
	}
	onGo = () => {
		var start_date = this.state.start_date;
		var customerID = this.state.customerID;
		var invoiceID = this.state.invoiceID;
		var data = '';
		var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
		var pincode = this.state.pincodeFilter !== 'All' ? this.state.pincodeFilter : '';
		var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
		this.getOrdersList(
			data,
			seller,
			pincode,
			city,
			start_date,
			0, //range
			50, //length
			true,
			invoiceID,
			customerID
		);
		this.setState({
			dataLength: 50,
			datarange: 0,
			activePage:1
		});
	};
	handlePageChange(pageNumber) {
		console.log('active page is', pageNumber);
		console.log(pageNumber * 50 - 50);
		const range = pageNumber * 50 - 50;
		const dataLength = this.state.dataLength;
		var start_date = this.state.start_date;
		var data = '';
		var invoiceID = this.state.invoiceID;
		var customerID = this.state.customerID;
		var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
		var pincode = this.state.pincodeFilter !== 'All' ? this.state.pincodeFilter : '';
		var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
		this.getOrdersList(
			data,
			seller,
			pincode,
			city,
			start_date,
			range, //range
			dataLength, //length
			true,
			invoiceID,
			customerID
		);
		this.setState({
			datarange: range,
			dataLength: dataLength,
		});
		this.setState({ activePage: pageNumber });
		console.log(range, dataLength);
	}
	handleSelectBoy(id, e) {
		console.log(id, e.target.value);
		var personId = e.target.value;

		this.props.assignDeleveryBoy(
			id,
			personId,
			'',
			this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '',
			this.state.pincodeFilter !== 'All' ? this.state.pincodeFilter : '',
			this.state.cityFilter !== 'All' ? this.state.cityFilter : '',
			this.state.start_date,
			this.state.datarange,
			this.state.dataLength,
			this.state.openOrders
			);
		// setTimeout(() => {
		// 	var start_date = this.state.start_date;
		// 	var customerID = this.state.customerID;
		// 	var invoiceID = this.state.invoiceID;
		// 	var data = '';
		// 	var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
		// 	var pincode = this.state.pincodeFilter !== 'All' ? this.state.pincodeFilter : '';
		// 	var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
		// 	this.getOrdersList(
		// 		data,
		// 		seller,
		// 		pincode,
		// 		city,
		// 		start_date,
        //         this.state.datarange,
		// 		this.state.length, //length
	 	// 		true,
		// 		invoiceID,
		// 		customerID
		// 	);
		// }, 1000);
	}
	sellerinvoice(seller,orderid){
		
		this.props.generateInvoice(seller,orderid)
	}

	render() {
	
		const enable = this.state.status === 'Delay delivery' ? true : false;
		const useStyles = makeStyles((theme) => ({
			modal: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			},
			paper: {
				backgroundColor: theme.palette.background.paper,
				border: '2px solid #000',
				boxShadow: theme.shadows[5],
				padding: theme.spacing(2, 4, 3),
			},
		}));
		const columns = [
			{
				name: 'id',
				label: 'Select',
				options: {
					filter: false,
					sort: false,
					customBodyRender: (id, tableMeta) => {
						return !this.state.hideOld ? (
							<Checkbox
								name={id}
								checked={this.state.checkedItems.get(id) || false}
								onChange={this.handleChange}
								type="checkbox"
							/>
						) : (
							<Checkbox
								color="primary"
								checked={true}
								type="checkbox"
								onChange={this.selectall}
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						);
					},
				},
			},
			{
				name: 'orderStatus',
				label: 'Order Status',
				options: {
					filter: true,
					sort: true,
					// display:localStorage.getItem('role') === 'seller'?true:false,
					customBodyRender: (orderStatus, tableMeta) => {
						console.log(orderStatus)
						return ( orderStatus?
							<span
							
							>
								{orderStatus === "Ordered, Pending Confirmation" ?
								<span	style={{
									color: 'white',
									background: '#3366cc',
									borderRadius: '5px',
									  padding: "3px",
									  fontSize:"10px", 
								     
								}}>{orderStatus}</span>
							: 
							orderStatus === "In-Transit" ?
							<span	style={{
								color: 'black',
								background: 'GoldenRod',
								borderRadius: '5px',
								padding: "3px",
								fontSize:"11px",
							
							}}
							>{orderStatus}</span>
							:
							<span	style={{
								color: 'black',
								background: 'MediumSeaGreen',
								borderRadius: '5px',
								padding: "3px",
								fontSize:"11px",
							
							}}
							>{orderStatus}</span>
						}
							</span>
						:null);
					},
				},
			},
			
			{
				name: 'delivery_userName',
				label: 'Assign Delivery Person Name',
				options: {
					filter: true,
					sort: true,
					// display:localStorage.getItem('role')==='seller'?true:false,
					customBodyRender: (deliveryName, tableMeta) => {
						return deliveryName !== undefined ? deliveryName : '-';
					},
				},
			},
			{
				name: 'DeliveryUserId',
				label: 'Assign Delivery Person ID',
				options: {
					display: localStorage.getItem('role') === 'seller'  || 	localStorage.getItem('DeliveryBoyAssign')=='true' ?true:false,
				    width: '100px',
					filter: true,
					sort: true,

					customBodyRender: (DeliveryUserId, tableMeta) => {
						return tableMeta.rowData[1] === 'Ordered, Pending Confirmation' ? (
							<select
								style={{
									width: '80px',
								}}
								name="DeliveryUserId"
								value={DeliveryUserId !== undefined ? DeliveryUserId : this.state.DeliveryUser}
								onChange={this.handleSelectBoy.bind(this, tableMeta.rowData[10])}
							>
								<option></option>

								{this.state.deliveryBoyList !== undefined
									? this.state.deliveryBoyList.map((e) => (
											<option value={e.id}>
												{e.firstName + e.lastName + ' ' + '(' + e.uniqueId + ')'}
											</option>
									  ))
									: null}
							</select>
						) : (
							<select
								style={{
									width: '80px',
								}}
								disabled
								name="DeliveryUserId"
								value={DeliveryUserId !== undefined ? DeliveryUserId : this.state.DeliveryUser}
								onChange={this.handleSelectBoy.bind(this, tableMeta.rowData[7])}
							>
								<option></option>

								{this.state.deliveryBoyList !== undefined
									? this.state.deliveryBoyList.map((e) => (
											<option value={e.id}>{e.firstName + ' ' + '(' + e.uniqueId + ')'}</option>
									  ))
									: null}
							</select>
						);
					},
				},
			},
			{
				name: 'id',
				label: 'Action',
				options: {
					filter: false,
					sort: false,
					// display:localStorage.getItem('role') ==='seller'?true:false,
					customBodyRender: (id, tableMeta) => {
						return (
							<div>
								{console.log(tableMeta.rowData)}
                                  {tableMeta.rowData[26] == ''?
								<Link
									//to={'/invoice/' + id}
									className="m-r-15 text-muted curser-pointer"
									data-toggle="tooltip"
									data-placement="top"
									title=""
									data-original-title="Download Invoice"
									onClick={this.sellerinvoice.bind(this,id,tableMeta.rowData[33])}
								>
									<i className="f-20 icofont icofont-download"></i>
								</Link>
								:<Link
								to={'/invoice/' + id}
								className="m-r-15 text-muted curser-pointer"
								data-toggle="tooltip"
								data-placement="top"
								title=""
								data-original-title="Download Invoice"
								
							>
								<i className="f-20 icofont icofont-download"></i>
							</Link>}

									<span
										className="m-r-15 text-muted curser-pointer"
										data-toggle="tooltip"
										data-placement="top"
										title=""
										data-original-title="Edit"
										style={{ cursor: 'pointer' }}
										onClick={() => {
											
											this.setState({
												
												openToedit: true,
												orderedit_id: id,
												enable: false,
											})
										
										
											this.props.fetchOrderListinovie(id);
										}}
									>
									
										<i className="f-20 icofont icofont-ui-edit text-custom"></i>
									</span>
								{/* ) : null} */}
								{
									tableMeta.rowData[36] == true ?
									<Link
									//to={'/invoice/' + id}
									className="m-r-15 text-muted curser-pointer"
									data-toggle="tooltip"
									data-placement="top"
									title=""
									data-original-title="Download Invoice"
									onClick={this.sellerinvoice.bind(this,id,tableMeta.rowData[33])}
								>
									<i className="f-20 icofont icofont-download"></i>
								</Link>
									:null
								}
							
							</div>
						);
					},
				},
			},
			
		

			{
				name: 'Seller',
				label: 'Seller ID',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Seller, tableMeta) => {
						return Seller.unique_identifier;
					},
				},
			},
			{
				name: 'Seller',
				label: 'Seller Name',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Seller, tableMeta) => {
						return Seller.name;
					},
				},
			},
			{
				name: 'User',
				label: 'Customer Id',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (User, tableMeta) => {
						return User.customer_unique_number ? User.customer_unique_number : '';
					},
				},
			},
			{
				name: 'User',
				label: 'Customer Name',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (User, tableMeta) => {
						return User.customerName ? User.customerName : '';
					},
				},
			},

			{
				name: 'Address',
				label: 'Customer MobileNo',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address ? Address.mobile : '--';
					},
				},
			},
			{
				name: 'id',
				label: 'Order Id',
				options: {
					filter: true,
					sort: true,
				},
			},
			{
				name: 'createdAt',
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
				label: 'Order Item SKU',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (OrderProducts, tabelMeta) => {
						return OrderProducts.map((d, i) => {
							return <li map={i}>{d.SKU}</li>;
						});
					},
				},
			},
			{
				name: 'OrderProducts',
				label: 'Order Items ',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (OrderProducts, tabelMeta) => {
						return OrderProducts.map((d, i) => {
							return <li map={i}>{d.productName}</li>;
						});
					},
				},
			},
			{
				name: 'OrderProducts',
				label: 'Order Quantity ',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (OrderProducts, tabelMeta) => {
						return OrderProducts.map((d, i) => {
							return <li map={i}>{d.qty}</li>;
						});
					},
				},
			},
			{
				name: 'DeliveryUser',
				label: 'Delivery Person Id',
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
				label: 'Address Line 1',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address.address_line_1 ? Address.address_line_1 : '';
					},
				},
			},
			{
				name: 'Address',
				label: 'Address Line 2',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address.address_line_1 ? Address.address_line_2 : '';
					},
				},
			},
			{
				name: 'Address',
				label: 'Road',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address.road ? Address.road : '';
					},
				},
			},
			{
				name: 'Address',
				label: 'Landmark',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address.landmark ? Address.landmark : '';
					},
				},
			},
			{
				name: 'Address',
				label: 'Area',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address ? Address.city : '';
					},
				},
			},
			{
				name: 'Address',
				label: 'Pincode for Delivery',
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
				label: 'Location',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (Address, tableMeta) => {
						return Address.lat ? Address.lat : '--', Address.long ? Address.long : '--';
					},
				},
			},
		
			{
				name: 'deliveryCharge',
				label: 'Delivery Charge',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (deliveryCharge, tableMeta) => {
						return deliveryCharge;
					},
				},
			},
			{
				name: 'couponAmount',
				label: 'Coupon Discount',
				options: {
					filter: true,
					sort: true,
				},
			},
			{
				name: 'grandTotal',
				label: 'Order Total Price',
				options: {
					filter: true,
					sort: true,
				},
			},

			{
				name: 'paymentStatus',
				label: 'Status Of Payment',
				options: {
					filter: true,
					sort: true,
				},
			},
			{
				name: 'refundStatus',
				label: 'Status Of Refund',
				options: {
					filter: true,
					sort: true,
				},
			},
			
			{
				name: 'invoice_number',
				label:'Invoice ID',
				options: {
					filter: false,
					sort: false,
					customBodyRender: (invoice_number, tabelMeta) => {
						return invoice_number ? invoice_number : 'Not';
					},
				},
			},
			{
				name: 'seller_invoiceId',
				label: 'Seller Invoice Id',
				options: {
					filter: false,
					sort: false,
					customBodyRender: (seller_invoiceId, tabelMeta) => {
						return seller_invoiceId ? seller_invoiceId : '';
					},
				},
			},
			{
				name: 'transaction',
				label: 'Txn ID',
				options: {
					filter: false,
					sort: false,
					customBodyRender: (transaction, tabelMeta) => {
						return transaction ? transaction.TXNID : '--';
					},
				},
			},
			{
				name: 'transaction',
				label: 'Mode of Payment',
				options: {
					filter: false,
					sort: false,
					customBodyRender: (transaction, tableMeta) => {
						return transaction
							? transaction.PAYMENTMODE === 'NB'
								? 'Net Banking'
								: transaction.PAYMENTMODE === 'PPI'
								? 'Wallet'
								: transaction.PAYMENTMODE === 'CC'
								? 'Card'
								: transaction.PAYMENTMODE === 'DC'
								? 'Card'
								: transaction.PAYMENTMODE === 'EMI'
								? 'EMI'
								: transaction.PAYMENTMODE === 'UPI'
								? 'UPI '
								: transaction.PAYMENTMODE === 'BANK_TRANSFER'
								? 'BANK_TRANSFER'
								: 'COD'
							: 'COD';
					},
				},
			},
			{
				name: 'Feedbacks',
				label: 'Customer Feedback Remark',
				options: {
					filter: true,
					sort: false,
					customBodyRender: (Feedbacks, tableMeta) => {
						return Feedbacks ? Feedbacks.comment : 'No feedback';
					},
				},
			},
			
			{
				name:"SellerId",
				options:{
					display:false,
				
				}
			},
			{
				name:"Salesman",
				label:"Salesman Code",
				options:{
					display:true,
					customBodyRender:(Salesman,tableMeta)=>{
						return Salesman !== undefined && Salesman.code !== undefined ? Salesman.code :null
					}
				}
			},
			{
				name:"Salesman",
				label:"Salesman Name",
				options:{
					display:true,
					customBodyRender:(Salesman,tableMeta)=>{
						//console..log(Salesman)
						return Salesman !==undefined && Salesman.name !== undefined ?Salesman.name:null
					}
				}
			},
			{
				name:"dmsInvoiceUpdated",
				options:{
					display:false
				}
			}
			
		];
		const options = {
			filter: false,
			responsive: 'scrollMaxHeight',
			viewColumns: false,
			print: false,
			rowsPerPage: 50,
			search: false,
			pagination: false,
			rowsPerPageOptions: [10, 20, 25],
			download: false,
			fixedHeader: true,
			selectableRows: 'none',
			confirmFilters: this.state.isLoading,
			//   filterType: 'custom',
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
											<h4>Order Pending</h4>
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
											<li className="breadcrumb-item active">Order Pending</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						{this.state.openToedit ? (
							<div
								className="backdrop_color"
								style={{
									width: '100vw',
									height: '100vh',
									position: 'absolute',
									top: 0,
									left: 0,
									background: 'rbga(0,0,0,.5)',
									zIndex: '105',
								}}
							>
								<ModelPopUp 
								close={this.handleClose}
								open={true}
								redirect={'pending'}  
								orderdata={this.state}
								/>
					
							</div>
						) : (
							''
						)}

						<div className="page-body">
							<div className="row">
								<div className="col-sm-12">
									<div className="card">
										<div className="card-block">
											<div className="row">
												<div className="col-sm-9">
													<FormControl variant="outlined" className="col-sm-2 mx-1">
														<InputLabel
															htmlFor="outlined-age-native-simple"
															style={{ fontSize: '12px' }}
														>
															Date of order
														</InputLabel>
														<Select
															search
															native
															name="dateFilter"
															value={this.state.dateFilter}
																// ? this.state.dateFilter:
																// localStorage.getItem('OrderPendingDate')}
															onChange={(val) =>
																this.handlePeriodChange(val.target.value)
															}
															label="Time Peroid"
															className="my-2"
															style={{ height: '30px' }}
															inputProps={{
																name: 'Time Peroid',
																id: 'outlined-age-native-simple',
															}}
														>
															{/* <option aria-label="None" value={null} />
                              <option
                                aria-label="None"
                                value={1000000000000000}
                              >
                                Reset 
                              </option>*/}
															<option value={0}>Today</option>
															<option value={1}>Last 2 Days</option>
															<option value={2}>Last 3 Days</option>
															<option value={6}>Last 7 Days </option>
															<option value={29}>Last 30 Days </option>
															<option value={59}>Last 60 Days</option>
															<option value={89}>Last 90 Days</option>
															<option value={179} selected>
																Last 180 Days
															</option>
														</Select>
													</FormControl>
													{localStorage.getItem('role') === 'seller' ? (
														''
													) : (
														<FormControl variant="outlined" className="col-sm-2 mx-1">
															{/* {this.state.resetFilter?
															<InputLabel
																htmlFor="outlined-age-native-simple"
																style={{ fontSize: '12px' }}
																
															>
																Seller Filter
															</InputLabel>
															: */}
															<InputLabel
																htmlFor="outlined-age-native-simple"
																style={{ fontSize: '12px' }}
																
															>
																Seller Filter
															</InputLabel>
                                                                 {/* }  */}
															<Select
																search
																native
																name="sellerFilter"
																value={
																	// this.state.resetFilter?
																	this.state.sellerFilter
																	// :
																	// localStorage.getItem('OrderPendingSeller')
																}
																onChange={(val) =>
																	this.handleSellerChange(val.target.value)
																}
																label="Seller Filter"
																className="my-2"
																style={{ height: '30px' }}
																inputProps={{
																	name: 'Time Peroid',
																	id: 'outlined-age-native-simple',
																}}
															>
																<option aria-label="None" value={null} ></option>
																<option aria-label="None" value={'All'}>
																	All
																</option>
																{this.props.seller_list
																	? this.props.seller_list.map((d) => (
																			<option value={d.id}>{d.name}</option>
																	  ))
																	: 'No Seller'}
															</Select>
														</FormControl>
													)}
													<FormControl variant="outlined" className="col-sm-2 mx-1">
														{/* {this.state.resetFilter?
													<InputLabel
															htmlFor="outlined-age-native-simple"
															style={{ fontSize: '12px'}}
															>
																 	
														Pincode Filter
														</InputLabel>
														: */}
														<InputLabel
															htmlFor="outlined-age-native-simple"
															style={{ fontSize: '12px' }}
													>
															Pincode Filter
														</InputLabel>
														<Select
															className="selectpicker"
															search
															native
															name="pincodeFilter"
															value={this.state.pincodeFilter
																// ?this.state.pincodeFilter:localStorage.getItem('OrderPendingPin')}
															}
															onChange={(val) =>
																this.handlepincodeChange(val.target.value)
															}
															label="Pincode Filter"
															filter
															className="my-2"
															style={{ height: '30px' }}
															inputProps={{
																name: 'Time Peroid',
																id: 'outlined-age-native-simple',
															}}
														>
															<option aria-label="None" value={null} />
															<option aria-label="None" value={'All'}>
																All
															</option>
															{this.props.pincode_list
																? this.props.pincode_list.map((d) => (
																		<option value={d.code}>{d.code}</option>
																  ))
																: 'No Pinocde'}
														</Select>
														<div style={{ position: '-webkit-sticky' }}>
		
														</div>
					
													</FormControl>
													<FormControl variant="outlined" className="col-sm-2 mx-1">
													{this.state.resetFilter?
														<InputLabel
															htmlFor="outlined-age-native-simple"
															style={{ fontSize: '12px' }}
														>
															City Filter
														</InputLabel>:
														<InputLabel
															htmlFor="outlined-age-native-simple"
															style={{ fontSize: '12px' }}
															shrink={true}
														>
															City Filter
														</InputLabel>}
														<Select
															className="selectpicker"
															native
															name="cityFilter"
															value={this.state.cityFilter
															// 	?this.state.cityFilter
															// :localStorage.getItem('OrderPendingCity')
															
														}
															onChange={(val) => this.handleCityChange(val.target.value)}
															label="City Filter"
															className="my-2"
															style={{ height: '30px' }}
															inputProps={{
																name: 'Time Peroid',
																id: 'outlined-age-native-simple',
															}}
														>
															<option aria-label="None" value={null} />
															<option aria-label="None" value={'All'}>
																All
															</option>
															{this.props.city_list
																? this.props.city_list.map((d) => (
																		<option value={d.name}>{d.name}</option>
																  ))
																: 'No Seller'}
														</Select>
													</FormControl>
													<FormControl>
														<div
															className="btn btn-dark py-1 mx-3 mt-2"
															onClick={this.onGo}
														>
															Go
														</div>
													</FormControl>
												</div>

												<div className="col-sm-9">
													<FormControl>
														<div style={{ height: '8px' }}></div>
														<div className="form-group row">
															<div className="col-sm-9">
																<input
																	style={{ width: '190px', height: '10px' }}
																	type="search"
																	className="form-control"
																	name="search"
																	placeholder="Search..."
																	onChange={this.handleSearchinput.bind(this)}
																	value={this.state.search}
																/>
															</div>
														</div>
													</FormControl>
													<FormControl>
														<div>
															<span
																className="btn btn-dark py-1 mx-3 mt-2"
																onClick={this.onsearchButton.bind()}
															>
																<i class="icofont icofont-search"> </i>
																<i style={{ fontSize: '9px', fontStyle: 'none' }}>
																	By Invoice number
																</i>
															</span>
															<span
																className="btn btn-dark py-1 mx-3 mt-2"
																onClick={this.onsearchNameButton.bind(this)}
															>
																<i class="icofont icofont-search"></i>
																<i style={{ fontSize: '9px' }}>By Customer Id</i>
															</span>
														</div>
													</FormControl>
													<FormControl>
														{this.state.cancelButton == true ? (
															<div
																// style={{width:"20px"}}
																className="btn btn-secondary py-1 mx-3 mt-2"
																onClick={this.oncancelButton.bind(this)}
															>
																{/* <i class="icofont icofont-close-line-squared"></i> */}

																<i style={{ fontSize: '10px' }}>cancel</i>
															</div>
														) : null}
													</FormControl>
												</div>

												<div className="col-sm-3">
													{localStorage.getItem('OrderDownload') == 'true'|| localStorage.getItem('role') === 'seller' ? (
														<>
															{!this.state.downdata.length > 0 ? (
																<button
																	className="f-right bg-white b-none"
																	data-modal="modal-13"
																>
																	<Tooltip
																		title="Download"
																		aria-label="download"
																		onClick={() => {
																			this.exportCSV();
																		}}
																	>
																		<i
																			className="icofont icofont-download-alt"
																			style={{
																				fontSize: '30px',
																				color: 'grey',
																			}}
																		></i>
																	</Tooltip>
																</button>
															) : (
																<button
																	className="f-right bg-white b-none"
																	data-modal="modal-13"
																>
																	<Tooltip
																		title="Download Selected"
																		aria-label="download"
																		onClick={() => {
																			this.exportCSVS();
																		}}
																	>
																		<i
																			className="icofont icofont-download-alt"
																			style={{
																				fontSize: '30px',
																				color: 'grey',
																			}}
																		></i>
																	</Tooltip>
																</button>
															)}
														</>
													) : null}
												</div>
											</div>
											<hr></hr>
											<div className="dt-responsive table-responsive">
												<MuiThemeProvider
													theme={this.getMuiTheme()}
													style={{ width: '100%', overflow: 'none' }}
												>
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
															Count : {this.state.datarange}-
															{this.state.datarange + this.state.dataLength}
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
		isLoading: state.order.isLoading,
		isAuthUser: state.order.isAuthUser,
		error: state.error,
		orderdet: state.order.order_det,
		order: state.order.order_list,
		order_down: state.order.order_down,
		//totalCount: state.order.order_list.totalCount,
		pincode_list: state.pincode.pincode_list,
		seller_list: state.seller.seller_list,
		city_list: state.city.city_list,
		countFilterWise: state.order.countFilterWise,
		delivery: state.delivery.delivery_list,
	};
};

OrderPending.propTypes = {
	getUsers: PropTypes.func.isRequired,
	fetchOrderListinovie: PropTypes.func.isRequired,
	delivery: PropTypes.object.isRequired,
	updateStatusOrder: PropTypes.func.isRequired,
	fetchOrderList: PropTypes.func.isRequired,
	login: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	generateInvoice:PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
	fetchOrderListinovie,
	fetchOrderList,
	updateStatusOrder,
	fetchSellerList,
	fetchcityList,
	fetchPincodeList,
	downloadOrderList,
	assignDeleveryBoy,
	fetchdeliveryboyList,
	generateInvoice
})(OrderPending);
