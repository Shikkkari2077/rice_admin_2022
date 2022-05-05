import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
import Loader from "../../Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fecthDetailsInventory,
  updateSellerProduct,
  fetchProductList,
  fetchCountryList,
  fetchBagList,
  fetchPortList,
  AddSellerProduct,
} from "../../store/index";
class SellerProductCatalogueAdd extends React.Component {
  state = {
    inventory_stock:'',
    threshold_stock:'',
    batchId:'',
    batchNumber:'',
    batchDate:'',
    available:'',
    productId:'',
    countryId:'',
    businessLineId:'',
  };


  componentWillMount(){
    this.props.fetchProductList()
    this.props.fetchCountryList()
    this.props.fetchBagList()
    this.props.fetchPortList()
    console.log('Triggered');
  }

  componentWillReceiveProps(nextProps){

    this.setState({
      country_list:nextProps.country_list,
      product_list:nextProps.product_list,
      bags_list:nextProps.bags_list,
      port_list:nextProps.port_list,
    })

  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
 
  onSaveData = () => {
    var data = {
      inventory_stock:this.state.inventory_stock,
      threshold_stock:this.state.threshold_stock,
      batchId:this.state.batchId,
      batchNumber:this.state.batchNumber,
      batchDate:this.state.batchDate,
      available:true,
      productId:this.state.productId,
      countryId:this.state.countryId,
      bagId:this.state.bagId,
      portId:this.state.portId,
      mrp:this.state.mrp,
      businessLineId:this.state.businessLineId,
    }
    this.props.AddSellerProduct(data)
  };
 
  
  render() {
    console.log('dsfsdf',this.state.port_list);
    return <>
       <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Product</label>
                  <div className="col-sm-9">
                    <select
                      name="productId"
                      onChange={this.handleChange}
                      value={this.state.productId}
                      className="form-control"
                    >
                      <option>- Select Product - </option>
                      {this.state.product_list !== undefined
                        ? this.state.product_list.map((country) => (
                            <option value={country.id}>{country.name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Country</label>
                  <div className="col-sm-9">
                    <select
                      name="countryId"
                      onChange={this.handleChange}
                      value={this.state.countryId}
                      className="form-control"
                    >
                      <option>- Select Country - </option>
                      {this.state.country_list !== undefined
                        ? this.state.country_list.map((country) => (
                            <option value={country.id}>{country.name}</option>
                          ))
                        : ""}
                    </select>
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
                      name="inventory_stock"
                      placeholder="Inventory Stock"
                      onChange={this.handleChange}
                      value={this.state.inventory_stock}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Threshold Stock</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="threshold_stock"
                      placeholder="Threshold Stock"
                      onChange={this.handleChange}
                      value={this.state.threshold_stock}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Batch ID</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="batchId"
                      placeholder="Batch ID"
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
                      type="text"
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
                  <label className="col-sm-3 col-form-label">MRP</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="mrp"
                      placeholder="MRP"
                      onChange={this.handleChange}
                      value={this.state.mrp}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Batch Date</label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="batchDate"
                      onChange={this.handleChange}
                      value={this.state.batchDate}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Port</label>
                <div className="col-sm-9">
                  <select
                    name="portId"
                    onChange={this.handleChange}
                    value={this.state.portId}
                    className="form-control"
                  >
                    <option>- Select Port - </option>
                    {this.state.port_list !== undefined
                      ? this.state.port_list.map((port) => (
                          <option value={port.id}>{port.portName}</option>
                        ))
                      : ""}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Bag</label>
                <div className="col-sm-9">
                  <select
                    name="bagId"
                    onChange={this.handleChange}
                    value={this.state.bagId}
                    className="form-control"
                  >
                    <option>- Select Bag - </option>
                    {this.state.bags_list !== undefined
                      ? this.state.bags_list.map((bag) => (
                          <option value={bag.id}>{bag.bagType}/{bag.bagSize}</option>
                        ))
                      : ""}
                  </select>
                </div>
              </div>
            </div>
              {/* <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Available</label>
                <div className="col-sm-9">
                  <select
                    type="text"
                    className="form-control"
                    name="available"
                    onChange={this.handleChange}
                    value={this.state.available}
                  >
                    <option> - Select - </option>
                    <option value={true}>YES</option>
                    <option value={false}>NO</option>
                  </select>
                </div>
              </div>
            </div> */}
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
            <Link to={"/products"} className="btn btn-outline-dark">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    sellerProduct:state.sellerProduct.inventory_det,
    country_list: state.country.country_list,
    isAuthUser: state.isAuthUser,
    bags_list: state.Bags.bags_list,
    port_list: state.Ports.port_list,
    error: state.error,
    product_list: state.product.product_list,
  };
};

SellerProductCatalogueAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  fetchCountryList: PropTypes.func.isRequired,
  fetchProductList: PropTypes.func.isRequired,
  fetchBagList: PropTypes.func.isRequired,
  fetchPortList: PropTypes.func.isRequired,
  AddSellerProduct: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  fecthDetailsInventory,
  updateSellerProduct,
  fetchCountryList,
  fetchProductList,
  fetchBagList,
  fetchPortList,
  AddSellerProduct,
})(SellerProductCatalogueAdd);

