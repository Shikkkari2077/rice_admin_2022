import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Constant from "../../../Constant";
import Swal from "sweetalert2";
import "react-toggle/style.css"; // for ES6 modules
import Pagination from "react-js-pagination";

import Toggle from "react-toggle";
import MUIDataTable from "mui-datatables";
import { Tooltip ,Button,Switch} from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchguestuserList } from "../../../store/index";
import AlertDialog from "../../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
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

class GuestUserList extends React.Component {
  state = {open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    data: [],
    datarange:0,
    dataLength:50,
    hidedownload: false,
    Userss_data: [
      {
        id: "1",
        userName: "Jhon_Doe45",
        email: "johndoe@gmail.com",
        mobileNumber: "0000000456",
        firstName: "John",
        lastName: "Doe",
        customerId:'CU-455',
        deviceIp:'198.162.22.48',
        firstLogin:'12/1/2020 11:13:00',
        lastLogin:'12/1/2020 11:13:00',
        timeStamp:'11:13',
        customerType:'Registered',
        deviceToken:'0x0b8823aec3460e1724e795cba45d22e8...af8c09f971d0dabc',
        deviceType:'Mobile',
      },
    ],
    language_data: [],
  };
 
  handleStatusChange = (sid) => {
    var isChecked = $("#cattogBtn_" + sid);
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = "active";
    } else {
      var status = "inactive";
    }
    let newArray = this.state.User_list_data;
    var a = newArray.find((element) => {
      return element.id === sid;
    });
    a.status = status;
    console.log(newArray);
    this.setState({ User_list_data: newArray });
    Swal.fire("Update Status!", "Status has been updated.", "success");
  };

  componentWillMount() {
    this.getUsersList(this.state.datarange,this.state.dataLength);
  }
 
  
  getUsersList = (range,length) => {
   this.props.fetchguestuserList(range,length)
  };
 
  
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
    let newArray = this.state.Userss_data.filter((d) => {
      // console.log(d)
      let searchValue = d.id;
      return searchValue.indexOf(item) !== -1;
    });
    console.log(newArray);
    this.setState({
      downdata: [...this.state.downdata,newArray],
    });
    console.log(this.state.downdata)
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
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    this.getUsersList(range,dataLength);

    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
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
      {
        name: "id",
        label: 'Select',
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
          },
        },
      },
      {
        name: "defaultPinCode",
        label: "Default Pincode",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(defaultPinCode,tableMeta)=>{
            return defaultPinCode? defaultPinCode :'--  '
          }
        },
      // },{
      //   name: "firstLogin",
      //   label: "First Login",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      // {
      //   name: "lastLogin",
      //   label: "Last Login",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      // {
      //   name: "timeStamp",
      //   label: "Time Stamp",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      },{
        name: "type",
        label: "Customer Type",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(type,tableMeta)=>{
            return type? type :'Guest'
          }
        },
      },
      // {
      //   name: "deviceId",
      //   label: "Device Token",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender:(deviceToken,tableMeta)=>{
      //       return <div style={{width: "80px",
      //       height: "100%",
      //       whiteSpace: "initial",
      //       wordWrap: "break-word",}}>
      //         {deviceToken}
      //       </div>
      //     }
      //   },
      // },
      {
        name: "devicePlatform",
        label: "Device Type",
        options: {
          filter: true,
          sort: true,
        },
      },
      
    
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (status, tableMeta) => {
            return (
              <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} />  
              );
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
      //             to={"/users-customer/add/" + id}
      //             className="m-r-15 text-muted"
      //             data-toggle="tooltip"
      //             data-placement="top"
      //             title=""
      //             data-original-title="Edit"
      //           >
      //             <i className="f-20 icofont icofont-ui-edit text-custom"></i>
      //           </Link>
      //           {/* <span
      //             onClick={this.deleteCategory.bind(this, id)}
      //             className="m-r-15 text-muted"
      //             data-toggle="tooltip"
      //             data-placement="top"
      //             title=""
      //             data-original-title="Delete"
      //           >
      //             <i className="f-20 icofont icofont-delete-alt text-danger"></i>{" "}
      //           </span> */}
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
      selectableRows: false,
      download: false,
      confirmFilters: this.state.isLoading,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() =>  alert("Filter Applied !")}
            >
              Apply Filters
            </Button>
          </div>
        );
      },
      // callback that gets executed when filters are confirmed
   
    
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
    // const handleRowClick = 
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Customer Guest List</h4>
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
                      <li className="breadcrumb-item active">Customer Guest List</li>
                    </ul>
                  </div>
                </div>
                </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                  <div className="col">
                        {/* <Link
                          to="/users-customer/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Customer{" "}
                        </Link> */}
                        {/* <Link
                          to="/importData"
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link> */}
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
                     
                    <div className="dt-responsive table-responsive">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                        className="table-responsive"
                        data={this.props.user_list}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_list: state.customer.customer_list,
    countFilterWise: state.customer.countFilterWise,

    loginData: state.login,
    isLoading:state.customer.isLoading
  };
};
GuestUserList.propTypes = {
  fetchguestuserList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchguestuserList })(GuestUserList);
