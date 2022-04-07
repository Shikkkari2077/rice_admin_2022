/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import Toggle from "react-toggle";
import { connect } from "react-redux";
import Pagination from 'react-js-pagination'

import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {fetchNewArrivalList,fetchPincodeList,fetchSellerList} from '../../store/index';
import { withStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormLabel,
  Tooltip,
  Switch,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
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

class NewArrivals extends Component {
  state = {
    open: false,
    isLoading: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    dataLength:50,
    datarange:0,
    sellerFilter:'',
    pincodeFilter:'',
    
  };
  
  componentWillMount(){
    this.getNewarrivalList(this.state.datarange, this.state.dataLength)
    this.props.fetchSellerList(0,25000,'')
    this.props.fetchPincodeList("",0,2500)
  }

    getNewarrivalList(range,limit,seller){
      console.log(range,limit)
      
      this.props.fetchNewArrivalList(range,limit,seller)

  }
  handlePageChange(pageNumber) {
    console.log(localStorage.getItem('sellerProductCount'))
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
  
    this.getNewarrivalList(range,dataLength,seller);
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  onChangePa(e) {
    e.preventDefault();
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    const datarange = this.state.datarange - 50;
    const dataLength = this.state.dataLength;
    this.getNewarrivalList(datarange,dataLength,seller);
    this.setState({
      datarange: datarange,
    });
  }
  onChangePas(e) {
    e.preventDefault();
    var seller = this.state.sellerFilter;
    var pincode = this.state.pincodeFilter;
    const datarange = this.state.datarange + 50;
    const dataLength = this.state.dataLength;
    this.getNewarrivalList(datarange,dataLength,seller);
    this.setState({
      datarange: datarange,
    
    });
  }
 
  handlepincodeChange=(v)=>{
    this.setState({
      pincodeFilter: v,
    });
  
}
handleSellerChange = (v) => {
  this.setState({
    sellerFilter: v,
  });
 
};
onGo = () => {
  this.getNewarrivalList(
    0, //range
    50, //length
    this.state.sellerFilter
  );

this.setState({

  datarange:0
})
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
  downloadCsv(){
    console.log(
      window.location.href =`${Constant.getAPI()}/homepage/download?model=new_arrival?model=new-arrival&sellerId=${
        this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""}`
    )
    window.location.href =`${Constant.getAPI()}/homepage/download?model=new-arrival&sellerId=${
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
      // {
      //   name: "PinCode.code",
      //   label: "Pincode",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      {
        name: "Product",
        label: "Company SKU Code",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Product, tableMeta) => {
            return Product.SKU ? Product.SKU :"-"
          }
        },
      },
      // {
      //   name: "Seller.unique_identifier",
      //   label: "Company Seller Id",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      {
        name: "Seller.name",
        label: "Seller Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "status",
      //   label: "Status",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (status, tableMeta) => {
      //       return (
      //         <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} />
      //       );
      //     },
      //   },
      // },
      // {
      //   name: "id",
      //   label: "Action",
      //   options: {
      //     display:localStorage.getItem('NewArrivalUpdate')=='true'?true:false,
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return (
      //         <div>
      //           <Link
      //             to={"/new-arrivals/add/" + id}
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
      enableNestedDataAccess:'.',
      pagination:false,
      download: false,
      fixedHeader:true,
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
    const imports="newArrival"
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>New Arrivals</h4>
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
                      <li className="breadcrumb-item active">New Arrivals</li>
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
                     {/* <FormControl
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
                              <option aria-label="None" value={""} >Reset</option>
                              {this.props.pincode_list ?
                              this.props.pincode_list.map(d=> 
                                <option value={d.code}>{d.code}</option>
                              )
                              :"No Pinocde"
                              }
                            </Select>
                          </FormControl> */}
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
                          to={"/new-arrivals/add"}
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          New Arrivals{" "}
                        </Link> */}
                        {localStorage.getItem('NewArrivalImport')=='true'?
                        <Link
                            to={"/importData/"+imports}
                            className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                            data-modal="modal-13"
                          >
                            Import
                          </Link>:null}
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                            onClick={this.downloadCsv.bind(this)}
                          >
                           
                              <i
                                className="icofont icofont-download-alt"
                                style={{
                                  fontSize: "30px",
                                  color: "grey",
                                }}
                              ></i>
                          </button>
                      
                      </div>
                      </div>
                     <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.newArrival}
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
    newArrival: state.newArrival.newArrival_list,
    countFilterWise: state.newArrival.countFilterWise,

    loginData: state.login,
    isLoading: state.newArrival.isLoading,
    error: state.newArrival.error,
    pincode_list: state.pincode.pincode_list,
    seller_list: state.seller.seller_list,
  };
};
NewArrivals.propTypes = {
  fetchNewArrivalList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { fetchNewArrivalList ,fetchPincodeList,fetchSellerList})(NewArrivals);
