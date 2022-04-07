import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class HomeCategoryAdd extends React.Component {
  state = {};
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    if (
      this.props.match.params.homCat_id !== undefined &&
      this.props.match.params.homCat_id !== null &&
      this.props.match.params.homCat_id !== 0 &&
      this.props.match.params.homCat_id !== ""
    ) {
      this.setState({ homCat_id: this.props.match.params.homCat_id });
    }
    // this.getLanguageList()
  }
  // getLanguageList = () => {
  //   var language_data = Constant.getLanguageList();
  //   this.setState({ language_data: language_data, language_id: language_data[0].id, isLoading: false });
  // }
  handleLanguage = (language_id) => {
    this.setState({ language_id: language_id });
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
                      {this.props.match.params.homCat_id ? "Edit" : "Add"} Categories
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
                      <Link to="/home-categories">Categories</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.homCat_id ? "Edit" : "Add"} Categories
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
                                  Pincode
                                </label>
                                <div className="col-sm-9">
                                  <select
                                    name="pincode"
                                    className="form-control"
                                    value={this.state.pincode}
                                    onChange={this.handleChange}
                                  >
                                    <option value={true}>
                                      --Select Pincode--
                                    </option>
                                    <option value={221005}>221005</option>
                                    <option value={221006}>221006</option>
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
                                    <option value={true}>
                                      --Select Category--
                                    </option>
                                    <option value={""}>Category one</option>
                                    <option value={""}>Category two</option>
                                    <option value={""}>Category three</option>
                                    <option value={""}>Category four</option>
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
                                    name="category"
                                    className="form-control"
                                    value={this.state.subCategory}
                                    onChange={this.handleChange}
                                  >
                                    <option value={true}>
                                      --Select SubCategory--
                                    </option>
                                    <option value={""}>subCategory one</option>
                                    <option value={""}>subCategory two</option>
                                    <option value={""}>subCategory three</option>
                                    <option value={""}>subCategory four</option>
                                  </select>
                                </div>
                              </div>
                            </div> */}
                            
                            {/* <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Category
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    placeholder="Category"
                                    onChange={this.handleChange}
                                    value={this.state.category}
                                  />
                                </div>
                              </div>
                            </div> */}
                            {/* <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Labels
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
                            </div> */}
                            {/* <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Labels
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
                            </div> */}
                            <div className="col-md-6">
                              <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                  Thumbnail Url
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="thumbnailUrl"
                                    placeholder="Thumbnail Url"
                                    onChange={this.handleChange}
                                    value={this.state.thumbnailUrl}
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
                                  <select
                                    name="sellerId"
                                    className="form-control"
                                    value={this.state.sellerId}
                                    onChange={this.handleChange}
                                  >
                                    <option value={true}>
                                      --Select Seller--
                                    </option>
                                    <option value={""}>Seller one</option>
                                    <option value={""}>Seller two</option>
                                    <option value={""}>Seller three</option>
                                    <option value={""}>Seller four</option>
                                  </select>
                                </div>
                              </div>
                            </div> */}

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
                                to={"/home-categories"}
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
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

HomeCategoryAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(HomeCategoryAdd);
