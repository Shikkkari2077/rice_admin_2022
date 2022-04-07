import React from "react";
import { Link } from "react-router-dom";
import Addcountry from "./CountryAdd";
import Swal from "sweetalert2";
import Constant from "../../../Constant.js";

class CountryAddTab extends React.Component {
  state = { country_id: "" };

  componentDidMount() {
    if (
      this.props.match.params.country_id !== undefined &&
      this.props.match.params.country_id !== null &&
      this.props.match.params.country_id !== 0 &&
      this.props.match.params.country_id !== ""
    ) {
      this.setState({ country_id: this.props.match.params.country_id });
    }
    console.log(this.state.country_id,this.props.match.params.country_id);
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
                      {this.props.match.params.country_id ? "Edit" : "Add"}{" "}
                      Country
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
                      <Link to="/country">Country</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.country_id ? "Edit" : "Add"}{" "}
                      Country
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
                      <Addcountry
                        goBack={this.props.history.goBack}
                        country_id={this.props.match.params.country_id}
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

export default CountryAddTab;
