import React from "react";
import { Link } from "react-router-dom";
import AddState from "./StateAdd";
import Constant from "../../../Constant.js";

class StateAddTab extends React.Component {
  state = {
    language_data: [],
    State_id: "",
  };

  componentDidMount() {
    if (
      this.props.match.params.State_id !== undefined &&
      this.props.match.params.State_id !== null &&
      this.props.match.params.State_id !== 0 &&
      this.props.match.params.State_id !== ""
    )  {
      this.setState({ State_id: this.props.match.params.State_id });
    }
    console.log(this.state.State_id,this.props.match.params.State_id);

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
                      {this.props.match.params.State_id ? "Edit" : "Add"} State
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
                      <Link to="/State">State</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.State_id ? "Edit" : "Add"} State
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
                      <AddState
                        language_id={this.state.language_id}
                        goBack={this.props.history.goBack}
                        State_id={this.props.match.params.State_id}
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

export default StateAddTab;
