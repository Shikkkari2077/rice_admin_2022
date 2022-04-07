import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
// import ReactQuill from "react-quill";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchDeatilsSellerList,resetinvoice  } from "../../store/index";

class CategoryAdd extends React.Component {
  state = {
    code:'',
    message:"",
    name:'',
    regexp:/^[0-9\b]+$/,
    isLoading:false,
  };
  componentWillMount(props){
    if(this.props.seller_id !== undefined){
      console.log('get',this.props.seller_id)
      this.setState({
        seller_id:this.props.seller_id,
        updating:true
      })
      this.props.fetchDeatilsSellerList(this.props.seller_id);
    }
    else{
      console.log('notget')
    } 
  }
  componentWillReceiveProps(nextProps){
   console.log('hello',nextProps.seller_list)
  if(nextProps.seller_list!==null && nextProps.seller_list!==undefined){
   this.setState({
    name:nextProps.seller_list.transaction_series_name,
    code:nextProps.seller_list.transaction_series_code,
    frequency:nextProps.seller_list.reset_cycle_frequency
   })
}
}

  updateData=()=>{
    this.setState({
      isLoading:true
    }) 
    console.log('called')
    if(this.state.name.match(/\d/) !==null)
    {       this.setState({isLoading:false,message:"Series Name Must Not Include Any Number"})
           console.log(    console.log(this.state.name.match(/\d/))
           )
           
      return 
    }
   else if(this.state.name.length < 3 || !this.state.name)
    {  
      this.setState({isLoading:false,message:"Series Name Must Be Of 3 Characters"})
      return 
    }
   else if(this.state.code.length < 5 || !this.state.code )
    {  
      console.log("notvalidcode")
      console.log()
       this.setState({isLoading:false,message:"Series Code Must be of 5 Characters"})
       return  

    }
    else
     {  
       this.setState({
         message:"",
         isLoading:true,
       })
        this.props.resetinvoice(
        false,
        this.props.seller_id,
        this.state.name,
        this.state.code,
        this.state.frequency
    )
     }
   
}

 handlefrequecy(e){

   console.log(e.target.value)

  }
  handleChange(e){
      this.setState({
          [e.target.name]:e.target.value
      })
       console.log(e.target.value)
  }
  render() {
    return (
      <div className="">
         <div className="bg-primary text-center">
            {this.state.message}

          </div>
          <div className="card-body">
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                  Transaction Series Name
                  </label>
                  <div className="col-sm-9">
                    <input
                    minLength={2}
                    maxLength={3}
                      type="char"
                      className="form-control"
                      name="name"
                      placeholder="Series Name"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.name}
                    />
                  </div>
                </div>
              </div>
              {console.log(this.state.code.length)}
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Transaction Series Code
                  </label>
                  <div className="col-sm-9">
                    <input
                      maxLength={5}
                     
                      type="number"
                      className="form-control"
                      name="code"
                      placeholder="series code"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.code == '0'?null:this.state.code}
                    />
                  </div>
                </div>
              </div> <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                   Reset Cycle Frequency
                  </label>
                  <div className="col-sm-9">
                    <select
                     name="frequency"
                     className="form-control"
                     value={this.state.frequency}
                     onChange={this.handleChange.bind(this)}
                    >
                      <option >Select Frequency</option>
                      <option value='manual'>Manual </option>
                      <option value='yearly'>Yearly</option>

                    </select>
                  </div>
                </div>
              </div>
           
              
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Status</label>
                  <div className="col-sm-9">
                    <select
                      name="reset"
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
         

            <div className="card-footer">
              <div className="row float-right p-1">
              {this.props.seller_id ?
                this.state.isLoading ? (
                  <button className="btn btn-grd-disabled mr-2" disabled>
                    Saving...!
                  </button>
                ) :
         (         <button
                    onClick={this.updateData.bind(this)}
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
                )}
                <Link to={"/category"} className="btn btn-outline-dark">
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
    seller_list: state.seller.seller_det,

    isLoading: state.category.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

CategoryAdd.propTypes = {
    fetchDeatilsSellerList: PropTypes.object.isRequired,
    resetinvoice: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchDeatilsSellerList,resetinvoice})(CategoryAdd);
