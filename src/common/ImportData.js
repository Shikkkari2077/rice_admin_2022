import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import banner from "../ProductMasterFormats/banner.csv";
// import homeCategory from "../ProductMasterFormats/home-category_1.csv";

import AddSellerInfoMasterSheet from "../ProductMasterFormats/Add Seller Info Master Sheet.xlsx"
import HomeTopDealMasterSheet from "../ProductMasterFormats/Home_top_deal.xlsx"
import NewArrival from "../ProductMasterFormats/Home_new_arrival.xlsx"
import LocationPinCode from "../ProductMasterFormats/Location_Pincode_Master_Sheet.xlsx"
//import PinCodeSeller from "../ProductMasterFormats/SellerPincodeImportSampleLatest.xlsx"
import ProductMaster from "../ProductMasterFormats/Product_Master.xlsx"
import sellerProduct from "../ProductMasterFormats/Seller Product Catalogue Master.xlsx"
import beatSampleSheet from "../ProductMasterFormats/Beat Master.xlsx"
import salesmanSampleSheet from "../ProductMasterFormats/Sales Master.xlsx"
import sellerCustomerSheet from "../ProductMasterFormats/Seller business customer master.xlsx"


import {
  postImportSellerCustomer,
  postImportSellerPincode,
  postImportProduct,
  postImportSellerproductImport,
  postImportSeller,
  postImportPincode,
  postImportTopdeals,
  postImportNewArrivals,
  postImportTopCategory,
  postImportBanner,
  importBeat,
  importSalesman,
  ImportPhoneNumbers
} from "../store/index";
import { ContactSupportOutlined } from "@material-ui/icons";


class ImportData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideOld: false,
      checkedItems: new Map(),
      check: false,
      isLoading: false,
      importname: "",
      downdata: [],
      checked: false,
      data: [],
      fileToUpload: null,
      hidedownload: false,
      fileaname: null,
      laoding:false,
      show:false
    };
  }

  componentDidMount() {
    console.log(this.props.match);
    console.log(this.props.match.params.import_name);
    this.setState({
      importname: this.props.match.params.import_name,
    });
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

  componentWillReceiveProps(nextProps){
    console.log('nodata',nextProps.sellerProductimported)
    console.log(nextProps.invalidata)
    if(nextProps.invalidata !==null || nextProps.invalidata!==[] || nextProps.invalidata!==undefined){
      this.setState({
        show:true
      })
    }
    this.setState({
      laoding:false
    })
  }
  
  exportCSV() {
    var csvRow = [];
    var A = [
      [
        "Row Number",
        "SKU",
        "Seller Id",
        "error"
      ],
    ];
    var re = this.props.invalidata;
    for (var item = 0; item < re.length; item++) {
        A.push([
          re[item].rowNumber,
          re[item].SKU,
          re[item].SellerId,
          re[item].error,

        ]); 
    }
    console.log(A);
    let csvContent = "data:text/csv;charset=utf-8,";
    A.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var a = document.createElement("a");
    a.href = "data:attachment/csv" + csvContent;
    a.download = "Invalid products.csv";
    document.body.appendChild(a);
    a.click();
  }
  onSaveData = (e) => {
    this.setState({
      laoding:true
    })
    if (this.state.importname === "sellerpincode") {
      this.setState({
        isLoading: true,
      });
      const data = this.props.postImportSellerPincode(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    } else if (this.state.importname === "product") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.postImportProduct(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    } else if (this.state.importname === "sellerproduct") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.postImportSellerproductImport(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    } else if (this.state.importname === "seller") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.postImportSeller(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    } else if (this.state.importname === "pincode") {
      this.setState({
        isLoading: true,
      });
      const data = this.props.postImportPincode(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    } else if (this.state.importname === "top-deals") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.postImportTopdeals(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    }else if (this.state.importname === "newArrival") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.postImportNewArrivals(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    }
    else if (this.state.importname === "home-categories") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.postImportTopCategory(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    }else if (this.state.importname === "banner") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.postImportBanner(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    }else if (this.state.importname === "seller_customer") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.postImportSellerCustomer(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    }
    else if (this.state.importname === "beat") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.importBeat(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    }
    else if (this.state.importname === "salesman") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.importSalesman(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    }
    else if (this.state.importname === "phone") {
      this.setState({
        isLoading: true,
      });
      const data =this.props.ImportPhoneNumbers(this.state.fileToUpload);
      if (data) {
        this.setState({
          isLoading: false,
        });
      }
    }
    else{
    Swal.fire("Sorry Error Occured!");
    }
  };
  handleChangeFile = (event) => {
    event.preventDefault();
    const fileToUpload = event.target.files[0];
    this.setState({
      fileToUpload: fileToUpload,
    });
    console.log(fileToUpload);
  };
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
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
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
    const beat_column=[
      { name:"rowNumber",
        label:"Row Number",

      },
      { name:"Name",
        label:"Name",

      },
      { name:"Seller",
        label:"Seller",

      },
      { name:"error",
        label:"Error",

      },
    ]
    const seller_customer=[
      { name:"rowNumber",
        label:"Row Number",

      },
      { name:"CustomerName",
        label:"Customer Name",

      },
      { name:"DistributorCode",
        label:"Seller",

      },
      { name:"error",
        label:"Error",

      },
    ]
    const Phone_import_Success=[
      {
        name:"user",
       label:"Customer Code",
       options:{
         customBodyRender:(user)=>{
           return user.customerCode
         }
       }

     },
     {
      name:"user",
     label:"Customer Name",
     options:{
      customBodyRender:(user)=>{
        return user.customerName
      }
    }

     },
     {
      name:"user",
     label:"New Mobile Number",
     options:{
      customBodyRender:(user)=>{
        return user.phone
      }
    }

     },
     {
      name:"user",
      label:"Register Type",
      options:{
        customBodyRender:(user)=>{
          return user.registerType
        }
      }
     }
    ]
    const Phone_import=[
      {
         name:"rowNumber",
        label:"Row Number",

      },
      { name:"Customer_Code",
        label:"Customer Code",

      },
      { name:"Distributor_Code",
        label:"Seller",

      },
      {
        name:"New_Mobile_Number",
        label:"New Mobile Number"
      },
      {
        name:"Beat_Code",
        label:"Beat Code"
      },
      { name:"Salesman_Code",
        label:"Salesman Code"

      },

      { name:"error",
        label:"Error",

      },
    ]
    const ProductColumn=[
      {
        name: "rowNumber",
       label: "Row Number",
       options: {
        filter: true,
        sort: true
      },
    }, {
      name: "Company_SKU_Code",
     label: "Product SKU",
     options: {
      filter: true,
      sort: true
    },
  }, {
    name: "Product_Name",
   label: "Product Name",
   options: {
    filter: true,
    sort: true
  },
}, {
  name: "error",
 label: "Error",
 options: {
  filter: true,
  sort: true
},
},

    ]
    const Sellercolumn=[
      {
        name: "rowNumber",
        label: "Row Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Seller",
        label: "Seller",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "error",
        label: "Error",
        options: {
          filter: true,
          sort: true,
        },
      },

    ]
  
    const columnSellerProduct = [
      {
        name: "rowNumber",
        label: "Row Number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "SKU",
       label: "SKU",
       options: {
        filter: true,
        sort: true
      },
    },
      {
        name: "SellerId",
        label: "Seller ID",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (SellerId, tableMeta) => {
            return SellerId ? SellerId : "";
          },
        },
      },
      {
        name: "error",
       label: "Error",
       options: {
        filter: true,
        sort: true
      },
    },
      
     
     
    ];
    const columnsPincode=[
      {
        name: "rowNumber",
       label: "Row Number",
       options: {
        filter: true,
        sort: true
      },
    },
 
  {
    name: "City",
   label: "City",
   options: {
    filter: true,
    sort: true
  },
},{
  name: "State",
 label: "State",
 options: {
  filter: true,
  sort: true
},
},
{
  name: "Country",
 label: "Country",
 options: {
  filter: true,
  sort: true
},
},

{
  name: "Pincode",
 label: "Pincode",
 options: {
  filter: true,
  sort: true
},
},
{
  name: "error",
 label: "Error",
 options: {
  filter: true,
  sort: true
},
},

    ];
   
    const options = {
      filter: false,
      viewColumns: false,
      responsive: "scrollMaxHeight",
      pagination: false,
      search: false,
      print: false,
      download: false,
      fixedHeader: true,
      serverSide: true,
      onTableChange: (action, tableState) => {
        console.log(action, tableState);
        switch (action) {
          case "changePage":
            this.changePage(tableState.page);
            break;
          default:
        }
      },
      selectableRows: "none",
      textLabels: {
        body: {
          noMatch: this.state.laoding ? (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                color: "red",
                width: "1024px",
                justifyContent: "center",
              }}
            >
              Loading data..!
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                color: "red",
                width: "1024px",
                justifyContent: "center",
              }}
            >
              <p style={{ textAlign: "center" }}>
              Sorry, No Data Found
              </p>
            </div>
          ),
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
                      <h4>Import Data</h4>
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
                      <li className="breadcrumb-item active">Import Data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-body">
              <div className="card">
                <div className="card-body">
                  <div className="row"></div>
                </div>
                <div className="card-block">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Choose File
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="file"
                            className="form-control"
                            name="file"
                            placeholder="Choose FIle"
                            onChange={this.handleChangeFile}
                            value={this.state.file}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-block d-flex">
                    <div className="card-footer">
                      <div className="row float-right p-3">
                        {this.state.laoding ? (
                          <button
                            className="btn btn-grd-disabled mr-2"
                            disabled
                          >
                            Saving...!
                          </button>
                        ) : (
                          <button
                            onClick={this.onSaveData}
                            className="btn btn-grd-disabled mr-2"
                          >
                            <i className="icofont icofont-save"></i> Save
                          </button>
                        )}
                        <button
                          to={this.props}
                          onClick={() => this.props.history.goBack()}
                          className="btn btn-outline-dark  mr-2"
                        >
                          Cancel
                        </button>

                        {/* {this.state.importname === "sellerpincode" ? (
                          <a
                            href={PinCodeSeller}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )} */}
                        {this.state.importname === "product" ? (
                          <a
                            href={ProductMaster}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {this.state.importname === "sellerproduct" ? (
                          <a
                            href={sellerProduct}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {this.state.importname === "seller" ? (
                          <a
                            href={AddSellerInfoMasterSheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {this.state.importname === "pincode" ? (
                          <a
                            href={LocationPinCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {this.state.importname === "top-deals" ? (
                          <a
                            href={HomeTopDealMasterSheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {this.state.importname === "beat" ? (
                          <a
                            href={beatSampleSheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                         {this.state.importname === "seller_customer" ? (
                          <a
                            href={sellerCustomerSheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {this.state.importname === "salesman" ? (
                          <a
                            href={salesmanSampleSheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {this.state.importname === "newArrival" ? (
                          <a
                            href={NewArrival}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <button
                              target="_blank"
                              className="btn mr-2 color-info p-2"
                            >
                              <i className="icofont icofont-file-alt"></i>{" "}
                              Sample Excel
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              true?
              <div className="page-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-block">
                      <h6>Sheet Validations :</h6>
                      {this.state.importname === "pincode" ?
                      <p>
                      ●	State, City, Country name entered in sheet should be same as written in Masters <br/>
                      ●	No Pin code can belong to two cities <br/>
                      ●	States are already entered into system, So AWL can add city as per the requirement in City Master<br/>
                      ●	Please Do not Change Sheet Tab Name and Header Field Names<br/></p>
                      :null}
                      {this.state.importname === "seller" ?
                      <p>
                      ●	Each Seller Should have unique ID<br/>
                      ●	Please Do not Change Sheet Tab Name and Header Field Names<br/>
                     
                      </p>
                      :null}
                       {this.state.importname === "sellerpincode" ?
                      <p>
                      ●	One Pin Code can have only One Seller ID<br/>
                      ●	Pin Code Seller Import Sheet should have only those Sellers who are listed in Seller Details Master<br/>
                      ●	Please Do not Change Sheet Tab Name and Header Field Names<br/>
                       </p>
                      :null}
                        {this.state.importname === "sellerproduct" ?
                      <p>
                      ●	Products listed in Seller Product Catalogue should have existence in Product Master Catalogue<br/>
                      ●	MRP{">"}PTC{">"}PTD, if this relation fails in any of the row then system will provide list of rows<br/>
                      ●	Seller Id entered in the sheet should have existence in seller details <br/>
                      ●	Please take care of Batch Date in Seller Product Catalogue sheet, the format should be same as given in sample sheet, otherwise system will not identify the date format<br/>

                      ●	Please Do not Change Sheet Tab Name and Header Field Names

                       </p>
                      :null}
                       {this.state.importname === "top-deals" ?
                      <p>
                      ●	Please Do not Change Sheet Tab Name and Header Field Names
                       </p>
                      :null}
                        {this.state.importname === "newArrival" ?
                      <p>
                      ●	Please Do not Change Sheet Tab Name and Header Field Names
                      </p>
                      :null}


                      </div> </div> </div> </div> </div>
                      :null
                      
            }
             {
             this.state.show
              ? (
              <div className="page-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-block">
                      {/* <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
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
                             
                            </button> */}
                            {/* {this.state.show ?<span>
                            Sheet Error:{"  "+this.props.invalidata.sheetError}
                            </span>
                            :null} */}
                       
                        <div className="dt-responsive table-responsive">

                          
                          {this.props.invalidata !== undefined && this.props.invalidata.count!==undefined && this.state.importname=='pincode'?
                            <MUIDataTable
                              title={
                                <div className="d-inline">
                                  <h4>Invalid List</h4>
                                  <ul>
                                    <li>Sheet Error:{"  "+this.props.invalidata.sheetError}</li>
                                    <li>Invalid Rows:{"  "+this.props.invalidata.count.countInvalid}</li>
                                    <li>Imported Rows:{"  "+this.props.invalidata.count.countSuccess}</li>
                                  </ul>
                              
                                </div>
                              }
                              className="table-responsive"
                                data={this.props.invalidata.invalidRows}
                              columns={columnsPincode}
                              options={options}
                            />
                            :null
                             }
                              {/* <b>Sheet Error :</b> {this.props.sellerProductimported.sheetError} */}
                             {console.log(this.state.importname == "sellerproduct",this.props.sellerProductimported !== undefined)}
                              {this.props.sellerProductimported !== undefined && this.state.importname=='sellerproduct'?
                              <div>
                               
                            <MUIDataTable
                              title={
                                <div className="d-inline">
                                  <h4>Invalid List</h4>
                                  <ul>
                                    <li>Sheet Error:{"  "+this.props.sellerProductimported.sheetError}</li>
                                    <li>Invalid Rows:{"  "+this.props.sellerProductimported.count.countInvalid}</li>
                                    <li>Imported Rows:{"  "+this.props.sellerProductimported.count.countSuccess}</li>
                                  </ul>
                              
                                </div>
                              }
                              className="table-responsive"
                                data={this.props.sellerProductimported.invalidRows}
                              columns={columnSellerProduct}
                              options={options}
                            />
                            </div>:null
                             }

                              {this.props.invalidSeller !== undefined && this.state.importname=='seller'?
                              <div>
                               
                            <MUIDataTable
                              title={
                                <div className="d-inline">
                                  <h4>Invalid List</h4>
                                  <ul>
                                    <li>Sheet Error:{"  "+this.props.invalidSeller.sheetError}</li>
                                    <li>Invalid Rows:{"  "+this.props.invalidSeller.count.countInvalid}</li>
                                    <li>Imported Rows:{"  "+this.props.invalidSeller.count.countSuccess}</li>
                                  </ul>
                              
                                </div>
                              }
                              className="table-responsive"
                                data={this.props.invalidSeller.invalidRows}
                              columns={Sellercolumn}
                              options={options}
                            />
                            </div>:null
                             }
                              {this.props.invalidProducts !== undefined && this.state.importname=='product'?
                              <div>
                               
                            <MUIDataTable
                              title={
                                <div className="d-inline">
                                  <h4>Invalid List</h4>
                                  <ul>
                                    <li>Sheet Error:{"  "+this.props.invalidProducts.sheetError}</li>
                                    <li>Invalid Rows:{"  "+this.props.invalidProducts.count.countInvalid}</li>
                                    <li>Imported Rows:{"  "+this.props.invalidProducts.count.countSuccess}</li>
                                  </ul>
                              
                                </div>
                              }
                              className="table-responsive"
                                data={this.props.invalidProducts.invalidRows}
                              columns={ProductColumn}
                              options={options}
                            />
                            </div>:null
                             }
                              {this.props.invalid_beat_data !== undefined && this.state.importname=='beat'?
                              <div>
                               
                            <MUIDataTable
                              title={
                                <div className="d-inline">
                                  <h4>Invalid List</h4>
                                  <ul>
                                    <li>Sheet Error:{"  "+this.props.invalid_beat_data.sheetError}</li>
                                    <li>Invalid Rows:{"  "+this.props.invalid_beat_data.count.countInvalid}</li>
                                    <li>Imported Rows:{"  "+this.props.invalid_beat_data.count.countSuccess}</li>
                                  </ul>
                              
                                </div>
                              }
                              className="table-responsive"
                                data={this.props.invalid_beat_data.invalidRows}
                              columns={beat_column}
                              options={options}
                            />
                            </div>:null
                             }
                              {this.props.invalis_salesman_Data !== undefined && this.state.importname=='salesman'?
                              <div>
                               
                            <MUIDataTable
                              title={
                                <div className="d-inline">
                                  <h4>Invalid List</h4>
                                  <ul>
                                    <li>Sheet Error:{"  "+this.props.invalis_salesman_Data.sheetError}</li>
                                    <li>Invalid Rows:{"  "+this.props.invalis_salesman_Data.count.countInvalid}</li>
                                    <li>Imported Rows:{"  "+this.props.invalis_salesman_Data.count.countSuccess}</li>
                                  </ul>
                              
                                </div>
                              }
                              className="table-responsive"
                                data={this.props.invalis_salesman_Data.invalidRows}
                              columns={beat_column}
                              options={options}
                            />
                            </div>:null
                             }
                               {this.props.invalid_sellerCustomer !== undefined && this.state.importname=='seller_customer'?
                              <div>
                               
                            <MUIDataTable
                              title={
                                <div className="d-inline">
                                  <h4>Invalid List</h4>
                                  <ul>
                                    <li>Sheet Error:{"  "+this.props.invalid_sellerCustomer.sheetError}</li>
                                    <li>Invalid Rows:{"  "+this.props.invalid_sellerCustomer.count.countInvalid}</li>
                                    <li>Imported Rows:{"  "+this.props.invalid_sellerCustomer.count.countSuccess}</li>
                                  </ul>
                              
                                </div>
                              }
                              className="table-responsive"
                                data={this.props.invalid_sellerCustomer.invalidRows}
                              columns={seller_customer}
                              options={options}
                            />
                            </div>:null
                             }
                              {this.props.invalid_sellerCustomer !== undefined && this.state.importname=='phone'?
                              <div>
                               
                            <MUIDataTable
                              title={
                                <div className="d-inline">
                                  <h4>Invalid List</h4>
                                  <ul>
                                    <li>Sheet Error:{"  "+this.props.invalid_sellerCustomer.sheetError}</li>
                                    <li>Invalid Rows:{"  "+this.props.invalid_sellerCustomer.count.countInvalid}</li>
                                    <li>Imported Rows:{"  "+this.props.invalid_sellerCustomer.count.countSuccess}</li>
                                  </ul>
                              
                                </div>
                              }
                              className="table-responsive"
                                data={this.props.invalid_sellerCustomer.invalidRows}
                              columns={Phone_import}
                              options={options}
                            />
                            <br/>
                            <MUIDataTable
                                title={
                                  <div className="d-inline">
                                    <h4>Valid List</h4>
                                    <ul>
                                    
                                      <li>Imported Rows:{"  "+this.props.invalid_sellerCustomer.count.countSuccess}</li>
                                    </ul>
                                
                                  </div>
                                }
                              className="table-responsive"
                              data={this.props.invalid_sellerCustomer.data}
                              columns={Phone_import_Success}
                              options={options}
                            />
                            </div>:null
                              

                             }


                          {this.props.error === false ? this.onError() : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )} 
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sellerProductimported: state.sellerProduct.sellerProductimported,
    //invalidata: state.sellerProduct.sellerProductimported,
    invalis_salesman_Data:state.salesman.invalid_data,
    invalid_sellerCustomer:state.sellerCusMapping.invalid_data,
    invalid_beat_data:state.beat.invalid_data,
    invalidata: state.pincode.pincodeImport_list,
    invalidProducts:state.product.importproduct_list,
    invalidSeller:state.seller.importseller_list,
    // error: state.sellerPincodeImport.error,
    // isLoading: state.sellerPincodeImport.isLoading,
  };
};

ImportData.propTypes = {
  postImportSellerPincode: PropTypes.func.isRequired,
  postImportProduct: PropTypes.func.isRequired,
  postImportSellerproductImport: PropTypes.func.isRequired,
  postImportSeller: PropTypes.func.isRequired,
  postImportPincode: PropTypes.func.isRequired,
  postImportTopdeals: PropTypes.func.isRequired,
  postImportTopCategory:PropTypes.func.isRequired,
  postImportBanner:PropTypes.func.isRequired,
  postImportNewArrivals:PropTypes.func.isRequired,
  postImportSellerCustomer:PropTypes.func.isRequired,
  // category: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  postImportSellerPincode,
  postImportProduct,
  postImportSellerproductImport,
  postImportSeller,
  postImportPincode,
  postImportTopdeals,
  postImportNewArrivals,
  postImportTopCategory,
  postImportBanner,
  postImportSellerCustomer,
  importBeat,
  ImportPhoneNumbers,
  importSalesman,
})(ImportData);
