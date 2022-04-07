import React from "react";
import { Link } from "react-router-dom";
import Constant from "../../Constant";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {addDeliveryBoyList,updateDeliveryListA,getDeliveryboyDetailsA,fetchcityList,
} from '../../store/index'


class DeliveryBoyAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
    email:'',
    firstName:'',
    lastName:'',
    phone:'',
    password:''
  };
  componentWillMount(props){
    this.props.fetchcityList(0, 25500);

    if(this.props.deliveryboy_id !== undefined){
      console.log('get',this.props.deliveryboy_id)
      this.setState({
        deliveryboy_id:this.props.deliveryboy_id,
        updating:true
      })
      this.getCategoryDetails(this.props.deliveryboy_id)
    }
    else{
      console.log('notget')
    }
  }
  getCategoryDetails(){
    this.props.getDeliveryboyDetailsA(this.props.deliveryboy_id)
  }
  componentWillReceiveProps(nextProps){
    if( nextProps.delivery_det !== undefined && nextProps.delivery_det[0]!==undefined){
   var setData=nextProps.delivery_det[0]
  
   this.setState({
    // description: nextProps.delivery_det[0].,
    email:setData.email,
    firstName:setData.firstName,
    lastName:setData.lastName,
    phone:setData.phone,
    type:setData.type,
    cityId:setData.cityId,
   })
  }
 }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  onSaveData = () => {
    const email=this.state.email
    const firstName=this.state.firstName
    const lastName=this.state.lastName
    const phone=this.state.phone
    const type=this.state.type
    var cityId=this.state.cityId
   this.props.addDeliveryBoyList(email,firstName,lastName,phone,type,cityId)
  };
  update=()=>{
    const email=this.state.email
    const type=this.state.type
    const firstName=this.state.firstName
    const lastName=this.state.lastName
    const phone=this.state.phone
    const id=this.props.deliveryboy_id
    var cityId=this.state.cityId

   this.props.updateDeliveryListA(id,email,firstName,lastName,phone,type,cityId)
  }
 
  render() {
    return (
      <div className="">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="card-body">
            <div className="row">
              {/* <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Display Image</div>
                  <div className="col-sm-9">
                    <form
                      id="categoryImage"
                      name="categoryImage"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                        <input
                          accept="image/*"
                          onChange={this.handleImageUpload}
                          id="category_image"
                          type="file"
                          className="form-control"
                          autoComplete="off"
                          name="files"
                        />
                        <span className="mt-1">( 500 x 500 )</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div> */}
              {/* <div sclassName="col-md-6">
                <div id="category_image_label" className="pt-2">
                  {this.state.image ? (
                    this.state.image !== null ||
                    this.state.image !== undefined ||
                    this.state.image !== {} ? (
                      <img
                        src={this.state.image}
                        alt=""
                        className="img-100"
                        onError={(e) => {
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div> */}
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">First Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="First Name"
                      onChange={this.handleChange}
                      value={this.state.firstName}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Last Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                      value={this.state.lastName}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Delivery Boy Email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </div>
                </div>
              </div>
               */}

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Mobile Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Mobile Number"
                      onChange={this.handleChange}
                      value={this.state.phone}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Type</label>
                  <div className="col-sm-9">
                    <select
                      name="type"
                      className="form-control"
                      value={this.state.type}
                      onChange={this.handleChange}
                    >                     
                      <option>Select Type</option>
                      <option value='awl_seller'>AWL Seller</option>
                      <option value='thirdparty'>Third Party</option>
                    </select>
                  </div>
                </div>
              </div>
              {this.state.type == 'awl_seller'? 
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">City</label>
                  <div className="col-sm-9">
                    <select
                      name="cityId"
                      className="form-control"
                      value={this.state.cityId}
                      onChange={this.handleChange}
                    >
                      <option>Select City</option>
                      {this.props.city_list.map(city=>(
                        <option value={city.id}>{city.name}</option>

                      ))
                      }
                    </select>
                  </div>
                </div>
              </div>
              :null}
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

            <div className="card-footer">
              <div className="row float-right p-3">
                {this.state.isSaving ? (
                  <button className="btn btn-grd-disabled mr-2" disabled>
                    Saving...!
                  </button>
                ) : (
                  !this.props.deliveryboy_id ?
                  <button
                    onClick={this.onSaveData}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                  :
                  <button
                    onClick={this.update}
                    className="btn btn-grd-disabled mr-2"
                  >
                    Update
                  </button>
                )}
                <Link to={"/delivery-boy-list"} className="btn btn-outline-dark">
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
    delivery_det:state.delivery.delivery_det,
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    city_list: state.city.city_list,

    error: state.error,
  };
};

DeliveryBoyAdd.propTypes = {
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  updateDeliveryList:PropTypes.func.isRequired,

};
export default connect(mapStateToProps, {
  addDeliveryBoyList,updateDeliveryListA,getDeliveryboyDetailsA,  fetchcityList,

})(DeliveryBoyAdd);
