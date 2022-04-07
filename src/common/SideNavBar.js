import React from "react";
import SuperAdminSideNavBar from "./SideNavBar/ForSuperAdmin";
import ForVendorSideNavBar from "./SideNavBar/ForVendor";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getUsers} from '../store/index'
class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.loginData);
  }
  render() {
    return localStorage.getItem('role') === "seller" ? (
      <ForVendorSideNavBar />
    ) : localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "other" ? (
      <SuperAdminSideNavBar />
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    loginData: state.login,
  };
};
SideNavBar.propTypes = {
  login: PropTypes.object.isRequired,
  getUsers:PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getUsers})(SideNavBar);
