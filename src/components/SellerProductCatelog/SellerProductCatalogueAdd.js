import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";
import Constant from "../../Constant";
// import ReactQuill from "react-quill";
import Loader from "../../Loader";
// import Select from "react-select";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fecthDetailsInventory,
  updateSellerProduct,
  fetchSellerList,
} from "../../store/index";
class SellerProductCatalogueAdd extends React.Component {
  state = {
    arrayUOM:[],
    uomChange:false,

  };
  onHandleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  componentWillReceiveProps(nextProps){
     if(nextProps !== undefined && nextProps.sellerProduct !== undefined)
     {
       if(nextProps.sellerProduct[0] !== undefined && nextProps.sellerProduct[0].SellerProduct_UOM !==undefined ){
          var arr=nextProps.sellerProduct[0].SellerProduct_UOM
           for(let i=0;i<arr.length;i++)
           {
             var myObject=arr[i]
             delete myObject.conversionRate
             delete myObject.flat_discount
             delete myObject.percentage_discount
             delete myObject.priority
             delete myObject.singleOrderMaxQty
           }
           console.log(arr)
       }

      nextProps.sellerProduct.map(v=>(

            this.setState({
            
              arrayUOM:arr,
              inventory:v.inventory_stock,
              thresold:v.threshold_stock,
             })
      ))
     }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange2 = (key,event) => {
    var arrayuom =this.state.arrayUOM
    arrayuom[key][event.target.name]=event.target.value
    this.setState({ arrayuom , uomChange:true });
    console.log(arrayuom)
  };
 
  onSaveData = () => {
    var data={}
    if(localStorage.getItem('role') !== 'seller'){
    data={
      productId:this.props.seller_product_id,
      sellerId:this.props.sellerId,
      inventory_stock:parseInt(this.state.inventory),
      threshold_stock:this.state.thresold,
   
    }  
    
    console.log(data)
  }
  else{
    
     data={
      productId:this.props.seller_product_id,
      sellerId:this.props.sellerId,
      inventory_stock:this.state.inventory,

    }
   
  }
  if(this.state.uomChange == true){
    var uom=this.state.arrayUOM
    for(let i=0;i<uom.length;i++)
    { uom[i].UOMId=uom[i].id
      uom[i].MRP= `${uom[i].MRP}`
      uom[i].PTD= `${uom[i].PTD}`
      uom[i].PTR= `${uom[i].PTR}`

      var myObject=uom[i]
      delete myObject.name
      delete myObject.id

     
    }
    data={...data,uom}
  }
  console.log(data)
  this.props.updateSellerProduct(data)
  };
 
  componentDidMount() {
    console.log(this.props.seller_product_id)
    console.log(this.props.sellerId)
    this.props.fecthDetailsInventory(this.props.seller_product_id,this.props.sellerId)
  }
  
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
        ) : 
        localStorage.getItem('role') == 'admin'?
        ( 
          
          <div className="card-body">
            <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Inventory</label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="inventory"
                      placeholder="Inventory"
                      onChange={this.handleChange}
                      value={this.state.inventory}
                    />
                  </div>
                </div>
              </div> <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Thresold</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="thresold"
                      placeholder="Thresold"
                      onChange={this.handleChange}
                      value={this.state.thresold}
                    />
                  </div>
                </div>
              </div>
              {
                this.state.arrayUOM.length > 0 ?

                this.state.arrayUOM.map((uom,key)=>{

        return(
            <div className="row border p-4">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">UOM {key+1}</label>
                  <div className="col-sm-9">
                    <input
                    disabled="true"
                      type="text"
                      className="form-control"
                      name="uom_name"
                      placeholder="name"
                      onChange={this.handleChange}
                      value={uom.name}
                    />
                  </div>
                </div>
              </div>
            

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">MRP</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="MRP"
                      placeholder="MRP"
                      onChange={this.handleChange2.bind(this,key)}
                      value={uom.MRP}
                    />
                  </div>
                </div>
              </div>
             <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTR</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="PTR"
                      placeholder="PTR"
                      onChange={this.handleChange2.bind(this,key)}
                      value={uom.PTR}
                    />
                  </div>
                </div>
              </div> <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTD</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="PTD"
                      placeholder="PTD"
                      onChange={this.handleChange2.bind(this,key)}
                      value={uom.PTD}
                    />
                  </div>
                </div>
              </div> 
                
           </div>
           
          )

                })
                :null
              }
           
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">SGST</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="sgst"
                      placeholder="SGST"
                      onChange={this.handleChange}
                      value={this.state.sgst}
                    />
                  </div>
                </div>
              </div>  */}
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">CGST</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="cgst"
                      placeholder="CGST"
                      onChange={this.handleChange}
                      value={this.state.cgst}
                    />
                  </div>
                </div> */}
              {/* </div>  */}
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">IGST</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="igst"
                      placeholder="IGST"
                      onChange={this.handleChange}
                      value={this.state.igst}
                    />
                  </div>
                </div>
              </div> */}
              
               {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Single Order max Qty</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="singleOrdermaxQty"
                      placeholder="SingleOrdermaxQty"
                      onChange={this.handleChange}
                      value={this.state.singleOrdermaxQty}
                    />
                  </div>
                </div>
              </div> 
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Delivery Charge</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="deliverycharge"
                      placeholder="Delivery charge"
                      onChange={this.handleChange}
                      value={this.state.deliverycharge}
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Delivery Time</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="deliverytime"
                      placeholder="Delivery Time"
                      onChange={this.handleChange}
                      value={this.state.deliverytime}
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Select Company Seller Id
                  </label>
                  <div className="col-sm-9">
                    <Select
                      styles={customStyles}
                      isMulti={true}
                      value={categories}
                      getOptionLabel={(option) => `${option.category}`}
                      getOptionValue={(option) => `${option.categoryID}`}
                      onChange={this.handleSelectCat}
                      options={this.state.packageCategory}
                    />
                  </div>
                </div>
              </div> */}

              {/* <div className="col-md-6">
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
                      <option value={1}>Active</option>
                      <option value={0}>InActive</option>
                    </select>
                  </div>
                </div>
              </div> */}
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
                <Link to={"/seller-product-catalogue"} className="btn btn-outline-dark">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        ) :
        ( 
          <div className="card-body">
            <div className="row">
           
              

               <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTC</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="ptc"
                      placeholder="PTC"
                      onChange={this.handleChange}
                      value={this.state.ptc}
                    />
                  </div>
                </div>
              </div> 
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">MRP</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="mrp"
                      placeholder="MRP"
                      onChange={this.handleChange}
                      value={this.state.mrp}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">PTD</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="ptd"
                      placeholder="PTD"
                      onChange={this.handleChange}
                      value={this.state.ptd}
                    />
                  </div>
                </div>
              </div>  */}
              
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Inventory</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="inventory"
                      placeholder="Inventory"
                      onChange={this.handleChange}
                      value={this.state.inventory}
                    />
                  </div>
                </div>
              </div> 
              
            
{/*             
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
                      <option value={1}>Active</option>
                      <option value={0}>InActive</option>
                    </select>
                  </div>
                </div>
              </div> */}
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
                <Link to={"/seller-product-catalogue"} className="btn btn-outline-dark">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        )
  }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    sellerProduct:state.sellerProduct.inventory_det,

    isAuthUser: state.isAuthUser,
    error: state.error,
  };
};

SellerProductCatalogueAdd.propTypes = {
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {fecthDetailsInventory,updateSellerProduct})(SellerProductCatalogueAdd);

