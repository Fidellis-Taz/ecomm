import { BUY_NOW, ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, } from "../actions/types";

export const cartReducer = (
  state = { cartItems: JSON.parse(sessionStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case BUY_NOW:
      return { cartItems: action.payload.cartItems };
    case INCREASE_QUANTITY:
      return { cartItems: action.payload.cartItems };

    case DECREASE_QUANTITY:
      return { cartItems: action.payload.cartItems };

    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };

    default:
      return state;
  }
};
