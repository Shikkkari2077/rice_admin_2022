import React from "react";
import { Link } from "react-router-dom";


import PropTypes from "prop-types";
import { connect } from "react-redux";
import{ fetchPolicies ,fetchGroups,assignGroupPolicies,fetchAssignedGroupPolicies} from "../../../store/index";

import List from 'devextreme-react/list';




class Checkbox extends React.Component {
  static defaultProps = {
    checked: false,
    
  };
   
  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    );
  }
}

class PolicyAssignAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      adminrole:'',
      UMAdminGroupId :'',
      data:[],
      selectionMode: 'all',
      selectAllMode: 'page',
      selectedItemKeys: [],
      selectedpolicies:[],
      value:[
        {key: "75796c04-dc36-41ce-a2be-06d7ef6213b4",
        text: "product -> add"}
      ]
    };
    this.onSelectionModeChange = this.onSelectionModeChange.bind(this);
    this.onSelectAllModeChange = this.onSelectAllModeChange.bind(this);
    this.onSelectedItemKeysChange = this.onSelectedItemKeysChange.bind(this);
    this.onSaveData=this.onSaveData.bind(this);
    this.updateCategoryData=this.updateCategoryData.bind(this);
  }
  onSelectionModeChange(args) {
    this.setState({
      selectionMode:'allPages'
    });
  }
  onSelectAllModeChange(args) {
    this.setState({
      selectAllMode: 'allPages'
    });
  }
  onSelectedItemKeysChange(args) {
  
    var selectedpolicies=[]
    if(args.name === 'selectedItemKeys') {
      args.value.map(policy=>{
        selectedpolicies=[...selectedpolicies,policy.key]    
      })
     // console.log(selectedpolicies)
      this.setState({
        selectedItemKeys: args.value,
        selectedpolicies
      });
    }
  }
  onSaveData(){

    this.props.assignGroupPolicies(this.props.match.params.user_id,this.state.selectedpolicies)
  
  }
  updateCategoryData(){

  }
  componentWillMount() {
    this.props.fetchPolicies()
    if(this.props.match.params.user_id !== undefined){
    this.props.fetchGroups(this.props.match.params.user_id)}
    this.props.fetchAssignedGroupPolicies(this.props.match.params.user_id)
  }


 
 
  componentWillReceiveProps(nextProps){
   
    if(nextProps.Groups !== undefined && 
      nextProps.Groups !== null && 
      nextProps.Groups[0] !==undefined &&
       nextProps.Groups[0] !==null 
       ){
      console.log(nextProps.Groups)
      this.setState({
        name:nextProps.Groups[0].name

      })
    }
    //console.log(nextProps.policies)
    var data=[]
    nextProps.policies.map(policy=>(
      data=[...data,{
        key:policy.id,
        text:`${policy.UM_Module.name+" "+"->"+" "+policy.UM_Permission.name}`
      }]
    ))
    this.setState({
      data
    })
    var assignedarray=[]
    nextProps.assigned.map(policy=>(
      assignedarray=[...assignedarray,{
        key:policy.UM_ModulePermission.id,
        text:`${policy.UM_ModulePermission.UM_Module.name+" "+"->"+" "+policy.UM_ModulePermission.UM_Permission.name}`
      }]
    ))
    this.setState({
      
      assignedarray,
    })
    console.log(assignedarray)
  }
     
  
  render() {
    // const dataSource = new ArrayStore({
    //   key: 'id',
    //   data: tasks
    // });
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Group Features Assign</h4>
                    </div>
                  </div>
                 
                </div>
               <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                    <li className="breadcrumb-item active">Group features Assign</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {console.log(this.state.selectedItemKeys)}
            <div className="page-body">
              <div className="row" >
                <div className="col-sm-8">

                  <div className="card" style={{height:"600px"}}>
                    <div className="card-block">
                      <div className="col-12" style={{border:"3px groove lightgrey",height:"550px",padding:"10px"}}>
                      <h6  style={{textAlign:"center"}}><b>Select Features</b></h6>

                      <React.Fragment>
        <div className="widget-container">
          {console.log(this.state.value)}
          <List
       
            dataSource={this.state.data}
            height={500}
            showSelectionControls={true}
            selectionMode='all'
            selectAllMode='allPages'
            selectedItemKeys={this.state.selectedItemKeys}
            onOptionChanged={this.onSelectedItemKeysChange.bind(this)}
            //itemRender={this.state.assignedarray}
            defaultSelectedItemKeys={this.state.value}
            >
              
          </List>
         
        </div>
    
      </React.Fragment>
                     
                     
                      
                      </div>
                      
                    </div>
                  </div>
                 

                </div>
                <div className="col-sm-4">
<div className="container">
<div className="card" style={{height:"600px"}}>
  <div className="card-block" >
  <div className="card-title text-align-center "
     style={{border:"3px groove lightgrey",height:"100px",padding:"5px"}}>
   <h6  style={{textAlign:"center"}}><b>Group Details</b></h6>
   
   <h6>Group Name: {this.state.name}</h6>
   {/* <h6>Email: &nbsp;{this.state.email}</h6>
   <h6>Group: &nbsp;{this.state.adminrole}</h6> */}
   


    </div>
    <br/>
    <div className="card-title text-align-center"
     style={{border:"3px groove lightgrey",height:"390px",padding:"10px",overflow:"auto"}}>
   <h6  style={{textAlign:"center"}}><b>Selected Features</b></h6>
   <ul>
     {
       this.state.selectedItemKeys.map((val,key)=>{
        return(
          <h6>{key+1+" "+"."+" "+val.text}</h6>
         
          
        )
       })
     }
   </ul>
    </div>
    <div style={{paddingTop:"15px",alignContent:"right"}}>
    {
                  !this.props.user_id ?
                  <button
                    onClick={this.onSaveData.bind()}
                    className="btn btn-grd-disabled mr-2"
                  >
                    <i className="icofont icofont-save"></i> Save
                  </button>
                  :
                  (<button onClick={this.updateCategoryData.bind(this)}
                    className="btn btn-grd-disabled mr-2"
                  >
                    Update
                  </button>
                  )}
    </div>
  
    </div></div></div></div>
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
    policies: state.userManagment.policies,
    Groups: state.userManagment.group_list,
    assigned:state.userManagment.assigned_list,

  };
};
PolicyAssignAdd.propTypes = {
     fetchGroups: PropTypes.func.isRequired,
     assignGroupPolicies:PropTypes.func.isRequired,
     fetchPolicies:PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  fetchAssignedGroupPolicies,
  fetchPolicies,
  fetchGroups,
  assignGroupPolicies})(PolicyAssignAdd);