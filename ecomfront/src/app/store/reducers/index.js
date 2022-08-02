import {combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { wishListReducer } from "./wishListReducer";

export default combineReducers({
    cart: cartReducer,
    wishlist:wishListReducer
}); 

