/* eslint-disable no-unused-vars */
import axios from "axios";
import Constant from "../../Constant";
import {
  FETCH_REPORT_LIST,
  FETCH_REPORT_ERROR,
  FETCH_REPORT_REQ,
  FETCH_CONSUMER_FEEDBACK_LIST,
} from "../types";
import Swal from "sweetalert2";
import qs from "qs";

export const getreportRequest = () => {
  return {
    type: FETCH_REPORT_REQ,
  };
};

export const getreportSucess = (report_data) => {
  return {
    type: FETCH_REPORT_LIST,
    payload: report_data,
  };
};

export const getReportError = (error) => {
  return {
    type: FETCH_REPORT_ERROR,
    error: error,
  };
};

export const fetchCouponReportList = (
  range,
  length,
  start_date,
  userId,
  couponId
) => {
  return (dispatch) => {
    dispatch(getreportRequest);
    axios
      .post(
        Constant.getAPI() + "/coupon/userlist",
        {
          startRange: range,
          recordLimit: length,
          start_date: start_date,
          couponId: couponId,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        // if (res.status === true) {
        const report_data = res.data;
        dispatch(getreportSucess(report_data));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getReportError("Error"));
      });
  };
};

export const fetchCodorderReportList = () => {
  return (dispatch) => {
    dispatch(getreportRequest);
    axios
      .get(
        Constant.getAPI() + "/report/deliverystatus",
        {
          x_input: null,
          x_cities: null,
          x_states: null,
          x_seller_names: null,
          x_cust_pincodes: null,
          x_invoice_nos: null,
          x_delivery_status: null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
        }
      )
      .then((res) => {
        // if (res.status === true) {
        const report_data = res.data.data;
        dispatch(getreportSucess(report_data));
        // }
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getReportError("Error"));
      });
  };
};

export const fetchConsumerFeedbackList = (range,length,seller,cityId,stateId,invoice_number,customer) => {
  console.log(customer)
  return (dispatch) => {
    const data = {
      listType: "feedbacklist",
    
    };
    axios
      .post(Constant.getAPI() + "/order/list", {
        listType: "feedbacklist",
        city:cityId,
        sellerId:seller,
        startRange:range,
        recordLimit:length,
        state:stateId,
        invoice_number:invoice_number,
        customerId:customer,


      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
        const report_data = res.data;
        dispatch(getreportSucess(report_data));
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(err);
        dispatch(getReportError("Error"));
      });
  };
};
