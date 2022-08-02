import React, { Component } from 'react';
import {
    Button, Paper,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import { GetProductDetails } from '../../../../services';
import AutoSelect from "../../../../common/autoselect";
import ButtonField from "../../../../common/ButtonField/ButtonField";
import swal from 'sweetalert';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const Arrays = (data, fieldName, fieldValue) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
        data.map((item, key) => {
            arrayItem.push({ label: item[fieldName], value: item[fieldValue] });
            return null;
        });
    }
    return arrayItem;
};

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [], code: '', selectedType: '', startDate: '', endDate: '', type: '', value: ''
        }
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    changeStartDate(date) {
        this.setState({
            startDate: date
        })
    }
    changeEndDate(date) {
        this.setState({
            endDate: date
        })
    }
    handleBack(e) {
        this.props.history.goBack();
    }
    handleSelectChange = (name, selected) => {
        this.setState({
            productList: {
                ...this.state.productList,
                [name]: selected.value,
            },
            selectedType: selected,
        });
    };
    async getProductList(data) {
        this.setState({ isloaded: false })
        let list = await GetProductDetails.getSellerProductList(data);
        if (list) {
            this.setState({
                productList: list.data,
                isloaded: true
            })
        } else {
            this.setState({ isloaded: false })
        }
    }
    async componentDidMount() {
        this.getProductList();
    }
    createService = async event => {
        event.preventDefault();
        const { code, type, value, selectedType, startDate, endDate } = this.state;
        const data = {
            Code: code,
            VarientId: selectedType.value,
            StartDate: startDate,
            EndDate: endDate,
            Type: type,
            Value: value
        }
        swal({
            title: "Are you sure?",
            text: "You want to coupon",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.createCoupon(data);
                    if (list) {
                        NotificationManager.success(list.message, "Message")
                    }
                }
            });

    }

    render() {
        const { productList, code, type, value, selectedType, startDate, endDate } = this.state;
        let disableSaveButton = !code || !selectedType.value || !endDate || !startDate || !type || !value
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-10 col-lg-6">
                        <h2 className="mt-30 page-title">Coupon Create</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <Paper className="mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0 h6">Coupon Info</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <label className="col-md-2 col-form-label">Coupon code<span className="text-danger text-danger">*</span></label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control mb-3" name="code" value={code} onChange={(e) => this.handleChange(e)} placeholder="ex: offer10" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-md-2 col-form-label">Product</label>
                                <div className="col-md-10">
                                    <AutoSelect
                                        className="form-control mb-3 basic-single"
                                        value={selectedType}
                                        onChange={this.handleSelectChange}
                                        isSearchable={true}
                                        name="brand_id"
                                        options={Arrays(productList, "productName", "id")}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-md-2 col-form-label">Start Date: </label>
                                <div className="col-md-4">
                                    <DatePicker
                                        className="form-control w-100"
                                        name="startDate"
                                        selected={startDate}
                                        onChange={this.changeStartDate}
                                        dateFormat="Pp"
                                    />
                                </div>
                                <label className="col-md-2 col-form-label">End Date: </label>
                                <div className="col-md-4">
                                    <DatePicker
                                        className="form-control w-100"
                                        name="endDate"
                                        selected={endDate}
                                        onChange={this.changeEndDate}
                                        dateFormat="Pp"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-md-2 col-form-label">Discount<span className="text-danger text-danger">*</span></label>
                                <div className="col-md-6">
                                    <select className="form-control" name="type" value={type} onChange={(e) => this.handleChange(e)}>
                                        <option  selected>Select type</option>
                                        <option value="1">Amount</option>
                                        <option value="2">Percentage</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control mb-3" placeholder="ex: amount, percentage" name="value" value={value} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <ButtonField className="theme-btn w-100" variant="contained" color="primary"
                                buttonText={"Create"} disabled={disableSaveButton} data-test="create-user-button" onClick={this.createService}
                            />
                        </div>
                    </div>

                </Paper>
                {/* end */}

            </div>

        )
    }
}
