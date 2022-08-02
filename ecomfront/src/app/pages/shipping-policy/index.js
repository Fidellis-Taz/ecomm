import React from 'react';
import "./index.css";
import { Helmet } from "react-helmet";

const ShippingPolicy = () => {
    return (
        <div>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Shipping Policy</title>
                <meta charset="utf-8" />
                <meta name="title" content="Privacy and Policy" />
                <meta name="keyword" content="chitwashop,online shopping,online shopping janakpur,online market Kathmandu,online shopping Nepal, online shopping, online store,online supermarket,cloth nepal,grocery pune, online home and kitchen shopping nepal,Men's wear, Women's Shopping in Nepal. Summer wears, Wedding Dresses, Gifts, Offers and Deals in Nepal, food shopping online,Online Grocery dhangadhi, online grocery Jaleswar"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="" content="IE=edge,chrome=1"></meta>

                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="row privacy-policy">
                        <div className="col-lg-12 col-md-12 pl-12 pr-12">
                            <div className="default-title text-center">
                                <h2>Shipping policy</h2>
                            </div>
                            <p>
                            <b>Chitwashop</b> is multiple vendor system platform where shipping Days will varies According to sellers place city, And shipping charge will also varies according as sellers, types of Products, Delivery places. 
                            </p>

                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default ShippingPolicy;