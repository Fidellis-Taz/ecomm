import React, { Component } from 'react'

export default class Failed extends Component {
    render() {
        return (

            <section className="breadcrumb-bg mt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12 text-center">
                            <div className="page-title order-done">

                                <i className="fa fa-times text-danger" />

                                <h1>Account verfication failed</h1>
                            </div>
                            <a href="/login" className="btn btn-default btn-radius lgn-account mt-4">Login To Account</a>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}
