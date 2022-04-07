import React from "react";
import { Link } from "react-router-dom";
import DeliveryBoyAdd from "./DeliveryBoyAdd";
import Constant from "../../Constant";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class DeliveryBoyAddTab extends React.Component {
  state = {
    deliveryboy_id: "",
  };

  componentDidMount() {
    if (
      this.props.match.params.deliveryboy_id !== undefined &&
      this.props.match.params.deliveryboy_id !== null &&
      this.props.match.params.deliveryboy_id !== 0 &&
      this.props.match.params.deliveryboy_id !== ""
    ) {
      this.setState({ deliveryboy_id: this.props.match.params.deliveryboy_id });
    }
    console.log(
      this.state.deliveryboy_id,
      this.props.match.params.deliveryboy_id
    );
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
                      {this.props.match.params.deliveryboy_id ? "Edit" : "Add"}{" "}
                      Delivery Person
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
                      <Link to="/delivery-boy-list">Delivery Person</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.deliveryboy_id ? "Edit" : "Add"}{" "}
                      Delivery Person
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
                  <div className="tab-pane  active"
                      role="tabpanel" aria-labelledby="">
                      
                    {this.props.match.params.deliveryboy_id !== undefined &&
                      this.props.match.params.deliveryboy_id !== null &&
                      this.props.match.params.deliveryboy_id !== 0 &&
                      this.props.match.params.deliveryboy_id !== "" ? (
                      <DeliveryBoyAdd
                        goBack={this.props.history.goBack}
                        deliveryboy_id={this.props.match.params.deliveryboy_id}
                      />
                    ) : (
                      <DeliveryBoyAdd goBack={this.props.history.goBack} />
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
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

DeliveryBoyAddTab.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(DeliveryBoyAddTab);
