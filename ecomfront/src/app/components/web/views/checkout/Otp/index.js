import React, { Component } from "react";
import { GetUserLogin } from "../../../../services";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../../../loader";
import { Apis } from "../../../../../../config";
import OtpInput from "react-otp-input";
import BottomBar from "../../../../BottomBar";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
export default class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: window.location.pathname.split("/").pop(),
      isLoaded: false,
       otp: '' ,
     
    };
  }



  handleChange = (otp) => this.setState({ otp });


  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.otp, "otp")
    this.setState({ isLoaded: true });
    let { email, otp } = this.state;
    let data = { email: email, key: otp };
   
      
      let user = await GetUserLogin.getCustomerEmailVerify(data);
      if (user) {
        NotificationManager.success("success", "Login");
        window.location.href = "/";
        this.setState({ isLoaded: false });
      } else {
        this.setState({ isLoaded: false });
      }
    } 
  
  render() {
    let { email, password, formErrors, isLoaded } = this.state;
    console.log(window.location.pathname.split("/").pop(),"props.route.params")
    return (
      <div className="card checkout-step-one">
        {isLoaded ? <Loader /> : ""}
        <div className="container shop-single">

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="login-wrap" style={{padding:"20px"}}>
                {/* Tab panes */}
                <div className="tab-content " style={{
                                paddingRight: 0,
                                paddingLeft: 0,
                                marginLeft:'auto',
                                marginRight:"auto",
                                width:"100%"

                            }}>


                  <div className="form-group pos_rel ">
                    <label className="control-label">Enter 6 digit Code</label>
                    <OtpInput
                      // separator={
                      //   <span>
                      //     <strong>.</strong>
                      //   </span>
                      // }
                      value={this.state.otp}
                      onChange={this.handleChange}
                      inputStyle={{
                        width: "3rem",
                        height: "3rem",
                        margin: "0 .6rem",
                        fontSize: "2rem",
                        borderRadius: 4,
                        border: "1px solid rgba(0,0,0,0.3)"
                      }}
                      numInputs={6}
                    />

                  </div>
                  <fieldset className="form-group">
                    <button
                      type="submit"
                      className="btn btn-lg  btn-block chck-btn hover-btn code-btn145"
                      onClick={this.handleSubmit}
                    >
                      Send
                    </button>
                  </fieldset>
                  <fieldset className="form-group"></fieldset>

                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />

                    <div className="float-right">
                      <a href="/users/password/new">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clearfix" />
              <div className="text-center login-footer-tab">
                <p className="mt-3">
                  {" "}
                  Not a member? <a href="/register">Register Now</a>
                </p>
              </div>
              <div className="clearfix" />

            </form>
          </div>
        </div>
        <BottomBar />
      </div>

    );
  }
}
