import React from 'react'
import axios from 'axios'
import Constant from '../Constant'
import { ContactsOutlined, TvTwoTone } from '@material-ui/icons'
import { Component } from 'react'


// var data=[]
// const request=()=>{
//     axios
//     .get(Constant.getAPI() + "/admin/myPermissions",{
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,

//       }
//     })
//     .then((res) => {
//       console.log(res)
//        if (res.status == 200) {
//            //console.log(res.data.data)
//            var aa=res.data.data
//            data = res.data.data;
//       return(aa)
//        }
//     })
//     .catch((err) => {
//       console.log(err)
//     });


// }

class Features extends Component{




UiPermissionControl(){
if(localStorage.getItem('role')=='admin'){
    console.log('admin')

    localStorage.setItem('userCreation',true)
    localStorage.setItem('Sellerview',true)
    localStorage.setItem('SellerImport',true)

    localStorage.setItem('Customerview',true)
    localStorage.setItem('Guestview',true)

    localStorage.setItem('HomeScreen',true)
    localStorage.setItem('NewArrival',true)
    localStorage.setItem('NewArrivalImport',true)
    localStorage.setItem('NewArrivalUpdate',true)

    localStorage.setItem('BestDeal',true)
    localStorage.setItem('BestDealImport',true)
    localStorage.setItem('BestDealUpdate',true)


    localStorage.setItem('Order',true)
    localStorage.setItem('OrderDownload',true)
    localStorage.setItem('OrderUpdate',true)

    localStorage.setItem('PaymentStatus',true)

    localStorage.setItem('Category',true)
    localStorage.setItem('CategoryAdd',true)
    localStorage.setItem('CategoryUpdate',true)

    localStorage.setItem('InventoryUpdate',true)
    localStorage.setItem('CancellationReason',true)
    localStorage.setItem('SellerProduct',true)
    localStorage.setItem('SellerProductUpdate',true)


    localStorage.setItem('Product',true)
    localStorage.setItem('ProductDownload',true)
    localStorage.setItem('ProductEdit',true)
    localStorage.setItem('ProductImport',true)

    localStorage.setItem('SellerDetails',true)
    localStorage.setItem('SellerPincode',true)
    localStorage.setItem('SellerPincodeUpdate',true)
    localStorage.setItem('SellerInvoice',true)
    localStorage.setItem('seller_customer',true)
    localStorage.setItem('seller_customerAdd',true)
    localStorage.setItem('seller_customerImport',true)


    localStorage.setItem('kyc',true)

    localStorage.setItem('beat',true)
    localStorage.setItem('beatImport',true)

    localStorage.setItem('salesman',true)
    localStorage.setItem('salesmanImport',true)



    localStorage.setItem('PaymentMethod',true)
    localStorage.setItem('PaymentSetting',true)
    
    localStorage.setItem('CouponMaster',true)
    localStorage.setItem('MediaMaster',true)
    
    localStorage.setItem('Notification',true)
    localStorage.setItem('NotificationEdit',true)
    localStorage.setItem('NotificationAdd',true)

    localStorage.setItem('Delivery',true)
    localStorage.setItem('DeliveryBoyAssign',true)

    localStorage.setItem('Reports',true)

    localStorage.setItem('Location',true)
    localStorage.setItem('StateAdd',true)
    localStorage.setItem('CityAdd',true)

    localStorage.setItem('Locationimport',true)

    
    localStorage.setItem('UserMaster',true)
    localStorage.setItem('Settings',true)
    localStorage.setItem('Terms',true)
    localStorage.setItem('Privacy',true)
    localStorage.setItem('About',true)
    localStorage.setItem('Contact',true)
   

}   
else if( localStorage.getItem('role')=='other'){
    localStorage.setItem('Reports',true)

    console.log('other')
    axios
    .get(Constant.getAPI() + "/admin/myPermissions",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,

      }
    })
    .then((res) => {
      console.log(res.data.data)
       if (res.status == 200) {
      
         var ar = res.data.data;
       
         //console.log("heeeee")
        Object.keys(ar).map(key => {
            localStorage.setItem('reload',true)
            if(key == 'aboutus'){
                localStorage.setItem('Settings',true) 
                localStorage.setItem('About',true)
            }
            if(key=='conatactus'){
                localStorage.setItem('Settings',true) 
                localStorage.setItem('Contact',true)
            }
            if(key=='privacy'){
                localStorage.setItem('Privacy',true) 
                localStorage.setItem('Contact',true)
            }
            if(key=='customer'){
                localStorage.setItem('Customerview',true) 
                localStorage.setItem('userCreation',true)

            }
            if(key=='seller'){
                localStorage.setItem('SellerDetails',true)

                localStorage.setItem('Sellerview',true) 
                localStorage.setItem('userCreation',true)
                
                for(let b=0;b<ar.seller.length;b++){
                    if(ar.seller[b]=='import'){localStorage.setItem('SellerImport',true)}
                   
                 }
     

            }
            if(key=='guest_customer'){
                localStorage.setItem('Guestview',true) 
                localStorage.setItem('userCreation',true)

            }
           
             if(key=='product'){
                localStorage.setItem('Product',true)

                for(let b=0;b<ar.product.length;b++){
                   if(ar.product[b]=='import'){localStorage.setItem('ProductImport',true)}
                   if(ar.product[b]=='download'){ localStorage.setItem('ProductDownload',true)}
                   if(ar.product[b]=='update'){localStorage.setItem('ProductEdit',true)}
                //    if(ar.product[b]=='add'){}


                }
    
            }
            if(key=='notification_template'){
                localStorage.setItem('Notification',true)
                for(let b=0;b<ar.notification_template.length;b++){
                    if(ar.notification_template[b]=='add'){    localStorage.setItem('NotificationAdd',true)
                }
                    if(ar.notification_template[b]=='update'){    localStorage.setItem('NotificationEdit',true)
                }
                   
                 }
     
              
    
            }
            if(key=='category'){
                localStorage.setItem('Category',true)

                for(let b=0;b<ar.category.length;b++){
                   if(ar.category[b]=='add'){localStorage.setItem('CategoryAdd',true) }
                   if(ar.category[b]=='update'){localStorage.setItem('CategoryUpdate',true)}
                  
                } }
            if(key == 'order'){
                localStorage.setItem('Order',true)
    
                for(let b=0;b<ar.order.length;b++){
                    if(ar.order[b]=='download'){localStorage.setItem('OrderDownload',true)}
                    if(ar.order[b]=='update'){localStorage.setItem('OrderUpdate',true)}
                     }}

          if(key == 'seller_product'){
            localStorage.setItem('SellerProduct',true)

            for(let b=0;b<ar.seller_product.length;b++){
                if(ar.seller_product[b]=='update'){localStorage.setItem('SellerProductUpdate',true)}
               
             }
          }
          if(key == 'seller_pincode'){
            localStorage.setItem('SellerPincode',true)

            for(let b=0;b<ar.seller_pincode.length;b++){
                if(ar.seller_pincode[b]=='update'){localStorage.setItem('SellerPincodeUpdate',true)
            }
               
             }
        }
        if(key == 'new_arrival'){
            localStorage.setItem('HomeScreen',true)
            localStorage.setItem('NewArrival',true)

            for(let b=0;b<ar.new_arrival.length;b++){
                if(ar.new_arrival[b]=='add'){}
                if(ar.new_arrival[b]=='update'){localStorage.setItem('BestDealUpdate',true)}
                if(ar.new_arrival[b]=='import'){localStorage.setItem('BestDealImport',true)}

               
             }
        }
        if(key == 'top_deal'){
            localStorage.setItem('HomeScreen',true)
            localStorage.setItem('BestDeal',true)

            for(let b=0;b<ar.top_deal.length;b++){
                if(ar.top_deal[b]=='add'){}
                if(ar.top_deal[b]=='update'){    localStorage.setItem('NewArrivalUpdate',true)
            }
                if(ar.top_deal[b]=='import'){    localStorage.setItem('NewArrivalImport',true)
            }

               
             }
        }

        if( key == 'deliveryUser')
        {
            for(let b=0;b<ar.deliveryUser.length;b++){
                if(ar.deliveryUser[b]=='view'){    localStorage.setItem('Delivery',true)
            }
                if(ar.deliveryUser[b]=='assign'){    localStorage.setItem('DeliveryBoyAssign',true)
            }
                
            }
        }
        if( key == 'location')
        {
            for(let b=0;b<ar.location.length;b++){
                if(ar.location[b] =='view'){     localStorage.setItem('Location',true)
            }
                if(ar.location[b] =='import'){    localStorage.setItem('Locationimport',true)
            }
                
            }
        }    

        if( key == 'media')
        {
            for(let b=0;b<ar.media.length;b++){
                if(ar.media[b] =="add"){    localStorage.setItem('MediaMaster',true) 
            }
                if(ar.media[b] =="view"){    localStorage.setItem('MediaMaster',true)
            }
                
            }
        }  
        if( key == 'customer_KYC')
        {
            for(let b=0;b<ar.customer_KYC.length;b++){
              if(ar.customer_KYC[b] =="view"){      localStorage.setItem('kyc',true) }
           }
        } 
        if( key == 'beat')
        {
            for(let b=0;b<ar.beat.length;b++){
              if(ar.beat[b] =="view"){     localStorage.setItem('beat',true)
            }
              if(ar.beat[b] == "import"){     localStorage.setItem('beatImport',true)
            }
           }
        } 
        if( key == 'salesman')
        {
            for(let b=0;b<ar.salesman.length;b++){
              if(ar.salesman[b] =="view"){     localStorage.setItem('salesman',true)
            }
               if(ar.salesman[b] =="import"){     localStorage.setItem('salesmanImport',true)
             }
           }
        } 
        if( key == "customer_seller")
        {  
            for(let b=0;b<ar.customer_seller.length;b++){
              if(ar.customer_seller[b] =="view"){    localStorage.setItem('seller_customer',true)
            }
          
            if(ar.customer_seller[b] === 'add' ){ localStorage.setItem('seller_customerAdd',true)
           }
           if(ar.customer_seller[b] === 'import' ){ localStorage.setItem('seller_customerImport',true)
        }
         }
        } 


        if( key == 'city')
        {    //console.log(ar.city[0])
             if(ar.city[0] === 'add'){localStorage.setItem('CityAdd',true)}
        }
        if( key == 'state')
        {   // console.log(ar.city[0])
             if(ar.city[0] === 'add'){localStorage.setItem('StateAdd',true)}
        }
             
        })
       }
              //this.props.reload()
    })
    .catch((err) => {
      console.log(err)
    });

}   
        



}

    render(){
        return(
               <div>
                   {
                       this.UiPermissionControl()
                   }
                   </div>
        )
    }
}
export default Features
