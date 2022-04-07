import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from "../../common/DownloadOption";
import Pagination from 'react-js-pagination'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {fetchdeliveryboyList} from '../../store/index'
import moment from 'moment'
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Button,
  Select,
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
class DeliveryBoyList extends React.Component {
  state = {
    open: false,
    isLoading: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    dataLength: 50,
    datarange: 0,
  };
  handleStatusChange = (sid) => {
    var isChecked = "#area_status_" + sid;
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = "active";
    } else {
      var status = "inactive";
    }
    let newArray = this.state.area_list;
    var a = newArray.find((element) => {
      return element.areaID === sid;
    });
    a.status = status;
    console.log(newArray);
    this.setState({ area_list: newArray });
    Swal.fire("Update Status!", "Status has been updated.", "success");
  };
componentWillMount() {
    this.getDeliveryBoyList();
  }
  getDeliveryBoyList = () => {
    this.props.fetchdeliveryboyList(0,50)
  }
 
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
   
    this.getDeliveryBoyList(range,dataLength);

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
  exportCSV(){
    window.location.href=`${Constant.getAPI()}/deliveryUser/download`
    
  }
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
  handleFilterSubmit = (applyFilters) => {
    let filterList = applyFilters;
    console.log("applied");
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };

  xhrRequest = (url, filterList) => {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        const data = this.state.CODPostpaidOrders;
      }, 2000);
    });
  };

  handleFilterSubmit = (applyFilters) => {
    this.setState({
      isLoading: true,
      CODPostpaidOrders: this.state.CODPostpaidOrders,
    });
  };
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
      // {
      //   name: "id",
      //   label: "Select",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return !this.state.hideOld ? (
      //         <Checkbox
      //           name={id}
      //           checked={this.state.checkedItems.get(id) || false}
      //           onChange={this.handleChange}
      //           type="checkbox"
      //         />
      //       ) : (
      //         <Checkbox
      //           color="primary"
      //           checked={true}
      //           type="checkbox"
      //           onChange={this.selectall}
      //           inputProps={{ "aria-label": "secondary checkbox" }}
      //         />
      //       );
            //  <input type="checkbox" name="check" id={id} value={id}  onChange={this.selctSingle.bind(this,id)} checked={this.state.checked}/> */}
            // <Checkbox
            //   color="primary"
            //   id={'ch'+id}
            //   data-id={id}
            //   onChange={this.selctSingle.bind(this,id)}
            //   checked= {this.state.check === id ? true : false }
            //   value={this.state.check ? true: false }
            //   inputProps={{ "aria-label": "secondary checkbox" }}
            // />
      //     },
      //   },
      // },
      // {
      //   name: "Medium",
      //   label: "Image",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (Medium, tableMeta) => {
      //       return (
      //         <div>
      //           {
      //             <img
      //               src={
      //                 Medium !== undefined && Medium !== null && Medium !== ""
      //                   ? Medium.url
      //                   : "./assets/images/icon.png"
      //               }
      //               alt=""
      //               className="img-40"
      //               onError={this.imgLoadError}
      //             />
      //           }
      //         </div>
      //       );
      //     },
      //   },
      // },
      {
        name: "uniqueId",
        label: "Delivery Person Unique Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "firstName",
        label: "First Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "lastName",
        label: "Last Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "verified",
      //   label: "Verified",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      {
        name: "phone",
        label: "Mobile Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "type",
        label: "Type",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "createdAt",
        label: "Date and Time",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(createdAt)=>{
            return(moment(createdAt).format("YYYY-MM-DD HH:mm:ss"))
          }
        },
      },
      {
        name: "cityName",
        label: "City",
        options: {
          filter: true,
          sort: true,
        },
      },
     
      // {
      //   name: "status",
      //   label: "Status",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (status, tableMeta) => {
      //       return (
      //         // <Toggle 
      //         //   id={"product_status_" + tableMeta.rowData[6]}
      //         //   checked={available === true ? true : false}
      //         //   value={available}
                
      //         // />
      //         <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} />
      //       );
      //     },
      //   },
      // },
      {
        name: "id",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/delivery-boy-list/add/"+id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
                {/* <span
                  onClick={this.deleteArea.bind(this, id)}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Delete"
                >
                  <i className="f-20 icofont icofont-delete-alt text-danger"></i>{" "}
                </span> */}
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
      download: false,
      pagination: false,
      fixedHeader:true,
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
                      <h4>Delivery Boy List</h4>
                    </div>
                  </div>
                  {/* <Link
                    to="/area/add"
                    className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                    data-modal="modal-13"
                  >
                    {" "}
                    <i className="icofont icofont-plus m-r-5"></i> Add Area
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
                        Delivery Person List
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
                      <div className="col">
                        <Link
                          to="/delivery-boy-list/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Delivery Person{" "}
                        </Link>

                        {/* <button
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </button> */}
                        <button
                          className="f-right bg-white b-none"
                          data-modal="modal-13"
                        >
                          <Tooltip
                            title="Download"
                            aria-label="download"
                            onClick={this.exportCSV.bind()}
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
                      </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                         
                            className="table-responsive"
                            data={this.props.delivery}
                            columns={columns}
                            options={options}
                          />
                        </MuiThemeProvider>
                        <nav aria-label="Page navigation example " className="display-flex float-right">
                          <ul class="pagination">
                          <li
                                class="page-item mx-2 py-2" 
                          >
                               Count : {this.state.datarange} - {this.state.dataLength}
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
    isLoading: state.delivery.isLoading,
    error: state.error,
    delivery: state.delivery.delivery_list,
    countFilterWise: state.delivery.countFilterWise,

  };
};

DeliveryBoyList.propTypes = {
  fetchdeliveryboyList: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchdeliveryboyList  })(
  DeliveryBoyList
);

