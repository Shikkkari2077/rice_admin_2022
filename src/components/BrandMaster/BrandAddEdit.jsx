import React from "react";
import { Link } from "react-router-dom";
import GalleryPopUp from '../MediaMaster/GalleryPopUp'


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBrandList,updateBrand, BrandAdd} from "../../store/index";

class BrandAddEdit extends React.Component {
  state = {
    name: "",
    brandCode: "",
    MediumId:"",
    status:true
  };
  
  componentWillMount(props){
    if(this.props.match.params.brand_id){
        this.props.fetchBrandList()
    }
  }

  componentWillReceiveProps(nextProps){
    this.getSingleBrand(nextProps.brand_list)
 }

 getSingleBrand = (brands) => {
    if(this.props.match.params.brand_id){
      var Brand = brands.filter(brand=>brand.id === this.props.match.params.brand_id)[0]
      console.log('Brand',Brand);
      this.setState({
        name: Brand.name,
        brandCode: Brand.brandCode,
        status:Brand.status
      })
    }
  }

 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
   if(this.props.match.params.brand_id){
      var data = {
        brandId:this.props.match.params.brand_id,
        name: this.state.name,
        brandCode: this.state.brandCode,
        status:this.state.status=='true'?true:this.state.status=='false'?false:true,
        // MediumId:this.state.MediumId,
       }
       this.props.updateBrand(data)
   }else{
       var data = {
        name: this.state.name,
        brandCode: this.state.brandCode,
        status:this.state.status=='true'?true:this.state.status=='false'?false:true,
        // MediumId:this.state.MediumId,
       }
       this.props.BrandAdd(data)
    console.log('data',data);
   }
  };

 

  render() {
      
    console.log(this.props.match.params.brand_id);
    return (
        <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <div className="d-inline">
                        <h4>Brand Add</h4>
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
                      <li className="breadcrumb-item active">Brand Add</li>
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
                        <label htmlFor="name">Brand Name</label>
                        <input
                            type="text"
                            id='name'
                            name="name"
                            placeholder="Brand Name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="INP_FIELD">
                        <label htmlFor="brandCode">Brand Code</label>
                        <input
                            type="text"
                            id='brandCode'
                            name="brandCode"
                            placeholder="Brand Code"
                            onChange={this.handleChange}
                            value={this.state.brandCode}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="INP_FIELD">
                        <label htmlFor="status">Status</label>
                        <select
                            name="status"
                            value={this.state.status}
                            onChange={this.handleChange}
                            >
                            <option value={true}>Active</option>
                            <option value={false}>InActive</option>
                            </select>
                        </div>
                    </div>
                    </div>


                    <div className="card-footer">
                    <div className="row float-right p-3 FOOTER_BTNS">
                      
                        <button
                            onClick={this.onSaveData}
                        >
                            <i className="icofont icofont-save"></i>{this.props.match.params.brand_id?'Update':'Save'}
                        </button>
                      
                        <Link to={"/brands"}>
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
    brand_list: state.Brands.brand_list,
    isLoading: state.Brands.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

BrandAddEdit.propTypes = {
    fetchBrandList: PropTypes.func.isRequired,
    updateBrand:PropTypes.func.isRequired,
    BrandAdd:PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchBrandList,updateBrand, BrandAdd})(BrandAddEdit);
