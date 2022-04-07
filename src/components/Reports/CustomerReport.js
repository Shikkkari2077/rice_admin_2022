/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Constant from "../../Constant";
import Swal from "sweetalert2";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from "react-toggle";
import MUIDataTable from "mui-datatables";
import { Tooltip ,Button,Switch} from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchuserList } from "../../store/index";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import CustomerReport1 from "./CustomerReport1";
import Pagination from "react-js-pagination";
import moment from 'moment'

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

class CustomerReport extends React.Component {
  state = {open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    data: [],
    hidedownload: false,
    Userss_data: [
   
    ],
    language_data: [],
    datarange:0,
    dataLength:50
  };

  handleSelect = (e, id) => {
    console.log(e)
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    let newArray = [];
    console.log(this.state.checkedItems);
    if (this.props.user_list !== undefined) {
      newArray = this.props.user_list.filter((d) => {
        // console.log(d)
        let searchValue = d.id;
        return searchValue.indexOf(item) !== -1;
      });
    }
    if (isChecked == true) {
      this.setState({
        downdata: [...this.state.downdata, newArray],
      });
      console.log([...this.state.downdata, newArray]);
      console.log(this.state.hidedownload);
    } else {
      var array = this.state.downdata;
      var index;
      for (let i = 0; i < this.state.downdata.length; i++) {
        var temp = this.state.downdata[i];
        for (let j = 0; j < temp.length; j++) {
          if (temp[j].id == newArray[0].id) {
            index = i;
            console.log(index);
            break;
          }
        }
      }
      if (index !== -1) {
        array.splice(index, 1);
      }
      console.log(array);
      this.setState({ downdata: array });
    }
  };

  
  componentWillMount() {
    this.getUsersList(this.state.datarange,this.state.dataLength);
  }
  
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
 
    this.getUsersList(range,dataLength);
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  
 
  
  getUsersList = (range,length) => {
   this.props.fetchuserList(range,length)
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
    let newArray = this.state.Userss_data.filter((d) => {
      // console.log(d)
      let searchValue = d.id;
      return searchValue.indexOf(item) !== -1;
    });
    console.log(newArray);
    this.setState({
      downdata: [...this.state.downdata,newArray],
    });
    console.log(this.state.downdata)
  };
  exportCSVS(){
    console.log(this.state.downdata)
     var csvRow = [];
    var A = [
      [
        "First Name",
        "Last Name",
        "Email",
        "Contact",
        "Customer ID",
        "Customer Type",
        "Date & Time",
        // "Default PinCode",
        // "Device ID",
        // "Device Token",
        "Device Platform",
      ],
    ];
    
    var re = this.state.downdata;
    for (var item = 0; item < re.length; item++) {
      for(var a=0;a<1;a++){

      console.log( re[item][a].firstName)
        
        A.push([
          re[item][a].firstName,
          re[item][a].lastName,
          re[item][a].email,
          re[item][a].phone,
          re[item][a].customer_id_number,
          re[item][a].type,
           moment( re[item][a].createdAt).format("YYYY-MM-DD HH:mm:ss"),
         // re[item].defaultPincode?re[item].defaultPincode:'--',
          //re[item].RefreshTokens !==[] && re[item].RefreshTokens!==null && re[item].RefreshTokens !== undefined ?re[item].RefreshTokens[0]?re[item].RefreshTokens[0].deviceId:'--':'--',
          //re[item].RefreshTokens !==[] && re[item].RefreshTokens!==null && re[item].RefreshTokens !== undefined ?re[item].RefreshTokens[0]?re[item].RefreshTokens[0].token:'--':'--',
          re[item][a].RefreshTokens !==[] && re[item][a].RefreshTokens!==null &&
                re[item][a].RefreshTokens !== undefined ?re[item][a].RefreshTokens[0]?
                re[item][a].RefreshTokens[0].devicePlatform:'--':'--'
          ]);
         }
    }
    //console.log(A);
    let csvContent = "data:text/csv;charset=utf-8,";
    A.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    // for(var i=0;i<=rde.length;++i){
    //     csvRow.push(Ad[j].join(','))
    //     var csvString=csvRow.join('%0A');
    // }
   
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "customerst.csv";
    document.body.appendChild(a);
    a.click();

  }
  exportCSV() {
    window.location.href = `${Constant.getAPI()}/user/download?adminId=${localStorage.getItem('superadmin_id')!==undefined?localStorage.getItem('superadmin_id'):''}`
    // var csvRow = [];
    // var A = [
    //   [
    //     "First Name",
    //     "Last Name",
    //     "Email",
    //     "Contact",
    //     "Customer ID",
    //     "Customer Type",
    //     // "Default PinCode",
    //     // "Device ID",
    //     // "Device Token",
    //     "Device Platform",
    //   ],
    // ];
    
    // var re = this.props.user_list;
    // for (var item = 0; item < re.length; item++) {
        
    //     A.push([
    //       re[item].firstName,
    //       re[item].lastName,
    //       re[item].email,
    //       re[item].phone,
    //       re[item].customer_id_number,
    //       re[item].type,
    //      // re[item].defaultPincode?re[item].defaultPincode:'--',
    //       //re[item].RefreshTokens !==[] && re[item].RefreshTokens!==null && re[item].RefreshTokens !== undefined ?re[item].RefreshTokens[0]?re[item].RefreshTokens[0].deviceId:'--':'--',
    //       //re[item].RefreshTokens !==[] && re[item].RefreshTokens!==null && re[item].RefreshTokens !== undefined ?re[item].RefreshTokens[0]?re[item].RefreshTokens[0].token:'--':'--',
    //       re[item].RefreshTokens !==[] && re[item].RefreshTokens!==null && re[item].RefreshTokens !== undefined ?re[item].RefreshTokens[0]?re[item].RefreshTokens[0].devicePlatform:'--':'--'
    //       ]);
    //     // }
    // }
    // console.log(A);
    // let csvContent = "data:text/csv;charset=utf-8,";
    // A.forEach(function (rowArray) {
    //   let row = rowArray.join(",");
    //   csvContent += row + "\r\n";
    // });
    // // for(var i=0;i<=rde.length;++i){
    // //     csvRow.push(Ad[j].join(','))
    // //     var csvString=csvRow.join('%0A');
    // // }
   
    // var a = document.createElement("a");
    // a.href = "data:attachment/csv" + csvContent;
    // a.download = "customerReport.csv";
    // document.body.appendChild(a);
    // a.click();
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
          filter: false,
          sort: false,
          customBodyRender: (id, tableMeta) => {
            return !this.state.hideOld ? (
              <Checkbox
                name={id}
                checked={this.state.checkedItems.get(id) || false}
                onChange={this.handleSelect.bind()}
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
        name: "firstName",
        label: "First Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "lastName",
        label: "Last Name",
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
      {
        name: "phone",
        label: "Contact",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "customer_id_number",
        label: "Customer Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      // },{
      //   name: "firstLogin",
      //   label: "First Login",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      // {
      //   name: "lastLogin",
      //   label: "Last Login",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      // {
      //   name: "timeStamp",
      //   label: "Time Stamp",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      {
        name: "type",
        label: "Customer Type",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "createdAt",
        label: "Date & Time",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(createdAt)=>{
            return(
              moment(createdAt).format("YYYY-MM-DD HH:mm:ss")
            )

          }
        },
      },
      // {
      //   name: "RefreshTokens",
      //   label: "Device ID",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (RefreshTokens, tableMeta) => {
      //      return (
      //        RefreshTokens !==[] && RefreshTokens!==null && RefreshTokens !== undefined ? RefreshTokens.map((d,i)=><li key="i">
      //        {d.deviceId}
      //         </li>):'--'
      //      )
      //   },
      //  }
      // },
      // {
      //   name: "RefreshTokens",
      //   label: "Device Token",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (RefreshTokens, tableMeta) => {
      //      return (
      //       RefreshTokens !==[] && RefreshTokens!==null && RefreshTokens !== undefined ? RefreshTokens.map((d,i)=><li key="i">
      //      {d.token}
      //       </li>)
      //       :'--'
            
      //      )
      //   },
      //  }
      // },
      {
        name: "RefreshTokens",
        label: "Device Platform",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (RefreshTokens, tableMeta) => {
           return (
            RefreshTokens !==[] && RefreshTokens!==null && RefreshTokens !== undefined ? RefreshTokens.map((d,i)=><li key="i">
            {d.devicePlatform}
             </li>)
             :'--'
           )
        },
       }
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
      //         );
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
      selectableRows: false,
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
    // const handleRowClick = 
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Customer List</h4>
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
                      <li className="breadcrumb-item active">Customer List</li>
                    </ul>
                  </div>
                </div>
                </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                  <div className="col">
                        {/* <Link
                          to="/users-customer/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Customer{" "}
                        </Link> */}
                        {/* <Link
                          to="/importData"
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link> */}
                        
                         {!this.state.downdata.length > 0 ? (
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
                                  this.exportCSVS();
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
                        data={this.props.user_list}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_list: state.customer.customer_list,
    loginData: state.login,
    isLoading:state.customer.isLoading,
    countFilterWise:state.customer.countFilterWise,
  };
};
CustomerReport.propTypes = {
  fetchuserList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchuserList })(CustomerReport);
