import React from "react";
import { Link } from "react-router-dom";
import "react-toggle/style.css"; // for ES6 modules
import MUIDataTable from "mui-datatables";
import { Tooltip, Button } from "@material-ui/core";
import Select from "react-select";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
class SuperAdminNotification extends React.Component {
  state = {
    open: false,
    hideOld: false,
    checkedItems: new Map(),
    check: false,
    downdata: [],
    checked: false,
    data: [],
    hidedownload: false,
    email:'',
    listto: [
      { id: 1, type: "Customer" },
      { id: 2, type: "Seller" },
      { id: 3, type: "Territory" },
      { id: 4, type: "Region" },
      { id: 5, type: "Clustor" },
    ],
    types:'',
    typelist:[],
    superAdminNotification: [
      {
        id: "1",
        targetAudience: "Super Admin",
        template: [
          {
            id: "1",
            type: "Order Cancellation Analysis",
            value:
              "  Hey <user_name>, your End of the Day order cancellation report is here. 1. No of Orders Cancelled <No_of_Orders_Cancelled>, 2 Highest Count for the reason of cancellation <reason_of_cancellation>. Please click on the below link for more details",
            sendto: [
              { id: 1, type: "Customer" },
              { id: 2, type: "Seller" },
            ],
          },
          {
            id: "2",
            type: "Prepaid Orders Report",
            value:
              "Hey <user_name>, your End of the Day Prepaid Order report is here. 1. Total No of Orders Placed <Total_no_of_orders_placed>, 2. Total amount of orders <Total_amount_of_orders>, Please click on the below link for more details",
            sendto: [
              { id: 1, type: "Customer" },
              { id: 2, type: "Seller" },
            ],
          },
          {
            id: "3",
            type: "Order Register Report",
            value:
              "Hey <user_name>, your End of the Day Order Register report is here. 1. Total No of Orders Placed <Total_no_of_orders_placed>, 2. Total amount of orders <Total_amount_of_orders>, 3. Total Prepaid Orders <Count_of_Prepaid_Orders>, 4.Total Postpaid Orders <Count_of_Postpaid_Orders>.Please click on the below link for more details",
            sendto: [
              { id: 1, type: "Customer" },
              { id: 2, type: "Seller" },
              { id: 3, type: "territory" },
            ],
          },
          {
            id: "4",
            type: "Daily Payment Register Report",
            value:
              "Hey <user_name>, your End of the Day Daily Register report is here. 1. Total No of Orders Placed <Total_no_of_orders_placed>, 2. Total amount of orders <Total_amount_of_orders>, 3. Total Prepaid Orders <Count_of_Prepaid_Orders>, 4.Total Postpaid Orders <Count_of_Postpaid_Orders>.Please click on the below link for more details",
            sendto: [
              { id: 1, type: "Customer" },
              { id: 2, type: "Seller" },
            ],
          },
          {
            id: "5",
            type: "Order Fill Rate Report",
            value:
              " Hey <user_name>, your End of the Day Order Fill Rate Report is here. 1. No of SKU Placed<No_of_SKU_Placed>, 2. No of SKU in Invoice <No_of_SKU_in_Invoice>,Please click on the below link for more details",
            sendto: [{ id: 1, type: "Customer" }],
          },
          {
            id: "6",
            type: "Order Fill Time Report",
            value:
              "Hey <user_name>, your End of the Day Order Fill Time Report is here. Please click on the below link for more details",
            sendto: [{ id: 1, type: "Seller" }],
          },
        ],
      },
    ],
  };
  componentWillMount() {
    // this.getUsersList();
  }
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveStacked: {
            maxHeight: "35vh",
            overflowX: "none",
          },
        },
        MUIDataTableHeadCell: {
          root: {
            // width: "40px",
            fontWeight: "bold",
            padding: "1px",
            lineHeight: "10px",
            whiteSpace: "normal",
            overflow: "hidden",
            wordWrap: "break-word",
            fontSize: "10px",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            // width: "80px",
            fontSize: "9px",
            // border:'1px solid black',
            padding: "1px",
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
  handlechanges(e){
    //  e.preventDefault()
     this.setState({
       email:e.target.value
     })
  }
  handleSelectCat(data){
    this.setState({
      types: data,
      typelist: Array.isArray(data) ? data.map((x) => x.id) : [],
    });
  }
  render() {
    console.log('data',this.state.email,this.state.types)
    const customStyles = {
      
    
      option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted grey",
        color: state.isSelected ? "red" : "black",
        padding: 0,
        margin:'5px',
      }),
      input: (provided) => ({
        ...provided,
        display: "flex",
        width:'200px',
        height: "auto",
        background:'transparent'
      }),
    };
    const {sendto,listto}=this.state
    const columns = [
      //   {
      //     name: "id",
      //     label: 'Select',
      //     options: {
      //       filter: false,
      //       sort: false,
      //       customBodyRender: (id, tableMeta) => {
      //         return !this.state.hideOld ? (
      //           <Checkbox
      //             name={id}
      //             checked={this.state.checkedItems.get(id) || false}
      //             onChange={this.handleChange}
      //             type="checkbox"
      //           />
      //         ) : (
      //           <Checkbox
      //             color="primary"
      //             checked={true}
      //             type="checkbox"
      //             onChange={this.selectall}
      //             inputProps={{ "aria-label": "secondary checkbox" }}
      //           />
      //         );
      //         //  <input type="checkbox" name="check" id={id} value={id}  onChange={this.selctSingle.bind(this,id)} checked={this.state.checked}/> */}
      //         // <Checkbox
      //         //   color="primary"
      //         //   id={'ch'+id}
      //         //   data-id={id}
      //         //   onChange={this.selctSingle.bind(this,id)}
      //         //   checked= {this.state.check === id ? true : false }
      //         //   value={this.state.check ? true: false }
      //         //   inputProps={{ "aria-label": "secondary checkbox" }}
      //         // />
      //       },
      //     },
      //   },
      {
        name: "targetAudience",
        label: "Target Audience",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "template",
        label: "Type",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (template, tableMeta) => {
            console.log(template);
            return (
              <>
                {template.map((data, i) => (
                  <div
                    key={data.id}
                    style={{
                      padding: "15px",
                      width: "auto",
                      height: "100%",
                      whiteSpace: "initial",
                      wordWrap: "break-word",
                    }}
                  >
                    {data.type}
                  </div>
                ))}
              </>
            );
          },
        },
      },
      {
        name: "template",
        label: "Template",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (template, tableMeta) => {
            console.log(template);
            return (
              <>
                {template.map((data, i) => (
                  <div
                    key={data.id}
                    style={{
                      padding: "15px",
                      width: "auto",
                      height: "100%",
                      whiteSpace: "initial",
                      wordWrap: "break-word",
                    }}
                  >
                    {data.value}
                  </div>
                ))}
              </>
            );
          },
        },
      },
      {
        name: "template",
        label: "Send To",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (template, tableMeta) => {
            return (
              <>
                {template.map((data, i) => (
                  <div
                    key={data.id}
                    style={{
                      margin: "25px",
                     
                    }}
                  >
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      // closeMenuOnSelect={false}
                      // value={template[0].sendto}
                      defaultValue={template[0].sendto}
                      getOptionLabel={(option) => `${option.type}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleSelectCat.bind(this)}
                      options={listto}
                    />
                    {/* {data.sendto ?data.sendto.map(e=><li key={e.id} style={{listStyle:'none',background:'lightBlue',margin:'5px'}}>{e.type}</li>):''} */}
                  </div>
                ))}
              </>
            );
          },
        },
      },
      {
        name: "template",
        label: "Email",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (template, tableMeta) => {
            return (
              <>
                {template.map((data, i) => (
                  <div
                    key={data.id}
                    style={{
                      padding: "25px",
                      width: "auto",
                      height: "100%",
                      whiteSpace: "initial",
                      wordWrap: "break-word",
                    }}
                  >
                    {data.email ? (
                      data.email.map((e) => <li key={e.id}>{e.type}</li>)
                    ) : (
                      <input placeholder="Enter email" value={this.state.email} onChange={this.handlechanges.bind(this)} name="email" type="email" style={{padding:'5px',borderRadius:'1px',outline:'none',border:'none',borderBottom:'1px solid blue'}} />
                    )}
                  </div>
                ))}
              </>
            );
          },
        },
      },
      //   {
      //     name: "status",
      //     label: "Status",
      //     options: {
      //       filter: true,
      //       sort: true,
      //       customBodyRender: (status, tableMeta) => {
      //         return (
      //           <Toggle
      //             id={"product_status_" + tableMeta.rowData[6]}
      //             checked={status === true ? true : false}
      //             value={status}
      //             onChange={this.handleStatusChange.bind(
      //               this,
      //               tableMeta.rowData[6]
      //             )}
      //           />
      //         );
      //       },
      //     },
      //   },
      {
        name: "template",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (template, tableMeta) => {
            return template.map((d) => (
              <div
                key={d.id}
                style={{
                  padding: "28px",
                  width: "auto",
                  height: "100%",
                  whiteSpace: "initial",
                  wordWrap: "break-word",
                }}
              >
                {localStorage.getItem('role')==="admin"?
                <span
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </span>
                :null}
              </div>
            ));
          },
        },
      },
    ];
    const options = {
      filter: false,
      filterType: "false",
      viewColumns: false,
      responsive: "scrollMaxHeight",
      search: false,
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
      print: false,
      textLabels: {
        body: {
          noMatch: this.state.isSaving
            ? "Loading data..!"
            : "Sorry, No Category Found",
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
                      <h4>Super Admin Notification Templete</h4>
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
                        Super Admin Notification Templete
                      </li>
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
                          to="/users-HoAdmin/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          HO Admin{" "}
                        </Link> */}
                      {/* <Link
                          to="/importData"
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link> */}
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
                    <div className="dt-responsive table-responsive">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          className="table-responsive"
                          data={this.state.superAdminNotification}
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
    );
  }
}
export default SuperAdminNotification;
