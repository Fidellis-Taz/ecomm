import React, { useState } from 'react';
import { GetUserLogin } from '../../components/services';
import {  useParams, useHistory } from 'react-router-dom';
import { NotificationManager } from "react-notifications";

const Resetpassword = () => {
    const [password, setPassword] = useState();
    const { email, key } = useParams();
    const [toggle, setToggle] = useState(false);
    const [confirmpassword, setConfirmPassword] = useState();
    const history = useHistory();

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleClickLogin = async(e) => {
        e.preventDefault();
        let data = { email: email, password: password, key: key}
        if(password === confirmpassword){
           let user = await GetUserLogin.getUserResetPassword(data);
           if(user){
            NotificationManager.success("Successfully updated password","password")
            setTimeout(
                () => history.push("/login"), 
                3000
              );
           }else{
            NotificationManager.error("Something occured","500")
           }
        }else{
            setToggle(true)
        }
    }
    return (
        <div className="card checkout-step-one">
            <div className="container shop-single">
                <div className="col-sm-6 mx-auto">
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <form onSubmit={handleClickLogin} noValidate>
                            <div className="login-wrap">
                                {/* Tab panes */}
                                <div className="tab-content">
                                    <div className="tab-pane active" id="login" role="tabpanel">
                                        <h5 className="heading-design-h5 text-center"><strong>Change your password</strong></h5>
                                        <fieldset className="form-group mt-5">
                                            <label ><strong>New password</strong></label>
                                            <input type="password" className="form-control"  value={password} onChange={handleChangePassword}/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label><strong>Confirm Password</strong></label>
                                            <input className="form-control" type="password" value={confirmpassword} onChange={handleChangeConfirmPassword}/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={handleClickLogin}>Change your password</button>
                                        </fieldset>
                                    </div>
                                    {toggle ?
                                    <div class="alert alert-danger" role="alert">
                                    Check password is not matching!
                                  </div>:''}
                                </div>

                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resetpassword;