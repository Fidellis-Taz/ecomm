import React from "react";
import GetVendorDetails from "../../components/services/GetVendorDetails";
import { NotificationManager } from "react-notifications";
import { Helmet } from "react-helmet";

const Contactus = () => {
  const [state, setState] = React.useState({
    fullname: "",
    phoneNo: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleClickLogin = async (e) => {
    e.preventDefault();
    let data = {
      fullname: state.fullname,
      phoneNo: state.phoneNo,
      message: state.phoneNo,
      email: state.email,
    };
    if (data) {
      let contact = await GetVendorDetails.getCreateNewVendor(data);
      if (contact) {
        NotificationManager.success(
          "Thank you so much we will contact soon",
          "Success"
        );
        setTimeout(() => window.location.reload(), 3000);
      }
    }
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us</title>
        <meta charset="utf-8" />
        <meta name="title" content="Contact Us" />
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
      <section className="section-padding bg-dark inner-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="mt-0 mb-3 text-white">Contact Us</h1>
              <div className="breadcrumbs">
                <p className="mb-0 text-white">
                  <a className="text-white" href="/">
                    Home
                  </a>{" "}
                  / <span className="text-success">Contact Us</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <h3 className="mt-1 mb-5">Get In Touch</h3>
              <h6 className="text-dark">
                <i className="mdi mdi-home-map-marker" /> Address :
              </h6>
              <p>Janakpur-16,JanakpurDham,Dhanusha,Nepal</p>
              <h6 className="text-dark">
                <i className="mdi mdi-phone" /> Phone :
              </h6>
              <p>+977 9801670444</p>
              <h6 className="text-dark">
                <i className="mdi mdi-deskphone" /> Mobile :
              </h6>
              <p>+977 9801670333</p>
              <h6 className="text-dark">
                <i className="mdi mdi-email" /> Email :
              </h6>
              <p>support@SuperMarket.com</p>
              <h6 className="text-dark">
                <i className="mdi mdi-link" /> Website :
              </h6>
              <p>www.SuperMarket.com</p>
              <div className="footer-social">
                <span>Follow : </span>
                <a href="https://www.facebook.com/chitwashop">
                  <i className="mdi mdi-facebook" />
                </a>
                {/* <a href="#"><i className="mdi mdi-twitter" /></a> */}
                <a href="https://www.instagram.com/chitwa_shop/">
                  <i className="mdi mdi-instagram" />
                </a>
                <a href="www.chitwashop.com">
                  <i className="mdi mdi-google" />
                </a>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="card">
                <div className="card-body">
                  <iframe
                    className="iframe_design_sa"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.5888199462433!2d85.94169914998172!3d26.72557987447386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3f9ad560453b%3A0x9b986e06b8562553!2sChitwa%20Shop!5e0!3m2!1sen!2sin!4v1616615816392!5m2!1sen!2sin"
                    height={450}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding  bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 section-title text-left mb-4">
              <h2>Contact Us</h2>
            </div>
            <form className="col-lg-12 col-md-12" onSubmit={handleClickLogin}>
              <div className="control-group form-group">
                <div className="controls">
                  <label>
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                    id="fullname"
                    value={state.fullname}
                    onChange={handleChange}
                  />
                  <p className="help-block" />
                </div>
              </div>
              <div className="row">
                <div className="control-group form-group col-md-6">
                  <label>
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <div className="controls">
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="form-control"
                      id="phoneNo"
                      value={state.phoneNo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="control-group form-group col-md-6">
                  <div className="controls">
                    <label>
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="form-control"
                      id="email"
                      value={state.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="control-group form-group">
                <div className="controls">
                  <label>
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={4}
                    cols={100}
                    placeholder="Message"
                    className="form-control"
                    id="message"
                    id="message"
                    value={state.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div id="success" />
              {/* For success/fail messages */}
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleClickLogin}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactus;
