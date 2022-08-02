import React, { lazy, Suspense, Component } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { GetUserLogin } from "../../../services";
import { Helmet } from "react-helmet";
import BottomBar from "../../../BottomBar";
const Bannerslider = lazy(() => import("../banner-carousel"));
const Grocerystample = lazy(() => import("./grocery-stample"));
const PersonalCare = lazy(() => import("./personal-care"));
const Beverages = lazy(() => import("./getbeverages"));
const Bestofferbanner = lazy(() => import("./best-offers-banner"));
const NewArrivalProduct = lazy(() => import("../new-arrival-product"));
const Maincategory = lazy(() => import("../main-category"));

const renderLoader = () => <p>Loading</p>;
export default class Home extends Component {
  render() {
    return (
      <div className="home-wrap">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            The Best Online Shopping Platform in India | Buy at affordable price
            in Nepal | SuperMarket
          </title>

          <meta
            name="description"
            content="SuperMarket: The Best Online Shopping Platform in Nepal. Get Free Delivery and Best Deals &amp; Offers in Jankpur,Jaleswar,Bardibas. Nepal's Biggest online store. Buy Online in Nepal,Online Shopping : Choose from a wide range of market, baby care products, personal care products, fresh fruits &amp; vegetables online. Pay Online &amp; Avail exclusive discounts on various products @ Nepal Best Online Grocery store. ✔ Best Prices &amp; Offers ✔ Cash on Delivery ✔ Easy Returns"
          ></meta>

          <meta
            name="keyword"
            content="SuperMarket,online shopping,online shopping janakpur,online market Kathmandu,online shopping Nepal, online shopping, online store,online supermarket,cloth nepal,grocery pune, online home and kitchen shopping nepal,Men's wear, Women's Shopping in Nepal. Summer wears, Wedding Dresses, Gifts, Offers and Deals in Nepal, food shopping online,Online Grocery dhangadhi, online grocery Jaleswar"
          ></meta>

          <link rel="canonical" href={window.location.href} />
        </Helmet>
        <Suspense fallback={renderLoader()}>
          <Bannerslider />
          <Maincategory />
          <NewArrivalProduct />
          <Beverages />
          {/* <Bestofferbanner /> */}
          <PersonalCare />
          <Grocerystample />
        </Suspense>
        <BottomBar />
      </div>
    );
  }
  async componentDidMount() {
    try {
      const queryString = this.props.location.search;
      const token = queryString.split("token=")[1].split("&")[0];
      const email = queryString.split("email=")[1].split("&")[0];
      // console.log({token,email})
      if (token && email) {
        NotificationManager.success("success", "Login");
        await GetUserLogin.authenticate(token, email, true);
      }
    } catch (err) {}
  }
}
