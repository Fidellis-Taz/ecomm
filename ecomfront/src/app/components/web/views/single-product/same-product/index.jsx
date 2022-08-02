import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GetProductDetails from "../../../../services/GetProductDetails";
import { addToCart } from "../../../../../store/actions/cartActions";
import { Paper } from "@material-ui/core";
import LazyLoad from "react-lazyload";
import ProductSkeleton from "../../productskelton";
class Similarproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productlist: [],
      isloaded: false,
    };
  }
  getAllProductList() {
    window.scrollTo(0, 0);
    window.location.reload();
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ isloaded: true });
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    let list = await GetProductDetails.getAllRelatableProductList(lastSegment);
    if (list) {
      this.setState({ productlist: list.data, isloaded: false });
    } else {
      this.setState({ isloaded: false });
    }
  }
  render() {
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
    let { productlist } = this.state;
    return (
      <div>
        {/* New Item slider */}
        <section className="product-items-slider section-padding">
          <div className="container" id="header-category-bk">
            <div className="section-header">
              {/* <span>For You</span> */}
              <h5 className="heading-design-h5">
                Related Product{" "}
                {/* <span className="badge badge-primary">20% OFF</span> */}
                {/* <a className="float-right text-secondary" href="">View All</a> */}
              </h5>
            </div>
            <Paper>
              <Slider {...settings}>
                {productlist
                  ? productlist.map((row, index) => (
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
                            </div>
                            <div className="product-body">
                              <h5>
                                <b>{row.name}</b>
                              </h5>
                              <h6>
                                <strong>
                                  <span className="mdi mdi-approval" />{" "}
                                  Available in
                                </strong>{" "}
                                -
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
                  : ""}
              </Slider>
              {!productlist ? <ProductSkeleton /> : ""}
            </Paper>
          </div>
        </section>
        {/* End New item slider */}
      </div>
    );
  }
}

export default connect(null, { addToCart })(Similarproduct);
