
import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button,Switch } from "@material-ui/core";
import { fetchSellerList,resetinvoice } from "../../store/index";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import {  Tooltip,} from "@material-ui/core";
import Constant from '../../Constant'
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
class SellerInvoiceList extends React.Component {
  state = {
    pageNumber:1,
    datarange:0,
     dataLength:50
    
  };
  
  
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

 
  componentDidMount() {
    this.props.fetchSellerList(0,50000,'');  }
  
 
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
  reset(id,e){
     Swal.fire({
         title:"Are You Sure",
         text:'Changes Can\'t be Reverted',
         icon:"warning",
         confirmButtonText:"Confirm",
         showCancelButton: true,
     }).then((result) => {
        
        if (result.isConfirmed) {
          this.props.resetinvoice(true,id)
        } 
      })
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
        name: "sellerType",
        label: "Type",
        options: {
          filter: true,
          sort: true,
        
        },
      },
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
       
        },
      },
   
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        
        },
      },
     
    //   {
    //     name: "GST_details",
    //     label: "GST Details",
    //     options: {
    //       filter: true,
    //       sort: true,
        
    //     },
    //   },
      {
        name: "transaction_series_name",
        label: "Transaction Series Name",
        options: {
          filter: true,
          sort: true,
        
        },
      },
      {
        name: "transaction_series_code",
        label: "Transaction Code",
        options: {
          filter: true,
          sort: true,
        
        },
      },
     
      {
        name: "current_series_value",
        label: "Current Value",
        options: {
          filter: true,
          sort: true,
        
        },
      },
      {
        name: "reset_cycle_frequency",
        label: "Reset Frequency",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(reset_cycle_frequency,tableMeta)=>(
            reset_cycle_frequency ==='manual'?
            <i 
            className="f-20 icofont icofont-refresh "
            onClick={this.reset.bind(this,tableMeta.rowData[8])}
            ></i> 
            :"Yearly"
          )
        
        },
      },
      {
        name: "id",
        label: "Action",
        options: {
          
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/seller/invoice/update/" + id}
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
                      <h4>Seller Invoice Details</h4>
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
                      <li className="breadcrumb-item active">Seller Invoice Details</li>
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
                      <div className="col-sm-12">
                       
                     
                       
                        
                        </div>
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
SellerInvoiceList.propTypes = {
  fetchSellerList: PropTypes.object.isRequired,
  resetinvoice:PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
     fetchSellerList ,
     resetinvoice,
    })(SellerInvoiceList);