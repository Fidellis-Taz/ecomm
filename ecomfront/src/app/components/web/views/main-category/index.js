import React, { Component } from "react";
// import Slider from "react-slick";
import {
  Paper,
  Container,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { GetCategoryDetails } from "../../../services";
import LazyLoad from "react-lazyload";
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import "./index.css";

export default class Maincategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      categoryList: [],
    };
  }
  async getCategoryList() {
    let list = await GetCategoryDetails.getAllMainCategorlist();
    if (list) {
      this.setState({ categoryList: list.data });
    }
  }
  async componentDidMount() {
    this.getCategoryList();
  }
  handleRedirectButton = (slug) => {
    window.location.href = `/shop/${slug}`;
  };
  render() {
    let { categoryList } = this.state;
    return (
      <Container maxWidth="lg">
        <section id="course-tag_cat" className="course-area">
          <div className="course-wrapper">
            <div className=" margin-top-20px">
              <Paper className="parlour_bk color_changes_catgeory">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-heading pl-4">
                      <h1 className="section__title py-3">Shop by Category</h1>
                      {/* <span className="section-divider" /> */}
                    </div>
                  </div>
                  {/* end col-lg-12 */}
                </div>
                {/* end row */}
                <Grid
                  className="p-2 salonchainbg"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Grid container spacing={2}>
                    {categoryList.length ? (
                      categoryList.slice(0, 8).map((row, index) => (
                        <Grid item xs={6} sm={4} md={3} lg={3} xl={3}>
                          <Paper
                            className="p-3"
                            key={index}
                            onClick={() => this.handleRedirectButton(row.slug)}
                          >
                            <Grid container>
                              <Grid
                                className="p-1"
                                item
                                xs={5}
                                md={5}
                                sm={5}
                                lg={5}
                                xl={5}
                              >
                                <Link
                                  to={{
                                    pathname: `/p/${row.slug}/${row.id}`,
                                    state: row,
                                  }}
                                >
                                  {row.thumbnail ? (
                                    <LazyLoad>
                                      <img
                                        className="img-fluid"
                                        src={row.thumbnail}
                                        alt="product"
                                      />
                                    </LazyLoad>
                                  ) : (
                                    <LazyLoad>
                                      <img
                                        className="img-fluid"
                                        src="/img/opacity-loss.jpg"
                                        alt={404}
                                      />
                                    </LazyLoad>
                                  )}
                                </Link>
                              </Grid>
                              <Grid
                                className="details_sd pl-2 text-center"
                                item
                                xs={7}
                                md={7}
                                sm={7}
                                lg={7}
                                xl={7}
                              >
                                <Grid container>
                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    sm={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <div className="py-2">
                                      <h4 className="salon_home_title">
                                        <b>{row.name}</b>
                                      </h4>
                                    </div>
                                  </Grid>
                                </Grid>

                                {/* <h5 className="price-for-cate-sdad"><b>Rs.{row.pricelist[0].GRANDTOTAL} For {(row.pricelist[0].servicelist.category.Gender === "F" ? "Female" : "Male") + " " + row.pricelist[0].servicelist.SERVICENAME}</b></h5> */}
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      ))
                    ) : (
                      <div className="progress-bar-bk">
                        <CircularProgress color="secondary" />
                      </div>
                    )}
                  </Grid>
                </Grid>
                <Grid className="text-center p-2">
                  <Button
                    className="bg-grey"
                    variant="contained"
                    color="secondary"
                    data-toggle="modal"
                    data-target="#catModal"
                  >
                    View All
                  </Button>
                </Grid>
              </Paper>
            </div>
            {/* end row */}
          </div>
          {/* end course-wrapper */}
        </section>

        {/* <section className="product-items-slider section-padding my-2">
                    <div id="header-category-bk">
                        <div className="section-header">
                            <h1 className="heading-design-h5">All Categories </h1>
                        </div>
                        <Slider {...settings}>
                            {
                                categoryList.map((row, index) => (
                                    row.status ?
                                        <Grid contaniner spacing={4}>
                                            <Card className="category_list_vk" key={index} onClick={() => this.handleRedirectButton(row.slug)}>
                                                <CardActionArea>
                                                    <LazyLoad>
                                                        <CardMedia
                                                            component="img"
                                                            alt={row.name}
                                                            height="60px"
                                                            image={row.thumbnail}
                                                            title={row.name}
                                                        />
                                                    </LazyLoad>
                                                    <CardContent>
                                                        <h2 className="cat_title_home"><strong>{row.name}</strong></h2>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid> : ''
                                ))
                            }

                        </Slider>
                    </div>
                </section> */}
      </Container>
    );
  }
}
