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
    fetchcustomercategory,
  fetchCustomerKyc2,
  fetchCategoryList,
  fetchSellerList,
fetchcityList} from '../../store/index'
import {
 
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

class CustomerIntrestedCategory extends Component {
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
   this.props.fetchcustomercategory(0,50)
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
  this.props.fetchcustomercategory( 
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
  console.log(`${Constant.getAPI()}/homepage/download-csv?mode=top-deal&pincode=${
    this.state.pincodeFilter !== undefined ? this.state.pincodeFilter : ""}&seller=${
       this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
     }`
   )

  window.location.href =`${Constant.getAPI()}/homepage/download-csv?model=top-deal&pincode=${
    this.state.pincodeFilter !== undefined ? this.state.pincodeFilter : ""
 }&seller=${this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""}`

 
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

  this.props.fetchcustomercategory(
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

  this.props.fetchcustomercategory(
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

  this.props.fetchcustomercategory(
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
        name: "customerName",
        label: "Customer Name",
        options: {
          sort:false,
          
        },
      },
     
     
    
      {
        name: "Categories",
        label: "Intrested Categories",
        options: {
          sort:false,
          customBodyRender: (Categories, tableMeta) => {
            return (
                Categories !== undefined && Categories.length !== 0 ?
              Categories.map(cat=>{
                return(
                   
                    <li>{cat.name}</li>
                  
                )
               
              })

              :"-"
            )
          }
        },
      },
      {
        name: "id",
        label: "Seller mapping",
        options: {
          filter: false,
          sort: false,
          display:true,
          customBodyRender:(id)=>{
            return(
              <Link to={'/seller_customer_mapping/add/'+id+"/"+"Interested"}>
              <i className="f-22 icofont icofont-edit">
  
              </i>
              </Link>
            )
          }
       
        },
      },
      
      {
        name: "customerCode",
        label: "Customer Code",
        options: {
          sort:false,
         
        },
      }, 
      
     
    //   {
    //     name: "User",
    //     label: "City",
    //     options: {
    //       sort:true,
    //       customBodyRender: (User, tableMeta) => {
    //         return User !== undefined && 
    //         User.city !== undefined ? User.city:"-"
    //       }
    //     },
    //   }, {
    //     name: "User",
    //     label: "State",
    //     options: {
    //       sort:true,
    //       customBodyRender: (User, tableMeta) => {
    //         return User !== undefined && 
    //         User.state !== undefined ? User.state:"-"
    //       }
    //     },
    //   },

     
      {
        name: "phone",
        label: "Phone",
        options: {
          sort:false,
         
        },
      },
      {
        name: "alternateNumber",
        label: "Alternate No.",
        options: {
          sort:false,
         
        },
      },
  
   
      {
        name: "email",
        label: "Email",
        options: {
          sort:false,
       
        },
      },
    //   {
    //     name: "User",
    //     label: "Registration Date",
    //     options: {
    //       sort:true,
    //       customBodyRender: (User, tableMeta) => {
    //         return User !== undefined && 
    //         User.registrationDate !== undefined ? User.registrationDate:"-"
    //       }
    //     },
    //   },
      {
        name: "User",
        label: "geography",
        options: {
          sort:false,
        
        },
      },
    //   {
    //     name: "Product",
    //     label: "Customer group",
    //     options: {
    //       sort:true,
         
    //     },
    //   },
    
  
    
     
      {
        name: "universalCode",
        label: "Universal Code",
        options: {
          sort:false,
       
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
                      <h4>Customer Intrested category List</h4>
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
                        {/* <FormControl variant="outlined" className="col-sm-2 mx-1">
												
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
														
															
														}
															onChange={(val) => this.handleCityChange(val.target.value)}
															label="City Filter"
															className="my-2"
															style={{ height: '30px' }}
														
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
													</FormControl> */}
                          {/* <FormControl variant="outlined" className="col-sm-2 mx-1">
														
															<InputLabel
																htmlFor="outlined-age-native-simple"
																style={{ fontSize: '12px' }}
																
															>
																Seller Filter
															</InputLabel>
                                                                 {/* } 
															<Select
																search
																native
																name="sellerFilter"
																value={
																	this.state.sellerFilter
																	
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
														</FormControl> */}
                          {/* <FormControl variant="outlined" className="col-sm-2 mx-1">
													
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
													</FormControl> */}
                          {/* <FormControl variant="outlined" className="col-sm-2 mx-1">
													
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
                       */}
                        </div>

                        {/* <div className="col-sm-3">
                       
                       {localStorage.getItem('seller_customerImport')=='true'?
                          <Link
                            to={"/importData/"+imports}
                            className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            Import
                          </Link>
                         :null} </div> */}
                         								<div className="col-sm-9">
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
    seller_customer:state.sellerCusMapping.intrested_Categories,
    countFilterWise:state.sellerCusMapping.countFilterWise,
    categoryData: state.category.category_list,

    isLoading: state.topDeal.isLoading,
    error: state.topDeal.error,
    kyc_list:state.kyc.kyc_list,
    seller_list: state.seller.seller_list,

		city_list: state.city.city_list,

  };
};
CustomerIntrestedCategory.propTypes = {
  fetchcustomercategory: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { 
    fetchcustomercategory,
  fetchCustomerKyc2,
  fetchcityList,
  fetchCategoryList,
  fetchSellerList, })(CustomerIntrestedCategory);

