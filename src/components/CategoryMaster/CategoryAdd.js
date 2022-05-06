import React from "react";
import { Link } from "react-router-dom";
import GalleryPopUp from '../MediaMaster/GalleryPopUp'


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CategoryAddOne,
         getCategoryDetails,
         updateCategory, 
         fetchProductDepartmentList,
} from "../../store/index";

class CategoryAdd extends React.Component {
  state = {
    status: "",
    description: "",
    category_id:'',
    mediaID:"",
    opentoEdit:false,
    image:"",
    name:"",
    priority:'',
    mediumId:'',
    isLoading:false,
    imagestatus:false,
    imageuploaded:false,
  };
  componentWillMount(props){
    if(this.props.category_id !== undefined){
      console.log('get',this.props.category_id)
      this.setState({
        category_id:this.props.category_id,
        updating:true
      })
      this.props.getCategoryDetails(this.props.category_id)
    }
    else{
      console.log('notget')
    }
    this.props.fetchProductDepartmentList()
  }
  componentWillReceiveProps(nextProps){
   console.log('hello',nextProps.category_det)

   this.setState({product_department:nextProps.product_department})
    
   if(this.props.category_id){
    this.setState({
      name:nextProps.category_det[0].name,
      description:nextProps.category_det[0].description,
      productDepartmentID:nextProps.category_det[0].productDepartmentID,
      visibility:nextProps.category_det[0].visibility,
      priority:nextProps.category_det[0].priority,
      status:nextProps.category_det[0].status
     })
   }
   console.log('data',this.state.data)
 }
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
   this.uploadMedia()
  };
  updateCategoryData=()=>{
    this.setState({
      isLoading:true
    })
    const CategoryId=this.props.category_id
    const name= this.state.name
    const description= this.state.description
    const priority=this.state.priority
    const productDepartmentID=this.state.productDepartmentID
    const status=this.state.status=='true'?true:false
    const visibility=this.state.visibility=='true'?true:false
    
  this.props.updateCategory(
    CategoryId,
    name,
    priority,
    productDepartmentID,
    description,
    status,
    visibility
    )
  }
  uploadMedia = () => {
    const name=this.state.name
    const description=this.state.description
    const priority=this.state.priority
    const productDepartmentID=this.state.productDepartmentID
    const status=this.state.status=='true'?true:false
    const visibility=this.state.visibility=='true'?true:false

    this.props.CategoryAddOne(name,description,priority,productDepartmentID,status,visibility)
  } 
  
  open=()=>{
    this.setState({
      opentoEdit:true
    })
  }
  handleClose=()=>{
    this.setState({
      opentoEdit:false
    })
  }
  imageData=(src,id)=>{
    console.log(src,id)
    this.setState({
      imagestatus:true,
      image:src,
      mediaID:id,
    })
  }

  render() {
    console.log('fsadfdsf',this.state.product_department);
    return (
      <div className="">
          <div className="card-body">
          {this.state.opentoEdit ? (
              <div
                className="backdrop_color"
                style={{
                  width: "80vw",
                  height: "140vh",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "rbga(0,0,0,.5)",
                  zIndex: "105",
                }}
              >
                <GalleryPopUp
                  media_type={"category"}
                  close={this.handleClose}
                  imagedata={this.imageData}
                  open={true}
                />
              </div>
            ) : (
              ""
            )}
            <div className="row">
              <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="name">Category Name</label>
                  <input
                      type="text"
                      id='name'
                      name="name"
                      placeholder="Enter Category Name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                </div>
              </div>
              <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="priority">Category Priority</label>
                  <input
                      type="text"
                      id='priority'
                      name="priority"
                      placeholder="Enter Category Priority"
                      onChange={this.handleChange}
                      value={this.state.priority}
                    />
                </div>
              </div>
              <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="description">Description</label>
                  <textarea
                      rows={3}
                      type="text"
                      id='description'
                      name="description"
                      placeholder="Description"
                      onChange={this.handleChange}
                      value={this.state.description}
                    />
                </div>
              </div>

              <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="productDepartmentID">Product Department</label>
                  <select
                        name="productDepartmentID"
                        value={this.state.productDepartmentID}
                        onChange={this.handleChange}
                      >
                        <option> - Select Department - </option>
                        {this.state.product_department!==undefined?
                          this.state.product_department.map(department=>(
                        <option value={department.id}>{department.name}</option>
                        )):null}
                      </select>
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
                      <option> - Select - </option>
                      <option value={true}>Active</option>
                      <option value={false}>InActive</option>
                    </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="visibility">Visibility</label>
                  <select
                      name="visibility"
                      value={this.state.visibility}
                      onChange={this.handleChange}
                    >
                      <option> - Select - </option>
                      <option value={true}>YES</option>
                      <option value={false}>NO</option>
                    </select>
                </div>
              </div>
        
            </div>


            <div className="card-footer">
              <div className="row float-right p-1">
              {this.props.category_id ?
                 
                  <button
                    onClick={this.updateCategoryData}
                    className="btn btn-grd-disabled mr-2 "
                  >
                   Update
                  </button>
      
                :
                  <button
                    onClick={this.onSaveData}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                }
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
    category_res:state.category.category_res,
    category_det:state.category.category_det,
    product_department:state.product.product_department,
    isLoading: state.category.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

CategoryAdd.propTypes = {
  CategoryAddOne: PropTypes.func.isRequired,
  getCategoryDetails:PropTypes.func.isRequired,
  updateCategory:PropTypes.func.isRequired,
  fetchProductDepartmentList:PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {CategoryAddOne,getCategoryDetails,updateCategory, fetchProductDepartmentList})(CategoryAdd);
