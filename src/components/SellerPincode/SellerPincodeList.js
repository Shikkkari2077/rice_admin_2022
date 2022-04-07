import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Tooltip, Button ,Switch,FormControl} from "@material-ui/core";
import { fetchSellerPincodeList } from "../../store/index";
import Pagination from 'react-js-pagination'
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';


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

class SellerPincodeList extends React.Component {
  state = {
    ProductSKU:'',
    open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    hidedownload: false,
    checked: false,
    openList: false,
    datarange:0,
    dataLength:50,
    seller_list: [
      {
        id: 1,
        pincode: "221005",
        areaName: "Varanasi",
        sellerid: [
          { seller: "seller" },
          { seller: "seller one" },
          { seller: "seller two" },
          { seller: "seller three" },
        ],
      },
      {
        id: 2,
        pincode: "221006",
        areaName: "Lucknow",
        sellerid: [
          { seller: "seller2"},
          { seller: "seller2 one"},
          { seller: "seller2 two"},
          { seller: "seller2 three"},
        ],
      },
    ],
  };

  handleStatusChange = (sid) => {
    var isChecked = $("#tyre_category_" + sid);
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = "active";
    } else {
      var status = "inactive";
    }
    let newArray = this.state.tyre_seller_list;
    var a = newArray.find((element) => {
      return element.id === sid;
    });
    a.status = status;
    console.log(newArray);
    this.setState({ tyre_seller_list: newArray });
    Swal.fire("Update Status!", "Status has been updated.", "success");
  };
  
  componentWillMount() {
    this.getSellerPincodeList(this.state.datarange,this.state.dataLength,"");
  }
  getSellerPincodeList(datarange,dataLength,pincode) {
    this.props.fetchSellerPincodeList(datarange,dataLength,pincode,'');
  }

  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
   
    this.getSellerPincodeList(range,dataLength,this.state.ProductSKU);   
     this.setState({
      datarange: range,

    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
 
  imgLoadError = (event) => {
    event.target.src = "./assets/images/icon.png";
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
            width: "150px",
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

  exportCSV() {
    window.location.href = `${Constant.getAPI()}/pincodeseller/list?&csvReport=true&`;}



    handleSearchinput(r){
      this.setState({
        search:r.target.value
      })
     }
     oncancelButton(){
    
  
      this.setState({
        cancelButton:false,
        search:"",
        ProductSKU:"",
      });
      this.getSellerPincodeList(0,50,"");

    }
     onsearchButton=()=>{
      var ProductSKU=this.state.search;
  
      this.setState({
        cancelButton:true,
        ProductSKU,
      })
  
      this.getSellerPincodeList(this.state.datarange,this.state.dataLength,ProductSKU);
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
        name: "PinCode",
        label: "Pincode ID",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Pincode,tableMeta)=>{
            return <>{Pincode.code}</>
          }
        },
      },
      {
        name: "Seller",
        label: "Company Seller Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(Seller,tableMeta)=>{
            return Seller.unique_identifier
          }
        },
      },
      {
        name: "DeliveryUserSellerPincodes",
        label: "Delivery Person",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(SelDeliveryUserSellerPincodesler,tableMeta)=>{
            return(
              SelDeliveryUserSellerPincodesler !==undefined && SelDeliveryUserSellerPincodesler!== null && SelDeliveryUserSellerPincodesler !==[]?
              SelDeliveryUserSellerPincodesler.map(d=>(
               <li>
                 {d.DeliveryUser.firstName +" "+d.DeliveryUser.lastName+"("+d.DeliveryUser.uniqueId+")" }
              </li>
              ))
          
              :null

            )
          }
        },
      },

      {
        name: "status",
        label: "Status",
        options: {
          display:localStorage.getItem('SellerPincodeUpdate')=='true'?true:false,
          filter: true,
          sort: true,
          customBodyRender: (status, tableMeta) => {
            return (
              <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} />  

            );
          },
        },
      },
      // {
      //   name: "id",
      //   label: "Action",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return (
      //         <div>
      //           <Link
      //             to={"/sellerpincode/add/" + id}
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
      responsive: 'scrollMaxHeight',search:false,
      pagination:false,
      selectedRows: false,
      selectableRows: false,
      print: false,
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
    const imports = 'sellerpincode';
    return (
      
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Seller Pincode List</h4>
                    </div>
                  </div>
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
                      <li className="breadcrumb-item active">
                        Seller Pincode List
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* {this.state.openList ? (
              <div className="">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-block">jndjkfnnd</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null} */}
            <div className="page-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-block">
                      <div className="col">
                        {/* <Link
                          to="/sellerpincode/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i>Add
                          Seller Pincode{" "}
                        </Link> */}
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
                  <i style={{fontSize:"9px",fontStyle:"none"}}  >By Pincode</i> 
                                  </span>
                                  {/* <span 
                 className="btn btn-dark py-1 mx-3 mt-2"
                 onClick={this.onsearchNameButton.bind(this)}>
                                  <i 
                  class="icofont icofont-search"
                  >
                  </i>
                  <i style={{fontSize:"9px"}}  >By Product Name</i> 
                                  </span> */}
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
                        
                        {localStorage.getItem('role')==="admin" || localStorage.getItem('role')==="other"?
                        <Link
                          to={"/importData/"+imports}
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import 
                        </Link>
                        :null}
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
                        )}
                      </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.sellerPincode_list}
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
    sellerPincode_list: state.sellerPincode.sellerPincode_list,
    countFilterWise: state.sellerPincode.countFilterWise,

    loginData: state.login,
    isLoading: state.sellerPincode.isLoading,
  };
};
SellerPincodeList.propTypes = {
  fetchSellerPincodeList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchSellerPincodeList })(
  SellerPincodeList
);
