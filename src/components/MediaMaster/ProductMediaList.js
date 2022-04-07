import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductMediaList,getProductSkuList } from '../../store/index';

import {
	FormControl,
} from "@material-ui/core";


class ProductMediaList extends React.Component {
	state = {
		datarange: 0,
		dataLength: 50,
		sku_list:[],
		mediaList:[],
		skuArray:[],
		search:'',
		cancelButton:false,
	};

	componentWillMount() {
		//this.props.getProductMediaList();
		this.props.getProductSkuList()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ mediaList: nextProps.productMedia });
		if(nextProps.productMedia !==undefined)
		{
			var skuArray=[]
			nextProps.productMedia.map(media=>(
			
				 skuArray=[...skuArray,media.id]
			))
			this.setState({
				skuArray
			})
		}
		if(nextProps.sku_list !== undefined && nextProps.sku_list !== null){
			this.setState({
				sku_list:nextProps.sku_list
			})
		}
	}
	handleSearchinput(v){
		console.log(v)
		this.setState({search:v.target.value.toUpperCase()})
		// this.props.getProductSkuList(v.target.value)

	}
	onsearchButton(){
		//this.props.getProductMediaList();
		this.props.getProductSkuList(this.state.search)
		this.setState({
			cancelButton:true
		})
	}
	oncancelButton(){
		this.props.getProductSkuList()
		this.setState({
			cancelButton:false
		})
	}
	render() {
		return (
			<div className="pcoded-inner-content">
				<div className="main-body">
					<div className="page-wrapper">
						<div className="page-header">
							<div className="row align-items-end">
								<div className="col-lg-8">
									<div className="page-header-title">
										<div className="d-inline">
											<h4>PRODUCT MEDIA</h4>
										</div>
									</div>
								</div>
								{/* <div className="col-lg-4">
									<div className="page-header-breadcrumb">
										<ul className="breadcrumb-title">
											<li className="breadcrumb-item">
												<Link to="/">
													<i className="feather icon-home"></i>{' '}
												</Link>
											</li>
											<li className="breadcrumb-item active">Product Media</li>
										</ul>
									</div>
								</div> */}
							</div>
						</div>



						<div className="row text-center">
                <div className="col-sm-12">
                  <div className="">
                    <div className="card-block">
                      <div className="col">
                      <FormControl>
                                <div style={{height:"8px"}}> 

                                </div>
                <div className="form-group row">
                  <div className="col-sm-9" >
                    <input
                      style={{width:"210px",height:"14px"}}
                      type="search"
                      className="form-control"
                      name="search"
                      placeholder="Search using product SKU..."
                       onChange={this.handleSearchinput.bind(this)}
                      value={this.state.search}
                    />
                 </div>
                </div>
              
                  </FormControl>
                  <FormControl>
                                <div>
                                  <span 

                 className="btn btn-dark py-1 mx-3 mt-2 text-center"
                  onClick={this.onsearchButton.bind(this)}
				 >
                                  <i  
                  class="icofont icofont-search"
                  > </i>
                  <i style={{fontSize:"9px",fontStyle:"none"}}  ></i> 
                                  </span>
                 
                                  </div>


               </FormControl>
               <FormControl>
               {this.state.cancelButton == true?
               <div 
               // style={{width:"20px"}}
              className="btn btn-secondary py-1 mx-3 mt-2"
              onClick={this.oncancelButton.bind(this)}
			  >
               {/* <i class="icofont icofont-close-line-squared"></i> */}
               
               <i style={{fontSize:"10px"}}>cancel</i>
               </div>
              :null}
              
             
              </FormControl>
			  </div>
			  </div>
			  </div>
			  </div>
			  </div>

                  <div className="page-body">
							<div className="row">
								{console.log(this.state.skuArray)}
								{this.state.sku_list &&
									this.state.sku_list.map((media) => (
										<div className="col-md-2">
											<Link to={`/product_media/${media}`}>
												<div className="card" style={{backgroundColor:"#F8F8F8"}}>
													<div className="card-body d-flex justify-content-center align-items-center flex-column">
														
														<i className="f-32 icofont icofont-folder"></i>
														
														<h6 className="f-3 card-title mt-2">
															<b>{media}</b>
														</h6>
													</div>
												</div>
											</Link>
										</div>
									))}
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
		productMedia: state.productMedia.mediaList,
		error: state.category.error,
		sku_list:state.productMedia.sku_list,
		isLoading: state.category.isLoading,
	};
};
ProductMediaList.propTypes = {
	getProductMediaList: PropTypes.func.isRequired,
	getProductSkuList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getProductMediaList,getProductSkuList })(ProductMediaList);
