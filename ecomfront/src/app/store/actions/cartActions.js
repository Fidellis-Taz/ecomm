import { BUY_NOW, ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from "./types";
import { NotificationContainer, NotificationManager } from 'react-notifications';

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();

  if (!product.selectedVariant) {
    product.selectedVariant = product.ProductVariants[0];
  }
  const existingProductIndex = cartItems.findIndex(p => p.id === product.id && p.selectedVariant.id === product.selectedVariant.id);
  if (existingProductIndex > -1) {
    cartItems[existingProductIndex].selectedVariant.qty += product.selectedVariant.qty;
    NotificationManager.success("Successfully updated", "", 1500);
  } else {
    cartItems.push({ ...product });
    NotificationManager.success("Successfully added", "", 1500);
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const buyNow = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();

  if (!product.selectedVariant) {
    product.selectedVariant = product.ProductVariants[0];
  }
  const existingProductIndex = cartItems.findIndex(p => p.id === product.id && p.selectedVariant.id === product.selectedVariant.id);
  if (existingProductIndex > -1) {
    cartItems[existingProductIndex].selectedVariant.qty += product.selectedVariant.qty;
  } else {
    cartItems.push({ ...product });
  }
  dispatch({
    type: BUY_NOW,
    payload: { cartItems },
  });
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.location.href = "/checkout"
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice().filter((x) => x.id !== product.productId);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  NotificationManager.success("Successfully Remove", "", 1500);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const incrementToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  const selectProduct = cartItems.find(item => item.id === product.productId)
  const index = cartItems.indexOf(selectProduct)
  const value = cartItems[index].ProductVariants[0];

  value.qty = value.qty + 1;
  value.total = value.qty * value.netPrice;

  dispatch({
    type: INCREASE_QUANTITY,
    payload: { cartItems },
  });
  NotificationManager.success("Successfully qnty updated", "", 1500);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const decreaseToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  const selectProduct = cartItems.find(item => item.id === product.productId)
  const index = cartItems.indexOf(selectProduct)
  const value = cartItems[index].ProductVariants[0]

  if (value.qty > 1) {
    value.qty = value.qty - 1;
    value.total = value.qty * value.netPrice;
  }
  NotificationManager.success("Successfully qnty updated", "", 1500);
  dispatch({ type: DECREASE_QUANTITY, payload: { cartItems } });
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

