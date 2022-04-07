import React, { Component } from "react";
import {updateDocumentStatus
} from "../../store/index";
import { Document } from 'react-pdf';
// import Select from "react-select";
// import PDFViewer from 'pdf-viewer-reactjs';
import FileViewer from 'react-file-viewer'
// import detect from 'detect-file-type'
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
class KYCPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: false,
      note:'Declined',
      image2:'',
      image:'',
   };
  }

  componentDidMount(){
    console.log(this.props.data)
    this.setState({
      image: this.props.data.popupimage[0].mediaUrl,
      image2: this.props.data.popupimage[1].mediaUrl

    })
     
  }
  updateStatausApprove = (verified,type) => {
    this.props.updateDocumentStatus(
      this.props.data.userId.id,
      this.props.data.documenttype,
      verified,
      "Approved",
      "accepted",
      this.props.data.kycStatusfilter,
      this.props.data.datarange,
      this.props.data.dataLenth,
      this.props.data.userRegisterType
      )
      this.props.close();
  };
  updateStatausDecline= (verified,type) => {
    this.props.updateDocumentStatus(
      this.props.data.userId.id,
      this.props.data.documenttype,
      verified,
      this.state.note,
      "rejected",
      this.props.data.kycStatusfilter,
      this.props.data.datarange,
      this.props.data.dataLenth,
      this.props.data.userRegisterType
      )
      this.props.close();
  };



  handelreason(event){
   this.setState({
     note:event.target.value
   })
  }

  onError = (e) => {
    console.log(e, 'error in file-viewer');
 }
 
  render() {


    const customStyles = {
        root: {
          background: "red",
          height: "20px",
        },
      };

    return (
      <div
        className=""
        style={{
          position: "absolute",
          top: "0",
          boxShadow: "0 0 5px black",
          padding: "1vh",
          left: "1vw",
          background: "white",
          width: "80vw",
          height:"overflow",
          paddingBottom: "4vh",
          zIndex: "300",
        }}
      >
        <div
          className="col-sm-12"
          style={{ position: "relative", margin: "0 auto" }}
        > CUSTOMER DOCUMENT APPROVAL
          <div
            style={{
              display: "flex",
              justifyContent: "spaceBetween",
            }}
          >
            <div className="col-sm-11">
              <p style={{fontWeight: "bold",fontSize: "12px"}}>
                {" "} {" "}
              </p>
              <p style={{fontSize: "14px" }}>{" "}<b>Document Type: { this.props.data.documenttype.toUpperCase() }</b>{" "}{this.state.title !== undefined ?this.state.title:null}{" "}
              </p>
            
            </div>
         
            
            <div className="col-sm-3">
              <i
                class="icofont icofont-close-squared"
                style={{ zoom: "1.4", padding: "2px", cursor: "pointer" }}
                onClick={() => {
                  //   window.location.reload()
                  this.props.close();
                }}
              ></i>
            </div>
          </div>
       
          <div className="col-sm-12" style={{
            padding:"10px", height:"390px",width:"1200px",overflow:'scroll'
          }}>
            {console.log(this.props.data.popupimage)}
          { 
            this.props.data.popupimage.map( image => (
              image.mediaUrl !==null?
             image.mediaUrl.split('.').pop()  !== 'pdf' ?
             <div>
             {
              <img
              src={image.mediaUrl}
              className="img-responsive"
              style={{height:"700px" , width:"596px"}}
            />
          
             }</div>: 
             <iframe src={image.mediaUrl} 
                    style={{height:"375px" , width:"1150px" ,overflow:"hidden"  }}
             >
            </iframe>
            // :   window.location.href = `${image.mediaUrl}`
          //   <Worker
          //   workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          //   <Viewer fileUrl={image.mediaUrl} 
          //           />
          //  </Worker>
              

            :null
          ) ) 
            }
            
          {/* {
            // this.props.data.popupimage.map(media=>{

              <img
              src={this.state.image}
              alt=""
              className="img-responsive"
              onError={this.imgLoadError}
            />


          }
          <br/>
          {
            // this.props.data.popupimage.map(media=>{

              <img
              src={this.state.image2}
              alt=""
              className="img-responsive"
              onError={this.imgLoadError}
            />


          } */}


            </div>
            <br/>
            {this.props.data.UserKycStatus !== 'KYC approved'?
           <div className="col-md-12">
             <div className="row">
             <label className="col-sm-3 col-form-label">Decline Reason</label>

               <div className="col-md-8">
                   <select
                   value={this.state.note}
                   onChange={this.handelreason.bind(this)}
                   className="form-control"
                   >
                   <option default value={""}>Select reason</option>

                  <option value={"Document visibilty not clearr"}>Document visibilty not clear</option>
                  <option value={"Incorrect Document"}>Incorrect Document</option>

                   </select>
               </div>

             </div>

             </div>
           :null}
        
        <br/><br/>
          <div className="mx-2 float-roght">
          {this.props.data.UserKycStatus !== 'KYC approved'?
            <button
              className="btn btn-success"
              onClick={this.updateStatausApprove.bind(this,true)}
            >
              Approve 
            </button>
             :null
            }
            {" "}
            {this.props.data.UserKycStatus !== 'KYC approved'?
            <button
              className="btn btn-danger"
              onClick={this.updateStatausDecline.bind(this,false)}
            >
              Decline
            </button>
            :null
            } &nbsp;&nbsp;&nbsp;
            {/* <button
              className="btn btn-sm btn-inverse waves-effect waves-light md-trigger mx-2"
              onClick={() => {
                //   window.location.reload()
                this.props.close();
              }}
            >
              Cancel
            </button> */}
          </div>
        </div>
        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // templates: state.notification.template_detail,
    // seller_list: state.seller.seller_list,

    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
  };
};

KYCPopUp.propTypes = {
    //fetchTemplatesdetails:PropTypes.func.isRequired,

    updateDocumentStatus: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
   
  updateDocumentStatus
})(KYCPopUp);
