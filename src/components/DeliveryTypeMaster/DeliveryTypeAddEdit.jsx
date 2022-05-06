import React from "react";
import { Link } from "react-router-dom";
import GalleryPopUp from '../MediaMaster/GalleryPopUp'


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchDeliveryTypeList,updateDeliveryType, DeliveryTypeAdd} from "../../store/index";

class DeliveryTypeAddEdit extends React.Component {
  state = {
    deliveryType: "",
  };
  
  componentWillMount(props){
    if(this.props.match.params.deliveryType_id){
        this.props.fetchDeliveryTypeList()
    }
  }

  componentWillReceiveProps(nextProps){
    this.getSingleBrand(nextProps.DeliveryTypesList)
    console.log(nextProps.DeliveryTypesList);
 }

 getSingleBrand = (deliveryTypes) => {
    if(this.props.match.params.deliveryType_id){
      var DeliveryType = deliveryTypes.filter(deliveryType=>deliveryType.id === this.props.match.params.deliveryType_id)[0]
      console.log('DeliveryType',DeliveryType);
      this.setState({
        deliveryType: DeliveryType.deliveryType,
      })
    }
  }

 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
   if(this.props.match.params.deliveryType_id){
      var data = {
        deliveryTypeId:this.props.match.params.deliveryType_id,
        deliveryType: this.state.deliveryType,
       }
       this.props.updateDeliveryType(data)
   }else{
       var data = {
        deliveryType: this.state.deliveryType,
       }
       this.props.DeliveryTypeAdd(data)
    console.log('data',data);
   }
  };

 

  render() {
      
    console.log(this.props.match.params.deliveryType_id);
    return (
        <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <div className="d-inline">
                        <h4>Delivery Type Add</h4>
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
                      <li className="breadcrumb-item active">Delivery Type Add</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-body">
                <div className="card-body">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="INP_FIELD">
                        <label htmlFor="deliveryType">Delivery Type</label>
                        <input
                            type="text"
                            id='deliveryType'
                            name="deliveryType"
                            placeholder="Delivery Type"
                            onChange={this.handleChange}
                            value={this.state.deliveryType}
                            />
                        </div>
                    </div>
                  
                    
                    </div>


                    <div className="card-footer">
                    <div className="row float-right p-3 FOOTER_BTNS">
                      
                        <button
                            onClick={this.onSaveData}
                        >
                            <i className="icofont icofont-save"></i>{this.props.match.params.deliveryType_id?'Update':'Save'}
                        </button>
                      
                        <Link to={"/delivery-type"}>
                        Cancel
                        </Link>
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

const mapStateToProps = (state) => {
  return {
    DeliveryTypesList: state.DeliveryTypes.DeliveryTypesList,
    isLoading: state.Brands.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

DeliveryTypeAddEdit.propTypes = {
    fetchDeliveryTypeList: PropTypes.func.isRequired,
    updateDeliveryType:PropTypes.func.isRequired,
    DeliveryTypeAdd:PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchDeliveryTypeList,updateDeliveryType, DeliveryTypeAdd})(DeliveryTypeAddEdit);
