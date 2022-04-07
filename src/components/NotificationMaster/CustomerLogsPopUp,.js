import React, { Component } from "react";
import {
    customerNotificationLogs
} from "../../store/index";
import Select from "react-select";
import { Tooltip, Button,Switch } from "@material-ui/core";
import moment from 'moment'
import Constant from '../../Constant';
import PropTypes from "prop-types";
import { connect } from "react-redux";
class CustomerLogsPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count:0,
      enable: false,
      status: null,
      customer_list:[]
    };
  }
 
  componentDidMount(){
      console.log(this.props.data)
      if(this.props.data !== undefined)
      {
        this.props.customerNotificationLogs(this.props.data)
     }
  }
  downloadcsv(){
    window.location.href = `${Constant.getAPI()}/notification/custom/customer_logs_download?customId=${this.props.data !== undefined ?this.props.data:''}`
console.log(`${Constant.getAPI()}/notification/custom/customer_logs_download?customId=${this.props.data !== undefined ?this.props.data:''}`)
  }

  componentWillReceiveProps(nextProps) {
    var count=0
    var a=[]
    if(nextProps.templates!==undefined && nextProps.templates!==null){
         a=nextProps.templates
        a.map(b=>(
         b.seen==true?count++:null
        ))
         console.log(count)  
    this.setState({
      count,
       customer_list:nextProps.templates
       
      })
    }
  }
 
  
  render() {
    

    return (
      <div
        className=""
        style={{
          position: "fixed",
          top: "15vh",
          boxShadow: "0 0 5px black",
          padding: "1vh",
          left: "30vw",
          background: "white",
          width: "45vw",
          height: "auto",
          paddingBottom: "4vh",
          zIndex: "455",
          overflowY:"scroll",
          overflowX:"hidden",
          height:"590px",
        }}
      >
        <div
          className="col-sm-12"
          style={{ position: "relative", margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "spaceBetween",
            }}
          >
            <div className="col-sm-11">
              <p style={{fontWeight: "bold",fontSize: "12px",}}>
                {" "} Customer Logs For Notification{" "}
              </p>
              <p style={{fontWeight: "bold",fontSize: "16px",display:"flex", flexDirection:"row-reverse" }}>
                {" "}Total Views:{" "}{this.state.count !==undefined?this.state.count:null}{" "}
              </p>
            </div>
            <button
                            className="f-right bg-white b-none"
                            data-modal="modal-13"
                            onClick={this.downloadcsv.bind(this)}

                          >  <i
                          className="icofont icofont-download-alt"
                          style={{
                            fontSize: "25px",
                            color: "grey",
                          }}
                        ></i>
                            {/* <Tooltip
                              title="Download"
                              aria-label="download"
                              onClick={this.downloadcsv.bind()}
                            >
                              <i
                                className="icofont icofont-download-alt"
                                style={{
                                  fontSize: "25px",
                                  color: "grey",
                                }}
                              ></i>
                            </Tooltip> */}
                          </button>
            <div className="col-sm-3">
              <i
                class="icofont icofont-close-squared"
                style={{ zoom: "1.4", padding: "2px", cursor: "pointer" }}
                onClick={() => {
                  this.props.close();
                }}
              ></i>
            </div>
          </div>
          <div>
          
         
            
          </div>
          {this.state.showText==true?
          <label className="row-form-label" style={{color:"red",fontSize:"10px"}}>Notification Sended Succesfully</label>
        :null}
          <div className="mx-2 float-roght">
           <table style={{border:"1px solid black" , width: "100%",
  borderCollapse: "collapse",textAlign:"center",}}>
               <tr style={{border:"1px solid black" }}>
                   <th style={{border:"1px solid black" ,textAlign:"center"}}>
                       Customer Name
                   </th>
                   <th style={{border:"1px solid black",textAlign:"center" }}>
                       Customer Contact
                   </th>
                   <th style={{border:"1px solid black",textAlign:"center" }}>
                       Viewed Notification
                   </th>
                   <th style={{border:"1px solid black",textAlign:"center" }}>
                       Date And Time
                   </th>
               </tr>
               { this.state.customer_list !== undefined && this.state.customer_list !== null ?
               this.state.customer_list.map(customer=>{
        return(
               <tr>
                   <td style={{border:"1px solid black" }}>
                    {customer.User !== null?
                    customer.User.firstName!== null ? customer.User.firstName:null
                     +" "+ customer.User.lastName!== null ?customer.User.lastName:null
                     :
                    
                    customer.GuestUser !== null ?"Guest User":"Guest User"
                    
                    }
                   </td>
                   <td style={{border:"1px solid black" }}>
                       {customer.User !== null?
                       customer.User.phone:"-"
                       }
                   </td>
                   <td style={{border:"1px solid black" }}>
                     
                       {  
                       customer.seen? 
                       <i class="f-24 icofont icofont-tick-mark" style={{color:"green"}}></i>
                        :"-"
                        }
                   </td>
                   <td style={{border:"1px solid black" }}>
                     { customer.seenTime !== 0?
                       moment(customer.seenTime).format("YYYY-MM-DD HH:mm:ss")
                     :"-"}
                     </td>

               </tr>
        )
                })
            :null}

           </table>
          </div>
        </div>
        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    templates: state.notification.customer_logs,
   
    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
  };
};

CustomerLogsPopUp.propTypes = {
    customerNotificationLogs:PropTypes.func.isRequired,

 
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
    customerNotificationLogs

})(CustomerLogsPopUp);
