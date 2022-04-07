import React from "react";
import { Link } from "react-router-dom";
// import $ from "jquery";
// import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchNotificationLogs,} from "../../store/index";
import { Tooltip, Button,Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import NotificationAssignPopUp from './NotificationAssignPopUp'
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import moment from 'moment'
import CustomerLogsPopUp from './CustomerLogsPopUp,'
import { CenterFocusStrong } from "@material-ui/icons";
import Constant from '../../Constant'
// class Checkbox extends React.Component {
//   static defaultProps = {
//     checked: false,
//   };
//   render() {
//     return (
//       <input
//         type={this.props.type}
//         name={this.props.name}
//         checked={this.props.checked}
//         onChange={this.props.onChange}
//       />
//     );
//   }
// }
class NotificationLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideOld: false,
      checkedItems: new Map(),
      check: false,
      downdata: [],
      checked: false,
      data: [],
      open: false,
      dataLength:50,
      datarange:0,
      hidedownload: false,
    };
  }
  onChangePa(e) {
    e.preventDefault();
    // this.getOrdersList();
    this.setState({
      datarange: this.state.datarange - this.state.dataLength,
      dataLength: this.state.dataLength ,
    });
  }
  onChangePas(e) {
    e.preventDefault();
    this.setState({
      datarange: this.state.datarange + this.state.dataLength,
      dataLength: this.state.dataLength ,
    });
  }
  // handleStatusChange = (sid) => {
  //   var isChecked = $("#tyre_category_" + sid);
  //   isChecked.prop("checked", !isChecked.prop("checked"));
  //   console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
  //   if (!isChecked.prop("checked") === true) {
  //     var status = "active";
  //   } else {
  //     var status = "inactive";
  //   }
  //   let newArray = this.state.tyre_category_list;
  //   var a = newArray.find((element) => {
  //     return element.id === sid;
  //   });
  //   a.status = status;
  //   console.log(newArray);
  //   this.setState({ tyre_category_list: newArray });
  //   Swal.fire("Update Status!", "Status has been updated.", "success");
  // };
  componentDidMount(){
    console.log(this.props.match.params.template_id)
    if(this.props.match.params.template_id !== undefined)
    {
      this.props.fetchNotificationLogs(this.props.match.params.template_id)
   }
}

  handleClose = () => {
    
    this.setState({
      open: false,
      openToedit: false,
    });
    this.props.fetchNotificationLogs(this.props.match.params.template_id)
  };
  
  imgLoadError = (event) => {
    event.target.src = "./assets/images/icon.png";
  };
  onError = () => {
    Swal.fire({
      title: "Something went wrong. Try again after some Time.!",
      icon: "error",
      text: "",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
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
          fontSize:'9px',
          // border:'1px solid black',
          padding:'1px',
          whiteSpace: "normal",
          wordWrap: "break-word",
        },
      },
    },
  });
  // handleClose = () => {
  //   this.setState({
  //     open: false,
  //     openToedit: false,
  //   });
  // };
  handleOpen = (e) => {
    console.log(e)
    this.setState({
      openToedit: true,
      customeId: e,
    });
  };
openModel = () => {
    this.setState({
      open: true,
    });
  };
  // handleClose = () => {
  //   this.setState({
  //     open: false,
  //   });
  // };
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
 
  }
  downloadcsv(){
    //window.location.href = `${Constant.getAPI()}/notification/custom/customer_logs_download?customId=${}`
    //window.location.href = `${Constant.getAPI()}/notification/custom/download?templateId=${this.props.match.params.template_id}`

  }
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
    //       display:false,
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
    //         //  <input type="checkbox" name="check" id={id} value={id}  onChange={this.selctSingle.bind(this,id)} checked={this.state.checked}/> */}
    //         // <Checkbox
    //         //   color="primary"
    //         //   id={'ch'+id}
    //         //   data-id={id}
    //         //   onChange={this.selctSingle.bind(this,id)}
    //         //   checked= {this.state.check === id ? true : false }
    //         //   value={this.state.check ? true: false }
    //         //   inputProps={{ "aria-label": "secondary checkbox" }}
    //         // />
    //       },
    //     },
    //   },
      {
        name: "NotificationTemplate",
        label: "Template Image",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (NotificationTemplate, tableMeta) => {
            return (
              <div>
                {
                  <img
                    src={NotificationTemplate !== undefined &&
                      NotificationTemplate.Medium !== undefined && NotificationTemplate.Medium !== null && NotificationTemplate.Medium !== ""
                        ? NotificationTemplate.Medium.url
                        : "./assets/images/icon.png"
                    }
                    alt=""
                    className="img-40"
                    onError={this.imgLoadError}
                  />
                }
              </div>
            );
          },
        },
      },
      {
        name: "NotificationTemplate",
        label: "Template Title",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(NotificationTemplate)=>{
            return(
              NotificationTemplate !== undefined?
              NotificationTemplate.title:null
            )
          },


        },
      },
      // {
      //   name: "NotificationTemplate",
      //   label: "logs column",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(NotificationTemplate)=>{
      //       return(
      //         NotificationTemplate.text
      //       )
      //     },
      //   },
      // }, 
      {
        name: "Sellers",
        label: "Sellers",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Sellers)=>{
            return( Sellers.map(seller=>(
                    <li>{seller.name}</li>
                  ))
              
            )
          },
        },
      },
     
      // {
      //   name: "Sellers",
      //   label: "Viewed BY",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(Sellers)=>{
      //       return( Sellers.map(seller=>(
      //               <li>{seller.name}</li>
      //             ))
              
      //       )
      //     },
      //   },
      // },
      {
        name: "createdAt",
        label: "Date and Time (Notification Sended)",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(createdAt)=>{
            return(
              moment(createdAt).format("YYYY-MM-DD HH:mm:ss")
            )
          },
        },
      },
      {
        name: "NotificationTemplate",
        label: "Date and Time (Template Created)",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(NotificationTemplate)=>{
            return(
              moment(NotificationTemplate.createdAt).format("YYYY-MM-DD HH:mm:ss")
            )
          },
        },
      },
      {
        name: "id",
        label: "Customer Logs",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(id)=>{
            return(
              <div>
                   <Link
                  onClick={this.handleOpen.bind(this,id)}
                  className="m-r-15 text-muted b-none b-b-none"
                
                >
                   <i class="f-22 icofont icofont-listine-dots " ></i>

                   
                </Link>
              </div>
            )
          },
        },
      },
      // {
      //   name: "id",
      //   label: "Action",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return (
      //         <div>
      //           <Link
      //             to={"/notification/add/" + id}
      //             className="m-r-15 text-muted"
      //             data-toggle="tooltip"
      //             data-placement="top"
      //             title=""
      //             data-original-title="Edit"
      //           >
      //             <i className="f-20 icofont icofont-ui-edit text-custom"></i>
      //           </Link>
      //         </div>
      //       );
      //     },
      //   },
      // },
      // {
      //   name: "id",
      //   label: "Assign",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return (
      //         <div>
      //           <button
      //             onClick={(e) => this.handleOpen(e, id)}
      //             className="m-r-15 text-muted b-none b-b-none"
      //             data-toggle="tooltip"
      //             data-placement="top"
      //             title="Reply for Quotes"
      //             style={{ background: "none" }}
      //             data-original-title="Reply for Quotes"
      //           >
      //             <i className="f-20 icofont icofont-notification text-primary"></i>
      //           </button>
          
      //         </div>
      //       );
      //     },
      //   },
      // },
    ];
    const options = {
         filter: false,
       viewColumns: false,
      responsive: 'scrollMaxHeight',search:false,
      print: false,
      pagination:false,
      download: false,
      fixedHeader:true,
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
          noMatch: !this.props.templates
          ? <div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}> Sorry, No Data Found
          </div>
          : <div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}>
          <p style={{textAlign:'center'}}>
          Loading data..!
          </p>
          </div>,
        
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
        filter: {
          all: "All",
          title: "FILTERS",
          reset: "RESET",
        },
        // selectedRows: {
        //   text: `row(s) Selected`,
        //   download: "Download",
        //   downloadAria: "Download Selected Rows",
        // },
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
                      <h4>Notification Logs</h4>
                    </div>
                  </div>
                  {/* <CSVLink
                    data={this.props.categoryData}
                    filename={"my-file.csv"}
                    className="btn btn-primary"
                    target="_blank"
                  >
                    Download me
                  </CSVLink> */}
                  {/* {localStorage.getItem('superadminad_role') !== "shop"
                    ? */}
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
                <CustomerLogsPopUp
                  close={this.handleClose}
                  open={true}
                  redirect={"pending"}
                  data={this.state.templateID}
                  
                  
                />
              </div>
            ) : (
              ""
            )}


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
                <CustomerLogsPopUp
                  close={this.handleClose}
                  open={true}
                  redirect={"pending"}
                  data={this.state.customeId}
                  
                  
                />
              </div>
            ) : (
              ""
            )}


                 <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item" ><Link to="/notification/list">Template List</Link></li>
                      <li className="breadcrumb-item active">Notification Logs</li>
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
                        <Link
                          to="/notification/list"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >

                          {" "}
                          <i className="icofont icofont m-r-5"></i> 
                          BACK{" "}
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <Tooltip
                              title="Download"
                              aria-label="download"
                              onClick={this.downloadcsv.bind()}
                            >
                              <i
                                className="icofont icofont-download-alt"
                                style={{
                                  fontSize: "30px",
                                  color: "grey",
                                }}
                              ></i>
                            </Tooltip>
                          </button> */}
                        {/* <Link
                          to="/importData"
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link>
{/* 
                        {!this.state.hidedownload ? (
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
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                         
                          className="table-responsive"
                          data={this.props.templates}
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
                         {this.props.categoryData.length < 49 ? 
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
                          </ul>
                        </nav>
                        <AlertDialog
                          open={this.state.open}
                          func={this.handleClose}
                        />
                        {this.props.error === false ? this.onError() : null}
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
    templates: state.notification.logs_list,
    error: state.notification.error,
    isLoading:state.notification.isLoading
  };
};
NotificationLogs.propTypes = {
    fetchNotificationLogs: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {fetchNotificationLogs})(NotificationLogs);