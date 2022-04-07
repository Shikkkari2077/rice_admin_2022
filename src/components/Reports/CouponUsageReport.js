import React, { Component } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertDialog from "../../common/DownloadOption";
import Pagination from 'react-js-pagination'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  FormGroup,
  FormLabel,
  Tooltip,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import moment from "moment";
import {fetchCouponReportList,fetchCouponList,fetchuserList} from '../../store/index' 


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
class CouponUsageReport extends Component {
  state = {
    open: false,
    isLoading: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    couponFilter:'',
    dateFilter:'',
    userFilter:"",
    dataLength: 50,
    datarange: 0,
    start_date:'',
  };
  componentDidMount(){
    this.props.fetchCouponList()
    this.props.fetchuserList()
    var start_date = moment().subtract(0,'days').startOf('day').valueOf()

    this.getCouponreport(this.state.datarange,this.state.dataLength,start_date,this.state.couponFilter,this.state.couponFilter)
  }
  getCouponreport(range,length,start_date,userId,couponId){
    this.props.fetchCouponReportList(range,length,start_date,userId,couponId)
  }
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    var start_date=this.state.dateFilter
    var userId=this.state.userFilter
    var couponId=this.state.couponFilter
    this.getCouponreport(range,dataLength,start_date,userId,couponId)

    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  handlePeriodChange = (v) => {
    this.setState({
      dateFilter: v,
    });
    var start_date = moment().subtract(v,'days').startOf('day').valueOf()
    this.setState({
      start_date:start_date
    })
   
  };
  onGo = () => {
    var start_date = this.state.start_date;
    var userId=this.state.userFilter
    var couponId=this.state.couponFilter
    this.getCouponreport(this.state.range,this.state.length,start_date,userId,couponId)
    this.setState({
      dataLength: 50,
      datarange: 0,
    });
  };
 
  handleUserChange=(v)=>{
      this.setState({
        userFilter: v,
      });
      console.log(v)
     var start_date= this.state.start_date
     var userId=v
     var couponId=this.state.couponFilter
     this.getCouponreport(this.state.range,this.state.length,start_date,userId,couponId)
    }
  handleCouponChange=(v)=>{
      this.setState({
        couponFilter: v,
      });
      //var start_date= this.state.start_date
      //var userId=this.state.userFilter
      //var couponId=v
      //this.getCouponreport(this.state.range,this.state.length,start_date,userId,couponId)
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
  getDate=(date)=>{
    const dateODorder= moment(date).format("YYYY-MM-DD HH:mm:ss")
    return dateODorder
  }
   onChangePa(e) {
    e.preventDefault();
    var start_date=this.state.dateFilter
    var userId=this.state.userFilter
    var couponId=this.state.couponFilter
    const  datarange= this.state.datarange - 25
    const dataLength= this.state.dataLength 
     this.getCouponreport(datarange,dataLength,start_date,userId,couponId)
    this.setState({
      datarange: datarange ,
      dataLength: dataLength ,
    });
  }
  onChangePas(e) {
    e.preventDefault();
    var start_date=this.state.dateFilter
    var userId=this.state.userFilter
    var couponId=this.state.couponFilter
    const  datarange= this.state.datarange +25
    const dataLength= this.state.dataLength 
    this.getCouponreport(datarange,dataLength,start_date,userId,couponId)
    this.setState({
      datarange: datarange ,
      dataLength:dataLength ,
    });
  }
  render() {
    const columns = [
      {
        name: "id",
        label: "Select",
        options: {
          display:false,
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
        name: "Coupon",
        label: "Coupon Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Coupon,tableMeta)=>{
            return( Coupon!==undefined && Coupon!==null?
              Coupon.name:null)
          }
        },
      },
      {
        name: "Coupon",
        label: "Coupon Code",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Coupon,tableMeta)=>{
            return Coupon ? Coupon.couponCode:'' 
          }
        },
      },
      {
        name: "Coupon",
        label: "Discount Type",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Coupon,tableMeta)=>{
            return Coupon ? Coupon.discountType:'' 
          }
        },
      },
      {
        name: "Coupon",
        label: "Discount Value",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Coupon,tableMeta)=>{
            return(
            <div>{ Coupon ?
            tableMeta.rowData[3].discountType == "percent"?
             Coupon.discountValue+" " +"%"
             :   Coupon.discountValue+" "+"Rs"
             :'' 
            }
            {/* {console.log(tableMeta.rowData[3])} */}
            </div>
            )
          }
        },
      },
      {
        name: "OrderId",
        label: "Order Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Order",
        label: "Seller Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Order,tableMeta)=>{
            return Order !==undefined && Order !==null && Order.Seller !==null&& Order.Seller !==undefined ? 
            Order.Seller.unique_identifier
             :null
          }
        },
      },
      {
        name: "Order",
        label: "Seller Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Order,tableMeta)=>{
            return Order !==undefined && Order !==null && Order.Seller !==null&& Order.Seller !==undefined ? 
            Order.Seller.name
             :null
          }
        },
      },
      // {
      //   name: "Seller.unique_identifier",
      //   label: "Company Seller Id",
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
            return User ? User.customer_id_number:'' 
          }
        },
      },
      {
        name: "User",
        label: "Customer Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(User,tableMeta)=>{
            return User ? User.firstName+" "+User.lastName:'' 
          }
        },
      },
    
      {
        name: "Order",
        label: "Coupon Discount on Order ",
        width: 20,
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Order,tableMeta)=>{
            return Order ? Order.couponAmount:'' 
          }
        },
      },
      {
        name: "Order",
        label: "Total Amount of Purchase",
        width: 20,
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Order,tableMeta)=>{
            return Order ? Order.grandTotal:'' 
          }
        },
      },
      {
        name: "createdAt",
        label: "Purchase On",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(createdAt,tableMeta)=>{
            return this.getDate(createdAt)  
          }
        },
      },
    ];
    const options = {
      filter: false,
       viewColumns: false,
      responsive: 'scrollMaxHeight',search:false,
      print: false,
      pagination:false,
      download: false,
      confirmFilters: this.state.isLoading,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() => this.handleFilterSubmit(applyNewFilters)}
            >
              Apply Filters
            </Button>
          </div>
        );
      },
      selectableRows: "none",
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
                      <h4>Coupon Usage Reports</h4>
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
                        Coupon Usage Reports
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
                              search
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
                          <FormControl
                            variant="outlined"
                            className="col-sm-2 mx-1"
                          >
                            <InputLabel htmlFor="outlined-age-native-simple" style={{fontSize:'12px'}}>
                            Coupon Filter
                            </InputLabel>
                            <Select
                              native
                              name="couponFilter"
                              value={this.state.couponFilter}
                              onChange={(val) =>
                                this.handleCouponChange(val.target.value)
                              }
                              label="Time Peroid"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option aria-label="None" value={null} />
                             {this.props.coupon_list.map(d=> <option value={d.id} key={d.id}>{d.couponCode}</option>) }
                            </Select>
                          </FormControl>
                          {/* <FormControl
                            variant="outlined"
                            className="col-sm-2 mx-1"
                          >
                            <InputLabel htmlFor="outlined-age-native-simple" style={{fontSize:'12px'}}>
                            User Filter
                            </InputLabel>
                            <Select
                              native
                              name="userFilter"
                              value={this.state.userFilter}
                              onChange={(val) =>
                                this.handleUserChange(val.target.value)
                              }
                              label="Time Peroid"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option aria-label="None" value={null} />
                             {this.props.user_list.map(d=><option key="id" value={d.id}>{d.customer_id_number}</option>)}
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
                        <div className="col-sm-3">
                          {/* {!this.state.hidedownload ? (
                            <button
                              className="f-right bg-white b-none"
                              data-modal="modal-13"
                            >
                              <Tooltip
                                title="Download"
                                aria-label="download"
                                onClick={this.openModel}
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
                                onClick={this.openModel}
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
                          )} */}

                        </div>
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.coupon}
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
                             Count : {this.state.datarange}-{this.state.datarange+this.state.dataLength}
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
    coupon: state.report.report_data,
    countFilterWise:state.report.countFilterWise,
    coupon_list: state.coupon.coupon_list,
    isLoading: state.report.isLoading,
    error: state.report.error,
    user_list: state.customer.customer_list,
  };
};
CouponUsageReport.propTypes = {
  fetchCouponReportList: PropTypes.func.isRequired,
  fetchCouponList: PropTypes.func.isRequired,
  fetchuserList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchCouponReportList,fetchCouponList,fetchuserList })(CouponUsageReport);

