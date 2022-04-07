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
import {
  downloadOrderList,
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
class DelieveryReport extends React.Component {
  state = {
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
    sellerFilter:"",
    dateFilter:1,
    pincodeFilter: "",
    cityFilter: "",
    dataLength: 25,
    datarange: 0,
    start_date: '',
    newStatus: "Loading",
    orderdet: [],
    csvReport: {
      data: [],
      headers: [],
      filename: "Report.csv",
    },
  };

  componentWillMount() {
    var date = new Date();
    var hr = moment(date).format("hh");
    var min = moment(date).format("mm");
    var sec = moment(date).format("ss");
    console.log(sec);
    var start_date =
      date.getTime() -
      1 * (24 * 60 * 60 * 1000 - hr * 3600 * 1000 - min * 60 * 1000 - sec);
    
    // var start_date = this.state.start_date;
    var data = "";
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    var city = this.state.cityFilter;
    this.setState({
      start_date:start_date
    })
    this.getOrdersList(data, seller, pincode, city, start_date, this.state.datarange, this.state.dataLength);
    this.props.fetchSellerList(0, 25000,'');
    this.props.fetchPincodeList("",0,2500)
    this.props.fetchcityList(0, 25500);
  }
  getOrdersList = (data, seller, pincode, city, date, range, length) => {
    console.log("data", range, length);
    this.props.fetchOrderList(data, seller, pincode, city, date, range, length);
    const limit = 5000000;
    if (this.props.totalCount) {
      this.props.downloadOrderList(data, seller, pincode, city, date, limit);
    } else {
      this.props.downloadOrderList(data, seller, pincode, city, date, limit);
    }
  };
  onChangePa(e) {
    e.preventDefault();
    var start_date = this.state.start_date;
    var data = "";
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    var city = this.state.cityFilter;
    const datarange = this.state.datarange - 25;
    const dataLength = this.state.dataLength;
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      datarange,
      dataLength
    );
    this.setState({
      datarange: datarange,
    });
  }
  onChangePas(e) {
    e.preventDefault();
    var start_date = this.state.start_date;
    var data = "";
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    var city = this.state.cityFilter;
    const datarange = this.state.datarange + 25;
    const dataLength = this.state.dataLength;
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      datarange,
      dataLength
    );
    this.setState({
      datarange: datarange,
    });
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
      hidedownload: true,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    let newArray = this.props.order.filter((d) => {
      // console.log(d)
      let searchValue = d.id;
      return searchValue.indexOf(item) !== -1;
    });
    this.setState({
      downdata: [...this.state.downdata, newArray],
    });
    console.log(this.state.downdata);
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
  handlePeriodChange = (v) => {
    this.setState({
      dateFilter: v,
    });
    console.log("e", v);
    var date = new Date();
    var hr = moment(date).format("hh");
    var min = moment(date).format("mm");
    var sec = moment(date).format("ss");
    console.log(sec);
    var start_date =
      date.getTime() -
      v * (24 * 60 * 60 * 1000 - hr * 3600 * 1000 - min * 60 * 1000 - sec);
    this.setState({
      start_date: start_date,
    });
    console.log(start_date);
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
      this.state.range,
      this.state.length
    );
  };
  handlepincodeChange = (v) => {
    this.setState({
      pincodeFilter: v,
    });
    console.log(v);
    var start_date = this.state.start_date;
    var data = "";
    var seller = this.state.sellerFilter;
    var pincode = v;
    var city = this.state.cityFilter;
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      this.state.range,
      this.state.length
    );
  };
  handleCityChange = (v) => {
    this.setState({
      cityFilter: v,
    });
    var start_date = this.state.start_date;
    var data = "";
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    var city = v;
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      this.state.range,
      this.state.length
    );
  };
  handleSellerChange = (v) => {
    this.setState({
      sellerFilter: v,
    });
    var start_date = this.state.start_date;
    var data = "";
    var seller = v;
    var pincode = this.state.pincodeFilter;
    var city = this.state.cityFilter;
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      this.state.range,
      this.state.length
    );
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
          re[item].transaction.PAYMENTMODE==='EMI'?'EMI':re[item].transaction.PAYMENTMODE==='UPI'?'UPI ':re[item].transaction.PAYMENTMODE==='BANK_TRANSFER'?'BANK_TRANSFER':'--':'COD',
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
    a.download = "testfile.csv";
    document.body.appendChild(a);
    a.click();
  }
  exportCSVS() {
    var csvRow = [];
    var Ad = [
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
    var rde = this.state.downdata;
    console.log(rde);
    for (var item = 0; item < rde.length; item++) {
      for (var itemi = 0; itemi < 1; itemi++) {
        // if(re[item].status !== 'Cancelled'){
        for (var j = 0; j < rde[item][itemi].OrderProducts.length; j++) {
          Ad.push([
            rde[item][itemi].User.customer_id_number,
            rde[item][itemi].Address.name,
            rde[item][itemi].Address.mobile,
            rde[item][itemi].Address.alternate_mobile
              ? rde[item][itemi].Address.alternate_mobile
              : "--",
            rde[item][itemi].id,
            rde[item][itemi].id,
            moment(rde[item][itemi].createdAt).format("YYYY-MM-DD HH:mm:ss"),
            rde[item][itemi].paymentType,
            rde[item][itemi].OrderProducts[j].Product_sku,
            rde[item][itemi].OrderProducts[j].Product_name,
            rde[item][itemi].OrderProducts[j].qty,
            rde[item][itemi].status.replace(/,/g, "-"),
            rde[item][itemi].Address.address_line_1
              ? rde[item][itemi].Address.address_line_1.replace(/,/g, "-")
              : "-",
            rde[item][itemi].Address.Address_line_2
              ? rde[item][itemi].Address.Address_line_2.replace(/,/g, "-")
              : "-",
            rde[item][itemi].Address.road
              ? rde[item][itemi].Address.road.replace(/,/g, " -")
              : "-",
            rde[item][itemi].Address.landmark
              ? rde[item][itemi].Address.landmark.replace(/,/g, "- ")
              : "-",
            rde[item][itemi].Address.city
              ? rde[item][itemi].Address.city.replace(/,/g, "- ")
              : "-",
            rde[item][itemi].Address.state,
            rde[item][itemi].Address.pinCode,
            rde[item][itemi].OrderProducts[j]
              ? rde[item][itemi].OrderProducts[j].Product_sp
              : "--",
            `${
              rde[item][itemi].OrderProducts[j].Product_sp *
              rde[item][itemi].OrderProducts[j].qty
            }`,
            rde[item][itemi].deliveryCharge,
            rde[item][itemi].grandTotal,
            rde[item][itemi].OrderProducts[j].Product_mrp,
            rde[item].transaction?  rde[item].transaction.PAYMENTMODE === 'NB' ?  'Net Banking': rde[item].transaction.PAYMENTMODE === 'PPI' ? 'Wallet':
          rde[item].transaction.PAYMENTMODE === 'CC'? 'Card':rde[item].transaction.PAYMENTMODE === 'DC'? 'Card':
          rde[item].transaction.PAYMENTMODE==='EMI'?'EMI':rde[item].transaction.PAYMENTMODE==='UPI'?'UPI ':rde[item].transaction.PAYMENTMODE==='BANK_TRANSFER'?'BANK_TRANSFER':'--':'COD',
          rde[item].transaction? rde[item].transaction.TXNID:'--',
          rde[item].paymentStatus,
            rde[item][itemi].invoice_number,
            rde[item][itemi].Seller.unique_identifier,
            rde[item][itemi].Seller.name,
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
    // for(var i=0;i<=rde.length;++i){
    //     csvRow.push(Ad[j].join(','))
    //     var csvString=csvRow.join('%0A');
    // }
    console.log(csvContent);
    // var csvContent=csvContent.join('%0A');
    console.warn(csvContent);
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "orderDump.csv";
    document.body.appendChild(a);
    a.click();
  }
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
          display: localStorage.getItem("seller_auth") ? true : false,
          customBodyRender: (User, tableMeta) => {
            return User ? User.customer_id_number : "";
          },
        },
      },
      {
        name: "Address",
        label: "Customer Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? Address.name : "";
          },
        },
      },

      {
        name: "Address",
        label: "Customer MobileNo",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? Address.mobile : "--";
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
              return <li map={i}>{d.Product_sku}</li>;
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
              return <li map={i}>{d.Product_name}</li>;
            });
          },
        },
      },
      {
        name: "status",
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
        name: "Address",
        label: "Address Line 1",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address.address_line_1 ? Address.address_line_1 : "";
          },
        },
      },
      {
        name: "Address",
        label: "Address Line 2",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address.address_line_1 ? Address.address_line_2 : "";
          },
        },
      },
      {
        name: "Address",
        label: "Road",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address.road ? Address.road : "";
          },
        },
      },
      {
        name: "Address",
        label: "Landmark",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address.landmark ? Address.landmark : "";
          },
        },
      },
      {
        name: "Address",
        label: "Area",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? Address.city : "";
          },
        },
      },
      {
        name: "Address",
        label: "Pincode for Delivery",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? Address.pinCode : "";
          },
        },
      },
      {
        name: "Address",
        label: "Location",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return (
              Address.lat ? Address.lat : "--",
              Address.long ? Address.long : "--"
            );
          },
        },
      },
      {
        name: "OrderProducts",
        label: "Price(PTC)",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (price_ptc, tabelMeta) => {
            return price_ptc.map((d, i) => {
              return <li map={i}>{d.Product_sp}</li>;
            });
          },
        },
      },
      {
        name: "deliveryCharge",
        label: "Delivery Charge",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (deliveryCharge, tableMeta) => {
            return deliveryCharge;
          },
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
        name: "customerFeedbackAny",
        label: "Customer Feedback",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (customerFeedbackAny, tableMeta) => {
            return "No feedback";
          },
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
          customBodyRender:(transaction,tableMeta)=>{
            return transaction ?  transaction.PAYMENTMODE === 'NB' ?  'Net Banking': transaction.PAYMENTMODE === 'PPI' ? 'Wallet': transaction.PAYMENTMODE === 'CC'? 'Card':
            transaction.PAYMENTMODE === 'DC'? 'Card':transaction.PAYMENTMODE==='EMI'?'EMI':transaction.PAYMENTMODE==='UPI'?'UPI ':transaction.PAYMENTMODE==='BANK_TRANSFER'?'BANK_TRANSFER':'COD':'COD'
            }
        },
      },
      // {
      //   name: "transaction",
      //   label: "Payment Status",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (transaction, tabelMeta) => {
      //       return transaction ? transaction.STATUS : "--";
      //     },
      //   },
      // },
      {
        name: "invoice_number",
        label: "Generate Invoice",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (invoice_number, tabelMeta) => {
            return invoice_number ? invoice_number : "--";
          },
        },
      },
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/invoice/" + id}
                  className="m-r-15 text-muted curser-pointer"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Download Invoice"
                >
                  <i className="f-20 icofont icofont-download"></i>
                </Link>
                <span
                  className="m-r-15 text-muted curser-pointer"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.setState({
                      openToedit: true,
                      orderedit_id: id,
                      enable: false,
                    });
                    this.props.fetchOrderListinovie(id);
                  }}
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </span>
              </div>
            );
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
        console.log(action, tableState);
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
                      <h4>Order List</h4>
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
                      <li className="breadcrumb-item active">Order List</li>
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
                              <option value={1}>Today</option>
                              <option value={2}>Yesterday</option>
                              <option value={7}>This week </option>
                              <option value={30}>This Month</option>
                              <option value={60}>Last Month</option>
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
                                <option aria-label="None" value={""}>
                                  Reset
                                </option>
                                {this.props.seller_list
                                  ? this.props.seller_list.map((d) => (
                                      <option value={d.id}>{d.name}</option>
                                    ))
                                  : "No Seller"}
                              </Select>
                            </FormControl>
                          )}
                          <FormControl
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
                          </FormControl>
                          <FormControl
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
                          </FormControl>

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
                        <div className="col-sm-3">
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
                            {this.state.datarange > 20 ? (
                              <li
                                class="page-item btn"
                                onClick={this.onChangePa.bind(this)}
                              >
                                <i class="icofont icofont-rounded-left"></i>
                              </li>
                            ) : (
                              <li class="page-item btn btn-disabled">
                                <i class="icofont icofont-rounded-left"></i>
                              </li>
                            )}
                            <li
                              class="page-item btn"
                              onClick={this.onChangePas.bind(this)}
                            >
                              <i class="icofont icofont-rounded-right"></i>
                            </li>
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
    c: state.order.order_list.totalCount,
    order_down: state.order.order_down,
    seller_list: state.seller.seller_list,
    city_list: state.city.city_list,
    //totalCount: state.order.order_list.totalCount,
  };
};

DelieveryReport.propTypes = {
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
  downloadOrderList,
})(DelieveryReport);
