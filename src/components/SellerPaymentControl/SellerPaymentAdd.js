import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
// import ReactQuill from "react-quill";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";

import { fetchSellerPaytmDetail,updateSellerPaytm,addSellerPaytm,fetchSellerList} from "../../store/index";

class SellerPaymentAdd extends React.Component {
  state = {
    isLoading:false,
    imageChanged:false,
    sellerUnique:'',
    changed:false,
    merchant_id:"",
    merchant_key:""

  };
  componentWillMount(props){
      console.log(this.props.seller_pay_id,"yes")
    this.props.fetchSellerList(0,50000,'')

    if(this.props.seller_pay_id !== undefined){
      console.log('get',this.props.seller_pay_id)
      this.setState({
        seller_pay_id:this.props.seller_pay_id,
        updating:true
      })

      this.props.fetchSellerPaytmDetail(this.props.seller_pay_id)
    }
    else{
      console.log('notget')
    }
  }
  componentWillReceiveProps(nextProps){
      if(this.props.seller_pay_id !==undefined ){
  if(nextProps.Seller_detail !== undefined && 
    nextProps.Seller_detail !== null &&
     nextProps.Seller_detail[0] !== undefined && 
     nextProps.Seller_detail[0] !== null )
  console.log(nextProps.Seller_detail[0],"details")
  this.setState({
    
     sellerUniqueValue:nextProps.Seller_detail[0].Seller,
  
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
 handleSeller(event){
    console.log(event)
    var sellerUnique=''

    if(event !== null && event !== undefined){
  this.setState({sellerUnique:event.unique_identifier,changed:true,valueseller:event})

}
else{
    this.setState({
        sellerUnique:'',
        event:[],

    })
}
}
 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
  this.props.addSellerPaytm(this.state.sellerUnique,this.state.merchant_id,this.state.merchant_key)
  
  };
  updateCategoryData=()=>{
    this.setState({
      isLoading:true
    })
     console.log(this.state.merchant_id,"id")
     console.log(this.state.merchant_key,"key")

    if(this.state.merchant_id !== '' && this.state.merchant_key ==''){
      this.props.updateSellerPaytm(
        this.props.seller_pay_id,
        this.state.sellerUnique,
        this.state.merchant_id,
        )
    }
   else if(this.state.merchant_id == '' && this.state.merchant_key !==''){
      this.props.updateSellerPaytm(
        this.props.seller_pay_id,
        this.state.sellerUnique,
        "",
        this.state.merchant_key
        )
    }
  else if(this.state.merchant_id !== '' && this.state.merchant_key !==''){
    this.props.updateSellerPaytm(
        this.props.seller_pay_id,
        this.state.sellerUnique,
        this.state.merchant_id,
        this.state.merchant_key
        )
    }
  
  }
 
  handleImageUpload = (event) => {
    document.getElementById("category_image_label").innerHTML = "";
    let element = $("#category_image").get(0);
    // $("#id_image_section").empty();
    this.setState({ accepted: element });
    var proof_img = [];
    let obj = {};
    console.log(element.files);
    const fileToUpload = event.target.files[0];
    console.log(fileToUpload)
    this.setState({ category_image: element.files,imageChanged:true ,fileToUpload:fileToUpload});
    for (var i = 0; i < element.files.length; i++) {
      var file1 = element.files[i];
      var img = document.createElement("img");
      img.className = "img-100";
      var filePath = URL.createObjectURL(file1);
      img.src = filePath;
      $("#category_image_label").append(img);
    }
  };

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
                    Merchant ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="merchant_id"
                      placeholder="Merchant ID"
                      onChange={this.handleChange}
                      value={this.state.merchant_id}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Merchant KEY
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="merchant_key"
                      placeholder="Merchant KEY"
                      onChange={this.handleChange}
                      value={this.state.merchant_key}
                    />
                  </div>
                </div>
              </div>
              {this.props.seller_pay_id !== undefined?null:
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
                               isOptionSelected={(option) =>
                                 this.state.sellerUnique.includes(option.id) 
                                   ? true
                                   : false
                               }
                               options={this.props.seller_list}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Seller"}
                               value={this.state.changed?this.state.valueseller:this.state.sellerUniqueValue}

                               
 
                               
                             />
                  </div>
                </div>
              </div>
  }
            
            
             
             
            
            </div>

           

            <div className="card-footer">
              <div className="row float-right p-1">
            
                  {
                  !this.props.seller_pay_id ?
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
                <Link to={"/SellerPaytmControl/list"} className="btn btn-outline-dark">
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
    //templates: state.sellerPaytm.seller_list,
    seller_list: state.seller.seller_list,
    Seller_detail: state.sellerPaytm.Seller_detail,
    isLoading: state.category.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

SellerPaymentAdd.propTypes = {
    fetchSellerPaytmDetail:PropTypes.func.isRequired,
    addSellerPaytm:PropTypes.func.isRequired,
    updateSellerPaytm:PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
    fetchSellerPaytmDetail,addSellerPaytm,updateSellerPaytm,fetchSellerList})(SellerPaymentAdd);
