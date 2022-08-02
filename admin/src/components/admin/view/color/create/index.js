import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
import { GetProductDetails } from '../../../../services';
import swal from 'sweetalert';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color:'', code : '',
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    convertToSlug(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    handleSubmit = async event => {
        event.preventDefault();
        let slug = this.convertToSlug(this.state.color)
        const { color , code } = this.state;
        let data = { name: color, code: code }
        swal({
            title: "Are you sure?",
            text: "You want to Add New color",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.createColorList(data);
                    if (list) {
                        this.setState({ getList: list.data })
                        window.location.href = "/admin/color/list"
                    }
                }
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Create Color</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Add Colour</li>
                </ol>
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add New Color</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Name*</label>
                                        <input type="text" className="form-control" placeholder="ex: green" name="color" value={this.state.color} onChange={(e) => this.handleChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Code*</label>
                                        <input type="text" className="form-control" placeholder="ex: #ffff" name="code" value={this.state.code} onChange={(e) => this.handleChange(e)}/>
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add New</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
