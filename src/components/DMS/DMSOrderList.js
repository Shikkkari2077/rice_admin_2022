
import React from "react";
import { Link } from "react-router-dom";
import Swal  from "sweetalert2";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button,Switch } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Pagination from "react-js-pagination";
import Constant from '../../Constant'
import { getDmsOrders,sendOrderToDms } from '../../store/index'
import { FormGroup, FormLabel, Tooltip,
  TextField, Select, FormControl, InputLabel } from '@material-ui/core';
import moment from 'moment'
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
class DMSOrderList extends React.Component {
  state = {
   dataLength:50,
   datarange:0,
   searchNumber:"",
  };
  

  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    var invoice = this.state.searchNumber
    if(invoice !== "")
    {
      this.props.getDmsOrders(range,dataLength,invoice)
 
    }
    else{
      this.props.getDmsOrders(range,dataLength)

    }
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }

  handleSearchinput=(e)=>{
    this.setState({
     searchNumber:e.target.value
    })
   }

   onsearchButton=()=>{
   
    this.setState({
      cancelButton:true,
      datarange:0,

      activePage:1
    })

    this.props.getDmsOrders(0,50,this.state.searchNumber)

   }
   
   oncancelButton=()=>{
    this.setState({
      searchNumber:"",
      cancelButton:false,
      datarange:0,
      activePage:1
    })

    this.props.getDmsOrders(0,50)

  }

  componentWillMount() {
      this.props.getDmsOrders(this.state.datarange,this.state.dataLength)
  }
  getSellerList(range,limit) {
    this.props.fetchSellerList(range,limit,'');
    console.log(this.props.seller_list);
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
          width: "30px", 
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
            width: "70px",
            fontSize:'10px',
            // border:'1px solid black',
            padding:'1px',
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
        },
      },
    });
 
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
  
  };
  sendToDms=(orderId)=>{
    this.props.sendOrderToDms(orderId)
  }


  exportCSV() {
    console.log(
      window.location.href = `${Constant.getAPI()}/seller/list?&csvReport=true&adminId=${localStorage.getItem('superadmin_id')}`

    )
    window.location.href = `${Constant.getAPI()}/seller/list?&csvReport=true&adminId=${localStorage.getItem('superadmin_id')}`;}
  render() {
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
  
    const columns = [
    //   {
    //     name: "id",
    //     label: "Select",
    //     options: {
    //       filter: false,
    //       sort: false,
    //       customBodyRender: (id, tableMeta) => {
    //         return !this.state.hideOld ? (
    //           <Checkbox
    //             name={id}
    //             checked={this.state.checkedItems.get(id) || false}
    //             onChange={this.handleChange}
    //             type="checkbox"
    //           />
    //         ) : (
    //           <Checkbox
    //             color="primary"
    //             checked={true}
    //             type="checkbox"
    //             onChange={this.selectall}
    //             inputProps={{ "aria-label": "secondary checkbox" }}
    //           />
    //         );
          
    //       },
    //     },
    //   },
     
      {
        name: "order_id",
        label: "Order ID",
        options: {
          filter: true,
          sort: true,
         
        },
      },
      {
        name: "invoice_number",
        label: "Invoice No.",
        options: {
          filter: true,
          sort: true,
         
        },
      },
      {
        name: "ack_success",
        label: "Acknowledged from DMS",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(ack_success)=>{
              
            if(ack_success === true){
                return(
                   <h6><span className="badge badge-info text-dark text-center">
                        Received
                    </span></h6> 
                )}
                else{
                    return(
                      <h6><span className="badge badge-dark text-center">
                       Error 
                  </span></h6> 
                    )
                }
        }
         
        },
      },
      {
          name:"ack_date_time",
          label:"Acknowledged Date & Time",
          options:{
              customBodyRender:(ack_date_time)=>{
                  return(
                    ack_date_time ?
                      moment(ack_date_time*1000).format("DD-MM-YYYY  hh:mm")
                      :null
                  )

              }
          }
      },
      {
        name: "sent_to_dms",
        label: "Order To DMS",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(sent_to_dms)=>{
              
              if(sent_to_dms === true){
                  return(
                     <h6><span className="badge badge-info text-dark text-center">
                          Order Sent
                      </span></h6> 
                  )}
                  else{
                      return(
                        <h6><span className="badge badge-danger bg-dark text-center">
                         Error
                    </span></h6> 
                      )
                  }
          }
         
        },
      },
      {
        name:"createdAt",
        label:"Order Sent Date & Time",
        options:{
            customBodyRender:(createdAt)=>{
                return(
                    createdAt ?
                    moment(createdAt).format("DD-MM-YYYY  hh:mm")
                    :null
                )

            }
        }
    },
     
    //   {
    //     name:"error_date_time",
    //     label:"Error Date & Time",
    //     options:{
    //         customBodyRender:(error_date_time)=>{
    //             return(
    //                 error_date_time ?
    //                 moment(error_date_time).format("DD-MM-YYYY  hh:mm")
    //                 :null
    //             )

    //         }
    //     }
    // },
      {
        name:"order_status",
        label:"Order Status",
        options:{
            filter:false,
            sort:false,
            customBodyRender:(order_status)=>{
              console.log(order_status)
                return(
                    order_status ?
                   
                     order_status == "Successes" ? 
                         <h6><span className="badge badge-success text-dark">Success</span></h6>
                     :<h6><span className="badge badge-danger  text-center">Failed</span></h6>    
                            
                    :""
                 )

            },
            
        }
    },
  
    {
        name:"order_status_msg",
        label:"Order Message"
    },
    {

        name:"errorIn",
        label:"Error In",
        options:{
            customBodyRender:(errorIn)=>{
                return(
                  errorIn == 'orderAck' ?
                  "Order Acknowledgement"
                  :"Post Order"
                )
            },
            
        }
      },
      {
          name:"error_response",
          label:"Error Response",
          options:{
          customBodyRender:(error_response)=>{
              return(
                error_response?
                <i onClick={()=>{
                    Swal.fire({
                        title:"Error",
                        text:error_response,
                        confirmButtonText:"Close"
                    })
                  }} className="f-26 icofont icofont-exclamation-tringle"></i>
                :null
              )
          }
        }
    },
        {
            name:"order_id",
            label:"Send To DMS",
            options:{
              customBodyRender:(id,tableMeta)=>{
                  return(
                    
                      tableMeta.rowData[4] == false || tableMeta.rowData[2] == false ?
                      <i className="f-22 icofont icofont-location-arrow" onClick={()=>this.sendToDms(id)}></i>
                      :null
                  )
              }
            }
        }
         
      
    ];
    const options = {
      filter: true,
      filter: false,
       viewColumns: false,
      responsive: 'scrollMaxHeight',search:false,
      print: false,
      pagination:false,
      selectedRows: false,
      selectableRows: false,
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
      onFilterConfirm: (filterList) => {
        console.log("onFilterConfirm");
        console.dir(filterList);
      },
      onFilterDialogOpen: () => {
        console.log("filter dialog opened");
      },
      onFilterDialogClose: () => {
        console.log("filter dialog closed");
      },
      onFilterChange: (column, filterList, type) => {
        if (type === "chip") {
          var newFilters = () => filterList;
          console.log("updating filters via chip");
          // this.handleFilterSubmit(newFilters);
        }
      },
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
    const imports= 'seller'
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>DMS Orders </h4>
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
                      <li className="breadcrumb-item active">DMS Orders </li>
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
                      <div className="col">
                        
                        {/* {!this.state.hidedownload ? (
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <Tooltip
                              title="Download"
                              aria-label="download"
                              onClick={() => {
                                this.exportCSV();
                              }}                            >
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
                                this.exportCSV();
                              }}                            >
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
                      <div className="col-sm-9">
													<FormControl>
														<div style={{ height: '8px' }}></div>
														<div className="form-group row">
															<div className="col-sm-9">
																<input
																	style={{ width: '220px', height: '10px' }}
																	type="search"
																	className="form-control"
																	name="searchNumber"
																	placeholder="search by invoice number.."
																	onChange={this.handleSearchinput}
																	value={this.state.searchNumber}
																/>
															</div>
														</div>
													</FormControl>
													<FormControl>
														<div>
															<span
																className="btn btn-dark py-1 mx-3 mt-2"
																onClick={this.onsearchButton}
															>
																<i class="icofont icofont-search"> </i>
																<i style={{ fontSize: '9px', fontStyle: 'none' }}>
																
																</i>
															</span>
													
														</div>
													</FormControl>
													<FormControl>
														{this.state.cancelButton == true ? (
															<div
																className="btn btn-secondary py-1 mx-3 mt-2"
															onClick={this.oncancelButton}
															>

																<i style={{ fontSize: '10px' }}>cancel</i>
															</div>
														) : null}
													</FormControl>
												</div>
												
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.dms_order}
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
    dms_order:state.dmsOrders.dms_orders,
    countFilterWise:state.dmsOrders.countFilterWise,
    isLoading:state.seller.isLoading
  };
};
DMSOrderList.propTypes = {
    getDmsOrders: PropTypes.func.isRequired,
    sendOrderToDms:PropTypes.func.isRequired
};
export default connect(mapStateToProps, { getDmsOrders,sendOrderToDms })(DMSOrderList);