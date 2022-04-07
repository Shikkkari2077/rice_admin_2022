/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Login from "./common/Login.js";
import Home from "./common/Home.js";
import Dashboard from "./common/Dashboard.js";
import LanguageList from "./components/LanguageMaster/LanguageList.js";
import LanguageAdd from "./components/LanguageMaster/LanguageAdd.js";

import CategoryList from "./components/CategoryMaster/CategoryList.js";
import CategoryAddTab from "./components/CategoryMaster/CategoryAddTab.js";

import CountryList from "./components/LocationMaster/CountryMaster/CountryList.js";

import StateList from "./components/LocationMaster/StateMaster/StateList.js";
import StateAddTab from "./components/LocationMaster/StateMaster/StateAddTab.js";

import AreaList from "./components/LocationMaster/AreaMaster/AreaList.js";
import AreaAddTab from "./components/LocationMaster/AreaMaster/AreaAddTab.js";

import ProductList from "./components/ProductMaster/ProductList.js";
import ProductAddTab from "./components/ProductMaster/ProductAddTab.js";

import OrderList from "./components/OrdersMaster/OrderList.js";

import OrderView from "./components/OrdersMaster/OrderView.js";

// import BuyerPolicyTab from "./components/BuyerPolicy/BuyerPolicyTab.js";
import TermsAddTab from "./components/Terms/TermsAddTab.js";
import AboutUsAddTab from "./components/AboutUs/AboutUsAddTab.js";
import ContactUsList from "./components/ContactUs/ContactUsList.js";

import BannerList from "./components/CancellationReasonMaster/CanReasonList.js";
import BannerAddTab from "./components/CancellationReasonMaster/CanReasonAddTab.js";
import GeneralSettingAddTab from "./components/Configurable/OrderValue&PrepaidValue/OrderValuePrepaidAddTab.js";

import UserList from "./components/UserMaster/Customer/UserList.js";
import UserAddTab from "./components/UserMaster/Customer/UserAddTab.js";

import AttributeList from "./components/AttributeMaster/AttributeList.js";
import AttributeAddTab from "./components/AttributeMaster/AttributeAddTab.js";

import AttributeValueList from "./components/AttributeValueMaster/AttributeValueList.js";
import AttributeValueAddTab from "./components/AttributeValueMaster/AttributeValueAddTab.js";

import BlogList from "./components/BlogMaster/BlogList.js";
import BlogAddTab from "./components/BlogMaster/BlogAddTab.js";
import BlogComments from "./components/BlogMaster/BlogComments.js";

import CustomizedList from "./components/CustomizedProductMaster/CustomizedList.js";
import CustomizedAddTab from "./components/CustomizedProductMaster/CustomizedAddTab.js";
import CountryAddTab from "./components/LocationMaster/CountryMaster/CountryAddTab.js";
import RefundPolicyAddTab from "./components/RefundPolicy/RefundPolicyAddTab.js";
import PrivacyPolicyAddTab from "./components/PrivacyPolicy/PrivacyPolicyAddTab.js";
import CancellationPolicyAddTab from "./components/CancellationPolicy/CancellationPolicyAddTab.js";
import SellerList from "./components/SellerMaster/SellerList.js";
import SellerAddTab from "./components/SellerMaster/SellerAddTab.js";
import SellerpincodeList from "./components/SellerPincode/SellerPincodeList.js";
import SellerPincodeAddTab from "./components/SellerPincode/SellerPincodeAddTab.js";
import SellerProductAddTab from "./components/SellerProduct/SellerProductAddTab.js";
import SellerProductList from "./components/SellerProduct/SellerProductList.js";
import RoleList from "./components/RoleCreationMaster/RoleList.js";
import RoleCreationTabAdd from "./components/RoleCreationMaster/RoleCreationTabAdd.js";
import PaymentTabAdd from "./components/PaymentMaster/PaymentTabAdd.js";
import PaymentList from "./components/PaymentMaster/PaymentList.js";
import OrderValuePrepaidAddTab from "./components/Configurable/OrderValue&PrepaidValue/OrderValuePrepaidAddTab.js";
import DeliveryChargesAddTab from "./components/Configurable/DeliveryCharge/DeliveryChargesAddTab.js";
import CartValueAddTab from "./components/Configurable/CartValue/CartValueAddTab.js";
import OrderLimitAddTab from "./components/Configurable/OrderLimit/OrderLimitAddTab.js";
import CityList from "./components/LocationMaster/CityMaster/CityList.js";
import CityAddTab from "./components/LocationMaster/CityMaster/CityAddTab.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImportData from "./common/ImportData.js";
import OrderCompleted from "./components/OrdersMaster/OrderCompleted.js";
import OrderPending from "./components/OrdersMaster/OrderPending.js";
import OrderCancelled from "./components/OrdersMaster/OrderCancelled.js";
import InventryUpdate from "./components/Inventory/InventryUpdate.js";
import CompletedDelivery from "./components/DeliveryMaster/CompletedDelivery.js";
import InProcessDelivery from "./components/DeliveryMaster/InProcessDelivery.js";
import DelayedDelivery from "./components/DeliveryMaster/DelayedDelivery.js";
import PrepaidOrder from "./components/PaymentMaster/PrepaidOrder.js";
import PostPaidOrder from "./components/PaymentMaster/PostPaidOrder.js";
import Invocie from "./components/Invoice/Invoice.js";
import SellerPinCodeMappingReport from "./components/Reports/SellerPinCodeMappingReport.js";
import PriceUpload from "./components/Reports/PriceUpload.js";
import OrderCancellationAnalysis from "./components/Reports/OrderCancellationAnalysis.js";
import SellerPerformanceReports from "./components/Reports/SellerPerformanceReports.js";
import OffenderReport from "./components/Reports/OffenderReport.js";
import ProfitabilityReportSellerWise from "./components/Reports/ProfitabilityReportSellerWise.js";
import CODPostpaidOrder from "./components/Reports/CODPostpaidOrder.js";
import SalesRegister from "./components/Reports/SalesRegister.js";
import OrderRegister from "./components/Reports/OrderRegister.js";
import DailyPaymentRegister from "./components/Reports/DailyPaymentRegister.js";
import ProductMasterUpload from "./components/Reports/ProductMasterUpload.js";
import SellerUpload from "./components/Reports/SellerUpload.js";
import ConsumerFeedbackReport from "./components/Reports/ConsumerFeedbackReport.js";
import InventoryUploadReport from "./components/Reports/InventoryUploadReport.js";
import ExceptionalAlertReport from "./components/Reports/ExceptionalAlertReport.js";
import OrderFillRateReport from "./components/Reports/OrderFillRateReport.js";
import SellerWiseBelowReOrderLevel from "./components/Reports/SellerWiseBelowReOrderLevel.js";
import OrderFillTimeReport from "./components/Reports/OrderFillTimeReport.js";
import HomeMasterList from "./components/HomeMaster/HomeMasterList.js";
import HomeAddTab from "./components/HomeMaster/HomeAddTab.js";
import CouponUsageReport from "./components/Reports/CouponUsageReport.js";
import CouponList from "./components/CouponMaster/CouponList.js";
import CouponAddTab from "./components/CouponMaster/CouponAddTab.js";
import HoAdminList from "./components/UserMaster/HOAdmin/HoAdminList.js";
import HoAdminAddTab from "./components/UserMaster/HOAdmin/HoAdminAddTab.js";
import ZonalList from "./components/UserMaster/ZonalAdmin/ZonalList.js";
import ZonalAddTab from "./components/UserMaster/ZonalAdmin/ZonalAddTab.js";
import UserSellerList from "./components/UserMaster/Seller/UserSellerList.js";
import UserSellerAddTab from "./components/UserMaster/Seller/UserSellerAddTab.js";
import CustomerReport from "./components/Reports/CustomerReport";
import DeliveryBoyReport from "./components/Reports/DeliveryBoyReport.js";
import DeliveryBoyManage from "./components/DeliveryMaster/DeliveryBoyManage.js";
import DeliveryBoyList from "./components/DeliveryMaster/DeliveryBoyList.js";
import DeliveryBoyAddTab from "./components/DeliveryMaster/DeliveryBoyAddTab.js";
import SellerProductCatalogueList from "./components/SellerProductCatelog/SellerProductCatalogueList.js";
import SellerProductCatalogueAddTab from "./components/SellerProductCatelog/SellerProductCatalogueAddTab.js";
import CustomerNotification from "./components/Notification/CustomerNotification.js";
import SellerNotification from "./components/Notification/SellerNotifcation.js";
import SuperAdminNotification from "./components/Notification/SuperAdminNotification.js";
import LowInventoryReport from "./components/Reports/CancellationRefund.js";
import CancellationRefund from "./components/Reports/LowInventoryReport.js";
import AboutUsDetails from "./components/AboutUs/AboutUsDetails.js";
import BestDeals from "./components/HomeScreenMapping/BestDeals.js";
import HomeBanner from "./components/HomeScreenMapping/HomeBanner.js";
import NewArrivals from "./components/HomeScreenMapping/NewArrivals.js";
import HomeCategories from "./components/HomeScreenMapping/HomeCategories.js";
import BestDealsAdd from "./components/HomeScreenMapping/BestDealsAdd.js";
import HomeBannerAdd from "./components/HomeScreenMapping/HomeBannerAdd.js";
import HomeCategoryAdd from "./components/HomeScreenMapping/HomeCategoryAdd.js";
import NewArrivalAdd from "./components/HomeScreenMapping/NewArrivalAdd.js";
import OrderHomeScreen from "./components/HomeScreenMapping/OrderHomeScreen.js";
import SellerProductListing from "./components/SellerProduct/SellerProductListing.js";
import CanReasonList from "./components/CancellationReasonMaster/CanReasonList.js";
import CanReasonAddTab from "./components/CancellationReasonMaster/CanReasonAddTab.js";
import GuestUserList from "./components/UserMaster/Customer/GuestUserList.js";
import InventoryAddTab from "./components/Inventory/InventoryAddTab.js";
// import PaymentReportAll from "./components/Reports/Payment Report/PaymentReportAll.js";
// import PaymentReportCod from "./components/Reports/Payment Report/PaymentReportCod.js";
// import PaymentReportOnline from "./components/Reports/Payment Report/PaymentReportOnline.js";
import SalesAll from "./components/Reports/SalesAll.js";
import NotificationList from "./components/NotificationMaster/NotificationList.js";
import NotificationAddTab from "./components/NotificationMaster/NotificationAddTab.js";
import NoificationLogs from "./components/NotificationMaster/NotificationLogs.js";
import NotificationLogs from "./components/NotificationMaster/NotificationLogs.js";
import CustomerLogsPopUp from "./components/NotificationMaster/CustomerLogsPopUp,.js";
import SellerPaymentLogin from "./components/SellerPaymentControl/SellerPaymentLogin.js";
import SellerPaymentList from "./components/SellerPaymentControl/SellerPaymentList.js";
import SellerPaymentAddTab from "./components/SellerPaymentControl/SellerPaymentAddTab.js";
//import Category from "./components/MediaMaster/Category.js";
import Banner from "./components/MediaMaster/Banner.js";
import ProductMediaList from "./components/MediaMaster/ProductMediaList.js";
import BannerMediaAdd from "./components/MediaMaster/BannerMediaAdd.js";
import LogList from "./components/Logs/LogList.js";
import GroupsList from "./components/UserPermissionsMaster/Groups/GroupsList.js";
import GroupAddTab from "./components/UserPermissionsMaster/Groups/GroupAddTab.js";
import PolicyAssignList from "./components/UserPermissionsMaster/GroupPolicyAssign/PolicyAssignList.js";
import UserPolicyAssignAdd from "./components/UserPermissionsMaster/UserPolicyAssign/UserPolicyAssignAdd.js";
import DeliverySlotsList from "./components/DeliveryMaster/DeliverySlotsList.js";
import DeliverySlotsAddTab from "./components/DeliveryMaster/DeliverySlotsAddTab.js";
import UserCreationList from "./components/UserPermissionsMaster/UserCreation/UserCreationList,.js";
import UserCreationAddTab from "./components/UserPermissionsMaster/UserCreation/UserCreationAddTab.js";
import PolicyAssignAdd from "./components/UserPermissionsMaster/GroupPolicyAssign/PolicyAssignAdd.js";
import UserAssignPolicyList from "./components/UserPermissionsMaster/UserPolicyAssign/UserAssignPolicyList.js";
import ProductMediaDetails from "./components/MediaMaster/ProductMediaDetails.js";
import PolicyList from "./components/UserPermissionsMaster/GroupPolicyAssign/PolicyList.js";
import UserPolicyAssignedList from "./components/UserPermissionsMaster/UserPolicyAssign/UserPolicyAssignedList.js";
import SellerInvoiceList from "./components/Invoice/SellerInvoice.List.js";
import SellerInvoiceAddTab from "./components/Invoice/SellerInvoiceAddTab.js";
import KYCList from "./components/KYC/KYCList.js";
import SubCategoryAddTab from "./components/SubCategory/SubCategoryAddTab.js";
import SubCategoryList from "./components/SubCategory/SubCategoryList.js";
import SellerCustomer from "./components/SellerCustomerMapping/SellerCustomer"
import SellerCustomerAddTab from "./components/SellerCustomerMapping/SellerCustomerAddTab.js";
import KYCListApproved from "./components/KYC/KYCListApproved.js";
import Beat from "./components/BeatMaster/Beat.js";
import SalesmanList from "./components/SalsesManMaster/SalesmanList.js";
import BannerGallery from "./components/MediaMaster/BannerGallery.js";
import UserEdit from "./components/SellerCustomerMapping/UserEdit.js";
import CustomerIntrestedCategory from "./components/SellerCustomerMapping/CustomerIntrestedCategory.js";
import DMSOrderList from "./components/DMS/DMSOrderList.js";
import OtpRegistered from "./components/UserMaster/Customer/OtpRegistered.js";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router baseName={"/"}>
        {localStorage.getItem("role") !== "admin" &&
        localStorage.getItem("role") !== "other" ? (
          <>
            {localStorage.getItem("role") === "seller" ? (
              <Home>
                <Route exact path={"/"} component={Dashboard} />
                <Route exact path={"/products"} component={ProductList} />
                <Route
                  exact
                  path={"/products/add/:product_id?"}
                  component={ProductAddTab}
                />
                <Route exact path={"/orders"} component={OrderList} />
                <Route
                  exact
                  path={"/orders-completed"}
                  component={OrderCompleted}
                />

                <Route
                  exact
                  path={"/orders-pending"}
                  component={OrderPending}
                />
                <Route
                  exact
                  path={"/orders-cancelled"}
                  component={OrderCancelled}
                />
                <Route
                  exact
                  path={"/sellerproduct-listing"}
                  component={SellerProductListing}
                />
                <Route
                  exact
                  path={"/seller-product-catalogue"}
                  component={SellerProductCatalogueList}
                />
                <Route
                  exact
                  path={"/seller-product-catalogue/add/:seller_product_id?/:sellerId?"}
                  component={SellerProductCatalogueAddTab}
                />
                <Route exact path={"/inventory"} component={InventryUpdate} />
                <Route
                  exact
                  path={"/inventory/edit/:product_id?"}
                  component={InventoryAddTab}
                />
                <Route
                  exact
                  path={"/delivery-delayed"}
                  component={DelayedDelivery}
                />
                <Route
                  exact
                  path={"/delivery-completed"}
                  component={CompletedDelivery}
                />
                <Route
                  exact
                  path={"/delivery-inprocess"}
                  component={InProcessDelivery}
                />
                <Route
                  exact
                  path={"/prepaid-orders"}
                  component={PrepaidOrder}
                />
                <Route
                  exact
                  path={"/postpaid-orders"}
                  component={PostPaidOrder}
                />
                <Route exact path={"/invoice/:invoiceid"} component={Invocie} />


                <Route
                  exact
                  path={"/delivery-boy-manage"}
                  component={DeliveryBoyManage}
                />
                <Route
                  exact
                  path={"/delivery-boy-list"}
                  component={DeliveryBoyList}
                />
                <Route
                  exact
                  path={"/delivery-boy-list/add/:deliveryboy_id?"}
                  component={DeliveryBoyAddTab}
                />
                <Route exact path={"/price-upload"} component={PriceUpload} />
                <Route
                  exact
                  path={"/delivery-boy-report"}
                  component={DeliveryBoyReport}
                />
                <Route
                  exact
                  path={"/order-cancellation-analysis"}
                  component={OrderCancellationAnalysis}
                />
                <Route
                  exact
                  path={"/cod-prepaid-order"}
                  component={CODPostpaidOrder}
                />
                <Route
                  exact
                  path={"/cancellation-refund-report"}
                  component={LowInventoryReport}
                />
                <Route
                  exact
                  path={"/low-inventory-report"}
                  component={CancellationRefund}
                />
                {/* <Route
              exact
              path={"/daily-payment-register"}
              component={DailyPaymentRegister}
            /> */}
                <Route exact path={"/Sales_Report"} component={SalesAll} />
                {/* <Route
                  exact
                  path={"/sales-register"}
                  component={SalesRegister}
                /> */}
                <Route
                  exact
                  path={"/order-register"}
                  component={OrderRegister}
                />
                <Route
                  exact
                  path={"/daily-payment-register"}
                  component={DailyPaymentRegister}
                />
                <Route
                  exact
                  path={"/product-master-upload"}
                  component={ProductMasterUpload}
                />
                <Route
                  exact
                  path={"/consumer-feedback-report"}
                  component={ConsumerFeedbackReport}
                />
                <Route
                  exact
                  path={"/inventory-upload-report"}
                  component={InventoryUploadReport}
                />
                <Route
                  exact
                  path={"/importData/:import_name?"}
                  component={ImportData}
                />
                <Route exact path={"/importData"} component={ImportData} />
                <Route exact path={"/about"} component={AboutUsDetails} />
                <Route
                  exact
                  path={"/about/profile-edit/:profile_id?"}
                  component={AboutUsAddTab}
                />
                {/* <Route exact path={"/contact-us"} component={ContactUsList} /> */}
              </Home>
            ) : (
              <Route exact path={"/"} component={Login} />
            )}
          </>
        ) : (
          <Home>
            <Route exact path={"/"} component={Dashboard} />
            <Route exact path={"/languages"} component={LanguageList} />
            <Route
              exact
              path={"/order_homescreen"}
              component={OrderHomeScreen}
            />
            <Route exact path={"/prepaid-orders"} component={PrepaidOrder} />
            <Route exact path={"/postpaid-orders"} component={PostPaidOrder} />
            <Route
              exact
              path={"/languages/add/:language_id?"}
              component={LanguageAdd}
            />
            <Route
              exact
              path={"/importData/:import_name?"}
              component={ImportData}
            />
            <Route exact path={"/users-customer"} component={UserList} />
            <Route exact path={"/invoice/:invoiceid"} component={Invocie} />
            {/* <Route
              exact
              path={"/notification-customer"}
              component={CustomerNotification}
            />
           
            <Route
              exact
              path={"/notification-seller"}
              component={SellerNotification}
            /> */}
              {/* <Route
              exact
              path={"/notification-superadmin"}
              component={SuperAdminNotification}
            /> */}
             <Route
              exact
              path={"/notification/list"}
              component={NotificationList}
            />
             <Route
              exact
              path={"/Login/SellerPaytmControl"}
              component={SellerPaymentLogin}
            />
             <Route
              exact
              path={"/SellerPaytmControl/list"}
              component={SellerPaymentList}
            /> <Route
            exact
            path={"/SellerPaytmControl/add/:seller_pay_id?"}
            component={SellerPaymentAddTab}
          />
             <Route
              exact
              path={"/notification/add/:notification_id?"}
              component={NotificationAddTab}
            />
               <Route
              exact
              path={"/notification/logs/:template_id?"}
              component={NotificationLogs}
            />
            
            <Route
              exact
              path={"/orders-completed"}
              component={OrderCompleted}
            />
            <Route 
               exact
               path={"/orders-pending/:reset_id?"} 
               component={OrderPending} />
            <Route
              exact
              path={"/orders-cancelled"}
              component={OrderCancelled}
            />
            <Route exact path={"/inventory"} component={InventryUpdate} />
            <Route
              exact
              path={"/inventory/edit/:product_id?"}
              component={InventoryAddTab}
            />
          
            <Route
              exact
              path={"/inventory-upload-report"}
              component={InventoryUploadReport}
            />
            <Route
              exact
              path={"/users-customer/add/:customer_id?"}
              component={UserAddTab}
            />
            <Route exact path={"/users-seller"} component={UserSellerList} />
            <Route
              exact
              path={"/users-seller/add/:seller_id?"}
              component={UserSellerAddTab}
            />
            <Route exact path={"/users-hoAdmin"} component={HoAdminList} />
            <Route
              exact
              path={"/users-hoAdmin/add/:hoAdmin_id?"}
              component={HoAdminAddTab}
            />
            <Route exact path={"/users-zonal"} component={ZonalList} />
            <Route
              exact
              path={"/users-zonal/add/:zonal_id?"}
              component={ZonalAddTab}
            />
            <Route exact path={"/best-deals"} component={BestDeals} />
            <Route
              exact
              path={"/best-deals/add/:deals_id?"}
              component={BestDealsAdd}
            />
            <Route exact path={"/new-arrivals"} component={NewArrivals} />
            <Route
              exact
              path={"/new-arrivals/add/:newArrival_id?"}
              component={NewArrivalAdd}
            />
            <Route exact path={"/banners"} component={HomeBanner} />
            <Route
              exact
              path={"/banners/add/:banner_id?"}
              component={HomeBannerAdd}
            />
            <Route exact path={"/home-categories"} component={HomeCategories} />
            <Route
              exact
              path={"/home-categories/add/:homCat_id?"}
              component={HomeCategoryAdd}
            />
            <Route exact path={"/category"} component={CategoryList} />
            <Route
              exact
              path={"/category/add/:category_id?"}
              component={CategoryAddTab}
            />
            <Route 
            exact
            path={"/subcategory/list/:category_id?"} 
            component={SubCategoryList}
             />
            <Route
              exact
              path={"/subcategory/add/:subcategory_id?"}
              component={SubCategoryAddTab}
            />
              <Route
                  exact
                  path={"/delivery-delayed"}
                  component={DelayedDelivery}
                />
                <Route
                  exact
                  path={"/delivery-completed"}
                  component={CompletedDelivery}
                />
                <Route
                  exact
                  path={"/delivery-inprocess"}
                  component={InProcessDelivery}
                />
                 <Route
                  exact
                  path={"/delivery-boy-list"}
                  component={DeliveryBoyList}
                />
                 <Route
                  exact
                  path={"/delivery-boy-manage"}
                  component={DeliveryBoyManage}
                />
                <Route
                  exact
                  path={"/delivery-boy-list/add/:deliveryboy_id?"}
                  component={DeliveryBoyAddTab}
                />
                <Route exact path={"/price-upload"} component={PriceUpload} />
                <Route
                  exact
                  path={"/delivery-boy-report"}
                  component={DeliveryBoyReport}
                />
            <Route
              exact
              path={"/ordervalue&_prepaidorder_value"}
              component={OrderValuePrepaidAddTab}
            />
            <Route
              exact
              path={"/delivery_charges"}
              component={DeliveryChargesAddTab}
            />

            <Route
              exact
              path={"/delivery_slots"}
              component={DeliverySlotsList}
            />

            <Route
              exact
              path={"/delivery_slots/add"}
              component={DeliverySlotsAddTab}
            />

            
            <Route exact path={"/cart_value"} component={CartValueAddTab} />
            <Route exact path={"/order_limit"} component={OrderLimitAddTab} />
            <Route exact path={"/payment"} component={PaymentList} />
            <Route exact path={"/home-master"} component={HomeMasterList} />
            <Route exact path={"/home-master/add"} component={HomeAddTab} />
            <Route
              exact
              path={"/payment/add/:payment_type_id?"}
              component={PaymentTabAdd}
            />
            <Route exact path={"/seller"} component={SellerList} />
            <Route
              exact
              path={"/seller/add/:seller_id?"}
              component={SellerAddTab}
            />
            <Route
              exact
              path={"/sellerpincode"}
              component={SellerpincodeList}
            />
            <Route
              exact
              path={"/sellerpincode/add/:seller_id?"}
              component={SellerPincodeAddTab}
            />
            <Route
              exact
              path={"/sellerproduct"}
              component={SellerProductList}
            />
            <Route
              exact
              path={"/sellerproduct/add/:seller_id?"}
              component={SellerProductAddTab}
            />
            <Route exact path={"/role"} component={RoleList} />
            <Route
              exact
              path={"/role/add/:role_id?"}
              component={RoleCreationTabAdd}
            />
            <Route exact path={"/blog"} component={BlogList} />
            <Route exact path={"/blog/add/:blog_id?"} component={BlogAddTab} />
            <Route exact path={"/blog-comments"} component={BlogComments} />
            <Route exact path={"/banner"} component={BannerList} />
            <Route
              exact
              path={"/banner/add/:banner_id?"}
              component={BannerAddTab}
            />
            <Route exact path={"/coupon-master"} component={CouponList} />
            <Route
              exact
              path={"/coupon-master/add/:coupon_id?"}
              component={CouponAddTab}
            />
            <Route exact path={"/products"} component={ProductList} />
            <Route
              exact
              path={"/products/add/:product_id?"}
              component={ProductAddTab}
            />
            <Route
              exact
              path={"/cancellation-resaon"}
              component={CanReasonList}
            />
            <Route
              exact
              path={"/cancellation-resaon/add/:cancResaon_id?"}
              component={CanReasonAddTab}
            />
            <Route exact path={"/customized"} component={CustomizedList} />
            <Route
              exact
              path={"/customized/add/:customized_id?"}
              component={CustomizedAddTab}
            />
            <Route exact path={"/attributes"} component={AttributeList} />
            <Route
              exact
              path={"/attributes/add/:attribute_id?"}
              component={AttributeAddTab}
            />
            <Route
              exact
              path={"/seller-product-catalogue"}
              component={SellerProductCatalogueList}
            />
            <Route
              exact
              path={"/seller-product-catalogue/add/:seller_product_id?/:sellerId?"}
              component={SellerProductCatalogueAddTab}
            />
            <Route
              exact
              path={"/attribute-values/:attribute_id"}
              component={AttributeValueList}
            />
            <Route
              exact
              path={"/attribute-values/:attribute_id/add/:attribute_value_id?"}
              component={AttributeValueAddTab}
            />
            <Route exact path={"/orders"} component={OrderList} />
            <Route
              exact
              path={"/orders/view/:order_id"}
              component={OrderView}
            />
            <Route exact path={"/country"} component={CountryList} />
            <Route
              exact
              path={"/country/add/:country_id?"}
              component={CountryAddTab}
            />
            <Route exact path={"/State"} component={StateList} />
            <Route
              exact
              path={"/State/add/:State_id?"}
              component={StateAddTab}
            />
            <Route exact path={"/area"} component={AreaList} />
            <Route exact path={"/guest-customer"} component={GuestUserList} />
            <Route exact path={"/area/add/:area_id?"} component={AreaAddTab} />
            <Route exact path={"/city"} component={CityList} />
            <Route exact path={"/city/add/:city_id?"} component={CityAddTab} />
            <Route
              exact
              path={"/seller-pin-code-mapping-report"}
              component={SellerPinCodeMappingReport}
            />
            {/* <Route exact path={"/PaymentReport_all"} component={PaymentReportAll}  />
            <Route exact path={"/PaymentReport_cod"} component={PaymentReportCod}  />
            <Route exact path={"/PaymentReport_online"} component={PaymentReportOnline}  /> */}
            <Route exact path={"/Sales_Report"} component={SalesAll} />
            <Route exact path={"/price-upload"} component={PriceUpload} />
            <Route
              exact
              path={"/coupon-usage-report"}
              component={CouponUsageReport}
            />
            <Route
              exact
              path={"/order-cancellation-analysis"}
              component={OrderCancellationAnalysis}
            />
            <Route
              exact
              path={"/seller-performance-reports"}
              component={SellerPerformanceReports}
            />
            <Route exact path={"/offender-report"} component={OffenderReport} />
            <Route
              exact
              path={"/profitability-report-seller-wise"}
              component={ProfitabilityReportSellerWise}
            />
            <Route
              exact
              path={"/cod-prepaid-order"}
              component={CODPostpaidOrder}
            />
            <Route exact path={"/sales-register"} component={SalesRegister} />
            {/* <Route exact path={"/customer_report"} component={CustomerReports} /> */}
            <Route exact path={"/customer-report"} component={CustomerReport} />
            <Route exact path={"/order-register"} component={OrderRegister} />
            <Route
              exact
              path={"/daily-payment-register"}
              component={DailyPaymentRegister}
            />
            <Route
              exact
              path={"/product-master-upload"}
              component={ProductMasterUpload}
            />
            <Route exact path={"/seller-upload"} component={SellerUpload} />{" "}
            <Route
              exact
              path={"/consumer-feedback-report"}
              component={ConsumerFeedbackReport}
            />
            {/* <Route
              exact
              path={"/inventory-upload-report"}
              component={InventoryUploadReport}
            /> */}
            <Route
              exact
              path={"/exceptional-alert-report"}
              component={ExceptionalAlertReport}
            />
            <Route
              exact
              path={"/order-fill-rate-report"}
              component={OrderFillRateReport}
            />
            <Route
              exact
              path={"/seller-wise-below-re-order-level"}
              component={SellerWiseBelowReOrderLevel}
            />
            <Route
              exact
              path={"/order-fill-time-report"}
              component={OrderFillTimeReport}
            />
            <Route
              exact
              path={"/refund-policy"}
              component={RefundPolicyAddTab}
            />
            <Route
              exact
              path={"/privacy-policy"}
              component={PrivacyPolicyAddTab}
            />
          
            <Route
              exact
              path={"/cancellation-policy"}
              component={CancellationPolicyAddTab}
            />
            <Route exact path={"/terms"} component={TermsAddTab} />
            <Route exact path={"/about"} component={AboutUsAddTab} />
            <Route exact path={"/contact-us"} component={ContactUsList} />
            <Route
              exact
              path={"/contact-us/settings"}
              component={GeneralSettingAddTab}
            />
            {/*MEDIA MASTER */}
            {/* <Route
              exact
              path={"/category_media"}
              component={Category}
            />   */}
            <Route
            exact
            path={"/banner_media"}
            component={Banner}
          /> 
           <Route
          exact
          path={"/notification_media"}
          component={Notification}
        /> 
         <Route
          exact
          path={"/product_media"}
          component={ProductMediaList}
        />

          <Route
            exact
            path={"/product_media/:sku_id"}
            component={ProductMediaDetails}
          />

          <Route
        exact
        path={"/banner_media/add/:id?"}
        component={BannerMediaAdd}
      />
    {/* Seller Invoice */}
    <Route
     exact
     path={"/seller/invoice"}
     component={SellerInvoiceList}
    />
      <Route
     exact
     path={"/seller/invoice/update/:seller_id?"}
     component={SellerInvoiceAddTab}
    />
    {/* LOGS */}
          <Route
              exact
              path={"/logs/:sheet_name?"}
              component={LogList}
            />

      {/*USER_MANAGMENT*/}  
      <Route
              exact
              path={"/group/list"}
              component={GroupsList}
            />    
              <Route
              exact
              path={"/group/add/:group_id?"}
              component={GroupAddTab}
            />   
              <Route
              exact
              path={"/group/assigned/list/:group_id?"}
              component={PolicyList}
            />   
              <Route
              exact
              path={"/group/assign/list"}
              component={PolicyAssignList}
            />   
            
            
             <Route
              exact
              path={"/group_policy/assign/:user_id?"}
              component={PolicyAssignAdd}
            />   
              <Route
              exact
              path={"/user/add/:user_id?"}
              component={UserCreationAddTab}
            />    
             <Route
            exact
            path={"/user/list"}
            component={UserCreationList}
          />  
            <Route
              exact
              path={"/user_policy/assign/:user_id?"}
              component={UserPolicyAssignAdd}
            /> 
           <Route
            exact
            path={"/user/assign/list"}
            component={UserAssignPolicyList}
          />   
             <Route
              exact
              path={"/user/assigned/list/:group_id?"}
              component={UserPolicyAssignedList}
            />   
            
             {/* KYC */}
             <Route
            exact
            path={"/customer_kyc"}
            component={KYCList}
          /> 
          <Route
            exact
            path={"/customer_kyc_approved"}
            component={KYCListApproved}
          /> 

          <Route
            exact
            path={"/seller_customer"}
            component={SellerCustomer}
          /> 
           <Route
            exact
            path={"/customer_intrested_category"}
            component={CustomerIntrestedCategory}
          />
            <Route
            exact
            path={"/seller_customer_mapping/add/:user_id?/:type?"}
            component={SellerCustomerAddTab}
          /> 
          
          <Route
            exact
            path={"/beat_list"}
            component={Beat}
          /> 
           <Route
            exact
            path={"/salesman_list"}
            component={SalesmanList}
          /> 
          <Route
            exact
            path={"/gallery/:media_type?"}
            component={BannerGallery}
          /> 
           <Route
            exact
            path={"/user/edit/:user_id?/:phoneNumber?"}
            component={UserEdit}
          />
            <Route
            exact
            path={"/orders-dms"}
            component={DMSOrderList}
          />
            <Route
            exact
            path={"/otp-registered-customer"}
            component={OtpRegistered}
          />
           {/* <Route
            exact
            path={"/coupon_gallery"}
            component={CopounGallery}
          /> 
           <Route
            exact
            path={"/notification_gallery"}
            component={notificationGallery}
          /> 
           <Route
            exact
            path={"/category_gallery"}
            component={CategoryGallery}
          />  */}
         <Route exact path={"/invoice/:dms?/:invoiceid"} component={Invocie} />

          </Home>
        )}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginData: state.login,
    role: state.login.role,
  };
};
Routes.propTypes = {
  login: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(Routes);
