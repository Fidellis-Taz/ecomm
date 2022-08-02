import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GroceryStampleDetails from "../../../../services/GroceryStampleDetails";
import { addToCart } from "../../../../../store/actions/cartActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper, Container } from "@material-ui/core";
import LazyLoad from "react-lazyload";
class Grocerystample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productlist: [],
      isloaded: false,
    };
  }
  async componentDidMount() {
    let list = await GroceryStampleDetails.getAllGroceryStaple();
    if (list) {
      this.setState({ productlist: list.data, isloaded: true });
    }
  }
  render() {
    let list =
      this.state.productlist && this.state.productlist.products
        ? this.state.productlist.products
        : null;
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };
    return (
      <Container maxWidth="lg">
        {/* New Item slider */}
        <section className="product-items-slider section-padding">
          <div id="header-category-bk">
            <div className="section-header">
              <h5 className="heading-design-h5">
                Grocery & Staples{" "}
                {/* <span className="badge badge-primary">20% OFF</span> */}
                <Link
                  to={{
                    pathname: `/shop/${this.state.productlist?.slug}`,
                    state: list,
                  }}
                >
                  <span className="float-right text-secondary">View All</span>
                </Link>
              </h5>
            </div>
            <Paper>
              <Slider {...settings}>
                {!this.state.isloaded ? (
                  <div className="progress-bar-bk">
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  list?.map((row, index) => (
                    <div key={index} className="product">
                      <Paper className="p-2">
                        <Link
                          to={{
                            pathname: `/p/${row.slug}/${row.id}`,
                            state: row,
                          }}
                        >
                          <div className="product-header">
                            {row.ProductVariants
                              ? row.ProductVariants.slice(0, 1).map((p) =>
                                  p.discount ? (
                                    <span className="badge badge-success">
                                      {Math.round(
                                        ((p.distributorPrice - p.netPrice) *
                                          100) /
                                          p.distributorPrice
                                      )}
                                      % OFF
                                    </span>
                                  ) : (
                                    ""
                                  )
                                )
                              : ""}

                            {row.productphotos ? (
                              row.productphotos.slice(0, 1).map((p) => (
                                <LazyLoad>
                                  <img
                                    className="img-fluid"
                                    src={p.imgUrl}
                                    alt="product"
                                  />
                                </LazyLoad>
                              ))
                            ) : (
                              <LazyLoad>
                                <img
                                  className="img-fluid"
                                  src="/img/opacity-loss.jpg"
                                  alt={404}
                                />
                              </LazyLoad>
                            )}
                            {/* <span className="veg text-success mdi mdi-circle" /> */}
                          </div>
                          <div className="product-body">
                            <h5>
                              <b>{row.name}</b>
                            </h5>
                            <h6>
                              <strong>
                                <span className="mdi mdi-approval" /> Available
                                in:{" "}
                              </strong>
                              {row.ProductVariants
                                ? row.ProductVariants.slice(0, 1).map((p) =>
                                    p.Available ? (
                                      <span class="text-success">Stock</span>
                                    ) : (
                                      <span class="text-danger">
                                        Out of stock
                                      </span>
                                    )
                                  )
                                : ""}
                            </h6>
                          </div>
                        </Link>
                        {row.ProductVariants
                          ? row.ProductVariants.slice(0, 1).map((p) =>
                              p.Available ? (
                                <div className="product-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-sm float-right"
                                    onClick={() => this.props.addToCart(row)}
                                  >
                                    <i className="mdi mdi-cart-outline" /> Add
                                    To Cart
                                  </button>
                                  <p className="offer-price mb-0">
                                    Rs.{p.netPrice}
                                    <i className="mdi mdi-tag-outline" />
                                    <br />
                                    {p.discount ? (
                                      <span className="regular-price">
                                        Rs.{p.distributorPrice}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </p>
                                </div>
                              ) : (
                                <div className="product-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-sm float-right"
                                    disabled
                                  >
                                    <i className="mdi mdi-cart-outline" /> Out
                                    Of Stock
                                  </button>
                                  <p className="offer-price mb-0">
                                    Rs.{p.netPrice}
                                    <i className="mdi mdi-tag-outline" />
                                    <br />
                                    {p.discount ? (
                                      <span className="regular-price">
                                        Rs.{p.distributorPrice}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </p>
                                </div>
                              )
                            )
                          : ""}
                      </Paper>
                    </div>
                  ))
                )}
              </Slider>
            </Paper>
          </div>
        </section>

        {/* End New item slider */}
        <Paper className="salon-banner-sd p-2 my-2">
          <a href="/shop/gas-stoves">
            <img
              className="salon-banner"
              src="/img/banner-category/gas-stoves.jpg"
              alt="chitwashop"
            />
          </a>
        </Paper>
      </Container>
    );
  }
}
export default connect(null, { addToCart })(Grocerystample);
