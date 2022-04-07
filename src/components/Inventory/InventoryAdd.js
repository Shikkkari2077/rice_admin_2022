import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fecthDetailsInventory,updateSellerProduct} from '../../store/index'

class InventoryAdd extends React.Component {
  state = {
    status: "",
    name:'',
    inventoryStock:'',
    priority:'',
    SP_customer:'',
    CP:'',
    batchId:'',
    batchNumber:'',
    batchDate:'',
    ProductId:''
  };

  componentWillMount(props){
    if(this.props.product_id !== undefined){
      this.setState({
        product_id:this.props.product_id,
        updating:true
      })
     console.log('ddddd',this.props.product_id)
     this.getDetailsInventory(this.props.product_id)
    }
    else{
      console.log('notget')
    }
  }
  getDetailsInventory(id){
    this.props.fecthDetailsInventory(id)
  }
  componentWillReceiveProps(nextProps){
 console.log(nextProps)
  this.setState({
    name:nextProps.inventory_det[0].Product.name,
    status: nextProps.inventory_det[0].available,
    inventoryStock:nextProps.inventory_det[0].inventory.inventory_stock,
    // priority:nextProps.inventory_det,
    ProductId:nextProps.inventory_det[0].ProductId,
    SP_customer:nextProps.inventory_det[0].SP_customer,
    CP:nextProps.inventory_det[0].CP,
    batchId:nextProps.inventory_det[0].batchId,
    batchNumber:nextProps.inventory_det[0].batchNumber,
    batchDate:nextProps.inventory_det[0].batchDate,
  })
}
  

  onSaveData = () => {
   const data={ 
    pinCodeSellerProductId:this.props.product_id,
    productId:this.state.ProductId,
    available: this.state.status,
    inventory_stock:this.state.inventoryStock,
    SP_customer:this.state.SP_customer,
    CP:this.state.CP,
    batchId:this.state.batchId,
    batchNumber:this.state.batchNumber,
    batchDate:this.state.batchDate,
  }

  console.log(data)
  this.props.updateSellerProduct(data)
}
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
   
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted grey",
        color: state.isSelected ? "red" : "black",
        padding: 8,
      }),
      input: (provided) => ({
        ...provided,
        display: "flex",
        height: "30px",
      }),
    };
    return (
      <div className="">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Product Name 
                  </label>
                  <div className="col-sm-9">
                  <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Product Name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Inventory Stock</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="inventoryStock"
                      placeholder="Inventory Stock"
                      onChange={this.handleChange}
                      value={this.state.inventoryStock}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Priority</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="priority"
                      placeholder="Priority"
                      onChange={this.handleChange}
                      value={this.state.priority}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTC</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="SP_customer"
                      placeholder="PTC"
                      onChange={this.handleChange}
                      value={this.state.SP_customer}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTD</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="CP"
                      placeholder="PTD"
                      onChange={this.handleChange}
                      value={this.state.CP}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Batch Id</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="batchId"
                      placeholder="Batch Id"
                      onChange={this.handleChange}
                      value={this.state.batchId}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Batch Number</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="batchNumber"
                      placeholder="Batch Number"
                      onChange={this.handleChange}
                      value={this.state.batchNumber}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Batch Date</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="batchDate"
                      placeholder="Batch Date"
                      onChange={this.handleChange}
                      value={this.state.batchDate}
                    />
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
            </div>
            <div className="card-footer">
              <div className="row float-right p-3">
                {this.props.isLoading ? (
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
                <Link to={"/inventory"} className="btn btn-outline-dark">
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
    isLoading: state.isLoading,
    isAuthUser: state.isAuthUser,
    error: state.error,
    inventory_det:state.sellerProduct.inventory_det
  };
};

InventoryAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fecthDetailsInventory,updateSellerProduct})(InventoryAdd);
