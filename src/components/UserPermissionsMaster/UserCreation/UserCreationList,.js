import React from "react";
import { Link } from "react-router-dom";
// import $ from "jquery";
// import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAdmins} from "../../../store/index";
import { Tooltip, Button,Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "react-js-pagination";


class UserCreationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datarange:0,
      dataLength:10,
      activePage:1,
    };
  }
  handleStatus(status,id){
    console.log(status,id)
  }
 
  componentWillMount() {
    this.props.fetchAdmins("",this.state.datarange,this.state.dataLength)
  }

 
  onError = () => {
    Swal.fire({
      title: "Something went wrong. Try again after some Time.!",
      icon: "error",
      text: "",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
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
  handlePageChange=(pageNumber)=>{
    const range=pageNumber*10-10
    this.props.fetchAdmins("",range,this.state.dataLength)
    this.setState({
      datarange:range
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
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
    //   {
    //     name: "title",
    //     label: "First Name",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },  {
    //     name: "title",
    //     label: "Last Name",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        },
      },  {
        name: "phone",
        label: "Mobile No",
        options: {
          filter: true,
          sort: true,
        },
      },  {
        name: "UM_AdminGroup",
        label: "Group",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(UM_AdminGroup)=>{
              return(
              UM_AdminGroup !==null?
            UM_AdminGroup.name:null
          )}
        },
      }, 
       {
        name: "openOrderMail",
        label: "Mail Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(openOrderMail)=>{
              return(
                <span
                style={{
                  color: "white",
                  background: "grey",
                  fontSize: "10px",
                  borderRadius: "5px",
                  padding: "1px",
                  whiteSpace: "nowrap",
                }}
              >
                {openOrderMail === true ?"Active":"In-Active"}
                </span>

              )
          }
        },
      },
      {
        name: "AdminCities",
        label: "City Assigned",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(AdminCities)=>{
              return(
                AdminCities !==undefined && AdminCities !== null?
                AdminCities.map(city=>(
                     <li>{city.City.name}</li> 
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
          filter: true,
          sort: false,
          customBodyRender: (status, tableMeta) => {
              // var id = tableMeta.rowData[0];
              //  console.log(tableMeta.rowData[0],id);
            return (
           <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} 
            onChange={()=>this.handleStatus.bind(status,tableMeta.rowData[7])} 
           />   
  
            );
          },
        },
      },  
    
      {
        name: "id",
        label: "Edit User Details",
        options: {
          display:localStorage.getItem('role')=='admin'?true:false,
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return (
             
                
                <Link
                  to={"/user/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
              

              

             
            );
          },
        },
      },
      // {
      //   name: "id",
      //   label: "Edit Pincodes",
      //   options: {
      //     display:localStorage.getItem('role')=='admin'?true:false,
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return (
            
             
      //           <Link
      //             to={"/user/add_pincode/" + id}
      //             className="m-r-15 text-muted"
      //             data-toggle="tooltip"
      //             data-placement="top"
      //             title=""
      //             data-original-title="Edit"
      //           >
      //             <i className="f-20 icofont icofont-ui-edit text-primary"></i>
      //           </Link>

              

            
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
      fixedHeader:true,
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
          noMatch: !this.props.templates
          ? <div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}> Sorry, No Data Found
          </div>
          : <div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}>
          <p style={{textAlign:'center'}}>
          Loading data..!
          </p>
          </div>,
        
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
        filter: {
          all: "All",
          title: "FILTERS",
          reset: "RESET",
        },
        // selectedRows: {
        //   text: `row(s) Selected`,
        //   download: "Download",
        //   downloadAria: "Download Selected Rows",
        // },
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
                      <h4>User List</h4>
                    </div>
                  </div>
                  {/* <CSVLink
                    data={this.props.categoryData}
                    filename={"my-file.csv"}
                    className="btn btn-primary"
                    target="_blank"
                  >
                    Download me
                  </CSVLink> */}
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
                      <li className="breadcrumb-item active">User List</li>
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
                        
                      {localStorage.getItem('role')==="admin"?
                      
                        <Link
                          to="/user/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >

                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          User{" "}
                        </Link>
                        :null}
                       
                      </div>
                      <br/><br/><br/>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                         
                          className="table-responsive"
                          data={this.props.admins}
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
                              {this.state.dataLength+this.state.datarange}
                            </li>
                            <Pagination
                              itemClass="page-item"
                              linkClass="page-link"
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                 totalItemsCount={this.props.countFilterWise}
                                 pageRangeDisplayed={15}
                               onChange={this.handlePageChange.bind(this)}
                              />
                           
                          </ul>
                        </nav>
                        {/* <AlertDialog
                          open={this.state.open}
                          func={this.handleClose}
                        /> */}
                        {this.props.error === false ? this.onError() : null}
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
    admins:state.userManagment.admin_list,
    countFilterWise:state.userManagment.countFilterWise

  };
};
UserCreationList.propTypes = {
    fetchAdmins: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {fetchAdmins})(UserCreationList);