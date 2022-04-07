/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import Toggle from "react-toggle";
import { connect } from "react-redux";
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {fetchreasonsList,updateStatusReasonsList} from '../../store/index'
import { withStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  FormLabel,
  Tooltip,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  Switch
} from "@material-ui/core";
class CanReasonList extends React.Component {
  state = {
    open: false,
    dataLength:50,
    datarange:0
  }
  onChangePa(e) {
    e.preventDefault();
    // this.getOrdersList();
    this.setState({
      datarange: this.state.datarange - 50,
      dataLength: this.state.dataLength ,
    });
  }
  onChangePas(e) {
    e.preventDefault();
    this.setState({
      datarange: this.state.datarange + 50,
      dataLength: this.state.dataLength ,
    });
    // this.getOrdersList();
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
  componentWillMount() {
    this.getreasonsList();
  }
  getreasonsList = () => {
    this.props.fetchreasonsList();
  };
 handleChangeStatus=(e)=>{
  e.preventDefault();
   this.setState({
    [e.target.name]: e.target.value,
  })
  console.log(this.state.status)
  
}
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
handleStatus=(statu,sid) => {
    const id=sid
    const status=!statu
  this.props.updateStatusReasonsList(id,status)
}
  render() {
    const columns = [
      {
        name: "reason",
        label: "Reason",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (title, tableMeta) => {
            return <div>{title}</div>;
          },
        },
      },
      {
        name: "priority",
        label: "Priority",
        options: {
          filter: true,
          sort: true,
          
        },
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (status, tableMeta) => {
            var id = tableMeta.rowData[0];
            console.log(tableMeta.rowData[0],id);
          return (
         <AntSwitch checked={status === true ? true : false} name="checkedC" value={status} onChange={()=>this.handleStatus(status,id)} />   
        );
          },
        },
      },
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                {localStorage.getItem('role')==="admin"?
                <Link
                  to={"/cancellation-resaon/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>

               :null}
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
      selectableRows: "none",
      textLabels: {
        body: {
          noMatch: this.props.isLoading
            ? this.props.reason.reasons_list === [] && this.props.reason.reasons_list===null?
            <div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}>
            Sorry, No Data Found
            </div>
            : <div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}>
            <p style={{textAlign:'center'}}>
            Loading data..!
            </p>
            </div>:<div style={{textAlign:'center',display:'flex',color:'red',width:'1024px',justifyContent:'center'}}>
            <p style={{textAlign:'center'}}>
            Sorry, No Data Found
            </p>
            </div>,
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
      },
    };
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
  
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Cancellation Reason</h4>
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
                      <li className="breadcrumb-item active">Cancellation Reason</li>
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
                          to="/cancellation-resaon/add"
                          className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          {" "}
                          <i className="icofont icofont-plus m-r-5"></i> Add
                          Reason{" "}
                        </Link>

                      :null}
                      </div>

                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                           
                            className="table-responsive"
                            data={this.props.reason}
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
                            {this.state.datarange > 20 ? (
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
                            {this.props.reason.length < 49 ? 
                             <li class="page-item btn btn-disabled">
                             <i class="icofont icofont-rounded-right"></i>
                           </li>
                            :
                            <li
                            class="page-item btn"
                            onClick={this.onChangePas.bind(this)}
                          >
                            <i class="icofont icofont-rounded-right"></i>
                          </li>
                            }
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
    isLoading: state.reason.isLoading,
    error: state.error,
    reason: state.reason.reasons_list,
  };
};
CanReasonList.propTypes = {
  getUsers: PropTypes.func.isRequired,
  fetchreasonsList: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchreasonsList,updateStatusReasonsList })(
  CanReasonList
);