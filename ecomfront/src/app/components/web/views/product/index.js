import React, { Component } from 'react';
import { GetProductDetails } from '../../../services';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../../../store/actions/cartActions';
import { NotificationManager } from 'react-notifications';
import './index.css';
import Nodata from '../../../../../app/NoData';
// import Filterbycategory from './Filtersbycategory';
import { Paper } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import LazyLoad from 'react-lazyload';
import { Helmet } from "react-helmet";

class Shopdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], category: {}, limit: 50, brand: {}, isloaded: true
        }
    }
    async getFilterByProduct() {
        this.setState({ isloaded: false })
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        try {
            let p = await GetProductDetails.getProductByFilter(lastSegment);
            if (p) {
                this.setState({ list: p.data, category: p.category, brand: p.brand, isloaded: false })
            } else {
                this.setState({ isloaded: false })
            }
        } catch (e) {
            this.setState({ isloaded: false })
            NotificationManager.error("Empty data in category", "Data");
        }

    }

    async componentDidMount() {
        window.scrollTo(0, 0);
        this.getFilterByProduct();
    }
    componentWillReceiveProps() {
        this.getFilterByProduct();
    }
    onLoadMore = event => {
        this.setState({ limit: this.state.limit + 20 })
    }
    handleChangeByCategory(value) {
        this.setState({ isloaded: false })
        if (value) {
            this.setState({ isloaded: true, list: value.data })
        }
    }
    render() {
        let { list, category, brand, isloaded, limit } = this.state;
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();

        var querystring = lastSegment;
        let categorName = decodeURIComponent(querystring)

        return (
            <div className="shop-single">
                <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <a href="/"><strong><span className="mdi mdi-home"></span> Home</strong></a> <span className="mdi mdi-chevron-right"></span> <a href="/">{categorName}</a>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    isloaded ?
                        <div className="progress-bar-bk"><CircularProgress color="secondary" /></div>
                        :
                        <div >
     
                            <section className="shop-list section-padding">
                                {list.length === 0 ? <Nodata /> :
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row no-gutters">
                                                    {
                                                        list.slice(0, limit).map((row, index) => (
                                                            row.status === 'active' ?
                                                                <div key={index} className="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                                                                    <div className="item">
                                                                        <div className="product1">
                                                                            <Paper className="p-2">
                                                                                <Link to={{
                                                                                    pathname: `/p/${row.slug}/${row.id}`,
                                                                                    state: row
                                                                                }}>
                                                                                    <div className="product-header">
                                                                                        {row.ProductVariants ?
                                                                                            row.ProductVariants.slice(0, 1).map(p => (
                                                                                                p.discount || p.marginPrice ?
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
                                                                                        {/* <img className="img-fluid" src={row.photo} alt="product" /> */}

                                                                                    </div>
                                                                                    <div className="product-body">
                                                                                        <h5><strong>{row.name}</strong></h5>
                                                                                        <h6><strong><span className="mdi mdi-approval" /> Available in</strong> -
                                                                                            {
                                                                                                row.ProductVariants ?
                                                                                                    row.ProductVariants.slice(0, 1).map(p => (
                                                                                                        p.unitSize
                                                                                                    ))
                                                                                                    : ''
                                                                                            }
                                                                                        </h6>
                                                                                    </div>
                                                                                </Link>
                                                                                {
                                                                                    row.ProductVariants ?
                                                                                        row.ProductVariants.slice(0, 1).map(p => (
                                                                                            p.Available ?
                                                                                                <div className="product-footer">
                                                                                                    <button type="button" className="btn btn-secondary btn-sm float-right" onClick={() => this.props.addToCart(row)}>
                                                                                                        <i className="mdi mdi-cart-outline" /> Add To Cart
                                                                                                    </button>
                                                                                                    <span className="offer-price mb-0">Rs.{p.netPrice}
                                                                                                        <i className="mdi mdi-tag-outline" /><br />
                                                                                                        {p.discount ? <span className="regular-price">Rs.{p.distributorPrice}</span> : ''}
                                                                                                    </span>
                                                                                                </div> :
                                                                                                <div className="product-footer">
                                                                                                    <button type="button" className="btn btn-secondary btn-sm float-right" disabled>
                                                                                                        <i className="mdi mdi-cart-outline" /> Out Of Stock
                                                                                                    </button>
                                                                                                    <span className="offer-price mb-0">Rs.{p.netPrice}
                                                                                                        <i className="mdi mdi-tag-outline" /><br />
                                                                                                        {p.discount ? <span className="regular-price">Rs.{p.distributorPrice}</span> : ''}
                                                                                                    </span>
                                                                                                </div>

                                                                                        ))
                                                                                        : ''
                                                                                }
                                                                            </Paper>
                                                                        </div>
                                                                    </div>
                                                                </div> : ''
                                                        ))}
                                                </div>

                                                <div className="more-product-btn">
                                                    <button className="show-more-btn hover-btn" onClick={this.onLoadMore}>Show More</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                }
                            </section>


                            {/* end product section */}
                        </div>
                }

                <Helmet>

                    <meta charSet="utf-8" />
                    {
                        brand ?
                            <title>{brand ? brand.title : null}</title>

                            :
                            <title>{category ? category.title : null}</title>
                    }
                    {
                        brand ?
                            <meta name="title" content={brand ? brand.title : null}></meta>
                            :
                            <meta name="title" content={category ? category.title : null}></meta>

                    }
                    {
                        brand ?
                            <meta name="title" content={brand ? brand.title : null}></meta>
                            :
                            <meta name="title" content={category ? category.title : null}></meta>

                    }
                    {
                        brand ?
                            <meta name="description" content={brand ? brand.desc : null}></meta>
                            :
                            <meta name="description" content={category ? category.desc : null}></meta>
                    }
                    {
                        brand ?
                            <meta name="keyword" content={brand ? brand.keyword : null}></meta>

                            :
                            <meta name="keyword" content={category ? category.keyword : null}></meta>

                    }
                    <link rel="canonical" href={window.location.href} />
                </Helmet>
            </div>

        )
    }
}
export default connect(null, { addToCart })(Shopdetails);