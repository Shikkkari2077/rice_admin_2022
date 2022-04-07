import React from "react";
import { Link } from "react-router-dom";
import CanReasonAdd from "./CanReasonAdd";
import Constant from "../../Constant";

class CanReasonAddTab extends React.Component {
  state = {};

  componentDidMount() {
    if (
      this.props.match.params.cancResaon_id !== undefined &&
      this.props.match.params.cancResaon_id !== null &&
      this.props.match.params.cancResaon_id !== 0 &&
      this.props.match.params.cancResaon_id !== ""
    ) {
      this.setState({ cancResaon_id: this.props.match.params.cancResaon_id });
      console.log(this.props.match.params.cancResaon_id);
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
                    <h4>
                      {this.props.match.params.cancResaon_id ? "Edit" : "Add"}{" "}
                      Cancellation Reason
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
                      <Link to="/cancellation-reason">Cancellation Reason</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {this.props.match.params.cancResaon_id ? "Edit" : "Add"}{" "}
                      Cancellation Reason
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
                      <CanReasonAdd
                        goBack={this.props.history.goBack}
                        cancResaon_id={this.state.cancResaon_id}
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

export default CanReasonAddTab;
