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
  fetchProductList,
  fetchSellerProductList,
  fetchCountryList,
  fetchBagList,
  fetchPortList,
  AddSellerProduct,
  updateSellerProduct,
} from "../../store/index";
class SellerProductCatalogueAdd extends React.Component {
  state = {
    inventory_stock:'',
    threshold_stock:'',
    batchId:'',
    batchNumber:'',
    batchDate:'',
    productId:'',
    countryId:'',
    businessLineId:'',
  };


  componentWillMount(){
    this.props.fetchProductList()
    this.props.fetchCountryList()
    this.props.fetchBagList()
    this.props.fetchSellerProductList()
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
    this.getSingleProduct(nextProps.sellerProduct_list)
  }

  getSingleProduct = (products) => {
    if(this.props.seller_product_id){
      var prod = products.filter(product=>product.id === this.props.seller_product_id)[0]
      console.log('prod',prod);
      console.log('ID',this.props.seller_product_id);
      this.setState({
        inventory_stock:prod.inventory_stock,
        threshold_stock:prod.threshold_stock,
        // batchId:prod.batchId,
        // batchNumber:prod.batchNumber,
        // batchDate:prod.batchDate,
        // available:true,
        productId:prod.ProductId,
        // countryId:prod.countryId,
        bagId:prod.bagId,
        portId:prod.portId,
        mrp:prod.mrp,
        // businessLineId:prod.businessLineId,
      })
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
 
  onSaveData = () => {
    if(this.props.seller_product_id){
      var data = {
        sellerProductId:this.props.seller_product_id,
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
      this.props.updateSellerProduct(data)
    }else{
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
    }
  
  };
 
  
  render() {
    console.log('dsfsdf',this.state.port_list);
    return <>
       <div className="">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
                <div className="INP_FIELD">
                  <label htmlFor="productId">Product <b>*</b></label>
                  <select
                      name="productId"
                      onChange={this.handleChange}
                      value={this.state.productId}
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
              
              <div className="col-md-4">
                <div className="INP_FIELD">
                  <label htmlFor="countryId">Country <b>*</b></label>
                  <select
                      name="countryId"
                      onChange={this.handleChange}
                      value={this.state.countryId}
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
            <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="inventory_stock">Inventory Stock</label>
                  <input
                      type="text"
                      id='inventory_stock'
                      name="inventory_stock"
                      placeholder="Inventory Stock"
                      onChange={this.handleChange}
                      value={this.state.inventory_stock}
                    />
                </div>
              </div>
              <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="threshold_stock">Threshold Stock</label>
                  <input
                      type="text"
                      id='threshold_stock'
                      name="threshold_stock"
                      placeholder="Threshold Stock"
                      onChange={this.handleChange}
                      value={this.state.threshold_stock}
                    />
                </div>
              </div>
              <div className="col-md-4">
                <div className="INP_FIELD">
                  <label htmlFor="batchId">Batch ID</label>
                  <input
                      type="text"
                      id='batchId'
                      name="batchId"
                      placeholder="Batch ID"
                      onChange={this.handleChange}
                      value={this.state.batchId}
                    />
                </div>
              </div>
              <div className="col-md-4">
                <div className="INP_FIELD">
                  <label htmlFor="batchNumber">Batch Number</label>
                  <input
                      type="number"
                      id='batchNumber'
                      name="batchNumber"
                      placeholder="Batch Number"
                      onChange={this.handleChange}
                      value={this.state.batchNumber}
                    />
                </div>
              </div>
              <div className="col-md-4">
                <div className="INP_FIELD">
                  <label htmlFor="batchDate">Batch Date</label>
                  <input
                      type="date"
                      id='batchDate'
                      name="batchDate"
                      placeholder="Batch Date"
                      onChange={this.handleChange}
                      value={this.state.batchDate}
                    />
                </div>
              </div>
              <div className="col-md-12">
                <div className="INP_FIELD">
                  <label htmlFor="mrp">MRP</label>
                  <input
                      type="number"
                      id='mrp'
                      name="mrp"
                      placeholder="MRP"
                      onChange={this.handleChange}
                      value={this.state.mrp}
                    />
                </div>
              </div>
              <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="countryId">Port <b>*</b></label>
                  <select
                    name="portId"
                    onChange={this.handleChange}
                    value={this.state.portId}
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
              <div className="col-md-6">
                <div className="INP_FIELD">
                  <label htmlFor="countryId">Bag <b>*</b></label>
                  <select
                    name="bagId"
                    onChange={this.handleChange}
                    value={this.state.bagId}
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
        </div>
        <div className="card-footer">
          <div className="row float-right p-3 FOOTER_BTNS">
            {this.props.isLoading ? (
              <button disabled>
                {this.props.seller_product_id?'Updating':'Saving'}...!
              </button>
            ) : (
              <button
                onClick={this.onSaveData}
              >
                <i className="icofont icofont-save"></i> {this.props.seller_product_id?'Update':'Save'}
              </button>
            )}
            <Link to={"/seller-product-catalogue"}>
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
    sellerProduct_list:state.sellerProduct.sellerProduct_list,
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
  updateSellerProduct: PropTypes.func.isRequired,
  fetchSellerProductList: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  fecthDetailsInventory,
  updateSellerProduct,
  fetchCountryList,
  fetchProductList,
  fetchBagList,
  fetchPortList,
  AddSellerProduct,
  fetchSellerProductList,
})(SellerProductCatalogueAdd);

