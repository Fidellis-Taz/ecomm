import React, { Component } from "react";
import { GetUserLogin } from "../../../../services";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../../../loader";
import { Apis } from "../../../../../../config";
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
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isLoaded: false,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoaded: true });
    let { email, password } = this.state;
    let data = { email: email, password: password };
    if (formValid(this.state)) {
      let user = await GetUserLogin.getUserLogin(data);
      if (user) {
        NotificationManager.success("success", "Login");
        await GetUserLogin.authenticateByCart(user.token, email);
        this.setState({ isLoaded: false });
      } else {
        this.setState({ isLoaded: false });
      }
    } else {
      this.setState({ isLoaded: false });
      NotificationManager.error("Please check your Login", "Input Error");
    }
  };
  render() {
    let { email, password, formErrors, isLoaded } = this.state;
    return (
      <div className="card checkout-step-one">
        {isLoaded ? <Loader /> : ""}
        <div className="container shop-single">
          <div className="col-sm-6 mx-auto">
            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="login-wrap">
                  {/* Tab panes */}
                  <div className="tab-content">
                    <div className="tab-pane active" id="login" role="tabpanel">
                      <h5 className="heading-design-h5 text-center ">
                        Login to your account
                      </h5>
                      <fieldset className="form-group mt-5">
                        <label>Enter Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                        />
                        {formErrors.email.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.email}
                          </span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Enter Password</label>
                        <input
                          className="form-control"
                          name="password"
                          type="password"
                          value={password}
                          onChange={this.handleChange}
                        />
                        {formErrors.password.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.password}
                          </span>
                        )}
                      </fieldset>
                      <fieldset className="form-group">
                        <button
                          type="submit"
                          className="btn btn-lg btn-secondary btn-block"
                          onClick={this.handleSubmit}
                        >
                          Login
                        </button>
                      </fieldset>
                      <fieldset className="form-group"></fieldset>
                      {/* <div className="login-with-sites text-center">
                                                                <p>or Login with your social profile:</p>
                                                                <button className="btn-facebook login-icons btn-lg"><i className="mdi mdi-facebook" /> Facebook</button>
                                                                <button className="btn-google login-icons btn-lg"><i className="mdi mdi-google" /> Google</button>
                                                            </div> */}
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember me
                        </label>
                        <div class="float-right">
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
                </div>
              </form>
            </div>
          </div>
        </div>
        <BottomBar />
      </div>
    );
  }
}
