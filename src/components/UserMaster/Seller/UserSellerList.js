
import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button,Switch } from "@material-ui/core";
import { fetchSellerList } from "../../../store/index";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import {  Tooltip,} from "@material-ui/core";
import Constant from '../../../Constant'
import Pagination from "react-js-pagination";

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
class SellerList extends React.Component {
  state = {
    pageNumber:1,
    open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    hidedownload: false,
    downdata: [],
    checked: false,
    datarange:0,
    dataLength:50,
    seller_list: [
      {
        // type: "Seller",
        seller_code: "Ad12",
        name: "Seller 1",
        area: "Charbha",
        address1: "Charbhag",
        contact_person: "Akhil",
        email: "sdfj@hng.vom",
        phoneNumber: "78555xxx0",
        pincode: "221006",
        GST_details: "GST_detailsPtr1233",
        partner_since: "2019",
        status: true,
        id: "1",
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
      status = "inactive";
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
  
  onChangePa(e) {
    e.preventDefault();
    const  datarange= this.state.datarange - 50
    const dataLength= this.state.dataLength 
    this.getSellerList(datarange,dataLength);
    this.setState({
      datarange: datarange ,
      dataLength: dataLength ,
    });
  }
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
   
    this.getSellerList(range,dataLength);
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }

  onChangePas(e) {
    e.preventDefault();
    const  datarange= this.state.datarange + 50
    const dataLength= this.state.dataLength 
    this.getSellerList(datarange,dataLength);
    this.setState({
      datarange: datarange ,
      dataLength: dataLength ,
    });
  }
  componentWillMount() {
    this.getSellerList(this.state.datarange,this.state.dataLength);
  }
  getSellerList(range,limit) {
    this.props.fetchSellerList(range,limit,'');
    console.log(this.props.seller_list);
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
  handleFilterSubmit = (applyFilters) => {
    let filterList = applyFilters;
    console.log("applied");
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };
  handleFilterSubmit = (applyFilters) => {
    this.setState({
      isLoading: true,
      seller_list: applyFilters,
      // CODPostpaidOrders: this.state.CODPostpaidOrders,
    });
  };
  exportCSV() {
    console.log(
      window.location.href = `${Constant.getAPI()}/seller/list?&csvReport=true&adminId=${localStorage.getItem('superadmin_id')}`

    )
    window.location.href = `${Constant.getAPI()}/seller/list?&csvReport=true&adminId=${localStorage.getItem('superadmin_id')}`;}
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
      // {
      //   name: "sellerType",
      //   label: "Type",
      //   options: {
      //     filter: true,
      //     sort: true,
        
      //   },
      // },
      {
        name: "unique_identifier",
        label: "Company Seller Id",
        options: {
          filter: true,
          sort: true,
         
        },
      },
      {
        name: "name",
        label: "Business Name",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Retailer, tableMeta) => {
          //   return <>{Retailer.name}</>;
          // },
        },
      },
      {
        name: "contact_person",
        label: "Contact Person",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Retailer, tableMeta) => {
          //   return <>{Retailer.contact_person}</>;
          // },
        },
      },
      {
        name: "phoneNumber",
        label: "Contact Number",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Retailer, tableMeta) => {
          //   return <>{Retailer.phoneNumber}</>;
          // },
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Retailer, tableMeta) => {
          //   return <>{Retailer.email}</>;
          // },
        },
      },
      // {
      //   name: "area",
      //   label: "Location",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (area, tableMeta) => {
      //       return <div>Lucknow</div>;
      //     },
      //   },
      // },
      // {
      //   name: "address1",
      //   label: "Address Line ",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      // {
      //   name: "pincode",
      //   label: "Pincode",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (pincode, tableMeta) => {
      //       return <div>221006</div>;
      //     },
      //   },
      // },
      {
        name: "GST_details",
        label: "GST Details",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (Retailer, tableMeta) => {
          //   return <>{Retailer.GST_details}</>;
          // },
        },
      },
      {
        name: "partner_since",
        label: "Partner Since",
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
      //       <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} />  
      //       );
      //     },
      //   },
      // },
    
    ];
    const options = {
      filter: true,
      filter: false,
       viewColumns: false,
      responsive: 'scrollMaxHeight',search:false,
      print: false,
      pagination:false,
      selectedRows: false,
      selectableRows: false,
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
      onFilterConfirm: (filterList) => {
        console.log("onFilterConfirm");
        console.dir(filterList);
      },
      onFilterDialogOpen: () => {
        console.log("filter dialog opened");
      },
      onFilterDialogClose: () => {
        console.log("filter dialog closed");
      },
      onFilterChange: (column, filterList, type) => {
        if (type === "chip") {
          var newFilters = () => filterList;
          console.log("updating filters via chip");
          // this.handleFilterSubmit(newFilters);
        }
      },
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
    const imports= 'seller'
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Seller List</h4>
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
                      <li className="breadcrumb-item active">Seller List</li>
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

                        {localStorage.getItem('SellerImport')=="true" || localStorage.getItem('role')==="other"?
                        <Link
                          to={"/importData/"+ imports}
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
                              }}                            >
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
                              }}                            >
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
                            data={this.props.seller_list}
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
                               {this.props.seller_list.length < 49 ? 
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
                                 totalItemsCount={this.props.countFilterWise}
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
    seller_list: state.seller.seller_list,
    countFilterWise: state.seller.countFilterWise,
    loginData: state.login,
    isLoading:state.seller.isLoading
  };
};
SellerList.propTypes = {
  fetchSellerList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchSellerList })(SellerList);