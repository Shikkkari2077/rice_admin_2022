/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {fetchCodorderReportList} from '../../store/index' 



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
class CODPostpaidOrder extends Component {
  state = {
    open: false,
    isLoading: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    totalAmountofOrderFilter: false,
    noOfQuantitiesFilter: false,
    deliveryChargeFilter: false,
    totalQuantityFilter: false,
    dateOfCompletionFilter: false,
    setDateWise: null,
    setDateWiseC: null,
    CODPostpaidOrders: [
      {
        id: 1,
        orderId: "o-id-1",
        dateOfOrder: "2020-11-07",
        totalAmountofOrder: "45000",
        totalQuantity: "100 kg",
        noOfQuantities: "20",
        dateOfCompletion: "2020-11-27",
        deliveryCharge: "150",
        sellerId: "seller-id1",
        sellerPincode: "321006",
        customer_id: "cust-im123",
        customerPincode: "321006",
      },
    ],
  };

  componentDidMount(){
    this.getReports()
  }
  getReports(){
    this.props.fetchCodorderReportList()
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

  handleFilterSubmit = (applyFilters) => {
    this.setState({
      isLoading: true,
      CODPostpaidOrders: this.state.CODPostpaidOrders,
    });
  };
  render() {
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
          },
        },
      },
      {
        name: "orderId",
        label: "Order Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dateOfOrder",
        label: "Date Of Order",
        options: {
          filter: false,
          sort: true,
          filterType: "custom",
          customBodyRender: (dateOfOrder, tableMeta) => {
            return <div style={{ width: "90px" }}>{dateOfOrder}</div>;
          },
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.dateOfOrderFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.dateOfOrderFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(dateOfOrder, filters) {
              if (filters[0] && filters[1]) {
                // console.log(dateOfCompletion,filters)
                //   var compDate = dateOfCompletion
                //   var startDate = filters[0];
                //   var endDate = filters[1];
                //   var arrCompDate =compDate.split('/');
                //   var dateComp = new Date(arrCompDate[2], arrCompDate[1], arrCompDate[0]);
                //   var arrStartDate = startDate.split('/');
                //  var date1 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
                //  var arrEndDate = endDate.split('/');
                //  var date2 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0])
                return dateOfOrder < filters[0] || dateOfOrder > filters[1];
              } else if (filters[0]) {
                return dateOfOrder < filters[0];
              } else if (filters[1]) {
                return dateOfOrder > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  Date Of Order
                </FormLabel>
                <FormGroup row>
                  <Select
                    name={filterList[index][0] || ""}
                    value={this.state.setDateWise}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      this.setState({
                        setDateWise: filterList[index][0],
                      });
                      var date = new Date();
                      var datto =
                        date.getFullYear() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getDate();
                      var dattoCom = filterList[index][0];
                      date.setDate(date.getDate() - dattoCom);
                      var finalDate =
                        date.getFullYear() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getDate();
                      filterList[index][1] = datto;
                      filterList[index][0] = finalDate;
                      console.log(datto, finalDate);
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%", margin: "5%" }}
                  >
                    <option value={null}>All</option>
                    <option value={7}>Last 7 days</option>
                    <option value={15}>Last 15 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={60}>Last 60 days</option>
                  </Select>
                  {/* <TextField
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                   }}
                    placeholder="min"
                    style={{ width: "45%",height:'25px', marginRight: "5%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
                  />
                  <input
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="max"
                    style={{ width: "45%",height:'25px', marginRight: "0%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
                
                  /> */}
                </FormGroup>
              </div>
            ),
          },
        },
      },
      {
        name: "totalAmountofOrder",
        label: "Total Amount of Order",
        width: 20,
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.totalAmountofOrderFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.totalAmountofOrderFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              } else if (v[0]) {
                return `Min: ${v[0]}`;
              } else if (v[1]) {
                return `Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return age < filters[0] || age > filters[1];
              } else if (filters[0]) {
                return age < filters[0];
              } else if (filters[1]) {
                return age > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  Total Amount of Order
                </FormLabel>
                <FormGroup row>
                  <input
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="min"
                    style={{
                      width: "45%",
                      height: "25px",
                      marginRight: "5%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                  />
                  <input
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="max"
                    style={{
                      width: "45%",
                      height: "25px",
                      marginRight: "0%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                  />
                </FormGroup>
              </div>
            ),
          },
        },
      },
      {
        name: "totalQuantity",
        label: "Total Quantity",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.totalQuantityFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.totalQuantityFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              } else if (v[0]) {
                return `Min: ${v[0]}`;
              } else if (v[1]) {
                return `Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return age < filters[0] || age > filters[1];
              } else if (filters[0]) {
                return age < filters[0];
              } else if (filters[1]) {
                return age > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  Total Quantity
                </FormLabel>
                <FormGroup row>
                  <input
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="min"
                    style={{
                      width: "45%",
                      height: "25px",
                      marginRight: "5%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                  />
                  <input
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="max"
                    style={{
                      width: "45%",
                      height: "25px",
                      marginRight: "0%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                  />
                </FormGroup>
              </div>
            ),
          },
        },
      },
      {
        name: "noOfQuantities",
        label: "No Of Quantities",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.noOfQuantitiesFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.noOfQuantitiesFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              } else if (v[0]) {
                return `Min: ${v[0]}`;
              } else if (v[1]) {
                return `Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return age < filters[0] || age > filters[1];
              } else if (filters[0]) {
                return age < filters[0];
              } else if (filters[1]) {
                return age > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  No Of Quantities
                </FormLabel>
                <FormGroup row>
                  <input
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="min"
                    style={{
                      width: "45%",
                      height: "25px",
                      marginRight: "5%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                  />
                  <input
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="max"
                    style={{
                      width: "45%",
                      height: "25px",
                      marginRight: "0%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                  />
                </FormGroup>
              </div>
            ),
          },
        },
      },
      {
        name: "dateOfCompletion",
        label: "Date Of Completion",
        options: {
          filter: false,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.dateOfOrderFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.dateOfOrderFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(dateOfOrder, filters) {
              if (filters[0] && filters[1]) {
                // console.log(dateOfCompletion,filters)
                //   var compDate = dateOfCompletion
                //   var startDate = filters[0];
                //   var endDate = filters[1];
                //   var arrCompDate =compDate.split('/');
                //   var dateComp = new Date(arrCompDate[2], arrCompDate[1], arrCompDate[0]);
                //   var arrStartDate = startDate.split('/');
                //  var date1 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
                //  var arrEndDate = endDate.split('/');
                //  var date2 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0])
                return dateOfOrder < filters[0] || dateOfOrder > filters[1];
              } else if (filters[0]) {
                return dateOfOrder < filters[0];
              } else if (filters[1]) {
                return dateOfOrder > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  Date Of Order
                </FormLabel>
                <FormGroup row>
                  <Select
                    name={filterList[index][0] || ""}
                    value={this.state.setDateWiseC}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      this.setState({
                        setDateWiseC: filterList[index][0],
                      });
                      var date = new Date();
                      var datto =
                        date.getFullYear() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getDate();
                      var dattoCom = filterList[index][0];
                      date.setDate(date.getDate() - dattoCom);
                      var finalDate =
                        date.getFullYear() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getDate();
                      filterList[index][1] = datto;
                      filterList[index][0] = finalDate;
                      console.log(datto, finalDate);
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: "45%", margin: "5%" }}
                  >
                    <option value={null}>All</option>
                    <option value={7}>Last 7 days</option>
                    <option value={15}>Last 15 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={60}>Last 60 days</option>
                  </Select>
                  {/* <TextField
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                   }}
                    placeholder="min"
                    style={{ width: "45%",height:'25px', marginRight: "5%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
                  />
                  <input
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="max"
                    style={{ width: "45%",height:'25px', marginRight: "0%",background:'transparent',border:'none',borderBottom:'1px solid grey',outline:'none'}}
                
                  /> */}
                </FormGroup>
              </div>
            ),
          },
        },
      },
      {
        name: "deliveryCharge",
        label: "Delivery Charge",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: (v) => {
              if (v[0] && v[1] && this.state.deliveryChargeFilter) {
                return [`Min: ${v[0]}`, `Max: ${v[1]}`];
              } else if (v[0] && v[1] && !this.state.deliveryChargeFilter) {
                return `Min: ${v[0]}, Max: ${v[1]}`;
              } else if (v[0]) {
                return `Min: ${v[0]}`;
              } else if (v[1]) {
                return `Max: ${v[1]}`;
              }
              return [];
            },
            update: (filterList, filterPos, index) => {
              console.log(
                "customFilterListOnDelete: ",
                filterList,
                filterPos,
                index
              );

              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }

              return filterList;
            },
          },
          filterOptions: {
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return age < filters[0] || age > filters[1];
              } else if (filters[0]) {
                return age < filters[0];
              } else if (filters[1]) {
                return age > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel style={{ fontSize: "12px" }}>
                  Delivery Charge
                </FormLabel>
                <FormGroup row>
                  <input
                    label="min"
                    value={filterList[index][0] || ""}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="min"
                    style={{
                      width: "45%",
                      height: "25px",
                      marginRight: "5%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                  />
                  <input
                    label="max"
                    value={filterList[index][1] || ""}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    placeholder="max"
                    style={{
                      width: "45%",
                      height: "25px",
                      marginRight: "0%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid grey",
                      outline: "none",
                    }}
                  />
                </FormGroup>
              </div>
            ),
          },
        },
      },
      {
        name: "Seller.unique_identifier",
        label: "Company Seller Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "sellerPincode",
        label: "Seller Pincode",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "customer_id",
        label: "Customer Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "customerPincode",
        label: "Customer Pincode",
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
            ? "Loading data..!"
            : "Sorry, No Data Found",
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
                      <h4>COD Postpaid Order</h4>
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
                        COD Postpaid Order
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
                              Date Of order
                            </InputLabel>
                            <Select
                              native
                              name="dateOfOrder"
                              value={this.state.dateOfOrderFilter}
                              onChange={(e) => {
                                this.setState({
                                  dateOfOrderFilter: e.target.value,
                                });
                                // const dateFilter = this.state.dateFilter;
                                // this.handleDateFilter.bind(this,this.state.dateFilter);
                              }}
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
                              <option value={1}>Last 2 Days</option>
                              <option value={2}>Last 3 Days</option>
                              <option value={6}>Last 7 Days </option>
                              <option value={29}>Last 30 Days </option>
                              <option value={59}>Last 60 Days</option>
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            className="col-sm-3 mx-1"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                              style={{ fontSize: "12px" }}
                            >
                              Date Of Completion
                            </InputLabel>
                            <Select
                              native
                              name="dateOfCompletion"
                              value={this.state.dateOfCompletionFilter}
                              onChange={(e) => {
                                this.setState({
                                  dateOfCompletionFilter: e.target.value,
                                });
                                // const dateFilter = this.state.dateFilter;
                                // this.handleDateFilter.bind(this,this.state.dateFilter);
                              }}
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
                              <option value={1}>Last 2 Days</option>
                              <option value={2}>Last 3 Days</option>
                              <option value={6}>Last 7 Days </option>
                              <option value={29}>Last 30 Days </option>
                              <option value={59}>Last 60 Days</option>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-sm-3">
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
                        </div>
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.state.CODPostpaidOrders}
                            columns={columns}
                            options={options}
                          />
                        </MuiThemeProvider>

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
    codpostorder: state.report.report_data,
    isLoading: state.report.isLoading,
    error: state.report.error,
  };
};
CODPostpaidOrder.propTypes = {
  fetchCodorderReportList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchCodorderReportList })(CODPostpaidOrder);
