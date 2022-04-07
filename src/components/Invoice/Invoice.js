import React from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchOrderListinovie } from "../../store/index";
import { Link } from "react-router-dom";
import img from "./icon_invoice.png";
import moment from "moment";

class Invoice extends React.PureComponent {
  state = {
    date_create: "",
    data:[],
    dms:false
  };
  componentDidMount() {
    this.getOrderList();
    this.setState({
      date_create: moment().format("DD-MM-YYYY HH:mm"),
    });
  }
  getOrderList() {
    
    if(this.props.match.params.dms == 'dms'){
      this.props.fetchOrderListinovie(this.props.match.params.invoiceid,true)
      
    }
    else{this.props.fetchOrderListinovie(this.props.match.params.invoiceid,false)}
  }
  componentWillReceiveProps(nextprops){
    console.log(nextprops.order.data)
    if(this.props.match.params.dms == 'dms' && nextprops.order.data !== undefined && nextprops.order.data !== null ){
       this.setState({data:[nextprops.order.data]})
       this.setState({
        dms:true
      })
    }
    else{
      this.setState({data:nextprops.order.data})

    }
  }
  render() {

    return (
      <div>
        <ReactToPrint content={() => this.componentRef}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <div className="page-wrapper">
                <div className="page-header">
                  <div className="row align-items-end">
                    <div className="col-lg-9 m-2">
                      <div className="page-header-title">
                        <div className="d-inline">
                          <h4>Generate Invoice</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="page-header-breadcrumb">
                        <ul className="breadcrumb-title">
                          <li className="breadcrumb-item active">
                            <button
                              onClick={handlePrint}
                              className="btn btn-grd-disabled mr-2"
                            >
                              Print Invoice!
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        {/* <ComponentToPrint ref={(el) => (this.componentRef = el)} /> */}
        <div
          className="pcoded-inner-content"
          ref={(el) => (this.componentRef = el)}
        >
          <div className="main-body">
           
            <div className="page-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-block">
                      <div
                        className="row"
                        style={{
                          padding: "2px",
                        }}
                      >
                        {this.state.data
                          ? this.state.data.map((d) => (
                              <div className="col-sm-12">
                                <div
                                  className="row border-secondary mx-auto"
                                  style={{
                                    padding: "2px",
                                    textAlign: "center",
                                  }}
                                >
                                  {/* <img
                                    className="text-center mx-auto"
                                    style={{ width: "80px" }}
                                    alt="Fortune Online Logo"
                                    src={img}
                                  /> */}
                                </div>
                                <div
                                  className="row border-secondary mx-auto"
                                  style={{
                                    padding: "2px",
                                    width: "100%",
                                  }}
                                >
                                  
                                  <p className="mx-1">
                                    {d.Seller?.contact_person} <br />{" "}
                                    {d.Seller?.name} <br />
                                    {d.Seller?.address} , {d.Seller?.pincode}{" "}
                                    <br /> {d.Seller?.phoneNumber} <br/>
                                    <b>Invoice No.</b> : {d?.invoice_number}
                                  </p>
                                  <img
                                    className="text-center mx-auto"
                                    style={{ width: "100px" ,height:"100px",alignContent:"topright" }}
                                    alt="Fortune Online Logo"
                                    src={img}
                                  />
                                </div>
                                <div
                                  className="row border-secondary mx-auto"
                                  style={{
                                    border: "1px solid black",
                                    padding: "2px",
                                    textAlign: "center",
                                  }}
                                >
                                  <h5 className="text-center mx-auto h-100 font-weight-bold">
                                    Tax Invoice
                                  </h5>
                                </div>
                                <div
                                  className="col border-secondary mx-auto"
                                  style={{
                                    border: "1px solid black",
                                    width: "100%",
                                  }}
                                >
                                  <div className="row px-1">
                                    <h6 className="font-weight-bold">
                                      Customer Name:
                                    </h6>
                                    <h6 className="mx-2">{d.Address.name}</h6>
                                  </div>
                                  <div className="row px-1">
                                    <h6 className="font-weight-bold">
                                      Customer Address:
                                    </h6>
                                    <h6 className="mx-2">
                                      {d.Address.address_line_1}{" "} {d.Address.address_line_2}{" "} {d.Address.road}{ " "} {d.Address.landmark} {" "}
                                      {d.Address.city}{" "} ,{d.Address.state}{" "}, {d.Address.pinCode}
                                    </h6>
                                  </div>
                                  <div className="row px-1">
                                    <h6 className="font-weight-bold">
                                      Mobile :
                                    </h6>
                                    <h6 className="mx-2">{d.Address.mobile}</h6>
                                  </div>
                                  <div className="row px-1">
                                    <h6 className="font-weight-bold">
                                      Email :
                                    </h6>
                                    <h6 className="mx-2">{d.User?.email}</h6>
                                  </div>
                                  <div className="row px-1">
                                    <h6 className="font-weight-bold">
                                      GST:
                                    </h6>
                                    <h6 className="mx-2">{d.User?.GSTIN_number}</h6>
                                  </div>
                                </div>
                                <div className="row mx-auto">
                                  <table className="col mx-auto">
                                    <tr
                                      className="col-sm-12 border-secondary"
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "52%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Place of supply and state code
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      ></td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      >
                                        {d.Address.city},{d.Address.pinCode}
                                      </td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      ></td>
                                    </tr>
                                    <tr
                                      className="col-sm-12 border-secondary"
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "52%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Customer type
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      ></td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      >
                                        {d.User ? d.User.type : ""}
                                      </td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      ></td>
                                    </tr>
                                    <tr
                                      className="col-sm-12 border-secondary"
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "52%",
                                          border: "1px solid black",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Supply state gst In
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      ></td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      >
                                        {d.invoiceDetail.supply_state_GSTIn}
                                      </td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "16%",
                                        }}
                                      ></td>
                                    </tr>
                                  </table>
                                </div>
                                <div
                                  style={{
                                    //  padding: "5px",
                                    // display: "flex",
                                    width: "100%",
                                  }}
                                >
                                  <table className="col mx-auto" style={{fontSize:"14px"}}> 
                                    <tr
                                      className="col-sm-12 border-secondary"
                                      style={{
                                        border: "1px solid black",
                                        width: "100%",
                                      }}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          // border: "1px solid black",
                                          fontWeight: "bold",
                                          width: "10%",
                                        }}
                                      >
                                        SKU code
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          wordBreak: "break-word",
                                          // border: "1px solid black",
                                          width: "30%",
                                        }}
                                      >
                                        Item Name
                                      </td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "20%",
                                          // border: "1px solid black",
                                        }}
                                      >
                                        net price
                                      </td>

                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "20%",
                                          // border: "1px solid black",
                                        }}
                                      >
                                        qty
                                      </td>

                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "20%",
                                          // border: "1px solid black",
                                        }}
                                      >
                                        Value
                                      </td>
                                    </tr>
                                    { !this.state.dms && d.OrderProducts.map((e) => (
                                      <tr
                                        className=" border-secondary"
                                        style={{
                                          width: "100%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        <td
                                          className=" px-1 border-secondary"
                                          style={{
                                            // border: "1px solid black",
                                            fontWeight: "bold",
                                            width: "20%",
                                          }}
                                        >
                                          {e.SKU}
                                        </td>
                                        <td
                                          className="border-secondary"
                                          style={{
                                            width: "20%",
                                            wordBreak: "break-all",
                                            // border: "1px solid black",
                                            wordWrap: "word-break",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              // width:'20%',
                                              overflowWrap: "break-word",
                                              wordWrap: "break-word",
                                              hyphens: "auto",
                                              textOverflow: "none",
                                              whiteSpace: "normal",
                                            }}
                                          >
                                            {e.productName}
                                          </div>
                                        </td>{" "}
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            width: "20%",
                                            // border: "1px solid black",
                                          }}
                                        >
                                          {e.PTR}
                                        </td>
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            width: "20%",
                                            // border: "1px solid black",
                                          }}
                                        >
                                          {e.qty}
                                        </td>
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            width: "20%",
                                            height: "20px",
                                            // border: "1px solid black",
                                          }}
                                        >
                                          {(
                                            e.qty * e.PTR
                                          ).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))}

                                    {this.state.dms && d.OrderProductInvoices.map((e) => (
                                      <tr
                                        className=" border-secondary"
                                        style={{
                                          width: "100%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        <td
                                          className=" px-1 border-secondary"
                                          style={{
                                            // border: "1px solid black",
                                            fontWeight: "bold",
                                            width: "20%",
                                          }}
                                        >
                                          {e.SKU}
                                        </td>
                                        <td
                                          className="border-secondary"
                                          style={{
                                            width: "20%",
                                            wordBreak: "break-all",
                                            // border: "1px solid black",
                                            wordWrap: "word-break",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              // width:'20%',
                                              overflowWrap: "break-word",
                                              wordWrap: "break-word",
                                              hyphens: "auto",
                                              textOverflow: "none",
                                              whiteSpace: "normal",
                                            }}
                                          >
                                            {e.productName}
                                          </div>
                                        </td>{" "}
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            width: "20%",
                                            // border: "1px solid black",
                                          }}
                                        >
                                          {e.PTR}
                                        </td>
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            width: "20%",
                                            // border: "1px solid black",
                                          }}
                                        >
                                          {e.qty}
                                        </td>
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            width: "20%",
                                            height: "20px",
                                            // border: "1px solid black",
                                          }}
                                        >
                                          {(
                                            e.qty * e.PTR
                                          ).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))}
                                    <tr
                                      className=" border-secondary"
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    ></tr>
                                    <tr
                                      className=" border-secondary"
                                      style={{}}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "40%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Total Amount
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          height: "20px",
                                        }}
                                      >
                                        {d.subTotal.toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr
                                      className=" border-secondary"
                                      style={{}}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "40%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Saving Amount
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          height: "20px",
                                        }}
                                      >
                                        {d.discountAmount.toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr
                                      className=" border-secondary"
                                      style={{}}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "40%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Delivery Charges
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          height: "20px",
                                        }}
                                      >
                                        {d.deliveryCharge.toFixed(2)}
                                      </td>
                                    </tr>
                                    {d.couponAmount>0 ?
                                    <tr
                                      className=" border-secondary"
                                      style={{}}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "40%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                       Coupon Discount
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          height: "20px",
                                        }}
                                      >
                                        {d.couponAmount.toFixed(2)}
                                      </td>
                                    </tr>
                                         : null}
                                    <tr
                                      className=" border-secondary"
                                      style={{}}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "40%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Total Items Sold
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>{" "}
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          height: "20px",
                                        }}
                                      >
                                        {d.invoiceDetail.total_item_sold}
                                      </td>
                                      
                                    </tr>
                                  </table>
                                </div>
                               

                                <div
                                  className="row border-secondary mx-auto"
                                  style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                    textAlign: "center",
                                  }}
                                >
                                  <span className="text-center mx-auto h-100">
                                    payment summary *prices inclusive of all
                                    taxes
                                  </span>
                                </div>
                                <div className="row border-secondary mx-auto">
                                  <table className="col" >
                                    <tr>
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "70%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        amount paid online/ amount to be paid
                                      </td>
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "30%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        ={" "}
                                        {(
                                          d.grandTotal
                                        ).toFixed(2)}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="row mx-auto">
                                  <table className="col mx-auto" style={{fontSize:"14px"}}>
                                    <tr
                                      className=" border-secondary"
                                      style={{
                                        width:'100%',
                                        border: "1px solid black",
                                      }}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "25%",
                                          border: "1px solid black",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        SKU code
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "15%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        taxable amount
                                      </td>{" "}
                                      
                                        <td
                                          className="border-secondary"
                                          style={{
                                            width: "15%",
                                          }}
                                        >
                                          cgst Amount
                                        </td>
                                        <td
                                          className="border-secondary"
                                          style={{
                                            width: "15%",
                                            borderLeft: "1px solid grey",
                                          }}
                                        >
                                          sgst Amount
                                        </td>
                                      
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "15%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        cgst (%)
                                      </td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "15%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        sgst (%)
                                      </td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "15%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        cess amount
                                      </td>
                                    </tr>
                                    {!this.state.dms && d.OrderProducts.map((f) => (
                                      <tr
                                        className=" border-secondary"
                                        style={{
                                          border: "1px solid black",
                                        }}
                                      >
                                        <td
                                          className=" px-1 border-secondary"
                                          style={{
                                            // width: "20%",
                                            border: "1px solid black",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {f.Product.SKU}
                                        </td>
                                        <td
                                          className="border-secondary"
                                          style={{
                                            // width: "12%",
                                            border: "1px solid black",
                                          }}
                                        >
                                          {/* {(
                                            (f.Product_sp * f.qty) /
                                            (1 +
                                              (f.Product.cgst +
                                                f.Product.sgst) /
                                                100)
                                          ).toFixed(2)} */}
                                          {d.subTotal}
                                        </td>{" "}
                                        
                                          <td
                                            className="border-secondary"
                                            style={{
                                              // width: "6%",
                                            }}
                                          >
                                            {d.cgst.toFixed(2)}
                                           {/* {((
                                            (f.Product_sp * f.qty) /
                                            (1 +
                                              (f.Product.cgst +
                                                f.Product.sgst) /
                                                100)
                                          )*(f.Product.cgst/100)).toFixed(2)} */}
                                          </td>
                                          <td
                                            className="border-secondary"
                                            style={{
                                              // width: "6%",
                                              borderLeft: "1px solid grey",
                                            }}
                                          >{d.sgst.toFixed(2)}
                                           {/* {((
                                            (f.Product_sp * f.Product.qty)/
                                            (1 +
                                              (d.cgst +
                                                d.sgst) /
                                                100)
                                          )*(f.Product.sgst/100)).toFixed(2)} */}
                                          </td>
                                       
                                        <td
                                          className="border-secondary"
                                          style={{
                                            // width: "12%",
                                            border: "1px solid black",
                                          }}
                                        >
                                          {f.Product.cgst.toFixed(2)}
                                        </td>
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            // width: "12%",
                                            border: "1px solid black",
                                          }}
                                        >
                                          {f.Product.sgst.toFixed(2)}
                                        </td>
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            // width: "12%",
                                            border: "1px solid black",
                                          }}
                                        >
                                          0
                                        </td>
                                      </tr>
                                    ))}
                                    {this.state.dms && d.OrderProductInvoices.map((f) => (
                                      <tr
                                        className=" border-secondary"
                                        style={{
                                          border: "1px solid black",
                                        }}
                                      >
                                        <td
                                          className=" px-1 border-secondary"
                                          style={{
                                            border: "1px solid black",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {f?.Product?.SKU}
                                        </td>
                                        <td
                                          className="border-secondary"
                                          style={{
                                            // width: "12%",
                                            border: "1px solid black",
                                          }}
                                        >
                                          
                                          {d.subTotal}
                                        </td>{" "}
                                        
                                          <td
                                            className="border-secondary"
                                            style={{
                                            }}
                                          >
                                            {d?.cgst.toFixed(2)}
                                          
                                          </td>
                                          <td
                                            className="border-secondary"
                                            style={{
                                              // width: "6%",
                                              borderLeft: "1px solid grey",
                                            }}
                                          >{d?.sgst.toFixed(2)}
                                      
                                          </td>
                                       
                                        <td
                                          className="border-secondary"
                                          style={{
                                            // width: "12%",
                                            border: "1px solid black",
                                          }}
                                        >
                                          {f.Product?.cgst.toFixed(2)}
                                        </td>
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            // width: "12%",
                                            border: "1px solid black",
                                          }}
                                        >
                                          {f.Product?.sgst.toFixed(2)}
                                        </td>
                                        <td
                                          className=" border-secondary"
                                          style={{
                                            // width: "12%",
                                            border: "1px solid black",
                                          }}
                                        >
                                          0
                                        </td>
                                      </tr>
                                    ))}
                                  </table>
                                </div>
                                <div className="row mx-auto">
                                  <table className="col mx-auto">
                                    <tr
                                      className=" border-secondary"
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      
                                    </tr>
                                    <tr
                                      className=" border-secondary"
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "40%",
                                          border: "1px solid black",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Invoice Date
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        <span className="px-1">
                                          {this.state.date_create}
                                        </span>
                                      </td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        Shipment ID
                                      </td>
                                      <td
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          height: "20px",
                                          border: "1px solid black",
                                        }}
                                      >
                                        {d.id}
                                      </td>
                                    </tr>
                                    <tr
                                      className=" border-secondary"
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "40%",
                                          border: "1px solid black",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        tax invoice
                                        <span className="px-1">
                                          {/* {d.invoice_number} */}
                                        </span>
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        {d.seller_invoiceId}
                                      </td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        Order ID
                                      </td>
                                      <td
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          height: "20px",
                                          border: "1px solid black",
                                        }}
                                      >
                                        {d.id}
                                      </td>
                                    </tr>
                                    <tr
                                      className=" border-secondary"
                                      style={{
                                        border: "1px solid black",
                                      }}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "40%",
                                          border: "1px solid black",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        payment Mode
                                      </td>
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        {d.paymentType}
                                      </td>{" "}
                                      <td
                                        className="border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          border: "1px solid black",
                                        }}
                                      >
                                        Payment ref #
                                      </td>
                                      <td
                                        style={{
                                          width: "12%",
                                        }}
                                      ></td>
                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "12%",
                                          height: "20px",
                                          border: "1px solid black",
                                        }}
                                      >
                                        {d.transaction? d.transaction.TXNID :'--'}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="row mx-auto">
                                  <table className="col mx-auto">
                                    <tr
                                      className=" border-secondary"
                                      style={{}}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Customer care toll free number: 1800 572
                                        9999
                                      </td>

                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "50%",
                                        }}
                                      >
                                        Customer care email id:
                                        <a href="mailto:care@adaniwilmar.in?subject = Customer Support &body = Message">
                                          care@adaniwilmar.in
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="row mx-auto">
                                  <table className="col mx-auto">
                                    <tr
                                      className=" border-secondary"
                                      style={{}}
                                    >
                                      <td
                                        className=" px-1 border-secondary"
                                        style={{
                                          width: "50%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Please refer to:
                                        <Link
                                          to="http://fortuneonline.in"
                                          // className="mx-1"
                                        >
                                          {" "}
                                          www.fortuneonline.in
                                        </Link>{" "}
                                        for Privacy Policy
                                      </td>

                                      <td
                                        className=" border-secondary"
                                        style={{
                                          width: "50%",
                                        }}
                                      >
                                        Terms & Conditions Applied*
                                      </td>
                                      
                                    </tr>
                                    
                                  </table>
                                  
                                </div>
                                <div className="row mx-auto">
                                <p style={{textAlign:"left",fontWeight:"bolder"}} className="px-1 border-secondary">Soap/Sanitizer is being delivered to you as a free gift if you are ordering for the first time</p>
                                 </div>
                              </div>
                            ))
                          : ""}
                      </div>
                    </div>
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
    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
    order: state.order.order_det,
  };
};

Invoice.propTypes = {
  getUsers: PropTypes.func.isRequired,
  fetchOrderListinovie: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { fetchOrderListinovie })(Invoice);
