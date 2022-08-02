import React, { lazy, Suspense, Component } from "react";
import { Paper } from "@material-ui/core";
import Slider from "react-slick";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";
// import Zoom from 'react-img-zoom'
import { GetProductDetails } from "../../../services";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import "./index.css";
import LazyLoad from "react-lazyload";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BottomBar from "../../../BottomBar";
import ProductDetailsSkeleton from "../productskelton/ProductDetailsSkeleton";
const Similarproduct = lazy(() => import("./same-product"));

const renderLoader = () => <p>Loading</p>;
class Singleproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      seo: {},
      isloaded: "",
      brand: "",
    };
  }
  async getAllProductList() {
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    let data = { id: lastSegment };
    let list = await GetProductDetails.getProductById(data);
    this.setState({
      product: list.data,
      selectedVariant: list.data.ProductVariants[0],
      brand: list.data.ch_brand_detail,
      seo: list.data.Seo_Details[0],
    });
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.getAllProductList();
  }
  handleChangePrice = async (variant) => {
    // this.setState({ isloaded: true })
    let data = { varientId: variant.id, productId: variant.productId };
    let product = await GetProductDetails.getProductById(data);
    if (product) {
      this.setState({
        selectedVariant: product.data.ProductVariants[0],
        imgList: product.imglist,
        brand: product.data.ch_brand_detail,
      });
    }
  };
  addProductToCart = () => {
    const { product, selectedVariant } = this.state;
    this.props.addToCart({
      ...product,
      selectedVariant,
    });
  };
  render() {
    const { seo, product, brand, isloaded, selectedVariant, imgList } =
      this.state;
    const settings = {
      customPaging: function (i) {
        return (
          <div id="sync1" className="owl-carousel">
            <div className="item">
              <img src={product.productphotos[i].imgUrl} alt="owl-carousel" />
            </div>
          </div>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const settings2 = {
      customPaging: function (i) {
        return (
          <div id="sync1" className="owl-carousel">
            <div className="item">
              <img src={imgList[i].imgUrl} alt="owl-carousel" />
            </div>
          </div>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <section className="shop-single">
          {isloaded ? (
            <ProductDetailsSkeleton />
          ) : (
            <div className="container">
              {product ? (
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-5">
                    <div className="shop-detail-left">
                      <Paper className="shop-detail-slider">
                        {imgList ? (
                          <Slider {...settings2}>
                            {imgList.map((r, index) => {
                              return (
                                <div key={index}>
                                  <LazyLoad>
                                    <img
                                      className="p-2"
                                      src={r.imgUrl}
                                      alt="banner"
                                      width={500}
                                      height={400}
                                    />
                                    {/* <Zoom
                                                                                    className="w-100 img-center"
                                                                                    img={r.imgUrl}
                                                                                    zoomScale={2}
                                                                                    width={500}
                                                                                    height={400}
                                                                                /> */}
                                  </LazyLoad>
                                </div>
                              );
                            })}
                          </Slider>
                        ) : (
                          <Slider {...settings}>
                            {product.productphotos
                              ? product.productphotos.map((r, index) => {
                                  return (
                                    <div key={index}>
                                      <LazyLoad>
                                        <img
                                          className="p-2"
                                          src={r.imgUrl}
                                          alt="banner"
                                          width={500}
                                          height={400}
                                        />
                                        {/* <Zoom
                                                                                        className="w-100 img-center"
                                                                                        img={r.imgUrl}
                                                                                        zoomScale={2}
                                                                                        width={500}
                                                                                        height={400}
                                                                                    /> */}
                                      </LazyLoad>
                                    </div>
                                  );
                                })
                              : "Please Upload Image"}
                          </Slider>
                        )}
                      </Paper>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-7">
                    <div className="shop-detail-right">
                      {selectedVariant &&
                      (selectedVariant.discount ||
                        selectedVariant.marginPrice) ? (
                        <span className="badge badge-success">
                          {Math.round(
                            ((selectedVariant.distributorPrice -
                              selectedVariant.netPrice) *
                              100) /
                              selectedVariant.distributorPrice
                          )}
                          % OFF
                        </span>
                      ) : (
                        ""
                      )}
                      <h2>{selectedVariant.productName || product.name}</h2>
                      <h6>
                        <strong>
                          <span className="mdi mdi-approval" /> Available in
                        </strong>{" "}
                        :{" "}
                        {selectedVariant.Available ? (
                          <span class="text-success">in stock</span>
                        ) : (
                          <span class="text-danger">out of stock</span>
                        )}
                        <span className="ml-3">
                          Brand:
                          {brand ? (
                            <a
                              href={`http://localhost:4000/product/catalogsearch/result/${brand.name}`}
                            >
                              {" "}
                              <b>{brand.name}</b>
                            </a>
                          ) : (
                            ""
                          )}
                        </span>
                      </h6>
                      {selectedVariant &&
                      (selectedVariant.discount ||
                        selectedVariant.marginPrice) ? (
                        <div className="pdp-product__old-price">
                          <span className="space__right--2-unit"> MRP:</span>
                          <span className="regular-price">
                            {selectedVariant &&
                              selectedVariant.distributorPrice}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="pdp-product__new-price">
                        <span className="space__right--2-unit"> Price:</span>
                        <span className="pdp-product__price--new">
                          Rs.
                          {selectedVariant && selectedVariant.netPrice}
                          <p className="text-danger">
                            you saved : Rs.{selectedVariant.discount}
                          </p>
                        </span>
                        <div className="pdp-product__tax-disclaimer">
                          (Inclusive of all taxes)
                        </div>
                      </div>
                      <div className="check_capacity">
                        <h5 className="mt-4">Capacity</h5>
                        <div
                          className="btn-toolbar mt-3"
                          role="toolbar"
                          aria-label="Toolbar with button groups"
                        >
                          {product.ProductVariants
                            ? product.ProductVariants.map((p, i) => (
                                <button
                                  type="button"
                                  className={
                                    selectedVariant.id !== p.id
                                      ? "btn-opt"
                                      : "btn-opt-bk"
                                  }
                                  key={i}
                                  onClick={() => this.handleChangePrice(p)}
                                >
                                  {p.unitSize}
                                </button>
                              ))
                            : ""}
                        </div>
                      </div>
                      {selectedVariant.Available ? (
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg"
                          onClick={this.addProductToCart}
                        >
                          <i className="mdi mdi-cart-outline" /> Add To Cart
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg"
                          disabled
                        >
                          <i className="mdi mdi-cart-outline" /> Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                "Loading"
              )}
            </div>
          )}
          {product.desc ? (
            <div className="container">
              <div className="product-details-wrapper">
                <Paper className="p-4">
                  <h4 className="product_details_laks">Product Details</h4>
                  {parse(product.desc)}
                </Paper>
              </div>
            </div>
          ) : (
            ""
          )}
        </section>

        <section className="related-products section-padding">
          <Suspense fallback={renderLoader()}>
            <Similarproduct />
          </Suspense>
        </section>

        {/* seo detail */}
        {product ? (
          <Helmet>
            <meta charSet="utf-8" />
            <title>{seo ? seo.meta_title : null}</title>
            <meta name="title" content={seo ? seo.meta_title : null}></meta>
            <meta
              name="description"
              content={seo ? seo.meta_desc : null}
            ></meta>
            <meta name="keyword" content={seo ? seo.meta_keyword : null}></meta>
            <link rel="canonical" href={window.location.href} />
          </Helmet>
        ) : null}

        <BottomBar />
      </div>
    );
  }
}

export default connect(null, { addToCart })(Singleproduct);
