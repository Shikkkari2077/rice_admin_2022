/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";

import {
  fetchOrderListre,
  downloadOrderList,
  fetchSellerList,
  fetchOrderListinovie,
  updateStatusOrder,
  fetchcityList,
  fetchPincodeList,
} from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import PropTypes from "prop-types";
import moment from "moment";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  InputLabel,
  Tooltip,
  FormControl,
  Button,
  Select,
} from "@material-ui/core";

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
class DailyPaymentRegister extends Component {
  state = {
    invoiceID:'',
    customerID:'',
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    dateFilter: "",
    sellerFilter: "",
    pincodeFilter: "",
    cityFilter: "",
    dataLength: 50,
    datarange: 0,
    payemntType: "",
    start_date: "",
  };
  // componentWillReceiveProps(nextProps){
  // }
  getTotal() {
    var total = 0;
    if (this.props.dailyPayment !== undefined) {
      var re = this.props.dailyPayment;
      for (var item = 0; item < re.length; item++) {
        total = total + re[item].grandTotal;
      }
      this.setState({ TotalAmountFilter: total });
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.getTotal();
    }, 2000);

      var start_date = moment().subtract(0,'days').startOf('day').valueOf()
    console.log(start_date);
    var data = "";
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    var city = this.state.cityFilter;
    var payemntType = this.state.payemntType;
    
    this.setState({
      start_date: start_date,
    });

    this.getReports(
      data,
      seller,
      pincode,
      city,
      payemntType,
      start_date,
      this.state.datarange,
      this.state.dataLength,
      
    );
    // this.props.fetchSellerList(0, 25000);
    // this.props.fetchPincodeList(0, 2500);
    // this.props.fetchcityList(0, 25500);
  }
  getReports(
    data,
    seller,
    pincode,
    city,
    payemntType,
    start_date,
    datarange,
    dataLength,
    invoice,
    customer
  ) {
    this.props.fetchOrderListre(
      data,
      seller,
      pincode,
      city,
      payemntType,
      start_date,
      datarange,
      dataLength,
      invoice,
      customer
    );
    // const limit = 5000000;
    // this.props.downloadOrderList(data, seller, pincode, city, "", limit);
  }
  // onChangePa(e) {
  //   e.preventDefault();
  //   var start_date = this.state.start_date;
  //   var data = "";
  //   var seller = this.state.sellerFilter;
  //   var pincode = this.state.pincodeFilter;
  //   var city = this.state.cityFilter;
  //   var payemntType = this.state.payemntType;
  //   const datarange = this.state.datarange - 50;
  //   const dataLength = this.state.dataLength;
  //   this.getReports(
  //     data,
  //     seller,
  //     pincode,
  //     city,
  //     payemntType,
  //     start_date,
  //     datarange,
  //     dataLength
  //   );
  //   this.setState({
  //     datarange: datarange,
  //     dataLength: dataLength,
  //   });
  // }
  // onChangePas(e) {
  //   e.preventDefault();
  //   var start_date = this.state.start_date;
  //   var data = "";
  //   var seller = this.state.sellerFilter;
  //   var pincode = this.state.pincodeFilter;
  //   var city = this.state.cityFilter;
  //   var payemntType = this.state.payemntType;
  //   const datarange = this.state.datarange + 50;
  //   const dataLength = this.state.dataLength;
  //   this.getReports(
  //     data,
  //     seller,
  //     pincode,
  //     city,
  //     payemntType,
  //     start_date,
  //     datarange,
  //     dataLength
  //   );
  //   this.setState({
  //     datarange: datarange,
  //     dataLength: dataLength,
  //   });
  // }
  handlePeriodChange = (v) => {
    this.setState({
      dateFilter: v,
    });
    console.log("e", v);
    var start_date = moment().subtract(v,'days').startOf('day').valueOf()
    this.setState({
      start_date: start_date,
    });
    console.log(start_date);
 
  };
 
  handleStatusChange = (v) => {
    this.setState({
      payemntType: v,
    });
    console.log(v);

  };
  // handleCityChange = (v) => {
  //   this.setState({
  //     cityFilter: v,
  //   });
  //   var start_date = this.state.start_date;
  //   var data = "";
  //   var seller = this.state.sellerFilter;
  //   var pincode = this.state.pincodeFilter;
  //   var city = v;
  //   this.getOrdersList(
  //     data,
  //     seller,
  //     pincode,
  //     city,
  //     start_date,
  //     this.state.range,
  //     this.state.dataLength
  //   );
  // };
  // handleSellerChange = (v) => {
  //   this.setState({
  //     sellerFilter: v,
  //   });
  //   var start_date = this.state.start_date;
  //   var data = "";
  //   var seller = v;
  //   var pincode = this.state.pincodeFilter;
  //   var city = this.state.cityFilter;
  //   this.getOrdersList(
  //     data,
  //     seller,
  //     pincode,
  //     city,
  //     start_date,
  //     this.state.range,
  //     this.state.dataLength
  //   );
  // };
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    var start_date = this.state.start_date;
    var data = "";
    var payemntType =
    this.state.payemntType !== "All" ? this.state.payemntType : "";
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    this.getReports(
      data,
      seller,
      pincode,
      city,
      payemntType,
      start_date,
      range, //range
      dataLength //length
    );
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }

  exportCSV() {
  //   console.log(this.state.start_date)
  if(localStorage.getItem('role')=='seller'){

    window.location.href = `${Constant.getAPI()}/order/daily_payment?paymentType=${
      this.state.payemntType !== "All" ? this.state.payemntType : ""
  }&start_date=${this.state.start_date}&invoice_number=${this.state.invoiceID}&customerId=${this.state.customerID}&sellerId=${localStorage.getItem('seller_id')}&`}
  else
  {
    window.location.href = `${Constant.getAPI()}/order/daily_payment?paymentType=${
      this.state.payemntType !== "All" ? this.state.payemntType : ""
  }&start_date=${
    this.state.start_date}&invoice_number=${this.state.invoiceID
  }&customerId=${
    this.state.customerID
  }&adminId=${
    localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''}`
  }
    // var data = "";
    // var seller = this.state.sellerFilter;
    // var pincode = this.state.pincodeFilter;
    // var city = this.state.cityFilter;
    // var payemntType = this.state.payemntType;
    // var start_date = this.state.start_date;
    // var datarange = this.state.datarange;
    // var dataLength = 50000000;
    // this.getReports(
    //   data,
    //   seller,
    //   pincode,
    //   city,
    //   payemntType,
    //   start_date,
    //   datarange,
    //   dataLength
    // );
    // var csvRow = [];
    // var A = [
    //   [
    //     "Customer Id",
    //     "Customer Name",
    //     "Customer MobileNo",
    //     "Total Order",
    //     "Total Amount",
    //     "Mode of payment",
    //     "Taransaction ID",

    //     // "Customer Alternate MobileNo",
    //     // "Order Delivery Address Line 1",
    //     // "Order Delivery Address Line 2",
    //     // "Road",
    //     // "Landmark",
    //     // "City",
    //     // "State",
    //     //  "Pincode",
    //     // "Order ID",
    //     "Order Date & Time",
    //     "Status of payment",

    //     // "Payment Type",

    //     "Invoice Number",
    //     "Seller ID",
    //     "Company Seller Name",
    //   ],
    // ];

    // var re = this.props.dailyPayment;
    // for (var item = 0; item < re.length; item++) {
    //   A.push([
    //     re[item].User.customer_id_number,
    //     re[item].Address.name,
    //     re[item].Address.mobile,
    //     // re[item].Address.alternate_mobile
    //     //   ? re[item].Address.alternate_mobile
    //     //   : "--",
    //     //   re[item].Address.address_line_1
    //     //   ? re[item].Address.address_line_1.replace(/,/g, "-")
    //     //   : "-",
    //     // re[item].Address.Address_line_2
    //     //   ? re[item].Address.Address_line_2.replace(/,/g, "-")
    //     //   : "-",
    //     // re[item].Address.road
    //     //   ? re[item].Address.road.replace(/,/g, " -")
    //     //   : "-",
    //     // re[item].Address.landmark
    //     //   ? re[item].Address.landmark.replace(/,/g, "- ")
    //     //   : "-",
    //     // re[item].Address.city
    //     //   ? re[item].Address.city.replace(/,/g, "- ")
    //     //   : "-",
    //     // re[item].Address.state,
    //     //  re[item].Address.pinCode,
    //     // re[item].id,
    //     re[item].OrderProducts.length,
    //     re[item].grandTotal,

    //     re[item].transaction
    //       ? re[item].transaction.PAYMENTMODE === "NB"
    //         ? "Net Banking"
    //         : re[item].transaction.PAYMENTMODE === "PPI"
    //         ? "Wallet"
    //         : re[item].transaction.PAYMENTMODE === "CC"
    //         ? "Card"
    //         : re[item].transaction.PAYMENTMODE === "DC"
    //         ? "Card"
    //         : re[item].transaction.PAYMENTMODE === "EMI"
    //         ? "EMI"
    //         : re[item].transaction.PAYMENTMODE === "UPI"
    //         ? "UPI "
    //         : re[item].transaction.PAYMENTMODE === "BANK_TRANSFER"
    //         ? "BANK_TRANSFER"
    //         : "--"
    //       : "COD",
    //     re[item].transaction ? re[item].transaction.TXNID : "--",

    //     moment(re[item].createdAt).format("YYYY-MM-DD HH:mm:ss"),
    //     re[item].paymentStatus,

    //     // re[item].paymentType,

    //     re[item].invoice_number,
    //     re[item].Seller.unique_identifier,
    //     re[item].Seller.name,
    //   ]);
    //   // }
    // }
    // console.log(A);
    // let csvContent = "data:text/csv;charset=utf-8,";
    // A.forEach(function (rowArray) {
    //   let row = rowArray.join(",");
    //   csvContent += row + "\r\n";
    // });
    // // for(var i=0;i<=rde.length;++i){
    // //     csvRow.push(Ad[j].join(','))
    // //     var csvString=csvRow.join('%0A');
    // // }
    // console.log(csvContent);
    // // var csvContent=csvContent.join('%0A');
    // console.warn(csvContent);
    // var a = document.createElement("a");
    // a.href = "data:attachment/csv" + csvContent;
    // a.download = "dailyPayment.csv";
    // document.body.appendChild(a);
    // a.click();
  }
   exportCSVS() {
    // var csvRow = [];
    // var Ad = [
    //   [
    //     "Customer Id",
    //     "Customer Name",
    //     "Customer MobileNo",
    //     "Customer Alternate MobileNo",
    //     "Order ID",
    //     "Application Order Number",
    //     "Order Date & Time",
    //     "Payment Type",
    //     "Order Item SKU",
    //     "Order Item Product Name ",
    //     "product Order Quantity",
    //     "Order Status",
    //     "Order Delivery Address Line 1",
    //     "Order Delivery Address Line 2",
    //     "Road",
    //     "Landmark",
    //     "City",
    //     "State",
    //     "Pincode",
    //     "PTC",
    //     "Line Item Amount",
    //     "Delivery Charges",
    //     "Final Amount",
    //     "MRP",
    //     "Status of payment",
    //     "Taransaction ID","Mode of payment",

    //     "Invoice Id",
    //   'Seller Invoice Id',

    //     "Seller ID",
    //     "Company Seller Name",
    //   ],
    // ];
    // var rde = this.state.downdata;
    // console.log(rde);
    // for (var item = 0; item < rde.length; item++) {
    //   for (var itemi = 0; itemi < 1; itemi++) {
    //     // if(re[item].status !== 'Cancelled'){
    //     for (var j = 0; j < rde[item][itemi].OrderProducts.length; j++) {
    //       Ad.push([
    //         rde[item][itemi].User.customer_id_number,
    //         rde[item][itemi].Address.name,
    //         rde[item][itemi].Address.mobile,
    //         rde[item][itemi].Address.alternate_mobile
    //           ? rde[item][itemi].Address.alternate_mobile
    //           : "--",
    //         rde[item][itemi].id,
    //         rde[item][itemi].id,
    //         moment(rde[item][itemi].createdAt).format("YYYY-MM-DD HH:mm:ss"),
    //         rde[item][itemi].paymentType,
    //         rde[item][itemi].OrderProducts[j].Product_sku,
    //         rde[item][itemi].OrderProducts[j].Product_name,
    //         rde[item][itemi].OrderProducts[j].qty,
    //         rde[item][itemi].status.replace(/,/g, "-"),
    //         rde[item][itemi].Address.address_line_1
    //           ? rde[item][itemi].Address.address_line_1.replace(/,/g, "-")
    //           : "-",
    //         rde[item][itemi].Address.Address_line_2
    //           ? rde[item][itemi].Address.Address_line_2.replace(/,/g, "-")
    //           : "-",
    //         rde[item][itemi].Address.road
    //           ? rde[item][itemi].Address.road.replace(/,/g, " -")
    //           : "-",
    //         rde[item][itemi].Address.landmark
    //           ? rde[item][itemi].Address.landmark.replace(/,/g, "- ")
    //           : "-",
    //         rde[item][itemi].Address.city
    //           ? rde[item][itemi].Address.city.replace(/,/g, "- ")
    //           : "-",
    //         rde[item][itemi].Address.state,
    //         rde[item][itemi].Address.pinCode,
    //         rde[item][itemi].OrderProducts[j]
    //           ? rde[item][itemi].OrderProducts[j].Product_sp
    //           : "--",
    //         `${
    //           rde[item][itemi].OrderProducts[j].Product_sp *
    //           rde[item][itemi].OrderProducts[j].qty
    //         }`,
    //         rde[item][itemi].deliveryCharge,
    //         rde[item][itemi].grandTotal,
    //         rde[item][itemi].OrderProducts[j].Product_mrp,
    //         rde[item].transaction?  rde[item].transaction.PAYMENTMODE === 'NB' ?  'Net Banking': rde[item].transaction.PAYMENTMODE === 'PPI' ? 'Wallet':
    //       rde[item].transaction.PAYMENTMODE === 'CC'? 'Card':rde[item].transaction.PAYMENTMODE === 'DC'? 'Card':
    //       rde[item].transaction.PAYMENTMODE==='EMI'?'EMI':rde[item].transaction.PAYMENTMODE==='UPI'?'UPI ':rde[item].transaction.PAYMENTMODE==='BANK_TRANSFER'?'BANK_TRANSFER':'--':'COD',
    //       rde[item].transaction? rde[item].transaction.TXNID:'--',
    //       rde[item].paymentStatus,
    //         rde[item][itemi].invoice_number,
//    rde[item][itemi].seller_invoiceId,

    //         rde[item][itemi].Seller.unique_identifier,
    //         rde[item][itemi].Seller.name,
    //       ]);
    //     }
    //   }
    // }
    // console.log("new", Ad);
    // let csvContent = "data:text/csv;charset=utf-8,";
    // Ad.forEach(function (rowArray) {
    //   let row = rowArray.join(",");
    //   csvContent += row + "\r\n";
    // });
    // // for(var i=0;i<=rde.length;++i){
    // //     csvRow.push(Ad[j].join(','))
    // //     var csvString=csvRow.join('%0A');
    // // }
    // console.log(csvContent);
    // // var csvContent=csvContent.join('%0A');
    // console.warn(csvContent);
    // var a = document.createElement("a");
    // a.href = "data:attachment/csv" + csvContent;
    // a.download = "orderDump.csv";
    // document.body.appendChild(a);
    // a.click();
   }
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveStacked: {
            maxHeight: "35vh",
            overflowX: "none",
          },
        },
        MUIDataTableHeadCell: {
          root: {
            width: "40px",
            fontWeight: "bold",
            padding: "1px",
            lineHeight: "10px",
            whiteSpace: "normal",
            overflow: "hidden",
            wordWrap: "break-word",
            fontSize: "10px",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            width: "80px",
            fontSize: "9px",
            // border:'1px solid black',
            padding: "1px",
            whiteSpace: "normal",
            wordWrap: "break-word",
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
  // handleTotal(amount){
  //   console.log(amount)
  // }
  handleSearchinput(r){
    this.setState({
      search:r.target.value
    })
   }
   oncancelButton(){
    var start_date = this.state.start_date;
    var data = "";
    var payemntType =this.state.payemntType !== "All" ? this.state.payemntType : "";
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    this.getReports(
      data,
      seller,
      pincode,
      city,
      payemntType,
      start_date,
      0, //range
      50 //length
    );
    this.setState({
      cancelButton:false,
      search:"",
      invoiceID:"",
      customerID:"",
    });

  }
   onsearchButton=()=>{
    var invoiceID=this.state.search;

    this.setState({
      cancelButton:true,
      customerID:"",
      invoiceID,
    })
    var payemntType =this.state.payemntType !== "All" ? this.state.payemntType : "";

    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    var customerID = "";
    var start_date = this.state.start_date;
    var data = "";
    var openOrders=true
     this.getReports(
      data,
      seller,
      pincode,
      city,
      payemntType,
      start_date,
      0, //range
      50, //length
      invoiceID,
      customerID
    );


  }
  onsearchNameButton(){
    var customerID=this.state.search;

    this.setState({
      cancelButton:true,
      customerID,
      invoiceID:"",
    })
    var payemntType =this.state.payemntType !== "All" ? this.state.payemntType : "";

    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    var invoiceID = "";
    var start_date = this.state.start_date;
    var data = "";
    
     this.getReports(
      data,
      seller,
      pincode,
      city,
      payemntType,
      start_date,
      0, //range
      50, //length
      invoiceID,
      customerID
    );

  }
  onGo = () => {
    var start_date = this.state.start_date;
    var data = "";
    var seller =
      this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =
      this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    var payemntType =
      this.state.payemntType !== "All" ? this.state.payemntType : "";
    this.getReports(
      data,
      seller,
      pincode,
      city,
      payemntType,
      start_date,
      0, //range
      50, //length
      this.state.invoiceID,
      this.state.customerID
    );
  
  this.setState({
    dataLength:50,
    datarange:0
  })
  };
  render() {
    const columns = [
      // {
      //   name: "id",
      //   label: "Select",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return !this.state.hideOld ? (
      //         <Checkbox
      //           name={id}
      //           checked={this.state.checkedItems.get(id) || false}
      //           onChange={this.handleChange}
      //           type="checkbox"
      //         />
      //       ) : (
      //         <Checkbox
      //           color="primary"
      //           checked={true}
      //           type="checkbox"
      //           onChange={this.selectall}
      //           inputProps={{ "aria-label": "secondary checkbox" }}
      //         />
      //       );
      //     },
      //   },
      // },
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
        name: "User_mobile",
        label: "Customer Phone",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (User_mobile, tableMeta) => {
            return User_mobile;
          },
        },
      },
      // {
      //   name: "User",
      //   label: "Customer Pincode",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(User,tableMeta)=>{
      //       return User? User.defaultPinCode:'--'
      //     }
      //   },
      // },
      {
        name: "OrderProducts",
        label: "Total Order Palced",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (OrderProducts, tableMeta) => {
            return OrderProducts.length;
          },
        },
      },
      {
        name: "grandTotal",
        label: "Total Amount of Order Placed",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "transaction",
        label: "Payment Method",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (transaction, tableMeta) => {
            return transaction
              ? transaction.PAYMENTMODE === "NB"
                ? "Net Banking"
                : transaction.PAYMENTMODE === "PPI"
                ? "Wallet"
                : transaction.PAYMENTMODE === "CC"
                ? "Card"
                : transaction.PAYMENTMODE === "DC"
                ? "Card"
                : transaction.PAYMENTMODE === "EMI"
                ? "EMI"
                : transaction.PAYMENTMODE === "UPI"
                ? "UPI "
                : transaction.PAYMENTMODE === "BANK_TRANSFER"
                ? "BANK_TRANSFER"
                : "COD"
              : "COD";
          },
        },
      },
      {
        name: "transaction",
        label: "Transaction ID",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (transaction, tabelMeta) => {
            return transaction ? transaction.TXNID : "--";
          },
        },
      },
      {
        name: "createdAt",
        label: "Order Date",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (createdAt) => {
            return moment(createdAt).format("YYYY-MM-DD HH:mm:ss");
          },
        },
      },
      {
        name: "paymentStatus",
        label: "Payment Status",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "invoice_number",
        label: "Invoice Id",
        options: {
          filter: true,
          sort: true,
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
        name: "Seller",
        label: "Seller Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Seller, tableMeta) => {
            return Seller ? Seller.unique_identifier : "--";
          },
        },
      },
      {
        name: "Seller",
        label: "Seller Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Seller, tableMeta) => {
            return Seller ? Seller.name : "--";
          },
        },
      },
    ];
    const options = {
      filter: false,
      viewColumns: false,
      responsive: "scrollMaxHeight",
      search: false,
      print: false,
      pagination: false,
      download: false,
      confirmFilters: this.state.isLoading,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() => alert("Filter Applied !")}
            >
              Apply Filters
            </Button>
          </div>
        );
      },

      selectableRows: "none",
      textLabels: {
        body: {
          noMatch: this.props.isLoading ? (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                color: "red",
                width: "1024px",
                justifyContent: "center",
              }}
            >
              {" "}
              No data
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                color: "red",
                width: "1024px",
                justifyContent: "center",
              }}
            >
              <p style={{ textAlign: "center" }}>Sorry, No Data Found</p>
            </div>
          ),
          toolTip: "Sort",
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
                      <h4>Daily Payment Register</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">
                        Daily Payment Register
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-block">
                      <div className="row">
                        <div className="col-sm-8">
                          <FormControl
                            variant="outlined"
                            className="col-sm-3 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              Date of order
                            </InputLabel>
                            <Select
                              native
                              name="dateFilter"
                              value={this.state.dateFilter}
                              onChange={(val) =>
                                this.handlePeriodChange(val.target.value)
                              }
                              label="Order Date"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                             
                               <option value={0}>Today</option>
                              <option value={1}>Last 2 Days</option>
                              <option value={2}>Last 3 Days</option>
                              <option value={6}>Last 7 Days </option>
                              <option value={29}>Last 30 Days </option>
                              <option value={59}>Last 60 Days</option>
                              <option value={89}>Last 90 Days</option>
                              <option value={179}>Last 180 Days</option>
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            className="col-sm-3 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              Mode of Payment
                            </InputLabel>
                            <Select
                              native
                              name="payemntType"
                              value={this.state.payemntType}
                              onChange={(val) =>
                                this.handleStatusChange(val.target.value)
                              }
                              label="Method of Payment"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option aria-label="None" value={null} />
                              <option aria-label="None" value={"All"}>
                                All
                              </option>
                              <option value={"online"}>Online</option>
                              <option value={"cod"}>COD</option>
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
                                <div style={{height:"8px"}}> 

                                </div>
                <div className="form-group row">
                  <div className="col-sm-9" >
                    <input
                      style={{width:"190px",height:"10px"}}
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
                 onClick={this.onsearchButton.bind()}>
                                  <i  
                  class="icofont icofont-search"
                  > </i>
                  <i style={{fontSize:"9px",fontStyle:"none"}}  >By Invoice number</i> 
                                  </span>
                                  <span 
                 className="btn btn-dark py-1 mx-3 mt-2"
                 onClick={this.onsearchNameButton.bind(this)}>
                                  <i 
                  class="icofont icofont-search"
                  >
                  </i>
                  <i style={{fontSize:"9px"}}  >By Customer Id</i> 
                                  </span>
                                  </div>


               </FormControl>
               <FormControl>
               {this.state.cancelButton == true?
               <div 
               // style={{width:"20px"}}
              className="btn btn-secondary py-1 mx-3 mt-2"
              onClick={this.oncancelButton.bind(this)}>
               {/* <i class="icofont icofont-close-line-squared"></i> */}
               
               <i style={{fontSize:"10px"}}>cancel</i>
               </div>
              :null}
              
             
              </FormControl>


                          </div>

                        <div className="col-sm-3">
                          <div
                            className="badge badge-success mt-2"
                            style={{ fontSize: "16px" }}
                          >
                            <b>
                              Total Amount ={" "}
                              {this.state.TotalAmountFilter
                                ? this.state.TotalAmountFilter.toFixed(2)
                                : 0}
                            </b>
                          </div>

                          {!this.state.hidedownload ? (
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
                                    fontSize: "30px",
                                    color: "grey",
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
                                    fontSize: "30px",
                                    color: "grey",
                                  }}
                                ></i>
                              </Tooltip>
                            </button>
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.dailyPayment}
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

                        <AlertDialog
                          open={this.state.open}
                          func={this.handleClose}
                        />
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
    pincode_list: state.pincode.pincode_list,
    orderdet: state.order.order_det,
    order: state.order.order_list,
    //c: state.order.order_list.totalCount,
    order_down: state.order.order_down,
    seller_list: state.seller.seller_list,
    city_list: state.city.city_list,
    //totalCount: state.order.order_list.totalCount,
    dailyPayment: state.order.order_list,
    isLoading: state.report.isLoading,
    countFilterWise:state.order.countFilterWise,

    error: state.report.error,
  };
};
DailyPaymentRegister.propTypes = {
  fetchOrderList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  fetchOrderListre,
  downloadOrderList,
  fetchSellerList,
  fetchOrderListinovie,
  updateStatusOrder,
  fetchcityList,
  fetchPincodeList,
})(DailyPaymentRegister);
