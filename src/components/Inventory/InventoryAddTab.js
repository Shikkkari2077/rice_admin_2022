import React from "react";
import { Link } from "react-router-dom";
// import Constant from "../../Constant";
import InventoryAdd from "./InventoryAdd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class InventoryAddTab extends React.Component {
  state = {};

  componentDidMount() {
    if (
      this.props.match.params.seller_product_id !== undefined &&
      this.props.match.params.seller_product_id !== null &&
      this.props.match.params.seller_product_id !== 0 &&
      this.props.match.params.seller_product_id !== ""
    ) {
      this.setState({ seller_product_id: this.props.match.params.seller_product_id });
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
                      {this.props.match.params.product_id ? "Edit" : "Add"}{" "}
                      Inventory 
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
                      <Link to="/seller">Inventory </Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.product_id ? "Edit" : "Add"}{" "}
                      Inventory 
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
                    
                          <InventoryAdd
                            language_id={this.state.language_id}
                            goBack={this.props.history.goBack}
                            product_id={this.props.match.params.product_id}
                          />
                       
                   
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
    error:state.error
  };
};

InventoryAddTab.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {  })(InventoryAddTab);

