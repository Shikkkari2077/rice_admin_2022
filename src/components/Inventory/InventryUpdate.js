import React from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import "react-toggle/style.css"; // for ES6 modules
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSellerProductAdminList } from "../../store/index";
import { withStyles } from "@material-ui/core/styles";
import AlertDialog from "../../common/DownloadOption";
import moment from "moment";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Tooltip, Button } from "@material-ui/core";
import {
  Switch,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
import "bootstrap-less";
import  "bootstrap-less/bootstrap/pagination.less";
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

class InventoryUpdate extends React.Component {
  state = {
    open: false,
    formVisvile: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    hidedownload: false,
    checked: false,
    
    sellerFilter: "380009",
    mrpFilter: false,
    setDateWise: null,
    setDateWiseC: null,
    dataLength: 50,
    datarange: 0,
    inv: "",
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
    handlePageChange(pageNumber) {
      console.log("active page is", pageNumber);
      console.log(pageNumber*50-50)
  
      const range=pageNumber*50-50
      const dataLength = this.state.dataLength;
      var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
   
      this.getSellerProductList(
        range,
        dataLength,
        seller,
      
      );
      this.setState({
        datarange: range,
      });
      this.setState({activePage: pageNumber});
      console.log(range,dataLength)
    }


  getSellerProductList = (range, length) => {
    this.props.fetchSellerProductAdminList(range, length,this.state.sellerFilter);
  };
  componentDidMount() {
    this.getSellerProductList(this.state.datarange, this.state.dataLength,this.state.sellerFilter);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      inv: nextProps.sellerProduct,
    });
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
    const datarange = this.state.datarange - 50;
    const dataLength = this.state.dataLength;
    this.getSellerProductList(datarange, dataLength,this.state.sellerFilter);

    this.setState({
      datarange: datarange,
    });
  }
  onChangePas(e) {
    e.preventDefault();
    const datarange = this.state.datarange + 50;
    const dataLength = this.state.dataLength;
    this.getSellerProductList(datarange, dataLength,this.state.sellerFilter);
    this.setState({
      datarange: datarange,
    });
  }
  updateDate(date) {
    const dateODorder = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return dateODorder;
  }
  handleSellerChange = (v) => {
    this.setState({
      sellerFilter: v,
    });
    var pincode=this.state.sellerFilter
      this.props.fetchSellerProductAdminList(this.state.range,this.state.length,pincode)
  };
  exportCSV() {
    var csvRow = [];
    var A = [
      [
        "Seller",
        "Product Name",
        "Product SKU",
        "Description",
        "Category",
        "Brand",
        "Unit",
        "In stock",
        "Selled Qnatity",
        "Threshold Quantity",
        "Upadte Date",
      ],
    ];
    var re = this.props.sellerProduct;
    for (var item = 0; item < re.length; item++) {
      A.push([
        re[item].Seller !==null ? re[item].Seller.name:"--",
        re[item].Product !==null? re[item].Product.name.replace(/,/g, "-") : "--",
        re[item].Product !==null? re[item].Product.sku : "--",
        re[item].Product !==null? re[item].Product.short_product_description.replace(/,/g, "-") : "--",
        re[item].Category !==null? re[item].Category.name : "--",
        re[item].Brand !==null? re[item].Brand.name : "--",
        re[item].singleOrderMaxQty!==null?re[item].singleOrderMaxQty: "--",
        re[item].inventory_stock!==null?re[item].inventory_stock:"--",
        re[item].inventory_selledStock?re[item].inventory_selledStock:"--",
        re[item].threshold_stock!==null?re[item].threshold_stock:"--",
        moment(re[item].updatedAt).format("YYYY-MM-DD HH:mm:ss"),
      ]);
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    A.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    console.log(csvContent);
    // var csvContent=csvContent.join('%0A');
    console.warn(csvContent);
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "testfile.csv";
    document.body.appendChild(a);
    a.click();
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
    const columnsA = [
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
        name: "product_name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product ? Product.name : "";
          // },
        },
      },
      {
        name: "product_sku",
        label: "Company SKU Code",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product ? Product.sku : "";
          // },
        },
      },
      {
        name: "short_product_description",
        label: "Short Desc.",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product ? Product.short_product_description : "";
          // },
        },
      },
      {
        name: "Category_name",
        label: "Category",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Category, tableMeta) => {
          //   return Category ? Category.name : "";
          // },
        },
      },
      {
        name: "Brand_name",
        label: "Brand",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Brand, tableMeta) => {
          //   return Brand ? Brand.name : "";
          // },
        },
      },
      // {
      //   name: "totalAttribute",
      //   label: "Total Attribute",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },{
      //   name: "availableAttribute",
      //   label: "Available Attribute",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },{
      //   name: "attributeTitle",
      //   label: "Attribute Title",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      {
        name: "Product",
        label: "Mininum Quantity Customer",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Product, tableMeta) => {
            return (
              <div
                style={{
                  width: "auto",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                -
              </div>
            );
          },
        },
      },
      {
        name: "singleOrderMaxQty",
        label: "Unit",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "inventory_stock",
        label: "In Stock",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (inventory_stock, tableMeta) => {
          //   return inventory_stock;
          // },
        },
      },
      {
        name: "inventory_selledStock",
        label: "Selled Quantity",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (inventory_selledStock, tableMeta) => {
          //   return inventory_selledStock;
          // },
        },
      },
      {
        name: "threshold_stock",
        label: "Thresold Quantity",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "updatedAt",
        label: "Upadte Date",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (updatedAt, tableMeta) => {
            return this.updateDate(updatedAt);
          },
        },
      },
      {
        name: "product_available",
        label: "Status",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (product_available, tableMeta) => {
            return (
              <AntSwitch
                checked={product_available == 1  ? true : false}
                name="checkedC"
                value={product_available == 1  ? true : false}
              />
            );
          },
        },
      },
      {
        name: "sellerProduct_id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/inventory/edit/" + id}
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
    // const columnsA = [
    //   {
    //     name: "id",
    //     label: 'Select',
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
    //   {
    //     name: "Product",
    //     label: "Name",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender:(Product,tableMeta)=>{
    //         return Product?Product.name:''
    //       }
    //     },
    //   },
    //   {
    //     name: "Product",
    //     label: "Company SKU Code",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender:(Product,tableMeta)=>{
    //         return Product?Product.sku:''
    //       }
    //     },
    //   },
    //   {
    //     name: "PinCodeSeller",
    //     label: "Pincode",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender:(PinCodeSeller,tableMeta)=>{
    //         return PinCodeSeller?PinCodeSeller.PinCode.code:''
    //       }
    //     },
    //   },{
    //     name: "Product",
    //     label: "Short Desc.",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender:(Product,tableMeta)=>{
    //         return Product?Product.short_product_description:''
    //       }
    //     },
    //   },{
    //     name: "Product",
    //     label: "Category",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender:(Product,tableMeta)=>{
    //         return Product?Product.ProductCategories[0].Category.name:''
    //       }
    //     },
    //   },
    //   {
    //     name: "Product",
    //     label: "Brand",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender:(Product,tableMeta)=>{
    //         return Product?Product.Brand.name:''
    //       }
    //     },
    //   },
    //   // {
    //   //   name: "totalAttribute",
    //   //   label: "Total Attribute",
    //   //   options: {
    //   //     filter: true,
    //   //     sort: true,
    //   //   },
    //   // },{
    //   //   name: "availableAttribute",
    //   //   label: "Available Attribute",
    //   //   options: {
    //   //     filter: true,
    //   //     sort: true,
    //   //   },
    //   // },{
    //   //   name: "attributeTitle",
    //   //   label: "Attribute Title",
    //   //   options: {
    //   //     filter: true,
    //   //     sort: true,
    //   //   },
    //   // },
    //    {
    //     name: "Product",
    //     label: "Mininum Quantity Customer",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender: (Product, tableMeta) => {
    //         return (
    //           <div
    //             style={{
    //               width: "auto",
    //               height: "100%",
    //               whiteSpace: "initial",
    //               wordWrap: "break-word",
    //             }}
    //           >
    //             -
    //           </div>
    //         );
    //       },
    //     },
    //   },{
    //     name: "singleOrderMaxQty",
    //     label: "Unit",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },
    //   {
    //     name: "inventory",
    //     label: "In Stock",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender:(inventory,tableMeta)=>{
    //         return inventory.inventory_stock
    //       }
    //     },
    //   },{
    //     name: "inventory",
    //     label: "Selled Quantity",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender:(inventory,tableMeta)=>{
    //         return inventory.inventory_selledStock
    //       }
    //     },
    //   },{
    //     name: "threshold_stock",
    //     label: "Thresold Quantity",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },{
    //     name: "updatedAt",
    //     label: "Upadte Date",
    //     options: {
    //       filter: false,
    //       sort: true,
    //       customBodyRender:(updatedAt, tableMeta)=>{
    //         return this.updateDate(updatedAt)
    //       },
    //     },
    //   },
    //   {
    //     name: "available",
    //     label: "Status",
    //     options: {
    //       filter: true,
    //       sort: false,
    //       customBodyRender: (available, tableMeta) => {
    //         return (
    //           <AntSwitch checked={available === true ? true : false} name="checkedC" value={available} />
    //         );
    //       },
    //     },
    //   },
    //   {
    //     name: "id",
    //     label: "Action",
    //     options: {
    //       filter: false,
    //       sort: false,
    //       customBodyRender: (id, tableMeta) => {
    //         return (
    //           <div>
    //             <Link
    //               to={"/inventory/edit/" + id}
    //               className="m-r-15 text-muted"
    //               data-toggle="tooltip"
    //               data-placement="top"
    //               title=""
    //               data-original-title="Edit"
    //             >
    //               <i className="f-20 icofont icofont-ui-edit text-custom"></i>
    //             </Link>
    //           </div>
    //         );
    //       },
    //     },
    //   }
    // ];
    const options = {
      filter: false,
      viewColumns: false,
      responsive: "scrollMaxHeight",
      search: false,
      print: false,
      pagination: false,
      download: false,
      selectableRows: false,
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
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Inventory Update</h4>
                    </div>
                  </div>
                  {/* {localStorage.getItem("superadminad_role") === "shop" ? ( */}
                  <div className="f-right">
                    {/* <Link
                      to="/"
                      className="btn btn-sm btn-outline-dark waves-effect waves-light d-inline-block md-trigger ml-3"
                      data-modal="modal-13"
                    >
                      {" "}
                      <i className="icofont icofont-arrow-left m-r-5"></i> Back{" "}
                    </Link> */}
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
                      <li className="breadcrumb-item active">
                        Inventory Update
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
                          {localStorage.getItem('role')==='admin'?
                            <FormControl
                          variant="outlined"
                          className="col-sm-2 mx-1"
                        >
                          <InputLabel htmlFor="outlined-age-native-simple" style={{fontSize:'12px'}}>
                          Seller 
                          </InputLabel>
                          <Select
                            native
                            name="sellerFilter"
                            value={this.state.sellerFilter}
                            onChange={(val) =>
                              this.handleSellerChange(val.target.value)

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
                              <option aria-label="None" value={"ecef79c0-4b56-11eb-b3a4-47f05d7692ee"} >S R FOODS</option>
                              <option aria-label="None" value={"ec76ee60-4b56-11eb-b3a4-47f05d7692ee"} >Umiya Oil Depo </option>
                              {/* {this.props.seller_list ?
                              this.props.seller_list.map(d=> 
                                <option value={d.id}>{d.name}</option>
                              )
                              :"No Seller"
                              } */}
                            
                          </Select>
                        </FormControl>
                          :''}
                        </div>
                        <div className="col-sm-3">
                          {!this.state.hidedownload ? (
                            <button
                              className="f-right bg-white b-none"
                              data-modal="modal-13"
                            >
                              <Tooltip
                                title="Download"
                                aria-label="download"
                                onClick={() => {
                                  this.exportCSV();
                                }}
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
                          )}
                        </div>
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.sellerProduct}
                            columns={columnsA}
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
                           {this.props.sellerProduct.length < 49 ? 
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
                                 totalItemsCount={this.props.productCount}
                                 pageRangeDisplayed={3}
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
    productCount:state.sellerProduct.count,
    sellerProduct:state.sellerProduct.sellerProduct,
    isLoading: state.sellerProduct.isLoading,
    loginData: state.login,
  };
};
InventoryUpdate.propTypes = {
  fetchSellerProductAdminList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchSellerProductAdminList })(
  InventoryUpdate
);
