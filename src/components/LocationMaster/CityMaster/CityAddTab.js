import React from "react";
import { Link } from "react-router-dom";
import Addcity from "./CityAdd";

class CityAddTab extends React.Component {
 

  componentDidMount() {
    if (this.props.match.params.city_id !== undefined &&
      this.props.match.params.city_id !== null &&
      this.props.match.params.city_id !== 0 &&
      this.props.match.params.city_id !== '') {
      this.setState({ city_id: this.props.match.params.city_id })
      console.log(this.props.match.params.city_id)
    }
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
                    <h4>{this.props.match.params.city_id ? "Edit" : "Add"}{" "} City</h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="page-header-breadcrumb">
                  <ul className="breadcrumb-title">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="feather icon-home"></i> </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/city">
                        City</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.city_id ? "Edit" : "Add"}{" "} City
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
                            <Addcity
                              goBack={this.props.history.goBack}
                              city_id={this.props.match.params.city_id} />
                  
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

export default CityAddTab;
