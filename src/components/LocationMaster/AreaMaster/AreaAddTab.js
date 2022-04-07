import React from "react";
import { Link } from "react-router-dom";
import Addarea from "./AreaAdd";
import Constant from "../../../Constant.js";

class AreaAddTab extends React.Component {
  state = {
    language_data: []
  };

  componentDidMount() {
    if (this.props.match.params.area_id !== undefined && this.props.match.params.area_id !== null && this.props.match.params.area_id !== 0 && this.props.match.params.area_id !== '') {
      this.setState({ area_id: this.props.match.params.area_id })
      console.log(this.props.match.params.area_id)
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
                    <h4>{this.props.match.params.area_id ? "Edit" : "Add"}{" "} Area</h4>
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
                      <Link to="/area">
                        Area</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.area_id ? "Edit" : "Add"}{" "} Area
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
                            <Addarea goBack={this.props.history.goBack}
                              area_id={this.props.match.params} />
                      
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

export default AreaAddTab;
