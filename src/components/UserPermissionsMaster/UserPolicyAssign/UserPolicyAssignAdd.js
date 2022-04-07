import React from "react";
import { Link } from "react-router-dom";
// import $ from "jquery";
// import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import Toggle from "react-toggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import{ fetchPolicies ,fetchAdmins,assignPolicies} from "../../../store/index";
import { Tooltip, Button,Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "react-js-pagination";
import List from 'devextreme-react/list';
import SelectBox from 'devextreme-react/select-box';
import ArrayStore from 'devextreme/data/array_store';



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

class UserPolicyAssignAdd extends React.Component {
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
      selectedpolicies:[]
    };
    this.onSelectionModeChange = this.onSelectionModeChange.bind(this);
    this.onSelectAllModeChange = this.onSelectAllModeChange.bind(this);
    this.onSelectedItemKeysChange = this.onSelectedItemKeysChange.bind(this);
    this.onSaveData=this.onSaveData.bind(this);
    this.updateCategoryData=this.updateCategoryData.bind(this);
  }
  onSelectionModeChange(args) {
    this.setState({
      selectionMode: args.value
    });
  }
  onSelectAllModeChange(args) {
    this.setState({
      selectAllMode: args.value
    });
  }
  onSelectedItemKeysChange(args) {
    //console.log(args)
    // var selectedpolicies=[]
    // if(args.name === 'selectedItemKeys'  ) {
     
    //   this.setState({
        
    //   })
    // }
    //console.log(selectedpolicies)
    var selectedpolicies=[]
    if(args.name === 'selectedItemKeys') {
      args.value.map(policy=>{
        selectedpolicies=[...selectedpolicies,policy.key]    
      })
      console.log(selectedpolicies)
      this.setState({
        selectedItemKeys: args.value,
        selectedpolicies
      });
    }
  }
  onSaveData(){
    console.log(this.state.selectedpolicies,this.props.match.params.user_id)
    this.props.assignPolicies(this.state.selectedpolicies,
      this.props.match.params.user_id,
      this.state.UMAdminGroupId)
  }
  updateCategoryData(){

  }
  componentWillMount() {
    this.props.fetchPolicies()
    if(this.props.match.params.user_id !== undefined){
    this.props.fetchAdmins(this.props.match.params.user_id)}

  }
// componentWillReceiveProps(nextProps){
//   if(nextProps.){

//   }
// }

  handleOpen = (e, id) => {
    this.setState({
      openToedit: true,
      templateID: id,
    });
  };
openModel = () => {
    this.setState({
      open: true,
    });
  };

  selectall = (e) => {
    this.setState({
      hidedownload: !this.state.hidedownload,
      checkedItems: new Map(),
      hideOld: !this.state.hideOld,
    });
  };
  selctSingle = (e, id) => {
    // this.setState({
    //   hidedownload:!this.state.hidedownload,
    //   check:id,
    //   // [e.trget.id]: e.target.value
    // })
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      hidedownload: !this.state.hidedownload,
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
    // this.props.categoryData.data.forEach(d => {
    //   this.setState({
    //   check : !this.state.check
    // })
    // })
  };
  componentWillReceiveProps(nextProps){
   
    if(nextProps.admins !== undefined && 
      nextProps.admins !== null && 
      nextProps.admins[0] !==undefined &&
       nextProps.admins[0] !==null &&
       nextProps.admins[0].UM_AdminGroup !== null){
      console.log(nextProps.admins)
      this.setState({
         name:nextProps.admins[0].name,
         email:nextProps.admins[0].email,
         adminrole:nextProps.admins[0].UM_AdminGroup.name,
         UMAdminGroupId:nextProps.admins[0].UMAdminGroupId,

      })
    }
    console.log(nextProps.policies)
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
    console.log(data)
  }
     
  
  render() {
    // const dataSource = new ArrayStore({
    //   key: 'id',
    //   data: tasks
    // });
    return (
      <div className="pcoded-inner-content" >
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>User Policy Assign</h4>
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
                    <li className="breadcrumb-item active">User Policy Assign</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {console.log(this.state.selectedItemKeys)}
            <div className="page-body">
              <div className="row" >
                <div className="col-sm-8">
                   <div className="bg-primary text-center">Select Only One At A Time</div>
                  <div className="card" style={{height:"600px"}}>
                    <div className="card-block">
                      <div className="col-12" style={{border:"2px groove lightgrey",height:"500px",padding:"10px"}}>
                      <h6 style={{textAlign:"center"}}><b>Select Features</b></h6>

                      <React.Fragment>
        <div className="widget-container">
          <List
       
  
            dataSource={this.state.data}
            height={450}
            showSelectionControls={true}
            selectionMode='all'
            selectAllMode='allPages'
            selectedItemKeys={this.state.selectedItemKeys}
            onOptionChanged={this.onSelectedItemKeysChange.bind(this)}z>
          </List>
          {/* <div className="selected-data">
            <span className="caption">Selected IDs:</span>
            <span>{this.state.selectedItemKeys.join(', ')}</span>
          </div> */}
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
   <h6><b>User Details</b></h6>
   
   <h6>Name: {this.state.name}</h6>
   <h6>Email: &nbsp;{this.state.email}</h6>
   <h6>Group: &nbsp;{this.state.adminrole}</h6>
   

   {/* <ul>
     {
       this.state.selectedItemKeys.map((val,key)=>{
        return(
          <li>{key+1 +"."+" "+val.text}</li>
        )
       })
     }
   </ul> */}
    </div>
    <br/>
    <div className="card-title text-align-center"
     style={{border:"3px groove lightgrey",height:"390px",padding:"10px",overflow:"auto"}}>
   <h6><b>Selected Features</b></h6>
   <ul>
     {
       this.state.selectedItemKeys.map((val,key)=>{
        return(
          <h6>{key+1 +"."+" "+val.text}</h6>
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
    admins:state.userManagment.admin_list

  };
};
UserPolicyAssignAdd.propTypes = {
     fetchPolicies: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {fetchPolicies,fetchAdmins,assignPolicies})(UserPolicyAssignAdd);