import React, { Component } from 'react'

export default class Emailsent extends Component {
    render() {
        return (
            <div className="card checkout-step-one mt-5">

                <section className="breadcrumb-bg mt-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-sm-12 text-center">
                                <div className="page-title order-done">

                                    <i className="mdi mdi-check-circle-outline text-success" />

                                    <h2>Email sent ! check the email.</h2>
                                    <p className="col-sm-6 mx-auto"> If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                {/* END SECTION BREADCRUMB */}


                {/* START SECTION CONTACT */}
                <section className="pt-5">
                    <div className="container">
                        <div className="row">

                        </div>
                    </div>
                </section>
            </div>
            // <div style={}>

            //     <section className="breadcrumb-bg mt-5">
            //         <div className="container">
            //             <div className="row align-items-center">
            //                 <div className="col-sm-12 text-center">
            //                     <div className="page-title">

            //                         <i class="fa fa-check tick-circle" aria-hidden="true"></i>

            //                         <h1>Account Verified</h1>
            //                         <p className="col-sm-6 mx-auto">Congratulations! Your email has been successfully verified.</p>
            //                     </div>


            //                     <a href="/login" class="btn btn-default btn-radius mt-4">Login To Account</a>


            //                 </div>
            //             </div>
            //         </div>
            //     </section>
            //     {/* END SECTION BREADCRUMB */}


            //     {/* START SECTION CONTACT */}
            //     <section className="pt-5">
            //         <div className="container">
            //             <div className="row">

            //             </div>
            //         </div>
            //     </section>
            //     {/* END SECTION CONTACT */}


            //     {/* --------------------- Contact Page Starts --------------------------*/}



            // </div>
        )
    }
}
