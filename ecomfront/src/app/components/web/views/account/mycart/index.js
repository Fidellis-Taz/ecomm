import React, { Component } from 'react'
import { connect } from 'react-redux';
import Nodata from '../../../../../NoData';
import LazyLoad from 'react-lazyload';
// import './index.css'
import { removeFromCart, incrementToCart, decreaseToCart } from "../../../../../store/actions/cartActions";

import classes from "./MyCart.module.css"
import BottomBar from '../../../../BottomBar';

class MyCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grandTotal: '', toggle: false
        }
    }
    handleHide() {
        this.setState({ toggle: !this.state.toggle })
    }
    render() {
        const { cartItems } = this.props;

        const subtotal = cartItems.map(item => item.selectedVariant.netPrice * item.selectedVariant.qty)
        let GrandTotal = subtotal.reduce((sum, p) => sum + p, 0)
        return (
            <div className="shop-single">
                <div className={classes.main_title_tab}>
                    <h4><i className="uil uil-shopping-cart-alt"></i>My cart ({cartItems.length} Items)</h4>
                </div>
            
                <div className="container-fluid">

                    {
                        cartItems.length === 0 ?
                            <Nodata />
                            :
                            <div>
                        
                                    {
                                        cartItems.map((row, index) => {
                                            const selectedVariant = row.selectedVariant;
                                            return <div className={classes.cartitems} style={{
                                                backgroundColor: 'white',
                                                //backgroundColor: 'white',
                                                filter: "drop-shadow(0px 0px 3px rgb(34, 34, 34, 0.8))",
                                            }} key={index}>
                                                <div className="cart-product-img">
                                                    {/* <img className="img-fluid" src={row.photo} alt="cart" /> */}
                                                    {
                                                        row.productphotos ?
                                                            row.productphotos.slice(0, 1).map(p => (
                                                                <LazyLoad>
                                                                    <img className="img-fluid" src={p.imgUrl} alt="product" />
                                                                </LazyLoad>

                                                            ))
                                                            :
                                                            <LazyLoad>
                                                                <img className="img-fluid" src="/img/opacity-loss.jpg" alt={404} />
                                                            </LazyLoad>
                                                    }
                                                    {
                                                        selectedVariant &&
                                                        <span className="badge badge-success">
                                                            {Math.round(((selectedVariant.distributorPrice - selectedVariant.netPrice) * 100) / selectedVariant.distributorPrice)}% OFF
                                                        </span>

                                                    }
                                                    {/* {row.discountPer ?<div className="offer-badge">{row.discountPer}% OFF</div>:''} */}
                                                </div>
                                                <div className="cart-text">
                                                    <h4>{row.name}</h4>
                                                    <div className="cart-radio">
                                                        <ul className="kggrm-now">
                                                            <li>
                                                                <input type="radio" id="a1" name="cart1" />
                                                                <label >
                                                                    {
                                                                        selectedVariant &&
                                                                        selectedVariant.unitSize
                                                                    }
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    {
                                                        selectedVariant &&
                                                        <div className="qty-group">
                                                            <div className="quantity buttons_added">
                                                                <input type="button" defaultValue="-" className="minus minus-btn" onClick={() => this.props.decreaseToCart(selectedVariant)} />
                                                                <input type="number" value={selectedVariant.qty} className="input-text qty text" disabled />
                                                                <input type="button" defaultValue="+" className="plus plus-btn" onClick={() => this.props.incrementToCart(selectedVariant)} />
                                                                <button type="button" className="cart-close-btn" onClick={() => this.props.removeFromCart(selectedVariant)}><i className="mdi mdi-close" /></button>
                                                            </div>
                                                            <div className="cart-item-price">Rs.{selectedVariant.qty * selectedVariant.netPrice}{/* <span>Rs.{row.netPrice}</span> */}</div>
                                                        </div>


                                                    }


                                                </div>
                                            </div>
                                        })
                                    }
                               
                                <div className="cart-sidebar-footer" style={{
                                                backgroundColor: 'white',
                                                //backgroundColor: 'white',
                                                filter: "drop-shadow(0px 0px 3px rgb(34, 34, 34, 0.8))",
                                            }}>
                                    <div className="cart-store-details">
                                        <p>Sub Total <strong className="float-right">
                                            {/* Rs.{cartItems.reduce((sum, i) => (
                                            sum += i.qty * i.netPrice
                                        ), 0)} */}
                                            Rs.{GrandTotal}
                                        </strong></p>
                                        <p>Delivery Charges <strong className="float-right text-danger">+ Rs.Free</strong></p>
                                        {/* <h6>Your total savings <strong className="float-right text-danger">Rs.55 (42.31%)</strong></h6> */}
                                    </div>
                                    <a href="/checkout"><button className="btn btn-secondary btn-lg btn-block text-left" type="button"><span className="float-left"><i className="mdi mdi-cart-outline" /> Proceed to Checkout </span><span className="float-right"><strong>
                                        {/* Rs.{cartItems.reduce((sum, i) => (
                                        sum += i.qty * i.netPrice
                                    ), 0)} */}
                                        Rs.{GrandTotal}
                                    </strong> <span className="mdi mdi-chevron-right" /></span></button></a>
                                </div>
                            </div>
                    }
                </div>
                <BottomBar />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        cartItems: state.cart.cartItems,
    }),
    { incrementToCart, decreaseToCart, removeFromCart }
)(MyCart);