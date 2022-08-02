import React, { Component } from 'react'
import { GetLocationDetails , GetUserLogin} from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';

export default class Deliverydetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationList: [],
            name: '', phone: '', city: '', ShippingAddress: '', states: '', StreetAddress: '', customer:"", toggle: false, deliveryId: ''
        }
    }
    handleToggle = e =>{
        this.setState({ toggle: !this.state.toggle})
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    async getUserDetail(){
        let user = await GetUserLogin.getCustomerDetail();
        if (user) {
            this.setState({ customer: user.data })
        }
    }
    async componentDidMount() {
        this.getUserDetail();

        let location = await GetLocationDetails.getLocationListDetails();
        if (location) {
            this.setState({ locationList: location.data })
        } else {
            NotificationManager.error("Data is empty", "Data");
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        const { name, phone, city, StreetAddress, states, ShippingAddress ,deliveryId} = this.state;
        let delivery = { name: name, phone: phone, city: city, StreetAddress: StreetAddress, states: states, ShippingAddress: ShippingAddress };
        if(deliveryId){
            let data = { deliverId: deliveryId}
            this.props.onSelectDeliveryAddress(data)
        }else{
            this.props.onSelectDeliveryAddress(delivery)
        }
    }
    async handlDeleteById(id) {
        let data = { id: id}
        swal({
            title: "Are you sure?",
            text: `You want to Address list : ${id}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetUserLogin.getDeleteProduct(data);
                    if (value) {
                        window.location.reload();
                    }
                }
            });
    }

    render() {
        const { name, phone, city, StreetAddress, states, ShippingAddress, locationList, customer , deliveryId} = this.state;
        let option = locationList.map((data, i) => (
            <option value={data.id}>{data.name}</option>
        ));

        return (
            <div className="card-body">
                <div className="checkout-billing-details-wrap mt-4 my-3">
                    <div className="row">
                        {
                            customer ?
                                customer.Addresses.map((row, index) => (

                                    <div className="col-sm-12" key={index}>

                                        <input className="form-check-input" type="radio" name="deliveryId" value={row.id} onChange={(e)=>this.handleChange(e)} />
                                        <div className="add-area">
                                            <h6 className="mb-2">{row.fullname}</h6>
                                            <p>{row.shipping}</p>
                                            <p>{row.city + " , " + row.states}</p>
                                            <p>Pincode: {row.pincode}</p>
                                            <p>{row.phone}</p>
                                            <div className="text-right">
                                                <button type="submit" className="del-btn" onClick={(e) => this.handlDeleteById(row.id)}><i className="uil uil-trash-alt" ></i></button>
                                            </div>
                                        </div>
                                    </div>

                                ))
                                : ''
                        }

                    </div>
                        <div className="d-flex align-center">

                    <button type="submit" className="btn btn-sqr mt-4"  onClick={(e)=>this.handleToggle(e)}>Add New Address</button>

                    <button type="button" disabled={!deliveryId} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" className="btn btn-secondary ml-2 mt-4 btn-lg" onClick={this.handleSubmit}>NEXT</button>
                        </div>
                </div>
                <form className={this.state.toggle ? "pt-2" : "d-none"}>
                    <div className="row" >
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="control-label">Full Name <span className="required">*</span></label>
                                <input className="form-control border-form-control" type="text" name="name" placeholder="eg: abhinash kumar pandit" value={name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="control-label">Phone <span className="required">*</span></label>
                                <input type="number" className="form-control border-form-control" name="phone" placeholder="eg: 99999999" value={phone} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="control-label">State / Zone <span className="required">*</span></label>
                                <select className="select2 form-control border-form-control" name="states" value={states} onChange={this.handleChange}>
                                    <option selected>Select State/Zone</option>
                                    {option}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="control-label">City / Town <span className="required">*</span></label>
                                <input type="text" className="form-control border-form-control" name="city" placeholder="eg: janakpur" value={city} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            {/* <div className="form-group">
                                <label className="control-label">City <span className="required text-danger">*</span></label>
                                <select className="select2 form-control border-form-control" name="city" value={city} onChange={this.handleChange}>
                                    <option value>Select City</option>
                                    <option value="Janakpur">Janakpur</option>
                                    <option value="Jaleswar">Jaleswar</option>
                                    <option value="Sirha">Sirha</option>
                                    <option value="Rajbiraj">Rajbiraj</option>
                                </select>
                            </div> */}
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label className="control-label">address  <span className="required text-danger">*</span></label>
                                <textarea className="form-control border-form-control" type="text" name="StreetAddress" value={StreetAddress} onChange={this.handleChange} />
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label className="control-label">Shipping Address <span className="required text-danger">*</span></label>
                                <textarea className="form-control border-form-control" name="ShippingAddress" value={ShippingAddress} onChange={this.handleChange} />
                                {!ShippingAddress ? <small className="text-danger">Please provide current shipping address.</small>:''}
                            </div>
                        </div>
                    </div>
                    <button type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" className="btn btn-secondary mb-2 btn-lg" onClick={this.handleSubmit}>NEXT</button>
                </form>
            </div>
        )
    }
}
