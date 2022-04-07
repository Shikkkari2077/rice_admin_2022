import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../../Constant";
// import ReactQuill from "react-quill";
// import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";

import { groupAdd,groupupdate ,fetchGroups} from "../../../store/index";

class GroupAdd extends React.Component {
  state = {
    isLoading:false,
    imageChanged:false,
  };
  componentWillMount(props){
    if(this.props.group_id !== undefined){
      console.log('get',this.props.group_id)
      this.setState({
        group_id:this.props.group_id,
        updating:true
      })
       this.props.fetchGroups(this.props.group_id)
    }
    else{
      console.log('notget')
    }
  }
  componentWillReceiveProps(nextProps){
 console.log(nextProps)
 if(nextProps.Groups !== undefined){
  this.setState({
    name:nextProps.Groups[0].name
  })
}
 }
 
 
 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
     console.log(this.state.name,this.state.level)
     this.props.groupAdd(
       this.state.name,
      //  this.state.level
       )
  };
  updateCategoryData=()=>{
    this.setState({
      isLoading:true
    })
    this.props.groupupdate(
      this.props.group_id,this.state.name
    
      )
    console.log('updating')
  
  }
 
  
  customFilter(option, searchText) {
    //console.log(option)
  if (
    option.data.name.toLowerCase().includes(searchText.toLowerCase())
  ) {
    return true;
  } else {
    return false;
  }
}
  render() {
    const customStyles = {
        root: {
          background: "red",
          height: "20px",
        },
      };
    return (
      <div className="">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Group Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="name"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.name}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Group Level
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="level"
                      placeholder="level"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.level}
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Group Code
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      placeholder="group code"
                      onChange={this.handleChange}
                      value={this.state.code}
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Max Users
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="users"
                      placeholder="No. of Users"
                      onChange={this.handleChange}
                      value={this.state.users}
                    />
                  </div>
                </div>
              </div> */}

            
             


             

              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Category 
                  </label>
                 <div className="col-sm-9">
                  <Select      
                       className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               //onChange={this.handleSeller.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                            //    isOptionSelected={(option) =>
                            //      this.state.sellerArray.includes(option.id) 
                            //        ? true
                            //        : false
                            //    }
                               //options={}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Category"}
                               isMulti
                            /> 
                  </div>
                   </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Sub-category 
                  </label>
                 <div className="col-sm-9">
                  <Select      
                       className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               //onChange={this.handleSeller.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                            //    isOptionSelected={(option) =>
                            //      this.state.sellerArray.includes(option.id) 
                            //        ? true
                            //        : false
                            //    }
                               //options={}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Sub-Category"}
                               isMulti
                            /> 
                  </div>
                   </div>
              </div>  


               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Pincodes
                  </label>
                 <div className="col-sm-9">
                  <Select      
                       className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               //onChange={this.handleSeller.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                            //    isOptionSelected={(option) =>
                            //      this.state.sellerArray.includes(option.id) 
                            //        ? true
                            //        : false
                            //    }
                               //options={}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Select Pincodes"}
                               isMulti
                            /> 
                  </div>
                   </div>
              </div>


              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Brands
                  </label>
                 <div className="col-sm-9">
                  <Select      
                       className={customStyles.root}
                               style={{ height: "20px" }}
                               classNamePrefix="name-select"
                               //onChange={this.handleSeller.bind(this)}
                               getOptionLabel={(option) => `${option.name}`}
                               getOptionValue={(option) => `${option.id}`}
                            //    isOptionSelected={(option) =>
                            //      this.state.sellerArray.includes(option.id) 
                            //        ? true
                            //        : false
                            //    }
                               //options={}
                               isSearchable={true}
                               filterOption={this.customFilter}
                               noOptionsMessage={() => null}
                               placeholder={"Brands"}
                               isMulti
                            /> 
                  </div>
                   </div>
              </div>



              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                   User Status 
                  </label>

                  <div className="col-sm-9">
                     <select 
                     className="form-control"

                      name='status'
                      placeholder='User status'
                      onChange={this.handleChange.bind(this)}
                      value={this.state.status}
                      >
                        <option>Select Status</option>

                        <option>Active</option>
                        <option>In-Active</option>


                        </select> 
                  </div>
                  
                </div>
              </div>
            


             
              
             
              
             */}
            </div> 
            
           

         

            <div className="card-footer">
              <div className="row float-right p-1">
              {/* {this.props.group_id ?
                this.state.isLoading ? (
                  <button className="btn btn-grd-disabled mr-2" disabled>
                    Saving...!
                  </button>
                ) :
               (   <button
                    onClick={this.updateCategoryData}
                    className="btn btn-grd-disabled mr-2 "
                  >
                   Update
                  </button>
        ):
                  this.props.isLoading ? (
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
                )} */}
                  {
                  !this.props.group_id ?
                  <button
                    onClick={this.onSaveData}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                  :
                  (<button onClick={this.updateCategoryData.bind(this)}
                    className="btn btn-grd-disabled mr-2"
                  >
                    Update
                  </button>
                  )}
                <Link to={"/group/list"} className="btn btn-outline-dark">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Groups: state.userManagment.group_list,
    isLoading: state.userManagment.isLoading,
   
    error: state.userManagment.error,
  };
};

GroupAdd.propTypes = {
   groupupdate:PropTypes.func.isRequired,
  groupAdd:PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  groupupdate,groupAdd,fetchGroups})(GroupAdd);
