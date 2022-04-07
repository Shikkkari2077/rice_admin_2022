/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import Toggle from "react-toggle";
import { connect } from "react-redux";
import AlertDialog from "../../common/DownloadOption";
import { withStyles } from '@material-ui/core/styles';
import Pagination from 'react-js-pagination'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  fetchSellerCustomer,
  fetchCustomerKyc2,
  fetchCategoryList,
  fetchSellerList,
fetchcityList} from '../../store/index'
import {
  
  Tooltip,
  Switch,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { LaptopWindows } from "@material-ui/icons";
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

class SellerCustomer extends Component {
  state = {
    dataLength:50,
    datarange:0,
    activePage:1,
    cancelButton:false,
    PhoneNumber:'',
    sellerFilter:'',
    categoryFilter:'',
    cityFilter:'',
    lineFilter:'',

   
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
  

  
  componentDidMount(){
   this.props.fetchSellerCustomer()
   this.props.fetchcityList(0, 25500);
   this.props.fetchCategoryList();
   this.props.fetchSellerList(0, 25000,'')
  }
  
handlePageChange(pageNumber) {
  console.log(localStorage.getItem('sellerProductCount'))
  console.log("active page is", pageNumber);
  console.log(pageNumber*50-50)
  var seller = this.state.sellerFilter;
  const range=pageNumber*50-50
  const dataLength = this.state.dataLength;
  var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
  var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
  var PhoneNumber=this.state.PhoneNumber 
  var category= this.state.cityFilter !== 'All' ? this.state.categoryFilter  : '';
  var line=this.state.lineFilter;
  this.props.fetchSellerCustomer( 
    range,
    dataLength,
    seller,
    city,
    category,
    line,
    PhoneNumber);
  this.setState({
    datarange: range,
    dataLength: dataLength,
  });
  this.setState({activePage: pageNumber});
  console.log(range,dataLength)
}

updatestatus(e){
console.log(e.target.value)
}
downloadCsv(){
  console.log(`${Constant.getAPI()}/userseller/download?cityId=${
    this.state.cityFilter !== undefined ? this.state.cityFilter : ""
    }&sellerId=${
    this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
    }&businessLineId=${
      this.state.lineFilter !==undefined ?this.state.lineFilter :""
    }&categoryId=${
      this.state.categoryFilter !== 'All' ? this.state.categoryFilter  : ''
    }`
   )

   window.location.href =`${Constant.getAPI()}/userseller/download?cityId=${
    this.state.cityFilter !== undefined ? this.state.cityFilter : ""
    }&sellerId=${
    this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
    }&businessLineId=${
      this.state.lineFilter !==undefined ?this.state.lineFilter :""
    }&categoryId=${
      this.state.categoryFilter !== 'All' ? this.state.categoryFilter  : ''
    }`

 
}
oncancelButton() {
 
  this.setState({
    cancelButton: false,
    search: '',
    PhoneNumber: '',
    datarange:0
   
  });
  var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
  var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
  
  var category= this.state.cityFilter !== 'All' ? this.state.categoryFilter  : '';
  var line=this.state.lineFilter;

  this.props.fetchSellerCustomer(
    0,
    50,
    seller,
    city,
    category,
    line,
    )
}
onsearchButton = () => {
  var PhoneNumber = this.state.search;
  this.setState({
    cancelButton: true,
    PhoneNumber,
  });
  var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
  var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
  
  var category= this.state.cityFilter !== 'All' ? this.state.categoryFilter  : '';
  var line=this.state.lineFilter;

  this.props.fetchSellerCustomer(
    0,
    50,
    seller,
    city,
    category,
    line,
    PhoneNumber

  )
 
};
handleSellerChange = (v) => {
  this.setState({
    sellerFilter: v,
  });
};
handleSearchinput(r) {
  this.setState({
    search: r.target.value,
  });
}
handleCategory(v){
  console.log(v)
  this.setState({
    categoryFilter: v,
  });
}
handleCityChange(v){
  console.log(v)
  this.setState({
    cityFilter: v,
  });
}
handleLine(v){
  console.log(v)
  this.setState({
    lineFilter: v,
  });
}
onGo = () => {
 

  var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
  var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
  var PhoneNumber = this.state.PhoneNumber;
  var category= this.state.cityFilter !== 'All' ? this.state.categoryFilter  : '';
  var line=this.state.lineFilter;

  this.props.fetchSellerCustomer(
    0,
    50,
    seller,
    city,
    category,
    line,
    PhoneNumber

  )
  this.setState({
    dataLength: 50,
    datarange: 0,
    activePage:1
  });
};
exportCSV() {
  console.log("here")
  
  window.location.href = `${Constant.getAPI()}/userseller/download?sellerId=${
    this.state.sellerFilter !== "All"&& this.state.sellerFilter!== undefined ? this.state.sellerFilter : ""
  }&cityId=${
    this.state.cityId !== "All" && this.state.cityId !== undefined ? this.state.cityId : ""
  }&phone=${
    this.state.PhoneNumber !== undefined ? this.state.PhoneNumber : ""
  }&categoryId=${
    this.state.categoryfilter !== undefined ? this.state.categoryfilter : ""
  }&adminId=${
    localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''
  }`;


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
      // {
      //   name: "id",
      //   label: "Select",
      //   options: {
      //     display:false,
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
      //     },
      //   },
      // },

      {
        name: "Seller",
        label: "Distributor Code",
        options: {
          sort:true,
          customBodyRender: (Seller, tableMeta) => {
            return Seller.unique_identifier?Seller.unique_identifier :"-"
          }
        },
      },
       {
        name: "User",
        label: "Customer Name",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User && User.customerName? User.customerName:"-"
          }
        },
      },
     
      {
        name: "Category",
        label: "Category Name",
        options: {
          sort:true,
          customBodyRender: (Category, tableMeta) => {
            return Category? Category.name:"-"
          }
        },
      },
      {
        name: "Seller",
        label: "Seller Name",
        options: {
          sort:true,
          customBodyRender: (Seller, tableMeta) => {
            return Seller? Seller.name:"-"
          }
        },
      },
      {
        name: "User",
        label: "Intrested Categories",
        options: {
          sort:false,
          customBodyRender: (User, tableMeta) => {
            return (
              User !== undefined && User.Categories!==undefined && User.Categories.length !== 0 ?
              User.Categories.map(cat=>{
                return(
                   cat.BusinessUserCategory.categoryType == "Interested"
                   ? <li>{cat.name}</li>
                  :null
                )
               
              })

              :"-"
            )
          }
        },
      },
      {
        name: "User",
        label: "Seller mapping",
        options: {
          filter: false,
          sort: false,
          display:false,
          customBodyRender:(User)=>{
            return(
              User !== undefined &&  User !== null ?
              <Link to={'/seller_customer_mapping/add/'+User.id }>
              <i className="f-22 icofont icofont-edit">
  
              </i>
              </Link>
              :null
            )
          }
       
        },
      },
      
      {
        name: "User",
        label: "Customer Code",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.customerCode !== undefined ? User.customerCode:"-"
          }
        },
      }, {
        name: "User",
        label: "Address 1",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User.Address
          }
        },
      }, {
        name: "User",
        label: "Customer Channel",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.customerChannel !== undefined ? User.customerChannel:"-"
          }
        },
      },
      
      {
        name: "User",
        label: "Pincode",
        options: {
          sort:true,
          display:false,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.pinCode !== undefined ? User.pinCode:"-"
          }
        },
      }, 
      {
        name: "User",
        label: "City",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.city !== undefined ? User.city:"-"
          }
        },
      }, {
        name: "User",
        label: "State",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.state !== undefined ? User.state:"-"
          }
        },
      },

      {
        name: "User",
        label: "Contact Person",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.contactPerson !== undefined ? User.contactPerson:"-"
          }
        },
      },
      {
        name: "User",
        label: "Phone No.",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.phone !== undefined ? User.phone:"-"
          }
        },
      },
      {
        name: "User",
        label: "Alternate No.",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.alternateNumber !== undefined ? User.alternateNumber:"-"
          }
        },
      },
  
   
      {
        name: "User",
        label: "Email",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.email !== undefined ? User.email:"-"
          }
        },
      },
      {
        name: "User",
        label: "Registration Date",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.registrationDate !== undefined ? User.registrationDate:"-"
          }
        },
      },
      {
        name: "User",
        label: "Geography",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.geography !== undefined ? User.geography:"-"
          }
        },
      },
      {
        name: "Product",
        label: "Customer group",
        options: {
          sort:true,
          // customBodyRender: (Product, tableMeta) => {
          //   return Product.name
          // }
        },
      },
      {
        name: "User",
        label: "GST No.",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.GSTIN_number !== undefined ? User.GSTIN_number:"-"
          }
        },
      },
      {
        name: "User",
        label: "Pan No.",
        options: {
          display:false,
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.PAN_number !== undefined ? User.PAN_number:"-"
          }
        },
      },
      {
        name: "status",
        label: "Status",
        options: {
          sort:true,
          customBodyRender: (status, tableMeta) => {
            return status == true ? "Active" :"In-Active"
          }
        },
      },
      {
        name: "Beat",
        label: "Beat",
        options: {
          sort:false,
          customBodyRender: (Beat, tableMeta) => {
            return Beat!==undefined && Beat !==null ?Beat.code:null
          }
        },
      },
      {
        name: "Beat",
        label: "Beat Name",
        options: {
          sort:false,
          customBodyRender: (Beat, tableMeta) => {
            return Beat!==undefined && Beat !==null?Beat.name:null
          }
        },
      },
      {
        name: "Salesman",
        label: "Salesman Name",
        options: {
          sort:true,
          customBodyRender: (Salesman, tableMeta) => {
            return Salesman!==null && Salesman !== undefined?Salesman.name:null
          }
        },
      },
      {
        name: "Salesman",
        label: "Salesman Code",
        options: {
          sort:true,
          customBodyRender: (Salesman, tableMeta) => {
            return Salesman!==null &&Salesman !==undefined ? Salesman.code :null
          }
        },
      },
      {
        name: "User",
        label: "Universal Code",
        options: {
          sort:true,
          customBodyRender: (User, tableMeta) => {
            return User !== undefined && 
            User.universalCode !== undefined && User.universalCode !== null ? User.universalCode:"-"
          }
        },
      },
     
      {
        name: "User",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (User, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/user/edit/" + User.id+"/"+User.phone}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
                {/* <span
                  onClick={this.deleteCategory.bind(this, id)}
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
      enableNestedDataAccess:".",
      confirmFilters: this.state.isLoading,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() => this.handleFilterSubmit(applyNewFilters)}
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
    const imports='seller_customer'
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Seller Customer Mapping List</h4>
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
                      <li className="breadcrumb-item">
                      <Link to="/customer_kyc">Customer KYC</Link>
                    </li>
                      <li className="breadcrumb-item active">Seller Customer Mapping List</li>
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
                        <FormControl variant="outlined" className="col-sm-2 mx-1">
												
														<InputLabel
															htmlFor="outlined-age-native-simple"
															style={{ fontSize: '12px' }}
														>
															City Filter
														</InputLabel>
													
														<Select
															className="selectpicker"
															native
															name="cityFilter"
															value={this.state.cityFilter
															// 	?this.state.cityFilter
															// :localStorage.getItem('OrderPendingCity')
															
														}
															onChange={(val) => this.handleCityChange(val.target.value)}
															label="City Filter"
															className="my-2"
															style={{ height: '30px' }}
															// inputProps={{
															// 	name: 'Time Peroid',
															// 	id: 'outlined-age-native-simple',
															// }}
														>
															<option aria-label="None" value={null} />
															<option aria-label="None" value={'All'}>
																All
															</option>
															{this.props.city_list
																? this.props.city_list.map((d) => (
																		<option value={d.id}>{d.name}</option>
																  ))
																: 'No Seller'}
														</Select>
													</FormControl>
                          <FormControl variant="outlined" className="col-sm-2 mx-1">
															{/* {this.state.resetFilter?
															<InputLabel
																htmlFor="outlined-age-native-simple"
																style={{ fontSize: '12px' }}
																
															>
																Seller Filter
															</InputLabel>
															: */}
															<InputLabel
																htmlFor="outlined-age-native-simple"
																style={{ fontSize: '12px' }}
																
															>
																Seller Filter
															</InputLabel>
                                                                 {/* }  */}
															<Select
																search
																native
																name="sellerFilter"
																value={
																	// this.state.resetFilter?
																	this.state.sellerFilter
																	// :
																	// localStorage.getItem('OrderPendingSeller')
																}
																onChange={(val) =>
																	this.handleSellerChange(val.target.value)
																}
																label="Seller Filter"
																className="my-2"
																style={{ height: '30px' }}
																inputProps={{
																	name: 'Time Peroid',
																	id: 'outlined-age-native-simple',
																}}
															>
																<option aria-label="None" value={null} ></option>
																<option aria-label="None" value={'All'}>
																	All
																</option>
																{this.props.seller_list
																	? this.props.seller_list.map((d) => (
																			<option value={d.id}>{d.name}</option>
																	  ))
																	: 'No Seller'}
															</Select>
														</FormControl>
                          <FormControl variant="outlined" className="col-sm-2 mx-1">
													
														<InputLabel
															htmlFor="outlined-age-native-simple"
															style={{ fontSize: '12px' }}
														>
															Category Filter
														</InputLabel>
													
														<Select
															className="selectpicker"
															native
															name="categoryFilter"
															value={this.state.categoryFilter}
															onChange={(val) => this.handleCategory(val.target.value)}
															label="Category Filter"
															className="my-2"
															style={{ height: '30px' }}
															// inputProps={{
															// 	name: 'Time Peroid',
															// 	id: 'outlined-age-native-simple',
															// }}
														>	<option aria-label="None" value={null} />
                              <option aria-label="None" value={'All'}>
																All
															</option>
                              {
                                this.props.categoryData.map(cat=>{
                                  return(
                                    <option value={cat.id}>{cat.name}</option>
                                  )
                                })
                              }
														
														</Select>
													</FormControl>
                          <FormControl variant="outlined" className="col-sm-2 mx-1">
													
                          <InputLabel
                            htmlFor="outlined-age-native-simple"
                            style={{ fontSize: '12px' }}
                          >
                            Line Filter
                          </InputLabel>
                        
                          <Select
                            className="selectpicker"
                            native
                            name="lineFilter"
                            value={this.state.lineFilter }
                            onChange={(val) => this.handleLine(val.target.value)}
                            label="Line Filter"
                            className="my-2"
                            style={{ height: '30px' }}
                            inputProps={{
                              name: 'Time Peroid',
                              id: 'outlined-age-native-simple',
                            }}
                          >	<option aria-label="None" value={null} />
                           <option value={"658bfd05-4b45-4013-bbdb-c2d37e82ca4d"}>Line 1</option>
                          
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
                      
                        </div>

                        <div className="col-sm-3">
                          {
                            this.state.cityFilter !== '' && this.state.cityFilter !== "All"?
                            <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                            

                          >
                            <Tooltip
                              title="Download"
                              aria-label="download"
                              className="mr-2 mb-3"
                              onClick={() => {
                                this.downloadCsv();
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
                              title="Select City To Download"
                              aria-label="download"
                              className="mr-2 mb-3"
                              // onClick={() => {
                              //   this.downloadCsv();
                              // }}
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
                         
                        	<div className="col-sm-12">
													<FormControl>
														<div style={{ height: '8px' }}></div>
														<div className="form-group row">
															<div className="col-sm-9">
																<input
																	style={{ width: '190px', height: '10px' }}
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
																onClick={this.onsearchButton.bind()}
															>
																<i class="icofont icofont-search"> </i>
																<i style={{ fontSize: '9px', fontStyle: 'none' }}>
																	By Phone Number
																</i>
															</span>
													
														</div>
													</FormControl>
													<FormControl>
														{this.state.cancelButton == true ? (
															<div
																// style={{width:"20px"}}
																className="btn btn-secondary py-1 mx-3 mt-2"
																onClick={this.oncancelButton.bind(this)}
															>
																{/* <i class="icofont icofont-close-line-squared"></i> */}

																<i style={{ fontSize: '10px' }}>cancel</i>
															</div>
														) : null}
													</FormControl>
                          {localStorage.getItem('seller_customerImport')=='true'?
                       <>
                          <Link
                            to={"/importData/"+imports}
                            className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            Import
                          </Link>
                          <Link
                            to={"/importData/"+"phone"}
                            className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                           Phone Numbers Import
                          </Link>
                         
                          </>
                         :null}
                        
                        
												</div>
                         
                        
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                       
                            className="table-responsive"
                            data={this.props.seller_customer}
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    seller_customer:state.sellerCusMapping.seller_customer_list,
    countFilterWise:state.sellerCusMapping.countFilterWise,
    categoryData: state.category.category_list,

    isLoading: state.topDeal.isLoading,
    error: state.topDeal.error,
    kyc_list:state.kyc.kyc_list,
    seller_list: state.seller.seller_list,

		city_list: state.city.city_list,

  };
};
SellerCustomer.propTypes = {
  fetchSellerCustomer: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { 
  fetchSellerCustomer,
  fetchCustomerKyc2,
  fetchcityList,
  fetchCategoryList,
  fetchSellerList, })(SellerCustomer);

