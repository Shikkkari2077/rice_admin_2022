/* eslint-disable no-unused-vars */
import React from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import {
  getUsers,
  getforgetSeller,
  getpasswordSetSeller,
  logoutUser,
} from "../store/index.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Recaptcha from "react-google-invisible-recaptcha";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      isVerifed: false,
      openReset: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.onResolved = this.onResolved.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthUser === true) {
      this.props.history.push("#/");
      console.log("yes");
      localStorage.setItem("prev", true);
    } else {
      // localStorage.setItem("user",false)
      console.log("no");
    }
  }
  onResolved = () => {
    this.setState({
      isVerifed: true,
    });
  };
  verifyCallback = (response) => {
    // Here you will get the final recaptchaToken!!!
    console.log(response, "<= your recaptcha token");
  };

  recaptchaLoaded = () => {
    // you will get a new token in verifyCallback

    this.recaptcha.execute();
    console.log("your recaptcha token");
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onLogin(event) {
    event.preventDefault();
    if (!this.state.isVerifed) {
      Swal.fire({
        title: "Recaptcha Verification Failed",
        icon: "error",
        text: "",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });
      window.location.reload();
    } else {
      const username = this.state.username,
        password = this.state.password,
        role = this.state.role;
      if (
        username !== "" &&
        password !== "" &&
        username !== null &&
        password !== null &&
        username !== undefined &&
        password !== undefined
      ) {
        this.props.getUsers(username, password, role);
        // if (!res) {
        // Swal.fire({
        //   title: "Login Successfully",
        //   icon: "success",
        //   text: "",
        //   confirmButtonColor: "#3085d6",
        //   cancelButtonColor: "#d33",
        //   confirmButtonText: "Ok",
        // });
        // window.location.href = "/";
        // window.location.reload();
        // window.location.href = "#/";
        // window.location.reload();
        // }
      } else {
        Swal.fire({
          title: "Enter the Credentials",
          icon: "error",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
        window.location.reload();
      }
    }
    // if (this.props.isAuthUser) {
    //   Swal.fire({
    //     title: "Login Successfully",
    //     icon: "success",
    //     text: "",
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Ok",
    //   });
    //    window.location.href = "#/";
    //   window.location.reload();
    // } else {
    //   Swal.fire({
    //     title: "Incorrect Credentials",
    //     icon: "error",
    //     text: "",
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Ok",
    //   });
    //   window.location.reload();
    // }
    //   if (this.props.isAuthUser === true) {
    //     // if (!localStorage.getItem("role")) {
    //       Swal.fire({
    //         title: "Login Successfully",
    //         icon: "success",
    //         text: "",
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Ok",
    //       });
    //     }
    //   }else {

    //       Swal.fire({
    //         title: "Incorrect Credentials",
    //         icon: "error",
    //         text: "",
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Ok",
    //       });
    //       // window.location.href = "#/";
    //       window.location.reload();
    //     }
    //   }
    // // else {
    // //   Swal.fire({
    // //     title: "Enter the Credentials",
    // //     icon: "error",
    // //     text: "",
    // //     confirmButtonColor: "#3085d6",
    // //     cancelButtonColor: "#d33",
    // //     confirmButtonText: "Ok",
    // //   });
    // //   // window.location.href = "/dashboard";
    // }
  }
  onReset = (e) => {
    e.preventDefault();
    const username = this.state.username;
    console.log(username);
    this.props.getforgetSeller(username);
  };
  onresetPassword = (e) => {
    e.preventDefault();
    const password = this.state.password;
    this.props.getpasswordSetSeller(password);
  };
  onsucess = (data) => {
    console.log(data);
    Swal.fire({
      title: "wrong ",
      icon: "wrong",
      text: "",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
    // window.location.href = "/dashboard";
    window.location.reload();
  };

  render() {
    return (
      <section className="login-block">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form className="md-float-material form-material">
                <div className="text-center">
                  <img
                    src="./PNG.jpg"
                    alt="Ricelink"
                    className="img_logo_shadow"
                    style={{height:"12vh"}}
                  />
                </div>
                <div className="auth-box card card_login_shadow">
                  <div className="card-block">
                    {this.state.openReset === false ? (
                      <>
                        <div className="row m-b-20">
                          <div className="col-md-12">
                            <h3
                              className="text-center"
                              style={{ color: "#c11d2f" }}
                            >
                              Sign In
                            </h3>
                          </div>
                        </div>
                        <div className="form-group form-primary">
                          <select
                            name="role"
                            className="form-control"
                            onChange={this.onInputChange}
                            value={this.state.role}
                          >
                            <option value=""> - Select Role - </option>
                            <option value="admin">Super Admin</option>
                            {/* <option value="other">Ho Admin</option>
                            <option value="zonal">Zonal Admin</option> */}
                            <option value="seller">Seller</option>
                            
                          </select>
                        </div>
                        <div className="form-group form-primary">
                          <input
                            type="email"
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            placeholder="Username"
                            onChange={this.onInputChange}
                          />
                          <span className="form-bar"></span>
                        </div>
                        <div className="form-group form-primary">
                          <input
                                             name="password"
                            value={this.state.password}
                            className="form-control"
                            placeholder="Password"
                            onChange={this.onInputChange}
                          />
                          <span className="form-bar"></span>
                        </div>
                      </>
                    ) : localStorage.getItem("seller_token") ? (
                      <>
                        <div className="row m-b-20">
                          <div className="col-md-12">
                            <h3
                              className="text-center"
                              style={{ color: "#c11d2f" }}
                            >
                              Reset Password
                            </h3>
                          </div>
                        </div>
                        <div className="form-group form-primary"></div>
                        <div className="form-group form-primary">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.onInputChange}
                          />
                          <span className="form-bar"></span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row m-b-20">
                          <div className="col-md-12">
                            <h3
                              className="text-center"
                              style={{ color: "#c11d2f" }}
                            >
                              Forget Password
                            </h3>
                          </div>
                        </div>
                        <div className="form-group form-primary">
                          <select
                            name="role"
                            className="form-control"
                            onChange={this.onInputChange}
                            value={this.state.role}
                          >
                            <option value=""> - Select Role - </option>
                            <option value="admin">Super Admin</option>
                            <option value="seller">Seller</option>
                            <option value="hoAdmin">HO Admin</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="form-group form-primary">
                          <input
                            type="email"
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            placeholder="Username"
                            onChange={this.onInputChange}
                          />
                          <span className="form-bar"></span>
                        </div>
                      </>
                    )}
                    <div className="row m-t-30">
                      <div className="col-md-12">
                        {this.state.openReset ? (
                          localStorage.getItem("seller_token") ? (
                            <button
                              type="button"
                              onClick={this.onresetPassword}
                              className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                              // disabled={this.props.isLoading}
                            >
                              Reset Password
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={this.onReset}
                              className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                              // disabled={this.props.isLoading}
                            >
                              Verify
                            </button>
                          )
                        ) : (
                          <button
                            type="button"
                            onClick={this.onLogin}
                            className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                            // disabled={this.props.isLoading}
                          >
                            Sign in
                          </button>
                        )}
                        <p
                          onClick={() => {
                            this.setState({ openReset: true });
                          }}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                          }}
                        >
                          Forget Password ?
                        </p>
                        {this.props.error
                          ? this.onsucess(this.props.error)
                          : null}
                        <Recaptcha
                          
                          ref={(ref) => (this.recaptcha = ref)}
                          //testing
                          //  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                          //localhost
                          sitekey="6LcM9qAaAAAAAME2D3149oSnHOdMgxUJjhpdF0sU"
                          //imanaged
                         // sitekey="6LdxXqIaAAAAAGqyGKyPsj8pWuQbZYMHnPgqt5Uk"

                          onloadCallback={this.recaptchaLoaded}
                          onResolved={this.onResolved}
                          onLoaded={this.recaptchaLoaded}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginData: state.login,
    isLoading: state.login.isLoading,
    isAuthUser: state.login.isAuthUser,
    error: state.login.error,
    sellerToken: state.login.token,
  };
};
Login.propTypes = {
  getforgetSeller: PropTypes.func.isRequired,
  getpasswordSetSeller: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getUsers,
  getforgetSeller,
  getpasswordSetSeller,
  logoutUser,
})(Login);
