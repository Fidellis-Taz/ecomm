import React, { Component } from 'react';
import { GetUserLogin, GetOrderDetails } from '../../../../../services';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import '../../css/index.css';
import { Paper, Grid } from '@material-ui/core';
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '', orderList: []
        };
    }
    async componentDidMount() {
        let value = await GetUserLogin.getCustomerDetail();
        let list = await GetOrderDetails.getOrderByUser();
        if (value) {
            this.setState({ user: value.data, orderList: list.order })
        } else {
            NotificationManager.error("Check your credential", "Login");
        }
    }
    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
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
                                            {/* <input type="file" id="file" /> */}
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
                                        {/* <a href="/account/rewards" className="user-item"><i className="uil uil-gift" />My Rewards</a>
                                        <a href="/account/wishlist" className="user-item"><i className="uil uil-heart" />Shopping Wishlist</a> */}
                                        <a href="/account/address" className="user-item"><i className="uil uil-location-point" />My Address</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="dashboard-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab">
                                                <h4><i className="uil uil-box" />showing All Orders</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="order-body10">

                                                    <div class="card card-body account-right page-listBackground">
                                                        <div class="widget">
                                                            <div class="order-list-tabel-main table-responsive">
                                                                {
                                                                    orderList ?
                                                                        orderList.map(product => (
                                                                            product.Cart_Details.map((row, index) => (
                                                                                <Paper className="order-list-bk" key={index} >
                                                                                    <Link to={{ pathname: `/account/order/details/${row.id}` }}>
                                                                                        <Grid container>
                                                                                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                                                                                <Grid container>
                                                                                                    <Grid item xs={2} sm={2} md={2} lg={2} >
                                                                                                        <div className="CXW8mj">
                                                                                                            <img className="_396cs4 _3exPp9" alt="" src={row.thumbnail.imgUrl} />
                                                                                                        </div>
                                                                                                    </Grid>
                                                                                                    <Grid item xs={5} sm={5} md={5} lg={5}>
                                                                                                        <div className="item-name">
                                                                                                            <h5><b>{row.product.name}</b></h5>
                                                                                                            <h6>Brand: {row.product.brand}</h6>
                                                                                                            <h6>Size: {row.varient.unitSize}</h6>
                                                                                                            <h6>QTY: {row.qty}</h6>
                                                                                                        </div>

                                                                                                    </Grid>
                                                                                                    <Grid item xs={2} sm={2} md={2} lg={2} className="text-center">
                                                                                                        <b>₹{Math.round(row.qty * row.varient.netPrice)}</b>
                                                                                                    </Grid>
                                                                                                    <Grid item xs={3} sm={3} md={3} lg={3} >
                                                                                                        <div className="cancel">
                                                                                                            <div className="dot-icon"></div>
                                                                                                            {
                                                                                                                row.status === "processing" ? <span className="Text-Text"><b>{row.status}</b></span> :
                                                                                                                    row.status === "shipping" ? <span ><b>{row.status}</b></span> :
                                                                                                                        row.status === "delivered" ? <span className="text-success" ><b>{row.status}</b></span> :
                                                                                                                            <span className="text-danger"><b>{row.status}</b></span>

                                                                                                            }
                                                                                                            <div class="_30gI7w">As per your request, your item has been {row.status}</div>
                                                                                                        </div>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Link>
                                                                                </Paper>
                                                                            ))
                                                                        ))
                                                                        : "No product"
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
