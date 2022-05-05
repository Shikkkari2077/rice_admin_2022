import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
import ReactQuill from "react-quill";
import AddGalleryImage from "./AddGalleryImage";
import Select from "react-select";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCategoryList,
        fetchSubCategoryList,
        fetchUOMList,
        fetchBrandList,
        fetchcityList,
        fetchCountryList,
        fetchBagList,
        ProductADD,
 } from "../../store/index";
import axios from "axios";

class ProductAdd extends React.Component {
  state = {
    name: "",
    longDescription: "",
    shortDescription: "",
    categoryId:'',
  };

  onNextStep = (mediaID) => {

    var VALID = new Date(this.state.validity)
    var F_VALID = VALID.getTime()

    if(this.props.product_id){
      // let MEDIA = media.concat(media2)

      // let MEDIA2 = []
      // if(this.state.imageData2!==[] && this.state.imageData2!==undefined && this.state.imageData2!==null){
      //   let Data = this.state.imageData2
      //   var SavedMedia = Data.map(data2=>data2.id)
      //       SavedMedia = new Set(SavedMedia)
      //   MEDIA2 = [...SavedMedia]
      // }
     
      
  
      // this.props.updatePOST(data)
    }else{
      var data = {
        name:this.state.name,
        longDescription:this.state.longDescription,
        shortDescription:this.state.shortDescription,
        igst:this.state.igst,
        sgst:this.state.sgst,
        cgst:this.state.cgst,
        SKU:parseInt(this.state.SKU),
        availableQuantity:parseInt(this.state.availableQuantity),
        minimumOrderQuantity:parseInt(this.state.minimumOrderQuantity),
        usdPrice:parseInt(this.state.usdPrice),
        inrPrice:parseInt(this.state.inrPrice),
        barcode:this.state.barcode,
        available:true,
        validity:F_VALID,
        packSize:this.state.packSize,
        grossWeight:this.state.grossWeight,
        netWeight:this.state.netWeight,
        baseUOMId:this.state.baseUOMId,
        brandId:this.state.brandId,
        categoryId:this.state.categoryId,
        subCategoryId:this.state.subCategoryId,
        keyFeatures:this.state.keyFeatures,
        // productMediumId: mediaID,
        keywords1:this.state.keywords1,
        keywords2:this.state.keywords2,
        cityId:this.state.cityId,
        bagId:this.state.bagId,
        countryId:this.state.countryId,
      };
  
      this.props.ProductADD(data)
    }
  };


  componentWillMount(){
        this.props.fetchCategoryList()
        this.props.fetchUOMList()
        this.props.fetchBrandList()
        this.props.fetchcityList()
        this.props.fetchCountryList()
        this.props.fetchBagList()
        console.log('Triggered');
  }

  
  componentWillReceiveProps(nextProps){

    this.setState({
      category_list:nextProps.category_list,
      subcategory_list:nextProps.subcategory_list,
      uom_list:nextProps.uom_list,
      brand_list:nextProps.brand_list,
      city_list:nextProps.city_list,
      country_list:nextProps.country_list,
      bags_list:nextProps.bags_list,
    })

  }

  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.categoryId !== prevState.categoryId) {
        var data ={
          CategoryId:this.state.categoryId
        }
        this.props.fetchSubCategoryList(data)
    }
  }

 
  
  onHandleShortDescriptionChange = (value) => {
    this.setState({ shortDescription: value });
  };

  onHandleLongDescriptionChange = (value) => {
    this.setState({ longDescription: value });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  

  render() {
    console.log('MEDIA',this.state.imageData);
    return <>
       <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-10">
              <div className="INP_FIELD">
                <label htmlFor="name">Name <b>*</b></label>
                <input
                    type="text"
                    id='name'
                    name="name"
                    placeholder="Enter Product Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
              </div>
            </div>
            <div className="col-md-2">
              <div className="INP_FIELD">
                <label htmlFor="SKU">SKU <b>*</b></label>
                <input
                    type="text"
                    id='SKU'
                    name="SKU"
                    placeholder="SKU"
                    onChange={this.handleChange}
                    value={this.state.SKU}
                  />
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="INP_FIELD">
                <label htmlFor="categoryId">Category <b>*</b></label>
                <select
                    name="categoryId"
                    onChange={this.handleChange}
                    value={this.state.categoryId}
                  >
                    <option> - Select Category - </option>
                    {this.state.category_list !== undefined
                      ? this.state.category_list.map((category) => (
                          <option value={category.id}>{category.name}</option>
                        ))
                      : ""}
                  </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="INP_FIELD">
                <label htmlFor="subCategoryId">Sub Category</label>
                <select
                    name="subCategoryId"
                    onChange={this.handleChange}
                    value={this.state.subCategoryId}
                  >
                    <option> - Select Category - </option>
                    {this.state.subcategory_list !== undefined
                      ? this.state.subcategory_list.map((subcategory) => (
                          <option value={subcategory.id}>{subcategory.name}</option>
                        ))
                      : ""}
                  </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="INP_FIELD">
                <label htmlFor="brandId">Brand</label>
                <select
                    name="brandId"
                    onChange={this.handleChange}
                    value={this.state.brandId}
                  >
                    <option> - Select Brand - </option>
                    {this.state.brand_list !== undefined
                      ? this.state.brand_list.map((brand) => (
                          <option value={brand.id}>{brand.name}</option>
                        ))
                      : ""}
                  </select>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="validity">Validity <b>*</b></label>
                <input
                    type="date"
                    id='validity'
                    name="validity"
                    onChange={this.handleChange}
                    value={this.state.validity}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="barcode">Barcode <b>*</b></label>
                <input
                    type="number"
                    id='barcode'
                    name="barcode"
                    placeholder="Barcode No."
                    onChange={this.handleChange}
                    value={this.state.barcode}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="availableQuantity">Available Qty. <b>*</b> </label>
                <input
                    type="number"
                    id='availableQuantity'
                    name="availableQuantity"
                    placeholder="Available Quantity"
                    onChange={this.handleChange}
                    value={this.state.availableQuantity}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="minimumOrderQuantity">Min. Order Qty.</label>
                <input
                    type="number"
                    id='minimumOrderQuantity'
                    name="minimumOrderQuantity"
                    placeholder="Minimum Order Quantity"
                    onChange={this.handleChange}
                    value={this.state.minimumOrderQuantity}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="igst">IGST <b>*</b></label>
                <input
                    type="number"
                    id='igst'
                    name="igst"
                    placeholder="IGST Amount"
                    onChange={this.handleChange}
                    value={this.state.igst}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="sgst">SGST</label>
                <input
                    type="number"
                    id='sgst'
                    name="sgst"
                    placeholder="SGST Amount"
                    onChange={this.handleChange}
                    value={this.state.sgst}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="cgst">CGST</label>
                <input
                    type="number"
                    id='cgst'
                    name="cgst"
                    placeholder="CGST Amount"
                    onChange={this.handleChange}
                    value={this.state.cgst}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="packSize">Pack Size </label>
                <input
                    type="text"
                    id='packSize'
                    name="packSize"
                    placeholder="Pack Size"
                    onChange={this.handleChange}
                    value={this.state.packSize}
                  />
              </div>
            </div>

            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="baseUOMId">Base UOM <b>*</b></label>
                  <select
                    name="baseUOMId"
                    onChange={this.handleChange}
                    value={this.state.baseUOMId}
                  >
                    <option>- Select UOM - </option>
                    {this.state.uom_list !== undefined
                      ? this.state.uom_list.map((uom) => (
                          <option value={uom.id}>{uom.name}</option>
                        ))
                      : ""}
                  </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="grossWeight">Gross Weight <b>*</b></label>
                <input
                    type="text"
                    id='grossWeight'
                    name="grossWeight"
                    placeholder="Gross Weight"
                    onChange={this.handleChange}
                    value={this.state.grossWeight}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="netWeight">Net Weight <b>*</b></label>
                <input
                    type="text"
                    id='netWeight'
                    name="netWeight"
                    placeholder="Net Weight"
                    onChange={this.handleChange}
                    value={this.state.netWeight}
                  />
              </div>
            </div>
            <div className="col-md-3">
              <div className="INP_FIELD">
                <label htmlFor="netWeight">Bags</label>
                <select
                    name="bagId"
                    onChange={this.handleChange}
                    value={this.state.bagId}
                  >
                    <option> - Select Bag - </option>
                    {this.state.bags_list !== undefined
                      ? this.state.bags_list.map((bag) => (
                          <option value={bag.id}>{bag.bagType}/{bag.bagSize}</option>
                        ))
                      : ""}
                  </select>
              </div>
            </div>
           
            <div className="col-md-6">
              <div className="INP_FIELD">
                <label htmlFor="inrPrice">INR Price <b>*</b></label>
                <input
                    type="text"
                    id='inrPrice'
                    name="inrPrice"
                    placeholder="INR Price"
                    onChange={this.handleChange}
                    value={this.state.inrPrice}
                  />
              </div>
            </div>
            <div className="col-md-6">
              <div className="INP_FIELD">
                <label htmlFor="usdPrice">USD Price <b>*</b></label>
                <input
                    type="text"
                    id='usdPrice'
                    name="usdPrice"
                    placeholder="USD Price"
                    onChange={this.handleChange}
                    value={this.state.usdPrice}
                  />
              </div>
            </div>
            <div className="col-md-4">
              <div className="INP_FIELD">
                <label htmlFor="netWeight">Country <b>*</b></label>
                <select
                    name="countryId"
                    onChange={this.handleChange}
                    value={this.state.countryId}
                  >
                    <option>- Select Country - </option>
                    {this.state.country_list !== undefined
                      ? this.state.country_list.map((country) => (
                          <option value={country.id}>{country.name}</option>
                        ))
                      : ""}
                  </select>
              </div>
            </div>
            <div className="col-md-8">
              <div className="INP_FIELD">
                <label htmlFor="netWeight">City <b>*</b></label>
                <select
                    name="cityId"
                    onChange={this.handleChange}
                    value={this.state.cityId}
                  >
                    <option>- Select City - </option>
                    {this.state.city_list !== undefined
                      ? this.state.city_list.map((city) => (
                          <option value={city.id}>{city.name}</option>
                        ))
                      : ""}
                  </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="INP_FIELD">
                <label htmlFor="keyFeatures">Key Features</label>
                <textarea
                    type="text"
                    id='keyFeatures'
                    name="keyFeatures"
                    placeholder="Key Features"
                    onChange={this.handleChange}
                    value={this.state.keyFeatures}
                  />
              </div>
            </div>
            <div className="col-md-6">
              <div className="INP_FIELD">
                <label htmlFor="keywords1">Keywords 1 <b>*</b></label>
                <textarea
                    type="text"
                    id='keywords1'
                    name="keywords1"
                    placeholder="Keywords 1"
                    onChange={this.handleChange}
                    value={this.state.keywords1}
                  />
              </div>
            </div>
            <div className="col-md-6">
              <div className="INP_FIELD">
                <label htmlFor="keywords2">Keywords 2</label>
                <textarea
                    type="text"
                    id='keywords2'
                    name="keywords2"
                    placeholder="Keywords 2"
                    onChange={this.handleChange}
                    value={this.state.keywords2}
                  />
              </div>
            </div>
            <div className="col-md-6">
              <div className="INP_FIELD">
                <label htmlFor="keywords2">Short Description <b>*</b></label>
                <ReactQuill
                    value={this.state.shortDescription}
                    onChange={this.onHandleShortDescriptionChange}
                    className='ReactQLL'
                  />
              </div>
            </div>

            <div className="col-md-6">
              <div className="INP_FIELD">
                <label htmlFor="keywords2">Long Description</label>
                <ReactQuill
                    value={this.state.longDescription}
                    onChange={this.onHandleLongDescriptionChange}
                    className='ReactQLL'
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="row float-right p-3 FOOTER_BTNS">
            {this.props.isLoading ? (
              <button disabled>
                Saving...!
              </button>
            ) : (
              <button
                onClick={this.onNextStep}
              >
                <i className="icofont icofont-save"></i> Save
              </button>
            )}
            <Link to={"/products"}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  
  }
}

const mapStateToProps = (state) => {
  return {
    category_list: state.category.category_list,
    subcategory_list: state.subCategory.subcategory_list,
    uom_list: state.uomTypes.uom_list,
    brand_list: state.Brands.brand_list,
    city_list: state.city.city_list,
    country_list: state.country.country_list,
    bags_list: state.Bags.bags_list,
  };
};


ProductAdd.propTypes = {
  fetchCategoryList: PropTypes.func.isRequired,
  fetchSubCategoryList: PropTypes.func.isRequired,
  fetchUOMList: PropTypes.func.isRequired,
  fetchBrandList: PropTypes.func.isRequired,
  fetchcityList: PropTypes.func.isRequired,
  fetchCountryList: PropTypes.func.isRequired,
  fetchBagList: PropTypes.func.isRequired,
  ProductADD: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, {
  fetchCategoryList,
  fetchSubCategoryList,
  fetchUOMList,
  fetchBrandList,
  fetchcityList,
  fetchCountryList,
  fetchBagList,
  ProductADD,
})(ProductAdd);
