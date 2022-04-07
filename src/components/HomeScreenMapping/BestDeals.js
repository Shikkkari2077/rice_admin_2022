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
  fetchTopDealsList,
  fetchSellerList,
  TopDealStatusUpdate,
  fetchPincodeList} from '../../store/index'
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
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

class BestDeals extends Component {
  state = {
    open: false,
    isLoading: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    sellerFilter:'',
    pincodeFilter:'',
    dataLength:50,
    datarange:0,
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
  
  componentWillMount(){
    this.getTopdeals(this.state.sellerFilter,this.state.datarange)
    this.props.fetchSellerList(0,25000,'')
    this.props.fetchPincodeList("",0,2500)
  }
  getTopdeals(seller,range){
    console.log(range)
    this.props.fetchTopDealsList(seller,range,this.state.dataLength)
    // console.log(this.props.topDeal)
  }
  handlepincodeChange=(v)=>{
    this.setState({
      pincodeFilter: v,
    });
    console.log(v)
    var seller=this.state.sellerFilter
    var pincode=v
    
      //this.getTopdeals(seller,pincode,this.state.datarange,this.state.dataLength)
}
handleSellerChange = (v) => {
  this.setState({
    sellerFilter: v,
  });
  var seller=v
  var pincode=this.state.pincodeFilter
    //this.getTopdeals(seller,pincode,this.state.datarange,this.state.dataLength)
};
onGo = () => {
  this.getTopdeals(this.state.sellerFilter,0)
 

this.setState({
dataLength:50,
datarange:0
})
};
handlePageChange(pageNumber) {
  console.log(localStorage.getItem('sellerProductCount'))
  console.log("active page is", pageNumber);
  console.log(pageNumber*50-50)
  var seller = this.state.sellerFilter;
  var pincode = this.state.pincodeFilter;
  const range=pageNumber*50-50
  const dataLength = this.state.dataLength;

  this.getTopdeals(seller,range);
  this.setState({
    datarange: range,
    dataLength: dataLength,
  });
  this.setState({activePage: pageNumber});
  console.log(range,dataLength)
}
// onChangePa(e) {
//   e.preventDefault();
//   var seller = this.state.sellerFilter;
//   var pincode = this.state.pincodeFilter;
//   const datarange = this.state.datarange - 50;
//   const dataLength = this.state.dataLength;
//   this.getTopdeals(seller, pincode,datarange,dataLength);
//   this.setState({
//     datarange: datarange,
//     dataLength: dataLength,
//   });
// }
// onChangePas(e) {
//   e.preventDefault();
//   var seller = this.state.sellerFilter;
//   var pincode = this.state.pincodeFilter;
//   const datarange = this.state.datarange + 50;
//   const dataLength = this.state.dataLength;
//   this.getTopdeals(seller,pincode,datarange,dataLength);
//   this.setState({
//     datarange: datarange,
//     dataLength: dataLength,
//   });
// }
updatestatus(e){
console.log(e.target.value)
}
downloadCsv(){
  console.log(
    //`${Constant.getAPI()}/homepage/download-csv?mode=top-deal&pincode=${
    // this.state.pincodeFilter !== undefined ? this.state.pincodeFilter : ""}&sellerId=${
    //    this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
    //  }`
   )

  window.location.href =`${Constant.getAPI()}/homepage/download?model=top-deal&sellerId=${
    this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""}`

 
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
          },
        },
      },

      {
        name: "Product",
        label: "Label",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Product, tableMeta) => {
            return Product.name
          }
        },
      },
     
      {
        name: "Product",
        label: "Company SKU Code",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Product, tableMeta) => {
            return Product.SKU?Product.SKU:"-"
          }
        },
      },

      {
        name: "Seller.name",
        label: "Company Seller Name",
        options: {
          filter: true,
          sort: true
        },
      },
      // {
      //   name: "available",
      //   label: "Status",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (available, tableMeta) => {
      //       return (
      //         <AntSwitch checked={available === true ? true : false} name="checkedC" value={available} onClick={this.updatestatus.bind(this)} />

      //       );
      //     },
      //   },
      // },
      {
        name:"home_id",
        label:"home",
        options:{
          display:false,

          filter: true,
          sort: true,
        },

      },
      // {
      //   name: "id",
      //   label: "Action",
      //   options: {
      //     display: localStorage.getItem('BestDealUpdate')=='true'?true:false ,
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return (
      //         <div>
      //           <Link
      //             to={"/best-deals/add/" + id}
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
    const imports='top-deals'
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Best Deals</h4>
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
                      <li className="breadcrumb-item active">Best Deals</li>
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
                       
                          <FormControl
                            variant="outlined"
                            className="col-sm-2 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              Seller Filter
                            </InputLabel>
                            <Select
                              native
                              name="sellerFilter"
                              value={this.state.sellerFilter}
                              onChange={(val) =>
                                this.handleSellerChange(val.target.value)
                              }
                              label="Seller Filter"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option aria-label="None" value={null} />
                              <option aria-label="None" value={""} >Reset</option>
                              {this.props.seller_list ?
                              this.props.seller_list.map(d=> 
                                <option value={d.id}>{d.name}</option>
                              )
                              :"No Seller"
                              }
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
                          {/* <Link
                            to={"/best-deals/add"}
                            className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            {" "}
                            <i className="icofont icofont-plus m-r-5"></i> Add
                            Best Deals{" "}
                          </Link> */}
                       {localStorage.getItem('BestDealImport')=='true'?
                          <Link
                            to={"/importData/"+imports}
                            className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            Import
                          </Link>
                         :null}
                          <button
                              className="f-right bg-white b-none"
                              data-modal="modal-13"
                              onClick={this.downloadCsv.bind(this)}
                            >  <i
                                  className="icofont icofont-download-alt"
                                  style={{
                                    fontSize: "30px",
                                    color: "grey",
                                  }}
                                ></i>
                            
                            </button>
                         
                        </div>
                      </div>
                      {
                        console.log(this.props.topDeal)
                      }
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                       
                            className="table-responsive"
                            data={this.props.topDeal}
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
    topDeal: state.topDeal.topDeals_list,
    countFilterWise:state.topDeal.countFilterWise,
    loginData: state.login,
    isLoading: state.topDeal.isLoading,
    error: state.topDeal.error,
    pincode_list: state.pincode.pincode_list,
    seller_list: state.seller.seller_list,
  };
};
BestDeals.propTypes = {
  fetchTopDealsList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { fetchTopDealsList,fetchSellerList,TopDealStatusUpdate,
  fetchPincodeList })(BestDeals);

