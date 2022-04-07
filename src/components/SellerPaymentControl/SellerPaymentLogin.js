import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios'
import Swal from 'sweetalert2'
import Constant from '../../Constant'
class SellerPaymentLogin extends React.Component{

    state={
        openReset:false,
        password:"",
    }
    onInputChange(event){
       //console.log(event.target.value)
       this.setState({
           password:event.target.value
       })
    }
    onLogin(password){
        console.log(password)
        axios.post(
          Constant.getAPI() + "/seller/cred/password_match",{password},
          { headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
        )
        .then((res) => {
        console.log(res)
          if(res.data.success== true){
              console.log(res.data.message)
              localStorage.setItem("PaymentLogin",'true')

            Swal.fire({
              title: "Confirmed",
              icon: "success",
              text: "",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then(value=>{
              if(value){
               window.location.href = "#/SellerPaytmControl/list";
              //window.location.reload();
            }  })
          }


    }).catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Invalid Credentials",
          icon: "error",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        }).then(value =>{
      window.location.reload();
        })
      });
}

    render(){
        return(
            <section className="login-block" >
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <form className="md-float-material form-material">
                    <div className="text-center">
                      <img
                        src="./assets/images/logo.png"
                        alt="Online Orders"
                        className="img_logo_shadow"
                      />
                    </div>
                    <div className="auth-box card card_login_shadow">
                      <div className="card-block">
                       
                          <>
                            <div className="row m-b-20">
                              <div className="col-md-12">
                                <h3
                                  className="text-center"
                                  style={{ color: "#c11d2f" }}
                                >
                                  Confirm Password
                                </h3>
                              </div>
                            </div>
                            <div className="form-group form-primary">
                            <div className="form-group form-primary">
                          <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            className="form-control"
                            placeholder="Password"
                            onChange={this.onInputChange.bind(this)}
                          />
                          <span className="form-bar"></span>
                        </div>
                              <span className="form-bar"></span>
                            </div>
                          </>
                         
                      
                       
                        <div className="row m-t-30">
                          <div className="col-md-12">
                           
                              <button
                                type="button"
                                onClick={this.onLogin.bind(this,this.state.password)}
                                className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                                // disabled={this.props.isLoading}
                              >
                                Confirm
                              </button>
                            
                           
                            {this.props.error
                              ? this.onsucess(this.props.error)
                              : null}
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
     
      isLoading: state.login.isLoading,
      isAuthUser: state.login.isAuthUser,
      error: state.login.error,
    };
  };
  SellerPaymentLogin.propTypes = {
  
    login: PropTypes.object.isRequired,
  };
  
  export default connect(mapStateToProps, {
  
  })(SellerPaymentLogin);