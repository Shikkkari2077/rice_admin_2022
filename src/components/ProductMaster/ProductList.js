/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import "react-toggle/style.css"; // for ES6 modules

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from 'react-js-pagination'
import {
  fetchProductList,
  fetchSellerProductList,
  uploadProductList,
} from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
 
  FormControl,
  Switch,

  Button,
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

class ProductList extends React.Component {
  state = {
    open: false,
    formVisvile: false,
    hideOld: false,
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
    datarange: 0,
    dataLength: 50,
  };
 
  handlePageChange(pageNumber) {
    console.log(localStorage.getItem('sellerProductCount'))
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)

    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
 
    this.getProductList(range, dataLength);
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
  }
  componentWillMount() {
    this.getProductList(this.state.datarange, this.state.dataLength);
  }
  getProductList(datarange, dataLength,sku,name) {
    if (localStorage.getItem("role") === "seller") {
      this.props.fetchSellerProductList(datarange, dataLength,sku,name);
      console.log(this.props.product_seller);
    }
    if (localStorage.getItem("role") === "admin") {
      this.props.fetchProductList(datarange, dataLength,sku,name);
    }
    if (localStorage.getItem("role") === "other") {
      this.props.fetchProductList(datarange, dataLength,sku,name);
    }
  }
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

  openModel = () => {};
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

  handleStatus = (status, sid) => {
    this.props.uploadProductList(status, sid,
      {
        range:this.state.datarange,
        length:this.state.dataLength,
        sku:this.state.ProductSKU,
        name:this.state.ProductName
      });
  };


  handleSearchinput(r){
    this.setState({
      search:r.target.value
    })
   }
   oncancelButton(){
  
    this.getProductList(0, 50);

    this.setState({
      cancelButton:false,
      search:"",
      ProductSKU:"",
      ProductName:"",
    });

  }
   onsearchButton=()=>{
    var ProductSKU=this.state.search;

    this.setState({
      cancelButton:true,
      ProductName:"",
      ProductSKU,
    })

   this.getProductList(0, 50,ProductSKU);
}
  onsearchNameButton(){
    var ProductName=this.state.search;

    this.setState({
      cancelButton:true,
      ProductName,
      ProductSKU:"",
    })
    this.getProductList(0, 50,"",ProductName);

    
  }

 render() {
    const AntSwitch = withStyles((theme) => ({
      root: {
        width: 28,
        height: 16,
        padding: 0,
        display: "flex",
      },
      switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        "&$checked": {
          transform: "translateX(12px)",
          color: theme.palette.common.white,
          "& + $track": {
            opacity: 1,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
          },
        },
      },
      thumb: {
        width: 12,
        height: 12,
        boxShadow: "none",
      },
      track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
      },
      checked: {},
    }))(Switch);

    const columnSeller = [
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
        name: "shortDescription",
        label: "Short Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "longDescription",
        label: "Long Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "CategoryId",
        label: "Category",
        options: {
          filter: true,
          sort: true,
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
        name: "mrp",
        label: "MRP",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customBodyRender: (mrp, tableMeta) => {
            return <div>{mrp}</div>;
          },
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
            return <div>{mininumQuantityCustomer}</div>;
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

      {
        name: "id",
        label: "Edit Price",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/products/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
              </div>
            );
          },
        },
      },
    ];


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
        name: "SKU",
        label: "Company SKU Code",
        options: {
          filter: true,
          sort: true,
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
      {name: "ProductCategories",
      label: "Category",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (ProductCategories, tableMeta) => {
          return ProductCategories
            ? ProductCategories[0]
              ? ProductCategories[0].CategoryId
                ? ProductCategories[0].Category.name
                : ""
              : ""
            : "";
        },
      },
    },
      
      {
        name: "shortDescription",
        label: "Short Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "longDescription",
        label: "Long Desc.",
        options: {
          filter: true,
          sort: true,
        },
      },
      
     
      {
        name: "Brand",
        label: "BrandCode",
        options: {
          filter: true,
          sort: true,
    customBodyRender: (Brand, tableMeta) => {
      return Brand ? Brand.brandCode : "--";
    },
        },
      },

      {
        name: "Brand",
        label: "Brand Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Brand, tableMeta) => {
            return Brand ? Brand.name : "--";
          },
        },
      },
      {
        name: "packSize",
        label: "PackSize",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "BaseUOM",
      //   label: "BaseUOM",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (BaseUOM, tableMeta) => {
      //       return BaseUOM.name?BaseUOM.name:"-"
      //     },
      //   },
      // },
      {
        name: "UOMs",
        label: "UOMs",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (UOMs, tableMeta) => {
            return <div>
                  {UOMs.length>0?UOMs.map((uom,i)=>(
                  <>
                  <span>UOM {i+1} - {uom.name}</span>
                  <br />
                  </>)):null}
                </div>
          },
        },
      },
      // {
      //   name: "UOMs",
      //   label: "UOM 2",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (UOMs, tableMeta) => {
      //       return UOMs[1].name?UOMs[1]?.name:"-"
      //     },
      //   },
      // },
      // {
      //   name: "UOMs",
      //   label: "UOM 3",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (UOMs, tableMeta) => {
      //       return UOMs[2].name?UOMs[2].name:"-"
      //     },
      //   },
      // },
  
      // {
      //   name: "UOMs",
      //   label: "UOM 1 Conversion",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (UOMs, tableMeta) => {
      //       return UOMs[0].name && UOMs[0].ProductUOM ?UOMs[0].ProductUOM.conversionRate:"-"
      //     },
      //   },
      // },
      // {
      //   name: "UOMs",
      //   label: "UOM 2 Conversion",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (UOMs, tableMeta) => {
      //       return UOMs[1].name && UOMs[1].ProductUOM ?UOMs[1].ProductUOM.conversionRate:"-"
      //     },
      //   },
      // },
      // {
      //   name: "UOMs",
      //   label: "UOM 3 Conversion",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (UOMs, tableMeta) => {
      //       return UOMs[2].name && UOMs[2].ProductUOM ?UOMs[2].ProductUOM.conversionRate:"-"
      //     },
      //   },
      // },
    
      {
        name: "materialGroup",
        label: "Material Group",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "materialType",
        label: "Material Type",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "grossWeight",
        label: "GrossWeight",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "netWeight",
        label: "NetWeight",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "Sub Category",
      //   label: "Sub Category",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      // {
      //   name: "Process",
      //   label: "Process",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
    
      // {
      //   name: "UOMs",
      //   label: "UOM4",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (UOMs, tableMeta) => {
      //       return UOMs[3].name?UOMs[3].name:"-"
      //     },
      //   },
      // },
      // {
      //   name: "UOMs",
      //   label: "UOM4 Conversion",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (UOMs, tableMeta) => {
      //       return UOMs[3].name && UOMs[3].ProductUOM ?UOMs[3].ProductUOM.conversionRate:"-"
      //     },
      //   },
      // },

      {
        name: "available",
        label: "Status",
        options: {
          display:localStorage.getItem('role') !=='seller'?true:false,
          filter: true,
          sort: true,
          customBodyRender: (available, tableMeta) => {
            return (
            
              <div>
              <AntSwitch
                checked={available == true ? true : false}
                onChange={this.handleStatus.bind(this,!available,tableMeta.rowData[0])}
              />
              </div>
            );
          },
        },
      },

      

  
      // {
      //   name: "available",
      //   label: "Status",
      //   options: {
      //     desplay:localStorage.getItem('role') =='other'?true:false,
      //     filter: true,
      //     sort: false,
      //     customBodyRender: (available, tableMeta) => {
      //       return (
      //         <span
      //           style={{
      //             background: "#3a424f",
      //             color: "white",
      //             textAlign: "center",
      //             borderRadius: "4px",
      //             padding: ".9px",
      //             marginLeft: "7px",
      //             wordWrap: "normal",
      //             fontSize:"12px"
      //           }}
      //         >
      //           {available == 0?"Inactive":"Active"}
      //         </span>
      //       );
      //     },
      //   },
      // },

      // {
      //   name: "id",
      //   label: "Action",
      //   options: {
      //     display:localStorage.getItem('ProductEdit')==true?true:false,
      //     filter: false,
      //     sort: false,
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
      search: true,
      print: false,
      pagination: false,
      download: false,
      fixedHeader: true,
      scrollMaxHeight: "400px",
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

      selectableRows: false,
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
    const imports = "product";
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
                  {/* {localStorage.getItem("superadminad_role") === "shop" ? ( */}
                  <div className="f-right">
                    <Link
                        to="/products/add"
                        className="btn btn-sm btn-dark waves-effect waves-light d-inline-block md-trigger ml-3"
                        data-modal="modal-13"
                      >
                        {" "}
                        <i className="icofont icofont-arrow-left m-r-5"></i> Add Product{" "}
                      </Link>
                    <Link
                      to="/"
                      className="btn btn-sm btn-outline-dark waves-effect waves-light d-inline-block md-trigger ml-3"
                      data-modal="modal-13"
                    >
                      {" "}
                      <i className="icofont icofont-arrow-left m-r-5"></i> Back{" "}
                    </Link>
                  </div>
                  {/* ) : null} */}
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
                  <i style={{fontSize:"9px",fontStyle:"none"}}  >By Product Sku</i> 
                                  </span>
                                  <span 
                 className="btn btn-dark py-1 mx-3 mt-2"
                 onClick={this.onsearchNameButton.bind(this)}>
                                  <i 
                  class="icofont icofont-search"
                  >
                  </i>
                  <i style={{fontSize:"9px"}}  >By Product Name</i> 
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
                        
                        {/* <Link
                          to="/products/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Product{" "}
                        </Link> */}
                        {localStorage.getItem("ProductImport") == "true" ? (
                          <Link
                            to={"/importData/" + imports}
                            className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            Import
                          </Link>
                        ) : null}
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <a // onClick={}
                              download
                              href={`${Constant.getAPI()}/product/download`}
                              target="_blank"
                            >
                              <i
                                className="icofont icofont-download-alt"
                                style={{
                                  fontSize: "30px",
                                  color: "grey",
                                }}
                              ></i>
                            </a>
                         
                          </button>
                      </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.product_list}
                            columns={columns}
                            //columns={[]}
                            options={options}
                          />
                        </MuiThemeProvider>
                        <nav
                          aria-label="Page navigation example "
                          className="display-flex float-right"
                        >
                          <ul class="pagination">
                            <li class="page-item mx-2 py-2">
                              Count : {this.state.datarange}-
                              {this.state.datarange + this.state.dataLength}
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
    countFilterWise:state.product.countFilterWise,
    product_list: state.product.product_list,
    isLoading: state.product.isLoading,
    loginData: state.login,
    product_seller: state.product.sellerProduct,
  };
};

ProductList.propTypes = {
  fetchProductList: PropTypes.func.isRequired,
  fetchSellerProductList: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  fetchProductList,
  fetchSellerProductList,
  uploadProductList,
})(ProductList);
