import React, { Component } from 'react';
import Constant from '../../../Constant';
import axios from 'axios';
import './image-upload.css';

class ImageUpload extends Component {
	state = {
		image: 'https://content.hostgator.com/img/weebly_image_sample.png',
	};

	onChange = (e) => {
		console.log(e,e.target.files)
		const files = Array.from(e.target.files);

		const formData = new FormData();

		files.forEach((file, i) => {
			formData.append('files', file);
		});
		console.log(formData)
		axios
			.post(Constant.getAPI() + '/productmedia', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('ts-token')}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				this.props.uploaded();
			});
	};

	render() {
		return (
			<div className="card image-upload-wrapper course-wrapper p-1 bg-white">
				<div className="buttons fadein d-flex justify-content-center align-items-center flex-column">
					<div className="button">
						<label className="m-0" htmlFor={this.props.name || 'image'}>
							<img src={this.props.image ? this.props.image : this.state.image} alt="" />
						</label>
						<input
							type="file"
							id={this.props.name || 'image'}
							accept={this.props.accept}
							onChange={this.onChange}
						/>
					</div>
					<p className="m-0">{this.props.name && this.props.name.split('/')[1]}</p>
				</div>

				{/* <img src={profileImage} alt="" /> */}
			</div>
		);
	}
}

export default ImageUpload;
