import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {addReasonsList,getCancReasonDetails,updateReasonsList} from '../../store/index'

class CanReasonAdd extends React.Component {
  state = {
    status: "",
    reason:'',
    priority:'',
    cancResaon_id:''

  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cancResaon_id !== this.props.cancResaon_id) {
      this.setState({ cancResaon_id: this.props.cancResaon_id });
      this.getDetails(this.props.cancResaon_id)
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSaveData=(e)=>{
    const  status= this.state.status
    const reason=this.state.reason
    const priority=this.state.priority
    this.props.addReasonsList(reason,priority)
  }
  getDetails=(id)=>{
    this.props.getCancReasonDetails(id)
  }
  componentWillReceiveProps(nextProps){
    console.log('hello',nextProps.reasons_det)
    this.setState({
      priority:nextProps.reasons_det[0] ?  nextProps.reasons_det[0].priority:'',
      reason:nextProps.reasons_det[0] ?  nextProps.reasons_det[0].reason:''
    })
    console.log('data',this.state.data)
  }
  update=()=>{
    const id =this.props.cancResaon_id
    const  status= this.state.status
    const reason=this.state.reason
    const priority=this.state.priority
    this.props.updateReasonsList(id,reason,priority,status)
  }
  render() {
    console.log(this.props.reason_det)
    return (
      <div className="">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                Reason
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="reason"
                      id="reason"
                      placeholder="Cancellation Reason"
                      onChange={this.handleChange}
                      value={this.state.reason}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Priority</label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control"
                        name="priority"
                        id="priority"
                        placeholder="Priority"
                        onChange={this.handleChange}
                        value={this.state.priority}
                      />
                    </div>
                  </div>
                </div>

             <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Status</label>
                  <div className="col-sm-9">
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option value={true}>
                        Active
                      </option>
                      <option value={false}>
                        InActive
                      </option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <ReactQuill
                    value={this.state.description}
                    onChange={this.onHandleDescriptionChange}
                    style={{ height: "200px", marginBottom: '5%' }}
                  />
                </div>
              </div>
            </div>
          </div>
          */}
            <div className="card-footer">
              <div className="row float-right p-3">
                {this.state.isLoading ? (
                  <button className="btn btn-grd-disabled mr-2" disabled>
                    Saving...!
                  </button>
                ) : (
                  this.props.cancResaon_id?
                  <button
                    onClick={this.update}
                    className="btn btn-grd-disabled mr-2"
                  >
                 Update
                  </button>
                  :<button
                    onClick={this.onSaveData}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>

                )}
                <Link to={"/cancellation-resaon"} className="btn btn-outline-dark">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.reason.isLoading,
    error: state.error,
    reason: state.reason.reasons_res,
    reasons_det: state.reason.reasons_det,
  };
};


CanReasonAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getCancReasonDetails:PropTypes.func.isRequired,
  updateReasonsList:PropTypes.func.isRequired,
  addReasonsList: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { addReasonsList,getCancReasonDetails,updateReasonsList })(
  CanReasonAdd
);
