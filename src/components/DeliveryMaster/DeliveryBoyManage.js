import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from 'react-js-pagination'
import moment from 'moment'
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";import {
  FormGroup,
  FormLabel,
  Tooltip,
  Button,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import {
  fetchOrderList,
  fetchdeliveryboyList,
  assignDeleveryBoy

} from "../../store/index";


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

class DeliveryBoyManage extends React.Component {
  state = {
    open: false,
    isLoading:false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    editable: false,
    editableName: false,
    dateOfOrderFilter:false,
    setDateWise:null,
    dataLength: 50,
    datarange: 0,
  };
  componentWillMount() {
    this.props.fetchdeliveryboyList();

    var start_date = moment().subtract(0,'days').startOf('day').valueOf()
    
    // var start_date = this.state.start_date;
    var data = "Ordered, Pending Confirmation";
    var seller = "";
    var pincode = "";
    var city = "";
    this.setState({
      start_date: start_date,
    });
    this.getOrdersList(
      data,
      seller,
      pincode,
      city,
      start_date,
      this.state.datarange,
      this.state.dataLength
    );  
  }
  getOrdersList = (data, seller, pincode, city, start_date, range, length) => {
    console.log(data, range, length);
    this.props.fetchOrderList(
     "Ordered, Pending Confirmation",
      "",
      "",
      "",
      start_date,
      range,
      length,
      
      
    );
   
  };
  getDate = (date) => {
    const dateODorder = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return dateODorder;
  };
  onGo = () => {
    var start_date = this.state.start_date;
    
    this.getOrdersList(
      "Ordered, Pending Confirmation",
      "",
      "",
      "",
      start_date,
      this.state.datarange, //range
      this.state.dataLength, //length
    
    );
    this.setState({
      dataLength: 50,
      datarange: 0,
    });
  };
  handlePageChange(pageNumber) {
    console.log("active page is", pageNumber);
    console.log(pageNumber*50-50)
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
    // var start_date = this.state.start_date;
    // var data = "";
    // var invoiceID=this.state.invoiceID
    // var customerID=this.state.customerID
    // var seller =this.state.sellerFilter !== "All" ? this.state.sellerFilter : "";
    // var pincode =this.state.pincodeFilter !== "All" ? this.state.pincodeFilter : "";
    // var city = this.state.cityFilter !== "All" ? this.state.cityFilter : "";
    this.getOrdersList(
      "Ordered, Pending Confirmation",
      "",
      "",
      "",
      this.state.start_date,
      range, //range
      dataLength, //length
    
    );
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  // onChangePa(e) {
  //   e.preventDefault();
  //   this.getOrdersList();
  //   this.setState({
  //     datarange: this.state.datarange - 25,
  //     dataLength: this.state.dataLength ,
  //   });
  
  // }
  // onChangePas(e) {
  //   e.preventDefault();
  //   this.setState({
  //     datarange: this.state.datarange + 25,
  //     dataLength: this.state.dataLength ,
  //   });
  //   this.getOrdersList();
  // }
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
            width: "90px",
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
  handlePeriodChange = (v) => {
    this.setState({
      dateFilter: v,
    });
 
   
    var start_date = moment().subtract(v,'days').startOf('day').valueOf()
    this.setState({
      start_date: start_date,
    });
    console.log(start_date);
  
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
  componentWillReceiveProps( nextProps ){
    console.log(this.props.delivery)
    this.setState({
      deliveryBoyList:this.props.delivery
    })
    
  }
  handleSelectBoy(id,e){
   console.log(id,e.target.value)
   var personId=e.target.value
  
      this.props.assignDeleveryBoy(id,personId,
        "Ordered, Pending Confirmation",
        '',
        '',
        '',
        this.state.start_date,
        this.state.datarange,
        this.state.dataLength,
        )
     
        

    

  }
  render() {
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
        name: "User",
        label: "Customer Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (User, tableMeta) => {
            return User ? User.customer_id_number : "";
          },
        },
      },
      {
        name: "Address",
        label: "Customer Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? Address.name : "";
          },
        },
      },
      {
        name: "id",
        label: "Order Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "dateofOrder",
      //   label: "Date Of Order",
      //   options: {
      //     filter: false,
      //     sort: true,
      //     filterType: "custom",
      //     customBodyRender:(dateOfOrder, tableMeta)=>{
      //       return <div style={{width:'90px',}}>{dateOfOrder}</div>
      //     },
      //     customFilterListOptions: {
      //       render: (v) => {
      //         if (v[0] && v[1] && this.state.dateofOrderFilter) {
      //           return [`Min: ${v[0]}`, `Max: ${v[1]}`];
      //         } else if (v[0] && v[1] && !this.state.dateofOrderFilter) {
      //           return `Min: ${v[0]}, Max: ${v[1]}`;
      //         }
      //         return [];
      //       },
      //       update: (filterList, filterPos, index) => {
      //         console.log(
      //           "customFilterListOnDelete: ",
      //           filterList,
      //           filterPos,
      //           index
      //         );

      //         if (filterPos === 0) {
      //           filterList[index].splice(filterPos, 1, "");
      //         } else if (filterPos === 1) {
      //           filterList[index].splice(filterPos, 1);
      //         } else if (filterPos === -1) {
      //           filterList[index] = [];
      //         }

      //         return filterList;
      //       },
      //     },
      //     filterOptions: {
      //       logic(dateofOrder, filters) {
      //         if (filters[0] && filters[1]) {
      //           // console.log(dateOfCompletion,filters)
      //           //   var compDate = dateOfCompletion
      //           //   var startDate = filters[0];
      //           //   var endDate = filters[1];
      //           //   var arrCompDate =compDate.split('/');
      //           //   var dateComp = new Date(arrCompDate[2], arrCompDate[1], arrCompDate[0]);
      //           //   var arrStartDate = startDate.split('/');
      //           //  var date1 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
      //           //  var arrEndDate = endDate.split('/');
      //           //  var date2 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0])
      //           return dateofOrder < filters[0] || dateofOrder > filters[1];
      //         } else if (filters[0]) {
      //           return dateofOrder < filters[0];
      //         } else if (filters[1]) {
      //           return dateofOrder > filters[1];
      //         }
      //         return false;
      //       },
      //       display: (filterList, onChange, index, column) => (
      //         <div>
      //           <FormLabel style={{ fontSize: "12px" }}>
      //             Date Of Order
      //           </FormLabel>
      //           <FormGroup row>
      //             <Select
      //               name={filterList[index][0] || ""}
      //               value={this.state.setDateWise}
      //               onChange={(event) => {
      //                 filterList[index][0] = event.target.value;
      //                 this.setState({
      //                   setDateWise: filterList[index][0],
      //                 });
      //                 var date = new Date();
      //                 var datto =
      //                   date.getFullYear() +
      //                   "-" +
      //                   (date.getMonth() + 1) +
      //                   "-" +
      //                   date.getDate();
      //                 var dattoCom = filterList[index][0];
      //                 date.setDate(date.getDate() - dattoCom);
      //                 var finalDate =
      //                   date.getFullYear() +
      //                   "-" +
      //                   (date.getMonth() + 1) +
      //                   "-" +
      //                   date.getDate();
      //                 filterList[index][1] = datto;
      //                 filterList[index][0] = finalDate;
      //                 console.log(datto, finalDate);
      //                 onChange(filterList[index], index, column);
      //               }}
      //               style={{ width: "45%", margin: "5%" }}
      //             >
      //               <option value={null}>All</option>
      //               <option value={7}>Last 7 days</option>
      //               <option value={15}>Last 15 days</option>
      //               <option value={30}>Last 30 days</option>
      //               <option value={60}>Last 60 days</option>
                    
      //             </Select>
      //             {/* <TextField
      //                         label="min"
      //                         value={filterList[index][0] || ""}
      //                         onChange={(event) => {
      //                           filterList[index][0] = event.target.value;
      //                           onChange(filterList[index], index, column);
      //                         }}
      //                         style={{ width: "45%", marginRight: "5%" }}
      //                       />
      //                       <TextField
      //                         label="max"
      //                         value={filterList[index][1] || ""}
      //                         onChange={(event) => {
      //                           filterList[index][1] = event.target.value;
      //                           onChange(filterList[index], index, column);
      //                         }}
      //                         style={{ width: "45%" }}
      //                       /> */}
      //           </FormGroup>
      //         </div>
      //       ),
      //     },
      //   },
      // },
      {
        name: "createdAt",
        label: "Order Date",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (createdAt, tableMeta) => {
            return this.getDate(createdAt);
          },
        },
      },
      {
        name: "deliveryName",
        label: "Assign Delivery Person Name",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (deliveryName, tableMeta) => {
            return (
              deliveryName !== undefined ?deliveryName:"-"
             
            );
          },
        },
      },
      {
        name: "DeliveryUserId",
        label: "AssignDelivery Person ID",
        options: {
        
          filter: true,
          sort: true,
          
          customBodyRender: (DeliveryUserId, tableMeta) => {
            return (
              <select
              style={{ width:"100px"}}
              name="DeliveryUserId"
              value={DeliveryUserId !== undefined ? DeliveryUserId : this.state.DeliveryUser}
              onChange={ this.handleSelectBoy.bind(this,tableMeta.rowData[3])}
            >
               <option></option>

        {  this.state.deliveryBoyList !== undefined ?
        this.state.deliveryBoyList.map(e=>(
          <option value={e.id}>{e.firstName+" "+"("+e.uniqueId+")"}</option>
          ))
       :null
      
      }                    
               
              
            </select>
            
            );
          },
        },
      },
      {
        name: "Address",
        label: "Pincode for Delivery",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return Address ? Address.pinCode : "";
          },
        },
      },
      {
        name: "Address",
        label: "Order Delivery Address",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (Address, tableMeta) => {
            return (
              Address.address_line_1 ? Address.address_line_1 : "--"
              // Address.long ? Address.long : "--"
            );
          },
        },
      },
      {
        name: "paymentType",
        label: "Mode Of Payment",
        options: {
          filter: true,
          sort: true,
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
      pagination: false,
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
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Delivery Person Assign</h4>
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
                      <li className="breadcrumb-item active">
                        Delivery Person Assign
                      </li>
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
                              Date of order
                            </InputLabel>
                            <Select
                              search
                              native
                              name="dateFilter"
                              value={this.state.dateFilter}
                              onChange={(val) =>
                                this.handlePeriodChange(val.target.value)
                              }
                              label="Time Peroid"
                              className="my-2"
                              style={{ height: "30px" }}
                              inputProps={{
                                name: "Time Peroid",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              {/* <option aria-label="None" value={null} />
                              <option
                                aria-label="None"
                                value={1000000000000000}
                              >
                                Reset 
                              </option>*/}
                              <option value={0}>Today</option>
                              <option value={1}>Last 2 Days</option>
                              <option value={2}>Last 3 Days</option>
                              <option value={6}>Last 7 Days </option>
                              <option value={29}>Last 30 Days </option>
                              <option value={59}>Last 60 Days</option>
                              <option value={89}>Last 90 Days</option>
                              <option value={179} >
                                Last 180 Days
                              </option>
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
                      {/* <div className="col-sm-6">
                        {!this.state.hidedownload ? (
                          <button
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
                          </button>
                        ) : (
                          <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                          >
                            <Tooltip
                              title="Download Selected"
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
                          </button>
                        )}
                      </div> */}
                    </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                        
                          className="table-responsive"
                          data={this.props.order}
                          columns={columns}
                          options={options}
                        />
                        <nav aria-label="Page navigation example " className="display-flex float-right">
                          <ul class="pagination">
                          <li
                                class="page-item mx-2 py-2" 
                          >
                               Count : {this.state.datarange} - {this.state.dataLength+this.state.datarange}
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
                        </MuiThemeProvider>

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
    isLoading: state.isLoading,
    countFilterWise:state.order.countFilterWise,
    delivery: state.delivery.delivery_list,

    isAuthUser: state.isAuthUser,
    order: state.order.order_list,

    error: state.error,
  };
};

DeliveryBoyManage.propTypes = {
  fetchOrderList: PropTypes.func.isRequired,
  delivery: PropTypes.object.isRequired,

  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchdeliveryboyList, assignDeleveryBoy, fetchOrderList,
})(DeliveryBoyManage);
