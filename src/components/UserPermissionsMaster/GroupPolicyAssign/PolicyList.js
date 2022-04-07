import React, { Component } from "react";
import {fetchAssignedGroupPolicies,updateAssignedGrouppolicy} from "../../../store/index";
import swal from 'sweetalert2'
import moment from 'moment'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
class PolicyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: false,
      status: null,
      assignedarray:[]
    };
  }
 
  componentDidMount(){
    this.props.fetchAssignedGroupPolicies(this.props.match.params.group_id)
  }


  componentWillReceiveProps(nextProps) {
   console.log(nextProps.assigned)
   var assignedarray=[],finalsubmitarray=[]
   nextProps.assigned.map(policy=>(
    finalsubmitarray=[...finalsubmitarray,policy.UM_ModulePermission.id]
   ))
   nextProps.assigned.map(policy=>(
    
     assignedarray=[...assignedarray,{
       id:policy.UM_ModulePermission.id,
       text:`${policy.UM_ModulePermission.UM_Module.name+" "+"->"+" "+policy.UM_ModulePermission.UM_Permission.name}`
     }]
   ))
   this.setState({
    finalsubmitarray,
     assignedarray,
   })
   console.log(assignedarray)
 
  }
  deletefromlist(row){
  
      var finallist=this.state.finalsubmitarray
      var list=this.state.assignedarray

      var index1 = list.indexOf(row)
      if (index1 > -1) {
        list.splice(index1, 1);
      }
      var index = finallist.indexOf(row.id);
      if (index > -1) {
        finallist.splice(index, 1);
      }
       this.setState({
           finalsubmitarray:finallist,
           assignedarray:list
       })
  }
  onSaveData(){
    
    Swal.fire({
        title: '<strong>Are You Sure</strong>',
        icon: 'warning',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:' Yes',
       
      }).then((option)=>{
          if(option.isConfirmed)
          { 
            this.props.updateAssignedGrouppolicy(this.props.match.params.group_id,this.state.finalsubmitarray)
          }
          
      })

  }
  render() {
    

    return (
      <div>
          <div className="row" style={{padding:"20px"}} >
              <div className="col-sm-12">
          <div className="card text-center" style={{height:"100%"}} >
              <div className="card-body " style={{paddingBottom:"10px"}}>
                  {console.log(this.state.finalsubmitarray)}
                  <table className=".table-bordered table-hover " style={{border:"3px solid lightgrey",width:"40%"}}>
                     <tr style={{border:"3px solid lightgrey"}}>
                         <th style={{border:"3px solid lightgrey",textAlign:'center'}}>Assigned Feature</th>
                         <th style={{border:"3px solid lightgrey",textAlign:'center'}}>Action</th>

                     </tr>
                   
                         {this.state.assignedarray !==undefined?
                         this.state.assignedarray.map(row=>{
                             return(
                            <tr>
                         <td style={{border:"3px solid lightgrey",textAlign:"justify",paddingLeft:"10px"}} >{row.text}</td>
                         <td style={{border:"3px solid lightgrey"}}>
                         <span
                  className="m-r-15 text-muted curser-pointer"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="delete"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                     this.deletefromlist(row)
                  }}
                >
                  <i className="f-20 icofont icofont-ui-delete text-danger " ></i>
                </span>
                         </td>
                         </tr>
                             )
                        })
                         :
                         null}

                
                  </table>

              </div>
              <div className="col-sm-7">
              <div style={{paddingTop:"15px",alignContent:"right"}}>
    
                 
                  <button
                    onClick={this.onSaveData.bind(this)}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                  <button
                    onClick={ ()=>(window.location.href="#/group/assign/list") }
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-cancel"></i> cancel
                  </button>

                
                  <Link
                  to={"/group_policy/assign/" + this.props.match.params.group_id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <span className="btn btn-grd-disabled mr-2"
>
                 
                 <img  className=" text-custom" src={'./assets/images/notification.jpg'} alt="bell" 
                  style={{height:"16px",width:"18px"}}
                   />  <span style={{color:"white"}}>  Assign</span>  
                  
                </span> </Link>
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
 
   assigned:state.userManagment.assigned_list,
    isLoading: state.order.isLoading,
    isAuthUser: state.order.isAuthUser,
    error: state.error,
  };
};

PolicyList.propTypes = {
    fetchAssignedGroupPolicies:PropTypes.func.isRequired,
    updateAssignedGrouppolicy:PropTypes.func.isRequired,
 
  error: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
    fetchAssignedGroupPolicies,updateAssignedGrouppolicy

})(PolicyList);
