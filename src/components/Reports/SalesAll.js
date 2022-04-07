/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
// import { CSVLink } from "react-csv";
import { Tooltip, Select, FormControl, InputLabel } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Pagination from "react-js-pagination";

import {
  //downloadOrderList,
  fetchOrderList,
  fetchSellerList,
  fetchOrderListinovie,
  updateStatusOrder,
  fetchcityList,
  fetchPincodeList,
} from "../../store/index";
import ModelPopUp from "../../common/ModelPopUp";
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
class SalesAll extends React.Component {
  state = {
    orderFilter:'',
    invoiceID:'',
    customerID:'',
    open: false,
    hidedownload: false,
    hideOld: false,
    isLoading: false,
    checkedItems: new Map(),
    check: false,
    downdata: "",
    checked: false,
    status: null,
    enable: false,
    sellerFilter: "",
    dateFilter: 0,
    pincodeFilter: "",
    cityFilter: "",
    dataLength: 50,
    datarange: 0,
    start_date: "",
    newStatus: "Loading",
    orderdet: [],
    csvReport: {
      data: [],
      headers: [],
      filename: "Report.csv",
    },
  };
  // componentDidUpdate( prevState ){
  //   console.log(prevState)
  // }

  componentWillMount() {
    setInterval(() => {
      this.handletotalqty();
    }, 1000);
    var start_date = moment().subtract(0,'days').startOf('day').valueOf()
    this.setState({
      start_date
    })

   // var start_date = this.state.start_date;
    var data = "";
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    var city = this.state.cityFilter;
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      this.state.datarange,
      this.state.dataLength
    );
    this.props.fetchSellerList(0, 25000,'');
    // this.props.fetchPincodeList(0, 2500);
    // this.props.fetchcityList(0, 25500);
  }
  getOrdersList = (data, seller, pincode, city, date, range, length,openorder,invoice,customer) => {
    var openOrders
    this.state.orderFilter ==  'Ordered, Pending Confirmation'?<div>{

    openOrders =true ,
    data='' 
  }</div>  : openOrders=false
    this.props.fetchOrderList(data, seller, pincode, city, date, range, length,openOrders,invoice,customer,"");
 
  };
 
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    var start_date = this.state.start_date;
    var data = this.state.orderFilter !== "All" ? this.state.orderFilter : "";

    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      range, //range
      dataLength, //length
      
    );
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  componentWillReceiveProps(nextProps) {
    const orderpendi = nextProps.orderdet ? nextProps.orderdet : "";
    console.log(orderpendi, "data");
    this.setState({
      orderdet: orderpendi.data,
      // order_det:orderpendi.
      // newStatus:nextProps.orderdet.data[0].status
    });
  }
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveStacked: {
            maxHeight: "40vh",
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
    let newArray = [];
    console.log(this.state.checkedItems);
    if (this.props.order !== undefined) {
      newArray = this.props.order.filter((d) => {
        // console.log(d)
        let searchValue = d.id;
        return searchValue.indexOf(item) !== -1;
      });
    }
    if (isChecked == true) {
      this.setState({
        downdata: [...this.state.downdata, newArray],
      });
      console.log([...this.state.downdata, newArray]);
      console.log(this.state.hidedownload);
    } else {
      var array = this.state.downdata;
      var index;
      for (let i = 0; i < this.state.downdata.length; i++) {
        var temp = this.state.downdata[i];
        for (let j = 0; j < temp.length; j++) {
          if (temp[j].id == newArray[0].id) {
            index = i;
            console.log(index);
            break;
          }
        }
      }
      if (index !== -1) {
        array.splice(index, 1);
      }
      console.log(array);
      this.setState({ downdata: array });
    }
  };
  handleFilterSubmit = (applyFilters) => {
    let filterList = applyFilters;
    console.log("applied");
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };
  updateSttaus = () => {
    this.props.updateStatusOrder(
      this.state.orderedit_id,
      this.state.reasonOfdelayed,
      this.state.status
    );
    // this.setState({
    //   openToedit:false
    // })
  };
  handleChangeStatus = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.status);
  };
  getDate = (date) => {
    const dateODorder = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return dateODorder;
  };
  handlesOrderChange(status) {
    this.setState({ orderFilter: status });

  
  }
  handlePeriodChange = (v) => {
    this.setState({
      dateFilter: v,
    });
    console.log("e", v);
    var start_date = moment().subtract(v,'days').startOf('day').valueOf()

    this.setState({
      start_date: start_date,
    });
 
  };
  handlepincodeChange = (v) => {
    this.setState({
      pincodeFilter: v,
    });
   
   
  };
  handleCityChange = (v) => {
    this.setState({
      cityFilter: v,
    });
   
  };
  handleSellerChange = (v) => {
    this.setState({
      sellerFilter: v,
    });
 
  };
  cll = () => {
    this.setState({
      filter: true,
      // lowInventoryRepor: this.dataFilted,
    });
  };
  reset = () => {
    this.setState({
      filter: false,
    });
  };
  handletotalqty() {
    if (this.props.order !== undefined) {
      var total = 0;
      var re = this.props.order;
      for (var item = 0; item < re.length; item++) {
        // if(re[item].status !== 'Cancelled'){
        for (var j = 0; j < re[item].OrderProducts.length; j++) {
          total = total + re[item].OrderProducts[j].qty;
        }
      }
      this.setState({ TotalSalesFilter: total });
    }
  }

  exportCSV() {
    if(localStorage.getItem('role')=='seller'){
   if(this.state.orderFilter !== 'Ordered, Pending Confirmation'){
      window.location.href = `${Constant.getAPI()}/order/sales_report?sellerId=${localStorage.getItem('seller_id')}&start_date=${this.state.start_date !== undefined ?this.state.start_date :'' 
    }&statusType=${this.state.orderFilter !== undefined && this.state.orderFilter !=='All'?this.state.orderFilter:""
    }&invoice_number=${this.state.invoiceID !== undefined ? this.state.invoiceID:" "
    }&customerId=${this.state.customerID !== undefined ?this.state.customerID:""}&`
      
    }
    else{
      window.location.href = `${Constant.getAPI()}/order/sales_report?sellerId=${localStorage.getItem('seller_id')}&start_date=${this.state.start_date
      }&openOrders=true&invoice_number=${this.state.invoiceID !== undefined ? this.state.invoiceID:" "}&customerId=${this.state.customerID !== undefined ?this.state.customerID:""}&`
  
    }
  }
else{
          console.log(this.state.start_date)
      if(this.state.orderFilter !== 'Ordered, Pending Confirmation'){
        window.location.href = `${Constant.getAPI()}/order/sales_report?sellerId=${
          this.state.sellerFilter !== "All" && this.state.sellerFilter !== undefined ? this.state.sellerFilter:""
        }&start_date=${
          this.state.start_date
        }&statusType=${
          this.state.orderFilter!== undefined && this.state.orderFilter !=='All'?this.state.orderFilter:""
        }&invoice_number=${
          this.state.invoiceID !== undefined ? this.state.invoiceID:" "
        }&customerId=${
          this.state.customerID !== undefined ?this.state.customerID:""
      }&adminId=${
          localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''
          }`
      }
else{
        window.location.href = `${Constant.getAPI()}/order/sales_report?sellerId=${
          this.state.sellerFilter !== "All" && this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
        }&start_date=${this.state.start_date
          }&openOrders=true&invoice_number=${
            this.state.invoiceID !== undefined ? this.state.invoiceID :""
        }&customerId=${
          this.state.customerID !== undefined ?this.state.customerID:" "
      }&adminId=${
        localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''
        }`
    
      }

    }   
  }
  exportCSVS() {
    var csvRow = [];
      var Ad = [
      [
        "Seller ID",
        " Seller Name",
        "Customer Id",
        "Order Date & Time",
        "Order Item SKU",
        "Order Items",
        "Quantity",
        "Order Status",
        "Price(PTC)",
        "Order Total Price",
        "Taransaction ID",

        "Mode of payment",

        "Invoice Number",
        'Seller Invoice Id',

      ],
    ];
    var rde = this.state.downdata;
    console.log(rde);
    for (var item = 0; item < rde.length; item++) {
      for (var itemi = 0; itemi < 1; itemi++) {
        // if(re[item].status !== 'Cancelled'){
        for (var j = 0; j < rde[item][itemi].OrderProducts.length; j++) {
          Ad.push([
           
            rde[item][itemi].Seller.unique_identifier,
            rde[item][itemi].Seller.name,



            rde[item][itemi].User.customer_id_number,
            moment(rde[item][itemi].createdAt).format("YYYY-MM-DD HH:mm:ss"),

            rde[item][itemi].OrderProducts[j].Product_sku,
            rde[item][itemi].OrderProducts[j].Product_name,
            rde[item][itemi].OrderProducts[j].qty,
            rde[item][itemi].status.replace(/,/g, "-"),
         
              rde[item][itemi].OrderProducts[j].Product_sp ,
            rde[item][itemi].grandTotal,
            rde[item].transaction ? rde[item].transaction.TXNID : "--",

            // rde[item][itemi].OrderProducts[j].Product_mrp,
            rde[item].transaction?  rde[item].transaction.PAYMENTMODE === 'NB' ?  'Net Banking': rde[item].transaction.PAYMENTMODE === 'PPI' ? 'Wallet':
              rde[item].transaction.PAYMENTMODE === 'CC'? 'Card':rde[item].transaction.PAYMENTMODE === 'DC'? 'Card':
              rde[item].transaction.PAYMENTMODE==='EMI'?'EMI':rde[item].transaction.PAYMENTMODE==='UPI'?'UPI ':rde[item].transaction.PAYMENTMODE==='BANK_TRANSFER'?'BANK_TRANSFER':'--':'COD',
            //   rde[item].paymentStatus,
            rde[item][itemi].invoice_number,
            rde[item][itemi].seller_invoiceId,

          ]);
        }
      }
    }
    console.log("new", Ad);
    let csvContent = "data:text/csv;charset=utf-8,";
    Ad.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
   
    console.log(csvContent);
    // var csvContent=csvContent.join('%0A');
    console.warn(csvContent);
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "SalesReport.csv";
    document.body.appendChild(a);
    a.click();
  }

  handleSearchinput(r){
    this.setState({
      search:r.target.value
    })
   }
   oncancelButton(){
    var start_date = this.state.start_date;
    var data = "";
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
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
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    var customerID = "";
    var start_date = this.state.start_date;
    var data = "";
    var openOrders=true
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
  onsearchNameButton(){
    var customerID=this.state.search;

    this.setState({
      cancelButton:true,
      customerID,
      invoiceID:"",
    })
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    var invoiceID = "";
    var start_date = this.state.start_date;
    var data = "";
    var openOrders=true
    
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
    var data = this.state.orderFilter !== "All" ? this.state.orderFilter : "";
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    var customerID=this.state.customerID;
    var invoiceID=this.state.invoiceID;
    var openOrders=''
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
    
  
  this.setState({
    dataLength:50,
    datarange:0
  })
  };

  render() {
    const enable = this.state.status === "Delay delivery" ? true : false;
    const useStyles = makeStyles((theme) => ({
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));
    const columns = [
      {
        name: "id",
        label: <Checkbox onChange={this.selectall} type="checkbox" />,
        options: {
          filter: false,
          sort: false,
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
        name: "Seller",
        label: "Seller ID",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Seller, tableMeta) => {
            return Seller ? Seller.unique_identifier : "";
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
            return Seller ? Seller.name : "";
          },
        },
      },
      {
        name: "User",
        label: "Customer Id",
        options: {
          filter: true,
          sort: true,
          //   display: localStorage.getItem("seller_auth") ? true : false,
          customBodyRender: (User, tableMeta) => {
            return User ? User.customer_unique_number : "";
          },
        },
      },
     
      {
        name: "createdAt",
        label: "Order Date",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (createdAt, tableMeta) => {
            return this.getDate(createdAt);
          },
        },
      },
      {
        name: "OrderProducts",
        label: "Order Item SKU",
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
        name: "OrderProducts",
        label: "Order Items ",
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
        name: "OrderProducts",
        label: "Quantity ",
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
        name: "orderStatus",
        label: "Order Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (status, tableMeta) => {
            return (
              <div
                style={{
                  background: "#3a424f",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "10px",
                  padding: ".2px",
                  marginLeft: "7px",
                  wordWrap: "normal",
                }}
              >
                {status}
              </div>
            );
          },
        },
      },
 
      {
        name: "OrderProducts",
        label: "Price(PTR)",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (price_ptc, tabelMeta) => {
            return price_ptc.map((d, i) => {
              return <li map={i}>{d.PTR}</li>;
            });
          },
        },
      },
      {
        name: "couponAmount",
        label: "Coupon Discount",
        options: {
          filter: true,
          sort: true,
        },
      },
     
      {
        name: "grandTotal",
        label: "Order Total Price",
        options: {
          filter: true,
          sort: true,
        },
      },
     

      {
        name: "transaction",
        label: "Txn ID",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (transaction, tabelMeta) => {
            return transaction ? transaction.TXNID : "--";
          },
        },
      },
      {
        name: "transaction",
        label: "Mode of Payment",
        options: {
          filter: false,
          sort: false,
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
        name: "invoice_number",
        label: " Invoice Number",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (invoice_number, tabelMeta) => {
            return invoice_number ? invoice_number : "--";
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
    ];
    const count = this.state.count;
    const page = this.state.page;
    const options = {
      filter: false,
      viewColumns: false,
      responsive: "scrollMaxHeight",
      pagination: false,
      search: false,
      print: false,
      download: false,
      fixedHeader: true,
      serverSide: true,
      count: count,
      page: page,
      onTableChange: (action, tableState) => {
        //console.log(action, tableState);
        switch (action) {
          case "changePage":
            this.changePage(tableState.page);
            break;
          default:
        }
      },
      selectableRows: "none",
      textLabels: {
        body: {
          noMatch:
           this.props.isLoading ? (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                color: "red",
                width: "1024px",
                justifyContent: "center",
              }}
            >
              Loading data..!
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
                      <h4>Sales Report</h4>
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
                      <li className="breadcrumb-item active">Sales Report</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {this.state.openToedit ? (
              <div
                className="backdrop_color"
                style={{
                  width: "100vw",
                  height: "100vh",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "rbga(0,0,0,.5)",
                  zIndex: "105",
                }}
              >
                <ModelPopUp
                  close={this.handleClose}
                  open={true}
                  id={this.state.orderedit_id}
                />
              </div>
            ) : (
              ""
            )}
            <div className="page-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-block">
                      <div className="row">
                        <div className="col-sm-8">
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
                              <option value={89}>Last 90 Days</option>
                              <option value={179}>Last 180 Days</option>
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            className="col-sm-2 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              Order Status
                            </InputLabel>
                            <Select
                              native
                              name="dateFilter"
                              value={this.state.orderFilter}
                              onChange={(val) =>
                                this.handlesOrderChange(val.target.value)
                              }
                              label="Order Status"
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
                              <option value={""}></option>
                              <option value={"All"}>All</option>
                              <option value={"cancelled"}>Cancelled</option>
                              <option value={"delivered"}>Delivered</option>
                              <option value={"Ordered, Pending Confirmation"}>
                                Pending{" "}
                              </option>
                            </Select>
                          </FormControl>

                          {localStorage.getItem("role") === "seller" ? (
                            ""
                          ) : (
                            <FormControl
                              variant="outlined"
                              className="col-sm-2 mx-1"
                            >
                              <InputLabel
                                htmlFor="outlined-age-native-simple"
                                style={{ fontSize: "12px" }}
                              >
                                Seller Filter
                              </InputLabel>
                              <Select
                                native
                                name="sellerFilter"
                                value={this.state.sellerFilter}
                                onChange={(val) =>
                                  this.handleSellerChange(val.target.value)
                                }
                                label="Seller Filter"
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
                                {this.props.seller_list
                                  ? this.props.seller_list.map((d) => (
                                      <option value={d.id}>{d.name}</option>
                                    ))
                                  : "No Seller"}
                              </Select>
                            </FormControl>
                          )}
                          <FormControl>
                            <div
                              className="btn btn-dark py-1 mx-3 mt-2"
                              onClick={this.onGo}
                            >
                              Go
                            </div>
                          </FormControl>

                          {/* <FormControl
                            variant="outlined"
                            className="col-sm-2 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              Pincode Filter
                            </InputLabel>
                            <Select
                              native
                              name="pincodeFilter"
                              value={this.state.pincodeFilter}
                              onChange={(val) =>
                                this.handlepincodeChange(val.target.value)
                              }
                              label="Pincode Filter"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option aria-label="None" value={null} />
                              <option aria-label="None" value={""}>
                                Reset
                              </option>
                              {this.props.pincode_list
                                ? this.props.pincode_list.map((d) => (
                                    <option value={d.code}>{d.code}</option>
                                  ))
                                : "No Pinocde"}
                            </Select>
                          </FormControl> */}
                          {/* <FormControl
                            variant="outlined"
                            className="col-sm-2 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              City Filter
                            </InputLabel>
                            <Select
                              native
                              name="cityFilter"
                              value={this.state.cityFilter}
                              onChange={(val) =>
                                this.handleCityChange(val.target.value)
                              }
                              label="City Filter"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option aria-label="None" value={null} />
                              <option aria-label="None" value={""}>
                                Reset
                              </option>
                              {this.props.city_list
                                ? this.props.city_list.map((d) => (
                                    <option value={d.name}>{d.name}</option>
                                  ))
                                : "No Seller"}
                            </Select>
                          </FormControl> */}

                          {/* <FormControl
                            variant="outlined"
                            className="col-sm-3 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              Assign Date of Delivery
                            </InputLabel>
                            <Select
                              native
                              name="dateFilter"
                              value={this.state.dateFilterd}
                              onChange={(val) =>
                                this.handlePeriodChangeD(val.target.value)
                              }
                              // const dateFilter = this.state.dateFilter;
                              // this.handleDateFilter.bind(this,this.state.dateFilter);
                              //}}
                              label="Time Peroid"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                               <option aria-label="None" value={null} />
                              <option aria-label="None" value={1000000000000000} >Reset</option>
                              <option value={0}>Today</option>
                              <option value={1}>Last 2 Days</option>
                              <option value={2}>Last 3 Days</option>
                              <option value={6}>Last 7 Days </option>
                              <option value={29}>Last 30 Days </option>
                              <option value={59}>Last 60 Days</option>
                            </Select>
                          </FormControl> */}
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
                              Total Quantity ={" "}
                              {this.state.TotalSalesFilter
                                ? this.state.TotalSalesFilter
                                : 0}
                            </b>
                          </div>
                          {!this.state.downdata.length>0 ? (
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
    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
    orderdet: state.order.order_det,
    order: state.order.order_list,
    //c: state.order.order_list.totalCount,
    order_down: state.order.order_down,
    seller_list: state.seller.seller_list,
    city_list: state.city.city_list,
    countFilterWise: state.order.countFilterWise,

  };
};

SalesAll.propTypes = {
  getUsers: PropTypes.func.isRequired,
  fetchOrderList: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  fetchOrderListinovie: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,

};
export default connect(mapStateToProps, {
  fetchOrderListinovie,
  fetchOrderList,
  updateStatusOrder,
  fetchSellerList,
  fetchcityList,
  fetchPincodeList,
  //downloadOrderList,
})(SalesAll);
