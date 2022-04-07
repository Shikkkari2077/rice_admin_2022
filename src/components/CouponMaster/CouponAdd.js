import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import $ from "jquery";
// import BannerGallery from "../MediaMaster/BannerGallery";
import GalleryPopUp from '../MediaMaster/GalleryPopUp'
import {
  fetchCategoryList,
  fetchPincodeList,
  fetchProductList,
  fetchSellerList,
  updateCoupomList,
  addCoupon,getDeliveryboyDetails,
  getGallery
} from "../../store/index";
import Swal from "sweetalert2";

class CouponAdd extends React.Component {
  state = {
    mediaID:"",
    status: "Active",
    pincodes:'',
    coupon_id:'',
    products:'',
    sellers:'',
    description: "",
    categories: "",
    opentoEdit:false,
    cat: "",
    title: "",
    discountType: "",
    percentValue: "",
    discountAmount: "",
    discountValue:'',
    minAmountOfPurchase: "",
    expireOn: "",
    MediumId: '',
    ProductIds: [],
    CategoryIds: [],
    SellerIds: [],
    PincodeIds: [],
    perUserLimit:'',
    percentType:false,
    productwise:false,
    pincodewise:false,
    display:'',
    AddPincodeIds:'',
    addproducts:'',
    rprod:'',
    aprod:'',
    rpin:'',
    apin:'',
    prod:'',
    pin:'',
    removeproducts:'',
    addPincodes:'',
    removePinCode:''
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    console.log('jjee',this.props.coupon_id)
    if(this.props.coupon_id){
      this.props.getDeliveryboyDetails(this.props.coupon_id)
    }
    // this.props.fetchCategoryList();
    this.props.getGallery('coupon',0,11)
    this.props.fetchPincodeList('',0,50000,'');
    this.props.fetchProductList(0,50000);
    // this.props.fetchSellerList();
  };
  componentWillReceiveProps(nextProps){
    console.log('he',nextProps.pincode_list)

    if(!nextProps.coupon_id){
      this.setState({
        ProductIds:nextProps.product_list ,
        PincodeIds:nextProps.pincode_list,
        AddPincodeIds:nextProps.pincode_list,
       
      })
    }
    else{
      this.setState({
        ProductIds:nextProps.coupon_det[0]?nextProps.coupon_det[0].Products :'',
        PincodeIds:nextProps.coupon_det[0]?nextProps.coupon_det[0].PinCodes:'',
        coupon_id:nextProps.coupon_det[0]?nextProps.coupon_det[0].coupon_id:'',
        title: nextProps.coupon_det[0]?nextProps.coupon_det[0].name:'',
        display:nextProps.coupon_det[0]?nextProps.coupon_det[0].display:'',
        couponCode: nextProps.coupon_det[0]?nextProps.coupon_det[0].couponCode:'',
        description:  nextProps.coupon_det[0]?nextProps.coupon_det[0].description:'',
        discountValue: nextProps.coupon_det[0]?nextProps.coupon_det[0].discountValue:'',
        discountType:  nextProps.coupon_det[0]?nextProps.coupon_det[0].discountType:'',
        minAmountOfPurchase: nextProps.coupon_det[0]?nextProps.coupon_det[0].minPurchaseAmount:'',
        validFrom: nextProps.coupon_det[0]?nextProps.coupon_det[0].validFrom:"",
        validTo: nextProps.coupon_det[0]?nextProps.coupon_det[0].validTo:'',
        MediumId: null,
        maxUsers: nextProps.coupon_det[0]?nextProps.coupon_det[0].maxUsers:'',
        perUserLimit: nextProps.coupon_det[0]?nextProps.coupon_det[0].perUserLimit:'',
        status: nextProps.coupon_det[0]?nextProps.coupon_det[0].status:'',
        typeS:nextProps.coupon_det[0]?nextProps.coupon_det[0].Products.length > 0  ? "productwise": nextProps.coupon_det[0].PinCodes.length > 0? "pincodewise" :"":''
      })
      if(this.state.typeS==="productwise"){
        this.setState({
          productwise:true
        })
      // this.props.fetchProductList();
        console.log('trueeeeeeee')
      }
      else  if(this.state.typeS==="pincodewise"){
        this.setState({
          pincodewise:true
        })
      // this.props.fetchPincodeList();
      }
      else{
        this.setState({
          pincodewise:false,
          productwise:false
        })
      }
      if(this.state.discountType === "percent"){
        this.setState({
          percentType:true
        })
      }
      else if(this.state.discountType === "amount"){
       this.setState({
         percentType:false
       })
      }
    }
  };
  handleSelectCat = (data) => {
    this.setState({
      categories: data,
      cat: Array.isArray(data) ? data.map((x) => x.id) : [],
    });
  };
  handleSelectProduct = (data) => {
    this.setState({
      products: data,
      prod: Array.isArray(data) ? data.map((x) => x.id) : [],
    });
  };
  handleRemoveProduct=(data)=>{
    this.setState({
      removeproducts: data,
      rprod: Array.isArray(data) ? data.map((x) => x.id) : [],
    })
    console.log('rrrr',this.state.rprod)
  }
  handleAddProduct=(data)=>{
    this.setState({
      addproducts: data,
      aprod: Array.isArray(data) ? data.map((x) => x.id) : [],
    })
    console.log('rrrr',this.state.aprod)
  }
  handleRemovePincodes=(data)=>{
    this.setState({
      removePinCode: data,
      rpin: Array.isArray(data) ? data.map((x) => x.id) : [],
    })
    console.log('rrrr',this.state.rpin)
  }
  handleaddPincodes=(data)=>{
    this.setState({
      addPincodes: data,
      apin: Array.isArray(data) ? data.map((x) => x.id) : [],
    })
    console.log('rrrr',this.state.apin)
  }
  handleSelectPincode = (data) => {
    this.setState({
      pincodes: data,
      pin: Array.isArray(data) ? data.map((x) => x.id) : [],
    });
  };
  handleSelectSeller = (data) => {
    this.setState({
      sellers: data,
      sell: Array.isArray(data) ? data.map((x) => x.id) : [],
    });
  };
  handleChangeType(e){
   e.preventDefault()
   this.setState({
     [e.target.name]:e.target.value
   })
   if(e.target.value === "percent"){
     this.setState({
       percentType:true
     })
   }
   else{
    this.setState({
      percentType:false
    })
   }
  }
  handleChangeTypes(e){
    e.preventDefault()
    this.setState({
      [e.target.name]:e.target.value
    })
    if(e.target.value === "productwise"){
      this.setState({
        productwise:true,
        pincodewise:false
      })
    }
    else if(e.target.value==="pincodewise"){
     this.setState({
      pincodewise:true,
      productwise:false,
     })
      //this.props.fetchPincodeList('',0,50000,'')
    }
    else{
      this.setState({
        pincodewise:false,
        productwise:false,
       })
    }
  }
  onupdate(){
    const dicvountvalue= this.state.discountValue
    const minAmountOfPurchase=this.state.minAmountOfPurchase 
    if(dicvountvalue >= minAmountOfPurchase){
      Swal.fire({
        title: "Minimum Amount of Purchase Should be greater than discout value",
        icon: "warning",
        text: "",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((value) => {
        if (value) {
         }
      });
    }
    else{

    var validF = new Date(this.state.validFrom);
    var validT = new Date(this.state.validTo);
    const validFrom = validF.getTime();
    const  validTo = validT.getTime();
    
    if(this.state.typeS==="pincodewise"){
      const data = {
        couponId:this.props.coupon_id,
        name: this.state.title,
        display:this.state.display,
        couponCode:this.state.couponCode,
        description: this.state.description,
        discountValue:this.state.discountValue,
        discountType: this.state.discountType,
        minPurchaseAmount:this.state.minAmountOfPurchase,
        validFrom: validFrom,
        validTo: validTo,
        MediumId: null,
        maxUsers:this.state.maxUsers,
        perUserLimit:this.state.perUserLimit,
        status:this.state.status,
        PincodeIds: this.state.apin,
        removePincodeIds: this.state.rpin,
      };
    console.log(data)
    this.props.updateCoupomList(data)
    }
    else  if(this.state.typeS==="productwise"){
      const data = {
        couponId:this.props.coupon_id,
        name: this.state.title,
        couponCode:this.state.couponCode,
        display:this.state.display,
        description: this.state.description,
        discountValue:this.state.discountValue,
        discountType: this.state.discountType,
        minPurchaseAmount:this.state.minAmountOfPurchase,
        validFrom: validFrom,
        validTo: validTo,
        MediumId: null,
        maxUsers:this.state.maxUsers,
        perUserLimit:this.state.perUserLimit,
        status:this.state.status,
        removeProductIds: this.state.rprod,
        ProductIds: this.state.aprod
      };
    console.log(data)
    this.props.updateCoupomList(data)
    }
    else{
    const data = {
      couponId:this.props.coupon_id,
      name: this.state.title,
      couponCode:this.state.couponCode,
      description: this.state.description,
      display:this.state.display,
      discountValue:this.state.discountValue,
      discountType: this.state.discountType,
      minPurchaseAmount:this.state.minAmountOfPurchase,
      validFrom:validFrom,
      validTo:validTo,
      MediumId: null,
      maxUsers:this.state.maxUsers,
      perUserLimit:this.state.perUserLimit,
      status:this.state.status,
    };
    console.log(data)
    this.props.updateCoupomList(data)
  }
  }
}
open=()=>{
  this.setState({
    opentoEdit:true
  })
}
  handledate(e){
    e.preventDefault()
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  // handleImageUpload = (event) => {
  //   document.getElementById("category_image_label").innerHTML = "";
  //   let element = $("#category_image").get(0);
  //   // $("#id_image_section").empty();
  //   this.setState({ accepted: element });
  //   var proof_img = [];
  //   let obj = {};
  //   console.log(element.files);
  //   const fileToUpload = event.target.files[0];
  //   console.log(fileToUpload)
  //   this.setState({ category_image: element.files ,fileToUpload:fileToUpload});
  //   for (var i = 0; i < element.files.length; i++) {
  //     var file1 = element.files[i];
  //     var img = document.createElement("img");
  //     img.className = "img-100";
  //     var filePath = URL.createObjectURL(file1);
  //     img.src = filePath;
  //     $("#category_image_label").append(img);
  //   }
  // };
  onSaveData = () => {
    const dicvountvalue= this.state.discountValue
    const minAmountOfPurchase=this.state.minAmountOfPurchase
    console.log(dicvountvalue,minAmountOfPurchase) 
    if(dicvountvalue >= minAmountOfPurchase){
      Swal.fire({
        title: "Minimum Amount of Purchase Should be greater than discout value",
        icon: "warning",
        text: "",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((value) => {
        if (value) {
         }
      });
    }
    else{
      const media=this.state.fileToUpload
      var validF = new Date(this.state.validFrom);
      var validT = new Date(this.state.validTo);
      const validFrom = validF.getTime();
      const  validTo = validT.getTime();
      if(this.state.pincodewise===true){
        const data = {
          name: this.state.title,
          display:this.state.display,
          couponCode:this.state.couponCode,
          description: this.state.description,
          discountValue:this.state.discountValue,
          discountType: this.state.discountType,
          minPurchaseAmount:this.state.minAmountOfPurchase,
          validFrom: validFrom,
          validTo: validTo,
          MediumId: this.state.mediaID,
          maxUsers:this.state.maxUsers,
          perUserLimit:this.state.perUserLimit,
          status:this.state.status,
          PincodeIds: this.state.pin,
        };
      console.log(data)
      this.props.addCoupon(data)
      }
      else  if(this.state.productwise===true){
        const data = {
          name: this.state.title,
          couponCode:this.state.couponCode,
          display:this.state.display,
          description: this.state.description,
          discountValue:this.state.discountValue,
          discountType: this.state.discountType,
          minPurchaseAmount:this.state.minAmountOfPurchase,
          validFrom: validFrom,
          validTo: validTo,
          MediumId: null,
          maxUsers:this.state.maxUsers,
          perUserLimit:this.state.perUserLimit,
          status:this.state.status,
          ProductIds: this.state.prod
        };
      console.log(data)
      this.props.addCoupon(data)
      }
      else{
      
      const data = {
        name: this.state.title,
        couponCode:this.state.couponCode,
        description: this.state.description,
        display:this.state.display,
        discountValue:this.state.discountValue,
        discountType: this.state.discountType,
        minPurchaseAmount:this.state.minAmountOfPurchase,
        validFrom:validFrom,
        validTo:validTo,
        MediumId: null,
        maxUsers:this.state.maxUsers,
        perUserLimit:this.state.perUserLimit,
        status:this.state.status,
       
      };
      console.log(data)
      this.props.addCoupon(data)
    }
    }
  
  };
  handleClose=()=>{
    this.setState({
      opentoEdit:false
    })
  }
  imageData=(src,id)=>{
    console.log(src,id)
    this.setState({
      image:src,
      mediaID:id,
    })
  }
  render() {
    const { pincodes,removePinCode,removeproducts,products,addproducts,addPincodes,productwise,pincodewise } = this.state;
    console.log(this.state.validFrom)
    console.log(this.state.validTo)
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted grey",
        color: state.isSelected ? "red" : "black",
        padding: 8,
      }),
      input: (provided) => ({
        ...provided,
        display: "flex",
        height: "30px",
      }),
    };
   const {percentType}=this.state
    return (
      <div className="">
          <div className="card-body">
          {this.state.opentoEdit ? (
              <div
                className="backdrop_color"
                style={{
                  width: "80vw",
                  height: "140vh",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "rbga(0,0,0,.5)",
                  zIndex: "105",
                }}
              >
                <GalleryPopUp
                  media_type={"coupon"}
                  close={this.handleClose}
                  imagedata={this.imageData}
                  open={true}
                />
              </div>
            ) : (
              ""
            )}
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Coupon Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Coupon Name"
                      onChange={this.handleChange}
                      value={this.state.title}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Description</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      // cols={}
                      className="form-control"
                      onChange={this.handleChange}
                      name="description"
                      id="description"
                      required
                      placeholder="Description"
                      value={this.state.description}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Discount Type</label>
                  <div className="col-sm-9">
                    <select
                      required
                      name="discountType"
                      className="form-control"
                      value={this.state.discountType}
                      onChange={this.handleChangeType.bind(this)}
                    >
                     <option value={""}>Select</option>
                     <option value="percent" >Percent</option>
                     <option value="amount">Amount</option>
                    </select>
                  </div>
                </div>
              </div>
              {
                percentType ? <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Discount Percent
                  </label>
                  <div className="col-sm-9">
                    <input
                      required
                      type="number"
                      className="form-control"
                      name="discountValue"
                      placeholder="Discount Percent"
                      onChange={this.handleChange}
                      value={this.state.discountValue}
                    />
                  </div>
                </div>
              </div>
              :
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Discount Amount
                  </label>
                  <div className="col-sm-9">
                    <input
                      required
                      type="number"
                      className="form-control"
                      name="discountValue"
                      placeholder="Discount Amount"
                      onChange={this.handleChange}
                      value={this.state.discountValue}
                    />
                  </div>
                </div>
              </div>
              }
                {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Coupon Category
                  </label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={categories}
                      getOptionLabel={(option) => `${option.name}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleSelectCat}
                      options={this.state.CategoryIds}
                    />
                  </div>
                </div>
              </div> */}

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Coupon Code</label>
                  <div className="col-sm-9">
                    <input
                      required
                      type="text"
                      className="form-control"
                      name="couponCode"
                      placeholder="Coupon Code"
                      onChange={this.handleChange}
                      value={this.state.couponCode}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Display</label>
                  <div className="col-sm-9">
                    <select
                      required
                      name="display"
                      className="form-control"
                      value={this.state.display}
                      onChange={this.handleChange}
                    >
                      <option>Select</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option> 
                    </select>
                  </div>
                </div>
              </div> */}
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Valid From</label>
                  <div className="col-sm-9">
                    <input
                      required
                      type="date"
                      className="form-control"
                      name="validFrom"
                      placeholder="Valid From"
                      onChange={this.handledate.bind(this)}
                      value={this.state.validFrom}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Valid To</label>
                  <div className="col-sm-9">
                    <input
                      required
                      type="date"
                      className="form-control"
                      name="validTo"
                      placeholder="Valid To"
                      onChange={this.handledate.bind(this)}
                      value={this.state.validTo}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Max. Users</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="maxUsers"
                      placeholder="Max Users"
                      onChange={this.handleChange}
                      value={this.state.maxUsers}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Company Seller Id
                  </label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={sellers}
                      getOptionLabel={(option) => `${option.name}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleSelectSeller}
                      options={this.state.SellerIds}
                    />
                  </div>
                </div>
              </div>
               */}

               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Min. Amount of Purchase
                  </label>
                  <div className="col-sm-9">
                    <input
                      required
                      type="number"
                      className="form-control"
                      name="minAmountOfPurchase"
                      placeholder="Min. Amount of Purchase"
                      onChange={this.handleChange}
                      value={this.state.minAmountOfPurchase}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Per User Limit
                  </label>
                  <div className="col-sm-9">
                    <input
                      required
                      type="number"
                      className="form-control"
                      name="perUserLimit"
                      placeholder=" Per User Limit"
                      onChange={this.handleChange}
                      value={this.state.perUserLimit}
                    />
                  </div>
                </div>
              </div>
               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label" >Coupon Type</label>
                  <div className="col-sm-9">
                    <select
                      required
                      name="typeS"
                      className="form-control"
                      value={this.state.typeS}
                      onChange={this.handleChangeTypes.bind(this)}
                    >
                     <option value={""}>Default</option>
                     <option value={"productwise"}>Product Wise</option>
                     {/* <option value={"pincodewise"}>Pincode Wise</option> */}
                    </select>
                  </div>
                </div>
              </div>
              {productwise?<>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Product</label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={this.props.coupon_id ?  this.state.ProductIds:products}
                      getOptionLabel={(option) => `${option.sku}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleSelectProduct}
                      options={this.state.ProductIds}
                    />
                  </div>
                </div>
              </div>
              {this.props.coupon_id ?
              <>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Remove Product</label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={removeproducts}
                      getOptionLabel={(option) => `${option.sku}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleRemoveProduct}
                      options={this.state.ProductIds}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Add Product</label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={addproducts}
                      getOptionLabel={(option) => `${option.sku}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleAddProduct}
                      options={this.props.product_list}
                    />
                  </div>
                </div>
              </div>
              </>:""}
              </>
             :
             ""}
             {pincodewise?<>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Pincode Applicable For
                  </label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={this.props.coupon_id ?  this.state.PincodeIds:pincodes}
                      getOptionLabel={(option) => `${option.code}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleSelectPincode}
                      options={this.state.PincodeIds}
                    />

                  </div>
                </div>
              </div>
              {this.props.coupon_id ?<>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Remove Pincodes</label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={removePinCode}
                      getOptionLabel={(option) => `${option.code}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleRemovePincodes}
                      options={this.state.PincodeIds}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Add Pincodes</label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={addPincodes}
                      getOptionLabel={(option) => `${option.code}`}
                      getOptionValue={(option) => `${option.id}`}
                      onChange={this.handleaddPincodes}
                      options={this.props.pincode_list}
                    />
                  </div>
                </div>
              </div>
              </>:""}
              </>
             :""}
             <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Status</label>
                  <div className="col-sm-9">
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option>Select</option>
                      <option value={true}>Active</option>
                      <option value={false}>InActive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Display Image</div>
                  <div className="col-sm-9">
                    <form
                      id="categoryImage"
                      name="categoryImage"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        <button
                        onClick={this.open}
                        className="form-control">
                          Open Gallery

                        </button>
                        {/* <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="category_image"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        /> */}
                        {/* <span className="mt-1">( 500 x 500 )</span> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div sclassName="col-md-6">
                <div id="category_image_label" className="pt-2">
                  {this.state.image ? (
                    this.state.image !== null ||
                    this.state.image !== undefined ||
                    this.state.image !== {} ? (
                      <img
                        src={this.state.image}
                        alt=""
                        className="img-100"
                        onError={(e) => {
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row float-right p-3">
                {
                  !this.props.coupon_id ?
                  <button
                    onClick={this.onSaveData}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                  :
                  (<button onClick={this.onupdate.bind(this)}
                    className="btn btn-grd-disabled mr-2"
                  >
                    Update
                  </button>
                  )}
                <Link to={"/coupon-master"} className="btn btn-outline-dark">
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
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
    product_list: state.product.product_list,
    categoryData: state.category.category_list,
    seller_list: state.seller.seller_list,
    pincode_list: state.pincode.pincode_list,
    coupon_det: state.coupon.coupon_det,
  };
};

CouponAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  fetchCategoryList: PropTypes.func.isRequired,
  fetchPincodeList: PropTypes.func.isRequired,
  fetchProductList: PropTypes.func.isRequired,
  fetchSellerList: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  fetchCategoryList,
  fetchPincodeList,
  fetchProductList,
  fetchSellerList,
  addCoupon,
  getDeliveryboyDetails,
  updateCoupomList,
  getGallery
})(CouponAdd);
