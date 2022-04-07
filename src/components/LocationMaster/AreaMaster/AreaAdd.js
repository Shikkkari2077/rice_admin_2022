import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pincodeAddOne,fetchstateList ,getOneCityDetails,CityUpdateOne,} from "../../../store/index";
class AreaAdd extends React.Component {
  state = {
    status: "Active",
    description: "desc",
  };

  componentWillMount(){
    console.log('data',this.props.area_id)
    if(this.props.area_id !== undefined){
      console.log('get',this.props.area_id)
      this.getOnepincode(this.props.area_id)
      this.setState({
        area_id:this.props.area_id,
        updating:true
      })
    }
    else{
      console.log('notget')
    }
    this.getStateList()
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.city_det)
    this.setState({
     name:nextProps.city_det.name,
     stateId:nextProps.city_det.State?nextProps.city_det.State.id:'',
     status:nextProps.city_det.status
    })
  }

  getOnepincode(id){
    this.props.getOneCityDetails(id)
  }
   getStateList() {
     this.props.fetchstateList();
   }
   handleChange = (event) => {
     this.setState({ [event.target.name]: event.target.value });
   };
 
   onSaveData = () => {
     const stateId = this.state.stateId
     const name= this.state.name
     const status=this.state.status
     console.log(name,stateId)
     this.props.pincodeAddOne(name,stateId,status)
   };
   updateStateData=()=>{
       const name= this.state.name
       const stateId=this.state.stateId
       const cityId= this.props.area_id
       const status=this.state.status
       this.props.CityUpdateOne(cityId,name,stateId,status)
   }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Area Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Area Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Pincode</label>
                <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    placeholder="Pincode"
                    onChange={this.handleChange}
                    value={this.state.pincode}
                  />
                </div>
                
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Select City
                </label>
                <div className="col-sm-9">
                  <select
                    name="governateId"
                    className="form-control form-control-inverse"
                    onChange={this.handleChange}
                    value={this.state.cityId}
                  >
                    <option value="">Select State</option>
                    {this.state.State_data !== undefined &&
                    this.state.State_data !== null &&
                    this.state.State_data !== [] &&
                    this.state.State_data.length > 0
                      ? this.state.State_data.map((State_data) => (
                          <option
                            value={State_data.id}
                            key={State_data.id}
                          >
                            {State_data.name}
                          </option>
                        ))
                      : null}
                  </select>
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
                      <option>Select</option>
                      <option value={true}>Active</option>
                      <option value={false}>InActive</option>
                    </select>
                  </div>
                </div>
              </div>
            
          </div>
          <div className="row float-right p-3">
            {this.state.isSaving ? (
              <button className="btn btn-grd-disabled mr-2" disabled>
                Saving...!
              </button>
            ) : (
              <button
                onClick={this.onSaveData}
                className="btn btn-grd-disabled mr-2"
              >
                <i className="icofont icofont-save"></i> Save
              </button>
            )}
            <Link to={"/area"} className="btn btn-outline-dark">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city_res: state.city.city_res,
    city_det:state.city.city_det,
    state_list: state.state.state_list,
    isAdded: state.city.isAdded,
    error: state.city.error,
  };
};


export default connect(mapStateToProps, { pincodeAddOne ,fetchstateList,getOneCityDetails,CityUpdateOne})(AreaAdd);
