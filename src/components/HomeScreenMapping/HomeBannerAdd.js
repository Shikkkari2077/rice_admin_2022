import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";
import {
  fetchPincodeList,
  fetchProductList,
  fetchCategoryList,
  bannerAddOne
} from "../../store/index";

class HomeBannerAdd extends React.Component {
  state = {pincode:'',product:'',category:'',fileToUpload:null};
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentWillMount() {
    this.props.fetchPincodeList("",0,2500)
    this.props.fetchProductList();
    this.props.fetchCategoryList();
  }
  componentDidMount() {
    if (
      this.props.match.params.banner_id !== undefined &&
      this.props.match.params.banner_id !== null &&
      this.props.match.params.banner_id !== 0 &&
      this.props.match.params.banner_id !== ""
    ) {
      this.setState({ banner_id: this.props.match.params.banner_id });
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
    console.log(fileToUpload);
    this.setState({
      category_image: element.files,
      fileToUpload: fileToUpload,
    });
    for (var i = 0; i < element.files.length; i++) {
      var file1 = element.files[i];
      var img = document.createElement("img");
      img.className = "img-100";
      var filePath = URL.createObjectURL(file1);
      img.src = filePath;
      $("#category_image_label").append(img);
    }
  };
  handleLanguage = (language_id) => {
    this.setState({ language_id: language_id });
  };
  onSaveData = () => {
    this.uploadMedia();
  };
  uploadMedia = () => {
    const pincode = this.state.pincode;
    const product = this.state.product;
    const category = this.state.category;
    const media = this.state.fileToUpload;
    this.props.bannerAddOne(pincode, product,category, media);
  };
  render() {
    return (
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="page-header-title">
                  <div className="d-inline">
                    <h4>
                      {this.props.match.params.banner_id ? "Edit" : "Add"}{" "}
                      Banners
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
                      <Link to="/banners">Banners</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.banner_id ? "Edit" : "Add"}{" "}
                      Banners
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
                    <div className="tab-content tabs">
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
                                    name="labels"
                                    placeholder="Label"
                                    onChange={this.handleChange}
                                    value={this.state.labels}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                Nameweb
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="Nameweb"
                                    placeholder="Nameweb"
                                    onChange={this.handleChange}
                                    value={this.state.Nameweb}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Target URL
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="targeturl"
                                    placeholder="Target URL"
                                    onChange={this.handleChange}
                                    value={this.state.targeturl}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Target Web URL
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="TargetWebURL"
                                    placeholder="Target Web URL"
                                    onChange={this.handleChange}
                                    value={this.state.TargetWebURL}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                Banner URL
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="bannerurl"
                                    placeholder="Banner URl"
                                    onChange={this.handleChange}
                                    value={this.state.bannerurl}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                Banner URL Web
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="bannerurlweb"
                                    placeholder="Banner URl Web"
                                    onChange={this.handleChange}
                                    value={this.state.bannerurlweb}
                                  />
                                </div>
                              </div>
                            </div>
                           
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Pincode
                                </label>
                                <div className="col-sm-9">
                                  <select
                                    name="pincode"
                                    className="form-control"
                                    value={this.state.pincode}
                                    onChange={this.handleChange}
                                  >
                                    <option value="opt1">Select Pincode</option>
                                    {this.props.pincode_list !== undefined &&
                                    this.props.pincode_list !== null &&
                                    this.props.pincode_list !== [] &&
                                    this.props.pincode_list.length > 0
                                      ? this.props.pincode_list.map(
                                          (pincode_list) => (
                                            <option
                                              value={pincode_list.id}
                                              key={pincode_list.id}
                                            >
                                              {pincode_list.code}
                                            </option>
                                          )
                                        )
                                      : null}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Product
                                </label>
                                <div className="col-sm-9">
                                  <select
                                    name="product"
                                    className="form-control"
                                    value={this.state.product}
                                    onChange={this.handleChange}
                                  >
                                    <option value="opt1">Select Product</option>
                                    {this.props.product_list !== undefined &&
                                    this.props.product_list !== null &&
                                    this.props.product_list !== [] &&
                                    this.props.product_list.length > 0
                                      ? this.props.product_list.map(
                                          (product_list) => (
                                            <option
                                              value={product_list.id}
                                              key={product_list.id}
                                            >
                                              {product_list.name}
                                            </option>
                                          )
                                        )
                                      : null}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Category
                                </label>
                                <div className="col-sm-9">
                                  <select
                                    name="category"
                                    className="form-control"
                                    value={this.state.category}
                                    onChange={this.handleChange}
                                  >
                                    <option value="opt1">
                                      Select Category
                                    </option>
                                    {this.props.categoryData !== undefined &&
                                    this.props.categoryData !== null &&
                                    this.props.categoryData !== [] &&
                                    this.props.categoryData.length > 0
                                      ? this.props.categoryData.map(
                                          (categoryData) => (
                                            <option
                                              value={categoryData.id}
                                              key={categoryData.id}
                                            >
                                              {categoryData.name}
                                            </option>
                                          )
                                        )
                                      : null}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Status
                                </label>
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
                                    <input
                                      accept="image/*"
                                      onChange={this.handleImageUpload}
                                      id="category_image"
                                      type="file"
                                      className="form-control"
                                      autoComplete="off"
                                      name="files"
                                    />
                                    <span className="mt-1">( 500 x 500 )</span>
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

                          <div className="card-footer">
                            <div className="row float-right p-3">
                              {this.state.isSaving ? (
                                <button
                                  className="btn btn-grd-disabled mr-2"
                                  disabled
                                >
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
                              <Link
                                to={"/banners"}
                                className="btn btn-outline-dark"
                              >
                                Cancel
                              </Link>
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pincode_list: state.pincode.pincode_list,
    product_list: state.product.product_list,
    categoryData: state.category.category_list,
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

HomeBannerAdd.propTypes = {
  fetchPincodeList: PropTypes.func.isRequired,
  fetchProductList: PropTypes.func.isRequired,
  fetchCategoryList: PropTypes.func.isRequired,
  bannerAddOne:PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  fetchPincodeList,
  fetchProductList,
  fetchCategoryList,
  bannerAddOne
})(HomeBannerAdd);
