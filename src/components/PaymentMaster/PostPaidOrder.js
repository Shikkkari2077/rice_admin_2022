/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import Pagination from "react-js-pagination";

import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPaymentOrderList,downloadprepaidOrderList } from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import moment from 'moment'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
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
class PostOrders extends React.Component {
  state = {
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    isLoading: false,
    downdata: [],
    checked: false,
    deliveredDateFilter: false,
    setDateWise: null,
    dataLength: 50,
    datarange: 0,
    paymentType:'cod'
  };
  componentWillMount() {
   
    var start_date = moment().subtract(0,'days').startOf('day').valueOf()

    this.getOrdersList(this.state.paymentType,start_date,this.state.datarange,this.state.dataLength);
  }
  getOrdersList = (paymentType,date,datarange,dataLength) => {
    this.props.fetchPaymentOrderList(paymentType,date,datarange,dataLength)
    const limit = 5000000;
     this.props.downloadprepaidOrderList(paymentType,datarange,limit);
   
  };
  handlePeriodChange = (v) => {
    this.setState({
      dateFilter: v,
    });
    var start_date = moment().subtract(v,'days').startOf('day').valueOf()

    this.setState({
      start_date
    })
    console.log(start_date);
  
  };
  handleSearchinput(r){
    this.setState({
      search:r.target.value
    })
   }
   oncancelButton(){
   
     
    this.getOrdersList(
      this.state.paymentType,
      this.state.start_date,
      0, //range
      50, //length
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
   
    var customerID = "";

    this.getOrdersList(
      this.state.paymentType,
      this.state.start_date,
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
 
    var invoiceID = "";
 
    this.getOrdersList(
      this.state.paymentType,
      this.state.start_date,
      0, //range
      50, //length
      invoiceID,
      customerID
    );

  }

  onGo = () => {
      
    this.getOrdersList(
      this.state.paymentType,
      this.state.start_date,
      0, //range
      50, //length
    );
  
  this.setState({
    dataLength:50,
    datarange:0
  })
  };
  onChangePa(e) {
    e.preventDefault();
    var start_date = this.state.start_date;
    var data = "";
    const datarange = this.state.datarange - 50;
    const dataLength = this.state.dataLength;
    this.getOrdersList(
      this.state.paymentType,start_date, datarange,dataLength
    );
    this.setState({
      datarange: datarange,
    });
  }
  onChangePas(e) {
    e.preventDefault();
    var start_date = this.state.start_date;
    const datarange = this.state.datarange + 50;
    const dataLength = this.state.dataLength;
    this.getOrdersList(
      this.state.paymentType,start_date ,datarange,dataLength
    );
    this.setState({
      datarange: datarange,
    });
  }
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveStacked: {
            maxHeight: '35vh',
            overflowX:'none'
          },
        },
        MUIDataTableHeadCell: {
          root: {
          width: "40px", 
          fontWeight: "bold",
          padding: "1px",
          lineHeight:'10px',
          whiteSpace: "normal",
          overflow: "hidden",
          wordWrap: "break-word",
          fontSize: "10px",
        },
        },
        MUIDataTableBodyCell: {
          root: {
            width: "80px",
            fontSize:'9px',
            // border:'1px solid black',
            padding:'1px',
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

  handleSelect = (e, id) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    let newArray=[]
    console.log(this.state.checkedItems);
    if(this.props.preorder !== undefined){  
     newArray = this.props.preorder.filter((d) => {
      // console.log(d)
      let searchValue = d.id;
      return searchValue.indexOf(item) !== -1;
    });
  } 
  if(isChecked == true){
    this.setState({
      downdata: [...this.state.downdata, newArray],
    
    });
    console.log([...this.state.downdata, newArray])
    console.log(this.state.hidedownload)
  }
  else{
    var array=this.state.downdata
    var index   
    for(let i=0;i<this.state.downdata.length;i++){
       var temp=this.state.downdata[i]
      for(let j=0;j<temp.length;j++){
       if(temp[j].id==newArray[0].id){
         index=i
         console.log(index)
         break
       }}}
    if (index !== -1 ) { array.splice(index,1)}
    console.log(array)
    this.setState({ downdata:array });
      }
  };
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
  
     
    this.getOrdersList(
      this.state.paymentType,
      this.state.start_date,
      range, //range
      dataLength, //length
       this.state.invoiceID,
      this.state.customerID
    );
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  exportCSV() {
    var csvRow = [];
    var A = [
      [
        "Customer Id",
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
        "City",
        "State",
        "Pincode",
        "PTC",
        "Line Item Amount",
        "Delivery Charges",
        "Final Amount",
        "MRP",
        "Status of payment",
        "Taransaction ID","Mode of payment",
        
        "Generate Invoice",
        "Seller ID",
        "Company Seller Name",
      ],
    ];
    var re = this.props.order_down;
    for (var item = 0; item < re.length; item++) {
      // if(re[item].status !== 'Cancelled'){
      for (var j = 0; j < re[item].OrderProducts.length; j++) {
        A.push([
          re[item].User.customer_id_number,
          re[item].Address.name,
          re[item].Address.mobile,
          re[item].Address.alternate_mobile
            ? re[item].Address.alternate_mobile
            : "--",
          re[item].id,
          re[item].id,
          moment(re[item].createdAt).format("YYYY-MM-DD HH:mm:ss"),
          re[item].paymentType,
          re[item].OrderProducts[j].Product_sku,
          re[item].OrderProducts[j].Product_name,
          re[item].OrderProducts[j].qty,
          re[item].status.replace(/,/g, "-"),
          re[item].Address.address_line_1
            ? re[item].Address.address_line_1.replace(/,/g, "-")
            : "-",
          re[item].Address.Address_line_2
            ? re[item].Address.Address_line_2.replace(/,/g, "-")
            : "-",
          re[item].Address.road
            ? re[item].Address.road.replace(/,/g, " -")
            : "-",
          re[item].Address.landmark
            ? re[item].Address.landmark.replace(/,/g, "- ")
            : "-",
          re[item].Address.city
            ? re[item].Address.city.replace(/,/g, "- ")
            : "-",
          re[item].Address.state,
          re[item].Address.pinCode,
          re[item].OrderProducts[j].Product_sp,
          `${
            re[item].OrderProducts[j].Product_sp * re[item].OrderProducts[j].qty
          }`,
          re[item].deliveryCharge,
          re[item].grandTotal,
          re[item].OrderProducts[j].Product_mrp,
          re[item].transaction?  re[item].transaction.PAYMENTMODE === 'NB' ?  'Net Banking': re[item].transaction.PAYMENTMODE === 'PPI' ? 'Wallet':
          re[item].transaction.PAYMENTMODE === 'CC'? 'Card':re[item].transaction.PAYMENTMODE === 'DC'? 'Card':
          re[item].transaction.PAYMENTMODE==='EMI'?'EMI':re[item].transaction.PAYMENTMODE==='UPI'?'UPI ':re[item].transaction.PAYMENTMODE==='BANK_TRANSFER'?'BANK_TRANSFER':'--':'--',
          re[item].transaction? re[item].transaction.TXNID:'--',
          re[item].paymentStatus,
          re[item].invoice_number,
          re[item].Seller.unique_identifier,
          re[item].Seller.name,
        ]);
        // }
      }
    }
    console.log(A);
    let csvContent = "data:text/csv;charset=utf-8,";
    A.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    // for(var i=0;i<=rde.length;++i){
    //     csvRow.push(Ad[j].join(','))
    //     var csvString=csvRow.join('%0A');
    // }
    console.log(csvContent);
    // var csvContent=csvContent.join('%0A');
    console.warn(csvContent);
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "postPaid_orders.csv";
    document.body.appendChild(a);
    a.click();
  }
  exportCSVS() {
    var csvRow = [];
    var A = [
      [
        "Customer Id",
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
        "City",
        "State",
        "Pincode",
        "PTC",
        "Line Item Amount",
        "Delivery Charges",
        "Final Amount",
        "MRP",
        "Status of payment",
        "Taransaction ID","Mode of payment",
        
        "Generate Invoice",
        "Seller ID",
        "Company Seller Name",
      ],
    ];
    
    var re = this.state.downdata;
    for (var item = 0; item < re.length; item++) {
      // if(re[item].status !== 'Cancelled'){
      for (var j = 0; j < re[item].OrderProducts.length; j++) {
        A.push([
          re[item].User.customer_id_number,
          re[item].Address.name,
          re[item].Address.mobile,
          re[item].Address.alternate_mobile
            ? re[item].Address.alternate_mobile
            : "--",
          re[item].id,
          re[item].id,
          moment(re[item].createdAt).format("YYYY-MM-DD HH:mm:ss"),
          re[item].paymentType,
          re[item].OrderProducts[j].Product_sku,
          re[item].OrderProducts[j].Product_name,
          re[item].OrderProducts[j].qty,
          re[item].status.replace(/,/g, "-"),
          re[item].Address.address_line_1
            ? re[item].Address.address_line_1.replace(/,/g, "-")
            : "-",
          re[item].Address.Address_line_2
            ? re[item].Address.Address_line_2.replace(/,/g, "-")
            : "-",
          re[item].Address.road
            ? re[item].Address.road.replace(/,/g, " -")
            : "-",
          re[item].Address.landmark
            ? re[item].Address.landmark.replace(/,/g, "- ")
            : "-",
          re[item].Address.city
            ? re[item].Address.city.replace(/,/g, "- ")
            : "-",
          re[item].Address.state,
          re[item].Address.pinCode,
          re[item].OrderProducts[j].Product_sp,
          `${
            re[item].OrderProducts[j].Product_sp * re[item].OrderProducts[j].qty
          }`,
          re[item].deliveryCharge,
          re[item].grandTotal,
          re[item].OrderProducts[j].Product_mrp,
          re[item].transaction?  re[item].transaction.PAYMENTMODE === 'NB' ?  'Net Banking': re[item].transaction.PAYMENTMODE === 'PPI' ? 'Wallet':
          re[item].transaction.PAYMENTMODE === 'CC'? 'Card':re[item].transaction.PAYMENTMODE === 'DC'? 'Card':
          re[item].transaction.PAYMENTMODE==='EMI'?'EMI':re[item].transaction.PAYMENTMODE==='UPI'?'UPI ':re[item].transaction.PAYMENTMODE==='BANK_TRANSFER'?'BANK_TRANSFER':'--':'--',
          re[item].transaction? re[item].transaction.TXNID:'--',
          re[item].paymentStatus,
          re[item].invoice_number,
          re[item].Seller.unique_identifier,
          re[item].Seller.name,
        ]);
        // }
      }
    }
    console.log(A);
    let csvContent = "data:text/csv;charset=utf-8,";
    A.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    // for(var i=0;i<=rde.length;++i){
    //     csvRow.push(Ad[j].join(','))
    //     var csvString=csvRow.join('%0A');
    // }
    console.log(csvContent);
    // var csvContent=csvContent.join('%0A');
    console.warn(csvContent);
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "postPaid_orders.csv";
    document.body.appendChild(a);
    a.click();
  }
  render() {
    const columns = [
      {
        name: "id",
      label: <Checkbox onChange={this.selectall} type="checkbox" />,
      options: {
        filter: false,
        sort: false,
        display:false,
        customBodyRender: (id, tableMeta) => {
          return !this.state.hideOld ? (
            <Checkbox
              name={id}
              checked={this.state.checkedItems.get(id) || false}
              onChange={this.handleSelect}
              type="checkbox"
            />
          ) : (
            <Checkbox
              color="primary"
              checked={true}
              type="checkbox"
              onChange={this.selectall}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          );
        },
      },
    },
      {
        name: "id",
        label: "Order Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "orderDetails",
      //   label: "Order Details",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      {
        name: "User",
        label: "Customer Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(User,tableMeta)=>{
            return User.customer_id_number
          }
        },
      },
      {
      name: "totalAmount",
      label: "Total Amount",
      options: {
        filter: true,
        sort: true,
        customBodyRender:(totalAmount,tableMeta)=>{
          return totalAmount
        }
      }
    },
      {
        name: "invoice_number",
        label: "Invoice ID",
        options: {
          filter: true,
          sort: false,
          customBodyRender:(invoice_number,tableMeta)=>{
            return invoice_number ?invoice_number:'Not'
          }
        },
      },
      {
        name: "status",
        label: "Order Status",
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: "OrderStatusDates",
        label: "Update Date",
        options: {
          filter: false,
          sort: true,
          customBodyRender:(OrderStatusDates,tableMeta)=>{
          return OrderStatusDates[0] ?OrderStatusDates.map(d=> moment(d.date).format("YYYY-MM-DD HH:mm:ss")):'--'
          }
        },
      },
      {
        name: "deliveredBy",
        label: "Delivered By",
        options: {
          filter: true,
          sort: true,
        },
      },
      
      {
        name: "paymentType",
        label: "Mode Of Payment",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "paymentStatus",
        label: "Status Of Payment",
        options: {
          filter: true,
          sort: true,
        },
      },
    ];
    const options = {
      filter: false,
       viewColumns: false,
      responsive: 'scrollMaxHeight',search:false,
      pagination:false,
      print: false,
      download: false,
      selectableRows: "none",
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
      // callback that gets executed when filters are confirmed
   
      textLabels: {
        body: {
           noMatch: this.props.isLoading
            ? <div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}>Loading data..!
            </div>
            : <div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}>
            <p style={{textAlign:'center'}}>
            Sorry, No Data Found
            </p>
            </div>,
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
                      <h4>Postpaid Orders</h4>
                    </div>
                  </div>
                  {/* {localStorage.getItem('superadminad_role') !== "shop"
                    ? */}
                  {/* <Link
                    to="/payment/add"
                    className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                    data-modal="modal-13"
                  >
                    {" "}
                    <i className="icofont icofont-plus m-r-5"></i> Add Order{" "}
                  </Link> */}
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
                        Postpaid Orders
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
                        <div className="col-sm-9">
                          
                        <FormControl
                            variant="outlined"
                            className="col-sm-2 mx-1"
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
                              {/* <option aria-label="None" value={null} />
                              <option
                                aria-label="None"
                                value={1000000000000000}
                              >
                                Reset
                              </option>
                             */}
                              <option value={0}>Today</option>
                              <option value={1}>Last 2 Days</option>
                              <option value={2}>Last 3 Days</option>
                              <option value={6}>Last 7 Days </option>
                              <option value={29}>Last 30 Days </option>
                              <option value={59}>Last 60 Days</option>
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
                                  {/* <span 

                 className="btn btn-dark py-1 mx-3 mt-2"
                 onClick={this.onsearchButton.bind()}>
                                  <i  
                  class="icofont icofont-search"
                  > </i>
                  <i style={{fontSize:"9px",fontStyle:"none"}}  >By Invoice number</i> 
                                  </span> */}
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
                        {!this.state.downdata.length>0 ? (
                            <button
                              className="f-right bg-white b-none"
                              data-modal="modal-13"
                            >
                              <Tooltip
                                title="Download"
                                aria-label="download"
                                onClick={()=>{this.exportCSV()}}
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
                                // onClick={this.openModel}
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

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                          
                            className="table-responsive"
                            data={this.props.preorder}
                            columns={columns}
                            options={options}
                          />
                        </MuiThemeProvider>
                        <nav aria-label="Page navigation example " className="display-flex float-right">
                          <ul class="pagination">
                          <li
                                class="page-item mx-2 py-2" 
                          >
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
    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
    order_down: state.order.order_down,
    preorder: state.order.preorder_list,
    countFilterWise:state.order.countFilterWise,

  };
};

PostOrders.propTypes = {
  getUsers: PropTypes.func.isRequired,
  fetchPaymentOrderList: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchPaymentOrderList,downloadprepaidOrderList})(PostOrders);
