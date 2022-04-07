import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";
import { CountryAddOne ,getDetails,updateCountry} from "../../../store/index";


class CountryAdd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "true",
      data:this.props.country,
      name:null,
      currency:null
    };
  } 
  
  componentWillMount(props){
    if(this.props.country_id !== undefined){
      console.log('get',this.props.country_id)
      this.setState({
        country_id:this.props.country_id,
        updating:true
      })
      this.props.getDetails(this.props.country_id)
    }
    else{
      console.log('notget')
    }
  }
  componentWillReceiveProps(nextProps){
   console.log(nextProps.country)
   this.setState({
    data:nextProps.country,
    status:nextProps.country.status,
    name:nextProps.country.name,
    currency:nextProps.country.currency
   })
   console.log('data',this.state.data)
 }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  updateCountryData = () => {
      const countryId= this.props.country_id
      const name= this.state.name
      const status= this.state.status
      const currency= this.state.currency
    this.props.updateCountry(countryId,name,currency,status)
  }
 
  onSaveData = () => {
    const name=this.state.name
    const currency=this.state.currency
    const status= this.state.status
    this.props.CountryAddOne(name,currency,status)
    
  };
  render() {
    return (
      <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Country</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Country"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Currency</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="currency"
                    placeholder="Currency"
                    onChange={this.handleChange}
                    value={this.state.currency}
                  />
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
          </div> */}

          <div className="card-footer">
            <div className="row">
              <div className="text-right col-6 offset-6">
                <Link to="/country" className="btn btn-outline-secondary">
                  <i className="icofont icofont-rounded-double-left"></i>
                  Back
                </Link>
                {this.props.country_id ?
                  <button
                    onClick={this.updateCountryData}
                    className="btn hor-grd btn-grd-inverse offset-1"
                  >
                   Update
                  </button>:
                   !this.props.isAdding ? (
                  <button
                    onClick={this.onSaveData}
                    className="btn hor-grd btn-grd-inverse offset-1"
                  >
                   Save
                  </button>
                ): (
                  <button
                    className="btn hor-grd btn-grd-inverse offset-1"
                    disabled
                  >
                    Saving...!
                  </button>
                )  }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    country_res: state.country.country_res,
    loginData: state.login,
    country:state.country.country_det,
    isAdding: state.country.isAdding,
    isLoading: state.country.isLoading,
  };
};
CountryAdd.propTypes = {
  CountryAddOne: PropTypes.func.isRequired,
  CountryEdit:PropTypes.func.isRequired,
  getDetails:PropTypes.func.isRequired
};

export default connect(mapStateToProps, { CountryAddOne,getDetails ,updateCountry})(CountryAdd);