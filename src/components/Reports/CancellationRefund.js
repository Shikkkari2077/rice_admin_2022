import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

import AlertDialog from "../../common/DownloadOption";
import {
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  FormGroup,
  FormLabel,
  Tooltip,
  Button
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
class CancellationRefund extends Component {
  state = {
    open: false,
    hidedownload: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    refundAmountFilter: false,
    dateFilter: null,
    filter: false,
    lowInventoryReportFilter: [],
    lowInventoryReport: [
      {
        id: 1,
        orderId: "orderIN234",
        invoiceId: "INVIX13432",
        transactionId: "YHHDM163836",
        refundStatus: "In Transit",
        refundAmount: "8000",
      },
      {
        id: 2,
        orderId: "orderIN234",
        invoiceId: "INVIX13432",
        transactionId: "YHHDM163836",
        refundStatus: "In Transit",
        refundAmount: "100",
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

  render() {
    const data = !this.state.filter
      ? this.state.lowInventoryReport
      : this.dataFilted;
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
        name: "invoiceId",
        label: "Invoice Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "transactionId",
        label: "Transaction ID",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "refundStatus",
        label: "Refund Status",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "refundAmount",
        label: "Refund Amount",
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
                      <h4>Cancellation Refund</h4>
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
                      <li className="breadcrumb-item active">Cancellation Refund</li>
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
                        <div className="col-sm-6">
                          {/* <label className="my-3" style={{ height: "40px" }}>
                            Time Period :
                          </label>
                          <FormControl
                            variant="outlined"
                            className="col-sm-6 mx-2"
                          >
                            <InputLabel htmlFor="outlined-age-native-simple">
                              Time Peroid
                            </InputLabel>
                            <Select
                              native
                              name="dateFilter"
                              value={this.state.dateFilter}
                              // onChange={(e) => {
                              //   // this.setState({
                              //   //   dateFilter: e.target.value,
                              //   // });
                              //   // const dateFilter = this.state.dateFilter;
                              //   // this.handleDateFilter(e);

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
                              <option aria-label="None"  onClick={this.reset}/>
                          
                              <option value={800}>800</option>
                              <option value={8000}>8000 </option>
                              <option value={9000}>9000</option>
                              
                            </Select>
                          </FormControl>
                          {!this.state.filter ?
                          <span onClick={this.cll} className="m-2">ok</span>
                          :<span onClick={this.reset}>reset</span>
                          }*/}
                        </div>
                        {/* <Link
                              to="/importData"
                              className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                              data-modal="modal-13"
                            >
                              Import
                            </Link> */}
                        <div className="col-sm-6">
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
                            data={data}
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

export default CancellationRefund;
