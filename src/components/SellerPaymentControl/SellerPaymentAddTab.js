import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SellerPaymentAdd from "./SellerPaymentAdd";
class SellerPaymentAddTab extends React.Component {
  state = {
    seller_pay_id: "",
  };

  componentDidMount() {
    if (
      this.props.match.params.seller_pay_id !== undefined &&
      this.props.match.params.seller_pay_id !== null &&
      this.props.match.params.seller_pay_id !== 0 &&
      this.props.match.params.seller_pay_id !== ""
    ) {
      this.setState({ seller_pay_id: this.props.match.params.seller_pay_id });
    }
    console.log(this.state.seller_pay_id, this.props.match.params.seller_pay_id);
  }
 
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
                      {this.props.match.params.seller_pay_id ? "Edit" : "Add"}{" "}
                      Payment Information
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
                      <Link to="/SellerPaytmControl/list">Online Pay Manage</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.seller_pay_id ? "Edit" : "Add"}{" "}
                      Payment Information
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
                        {this.props.match.params.seller_pay_id !== undefined &&
                        this.props.match.params.seller_pay_id !== null  ?
                      <SellerPaymentAdd
                        goBack={this.props.history.goBack}
                        seller_pay_id={this.props.match.params.seller_pay_id}/>
                        :
                        <SellerPaymentAdd
                        goBack={this.props.history.goBack}
                       />
                    
                    }
                      
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

SellerPaymentAddTab.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(SellerPaymentAddTab);
