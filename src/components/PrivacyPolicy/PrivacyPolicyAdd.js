import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constant from "../../Constant.js";
import ReactQuill from "react-quill";

class PrivacyPolicyAdd extends React.Component {
  state = {
  };
  handleChange = (value) => {
    this.setState({ description: value });
  };
 
  render() {
    return (
      <div className="row">
        <div className="col-12 grid-margin">
          {this.state.isloading ? (
            ""
          ) : (
            // <HashLoader
            //   css={override}
            //   sizeUnit={"px"}
            //   size={50}
            //   margin={"2px"}
            //   color={"#32323d"}
            //   loading={this.state.isloading}
            // />
            <div className="">
              <div className="">
                <ReactQuill
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <br />
                <br />{" "}
                <div className="row float-right p-3">
                  {this.props.isLoading ? (
                    <button className="btn btn-grd-disabled mr-2" disabled>
                      Saving...!
                    </button>
                  ) : (
                    <button
                      onClick={this.onSave}
                      className="btn btn-grd-disabled mr-2"
                    >
                      Save
                    </button>
                  )}

                  <Link to={"/refund_policy"} className="btn btn-outline-dark">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PrivacyPolicyAdd;
