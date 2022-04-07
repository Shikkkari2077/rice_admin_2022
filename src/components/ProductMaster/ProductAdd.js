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
import { fetchCategoryList, } from "../../store/index";

class ProductAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
    refund_policy: "",
    gallery: [],
    galleryURL: [],
    selected_attributes: [],
    categories: [],
    packageCategory: [
      { categoryID: "1", category: "hello" },
      { categoryID: "2", category: "hello" },
    ],
  };
    componentWillMount(props){
        if(this.props.product_id !== undefined){
          console.log('get',this.props.product_id)
          this.setState({
            product_id:this.props.product_id,
            updating:true
          })
          this.props.fetchCategoryList(this.props.product_id)
        }
        else{
          console.log('notget')
        }
      }
      componentWillReceiveProps(nextProps){
       console.log('hello',nextProps.category_det)
      
      //  this.setState({
      //   name:nextProps.category_det[0].name,
      //   description:nextProps.category_det[0].description,
      //   image:nextProps.category_det[0].Medium ? nextProps.category_det[0].Medium.url : ''
      //    // currency:nextProps.category_det[0].
      //  })
       console.log('data',this.state.data)
     }
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  onHandleRefundPolicyChange = (value) => {
    this.setState({ refund_policy: value });
  };

  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
   this.uploadMedia()
  };
  // componentWillMount() {
  //   this.getAttributeList();
  //   this.getCategoryList();
  //   this.getBrandlist();
  //   this.getProductDetails();
  //   this.loadScript(
  //     process.env.PUBLIC_URL + "/assets/pages/filer/jquery.fileuploads.init.js"
  //   );
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.product_id !== this.props.product_id) {
  //     this.setState({ product_id: this.props.product_id });
  //     this.getProductDetails();
  //   }
  //   if (prevProps.language_id !== this.props.language_id) {
  //     if (this.props.product_id !== undefined) {
  //       this.setState({ product_id: this.props.product_id });
  //       this.getProductDetails();
  //       this.getAttributeList();
  //       this.getCategoryList();
  //       this.getBrandlist();
  //       // this.getShopList();
  //     }
  //   }
  // }
 

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

 
  handleImageUpload = (event) => {
    document.getElementById("banner_image_label").innerHTML = "";
    let element = $("#product_banner_image").get(0);
    // $("#id_image_section").empty();
    this.setState({ accepted: element });
    var proof_img = [];
    let obj = {};
    console.log(element.files);
    this.setState({ product_banner_image: element.files });
    for (var i = 0; i < element.files.length; i++) {
      var file1 = element.files[i];
      var img = document.createElement("img");
      img.className = "img-100";
      var filePath = URL.createObjectURL(file1);
      img.src = filePath;
      $("#banner_image_label").append(img);
    }
  };
 
  onSaveData = () => {
    var that = this;
    that.setState({ isSaving: true });

    if (that.props.product_id !== undefined) {
      that.updateProduct();
    } else {
      this.addProduct();
    }
  };
 
  
 

 
  onSelectBrand = (e) => {
    this.setState({ brandId: e.target.value });
  };
  onSelectCategory = (e) => {
    this.setState({ categoryId: e.target.value });
  };
  onSelectCategory = (e) => {
    this.setState({ categoryId: e.target.value });
  };
  
  handleSelectCat = (categories) => {
    this.setState({
      categories: categories,
      cat: Array.isArray(categories) ? categories.map((x) => x.categoryID) : [],
    });
  };

  render() {
    const { categories } = this.state;
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
    return localStorage.getItem('role') !== "admin" ? (
      localStorage.getItem('role') === "seller" ? (
        <div className="">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      disabled
                      placeholder="Name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">SKU</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="sku"
                      id="sku"
                      disabled
                      placeholder="SKU"
                      onChange={this.handleChange}
                      value={this.state.sku}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Category</label>
                  <div className="col-sm-9">
                    <select
                      name="categoryId"
                      disabled
                      onChange={this.handleChange}
                      value={this.state.categoryId}
                      className="form-control"
                    >
                      <option>Select Category</option>
                      {this.state.categoryList !== undefined
                        ? this.state.categoryList.map((category) => (
                            <option value={category.id}>{category.name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Sub Category
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="subcategoryId"
                      onChange={this.handleChange}
                      value={this.state.subcategoryId}
                      className="form-control"
                      disabled
                    >
                      <option>Select Sub-Category</option>
                      {this.state.categoryList !== undefined
                        ? this.state.categoryList.map((category) => (
                            <option value={category.id}>{category.name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div> */}
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Brand</label>
                  <div className="col-sm-9">
                    <select
                      name="brandId"
                      disabled
                      onChange={this.handleChange}
                      value={this.state.brandId}
                      className="form-control"
                    >
                      <option>Select Brand</option>
                      {this.state.categoryList !== undefined
                        ? this.state.categoryList.map((category) => (
                            <option value={category.id}>{category.name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Attributes</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="attributes"
                      disabled
                      placeholder="Attributes"
                      onChange={this.handleChange}
                      value={this.state.attributes}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Unit</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="unit"
                      disabled
                      placeholder="Unit"
                      onChange={this.handleChange}
                      value={this.state.unit}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">MRP</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="mrp"
                      placeholder="MRP(Max. Retail Price)"
                      onChange={this.handleChange}
                      value={this.state.mrp}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTC</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="ptc"
                      placeholder="PTC()"
                      onChange={this.handleChange}
                      value={this.state.ptc}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTD</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="ptd"
                      placeholder="PTD()"
                      onChange={this.handleChange}
                      value={this.state.ptd}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">SGST</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="sgst"
                      disabled
                      placeholder="SGST()"
                      onChange={this.handleChange}
                      value={this.state.sgst}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">CGST</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="cgst"
                      placeholder="CGST()"
                      disabled
                      onChange={this.handleChange}
                      value={this.state.cgst}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">IGST</label>
                  <div className="col-sm-9">
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      name="igst"
                      placeholder="IGST()"
                      onChange={this.handleChange}
                      value={this.state.igst}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Expiry Date</label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      disabled
                      name="expirydate"
                      placeholder="Expiry Date"
                      onChange={this.handleChange}
                      value={this.state.expirydate}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Key Words</label>
                  <div className="col-sm-9">
                    <Select
                      isDisabled={true}
                      styles={customStyles}
                      isMulti={true}
                      value={categories}
                      getOptionLabel={(option) => `${option.category}`}
                      getOptionValue={(option) => `${option.categoryID}`}
                      onChange={this.handleSelectCat}
                      options={this.state.packageCategory}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Short Desc.</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      disabled
                      // cols={}
                      className="form-control"
                      onChange={this.handleChange}
                      name="shortDescription"
                      placeholder="Short Desc."
                      value={this.state.shortDescription}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Long Desc.</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      // cols={}
                      disabled
                      className="form-control"
                      onChange={this.handleChange}
                      name="longDescription"
                      placeholder="Long Desc."
                      value={this.state.longDescription}
                    />
                  </div>
                </div>
              </div>
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
            
            </div>
          </div>
          <div className="card-footer">
            <div className="row float-right p-3">
              {this.props.isLoading ? (
                <button className="btn btn-grd-disabled mr-2" disabled>
                  Saving...!
                </button>
              ) : (
                <button
                  onClick={this.onSaveData}
                  className="btn btn-grd-disabled mr-2"
                >
                  <i className="icofont icofont-save"></i> Save
                </button>
              )}
              <Link to={"/products"} className="btn btn-outline-dark">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      ) : null
    ) : (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">SKU</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="sku"
                    id="sku"
                    placeholder="SKU"
                    onChange={this.handleChange}
                    value={this.state.sku}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Category</label>
                <div className="col-sm-9">
                  <select
                    name="categoryId"
                    onChange={this.handleChange}
                    value={this.state.categoryId}
                    className="form-control"
                  >
                    <option>Select Category</option>
                    {this.state.categoryList !== undefined
                      ? this.state.categoryList.map((category) => (
                          <option value={category.id}>{category.name}</option>
                        ))
                      : ""}
                  </select>
                </div>
              </div>
            </div>
          
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Brand</label>
                <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    name="brand"
                    id="brand"
                    placeholder="Brand"
                    onChange={this.handleChange}
                    value={this.state.brand}
                  />
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Unit</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="unit"
                    placeholder="Unit"
                    onChange={this.handleChange}
                    value={this.state.unit}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">MRP</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="mrp"
                    placeholder="MRP(Max. Retail Price)"
                    onChange={this.handleChange}
                    value={this.state.mrp}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">PTC</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="ptc"
                    placeholder="PTC()"
                    onChange={this.handleChange}
                    value={this.state.ptc}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">PTD</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="ptd"
                    placeholder="PTD()"
                    onChange={this.handleChange}
                    value={this.state.ptd}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">SGST</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="sgst"
                    placeholder="SGST()"
                    onChange={this.handleChange}
                    value={this.state.sgst}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">CGST</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="cgst"
                    placeholder="CGST()"
                    onChange={this.handleChange}
                    value={this.state.cgst}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">IGST</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="igst"
                    placeholder="IGST()"
                    onChange={this.handleChange}
                    value={this.state.igst}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Expiry Date</label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    name="expirydate"
                    placeholder="Expiry Date"
                    onChange={this.handleChange}
                    value={this.state.expirydate}
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Key Words</label>
                <div className="col-sm-9">
                  <Select
                    styles={customStyles}
                    isMulti={true}
                    value={categories}
                    getOptionLabel={(option) => `${option.category}`}
                    getOptionValue={(option) => `${option.categoryID}`}
                    onChange={this.handleSelectCat}
                    options={this.state.packageCategory}
                  />
                </div>
              </div>
            </div>*/}
          </div> 
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Gallery</label>
                <div className="col-sm-10">
                  <div className="row">
                    <AddGalleryImage
                      uploadGalleryImage={this.uploadGalleryImage}
                    />
                    <AddGalleryImage
                      uploadGalleryImage={this.uploadGalleryImage}
                    />
                    <AddGalleryImage
                      uploadGalleryImage={this.uploadGalleryImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Short Desc.</label>
                <div className="col-sm-9">
                  <ReactQuill
                    value={this.state.description}
                    onChange={this.onHandleDescriptionChange}
                    style={{ height: "200px", marginBottom: "5%" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Long Desc.</label>
                <div className="col-sm-9">
                  <ReactQuill
                    value={this.state.description}
                    onChange={this.onHandleDescriptionChange}
                    style={{ height: "200px", marginBottom: "5%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="row float-right p-3">
            {this.props.isLoading ? (
              <button className="btn btn-grd-disabled mr-2" disabled>
                Saving...!
              </button>
            ) : (
              <button
                onClick={this.onSaveData}
                className="btn btn-grd-disabled mr-2"
              >
                <i className="icofont icofont-save"></i> Save
              </button>
            )}
            <Link to={"/products"} className="btn btn-outline-dark">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginData: state.login,
  };
};
ProductAdd.propTypes = {
  login: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(ProductAdd);
