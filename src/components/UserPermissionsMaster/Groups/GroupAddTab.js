import React from "react";
import { Link } from "react-router-dom";
import GroupAdd from "./GroupAdd";
import Constant from "../../../Constant";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class GroupAddTab extends React.Component {
  state = {
    group_id: "",
  };

  componentDidMount() {
    if (
      this.props.match.params.group_id !== undefined &&
      this.props.match.params.group_id !== null &&
      this.props.match.params.group_id !== 0 &&
      this.props.match.params.group_id !== ""
    ) {
      this.setState({ group_id: this.props.match.params.group_id });
    }
    console.log(this.state.group_id, this.props.match.params.group_id);
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
                      {this.props.match.params.group_id ? "Edit" : "Add"}{" "}
                      Group 
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
                      <Link to="/group/list">Group List</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.group_id ? "Edit" : "Add"}{" "}
                      Group
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
                      <GroupAdd
                        goBack={this.props.history.goBack}
                        group_id={this.props.match.params.group_id}
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

GroupAddTab.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {})(GroupAddTab);
