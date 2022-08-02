import React, { Component } from "react";
import { GetProductDetails } from "../../../services";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { NotificationManager } from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper } from "@material-ui/core";
import LazyLoad from "react-lazyload";
import { Helmet } from "react-helmet";

class Categoryproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      categorybyproduct: [],
      isloaded: false,
      toggle: false,
      limit: 3,
      catList: "",
    };
  }
  async getFilterByProduct() {
    this.setState({ isloaded: false });
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    try {
      let p = await GetProductDetails.getProductByCateogry(lastSegment);
      if (p) {
        this.setState({ list: p.data, catList: p.category, isloaded: true });
      }
    } catch (e) {
      NotificationManager.error("Empty data in category", "Data");
    }

    //category filter
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.getFilterByProduct();
  }
  componentWillReceiveProps() {
    this.getFilterByProduct();
  }
  async handleFilterCategory(row) {
    // let url = window.location.href.split('/');
    // var lastSegment = url.pop() || url.pop();

    let data = { id: row.id };
    let category = await GetProductDetails.getFilterbyChildCategory(data);
    if (category) {
      this.setState({
        categorybyproduct: category.data,
        isloaded: true,
        toggle: true,
      });
    } else {
      NotificationManager.error("empty data in category", "Undefined");
    }
  }
  // onLoadMore =event=> {
  //     this.setState({ limit: this.state.limit+3})
  // }
  render() {
    let { list, categorybyproduct, catList, toggle, isloaded } = this.state;

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

        {/* All product */}
        <section className="shop-list my-1">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="shop-filters">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            {catList ? catList.sub_name : ""}{" "}
                            <span className="mdi mdi-chevron-down float-right" />
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="card-body card-shop-filters">
                          {catList
                            ? catList.SubChildCategories.map((row, index) => {
                                return (
                                  <div className="card-body" key={index}>
                                    <div
                                      className="list-group bs-canvas-close"
                                      aria-label="Close"
                                      onClick={this.handleFilterCategory.bind(
                                        this,
                                        row
                                      )}
                                    >
                                      <span className="list-group-item list-group-item-action">
                                        {row.name}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-9">
                {!isloaded ? (
                  <div className="progress-bar-bk">
                    <CircularProgress color="secondary" />
                  </div>
                ) : toggle ? (
                  <div className="row no-gutters">
                    {categorybyproduct ? (
                      categorybyproduct.map((row, index) => (
                        <div key={index} className="col-xs-6 col-sm-6 col-md-4">
                          <Paper className="item">
                            <div className="product">
                              <Link
                                to={{
                                  pathname: `/p/${row.slug}/${row.id}`,
                                  state: row,
                                }}
                              >
                                <div className="product-header">
                                  {row.ProductVariants
                                    ? row.ProductVariants.slice(0, 1).map(
                                        (p) => (
                                          <span className="badge badge-success">
                                            {Math.round(
                                              ((p.distributorPrice -
                                                p.netPrice) *
                                                100) /
                                                p.distributorPrice
                                            )}
                                            % OFF
                                          </span>
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
                                      ? row.ProductVariants.slice(0, 1).map(
                                          (p) => p.unitSize
                                        )
                                      : ""}
                                  </h6>
                                </div>
                              </Link>
                              {row.ProductVariants
                                ? row.ProductVariants.slice(0, 1).map((p) => (
                                    <div className="product-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary btn-sm float-right"
                                        onClick={() =>
                                          this.props.addToCart(row)
                                        }
                                      >
                                        <i className="mdi mdi-cart-outline" />{" "}
                                        Add To Cart
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
                                  ))
                                : ""}
                            </div>
                          </Paper>
                        </div>
                      ))
                    ) : (
                      <div className="text-danger">
                        Empty item in this category
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="row no-gutters">
                    {list ? (
                      list.products.map((row, index) => (
                        <div key={index} className="col-xs-6 col-sm-6 col-md-4">
                          <Paper className="item">
                            <div className="product">
                              <Link
                                to={{
                                  pathname: `/p/${row.slug}/${row.id}`,
                                  state: row,
                                }}
                              >
                                <div className="product-header">
                                  {row.ProductVariants
                                    ? row.ProductVariants.slice(0, 1).map(
                                        (p) => (
                                          <span className="badge badge-success">
                                            {Math.round(
                                              ((p.distributorPrice -
                                                p.netPrice) *
                                                100) /
                                                p.distributorPrice
                                            )}
                                            % OFF
                                          </span>
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
                                      ? row.ProductVariants.slice(0, 1).map(
                                          (p) => p.unitSize
                                        )
                                      : ""}
                                  </h6>
                                </div>
                              </Link>
                              {row.ProductVariants
                                ? row.ProductVariants.slice(0, 1).map((p) => (
                                    <div className="product-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary btn-sm float-right"
                                        onClick={() =>
                                          this.props.addToCart(row)
                                        }
                                      >
                                        <i className="mdi mdi-cart-outline" />{" "}
                                        Add To Cart
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
                                  ))
                                : ""}
                            </div>
                          </Paper>
                        </div>
                      ))
                    ) : (
                      <div className="text-danger">
                        Empty item in this category
                      </div>
                    )}
                  </div>
                )}

                {/* <div class="more-product-btn">
                                    <button class="show-more-btn hover-btn" onClick={this.onLoadMore}>Show More</button>
                                </div> */}
              </div>
            </div>
          </div>
        </section>

        <Helmet>
          <meta charSet="utf-8" />
          <meta name="title" content={catList ? catList.title : null}></meta>
          <meta
            name="description"
            content={catList ? catList.desc : null}
          ></meta>
          <meta
            name="keyword"
            content={catList ? catList.keyword : null}
          ></meta>
          <link rel="canonical" href={window.location.href} />
        </Helmet>
        {/* end product section */}
      </div>
    );
  }
}
export default connect(null, { addToCart })(Categoryproduct);
