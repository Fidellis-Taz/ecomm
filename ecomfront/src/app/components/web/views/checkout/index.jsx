import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { GetUserLogin, GetOrderDetails, CartHelper } from '../../../services';
import { removeFromCart, incrementToCart, decreaseToCart } from "../../../../store/actions/cartActions";
import Deliverydetails from './delivery';
import Loader from '../../../../../loader';
import { getCookie } from '../../../../../function';
import _ from 'lodash';
import LazyLoad from 'react-lazyload';
import BottomBar from '../../../BottomBar';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subTotal: '', discount: '', deliveryCharge: 0, grandTotal: '', email: '', customer: '', paymentmethod: '', deliveryAddress: null,deliveryId: null, isLoaded: false, 
        }
    }
    handleRadioChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleDeliveryAddress = (value) => {
        console.log({value});
        if(value.deliverId){
            this.setState({deliveryId: value.deliverId})
        }else{
            this.setState({ deliveryAddress: value })
        }
    }
    async componentDidMount() {
        let email = getCookie('email')
        if (email) {
            let user = await GetUserLogin.getCustomerDetail(email);
            if (user) {
                this.setState({ customer: user.data, email: email })
            }
        }
         
        let cart = this.props.cartItems;
        let subTotal = cart.reduce((sum, i) => (sum += i.selectedVariant.qty * i.selectedVariant.netPrice), 0)
        let discount = cart.reduce((sum, i) => (sum += i.selectedVariant.qty*i.selectedVariant.discount), 0)
        let grandTotal = subTotal + this.state.deliveryCharge;

        this.setState({ subTotal: subTotal, discount: discount, grandTotal: grandTotal, deliveryCharge: this.state.deliveryCharge })

    }
    getCartProduct() {
        let { cartItems } = this.props;
        //dont use Promise.all
        const product = cartItems.map((item)=>{
            const newItem = _.pick(item,["id","selectedVariant"]);
            newItem.selectedVariant = _.pick(newItem.selectedVariant,["id","qty"])
            return newItem;
        });

       return product
    }
    handlePlaceOrder = async (event) => {
        event.preventDefault();
        this.setState({ isLoaded: true })

        const { customer, grandTotal, deliveryAddress, paymentmethod, deliveryId } = this.state;
        let product = this.getCartProduct();
        let data = { customerId: customer.id, paymentmethod: paymentmethod, deliveryAddress: deliveryAddress, deliveryId: deliveryId, product: product, grandTotal }   
        
        if (data) {
            let order = await GetOrderDetails.getOrderCreateByUser(JSON.stringify(data));
            if (order) {
                NotificationManager.success("Successfully Ordered", "Order");
                this.setState({ isLoaded: false })
                setTimeout(
                    async function () {
                        CartHelper.emptyCart();
                    },
                    500
                );
            } else {
                NotificationManager.error("Order is declined", "Order");
                this.setState({ isLoaded: false })
                setTimeout(
                    async function () {
                        // window.location.href="/failed"
                    },
                    1000
                );
            }
        }
    }
    render() {
        const { cartItems } = this.props;
        const { isLoaded, subTotal, discount, deliveryCharge, grandTotal, email, customer, paymentmethod } = this.state;
        return (
            <div>
                <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <strong><span class="mdi mdi-home"></span> Home</strong><span class="mdi mdi-chevron-right"></span> Checkout
                            </div>
                        </div>
                    </div>
                </section>

                <section className="checkout-page section-padding">
                    {
                        isLoaded ? <Loader />:''
                    }
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="checkout-step">
                                    <div className="accordion" id="accordionExample">
                                        <div className="card checkout-step-one">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link checkout-login-bk" disabled>
                                                        <span className="number">1</span> Login <span className="mdi mdi-checkbox-marked-circle-outline"></span>
                                                    </button>
                                                    <div className="_2jDL7w"><div><span className="dNZmcB">{customer.firstName} </span><span className="_3MeY5j">{email}</span></div></div>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="card checkout-step-two">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        <span className="number">2</span> Delivery Address
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                <Deliverydetails onSelectDeliveryAddress={this.handleDeliveryAddress} />
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingThree">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        <span className="number">3</span> Payment
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                                <div className="checkout-step-body">
                                                    <div className="payment_method-checkout">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="rpt100">
                                                                    <ul className="radio--group-inline-container_1">
                                                                        <li>
                                                                            <div className="radio-item_1">
                                                                                <input id="cashondelivery1" value="cash" name="paymentmethod" type="radio" onChange={this.handleRadioChange} />
                                                                                <label htmlFor="cashondelivery1" className="radio-label_1">Cash on Delivery</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="radio-item_1">
                                                                                <input id="card1" value="card" name="paymentmethod" type="radio" onChange={this.handleRadioChange} />
                                                                                <label htmlFor="card1" className="radio-label_1">Credit / Debit Card</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className={paymentmethod === 'cash' ?"form-group return-departure-dts" : "d-none"} >
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="pymnt_title">
                                                                                <h4>Cash on Delivery</h4>
                                                                                {/* <p>Cash on Delivery will not be available if your order value exceeds Rs.150.</p> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className={paymentmethod === 'cash' ?"form-group return-departure-dts" : "d-none"}>
                                                                    <div className="row">
                                                                        {/* <div className="col-lg-12">
                                                                            <div className="pymnt_title mb-4">
                                                                                <h4>Credit / Debit Card</h4>
                                                                            </div>
                                                                        </div> */}
                                                                       
                                                                    </div>
                                                                </div>
                                                                {
                                                                    paymentmethod ?
                                                                        <button className="next-btn16 hover-btn" onClick={this.handlePlaceOrder}>Confirm Order</button>
                                                                        : ''
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
                            <div className="col-md-4">
                                <div className="card">
                                    <h5 className="card-header">My Cart <span className="text-secondary float-right">({cartItems.length} item)</span></h5>
                                    {
                                        cartItems.map((row, index) => (
                                            <div className="card-body pt-0 pr-0 pl-0 pb-0" key={index}>
                                                <div className="cart-list-product">
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
                                                    {row.selectedVariant.discountPer ? <span className="badge badge-success">{row.selectedVariant.discountPer}% OFF</span>:''}
                                                    <h5>{row.name}</h5>
                                                    <span><del>MRP: {row.selectedVariant.distributorPrice}</del> <small className="text-success">saved: {row.selectedVariant.qty*(row.selectedVariant.distributorPrice - row.selectedVariant.netPrice)}</small></span>
                                                    <h6><strong><span className="mdi mdi-approval" /> Available in</strong> - {row.unitSize}</h6>
                                                    <p className="offer-price mb-0">Rs.{row.selectedVariant.qty + '*' + row.selectedVariant.netPrice} <i className="mdi mdi-tag-outline" /><p>Total: Rs.{row.selectedVariant.qty*row.selectedVariant.netPrice}</p> </p>
                                                    
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="total-checkout-group">
                                        <div className="cart-total-dil">
                                            <h4>Sub Total</h4>
                                            <span>Rs.{subTotal}</span>
                                        </div>
                                        <div className="cart-total-dil pt-3">
                                            <h4>Delivery Charges</h4>
                                            <span>Rs.{deliveryCharge}</span>
                                        </div>
                                    </div>
                                    <div className="cart-total-dil saving-total ">
                                        <h4>Saved</h4>
                                        <span>Rs.{discount}</span>
                                    </div>
                                    <div className="main-total-cart">
                                        <h2>Total</h2>
                                        <span>Rs.{grandTotal}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
<BottomBar/>

            </div>
        )
    }
}

export default connect(
    (state) => ({
        cartItems: state.cart.cartItems,
    }),
    { incrementToCart, decreaseToCart, removeFromCart }
)(Checkout);