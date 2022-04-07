/* eslint-disable no-unused-vars */
import { combineReducers } from 'redux';
import canReasonReducer from './CancellationReason/CanReasonReducer';
import categoryReducer from './Category/categoryReducer';
import cityReducer from './City/CityReducer';
import countryReducer from './Country/CountryReducer';
import couponReducer from './Coupon/CouponReducer';
import deliveryReducer from './Delivery/deliveryReducer';
import bannerReducer from './HomeScreenMapping/Banners/BannerReducer';
import newArrivalReducer from './HomeScreenMapping/NewArrivals/NewArrivalReducer';
import topCatReducer from './HomeScreenMapping/TopCategories/TopcategoryReducer';
import topDealsReducer from './HomeScreenMapping/TopDeals/TopDealsReducer';
import usersReducer from './login/usersReducer';
import mediaReducer from './MediaUpload/MediaReducer';
import orderReducer from './Order/OrderReducer';
import pincodeReducer from './Pincode/PincodeReducer';
import productReducer from './Product/productReducer';
import reportReducer from './Reports/reportReducer';
import sellerReducer from './Seller/SellerReducer';
import sellerPincodeReducer from './SellerPincode/SellerPincodeReducer';
import sellerProductReducer from './SellerProduct/SellerProductReducer';
import stateReducer from './State/StateReducer';
import subcategoryReducer from './Subcategory/SubcategoryReducer';
import customerReducer from './User/UserReducer';
import notificationReducer from './Notification/NotificationReducer';
import SellerPaytmReducer from './SellerPaytm/SellerPaytmReducer';
import UserManagmentReducer from './UserManagment/UserManagmentReducer';
import productMediaReducer from './ProductMedia/productMediaReducer';
import bannerMediaReducer from './BannerMedia/bannerMediaReducer';
import KYCReducer from './KYC/KYCReducer'
import SellerCustomerReducer from './SellerCustomerMapping/SellerCustomerReducer';
import salesmanReducer from './SalesMan/salesmanReducer';
import beatReducer from './Beat/BeatReducer'
import DMSReducer from './DMS/DMSReducer';
const rootReducer = combineReducers({
	login: usersReducer,
	category: categoryReducer,
	product: productReducer,
	seller: sellerReducer,
	sellerPincode: sellerPincodeReducer,
	country: countryReducer,
	city: cityReducer,
	state: stateReducer,
	pincode: pincodeReducer,
	sellerProduct: sellerProductReducer,
	subCategory: subcategoryReducer,
	topDeal: topDealsReducer,
	topCat: topCatReducer,
	newArrival: newArrivalReducer,
	banner: bannerReducer,
	coupon: couponReducer,
	order: orderReducer,
	reason: canReasonReducer,
	customer: customerReducer,
	delivery: deliveryReducer,
	report: reportReducer,
	notification: notificationReducer,
	sellerPaytm: SellerPaytmReducer,
	userManagment: UserManagmentReducer,
	productMedia: productMediaReducer,
	bannerMedia: bannerMediaReducer,
	kyc:KYCReducer,
	sellerCusMapping:SellerCustomerReducer,
	salesman:salesmanReducer,
	beat:beatReducer,
	dmsOrders:DMSReducer,
});
export default rootReducer;
