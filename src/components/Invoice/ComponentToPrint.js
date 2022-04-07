// import React from "react";
// import { Link } from "react-router-dom";
// import img from "./icon_invoice.png";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { fetchOrderListinovie } from "../../store/index";
// class ComponentToPrint extends React.PureComponent {
//   componentDidMount() {
//     console.log("props,", this.props.match.params.invoiceid);
//     this.getOrderList();
//   }
//   getOrderList() {
//     this.props.fetchOrderListinovie(this.props.match.params.invoiceid);
//   }
//   render() {
//     const data = [
//       {
//         id: "8697065",
//         User_name: " Zakir",
//         User_mobile: "9979745966",
//         User_email: null,
//         address_line_1: "Adani",
//         address_line_2: "",
//         landmark: "None",
//         road: "Navrangpura ",
//         delivery_notes: null,
//         pinCode: "380009",
//         city: "Ahmedabad",
//         country: "Gujarat",
//         state: "Gujarat",
//         type: "Work",
//         email: null,
//         mobile: "9979745966",
//         alternate_mobile: "",
//         paymentType: "cod",
//         paymentStatus: "pending",
//         reasonOfCancellation: null,
//         deliveryCharge: 0,
//         gst: 89.90755007704163,
//         totalAmount: 4050,
//         discountAmount: 450,
//         grandTotal: 4050,
//         status: "Ordered",
//         statusPriority: 1,
//         createdAt: 1608488004000,
//         updatedAt: 1608488005957,
//         UserId: "65fa0d75-3bab-4b5b-a83d-d66f82e7580e",
//         PinCodeId: "a63e6506-d42d-4dbc-9c3a-ef6f3d6b90b8",
//         AddressId: "3efff9a5-f1f7-4923-9c69-686619a57f47",
//         SellerId: "41054810-4101-11eb-b9ac-733722b44a1c",
//         DeliveryUserId: null,
//         User: {
//           id: "65fa0d75-3bab-4b5b-a83d-d66f82e7580e",
//           email: null,
//           firstName: null,
//           lastName: null,
//           phone: "9979745966",
//           type: "normal",
//           registeredWith: null,
//           appleUID: null,
//           defaultPinCode: null,
//           customer_id_number: "COFO11204732975923",
//           createdAt: 1608487904888,
//           updatedAt: 1608487904888,
//         },
      
//       },
//     ];
//     console.log(this.props.order.data);
//     const order = this.props.order.data;
//     return (
//       <div className="pcoded-inner-content">
//         <div className="main-body">
//           <div className="page-body">
//             <div className="row">
//               <div className="col-sm-12">
//                 <div className="card">
//                   <div className="card-block">
//                     <div
//                       className="row"
//                       style={{
//                         padding: "5px",
//                       }}
//                     >
//                       {this.props.order.data
//                         ? this.props.order.data.map((d) => (
//                             <div className="col-sm-12">
//                               <div
//                                 className="row border-secondary mx-auto"
//                                 style={{
//                                   padding: "5px",
//                                   textAlign: "center",
//                                 }}
//                               >
//                                 <img
//                                   className="text-center mx-auto"
//                                   style={{ width: "100px" }}
//                                   alt="Fortune Online Logo"
//                                   src={img}
//                                 />
//                               </div>
//                               <div
//                                 className="row border-secondary mx-auto"
//                                 style={{
//                                   padding: "5px",
//                                   display: "flex",
//                                   width: "100%",
//                                 }}
//                               >
//                                 <h6 className="font-weight-bold">
//                                   Seller Address:
//                                 </h6>
//                                 <h6 className="mx-2">
//                                   {d.Seller.address} <br /> {d.Seller.pincode}
//                                 </h6>
//                               </div>
//                               <div
//                                 className="row border-secondary mx-auto"
//                                 style={{
//                                   border: "1px solid black",
//                                   padding: "5px",
//                                   textAlign: "center",
//                                 }}
//                               >
//                                 <h5 className="text-center mx-auto h-100 font-weight-bold">
//                                   Tax Invoice
//                                 </h5>
//                               </div>
//                               <div
//                                 className="col border-secondary mx-auto"
//                                 style={{
//                                   border: "1px solid black",
//                                   width: "100%",
//                                 }}
//                               >
//                                 <div className="row px-1">
//                                   <h6 className="font-weight-bold">
//                                     Customer Address:
//                                   </h6>
//                                   <h6 className="mx-2">
//                                     {d.address_line_1} {d.address_line_2}{" "}
//                                     {d.city} ,{d.country}, {d.pinCode}
//                                   </h6>
//                                 </div>
//                                 <div className="row px-1">
//                                   <h6 className="font-weight-bold">Mobile :</h6>
//                                   <h6 className="mx-2">{d.User_mobile}</h6>
//                                 </div>
//                                 <div className="row px-1">
//                                   <h6 className="font-weight-bold">Email :</h6>
//                                   <h6 className="mx-2">{d.User_email}</h6>
//                                 </div>
//                               </div>
//                               <div className="row mx-auto">
//                                 <table className="col mx-auto">
//                                   <tr
//                                     className="col-sm-12 border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "52%",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       Place of supply and state code
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     >
//                                       {d.city},{d.pinCode}
//                                     </td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     ></td>
//                                   </tr>
//                                   <tr
//                                     className="col-sm-12 border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "52%",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       Customer type
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     >
//                                       {d.User ? d.User.type : ""}
//                                     </td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     ></td>
//                                   </tr>
//                                   <tr
//                                     className="col-sm-12 border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "52%",
//                                         border: "1px solid black",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       Supply state gstin
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     >
//                                       {d.invoiceDetail.supply_state_GSTIn}
//                                     </td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "16%",
//                                       }}
//                                     ></td>
//                                   </tr>
//                                 </table>
//                               </div>
//                               <div className="row mx-auto">
//                                 <table className="col mx-auto">
//                                   <tr
//                                     className=" border-secondary"
//                                     style={{
//                                       border: "1px solid red",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "80%",
//                                         border: "1px solid black",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       SKU code
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       Item Name
//                                     </td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       Item description
//                                     </td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       net price
//                                     </td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       qty
//                                     </td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       Value
//                                     </td>
//                                   </tr>
//                                   {d.OrderProducts.map((e) => (
//                                     <tr
//                                       className=" border-secondary"
//                                       style={{
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       <td
//                                         className=" px-1 border-secondary"
//                                         style={{
//                                           width: "40%",
//                                           border: "1px solid black",
//                                           fontWeight: "bold",
//                                         }}
//                                       >
//                                         {e.Product_sku}
//                                       </td>
//                                       <td
//                                         className="border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {e.Product_name}
//                                       </td>{" "}
//                                       <td
//                                         className="border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {e.Product_description}
//                                       </td>
//                                       <td
//                                         className=" border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {e.after_offer_price}
//                                       </td>
//                                       <td
//                                         className=" border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {e.qty}
//                                       </td>
//                                       <td
//                                         className=" border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           height: "20px",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {e.qty * e.after_offer_price}
//                                       </td>
//                                     </tr>
//                                   ))}
//                                   <tr
//                                     className=" border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         fontWeight: "bold",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         height: "20px",
//                                       }}
//                                     ></td>
//                                   </tr>
//                                   <tr className=" border-secondary" style={{}}>
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       Total Amount
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         height: "20px",
//                                       }}
//                                     >
//                                       {d.totalAmount}
//                                     </td>
//                                   </tr>
//                                   <tr className=" border-secondary" style={{}}>
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       Discount Amount
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         height: "20px",
//                                       }}
//                                     >
//                                       {d.discountAmount}
//                                     </td>
//                                   </tr>
//                                   <tr className=" border-secondary" style={{}}>
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       total items sold
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         height: "20px",
//                                       }}
//                                     >
//                                       {d.invoiceDetail.total_item_sold}
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </div>
//                               <div
//                                 className="row border-secondary mx-auto"
//                                 style={{
//                                   border: "1px solid black",
//                                   padding: "5px",
//                                   textAlign: "center",
//                                 }}
//                               >
//                                 <span className="text-center mx-auto h-100">
//                                   payment summary *prices inclusive of all taxes
//                                 </span>
//                               </div>
//                               <div className="row border-secondary mx-auto">
//                                 <table className="col">
//                                   <tr>
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "70%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       amount paid online/ amount to be paid
//                                     </td>
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "30%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       = {d.grandTotal - d.discountAmount}
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </div>
//                               <div className="row mx-auto">
//                                 <table className="col mx-auto">
//                                   <tr
//                                     className=" border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         border: "1px solid black",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       SKU code
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       taxable amount
//                                     </td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       cgst amount
//                                     </td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       sgst amount
//                                     </td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       cess amount
//                                     </td>
//                                   </tr>
//                                   {d.OrderProducts.map((f) => (
//                                     <tr
//                                       className=" border-secondary"
//                                       style={{
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       <td
//                                         className=" px-1 border-secondary"
//                                         style={{
//                                           width: "40%",
//                                           border: "1px solid black",
//                                           fontWeight: "bold",
//                                         }}
//                                       >
//                                         {f.Product.sku}
//                                       </td>
//                                       <td
//                                         className="border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {d.invoiceDetail.taxableAmount}
//                                       </td>{" "}
//                                       <td
//                                         className=" border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           height: "20px",
//                                           border: "1px solid black",
//                                         }}
//                                       ></td>
//                                       <td
//                                         className="border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {f.Product.cgst}
//                                       </td>
//                                       <td
//                                         className=" border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {f.Product.sgst}
//                                       </td>
//                                       <td
//                                         className=" border-secondary"
//                                         style={{
//                                           width: "12%",
//                                           border: "1px solid black",
//                                         }}
//                                       >
//                                         {d.invoiceDetail.cessAmount}
//                                       </td>
//                                     </tr>
//                                   ))}

//                                   <tr
//                                     className=" border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         border: "1px solid black",
//                                         fontWeight: "bold",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         height: "20px",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>
//                                   </tr>
//                                   <tr
//                                     className=" border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         border: "1px solid black",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       Inv Date:dd/mm/yyyy HH:MM:SS
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       Shipment ID
//                                     </td>
//                                     <td
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         height: "20px",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       {d.id}
//                                     </td>
//                                   </tr>
//                                   <tr
//                                     className=" border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         border: "1px solid black",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       tax invoice:#
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       {d.invoiceDetail.taxInvoice}
//                                     </td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       Order ID
//                                     </td>
//                                     <td
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         height: "20px",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       {d.id}
//                                     </td>
//                                   </tr>
//                                   <tr
//                                     className=" border-secondary"
//                                     style={{
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "40%",
//                                         border: "1px solid black",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       payment Mode
//                                     </td>
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       {d.paymentType}
//                                     </td>{" "}
//                                     <td
//                                       className="border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       Payment ref #
//                                     </td>
//                                     <td
//                                       style={{
//                                         width: "12%",
//                                       }}
//                                     ></td>
//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "12%",
//                                         height: "20px",
//                                         border: "1px solid black",
//                                       }}
//                                     >
//                                       {d.paymentStatus}
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </div>
//                               <div className="row mx-auto">
//                                 <table className="col mx-auto">
//                                   <tr className=" border-secondary" style={{}}>
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "50%",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       Customer care toll free number: 1800 xxxx
//                                       xxxx 0005
//                                     </td>

//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "50%",
//                                       }}
//                                     >
//                                       Customer care email id:
//                                       support@fortune.com
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </div>
//                               <div className="row mx-auto">
//                                 <table className="col mx-auto">
//                                   <tr className=" border-secondary" style={{}}>
//                                     <td
//                                       className=" px-1 border-secondary"
//                                       style={{
//                                         width: "50%",
//                                         fontWeight: "bold",
//                                       }}
//                                     >
//                                       Please refer to our website link:
//                                       <Link
//                                         to="http://i-managed.biz/fortune-online-v1/v2/#/"
//                                         className="mx-2"
//                                       >
//                                         {" "}
//                                         www.fortune-online.com
//                                       </Link>{" "}
//                                       for Privacy Policy
//                                     </td>

//                                     <td
//                                       className=" border-secondary"
//                                       style={{
//                                         width: "50%",
//                                       }}
//                                     >
//                                       Terms & Conditions Applied *
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </div>
//                             </div>
//                           ))
//                         : ""}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     isLoading: state.order.isLoading,
//     isAuthUser: state.order.isAuthUser,
//     error: state.error,
//     order: state.order.order_det,
//   };
// };

// ComponentToPrint.propTypes = {
//   getUsers: PropTypes.func.isRequired,
//   fetchOrderListinovie: PropTypes.func.isRequired,
//   login: PropTypes.object.isRequired,
//   error: PropTypes.object.isRequired,
// };
// export default connect(mapStateToProps, { fetchOrderListinovie })(
//   ComponentToPrint
// );
