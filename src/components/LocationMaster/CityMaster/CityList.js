import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import "react-toggle/style.css"; // for ES6 modules
import MUIDataTable from "mui-datatables";
import {  Button ,Switch} from "@material-ui/core";
import AlertDialog from "../../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchcityList,cityStatusUpdateOne,CityUpdateOne, } from "../../../store/index";
import { withStyles } from '@material-ui/core/styles';
import Pagination from "react-js-pagination";

class CityList extends React.Component {
  state = {
    dataLength:50,
    datarange: 0,
    open: false,
    status:''
  };
  componentWillMount() {
    this.getCityList()
    console.log(localStorage.getItem("superadmin_auth"))

  }
  getCityList=()=>{
   this.props.fetchcityList(this.state.datarange,this.state.dataLength)
  }
 
 
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
  handleStatus=(status,id) => {
    console.log(status,id)
    this.props.cityStatusUpdateOne(id,status)

  
  }
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    this.props.fetchcityList(range,dataLength)

    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
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
        name: "name",
        label: "City Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "State",
        label: "State Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (State, tableMeta) => {
            return (
              <div>
                {
                  State !== undefined && State !== null && State !== {}
                    ?
                    State.name
                    : ""
  
                }
              </div>
            )
          }
        },
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (status, tableMeta) => {
            var id = tableMeta.rowData[3];
              // console.log(tableMeta.rowData);  
            return (
              <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} onChange={()=>this.handleStatus(status,id)} />   
            );
          },
        },
      },
      {
        name: "id",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          display: localStorage.getItem('role') === "admin" ?true :false,
          customBodyRender: (cityID, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/city/add/" + cityID}
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
         filter: false,
       viewColumns: false,
      responsive: 'scrollMaxHeight',search:false,
      print: false,
      pagination:false,
      download: false,
      confirmFilters: this.state.isLoading,
      customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="contained"
              onClick={() =>  alert("Filter Applied !")}
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
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>City List</h4>
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
                      <li className="breadcrumb-item active">City List</li>
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
                        
                      {localStorage.getItem('CityAdd') === 'true' ?
                        <Link
                          to="/city/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          City{" "}
                        </Link>

                        :null}
                        {/* <button
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </button> */}
                        {/* <button
                          className="f-right bg-white b-none"
                          data-modal="modal-13"
                        >
                          <Tooltip
                            title="Download"
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
                        </button> */}
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                          className="table-responsive"
                          data={this.props.city_list}
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
                              {this.state.dataLength}
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
    city_list: state.city.city_list,
    loginData: state.login,
    isLoading: state.city.isLoading,
    error: state.country.error,
    countFilterWise:state.city.countFilterWise,

  };
};
CityList.propTypes = {
  fetchcityList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { CityUpdateOne,fetchcityList,cityStatusUpdateOne })(CityList);