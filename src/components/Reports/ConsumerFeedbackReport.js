/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import Constant from "../../Constant";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  fetchConsumerFeedbackList,
  fetchcityList,
  fetchSellerList,
  fetchstateList,
} from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import moment from "moment";
import {
  Select,
  Tooltip,
  Button,
  FormLabel,
  FormGroup,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Pagination from "react-js-pagination";

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
class ConsumerFeedbackReport extends Component {
  state = {
    invoiceID:"",
    customerID:"",
    activePage:1,
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    sellerFilter: "",
    mrpFilter: false,
    setDateWise: null,
    setDateWiseC: null,
    dataLength: 50,
    datarange: 0,
    inv: "",
  };
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
    handleCityChange = (v) => {
      this.setState({
        cityId: v,
      });
    };
    handleStateChange(v){
      this.setState({
        stateId:v
      })  } 
    handleSellerChange = (v) => {
      this.setState({
        sellerFilter: v,
      });
    };
    onGo = () => {
      var customerID=this.state.customerID;
      var invoiceID=this.state.invoiceID;
      var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
      var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
      var stateId =  "";
       console.log(stateId)
      this.getSellerProductList(
        0,
        50,
        seller,
        cityId,
        stateId,
        invoiceID,
        customerID

      )
    };
    handleSearchinput(r){
      this.setState({
        search:r.target.value
      })
     }
     oncancelButton(){
      var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
      var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
      var stateId =  "";
     
      this.getSellerProductList(
        0,
        50,
        seller,
        cityId,
        stateId,
      )
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
      var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
      var stateId =  "";
       console.log(stateId)
      this.getSellerProductList(
        0,
        50,
        seller,
        cityId,
        stateId,
        invoiceID
      )
  
    }
    onsearchNameButton(){
      var customerID=this.state.search;
  
      this.setState({
        cancelButton:true,
        customerID,
        invoiceID:"",
      })
      var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
      var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
      var invoiceID = "";
      var stateId =  "";
       console.log(stateId)
      this.getSellerProductList(
        0,
        50,
        seller,
        cityId,
        stateId,
        invoiceID,
        customerID,
        
      )
  
    }
    handlePageChange(pageNumber) {
      console.log("active page is", pageNumber);
      console.log(pageNumber*50-50)
      const range=pageNumber*50-50
      const dataLength = this.state.dataLength;
      var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
      var stateId ='';
      var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
      this.getSellerProductList(
        range,
        dataLength,
        seller,
        cityId,
        stateId
      );
      this.setState({
        datarange: range,
        dataLength: dataLength
      });
      this.setState({activePage: pageNumber});
      console.log(range,dataLength)
    }
    
  componentWillMount() {
    console.log(localStorage.getItem('superadmin_auth'))
    var seller =this.state.sellerFilter
    var cityId = this.state.cityId
    var stateId =this.state.stateId
    this.getSellerProductList(
      
      this.state.datarange,
      this.state.dataLength,
      seller,
      cityId,
      stateId
    );
    this.props.fetchcityList(0, 25500);
    this.props.fetchSellerList(0, 25000,'');
    // this.props.fetchstateList(0, 25500);


  }
  getSellerProductList = (range, length, seller,cityId,stateId,invoiceID,customer) => {
    console.log("here",customer)
    this.props.fetchConsumerFeedbackList(range,length,seller,cityId,stateId,invoiceID,customer);
  };
  onChangePa(e) {
    e.preventDefault();
    const datarange = this.state.datarange - 50;
    const dataLength = this.state.dataLength;
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";

    this.getSellerProductList(
      datarange,
      dataLength,
      seller,
      cityId,
      stateId
    )

    this.setState({
      datarange: datarange,
    });
  }
  onChangePas(e) {
    e.preventDefault();
    const datarange = this.state.datarange + 50;
    const dataLength = this.state.dataLength;
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";

    this.getSellerProductList(
      datarange,
      dataLength,
      seller,
      cityId,
      stateId
    )
    this.setState({
      datarange: datarange,
 
    });
  }
  openModel = () => {
    this.setState({
      open: true,
    });
  };
  handleSellerChange = (v) => {
    this.setState({
      sellerFilter: v,
    });
    var pincode = this.state.sellerFilter;
    //this.getSellerProductList(this.state.datarange, this.state.dataLength, v);
  };
  exportCSV() {
    console.log(this.state.invoiceID)

    window.location.href = `${Constant.getAPI()}/order/customer_feedback_download?city=${
      this.state.cityId !== undefined && this.state.cityId !=="All"? this.state.cityId : "" 
  }&sellerId=${
    this.state.sellerFilter!== undefined && this.state.sellerFilter !=="All"? this.state.sellerFilter : ""
  }&invoice_number=${
    this.state.invoiceID
  }&customerId=${
    this.state.customerID
  }&adminId=${
    localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''}`;
   
  }
  exportCSVS(){
      var csvRow = [];
    var A = [
      [
        "Zone",
        "State",
        "City",
        "User Type",
        "Customer Id",
        "Customer Pincode",
        "Name",
        "Phone Number",
        "Email ID",
        "Customer Address",
        "Order Date",
        "Order Id",
        "Order Amount",
        "Order status",
        "sellerid",
        "sellerPincode",
        "Invoice Number",
        "Feedback Description",
        // "rating(from Playstore)	",
        "How do you like our overall delivery service",
        "How do you like product delivery by our delivery agent",
        "How Do you like our delivery timings",
        "Delivery Agent Feedbacks",
      ],
    ];

    var report = this.state.downdata;
    for (var i = 0; i < report.length; i++) {
      for(var a=0 ; a<1 ; a++){
        console.log(report[i][a])
      A.push([
        report[i][a].Addressone,
        report[i][a].Address.state,

        report[i][a].Address.city,
        report[i][a].User.type,
        report[i][a].User.customer_id_number,
        report[i][a].Address.pinCode,
        
        report[i][a].User.firstName +" " +report[i][a].User.lastName,
        report[i][a].User.phone,
        report[i][a].User.email,
        report[i][a].Address.address_line_1
        ? report[i][a].Address.address_line_1.replace(/,/g, "-")
        : "-",
        moment(report[i][a].createdAt).format("YYYY-MM-DD HH:mm:ss"),

        report[i][a].id,
        report[i][a].totalAmount,
        report[i][a].status,
        report[i][a].Seller.unique_identifier,
        report[i][a].Seller.pincode,
        report[i][a].invoice_number,
        report[i][a].Feedbacks.comment,
        // report[i].Feedbacks.playstore,
        report[i][a].Feedbacks.reviewDeliveryOverallService,
        report[i][a].Feedbacks.reviewProductHandellingByDeliveryAgent,
        report[i][a].Feedbacks.reviewDeliveryTimings,
        report[i][a].Feedbacks.reviewDeliveryAgent,
      ]);
    }}

    let csvContent = "data:text/csv;charset=utf-8,";
    A.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    //console.log(csvContent);
    // var csvContent=csvContent.join('%0A');
    //console.warn(csvContent);
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "customer_feedback_report.csv";
    document.body.appendChild(a);
    a.click();
  }
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
    let newArray = [];
    console.log(this.state.checkedItems);
    if (this.props.report !== undefined) {
      newArray = this.props.report.filter((d) => {
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

  getDate = (date) => {
    const dateODorder = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return dateODorder;
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
        name: "Addressone",
        label: "Zone	",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Address",
        label: "State	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? Address.state : "--";
          },
        },
      },
      {
        name: "Address",
        label: "City	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? Address.city : "--";
          },
        },
      },

      {
        name: "User",
        label: "User Type	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (User, tableMeta) => {
            return User ? (User.type ? User.type : "--") : "--";
          },
        },
      },
      {
        name: "User",
        label: "Customer Id	",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(User)=>{
            return User !==undefined ? User.customer_id_number :'-'
          }
        },
      },
      {
        name: "Address",
        label: "Customer Pincode",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return(
            Address!== undefined && Address !== null  ?Address.pinCode:null
            )
          },
        },
      },
      {
        name: "User",
        label: "Customer Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (User, tableMeta) => {
            return User
              ? User.firstName
                ? `${User.firstName} ${User.lastName} `
                : "--"
              : "--";
          },
        },
      },
      {
        name: "User",
        label: "Customer Phone	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (User, tableMeta) => {
            return User ? (User.phone ? User.phone : "--") : "--";
          },
        },
      },
      {
        name: "User",
        label: "Customer Email ID	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (User, tableMeta) => {
            return User ? (User.email ? User.email : "--") : "--";
          },
        },
      },

      {
        name: "Address",
        label: "Customer Address	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? (Address.address_line_1 ? Address.address_line_1 : "--") : "--";
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
        name: "id",
        label: "Order Id	",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "grandTotal",
        label: "Order Amount	",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "status",
        label: "Order status	",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Seller",
        label: "sellerid	",
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
        label: "sellerPincode	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Seller, tableMeta) => {
            return Seller ? Seller.pincode : "--";
          },
        },
      },
      {
        name: "invoice_number",
        label: "Invoice Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Feedbacks",
        label: "Feedback Description	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Feedbacks, tableMeta) => {
            return Feedbacks ? Feedbacks.comment : "--";
          },
        },
      },

      // {
      //   name: "Feedbacks",
      //   label: "rating(from Playstore)	",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (Feedbacks, tableMeta) => {
      //       return Feedbacks ? Feedbacks.playstore : "--";
      //     },
      //   },
      // },
      {
        name: "Feedbacks",
        label: "How do you like our overall delivery service	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Feedbacks, tableMeta) => {
            return Feedbacks ? Feedbacks.reviewDeliveryOverallService : "--";
          },
        },
      },
      {
        name: "Feedbacks",
        label: "How do you like product delivery by our delivery agent	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Feedbacks, tableMeta) => {
            return Feedbacks
              ? Feedbacks.reviewProductHandellingByDeliveryAgent
              : "--";
          },
        },
      },
      {
        name: "Feedbacks",
        label: "How Do you like our delivery timings	",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Feedbacks, tableMeta) => {
            return Feedbacks ? Feedbacks.reviewDeliveryTimings : "--";
          },
        },
      },
      {
        name: "Feedbacks",
        label: "Delivery Agent Feedbacks",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Feedbacks, tableMeta) => {
            return Feedbacks ? Feedbacks.reviewDeliveryAgent : "--";
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
      // callback that gets executed when filters are confirmed

      selectableRows: "none",
      textLabels: {
        body: {
          noMatch: this.props.isLoading
            ? "Loading data..!"
            : "Sorry, No Data Found",
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
                      <h4>Customer Feedbacks Report</h4>
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
                        Customer Feedbacks Report
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
                          {/* <FormControl
                                variant="outlined"
                                className="col-sm-2 mx-1"
                              >
                                <InputLabel
                                  htmlFor="outlined-age-native-simple"
                                  style={{ fontSize: "12px" }}
                                >
                                  State Filter
                                </InputLabel>
                                <Select
                                  native
                                  name="stateFilter"
                                  value={this.state.stateFilter}
                                  onChange={(val) =>
                                    this.handleStateChange(val.target.value)
                                  }
                                  label="State Filter"
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
                                  {this.props.state_list
                                    ? this.props.state_list.map((d) => (
                                        <option value={d.id}>{d.name}</option>
                                      ))
                                    : "No Seller"}
                                </Select>
                              </FormControl> */}
                              





                              









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
                  <i style={{fontSize:"9px"}}  >By Customer Number</i> 
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
                            data={this.props.report}
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
                              Count : {this.state.datarange} -{" "}
                              {this.state.dataLength}
                            </li>
                            {/* {this.state.datarange > 20 ? (
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
                             {this.props.report.length < 49 ? 
                             <li class="page-item btn btn-disabled">
                             <i class="icofont icofont-rounded-right"></i>
                           </li>
                            :
                            <li
                            class="page-item btn"
                            onClick={this.onChangePas.bind(this)}
                          >
                            <i class="icofont icofont-rounded-right"></i>
                          </li>
                          
                            } */}
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
    report: state.report.report_data,
    isLoading: state.sellerProduct.isLoading,
    loginData: state.login,
    seller_list: state.seller.seller_list,
    city_list: state.city.city_list,
    state_list: state.state.state_list,
    countFilterWise:state.report.countFilterWise,


  };
};
ConsumerFeedbackReport.propTypes = {
  fetchConsumerFeedbackList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchConsumerFeedbackList,  fetchstateList,
  fetchcityList,
  fetchSellerList, })(
  ConsumerFeedbackReport
);
