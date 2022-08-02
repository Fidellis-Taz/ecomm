import { WISHLIST_BUY_NOW, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_INCREASE_QUANTITY, WISHLIST_DECREASE_QUANTITY } from "./types";

export const addToWishList = (product) => (dispatch, getState) => {
  const wishListItems = getState().wishlist.wishListItems.slice();

  if (!product.selectedVariant) {
    product.selectedVariant = product.ProductVariants[0];
  }
  const existingProductIndex = wishListItems.findIndex(p => p.id === product.id && p.selectedVariant.id === product.selectedVariant.id);
  if (existingProductIndex > -1) {
    wishListItems[existingProductIndex].selectedVariant.qty += product.selectedVariant.qty;
  } else {
    wishListItems.push({ ...product });
  }
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: { wishListItems },
  });
  sessionStorage.setItem("wishListItems", JSON.stringify(wishListItems));
};

export const buyNow = (product) => (dispatch, getState) => {
  const wishListItems = getState().wishlist.wishListItems.slice();

  if (!product.selectedVariant) {
    product.selectedVariant = product.ProductVariants[0];
  }
  const existingProductIndex = wishListItems.findIndex(p => p.id === product.id && p.selectedVariant.id === product.selectedVariant.id);
  if (existingProductIndex > -1) {
    wishListItems[existingProductIndex].selectedVariant.qty += product.selectedVariant.qty;
  } else {
    wishListItems.push({ ...product });
  }
  dispatch({
    type: WISHLIST_BUY_NOW,
    payload: { wishListItems },
  });
  sessionStorage.setItem("wishListItems", JSON.stringify(wishListItems));
  window.location.href = "/checkout"
};

export const removeFromWishList = (product) => (dispatch, getState) => {
  const wishListItems = getState().wishlist.wishListItems.slice().filter((x) => x.id !== product.productId);
  dispatch({ type: REMOVE_FROM_WISHLIST, payload: { wishListItems } });
  sessionStorage.setItem("wishListItems", JSON.stringify(wishListItems));
};

export const incrementToWishList = (product) => (dispatch, getState) => {
  const wishListItems = getState().wishlist.wishListItems.slice()
  const selectProduct = wishListItems.find(item => item.id === product.productId)
  const index = wishListItems.indexOf(selectProduct)
  const value = wishListItems[index].ProductVariants[0];

  value.qty = value.qty + 1;
  value.total = value.qty * value.netPrice;

  dispatch({
    type: WISHLIST_INCREASE_QUANTITY,
    payload: { wishListItems },
  });
  sessionStorage.setItem("wishListItems", JSON.stringify(wishListItems));
}

export const decreaseToWishList = (product) => (dispatch, getState) => {
  const wishListItems = getState().wishlist.wishListItems.slice()
  const selectProduct = wishListItems.find(item => item.id === product.productId)
  const index = wishListItems.indexOf(selectProduct)
  const value = wishListItems[index].ProductVariants[0]

  if (value.qty > 1) {
    value.qty = value.qty - 1;
    value.total = value.qty * value.netPrice;
  }
  dispatch({ type: WISHLIST_DECREASE_QUANTITY, payload: { wishListItems } });
  sessionStorage.setItem("wishListItems", JSON.stringify(wishListItems));
}

