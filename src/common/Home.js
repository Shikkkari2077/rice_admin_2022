import React from "react";
import Header from "./Header";
import SideNavBar from "./SideNavBar";
import { connect } from "react-redux";
import { getUsers,logoutUser } from "../store/index.js";
import PropTypes from "prop-types";
import Features from './UiPermissionsControl'
import { LaptopWindows } from "@material-ui/icons";
class Home extends React.Component {
  
  componentDidMount(){
    if(!localStorage.getItem('superadmin_auth')){
      if(!localStorage.getItem('seller_auth')){
        this.props.logoutUser();
        //window.location.href = "#/"
      }
      // this.props.logoutUser();
    }
  }
 
  componentDidMount(){
  }
  handleReload(){
      if(localStorage.getItem('reload')=='true')
      {
        localStorage.setItem('reload',false)
        window.location.reload()
      }
  }
 
  render() {
    return (
      <div id="pcoded" className="pcoded">
        <div className="pcoded-overlay-box"></div>
        <div className="pcoded-container navbar-wrapper">
          <Header />
          <Features 
          reload={this.handleReload()}

          />
           
          {localStorage.getItem("role") ? (
            
            <div className="pcoded-main-container">
              <div className="pcoded-wrapper">
                <SideNavBar />
                <div className="pcoded-content" id="admin_content">
                  {this.props.children}
                </div>
              </div>
            </div>
          ) : (
            <div className="pcoded-main-container">{this.props.children}</div>
          )}
        </div>
      </div>
    );
  }
}


Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  users:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  // auth: state.auth,
  users:state.users
});
export default connect(
  mapStateToProps,
  { logoutUser })(Home);

