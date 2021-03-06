import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Constant from "../../Constant";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";

class AttributeList extends React.Component {
  state = {
    attribute_list_data: [
      {
        id: "1",
        name: "Material",
        type: "imageWithText",
        attributValue: [
          {
            id: "1",
            value: "Alligator, matt, square-scaled",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/a.png",
          },
          {
            id: "2",
            value: "Alligator, shiny, square-scaled",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/b.png",
          },
          {
            id: "3",
            value: "Alligator, carbone, square-scaled",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/c.png",
          },
          {
            id: "4",
            value: "Alligator, fashion, square-scaled",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/d.png",
          },
          {
            id: "5",
            value: "Ostrich",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/material/thumb/e.png",
          },
        ],
      },
      {
        id: "2",
        name: "Color",
        type: "imageWithText",
        AttributeValues: [
          {
            id: "6",
            value: "Navy Blue",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/color/thumb/b.jpg",
          },
          {
            id: "7",
            value: "Black",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/color/thumb/a.jpg",
          },
          {
            id: "8",
            value: "Dark brown",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/color/thumb/c.jpg",
          },
          {
            id: "9",
            value: "Red",
            image_url:
              "http://kuwaitgate.org/horology/05/images/customization/color/thumb/d.jpg",
          },
        ],
      },
      {
        id: "3",
        name: "Model of the buckle",
        type: "text",
        AttributeValues: [
          {
            id: "10",
            value: "Thin model Steel buckle",
          },
          {
            id: "11",
            value: "Thin model Gold toned buckle",
          },
          {
            id: "12",
            value: "'CF' model Stainless steel buckle",
          },
          {
            id: "13",
            value: "'CF' model Gold-plated buckle",
          },
        ],
      },
    ],
    attribute_list: [],
  };

  deleteAttribute = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this !",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        var that = this;
        var data = {
          attributeId:id
        }
        // this.setState({ isSaving: true });
        fetch(Constant.getAPI() + "/attributes/delete", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("superadmin_auth")}`,
          },
          body:JSON.stringify(data)
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            if (json.status === true) {
              Swal.fire("Deleted!", "Tyre Category deleted.", "success");
              that.getAttributeList();
            } else {
              Swal.fire({
                title: "Something went wrong. Try again after some Time.!",
                icon: "error",
                text: "",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok",
              });
            }
          });
      }
    });
  };
  getAttributeList = () => {
    var that = this;
    var data = new URLSearchParams();
    this.setState({ isSaving: true });
    // data.append("AttributeTypeId", that.props.match.params.attribute_type_id);
    fetch(Constant.getAPI() + "/attributes/list", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.status === true) {
          that.setState({ attribute_list: json.data, isSaving: false });
        } else {
          that.setState({ attribute_list: [], isSaving: false });
          Swal.fire({
            title: "Something went wrong. Try again after some Time.!",
            icon: "error",
            text: "",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  componentWillMount() {
    this.getAttributeList();
  }
  render() {
    const columns = [
      {
        name: "name_en",
        label: "Attribute Name : English",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "name_ar",
        label: "Attribute Name : Arabic",
        options: {
          filter: true,
          sort: true,
        },
      },
      // {
      //   name: "attributeType",
      //   label: "Attribute Type",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },
      // {
      //   name: "attributValue",
      //   label: "Attribute Value",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRender: (attributValue, tableMeta) => {
      //       return (
      //         <div>
      //           {attributValue !== null &&
      //           attributValue !== [] &&
      //           attributValue !== undefined &&
      //           attributValue.length > 0 ? (
      //             <ol>
      //               {attributValue.map((attribute_value) => (
      //                 <li key={attribute_value.id}>{attribute_value.value}</li>
      //               ))}
      //             </ol>
      //           ) : (
      //             "-"
      //           )}
      //         </div>
      //       );
      //     },
      //   },
      // },
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (id, tableMeta) => {
            return (
              <div>
                <Link
                  to={"/attributes/add/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-ui-edit text-custom"></i>
                </Link>
                <Link
                  to={"/attribute-values/" + id}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                >
                  <i className="f-20 icofont icofont-plus text-instagram"></i>
                </Link>

                <span
                  onClick={this.deleteAttribute.bind(this, id)}
                  className="m-r-15 text-muted"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Delete"
                >
                  <i className="f-20 icofont icofont-delete-alt text-danger"></i>{" "}
                </span>
              </div>
            );
          },
        },
      },
    ];
    const options = {
         filter: false,
       viewColumns: false,
      responsive: 'scrollMaxHeight',search:false,
      print: false,
      pagination:false,
      download: false,
      selectableRows: "none",
      textLabels: {
        body: {
          noMatch: this.state.isSaving
            ? "Loading data..!"
            : "Sorry, No Attribute Found",
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
      },
    };
    return (
      <div className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <div className="page-header-title">
                    <div className="d-inline">
                      <h4>Attribute List</h4>
                    </div>
                  </div>
                  <Link
                    to={"/attributes/add"}
                    className="btn btn-sm btn-inverse waves-effect waves-light f-right d-inline-block md-trigger"
                    data-modal="modal-13"
                  >
                    {" "}
                    <i className="icofont icofont-plus m-r-5"></i> Add Attribute{" "}
                  </Link>
                </div>
                <div className="col-lg-4">
                  <div className="page-header-breadcrumb">
                    <ul className="breadcrumb-title">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="feather icon-home"></i>{" "}
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="/attribute-types">Attribute Types</Link>
                      </li>
                      <li className="breadcrumb-item active">Attribute List</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-block">
                      <div className="dt-responsive table-responsive">
                        <MUIDataTable
                          title={"Attribute List"}
                          className="table-responsive"
                          data={this.state.attribute_list}
                          columns={columns}
                          options={options}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributeList;
