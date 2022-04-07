/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertDialog from "../../common/DownloadOption";
import moment from "moment";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "react-js-pagination";

import {
  FormGroup,
  FormLabel,
  Tooltip,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  fetchOrderList,
  fetchSellerList,
  fetchOrderListinovie,
  updateStatusOrder,
  fetchcityList,
  downloadOrderList,
  fetchPincodeList,
} from "../../store/index";
import Constant from "../../Constant";

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
class OrderCompleted extends React.Component {
  state = {
    statusType:'',
    customerID:'',
    invoiceID:'',
    open: false,
    hidedownload: false,
    hideOld: false,
    isLoading: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    dateOfCompletitionFilter: false,
    dateOfOrderFilter: false,
    totalPriceFilter: false,
    setDateWise: null,
    setDateWiseC: null,
    dataLength: 50,
    datarange: 0,
    sellerFilter: "",
    pincodeFilter: "",
    cityFilter: "",
    start_date: "",
    csvReport: {
      data: [],
      headers: [],
      filename: "Report.csv",
    },
  };
  componentDidMount() {
    // this.handlePeriodChange(179)
  }
  componentWillMount() {
  
      var start_date = moment().subtract(179,'days').startOf('day').valueOf()

    // var start_date = this.state.start_date;
    var data = "Delivered";
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    var city = this.state.cityFilter;
    this.setState({
      start_date: start_date,
    });
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
    this.props.fetchPincodeList("",0,2500)
    this.props.fetchcityList(0, 25500);
  }
  getOrdersList = (data, seller, pincode, city, date, range, length,openOrders,invoiceID,customerID) => {
    console.log("data", range, length);
    this.props.fetchOrderList(
      "Delivered",
      seller,
      pincode,
      city,
      date,
      range,
      length,
      false,
      invoiceID,customerID,
    );
    // const limit = 5000000;
    // if (this.props.totalCount) {
    //   this.props.downloadOrderList(data, seller, pincode, city, date, limit);
    // } else {
    //   this.props.downloadOrderList(data, seller, pincode, city, date, limit);
    // }
  };
  // 
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    var start_date = this.state.start_date;
    var data = "";
    var customerID=this.state.customerID;
    var invoiceID=this.state.invoiceID;

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
      dataLength ,//length
      false,invoiceID,customerID

    );
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
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
    var openOrders=false
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
    var openOrders=false
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

  handleChange = (e, id) => {
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
  getDate = (date) => {
    const dateODorder = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return dateODorder;
  };
  handlePeriodChange = (v) => {
    this.setState({
      dateFilter: v,
    });
 
    var start_date = moment().subtract(v,'days').startOf('day').valueOf()

    this.setState({
      start_date: start_date,
    });
    console.log(start_date);
  
  };
  handlepincodeChange = (v) => {
    this.setState({
      pincodeFilter: v,
    });
    console.log(v);
 
  };
  handleCityChange = (v) => {
    this.setState({
      cityFilter: v,
    });
    var start_date = this.state.start_date;
    var data = "";
    var seller =
      this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =
      this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = v !== "All" ? v : "";
    // this.getOrdersList(
    //   data,
    //   seller,
    //   pincode,
    //   city,
    //   start_date,
    //   this.state.range,
    //   this.state.length
    // );
  };
  handleSellerChange = (v) => {
    this.setState({
      sellerFilter: v,
    });
    var start_date = this.state.start_date;
    var data = "";
    var seller = v !== "All" ? v : "";
    var pincode =
      this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    // this.getOrdersList(
    //   data,
    //   seller,
    //   pincode,
    //   city,
    //   start_date,
    //   this.state.range,
    //   this.state.length
    // );
  };
  exportCSV() {
    if( localStorage.getItem('role')=='seller'){
      console.log(this.state.start_date, this.state.cityId ,this.state.pincode, localStorage.getItem('seller_id') )

      window.location.href = `${Constant.getAPI()}/order/report_order/download?sellerId=${
        localStorage.getItem('seller_id')
      }&statusType=${
        "Delivered"  
          }&city=${
        this.state.cityFilter !== undefined && this.state.cityFilter !=='All' ? this.state.cityFilter : ""
      }&pinCode=${
        this.state.pincodeFilter !== undefined && this.state.pincodeFilter !== 'All'? this.state.pincodeFilter : ""
      }&start_date=${
        this.state.start_date !== undefined ? this.state.start_date : ""
      }&invoice_number=${this.state.invoiceID !== undefined ?this.state.invoiceID:''}&customerId=${this.state.customerID !== undefined ?this.state.customerID:''}&`;
    }
    else{
      window.location.href = `${Constant.getAPI()}/order/report_order/download?sellerId=${
        this.state.sellerFilter !== undefined && this.state.sellerFilter !=="All"? this.state.sellerFilter : ""
      }&statusType=${
        "Delivered"
            }&city=${
        this.state.cityFilter !== undefined  && this.state.cityFilter !=='All' ? this.state.cityFilter : ""
      }&pinCode=${
        this.state.pincodeFilter !== undefined && this.state.pincodeFilter !== 'All'? this.state.pincodeFilter : ""
      }&start_date=${
        this.state.start_date !== undefined ? this.state.start_date : ""
      }&invoice_number=${
        this.state.invoiceID !== undefined ?this.state.invoiceID:''
    }&customerId=${
      this.state.customerID !== undefined ?this.state.customerID:''
    }&adminId=${
      localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''}`;

  
    }
   
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
        // "Beat Code",
        // "Beat Name",
        "Salesman Code",
        "Salesman Name"

      ],
    ];
    var rde = this.state.downdata;
    console.log(rde);
    console.log(this.state.downdata);
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
            rde[item].transaction ? rde[item].transaction.TXNID : "--",
            rde[item].paymentStatus,
            rde[item][itemi].invoice_number,
            rde[item][itemi].seller_invoiceId,

            rde[item][itemi].Seller.unique_identifier,
            rde[item][itemi].Seller.name,
            rde[item][itemi].delivery_userName,
            // "",
            // "",
            // "",
            rde[item][itemi].Salesman && rde[item][itemi].Salesman.code ?rde[item][itemi].Salesman.code:"-",

						rde[item][itemi].Salesman && rde[item][itemi].Salesman.name?rde[item][itemi].Salesman.name:"-"

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
    a.download = "Orders.csv";
    document.body.appendChild(a);
    a.click();
  }

  onGo = () => {
    var start_date = this.state.start_date;
    var customerID=this.state.customerID;
    var invoiceID=this.state.invoiceID;
    var data = "";
    var seller =
      this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var pincode =
      this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      0, //range
      50, //length
      false,invoiceID,customerID    );
    this.setState({
      dataLength: 50,
      datarange: 0,
    });
  };

  render() {
    const columns = [
      {
        name: "id",
        label: "Select",
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
            return Seller.unique_identifier;
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
            return Seller.name;
          },
        },
      },
      {
        name: "User",
        label: "Customer Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (User, tableMeta) => {
            return User.customer_unique_number ? User.customer_unique_number : "";
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
				name: 'OrderProducts',
				label: 'Order Item SKU',
				options: {
					filter: true,
					sort: true,
					customBodyRender: (OrderProducts, tabelMeta) => {
						 console.log(OrderProducts)
						return OrderProducts.map((d, i) => {
							console.log(d)
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
        name: "DeliveryUser",
        label: "Delivery Person Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (DeliveryUser, tableMeta) => {
            return DeliveryUser ? DeliveryUser.uniqueId : "";
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
      {
        name: "refundStatus",
        label: "Status Of Refund",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "orderStatus",
        label: "Order Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (orderStatus, tableMeta) => {
            return (
              <span
                style={{
                  color: "white",
                  background: "#00b300",
                  fontSize: "11px",
                  borderRadius: "5px",
                  padding: "2px",
                  whiteSpace: "nowrap",
                }}
              >
                {orderStatus}
              </span>
            );
          },
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
        name: "Feedbacks",
        label: "Customer Feedback Remark",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (Feedbacks, tableMeta) => {
            return Feedbacks ? Feedbacks.comment : "No feedback";
          },
        },
      },

      {
        name: "invoice_number",
        label: "Invoice Id",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (invoice_number, tabelMeta) => {
            return invoice_number ? invoice_number : "Not";
          },
        },
      },	{
				name: 'seller_invoiceId',
				label: 'Seller Invoice Id.',
				options: {
					filter: false,
					sort: false,
					customBodyRender: (seller_invoiceId, tabelMeta) => {
						return seller_invoiceId ? seller_invoiceId : '';
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
              </div>
            );
          },
        },
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
						console.log(Salesman)
						return Salesman !==undefined && Salesman.name !== undefined ?Salesman.name:null
					}
				}
			}
    ];
    const options = {
      filter: false,
      viewColumns: false,
      responsive: "scrollMaxHeight",
      search: false,
      print: false,
      rowsPerPage: 25,
      pagination: false,
      rowsPerPageOptions: [10, 20, 25],
      download: false,
      selectableRows: "none",
      confirmFilters: this.state.isLoading,
      //   filterType: 'custom',
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
              Loading Data ...
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
                      <h4>Order Completed</h4>
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
                        Order Completed
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
                              label="Time Peroid"
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
                              <option value={179} selected>
                                Last 180 Days
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
                              <option aria-label="None" value={"All"}>
                                All
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
                              <option aria-label="None" value={"All"}>
                                All
                              </option>
                              {this.props.city_list
                                ? this.props.city_list.map((d) => (
                                    <option value={d.name}>{d.name}</option>
                                  ))
                                : "No Seller"}
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
                          {/*                          
                          <FormControl
                            variant="outlined"
                            className="col-sm-3 mx-1"
                          >
                            <InputLabel htmlFor="outlined-age-native-simple" style={{fontSize:'12px'}}>
                            Date of Completion
                            </InputLabel>
                            <Select
                              native
                              name="dateFilter"
                              value={this.state.dateFilterC}
                              onChange={(val) =>
                                this.handlePeriodChangeC(val.target.value)
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
                          {localStorage.getItem('OrderDownload')=='true' || localStorage.getItem('role') === 'seller'?<>{
                          !this.state.downdata.length > 0 ? (
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
                          )}</>:null}
                        </div>
                      </div>
                      <hr></hr>
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
    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
    order_down: state.order.order_down,
    order: state.order.order_list,
    pincode_list: state.pincode.pincode_list,
    seller_list: state.seller.seller_list,
    city_list: state.city.city_list,
    countFilterWise:state.order.countFilterWise,
  };
};

OrderCompleted.propTypes = {
  getUsers: PropTypes.func.isRequired,
  fetchOrderList: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
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
})(OrderCompleted);
