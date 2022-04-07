import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
// import PropTypes from "prop-types";
import Pagination from "react-js-pagination";


import Toggle from "react-toggle";
// import { connect } from "react-redux";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  //   FormGroup,
  //   FormLabel,
  Tooltip,
  //   TextField,
  Button,
  //   Select,FormControl,
  //   InputLabel
} from "@material-ui/core";
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

class OrderHomeScreen extends Component {
  state = {
    open: false,
    isLoading: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    minAmountofPurchaseFilter: false,
    maxAmountofPurchaseFilter: false,
    mindiscountAmountFilter: false,
    maxdiscountAmountFilter: false,
    validFromFilter: false,
    validToFilter: false,
    setDateWise: null,
    setDateWiseC: null,
    OrderHomeScreens: [
      {
        id: 1,
        pincode: "360001",
        topDeals: "1",
        newArrival: "2",
        banners: "3",
        categories: "4",
        status: "Active",
      },
      {
        id: 1,
        pincode: "360002",
        topDeals: "2",
        newArrival: "1",
        banners: "4",
        categories: "3",
        status: "Active",
      },
    ],
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
    // let filterList = applyFilters;
    console.log("applied");
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          root: {
            width: "auto",
            whiteSpace: "initial",
            wordWrap: "break-word",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            width: "auto",
            whiteSpace: "initial",
            wordWrap: "break-word",
          },
        },
      },
    });

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
        name: "pincode",
        label: "Pincode",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "topDeals",
        label: "Top Deal",
        options: {
          filter: true,
          sort: true,
          //   customBodyRender:(topDeals,tableMeta)=>{
          //       return <>1</>
          //   }
        },
      },
      {
        name: "newArrival",
        label: "New Arrivals",
        options: {
          filter: true,
          sort: true,
          //   customBodyRender:(newArrival,tableMeta)=>{
          //     return <>2</>
          // }
        },
      },
      {
        name: "banners",
        label: "banners",
        options: {
          filter: true,
          sort: true,
          //   customBodyRender:(topDeals,tableMeta)=>{
          //     return <>3</>
          // }
        },
      },
      {
        name: "categories",
        label: "Categories",
        options: {
          filter: true,
          sort: true,
          //   customBodyRender:(topDeals,tableMeta)=>{
          //     return <>1</>
          // }
        },
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (status, tableMeta) => {
            return (
              <Toggle
                id={"product_status_" + tableMeta.rowData[6]}
                checked={status === "Active" ? true : false}
                value={status}
                // onChange={this.handleStatusChange.bind(
                //   this,
                //   tableMeta.rowData[6]
                // )}
              />
            );
          },
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
                  to={"/best-deals/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
                {/* <span
                  onClick={this.deleteCategory.bind(this, id)}
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
              onClick={() => this.handleFilterSubmit(applyNewFilters)}
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
          noMatch: this.props.isSaving
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
                      <h4>Display Order</h4>
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
                      <li className="breadcrumb-item active">Display Order</li>
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
                          {/*  <label className="my-3" style={{ height: "40px" }}>
                          Valid From:
                        </label>
                        <FormControl
                          variant="outlined"
                          className="col-sm-3 mx-1"
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Time Peroid
                          </InputLabel>
                          <Select
                            native
                            name="dateFilter"
                            value={this.state.dateFilter}
                            // onChange={(e) => {
                            //   this.setState({
                            //     dateFilter: e.target.value,
                            //   });
                              // const dateFilter = this.state.dateFilter;
                              // this.handleDateFilter.bind(this,this.state.dateFilter);
                            // }}
                            onChange={(val) =>
                                this.handlePeriodChange(val.target.value)
                              }
                            label="Time Peroid"
                            className="my-2"
                            style={{ height: "40px" }}
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
                        <label className="my-3" style={{ height: "40px" }}>
                         Valid To:
                        </label>
                        <FormControl
                          variant="outlined"
                          className="col-sm-3 mx-1"
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Time Peroid
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
                            style={{ height: "40px" }}
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
                       */}
                        </div>

                        <div className="col-sm-3">
                          {/* <Link
                          to={"/best-deals/add"}
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Display Order{" "}
                        </Link>
                         */}
                        </div>
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            className="table-responsive"
                            data={this.state.OrderHomeScreens}
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

export default OrderHomeScreen;
