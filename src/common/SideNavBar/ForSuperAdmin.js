import React from "react";
import { Link } from "react-router-dom";
class SideNavBar extends React.Component {
  render() {
    return (
      <nav className="pcoded-navbar noprint" id="admin_menu">
        <div className="pcoded-inner-navbar main-menu">
          <ul className="pcoded-item pcoded-left-item">
            <li className="">
              <Link to="/">
                <span className="pcoded-micon">
                  <i className="icofont icofont-dashboard"></i>
                </span>
                <span className="pcoded-mtext">Dashboard</span>
              </Link>
            </li>
            {/* {localStorage.getItem('userCreation')== 'true' ?
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-contact-add"></i>
                </span>
                <span className="pcoded-mtext">Users</span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/users-hoAdmin">
                    <span className="pcoded">HO Admin</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/users-zonal">
                    <span className="pcoded">Zonal Admin</span>
                  </Link>
                </li> 
            {localStorage.getItem('Sellerview')== 'true' ?

                <li className=" ">
                  <Link to="/users-seller">
                    <span className="pcoded">Seller</span>
                  </Link>
                </li>
                :null}

                {localStorage.getItem('Customerview')== 'true' ?
                <li className=" ">
                  <Link to="/users-customer">
                    <span className="pcoded">Unregistered Customers</span>
                  </Link>
                </li>:null}
                {localStorage.getItem('Customerview')== 'true' ?
                <li className=" ">
                  <Link to="/otp-registered-customer">
                    <span className="pcoded">OTP Registered Customers</span>
                  </Link>
                </li>:null}

                {localStorage.getItem('Guestview')== 'true' ?
                <li className=" ">
                  <Link to="/guest-customer">
                    <span className="pcoded">Guest Customer</span>
                  </Link>
                </li>:null}
              </ul>
            </li>
            :null} */}
             
              
            <div className="pcoded-navigatio-lavel">Master</div>
{/*       
            {localStorage.getItem("HomeScreen") == 'true' ? 

              <li className=" pcoded-hasmenu">
                <a href="javascript:void(0)">
                  <span className="pcoded-micon">
                    <i className="icofont icofont-ui-home"></i>
                  </span>
                  <span className="pcoded-mtext">Home Screen Mapping</span>
                </a>
               

                <ul className="pcoded-submenu">
                {localStorage.getItem('BestDeal')== 'true' ?
                  <li className=" ">
                    <Link to="/best-deals">
                      <span className="pcoded">Best Deal</span>
                    </Link>
                  </li>:null}
                  {localStorage.getItem('NewArrival')== 'true' ?

                  <li className=" ">
                    <Link to="/new-arrivals">
                      <span className="pcoded">New Arrival</span>
                    </Link>
                  </li>:null}
                  <li className=" ">
                  <Link to="/banners">
                    <span className="pcoded">Banners</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/home-categories">
                    <span className="pcoded">Top Categories</span>
                  </Link>
                </li>
                {localStorage.getItem('role')== 'admin' ?
                  <li className=" ">
                    <Link to="/order_homescreen">
                      <span className="pcoded">Order Of Home Screen</span>
                    </Link>
                  </li>:null}
                </ul>
              </li>
          :null} */}
        {/* {localStorage.getItem('Order')=='true'?
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-cart-alt"></i>
                </span>
                <span className="pcoded-mtext">Orders</span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/orders-pending">
                    <span className="pcoded">Order Pending</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/orders-completed">
                    <span className="pcoded">Completed</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/orders-cancelled">
                    <span className="pcoded">Cancelled</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/orders">
                    <span className="pcoded">All Orders</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/orders-dms">
                    <span className="pcoded">DMS Orders</span>
                  </Link>
                </li>
              </ul>
            </li>
               :null} */}
          {/* {localStorage.getItem('PaymentStatus')=='true'?

            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-wallet"></i>
                </span>
                <span className="pcoded-mtext">Payment Status</span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/prepaid-orders">
                    <span className="pcoded">Prepaid Orders</span>
                  </Link>
                </li>

                <li className=" ">
                  <Link to="/postpaid-orders">
                    <span className="pcoded">Post Paid Orders</span>
                  </Link>
                </li>
              </ul>
            </li>
            :null} */}

            {/* {localStorage.getItem("Category") == 'true' ? 
              
                <li className=" ">
                  <Link to="/category">
                    <span className="pcoded-micon">
                      <i className="feather icon-jfi-view-grid"></i>
                    </span>
                    <span className="pcoded-mtext">Category Master</span>
                  </Link>
                </li>
                :null
            } */}
               {/* {localStorage.getItem("kyc") === 'true' ? 

                <li className=" pcoded-hasmenu">
                <a href="javascript:void(0)">
                  <span className="pcoded-micon">
                  <i className="f-18 icofont icofont-ebook"></i>
                  </span>
                  <span className="pcoded-mtext">Customer KYC</span>
                </a>
               

                <ul className="pcoded-submenu">

                  <li className=" ">
                  <Link to="/customer_kyc">
                   
                    <span className="pcoded">Pending KYC</span>
                   </Link>
                  </li>

                  <li className=" ">
                  <Link to="/customer_kyc_approved">
                   
                    <span className="pcoded">Approved KYC</span>
                   </Link>
                  </li>
                 
                 
                  
                
                </ul>
              </li>




        
            :null} */}



{/* {localStorage.getItem("seller_customer") === 'true' ? 
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
              <span className="pcoded-micon">
                  <i className="f-18 icofont icofont-site-map"></i>
                </span>
                <span className="pcoded-mtext">Seller Customer</span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                <Link to="/seller_customer">
               
                <span className="pcoded-mtext">Mapping List</span>
              </Link>
             </li>
                <li>
                <Link to="/customer_intrested_category">
               
               <span className="pcoded-mtext">Intrested category</span>
             </Link>
                </li>
                
              </ul>
            </li>
               :null} */}

                {/* {localStorage.getItem("seller_customer") === 'true' ? 
            <li className="">
              <Link to="/seller_customer">
                <span className="pcoded-micon">
                  <i className="f-18 icofont icofont-site-map"></i>
                </span>
                <span className="pcoded-mtext">Seller Customer Mapping</span>
              </Link>
            </li>
            :null} */}
               {/* {localStorage.getItem("beat") === 'true' ? 
            <li className="">
              <Link to="/beat_list">
                <span className="pcoded-micon">
                  <i className="f-18 icofont icofont-map-pins"></i>
                </span>
                <span className="pcoded-mtext">Beat </span>
              </Link>
            </li>
            :null}
               {localStorage.getItem("salesman") === 'true' ? 
            <li className="">
              <Link to="/salesman_list">
                <span className="pcoded-micon">
                  <i className="f-18 icofont icofont-business-man-alt-1"></i>
                </span>
                <span className="pcoded-mtext">Salesman </span>
              </Link>
            </li>
            :null} */}
{/* 
            {localStorage.getItem("InventoryUpdate") == 'true' ? 
                <li className=" ">
                  <Link to="/inventory">
                    <span className="pcoded-micon">
                      <i className="icofont icofont-box"></i>
                    </span>
                    <span className="pcoded-mtext">Inventory update</span>
                  </Link>
                </li>
                 :null
                } */}
           
            {/* {localStorage.getItem("CancellationReason") == 'true' ? 
           
                <li className=" ">
                  <Link to="/cancellation-resaon">
                    <span className="pcoded-micon">
                      <i className="feather icon-settings"></i>
                    </span>
                    <span className="pcoded-mtext">Cancellation Reason </span>
                  </Link>
                </li>
                :null} */}
        {localStorage.getItem("SellerProduct") == 'true' ? 

                <li className=" ">
                  <Link to="/seller-product-catalogue">
                    <span className="pcoded-micon">
                      <i className="icofont icofont-instrument"></i>
                    </span>
                    <span className="pcoded-mtext">
                      Seller Product Catalogue{" "}
                    </span>
                  </Link>
                </li>
           :null}
           
            {/* <li className=" ">
              <Link to="/inventory">
                <span className="pcoded-micon">
                  <i className="icofont icofont-box"></i>
                </span>
                <span className="pcoded-mtext">Inventory update</span>
              </Link>
            </li>  */}
             {localStorage.getItem('Product')=='true'?
              <>
                <li className=" ">
                  <Link to="/products">
                    <span className="pcoded-micon">
                      <i className="feather icon-command"></i>
                    </span>
                    <span className="pcoded-mtext">Product Master Upload</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/category">
                    <span className="pcoded-micon">
                      <i className="feather icon-grid"></i>
                    </span>
                    <span className="pcoded-mtext">Category Master</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/brands">
                    <span className="pcoded-micon">
                      <i className="feather icon-grid"></i>
                    </span>
                    <span className="pcoded-mtext">Brand Master</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/UOMs">
                    <span className="pcoded-micon">
                      <i className="feather icon-grid"></i>
                    </span>
                    <span className="pcoded-mtext">UOM Master</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/bags">
                    <span className="pcoded-micon">
                      <i className="feather icon-grid"></i>
                    </span>
                    <span className="pcoded-mtext">Bags Master</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/ports">
                    <span className="pcoded-micon">
                      <i className="feather icon-grid"></i>
                    </span>
                    <span className="pcoded-mtext">Port Master</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/product-Department">
                    <span className="pcoded-micon">
                      <i className="feather icon-grid"></i>
                    </span>
                    <span className="pcoded-mtext">Product Department</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/delivery-type">
                    <span className="pcoded-micon">
                      <i className="feather icon-grid"></i>
                    </span>
                    <span className="pcoded-mtext">Delivery Type Master</span>
                  </Link>
                </li>
              </>
            :null}
           {localStorage.getItem('SellerDetails')=='true'?

            <li className="">
              <Link to="/seller">
                <span className="pcoded-micon">
                  <i className="icofont icofont-users-alt-3"></i>
                </span>
                <span className="pcoded-mtext">Seller Details</span>
              </Link>
            </li>
            :null}

           {/* {localStorage.getItem('SellerInvoice')=='true'?

              <li className="">
                 <Link to="/seller/invoice">
                    <span className="pcoded-micon">
                    <i className="icofont icofont-papers"></i>
                     </span>
                      <span className="pcoded-mtext">Seller Invoice</span>
                 </Link>
              </li>
            :null} */}

           {localStorage.getItem('SellerPincode')=='true'?

            <li className=" ">
              {/* <Link to="/sellerpincode">
                <span className="pcoded-micon">
                  <i className="icofont icofont-location-pin"></i>
                </span>
                <span className="pcoded-mtext">Seller Pin Code</span>
              </Link> */}
            </li>:null}
          </ul>
          <ul className="pcoded-item pcoded-left-item">
            {/* <li className=" ">
              <Link to="/sellerproduct">
                <span className="pcoded-micon">
                  <i className="feather icon-image"></i>
                </span>
                <span className="pcoded-mtext">Seller Product</span>
              </Link>
            </li> */}
      {/* {localStorage.getItem('PaymentMethod')=='true'?

            <li className=" ">
              <Link to="/payment">
                <span className="pcoded-micon">
                  <i className="icofont icofont-credit-card"></i>
                </span>
                <span className="pcoded-mtext">Payment Method</span>
              </Link>
            </li>
            :null}
            {localStorage.getItem("PaymentSetting") == 'true' ? 

            <li className=" ">
              <Link to="/Login/SellerPaytmControl">
                <span className="pcoded-micon">
                  <i className="icofont icofont-settings"></i>
                </span>
                <span className="pcoded-mtext">Payment Settings</span>
              </Link>
            </li>
            :null} */}
            {/* {localStorage.getItem('role')==="admin"?
           <li className=" ">
              <Link to="/role">
                <span className="pcoded-micon">
                  <i className="icofont icofont-contact-add"></i>
                </span>
                <span className="pcoded-mtext">Role Creation & Mapping</span>
              </Link>
          </li> 
          :null} */}
            {/* {localStorage.getItem('role')==="admin"?
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-automation"></i>
                </span>
                <span className="pcoded-mtext">Configurable Feild </span>
              </a>
              <ul className="pcoded-submenu">
                <li className=" ">
                  <Link to="/ordervalue&_prepaidorder_value">
                    <span className="pcoded">
                      Order Value & Prepaid Order Value
                    </span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/delivery_charges">
                    <span className="pcoded">Delivery Charges</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/cart_value">
                    <span className="pcoded">Cart Value</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/order_limit">
                    <span className="pcoded">Order Limit</span>
                  </Link>
                </li>
              </ul>
            </li>             
            
            :null} */}
             {/* {localStorage.getItem("CouponMaster") == "true" ? 
               <li className=" ">
                <Link to="/coupon-master">
                  <span className="pcoded-micon">
                    <i className="icofont icofont-contact-add"></i>
                  </span>
                  <span className="pcoded-mtext">Coupon Master</span>
                </Link>
              </li>
             : null} */}


               {/* {localStorage.getItem("role") === "admin" ? (
              <li className="">
               
                  <Link to="/notification/list">
                  <span className="pcoded-micon">
                    <i className="icofont icofont-bell-alt"></i>
                  </span>
                  <span className="pcoded-mtext">Notification </span>
                  </Link>
                
              </li>
            ) : null} */}
       {/* {localStorage.getItem("MediaMaster") == "true" ? 
               <li className=" pcoded-hasmenu">
                <a href="javascript:void(0)">
                  <span className="pcoded-micon">
                    <i className="icofont icofont-image"></i>
                  </span>
                  <span className="pcoded-mtext">Media Master </span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <Link to="/gallery/banner">
                      <span className="pcoded">Banner</span>
                    </Link>
                  </li> 
                  <li className=" ">
                    <Link to="/gallery/coupon">
                      <span className="pcoded">Coupon</span>
                    </Link>
                  </li> 
                  <li className=" ">
                    <Link to="/gallery/notification">
                      <span className="pcoded">Notification</span>
                    </Link>
                  </li>
                  <li className=" ">
                    <Link to="/gallery/category">
                      <span className="pcoded">Category</span>
                    </Link>
                  </li>
                   <li className=" ">
                    <Link to="/product_media">  
                      <span className="pcoded">Product</span>
                    </Link>
                  </li>
                
                </ul>
              </li>
          :null} */}

{/* 
{localStorage.getItem("Notification") == "true" ? 
              <li className=" pcoded-hasmenu">
                <a href="javascript:void(0)">
                  <span className="pcoded-micon">
                    <i className="icofont icofont-bell-alt"></i>
                  </span>
                  <span className="pcoded-mtext">Notification </span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <Link to="/notification/list">
                      <span className="pcoded">Template List</span>
                    </Link>
                  </li>
                 
                </ul>
              </li>
:null} */}
{/* {localStorage.getItem("Delivery") == "true" ? 

         <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="icofont icofont-fast-delivery"></i>
                </span>
                <span className="pcoded-mtext">Delivery</span>
              </a>
              <ul className="pcoded-submenu">
                 <li className=" ">
                  <Link to="/delivery-inprocess">
                    <span className="pcoded">In Process</span>
                  </Link>
                </li>
                 <li className=" ">
                  <Link to="/delivery-completed">
                    <span className="pcoded">Completed</span>
                  </Link>
                </li> 
               
                <li className=" ">
                  <Link to="/delivery-boy-list">
                    <span className="pcoded">Delivery Person List</span>
                  </Link>
                </li>
                {localStorage.getItem('DeliveryBoyAssign')=='true'?
               <li className=" ">
                  <Link to="/delivery-boy-manage">
                    <span className="pcoded">Delivery Person Assign</span>
                  </Link>
                </li>
                :null}

          </ul> 
            </li> :null} */}
           
            {/* {localStorage.getItem("Reports") == 'true' 
             ? (
              <li className=" pcoded-hasmenu">
                <a href="javascript:void(0)">
                  <span className="pcoded-micon">
                    <i className="icofont icofont-read-book"></i>
                  </span>
                  <span className="pcoded">Reports</span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                  <Link to="/coupon-usage-report">
                    <span className="pcoded">Coupon Usage Report</span>
                  </Link>
                </li>  
                  <li className=" ">
                  <Link to="/seller-pin-code-mapping-report">
                    <span className="pcoded">
                      Seller Pin Code Mapping Report
                    </span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/price-upload">
                    <span className="pcoded">Price Upload</span>
                  </Link>
                </li>
             
                  <li className=" ">
                    <Link to="/Sales_Report">
                      <span className="pcoded">Sales Report</span>
                    </Link>
                  </li>
                  
                  <li className=" ">
                  <Link to="/order-cancellation-analysis">
                    <span className="pcoded">Order Cancellation Analysis</span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/seller-performance-reports">
                    <span className="pcoded">Seller Performance Reports</span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/offender-report">
                    <span className="pcoded">Offender Report</span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/profitability-report-seller-wise">
                    <span className="pcoded">
                      Profitability Report -seller wise
                    </span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/cod-prepaid-order">
                    <span className="pcoded">COD Postpaid Order</span>
                  </Link>
                </li> 
               
                  <li className=" ">
                  <Link to="/sales-register">
                    <span className="pcoded">Sales Register</span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/order-register">
                    <span className="pcoded">Order </span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/customer-report">
                    <span className="pcoded">Customer Report</span>
                  </Link>
                </li>

                  <li className=" ">
                    <Link to="/daily-payment-register">
                      <span className="pcoded">Daily Payment </span>
                    </Link>
                  </li>

                  <li className=" ">
                    <Link to="/inventory-upload-report">
                      <span className="pcoded">Inventory </span>
                    </Link>
                  </li>

                  <li className=" ">
                    <Link to="/customer-report">
                      <span className="pcoded">Unregistered Customers </span>
                    </Link>
                  </li>

                  <li className=" ">
                    <Link to="/consumer-feedback-report">
                      <span className="pcoded">Customer Feedbacks</span>
                    </Link>
                  </li>

                  <li className=" ">
                  <Link to="/product-master-upload">
                    <span className="pcoded">Product Master Upload</span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/seller-upload">
                    <span className="pcoded">Seller Details</span>
                  </Link>
                </li>
                  <li className=" ">
                  <Link to="/consumer-feedback-report">
                    <span className="pcoded">Consumer Feedback Report</span>
                  </Link>
                </li>
                
                
                </ul>
              </li>
            ) : null} */}

            {/* {localStorage.getItem("role") === "admin" ? (
              <li className=" pcoded-hasmenu">
                <a href="javascript:void(0)">
                  <span className="pcoded-micon">
                    <i className="icofont icofont-bell-alt"></i>
                  </span>
                  <span className="pcoded-mtext">Notification </span>
                </a>
                <ul className="pcoded-submenu">
                  <li className=" ">
                    <Link to="/notification-superadmin">
                      <span className="pcoded">Super Admin</span>
                    </Link>
                  </li>
                  <li className=" ">
                    <Link to="/notification-seller">
                      <span className="pcoded">Seller</span>
                    </Link>
                  </li>
                  <li className=" ">
                    <Link to="/notification-customer">
                      <span className="pcoded">Customer</span>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null} */}
            {localStorage.getItem('Location')=='true'?
            <li className=" pcoded-hasmenu">
              <a href="javascript:void(0)">
                <span className="pcoded-micon">
                  <i className="feather icon-map-pin"></i>
                </span>
                <span className="pcoded">Location Master</span>
              </a>
              <ul className="pcoded-submenu">
                {localStorage.getItem('role')==='admin'?
                 <li className=" ">
                 <Link to="/country">
                   <span className="pcoded">Country</span>
                 </Link>
               </li> :null}
               
                {/* <li className=" ">
                  <Link to="/State">
                    <span className="pcoded">State</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/city">
                    <span className="pcoded">City</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/area">
                    <span className="pcoded">Area /Pincode</span>
                  </Link>
                </li> */}
              </ul>
            </li>
            :null}
            {/* {localStorage.getItem('role')==='admin'?
            <li className=" pcoded-hasmenu">
              <Link href="javascript:void(0)" >
                <span className="pcoded-micon">
                  <i className="feather icon-book"></i>
                </span>
                <span className="pcoded">Import Sheet Logs</span>
              </Link>
              <ul className="pcoded-submenu">
                 <li className=" ">
                 <Link to="/logs/location Catalogue">
                   <span className="pcoded">Location Catalogue</span>
                 </Link>
               </li> 
               <li className=" ">
                  <Link to="/logs/Product Catalogue">
                    <span className="pcoded">Product Master Catalogue</span>
                  </Link>
                </li>
               
                <li className=" ">
                  <Link to="/logs/Seller Product Catalogue">
                    <span className="pcoded">Seller Product Catalogue </span>
                  </Link>
                </li>
               <li className=" ">
                  <Link to="/logs/Seller Catalogue">
                    <span className="pcoded">Seller Catalogue</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/logs/Seller Customer Catalogue">
                    <span className="pcoded">Seller Customer Catalogue</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/logs/Salesman Catalogue">
                    <span className="pcoded">Salesman Catalogue</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/logs/Beat Catalogue">
                    <span className="pcoded">Beat Catalogue</span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/logs/TopDeal Catalogue">
                    <span className="pcoded">Best Deal </span>
                  </Link>
                </li>
                <li className=" ">
                  <Link to="/logs/NewArrival Catalogue">
                    <span className="pcoded">New Arrival</span>
                  </Link>
                </li>
              </ul>
            </li>
            :null} */}

{/* {localStorage.getItem('UserMaster')=='true'?

<li className=" pcoded-hasmenu">
  <Link href="javascript:void(0)" >
    <span className="pcoded-micon">
      <i className="feather icon-users"></i>
    </span>
    <span className="pcoded">User Master</span>
  </Link>

  <ul className="pcoded-submenu">
     <li className=" ">
     <Link to="/group/list">
       <span className="pcoded">Group List</span>
     </Link>
   </li> 
  
   <li className=" ">
      <Link to="/group/assign/list">
        <span className="pcoded">Group Featurs Assigned  </span>
      </Link>
    </li>
   
    <li className=" ">
      <Link to="/user/list">
        <span className="pcoded">User Creation</span>
      </Link>
    </li>
    <li className=" ">
      <Link to="/user/assign/list">
        <span className="pcoded">User Features Assign  </span>
      </Link>
    </li>
   
   
  </ul>
</li>
:null} */}
          </ul>

          {/* {localStorage.getItem("Settings") == "true" ? 

            <div className="pcoded-navigatio-lavel">Settings</div>

           : null} */}

            <ul className="pcoded-item pcoded-left-item">
            {/* {localStorage.getItem("Terms") == "true" ? 

              <li className="">
                <Link to="/terms">
                  <span className="pcoded-micon">
                    <i className="feather icon-refresh-ccw"></i>
                  </span>
                  <span className="pcoded-mtext">Terms & conditions</span>
                </Link>
              </li>
              :null} */}
           
                        {/* {localStorage.getItem("Privacy") == "true" ? 

              <li className="">
                <Link to="/privacy-policy">
                  <span className="pcoded-micon">
                    <i className="feather icon-refresh-ccw"></i>
                  </span>
                  <span className="pcoded-mtext">Privacy Policy</span>
                </Link>
              </li>       :null}
            {localStorage.getItem("About") == "true" ? 

              <li className="">
                <Link to="/about">
                  <span className="pcoded-micon">
                    <i className="icofont icofont-law-document"></i>
                  </span>
                  <span className="pcoded-mtext">About Us</span>
                </Link>
              </li>       :null}
              {localStorage.getItem("Contact") == "true" ? 

              <li className="">
                <Link to="/contact-us">
                  <span className="pcoded-micon">
                    <i className="feather icon-phone"></i>
                  </span>
                  <span className="pcoded-mtext">Contact Us</span>
                </Link>
              </li>
               :null} */}
            </ul>
        
        </div>
      </nav>
    );
  }
}
export default SideNavBar;