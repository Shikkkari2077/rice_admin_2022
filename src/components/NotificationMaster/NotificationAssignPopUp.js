import React, { Component } from "react";
import {fetchTemplatesdetails,
    fetchSellerList,
    AssignTemplate,
} from "../../store/index";
import Select from "react-select";


import PropTypes from "prop-types";
import { connect } from "react-redux";
class NotificationAssignPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: false,
      status: null,
      orderId: "",
      sellerArray:[],
      sellerIdArray:[],
    };
  }
  componentWillMount(){
    this.props.fetchSellerList(0,50000,'')


  }
  componentDidMount(){
      console.log(this.props.data)
      if(this.props.data !== undefined)
      {
        this.props.fetchTemplatesdetails(this.props.data)
     }
  }
  updateSttaus = () => {
    this.props.AssignTemplate(this.props.data,this.state.sellerArray)
    
  };
  handleChangeStatus = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.status, "ddd");
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
//     if(nextProps.data !== undefined)
//     {
//       fetchTemplatesdetails(this.props.data)
//    }
if(nextProps.seller_list !==undefined){
  var sellerIdArray=[]
  // console.log("hello",nextProps.seller_list)
  nextProps.seller_list.map(seller=>(
    sellerIdArray=[...sellerIdArray,seller.id]
  ))
  this.setState({
    sellerIdArray
  })
 // console.log(sellerIdArray,"array")
}
    if(nextProps.templates!==undefined && nextProps.templates!==null && nextProps.templates[0]!==undefined && nextProps.templates[0]!==null){
    this.setState({
        title:nextProps.templates[0].title,
        message:nextProps.templates[0].text,
        image:nextProps.templates[0].Medium.url,
      })
    }
  }
  handleSeller(event){
      console.log(event)
      var sellerArray =[]

      if(event !== null ){
        event.map(seller =>{
            // console.log(seller)
            sellerArray= [...sellerArray,seller.id]   
    })
    // console.log(sellerArray)

    this.setState({sellerArray})

  }
  else{
      this.setState({
          sellerArray:[],
          event:[],

      })
  }
  }
  
  customFilter(option, searchText) {
      //console.log(option)
    if (
      option.data.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const customStyles = {
        root: {
          background: "red",
          height: "20px",
        },
      };
    // console.log(this.props)

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
          width: "40vw",
          height: "auto",
          paddingBottom: "4vh",
          zIndex: "455",
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
                {" "} Assign Notification Template To Seller{" "}
              </p>
              <p style={{fontSize: "14px" }}>{" "}<b>Title:</b>{" "}{this.state.title !== undefined ?this.state.title:null}{" "}
              </p>
              <p style={{fontSize: "14px" }}>{" "}<b>Message:</b>{}{" "}{this.state.message !== undefined ? this.state.message:null}{" "}
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
          <div>
          
            <div className="p-3">
                {console.log(this.props.data)}
              <div className="col-sm-11">
                <label className="row-form-label"><b>Select Seller</b></label>
                <div>
{/* {                console.log(this.state.sellerArray)
} */}
                <Select      
                               

                               className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               onChange={this.handleSeller.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                               isOptionSelected={(option) =>
                                 this.state.sellerArray.includes(option.id) 
                                   ? true
                                   : false
                               }
                               options={this.props.seller_list}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Seller"}
                               isMulti

                               
 
                               
                             />
                 
                </div>
              </div>
            
            </div>

            
          </div>
          {this.state.showText==true?
          <label className="row-form-label" style={{color:"red",fontSize:"10px"}}>Notification Sended Succesfully</label>
        :null}
          <div className="mx-2 float-roght">
            <button
              className="btn btn-sm btn-inverse waves-effect waves-light md-trigger"
              onClick={this.updateSttaus}
            >
              Send 
            </button>
            <button
              className="btn btn-sm btn-inverse waves-effect waves-light md-trigger mx-2"
              onClick={() => {
                //   window.location.reload()
                this.props.close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    templates: state.notification.template_detail,
    seller_list: state.seller.seller_list,

    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
  };
};

NotificationAssignPopUp.propTypes = {
    fetchTemplatesdetails:PropTypes.func.isRequired,

  updateStatusOrder: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
    fetchTemplatesdetails,  
    fetchSellerList,
    AssignTemplate,

})(NotificationAssignPopUp);
