import React from "react";
import { Link } from "react-router-dom";

import GalleryPopUp from '../MediaMaster/GalleryPopUp'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
    notificatonAdd,
    fetchTemplatesdetails,
    notificationUpdate,
    fetchNotificationType } from "../../store/index";

class NotificationAdd extends React.Component {
  state = {
    isLoading:false,
    imageChanged:false,
    notification_type:'',
    image:"",
    mediaID:'',
    opentoEdit:false,
  };
  componentWillMount(props){
    this.props.fetchNotificationType()
    if(this.props.notification_id !== undefined){
      console.log('get',this.props.notification_id)
      this.setState({
        notification_id:this.props.notification_id,
        updating:true
      })
      this.props.fetchTemplatesdetails(this.props.notification_id)
    }
    else{
      console.log('notget')
    }
  }
  componentWillReceiveProps(nextProps){
   console.log('hello',nextProps)
  if(this.props.notification_id !== undefined && nextProps.templates !== undefined && nextProps.templates !== null &&
    nextProps.templates[0] !== undefined && nextProps.templates[0] !== null)
   this.setState({
      title:nextProps.templates[0].title,
      message:nextProps.templates[0].text,
      image:nextProps.templates[0].Medium.url,
      notification_type:nextProps.templates[0].NotificationTypeId

  
   })
 }
 
 
 
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
    this.props.notificationUpdate(
      this.props.notification_id,
      this.state.title,
      this.state.message,
      this.state.imageChanged,
      this.state.mediaID,
      this.state.notification_type,
      )
    console.log(this.state.imageChanged)
  
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
      image:src,
      mediaID:id,
    })
  }
  uploadMedia = () => {
    const title=this.state.title
    const message=this.state.message
    const media=this.state.mediaID

 
    this.props.notificatonAdd(media,title,message,this.state.notification_type)
  } 
  // handleImageUpload = (event) => {
  //   document.getElementById("category_image_label").innerHTML = "";
  //   let element = $("#category_image").get(0);
  //   // $("#id_image_section").empty();
  //   this.setState({ accepted: element });
  //   var proof_img = [];
  //   let obj = {};
  //   console.log(element.files);
  //   const fileToUpload = event.target.files[0];
  //   console.log(fileToUpload)
  //   this.setState({ category_image: element.files,imageChanged:true ,fileToUpload:fileToUpload});
  //   for (var i = 0; i < element.files.length; i++) {
  //     var file1 = element.files[i];
  //     var img = document.createElement("img");
  //     img.className = "img-100";
  //     var filePath = URL.createObjectURL(file1);
  //     img.src = filePath;
  //     $("#category_image_label").append(img);
  //   }
  // };

  render() {
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
                  media_type={"notification"}
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
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Notification Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Category Priority
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="priority"
                      placeholder="Category Priority"
                      onChange={this.handleChange}
                      value={this.state.priority}
                    />
                  </div>
                </div>
              </div> */}
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Message Body</label>
                  <div className="col-sm-9">
                    <textarea
                    //   rows={3}
                      // cols={}
                      className="form-control"
                      onChange={this.handleChange}
                      name="message"
                      id="message"
                      placeholder="message"
                      value={this.state.message}
                    />
                  </div>
                </div>
              </div>


              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Notification Type
                  </label>

                  <div className="col-sm-9">
                     <select 
                     className="form-control"

                      name='notification_type'
                      placeholder='Notification Type'
                      onChange={this.handleChange.bind(this)}
                      value={this.state.notification_type}
                      >
                        <option>Select</option>

                        
                        {this.props.type_list!==undefined?
                        this.props.type_list.map(option=>(
                          option.type !== 'order' ?
                          <option value={option.id}> {option.type}</option>
                          :null
                        ))
                        :null}

                        </select> 
                  </div>
                  
                </div>
              </div>

            


              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-3">Display Image</div>
                  <div className="col-sm-9">
                    <form
                      id="NotificationImage"
                      name="NotificationImage"
                      encType="multipart/form-data"
                      className="text-capitalize"
                    >
                      <div className="form-group">
                      <button
                        onClick={this.open}
                        className="form-control">
                          Open Gallery

                        </button>
                        {/* <input
                        {/* <span className="mt-1">( 500 x 500 )</span> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label"></label>
                  <div className="col-sm-9">
                   
                    
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
             
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
              <div className="row float-right p-1">
              {/* {this.props.notification_id ?
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
                  !this.props.notification_id ?
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
                <Link to={"/notification/list"} className="btn btn-outline-dark">
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
    templates: state.notification.template_detail,
    type_list:state.notification.type_list,
    isLoading: state.category.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

NotificationAdd.propTypes = {
  notificationUpdate:PropTypes.func.isRequired,
  fetchNotificationType:PropTypes.func.isRequired,
  notificatonAdd:PropTypes.func.isRequired,
  fetchTemplatesdetails:PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  notificatonAdd,
  fetchTemplatesdetails,
  notificationUpdate,fetchNotificationType})(NotificationAdd);
