import {DMS_ORDERS,DMS_ERROR} from '../types'
import Constant from '../../Constant'
import Swal from 'sweetalert2'
import axios from 'axios'


export const getError = (error) => {
    return {
      type: DMS_ERROR,
      error: error,
    };
  };

export const getDmsOrders=(startRange,count,invoice_number)=>{
    return(dispatch)=>{
       axios
         .post(Constant.getAPI()+"/dms/orderPostStatus",{startRange,count,invoice_number},{
             headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,

             }
         })
         .then( res=>{
             console.log(res.data)
             dispatch({
                 type:DMS_ORDERS,
                 payload:res.data
             })
         })
         .catch(error=>{
             console.log(error)
             dispatch(getError(error.message))
         })

    }
}

export const sendOrderToDms = (orderId)=> {
    console.log(orderId)
    return (dispatch) => {
      axios
        .post(Constant.getAPI() + "/dms/postOrder",{
          orderId
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem( "superadmin_auth" )}`,
            },
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.success === true) {
            Swal.fire({
              title:"Order Sent To DMS Succesfully",
              icon:"success"
            })

           }
           else{
            Swal.fire({
                title:"Order Sent To DMS Unsuccesfull",
                icon:"warning"
              })
           dispatch(getDmsOrders())
           }
        })
        .catch((err) => {
          const errMsg = err.message;
          dispatch(getError(errMsg))

        });
     };
  }