/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import Loader from "../../Loader";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";
import $ from "jquery";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSellerProductList } from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Select,
  Button,
} from "@material-ui/core";
import { TablePagination } from "@material-ui/core";
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

class SellerProductListing extends React.Component {
  state = {
    open: false,
    formVisvile: false,
    hideOld: false,
    dataLength: 25,
    datarange: 0,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    hidedownload: false,
    checked: false,
    ptcFilter: false,
    ptdFilter: false,
    priceFilter: false,
    expiryFilter: false,
    mininumQuantityCustomerFilter: false,
    setDateWise: null,
  };

  componentWillMount() {
    this.getProductList(this.state.datarange, this.state.dataLength);
  }
  getProductList(range, length) {
    this.props.fetchSellerProductList(range, length);
  }
  handleStatusChange = (sid) => {
    var isChecked = $("#product_status_" + sid);
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = true;
    } else {
      var status = false;
    }
    var that = this;
    var data = new URLSearchParams();
    // this.setState({ isSaving: true });
    data.append("status", status);
    data.append("ProductId", sid);
    fetch(Constant.getAPI() + "/product/statusChange", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
      },
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          Swal.fire("Update Status!", "Status has been updated.", "success");
          that.getProductList();
        } else {
          Swal.fire({
            title: "Something went wrong. Try again after some Time.!",
            icon: "error",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveStacked: {
            maxHeight: "40vh",
            overflowX: "none",
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
 
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  
  };
  handleFilterSubmit = (applyFilters) => {
    let filterList = applyFilters;
    console.log("applied");
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };

  onChangePa(e) {
    e.preventDefault();
    const  datarange= this.state.datarange - 25
    const dataLength= this.state.dataLength 
    this.getProductList(datarange,dataLength);
    
    this.setState({
      datarange: datarange ,
      dataLength: dataLength ,
    });
    
  }
  onChangePas(e) {
    e.preventDefault();
    const  datarange= this.state.datarange +25
    const dataLength= this.state.dataLength 
    this.getProductList(datarange,dataLength);
    this.setState({
      datarange: datarange ,
      dataLength:dataLength ,
    });
  }
  render() {
    const columnSeller = [
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
        name: "name",
        label: "Product Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "sku",
        label: "Company SKU Code",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "barcode",
        label: "Barcode",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "short_product_description",
        label: "Short Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "description",
        label: "Long Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "ProductCategories",
        label: "Category",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (ProductCategories, tableMeta) => {
            return ProductCategories ? ProductCategories[0].Category.name : "";
          },
        },
      },
      // {
      //   name: "SubCategoryId",
      //   label: "Sub Category",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (SubCategoryId, tableMeta) => {
      //       return SubCategoryId ? SubCategoryId : "--";
      //     },
      //   },
      // },
      {
        name: "Brand",
        label: "Brand",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Brand, tableMeta) => {
                  return Brand ? Brand.name : "--";
                },
        },
      },
      {
        name: "product_mrp",
        label: "MRP",
        options: {
          filter: true,
          sort: true,
         
        },
      },

      // {
      //   name: "available",
      //   label: "Available Attribute",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      // {
      //   name: "attributeTitle",
      //   label: "Attribute Title",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      {
        name: "minimum_qty_customer",
        label: "Mininum Quantity Customer",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (mininumQuantityCustomer, tableMeta) => {
            return (
              <div
                style={{
                  width: "auto",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                {mininumQuantityCustomer}
              </div>
            );
          },
        },
      },

      {
        name: "sgst",
        label: "SGST",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "cgst",
        label: "CGST",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "igst",
        label: "IGST",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "id",
      //   label: "Edit Price",
      //   options: {
      //     filter: false,
      //     sort: true,
      //     customBodyRender: (id, tableMeta) => {
      //       return (
      //         <div>
      //           <Link
      //             to={"/products/add/" + id}
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
    ];

    const options = {
      filter: false,
      viewColumns: false,
      responsive: "scrollMaxHeight",
      pagination: false,
      search: false,
      print: false,
      // rowsPerPage: this.state.dataLength,
      rowsPerPageOptions: [10, 20, 25],
      download: false,
      
      selectableRows: false,
      page: 1,
      count: this.props.product_seller.length,
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
              Loading data..!
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
    console.log("selPro", this.props);

    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Product List</h4>
                    </div>
                  </div>

                  <div className="f-right"></div>
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">Product List</li>
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
                            data={this.props.product_seller}
                            columns={columnSeller}
                            options={options}
                          />
                        </MuiThemeProvider>
                        <nav aria-label="Page navigation example " className="display-flex float-right">
                          <ul class="pagination">
                          <li
                                class="page-item mx-2 py-2" 
                          >
                               Count : {this.state.datarange}-{this.state.datarange+this.state.dataLength}
                              </li>
                            {this.state.datarange > 20 ? (
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
                            <li
                              class="page-item btn" 
                              onClick={this.onChangePas.bind(this)}
                            >
                             <i class="icofont icofont-rounded-right" ></i>
                            </li>
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
    isLoading: state.sellerProduct.isLoading,
    loginData: state.login,
    product_seller: state.sellerProduct.sellerProduct_list,
  };
};

SellerProductListing.propTypes = {
  fetchSellerProductList: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  fetchSellerProductList,
})(SellerProductListing);
