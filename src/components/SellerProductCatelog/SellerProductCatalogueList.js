import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Pagination from "react-js-pagination";
import "bootstrap-less";
import  "bootstrap-less/bootstrap/pagination.less";

import {
  Tooltip,
  FormControl,
  Select,
  Switch,
  Button,
  InputLabel,
} from "@material-ui/core";

import {
  fetchSellerProductList,
  fetchcityList,
  updateSellerProduct,
  fetchPincodeList,
  fetchstateList,
  fetchSellerList,
} from "../../store/index";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

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

class SellerProductCatalogueList extends React.Component {
  state = {
    cancelButton:false,
    activePage: 1,
    open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    hidedownload: false,
    downdata: [],
    checked: false,
    ptcFilter: false,
    ptdFilter: false,
    priceFilter: false,
    dataLength: 50,
    datarange: 0,
    deliverychargeFilter: false,
    startBatchDate: "",
    endBatchDate: "",
    search:"",
  };
  handlecanceldate() {
    this.setState({
      startBatchDate: "",
      endBatchDate: "",
      dateDisplays: "",
      dateDisplaye: "",
    });
  }
  handledate = (event, picker) => {
    var startBatchDate = Date.UTC(
      picker.startDate.format("YYYY"),
      picker.startDate.format("MM") - 1,
      picker.startDate.format("DD")
    );
    var endBatchDate = Date.UTC(
      picker.endDate.format("YYYY"),
      picker.endDate.format("MM") - 1,
      picker.endDate.format("DD")
    );
    
    this.setState({
      startBatchDate,
      endBatchDate,
      dateDisplays: picker.startDate.format("DD-MM-YYYY"),
      dateDisplaye: picker.endDate.format("DD-MM-YYYY"),
    });
  };
  handleSearchinput(r){
   this.setState({
     search:r.target.value
   })
  }
  oncancelButton(){
    var start_date = this.state.start_date;
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
    var seller =
      this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    var startBatchDate = this.state.startBatchDate;
    var endBatchDate = this.state.endBatchDate;
    this.props.fetchSellerProductList(
      0, //range
      50, //length
      seller,
      cityId,
      pincode,
      stateId,
      startBatchDate,
      endBatchDate
    );
    this.setState({
      cancelButton:false,
      search:"",
    });
   
  }
  handleActiveChange(productId,sellerId,e){
    var data={
      productId:productId,
      sellerId:sellerId,
      available:e.target.checked?"1":"0",


    }
    let sellerPincode={
      range:this.state.datarange,
      length:this.state.dataLength,
      seller:this.state.sellerFilter,
      cityId:this.state.cityFilter,
      pincode:this.state.pincodeFilter,
      state:this.state.stateFilter,
      startDate:this.state.startBatchDate,
      endDate:this.state.endBatchDate,
      productSKU:this.state.productSKU
    }

    this.props.updateSellerProduct(data,sellerPincode)

  }
  onsearchButton=()=>{
    this.setState({
      cancelButton:true,
    })
    var productSKU=this.state.search;
    // var start_date = this.state.start_date;
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
    var seller =
      this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    var startBatchDate = this.state.startBatchDate;
    var endBatchDate = this.state.endBatchDate;
    this.props.fetchSellerProductList(
      0, //range
      50, //length
      seller,
      cityId,
      pincode,
      stateId,
      startBatchDate,
      endBatchDate,
      productSKU
    )

  }
  onGo = () => {
    var productSKU=this.state.search;
    var start_date = this.state.start_date;
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    var startBatchDate = this.state.startBatchDate;
    var endBatchDate = this.state.endBatchDate;
    this.props.fetchSellerProductList (
      0, //range
      50, //length
      seller,
      cityId,
      pincode,
      stateId,
      startBatchDate,
      endBatchDate,
      productSKU

    );
    this.setState({
      dataLength: 50,
      datarange: 0,
    });
  };
  handleCityChange = (v) => {
    this.setState({
      cityId: v,
    });
  };
  handlepincodeChange = (v) => {
    this.setState({
      pincode: v,
    });
  };
  handleStateChange(v) {
    this.setState({
      stateId: v,
    });
  
  }
  handleSellerChange = (v) => {
    this.setState({
      sellerFilter: v,
    });
    var pincode = this.state.sellerFilter;
  };
  getDate = (date) => {
   
    const dateODorder = moment(JSON.parse(date)).format("YYYY-MM-DD");
    return dateODorder;
  };
  
  getSellerProductList = (
    range,
    length,
    seller,
    cityId,
    pincode,
    stateId,
    startBatchDate,
    endBatchDate
  ) => {
    this.props.fetchSellerProductList(
      range,
      length,
      seller,
      cityId,
      pincode,
      stateId,
      startBatchDate,
      endBatchDate
    );
  };
  componentWillMount() {
    this.getSellerProductList(this.state.datarange, this.state.dataLength);
    if(localStorage.getItem('role')!=='seller'){
      if(this.props.pincode_list == undefined || this.props.pincode_list == null || this.props.pincode_list.length ==0){
        this.props.fetchPincodeList("",0,2500)
      }
      if(this.props.city_list == undefined || this.props.city_list == null || this.props.city_list.length ==0){
        this.props.fetchcityList(0, 25500);
      }
      if(this.props.seller_list == undefined || this.props.seller_list == null || this.props.seller_list.length ==0){
        this.props.fetchSellerList(0, 2500,'');
      }
      if(this.props.state_list == undefined || this.props.state_list == null || this.props.state_list.length ==0){
        this.props.fetchstateList(0, 25500);
      }

    }
  }

  componentWillReceiveProps(nextProps){
    console.log('Props',nextProps.sellerProduct_list);
    this.setState({sellerProduct_list:nextProps.sellerProduct_list})
  }

  // handleSelect = (e, id) => {
  //   const item = e.target.name;
  //   const isChecked = e.target.checked;
  //   this.setState((prevState) => ({
  //     hidedownload: !this.state.hidedownload,
  //     checkedItems: prevState.checkedItems.set(item, isChecked),
  //   }));
  //   let newArray = [];
  //   if (this.props.sellerProduct !== undefined) {
  //     newArray = this.props.sellerProduct.filter((d) => {
  //       let searchValue = d.sellerProduct_id;
  //       return searchValue.indexOf(item) !== -1;
  //     });
  //   }
  //   if (isChecked === true) {
  //     this.setState({
  //       downdata: [...this.state.downdata, newArray],
  //     });
   
  //   } else {
  //     var array = this.state.downdata;
  //     var index;
  //     for (let i = 0; i < this.state.downdata.length; i++) {
  //       var temp = this.state.downdata[i];
  //       for (let j = 0; j < temp.length; j++) {
  //         if (temp[j].id === newArray[0].id) {
  //           index = i;
  //           break;
  //         }
  //       }
  //     }
  //     if (index !== -1) {
  //       array.splice(index, 1);
  //     }
  //     this.setState({ downdata: array });

  //   }
    
  // };

  handlePageChange(pageNumber) {
   

    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    var productSKU=this.state.search;

    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    var startBatchDate = this.state.startBatchDate;
    var endBatchDate = this.state.endBatchDate;
    this.getSellerProductList(
      range,
      dataLength,
      seller,
      cityId,
      pincode,
      stateId,
      startBatchDate,
      endBatchDate,
      productSKU

    );
    this.setState({
      datarange: range,
      activePage: pageNumber
    });
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

  // openModel = () => {
  //   this.setState({
  //     open: true,
  //   });
  // };
  // handleClose = () => {
  //   this.setState({
  //     open: false,
  //   });
  // };
  // selectall = (e) => {
  //   this.setState({
  //     hidedownload: !this.state.hidedownload,
  //     checkedItems: new Map(),
  //     hideOld: !this.state.hideOld,
  //   });
  // };
  // selctSingle = (e, id) => {
 
  //   const item = e.target.name;
  //   const isChecked = e.target.checked;
  //   this.setState((prevState) => ({
  //     hidedownload: !this.state.hidedownload,
  //     checkedItems: prevState.checkedItems.set(item, isChecked),
  //   }));
   
  // };

  // handleChange = (e, id) => {
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
  handleFilterSubmit = (applyFilters) => {
    console.log("applied");
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };

  exportCSV() {
    console.log("here")
    if(localStorage.getItem('role')!=='seller'){
    window.location.href = `${Constant.getAPI()}/sellerproduct/download?sellerId=${
      this.state.sellerFilter !== "All"&& this.state.sellerFilter!== undefined ? this.state.sellerFilter : ""
    }&cityId=${
      this.state.cityId !== "All" && this.state.cityId !== undefined ? this.state.cityId : ""
    }&pincode=${
      this.state.pincode !== "All" && this.state.pincode !== undefined ? this.state.pincode : ""
    }&startBatchDate=${
      this.state.startBatchDate !== undefined ? this.state.startBatchDate : ""
    }&endBatchDate=${
      this.state.endBatchDate !== undefined ? this.state.endBatchDate : ""
    }&stateId=${
      this.state.stateId !== "All" && this.state.stateId !== undefined ? this.state.stateId : ""
    }&productSKU=${
      this.state.search !== undefined ? this.state.search : ""
    }&subCategoryId=${
      this.state.categoryfilter !== undefined ? this.state.categoryfilter : ""
    }&adminId=${
      localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''
    }`;
  }
  else{
    console.log(
      `${Constant.getAPI()}/sellerproduct/download?sellerId=${
        localStorage.getItem('seller_id')
      }&productSKU=${
        this.state.search !== undefined ? this.state.search : ""
      }&subCategoryId=${
        this.state.categoryfilter !== undefined ? this.state.categoryfilter : ""
      }`
    )
    window.location.href = `${Constant.getAPI()}/sellerproduct/download?sellerId=${
      localStorage.getItem('seller_id')
    }&productSKU=${
      this.state.search !== undefined ? this.state.search : ""
    }&subCategoryId=${
      this.state.categoryfilter !== undefined ? this.state.categoryfilter : ""
    }`;
  }
   
  }
  exportCSVS(){
    var csvRow = [];
    var A = [
      [
        "Company SKU Code",
        "Company SellerID",
        "MRP",
        "PTC",
        "PTD",
        "Inventory",

        "Thresold",
        "Single Order Max. Qty",
        "Delivery Charge",
        "Delivery Time",
        "Batch Id",
        "Batch Number",
        "Batch Date",
      ],
    ];
    var sellerProduct = this.state.downdata;
    console.log(this.state.downdata)
    for (let i = 0; i < sellerProduct.length; i++) {
      for(let j=0;j<1;j++){
 
   A.push([
        sellerProduct[i][j].product_sku,
        sellerProduct[i][j].Seller_unique_identifier,
        sellerProduct[i][j].MRP,
        sellerProduct[i][j].SP_customer,
        sellerProduct[i][j].CP,
        sellerProduct[i][j].inventory_stock,
        sellerProduct[i][j].threshold_stock,
        sellerProduct[i][j].singleOrderMaxQty,
        sellerProduct[i][j].delivery_charges,
        sellerProduct[i][j].deliveryTime,
        sellerProduct[i][j].batchId,
        sellerProduct[i][j].batchNumber,
        moment(JSON.parse(sellerProduct[i][j].batchDate)).format("YYYY-MM-DD"),
      ]);
    }
    }
    console.log(A);
    let csvContent = "data:text/csv;charset=utf-8,";
    A.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    
    console.log(csvContent);
    console.warn(csvContent);
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "SellerProduct.csv";
    document.body.appendChild(a);
    a.click();

   
  }
  render() {
    console.log('this.props.sellerProduct',this.props.sellerProduct);
   
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
    const columns = [
      // {
      //   name: "sellerProduct_id",
      //   label: "Select",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     display:localStorage.getItem('role')!=='seller'?true:false,
      //     customBodyRender: (sellerProduct_id, tableMeta)=>{
      //       return !this.state.hideOld ? (
      //         <Checkbox
      //           name={sellerProduct_id}
      //           checked={this.state.checkedItems.get(sellerProduct_id) || false}
      //           onChange={this.handleSelect.bind(this)}
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
           
      //     },
      //   },
      // },
      {
        name: "Product",
        label: "Company SKU Code",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Product,tableMeta)=>{
            return(
              Product ? Product.SKU : "-"
            )
          }
          
        },
      },
      {
        name: "product_hierarchy_level",
        label: "Product Hierarchy Level",
        options: {
          filter: true,
          sort: true,

          
        },
      },
      {
        name: "Seller",
        label: "Seller Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Seller)=>{
            return(Seller?Seller.name:"-")
          }
      
        },
      },
      {
        name: "SellerProduct_UOM",
        label: "UOM",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(SellerProduct_UOM)=>{
              return(
                SellerProduct_UOM &&  SellerProduct_UOM[0]?SellerProduct_UOM[0].name:"-"
                )
              }
        },
      },
      {
        name: "SellerProduct_UOM",
        label: "PTRUOM",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(SellerProduct_UOM)=>{
              return(
                SellerProduct_UOM &&  SellerProduct_UOM[0]?SellerProduct_UOM[0].PTR:"-"
        )
       }
  },
},   
 {
  name: "SellerProduct_UOM",
  label: "PTDUOM",
  options: {
    filter: true,
    sort: true,
    customBodyRender:(SellerProduct_UOM)=>{
        return(
          SellerProduct_UOM &&  SellerProduct_UOM[0]?SellerProduct_UOM[0].PTD:"-"
  )
 }
},
},  
{
  name: "SellerProduct_UOM",
  label: "MRPUOM",
  options: {
    filter: true,
    sort: true,
    customBodyRender:(SellerProduct_UOM)=>{
        return(
          SellerProduct_UOM &&  SellerProduct_UOM[0] ?SellerProduct_UOM[0].MRP:"-"
  )
 }
},
},   
{
  name: "SellerProduct_UOM",
  label: "UOM 2",
  options: {
    filter: true,
    sort: true, 
    customBodyRender:(SellerProduct_UOM)=>{
        return(
          SellerProduct_UOM && SellerProduct_UOM[1] ?SellerProduct_UOM[1].name:"-"
          )
        }
  },
},
      {
      name: "SellerProduct_UOM",
      label: "UOM 2 Conversion",
      options: {
        filter: true,
        sort: true,
        customBodyRender:(SellerProduct_UOM)=>{
          return(
            SellerProduct_UOM && SellerProduct_UOM[1]?SellerProduct_UOM[1].conversionRate:"-"
            )
          }
    },
  },
    
    {
      name: "SellerProduct_UOM",
      label: "PTRUOM 2",
      options: {
        filter: true,
        sort: true,
        customBodyRender:(SellerProduct_UOM)=>{
          return(
            SellerProduct_UOM &&  SellerProduct_UOM[1]?SellerProduct_UOM[1].PTR:"-"
            )
          }
      },
    },
    {
      name: "SellerProduct_UOM",
      label: "PTDUOM 2",
      options: {
        filter: true,
        sort: true,
        customBodyRender:(SellerProduct_UOM)=>{
          return(
            SellerProduct_UOM &&  SellerProduct_UOM[1]?SellerProduct_UOM[1].PTD:"-"
            )
          }
      },
    },
    {
      name: "SellerProduct_UOM",
      label: "MRPUOM2",
      options: {
        filter: true,
        sort: true,
        customBodyRender:(SellerProduct_UOM)=>{
          return(
            SellerProduct_UOM &&  SellerProduct_UOM[1]?SellerProduct_UOM[1].MRP:"-"
            )
          }
      },
    },
     
     
    
      {
        name: "inventory_stock",
        label: "Inventory",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "threshold_stock",
        label: "Thresold",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "singleOrderMaxQty",
        label: "Single Order Max. Qty",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "delivery_charges",
        label: "Delivery Charge",
        options: {
          display:false,
          filter: true,
          sort: true,
        },        
      },
      {
        name: "deliveryTime",
        label: "Delivery Time",
        options: {
          display:false,
          filter: true,
          sort: true,
        },
      },
      {
        name: "batchId",
        label: "Batch Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "batchNumber",
        label: "Batch Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "batchDate",
        label: "Batch Date",
        options: {
          filter: true,
          sort: true,
      
        },
      },
   
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
                checked={available == 1 ? true : false}
                onChange={this.handleActiveChange.bind(this,tableMeta.rowData[21],tableMeta.rowData[22].id)}
              />
              </div>
            );
          },
        },
      },
  
      {
        name: "ProductId",
        label: "Action",
        options: {
          display:localStorage.getItem('SellerProductUpdate')=='true'?true:false,
          filter: false,
          sort: false,
          customBodyRender: (ProductId, tableMeta ) => {
            return (
              <div>
                <Link
                  to={"/seller-product-catalogue/add/"+ProductId+"/"+tableMeta.rowData[22].id}
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
      {
        name:"Seller",
        options:{
          display:false,
          customBodyRender:(Seller,tableMeta)=>{
            return(
              Seller.id
            )
          }
        }
      },
    
    ];

    const options = {
      filter: false,
      viewColumns: false,
      responsive: "scrollMaxHeight",
      search: false,
      pagination: false,
      selectedRows: false,
      selectableRows: false,
      print: false,
      download: false,
      confirmFilters: this.props.isLoading,
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
    const imports = "sellerproduct";

    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Seller Product</h4>
                    </div>
                  </div>
                  <div className="f-right">
                    <Link
                        to="/seller-product-catalogue/add"
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
                        Seller Product
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
                      <div className="col mb-9">
                        <div className="col-sm-12">
                         
              
                          {localStorage.getItem("role") === "admin" ||
                          localStorage.getItem("role") === "other" ? (
                            
                            <>
                              <FormControl
                                variant="outlined"
                                className="col-sm-2 mx-1"
                              >
                                <i
                                  style={{
                                    textAlign: "center",
                                    color: "white",
                                    fontSize: "5.5px",
                                  }}
                                >
                                  Batch Date
                                </i>
                                <DateRangePicker
                                  onApply={this.handledate.bind(this)}
                                  label={
                                    this.state.dateDisplay !== undefined
                                      ? this.state.dateDisplay
                                      : "batch"
                                  }
                                  //initialSettings={{ startDate: '01/01/2020', endDate: '01/15/2020' }}
                                  onCancel={this.handlecanceldate.bind(this)}
                                >
                                  <div
                                    // className="MuiSelect-root MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"
                                    style={{
                                      textAlign: "center",
                                      background: "#fff",
                                      cursor: "pointer",
                                      padding: "5px 10px",
                                      border: "1px solid #ccc",
                                      //  width: '140px',
                                      height: "30px",
                                      borderRadius: "5px",
                                      "&:hover": {
                                        border: "1px solid black",
                                      },
                                    }}
                                  >
                                    {/* <CalendarToday style={{fontSize:"10px"}}/> */}
                                    <span
                                      htmlFor="outlined-age-native-simple"
                                      style={{
                                        fontSize: "12px",
                                        color: "grey",
                                      }}
                                    >
                                      {this.state.dateDisplays
                                        ? this.state.dateDisplays +
                                          " " +
                                          "To" +
                                          " " +
                                          this.state.dateDisplaye
                                        : "Batch Date Filter"}
                                    </span>
                                  </div>
                                </DateRangePicker>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                className="col-sm-2 mx-1"
                              >
                                <InputLabel
                                  htmlFor="outlined-age-native-simple"
                                  style={{ fontSize: "12px" }}
                                >
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
                                  <option aria-label="None" value={""}></option>
                                  <option aria-label="None" value={"All"}>
                                    All
                                  </option>
                                  {this.props.seller_list
                                    ? this.props.seller_list.map((d) => (
                                        <option value={d.id}>{d.name}</option>
                                      ))
                                    : "No Seller"}
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
                                  State Filter
                                </InputLabel>
                                <Select
                                  native
                                  name="stateFilter"
                                  value={this.state.stateFilter}
                                  onChange={(val) =>
                                    this.handleStateChange(val.target.value)
                                  }
                                  label="State Filter"
                                  className="my-2"
                                  style={{ height: "30px" }}
                                  inputProps={{
                                    name: "Time Peroid",
                                    id: "outlined-age-native-simple",
                                  }}
                                >
                                  <option aria-label="None" value={null} />
                                  <option aria-label="None" value={"All"}>
                                    All
                                  </option>
                                  {this.props.state_list
                                    ? this.props.state_list.map((d) => (
                                        <option value={d.id}>{d.name}</option>
                                      ))
                                    : "No Seller"}
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
                                  City Filter
                                </InputLabel>
                                <Select
                                  native
                                  name="cityFilter"
                                  value={this.state.cityFilter}
                                  onChange={(val) =>
                                    this.handleCityChange(val.target.value)
                                  }
                                  label="City Filter"
                                  className="my-2"
                                  style={{ height: "30px" }}
                                  inputProps={{
                                    name: "Time Peroid",
                                    id: "outlined-age-native-simple",
                                  }}
                                >
                                  <option aria-label="None" value={null} />
                                  <option aria-label="None" value={"All"}>
                                    All
                                  </option>
                                  {this.props.city_list
                                    ? this.props.city_list.map((d) => (
                                        <option value={d.id}>{d.name}</option>
                                      ))
                                    : "No Seller"}
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
                                  Pincode Filter
                                </InputLabel>

                                <Select
                                  native
                                  name="pincodeFilter"
                                  value={this.state.pincodeFilter}
                                  onChange={(val) =>
                                    this.handlepincodeChange(val.target.value)
                                  }
                                  label="Pincode Filter"
                                  className="my-2"
                                  style={{ height: "30px" }}
                                  inputProps={{
                                    name: "Time Peroid",
                                    id: "outlined-age-native-simple",
                                  }}
                                >
                                  <option aria-label="None" value={null} />
                                  <option aria-label="None" value={"All"}>
                                    All
                                  </option>
                                  {this.props.pincode_list
                                    ? this.props.pincode_list.map((d) => (
                                        <option value={d.code}>{d.code}</option>
                                      ))
                                    : "No Pinocde"}
                                </Select>
                              </FormControl>
                              <FormControl>
                                <div
                                  className="btn btn-dark py-1 mx-3 mt-2"
                                  onClick={this.onGo}
                                >
                                  Go
                                </div>
                              </FormControl>
                              <FormControl>
                                <div style={{height:"8px"}}> 

                                </div>
                <div className="form-group row">
                  <div className="col-sm-9" >
                    <input
                    style={{width:"190px" ,height:"10px"}}
                      type="search"
                      className="form-control"
                      name="search"
                      placeholder="Search By SKU..."
                      onChange={this.handleSearchinput.bind(this)}
                      value={this.state.search}
                    />
                   </div>
                   </div>
              
                  </FormControl>
                  <FormControl>
                  
                     <div 
                    
                    className="btn btn-dark py-1 mx-3 mt-2"
                    onClick={this.onsearchButton.bind()}>
                     <i 
                     class="icofont icofont-search"
                     ></i>
                     </div>
                  

                  </FormControl>
                 
                 
                  <FormControl>
                  {this.state.cancelButton == true?
                  <div 
                 className="btn btn-secondary py-1 mx-3 mt-2"
                 onClick={this.oncancelButton.bind(this)}>
                  <i style={{fontSize:"10px"}}>cancel</i>
                  </div>
                 :null}
                 </FormControl>
                 
                            </>
                            
                          ) : (
                            ""
                          )}
                        </div>

                      
                        {localStorage.getItem("role") !== "seller" ?<div>
                       
                          <div className="pb-4">
                            <Link
                              to={"/importData/" + imports}
                              className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                              data-modal="modal-13"
                            >
                              Import
                            </Link>
                            {!this.state.downdata.length>0?

                            <button
                              className="f-right bg-white b-none"
                              data-modal="modal-13"
                            >
                              <Tooltip
                                title="Download"
                                aria-label="download"
                                className="mr-2 mb-3"
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
                         
                          :
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <Tooltip
                              title="Download Selected"
                              aria-label="download"
                              onClick={() => {
                                this.exportCSVS();
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
                           
                              }
                           </div>  </div> :
                       null}
                        
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.state.sellerProduct_list}
                            columns={columns}
                            options={options}
                          />
                        </MuiThemeProvider>
                        <br/><br/>
                        <nav
                          aria-label="Page navigation example "
                          className="display-flex float-right"
                        >
                          <ul class="pagination">
                      
                            <li class="page-item mx-2 py-2">
                              Count : {this.state.datarange} -{" "}
                              {this.state.datarange + this.state.dataLength}
                            </li>
                           
                              <Pagination
                              itemClass="page-item"
                              linkClass="page-link"
                                activePage={this.state.activePage}
                                itemsCountPerPage={50}
                                 totalItemsCount={this.props.productCount}
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
    sellerProduct_list:state.sellerProduct.sellerProduct_list,
    isLoading: state.sellerProduct.isLoading,
    seller_list: state.seller.seller_list,
    productCount:state.sellerProduct.count,
    loginData: state.login,
    pincode_list: state.pincode.pincode_list,
    city_list: state.city.city_list,
    state_list: state.state.state_list,
  };
};
SellerProductCatalogueList.propTypes = {
  fetchSellerProductList: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  fetchSellerProductList,
  fetchPincodeList,
  fetchstateList,
  fetchSellerList,
  updateSellerProduct,
  fetchcityList,
})(SellerProductCatalogueList);