import React from "react";
import { Link } from "react-router-dom";
import GalleryPopUp from '../MediaMaster/GalleryPopUp'


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProductDepartmentList,UpdateProductDepartment, AddProductDepartment} from "../../store/index";

class ProductDptAddEdit extends React.Component {
  state = {
    name: "",
    status:true
  };
  
  componentWillMount(props){
    if(this.props.match.params.department_id){
        this.props.fetchProductDepartmentList()
    }
  }

  componentWillReceiveProps(nextProps){
    this.getSingleBrand(nextProps.product_department)
 }

 getSingleBrand = (departments) => {
    if(this.props.match.params.department_id){
      var Department = departments.filter(department=>department.id === this.props.match.params.department_id)[0]
      console.log('Department',Department);
      this.setState({
        name: Department.name,
        status:Department.status
      })
    }
  }

 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
   if(this.props.match.params.department_id){
      var data = {
        departmentId:this.props.match.params.department_id,
        name: this.state.name,
        status:this.state.status=='true'?true:this.state.status=='false'?false:true,
       }
       this.props.UpdateProductDepartment(data)
   }else{
       var data = {
        name: this.state.name,
        status:this.state.status=='true'?true:this.state.status=='false'?false:true,
       }
       this.props.AddProductDepartment(data)
    console.log('data',data);
   }
  };

 

  render() {
      
    console.log(this.props.match.params.department_id);
    return (
        <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <div className="d-inline">
                        <h4>Product Department Add</h4>
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
                      <li className="breadcrumb-item active">Product Department Add</li>
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
                        <label htmlFor="name">Product Department Name</label>
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
                            <i className="icofont icofont-save"></i>{this.props.match.params.department_id?'Update':'Save'}
                        </button>
                      
                        <Link to={"/product-Department"}>
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
    product_department:state.product.product_department,
    isLoading: state.Brands.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

ProductDptAddEdit.propTypes = {
    fetchProductDepartmentList:PropTypes.func.isRequired,
    UpdateProductDepartment:PropTypes.func.isRequired,
    AddProductDepartment:PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchProductDepartmentList,UpdateProductDepartment, AddProductDepartment})(ProductDptAddEdit);
