import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../header';
import Footer from '../footer';
import Home from '../web/views/home';
import Productview from '../web/views/product';
import Singleproduct from './views/single-product';
import PrivateRoute from '../PrivateRoute';
import Checkout from './views/checkout';
import Shopdetails from './views/shop-details';
import Categoryproduct from './views/categorybyproduct'
import Login from './views/checkout/login';
import Register from './views/checkout/register';
import NotFound from '../../NotFound';
import Complete from './views/checkout/complete';
import Account from './views/account';
import Forgetpassword from '../../auth/forget';
import Resetpassword from '../../auth/reset-password';
import Email_Sent from '../../auth/email-sent';
import Emailverify from '../../auth/email-verify';
import Aboutus from '../../pages/about';
import Contactus from '../../pages/contact-us';
import Privacypolicy from '../../pages/privacy-policy';
import ShippingPolicy from '../../pages/shipping-policy';
import Faq from '../../pages/faq';
import Satisfication from '../../pages/satisfication';
import Termcondition from '../../pages/term-condtion';
import Covidoffer from './views/covid-offer';
import NewProductAllList from './views/new-arrival-product/arrival-all-list';
// import Authentication from '../Authentication';
import Otp from './views/checkout/Otp';
import wishlist from './views/account/wishlist';
import mycart from './views/account/mycart';


export default class rootRoutes extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/p/:slug/:id' component={Singleproduct} />
                    <Route exact path='/shop/:slug' component={Shopdetails} />
                    <Route exact path='/product/new-arrival' component={NewProductAllList} />
                    <Route exact path='/covid-offer/free-sanitary-pad' component={Covidoffer} />
                    <Route exact path='/cp/category/:slug' component={Categoryproduct} />
                    <PrivateRoute path='/checkout' component={Checkout} />
                    <Route path='/product/catalogsearch/result' component={Productview} />
                    <PrivateRoute path='/order/success' component={Complete} />
                    <PrivateRoute path='/account' component={Account} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/otp/:email' component={Otp} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/verify/:email/:key' component={Emailverify} />
                    <Route exact path='/users/password/new' component={Forgetpassword} />
                    <Route exact path='/email-sent' component={Email_Sent} />
                    <Route exact path='/reset/:email/:key' component={Resetpassword} />
                    <Route exact path='/about' component={Aboutus} />
                    <Route exact path='/contact' component={Contactus} />
                    <Route exact path='/privacy-policy' component={Privacypolicy} />
                    <Route exact path='/shipping-policy' component={ShippingPolicy} />
                    <Route exact path='/satisfication-discount' component={Satisfication} />
                    <Route exact path='/faq' component={Faq} />
                    <Route exact path='/wishlist' component={wishlist} />
                    <Route exact path='/mycart' component={mycart} />
                    {/* <Route exact path='/auth' component={Authentication} /> */}
                    <Route exact path='/term-condition' component={Termcondition} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />

            </div>
        )
    }
}
