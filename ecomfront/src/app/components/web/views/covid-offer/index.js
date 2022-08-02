import React, { Component } from 'react';
import { GetProductDetails } from '../../../services';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buyNow } from '../../../../store/actions/cartActions';
import { NotificationManager } from 'react-notifications';
import Nodata from '../../../../NoData';
import LazyLoad from 'react-lazyload';
import { Paper, CircularProgress } from '@material-ui/core';

class Covidoffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], isloaded: false
        }
    }
    async getAllProductList() {
        this.setState({ isloaded: true })
        try {
            let p = await GetProductDetails.getAllCovidOffer();
            if (p) {
                this.setState({ list: p.data, isloaded: false })
            }
            else {
                this.setState({ isloaded: false })
            }
        } catch (e) {
            this.setState({ isloaded: false })
            NotificationManager.error("Empty data in category", "Data");
        }
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        this.getAllProductList();
    }

    render() {
        let { list, isloaded } = this.state;
        return (
            <div className="shop-single">
                {
                    isloaded ?
                        <div className="progress-bar-bk"><CircularProgress color="secondary" /></div>
                        :
                        <div>
                            {/* product section */}
                            <section className="shop-list section-padding">
                                <div className="container">
                                    <div className="row">

                                        <div className="col-sm-12 col-md-12">
                                            <div className="row no-gutters">
                                                {
                                                    list ?
                                                        list.map((row, index) => (
                                                            row.id === 3658 ?
                                                                <div key={index} className="col-xs-6 col-sm-6 col-md-3">
                                                                    <Paper>
                                                                        <div className="item">
                                                                            <div className="product">
                                                                                <div className="product-header">
                                                                                    {row.ProductVariants ?
                                                                                        row.ProductVariants.slice(0, 1).map(p => (
                                                                                            p.discount ?
                                                                                                <span className="badge badge-success">
                                                                                                    {Math.round(((p.distributorPrice - p.netPrice) * 100) / p.distributorPrice)}% OFF
                                                                                                </span> : ''
                                                                                        )) : ''
                                                                                    }

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
                                                                                    {/* <span className="veg text-success mdi mdi-circle" /> */}
                                                                                </div>
                                                                                <div className="product-body">
                                                                                    <h5><b>{row.name}</b></h5>
                                                                                    <h6><strong><span className="mdi mdi-approval" /> Available in :</strong>
                                                                                        {
                                                                                            row.ProductVariants ?
                                                                                                row.ProductVariants.slice(0, 1).map(p => (
                                                                                                    p.Available ? <span class="text-success">in stock</span> : <span class="text-danger">out of stock</span>
                                                                                                ))
                                                                                                : ''
                                                                                        }
                                                                                    </h6>
                                                                                </div>
                                                                                {
                                                                                    row.ProductVariants ?
                                                                                        row.ProductVariants.slice(0, 1).map(p => (
                                                                                            p.Available ?
                                                                                                <div className="product-footer">
                                                                                                    <button type="button" className="btn btn-secondary btn-sm float-right" onClick={() => this.props.buyNow(row)}>
                                                                                                        <i className="mdi mdi-cart-outline" />Claim Now
                                                                                                     </button>
                                                                                                    <p className="offer-price mb-0">Rs.Free
                                                                                                        <i className="mdi mdi-tag-outline" /><br />
                                                                                                    </p>
                                                                                                </div> :
                                                                                                <div className="product-footer">
                                                                                                    <button type="button" className="btn btn-secondary btn-sm float-right" disabled>
                                                                                                        <i className="mdi mdi-cart-outline" /> Out Of Stock
                                                                                                    </button>
                                                                                                    <p className="offer-price mb-0">Rs.Free
                                                                                                        <i className="mdi mdi-tag-outline" /><br />
                                                                                                        {p.discount ? <span className="regular-price">Rs.{p.distributorPrice}</span> : ''}
                                                                                                    </p>
                                                                                                </div>

                                                                                        ))
                                                                                        : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </Paper>
                                                                </div> : ''
                                                        )) : <Nodata />}
                                            </div>
                                        </div>

                                        {/* end product section */}
                                    </div>

                                </div>

                            </section>


                        </div>
                }
            </div>
        );
    }
}
export default connect(null, { buyNow })(Covidoffer);