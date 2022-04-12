import React from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { getUsers } from "../store/index.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Recaptcha from "react-google-invisible-recaptcha";


class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "superAdmin",
      isVerifed: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    // this.onResetPassword = this.onResetPassword.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.onResolved = this.onResolved.bind(this);
  }

  componentDidMount() {
    // if (this.props.isAuthUser === true) {
    //   this.props.history.push("#/");
    //   console.log("yes");
    //   localStorage.setItem("prev", true);
    // } else {
    //   // localStorage.setItem("user",false)
    //   console.log("no");
    // }
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

  onResetPassword(event) {
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
          //   title: "ResetPassword Successfully",
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
    //     title: "ResetPassword Successfully",
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
    //         title: "ResetPassword Successfully",
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
  onsucess = () => {
    // Swal.fire({
    //   title: "ResetPassword Successfully",
    //   icon: "success",
    //   text: "",
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Ok",
    // });
    // // window.location.href = "/dashboard";
    // window.location.reload();
  };

  render() {
    return (
      <section className="ResetPassword-block">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form className="md-float-material form-material">
                <div className="text-center">
                  <img
                    src="./assets/images/logo.png"
                    alt="Ricelink"
                    className="img_logo_shadow"
                  />
                </div>
                <div className="auth-box card card_ResetPassword_shadow">
                  <div className="card-block">
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
                        value={'seller'}
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Super Admin</option>
                        <option value="seller">Retailer</option>
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
                    <div className="form-group form-primary">
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        className="form-control"
                        placeholder="Password"
                        onChange={this.onInputChange}
                      />
                      <span className="form-bar"></span>
                    </div>
                    <div className="row m-t-30">
                      <div className="col-md-12">
                        <button
                          type="button"
                          onClick={this.onResetPassword}
                          className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                          // disabled={this.props.isLoading}
                        >
                          Sign in
                        </button>
                        <Link style={{background:'transparent',border:'none',color:'white'}}>
                           Forget Password ?
                        </Link>
                        {/* {this.props.ResetPasswordData.isAuthUser
                          ? this.onsucess()
                          : null} */}
                        <Recaptcha
                          ref={(ref) => (this.recaptcha = ref)}
                          sitekey="6LcNfuwZAAAAAOTgLOq5E2v7eMRBGYVHR7gWUOTB"
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
    // ResetPasswordData: state.ResetPassword,
    // isLoading: state.ResetPassword.isLoading,
    // isAuthUser: state.ResetPassword.isAuthUser,
  };
};
// ResetPassword.propTypes = {
//   getUsers: PropTypes.func.isRequired,
//   ResetPassword: PropTypes.object.isRequired,
// };

export default connect(mapStateToProps, {  })(ResetPassword);
