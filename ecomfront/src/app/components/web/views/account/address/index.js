import React, { Component } from 'react'
import { GetUserLogin } from '../../../../services';
import { getCookie } from '../../../../../../function';
import '../css/index.css';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '', address: '',
        };
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    async componentDidMount() {
        let email = getCookie('email')
        if (email) {
            let value = await GetUserLogin.getCustomerDetail(email);
            if (value) {
                this.setState({ user: value.data })
            }
        }
    }
    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }

    handleAddNewAddress = async (event) => {
        event.preventDefault();
        let { address } = this.state;
        let data = { address: address }
        if (data) {
            let user = await GetUserLogin.getAddNewAddress(data);
            if (user) {
                NotificationManager.success("Successfully Address Aded in list", "Address")
                window.location.reload()
            }
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
        let { user } = this.state;
        return (
            <div className="wrapper">
                <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">Home</li>
                                        <li className="breadcrumb-item active" aria-current="page">User Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-group">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="user-dt">
                                    <div className="user-img">
                                        <img src="/img/avatar/img-5.jpg" alt="user" />
                                        <div className="img-add">
                                            {/* <input type="file" id="file" /> */}
                                            <label htmlFor="file"><i className="uil uil-camera-plus" /></label>
                                        </div>
                                    </div>
                                    <h4>{user.firstName}</h4>
                                    <p>+977 {user.phone}</p>
                                    {/* <div className="earn-points"><img src="images/Dollar.svg" alt="alt" />Points : <span>20</span></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="left-side-tabs">
                                    <div className="dashboard-left-links">
                                        <a href="/account/view" className="user-item"><i className="uil uil-apps" />Overview</a>
                                        <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />My profile</a>
                                        <a href="/account/order/list" className="user-item"><i className="uil uil-box" />My Orders</a>
                                        {/* <a href="/account/rewards" className="user-item"><i className="uil uil-gift" />My Rewards</a> */}
                                        {/* <a href="/account/wishlist" className="user-item"><i className="uil uil-heart" />Shopping Wishlist</a> */}
                                        <a href="/account/address" className="user-item active"><i className="uil uil-location-point" />My Address</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="dashboard-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab">
                                                <h4><i className="uil uil-location-point" />My Address</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="pdpt-title">
                                                    <h4>My Address</h4>
                                                </div>
                                                <div className="address-body">
                                                    {/* <a href="/" className="add-address hover-btn" data-toggle="modal" data-target="#addressModal">Add New Address</a> */}
                                                    {
                                                        user ?
                                                            user.Addresses.map((row, index) => (
                                                                <div className="address-item" key={index}>
                                                                    <div className="address-icon1">
                                                                        <i className="uil uil-home-alt" />
                                                                    </div>
                                                                    <div className="address-dt-all">
                                                                        {/* <h4>Home</h4> */}
                                                                        <p><b>Shipping: </b>{row.shipping}</p>
                                                                        {/* <p><b>Address: </b>{row.StreetAddress}</p> */}
                                                                        <ul className="action-btns">
                                                                            {/* <li><a href="/" className="action-btn"><i className="uil uil-edit" /></a></li> */}
                                                                            {/* <li onClick={(e) => this.handlDeleteById(row.id)}><span  className="action-btn"><i className="uil uil-trash-alt" /></span></li> */}
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                            ))
                                                            : <p>Loading...</p>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="addressModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">

                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title">Add New Address</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className="login-wrap">
                                    {/* Tab panes */}

                                    <div class="single-input-item mt-0">
                                        <textarea placeholder="Enter your complete address here" className="form-group" rows="4" name="address" value={this.state.address} onChange={this.handleChange}></textarea>
                                    </div>


                                    <div className="single-input-item">
                                        <button type="submit" className="btn btn-sqr w-100 py-3" onClick={this.handleAddNewAddress}>Add Address</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
