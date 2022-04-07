import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Constant from '../../Constant'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGallery } from '../../store/index';


class BannerGallery extends Component {
	state = {
		search:'',
		type:"",
		datarange: 0,
		dataLength: 11,
        image: 'https://content.hostgator.com/img/weebly_image_sample.png',
	};
    

	componentDidMount() {
		console.log(this.props.match.params.media_type)
		this.setState({
			type:this.props.match.params.media_type
		})
	this.props.getGallery(this.props.match.params.media_type,this.state.datarange,this.state.dataLength)
		
	}
	componentWillReceiveProps(nextProps,prev) {
		

		if(this.state.type !== nextProps.match.params.media_type)
		{
			this.props.getGallery(nextProps.match.params.media_type,0,11)
			this.setState({
				type:nextProps.match.params.media_type,
				dataLength:11,
				datarange:0,
				search:""
			})

		}
	
    }
    open(){
    this.setState({
		open:true,
	})
    }
	callGallery(){
      this.props.getGallery(this.state.type,this.state.datarange,this.state.dataLength)
	}
	onChange(e){
		var that=this
		console.log(e.target.files)
		const files = Array.from(e.target.files);

		const formData = new FormData();

		files.forEach((file, i) => {
			formData.append('files', file);
		});	
		console.log(formData)
		axios
			.post(Constant.getAPI() + `/media/add/gallery?mediaType=${this.state.type}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('ts-token')}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				that.callGallery()
				
			});
	}
	handlePageChange(pageNumber) {
		console.log('active page is', pageNumber);
		console.log(pageNumber * 11 - 11);
		const range = pageNumber * 11 - 11;
		const dataLength = this.state.dataLength;
	
	
		this.setState({
			datarange: range,
			dataLength: dataLength,
		});
		this.setState({ activePage: pageNumber });
		console.log(range, dataLength);
	}
	search(e){
		
		this.props.getGallery(this.state.type,0,11,e.target.value)
		this.setState({
			search:e.target.value,
			dataLength:11,
			datarange:0
		})
       
	}
	next(){
		if(this.props.banner_gallery.length == 11 ){
	var datarange=this.state.datarange+11
	var dataLength=this.state.dataLength+11
	this.props.getGallery(this.state.type,datarange,dataLength,this.state.search)
    this.setState({
		datarange,
		dataLength
	})
}

	}
	previous(){
		if(this.state.datarange >= 11){
		var datarange=this.state.datarange-11
		var dataLength=this.state.dataLength-11
		this.props.getGallery(this.state.type,datarange,dataLength,this.state.search)
		this.setState({
			datarange,
			dataLength
		})

	}
	

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
										<div className="d-inline d-flex ">
										
												<h4> {this.state.type.toUpperCase()} MEDIA </h4>{' '}
											
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
											<li className="breadcrumb-item active">Banner Media</li>
										</ul>
									</div>
								</div> */}
								 <br/>
                                <div className="card col-12 ">
                                    <div className="card-body">
										<div className="row d-flex justify-content-center">
											<div className="col-xl-6 input-group mb-3">
												
												<input 
												placeholder="Search By Image Name..."
												className="form-control border border-dark"
												style={{borderRadius:"20px"}} 
												onChange={this.search.bind(this)}/>

											</div>


										</div>
										<br/>
                                        <div className="row">
										  <div className="card image-upload-wrapper course-wrapper p-1 bg-white col-2" >
			                            	<div className="buttons fadein d-flex justify-content-center align-items-center flex-column">
                                              <div className="button" >
											<label>
                                                <img className="m-0"
												  src={this.state.image} 
												   style={{height:"110px",width:"180px"}} 
												    />
												  
												   <input type="file"
												   multiple
												   onChange={this.onChange.bind(this)}/>
												    </label>
                                             </div>
											 </div>
											</div>
                                          
                                          {  
                                             this.props.banner_gallery !== undefined && 
											 this.props.banner_gallery !==null ?
                                             this.props.banner_gallery.map(image=>{
                                                 return(
                                                <div className="col-2 text-center">
                                                 <img src={image.url} style={{height:"100px",width:"100px"}} />
                                                 <br/>
                                                  <h6>{image.mediaName}</h6>
                                                </div>
                                              ) })
                                             :<label className="col-9"><h1>No Media!!</h1></label>
                                         }
										 {
											 this.props.banner_gallery.length == 0?
											 <label className="col-9"><h1>No Media!!</h1></label>
											 :null
										 }
                                        </div>

                                    </div>

                                </div>
							</div>
						</div>
						
					</div>
					<nav
					  aria-label="Page navigation example "
					className="d-flex justify-content-center">
					<ul class="pagination">
					<li>
						<button
						className="button"
						onClick={this.previous.bind(this)}
						>
                           <i className="f-26 icofont icofont-curved-left"></i>
						</button>
					</li>&nbsp;
					<li>
						<button
						onClick={this.next.bind(this)}>
                           <i className="f-26 icofont icofont-curved-right"></i>
						</button>
					</li>						
														
					</ul>
					</nav>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
        banner_gallery:state.bannerMedia.banner_gallery,
		error: state.category.error,
		isLoading: state.category.isLoading,
	};
};
BannerGallery.propTypes = {
	getGallery: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getGallery })(BannerGallery);
