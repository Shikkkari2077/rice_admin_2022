import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../../Constant";
// import ReactQuill from "react-quill";
// import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";

import { 
  fetchSellerList,
  fetchAdmins,
  fetchcityList,
  fetchPincodeList,
  adminUpdate,
  fetchSellerPincodeList,
  adminUpdatePincodes,
  fetchAssignedPincodes,

 } from "../../../store/index";
import { ContactsOutlined } from "@material-ui/icons";

class UserPincodeEdit extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    isLoading:false,
    imageChanged:false,
    pincodeArray:[],
    sellerPincodedata:[],
    sellerdata:[],
    pincodevalue:[],
    addnew:false,
    show:false,
    event:[],
    event2:[],
    pincodes_assigned:[],
    addednew:false,
    SellerArray:[],
    pincodevalue:[],
    event3:[],
    pincodassignedevalue:[],
    addnewPin:false,
    addnewgroup:false,
    cityArray:[],
    count:0,
    password:'',
    pincodeArrayadd:[],
    pincodeArrayRemove:[],
    event4:[],

  };
}
  componentWillMount(props){


    this.props.fetchcityList(0,50000);
    this.props.fetchSellerPincodeList(0,50000,'',);

    if(this.props.match.params.user_id !== undefined && 
      this.props.match.params.user_id !== this.state.user_id)
    {
      this.setState({
        user_id:this.props.match.params.user_id,
        updating:true,
        sellerPincodedata:[]
      })

      this.props.fetchAdmins(this.props.match.params.user_id);
    }
    //console.log(this.props.match.params.user_id)
  }
  callSellerList(cities){
    this.props.fetchSellerList(0,50000,cities)
   //console.log('calling')
  }
  handlecityArray(){

  }
  componentWillReceiveProps(nextProps){
    //console.log(nextProps)

    if(nextProps.pincodes_assigned !==undefined && 
      nextProps.pincodes_assigned!==null){
        this.setState({
          pincodes_assigned:nextProps.pincodes_assigned,
         
        })
      }
  
    //SELLER LIST
    if(
      nextProps.seller_list !== undefined &&
       nextProps.seller_list !== null && 
       nextProps.seller_list !== this.state.sellerdata )
    {
      this.setState({
        sellerdata:nextProps.seller_list,
      })
    }


   //ADMIN DETAILS
   if(  
     this.props.match.params.user_id!==undefined&& 
        nextProps.admins !== undefined &&
          nextProps.admins !==null &&
             nextProps.admins[0] !== undefined){
    

      //CITIES

      var cityvalue=[],sellervalue=[],cityArray=[]
      var cities

    if(nextProps.admins[0].Cities !== undefined &&
         nextProps.admins[0].Cities !== null && 
          this.props.match.params.user_id !==undefined &&
          this.state.addnew === false
          )
        { 
          nextProps.admins[0].Cities.map((city,key)=>{
           cityvalue=[ ...cityvalue,city]
       
         
    })
    if(  JSON.stringify(cityArray) !==  JSON.stringify(this.state.cityArray)){
      this.props.fetchSellerList(0,50000,cities)
      //console.log("called seller list")
     } 
     this.setState({cityvalue})}


    //SELLER
    if(nextProps.admins[0].Sellers !==undefined && 
       nextProps.admins[0].Sellers !== null &&
        this.props.match.params.user_id !==undefined &&
        this.state.addednew === false
        )
       {   nextProps.admins[0].Sellers.map((sal,key)=>{
          sellervalue=[...sellervalue,sal]})  }


    
}
 }
handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  


  updateCategoryData=()=>{
    this.setState({
      isLoading:true
    })
  

       this.props.adminUpdatePincodes( 
      this.props.match.params.user_id,
      this.state.pincodeArrayadd,
      this.state.pincodeArrayRemove
    
     )}

  handlePincodes(event){
   console.log(event)
    var pincodeArrayadd =[]

    if(event !== null  && event !== undefined){
      event.map(pincode =>{
          pincodeArrayadd= [...pincodeArrayadd,pincode.PinCode.id]  })
         //console.log(pincodeArrayadd)
        this.setState({
          pincodeArrayadd,
          //pincodassignedevalue:pincodeArray,
          event3:event,
    
        })
  }else{
    this.setState({
      pincodeArrayadd:[],
      pincodassignedevalue:[],
        event3:[],
        
      })
  }}
  handlePincodes2(event){
    //console.log(event)
     var pincodeArrayRemove =[]
 
     if(event !== null  && event !== undefined){
       event.map(pincode =>{
        pincodeArrayRemove= [...pincodeArrayRemove,pincode.PinCode.id]  })
          //console.log(pincodeArrayRemove)
         this.setState({
          pincodeArrayRemove,
           //pincodassignedevalue:pincodeArray,
           event4:event,
        
         })
   }else{
     this.setState({
      pincodeArrayRemove:[],
       pincodassignedevalue:[],
         event4:[],
      
       })
   }}
   
  handleCity(event){
    //console.log(event)
    var cities=''
    if(event !== null && event!==undefined ){
      var cityId= event.id
      cities=event.name
    this.props.fetchSellerList(0,50000,[cities])

   this.setState({event,addnew:true,show:true})

}
else{
    this.setState({
        event:[],
        cityvalue:[],
        addnew:true

    })
}
  }

 
  handleSeller(event){
    var StringSeller =''
    if(event !== null ){
     StringSeller=event.id
     this.props.fetchSellerPincodeList(0,50000,'', StringSeller)
     this.setState({event2:event,show:true  })
     this.props.fetchAssignedPincodes(this.props.match.params.user_id,StringSeller);

  }else{
    this.setState({
      event2:[],
      sellervalue:[],
      })
  }
  }
 
  customFilter(option, searchText) {
    //onsole.log(option)
  if (
    option.data.PinCode.code.toLowerCase().includes(searchText.toLowerCase())
  ) {
    return true;
  } else {
    return false;
  }
}
customFilter1(option, searchText) {
  ////console.log(option)
if (
  option.data.name.toLowerCase().includes(searchText.toLowerCase())
) {
  return true;
} else {
  return false;
}
}
customFilter2(option, searchText) {
  ////console.log(option)
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
    return (
       <div className="main-body">
        <div className="page-wrapper">
        <div className="page-header">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="page-header-title">
                  <div className="d-inline">
                    <h4>
                      Edit Pincodes
                    </h4>
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
                    <li className="breadcrumb-item">
                      <Link to="/user/list">User List</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Edit Pincodes
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="page-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-border-default">
                  <div className="card-block">
          <div className="card-body">
            
            <div className="row">
             
            
              
             {/* {//console.log("rendered")} */}
           
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    City 
                  </label>
                 <div className="col-sm-9">
                  <Select      
                       className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               onChange={this.handleCity.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                           
                               options={this.state.cityvalue}
                               isSearchable={true}
                               filterOption={this.customFilter2}
                               noOptionsMessage={() => null}
                               placeholder={"Select Cities"}
                               
                               value={this.state.event}
                            /> 
                  </div>
                   </div>
              </div>  


              <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Seller
                    </label>
                  <div className="col-sm-9">
                    <Select      
                        className={customStyles.root}
                                style={{ height: "20px" }}
                                classNamePrefix="name-select"
                                onChange={this.handleSeller.bind(this)}
                                
                                getOptionLabel={(option) => `${option.name}`}
                                getOptionValue={(option) => `${option.id}`}
                             
                                options={this.state.sellerdata}
                                isSearchable={true}
                                filterOption={this.customFilter2}
                                noOptionsMessage={() => null}
                                placeholder={"Select Seller"}
                                
                                value={
                                  this.state.sellervalue}
                              /> 
                    </div>
                    </div>
                </div>  


           
               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                   Pincodes To Add
                  </label>
                 <div className="col-sm-9">
                  <Select      
                       className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               onChange={this.handlePincodes.bind(this)}
                               getOptionLabel={(option) => `${option.PinCode.code}`}
                               getOptionValue={(option) => `${option.PinCode.code}`}
                            
                               options={this.props.sellerPincode_list}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Pincodes"}  
                               isMulti
                               //value={this.state.addnewPin?this.state.event3:this.state.pincodassignedevalue}
                                value={this.state.event3}
                            /> 
                  </div>
                   </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                   Pincodes To Remove
                  </label>
                 <div className="col-sm-9">
                  <Select      
                       className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               onChange={this.handlePincodes2.bind(this)}
                               getOptionLabel={(option) => `${option.PinCode.code}`}
                               getOptionValue={(option) => `${option.PinCode.code}`}
                            
                               options={this.props.sellerPincode_list}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Pincodes"}  
                               isMulti
                                value={this.state.event4}
                            /> 
                       </div>
                   </div>
              </div>
        </div> 
            
           

         

            <div className="">
              <div className="row float-right p-1">
             
                  {
                  !this.props.match.params.user_id ?
                  <button
                    onClick={this.onSaveData}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                  :
                  (<button onClick={this.updateCategoryData.bind(this)}
                    className="btn btn-grd-disabled mr-2"
                  >
                    Update
                  </button>
                  )}
                <Link to={"/user/list"} className="btn btn-outline-dark">
                  Cancel
                </Link>
              </div>
            </div >
            <br/><br/><br/><br/>
            <div style={{border:"3px groove lightgrey",padding:"10px",paddingLeft:"30px"}}>
            <div className="row text-center" style={{paddingRight:"30px",paddingLeft:""}}>
            {
              this.state.pincodes_assigned !==undefined  ?
              <h5 className="col-12 text-center"
               style={{backgroundColor:"lightgrey",height:"25px",padding:"3px"}}>
               Assigned Pincodes</h5>
              :null
            }
              </div>
           <br/>
            <div className="row">
            {
              this.state.pincodes_assigned !==undefined && this.state.show === true ?
              this.state.pincodes_assigned.map(pin=>{
                return(
                <span className="col-2">
                  <li>{pin.code}</li> 
                </span>
                )
              }) :null
            }
          </div>

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
    admins:state.userManagment.admin_list,
    seller_list: state.seller.seller_list,
    sellerPincode_list: state.sellerPincode.sellerPincode_list,
    city:state.city.city_list,
    isLoading: state.category.isLoading,
    isAuthUser: state.isAuthUser,
    pincodes_assigned:state.userManagment.assigned_pincodes_list,

    error: state.error,
  };
};

UserPincodeEdit.propTypes = {
   adminUpdatePincodes:PropTypes.func.isRequired,
   fetchAdmins:PropTypes.func.isRequired,
   fetchcityList:PropTypes.func.isRequired,
   fetchPincodeList:PropTypes.func.isRequired,
   fetchSellerList: PropTypes.object.isRequired,
   fetchSellerPincodeList: PropTypes.object.isRequired,
   fetchAssignedPincodes: PropTypes.object.isRequired,

  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  adminUpdate,
  fetchAdmins,
  fetchcityList,
  fetchPincodeList,
  fetchAssignedPincodes,
  fetchSellerList,
  fetchSellerPincodeList,
  adminUpdatePincodes,
  })(UserPincodeEdit);
