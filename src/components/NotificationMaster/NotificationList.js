import React from "react";
import { Link } from "react-router-dom";
// import $ from "jquery";
// import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import Constant from '../../Constant'

import { connect } from "react-redux";
import { fetchTemplates,deleteTemplate} from "../../store/index";
import { Tooltip, Button,Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import NotificationAssignPopUp from './NotificationAssignPopUp'
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "react-js-pagination";

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
class NotificationList extends React.Component {
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
  componentWillMount() {
    this.props.fetchTemplates()
  }
  handleClose = () => {
    
    this.setState({
      open: false,
      openToedit: false,
    });
    this.props.fetchTemplates()
  };
  getCategory() {
  }
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
  // handleClose = () => {
  //   this.setState({
  //     open: false,
  //     openToedit: false,
  //   });
  // };
  handleOpen = (e, id) => {
    this.setState({
      openToedit: true,
      templateID: id,
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
  //   const item = e.target.name;
  //   const isChecked = e.target.checked;
  //   this.setState((prevState) => ({
  //     hidedownload: !this.state.hidedownload,
  //     checkedItems: prevState.checkedItems.set(item, isChecked),
  //   }));
  //   console.log(this.state.checkedItems);
  //   let newArray = this.props.categoryData.data.filter((d) => {
  //     // console.log(d)
  //     let searchValue = d.id;
  //     return searchValue.indexOf(item) !== -1;
  //   });
  //   console.log(newArray);
  //   this.setState({
  //     downdata: [...this.state.downdata, newArray],
  //   });
  //   console.log(this.state.downdata);
  // };
  // handleStatus=(status,sid) => {
  //   const data = {
  //     CategoryId:sid,
  //     status:!status
  //   }
  //   console.log(data)
    // this.props.updateStatusCategory(data)
  }
  templateDelete(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this !",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
    this.props.deleteTemplate(id)
      }
    })
  }
  downloadcsv(){
  window.location.href = `${Constant.getAPI()}/notification/custom/download`

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
        name: "Medium",
        label: "Template Image",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (Medium, tableMeta) => {
            return (
              <div>
                {
                  <img
                    src={
                      Medium !== undefined && Medium !== null && Medium !== ""
                        ? Medium.url
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
        name: "title",
        label: "Template Title",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "text",
        label: "Template Description",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "NotificationType",
        label: "Notification Type",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(NotificationType,tableMeta)=>{
            return (
              NotificationType.type
            )
          }
        },
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (status, tableMeta) => {
              // var id = tableMeta.rowData[0];
              //  console.log(tableMeta.rowData[0],id);
            return (
           <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} 
          //  onChange={()=>this.handleStatus(status,id)} 
           />   
  
            );
          },
        },
      },  
      {
        name: "id",
        label: "Assign & Logs",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return (
              <div >
                <Link
                  onClick={(e) => this.handleOpen(e, id)}
                  className="m-r-15 text-muted b-none b-b-none"
                
                >
                  <img  className=" text-custom" src={'./assets/images/notification.jpg'} alt="bell" 
                  style={{height:"22px",width:"22px"}}
                   />
                </Link>

                <Link
                  to={"/notification/logs/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-22 icofont icofont-list text-custom"></i>
                </Link>
               
              </div>
            );
          },
        },
      },
      {
        name: "id",
        label: "Action",
        options: {
          display:localStorage.getItem('NotificationEdit')=='true'?true:false,
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                
                <Link
                  to={"/notification/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>

                <span
                  onClick={this.templateDelete.bind(this, id)}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Delete"
                >
                  <i className="f-20 icofont icofont-delete-alt text-danger"></i>{" "}
                </span>

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
          noMatch: !this.props.isLoading
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
                      <h4>Template List</h4>
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
                <NotificationAssignPopUp
                  close={this.handleClose}
                  open={true}
                  redirect={"pending"}
                  data={this.state.templateID}
                  
                  
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
                      <li className="breadcrumb-item active">Template List</li>
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
                        
                      {localStorage.getItem('NotificationAdd')=="true"?
                      
                        <Link
                          to="/notification/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >

                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Template{" "}
                        </Link>
                        :null}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <button
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
                          </button>
                        {/* <Link
                          to="/importData"
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link> */}
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
                            {/* <Pagination
                              itemClass="page-item"
                              linkClass="page-link"
                                activePage={this.state.activePage}
                                itemsCountPerPage={50}
                                 totalItemsCount={this.props.countFilterWise}
                                 pageRangeDisplayed={22}
                               onChange={this.handlePageChange.bind(this)}
                              /> */}
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
    templates: state.notification.templates_list,
    error: state.notification.error,
    isLoading:state.notification.isLoading
  };
};
NotificationList.propTypes = {
  fetchTemplates: PropTypes.func.isRequired,
  deleteTemplate: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {fetchTemplates,deleteTemplate})(NotificationList);