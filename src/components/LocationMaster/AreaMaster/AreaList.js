import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Constant from "../../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import AlertDialog from "../../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Tooltip, Button,Switch } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPincodeList } from "../../../store/index";
import Pagination from "react-js-pagination"
import { withStyles } from '@material-ui/core/styles';
import {FormControl} from "@material-ui/core";



class AreaList extends React.Component {
  state = 
  { open: false,
    dataLength:50,
    datarange:0 
  
  
  };
  handleSearchinput(r){
    this.setState({
      search:r.target.value
    })
   }
   oncancelButton(){
     var city=''
    this.props.fetchPincodeList(city,this.state.datarange,this.state.dataLength);

   
    this.setState({
      cancelButton:false,
      search:"",
      Pincode:"",
    });

  }
   onsearchButton=()=>{
    var Pincode=this.state.search;

    this.setState({
      cancelButton:true,
      Pincode,
    })
    var city=''
    this.props.fetchPincodeList(city,this.state.datarange,this.state.dataLength,Pincode);
}
 


  handleStatusChange = (sid) => {
    var isChecked = $("#area_status_" + sid);
    isChecked.prop("checked", !isChecked.prop("checked"));
    console.log(isChecked.prop("checked"), !isChecked.prop("checked"));
    if (!isChecked.prop("checked") === true) {
      var status = "active";
    } else {
      var status = "inactive";
    }
    let newArray = this.state.area_list;
    var a = newArray.find((element) => {
      return element.areaID === sid;
    });
    a.status = status;
    console.log(newArray);
    this.setState({ area_list: newArray });
    Swal.fire("Update Status!", "Status has been updated.", "success");
  };
 
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    var city=''
    this.props.fetchPincodeList(city,range,dataLength,this.state.Pincode);

    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  async componentWillMount() {
    const response = await this.getAreaList();
    // console.log("wait");
     console.log(response);
    // console.log(localStorage.getItem('role'))
    // if()
    // const json = await response.json();
    // this.setState({ data: json });
  }
  getAreaList = () => {
    var city=''
    this.props.fetchPincodeList(city,this.state.datarange,this.state.dataLength);
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
  exportCSV() {
    window.location.href = `${Constant.getAPI()}/pincode/download?code=${this.state.Pincode !== undefined ?this.state.Pincode :""}&`;
   
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
        name: "City",
        label: "City",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(City,tableMeta)=>{
          return City.State.Country.name
          }
        },
      },
      {
        name: "City",
        label: "State",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(City,tableMeta)=>{
            return City.State.name
            }
        },
      },
      {
        name: "City",
        label: "City",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(City,tableMeta)=>{
            return City.name
          }
        },
      },
      {
        name: "area",
        label: "Area Name",
        options: {
          filter: true,
          sort: true,
        },
        // }, {
        //   name: "active",
        //   label: "Status",
        //   options: {
        //     filter: true,
        //     sort: true,
        //     customBodyRender: (active, tableMeta) => {
        //       return <div>
        //         {active === true ? "Active" : "Inactive"}
        //       </div>
        //     }
        //   }
      },
      {
        name: "code",
        label: "Pincode",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "territory",
        label: "Territory",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "region",
        label: "Region",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "zone",
        label: "Zone",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "cluster",
        label: "Cluster",
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
      //       var country_id = tableMeta.rowData[1];
      //       //console.log(tableMeta);
      //       return (
      //         <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} />
             
      //       );
      //     },
      //   },
      // },
      {
        name: "id",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          display: localStorage.getItem('role') ==="admin"? true : false ,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                {localStorage.getItem('role')==="admin"?
                <Link
                  to={"/area/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
                :null}
                {/* <span
                  onClick={this.deleteArea.bind(this, id)}
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
   const imports="pincode"
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Area List</h4>
                    </div>
                  </div>
                  {/* <Link
                    to="/area/add"
                    className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                    data-modal="modal-13"
                  >
                    {" "}
                    <i className="icofont icofont-plus m-r-5"></i> Add Area
                  </Link> */}
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">Area List</li>
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
                      <div className="col-sm-9">
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


                          </div>

                        {/* */}
                     
                      {localStorage.getItem('role')==="admin"?
                        <Link
                          to="/area/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Area{" "}
                        </Link>

                        :null}
                           {localStorage.getItem('Locationimport') =='true' ?
                        <Link
                          to={"/importData/"+ imports}
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link>
                        : null}
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
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.props.pincode_list}
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
                              {this.state.datarange+this.state.dataLength}
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
    pincode_list: state.pincode.pincode_list,
    loginData: state.login,
    isLoading: state.pincode.isLoading,
    error: state.pincode.error,
    countFilterWise:state.pincode.countFilterWise,
  };
};
AreaList.propTypes = {
  fetchPincodeList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchPincodeList })(AreaList);
