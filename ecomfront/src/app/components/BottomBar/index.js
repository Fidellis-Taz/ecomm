import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { RiHomeSmile2Line, RiHomeSmile2Fill, RiUser5Fill, RiSearchEyeFill } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { RiUser5Line } from 'react-icons/ri'
import classes from "./BottomBar.module.css"
import { connect } from 'react-redux';
function BottomBar({ wishListItems ,cartItems}) {
    const history = useHistory()

    console.log(wishListItems, "props")

    return (
        <nav className={classes.mobile_nav}>
    <div className={classes.bottom_bar_element} onClick={()=>history.push("/")}>
        <i className="fa fa-home" style={{fontSize:" 24px"}}></i><br/>
        <span>Home</span>
    </div>

    
    

    <div className={classes.bottom_bar_element} onClick={()=>history.push("/mycart")}>
    <i className="fa fa-shopping-cart" style={{fontSize:" 24px"}}>
    {cartItems.length?<small className={classes.wishlistcount}>{cartItems.length}</small> :""}
        </i><br/>
        <span>Cart</span>
    </div>
    <div className={classes.bottom_bar_element} onClick={()=>history.push("/account/profile")}>
    <i className="fa fa-user" style={{fontSize:" 24px"}}></i><br/>
        <span>Profile</span>
    </div>
    <div className={classes.bottom_bar_element} onClick={()=>history.push("/wishlist")}>
    
    <i className="fa fa-heart" style={{fontSize:" 24px"}}>
        {wishListItems.length?<small className={classes.wishlistcount}>{wishListItems.length}</small> :""}
    
        </i><br/>
        <span>WishList</span>
    </div>
    <div className={classes.bottom_bar_element} onClick={()=>history.push("/account/order/list")}>
    <i className="fa  fa-gear" style={{fontSize:" 24px"}}></i><br/>
        <span>Orders</span>
    </div>

    </nav>
    )
}



export default connect(
    (state) => ({
        wishListItems: state.wishlist.wishListItems,
        cartItems: state.cart.cartItems
    }),
    // { incrementToCart, decreaseToCart, removeFromCart }
)(BottomBar);







