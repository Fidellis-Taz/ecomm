import React, { Component } from "react";
import { GetProductDetails } from "../../../services";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { addToWishList } from "../../../../store/actions/wishlistAction";
import { NotificationManager } from "react-notifications";
// import Filterbycategory from './Filtersbycategory';
import FilterByBrand from "./filterbrand&category";
import Nodata from "../../../../NoData";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./index.css";
import ReactPaginate from "react-paginate";
import LazyLoad from "react-lazyload";
import { Paper } from "@material-ui/core";
import classes from "./Shop-details.module.css";
import BottomBar from "../../../BottomBar";
import ProductSkeleton from "../productskelton";

class Shopdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      limit: 53,
      page: 1,
      isloaded: false,
    };
  }
  handlePageClick = (e) => {
    let page = e.selected + 1;
    this.getAllProductList(page);
  };
  async getAllProductList(list) {
    this.setState({ isloaded: true });
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    let data = { slug: lastSegment, page: list };
    try {
      let p = await GetProductDetails.getAllProductList(data);
      if (p) {
        this.setState({ list: p, isloaded: false });
      } else {
        this.setState({ isloaded: false });
      }
    } catch (e) {
      this.setState({ isloaded: false });
      NotificationManager.error("Empty data in category", "Data");
    }
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.getAllProductList();
  }

  handleChangeByCategory(value) {
    this.setState({ isloaded: true });
    if (value) {
      this.setState({ list: value, isloaded: false });
    }
  }
  handlesortby = async (e) => {
    this.setState({ isloaded: true });
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    let data = {
      slug: lastSegment,
      sortbasedon: e.target.value,
    };
    if (data) {
      let p = await GetProductDetails.getAllfiltershortby(data);
      //console.log(p.data);
      if (p) {
        this.setState({ list: p, isloaded: false });
      } else {
        this.setState({ isloaded: false });
      }
    }
  };

  render() {
    let { list, isloaded } = this.state;
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    return (
      <div className="shop-single">
        <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white">
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
        </section>

        <div className="section-padding">
          <div className="all-product-grid mt-0">
            <section className="pt-3   section-padding border-bottom ">
              <div className="container">
                <div
                  className="filtersec"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <a href="#" className="filter-btn pull-bs-canvas-right">
                      Filters
                    </a>
                  </div>

                  <div className="t">
                    <select
                      onChange={this.handlesortby}
                      className="reactSelect form-control"
                      placeholder="Sortby"
                    >
                      <option className="item" value={0}>
                        Sort by{" "}
                      </option>
                      <option className="item" value={1}>
                        Price - Low to High
                      </option>
                      <option className="item" value={2}>
                        Price - High to Low
                      </option>
                      <option className="item" value={3}>
                        Alphabetical
                      </option>
                      <option className="item" value={4}>
                        New To Old
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <div className="bs-canvas bs-canvas-right position-fixed bg-cart h-100">
              <div className="bs-canvas-header side-cart-header p-3 ">
                <div className="d-inline-block  main-cart-title">Filters</div>
                <button
                  type="button"
                  className="bs-canvas-close close"
                  aria-label="Close"
                >
                  <i className="uil uil-multiply"></i>
                </button>
              </div>
              <div className="bs-canvas-body filter-body">
                <div className="filter-items">
                  <FilterByBrand
                    onSelectFilterCategory={this.handleChangeByCategory.bind(
                      this
                    )}
                  />
                </div>
                <div className="filter-items">
                  <a
                    href="#"
                    className="filter-btn pb-4 mb-2 bs-canvas-close close"
                  >
                    Apply
                  </a>
                </div>
              </div>
            </div>

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
                    {list.data ? (
                      list.data.map((row, index) =>
                        row.status ? (
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
                                    ? row.ProductVariants.slice(0, 1).map((p) =>
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
                                    row.productphotos.slice(0, 1).map((p) => (
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
                                            className={classes.add_btn_div_left}
                                            style={{
                                              borderBottomLeftRadius: "12px",
                                              height: "40px",
                                            }}
                                            onClick={() =>
                                              this.props.addToWishList(row)
                                            }
                                          >
                                            <i class="uil uil-heart icon_wishlist"></i>{" "}
                                            WishList
                                          </button>
                                          <button
                                            type="button"
                                            className={classes.add_btn_div}
                                            style={{
                                              borderBottomRightRadius: "12px",
                                            }}
                                            onClick={() =>
                                              this.props.addToCart(row)
                                            }
                                          >
                                            <i className="mdi mdi-cart-outline" />{" "}
                                            Add To Cart
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
                                            className={classes.add_btn_div_OUTS}
                                            style={{
                                              borderBottomLeftRadius: "12px",
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
                        ) : (
                          "No data Found"
                        )
                      )
                    ) : (
                      <Nodata />
                    )}
                  </div>
                )}

                <div className="container my-3 text-center">
                  <div className="row justify-content-center">
                    <ReactPaginate
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      activeClassName={"active"}
                      breakLabel={"..."}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      pageCount={list ? list.pages : ""}
                      onPageChange={this.handlePageClick}
                    />
                  </div>
                </div>
                {/* end product section */}
              </div>
            </section>
          </div>
        </div>

        <BottomBar />
      </div>
    );
  }
}
export default connect(null, { addToCart, addToWishList })(Shopdetails);
