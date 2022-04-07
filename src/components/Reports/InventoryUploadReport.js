/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from 'moment'
import {
  fetchSubCategoryList,
  fetchSellerProductAdminList,
  fetchcityList,
  fetchstateList,
  fetchPincodeList,
  fetchSellerList,
} from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Select,
  Tooltip,
  Button,
  FormLabel,
  FormGroup,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import SelectSearch from "react-select-search";
import Constant from "../../Constant";
import Pagination from "react-js-pagination";
import { Form } from "react-bootstrap";

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
class InventoryUploadReport extends Component {
  state = {
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    sellerFilter: "",
    mrpFilter: false,
    setDateWise: null,
    setDateWiseC: null,
    dataLength: 50,
    datarange: 0,
    inv: "",
    search:"",
    activePage: 1,
    productName:"",
    productSKU:"",

  };
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
  componentWillMount() {
    this.getSellerProductList(
      this.state.datarange,
      this.state.dataLength,
      this.state.sellerFilter
    );
    this.props.fetchSubCategoryList();
    this.props.fetchSellerList(0, 2500,'');
    this.props.fetchPincodeList("",0, 2500);
    this.props.fetchcityList(0, 25500);
    this.props.fetchstateList(0, 25500);
  }

  getSellerProductList = (
    range,
    length,
    sellerId,
    stateId,
    cityId,
    pincode,
    subCategory
  ) => {
    console.log(range,length)
    this.props.fetchSellerProductAdminList(
      range,
      length,
      sellerId,
      stateId,
      cityId,
      pincode,
      subCategory
    );
  };
  // onChangePa(e) {
  //   e.preventDefault();
  //   const datarange = this.state.datarange - 50;
  //   const dataLength = this.state.dataLength;
  //   var subCategory =
  //     this.state.categoryfilter !== "All" ? this.state.categoryfilter : "";

  //   var seller =
  //     this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
  //   var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
  //   var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
  //   var pincode = this.state.pincode !== "All" ? this.state.pincode : "";

  //   this.getSellerProductList(
  //     datarange,
  //     dataLength,
  //     seller,
  //     stateId,
  //     cityId,
  //     pincode,
  //     subCategory
  //   );

  //   this.setState({
  //     datarange: datarange,
  //     dataLength: dataLength,
  //   });
  // }
  // onChangePas(e) {
  //   e.preventDefault();
  //   const datarange = this.state.datarange + 50;
  //   const dataLength = this.state.dataLength;
  //   var subCategory =
  //     this.state.categoryfilter !== "All" ? this.state.categoryfilter : "";
  //   var seller =
  //     this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
  //   var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
  //   var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
  //   var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
  //   console.log();
  //   this.getSellerProductList(
  //     datarange,
  //     dataLength,
  //     seller,
  //     stateId,
  //     cityId,
  //     pincode,
  //     subCategory
  //   );

  //   this.setState({
  //     datarange: datarange,
  //     dataLength: dataLength,
  //   });
  // }
  // openModel = () => {
  //   this.setState({
  //     open: true,
  //   });
  // };
  handleSellerChange = (v) => {
    this.setState({
      sellerFilter: v,
    });
    var pincode = this.state.sellerFilter;
    // this.getSellerProductList(this.state.datarange, this.state.dataLength, v);
  };
  handlesubcategoryChange(v) {
    this.setState({
      categoryfilter: v,
    });
    console.log(v);
  }
  handleStateChange = (v) => {
    this.setState({
      stateId: v,
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
  handlePageChange(pageNumber) {
    console.log(localStorage.getItem('sellerProductCount'))
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    var subCategory =this.state.categoryfilter !== "All" ? this.state.categoryfilter : "";
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    var productSKU = this.state.productSKU;
    var productName =this.state.productName;
    console.log(productSKU,"sku")
    console.log(productName,"Name")
 


    // var startBatchDate = this.state.startBatchDate;
    // var endBatchDate = this.state.endBatchDate;
    this.props.fetchSellerProductAdminList(
      range,
      dataLength,
      seller,
      cityId,
      pincode,
      stateId,
      subCategory,
      productSKU,
      productName
      // startBatchDate,
      // endBatchDate
    );
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  exportCSV() {
    console.log("checked")
    if( localStorage.getItem('role')=='seller'){
      console.log("seller")
    window.location.href = `${Constant.getAPI()}/pincodesellerproduct/getnew?sellerId=${
      localStorage.getItem('seller_id')
    }&cityId=${
      this.state.cityId !== "All" && this.state.cityId !== undefined ? this.state.cityId : ""
    }&pincode=${
      this.state.pincode !== "All" && this.state.pincode !== undefined ? this.state.pincode : ""
    }&startBatchDate=${
      this.state.startBatchDate !== undefined ? this.state.startBatchDate : ""
    }&endBatchDate=${
      this.state.endBatchDate !== undefined ? this.state.endBatchDate : ""
    }&stateId=${
      this.state.stateId !== undefined ? this.state.stateId : ""
    }&csvReport=true&csvReportName=inventoryreport&listingType=inventoryReport&`;
  }
  else{
 
    window.location.href = `${Constant.getAPI()}/pincodesellerproduct/getnew?sellerId=${
     this.state.sellerFilter !== "All" && this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
    }&cityId=${
      this.state.cityId !== "All" && this.state.cityId !== undefined ? this.state.cityId : ""
    }&pincode=${
      this.state.pincode !== "All" && this.state.pincode !== undefined ? this.state.pincode : ""
    }&startBatchDate=${
      this.state.startBatchDate !== undefined ? this.state.startBatchDate : ""
    }&endBatchDate=${
      this.state.endBatchDate !== undefined ? this.state.endBatchDate : ""
    }&subCategoryId=${
      this.state.categoryfilter !== undefined && this.state.categoryfilter!=="All"? this.state.categoryfilter : ""
    }&productSKU=${
      this.state.productSKU !== undefined ? this.state.productSKU : ""
    }&productName=${
      this.state.productName !== undefined  ? this.state.productName : ""
    }&stateId=${
      this.state.stateId !== undefined && this.state.stateId !== "All" ? this.state.stateId : ""
    }&csvReport=true&csvReportName=inventoryreport&listingType=inventoryReport&adminId=${
      localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''
    }`;
  }

    

    // var csvRow = [];
    // var A = [
    //   [
    //     "Seller Name",
    //     "Seller Address",
    //     "Category",
    //     "Brand",
    //     "Material Code",
    //     "SKU Name",
    //     "Stocks(units)",
    //     "MRP",
    //     "PTD",
    //     "PTC",
    //     "SGST",
    //     "CGST",

    //   ],
    // ];
    // var re = this.props.sellerProduct;
    // for (var item = 0; item < re.length; item++) {
    //   console.log(re[item].PinCodeSeller);
    //   A.push([
    //     re[item].PinCodeSeller && re[item].PinCodeSeller.Seller
    //       ? re[item].PinCodeSeller.Seller.name
    //       : "--",
    //     re[item].PinCodeSeller && re[item].PinCodeSeller.Seller
    //       ? re[item].PinCodeSeller.Seller.address.replace(/,/g, "-")
    //       : "--",
    //     re[item].Product.ProductCategories !== null
    //       ? re[item].Product.ProductCategories.name
    //       : "--",
    //     re[item].Product.Brand !== null ? re[item].Product.Brand.name : "--",
    //     re[item].Product !== null ? re[item].Product.sku : "--",
    //     re[item].Product !== null
    //       ? re[item].Product.short_product_description.replace(/,/g, "-")
    //       : "--",
    //     re[item].inventory_stock !== null ? re[item].inventory_stock : "--",
    //     re[item].MRP,
    //     re[item].CP,
    //     re[item].SP_Customer,
    //     re[item].Product !== null ? re[item].Product.sgst : "--",
    //     re[item].Product !== null ? re[item].Product.cgst : "--",
    //     re[item].Product !== null ? re[item].Product.igst : "--",
    //   ]);
    // }
    // let csvContent = "data:text/csv;charset=utf-8,";
    // A.forEach(function (rowArray) {
    //   let row = rowArray.join(",");
    //   csvContent += row + "\r\n";
    // });

    // console.log(csvContent);
    // // var csvContent=csvContent.join('%0A');
    // console.warn(csvContent);
    // var a = document.createElement("a");
    // a.href = "data:attachment/csv" + csvContent;
    // a.download = "inventory_report.csv";
    // document.body.appendChild(a);
    // a.click();
  }
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
  handleSearchinput(r){
    this.setState({
      search:r.target.value
    })
   }
   oncancelButton(){
    var subCategory =
    this.state.categoryfilter !== "All" ? this.state.categoryfilter : "";

    var start_date = this.state.start_date;
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
    var seller =
      this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    // var startBatchDate = this.state.startBatchDate;
    // var endBatchDate = this.state.endBatchDate;
    this.props.fetchSellerProductAdminList(
      0, //range
      50, //length
      seller,
      cityId,
      pincode,
      stateId,
      subCategory,
     
    );
    this.setState({
      cancelButton:false,
      search:"",
      productSKU:"",
      productName:"",
    });

  }

  onsearchButton=()=>{
    var productSKU=this.state.search;

    this.setState({
      cancelButton:true,
      productName:"",
      productSKU,
    })
    var subCategory =
    this.state.categoryfilter !== "All" ? this.state.categoryfilter : "";

    // var start_date = this.state.start_date;
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
    var seller =
      this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    // var startBatchDate = this.state.startBatchDate;
    // var endBatchDate = this.state.endBatchDate;
    this.props.fetchSellerProductAdminList(
      0, //range
      50, //length
      seller,
      cityId,
      pincode,
      stateId,
      subCategory,
      productSKU
    )

  }
  onsearchNameButton(){
    var productName=this.state.search;

    this.setState({
      cancelButton:true,
      productSKU:"",
      productName
      
    })
    var subCategory =this.state.categoryfilter !== "All" ? this.state.categoryfilter : "";
    var productSKU="";
    var productName=this.state.search;
    // var start_date = this.state.start_date;
    var stateId = this.state.stateId !== "All" ? this.state.stateId : "";
    var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    // var startBatchDate = this.state.startBatchDate;
    // var endBatchDate = this.state.endBatchDate;
    this.props.fetchSellerProductAdminList(
      0, //range
      50, //length
      seller,
      cityId,
      pincode,
      stateId,
      subCategory,
      productSKU,
      productName
    )

  }


  onGo = () => {
    var start_date = this.state.start_date;
    var data = "";
    var subCategory =this.state.categoryfilter !== "All" ? this.state.categoryfilter : "";
    var seller =this.state.sellerFilter !== "All" && this.state.sellerFilter!== undefined? this.state.sellerFilter : "";
    var stateId = this.state.stateId !== "All" && this.state.stateId !== undefined ? this.state.stateId : "";
    var cityId = this.state.cityId !== "All"  && this.state.cityId !== undefined? this.state.cityId : "";
    var pincode = this.state.pincode !== "All"  && this.state.pincode !== undefined ? this.state.pincode : "";
    var productSKU=this.state.productSKU;
    var productName=this.state.productName;

    this.props.fetchSellerProductAdminList(
      0,
      50,
      seller,
      stateId,
      cityId,
      pincode,
      subCategory,
      productSKU,
      productName
    );

    this.setState({
      dataLength: 50,
      datarange: 0,
    });
  };
  handleSelect = (e, id) => {
    console.log(e.target.name)
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    let newArray = [];
    console.log(this.state.checkedItems);
    if (this.props.sellerProduct !== undefined) {
      newArray = this.props.sellerProduct.filter((d) => {
        // console.log(d)
        let searchValue = d.sellerProduct_id;
        return searchValue.indexOf(item) !== -1;
      });
    }
    if (isChecked == true) {
      this.setState({
        downdata: [...this.state.downdata, newArray],
      });
      console.log([...this.state.downdata, newArray]);
      console.log(this.state.hidedownload);
    } else {
      var array = this.state.downdata;
      var index;
      for (let i = 0; i < this.state.downdata.length; i++) {
        var temp = this.state.downdata[i];
        for (let j = 0; j < temp.length; j++) {
          if (temp[j].id == newArray[0].id) {
            index = i;
            console.log(index);
            break;
          }
        }
      }
      if (index !== -1) {
        array.splice(index, 1);
      }
      console.log(array);
      this.setState({ downdata: array });

    }
    
  };

  exportCSVS(){
    var csvRow = [];
    var A = [
      [
        "Seller Name",
            "Seller Address",
            "Category",
            "Brand",
            "Material Code",
            "SKU Name",
            "Stocks(units)",
            "MRP",
            "PTD",
            "PTC",
            "SGST",
            "CGST",
            "IGST",
            
    
      ],
    ];
    var sellerProduct = this.state.downdata;
    console.log(this.state.downdata)
    for (let i = 0; i < sellerProduct.length; i++) {
      for(let j=0;j<1;j++){
 
   A.push([
        sellerProduct[i][j].Seller_name,
        sellerProduct[i][j].Seller_address? sellerProduct[i][j].Seller_address.replace(/,/g, "-"):"",
        sellerProduct[i][j].SubCategory_name,
        sellerProduct[i][j].Brand_name,
        sellerProduct[i][j].product_sku,
        sellerProduct[i][j].short_product_description,
        sellerProduct[i][j].inventory_stock,
        sellerProduct[i][j].MRP,
        sellerProduct[i][j].CP,
        sellerProduct[i][j].SP_customer,
        sellerProduct[i][j].sgst,
        sellerProduct[i][j].cgst,
        sellerProduct[i][j].igst,

      ]);
    }
    }
    console.log(A);
    let csvContent = "data:text/csv;charset=utf-8,";
    A.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    // for(var i=0;i<=rde.length;++i){
    //     csvRow.push(Ad[j].join(','))
    //     var csvString=csvRow.join('%0A');
    // }
    console.log(csvContent);
    // var csvContent=csvContent.join('%0A');
    console.warn(csvContent);
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "InventoryReport.csv";
    document.body.appendChild(a);
    a.click();

   
  }

  render() {
    const columns = [
      {
        name: "sellerProduct_id",
        label: "Select",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (sellerProduct_id, tableMeta)=>{
            return !this.state.hideOld ? (
              <Checkbox
                name={sellerProduct_id}
                checked={this.state.checkedItems.get(sellerProduct_id) || false}
                onChange={this.handleSelect.bind(this)}
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
           
          },
        },
      },

      // {
      //   name: "pincode",
      //   label: "Pincode",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     // customBodyRender: (PinCodeSeller, tableMeta) => {
      //     //   return PinCodeSeller
      //     //     ? PinCodeSeller.PinCode
      //     //       ? PinCodeSeller.PinCode.code
      //     //       : "--"
      //     //     : "--";
      //     // },
      //   },
      // },

      {
        name: "Seller_name",
        label: "Company Seller Name",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (PinCodeSeller, tableMeta) => {
          //   return PinCodeSeller
          //     ? PinCodeSeller.Seller
          //       ? PinCodeSeller.Seller.name
          //       : "--"
          //     : "--";
          // },
        },
      },
      {
        name: "Seller_address",
        label: "Address",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (PinCodeSeller, tableMeta) => {
          //   return PinCodeSeller
          //     ? PinCodeSeller.Seller
          //       ? PinCodeSeller.Seller.address
          //       : "--"
          //     : "--";
          // },
        },
      },
      // {
      //   name: "Seller",
      //   label: "Seller Type",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // }
      {
        name: "SubCategory_name",
        label: "Sub Category",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return (
          //     <div>{

          //     Product.ProductCategories !== undefined && Product.ProductCategories !== null
          //    ?
          //     Product.ProductCategories.map(d=>(
          //       d.Category !== null &&  d.Category !== undefined ? d.Category.name:""
          //       ))
          //     :""
          // }</div>
          //   );
          // },
        },
      },
      {
        name: "Brand_name",
        label: "Brand",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product.Brand ? Product.Brand.name : "";
          // },
        },
      },
      // {
      //   name: "barcode",
      //   label: "Barcode",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      {
        name: "product_sku",
        label: "Material Code",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product ? Product.sku : "--";
          // },
        },
      },
      {
        name: "short_product_description",
        label: "SKU Name",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product ? Product.short_product_description : "--";
          // },
        },
      },

      {
        name: "inventory_stock",
        label: "Stock(Units)",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "MRP",
        label: "MRP",
        options: {
          filter: true,
          sort: true,
          // customBodyRender:(Product,tableMeta)=>{
          //   return Product?Product.mrp:'--'
          // }
        },
      },
      {
        name: "CP",
        label: "PTD",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (CP, tableMeta) => {
            return parseFloat(CP).toFixed(2);
          },
        },
      },
      {
        name: "SP_customer",
        label: "PTC",
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: "sgst",
        label: "SGST",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product ? Product.sgst : "--";
          // },
        },
      },
      {
        name: "cgst",
        label: "CGST",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product ? Product.cgst : "--";
          // },
        },
      },
      {
        name: "igst",
        label: "IGST",
        options: {
          filter: true,
          sort: true,
          //   customBodyRender: (Product, tableMeta) => {
          //     return Product ? Product.igst : "--";
          //   },
        },
      },
    ];

    const options = {
      filter: false,
      viewColumns: false,
      responsive: "scrollMaxHeight",
      search: false,
      print: false,
      pagination: false,
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

      selectableRows: "none",
      textLabels: {
        body: {
          noMatch: this.props.isLoading
            ? "Loading data..!"
            : "Sorry, No Data Found",
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
                      <h4>Inventory Upload Report</h4>
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
                      <li className="breadcrumb-item active">
                        Inventory Upload Report
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
                      <div className="row mb-4">
                        <div className="col-sm-9">
                          {localStorage.getItem("role") === "admin" ||
                          localStorage.getItem("role") === "other" ? (
                            <>
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

                                  {/*                                   
                                  <option aria-label="None" value={""}>
                                    All
                                  </option>
                                  <option aria-label="None" value={"380009"}>
                                    S R FOODS
                                  </option>
                                  <option aria-label="None" value={"380058"}>
                                    Umiya Oil Depo{" "}
                                  </option> */}
                                  {/* {this.props.seller_list ?
                              this.props.seller_list.map(d=> 
                                <option value={d.id}>{d.name}</option>
                              )
                              :"No Seller"
                              } */}
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

                                {/* <SelectSearch
                                  options={this.props.pincode_list}
                                  search
                                  filterOptions={fuzzySearch}
                                  emptyMessage="Not found"
                                  placeholder="Select your country"
                                 /> */}

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
                              {console.log(this.props.subcategory_list)}

                              <FormControl
                                variant="outlined"
                                className="col-sm-2 mx-1"
                              >
                                <InputLabel
                                  htmlFor="outlined-age-native-simple"
                                  style={{ fontSize: "12px" }}
                                >
                                  Sub Category
                                </InputLabel>
                                <Select
                                  native
                                  name="categoryfilter"
                                  value={this.state.categoryfilter}
                                  onChange={(val) =>
                                    this.handlesubcategoryChange(
                                      val.target.value
                                    )
                                  }
                                  label="Sub Category Filter"
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
                                  {this.props.subcategory_list !== undefined &&
                                  this.props.subcategory_list.data !== undefined
                                    ? this.props.subcategory_list.data.map(
                                        (d) => (
                                          <option value={d.id}>{d.name}</option>
                                        )
                                      )
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
                              <div className="col-sm-9" >

                              <FormControl>
                                <div style={{height:"8px"}}> 

                                </div>
                                
                    <input
                      style={{width:"190px",height:"10px"}}
                      type="search"
                      className="form-control"
                      name="search"
                      placeholder="Search..."
                      onChange={this.handleSearchinput.bind(this)}
                      value={this.state.search}
                    />
              
                  </FormControl>
                              <FormControl>
                                <div>
                                  <span 

                 className="btn btn-dark py-1 mx-3 mt-2"
                 onClick={this.onsearchButton.bind()}>
                                  <i  
                  class="icofont icofont-search"
                  > </i>
                  <i style={{fontSize:"9px",fontStyle:"none"}}  >By SKU</i> 
                                  </span>
                                  <span 
                 className="btn btn-dark py-1 mx-3 mt-2"
                 onClick={this.onsearchNameButton.bind(this)}>
                                  <i 
                  class="icofont icofont-search"
                  >
                  </i>
                  <i style={{fontSize:"9px"}}  >By Name</i> 
                                  </span>
                                  </div>
                  
                  {/* <div 
                 
                 className="btn btn-dark py-1 mx-3 mt-2"
                 onClick={this.onsearchButton.bind()}>
                  <i  style={{fontSize:"12px"}}
                  // class="icofont icofont-search"
                  >Search By SKU</i>
                  </div>
                  <div 
                 
                 className="btn btn-dark py-1 mx-3 mt-2"
                 onClick={this.onsearchButton.bind()}>
                  <i  style={{fontSize:"12px"}}
                  // class="icofont icofont-search"
                  >Search By SKU</i>
                  </div> */}

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
              </div>

              {/* <FormControl>
                <div style={{width:"50px"}}>

                </div>
              </FormControl>
              <FormControl>
              <div style={{height:"8px"}}> 
              </div>
               <div className="pb-4">
                        {!this.state.downdata.length>0?
                           <button
                              className="f-right bg-white b-none"
                              data-modal="modal-13"
                            >
                              <Tooltip
                                title="Download"
                                aria-label="download"
                                className="mr-2 mb-3"
                                onClick={()=>{
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
                              </div>
              </FormControl> */}
                            </>
                          ) : (
                            
                            ""
                          )}
                        </div>
                        <div className="col-sm-3">

                       
                        <div style={{width:"230px"}}
                        
                        ></div>
                       
                        <div className="pb-4">
                        {!this.state.downdata.length>0?
                           <button
                              className="f-right bg-white b-none"
                              data-modal="modal-13"
                            >
                              <Tooltip
                                title="Download"
                                aria-label="download"
                                className="mr-2 mb-3"
                                onClick={()=>{
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
                              </div>
                              </div>
                       
                      </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.sellerProduct}
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
                              {this.state.datarange + this.state.dataLength}
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
                            {this.props.sellerProduct.length < 50 ? (
                              <li class="page-item btn btn-disabled">
                                <i class="icofont icofont-rounded-right"></i>
                              </li>
                            ) : (
                              <li
                                class="page-item btn"
                                onClick={this.onChangePas.bind(this)}
                              >
                                <i class="icofont icofont-rounded-right"></i>
                              </li>
                            )} */}
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
  console.log(state);
  return {
    subcategory_list: state.subCategory.subcategory_list,
    productCount:state.sellerProduct.count,
    sellerProduct: state.sellerProduct.sellerProduct,
    seller_list: state.seller.seller_list,
    pincode_list: state.pincode.pincode_list,
    city_list: state.city.city_list,
    state_list: state.state.state_list,
    isLoading: state.sellerProduct.isLoading,
    loginData: state.login,
  };
};
InventoryUploadReport.propTypes = {
  fetchSellerProductAdminList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  fetchSellerProductAdminList,
  fetchPincodeList,
  fetchcityList,
  fetchstateList,
  fetchSubCategoryList,
  fetchSellerList,
})(InventoryUploadReport);
