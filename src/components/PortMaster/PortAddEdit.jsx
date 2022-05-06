import React from "react";
import { Link } from "react-router-dom";
import GalleryPopUp from '../MediaMaster/GalleryPopUp'


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPortList,fetchcityList, PortAdd,updatePort} from "../../store/index";

class PortAddEdit extends React.Component {
  state = {
    name: "",
    cityId: "",
    status:true
  };
  
  componentWillMount(props){
    if(this.props.match.params.port_id){
        this.props.fetchPortList()
    }
    this.props.fetchcityList()
  }

  componentWillReceiveProps(nextProps){
    this.getSinglePort(nextProps.port_list)
    this.setState({
        city_list:nextProps.city_list,
    })
 }

 getSinglePort = (ports) => {
    if(this.props.match.params.port_id){
      var Port = ports.filter(port=>port.id === this.props.match.params.port_id)[0]
      console.log('Port',Port);
      this.setState({
        name: Port.portName,
        cityId: Port.cityId,
        status:Port.status
      })
    }
  }

 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
   if(this.props.match.params.port_id){
      var data = {
        portId:this.props.match.params.port_id,
        name: this.state.name,
        cityId: this.state.cityId,
        status:this.state.status=='true'?true:this.state.status=='false'?false:true,
       
       }
       this.props.updatePort(data)
   }else{
       var data = {
        name: this.state.name,
        cityId: this.state.cityId,
        status:this.state.status=='true'?true:this.state.status=='false'?false:true,
       
       }
       this.props.PortAdd(data)
    console.log('data',data);
   }
  };

 

  render() {
      
    console.log(this.props.match.params.port_id);
    return (
        <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <div className="d-inline">
                        <h4>Port Add</h4>
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
                      <li className="breadcrumb-item active">Port Add</li>
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
                        <label htmlFor="name">Port Name</label>
                        <input
                            type="text"
                            id='name'
                            name="name"
                            placeholder="Port Name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="INP_FIELD">
                        <label htmlFor="cityId">City</label>
                        <select
                            name="cityId"
                            onChange={this.handleChange}
                            value={this.state.cityId}
                            >
                            <option>- Select City - </option>
                            {this.state.city_list !== undefined
                                ? this.state.city_list.map((city) => (
                                    <option value={city.id}>{city.name}</option>
                                ))
                                : ""}
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
                            <i className="icofont icofont-save"></i>{this.props.match.params.port_id?'Update':'Save'}
                        </button>
                       
                        <Link to={"/ports"}>
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
    port_list: state.Ports.port_list,
    isLoading: state.Brands.isLoading,
    city_list: state.city.city_list,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

PortAddEdit.propTypes = {
    fetchPortList: PropTypes.func.isRequired,
    fetchcityList: PropTypes.func.isRequired,
    updatePort:PropTypes.func.isRequired,
    PortAdd:PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchPortList,fetchcityList,PortAdd, updatePort})(PortAddEdit);
