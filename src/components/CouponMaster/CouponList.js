/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCouponList ,updateCoupomList} from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment'
import $ from "jquery";
import Pagination from "react-js-pagination";
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
  Switch
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
class CouponList extends Component {
  state = {
    open: false,
    isLoading: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    pageNumber:1,
    checked: false,
    setDateWise: null,
    setDateWiseC: null,
    dataLength:50,
    datarange:0,
  };
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
  componentWillMount() {
    this.getCouponList(this.state.datarange,this.state.dataLength);
    
  }
  getCouponList(range,length) {
    this.props.fetchCouponList(range,length);
  }
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
  
  handleStatus=(status,sid) => {
    const data = {
      couponId:sid,
      status:!status
    }
    console.log(data)
    this.props.updateCoupomList(data)
  }
    // onChangePa(e) {
    //   e.preventDefault();
    //   const  datarange= this.state.datarange - 50
    //   const dataLength= this.state.dataLength 
    //    this.getCouponList(datarange,dataLength)
    //   this.setState({
    //     datarange: datarange ,
    //     dataLength: dataLength ,
    //   });
    // }
    // onChangePas(e) {
    //   e.preventDefault();
   
    //   const  datarange= this.state.datarange +50
    //   const dataLength= this.state.dataLength 
    //   this.getCouponList(datarange,dataLength)
    //   this.setState({
    //     datarange: datarange ,
    //     dataLength:dataLength ,
    //   });
    // }
    handlePageChange(pageNumber) {
      console.log(localStorage.getItem('sellerProductCount'))
      console.log("active page is", pageNumber);
      console.log(pageNumber*50-50)
  
      const range=pageNumber*50-50
      const dataLength = this.state.dataLength;
      this.getCouponList(range,dataLength)

      this.setState({
        datarange: range,
      });
      this.setState({activePage: pageNumber});
      console.log(range,dataLength)
    }

    getDate=(date)=>{
      const valid= moment(date).format("YYYY-MM-DD HH:mm:ss")
      return valid
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
        name: "PinCodes",
        label: "Pincode Applicable For",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(PinCodes,tableMeta)=>{
            return PinCodes.length >0? (PinCodes.map(d=> <li>{d.code}</li>)) : ('All Pinocode')
          }
        },
      },
      {
        name: "description",
        label: "Description",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "couponCode",
        label: "Coupon Code",
        options: {
          filter: true,
          sort: true,
        },
    },
    {
        name: "discountType",
        label: "Coupon Type",
        options: {
          filter: true,
          sort: true,
        },
      },
      
      {
        name: "display",
        label: "Display",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(display,tableMeta)=>{
            return display ? "Yes" :"No"
          }
        },
      },
      {
        name: "Products",
        label: "Products",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Products,tableMeta)=>{
            return Products.length >0? (Products.map(d=> <li>{d.sku}</li>)
            ):'All products'
          }
        },
      },
      {
        name: "maxUsers",
        label: "Max. Users",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "minPurchaseAmount",
        label: "Min Amount of Purchase",
        width: 20,
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "perUserLimit",
        label: "User limit",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "discountValue",
        label: "Discount Amount",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(discountValue,tableMeta)=>{return discountValue?discountValue:'0'}
        },
      },
     
      {
        name: "validFrom",
        label: "Valid From",
        options: {
          filter: false,
          sort: true,
          customBodyRender:(validFrom,tableMeta)=>{
            return this.getDate(validFrom)  
          }
        },
      },
      {
        name: "validTo",
        label: "Valid To",
        options: {
          filter: false,
          sort: true,
          customBodyRender:(validTo,tableMeta)=>{
            return this.getDate(validTo)  
          }
        },
      },
      
      {  
        name: "status",
        label: "status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (status, tableMeta) => {
            var coupon_id = tableMeta.rowData[0];
              console.log(tableMeta.rowData[0],coupon_id);
            return (
           <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} onChange={()=>this.handleStatus(status,coupon_id)} />   
            );
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
                {localStorage.getItem('role')!=="seller"?
                <Link
                  to={"/coupon-master/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>

                :null}
              </div>
            );
          },
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
      // callback that gets executed when filters are confirmed
   
      selectableRows: "none",
      textLabels: {
        body: {
           noMatch: this.props.coupon.length !== 0
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
    const AntSwitch = withStyles((theme) => ({
      root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
      },
      switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
          transform: 'translateX(12px)',
          color: theme.palette.common.white,
          '& + $track': {
            opacity: 1,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
          },
        },
      },
      thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
      },
      track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
      },
      checked: {},
    }))(Switch);    
  
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Coupon List</h4>
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
                      <li className="breadcrumb-item active">Coupon List</li>
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
                            {/*<FormControl
                            variant="outlined"
                            className="col-sm-2 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              Valid From
                            </InputLabel>
                            <Select
                              native
                              name="dateFilter"
                              value={this.state.dateFilter}
                              // onChange={(e) => {
                              //   this.setState({
                              //     dateFilter: e.target.value,
                              //   });
                              // const dateFilter = this.state.dateFilter;
                              // this.handleDateFilter.bind(this,this.state.dateFilter);
                              // }}
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
                              <option aria-label="None" value={null} />
                              <option value={0}>Today</option>
                              <option value={1}>Last 2 Days</option>
                              <option value={2}>Last 3 Days</option>
                              <option value={6}>Last 7 Days </option>
                              <option value={29}>Last 30 Days </option>
                              <option value={59}>Last 60 Days</option>
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
                              Valid To
                            </InputLabel>
                            <Select
                              native
                              name="dateFilter"
                              value={this.state.dateFilter}
                              onChange={(val) =>
                                this.handlePeriodChange(val.target.value)
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
                              <option value={0}>Today</option>
                              <option value={1}>Last 2 Days</option>
                              <option value={2}>Last 3 Days</option>
                              <option value={6}>Last 7 Days </option>
                              <option value={29}>Last 30 Days </option>
                              <option value={59}>Last 60 Days</option>
                            </Select>
                          </FormControl>*/}
                        </div>
                        <div className="col-sm-3">
                        {localStorage.getItem('role')!=="seller"?
                          <Link
                            to={"/coupon-master/add"}
                            className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            {" "}
                            <i className="icofont icofont-plus m-r-5"></i> Add
                            Coupon{" "}
                          </Link>
                          :null}
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
                             {this.props.coupon.length < 49 ? 
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
    coupon: state.coupon.coupon_list,
    countFilterWise:state.coupon.countFilterWise,

    loginData: state.login,
    isLoading: state.coupon.isLoading,
    error: state.coupon.error,
  };
};
CouponList.propTypes = {
  fetchCouponList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchCouponList,updateCoupomList })(CouponList);