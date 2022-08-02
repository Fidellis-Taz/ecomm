import React, { useState, useEffect } from 'react';
import { GetUserLogin } from '../../components/services';
import { useParams } from 'react-router-dom';
import Failed from '../failed';

const Emailverify = (props) => {
    const { email, key } = useParams();
    const [toggle, setData] = useState();

    let getdata = { email: email, key: key }

    // useEffect(async () => {
    //     let list = await GetUserLogin.getCustomerEmailVerify(data);
    //     setData(list)
    // }, [props])

    useEffect(() => {
        if(getdata){
            GetUserLogin.getCustomerEmailVerify(getdata)
                .then((res) => {
                    setData(res.data)
                })
        }

    }, [getdata])

    return (
        <div className="card checkout-step-one mt-5">

            {/* --------------------- Contact Page Starts --------------------------*/}

            {/* START SECTION BREADCRUMB */}
            <section className="breadcrumb-bg mt-5">
                <div className="container">
                    <div className="row align-items-center">
                        {
                            toggle ?
                                <div className="col-sm-12 text-center">
                                    <div className="page-title order-done">

                                        <i className="mdi mdi-check-circle-outline text-success" />

                                        <h1>Account Verified</h1>
                                        <p className="col-sm-6 mx-auto">Congratulations! Your email has been successfully verified.</p>
                                    </div>
                                    <a href="/login" className="btn btn-default btn-radius mt-4 lgn-account">Login To Account</a>
                                </div>
                                :
                                <Failed />
                        }

                    </div>
                </div>
            </section>
          

        </div>
    );
};

export default Emailverify;