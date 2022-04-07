import React from "react";
import { Link } from "react-router-dom";
// import $ from "jquery";
// import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchSellerPaytm,updateSellerPaytmstatus} from "../../store/index";
import { Tooltip, Button,Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
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
class SellerPaymentList extends React.Component {
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
 
  componentWillMount() {
    this.props.fetchSellerPaytm()
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
          width: "100px",
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
  handleStatus = (e,id) => {
   console.log(id,e)
   Swal.fire({
    title: "Are You Sure",
    icon: "warning",
    text: "",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    showCancelButton: true,
    
    confirmButtonText: 'Confirm'
  }).then((value) => {
 if (value.isConfirmed) {
     this.props.updateSellerPaytmstatus(id,!e)
    }
  })
}
// componentWillUnmount(){
//     localStorage.setItem('PaymentLogin','false')
// }
 
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
        name: "Seller",
        label: "Seller Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Seller)=>{
              return(
                  Seller.name
              )

          }
        },
      },  {
        name: "Seller",
        label: "Owner Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Seller)=>{
              return(
                  Seller.contact_person
              )

          }
        },
      },{
        name: "Seller",
        label: "Phone Number",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Seller)=>{
              return(
                  Seller.phoneNumber
              )

          }
        },
      }, {
        name: "Seller",
        label: "Email",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Seller)=>{
              return(
                  Seller.email
              )

          }
        },
      },
      {
        name: "Seller",
        label: "Location",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Seller)=>{
              return(
                  Seller.location
              )

          }
        },
      },
      {
        name: "Seller",
        label: "GST Details",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Seller)=>{
              return(
                  Seller.GST_details
              )

          }
        },
      },
     
    
      {
        name: "status",
        label: "Paytm Status",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (status, tableMeta) => {
              // var id = tableMeta.rowData[0];
              //  console.log(tableMeta.rowData[0],id);
            return (
           <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} 
           onChange={this.handleStatus.bind(this,status,tableMeta.rowData[7])} 
           />   
  
            );
          },
        },
      },  
    
      {
        name: "SellerId",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (SellerId, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/SellerPaytmControl/add/" + SellerId}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>

                {/* <span
                  onClick={this.templateDelete.bind(this, id)}
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
                {localStorage.getItem("PaymentLogin")=='true'?

        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Online Pay Manage</h4>
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
               <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">Online Pay Manage</li>
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
                      {localStorage.getItem('role')==="admin"?
                      <div>
                        <Link
                          to="/SellerPaytmControl/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >

                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Seller Paytm{" "}
                        </Link>
                       
                        </div>
                        :null}
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
                          data={this.props.seller}
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
        :   window.location.href = "#/Login/SellerPaytmControl"
    }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    countFilterWise: state.sellerPaytm.countFilterWise,
     seller: state.sellerPaytm.seller_list,
    error: state.sellerPaytm.error,
    isLoading:state.sellerPaytm.isLoading
  };
};
SellerPaymentList.propTypes = {
    fetchSellerPaytm: PropTypes.func.isRequired,
    updateSellerPaytmstatus:PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {fetchSellerPaytm,updateSellerPaytmstatus})(SellerPaymentList);