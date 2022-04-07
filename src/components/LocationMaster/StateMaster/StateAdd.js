import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from 'sweetalert2'
import { StateAddOne,fetchCountryList ,getOneStateDetails,StateUpdateOne} from "../../../store/index";
class StateAdd extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      status: "true",
      data:this.props.country,
      name:null,
      CountryId:'',
      State_id:''
    };
  } 

  componentWillMount(){
    console.log('data',this.props.State_id)
    if(this.props.State_id !== undefined){
      console.log('get',this.props.State_id)
      this.getOneState(this.props.State_id)
      this.setState({
        State_id:this.props.State_id,
        updating:true
      })
    }
    else{
      console.log('notget')
    }
    this.getCountryList()
  }
  componentWillReceiveProps(nextProps){
   console.log(nextProps)
   this.setState({
    // data:nextProps.country,
    name:nextProps.state_det.name,
    CountryId:nextProps.state_det.CountryId,
    status:nextProps.state_det.status
   })
 }

 getOneState(id){
   this.props.getOneStateDetails(this.props.State_id)
 }
  getCountryList() {
    this.props.fetchCountryList();
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveData = () => {
    const countryId = this.state.CountryId
    const name= this.state.name
    const status="true"
    console.log(name,countryId)
    if(countryId == undefined || countryId == null ||  countryId == "")
    {   Swal.fire({
      title: "Select Country",
      icon: "warning",
      text: "",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    })}
    else if(name == undefined || name == null ||  name == ""){
      Swal.fire({
        title: "Enter State Name",
        icon: "warning",
        text: "",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      })
    }
    else{
    this.props.StateAddOne(name,countryId,status)
    }
  };
  updateStateData=()=>{
    const countryId= this.state.CountryId
      const name= this.state.name
      const stateId= this.props.State_id
      const status=this.state.status
      if(countryId == undefined || countryId == null ||  countryId == "")
      {   Swal.fire({
        title: "Select Country",
        icon: "warning",
        text: "",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      })}
      else if(name == undefined || name == null ||  name == ""){
        Swal.fire({
          title: "Enter State Name",
          icon: "warning",
          text: "",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        })
      }
      else{
      this.props.StateUpdateOne(countryId,name,stateId,status)
      }
  }
  render() {
    return (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">State Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="State Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            {this.props.State_id !==undefined?null:
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Select Country
                </label>
                <div className="col-sm-9">
                  <select
                    name="CountryId"
                    className="form-control form-control-inverse"
                    onChange={this.handleChange}
                    value={this.state.CountryId}
                  >
                    <option value="opt1">Select Country</option>
                    {this.props.country_list !== undefined &&
                    this.props.country_list !== null &&
                    this.props.country_list !== [] &&
                    this.props.country_list.length > 0
                      ? this.props.country_list.map((country_list) => (
                          <option value={country_list.id} key={country_list.id}>
                            {country_list.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            </div>
      }
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
          </div>
          <div className="row float-right p-1">
          {this.props.State_id ?
                  <button
                    onClick={this.updateStateData}
                    className="btn hor-grd btn-grd-inverse offset-1"
                  >
                   Update
                  </button>:
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
              <Link to={"/State"} className="btn btn-outline-dark">
              Cancel
            </Link> </>
            )}
            {/* <Link to={"/State"} className="btn btn-outline-dark">
              Cancel
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state_res: state.state.state_res,
    state_det:state.state.state_det,
    country_list: state.country.country_list,
    // loginData: state.login,
    isAdded: state.state.isAdded,
    error: state.state.error,
  };
};

StateAdd.propTypes = {
  StateAddOne: PropTypes.func.isRequired,
  fetchCountryList:PropTypes.func.isRequired,
  getOneStateDetails:PropTypes.func.isRequired,
  StateUpdateOne:PropTypes.func.isRequired
};

export default connect(mapStateToProps, { StateAddOne ,fetchCountryList,getOneStateDetails,StateUpdateOne})(StateAdd);

