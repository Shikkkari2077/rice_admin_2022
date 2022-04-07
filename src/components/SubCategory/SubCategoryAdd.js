import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

import Loader from "../../Loader";
import { Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCategoryList,
  subCategoryAdd,
  fetchSubCategoryList,
  updateSubCategory} from '../../store/index'

import GalleryPopUp from '../MediaMaster/GalleryPopUp'

class SubCategoryAdd extends React.Component {
  state = {
    status: "Active",
    description: "",
    categoryData:[],
    mediaAdd:false,
    mediaID:"",
    opentoEdit:false,
  };
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  componentDidMount() {
    console.log(this.props.subcategory_id)
      if(this.props.subcategory_id !== undefined)
      {
        this.props.fetchSubCategoryList("",this.props.subcategory_id)
      }
      this.getCategoryList();

  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getCategoryList = () => {
     this.props.fetchCategoryList()
  };
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.categoryData !== undefined)
    { 
      this.setState({
        categoryData:nextProps.categoryData,
      })
    }
    if(nextProps.subCategory_Detail !== undefined){
      console.log(nextProps.subCategory_Detail[0])
      this.setState({
        categoryName:nextProps.subCategory_Detail[0].CategoryId,
        SubCategoryname:nextProps.subCategory_Detail[0].name,
        description:nextProps.subCategory_Detail[0].description,
        status:nextProps.subCategory_Detail[0].status,
      })
    }
  }
  
  onSaveData = () => {
    this.props.subCategoryAdd(
      this.state.name,
      this.state.description,
      this.state.fileToUpload,
      this.state.categoryId,
    )

  
  };
  uploadMedia = () => {
   
  };
  updateCategoryData = (mediumId) => {
    var that = this;

    this.setState({ isSaving: true });
   
    if( this.state.mediaAdd === false){
   this.props.updateSubCategory(
      that.props.subcategory_id,
      that.state.name,
      that.state.description,
      that.state.status,
      that.state.categoryId,
      false
   )
    
  }
  else{
    this.props.updateSubCategory(
      that.props.subcategory_id,
      that.state.name,
      that.state.description,
      that.state.status,
      that.state.categoryId,
      true,
      this.state.mediaID,
   )

  }
  }
 
  addCategory = (mediumId) => {
    var that = this;
    // var data = new URLSearchParams();
    this.setState({ isSaving: true });
    var data = {
      lCode: that.props.language_id,
      name: that.state.name,
      description: that.state.description,
      status: that.state.status,
      mediumId: this.state.mediaID,
    };

 
  };

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
      mediaAdd:true,
      image:src,
      mediaID:id,
    })
  }
  
 
  render() {
    const AntSwitch = withStyles((theme) => ({
      root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
      },
      switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
          transform: 'translateX(12px)',
          color: theme.palette.common.white,
          '& + $track': {
            opacity: 1,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
          },
        },
      },
      thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
      },
      track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
      },
      checked: {},
    }))(Switch);    
  
    return (
      <div className="">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="card-body">
            <div className="row">
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

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Category Name
                  </label>
                  <div className="col-sm-9">
                  <select 
                  name="categoryId"
                   className="form-control form-control-inverse"
                    onChange={this.handleChange} 
                    value={this.state.categoryName}>
                    <option value="">Select Category</option>

                    {
                      this.state.categoryData !== undefined && 
                      this.state.categoryData !== null && 
                      this.state.categoryData !== [] && 
                      this.state.categoryData.length > 0
                        ?
                        this.props.categoryData.map((data ,i) =>
                        <option value={data.id} key={i}>{data.name}</option>
                        )
                        :
                        null
                    }
                  </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    SubCategory Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="SubCategory Name"
                      onChange={this.handleChange}
                      value={this.state.SubCategoryname}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Description</label>
                  <div className="col-sm-9">
                    <textarea
                      rows={3}
                      // cols={}
                      className="form-control"
                      onChange={this.handleChange}
                      name="description"
                      id="description"
                      placeholder="Description"
                      value={this.state.description}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
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
                       
                      <button
                        onClick={this.open}
                        className="form-control">
                          Open Gallery

                        </button>                   
                        </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
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
              </div>
              <div sclassName="col-md-6">
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
              </div>
              
            </div>

            {/* <div className="row">
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-10">
                    <ReactQuill
                      value={this.state.description}
                      onChange={this.onHandleDescriptionChange}
                      style={{ height: "200px", marginBottom: "5%" }}
                    />
                  </div>
                </div>
              </div>
            </div> */}

            <div className="card-footer">
              <div className="row float-right p-3">
                {this.props.isLoading ? (
                  <button className="btn btn-grd-disabled mr-2" disabled>
                    Saving...!
                  </button>
                ) : this.props.subcategory_id !==undefined?
                <button
                onClick={this.updateCategoryData}
                className="btn btn-grd-disabled mr-2"
              >
                <i className="icofont icofont-save"></i> Update
              </button>
                :

                  <button
                    onClick={this.onSaveData}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                }
                <Link to={"/subcategory"} className="btn btn-outline-dark">
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
    categoryData: state.category.category_list,
    error: state.category.error,
    subCategory_Detail:state.subCategory.subcategory_list.data,
    isLoading:state.category.isLoading
  };
};

SubCategoryAdd.propTypes = {
  fetchCategoryList: PropTypes.func.isRequired,
  subCategoryAdd:PropTypes.func.isRequired,
  fetchSubCategoryList:PropTypes.func.isRequired,
  // category: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  fetchCategoryList,
  subCategoryAdd,
  fetchSubCategoryList,
  updateSubCategory})(SubCategoryAdd);
