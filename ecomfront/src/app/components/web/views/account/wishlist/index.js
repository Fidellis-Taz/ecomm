import React, { Component } from "react";
import { connect } from "react-redux";
import { GetUserLogin } from "../../../../services";
import "../css/index.css";
import {
  removeFromWishList,
  incrementToWishList,
  decreaseToWishList,
} from "../../../../../store/actions/wishlistAction";
import {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
  addToCart,
} from "../../../../../store/actions/cartActions";
import classes from "./WishList.module.css";
import ProductSkeleton from "../../productskelton";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import ReactPaginate from "react-paginate";
import BottomBar from "../../../../BottomBar";
import Nodata from "../../../../../NoData";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grandTotal: "",
      toggle: false,
      list: [],
      limit: 53,
      page: 1,
      isloaded: false,
    };
  }

  handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };
  render() {
    const { wishListItems } = this.props;
    let { list, isloaded } = this.state;
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    return (
      <div className="shop-single">
        <section className="pt-3 pb-3 page-info section-padding border-bottom ">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <a href="/">
                  <strong>
                    <span className="mdi mdi-home"></span> Home
                  </strong>
                </a>{" "}
                <span className="mdi mdi-chevron-right"></span>{" "}
                <a href="/">{lastSegment}</a>
              </div>
            </div>
          </div>
          <div className={classes.main_title_tab}>
            <h4>
              <i className="uil uil-heart"></i>Shopping Wishlist
            </h4>
          </div>
        </section>

        <div className="section-padding">
          <div className="all-product-grid mt-0">
            <section className="shop-list section-padding">
              <div
                className="container"
                style={{
                  paddingRight: "0px",
                  paddingLeft: "0px",
                }}
              >
                {isloaded ? (
                  <ProductSkeleton />
                ) : (
                  <div className={classes.product_grid}>
                    {wishListItems.length
                      ? wishListItems.map(
                          (row, index) => (
                            console.log(row, "row"),
                            (
                              <div
                                key={index}
                                style={{
                                  backgroundColor: "white",
                                  //backgroundColor: 'white',
                                  filter:
                                    "drop-shadow(10px 10px 10px rgb(34, 34, 34, 0.8))",
                                }}
                                className={classes.main}
                              >
                                <div className={`${classes.productcard} p-2`}>
                                  <Link
                                    to={{
                                      pathname: `/p/${row.slug}/${row.id}`,
                                      state: row,
                                    }}
                                  >
                                    <div className="product-header">
                                      {row.ProductVariants
                                        ? row.ProductVariants.slice(0, 1).map(
                                            (p) =>
                                              p.discount ? (
                                                <span className="badge badge-success">
                                                  {Math.round(
                                                    ((p.distributorPrice -
                                                      p.netPrice) *
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
                                        row.productphotos
                                          .slice(0, 1)
                                          .map((p) => (
                                            <LazyLoad>
                                              <img
                                                className={classes.img_div}
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
                                      <div
                                        style={{
                                          zIndex: 9,
                                          top: "7px",
                                          left: "7px",
                                          position: "absolute",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        <i
                                          className="fa fa-heart"
                                          style={{
                                            fontSize: " 18px",
                                            color: "#ff3e6c",
                                          }}
                                        ></i>
                                      </div>
                                    </div>
                                    <div className="">
                                      <h5>
                                        <b>{row.name}</b>
                                      </h5>
                                      <h6>
                                        <strong>
                                          <span className="mdi mdi-approval" />{" "}
                                          Available in :
                                        </strong>
                                        {row.ProductVariants
                                          ? row.ProductVariants.slice(0, 1).map(
                                              (p) =>
                                                p.Available ? (
                                                  <span className="text-success">
                                                    in stock
                                                  </span>
                                                ) : (
                                                  <span className="text-danger">
                                                    out of stock
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
                                            {/* <button type="button" className="btn btn-secondary btn-sm float-right" onClick={() => this.props.addToCart(row)}>
                                                                                 <i className="mdi mdi-cart-outline" /> Add To Cart
                                                                             </button> */}
                                            <span className="offer-price mb-0">
                                              Rs.{p.netPrice}
                                              <i className="mdi mdi-tag-outline" />
                                              {p.discount ? (
                                                <span className="regular-price">
                                                  Rs.{p.distributorPrice}
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </span>
                                            <div className="productcardfooter">
                                              <button
                                                type="button"
                                                className={
                                                  classes.add_btn_div_left
                                                }
                                                style={{
                                                  borderBottomLeftRadius:
                                                    "12px",
                                                  height: "40px",
                                                }}
                                                onClick={() =>
                                                  this.props.removeFromWishList(
                                                    row.selectedVariant
                                                  )
                                                }
                                              >
                                                <i class="uil uil-heart icon_wishlist"></i>
                                                Remove
                                              </button>
                                              <button
                                                type="button"
                                                className={classes.add_btn_div}
                                                style={{
                                                  borderBottomRightRadius:
                                                    "12px",
                                                }}
                                                onClick={() =>
                                                  this.props.addToCart(row)
                                                }
                                              >
                                                <i className="mdi mdi-cart-outline" />{" "}
                                                Move To Cart
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="product-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary btn-sm float-right"
                                              disabled
                                            >
                                              <i className="mdi mdi-cart-outline" />{" "}
                                              Out Of Stock
                                            </button>
                                            <span className="offer-price mb-0">
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
                                            </span>
                                            <div className="productcardfooter">
                                              <button
                                                type="button"
                                                className={
                                                  classes.add_btn_div_OUTS
                                                }
                                                style={{
                                                  borderBottomLeftRadius:
                                                    "12px",
                                                  height: "40px",
                                                  width: "100%",
                                                }}
                                              >
                                                Out Of Stock
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )
                                    : ""}
                                </div>
                              </div>
                            )
                          )
                        )
                      : ""}
                  </div>
                )}

                {wishListItems.length ? "" : <Nodata />}
              </div>
            </section>
          </div>
        </div>

        <BottomBar />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    wishListItems: state.wishlist.wishListItems,
  }),
  {
    removeFromWishList,
    incrementToWishList,
    decreaseToWishList,
    addToCart,
    removeFromCart,
    incrementToCart,
    decreaseToCart,
  }
)(Wishlist);
