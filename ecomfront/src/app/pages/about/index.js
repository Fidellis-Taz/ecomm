import React from "react";
import { Helmet } from "react-helmet";

const Aboutus = () => {
  return (
    <div>
      <section className="section-padding bg-white">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About Us</title>
          <meta charset="utf-8" />
          <meta name="title" content="About Us" />
          <meta
            name="keyword"
            content="chitwashop,online shopping,online shopping janakpur,online market Kathmandu,online shopping Nepal, online shopping, online store,online supermarket,cloth nepal,grocery pune, online home and kitchen shopping nepal,Men's wear, Women's Shopping in Nepal. Summer wears, Wedding Dresses, Gifts, Offers and Deals in Nepal, food shopping online,Online Grocery dhangadhi, online grocery Jaleswar"
          ></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="" content="IE=edge,chrome=1"></meta>

          <link rel="canonical" href={window.location.href} />
        </Helmet>
        <div className="container">
          <div className="row pt-5">
            <div className="pl-4 col-lg-5 col-md-5 pr-4"></div>
            <div className="col-lg-6 col-md-6 pl-5 pr-5">
              <div className="default-title text-center">
                <h2>About Us</h2>
                <p>Customers Deserve Better</p>
              </div>
              <p>
                <b>SuperMarket</b> is Janakpur’s best e-commerce platform which
                has kept one and only motto to give 100% satisfaction to the
                customers in its primary target areas – All over the Nepal – at
                any cost so that they won’t have any room for any complaints
                regarding service, varieties of products along with their
                quality, delivery time, and price.
              </p>
              <p>
                It is a well-known fact that shopping has been a part of
                people’s life since the past, but it seems that nowadays people
                are struggling to manage time for it by going to market.
                Respecting their busy schedule and lessening the burden of
                shopping by making it easy and quick, a commercial website{" "}
                <b>SuperMarket</b>, an online shopping platform, has been
                launched to assist consumers across the globe in their daily
                chores of shopping by bringing all necessary products of
                consumers’ demand at the tip of their finger. They are just a
                flick away from the shopping items of their necessities and
                choice.
              </p>
              <p>
                <b>SuperMarket</b>, an online e-commerce company, provides
                different types of grocery items, home and kitchen items,
                household needs, fashion care and baby care products of popular
                brands, pet care, beverage, veg and non-veg items, and many more
                at the cheaper and more affordable price than available in the
                market. We consider our valuable customers’ health, lifestyle.
                Caring for the budget of our customers, we provide only the
                cheapest and the best products with no compromise in their
                quality.
              </p>
              <p>
                <b>SuperMarket</b> is a customer-friendly online shopping
                platform since you will experience no difficulty while checking
                details of items to be sure about their quality and price along
                with other necessary details. So, you are just away from your
                shopping items only until you have collected them into your cart
                and confirmed them to be processed for the fast and FREE
                delivery. It lets you go with three modes of payments: online
                payment, cash on delivery, and debit/credit card.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-title text-center mb-5">
          <h2>What We Provide?</h2>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="mt-4 mb-4">
                <i className="text-success mdi mdi-shopping mdi-48px" />
              </div>
              <h5 className="mt-3 mb-3 text-secondary">
                Best Prices &amp; Offers
              </h5>
              {/* <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p> */}
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="mt-4 mb-4">
                <i className="text-success mdi mdi-earth mdi-48px" />
              </div>
              <h5 className="mb-3 text-secondary">Wide Assortment</h5>
              {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text eve.</p> */}
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="mt-4 mb-4">
                <i className="text-success mdi mdi-refresh mdi-48px" />
              </div>
              <h5 className="mt-3 mb-3 text-secondary">Easy Returns</h5>
              {/* <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using.</p> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="mt-4 mb-4">
                <i className="text-success mdi mdi-truck-fast mdi-48px" />
              </div>
              <h5 className="mb-3 text-secondary">
                Free &amp; Next Day Delivery
              </h5>
              {/* <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.</p> */}
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="mt-4 mb-4">
                <i className="text-success mdi mdi-basket mdi-48px" />
              </div>
              <h5 className="mt-3 mb-3 text-secondary">
                100% Satisfaction Guarantee
              </h5>
              {/* <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p> */}
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="mt-4 mb-4">
                <i className="text-success mdi mdi mdi-tag-heart mdi-48px" />
              </div>
              <h5 className="mt-3 mb-3 text-secondary">
                Great Daily Deals Discount
              </h5>
              {/* <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using.</p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
