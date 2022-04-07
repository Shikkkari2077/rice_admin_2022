import React from "react";
import { Link } from "react-router-dom";
import UserCreationAdd from "./UserCreationAdd";
import Constant from "../../../Constant";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class UserCreationAddTab extends React.Component {
  state = {
    user_id: "",
  };

  componentDidMount() {
    if (
      this.props.match.params.user_id !== undefined &&
      this.props.match.params.user_id !== null &&
      this.props.match.params.user_id !== 0 &&
      this.props.match.params.user_id !== ""
    ) {
      this.setState({ user_id: this.props.match.params.user_id });
    }
    console.log(this.state.user_id, this.props.match.params.user_id);
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
                      {this.props.match.params.user_id ? "Edit" : "Add"}{" "}
                      User 
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
                      <Link to="/user/list">User List</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.user_id ? "Edit" : "Add"}{" "}
                      User
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
                      <UserCreationAdd
                        goBack={this.props.history.goBack}
                        user_id={this.props.match.params.user_id}
                      />
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

UserCreationAddTab.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(UserCreationAddTab);
