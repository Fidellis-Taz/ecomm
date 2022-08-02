import React, { Component } from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import { GetUserLogin, GetOrderDetails } from '../../../../../services';
import Moment from 'react-moment';
import '../../css/index.css'
export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '', orderList: '', issue: '', comment: ''
        };
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    async orderDetails() {
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        let data = { id: lastSegment }

        let orderList = await GetOrderDetails.getOrderDetailsById(data);
        if (orderList) {
            this.setState({ orderList: orderList.data })
        }
    }
    async componentDidMount() {
        this.orderDetails();
        let value = await GetUserLogin.getCustomerDetail();
        if (value) {
            this.setState({ user: value.data })
        }
    }
    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }
    handleCancelReason = async (event) => {
        event.preventDefault();
        let { issue, comment, orderList } = this.state;
        let data = { issue: issue, comment: comment, cartId: orderList.id, orderId: orderList.order.id }
        if (data) {
            let value = await GetOrderDetails.getCancelOrder(data);
            if (value) {
                NotificationManager.success("Successfully canceled order from list", "Cancel")
                // window.location.reload()
            } else {
                NotificationManager.error("something occured", "Not cancel")
            }
        }
    }
    render() {
        let { user, orderList } = this.state;
        return (
            <div className="wrapper">
                <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">Home</li>
                                        <li className="breadcrumb-item active" aria-current="page">My Orders</li>
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
                                            <input type="file" id="file" />
                                            <label htmlFor="file"><i className="uil uil-camera-plus" /></label>
                                        </div>
                                    </div>
                                    <h4>{user.firstName}</h4>
                                    <p>+977 {user.phone}</p>
                                    {/* <div className="earn-points"><img src="images/Dollar.svg" alt />Points : <span>20</span></div> */}
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
                                        <a href="/account/order" className="user-item active"><i className="uil uil-box" />My Orders</a>
                                        {/* <a href="/account/rewards" className="user-item"><i className="uil uil-gift" />My Rewards</a> */}
                                        {/* <a href="/account/wishlist" className="user-item"><i className="uil uil-heart" />Shopping Wishlist</a> */}
                                        <a href="/account/address" className="user-item"><i className="uil uil-location-point" />My Address</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="dashboard-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab">
                                                <h4><i className="uil uil-box" />My Orders</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg ItemDetails-itemDetailsView">
                                                <div className="pdpt-title">
                                                    <h6>Delivery Timing : {orderList.deliveryDate ? <Moment format='MMMM Do YYYY hh:mm:ss'><b>{orderList.deliveryDate}</b></Moment> : ''} as per your requested</h6>
                                                </div>
                                                {
                                                    orderList ?
                                                        <Paper className="order-list-bk" >
                                                            <Grid container>
                                                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                                                    <Grid container>
                                                                        <Grid item xs={2} sm={2} md={2} lg={2} >
                                                                            <div className="CXW8mj">
                                                                                <img className="_396cs4 _3exPp9" alt="" src={orderList.thumbnail.imgUrl} />
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item xs={5} sm={5} md={5} lg={5}>
                                                                            <div className="item-name">
                                                                                <h5><b>{orderList.product.name}</b></h5>
                                                                                <h6>Brand: {orderList.product.brand}</h6>
                                                                                <h6>Size: {orderList.varient.unitSize}</h6>
                                                                                <h6>QTY: {orderList.qty}</h6>
                                                                            </div>

                                                                        </Grid>
                                                                        <Grid item xs={2} sm={2} md={2} lg={2} className="text-center">
                                                                            <b>₹{Math.round(orderList.qty * orderList.varient.netPrice)}</b>
                                                                        </Grid>
                                                                        <Grid item xs={3} sm={3} md={3} lg={3} >
                                                                            <div className="cancel">
                                                                                <div className="dot-icon"></div>
                                                                                {
                                                                                    orderList.status === "processing" ? <span className="Text-Text"><b>{orderList.status}</b></span> :
                                                                                        orderList.status === "shipping" ? <span ><b>{orderList.status}</b></span> :
                                                                                            orderList.status === "delivered" ? <span className="text-success" ><b>{orderList.status}</b></span> :
                                                                                                <span className="text-danger"><b>{orderList.status}</b></span>

                                                                                }
                                                                                <div class="_30gI7w">As per your request, your item has been {orderList.status}</div>
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>

                                                        : "No product"
                                                }
                                                <Paper className="order-list-bk" >
                                                    <div className="address">
                                                        <h5 title="t1"><b>Delivery Address</b></h5>
                                                    </div>
                                                    <div className="Address-nameNumber">
                                                        <span className="name_right_vk" >{orderList ? orderList.address.fullname : ''}</span>
                                                        <div className="Address-verticalDivider" />
                                                        <span className="name_left_vk">{orderList ? orderList.address.phone : ''}</span>
                                                    </div>
                                                    <h6 className="shipping">{orderList ? orderList.address.shipping + ',' + orderList.address.city + ',' + orderList.address.distict : ''}</h6>
                                                    <Button variant="outlined" color="secondary">Change Address</Button>
                                                </Paper>

                                                <Paper className="order-list-bk" >
                                                    <div className="address">
                                                        <h5 title="t1"><b>Update sent to</b></h5>
                                                    </div>
                                                    <div className="Address-nameNumber">
                                                        <span className="envelope_icon_vk"><i className="fa fa-phone" aria-hidden="true"></i></span>
                                                        <span className="phone_email_vhs">{orderList ? orderList.address.phone : ''}</span>
                                                    </div>
                                                    <div className="Address-nameNumber">
                                                        <span className="envelope_icon_vk"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                                        <span className="phone_email_vhs">{user ? user.email : ''}</span>
                                                    </div>
                                                </Paper>

                                                <Paper className="order-list-bk" >
                                                    <span className="order-id">Order ID # {orderList ? orderList.order.number : ''} </span>
                                                    <div className="track-order">
                                                        <h4>Track Order</h4>
                                                        <div className="bs-wizard">
                                                            <div className={orderList.status === "processing" ? "bs-wizard-step complete" : orderList.status === "shipping" ? "bs-wizard-step complete" : orderList.status === "delieverd" ? "bs-wizard-step complete" : "bs-wizard-step"}>{/* complete */}
                                                                <div className="text-center bs-wizard-stepnum">Confirmed</div>
                                                                <div className="progress"><div className="progress-bar" /></div>
                                                            </div>
                                                            <div className={orderList.status === "processing" ? "bs-wizard-step complete" : orderList.status === "shipping" ? "bs-wizard-step complete" : orderList.status === "delieverd" ? "bs-wizard-step complete" : "bs-wizard-step"}>{/* complete */}
                                                                <div className="text-center bs-wizard-stepnum">Packed</div>
                                                                <div className="progress"><div className="progress-bar" /></div>
                                                            </div>
                                                            <div className={orderList.status === "shipping" ? "bs-wizard-step complete" : orderList.status === "delieverd" ? "bs-wizard-step complete" : "bs-wizard-step"}>{/* complete */}
                                                                <div className="text-center bs-wizard-stepnum">On the way</div>
                                                                <div className="progress"><div className="progress-bar" /></div>
                                                            </div>
                                                            <div className={orderList.status === "delieverd" ? "bs-wizard-step complete" : "bs-wizard-step"}>{/* active */}
                                                                <div className="text-center bs-wizard-stepnum">Delivered</div>
                                                                <div className="progress"><div className="progress-bar" /></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="address">
                                                        {
                                                            orderList.status === "cancelRequest" ? '' :
                                                                <Button variant="contained" color="primary" data-toggle="modal" data-target="#addressModal"> Cancel Order</Button>
                                                        }
                                                    </div>
                                                    <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                                                </Paper>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div className="modal fade" id="addressModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-bottom-0">
                                <h5 class="modal-title">Cancel Order</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="cancellationReason-heading1">Reason for cancellation</div>
                                <div className="cancellationReason-reasonMessageOne">Please tell us correct reason for cancellation. This information is only used to improve our service</div>
                                <div className="d-flex flex-column ">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="login-wrap">
                                            {/* Tab panes */}
                                            <div className="row">
                                                <div className="form-group col-sm-6 ">
                                                    <div className="RadioDropdown-reasonHeader"><span>SELECT REASON<span class="RadioDropdown-required">*</span></span></div>
                                                    <select className="form-control" name="issue" value={this.state.issue} onChange={this.handleChange}>
                                                        <option selected>Select reason</option>
                                                        <option value="Delayed Delivery Cancellation">Delayed Delivery Cancellation</option>
                                                        <option value="B">Incorrect size ordered</option>
                                                        <option value="Incorrect size ordered">Duplicate Order</option>
                                                        <option value="Product not required anymore">Product not required anymore</option>
                                                        <option value="Cash Issue">Cash Issue</option>
                                                        <option value="Ordered by mistake">Ordered by mistake</option>
                                                        <option value="Wants to change style/color">Wants to change style/color</option>
                                                        <option value="Other reason">Other reason</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-sm-12">
                                                    <textarea className="form-control" placeholder="Enter comment" rows="4" name="comment" value={this.state.comment} onChange={this.handleChange}></textarea>
                                                </div>
                                            </div>
                                            <div className="single-input-item">
                                                <button type="submit" className="btn btn-sqr w-100 py-3" onClick={this.handleCancelReason}>Submit</button>
                                            </div>

                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>



            </div>

        )
    }
}
