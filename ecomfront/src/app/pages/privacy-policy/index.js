import React from "react";
import "./index.css";
import { Helmet } from "react-helmet";

const Privacypolicy = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Privacy and Policy</title>
        <meta charset="utf-8" />
        <meta name="title" content="Privacy and Policy" />
        <meta
          name="keyword"
          content="SuperMarket,online shopping,online shopping janakpur,online market Kathmandu,online shopping Nepal, online shopping, online store,online supermarket,cloth nepal,grocery pune, online home and kitchen shopping nepal,Men's wear, Women's Shopping in Nepal. Summer wears, Wedding Dresses, Gifts, Offers and Deals in Nepal, food shopping online,Online Grocery dhangadhi, online grocery Jaleswar"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="" content="IE=edge,chrome=1"></meta>

        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row privacy-policy">
            <div className="col-lg-12 col-md-12 pl-12 pr-12">
              <div className="default-title text-center">
                <h2>Privacy policy</h2>
              </div>
              <p>
                <b>SuperMarket</b> is Janakpur’s best e-commerce platform which
                has kept one and only motto to give 100% satisfaction to the
                customers in its primary target areas – Janakpurdham, Jaleshwar
                and Bardibas.one of our main priorities is the privacy of our
                visitors. This Privacy Policy document contains types of
                information that is collected and recorded by chitwa shop and
                how we use it.
              </p>
              <p>
                If you have additional questions or require more information
                about our Privacy Policy, do not hesitate to contact us. This
                Privacy Policy applies only to our online activities and is
                valid for visitors to our website with regards to the
                information that they shared and/or collect in chitwa shop. This
                policy is not applicable to any information collected offline or
                via channels other than this website. .
              </p>
              <h3>
                <b>Information we collect</b>
              </h3>
              <p>
                The personal information that you are asked to provide, and the
                reasons why you are asked to provide it, will be made clear to
                you at the point we ask you to provide your personal
                information.
                <br />
                If you contact us directly, we may receive additional
                information about you such as your name, email address, phone
                number, the contents of the message and/or attachments you may
                send us, and any other information you may choose to provide.
                <br />
                When you register for an Account, we may ask for your contact
                information, including items such as name, company name,
                address, email address, and telephone number.
              </p>
              <p>How we use your information</p>
              <p>
                We use the information we collect in various ways, including to:
              </p>
              <p className="pt-3">
                <ul>
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>
                    Develop new products, services, features, and functionality
                  </li>
                  <li>
                    Communicate with you, either directly or through one of our
                    partners, including for customer service, to provide you
                    with updates and other information relating to the website
                    and for marketing and promotional purposes
                  </li>
                  <li>Send you emails</li>
                  <li>Find and prevent fraud</li>
                </ul>
              </p>
              <h3>Cookies</h3>
              <p>
                Like any other website, chitwa shop uses 'cookies'. These
                cookies are used to store information including visitors'
                preferences, and the pages on the website that the visitor
                accessed or visited. The information is used to optimize the
                users' experience by customizing our web page content.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacypolicy;
