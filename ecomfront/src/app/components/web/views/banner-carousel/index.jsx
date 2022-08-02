import React, { Component } from "react";
import Slider from "react-slick";
import { Paper } from "@material-ui/core";
import { GetProductDetails } from "../../../services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default class Bannerslider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  async componentDidMount() {
    let p = await GetProductDetails.getAllBannerList();
    if (p) {
      this.setState({ list: p.data });
    }
  }
  render() {
    var settings = {
      dots: false,
      infinite: true,
      autoplay: false,
      speed: 3000,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    let { list } = this.state;
    return (
      <Paper className="banner-height" style={{ height: "300px",flexGrow: 1 }}>
        <Slider {...settings}>
          {list
            ? list.map((row, index) => (
                <div className="owl-item" key={index}>
                  <a href={`/shop/${row.slug}`}>
                    <img
                      src={row.banner}
                      alt="chitwashop"
                      style={{ height: "300px" }}
                    />
                  </a>
                </div>
              ))
            : ""}
        </Slider>
      </Paper>
    );
  }
}
