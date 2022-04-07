import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchOrderListinovie, updateStatusOrder } from "../store/index";
class ModelPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: false,
      status: null,
      orderId: "",
    };
  }
  updateSttaus = () => {
    const status = this.state.status;
    console.log(status, "clicked");
    this.props.updateStatusOrder(
      this.state.orderId,
      this.state.reasonOfdelayed,
      status,
      this.props.redirect,
      "",
      this.props.orderdata.sellerFilter,
      this.props.orderdata.pincodeFilter,
      this.props.orderdata.cityFilter,
      this.props.orderdata.start_date,
      this.props.orderdata.datarange,
      this.props.orderdata.dataLength,
      this.props.orderdata.openOrders,


    );
    this.props.close();
  };
  componentDidMount(){
    console.log(this.props.orderdata)
  }
  handleChangeStatus = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.status, "ddd");
  };
  componentWillReceiveProps(nextProps) {
    const orderpendi = nextProps.orderdet ? nextProps.orderdet : "";
    console.log(orderpendi.data[0], "model");
    this.setState({
      orderdet: orderpendi.data,
      newStatus: nextProps.orderdet.data[0].status,
      orderId: nextProps.orderdet.data[0].id,
    });
  }
  // handleKeyDown(e){
  //   console.log("key",e.key)
	// 	if (e.key === 'Enter') {
	// 		console.log('do validate');
	// 	  }
	// }
  render() {
    const enable = this.state.status === "Delay delivery" ? true : false;
    // console.log(this.props)

    return (
      <div
        className=""
        style={{
          position: "fixed",
          top: "15vh",
          boxShadow: "0 0 5px black",
          padding: "1vh",
          left: "30vw",
          background: "white",
          width: "40vw",
          height: "auto",
          paddingBottom: "4vh",
          zIndex: "455",
        }}
      >
        <div
          className="col-sm-12"
          style={{ position: "relative", margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "spaceBetween",
            }}
          >
            <div className="col-sm-11">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                {" "}
                Update Status{" "}
              </p>
            </div>
            <div className="col-sm-3">
              <i
                class="icofont icofont-close-squared"
                style={{ zoom: "1.4", padding: "2px", cursor: "pointer" }}
                onClick={() => {
                  //   window.location.reload()
                  this.props.close();
                }}
              ></i>
            </div>
          </div>
          <div>
            {/* {this.state.orderdet !== null &&
                                this.state.orderdet !== []
                                  ? this.state.orderdet.map((d) => ( */}
            <div className="p-3">
              <div className="form-group col">
                <label className="row-form-label">Order Status</label>
                <div>
                  {this.props.orderdet !== [] &&
                  this.props.orderdet !== null ? (
                    <select
                      name="status"
                      className="form-control col-sm-6"
                      value={this.state.status}
                      onChange={this.handleChangeStatus.bind(this)}
                      required
                      //onKeyDown={this.handleKeyDown.bind(this)}

                    >

                      <option>
                        {this.props.dataIs ? "Loading..." : "Select"}
                      </option>
                      {this.state.newStatus === "Dispatched" ? (
                          localStorage.getItem("role") !== "seller" ?

                        <>
                          <option value={"In-Transit"}>In-transit</option>
                          <option value={"Delivered"}>Delivered</option>
                        </>
                        :
                        <>
                        </>
                      ) : this.state.newStatus === "In-Transit" ? (
                        localStorage.getItem("role") !== "seller" ?
                        <>
                          <option value={"Delivered"}>Delivered</option>
                        </>
                        :
                        <>
                        </>
                      ) : this.state.newStatus === "Delivered" ? (
                        <>
                          <option disabled>Order Is delivered</option>
                        </>
                      ) : this.state.newStatus === "Cancelled" ? (
                        <>
                          <option disabled>Order Is Cancelled</option>
                        </>
                      ) : (
                        localStorage.getItem("role") !== "seller" ?
                        <>
                         
                        
                        
                          <option value="Dispatched">Dispatched</option>
                          
                          <option value="In-Transit">In-transit</option>
                          <option value="Delivered">Delivered</option>


                        </>
                        :
                        <> 
                          <option value="Dispatched">Dispatched</option>
                        

                      </>
                      )}
                      {localStorage.getItem("role") === "admin" ? (
                        <>
                          <option value="Delay Delivery">Delay delivery</option>
                          <option value="Payment Failure">
                            Payment Failure
                          </option>
                          {/* <option value="Dispatched">Dispatched</option> */}
                          <option value="Cancelled">Cancel Order</option>
                          <option value="Returned">Denied (Returned)</option>
                          <option value="Denied">Denied</option>


                        </>
                      ) : (
                        ""
                      )}
                    </select>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {localStorage.getItem("role") === "admin" ? (
                <div className="form-group col">
                  <label className="row-form-label">
                    Reason For Delayed Delivery
                  </label>
                  <div>
                    <textarea
                      rows={3}
                      disabled={this.state.status !== 'Delay Delivery' ? true : false}
                      className="form-control"
                      onChange={this.handleChangeStatus}
                      name="reasonOfDelayed"
                      placeholder="Reason of Delayed"
                      value={this.state.reasonOfDelayed}
                      //onKeyDown={this.handleKeyDown.bind(this)}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* : ""} */}
          </div>
          <div className="mx-2 float-roght">
            <button
              className="btn btn-sm btn-inverse waves-effect waves-light md-trigger"
              onClick={this.updateSttaus}
             // onKeyDown={this.handleKeyDown}
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-inverse waves-effect waves-light md-trigger mx-2"
              onClick={() => {
                //   window.location.reload()
                this.props.close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
    orderdet: state.order.order_det,
    dataIs: state.order.dataIs,
  };
};

ModelPopUp.propTypes = {
  fetchOrderList: PropTypes.func.isRequired,
  fetchOrderListinovie: PropTypes.func.isRequired,
  updateStatusOrder: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  fetchOrderListinovie,
  updateStatusOrder,
})(ModelPopUp);
