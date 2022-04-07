import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
// import ReactQuill from "react-quill";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategoryDetails,
  sellerCustomerAdd,
  fetchCustomerKyc2,
  fetchBussinessType,
  fetchSellerList,
  fetchSellerCustomer,
  sellerCustomerUpdate,
  fetchbusinessline,
  fetchcityList } from "../../store/index";
import Select from "react-select"

class SellerCustomerAdd extends React.Component {
  state = {
    category:[],
    isLoading:false,
    cityvalue:[],
    cityId:'',
    sendingDataDone:false,
    cityFind:true,
    businessType_Selected:[],
    adddress:'',
    cityBlock:[],
    channel:'',
    email:'',
    unicode:'',
    beatName:'',
    sellerList:false,
    salesmanCode:'',
    salesmanName:'',
    customerCode:'',
    mobile:'',
    person:'',
    beatCode:'',
    sellercityId:'',
    sellerName:[],
    sendingdata:[
      {
        "UserId":"",
        "SellerId":"",
        "CategoryId":"",
        "BusinessLineId":"",
      }
    ],
   
  };
  componentDidMount(){
    console.log(this.props.user_id)
    this.props.fetchCustomerKyc2(this.props.user_id)
    //this.props.fetchSellerCustomer(0,50,this.props.user_id)
    this.props.fetchcityList(0, 25500);
    this.props.fetchBussinessType()
    this.props.fetchbusinessline()

  }
  callSeller(id){
    console.log(id)
   this.props.fetchSellerList(0, 25000,this.state.sellercityId,id)
    this.setState({
      sellerList:true
    })
  

  }
  componentWillReceiveProps(nextProps){

    if( this.state.sellercityId !== '' && nextProps.city !==undefined && this.state.cityFind == false || this.state.cityBlock.length == 0  ){
       for(let i=0;i<nextProps.city.length;i++){
          if(nextProps.city[i].id == this.state.sellercityId )
          {
            this.setState({
              cityBlock:nextProps.city[i],
              cityFind:false,
            })
          }
       }
    }
    console.log(nextProps)
    if( nextProps.kyc_list !==undefined && 
       nextProps.kyc_list[0] !==undefined && 
       nextProps.kyc_list[0].BusinessCategory){

   if(this.state.sendingDataDone == false){
    var sendingData=[]
    for(let i=0;i < nextProps.kyc_list[0].BusinessCategory.length;i++){
      sendingData.push( {
        "UserId":"",
        "SellerId":"",
        "CategoryId":"",
        "BusinessLineId":"",
        })
      }
      this.setState({
        sendingdata:sendingData,
        sendingDataDone:true,
      })
    }


    this.setState({
   
      name:nextProps.kyc_list[0].User.customerName,
      code:nextProps.kyc_list[0].User.customerCode,
      phone:nextProps.kyc_list[0].User.phone,
      category:nextProps.kyc_list[0].BusinessCategory,
      cityId:nextProps.kyc_list[0].User.CityId,
      sellercityId:nextProps.kyc_list[0].User.CityId,
      businessType_Selected:nextProps.kyc_list[0].BusinessType,
      unicode:nextProps.kyc_list[0].User.universalCode,
      registrationDate:nextProps.kyc_list[0].User.registrationDate,
      channel:nextProps.kyc_list[0].User.customerChannel,
      person:nextProps.kyc_list[0].User.contactPerson,
      gst:nextProps.kyc_list[0].User.GSTIN_number,
      alternateNumber:nextProps.kyc_list[0].User.alternateNumber,
      email:nextProps.kyc_list[0].User.email,


    })
    if(nextProps.seller_list.length == 0 ){
    // this.callSeller(nextProps.kyc_list[0].User.CityId)
    }
 }
 
}
 
 
handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
onSaveData=()=>{
    console.log(this.state.sendingdata)
    this.props.sellerCustomerUpdate(this.state.sendingdata,this.props.user_id)
};

handleType(event){
    this.setState({
    cityvalue:event,
    cityId:event.id
  })
console.log(event)
}
selectSeller(key,event){
    console.log(key)
     var sellerName=this.state.sellerName
     var sellerArray=this.props.seller_list
     for(let i=0;i<sellerArray.length;i++){
         if(event.target.value == sellerArray[i].id){
           sellerName[key]=sellerArray[i].name
         }
     }
     var temp=this.state.sendingdata
      
       temp[key].UserId = this.props.user_id;
       temp[key].CategoryId = this.state.category[key].id;
       temp[key].SellerId = event.target.value;

    console.log(temp)
    this.setState({
    sellerName,
    sendingdata:temp })
  }
  customFilter(option, searchText) {
  if (option.data.name.toLowerCase().includes(searchText.toLowerCase()) ) {
    return true;
  } else {
    return false;
  }
  }

  handleLine(key,event){
    var temp=this.state.sendingdata
    if(key ==0 ){
      temp[key].BusinessLineId = event.target.value;
      
  }
 else{
      // temp.push(
      //  {
      //  "UserId":"",
      //  "SellerId":"",
      //  "CategoryId":"",
      //  "BusinessLineId":"",
      //  })
     temp[key].BusinessLineId = event.target.value;
    }

     this.setState({
       sendingdata:temp })
    }
    changeSeller(key,a){
      var sellerName=this.state.sellerName
      sellerName[key]=undefined
      this.setState({
        sellerName
      })
      console.log(key,a)
    }

  render() {
    const customStyles = {
        root: {
          background: "red",
          height: "20px",
        },
      };
    return (
      <div className="">
        {console.log(this.state.sendingdata)}
          <div className="card-body">
            <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Name</label>
                  <div className="col-sm-9">
                  <input
                      disabled
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Customer Name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </div>
                </div>
              </div>
            
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Registered Mobile Number</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="mobile"
                      placeholder="Mobile No."
                      onChange={this.handleChange}
                      value={this.state.mobile}
                    />
                  </div>
                </div>
              </div> */}
              {console.log("cityID",this.state.cityBlock)}
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">City</label>
                  <div className="col-sm-9">
                  <Select      isDisabled={true}
                               className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               onChange={this.handleType.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                               isOptionSelected={(option) =>
                               
                                this.state.sellercityId == option.id
                                  ? console.log("option value",option)
                                  : console.log("lol")
                              }
                               options={this.props.city}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select City"}
                               value={this.state.cityBlock}
                               
                            /> 
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Pincode</label>
                  <div className="col-sm-9">
                  <Select      
                               className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               onChange={this.handleType.bind(this)}
                               getOptionLabel={(option) => `${option.type}`}
                               getOptionValue={(option) => `${option.id}`}
                       
                              options={this.state.testingdata}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Pincode"}
                               isMulti
                               
                            /> 
                  </div>
                </div>
              </div> */}

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Bussiness Type
                  </label>
                  <div className="col-sm-9">
                  <Select      
                               isDisabled={true}
                               className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               onChange={this.handleType.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                       
                               options={this.props.businessType_list}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Bussiness Type"}
                               isMulti
                               value={this.state.businessType_Selected}
                               
                            /> 
                  </div>
                </div>
              </div>
            
              </div>
              <br/><br/>
              <div className="row">


              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Category Wise Seller
                  </label>
                  <div className="col-sm-9">

                  <table className="table" style={{width:"700px"}}>
                 <tr style={{border:"2px solid lightgrey"}}>
                     <th>
                         Category
                     </th>
                     <th style={{textAlign:"center"}}>
                         Seller
                     </th>
                     <th style={{textAlign:"center"}}>
                         Line
                     </th>
                 </tr>
                 {
                  console.log(this.state.category,this.props.type)
                 }
             {
                this.state.category !== undefined?

                    this.state.category.map((cat,key)=>{

                      return(
                        cat.categoryType ==  this.props.type 
                        ?

                     <tr className="col-sm-12">
                     <td>
                         <label className="col-sm-3 col-form-label"><li>{cat.name}</li></label>
                     </td>
                     <td className >
                      
                       { this.state.sellerName[key] !== undefined ?
                       <li onClick={this.changeSeller.bind(this,key)} >{
                       this.state.sellerName[key]
                      }</li>
                       
                       :
                         <select 
                         id={key}
                        //  value={this.state.sendingdata[key].SellerId}
                         className="form-control"
                         onFocus={this.callSeller.bind(this,cat.id)}
                         onChange={this.selectSeller.bind(this,key)}
                         >
                            <option value={null}>Select Seller</option>
                            {                           
                              this.props.seller_list !== undefined ?
                                this.props.seller_list.map(seller=>{
                               return(
                                  <option value={seller.id}>{seller.name}</option>
                               )
                                })
                                :null
                                }
                           </select>
                    }
                     </td>
                     <td className >
                         <select 
                         className="form-control"
                         onChange={this.handleLine.bind(this,key)}
                         value={this.state.line}
                         >
                           <option>Select Line</option>
                           {
                             this.props.business_line !== undefined &&
                              this.props.business_line !== null ?
                              this.props.business_line.map(line=>{
                                return(
                                  <option value={line.id}>{line.name}</option>

                                )
                              }):null
                            }

                        </select>
                     </td>
                 </tr>
                      :
                      cat.categoryType !=="Interested" && this.props.type !== "Interested" ? 

                      <tr className="col-sm-12">
                      <td>
                          <label className="col-sm-3 col-form-label"><li>{cat.name}</li></label>
                      </td>
                      <td className >
                       
                        { this.state.sellerName[key] !== undefined ?
                        <li onClick={this.changeSeller.bind(this,key)} >{
                        this.state.sellerName[key]
                       }</li>
                        
                        :
                          <select 
                          id={key}
                         //  value={this.state.sendingdata[key].SellerId}
                          className="form-control"
                          onFocus={this.callSeller.bind(this,cat.id)}
                          onChange={this.selectSeller.bind(this,key)}
                          >
                             <option value={null}>Select Seller</option>
                             {                           
                               this.props.seller_list !== undefined ?
                                 this.props.seller_list.map(seller=>{
                                return(
                                   <option value={seller.id}>{seller.name}</option>
                                )
                                 })
                                 :null
                                 }
                              
 
                          </select>
                     }
                      </td>
                      <td className >
                          <select 
                          className="form-control"
                          onChange={this.handleLine.bind(this,key)}
                          value={this.state.line}
                          >
                            <option>Select Line</option>
                            {
                             this.props.business_line !== undefined &&
                              this.props.business_line !== null ?
                              this.props.business_line.map(line=>{
                                return(
                                  <option value={line.id}>{line.name}</option>

                                )
                              }):null
                            }
 
                         </select>
                      </td>
                  </tr>
                       :null

                      )
                 })
                :null}
                

             </table>
                   
                  </div>
                </div>
              </div>
              <br/>
                
              </div> 
              <br/><br/>
              <div className=" width-max text-center color-dark" 
              style={{textAlign:"center",background:"lightgrey",height:"30px",paddingTop:"5px"}}
              >
              <h5 className="font-weight-bold" >Bussiness Details</h5>
              </div> 
              <br/>
         
               <div className="row">
               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Customer Code</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="code"
                      placeholder="Customer code"
                      onChange={this.handleChange}
                      value={this.state.code}
                    />
                  </div>
                </div>
              </div>
                  
                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Registered Mobile Number</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="mobile"
                      placeholder="Mobile No."
                      onChange={this.handleChange}
                      value={this.state.mobile}
                    />
                  </div>
                </div>
              </div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Address 1</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="address"
                      onChange={this.handleChange}
                      value={this.state.adddress}
                    />
                  </div></div></div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="eg. example@gmail.com"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </div></div></div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Customer Channel</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="channel"
                      onChange={this.handleChange}
                      value={this.state.channel}
                    />
                  </div></div></div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Registration Date</label>
                  <div className="col-sm-9">
                  <label className="col-sm-12 col-form-label">{this.state.registrationDate}</label>
        
                  </div></div></div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Contact Person</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="person"
                      onChange={this.handleChange}
                      value={this.state.person}
                    />
                  </div></div></div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Phone </label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="alternateNumber"
                      onChange={this.handleChange}
                      value={this.state.alternateNumber}
                    />
                  </div></div></div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">GSTIN no.</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="gst"
                      onChange={this.handleChange}
                      value={this.state.gst}
                    />
                  </div></div></div>


                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Universal Code</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="uniCode"
                      onChange={this.handleChange}
                      value={this.state.unicode}
                    />
                  </div></div></div>

                 </div>
                 <br/><br/>
              <div className=" width-max text-center color-dark" 
              style={{textAlign:"center",height:"30px",paddingTop:"5px",background:"lightgrey"}}
              >
              <h5 className="font-weight-bold" >Beat Details</h5>
              </div> 
              <br/>
              <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Beat Code</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="beatCode"
                      onChange={this.handleChange}
                      value={this.state.beatCode}
                    />
                  </div></div></div>
                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Beat Name</label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="beatName"
                      onChange={this.handleChange}
                      value={this.state.beatName}
                    />
                  </div></div></div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Salesman Name </label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="salesmanName"
                      onChange={this.handleChange}
                      value={this.state.salesmanName}
                    />
                  </div></div></div>

                  <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Salesman code </label>
                  <div className="col-sm-9">
                  <input
                  
                      type="text"
                      className="form-control"
                      name="salesmanCode"
                      onChange={this.handleChange}
                      value={this.state.salesmanCode}
                    />
                  </div></div></div>



              </div>
      
            <div className="card-footer">
              <div className="row float-right p-1">
              
                  <button
                    onClick={this.onSaveData}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                <Link to={"/"} className="btn btn-outline-dark">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    businessType_list:state.sellerCusMapping.businessType_list,
    isLoading: state.category.isLoading,
    kyc_list:state.kyc.kyc_list,
		seller_list: state.seller.seller_list,
    city:state.city.city_list,
    isAuthUser: state.isAuthUser,
    business_line:state.customer.business_line,
    seller_customer:state.sellerCusMapping.seller_customer_list,
    error: state.error,
  };
};

SellerCustomerAdd.propTypes = {
  sellerCustomerUpdate:PropTypes.func.isRequired,
  postMedia:PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {

    getCategoryDetails,
    fetchCustomerKyc2,
    fetchSellerList,
    sellerCustomerUpdate,
    fetchSellerCustomer,
    fetchBussinessType,
    fetchcityList,
    fetchbusinessline
  })(SellerCustomerAdd);
