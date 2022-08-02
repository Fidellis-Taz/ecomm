import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        {/* Footer */}
        <section className="section-padding bg-grey border-top">
          <div className="container">


        {/* End Footer */}
        {/* Copyright */}
        <section className="pt-4 pb-4 bg-theme footer-bottom">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-lg-6 col-sm-6">
                <p className="mt-1 mb-0">
                  © Copyright 2021 <strong>SuperMarket</strong>. All Rights
                  Reserved
                  <br />
                </p>
              </div>
              <div className="col-lg-6 col-sm-6 text-right">
                <img alt="logo" src="/img/Cash-on-delevery.jpg" />
              </div>
            </div>
          </div>
        </section>
        </div>
      </section>
        {/* End Copyright */}
      </div>
    );
  }
}
