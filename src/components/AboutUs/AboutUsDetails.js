import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchDeatilsSellerList } from "../../store/index";

class AboutUsDetails extends React.Component {
  state = {};

  componentDidMount() {
    const data=localStorage.getItem('seller_id')
    this.getContactUsDetails(data);
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getContactUsDetails = (id) => {
     this.props.fetchDeatilsSellerList(id)
  };

  onSave = () => {
    this.saveAboutUsDetails();
  };

  render() {
    const data=this.props.seller_det
    return (
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-lg-8">
                <div className="page-header-title">
                  <div className="d-inline">
                    <h4>Profile Details</h4>
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
                    <li className="breadcrumb-item active">Profile Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="page-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-border-primary">
                  <div className="card-block">
                    <div className="">
                      {this.props.isLoading ? (
                        "Loading ..!"
                      ) : (
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <div
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  margin:'5px',
                                  background: "grey",
                                }}
                              >
                                img
                              </div>
                            </div>
                            <div className="col-sm-9">
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Type
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        Seller
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Company Seller Id
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        {data.unique_identifier}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Business Name
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        Fortune Retails
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Contact Person
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        {data.contact_person}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Mobile Number
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        {data.phoneNumber}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Contact Number
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                      {data.alternateNumber}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Email
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        {data.email}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Address
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        {data.address}
                                        <br />
                                        {data.location} {data.pincode}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Location
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        {data.location}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Pincode
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        {data.pincode}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      GST Details
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                       {data.GST_details}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Partner Since
                                    </label>
                                    <div className="col-sm-9">
                                      <span className="form-control border-0">
                                        {data.partner_since}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">
                                      Status
                                    </label>
                                    <div className="col-sm-9">
                                      <span
                                        className=""
                                        style={{
                                          background: "#66ff33",
                                          borderRadius: "15px",
                                          padding: "5px",
                                          fontSize: "12px",
                                          color: "white",
                                        }}
                                      >
                                        {data.status ? 'Active' : 'Inactive'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row float-right p-3">
                            <Link
                              to="/about/profile-edit/"
                              className="btn btn-grd-disabled mr-2"
                            >
                              <i className="icofont icofont-save"></i> Edit
                            </Link>
                          </div>
                        </div>
                      )}
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
    seller_det: state.seller.seller_det,
    isLoading: state.seller.isLoading,
    loginData: state.login,
  };
};
AboutUsDetails.propTypes = {
  fetchDeatilsSellerList: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { fetchDeatilsSellerList })(
  AboutUsDetails
);

