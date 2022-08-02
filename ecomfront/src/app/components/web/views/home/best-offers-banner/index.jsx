import React, { Component } from 'react';
import { Paper, Container } from '@material-ui/core/';
import './index.css';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
export default class Bestofferbanner extends Component {

    render() {
        return (
            <div>
                <Container maxWidth="lg">

                    <div className="section-header">
                        <h5 className="heading-design-h5">Best Values</h5>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <Paper>
                                <Link to={{
                                    pathname: `/shop/electronics`,

                                }}>
                                    <div className="best-offer-item">
                                        <img src="/img/category/electronoics.jpg" alt="offer-banner" />
                                    </div>
                                </Link>
                            </Paper>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <Paper>
                                <Link to={{
                                    pathname: `/shop/grocery-staples`,

                                }}>
                                    <div className="best-offer-item">
                                        <LazyLoad>
                                            <img src="/img/category/Groceery-and-stamples.jpg" alt="Groceery-and-stamples" />
                                        </LazyLoad>
                                    </div>
                                </Link>

                            </Paper>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <Paper>
                                <Link to={{
                                    pathname: `/shop/personal-care`,

                                }}>
                                    <div className="best-offer-item offr-none">
                                        <LazyLoad>
                                            <img src="/img/category/Personal-care.jpg" alt="Personal care" />
                                        </LazyLoad>
                                    </div>

                                </Link>
                            </Paper>
                        </div>

                    </div>

                    <div className="cat-home-wrap">
                        <div className="section-header">
                            <h5 className="heading-design-h5">Latest Product</h5>
                        </div>

                        <div className="row ">
                            <div className="col-lg-6 col-md-6 cat-left">
                                <Paper className="left-vk">
                                    <Link to={{
                                        pathname: `/cp/category/cake`,

                                    }}>
                                        <div className="img-src p-2">
                                            <LazyLoad>
                                                <img className="_sdimg" src="/img/new-file/cake.jpg" alt="all-type-of-cake" />
                                            </LazyLoad>
                                            {/* <h5 className="cat-title">All type of Cake</h5> */}
                                        </div>

                                    </Link>
                                </Paper>


                            </div>


                            <div className="col-lg-6 col-md-6 cat-right">
                                <div className="row">

                                    <span className="col-lg-6 cat-card-wrap">
                                        <Paper>
                                            <Link to={{
                                                pathname: `/cp/category/nutritions-suppliments`,

                                            }}>
                                                <div className="cat-card">
                                                    <LazyLoad>
                                                        <img src="/img/new-file/netrition.jpg" alt="Fragrances and Deos" />
                                                    </LazyLoad>
                                                    <h5 className="cat-title">Nutrition</h5>
                                                </div>
                                            </Link>
                                        </Paper>
                                    </span>

                                    <span className="col-lg-6 cat-card-wrap">
                                        <Paper>
                                            <Link to={{
                                                pathname: `/cp/category/refrigerators`,

                                            }}>
                                                <div className="cat-card">
                                                    <LazyLoad>
                                                        <img src="/img/new-file/Freezer.jpg" alt="freeze" />
                                                    </LazyLoad>
                                                    <h5 className="cat-title">Refrigerators</h5>
                                                </div>
                                            </Link>
                                        </Paper>
                                    </span>

                                    <span className="col-lg-6 cat-card-wrap">
                                        <Paper>
                                            <Link to={{
                                                pathname: `/cp/category/gas-stoves`,

                                            }}>
                                                <div className="cat-card">
                                                    <LazyLoad>
                                                        <img src="/img/new-file/baltra.jpg" alt="baltra-product" />
                                                    </LazyLoad>
                                                    <h5 className="cat-title">Gas Stoves  </h5>
                                                </div>
                                            </Link>
                                        </Paper>
                                    </span>


                                    <span className="col-lg-6 cat-card-wrap">
                                        <Paper>
                                            <Link to={{
                                                pathname: `/cp/category/android`,

                                            }}>
                                                <div className="cat-card">
                                                    <LazyLoad>
                                                        <img src="/img/new-file/smartphone-banner.jpg" alt="smartphone-banner" />
                                                    </LazyLoad>
                                                    <h5 className="cat-title">All smartphone</h5>
                                                </div>
                                            </Link>
                                        </Paper>
                                    </span>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <Paper>
                                <Link to={{
                                    pathname: `/shop/biscuits-snacks-chocolates`,

                                }}>
                                    <div className="best-offer-item">
                                        <img src="/img/category/Baby-Foods.jpg" alt="offer-banner" />
                                    </div>
                                </Link>
                            </Paper>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Paper>
                                <Link to={{
                                    pathname: `/shop/home-kitchen`,

                                }}>
                                    <div className="best-offer-item">
                                        <LazyLoad>
                                            <img src="/img/category/Cook-wear-img.jpg" alt="Cook-wear-img" />
                                        </LazyLoad>
                                    </div>
                                </Link>

                            </Paper>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Paper>
                                <Link to={{
                                    pathname: `/shop/mithila-art`,

                                }}>
                                    <div className="best-offer-item offr-none">
                                        <LazyLoad>
                                            <img src="/img/category/Mithila-Art.jpg" alt="Mithila art" />
                                        </LazyLoad>
                                    </div>

                                </Link>
                            </Paper>
                        </div>

                        <div className="col-lg-3 col-md-4">
                            <Paper>
                                <Link to={{
                                    pathname: `/shop/personal-care`,

                                }}>
                                    <div className="best-offer-item offr-none">
                                        <LazyLoad>
                                            <img src="/img/category/Pooja Needs items.jpg" alt="Personal care" />
                                        </LazyLoad>
                                    </div>

                                </Link>
                            </Paper>
                        </div>
                    </div>
                </Container>
                {/* end */}
            </div>
        )
    }
}
