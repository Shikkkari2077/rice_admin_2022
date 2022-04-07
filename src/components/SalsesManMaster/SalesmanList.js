import React from "react";
import { Link } from "react-router-dom";

import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  fetchsalesman,
  fetchcityList,
  fetchSellerList, 
                 } from "../../store/index";
import Constant from "../../Constant";
import {Tooltip,  Button,Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { FormGroup, FormLabel,
  TextField, Select, FormControl, InputLabel } from '@material-ui/core';
import Pagination from "react-js-pagination";
// class Checkbox extends React.Component {
//   static defaultProps = {
//     checked: false,
//   };
//   render() {
//     return (
//       <input
//         type={this.props.type}
//         name={this.props.name}
//         checked={this.props.checked}
//         onChange={this.props.onChange}
//       />
//     );
//   }
// }
class SalesmanList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datarange:0,
      dataLength:50,
     
    };
  }
  exportCSV=()=>{
    window.location.href = `${Constant.getAPI()}/salesman/download?sellerId=${
      this.state.sellerFilter !== "All" && this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
    }&cityId=${
      this.state.cityFilter !== undefined && this.state.cityFilter !== "All" ? this.state.cityFilter : ""
    }`

    console.log(`${Constant.getAPI()}/salesman/download?sellerId=${
      this.state.sellerFilter !== "All" && this.state.sellerFilter !== undefined ? this.state.sellerFilter : ""
    }&ciyId=${
      this.state.cityFilter !== undefined && this.state.cityFilter !== "All" ? this.state.cityFilter : ""
    }`)
  }
  
  componentDidMount() {
      this.props.fetchsalesman(this.state.datarange,this.state.dataLength)
      if(localStorage.getItem('role')!=='seller'){
        this.props.fetchSellerList(0, 25000,'')
        }
        this.props.fetchcityList(0, 25500);
  }
  handleCityChange = (v) => {
		console.log(v);
		this.setState({
			cityFilter: v,
		});
    
	};
	handleSellerChange = (v) => {
		this.setState({
			sellerFilter: v,
		});

	};
  onGo = () => {
	
		var seller = this.state.sellerFilter !== 'All' ? this.state.sellerFilter : '';
		var city = this.state.cityFilter !== 'All' ? this.state.cityFilter : '';
		this.props.fetchsalesman(
		0,50,seller,city
		);
		this.setState({
			datarange: 0,
			activePage:1
		});
	};
  handlePageChange(pageNumber) {
		console.log('active page is', pageNumber);
		console.log(pageNumber * 50 - 50);
		const range = pageNumber * 50 - 50;
		const dataLength = this.state.dataLength;
    this.props.fetchsalesman(range,dataLength)

		this.setState({
			datarange: range,
      activePage: pageNumber 
		});
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

     
  handleStatus=(event,status,sid) => {
  
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
    //   {
    //     name: "id",
    //     label: "Select",
    //     options: {
    //       filter: false,
    //       sort: false,
    //       display:false,
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
        name:"Sellers",
        label:"CD Code/Name",
        options:{
        customBodyRender: (Sellers)=>{
        return(
            Sellers !== null && Sellers.length > 0
            ?
               Sellers.map(seller=>(
                 seller.name
               ))
            :"-"
        )

        },
      },
    },
      {
        name:"name",
        label:"Salesman"
      },
      {
        name:"code",
        label:"Salesman Code"
      },
      {
        name:"phone",
        label:"Phone No."
      }
      // {
      //   name: "status",
      //   label: "Status",
      //   options: {
      //     filter: true,
      //     sort: false,
      //     customBodyRender: (status, tableMeta) => {
      //    return (
      //      <AntSwitch 
      //       checked={status === true ? true : false}
      //       name="checkedC"
      //       value={status} 
      //       // onClick={()=>this.handleStatus(this,status, tableMeta.rowData[0] )} 
      //       />   
  
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
          noMatch: !this.props.categoryData
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
                      <h4>Salesman List</h4>
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
                      <li className="breadcrumb-item active">Salesman List</li>
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
                    <div className="col-sm-9">
											
                      {localStorage.getItem('role') === 'seller' ? (
                        ''
                      ) : (
                        <FormControl variant="outlined" className="col-sm-2 mx-1">
                          {/* {this.state.resetFilter?
                          <InputLabel
                            htmlFor="outlined-age-native-simple"
                            style={{ fontSize: '12px' }}
                            
                          >
                            Seller Filter
                          </InputLabel>
                          : */}
                          <InputLabel
                            htmlFor="outlined-age-native-simple"
                            style={{ fontSize: '12px' }}
                            
                          >
                            Seller Filter
                          </InputLabel>
                          
                          <Select
                            search
                            native
                            name="sellerFilter"
                            value={this.state.sellerFilter}
                            onChange={(val) =>
                              this.handleSellerChange(val.target.value)
                            }
                            label="Seller Filter"
                            className="my-2"
                            style={{ height: '30px' }}
                            inputProps={{
                              name: 'Time Peroid',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" value={null} ></option>
                            <option aria-label="None" value={'All'}>
                              All
                            </option>
                            {this.props.seller_list
                              ? this.props.seller_list.map((d) => (
                                  <option value={d.id}>{d.name}</option>
                                ))
                              : 'No Seller'}
                          </Select>
                        </FormControl>
                      )}
                    
                      <FormControl variant="outlined" className="col-sm-2 mx-1">
                        <InputLabel
                          htmlFor="outlined-age-native-simple"
                          style={{ fontSize: '12px' }}
                        >
                          City Filter
                        </InputLabel>
                    
                        <Select
                          className="selectpicker"
                          native
                          name="cityFilter"
                          value={this.state.cityFilter}
                          onChange={(val) => this.handleCityChange(val.target.value)}
                          label="City Filter"
                          className="my-2"
                          style={{ height: '30px' }}
                          inputProps={{
                            name: 'Time Peroid',
                            id: 'outlined-age-native-simple',
                          }}
                        >
                          <option aria-label="None" value={null} />
                          <option aria-label="None" value={'All'}>
                            All
                          </option>
                          {this.props.city_list
                            ? this.props.city_list.map((d) => (
                                <option value={d.id}>{d.name}</option>
                              ))
                            : 'No Seller'}
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
                    <div className="col-sm-3">
													
                        
                
                  </div>	
                      <div className="col">
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
                                  fontSize: '30px',
                                  color: 'grey',
                                }}
                              ></i>
                            </Tooltip>
                          </button>
                      {localStorage.getItem('salesmanImport') == 'true' ?

                        <Link
                          to={"/importData/salesman"}
                          className="btn-outline-dark btn btn-sm mx-1 f-right d-inline-block md-trigger"
                          data-modal="modal-13"
                        >
                          Import
                        </Link>
                       :null
                      }
                      </div>
                      <div className="dt-responsive table-responsive">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                         
                          className="table-responsive"
                          data={this.props.salesman_list}
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
    salesman_list: state.salesman.sales_man,
    countFilterWise:state.salesman.countFilterWise,
    error: state.category.error,
    isLoading:state.category.isLoading,
    seller_list: state.seller.seller_list,
		city_list: state.city.city_list,
  };
};
SalesmanList.propTypes = {
    fetchsalesman: PropTypes.func.isRequired,
  
};
export default connect(mapStateToProps, {
  fetchsalesman,
  fetchSellerList,
	fetchcityList,})(SalesmanList);