import React from "react";
import { Link } from "react-router-dom";
// import $ from "jquery";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
// import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from 'react-js-pagination'
import moment from 'moment'
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import {
  fetchOrderList,
  // fetchSellerList,
  // fetchOrderListinovie,
  // updateStatusOrder,
  // fetchcityList,
  // downloadOrderList,
  // fetchPincodeList,
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

class InProcessDelivery extends React.Component {
  state = {
    open: false,
    hidedownload: false,
    hideOld: false,
    isLoading:false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    assignDateofDeliveryFilter:false,
    dateOfOrderFilter:false,
    totalPriceFilter:false,
    setDateWise:null,
    setDateWiseC:null,
    dataLength: 50,
    datarange: 0,
  };
  getDate = (date) => {
    const dateODorder = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return dateODorder;
  };
  componentWillMount() {
     this.getOrdersList();
  }
  onChangePa(e) {
    e.preventDefault();
    this.getOrdersList();
    this.setState({
      datarange: this.state.datarange - 25,
      dataLength: this.state.dataLength ,
    });
  
  }
  onChangePas(e) {
    e.preventDefault();
    this.setState({
      datarange: this.state.datarange + 25,
      dataLength: this.state.dataLength ,
    });
    this.getOrdersList();
  }
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
      "",
      "",
      "",
      "",
      "",
      range,
      dataLength,
      '',
       "" ,
       "",
       true,
    );
    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
    console.log(range,dataLength)
  }
  getOrdersList = (data, seller, pincode, city, date, range, length,openOrders,invoiceID,customerID) => {
    console.log("data", range, length);
    this.props.fetchOrderList(
      "",
      "",
      "",
      "",
      "",
      range,
      length,
      '',
       "" ,
       "",
       true,
        
       )
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
      //   name: "dateOfOrder",
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
      //         if (v[0] && v[1] && this.state.dateOfOrderFilter) {
      //           return [`Min: ${v[0]}`, `Max: ${v[1]}`];
      //         } else if (v[0] && v[1] && !this.state.dateOfOrderFilter) {
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
      //       logic(dateOfOrder, filters) {
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
      //           return dateOfOrder < filters[0] || dateOfOrder > filters[1];
      //         } else if (filters[0]) {
      //           return dateOfOrder < filters[0];
      //         } else if (filters[1]) {
      //           return dateOfOrder > filters[1];
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
      //               label="min"
      //               value={filterList[index][0] || ""}
      //               onChange={(event) => {
      //                 filterList[index][0] = event.target.value;
      //                 onChange(filterList[index], index, column);
      //              }}
      //               placeholder="min"
      //               style={{ width: "45%",height:'25px', marginRight: "5%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
      //             />
      //             <input
      //               label="max"
      //               value={filterList[index][1] || ""}
      //               onChange={(event) => {
      //                 filterList[index][1] = event.target.value;
      //                 onChange(filterList[index], index, column);
      //               }}
      //               placeholder="max"
      //               style={{ width: "45%",height:'25px', marginRight: "0%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
                
      //             /> */}
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
        name: "OrderProducts",
        label: "Order Item SKU",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (OrderProducts, tabelMeta) => {
            return OrderProducts.map((d, i) => {
              return <li map={i}>{d.Product_sku}</li>;
            });
          },
        },
      },
      // {
      //   name: "orderDescription",
      //   label: "Order Description",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (orderDescription, tabelMeta) => {
      //       return orderDescription.map((d, i) => {
      //         return <li map={i} >{d}</li>;
      //       });
      //     },
      //   },
      // },
      {
        name: "OrderStatusDates",
        label: "Assgin Date of Delivery",
        options:{
          filter: false,
            sort: true,
            customBodyRender: ( OrderStatusDates,tabelMeta) => {
              return(
              OrderStatusDates !== undefined && OrderStatusDates[0] !== undefined?
              OrderStatusDates.map(e=>(
                e.status == 'Dispatched'?
                moment(e.date).format("YYYY-MM-DD")
                :null

              ))                      
              
              :
              null
              )
            
            },


        }
        //options: {
        //   filter: false,
        //   sort: true,
        //   filterType: "custom",
        //   customBodyRender:(assignDateofDelivery, tableMeta)=>{
        //     return <div style={{width:'80px',}}>{assignDateofDelivery}</div>
        //   },
        //   customFilterListOptions: {
        //     render: (v) => {
        //       if (v[0] && v[1] && this.state.assignDateofDeliveryFilter) {
        //         return [`Min: ${v[0]}`, `Max: ${v[1]}`];
        //       } else if (v[0] && v[1] && !this.state.assignDateofDeliveryFilter) {
        //         return `Min: ${v[0]}, Max: ${v[1]}`;
        //       }
        //       return [];
        //     },
        //     update: (filterList, filterPos, index) => {
        //       console.log(
        //         "customFilterListOnDelete: ",
        //         filterList,
        //         filterPos,
        //         index
        //       );

        //       if (filterPos === 0) {
        //         filterList[index].splice(filterPos, 1, "");
        //       } else if (filterPos === 1) {
        //         filterList[index].splice(filterPos, 1);
        //       } else if (filterPos === -1) {
        //         filterList[index] = [];
        //       }

        //       return filterList;
        //     },
        //   },
        //   filterOptions: {
        //     logic(assignDateofDelivery, filters) {
        //       if (filters[0] && filters[1]) {
        //         // console.log(dateOfCompletion,filters)
        //         //   var compDate = dateOfCompletion
        //         //   var startDate = filters[0];
        //         //   var endDate = filters[1];
        //         //   var arrCompDate =compDate.split('/');
        //         //   var dateComp = new Date(arrCompDate[2], arrCompDate[1], arrCompDate[0]);
        //         //   var arrStartDate = startDate.split('/');
        //         //  var date1 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
        //         //  var arrEndDate = endDate.split('/');
        //         //  var date2 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0])
        //         return assignDateofDelivery < filters[0] || assignDateofDelivery > filters[1];
        //       } else if (filters[0]) {
        //         return assignDateofDelivery < filters[0];
        //       } else if (filters[1]) {
        //         return assignDateofDelivery > filters[1];
        //       }
        //       return false;
        //     },
        //     display: (filterList, onChange, index, column) => (
        //       <div>
        //         <FormLabel style={{ fontSize: "12px" }}>
        //         Assgin Date of Delivery
        //         </FormLabel>
        //         <FormGroup row>
        //           <Select
        //             name={filterList[index][0] || ""}
        //             value={this.state.setDateWiseC}
        //             onChange={(event) => {
        //               filterList[index][0] = event.target.value;
        //               this.setState({
        //                 setDateWiseC: filterList[index][0],
        //               });
        //               var date = new Date();
        //               var datto =
        //                 date.getFullYear() +
        //                 "-" +
        //                 (date.getMonth() + 1) +
        //                 "-" +
        //                 date.getDate();
        //               var dattoCom = filterList[index][0];
        //               date.setDate(date.getDate() - dattoCom);
        //               var finalDate =
        //                 date.getFullYear() +
        //                 "-" +
        //                 (date.getMonth() + 1) +
        //                 "-" +
        //                 date.getDate();
        //               filterList[index][1] = datto;
        //               filterList[index][0] = finalDate;
        //               console.log(datto, finalDate);
        //               onChange(filterList[index], index, column);
        //             }}
        //             style={{ width: "45%", margin: "5%" }}
        //           >
        //             <option value={null}>All</option>
        //             <option value={7}>Last 7 days</option>
        //             <option value={15}>Last 15 days</option>
        //             <option value={30}>Last 30 days</option>
        //             <option value={60}>Last 60 days</option>
                    
        //           </Select>
        //           {/* <TextField
        //             label="min"
        //             value={filterList[index][0] || ""}
        //             onChange={(event) => {
        //               filterList[index][0] = event.target.value;
        //               onChange(filterList[index], index, column);
        //            }}
        //             placeholder="min"
        //             style={{ width: "45%",height:'25px', marginRight: "5%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
        //           />
        //           <input
        //             label="max"
        //             value={filterList[index][1] || ""}
        //             onChange={(event) => {
        //               filterList[index][1] = event.target.value;
        //               onChange(filterList[index], index, column);
        //             }}
        //             placeholder="max"
        //             style={{ width: "45%",height:'25px', marginRight: "0%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
                
        //           /> */}
        //         </FormGroup>
        //       </div>
        //     ),
        //   },
        // },
      },
      {
        name: "DeliveryUser",
        label: "Delivery Person Id",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (DeliveryUser, tableMeta) => {
            return DeliveryUser ? DeliveryUser.uniqueId : "";
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
            return Address.address_line_1 ? Address.address_line_1 : "";
          },
        },
      },
      // {
      //   name: "price_ptc",
      //   label: "Price(PTC)",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     // customBodyRender: (price_ptc, tabelMeta) => {
      //     //   return price_ptc.map((d, i) => {
      //     //     return <li map={i} >{d}</li>;
      //     //   });
      //     // },
      //   },
      // },
      // {
      //   name: "totalPrice",
      //   label: "Order Total Price",
      //   options: {
      //     filter: true,
      //     sort: true, filterType: "custom",
      //     customFilterListOptions: {
      //       render: (v) => {
      //         if (v[0] && v[1] && this.state.totalPriceFilter) {
      //           return [`Min: ${v[0]}`, `Max: ${v[1]}`];
      //         } else if (v[0] && v[1] && !this.state.totalPriceFilter) {
      //           return `Min: ${v[0]}, Max: ${v[1]}`;
      //         } else if (v[0]) {
      //           return `Min: ${v[0]}`;
      //         } else if (v[1]) {
      //           return `Max: ${v[1]}`;
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
      //       logic(age, filters) {
      //         if (filters[0] && filters[1]) {
      //           return age < filters[0] || age > filters[1];
      //         } else if (filters[0]) {
      //           return age < filters[0];
      //         } else if (filters[1]) {
      //           return age > filters[1];
      //         }
      //         return false;
      //       },
      //       display: (filterList, onChange, index, column) => (
      //         <div>
      //           <FormLabel style={{ fontSize: "12px" }}>
      //           Total Price
      //                           </FormLabel>
      //           <FormGroup row>
      //           <input
      //               label="min"
      //               value={filterList[index][0] || ""}
      //               onChange={(event) => {
      //                 filterList[index][0] = event.target.value;
      //                 onChange(filterList[index], index, column);
      //              }}
      //               placeholder="min"
      //               style={{ width: "45%",height:'25px', marginRight: "5%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
      //             />
      //             <input
      //               label="max"
      //               value={filterList[index][1] || ""}
      //               onChange={(event) => {
      //                 filterList[index][1] = event.target.value;
      //                 onChange(filterList[index], index, column);
      //               }}
      //               placeholder="max"
      //               style={{ width: "45%",height:'25px', marginRight: "0%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline: "none",
      //             }}
      //           />
      //           </FormGroup>
      //         </div>
      //       ),
      //     },
      //     customBodyRender:(totalPrice,tabelMeta)=>{
      //       return <>{totalPrice} </>
      //   }
      //   },
      // },
      {
        name: "grandTotal",
        label: "Order Total Price",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "transaction",
        label: "Mode of Payment",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (transaction, tableMeta) => {
            return transaction
              ? transaction.PAYMENTMODE === "NB"
                ? "Net Banking"
                : transaction.PAYMENTMODE === "PPI"
                ? "Wallet"
                : transaction.PAYMENTMODE === "CC"
                ? "Card"
                : transaction.PAYMENTMODE === "DC"
                ? "Card"
                : transaction.PAYMENTMODE === "EMI"
                ? "EMI"
                : transaction.PAYMENTMODE === "UPI"
                ? "UPI "
                : transaction.PAYMENTMODE === "BANK_TRANSFER"
                ? "BANK_TRANSFER"
                : "COD"
              : "COD";
          },
        },
      },
      {
        name: "paymentStatus",
        label: "Status Of Payment",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "status",
        label: "Order Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (status, tableMeta) => {
            return (
              <span
                style={{
                  color: "white",
                  background: "blue",
                  borderRadius: "5px",
                  // padding: "1px",
                  // fontSize:'10px',
                  // whiteSpace: "nowrap",
                }}
              >
                {status}
              </span>
            );
          },
        },
      },
      // {
      //   name: "customerFeedbackAny",
      //   label: "Customer Feedback Any",
      //   options: {
      //     filter: true,
      //     sort: false,
      //   },
      // },
      // {
      //   name: "sendNotification",
      //   label: "Send Notifcation",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customBodyRender:(sendNotification,tabelMeta)=>{
      //       return <Link
      //       // to="/invoice"
      //       className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
      //       data-modal="modal-13"
      //     >
      //       {" "}
      //        <i className="icofont icofont-paper-plane"></i>Send{" "}
      //     </Link>
      //   }       
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
                      <h4>In Process Delivery</h4>
                    </div>
                  </div>
                  {/* {localStorage.getItem('superadminad_role') !== "shop"
                        ? */}
                  {/* <Link
                        to="/payment/add"
                        className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                        data-modal="modal-13"
                      >
                        {" "}
                        <i className="icofont icofont-plus m-r-5"></i> Add Order{" "}
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
                      <li className="breadcrumb-item active">
                        In Process Delivery
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
                       
                        {/* <FormControl
                          variant="outlined"
                          className="col-sm-3 mx-1"
                        >
                          <InputLabel htmlFor="outlined-age-native-simple" style={{fontSize:'12px'}}>
                          Date of Order
                          </InputLabel>
                          <Select
                            native
                            name="dateFilter"
                            value={this.state.dateFilter}
                            onChange={(val) =>
                                this.handlePeriodChange(val.target.value)
                              }
                              // const dateFilter = this.state.dateFilter;
                              // this.handleDateFilter.bind(this,this.state.dateFilter);
                            //}}
                            label="Time Peroid"
                            className="my-2"
                            style={{ height: "30px" }}
                            inputProps={{
                              name: "Time Peroid",
                              id: "outlined-age-native-simple",
                            }}
                          >
                            <option aria-label="None" value={null} />
                            <option value={0}>Today</option>
                            <option value={1}>Yesterday</option>
                            <option value={7}>This week </option>
                            <option value={30}>This Month</option>
                            <option value={60}>Last Month</option>
                          </Select>
                        </FormControl>
                      
                        <FormControl
                          variant="outlined"
                          className="col-sm-3 mx-1"
                        >
                          <InputLabel htmlFor="outlined-age-native-simple" style={{fontSize:'12px'}}>
                          Assigned Date
                          </InputLabel>
                          <Select
                            native
                            name="dateFilter"
                            value={this.state.dateFilter}
                            onChange={(val) =>
                                this.handlePeriodChange(val.target.value)
                              }
                              // const dateFilter = this.state.dateFilter;
                              // this.handleDateFilter.bind(this,this.state.dateFilter);
                            //}}
                            label="Time Peroid"
                            className="my-2"
                            style={{ height: "30px" }}
                            inputProps={{
                              name: "Time Peroid",
                              id: "outlined-age-native-simple",
                            }}
                          >
                            <option aria-label="None" value={null} />
                            <option value={0}>Today</option>
                            <option value={1}>Yesterday</option>
                            <option value={7}>This week </option>
                            <option value={30}>This Month</option>
                            <option value={60}>Last Month</option>
                          </Select>
                        </FormControl> */}
                      </div>
                      <div className="col-sm-3">
                        {/* {!this.state.hidedownload ? (
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
                        )} */}
                      </div>
                    </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                        
                          className="table-responsive"
                          data={this.props.order}
                          columns={columns}
                          options={options}
                        />
                        </MuiThemeProvider>
                        <nav aria-label="Page navigation example " className="display-flex float-right">
                          <ul class="pagination">
                          <li
                                class="page-item mx-2 py-2" 
                          >
                               Count : {this.state.datarange} - {this.state.dataLength}
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
                            <li
                              class="page-item btn" 
                              onClick={this.onChangePas.bind(this)}
                            >
                             <i class="icofont icofont-rounded-right" ></i>
                            </li> */}
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
    isLoading: state.isLoading,
    order: state.order.order_list,

    isAuthUser: state.isAuthUser,
    countFilterWise:state.order.countFilterWise,

    error: state.error,
  };
};

InProcessDelivery.propTypes = {
  getUsers: PropTypes.func.isRequired,
  fetchOrderList: PropTypes.func.isRequired,

  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchOrderList})(InProcessDelivery);
