import React from "react";
import { Link } from "react-router-dom";
import GalleryPopUp from '../MediaMaster/GalleryPopUp'


import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBagList,updateBag, BagAdd} from "../../store/index";

class BagsAddEdit extends React.Component {
  state = {
    bagType: "",
    bagSize: "",
  };
  
  componentWillMount(props){
    if(this.props.match.params.bag_id){
        this.props.fetchBagList()
    }
  }

  componentWillReceiveProps(nextProps){
    this.getSingleBag(nextProps.bags_list)
 }

 getSingleBag = (bags) => {
    if(this.props.match.params.bag_id){
      var Bag = bags.filter(bag=>bag.id === this.props.match.params.bag_id)[0]
      console.log('Bag',Bag);
      this.setState({
        bagType: Bag.bagType,
        bagSize: Bag.bagSize,
      })
    }
  }

 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
   onSaveData=()=>{
   if(this.props.match.params.bag_id){
      var data = {
        bagId:this.props.match.params.bag_id,
        bagType: this.state.bagType,
        bagSize: this.state.bagSize,
       }
       this.props.updateBag(data)
   }else{
       var data = {
        bagType: this.state.bagType,
        bagSize: this.state.bagSize,
       }
       this.props.BagAdd(data)
    console.log('data',data);
   }
  };

 

  render() {
      
    console.log(this.props.match.params.bag_id);
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
                        <label htmlFor="bagType">Bag Type</label>
                        <input
                            type="text"
                            id='bagType'
                            name="bagType"
                            placeholder="Bag Type"
                            onChange={this.handleChange}
                            value={this.state.bagType}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="INP_FIELD">
                        <label htmlFor="bagSize">Bag Size</label>
                        <input
                            type="text"
                            id='bagSize'
                            name="bagSize"
                            placeholder="Bag Size"
                            onChange={this.handleChange}
                            value={this.state.bagSize}
                            />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
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
                    </div> */}
                    </div>


                    <div className="card-footer">
                    <div className="row float-right p-3 FOOTER_BTNS">
                        
                        <button
                            onClick={this.onSaveData}
                        >
                            <i className="icofont icofont-save"></i>{this.props.match.params.bag_id?'Update':'Save'}
                        </button>
                       
                        <Link to={"/bags"}>
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
    bags_list: state.Bags.bags_list,
    isLoading: state.Brands.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

BagsAddEdit.propTypes = {
    fetchBagList: PropTypes.func.isRequired,
    updateBag:PropTypes.func.isRequired,
    BagAdd:PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fetchBagList,updateBag, BagAdd})(BagsAddEdit);
