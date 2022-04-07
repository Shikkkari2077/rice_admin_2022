import React from "react";
import { Link } from "react-router-dom";
// import $ from "jquery";
// import Constant from "../../Constant";
import Swal from "sweetalert2";
import Pagination from 'react-js-pagination'

import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import DateRangePicker from "react-bootstrap-daterangepicker";

import {
   fetchCustomerKyc,
  updateKycStatus,
  updateKycStatusfinal,
	fetchPincodeList, } from "../../store/index";
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from "../../common/DownloadOption";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import KYCPopUp from './KYCPopUp'
import moment from 'moment';
import { FormGroup, FormLabel, Tooltip,
	 TextField, Button, Select, FormControl, InputLabel ,Switch } from '@material-ui/core';
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
class KYCList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     popupimage:'',
     searchNumber:"",
     popupstatus:'',
     userId:'',
     opentoEdit:false,
     documenttype:'',
     kycStatusfilter:'notVerified',
     kyc_list:[],
     datarange:0,
     dataLength:50,
    };
  }

  handlepopup(popupimage,popupstatus,userId,documenttype,UserKycStatus){
    this.setState({
      popupimage,
      popupstatus,
      userId,
      documenttype,
      UserKycStatus

    })
    this.openModel()


  }
  getDate = (date) => {
    console.log(date)
		const dateODorder = moment(date).format('DD-MM-YYYY');
		return dateODorder;
	};

  kycstatus(user,event){
  console.log(user.id,event.target.value)
  var statusKyc=event.target.value
  if(event.target.value =='KYC approved')
  { 
   Swal.fire({
     title:"Are You Sure",
     text:"You won't be able to revert this!",
     icon:"warning",
     showCancelButton: true,
     confirmButtonText: `Confirm`,
   }).then(result=>{
     if(result.isConfirmed){
     
    this.props.updateKycStatusfinal(user.id,true,'accepted') 
    this.props.updateKycStatus(  
      user.id,
      statusKyc,
      this.state.datarange,
      this.state.dataLength,
      )
     }})
   }
  else if(event.target.value =='rejected')
  {
   this.props.updateKycStatusfinal(user.id,false,'rejected') 
  }
  else{

  this.props.updateKycStatus(
    user.id,
    event.target.value,
    this.state.datarange,
    this.state.dataLength,
    )
  }

  
  }
  componentWillMount() {
    this.props.fetchCustomerKyc("notVerified",this.state.datarange,this.state.dataLength)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.kyc_list !==undefined && nextProps.kyc_list !== null)
    {
      this.setState({
        kyc_list:nextProps.kyc_list
      })
    }
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
          height:"40px",
        },
      },
      MUIDataTableBodyCell: {
        root: {
          width: "80px",
          height:"auto",
          fontSize:'9px',
          
          // border:'1px solid black',
          padding:'3px',
          whiteSpace: "normal",
          wordWrap: "break-word",
        },
      },
    },
  });
openModel = () => {
    this.setState({
      opentoEdit: true,
    });
  };
  handleClose = () => {
    this.setState({
      opentoEdit: false,
    });
  };
  selectall = (e) => {
    this.setState({
      hidedownload: !this.state.hidedownload,
      checkedItems: new Map(),
      hideOld: !this.state.hideOld,
    });
  };
  // selctSingle = (e, id) => {
  //   // this.setState({
  //   //   hidedownload:!this.state.hidedownload,
  //   //   check:id,
  //   //   // [e.trget.id]: e.target.value
  //   // })
  //   const item = e.target.name;
  //   const isChecked = e.target.checked;
  //   this.setState((prevState) => ({
  //     hidedownload: !this.state.hidedownload,
  //     checkedItems: prevState.checkedItems.set(item, isChecked),
  //   }));
  //   // this.props.categoryData.data.forEach(d => {
  //   //   this.setState({
  //   //   check : !this.state.check
  //   // })
  //   // })
  // };
  handlecanceldate() {
    this.setState({
      startBatchDate: "",
      endBatchDate: "",
      dateDisplays: "",
      dateDisplaye: "",
    });
    console.log("cancelled");
  }
  handledate = (event, picker) => {
    console.log(picker.startDate.format(), picker.endDate.format("MM-DD-YYYY"));
    var startBatchDate = Date.UTC(
      picker.startDate.format("YYYY"),
      picker.startDate.format("MM") - 1,
      picker.startDate.format("DD")
    );
    var endBatchDate = Date.UTC(
      picker.endDate.format("YYYY"),
      picker.endDate.format("MM") - 1,
      picker.endDate.format("DD")
    );
    console.log(startBatchDate);
    //  console.log(stamp)
    // = picker.startDate.format();
    // var endBatchDate=picker.endDate.format();

    this.setState({
      startBatchDate,
      endBatchDate,
      dateDisplays: picker.startDate.format("DD-MM-YYYY"),
      dateDisplaye: picker.endDate.format("DD-MM-YYYY"),
    });
  };
  handleCityChange = (v) => {
		console.log(v);
		this.setState({
			cityFilter: v,
		});
     //localStorage.setItem('OrderPendingCity',v)
		// this.props.fetchPincodeList(v,0,2500)
	};
	handleSellerChange = (v) => {
		this.setState({
			sellerFilter: v,
		});
		//localStorage.setItem('OrderPendingSeller',v)

	};
	handleKycstatus = (v) => {
		this.setState({
			kycStatusfilter: v,
		});
		console.log(v);
		//localStorage.setItem('OrderPendingPin',v)

	};
  handleregisterType(v){
    this.setState({
			userRegisterType: v,
		});
  }
  handlePageChange(pageNumber) {
    console.log('active page is', pageNumber);
		console.log(pageNumber * 50 - 50);
   
    const range=pageNumber*50-50
    const dataLength = this.state.dataLength;
 
    var status = this.state.kycStatusfilter !== "all" &&
     this.state.kycStatusfilter !== "notVerified" &&
      this.state.kycStatusfilter !== "" ? this.state.kycStatusfilter : "notVerified";
    this.props.fetchCustomerKyc(status,range,dataLength)

    this.setState({
      datarange: range,
    });
    this.setState({activePage: pageNumber});
  }
  onGo = () => {
   
   
    // var cityId = this.state.cityId !== "All" ? this.state.cityId : "";
    // var pincode = this.state.pincode !== "All" ? this.state.pincode : "";
    var startBatchDate = this.state.startBatchDate;
    var endBatchDate = this.state.endBatchDate;
    var userStatus=this.state.userRegisterType !=="all" && this.state.userRegisterType !==" " ?this.state.userRegisterType:" "
    var status = this.state.kycStatusfilter !== "all" && this.state.kycStatusfilter !== " " &&
                     this.state.kycStatusfilter !== "notVerified" ? this.state.kycStatusfilter : "notVerified";
      console.log(status)
      userStatus !== " "?
      this.props.fetchCustomerKyc(status,this.state.datarange,this.state.dataLength,userStatus)
      :
      this.props.fetchCustomerKyc(status,this.state.datarange,this.state.dataLength)

    this.setState({
      dataLength: 50,
      datarange: 0,
    });
  };
  onsearchButton=()=>{
    console.log("search Button")
    this.setState({
      cancelButton:true,
    })
    var userStatus=this.state.userRegisterType !=="all" &&
                     this.state.userRegisterType !==" " ?this.state.userRegisterType:" "
    var status = this.state.kycStatusfilter !== "all" && this.state.kycStatusfilter !== " " &&
                  this.state.kycStatusfilter !== "notVerified" ? this.state.kycStatusfilter : "notVerified";
                  
     this.props.fetchCustomerKyc(status,this.state.datarange,this.state.dataLength,userStatus,this.state.searchNumber)
 

  }
  oncancelButton=()=>{
    this.setState({
      searchNumber:"",
      cancelButton:false
    })
  
    var userStatus=this.state.userRegisterType !=="all" && 
                      this.state.userRegisterType !==" "  ? this.state.userRegisterType:" "
    var status = this.state.kycStatusfilter !== "all" && this.state.kycStatusfilter !== " " &&
                     this.state.kycStatusfilter !== "notVerified" ? this.state.kycStatusfilter : "notVerified";
                    
                    
    this.props.fetchCustomerKyc(status,this.state.datarange,this.state.dataLength,userStatus)
                        


  }
  handleSearchinput=(e)=>{
   console.log('handlesearch',e.target.value)
   this.setState({
    searchNumber:e.target.value
   })
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
      name: "kycStatus",
      label: "KYC Approval status",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({ style: { minWidth: "200px", maxWidth: "200px" }}),

        customBodyRender:(kycStatus,tableMeta)=>{
          return(
            kycStatus !== undefined && kycStatus!== null &&kycStatus !== 'KYC approved'   ?
            <select
            // className="form-control"
            value={kycStatus}
            style={{height:"22px",width:"180px"}}
            // label="Select Status"
            // name="Select Status"
            onChange={this.kycstatus.bind(this,tableMeta.rowData[2])}>
              <option>Select Status</option>
              <option value={"Not Started"} style={{fontSize:"12px"}} >Not Started</option>
              <option value={"in progress"} style={{fontSize:"12px"}} >In Progress</option>
              <option value={"waiting for approval"} style={{fontSize:"12px"}} >Waiting For Approval</option>
              <option value={"see replies and resolve"} style={{fontSize:"12px"}} >See Replies and Rsolve</option>
              <option value={"verify documents and accept"} style={{fontSize:"12px"}} >Verify Documents and Accept</option>
              <option value={"KYC approved"} style={{fontSize:"12px"}} >KYC Approved</option>
              <option value={"rejected"} style={{fontSize:"12px"}} >KYC Rejected</option>

 


            </select>
            :null
          )

        },
     
      },

    },
    {
      name: "User",
      label: "Seller mapping",
      options: {
        filter: false,
        sort: false,
        display:localStorage.getItem('seller_customerAdd') == 'true' ? true : false,
        customBodyRender:(User)=>{
          console.log(localStorage.getItem('seller_customerAdd'))

          return(
            User !== undefined &&  User !== null ?
            <Link to={'/seller_customer_mapping/add/'+User.id+"/"+"Normal" }>
            <i className="f-22 icofont icofont-edit">

            </i>
            </Link>
            :null
          )
        }
     
      },
    },
    
      {
        name:'User',
        options:{
          display:false,
          customBodyRender:(User)=>{
            return (
            User !==null && User !==undefined ?
            User.id ? User.id :null 
             :null 
             )
          }
        },

      },
      {
        name: "createdAt",
        label: "Date of applicaiton",
        options: {
         
          customBodyRender : (createdAt,tableMeta) => {
              return  createdAt !==null && createdAt !==undefined?
                        moment(createdAt).format('DD-MM-YYYY HH:MM:SS') 
                     :null
             
          },
        },
      },
      {
        name: "User",
        label: "Register Type",
        options: {
          filter: false,
          sort:false,
          customBodyRender:(User,tableMeta)=>{
            return(
              User !== undefined &&
               User !==null &&
              User.registerType !== undefined  &&
               User.registerType !== null  ? User.registerType:"-"
            )
          },
        },
      },
      {
        name: "User",
        label: "Business Name",
        options: {
          filter: false,
          sort:false,
          customBodyRender:(User,tableMeta)=>{
            return(
              User !== undefined &&  User !==null &&
               User.customerName !== undefined  && 
              User.customerName !== null ? User.customerName:"-"
            )
          },
        },
      },
  
      {
        name: "User",
        label: "Phone No.",
        options: {
          filter: false,
          sort: false,
          customBodyRender:(User,tableMeta)=>{
                  return(
                    User !== undefined && User !==null && User.phone !== undefined &&
                    User.phone !== null ? User.phone:"-"
                  )
        },
      },
    },
      {
        name: "BusinessType",
        label: "Business Type",
        options: {
       
          customBodyRender:(BusinessType,tableMeta)=>{
            return(
              BusinessType !== undefined &&  BusinessType !== null &&
               BusinessType.length !== 0 &&
               BusinessType.length>0 ? BusinessType.map(a=>{
               return <li>
                  {a.name !==null && a.name !== undefined ? a.name :null}
                </li>
              }):"-"
            )
  },
        },
      },
      {
        name: "BusinessCategory",
        label: "Business Category",
        options: {
          filter: true,
          sort: true,
          customBodyRender:(BusinessCategory)=>(
            BusinessCategory !== undefined && BusinessCategory !== null &&
             BusinessCategory.length !== 0 ? BusinessCategory.map( cat =>{
               return <li>
                {cat.name !==undefined? cat.name:null}
              </li>
            }
            )
            :"-"
          )
        },
      },
      {
        name: "documetProof",
        label: "GSTIN",
        options: {
          customBodyRender:(documetProof,tableMeta)=>{
            return(
              documetProof !==undefined && documetProof !==null && documetProof.length >0 !==null?
              documetProof.map(doc=> ( doc.docType === 'gst' ?(
          
                <i className="f-22 icofont icofont-law-document"
                   onClick={this.handlepopup.bind(this,doc.media,tableMeta.rowData[9],tableMeta.rowData[2],"gst",tableMeta.rowData[0])}>
               </i>
               ):null )) 
            :null
              // gst !== '' && gst !==null ?
              // <i className="f-22 icofont icofont-law-document"
              // onClick={
              //   this.handlepopup.bind(this,gst,tableMeta.rowData[9],tableMeta.rowData[2],"gst")
              // }></i>
              // :"Not Uploaded"
            )
           },
        },
      },
      {
        name: "documetProof",
        label: "Status",
        options: {
          customBodyRender:(documetProof,tableMeta)=>{
            return (
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> { 
                if(doc.docType === 'gst' ){
                 // console.log(doc.verified)
                if(doc.verified == true ){ 
                   return (
                  <span
                    style={{
                      color: 'black',
                      background: 'MediumSeaGreen',
                      borderRadius: '5px',
                      padding: "3px",
                      fontSize:"11px"
                    }}
                    >Approved</span>) 
                  }
                
                else
                // (doc.verified == false)
                {  
                  return(
                  <span
                      style={{
                        color: 'black',
                        background: '#ee4466',
                        borderRadius: '5px',
                        padding: "3px",
                        fontSize:"11px",
                      }}
                        >Pending</span>)

                }
              
              }
              
          
              }
              ):null
            )
           
          }
        },
      },
     
      {
        name: "documetProof",
        label: "Aadhar",
        options: {
          customBodyRender:(documetProof,tableMeta)=>{
            return( documetProof !==undefined && documetProof !==null && documetProof.length >0?

              documetProof.map(doc=> ( doc.docType === 'aadhar' ?(
          
               <i className="f-22 icofont icofont-law-document"
                  onClick={this.handlepopup.bind(this,doc.media,tableMeta.rowData[11],tableMeta.rowData[2],"aadhar",tableMeta.rowData[0])}>
              </i>
              ):null)) 
                :null  
            )
           },
       
        },
      },
      {
        name: "documetProof",
        label: "Status",
        options: {
          customBodyRender : (documetProof)=>{
            return (
               documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> { 
                if(doc.docType === 'aadhar' ){
                 // console.log(doc.verified)
                if(doc.verified == true ){ 
                   return (
                  <span
                    style={{
                      color: 'black',
                      background: 'MediumSeaGreen',
                      borderRadius: '5px',
                      padding: "3px",
                      fontSize:"11px"
                    }}
                    >Approved</span>) 
                  }
                
               else{  
                  return(
                  <span
                      style={{
                        color: 'black',
                        background: '#ee4466',
                        borderRadius: '5px',
                        padding: "3px",
                        fontSize:"11px",
                      }}
                        >Pending</span>)

                }
              }
            })
           :null
            )
           
          }
       
        },
      },
      {
        name: "documetProof",
        label: "Shop Establishment",
        options: {
          customBodyRender:(documetProof,tableMeta)=>{
            return(
              documetProof !==undefined && documetProof !==null && documetProof.length >0?

              documetProof.map(doc=> ( doc.docType === 'shopLicense' ?(
          
                <i className="f-22 icofont icofont-law-document"
                   onClick={this.handlepopup.bind(this,doc.media,tableMeta.rowData[13],tableMeta.rowData[2],"shopLicense",tableMeta.rowData[0])}>
               </i>
               ):null )) 
            :null
              // shopLicense !== '' &&  shopLicense !==null?

              // <i className="f-22 icofont icofont-law-document"
              // onClick={
              //   this.handlepopup.bind(this,shopLicense,tableMeta.rowData[13],tableMeta.rowData[2],"shopLicense")
              // }></i> :"Not Uploaded"
            )
           },
       
        },
      },
      {
        name: "documetProof",
        label: "Status",
        options: {
          customBodyRender:(documetProof)=>{
            return (
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> { 
                if(doc.docType === 'shopLicense' ){
                 // console.log(doc.verified)
                if(doc.verified == true ){ 
                   return (
                  <span
                    style={{
                      color: 'black',
                      background: 'MediumSeaGreen',
                      borderRadius: '5px',
                      padding: "3px",
                      fontSize:"11px"
                    }}
                    >Approved</span>) 
                  }
                
               else
              //  (doc.verified == false)
               {  
                  return(
                  <span
                      style={{
                        color: 'black',
                        background: '#ee4466',
                        borderRadius: '5px',
                        padding: "3px",
                        fontSize:"11px",
                      }}
                        >Pending</span>)

              }}}) :null
            )
           
          }
       
        },
      },
      {
        name: "documetProof",
        label: "FSSAI",
        options: {
          customBodyRender:(documetProof,tableMeta)=>{
            return(
              documetProof !==undefined && documetProof !==null && documetProof.length >0?

              documetProof.map(doc=> ( doc.docType === 'fssai' ?(
          
                <i className="f-22 icofont icofont-law-document"
                   onClick={this.handlepopup.bind(this,doc.media,tableMeta.rowData[15],tableMeta.rowData[2],"fssai",tableMeta.rowData[0])}>
               </i>
               ):null )) 
             :null
              
          
            )
           },
        },
      },
      {
        name: "documetProof",
        label: "Status",
        options: {
          customBodyRender:(documetProof)=>{
            return (
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> { 
                if(doc.docType === 'fssai' ){
                 // console.log(doc.verified)
                if(doc.verified == true ){ 
                   return (
                  <span
                    style={{
                      color: 'black',
                      background: 'MediumSeaGreen',
                      borderRadius: '5px',
                      padding: "3px",
                      fontSize:"11px"
                    }}
                    >Approved</span>) 
                  }
               
               else
              //  (doc.verified == false)
               {  
                  return(
                  <span
                      style={{
                        color: 'black',
                        background: '#ee4466',
                        borderRadius: '5px',
                        padding: "3px",
                        fontSize:"11px",
                      }}
                        >Pending</span>)

                      } }}) 
                      :null
            )
           
          }
       
        },
      },
   
      {
        name: "documetProof",
        label: "Trade Certificate",
        options: {
          customBodyRender:(documetProof,tableMeta)=>{
            return(
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> ( doc.docType === 'tradeCertificate' ?(
          
                <i className="f-22 icofont icofont-law-document"
                   onClick={this.handlepopup.bind(this,doc.media,tableMeta.rowData[17],tableMeta.rowData[2],"tradeCertificate",tableMeta.rowData[0])}>
               </i>
               ):null )) 
             :null
              // tradeCertificate !== '' &&  tradeCertificate !==null?

              // <i className="f-22 icofont icofont-law-document"
              // onClick={
              //   this.handlepopup.bind(this,tradeCertificate,tableMeta.rowData[17],tableMeta.rowData[2],"tradeCertificate")
              // }></i>:"Not Uploaded"
            )
           },
         
        },
      },
      {
        name: "documetProof",
        label: "Status",
        options: {
          customBodyRender:(documetProof)=>{
            return (
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> { 
                if(doc.docType === 'tradeCertificate' ){
                 // console.log(doc.verified)
                if(doc.verified == true ){ 
                   return (
                  <span
                    style={{
                      color: 'black',
                      background: 'MediumSeaGreen',
                      borderRadius: '5px',
                      padding: "3px",
                      fontSize:"11px"
                    }}
                    >Approved</span>) 
                  }
              
               else
              //  (doc.verified == false)
               {  
                  return(
                  <span
                      style={{
                        color: 'black',
                        background: '#ee4466',
                        borderRadius: '5px',
                        padding: "3px",
                        fontSize:"11px",
                      }}
                        >Pending</span>)

                      } }})
                      :null
            )
           
          }
       
        },
      },
      {
        name: "documetProof",
        label: "Current Account",
        options: {
          customBodyRender:(documetProof,tableMeta)=>{
            return(
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> ( doc.docType === 'currentAccount' ?(
          
                <i className="f-22 icofont icofont-law-document"
                   onClick={this.handlepopup.bind(this,doc.media,tableMeta.rowData[19],tableMeta.rowData[2],"currentAccount",tableMeta.rowData[0])}>
               </i>
               ):null )) 
                          
               :null
              // currentAccount !== '' &&  currentAccount !==null?

              // <i className="f-22 icofont icofont-law-document"
              // onClick={
              //   this.handlepopup.bind(this,currentAccount,tableMeta.rowData[19],tableMeta.rowData[2],"currentAccount")
              // }></i> :"Not Uploaded"
            )
           },
         
        },
      },
      {
        name: "documetProof",
        label: "Status",
        options: {
          customBodyRender:(documetProof)=>{
            return (
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> { 
                if(doc.docType === 'currentAccount' ){
                 // console.log(doc.verified)
                if(doc.verified == true ){ 
                   return (
                  <span
                    style={{
                      color: 'black',
                      background: 'MediumSeaGreen',
                      borderRadius: '5px',
                      padding: "3px",
                      fontSize:"11px"
                    }}
                    >Approved</span>) 
                  
                }
               else
              //  (doc.verified == false)
               {  
                  return(
                  <span
                      style={{
                        color: 'black',
                        background: '#ee4466',
                        borderRadius: '5px',
                        padding: "3px",
                        fontSize:"11px",
                      }}
                        >Pending</span>)

                      } }}) 
                      :null
            )
           
          }
       
        },
      },
      {
        name: "documetProof",
        label: "Trade Invoice",
        options: {
          customBodyRender:(documetProof,tableMeta)=>{
            return(
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> ( doc.docType === 'tradeInvoice' ?(
          
                <i className="f-22 icofont icofont-law-document"
                   onClick={this.handlepopup.bind(this,doc.media,tableMeta.rowData[19],tableMeta.rowData[2],"tradeInvoice",tableMeta.rowData[0])}>
               </i>
               ):null )) 
                          
               :null
              // currentAccount !== '' &&  currentAccount !==null?

              // <i className="f-22 icofont icofont-law-document"
              // onClick={
              //   this.handlepopup.bind(this,currentAccount,tableMeta.rowData[19],tableMeta.rowData[2],"currentAccount")
              // }></i> :"Not Uploaded"
            )
           },
         
        },
      },
      {
        name: "documetProof",
        label: "Status",
        options: {
          customBodyRender:(documetProof)=>{
            return (
              documetProof !==undefined && documetProof !==null && documetProof.length >0 ?

              documetProof.map(doc=> { 
                if(doc.docType === 'tradeInvoice' ){
                 // console.log(doc.verified)
                if(doc.verified == true ){ 
                   return (
                  <span
                    style={{
                      color: 'black',
                      background: 'MediumSeaGreen',
                      borderRadius: '5px',
                      padding: "3px",
                      fontSize:"11px"
                    }}
                    >Approved</span>) 
                  
                }
               else
              //  (doc.verified == false)
               {  
                  return(
                  <span
                      style={{
                        color: 'black',
                        background: '#ee4466',
                        borderRadius: '5px',
                        padding: "3px",
                        fontSize:"11px",
                      }}
                        >Pending</span>)

                      } }}) 
                      :null
            )
           
          }
       
        },
      },
      // {
      //   name: "View",
      //   label: "View",
      //   options: {
      //     filter: true,
      //     sort: false,
       
      //   },
      // },
      // {
      //   name: "status",
      //   label: "KYC Approval status",
      //   options: {
      //     filter: true,
      //     sort: false,
      //     setCellProps: () => ({ style: { minWidth: "200px", maxWidth: "200px" }}),

      //     customBodyRender:(status,tableMeta)=>{
      //       return(
      //         <select
      //         // className="form-control"
      //         value={status}
      //         style={{height:"22px",width:"180px"}}
      //         // label="Select Status"
      //         // name="Select Status"
      //         onChange={this.kycstatus.bind(this,tableMeta.rowData[0])}>
      //           <option>Select Status</option>
      //           <option value={"Not Started"} style={{fontSize:"12px"}} >Not Started</option>
      //           <option value={"in progress"} style={{fontSize:"12px"}} >In Progress</option>
      //           <option value={"waiting for approval"} style={{fontSize:"12px"}} >Waiting For Approval</option>
      //           <option value={"see replies and resolve"} style={{fontSize:"12px"}} >See Replies and Rsolve</option>
      //            <option value={"verify documents and accept"} style={{fontSize:"12px"}} >Verify Documents and Accept</option>
      //           <option value={"KYC approved"} style={{fontSize:"12px"}} >KYC approved</option>
   


      //         </select>
      //       )

      //     },
       
      //   },

      // },
      {
        name: "verifiedBy",
        label: "Appoved by",
        options: {
          filter: true,
          sort: false,
          customBodyRender:(verifiedBy)=>{
            return(
              verifiedBy !==undefined &&
              verifiedBy!==null ? verifiedBy.name?verifiedBy.name:"-"+"/"+verifiedBy.role?verifiedBy.role:"-" :"-"
            )
          }
       
        },
      },
   

      // {
      //   name: "id",
      //   label: "Action",
      //   options: {
      //     display:localStorage.getItem('CategoryEdit')=='true'?true:false,
      //     filter: false,
      //     sort: false,
      //     customBodyRender: (id, tableMeta) => {
      //       return (
      //         <div>
      //           <Link
      //             to={"/category/add/" + id}
      //             className="m-r-15 text-muted"
      //             data-toggle="tooltip"
      //             data-placement="top"
      //             title=""
      //             data-original-title="Edit"
      //           >
      //             <i className="f-20 icofont icofont-ui-edit text-custom"></i>
      //           </Link>
      //         </div>
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
          noMatch: !this.props.kyc_list.length !== 0
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
        // selectedRows: {
        //   text: `row(s) Selected`,
        //   download: "Download",
        //   downloadAria: "Download Selected Rows",
        // },
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
                      <h4>Customer KYC List</h4>
                    </div>
                  </div>
                  {this.state.opentoEdit ? (
              <div
                className="backdrop_color"
                style={{
                  width: "140vw",
                  height: "140vh",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "rbga(0,0,0,.5)",
                  zIndex: "105",
                }}
              >
                <KYCPopUp
                  close={this.handleClose}
                  open={true}
                  data={this.state}
                  
                  
                  
                />
              </div>
            ) : (
              ""
            )}
               
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                      <Link to="/seller_customer">Seller Customer Mapping</Link>
                    </li>
                      <li className="breadcrumb-item active">Customer KYC List</li>
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
                        
										
													<FormControl variant="outlined" className="col-sm-2 mx-1">
													
														<InputLabel
															htmlFor="outlined-age-native-simple"
															style={{ fontSize: '12px' }}
													>
															KYC Status
														</InputLabel>
														<Select
															className="selectpicker"
															search
															native
															name="pincodeFilter"
															value={this.state.pincodeFilter
																// ?this.state.pincodeFilter:localStorage.getItem('OrderPendingPin')}
															}
															onChange={(val) =>
																this.handleKycstatus(val.target.value)
															}
															label="Pincode Filter"
															filter
															className="my-2"
															style={{ height: '30px' }}
															inputProps={{
																name: 'Time Peroid',
																id: 'outlined-age-native-simple',
															}}
														>
															<option aria-label="None"  > </option>
                              <option aria-label="None" value={'all'} >All</option>

															<option aria-label="None" value={'Not Started'}>Not Started</option>
                              <option aria-label="None" value={'in progress'}>In Progress</option>
															<option aria-label="None" value={'waiting for approval'}>Waiting For Approval</option>
															<option aria-label="None" value={'see replies and resolve'}>See Replies and Rsolve</option>
															<option aria-label="None" value={'verify documents and accept'}>Verify Documents and Accept</option>
															{/* <option aria-label="None" value={'KYC approved'}>KYC approved</option> */}

														
																
														</Select>
														<div style={{ position: '-webkit-sticky' }}>
		
														</div>
					
													</FormControl>
                          <FormControl variant="outlined" className="col-sm-2 mx-1">
													
                          <InputLabel
                            htmlFor="outlined-age-native-simple"
                            style={{ fontSize: '12px' }}
                        >
                            Register Type
                          </InputLabel>
                          <Select
                            className="selectpicker"
                            search
                            native
                            name="registerType"
                            value={this.state.registerType
                              // ?this.state.pincodeFilter:localStorage.getItem('OrderPendingPin')}
                            }
                            onChange={(val) =>
                              this.handleregisterType(val.target.value)
                            }
                            label="Pincode Filter"
                            filter
                            className="my-2"
                            style={{ height: '30px' }}
                            inputProps={{
                              name: 'Time Peroid',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None"  > </option>
                            <option aria-label="None" value={'postRegister'} >Post Register</option>
                            <option aria-label="None" value={'preRegister'} >Pre Register</option>


                   
                            {/* <option aria-label="None" value={'KYC approved'}>KYC approved</option> */}

                          
                              
                          </Select>
                          <div style={{ position: '-webkit-sticky' }}>
  
                          </div>
        
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
                        <div className="col-sm-9">
													<FormControl>
														<div style={{ height: '8px' }}></div>
														<div className="form-group row">
															<div className="col-sm-9">
																<input
																	style={{ width: '220px', height: '10px' }}
																	type="search"
																	className="form-control"
																	name="searchNumber"
																	placeholder="search by phone number.."
																	onChange={this.handleSearchinput}
																	value={this.state.searchNumber}
																/>
															</div>
														</div>
													</FormControl>
													<FormControl>
														<div>
															<span
																className="btn btn-dark py-1 mx-3 mt-2"
																onClick={this.onsearchButton}
															>
																<i class="icofont icofont-search"> </i>
																<i style={{ fontSize: '9px', fontStyle: 'none' }}>
																
																</i>
															</span>
													
														</div>
													</FormControl>
													<FormControl>
														{this.state.cancelButton == true ? (
															<div
																className="btn btn-secondary py-1 mx-3 mt-2"
															onClick={this.oncancelButton}
															>

																<i style={{ fontSize: '10px' }}>cancel</i>
															</div>
														) : null}
													</FormControl>
												</div>

												

											
											</div>

                      {/* <div className="col">
                    
                      </div> */}
                      <div className="dt-responsive table-responsive">
                        {this.state.kyc_list !== undefined? 
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                         
                          className="table-responsive"
                          data={this.state.kyc_list}
                          columns={columns}
                          options={options}
                        />
                        </MuiThemeProvider>
                        :null}
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
    isLoading:state.category.isLoading,
    kyc_list:state.kyc.kyc_list,
    countFilterWise:state.kyc.countFilterWise,

    pincode_list: state.pincode.pincode_list,
  };
};
KYCList.propTypes = {
   fetchCustomerKyc: PropTypes.object.isRequired,
   updateKycStatus: PropTypes.object.isRequired,
   updateKycStatusfinal: PropTypes.object.isRequired,
   fetchPincodeList: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { 
  fetchCustomerKyc,
  updateKycStatus,
  updateKycStatusfinal,
	fetchPincodeList,})(KYCList);