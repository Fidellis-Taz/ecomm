import React, { useState } from 'react';
import { GetUserLogin } from '../../components/services';
// import { useHistory } from 'react-router-dom';
// import { NotificationManager } from "react-notifications";
import Emailsent from '../email-sent';
import Loader from '../../../loader';
const Forgetpassword = () => {
    const [email, setEmail] = useState();
    const [errors, setErrors] = React.useState({});
    const [toggle, setToggle] = React.useState(true);
    const [loading, setLoading] = React.useState(false);


    const handleChange = (e) => {
        setEmail(e.target.value)
        // setEmail
    }
    const validateForm = (values) => {
        let allErrors = {};

        if (!email) {
            allErrors.email = "Email address is required!";
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            allErrors.email = "Email address is invalid!";
        }
        return allErrors;
    };
    const handleClickLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        let data = { email: email ,role: "0"}
        const validationErrors = validateForm(email);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            let user = await GetUserLogin.getCustomerResetEmail(data);
            if(user){
                setToggle(false)
                setLoading(false)
            }
        } else {
            console.log("errors try again", validationErrors);
        }
    }
    return (
        <div className="card checkout-step-one">
            {loading?<Loader />:''}
            {
                toggle ?
                    <div className="container shop-single">
                        <div className="col-sm-6 mx-auto">
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <form onSubmit={handleClickLogin} noValidate>
                                    <div className="login-wrap">
                                        {/* Tab panes */}
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="login" role="tabpanel">
                                                <h5 className="heading-design-h5 text-center ">Reset Password</h5>
                                                <fieldset className="form-group mt-5">
                                                    <h4><strong>Email</strong></h4>
                                                    <input id="email" type="text" className="form-control" placeholder="Enter your email..." value={email || ''} onChange={handleChange} required />
                                                    {errors.email && (
                                                        <div class="alert alert-danger" role="alert">
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={handleClickLogin}>Reset password</button>
                                                </fieldset>
                                                <div class="clearfix prepend-top-20">
                                                    <p class="text-center">
                                                        <span class="light">
                                                            Already have login and password?
<                                                   a href="/login">Sign in</a>
                                                        </span>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                    : <Emailsent />
            }

        </div>
    );
};

export default Forgetpassword;