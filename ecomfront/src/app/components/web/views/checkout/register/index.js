import React, { Component } from 'react';
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from "react-notifications";
import Loader from '../../../../../../loader';
import BottomBar from '../../../../BottomBar';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            email: null,
            isLoaded: false,
            password: null,
            checked: false,
            formErrors: {
                firstName: "",
                lastName:"",
                email: "",
                password: ""
            }
        };
        this.handleCheck = this.handleCheck.bind(this);
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
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
    handleCheck(e) {
        this.setState({
            checked: e.target.checked
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        let { firstName,lastName, email, password, gender } = this.state;
        let data = { firstName: firstName,lastName: lastName, email: email, password: password, gender: gender,"role": '0' }
        if (formValid(this.state)) {
            let list = await GetUserLogin.getUserRegister(data);
            if (list) {
                this.setState({ isLoaded: false })
                NotificationManager.success("Successfully Added New User");
                window.location.href = `/otp/${email}`;
            }else{
                this.setState({ isLoaded: false })
            }
        } else {
            this.setState({ isLoaded: false })
            NotificationManager.error("Please check your Register", "Input Error");
        }

    }
    render() {
        let { firstName, lastName,email, password, formErrors, isLoaded } = this.state;
        return (
            <div className="card checkout-step-one">
                {isLoaded ? <Loader /> : ''}

                <div className="container shop-single">
                    <div className="col-sm-6 mx-auto">

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">


                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className="login-wrap">
                                    <h5 className="heading-design-h5 text-center">Register New Account!</h5>
                                    <fieldset className="form-group mt-5">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                                        {formErrors.firstName.length > 0 && (
                                            <span className="errorMessage">{formErrors.firstName}</span>
                                        )}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                                        {formErrors.lastName.length > 0 && (
                                            <span className="errorMessage">{formErrors.lastName}</span>
                                        )}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Enter Email</label>
                                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                        {formErrors.email.length > 0 && (
                                            <span className="errorMessage">{formErrors.email}</span>
                                        )}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Enter Password</label>
                                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                        {formErrors.password.length > 0 && (
                                            <span className="errorMessage">{formErrors.password}</span>
                                        )}
                                    </fieldset>

                                    <div className="custom-control custom-checkbox">
                                        <input
                                            id="checkbox_id"
                                            type="checkbox"
                                            checked={this.state.checked}
                                            onChange={this.handleCheck}
                                        />
                                        {/* <input type="checkbox" className="custom-control-input" checked={this.state.checked} onChange={this.handleChecked} /> */}
                                        <span >I Agree with <a href="/">Term and Conditions</a></span>
                                    </div>

                                    <fieldset className="form-group mt-4">
                                        <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={this.handleSubmit} disabled={this.state.checked ? false : true}>Create Your Account</button>
                                    </fieldset>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <BottomBar/>
            </div>
        )
    }
}
