import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CityAddOne,fetchCountryList ,getOneCityDetails,CityUpdateOne,fetchstateList} from "../../../store/index";

import Swal from 'sweetalert2'
class CityAdd extends React.Component {
  state = {
    status: "true",
    category_list: [{}],
  };

  componentWillMount(){
    console.log('data',this.props.city_id)
    if(this.props.city_id !== undefined){
      console.log('get',this.props.city_id)
      this.getOneCity(this.props.city_id)
      this.setState({
        city_id:this.props.city_id,
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

  getOneCity(id){
    this.props.getOneCityDetails(id)
  }
   getStateList() {
     this.props.fetchstateList();
   }
  //  handleChange = (event) => {
  //    this.setState({ [event.target.name]: event.target.value });
  //    console.log( [event.target.name], event.target.value)
  //  };
 
   onSaveData = () => {
     const stateId = this.state.stateId
     const name= this.state.name
     const status="true"
     console.log(name,stateId)

     if(stateId == undefined || stateId == null ||  stateId == "")
     {   Swal.fire({
       title: "Select State",
       icon: "warning",
       text: "",
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Ok",
     })}
     else if(name == undefined || name == null ||  name == ""){
       Swal.fire({
         title: "Enter City Name",
         icon: "warning",
         text: "",
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Ok",
       })
     }
     else{
     this.props.CityAddOne(name,stateId,status)
     }
   };
   updateStateData=()=>{
       const name= this.state.name
       const stateId=this.state.stateId
       const cityId= this.props.city_id
       const status="true"
       this.props.CityUpdateOne(cityId,name,stateId,status)
   }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log( [event.target.name], event.target.value)
  };


  render() {
    return (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">City Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="City Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Select State
                </label>
                <div className="col-sm-9">
                  <select
                    name="stateId"
                    id="stateId"
                    className="form-control form-control-inverse"
                    onChange={this.handleChange}
                    value={this.state.stateId}
                  >
                    <option value="opt1">Select State</option>
                    {this.props.state_list !== undefined &&
                    this.props.state_list !== null &&
                    this.props.state_list !== [] &&
                    this.props.state_list.length > 0
                      ? this.props.state_list.map((d) => (
                          <option value={d.id} key={d.id}>
                            {d.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
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
              </div> */}
            
            {/* <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon4">Select Country</span>
                <select name="select" className="form-control form-control-inverse">
                  <option value="opt1">Select Country</option>
                  <option value="opt2">India</option>
                  <option value="opt3">Kuwait</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon4">Select State</span>
                <select name="select" className="form-control form-control-inverse">
                  <option value="opt1">Select State</option>
                  <option value="opt2">Asimah</option>
                  <option value="opt3">Farwaniyah</option>
                  <option value="opt3">Hawalli</option>

                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon4">Status</span>
                <select name="status" className="form-control" value={this.state.status} onChange={this.handleChange}>
                  <option value="active" name="active">Active</option>
                  <option value="inactive" name="inactive">Inactive</option>
                </select>
              </div>
            </div>
           */}
          </div>
          <div className="row float-right p-1">
          {this.props.city_id ?<>
                  <button
                    onClick={this.updateStateData}
                    className="btn hor-grd btn-grd-inverse mr-2" 
                  >
                   Update
                  </button>
                  <Link to={"/city"} className="btn btn-outline-dark">
              Cancel
            </Link></>:
                  this.props.isAdded ? (
              <button className="btn btn-grd-disabled mr-2" disabled>
                Saving...!
              </button>
            ) : (
              <>
              <button
                onClick={this.onSaveData}
                className="btn btn-grd-disabled mr-2"
              >
                <i className="icofont icofont-save"></i> Save
              </button>
              <Link to={"/city"} className="btn btn-outline-dark">
              Cancel
            </Link>
               </>
            )}
           
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
    // country_list: state.country.country_list,
    state_list: state.state.state_list,
    // loginData: state.login,
    isAdded: state.city.isAdded,
    error: state.city.error,
  };
};


export default connect(mapStateToProps, { CityAddOne ,fetchCountryList,getOneCityDetails,CityUpdateOne,fetchstateList})(CityAdd);
