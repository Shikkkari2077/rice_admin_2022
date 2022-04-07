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
import userPincodeEdit from './UserPincodeEdit'
import { 
  fetchSellerList,
  fetchGroups,
  fetchAdmins,
  fetchCategoryList,
  fetchcityList,
  fetchbusinessline,
  adminAdd,
  adminUpdate,
  fetchAssignedPincodes,
 } from "../../../store/index";
import { ContactsOutlined } from "@material-ui/icons";
import CityAdd from "../../LocationMaster/CityMaster/CityAdd";

class UserCreationAdd extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    cityAdd:[],
    cityRemove:[],
    citytemp:[],
    sellerAdd:[],
    sellerRemove:[],
    sellertemp:[],
    isLoading:false,
    imageChanged:false,
    pincodeArray:[],
    sellerPincodedata:[],
    sellerdata:[],
    pincodevalue:[],
    addnew:false,
    event:[],
    event2:[],
    addednew:false,
    SellerArray:[],
    pincodevalue:[],
    event3:[],
    pincodassignedevalue:[],
    addnewPin:false,
    addnewgroup:false,
    cityArray:[],
    count:0,
    businessLineArray:[],
    password:'',

  };
}
  componentWillMount(props){
    this.props.fetchGroups();
    this.props.fetchCategoryList();  
    this.props.fetchbusinessline()
    this.props.fetchcityList(0,50000);

    if(this.props.user_id !== undefined && 
      this.props.user_id !== this.state.user_id)
    {
      this.setState({
        user_id:this.props.user_id,
        updating:true,
      })
      this.props.fetchAdmins(this.props.user_id);
    }
  }
  callSellerList(cities){
    this.props.fetchSellerList(0,50000,cities)
  }

  componentWillReceiveProps(nextProps){
   
    if(nextProps.categoryData !== undefined &&
      nextProps.categoryData !== null )
   { var catarray=[]
    nextProps.categoryData.map(cat=>{
      catarray=[...catarray,cat.id]
    })
  
     ////console.log("category",catarray)
     this.setState({
      catarray
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
     this.props.user_id!==undefined&& 
        nextProps.admins !== undefined &&
          nextProps.admins !==null &&
             nextProps.admins[0] !== undefined){
    

      //CITIES

      var cityvalue=[],sellervalue=[],cityArray=[]
      var cities

    if(nextProps.admins[0].AdminCities !== undefined &&
         nextProps.admins[0].AdminCities !== null && 
          this.props.user_id !==undefined &&
          this.state.addnew === false
          )
        { 
          nextProps.admins[0].AdminCities.map((city,key)=>{
           cityvalue=[ ...cityvalue,city.City]
           cityArray=[...cityArray,city.City.id]
          if(key==0)
         {
           cities=city.City.id
         }  
         else{
         cities=`${cities},${city.City.id}`
       }
    })
    if(  JSON.stringify(cityArray) !==  JSON.stringify(this.state.cityArray)){
    
    this.props.fetchSellerList(0,50000,cities)

    }
    this.setState({cityvalue,cityArray,citytemp:cityArray})
   
   
   }


    //SELLER
    var SellerArray=[]
    var StringSeller =''
    if(nextProps.admins[0].AdminSellers !==undefined && 
       nextProps.admins[0].AdminSellers !== null &&
        this.props.user_id !==undefined &&
        this.state.addednew === false
        )
       {          
        
          nextProps.admins[0].AdminSellers.map((sal,key)=>{
          sellervalue=[...sellervalue,sal.Seller]
          SellerArray=[...SellerArray,sal.Seller.id]
          if(key==0)
           {
             StringSeller=sal.Seller.id
           }  
          else{
             StringSeller=`${StringSeller},${sal.Seller.id}`
          }
       })  
       this.setState({SellerArray,sellervalue,sellertemp:SellerArray})
          if(  JSON.stringify(SellerArray) !==  JSON.stringify(this.state.SellerArray)){
            //this.props.fetchSellerPincodeList(0,50000,'', StringSeller)
          }
         
    }

    if(nextProps.admins[0].UM_AdminGroup !== null && nextProps.admins[0].UM_AdminGroup.id !== null){
    this.setState({
    
      name:nextProps.admins[0].name,
      email:nextProps.admins[0].email,
      phone:nextProps.admins[0].phone,
      mail:nextProps.admins[0].openOrderMail,
      UMAdminGroupId:nextProps.admins[0].UM_AdminGroup.id,
      UMAdminGroupIdvalue:nextProps.admins[0].UM_AdminGroup
    })
  }else{
   this.setState({
    
     name:nextProps.admins[0].name,
     email:nextProps.admins[0].email,
     phone:nextProps.admins[0].phone,
     mail:nextProps.admins[0].openOrderMail,
     UMAdminGroupIdvalue:nextProps.admins[0].UM_AdminGroup
   })
  }
}
 }
handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
  console.log(this.state.businessLineArray)
   this.props.adminAdd(
     this.state.name,
     this.state.mail,
     this.state.email,
     this.state.password,
     this.state.phone,
     this.state.cityArray,
     this.state.UMAdminGroupId,
     this.state.SellerArray,
     this.state.catarray,
     this.state.businessLineArray

   )

  
  };
  updateCategoryData=()=>{
    this.setState({
      isLoading:true
    })
    if(this.state.password.length > 0){

       this.props.adminUpdate( 

       this.state.name,
       this.state.mail,
       this.state.email,
       this.state.phone,
       this.state.UMAdminGroupId,
       this.props.user_id,
       this.state.cityAdd,
       this.state.cityRemove,
       this.state.sellerAdd,
       this.state.sellerRemove,

      //  this.state.catarray,
       this.state.password,
     )
    
  }
  else{      
    
    //console.log("this is running")
    this.props.adminUpdate( 
      this.state.name,
      this.state.mail,
      this.state.email,
      this.state.phone,
 
      this.state.UMAdminGroupId,
      this.props.user_id,
      this.state.cityAdd,
      this.state.cityRemove,
      this.state.sellerAdd,
      this.state.sellerRemove,
      // this.state.catarray,

     
     )
   }  
  }
  

  handleCity(event){
    
    console.log(this.state.citytemp)
    var cityAdd=this.state.cityAdd
    var cityRemove=this.state.cityRemove
    var  citytemp=this.state.citytemp
    console.log(event)
    var cityArray =[]
    var cities=''
    if(event !== null && event!==undefined ){
      event.map((city,key) =>{

        if(city !== undefined){
          cityArray= [...cityArray,city.id]
          //console.log(cityArray)
          if(key==0)
          {
            cities=city.name
          }  
          else{
            cities=`${cities},${city.name}`
        }}
             
  })

   if(this.props.user_id){
     
  //CITYADD
  for(let i=0;i<cityArray.length;i++){
      if(!citytemp.includes(cityArray[i]))
      {
        cityAdd=[...cityAdd,cityArray[i]]
        
      }
    }
  //COMPARE ADD TO REMOVE
    for(let i=0;i<cityRemove.length;i++){
      if(cityAdd.includes(cityRemove[i]))
      {
        cityRemove.splice(i, 1);
        
      }
    }
//CITYREMOVE
   
    for(let i=0;i<citytemp.length;i++){
      if(!cityArray.includes(citytemp[i]))
      {
       cityRemove=[...cityRemove,citytemp[i]]
      // this.sellerRemove(citytemp[i])
      }
     
    }
    //COMPARE REMOVE TO ADD
    for(let i=0;i<cityAdd.length;i++){
      if(cityRemove.includes(cityAdd[i]))
      {
        cityAdd.splice(i, 1);
        
      }
    }
     citytemp=cityArray
  
  }
  this.props.fetchSellerList(0,50000,cityArray)

   this.setState({
     cityArray,
     event,
     addnew:true,
     cityAdd,
     cityRemove,
     citytemp})

}
else{
    this.setState({
      cityArray:[],
        event:[],
        cityvalue:[],
        addnew:true

    })
}


  }
  handlegroup(event){
   // //console.log(event)
    if(event !== undefined){
   var UMAdminGroupId=event.id
   this.setState({
     addnewgroup:true,
    UMAdminGroupId,
    UMAdminGroupIdvalue:event
   })
  }
  }
  handleCategory(event){
   // //console.log(event)
    var categoryArray =[]

    if(event !== null ){
      event.map(category =>{
        categoryArray= [...categoryArray,category.id]  })
//console.log(categoryArray)
this.setState({categoryArray})
}else{
    this.setState({
      categoryArray:[],
        event:[],})
  }

  }
  handleSeller(event){
    ////console.log(event)
    var SellerArray =[]
    var StringSeller =''
    var sellerAdd=this.state.sellerAdd
    var sellerRemove=this.state.sellerRemove
    var sellertemp=this.state.sellertemp
    console.log(sellertemp,event)
    if(event !== null ){
      event.map((seller,key) =>{
        SellerArray= [...SellerArray,seller.id]
        if(key==0)
        {
          StringSeller=seller.id
        }  
        else{
        StringSeller=`${StringSeller},${seller.id}`
      }})
     
     // this.props.fetchSellerPincodeList(0,50000,'', StringSeller)
     if(this.props.user_id){
    //sellerAdd
  for(let i=0;i<SellerArray.length;i++){
    if(!sellertemp.includes(SellerArray[i]))
    {
      sellerAdd=[...sellerAdd,SellerArray[i]]
      
    }
  }

//COMPARE ADD TO REMOVE
  for(let i=0;i<sellerRemove.length;i++){
    if(sellerAdd.includes(sellerRemove[i]))
    {
      sellerRemove.splice(i, 1);
      
    }
  }

//CITYREMOVE
  for(let i=0;i<sellertemp.length;i++){
    if(!SellerArray.includes(sellertemp[i]))
    {
      sellerRemove=[...sellerRemove,sellertemp[i]]
    }
  }
 
  //COMPARE REMOVE TO ADD
  for(let i=0;i<sellerAdd.length;i++){
    if(sellerRemove.includes(sellerAdd[i]))
    {
      sellerAdd.splice(i, 1);
      
    }
  }
  
  sellertemp=SellerArray
     }
this.setState({
  sellerRemove,
  sellerAdd,
  sellertemp,
  SellerArray,
  event2:event,
addednew:true})

}
else{
    this.setState({
      SellerArray:[],
      event2:[],
      sellervalue:[],
        addednew:true,
      })
  }
  }
 
  customFilter(option, searchText) {
    //onsole.log(option)
  if (
    option.data.code.toLowerCase().includes(searchText.toLowerCase())
  ) {
    return true;
  } else {
    return false;
  }
}
customFilter1(option, searchText) {
  ////console.log(option)
 if (option.data.name.toLowerCase().includes(searchText.toLowerCase())) {
    return true;
  } else {
     return false;
  }
}
 customFilter2(option, searchText) {
  ////console.log(option)
  if (option.data.name.toLowerCase().includes(searchText.toLowerCase())) {
       return true;
  } else { return false;}
  }
  handleBusinessLine=(event)=>{
   console.log(event)
   
     var businessLineArray=this.state.businessLineArray
    for(let i=0;i<event.length;i++){
      businessLineArray=[...businessLineArray,event[i].id]
    }
     this.setState({
      businessLineArray
     })
     console.log(businessLineArray)
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
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                   Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="name"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.name}
                    />
                  </div>
                </div>
              </div>
            
               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Eg. 123@gmail.com"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.email}
                    />
                  </div>
                </div>
              </div>  
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="password"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.password}
                    />
                  </div>
                </div>
              </div> 
               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Phone Number
                  </label>
                  <div className="col-sm-9">
                    <input
                    min='9'
                      type="text"
                      maxLength='10'
                      className="form-control"
                      name="phone"
                      placeholder="phone"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Group
                  </label>
                 <div className="col-sm-9">
                  <Select      
                       className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               onChange={this.handlegroup.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                       
                              options={this.props.groups}
                               isSearchable={true}
                               filterOption={this.customFilter1}
                               noOptionsMessage={() => null}
                               placeholder={"Select Group"}
                               value={this.state.UMAdminGroupIdvalue}
                               
                            /> 
                  </div>
                   </div>
              </div>
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
                           
                               options={this.props.city}
                               isSearchable={true}
                               filterOption={this.customFilter2}
                               noOptionsMessage={() => null}
                               placeholder={"Select Cities"}
                               isMulti
                               value={this.state.addnew?
                                this.state.event:
                                this.state.cityvalue}
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
                                isMulti
                                value={this.state.addednew?
                                  this.state.event2:
                                  this.state.sellervalue}
                              /> 
                    </div>
                    </div>
                </div>  


                <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                   Order Mail
                  </label>

                  <div className="col-sm-9">
                     <select 
                     className="form-control"

                      name='mail'
                      placeholder='mail'
                      onChange={this.handleChange.bind(this)}
                      value={this.state.mail}
                      >
                        <option>Select Status</option>

                        <option value='true'>Active</option>
                        <option  value='false'>In-Active</option>


                        </select> 
                  </div>
                  
                </div>
              </div>
             <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Business Line
                    </label>
                  <div className="col-sm-9">
                    <Select      
                        className={customStyles.root}
                                style={{ height: "20px" }}
                                classNamePrefix="name-select"
                                onChange={this.handleBusinessLine}
                                
                                getOptionLabel={(option) => `${option.name}`}
                                getOptionValue={(option) => `${option.id}`}
                             
                                options={this.props.businessline}
                                isSearchable={true}
                                filterOption={this.customFilter2}
                                noOptionsMessage={() => null}
                                placeholder={"Select budiness line"}
                                isMulti
                                // value={this.state.addednew?
                                //   this.state.event2:
                                //   this.state.sellervalue}
                              /> 
                    </div>
                    </div>
                </div>  
         
          
            </div> 
 
            <div className="card-footer">
              <div className="row float-right p-1">
              
                  {
                  !this.props.user_id ?
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
            </div>
          

          </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    businessline:state.customer.business_line,
    categoryData: state.category.category_list,
    admins:state.userManagment.admin_list,
    seller_list: state.seller.seller_list,
    sellerPincode_list: state.sellerPincode.sellerPincode_list,
    groups:state.userManagment.group_list,
    city:state.city.city_list,
    isLoading: state.category.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

UserCreationAdd.propTypes = {
   fetchGroups:PropTypes.func.isRequired,
   adminUpdate:PropTypes.func.isRequired,
   adminAdd:PropTypes.func.isRequired,
   fetchAdmins:PropTypes.func.isRequired,
   fetchcityList:PropTypes.func.isRequired,
   fetchPincodeList:PropTypes.func.isRequired,
   fetchSellerList: PropTypes.func.isRequired,
 

  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  adminUpdate,
  fetchAdmins,
  fetchCategoryList,
  adminAdd,
  fetchGroups,
  fetchcityList,
  fetchSellerList,
  fetchbusinessline,
  fetchAssignedPincodes,
  })(UserCreationAdd);
