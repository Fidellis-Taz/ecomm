import { WISHLIST_BUY_NOW, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_INCREASE_QUANTITY, WISHLIST_DECREASE_QUANTITY, } from "../actions/types";

export const wishListReducer = (
  state = { wishListItems: JSON.parse(sessionStorage.getItem("wishListItems") || "[]") },
  action 
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return { wishListItems: action.payload.wishListItems };
    case WISHLIST_BUY_NOW:
      return { wishListItems: action.payload.wishListItems };
    case WISHLIST_INCREASE_QUANTITY:
      return { wishListItems: action.payload.wishListItems };

    case WISHLIST_DECREASE_QUANTITY:
      return { wishListItems: action.payload.wishListItems };

    case REMOVE_FROM_WISHLIST:
      return { wishListItems: action.payload.wishListItems };

    default:
      return state;
  }
};
